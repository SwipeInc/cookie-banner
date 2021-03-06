/**
 * Check if the cookie present otherwise abort
 */
var myStorage = window.localStorage;
var storageKey = "cookie_banner_accepted";
var hasBannerKey = myStorage.getItem(storageKey);
// Temporarily disable for DSTV only sites
var isDstv = window.location.host.includes("dstv") || window.location.host.includes("mnetcorporate");

/**
 * Get cookie value
 *
 * @param {*} name
 * @returns
 */
function getLocalstorage(name) {
  cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i].split("=");
    if (c[0] == name) {
      return c[1];
    }
  }
  return false;
}

/**
 * Check if script should execute any further
 */
if (!hasBannerKey && !isDstv) {
  /**
   * Create tags and script reference
   */
  var scriptTag = document.currentScript;
  var styleTag = document.createElement("style");
  var bannerTag = document.createElement("div");

  var termsUrl, preset, buttonColour, buttonTextColour, backgroundColour, textColour, msg, linkMsg;

  /**
   * Check for a custom terms link
   */
  if (scriptTag.hasAttribute("data-terms-url")) {
    termsUrl = scriptTag.getAttribute("data-terms-url");
  } else {
    termsUrl = "https://www.multichoice.com/privacy-cookie-notice/";
  }

  /**
   * Check for theme definition
   */
  if (scriptTag.hasAttribute("data-preset")) {
    preset = scriptTag.getAttribute("data-preset");
  } else {
    preset = "light";
  }

  /**
   * Check for button colour definition
   */
  if (scriptTag.hasAttribute("data-btn")) {
    buttonColour = scriptTag.getAttribute("data-btn");
  } else {
    buttonColour = "#13b5ea";
  }

  /**
   * Check for button text colour definition
   */
  if (scriptTag.hasAttribute("data-btn-text")) {
    buttonTextColour = scriptTag.getAttribute("data-btn-text");
  } else {
    buttonTextColour = "#fff";
  }

  /**
   * Check for background colour definition
   */
  if (scriptTag.hasAttribute("data-bg")) {
    backgroundColour = scriptTag.getAttribute("data-bg");
  } else {
    if (preset === "dark") {
      backgroundColour = "#1b1b1b";
    } else {
      backgroundColour = "#fff";
    }
  }

  /**
   * Check for text colour definition
   */
  if (scriptTag.hasAttribute("data-text")) {
    textColour = scriptTag.getAttribute("data-text");
  } else {
    if (preset === "dark") {
      textColour = "#fff";
    } else {
      textColour = "#1b1b1b";
    }
  }

  /**
   * Check for a custom banner msg
   */
   if (scriptTag.hasAttribute("data-msg")) {
    msg = scriptTag.getAttribute("data-msg");
  } else {
    msg = "We use cookies to improve your site experience, perform analytics and show you relevant advertising. By clicking ???OK???, you agree to the storing of cookies on your device.";
  }

  /**
   * Check for a custom banner link msg
   */
   if (scriptTag.hasAttribute("data-link-msg")) {
    linkMsg = scriptTag.getAttribute("data-link-msg");
  } else {
    linkMsg = "View our cookie policy";
  }

  /**
   * Add style tag
   */
  scriptTag.insertAdjacentElement("afterend", styleTag);
  styleTag.appendChild(document.createTextNode(generateStyles(buttonColour, buttonTextColour, backgroundColour, textColour)));

  /**
   * Add button html
   */
  scriptTag.insertAdjacentElement("afterend", bannerTag);
  bannerTag.innerHTML = generateCookieBanner(msg, linkMsg, termsUrl);

  // Find button elements
  var acceptBtn = document.getElementById("accept-btn");
  var dismissBtn = document.getElementById("dismiss-btn");

  // Add event listeners
  acceptBtn.addEventListener(
    "click",
    function () {
      console.log("accepted");
      acceptCookies();
    },
    false
  );
  dismissBtn.addEventListener(
    "click",
    function () {
      dismissCookieBanner();
    },
    false
  );
}

/**
 * Generate the cookie banner styles
 *
 * @returns
 */
function generateStyles(buttonColour, buttonTextColour, backgroundColour, textColour) {
  var styles = `
  .b-cookie-banner {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 40px 15px 15px;
      font-family: Arial, Helvetica, sans-serif;
      background-color: ${backgroundColour};
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
      animation: animCookieBanner ease 0.8s;
    }
    @keyframes animCookieBanner {
      from {
        transform: translateY(130%);
      }
      to {
        transform: translateY(0);
      }
    }
    .b-cookie-banner .e-dismiss {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .b-cookie-banner .e-dismiss:before,
    .b-cookie-banner .e-dismiss:after {
      position: absolute;
      top: calc(50% - 1px);
      content: "";
      display: block;
      height: 2px;
      width: 100%;
      background-color: ${textColour};
      transition: transform ease 0.3s;
    }
    .b-cookie-banner .e-dismiss:before {
      transform: rotate(45deg);
    }
    .b-cookie-banner .e-dismiss:hover:before {
      transform: rotate(135deg);
    }
    .b-cookie-banner .e-dismiss:after {
      transform: rotate(135deg);
    }
    .b-cookie-banner .e-dismiss:hover:after {
      transform: rotate(45deg);
    }
    .b-cookie-banner .e-description {
      flex-grow: 1;
      font-size: 14px;
      line-height: 1.5em;
      color: ${textColour};
    }
    .b-cookie-banner .e-description a {
      display: block;
      color: ${buttonColour};
    }
    .b-cookie-banner .e-button {
      padding: 20px 0 0 0;
      margin-right: -25px;
      width: calc(100% + 25px);
    }
    .b-cookie-banner .e-button button {
      position: relative;
      background: ${buttonColour};
      border: 0;
      min-width: 100px;
      width: 100%;
      padding: 10px 15px;
      color: ${buttonTextColour};
      text-transform: uppercase;
      border-radius: 3px;
      transition: box-shadow ease 0.3s, transform ease 0.3s;
      cursor: pointer;
    }
    .b-cookie-banner .e-button button:hover {
      transform: translateY(-1px);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
    }
    @media (min-width: 768px) {
      .b-cookie-banner {
        flex-direction: row;
        padding: 15px;
      }
      .b-cookie-banner .e-description a {
        display: inline-block;
      }
      .b-cookie-banner .e-button {
        padding: 0 15px;
        width: auto;
        margin: 0;
      }
      .b-cookie-banner .e-dismiss {
        position: relative;
        top: auto;
        right: auto;
        margin: 15px;
        min-width: 20px;
      }
    }
  `;
  return styles;
}

/**
 * Generate the banner HTML
 *
 * @returns
 */
function generateCookieBanner(msg, linkMsg, termsUrl) {
  var html = `
      <div class="b-cookie-banner">
          <div class="e-description">
              ${msg}
              <a href="${termsUrl}" target="_blank">${linkMsg}</a>
          </div>
          <div class="e-button">
              <button id="accept-btn">Ok</button>
          </div>
          <div id="dismiss-btn" class="e-dismiss"></div>
      </div>
  `;
  return html;
}

/**
 * Accept the cookie banner and store cookie to not display again
 */
function acceptCookies() {
  myStorage.setItem(storageKey, true);
  dismissCookieBanner();
}

/**
 * Dismiss the cookie banner temporarily
 */
function dismissCookieBanner() {
  styleTag.remove();
  bannerTag.remove();
}

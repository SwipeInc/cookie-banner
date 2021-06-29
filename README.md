# Basic Cookie Banner

The script tag has a default set of valuesbut they can all be customised by adding attributes to the script tag it self. Here is a complete list of attributes you can change.
<br /><br />

## ⚙️ Available Attributes

| Attribute                    | Default Value (string)                                 | What it does                                                                                                     |
| ---------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| data&#x2011;terms&#x2011;url | `"https://www.multichoice.com/privacy-cookie-notice/"` | The terms and conditions link location on the banner                                                             |
| data&#x2011;preset           | `"light"`                                              | Allows for an easy switch between light and dark mode with preset colours, but those colours can also be changed |
| data&#x2011;btn              | `"#13b5ea"`                                            | The confirmation button colour                                                                                   |
| data&#x2011;btn&#x2011;text  | `"#fff"`                                               | The text colour on the confirmation button. CSS colour value                                                     |
| data&#x2011;bg               | `"#fff"` or `"#1b1b1b"` for dark mode                  | The banner background colour. CSS colour value                                                                   |
| data&#x2011;text             | `"#1b1b1b"` or `"#fff"` for dark mode                  | The banner text colour. CSS colour value
| data&#x2011;msg              | `"We use cookies to improve your site experience, perform analytics and show you relevant advertising. By clicking “OK”, you agree to the storing of cookies on your device."` | The cookie banner message. Does not include the link text
| data&#x2011;link&#x2011;msg  | `"View our cookie policy"`                             | The banner policy link text
| defer                        |                                                        | Include the standard defer attribute to your script tag so that the script is non-render blocking                |

<br /><br />

We use cookies to improve your site experience, perform analytics and show you relevant advertising. By clicking “OK”, you agree to the storing of cookies on your device.
              <a href="${termsUrl}" target="_blank">View our cookie policy

## 🏁 Example

Here is a simple example of how to add these attributes:

```
<script
   defer
   src="https://swipeinc.github.io/cookie-banner/dist/banner.min.js"
   data-btn="#022b49"
   data-terms-url="https://swipeix.com/terms">
</script>
```
<br />

## 🏷 Google Tag Manager

If you are planning on injecting the script with GTM, create the script programmatically because GTM will strip away any data attributes on the script tag

```
<script>
  (function() {
    var el = document.createElement('script');
    el.setAttribute('src', 'https://swipeinc.github.io/cookie-banner/dist/banner.min.js');
    el.setAttribute('data-terms-url', 'https://swipeix.com/terms');
    el.setAttribute('data-btn', '#022b49');
    document.body.appendChild(el);
  })();
</script>
```

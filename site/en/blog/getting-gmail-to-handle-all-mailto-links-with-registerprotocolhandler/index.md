---
layout: 'layouts/blog-post.njk'
title: Getting Gmail to handle all mailto - links with registerProtocolHandler
description: >
  Thanks to navigator.registerProtocolHandler() you can wire up Gmail as your default mail client for all mailto links.
authors:
  - paulirish
date: 2012-02-07
updated: 2019-02-01

---

If you use Gmail you may become frustrated when you click a `mailto:` link by accident and now your desktop client of Outlook or Mail starts up.

Thanks to `navigator.registerProtocolHandler()` ([which we've covered here before](https://web.dev/registering-a-custom-protocol-handler/)) you can wire up Gmail as your default mail client for all `mailto:` links in Chrome and Firefox.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/klFjlPW7hK25xwqKofQR.jpg", alt="Use Gmail popup screenshot", width="640", height="185" %}
</figure>

Here's how:


1. First, open up a Gmail tab. You __must__ do this from the Gmail tab, not your html5rocks one. :)
1. Open your javascript console (`cmd-opt-j` on Mac, `ctrl-shift-j` on Windows) and enter:
1. `navigator.registerProtocolHandler("mailto", "https://mail.google.com/mail/?extsrc=mailto&url=%s", "Gmail"); `
1. Accept the confirmation from the browser.
1. Click [this mailto: link](mailto:yourbestfriend@example.com?subject=registerProtocolHandler()%20FTW!&amp;body=Check%20out%20what%20I%20learned%20at%20http%3A%2F%2Fupdates.html5rocks.com%2F2012%2F02%2FGetting-Gmail-to-handle-all-mailto-links-with-registerProtocolHandler%0A%0APlus%2C%20flawless%20handling%20of%20the%20subject%20and%20body%20parameters.%20Bonus%20from%20RFC%202368!) to test out your new Gmail mailto hookup!


Boom. Enjoy.

If you ever need to removing this setting, you can do that at `chrome://settings/handlers` in Chrome and `Preferences->Applications->mailto` in Firefox.

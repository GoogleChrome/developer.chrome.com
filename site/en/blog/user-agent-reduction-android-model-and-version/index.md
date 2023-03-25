---
layout: 'layouts/blog-post.njk'
title: Prepare for Chrome's user‑agent reduction
description: >
  Starting in Chrome 110 (February 2023) we are gradually introducing a fixed value for Android version and device model—the default value will always be `Android 10` on a model `K`.
subhead: >
  Chrome is continuing to reduce the information shared in its user-agent string to help protect user's privacy.
date: 2023-02-27
# updated: 2021-02-27
# is_outdated: true
# new_available_content_url: /docs/privacy-sandbox/user-agent/
authors:
  - rowan_m
tags:
  - privacy
# hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/BDoQyU85t0lGiwbxaoe4.png'
thumbnail: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/3VrRwYpBizX3JQA93uzg.png'
alt: >
  Starting in Chrome 110 we are gradually introducing a fixed value for Android version and device model. Instead of seeing something like `Android 13` on `Pixel 7` the default value will always be `Android 10` on model `K`.
sharing_image: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/3VrRwYpBizX3JQA93uzg.png'
---

Starting in Chrome 110 (February 2023) we are gradually introducing a _fixed value for Android version and device model_—the default value will always be `Android 10` on a model `K`.
If you rely on the user-agent to detect a visitor's operating system version, Android device model, or detailed browser version then you may need to take action—read on for the details.

{% YouTube id="ftDVCo8SFD4" %}

The [user-agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) is a string that provides information about the user's browser and their environment—like knowing that a visitor on your site is running Chrome version 110 on Android.
Your browser sends this in an HTTP header and makes it available via JavaScript.

The problem with full user-agent string is that it shares detailed information about the browser by default _on every request_ which is a major factor in allowing cross-site tracking.
Our goal is to reduce the opportunities for passively collecting this data while providing APIs to allow you to actively access data when you need it.


## User-agent reduction so far

We have already started removing some of the user-agent data that's available by default, and replacing it with fixed values.

From [Chrome 101](https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ/m/KyomPLOnAwAJ) we replaced the minor version number with zeros, e.g. <span style="font-family: monospace">Chrome/101<span style="background: #ef9a9a">.3.2.1</span></span> became <span style="font-family: monospace">Chrome/101<span style="background: #a5d6a7">.0.0.0</span></span>.

From [Chrome 107](https://groups.google.com/a/chromium.org/g/blink-dev/c/kC-AeZ1fSdY/m/a_ICuXZRBQAJ) we replaced the desktop operating system version and CPU information with a fixed value for the platform.

<table>
    <tr><td>Mac</td><td>➡</td><td><span style="font-family: monospace; background: #a5d6a7">Macintosh; Intel Mac OS X 10_15_7</span></td></tr>
    <tr><td>Windows</td><td>➡</td><td><span style="font-family: monospace; background: #a5d6a7">Windows NT 10.0; Win64; x64</span></td></tr>
    <tr><td>ChromeOS</td><td>➡</td><td><span style="font-family: monospace; background: #a5d6a7">X11; CrOS x86_64 14541.0.0</span></td></tr>
    <tr><td>Linux</td><td>➡</td><td><span style="font-family: monospace; background: #a5d6a7">X11; Linux x86_64</span></td></tr>
</table>


## Fixed Android version and device model starting from Chrome 110

Starting in [Chrome 110](https://groups.google.com/a/chromium.org/g/blink-dev/c/zVOEHwgyyu4/m/8KljdSN9AQAJ) we are gradually introducing a _fixed value for Android version and device model_.
Instead of seeing something like `Android 13` on `Pixel 7` the default value will _always be_ `Android 10` on a model `K`.

{% Compare 'worse', 'Before: user-agent includes Android version and device model' %}
<span style="font-family: monospace">Mozilla/5.0 (Linux; Android <span style="background: #ef9a9a; font-weight: bold">13</span>; <span style="background: #ef9a9a; font-weight: bold">Pixel 7</span>) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.0.0 Mobile Safari/537.36</span>
{% endCompare %}

{% Compare 'better', 'After: reduced user-agent with fixed Android version and device model' %}
<span style="font-family: monospace">Mozilla/5.0 (Linux; Android <span style="background: #a5d6a7; font-weight: bold">10</span>; <span style="background: #a5d6a7; font-weight: bold">K</span>) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.0.0 Mobile Safari/537.36</span>
{% endCompare %}


## No change to the user-agent format

The user-agent reduction changes the _values_ returned in the user-agent, but the _format_ stays the same.
If you only use the user-agent to read the operating system type or major browser version, that data will continue to update as before and you _do not need to take any action_.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/GXIXCnvSXvaL7MZmHXgw.png", alt="The platform, browser name, browser major version, and mobile indicator parts of the user-agent string continue to update as before.
Operating system type, device model, and browser minor version are static values.
All other portions of the user-agent string remain as is.", width="800", height="317" %}

## Alternatives to user-agent

If you do currently use the more detailed data, it's always good to check if you can [use progressive enhancement or feature detection](https://developer.mozilla.org/docs/Web/HTTP/Browser_detection_using_the_user_agent) instead.

Always remember that the user-agent is just like any other user-provided value—you should validate it and not assume it is accurate.
The user-agent value can be easily changed by the user, extensions, other clients—or may simply not be sent at all.
In most cases, you should be able to _deliver working content to visitors without user-agent data_.


## Request detailed data with User-Agent Client Hints

There are plenty of valid reasons to access detailed user-agent data, such as providing device-specific content, anti-fraud functionality, or fine-grained logging.
If you do need the more detailed data, you can use the [User-Agent Client Hints (UA-CH)](/articles/user-agent-client-hints/) API to access it.
Like user-agent, UA-CH is available via HTTP headers or JavaScript.

You may have already seen the default headers being sent with the `Sec-CH-UA-` prefix that tells you the browser, its major version, the operating system, and if the browser is a mobile device.

⏫ **Default User-Agent Client Hints request headers from Chrome:**

```text
Sec-CH-UA: "Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"
Sec-CH-UA-Mobile: ?1
Sec-CH-UA-Platform: "Android"
```

You can use the `Accept-CH` header in your response to ask for more data.
In this case, you can ask for `Sec-CH-UA-Platform-Version` and `Sec-CH-UA-Model` to get that Android version and device type back in subsequent requests.

⏬ **Response header from your server specifying platform version and model:**

```text
Accept-CH:
  Sec-CH-UA-Platform-Version,
  Sec-CH-UA-Model
```

⏫ **Request headers back from Chrome including Android version and model name:**

```text
Sec-CH-UA-Platform-Version: "13.0.0"
Sec-CH-UA-Model: "Pixel 7"
```

You can do the same thing in JavaScript by calling `getHighEntropyValues()` on the `userAgentData` API, passing in an array of the values you want: `platformVersion` and `model`.
This returns a promise with an object containing the specific values.

```javascript
navigator.userAgentData
 .getHighEntropyValues(
   ['platformVersion', 'model']
 ).then(ua => { console.log(ua)
 });

{
  "platformVersion": "13.0.0",
  "model": "Pixel 7"
}
```

## Cross-origin or initial requests

If you have [cross-origin resources on your page that need these values you can allow access](https://web.dev/migrate-to-ua-ch/#strategy-delegating-hints-to-cross-origin-requests) via the `Permissions-Policy` HTTP header or using the `Delegate-CH` meta tag in your HTML.

If it’s necessary for your site to have these sensitive values on the very first top-level request, you can use the [`Critical-CH` HTTP header](/docs/privacy-sandbox/user-agent/#critical-client-hints) which will tell the browser to retry its initial request with those extra hints added.
This may be helpful for legacy systems that are hard to update, but ideally you should not be relying on these sensitive values to serve your initial HTML.

{% Aside %}

We started gradually introducing the fixed Android version and device in Chrome 110 from mid-February 2023,  to monitor for any potential ecosystem issues.
If you need more time to prepare,  [sign up for the deprecation trial](/origintrials/#/view_trial/2608710084154359809) so you can continue to _receive the legacy user-agent format_ until Chrome 113 (currently scheduled for the end of May 2023).

{% endAside %}


## Learn more

To see the reduced user-agent string in action, check out the following:

*   See the reduced user-agent string for _your_ device on [goo.gle/reduced-ua-demo](https://goo.gle/reduced-ua-demo) 
*   See all the JavaScript and HTTP header User-Agent Client Hints for _your_ device on [goo.gle/ua-ch-demo](https://goo.gle/ua-ch-demo)
*   Send the reduced user-agent string in _your_ browser by enabling the `#reduce-user-agent` [Chrome flag](/docs/web-platform/chrome-flags/).

You can also still [register for the User Agent Reduction origin trial](/origintrials/#/view_trial/-7123568710593282047) to receive the reduced user-agent on your site, although we will _end this trial in early March_ as we continue to ramp up sending the reduced user-agent by default.

We have more resources on the [user-agent reduction landing page](/docs/privacy-sandbox/user-agent/) and you can also raise issues on our dedicated [user-agent-reduction GitHub repo](https://goo.gle/ua-reduction-issues).

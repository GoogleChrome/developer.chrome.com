---
layout: "layouts/doc-post.njk"
title: "Tutorial: Google analytics"
date: 2012-09-18
updated: 2016-10-11
description: >
    Step-by-step instructions on how to track usage of your Extension with Google Analytics.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

This tutorial demonstrates using Google Analytics to track the usage of your extension. If you are
developing a platform app, see [Analytics for Apps][1] since apps have different restrictions from
extensions.

## Requirements {: #toc-requirements }

This tutorial expects that you have some familiarity writing extensions for Google Chrome. If you
need information on how to write an extension, please read the [Getting Started tutorial][2].

You will also need a [Google Analytics account][3] set up to track your extension. Note that when
setting up the account, you can use any value in the Website's URL field, as your extension will not
have an URL of its own.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/0X6Knat4ozKRyF15shTn.png",
       alt="The analytics setup with info for a chrome extension filled out", height="82", width="400" %}

## Installing the tracking code {: #toc-installing }

The standard Google Analytics tracking code snippet fetches a file named `ga.js` from an SSL
protected URL if the current page was loaded using the `https://` protocol. **Chrome extensions and
applications may _only_ use the SSL-protected version of `ga.js`**. Loading `ga.js` over insecure
HTTP is disallowed by Chrome's default [Content Security Policy][4]. This, plus the fact that Chrome
extensions are hosted under the `chrome-extension://` schema, requires a slight modification to the
usual tracking snippet to pull `ga.js` directly from `https://ssl.google-analytics.com/ga.js`
instead of the default location.

Below is a modified snippet for the [asynchronous tracking API][5] (the modified line is bolded):

```js
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
```

You'll also need to ensure that your extension has access to load the resource by relaxing the
default content security policy. The policy definition in your [`manifest.json`][6] might look like:

```json
{
  ...,
  "content_security_policy": "script-src 'self' https://ssl.google-analytics.com; object-src 'self'",
  ...
}
```

Here is a popup page (`popup.html`) which loads the asynchronous tracking code via an external
JavaScript file (`popup.js`) and tracks a single page view:

```html
<!DOCTYPE html>
<html>
 <head>
   ...
  <script src="popup.js"></script>
 </head>
 <body>
   ...
 </body>
</html>
```

```js
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
```

Keep in mind that the string `UA-XXXXXXXX-X` should be replaced with your own Google Analytics
account number.

## Tracking page views {: #toc-tracking-pageviews }

The `_gaq.push(['_trackPageview']);` code will track a single page view. This code may be used on
any page in your extension. When placed on a background page, it will register a view once per
browser session. When placed on a popup, it will register a view once every time the popup is
opened.

By looking at the page view data for each page in your extension, you can get an idea of how many
times your users interact with your extension per browser session:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/3AR714uoz3NIMkuFLmIC.png",
       alt="Analytics view of the top content for a site", height="119", width="300" %}

## Monitoring analytics requests {: #toc-debugging }

To ensure that tracking data from your extension is being sent to Google Analytics, you can inspect
the pages of your extension in the Developer Tools window (see the [debugging tutorial][7] for more
information). As the following figure shows, you should see requests for a file named
**\_\_utm.gif** if everything is set up correctly.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lPW0DjyEMWYnhPc336QN.png",
       alt="Developer Tools window showing the __utm.gif request", height="418", width="683" %}

## Tracking events {: #toc-tracking-events }

By configuring event tracking, you can determine which parts of your extension your users interact
with the most. For example, if you have three buttons users may click:

```html
<button id='button1'>Button 1</button>
<button id='button2'>Button 2</button>
<button id='button3'>Button 3</button>
```

Write a function that sends click events to Google Analytics:

```js
function trackButton(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};
```

And use it as an event handler for each button's click:

```js
var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', trackButtonClick);
}
```

The Google Analytics event tracking overview page will give you metrics regarding how many times
each individual button is clicked:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/qhlPcW6Wh0oQC8csWwrO.png",
       alt="Analytics view of the event tracking data for a site", height="482", width="300" %}

By using this approach, you can see which parts of your extension are under-or-overutilized. This
information can help guide decisions about UI redesigns or additional functionality to implement.

For more information about using event tracking, see the Google Analytics [developer
documentation][8].

## Sample code {: #toc-samplecode }

An example extension that uses these techniques is available in the [samples repository][9].

[1]: /apps/analytics
[2]: /docs/extensions/mv2/getstarted
[3]: http://www.google.com/analytics
[4]: /docs/extensions/mv2/contentSecurityPolicy
[5]: http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
[6]: /docs/extensions/mv2/tabs
[7]: /docs/extensions/mv2/tut_debugging
[8]: https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
[9]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/tutorials/analytics/

---
layout: "layouts/doc-post.njk"
title: "Rich notifications with webKit"
date: 2012-09-17
updated: 2017-01-05
description: How to implement notifications in your Chrome Extension.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

{% Aside 'warning' %}
**Warning:** `webKitNotifications.createHTMLNotification()` in the [web notifications API][1] has
been deprecated. The new [web notifications API][2] only allows text. [Chrome notifications API][3]
will be promoted to stable soon and web notifications will be updated to use the new rich
notifications format.
{% endAside %}

Use rich desktop notifications to notify users that something important has happened. Notifications
appear outside the browser window. As the following snapshots show, the details of how notifications
look and where they're shown depend on the platform.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nbLinHu3r2DVL7DWmssr.png",
       alt="Notifications on Microsoft Windows", height="135", width="330" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/aG2rad4dnaqo3hWMCcvv.png",
       alt="Notifications on Mac OS X", height="135", width="330" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2A4keArJesaukD4UiIvk.png",
       alt="Notifications on Ubuntu Linux", height="135", width="330" %}

You create the notification window using a bit of JavaScript and, optionally, an HTML page packaged
inside your extension.

## Example {: #example }

First, declare the `notifications` permission in your manifest:

```json
{
  "name": "My extension",
  "manifest_version": 2,
  ...
  "permissions": [
    "notifications"
  ],
  ...
  // Note: Because of bug 134315, you must declare any images you
  // want to use with createNotification() as a web accessible resource.
  "web_accessible_resources": [
    "48.png"
  ],
}
```

Then, use `webkitNotifications` object to create notifications:

```js
// Note: There's no need to call webkitNotifications.checkPermission().
// Extensions that declare the notifications permission are always
// allowed create notifications.

// Create a simple text notification:
var notification = webkitNotifications.createNotification(
  '48.png',  // icon url - can be relative
  'Hello!',  // notification title
  'Lorem ipsum...'  // notification body text
);

// Or create an HTML notification:
var notification = webkitNotifications.createHTMLNotification(
  'notification.html'  // html url - can be relative
);

// Then show the notification.
notification.show();
```

## API reference {: #reference }

See the [Desktop Notifications Draft Specification][5].

## Communicating with other views {: #communication }

You can communicate between a notification and other views in your extension using
[extension.getBackgroundPage][6] and [extension.getViews][7]. For example:

```js
chrome.extension.getBackgroundPage().doThing();
```

```js
chrome.extension.getViews({type:"notification"}).forEach(function(win) {
  win.doOtherThing();
});
```

## More examples {: #examples }

You can find a simple example of using notifications in the [examples/api/notifications][8]
directory. For other examples and for help in viewing the source code, see [Samples][9].

Also see html5rocks.com's [notifications tutorial][10]. Ignore the permission-related code; it's
unnecessary if you declare the "notifications" permission.

[1]: http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification
[2]: http://www.w3.org/TR/notifications/
[3]: /docs/extensions/notifications
[4]: http://bugs.chromium.org/p/chromium/issues/detail?id=134315
[5]: http://dev.chromium.org/developers/design-documents/desktop-notifications/api-specification
[6]: /docs/extensions/extension#method-getBackgroundPage
[7]: /docs/extensions/extension#method-getViews
[8]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/notifications/
[9]: /docs/extensions/mv2/samples
[10]: http://www.html5rocks.com/tutorials/notifications/quick/

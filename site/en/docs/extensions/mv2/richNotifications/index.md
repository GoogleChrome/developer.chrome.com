---
layout: "layouts/doc-post.njk"
title: "Rich notifications API"
date: 2014-06-25
updated: 2017-04-27
description: How to show notifications to your Chrome Extension users.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

<div class="aside aside--note"><strong>Platform difference:</strong> In Chrome version 59, notifications appear differently for Mac OS X users. Instead of Chrome's own notifications, users see native Mac OS X notifications. <a href="https://developers.google.com/web/updates/2017/04/native-mac-os-notifications">Learn more in this article</a>.</div>

The [rich notifications API][2] lets you create notifications using templates and show these
notifications to users in the user's system tray:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/tAzH8Og2Lql9nAcIRMOA.png",
       alt="Notifications in system user tray", height="375", width="354" %}

## How they look {: #look }

Rich notifications come in four different flavors: basic, image, list, and progress. All
notifications include a title, message, small icon displayed to the left of the notification
message, and a contextMessage field, which is displayed as a 3rd text field in a lighter color font.

A basic image:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ZNTfa7vVa0sor219W0dk.png",
       alt="Basic notification", height="175", width="479" %}

List notifications display any number of list items:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vFV3s1EW9gAPTog3khPE.png",
       alt="List notification", height="200", width="400" %}

Image notifications include an image preview:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vtc3JD29GPhnAZSjxljc.png",
       alt="Image notification", height="400", width="365" %}

Progress notifications show a progress bar:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/cKPXPoLP0vqqenR88z9M.png",
       alt="Progress notification", height="205", width="389" %}

## How they behave {: #behave }

On Chrome OS, notifications show up in a user's system tray, and stay in the system tray until the
user dismisses them. The system tray keeps a count of all new notifications. Once a users sees the
notifications in the system tray, the count is reset to zero.

Notifications can be assigned a priority between -2 to 2. Priorities < 0 are shown in the ChromeOS
notification center, and produce an error on other platforms. Priority 0 is the default priority.
Priorities > 0 are shown for increasing duration and more high priority notifications can be
displayed in the system tray.

{% Aside %}

**Platform difference:** The `code` priority does not affect the order of notifications in Chrome version 59+ on macOS.

{% endAside %}

In addition to displaying information, all notification types can include up to two action items.
When users click on an action item, your app can respond with the appropriate action. For example,
when the user clicks on "Reply", the email app opens and the user can complete the reply:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/CozjuLjsi01Ch9KNBoAY.png",
       alt="Action in notification", height="275", width="392" %}

## How to develop them {: #develop }

To use this API, call the [notifications.create][3] method, passing in the notification details via
the `options` parameter:

```js
chrome.notifications.create(id, options, creationCallback);
```

The [notifications.NotificationOptions][4] must include a [notifications.TemplateType][5], which
defines available notification details and how those details are displayed.

{% Aside %}

**Consider integrating with GCM!**

[Keep your users informed][6] all the time, even
when your app isn't opened. The [gcm-notifications sample][7] shows a simple
integration between GCM and Rich Notifications API.

{% endAside %}

### Create basic notification {: #basic }

All template types (`basic`, `image`, `list` and `progress`) must include a notification `title` and
`message`, as well as an `iconUrl`, which is a link to a small icon that is displayed to the left of
the notification message.

Here's an example of a `basic` template:

```js
var opt = {
  type: "basic",
  title: "Primary Title",
  message: "Primary message to display",
  iconUrl: "url_to_small_icon"
}
```

### Create image notification {: #image }

The `image` template type also includes an `imageUrl`, which is a link to an image that is previewed
within the notification:

<div class="aside aside--note"><strong>Platform difference:</strong> Images will not be display to users using Chrome version 59+ on Mac OS X.</div>

```js
var opt = {
  type: "basic",
  title: "Primary Title",
  message: "Primary message to display",
  iconUrl: "url_to_small_icon",
  imageUrl: "url_to_preview_image"
}
```

In Chrome Apps, due to a strict [Content Security Policy][8] these URLs must point to a local
resource or use a [blob or data URL][9]. Use a 3:2 ratio for your image; otherwise a black border
frames the image.

### Create list notification {: #list }

The `list` template displays `items` in a list format:

<div class="aside aside--note"><strong>Platform difference:</strong> Only the first list item is displayed to users in Chrome version 59+ on Mac OS X.</div>

```js
var opt = {
  type: "list",
  title: "Primary Title",
  message: "Primary message to display",
  iconUrl: "url_to_small_icon",
  items: [{ title: "Item1", message: "This is item 1."},
          { title: "Item2", message: "This is item 2."},
          { title: "Item3", message: "This is item 3."}]
}
```

### Create progress notification {: #progress }

The `progress` template displays a progress bar where current progress ranges from 0 to 100:

<div class="aside aside--note"><strong>Platform difference:</strong> In Chrome version 59+ on Mac OS X, the progress bar displays as a percentage value in the title of the notification instead of displaying a progress bar.</div>

```js
var opt = {
  type: "progress",
  title: "Primary Title",
  message: "Primary message to display",
  iconUrl: "url_to_small_icon",
  progress: 42
}
```

## Listening for and responding to events {: #events }

All notifications can include event listeners and event handlers that respond to user actions (see
[chrome.events][10]). For example, you can write an event handler to respond to an
[notifications.onButtonClicked][11] event.

Event listener:

```js
chrome.notifications.onButtonClicked.addListener(replyBtnClick);
```

Event handler:

```js
function replyBtnClick {
	//Write function to respond to user action.
}
```

Consider including event listeners and handlers within the [event page][12], so that notifications
can pop-up even when the app or extension isn't running.

[1]: https://developers.google.com/web/updates/2017/04/native-mac-os-notifications
[2]: /docs/extensions/reference/notifications
[3]: /docs/extensions/reference/notifications#method-create
[4]: /docs/extensions/reference/notifications#type-NotificationOptions
[5]: /docs/extensions/reference/notifications#type-TemplateType
[6]: /docs/extensions/reference/gcm
[7]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/apps/samples/gcm-notifications
[8]: /docs/apps/contentSecurityPolicy/
[9]: /docs/apps/app_external
[10]: /docs/extensions/reference/events
[11]: /docs/extensions/reference/notifications#event-onButtonClicked
[12]: /docs/apps/app_lifecycle#create_event_page

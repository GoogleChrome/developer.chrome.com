---
layout: 'layouts/blog-post.njk'
title:  Moving to the native notification system on macOS 
description: >
     As of Chrome 59, notifications will be displayed native notifications on macOS.
authors:
    - paullewis
    - smcgruer
date: 2017-04-26
updated: 2017-04-26
---

Starting in Chrome 59, notifications sent via the [Notifications
API](https://developer.mozilla.org/docs/Web/API/Notifications_API) or the
[chrome.notifications extensions
API](/extensions/notifications) will be shown
directly by the macOS native notification system instead of Chrome's own system.

This change makes Chrome on macOS feel much better integrated into the platform
and fixes a number of long standing bugs, such as Chrome not respecting the
system Do Not Disturb setting.

Below we'll look at the differences this change introduces to the existing
API's.

## Notification center

One of the benefits of this change is that notifications will be displayed in
macOS’s notification center.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/bJ3eMXotTjng4MnD0wuT.png", alt="Google Chrome Notifications will be displayed in the macOS notification center", width="800", height="858" %}
  <figcaption>
    Google Chrome Notifications will be displayed in the macOS notification center
  </figcaption>
</figure>

## Differences
### Icon size and positioning

The appearance of icons will change. They'll be smaller in size and padding is
applied. You may want to consider switching to a transparent background icon
instead of a solid color to be aesthetically pleasing.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Mfh791sWtq1R7FCpakmB.png", alt="Before and after for Chrome on Mac notification icons displayed by Chrome vs. displayed by
    macOS.", width="800", height="200" %}
  <figcaption>
    Before and after for Chrome on Mac notification icons displayed by Chrome vs. displayed by
    macOS
  </figcaption>
</figure>

### Action icons

Before this change action buttons and icons would be displayed in the
notification. With native notifications the action button icons will not be
used and the user will need to hover over the notification and select the "More"
button to see the available actions.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/qKtTwYmyatwwtQKUkmzA.png", alt="Before and after of notification action buttons with icons displayed by
    Chrome vs. displayed by macOS.", width="800", height="200" %}
  <figcaption>
    Before and after of notification action buttons with icons displayed by
    Chrome vs. displayed by macOS
  </figcaption>
</figure>

### Chrome logo

The Chrome logo will always be displayed and cannot be replaced or altered. This
is a requirement for third-party applications on macOS.

### Images

The `image` option will no longer be supported on macOS. If you define an image
property the notification will still be displayed, but it will ignore the image
parameter (See example below).

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/FffRVaIQWVH7pjdMgYzt.png", alt="Before and after of notification image for Chrome on macOS.", width="800", height="376" %}
  <figcaption>
    Before and after of notification image for Chrome on macOS
  </figcaption>
</figure>

You can feature detect image support with the following code:

```js
if ('image' in Notification.prototype) {  
  // Image is supported.
} else {  
  // Image is NOT supported.
}
```

## Chrome extension changes

Chrome extensions have the concept of [notification
templates](/apps/notifications#type-TemplateType)
which will behave differently with this change.

The image notification template will no longer show the image. You should ensure
that images are supplemental and not required to be useful to your users.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/c1AIR6zYuiRvB7C4gqVP.png", alt="Before and after for image templates in the chrome.notification API.", width="800", height="376" %}
  <figcaption>
    Before and after for image templates in the chrome.notification API
  </figcaption>
</figure>

The list notification template will only show the first item in the list. You
may want to consider moving back to the basic notification style and using body
text to summarize the set of changes.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/29yiGcD7jS1k9dOj8LNE.png", alt="Before and after for list templates in the chrome.notification API.", width="800", height="200" %}
  <figcaption>
    Before and after for list templates in the chrome.notification API
  </figcaption>
</figure>

Progress notifications will append a percentage value to the notification title
to indicate the progress instead of a progress bar.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Pi3QrKwlzMlYODjF9ikH.png", alt="Before and after for progress templates in the chrome.notification API.", width="800", height="200" %}
  <figcaption>
    Before and after for progress templates in the chrome.notification API
  </figcaption>
</figure>

The last difference in notification UI is that the `appIconMarkUrl` will
no longer be used on macOS.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/z8E2Mok2T3WhkamMkROT.png", alt="Before and after for appIconMarkUrl in the chrome.notification API.", width="800", height="200" %}
  <figcaption>
    Before and after for appIconMarkUrl in the chrome.notification API
  </figcaption>
</figure>


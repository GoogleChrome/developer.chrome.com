---
title: New in Chrome 68
description: >
  Chrome 68 brings changes to the Add to Home Screen behavior on Android,
  giving you more control. The page lifecycle API tells you when your tab has
  been suspended or restored. And the Payment Handler API makes it possible
  for web-based payment apps to support the Payment Request experience. Let's
  dive in and see what's new for developers in Chrome 68!
layout: 'layouts/blog-post.njk'
date: 2018-07-24
updated: 2018-07-25
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/gSLE88gEVvZOZFmIQbig.png'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-68
---

{% YouTube id='jlbLRsAmKtw' %}

* The [Add to Home Screen behavior](#a2hs) on Android is changing to give
  you more control.
* The [Page Lifecycle API](#page-lifecycle) tells you when your tab has been
  suspended or restored.
* And the [Payment Handler API](#payment-handler) makes it possible for
  web-based payment apps to support the Payment Request experience.

And there's [plenty more](#more)!

I'm Pete LePage. Let's dive in and see what's new for developers in Chrome 68!

Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/67.0.3396.62..68.0.3440.70).

## Add to Home Screen changes {: #a2hs }

If your site meets the
[add to home screen criteria](https://developers.google.com/web/fundamentals/app-install-banners/#criteria),
Chrome will no longer show the add to home screen banner. Instead, you're in
control over when and how to prompt the user.

To prompt the user, listen for the `beforeinstallprompt` event, then, save
the event and add a button or other UI element to your app to indicate it can
be installed.

```javascript
let installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install-button').disabled = false;
});
```

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/b11lXsSixVY6VrDV1Emd.png", alt="", className="float-right", height="417", width="800" %}

When the user clicks the install button, call `prompt()` on the saved
`beforeinstallprompt` event, Chrome then shows the add to home screen dialog.

<br style="clear: both;">

```javascript
btnInstall.addEventListener('click', () => {
  // Update the install UI to remove the install button
  document.querySelector('#install-button').disabled = true;
  // Show the modal add to home screen dialog
  installPromptEvent.prompt();
  // Wait for the user to respond to the prompt
  installPromptEvent.userChoice.then(handleInstall);
});
```

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/e8QdF96TkOMv3pzLAVYN.png", alt="", className="float-right", height="417", width="800" %}

To give you time to update your site Chrome will show a mini-infobar the first
time a user visits a site that meets the add to home screen criteria. Once
dismissed, the mini-infobar will not be shown again for a while.

[**Changes to Add to Home Screen Behavior**](https://developers.google.com/web/updates/2018/06/a2hs-updates)
has the full details, including code samples you can use and more.

## Page Lifecycle API {: #page-lifecycle }

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/uDSah821BWaTBBpcJgam.png", alt="", className="float-right", height="541", width="800" %}

When a user has a large number of tabs running, critical resources such as
memory, CPU, battery and the network can be oversubscribed, leading to a
bad user experience.

If your site is running in the background, the system may suspend it to
conserve resources. With the new Page Lifecycle API, you can now listen for,
and respond to these events.

For example, if a user's had a tab in the background for a while, the browser
may choose to suspend script execution on that page to conserve resources.
Before doing so, it will fire the `freeze` event, allowing you to close open
IndexedDB or network connections or save any unsaved view state. Then, when
the user refocuses the tab, the `resume` event is fired, where you can
reinitialize anything that was torn down.

```javascript
const prepareForFreeze = () => {
  // Close any open IndexedDB connections.
  // Release any web locks.
  // Stop timers or polling.
};
const reInitializeApp = () => {
  // Restore IndexedDB connections.
  // Re-acquire any needed web locks.
  // Restart timers or polling.
};
document.addEventListener('freeze', prepareForFreeze);
document.addEventListener('resume', reInitializeApp);
```

Check out Phil's [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api)
post for **lots** more detail, including code samples, tips and more.
You can find the [spec](https://wicg.github.io/page-lifecycle/spec.html) and an
[explainer doc](https://github.com/WICG/page-lifecycle) on GitHub.

## Payment Handler API {: #payment-handler }

The [Payment Request API](https://www.w3.org/TR/payment-request/) is an open,
standards-based way to accept payments. The
[Payment Handler API](https://www.w3.org/TR/payment-handler/) extends the
reach of Payment Request by enabling web-based payment apps to facilitate
payments directly within the Payment Request experience.

As a seller, adding an existing web-based payment app is as easy as adding an
entry to the `supportedMethods` property.

```javascript
const request = new PaymentRequest([{
  // Your custom payment method identifier comes here
  supportedMethods: 'https://bobpay.xyz/pay'
}], {
  total: {
    label: 'total',
    amount: { value: '10', currency: 'USD' }
  }
});
```

If a service worker that can handle the specified payment method is installed,
it will show up in the Payment Request UI and the user can pay with it.

Eiji has a [great post](https://developers.google.com/web/updates/2018/06/payment-handler-api) that shows
how to implement this for merchant sites, and for payment handlers.

## And more! {: #more }

These are just a few of the changes in Chrome 68 for developers, of course,
there's plenty more.

* Content embedded in an `iframe`
  [requires a user gesture to navigate](https://www.chromestatus.com/feature/5629582019395584)
  the top-level browsing context to a different origin.
* Since Chrome 1, the CSS
  [`cursor` values for `grab` and `grabbing`](https://www.chromestatus.com/feature/5575087101050880)
  have been  prefixed, we now support the standard, un-prefixed values.
  **Finally.**
* And - this is a big one! The HTTP [cache is now ignored when requesting
  updates to a service worker](https://developers.google.com/web/updates/2018/06/fresher-sw), bringing
  Chrome inline with the spec and other browsers.

### New in DevTools

Be sure to check out [New in Chrome DevTools](/blog/new-in-devtools-68), to
learn what's new in for DevTools in Chrome 68.

### Subscribe

Then, click the [subscribe](https://goo.gl/6FP1a5) button on our
[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/), and
you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 69 is released, I'll be right
here to tell you -- what's new in Chrome!

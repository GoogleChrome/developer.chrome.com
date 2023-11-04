---
layout: 'layouts/blog-post.njk'
title: Google Cast for Chrome on Android
description: >
  Chrome on Android now allows mobile sites to present to Google Cast devices using the Presentation API and the Cast Web SDK.
authors:
  - samdutton
date: 2015-12-17
updated: 2019-04-25

---

Imagine being able to use a web app from your phone to present a slide deck to a conference projector — or share images, play games or watch videos on a TV screen — using the mobile web app as a controller.

The latest release of Chrome on Android allows sites to [present to Google Cast devices](https://storage.googleapis.com/castapi/CastHelloVideo/index.html) using the [Cast Web SDK](https://developers.google.com/cast/docs/chrome_sender_setup). This means you can now create Cast sender apps using the Web SDK with Chrome on Android or iOS (or on desktop with the extension) as well as creating apps that use the native Cast SDK for Android and iOS. (Previously, a Google Cast sender application needed the Google Cast Chrome extension, so on Android it was only possible to interact with Cast devices from native apps.)

Below is a brief introduction to building a Cast sender app using the Web SDK. More comprehensive information is available from the [Chrome Sender App Development Guide](https://developers.google.com/cast/docs/chrome_sender_setup).

All pages using Cast must include the Cast library:

```html
<script
  type="text/javascript"
  src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"
></script>
```

Add a callback to handle API availability and initialize the Cast session (make sure to add the handler before the API is loaded!):

```js
window['__onGCastApiAvailable'] = function (isLoaded, error) {
  if (isLoaded) {
    initializeCastApi();
  } else {
    console.log(error);
  }
};

function initializeCastApi() {
  var sessionRequest = new chrome.cast.SessionRequest(applicationID);
  var apiConfig = new chrome.cast.ApiConfig(
    sessionRequest,
    sessionListener,
    receiverListener
  );
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}
```

If you're using the default [Styled Media Receiver](https://developers.google.com/cast/docs/receiver_apps#Styled) application and not a roll-your-own, registered [Custom Receiver](https://developers.google.com/cast/docs/custom_receiver) application, you can create a `SessionRequest` like this:

```js
var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.
  DEFAULT_MEDIA_RECEIVER_APP_ID);
```

The `receiverListener` callback above is executed when one or more devices becomes available:

```js
function receiverListener(e) {
  if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
    // update UI
  }
}
```

Launch a Cast session when your user clicks the Cast icon, as mandated by the [User Experience Guidelines](https://developers.google.com/cast/docs/ux_guidelines#sender-cast-icon-available):

```js
chrome.cast.requestSession(onRequestSessionSuccess,
    onRequestSessionError);

function onRequestSessionSuccess(e) {
  session = e;
}
```

The user will be presented with a device picker:

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/6wfDunXlqwEFO34XGPvH.png", alt="Cast device selection dialog.", width="360", height="640", class="screenshot" %}</figure>

The **route details** dialog is shown when the page is already connected and calls `requestSession()`:

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/0Tw1RySyfEngjWna7mM3.png", alt="Cast route details dialog.", width="360", height="640", class="screenshot" %}</figure>

Once you have a Cast session, you can load media for the selected Cast device, and add a listener for media playback events:

```js
var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL);
var request = new chrome.cast.media.LoadRequest(mediaInfo);
session.loadMedia(
  request,
  onMediaDiscovered.bind(this, 'loadMedia'),
  onMediaError
);

function onMediaDiscovered(how, media) {
  currentMedia = media;
  media.addUpdateListener(onMediaStatusUpdate);
}
```

The `currentMedia` variable here is a `chrome.cast.media.Media` object, which can be used for controlling playback:

```js
function playMedia() {
  currentMedia.play(null, success, error);
}


    // ...
```


A play/pause notification is shown when media is playing:

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/f53fvcWloBo7u9ACYG2L.png", alt="Cast play/pause notification.", width="360", height="640", class="screenshot" %}</figure>

If no media is playing, the notification only has a stop button, to stop casting:

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/TgmE8eZig366AKGuSRCe.png", alt="Cast stop notification.", width="360", height="640", class="screenshot" %}</figure>


The `sessionListener` callback for `chrome.cast.ApiConfig()` (see above) enables your app to join or manage an existing Cast session:

```js
function sessionListener(e) {
  session = e;
  if (session.media.length !== 0) {
    onMediaDiscovered('onRequestSessionSuccess', session.media[0]);
  }
}
```

If Chrome on Android allows casting media from your website but you want to disable this feature so the default casting UI doesn't interfere with your own, use the [disableRemotePlayback](https://w3c.github.io/remote-playback/#idl-def-htmlmediaelement-disableremoteplayback) attribute, available in Chrome 49 and above:

```html
<video disableRemotePlayback src="..."></video>
```

![Alt Sender and receiver devices](https://developers.google.com/web/updates/images/2015/11/presentation-api/screens.jpg)

The [Cast Web SDK guide](https://developers.google.com/cast/docs/chrome_sender_setup) has links to sample apps, and information about Cast features such as session management, text tracks (for subtitles and captions) and status updates.

At present, you can only present to a Cast [Receiver Application](https://developers.google.com/cast/docs/receiver_apps) using the Cast Web SDK, but there is work underway to enable the [Presentation API](https://w3c.github.io/presentation-api/) to be used without the Cast SDK (on desktop and Android) to present any web page to a Cast device without registration with Google. Unlike the Chrome-only Cast SDK, using the standard API will allow the page work with other user agents and devices that support the API.

The Presentation API, along with the [Remote Playback API](https://w3c.github.io/remote-playback/), is part of the [Second Screen Working Group](http://www.w3.org/2014/secondscreen) effort to enable web pages to use second screens to display web content.

These APIs take advantage of the range of devices coming online — including connected displays that run a user agent — to enable a rich variety of applications with a 'control' device and a 'display' device.

We'll keep you posted on progress with implementation.

In the meantime, please let us know if you find bugs or have feature requests: [crbug.com/new](https://crbug.com/new).

## Find out more

- [Get Started with Google Cast SDK](https://developers.google.com/cast/)
- [Presentation API spec](http://www.w3.org/TR/presentation-api)
- [Use cases and requirements](https://github.com/w3c/presentation-api/blob/gh-pages/uc-req.md)
- [The Second Screen Working Group](http://www.w3.org/2014/secondscreen/)
- [Remote Playback API](https://w3c.github.io/remote-playback)

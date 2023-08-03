---
layout: 'layouts/blog-post.njk'
title: PostMessage for TWA
description: >
  From Chrome 115 Trusted Web Activities (TWA) can send messages using postMessages. This article walks through the setup needed to communicate between your app and the web.
date: 2023-07-26
updated: 2023-07-28
authors:
  - elabadysayed
tags:
  - android
  - pwa
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/pHKae5vdcypiXwqM6GMa.jpg'
alt: >
  A group of envelopes scattered on a table.
---

From Chrome 115 [Trusted Web Activities (TWA)](/docs/android/trusted-web-activity/) can send messages using postMessages. This article walks through the setup needed to communicate between your app and the web.

By the end of this guide you will:
- Understand how the client and webcontent validation works.
- Know how to initialize the communication channel between client and webcontent.
- Know how to send messages to and receive messages from webcontent.

To follow this guide you'll need:

- To add the latest [androidx.browser](https://developer.android.com/jetpack/androidx/releases/browser) (min v1.6.0-alpha02) library to your build.gradle file.
- Chrome version 115.0.5790.13 or greater for TWA.

The [`window.postMessage()`](https://developer.mozilla.org/docs/Web/API/Window/postMessage) method safely enables cross-origin communication between [Window](https://developer.mozilla.org/docs/Web/API/Window) objects. For example, between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.

Usually, scripts on different pages are allowed to access each other only if the pages they originate from the same origin, they share the same protocol, port number, and host (also known as the [same-origin policy](https://developer.mozilla.org/docs/Web/Security/Same-origin_policy)). The `window.postMessage()` method  provides a controlled mechanism to securely communicate between different origins. This can be useful for implementing chat applications, collaborative tools and others. For example, a chat application could use `postMessage` to send messages between users who are on different websites.
Using `postMessage` in [Trusted Web Activities (TWA)](/docs/android/trusted-web-activity/) can be a bit tricky, this guide  walks you through how to use postMessage in TWA client to send messages to and receive messages from the webpage.



## Add the app to web validation

In order for the postMessage to work it requires a valid relationship between a website and the Trusted Web Activity app launching this site, this can be done with [Digital Asset Links](https://developers.google.com/digital-asset-links) (DAL) by adding the app’s [package name](https://developer.android.com/build/configure-app-module#set-application-id) in your [`assetlinks.json`](https://developer.android.com/training/app-links/verify-android-applinks) file with relation as `use_as_origin` so it will be as following:

```python
[{
  "relation": ["delegate_permission/common.use_as_origin"],
  "target" : { "namespace": "android_app", "package_name": "com.example.app", "sha256_cert_fingerprints": [""] }
}]
```

{% Aside %}
More info on configuring Digital Asset Links on Trusted Web Activities [here](/docs/android/trusted-web-activity/quick-start/#creating-your-asset-link-file).
{% endAside %}

Note that setup on the origin associated with the TWA, it is required to provide an origin for the [MessageEvent.origin](https://developer.mozilla.org/docs/Web/API/MessageEvent/origin) field, but `postMessage` can be used to communicate with other sites that don’t include the Digital Assets Link. For example, if you own `www.example.com` you will have to prove that through DAL but you can communicate with any other websites, `www.wikipedia.org` for example.

## Add the PostMessageService to your manifest

To receive `postMessage` communication you need to setup the service, you do so by adding the `[PostMessageService]`(https://developer.android.com/reference/androidx/browser/customtabs/PostMessageService) in your Android manifest:

```xml
<service android:name="androidx.browser.customtabs.PostMessageService"
android:exported="true"/>
```

## Get a CustomTabsSession instance

After adding the service to the manifest, use the [CustomTabsClient](https://developer.android.com/reference/kotlin/androidx/browser/customtabs/CustomTabsClient) class to bind the service. Once connected you can use the provided client for creating a new session as follows.
[CustomTabsSession](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession) is the core class for handling the postMessage API. The following code shows how once the service is connected, the client is used to create a new session, this session is used to `postMessage`:

```java
private CustomTabsClient mClient;
private CustomTabsSession mSession;

// We use this helper method to return the preferred package to use for
// Custom Tabs.
String packageName = CustomTabsClient.getPackageName(this, null);

// Binding the service to (packageName).
CustomTabsClient.bindCustomTabsService(this, packageName, new CustomTabsServiceConnection() {
 @Override
 public void onCustomTabsServiceConnected(@NonNull ComponentName name,
     @NonNull CustomTabsClient client) {
   mClient = client;

   // Note: validateRelationship requires warmup to have been called.
   client.warmup(0L);

   mSession = mClient.newSession(customTabsCallback);
 }

 @Override
 public void onServiceDisconnected(ComponentName componentName) {
   mClient = null;
 }
});
```

You are now wondering what’s this `customTabsCallback` instance right? We will be creating this in the next section.
## Create CustomTabsCallback

[CustomTabsCallback](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsCallback) is a callback class for CustomTabsClient to get messages regarding events in their custom tabs. One of these events is `onPostMessage` and this gets called when the app receives a message from the web. Add the callback to the client to initialize the postMessage channel to start communication, as shown in the following code.

```java
private final String TAG = "TWA/CCT-PostMessageDemo";
private Uri SOURCE_ORIGIN = Uri.parse("my-app-origin-uri");
private Uri TARGET_ORIGIN = Uri.parse("website-you-are-communicating-with");

// It stores the validation result so you can check on it before requesting postMessage channel, since without successful validation it is not posible to use postMessage.
boolean mValidated;

CustomTabsCallback customTabsCallback = new CustomTabsCallback() {

// Listens for the validation result, you can use this for any kind of
// logging purposes.
 @Override
 public void onRelationshipValidationResult(int relation, @NonNull Uri requestedOrigin,
     boolean result, @Nullable Bundle extras) {
   // If this fails:
   // - Have you called warmup?
   // - Have you set up Digital Asset Links correctly?
   // - Double check what browser you're using.
   Log.d(TAG, "Relationship result: " + result);
   mValidated = result;
 }

// Listens for any navigation happens, it waits until the navigation finishes
// then requests post message channel using
// CustomTabsSession#requestPostMessageChannel(sourceUri, targetUri, extrasBundle)

// The targetOrigin in requestPostMessageChannel means that you can be certain their messages are delivered only to the website you expect.
 @Override
 public void onNavigationEvent(int navigationEvent, @Nullable Bundle extras) {
   if (navigationEvent != NAVIGATION_FINISHED) {
     return;
   }

   if (!mValidated) {
     Log.d(TAG, "Not starting PostMessage as validation didn't succeed.");
   }

   // If this fails:
   // - Have you included PostMessageService in your AndroidManifest.xml ?
boolean result = mSession.requestPostMessageChannel(SOURCE_ORIGIN, TARGET_ORIGIN, new Bundle());
   Log.d(TAG, "Requested Post Message Channel: " + result);
 }

// This gets called when the channel we requested is ready for sending/receiving messages.
 @Override
 public void onMessageChannelReady(@Nullable Bundle extras) {
   Log.d(TAG, "Message channel ready.");

   int result = mSession.postMessage("First message", null);
   Log.d(TAG, "postMessage returned: " + result);
 }

// Listens for upcoming messages from Web.
 @Override
 public void onPostMessage(@NonNull String message, @Nullable Bundle extras) {
   super.onPostMessage(message, extras);
// Handle the received message.

 }
};
```


## Communicating from the web

Now we can send and receive messages from our host app, how do we do the same from the web? Communication has to start from the host app, then the web page needs to get the port from the first message. This port is used to communicate back. Your JavaScript file will look something like the following example:

```javascript
window.addEventListener("message", function (event) {
  // We are receiveing messages from any origin, you can check of the origin by
  // using event.origin

  // get the port then use it for communication.
  var port = event.ports[0];
  if (typeof port === 'undefined') return;

  // Post message on this port.
  port.postMessage("Test")

  // Receive upcoming messages on this port.
  port.onmessage = function(event) {
    console.log("[PostMessage1] Got message" + event.data);
  };
});
```

You can find a full complete sample [here](https://github.com/GoogleChrome/android-browser-helper/tree/main/demos/twa-post-message)

{% Aside 'caution' %}
If you do expect to receive messages from other sites, always verify the sender's identity using the origin and possibly source properties. Any window (including, for example, http://evil.example.com) can send a message to any other window, and you have no guarantees that an unknown sender will not send malicious messages. Having verified identity, however, you still should always verify the syntax of the received message. [More info](https://developer.mozilla.org/docs/Web/API/Window/postMessage).
{% endAside %}

Photo by <a href="https://unsplash.com/@joannakosinska">Joanna Kosinska</a> on <a href="https://unsplash.com/s/photos/envelopes">Unsplash</a>


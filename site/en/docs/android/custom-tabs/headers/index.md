---
layout: "layouts/doc-post.njk"
title: How to add extra HTTP Request Headers to Custom Tab Intents
date: 2020-08-12
updated: 2022-10-25
description: Guide for adding HTTP CORS headers in Custom Tab Intents.
authors:
  - pavoldrotar
---

HTTP requests contain headers such as User-Agent or Content-Type. Apart from headers attached by
browsers, Android apps may add extra headers, like Cookie or Referrer through the 
[`EXTRA_HEADERS`][1] Intent extra. For security reasons, Chrome filters some of the extra headers
depending on how and where an intent is launched.

[Cross-origin][2] requests require an additional layer of security as the client and server are
not owned by the same party. This guide discusses launching such requests through Chrome
[custom tabs][3], i.e. intents launched from apps that open a URL in the browser tab. Until Chrome
83, developers could add any headers when launching a Custom Tab. From version 83 onward, Chrome
started filtering all except [approvelisted][4] cross-origin headers, since non-approvelisted headers
posed a security risk. Starting with Chrome 86, it is possible to attach non-approvelisted headers to
cross-origin requests, when the server and client are related using a [digital asset link][5].
This behaviour is summarised in the following table:

**Chrome version**     | **CORS headers allowed**
---------------------- | ----------------------
before Chrome 83       | approvelisted, non-approvelisted
Chrome 83 to Chrome 85 | approvelisted
from Chrome 86 onwards | approvelisted, non-approvelisted when a digital asset link is set up

**Table 1.:** Filtering of non-approvelisted CORS headers.


This article shows how to set up a verified connection between the server and client and use that
to send approvelisted as well as non-approvelisted http headers. You can skip to
[Adding Extra Headers to CustomTab Intents](#adding-extra-headers) for the code.

## Background

### approvelisted vs. Non-approvelisted CORS Request Headers
[Cross-Origin Resource Sharing (CORS)][6] allows a web application from one origin to request
resources of a different origin. The list of **CORS-approvelisted** headers is maintained in the
[HTML Standard][7]. Example approvelisted headers are shown in the next table:

**Header**       | **Description**
---------------- | ----------------------
accept-language  | advertises natural languages the client understands
content-language | describes language intended for the current audience
content-type     | indicates the media type of the resource

**Table 2.:** Example approvelisted CORS headers.

The approvelisted headers are considered safe because they don't contain sensitive 
user information and are unlikely to cause the server to perform potentially damaging operations.

Examples of non-approvelisted headers are shown in the following table:

**Header**   | **Description**
-------------| ----------------------
bearer-token | authenticates client at a server
origin       | indicates origin of request
cookie       | contains cookies set by server

**Table 3.:** Example non-approvelisted CORS headers.

Attaching non-approvelisted headers to CORS requests is discouraged by the HTML standard and servers 
assume that cross-origin requests contain only approvelisted headers. Sending non-approvelisted headers
from cross-origin domains would allow malicious third-party apps to craft headers that misuse user
cookies that Chrome (or another browser) stores and attaches to requests. The cookies could 
authenticate malicious server transactions that would otherwise not be possible.

### Attaching CORS approvelisted headers to Custom Tabs requests
[Custom Tabs][8] are a special way of launching web pages in a customised browser tab. Custom Tab
intents can be created using `CustomTabsIntent.Builder()`. You can also attach headers to these
intents using a `Bundle` with the [`Borwser.EXTRA_HEADERS` flag][9]:


```java
CustomTabsIntent intent = new CustomTabsIntent.Builder(session).build();

Bundle headers = new Bundle();
headers.putString("bearer-token", "Some token");
headers.putString("redirect-url", "Some redirect url");   
intent.intent.putExtra(Browser.EXTRA_HEADERS, headers);

intent.launchUrl(Activity.this, Uri.parse("http://www.google.com"));
```

We can always attach approvelisted headers to custom tabs CORS requests. However, Chrome filters 
non-approvelisted headers by default. Although other browsers may have different behaviour, 
developers should expect non-approvelisted headers to be blocked in general.

The supported way of including non-approvelisted headers in custom tabs is to first verify the
cross-origin connection using a digital access link. The next section shows how to set these
up and launch a Custom Tabs intent with the required headers. 

## Adding Extra Headers to CustomTab Intents {: #adding-extra-headers }

### Set up digital asset links
To allow non-approvelisted headers to be passed through custom tab intents, it is necessary to set
up a digital asset link between the android and web application that verifies that the author
owns both applications.

Follow the [official guide][10] to set up a digital asset link. For the link relation use 
"delegate_permission/common.use_as_origin"` which indicates that both apps belong to the same 
origin once the link is verified.

### Create Custom Tab Intent with Extra Headers
There are multiple ways for creating a [custom tabs intent][11]. You can use the builder available
in androidX by adding the library to the build dependencies:

```groovy
implementation 'androidx.browser:browser:1.2.0'
```

Build the intent and add extra headers:

```java
CustomTabsIntent constructExtraHeadersIntent(CustomTabsSession session) {
    CustomTabsIntent intent = new CustomTabsIntent.Builder(session).build();

    // Example non-cors-approvelisted headers.
    Bundle headers = new Bundle();
    headers.putString("bearer-token", "Some token");
    headers.putString("redirect-url", "Some redirect url");
    intent.intent.putExtra(Browser.EXTRA_HEADERS, headers);
    return intent;
}
```
### Set up a Custom Tabs Connection to Validate the Asset Link

A Custom Tabs connection is used for setting up a `CustomTabsSession` between the app and the
Chrome tab. We need the session to verify that the app and web app belong to the same origin.
The verification only passes if the digital asset links were set up correctly.

It is encouraged to call `CustomTabsClient.warmup()`. It allows the browser application to
pre-initialize in the background and speed up the URL opening process.

```java
// Set up a connection that warms up and validates a session.
CustomTabsServiceConnection connection = new CustomTabsServiceConnection() {
    @Override
    public void onCustomTabsServiceConnected(@NonNull ComponentName name, 
        @NonNull CustomTabsClient client) {
        // Create session after service connected.
        mSession = client.newSession(callback);
        client.warmup(0);
        // Validate the session as the same origin to allow cross origin headers.
        mSession.validateRelationship(CustomTabsService.RELATION_USE_AS_ORIGIN, 
            Uri.parse(url), null);
    }
    @Override
    public void onServiceDisconnected(ComponentName componentName) { }
};
```

### Set up a Callback that Launches the Intent after Validation

The `CustomTabsCallback` was passed into the session. We set up its
`onRelationshipValidationResult()` to launch the previously created `CustomTabsIntent`
once the origin verification succeeds.

```java
// Set up a callback that launches the intent after session validated.
CustomTabsCallback callback = new CustomTabsCallback() {
    @Override
    public void onRelationshipValidationResult(int relation, @NonNull Uri requestedOrigin, 
        boolean result, @Nullable Bundle extras) {
        // Launch custom tabs intent after session was validated as the same origin.
        CustomTabsIntent intent = constructExtraHeadersIntent(mSession);
        intent.launchUrl(MainActivity.this, Uri.parse(url));
    }
};
```

### Bind the custom tabs service connection

Binding the service launches the service and the connection's `onCustomTabsServiceConnected()`
will be called eventually. Don't forget to unbind the service appropriately. Binding and unbinding
is commonly done in the `onStart()` and `onStop()` activity lifecycle methods.

```java
// Bind the custom tabs service connection.
// Call this in onStart()
CustomTabsClient.bindCustomTabsService(this,
    CustomTabsClient.getPackageName(MainActivity.this, null), connection);

// …
// Unbind the custom tabs service.
// Call this in onStop().
unbindService(connection);
```

### Demo application code

You can find more details about Custom Tabs Service [here][12]. See the
[android-browser-helper][13] GitHub repository for a working example app.

## Summary
This guide demonstated how to add arbitrary headers to custom tabs CORS requests.
approvelisted headers can be attached to every custom tabs CORS request. Non-approvelisted headers are
generally considered unsafe in CORS requests and chrome filters them by default. Attaching them is
allowed only for clients and servers of the same origin, verified by a digital asset link.

[1]: https://developer.android.com/reference/android/provider/Browser#EXTRA_HEADERS
[2]: https://docs.google.com/document/d/1sN6Y31giDbdGj6R4p3QJ20gD1ggBIosae7yrsSZ3Ins/edit#heading=h.ey2vxjsxytw6
[3]: /docs/android/custom-tabs/
[4]: https://fetch.spec.whatwg.org/#cors-safelisted-request-header
[5]: https://developers.google.com/digital-asset-links/v1/getting-started
[6]: https://developer.mozilla.org/docs/Web/HTTP/CORS
[7]: https://fetch.spec.whatwg.org/#cors-safelisted-request-header
[8]: /docs/android/custom-tabs/
[9]: https://developer.android.com/reference/android/provider/Browser#EXTRA_HEADERS
[10]: https://developers.google.com/digital-asset-links/v1/getting-started
[11]: /docs/android/custom-tabs/
[12]: /docs/android/custom-tabs/integration-guide#connect_to_the_custom_tabs_service
[13]: https://github.com/GoogleChrome/android-browser-helper/tree/master/demos


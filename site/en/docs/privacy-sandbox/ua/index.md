---
layout: "layouts/doc-post.njk"
title: User-Agent Strings
date: 2014-02-28
updated: 2023-09-25
description: >
  Reference information about the User-Agent string that Chrome sends in
  Android, iOS, and WebView contexts.
---


A browser's User-Agent string (UA) helps identify which browser is being used, what version, and on
which operating system. When feature detection APIs are not available, use the UA to customize
behavior or content to specific browser versions.

Like all other browsers, Chrome for Android sends this information in the `User-Agent` HTTP header
every time it makes a request to any site. It's also available in the client through JavaScript
using the `navigator.userAgent` call.

This page shows some examples. You can also go to the [User Agent string demo](https://get-some-ua-strings.glitch.me) using any device and get the UA string.

<table>
  <thead>
    <tr>
      <th>Platform</th>
      <th>Device</th>
      <th>UA string</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">Android</td>
      <td style="vertical-align: top;">Phone</td>
      <td style="vertical-align: top;"><pre>Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141
Mobile Safari/537.36
</pre></td>
    </tr>
    </tbody>
    </table>
## Chrome for Android

[Chrome for Android][1] reports its UA in the following formats, depending on whether the device is
a phone or a tablet.

**Phone UA (Android):**

<pre>Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141
Mobile Safari/537.36
</pre>



**Tablet UA:**

iPad

<pre>Mozilla/5.0 (iPhone; CPU iPad OS 16_3 like Mac OS X) 
AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/117.0.5938.117 
Mobile/15E148 Safari/604.1</pre>



Here's an example of the Chrome user agent string on a Galaxy Nexus:

```text
Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) 
AppleWebKit/535.19 (KHTML, like Gecko) 
Chrome/18.0.1025.133 Mobile Safari/535.19
```

Here's an example of the Chrome user agent string on a Galaxy S8

<pre>Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Chrome/87.0.4280.141 Mobile Safari/537.36</pre>


If you are parsing user agent strings using regular expressions, the following can be used to check
against Chrome on Android phones and tablets:

- **Phone pattern:** `'Android' + 'Chrome/[.0-9]* Mobile'`
- **Tablet pattern:** `'Android' + 'Chrome/[.0-9]* (?!Mobile)'`

## Chrome for iOS

The UA in Chrome for iOS is the same as the Mobile Safari user agent, with `CriOS/<ChromeRevision>`
instead of `Version/<VersionNum>`.

Here's an example of the **Chrome** UA on iPhone:

<pre><code>Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) 
AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/117.0.5938.117 
Mobile/15E148 Safari/604.1</pre>

For comparison, the **Mobile Safari** UA:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
AppleWebKit/605.1.15 (KHTML, like Gecko)
Version/16.6 Safari/605.1.15
```
---above two from my phone/website --

Up to Chrome 84, when the Request Desktop Site feature is enabled, the **Desktop Safari** UA is
sent:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4)
AppleWebKit/600.7.12 (KHTML, like Gecko)
Version/8.0.7 Safari/600.7.12
```

Starting from Chrome 85, when the Request Desktop Site feature is enabled, the UA is the same as the
**Desktop Safari** UA with `CriOS/<ChromeMajorRevision>` being added:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5)
AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/85
Version/11.1.1 Safari/605.1.15
```

From Chrome Macbook desktop:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/117.0.0.0 Safari/537.36
```

From Safari deskop on Macbook

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
AppleWebKit/605.1.15 (KHTML, like Gecko)
Version/16.6 Safari/605.1.15
```

## WebView on Android

The Android 4.4 (KitKat) [Chromium-based WebView][2] adds **Chrome/\_version\_** to the user agent
string.

Old WebView UA:

```text
Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP)
AppleWebKit/534.30 (KHTML, like Gecko)
Version/4.0 Safari/534.30
```

**WebView UA in KitKat to Lollipop**

<pre><code>Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 <mark>Chrome/30.0.0.0</mark> Mobile Safari/537.36</code></pre>

If you're attempting to differentiate between the WebView and Chrome for Android, you should look
for the presence of the **Version/\_X.X\_** string in the WebView user-agent string. Don't rely on
the specific Chrome version number (for example, 30.0.0.0) as the version numbers changes with each
release.

**WebView UA in Lollipop to Android 10**

<pre><code>Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; <mark>wv</mark>)
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 <mark>Chrome/43.0.2357.65</mark> Mobile Safari/537.36</code></pre>

**WebView UA in Android 10 and above**

In the newer versions of WebView, you can differentiate the WebView by looking for the `wv` field as
highlighted in the following string.

<pre><code>Mozilla/5.0 (Linux; U; Android 10; SM-G960F Build/QP1A.190711.020; <mark>wv</mark>)
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 Chrome/95.0.4638.50 Mobile Safari/537.36 OPR/60.0.2254.59405</code></pre>

[1]: https://play.google.com/store/apps/details?id=com.android.chrome
[2]: /docs/multidevice/webview/

## General formats

Chrome on desktop

<pre>Mozilla/5.0 (<unifiedPlatform>) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/<majorVersion>.0.0.0 Safari/537.36</pre>

Chrome on Windows desktop
<!-- mine -->

<pre>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36</pre>

Chrome on mobile and tablet

<pre>Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/<majorVersion>.0.0.0 <deviceCompat> Safari/537.36</pre>
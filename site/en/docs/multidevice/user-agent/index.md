---
layout: "layouts/doc-post.njk"
title: User-Agent Strings
date: 2014-02-28
updated: 2023-10-18
description: >
  Reference information about the User-Agent string that Chrome sends in
  Android, iOS, and WebView contexts.
---

A browser's User-Agent string (UA) helps identify which browser is being used, what version, and on which operating system. When feature detection APIs are not available, use the UA to customize behavior or content to specific browser versions.

Like all other browsers, Chrome for Android sends this information in the `User-Agent` HTTP header every time it makes a request to any site. It's also available in the client through JavaScript using the `navigator.userAgent` call.

Chrome has reduced the amount of data returned in the User-Agent string. However, Chrome reduced the strings in [stages](#user-agent-reduction-stages), so you will see different strings returned for any users running versions of Chrome older than 113.

The new strings follow this general format: 

<pre>
Mozilla/5.0 (<strong>&lt;unifiedPlatform></strong>) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/<strong>&lt;majorVersion>.0.0.0 &lt;deviceCompat></strong> Safari/537.36
</pre>

{% Aside %}
For information on the rationale behind User-Agent reduction in Chrome and the introduction of the User Agent Client Hints API, read the [explainer on GitHub](https://github.com/WICG/ua-client-hints).
{% endAside %}

The following table explains each of the tokens in the new User-Agent string.

<table>
<tr>
    <th><strong>Post-Reduction Token (current)</strong></th>
    <th><strong>Description</strong></th>
</tr>
  <tr>
    <td style="vertical-align: top;"><code>&lt;deviceCompat&gt;</code>
    <td style="vertical-align: top;">
      Device form factor
      <p>The possible values are:
      <ul>
        <li><code>"Mobile"</code>
        <li><code>""</code> (empty string, used by tablets and desktop)
      </ul>
  <tr>
    <td style="vertical-align: top;"><code>&lt;majorVersion&gt;</code>
    <td style="vertical-align: top;">Chrome major version
  <tr>
    <td style="vertical-align: top;"><code>&lt;unifiedPlatform&gt;</code>
    <td style="vertical-align: top;">
      The intersection of <code>&lt;platform&gt;</code>,
      <code>&lt;oscpu&gt;</code>, <code>&lt;androidVersion&gt;</code>,
      and <code>&lt;deviceModel&gt;</code>, depending on device.
      <p>The possible desktop values* are:
      <ul>
        <li><code>Windows NT 10.0; Win64; x64</code>
        <li><code>Macintosh; Intel Mac OS X 10_15_7</code>
        <li><code>X11; Linux x86_64</code>
        <li><code>X11; CrOS x86_64 14541.0.0</code>
        <li><code>Fuchsia</code>
      </ul>
      <p>The possible mobile values* are:
      <ul>
        <li><code>Linux; Android 10; K</code>
      </ul>
      <p><em>*These are fixed values; they will
        not update even if a user is on an updated operating system
        or device.</em></p>
  <tr>
    <td style="vertical-align: top;"><strong>Token before UA String reduction</strong>
    <td style="vertical-align: top;"><strong>Description</strong>
  <tr>
    <td style="vertical-align: top;"><code>&lt;androidVersion&gt;</code>
    <td style="vertical-align: top;">Android major version
  <tr>
    <td style="vertical-align: top;"><code>&lt;deviceModel&gt;</code>
    <td style="vertical-align: top;">Android device model
  <tr>
    <td style="vertical-align: top;"><code>&lt;minorVersion&gt;</code>
    <td style="vertical-align: top;">Chrome MINOR.BUILD.PATCH Refer to <a href="https://www.chromium.org/developers/version-numbers/">version numbers</a>.
  <tr>
    <td style="vertical-align: top;"><code>&lt;oscpu&gt;</code>
    <td style="vertical-align: top;">Device operating system and (optionally) CPU architecture
  <tr>
    <td style="vertical-align: top;"><code>&lt;platform&gt;</code>
    <td style="vertical-align: top;">Underlying device platform
  
</table>

[Chromium.org](https://www.chromium.org/updates/ua-reduction/) has more detail.

If you need data that's no longer in the UA string, the [User Agent Client Hints API](https://web.dev/migrate-to-ua-ch/) provides some, including:

- `Sec-CH-UA`: browser name and major/significant version
- `Sec-CH-UA-Mobile`: boolean value indicating a mobile device
- `Sec-CH-UA-Platform`: operating system name

This chromium.org page [maps tokens to User Agent Client Hints](https://www.chromium.org/updates/ua-reduction/#ua-token-to-ua-ch-mapping).

## Examples of new UA strings in Chrome

### Chrome on desktop

#### Format: 

<pre>Mozilla/5.0 (&lt;unifiedPlatform>) AppleWebKit/537.36
(KHTML, like Gecko)
Chrome/&lt;majorVersion>.0.0.0 Safari/537.36</pre>

#### Examples:

**Mac desktop**

<pre>
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
(KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36
</pre>

**Windows desktop**

<pre>
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
(KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36
</pre>

For user-agent examples from Chrome 107 and earlier, visit [chromium.org updates](https://www.chromium.org/updates/ua-reduction/#updates).

### Chrome on Android

#### Format:

<pre>Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/&lt;majorVersion>.0.0.0 &lt;deviceCompat> Safari/537.36</pre>

**Example**:

<pre>
Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/117.0.0.0. Mobile Safari/537.36
</pre> 

If you are parsing User-Agent strings using regular expressions, the following can be used to check against Chrome on Android phones and tablets:

- **Phone pattern:** `'Android' + 'Chrome/[.0-9]* Mobile'`
- **Tablet pattern:** `'Android' + 'Chrome/[.0-9]* (?!Mobile)'`

### Chrome on iOS

**Example**

<pre>
Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/
605.1.15 (KHTML, like Gecko) CriOS/118.0.5993.69 Mobile/15E148
Safari/604.1
</pre>


## WebView on Android

The Android 4.4 (KitKat) [Chromium-based WebView][2] adds **<code>Chrome/<i>version</i></code>** to the User-Agent string.

Old WebView UA:

```text
Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP)
AppleWebKit/534.30 (KHTML, like Gecko)
Version/4.0 Safari/534.30
```

**WebView UA in KitKat to Lollipop**

<pre>Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/<i>BuildID</i>) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 <mark>Chrome/30.0.0.0</mark> Mobile Safari/537.36</pre>

If you're attempting to differentiate between the WebView and Chrome for Android, you should look
for the presence of the **<code>Version/_X.X_</code>** string in the WebView User-Agent string. Don't rely on the specific Chrome version number (for example, 30.0.0.0) as the version numbers change with each release.

**WebView UA in Lollipop to Android 10**

<pre><code>Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; <mark>wv</mark>)
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 <mark>Chrome/43.0.2357.65</mark> Mobile Safari/537.36</code></pre>

**WebView UA in Android 10 and above**

In the newer versions of WebView, you can differentiate the WebView by looking for the `wv` field as highlighted in the following string.

<pre><code>Mozilla/5.0 (Linux; U; Android 10; SM-G960F Build/QP1A.190711.020; <mark>wv</mark>)
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 Chrome/95.0.4638.50 Mobile Safari/537.36 OPR/60.0.2254.59405</code></pre>

[1]: https://play.google.com/store/apps/details?id=com.android.chrome
[2]: /docs/multidevice/webview/

## User-Agent reduction stages

If a user is on a version of Chrome from 101 and up to 113, you'll see a partially reduced User-Agent string.

- Chrome 101 shipped reduced Chrome MINOR.BUILD.PATCH version numbers (“0.0.0”), which applies to all page loads on desktop and mobile OSes.

- Chrome 107 began rollout of reduced Desktop UA string and related JavaScript APIs (`navigator.userAgent`, `navigator.appVersion`, `navigator.platform`). The reduced UA string applies to all page loads on desktop OSes.

- Chrome 110 began rollout of reduced Android Mobile (and Tablet) UA string and related JavaScript APIs. The reduced UA string applies to all page loads on Android.

- Chrome 113 and newer return the fully reduced User-Agent string and all page loads receive the reduced string and related JavaScript APIs.

[User-Agent Reduction](https://www.chromium.org/updates/ua-reduction/) provides more detail.
<!-- ## General formats


## UA strings on Chrome versions before reduction

Here are some examples of UA strings on older devices where Chrome has not been updated:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Platform</th>
      <th>Device</th>
      <th style="text-align: left;">UA string</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="galaxy" style="vertical-align: top;">Android (Galaxy S5) (request desktop)</td>
      <td style="vertical-align: top;">Phone</td>
      <td style="vertical-align: top;"><pre>Mozilla/5.0 (X11; Linux x86_64) 
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/67.0.3396.87 
Safari/537.36
</pre></td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Android</td>
      <td style="vertical-align: top;">Phone</td>
      <td style="vertical-align: top;"><pre>Mozilla/5.0 (Linux; Android 8.0.0;
SM-G955U Build/R16NW)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/87.0.4280.141
Mobile Safari/537.36
</pre></td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Android</td>
      <td style="vertical-align: top;">Tablet</td>
      <td style="vertical-align: top;"><pre>Mozilla/5.0 (Linux; Android 7.1.1;
SM-T550)
AppleWebKit/537.36 KHTML, like Gecko)
Chrome/93.0.4577.62
Safari/537.36</pre></td>
    </tr>
  </tbody>
</table>

### Comparing mobile Safari user-agent strings

For comparison, the **Mobile Safari** UA:

```text
Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X)
AppleWebKit/605.1.15 (KHTML, like Gecko)
Version/16.6 Mobile/15E148 Safari/604.1
```

Up to Chrome 84, when the Request Desktop Site feature is enabled, the **Desktop Safari** UA is sent:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4)
AppleWebKit/600.7.12 (KHTML, like Gecko)
Version/8.0.7 Safari/600.7.12
```

Starting from Chrome 85, when the [Request Desktop Site feature is enabled](#iphone), the UA is the same as the **Desktop Safari** UA with `CriOS/<ChromeMajorRevision>` being added:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5)
AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/85
Version/11.1.1 Safari/605.1.15
```

Safari desktop on Macbook example:

```text
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
AppleWebKit/605.1.15 (KHTML, like Gecko)
Version/16.6 Safari/605.1.15
```
-->
---
layout: 'layouts/doc-post.njk'
title: 'User-Agent reduction'
subhead: >
  Limit passively shared browser data to reduce the volume of sensitive information which leads to fingerprinting.
description: >
  Limit passively shared browser data to reduce the volume of sensitive information which leads to fingerprinting.
date: 2021-11-09
updated: 2023-03-14
authors:
  - alexandrawhite
---

## Implementation status

{% Partial 'privacy-sandbox/timeline/ua-ch.njk' %}

## What is User-Agent reduction?

User-Agent (UA) reduction minimizes the identifying information
shared in the User-Agent string, which may be [used for passive
fingerprinting](https://www.w3.org/2001/tag/doc/unsanctioned-tracking/#unsanctioned-tracking-tracking-without-user-control).
Now that these changes have been rolled
out for scaled availability, all resource requests have a reduced `User-Agent` header. As a result,
the return values from certain `Navigator` interfaces are reduced,
including: `navigator.userAgent`, `navigator.appVersion`, and
`navigator.platform`.

Web developers should review their site code for instances and uses
of the User-Agent string. If your site relies on parsing the User-Agent string
to read the device model, platform version, or full browser version, you'll
need to [implement the User-Agent Client Hints
API](https://web.dev/migrate-to-ua-ch/).

[Review the latest timeline](https://www.chromium.org/updates/ua-reduction) for
User-Agent reduction.

{% Aside 'key-term' %}
The [`User-Agent` string](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)
is an HTTP request header that allows servers and networks to identify the
application, operating system (OS), vendor, and / or version of a user agent.
Historically, the `User-Agent` was shared on every HTTP request and exposed in
JavaScript.
{% endAside %}

### User-Agent Client Hints (UA-CH)

[User-Agent Client Hints](https://wicg.github.io/ua-client-hints/) allow access
to the full set of User-Agent data, but only when servers actively declare an
explicit need for specific pieces of data.

By removing passively exposed user data, we better measure and reduce the
amount of information that is intentionally exposed by request headers,
JavaScript APIs, and other mechanisms.

## Why do we need reduced UA and UA-CH?

Historically, the User-Agent string would broadcast a large string of data about a
user's browser, operating system, and version with every HTTP request. This was
problematic for two reasons:

*  The granularity and abundance of detail can lead to user identification.
*  The default availability of this information can lead to covert tracking.

Reduced UA and UA-CH improve user privacy by sharing only basic information by default.

The reduced User-Agent includes the browser's brand and a significant version,
where the request came from (desktop or mobile), and the platform. To access
more data, User-Agent Client Hints allow you to request specific information
about the user's device or conditions. 

Further, over time the `User-Agent` string grew longer and more complex, which led
to error-prone string parsing. UA-CH provides structured and reliable data that
is easier to interpret. Existing code that parses the UA string shouldn't
break (though it will return less data), and you'll need to migrate to UA-CH
if your site [needs specific client 
information](https://wicg.github.io/ua-client-hints/#use-cases).

## How does the reduced UA and UA-CH work?

Here is a brief example of how the reduced User-Agent string and UA-CH work.
For a more in-depth example, review [Improving user privacy and developer
experience with User-Agent Client Hints](https://web.dev/user-agent-client-hints/#example-exchange).

A user opens the browser and enters `example.com` into the address bar:

1. The browser sends a request to load the webpage.
   1. The browser includes the `User-Agent` header with the reduced User-Agent
      string. For example:
      `User-Agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML,
      like Gecko) Chrome/98.0.0.0 Mobile Safari/537.36`
   1. The browser includes that same information in the default User-Agent
      Client Hint headers. For example:
      ```powershell
      Sec-CH-UA: "Chrome"; v="98"
      Sec-CH-UA-Mobile: ?1
      Sec-CH-UA-Platform: "Android"
      ```
1. The server can ask the browser to send additional client hints, such as the device model, with the
   `Accept-CH` response header. For example:
   `Accept-CH: Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Model`
1. The browser applies policies and user configuration to determine what data
   is allowed to return to the server in subsequent request headers. For
   example:
   ```powershell
   Sec-CH-UA: "Chrome"; v="93"
   Sec-CH-UA-Mobile: ?1
   Sec-CH-UA-Platform: "Android"
   Sec-CH-UA-Model: "Pixel 2"
   ```

### Critical Client Hints

If you need a specific set of Client Hints in your initial request, you can use
the `Critical-CH` response header. `Critical-CH` values must be a subset of the
values requested by `Accept-CH`.

For example, the initial request may include a request for `Device-Memory` and
`Viewport-Width`, where `Device-Memory` is considered critical.

```powershell
GET / HTTP/1.1
Host: example.com

HTTP/1.1 200 OK
Content-Type: text/html
Accept-CH: Device-Memory, Viewport-Width
Vary: Device-Memory, Viewport-Width
Critical-CH: Device-Memory
```

If the browser requires a critical hint (`Critical-CH`) to properly render the webpage, then the server can ask for this additional information with the `Accept-CH` header. Then, the browser can send a new request for the page, including the critical hint.

In summary, `Accept-CH` requests all values you'd like for the page, while `Critical-CH`
requests only the subset of values you must have on-load to properly load the
page. Refer to the [Client Hints Reliability
specification](https://github.com/WICG/client-hints-infrastructure/blob/main/reliability.md)
for more information.

### Detect tablet devices with the UA-CH API

As the line between mobile, tablet, and desktop devices continues to become
less distinct and dynamic form factors are more common (folding screens,
switching between laptop and tablet mode), it's advisable to use responsive
design and feature detection to present an appropriate user interface.

However, information provided by the browser for both the User-Agent string
and User-Agent Client Hints comes from the same source, so the same forms
of logic should work.

For example, if this pattern is checked on the UA string:
- Phone pattern: `'Android' + 'Chrome/[.0-9]* Mobile'`
- Tablet pattern: `'Android' + 'Chrome/[.0-9]* (?!Mobile)'`

The matching default UA-CH headers interface may be checked:
- Phone pattern: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?1`
- Tablet pattern: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?0`

Or the equivalent JavaScript interface:
- Phone pattern: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === true`
- Tablet pattern: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === false`

For hardware-specific use cases, the device model name can be requested via
the high-entropy `Sec-CH-UA-Model` hint.

## How do I use and test reduced UA? {: #prepare-and-test}

To begin, [review your site
code](https://web.dev/migrate-to-ua-ch/#audit-collection-and-use-of-user-agent-data)
for instances and uses of the User-Agent string. If your site relies on parsing
the User-Agent string to read the device model, platform version, or full
browser version, you'll need to
[implement the UA-CH API](https://web.dev/migrate-to-ua-ch/).

Once you've updated to the UA-CH API, you should test to ensure you get the
data you expect from the User-Agent. There are three ways to test, each
increasing in complexity.

Scaled availability for User-Agent reduction means the fully reduced UA string
shipped on all Chrome devices. Reduction began with a Chrome
minor release in Q2 of 2022.

### Test the string locally {: #test-locally}

There are a couple of methods to test the reduced User-Agent locally:

* Enable the `chrome://flags/#reduce-user-agent` flag.
    * This will set your local browser to receive just the reduced `user-agent`
      string for all sites, before it becomes the default setting.
* Configure an emulated device in DevTools with the right `user-agent` string
  and client hints.
    * In the top right of DevTools, click
      {% Img src="image/admin/CBHNS0GIpZlOcDkO1D7F.png", alt="", width="28", height="28" %} 
      **Settings** > **Devices** > **Add custom device...** to configure an
      emulated device with any combination of `user-agent` string and
      User-Agent Client Hints values you need. 
    * In the top left of DevTools, click 
      {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="", width="30", height="32" %}
      **Toggle Device Toolbar** to open the DevTools UI to emulate a device.
* Launch Chrome with the `--user-agent="Custom string here"`.
    * Use this command-line flag to run Chrome with a custom User-Agent string. More on [command-line flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) here.

### Transform the string in your site's code

If you process the existing Chrome `user-agent` string in your client-side or
server-side code, you can transform that string to the new format to test
compatibility. You can test by either overriding and replacing the string, or
generating the new version and test side by side.

Review these [User-Agent reduction
snippets](/docs/privacy-sandbox/user-agent/snippets/) for example regular
expressions.

## Support for Client Hints and critical hints

There are three [default Client Hints](https://web.dev/migrate-to-ua-ch/#are-you-only-using-basic-user-agent-data)
returned to the server, including browser name and major version, a boolean
that indicates if the browser is on a mobile device, and the operating system
name. These are sent after the Transport Layer Security protocol (TLS) handshake. These are already available and
supported in your browser.

However, there may be times when you need to retrieve critical information
for your site to render.

### Optimize critical hints

{% Aside 'warning' %}

Using critical hints should be rare, so make sure you've reviewed the reason
for implementation. The question to ask yourself is, do you require extended
data on the initial page load? Will your page fail to load without this
information?

{% endAside %}

A TLS handshake is the first step to create
a secure connection between the browser and web server. Without an
intervention, the
[Critical-CH response header](https://www.ietf.org/archive/id/draft-davidben-http-client-hint-reliability-03.html#name-the-critical-ch-response-he)
was designed to tell the browser to immediately retry the request if the first
one was sent without a critical hint.

<figure>
  {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/Ce0SL7g881Kjoa0VyhUc.png", alt="Sequence diagram for Client Hints with critical hints", width="800", height="939" %}
  <figcaption>When a critical hint is requested by the server, the client will retry sending the first request for the webpage with the critical hint. In this example, the hint for <code>Sec-CH-UA-Model</code> is requested twice: once as a Client Hint with <code>Accept-CH</code> and again as a critical hint with <code>Critical-CH</code>.</figcaption>
</figure>

To optimize critical hints ([`Critical-CH` header](https://groups.google.com/a/chromium.org/g/blink-dev/c/zPYGbULXn7o/m/q3OJ2kZAAQAJ)),
you must intercept this handshake and provide a model for Client Hints. These
steps may be complex, and require advanced knowledge.

The [`ACCEPT_CH` HTTP/2 and HTTP/3 frames](https://datatracker.ietf.org/doc/html/draft-davidben-http-client-hint-reliability-02#section-4),
combined with the [TLS ALPS extension](https://github.com/vasilvv/tls-alps),
is a connection-level optimization to deliver the server’s Client Hint
preferences in time for the first HTTP request. These require complex
configuration, and we recommend only using this for truly critical information.

BoringSSL (a fork of OpenSSL) helps you work with Google’s experimental
features in Chromium. At this time, ALPS is only
[implemented in BoringSSL](https://commondatastorage.googleapis.com/chromium-boringssl-docs/ssl.h.html#Application-layer-protocol-settings).

If you need to use critical hints, refer to our guide on
[critical hints reliability and optimization](https://docs.google.com/document/d/1HQd3vosjFls2jp6DwpkNMUN4CBdmmxZJJz0WhhcqOPw/edit?usp=sharing).

## FAQ

### How long will hints specified via the `Accept-CH` header be sent?

Hints specified via the `Accept-CH` header will be sent for the duration of the
browser session or until a different set of hints is specified.

### Does UA-CH work with HTTP/2 and HTTP/3?

UA-CH works with both HTTP/2 and HTTP/3 connections.

{% Aside 'caution' %}
Client Hints are only sent over secure connections, so make sure your uses HTTPS.
{% endAside %}

### Do subdomains (and CNAMEs) require a top-level page `Permissions-Policy` to access high-entropy UA-CH?

High-entropy UA-CH on request headers are restricted on cross-origin requests
regardless of how that origin is defined on the DNS side. Delegation must be
handled via `Permissions-Policy` for any cross-origin subresource or obtained
via JavaScript that executes in the cross-origin context.

### How does User-Agent reduction affect bot detection?

Chrome's change to its User-Agent string does not directly impact the
User-Agent string that a bot chooses to send.

Bots may choose to update their own strings to reflect the reduced
information Chrome sends, but that is entirely their implementation
choice. Chrome is still sending the same User-Agent format, and bots
that append their own identifier to the end of a Chrome User-Agent
string can continue to do so.

For any concerns with specific bots, it may be worth reaching out
directly to the owners to ask if they have any plans to change their
User-Agent string.

## Engage and share feedback

*  **Origin trial**: [Share your feedback](https://github.com/miketaylr/user-agent-reduction/issues).
*  **Demo**: Try our [demo of User-Agent reduction](https://uar-ot.glitch.me/).
*  **GitHub**: Read the [UA-CH proposal](https://github.com/WICG/ua-client-hints),
   [raise questions and follow discussion](https://github.com/WICG/ua-client-hints/issues).
*  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

*  [Improving user privacy and developer experience](https://web.dev/user-agent-client-hints/):
   an overview for web developers
*  [Migrate from UA string to UA-CH](https://web.dev/migrate-to-ua-ch/): a
   tutorial for web developers
*  [User-Agent snippets](/docs/privacy-sandbox/user-agent/snippets/): code
  snippets to transform the current User-Agent string to the reduced format for
  testing
*  [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

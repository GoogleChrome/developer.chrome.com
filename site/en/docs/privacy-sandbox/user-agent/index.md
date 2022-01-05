---
layout: 'layouts/doc-post.njk'
title: 'User-Agent Reduction'
subhead: >
  Limit browser data shared to remove sensitive information and reduce fingerprinting.
description: >
  The reduced User-Agent shares a limited set of data to improve user privacy and reduce opportunities for tracking. With User-Agent Client Hints, developers can request more details in a managed and audited process.
date: 2021-11-09
updated: 2021-12-28
authors:
  - alexandrawhite
---

## Implementation status

*  [In origin trial](/blog/user-agent-reduction-origin-trial/) Chrome 95 to 100
*  [Register for the trial](/origintrials/#/view_trial/-7123568710593282047)
*  [Chrome DevTools integration](blog/new-in-devtools-89/#ua-ch)
*  [Chrome Platform Status](https://chromestatus.com/feature/5995832180473856)

## What is User-Agent reduction?

User-Agent (UA) reduction is the effort to minimize the identifying information
shared in the User-Agent string which may be
[used for passive fingerprinting](https://www.w3.org/2001/tag/doc/unsanctioned-tracking/#unsanctioned-tracking-tracking-without-user-control).
As these
[changes are rolled out](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html), 
all resource requests will have a reduced `User-Agent` header. As a result,
the returns from certain `Navigator` interfaces will be reduced, including:
`navigator.userAgent`, `navigator.appVersion`, and `navigator.platform`.

Web developers should
[review site code](https://web.dev/migrate-to-ua-ch/#audit-collection-and-use-of-user-agent-data)
for instances and uses of the `User-Agent` string. If your site relies on
parsing the `User-Agent` string to read the device model, platform version, or
full browser version, you'll need to
[implement the User-Agent Client Hints API](https://web.dev/migrate-to-ua-ch/). 

{% Aside 'key-term' %}
The [`User-Agent` string](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)
is an HTTP request header which allows servers and networks to identify the
application, operating system (OS), vendor, and / or version of a user agent.
Currently, the `User-Agent` is shared on every HTTP request and exposed in
JavaScript.
{% endAside %}

### User-Agent Client Hints (UA-CH)

[User-Agent Client Hints](https://wicg.github.io/ua-client-hints/) allow access
to the full set of user-agent data, but only when servers actively declare an
explicit need for specific pieces of data.

By removing passively exposed user-data, we can better measure and limit
[how much information is intentionally exposed](https://github.com/bslassey/privacy-budget)
(by request headers, JavaScript APIs, and other mechanisms).

## Why do we need reduced UA and UA-CH?

Currently, the User-Agent string broadcasts a large string of data about a
user's browser, operating system, and version every HTTP request. This is
problematic because:

*  the granularity and abundance of detail can lead to user identification;
*  and the default availability of this information can lead to covert tracking.

We improve user privacy by only sharing basic information.

The reduced User-Agent includes the browser's brand and a significant version,
desktop or mobile, and the platform. To access more data, User-Agent Client
Hints allow you to request specific information about the user's device or
conditions in a way that can be audited. 

Further, the `User-Agent` string has grown longer and more complex, which led
to error-prone string parsing. UA-CH provides structured and reliable data that
is easier to interpret. Existing code which parses the UA string shouldn’t
break (though it will return less data), and you’ll need to migrate to UA-CH
if your site needs specific information for any
[valid use cases](https://wicg.github.io/ua-client-hints/#use-cases).

## How do the reduced UA and UA-CH work?

Here is a brief example of how the reduced User-Agent string and UA-CH work.
For a more in-depth example, review [Improving user privacy and developer
experience with User-Agent Client Hints](https://web.dev/user-agent-client-hints/#example-exchange).

1. A user opens the browser and enters `example.com` into the address bar.
1. The browser sends a request to load the webpage.
   1. The browser includes the `User-Agent` header with the reduced User-Agent
      string. For example:
      `User-Agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML,
      like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36`
   1. The browser includes that same information in the default User-Agent Client
      Hint headers. For example:
      ```powershell
      Sec-CH-UA: "Chrome"; v="93"
      Sec-CH-UA-Mobile: ?1
      Sec-CH-UA-Platform: "Android"
      ```
1. The server can ask the browser to send additional client hints with the
   `Accept-CH` response header. For example:
   `Accept-CH: Sec-CH-UA-Arch`
1. The browser applies policies and user configuration to determine what data
   is allowed to return to the server in subsequent request headers. For
   example:
   ```powershell
   Sec-CH-UA: "Chrome"; v="93"
   Sec-CH-UA-Mobile: ?1
   Sec-CH-UA-Platform: "Android"
   Sec-CH-UA-Arch: "arm"
   ```

If you need a specific set of Client Hints on your initial request, refer to
[Client Hints Reliability](https://github.com/WICG/client-hints-infrastructure/blob/main/reliability.md)
to ensure Client Hints are available on site load and optimized.

## Engage and share feedback

*  **Origin trial**:
   [Register for the Chrome origin trial](/origintrials/#/view_trial/-7123568710593282047)
   to opt-in for the reduced user-agent, and
   [share your feedback](https://github.com/abeyad/user-agent-reduction/issues).
*  **Demo**: Try our [demo of User-Agent reduction](https://uar-ot.glitch.me/).
*  **GitHub**: Read the [UA-CH proposal](https://github.com/WICG/ua-client-hints),
   [raise questions and follow discussion](https://github.com/WICG/ua-client-hints/issues).
*  **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Find out more

*  [Origin trial and schedule](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)
*  [Improving user privacy and developer experience](https://web.dev/user-agent-client-hints/):
   an overview for web developers
*  [Migrate from UA string to UA-CH](https://web.dev/migrate-to-ua-ch/): a
   tutorial for web developers
* [User-Agent snippets](/docs/privacy-sandbox/user-agent/snippets/): code
  snippets to transform the current user-agent string to the reduced format for
  testing
*  [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

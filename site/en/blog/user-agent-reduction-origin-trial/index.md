---
layout: "layouts/blog-post.njk"
title: "User-Agent Reduction origin trial"
subhead: >
description: >
  Starting in Chrome 95 Beta, an origin trial allows
  sites to opt into receiving the reduced user agent string, which will
  contain only the browser's brand and significant version, its desktop or mobile
  distinction, and the platform it's running on.
authors:
  - arichiv
  - abeyad
date: 2021-09-14
tags:
  - privacy
  - origin-trials
  - chrome-95
---

User-Agent Reduction is an effort to reduce passive fingerprinting surfaces by
reducing the information in the
[User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)
(UA) string to only the browser's brand and significant version, its desktop or
mobile distinction, and the platform it's running on. Currently, the UA string
is shared on every HTTP request and exposed in JavaScript to all resources
loaded by the browser. It  contains significant information on the browser, the
platform it's running on, and its capabilities.  [User-Agent Client
Hints](https://wicg.github.io/ua-client-hints/) (UA-CH) can provide the same
information as the full UA string, while allowing sites to only request the UA
information that they need.

Beginning with the [Chrome 95](https://chromiumdash.appspot.com/schedule) Beta,
we'll open up the
[origin trial](https://developer.chrome.com/origintrials/#/view_trial/-7123568710593282047)
for
[User-Agent Reduction](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)
to allow sites to opt into receiving the reduced UA string now. This will enable
sites to discover and fix problems before the reduced UA becomes the default
behavior in Chrome (the reduction is planned to start in the
[second quarter of 2022](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)).
If you would like to test the origin trial on 95 Beta users before it launches
to the stable population, be sure to opt in and test before the release date for
Chrome 95 ([currently scheduled](https://chromiumdash.appspot.com/schedule) for
October 19th, 2021).

Below is an overview of the origin trial and what to expect, and as always, we
welcome feedback or any issues throughout this trial in the UA Reduction [Github
repository](https://github.com/abeyad/user-agent-reduction/issues).

## What is the User-Agent?

The
[User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)
(UA) string is shared on every HTTP request and exposed in JavaScript to all
resources loaded by the browser. Currently, it contains significant information
on the browser and the platform it's running on.

## Why is the User-Agent being reduced?

User-Agent Reduction is an effort to reduce passive fingerprinting surfaces in
the Chrome browser that was first announced in January 2020. By reducing the
information in the UA string to just the browser's brand and significant
version, its desktop or mobile distinction, and the platform it's running on, it
becomes more difficult to identify individual users.

## What does this mean for web developers?

Sites should prepare to receive reduced UA strings and consider participating in
the origin trial (detailed below). The reduced user agent values will appear
in:

+   The `User-Agent` HTTP request header
+   The `navigator.userAgent` Javascript getter
+   The `navigator.platform` Javascript getter
+   The `navigator.appVersion` Javascript getter

To receive more client information than what's shared by the reduced User-Agent,
sites will need to migrate to the new User-Agent [Client
Hints](https://web.dev/migrate-to-ua-ch/) API. For more details on migration
strategies, see [Migrate to User-Agent Client
Hints](https://web.dev/migrate-to-ua-ch/). 

## How does this origin trial work?

This origin trial is a bit different from a standard origin trial. Standard
origin trials can only control behavior in the response (for example, control
access to an API in the response's Javascript). In this trial, our goal is to
not only modify the UA string provided in the Javascript APIs, but also to
modify the User-Agent header sent on the HTTP request.

To be able to do this, we are defining a temporary client hint, named
`Sec-CH-UA-Reduced`, whose presence in a request will indicate that the User-Agent
header value contains the reduced UA string. The `Sec-CH-UA-Reduced` client hint
will only be sent (along with the reduced UA string) if the origin trial token
is valid and the `Sec-CH-UA-Reduced` client hint will not work once the origin
trial expires. Keep in mind that the first navigation request will still receive
the unreduced User-Agent string unless you set the [`Critical-CH
header`](#validate).

Subresource requests to the same origin will automatically send the same
User-Agent string as the top-level request sent. Subresource requests to
third-party origins will also send the same User-Agent string as the top-level
request, including the reduced UA string if the origin trial token is valid,
provided that the permissions policy allows it.

If you operate a service that is implemented as a subresource across origins
(like ad serving or analytics), this origin trial would not enable sending the
reduced UA string in the User-Agent header from your cross-origin embedded
resource. If you select a "third-party origin trial" during registration, the
subresource requests will get the reduced UA string in the JavaScript APIs, but
not in the User-Agent request header. To get the reduced User-Agent request
header, enroll the top-level sites in the origin trial and set the permissions
policy to allow the client hints and the reduced User-Agent request header to
propagate to the cross-origin requests. 

## How do I participate in the User-Agent Reduction origin trial?

1.  To register for the origin trial and get a token for your domains,
    visit the
    [Trial for User Agent Reduction page](https://developer.chrome.com/origintrials/#/view_trial/-7123568710593282047).

1.  Update your HTTP response headers:

    1.  Add `Origin-Trial: <ORIGIN TRIAL TOKEN>` to your HTTP
        response header, where <`ORIGIN TRIAL TOKEN`> contains the token you
        got when registering for the origin trial.
    1.  Add `Accept-CH: Sec-CH-UA-Reduced` to your HTTP response header.
    1.  Setting `Accept-CH` will only cause the reduced User-Agent
        string to be sent on subsequent requests to the origin; to resend the
        first navigation request with the reduced User-Agent string, add
        `Critical-CH: Sec-CH-UA-Reduced` to your HTTP response header, in
        addition to the `Accept-CH` and `Origin-Trial` headers.
    1.  If you want third-party subresource requests to also receive the
        reduced UA string, add a `Permissions-Policy` header with the
        third-party domains that should receive the reduced UA. For example:

        1.  To allow a named list of third-party domains, add
            `Permissions-Policy: ch-ua-reduced=(self "https://google.com")`.
        1.  To allow all third-party domains, add
            `Permissions-Policy: ch-ua-reduced=*`.

1.  Load your website in Chrome M95 (or later) and start receiving the
    reduced UA string. 
1.  Submit any issues or feedback to the UA Reduction [Github
    repository](https://github.com/abeyad/user-agent-reduction/issues).
1.  See [https://uar-ot.glitch.me/](https://uar-ot.glitch.me/) for a simple
    demonstration of the origin trial (along with the source code).

## How do I validate that the origin trial is working? {: #validate }

To validate that the origin trial is working, examine the request headers and
ensure the following:

1.  The User-Agent header contains the reduced version. Refer to this
    [list of samples of reduced UA strings](https://www.chromium.org/updates/ua-reduction#TOC-Sample-UA-Strings:-Phase-4).
    An easy way to tell is that the Chrome minor version string contains `0.0.0`.
1.  The `Sec-CH-UA-Reduced` header is set to `?1`.

The initial response's headers containing the origin trial token should look
like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/INqCEg57xx8MbFBnLIUD.png", alt="Initial response's headers containing the origin-trial token.", width="800", height="138", class="screenshot" %}

Subsequent request headers containing the reduced UA string should look like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/C9AX8VAk50i23LzNTNuw.png", alt="Subsequent request headers containing the reduced UA string.", width="800", height="150", class="screenshot" %}

## How do I stop participating in the User-Agent Reduction origin trial?

At any given point in time during the trial, you can stop participating and
receive the full User-Agent string. To stop participating:

1.  Send an `Accept-CH` header in your HTTP response that does **not**
    include `Sec-CH-UA-Reduced`. Note: `Accept-CH` with an empty value is a
    valid way to accomplish this if your site does not request any other Client
    Hints.
1.  Remove the `Origin-Trial` header for the User-Agent Reduction trial from
    your HTTP response.
1.  If set, remove `Sec-CH-UA-Reduced` from the `Critical-CH` header in your
    HTTP response.

## How long will the origin trial last?

The UA Reduction origin trial will run for at least six months, which
corresponds to about six Chrome milestones. The origin trial will appear in M95
and end by M101, at which point, Chrome will evaluate the feedback from the
origin trial before proceeding with sending the reduced User-Agent string in a
phased manner according to the
[rollout plan](https://www.chromium.org/updates/ua-reduction#TOC-Proposed-Rollout-Plan).
If a site needs longer they can opt into a subsequent deprecation origin trial,
which would allow them to access the full UA string for at least another six
months. We will publish more details on the deprecation trial when it's ready.

## How do I share feedback for the User-Agent Reduction origin trial?

Submit any issues or feedback to the UA Reduction [Github
repository](https://github.com/abeyad/user-agent-reduction/issues).

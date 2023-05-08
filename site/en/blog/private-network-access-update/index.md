---
layout: 'layouts/blog-post.njk'
title: "Private Network Access update: Introducing a deprecation trial"
authors:
  - titouan
  - lyf
description: Chrome is deprecating access to private network endpoints from non-secure public websites in Chrome 94 as part of the Private Network Access specification. Read on for recommended actions.
date: 2021-08-26
updated: 2023-03-23
hero: image/YLflGBAPWecgtKJLqCJHSzHqe2J2/dwtN0NkxkBmIz1EyhzAm.jpg
alt: A private sign in German
tags:
  - chrome-94
  - chrome-109
  - chrome-113
  - chrome-116
  - chrome-117
  - security
---

**Updates**

- **March 23, 2023**: The timeline has been updated, and deprecation will not
  occur until Chrome 117.

- **January 19, 2023**: The timeline has been updated, and deprecation
   will not occur until Chrome 114.

- **August 12, 2022**: The timeline has been updated, and deprecation
   will not occur until Chrome 109.

- **February 10, 2022**: An updated article is published at [Private Network
  Access: introducing preflights](/blog/private-network-access-preflight)

- **August 25, 2021**: Updated timeline announcement and introduction of a deprecation trial.

Chrome is deprecating access to private network endpoints from non-secure
websites as part of the [Private Network
Access](https://wicg.github.io/private-network-access/) specification. The aim
is to protect users from cross-site request forgery (CSRF) attacks targeting
routers and other devices on private networks. These [attacks have affected
hundreds of thousands of
users](https://securityaffairs.co/wordpress/22743/cyber-crime/soho-pharming-attack.html),
allowing attackers to redirect them to malicious servers.

Chrome will introduce the following changes:

* Blocking requests to private networks from insecure public websites starting in
  Chrome 94.
* Introducing a [deprecation trial](#whats-deprecation-trial) which will end in Chrome
  117. It will allow developers to request a time extension for chosen origins,
  which will not be affected during the deprecation trial.
* Introducing a Chrome policy which will allow managed Chrome deployments to
  bypass the deprecation permanently. Available in Chrome 92.

If you need more time to mitigate the impact of the deprecation register for the
deprecation trial.

If you have administrative control over your users, you can re-enable the
feature using Chrome policies.

To mitigate the impact of the new restrictions, use one of the following
strategies:

* [Upgrade your website to HTTPS, and if necessary the target
  server](#both-ends-https).
* [Upgrade your website to HTTPS and use WebTransport](#web-transport).
* [Reverse the embedding relationship](#reverse-embedding).

## Timeline

* November 2020: [Call for feedback](https://web.dev/cors-rfc1918-feedback/)
  about the upcoming changes.
* March 2021: After reviewing feedback and doing outreach, upcoming changes are
  announced. The specification is renamed from CORS-RFC1918 to Private Network
  Access.
* April 2021: Chrome 90 rolls out to Stable, surfacing deprecation warnings.
* June 2021: Chrome 92 rolls out to Beta, forbidding private network requests
  from insecure contexts. After feedback from developers requesting more time to
  adjust, the deprecation is deferred to Chrome 93, to be accompanied with a
  Deprecation Trial.
* July 2021: After further feedback from developers, the deprecation and the
  accompanying trial are deferred to Chrome 94. In addition, *private* websites
  are no longer affected by the deprecation.
* August 2021: Chrome 94 rolls out to Beta. Web developers can start signing up
  for the deprecation trial.
* September 2021: Chrome 94 rolls out to Stable. Web developers should have signed
  up for the deprecation trial and deployed trial tokens to production.
* December 2022: Origin trial survey sent and feedback received. The deprecation
  trial is extended to Chrome 113.
* March 2023: The deprecation trial is extended to Chrome 116, and set to
  end in Chrome 117. A [permission-based alternative mechanism](https://chromestatus.com/feature/5954091755241472)
  is in development, targeting initial release in Chrome 114.
* May 2023 (tentative): The permisssion-based mechanism rolls out in Chrome 114.
  Websites can use it to exit the deprecation trial.
* September 2023: Chrome 117 rolls out to Stable, ending the deprecation trial.
  Chrome blocks all private network requests from public, non-secure contexts.

## What is Private Network Access 

[Private Network Access](https://wicg.github.io/private-network-access/)
(formerly known as CORS-RFC1918) restricts the ability of websites to send
requests to servers on private networks. It allows such requests only from
secure contexts. The specification also extends the Cross-Origin Resource
Sharing (CORS) protocol so that websites now have to explicitly request a grant
from servers on private networks before being allowed to send arbitrary
requests.

*Private network requests* are requests whose target server's IP address is more
private than that from which the request initiator was fetched. For example, a
request from a public website (`https://example.com`) to a private website
(`http://router.local`), or a request from a private website to localhost.

<figure>
{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/nSGfU9xMJxIy6lMjJiMx.png",
alt="Relationship between public, private, local networks in Private Network
Access (CORS-RFC1918). ", width="800", height="512" %}
  <figcaption>
    Relationship between public, private, local networks in Private Network Access (CORS-RFC1918).
  </figcaption>
</figure>

Learn more at [Feedback wanted: CORS for private networks
(RFC1918)](https://web.dev/cors-rfc1918-feedback/).

## What's a deprecation trial {: #whats-deprecation-trial}

[Deprecation trials (formerly known as reverse origin
trials)](/blog/origin-trials/#deprecation-trials) are a form of origin trials
used to ease the deprecation of web features. Deprecation trials allow Chrome to
deprecate certain web features and prevent websites from forming new
dependencies on them, while at the same time giving current dependent websites
extra time to migrate off of them.

During a deprecation trial, the deprecated features are unavailable to all
websites by default. Developers who still need to use the affected features must
sign up for the deprecation trial and obtain tokens for specified web origins,
then modify their websites to serve those tokens in HTTP headers or meta tags
(except in this case). If a website serves valid tokens matching their origin,
Chrome will allow the use of the deprecated feature for a limited amount of
time.

For more information, check out [Getting started with Chrome's origin
trials](/blog/origin-trials/) and the [web developer
guide to origin
trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
for instructions.

## What's changing in Chrome

### Chrome 94

Starting in Chrome 94, public non-secure contexts (broadly, websites that are not
delivered over HTTPS or from a private IP address) are forbidden from making requests
to the private network.
This was previously planned for Chrome 92, hence deprecation messages might
still mention the earlier milestone.

This deprecation is accompanied by a deprecation trial, allowing web developers
whose websites make use of the deprecated feature to continue using it until
Chrome 116 by registering for tokens. See [below](#register-deprecation-trial)
for instructions on how to register and enable the trial on your website.

A pair of [Chrome policies](#policies) can be leveraged to disable the
deprecation either entirely or on specific origins, indefinitely. This allows
managed Chrome installations, for example, those in corporate settings, to
avoid breakage.

### Chrome 117

The deprecation trial ends. All websites must be migrated off of the deprecated
feature, or their users' policies configured to continue enabling the feature.

## Recommended developer actions

The first step for affected websites is most likely to buy some time until a
proper fix can be deployed: either by registering for the [deprecation
trial](https://dev.chromium.org/blink/launching-features#:~:text=Step%203%20(Optional)%3A%20Deprecation%20Trial),
or by using policies. Then, the recommended course of action varies depending on
the circumstances of each affected website.

### Register for the deprecation trial {: #register-deprecation-trial}

{% Aside %}
To participate with multiple origins (such as `examplepetstore.com` and
`example-pet-store.com`), repeat these steps for each origin.
{% endAside %}

1. Click [**Register**](/origintrials/#/view_trial/4081387162304512001) for the
   Private Network Access from non-secure contexts origin trial to obtain a
   trial token for the participating origin.
2. Add the origin-specific `Origin-Trial: $token` to your
   [response header](https://developer.mozilla.org/docs/Glossary/Response_header).
   This response header need only be set on main resource and navigation
   responses when the resulting document makes use of the deprecated feature.
   It is useless (though harmless) to attach this header to subresource
   responses.

Since this trial must be enabled or disabled before a document is allowed to
make any requests, it *cannot* be enabled through a `<meta>` tag. Such tags are
only parsed from the response body after subresource requests might have been
issued. This presents a challenge for websites not in control of response
headers, such as github.io static websites served by a third party.

For more details, see the [Web developer guide to origin
trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md).

### Enable policies {: #policies}

If you have administrative control over your users, you can re-enable the
deprecated feature using either of the following policies:

* [InsecurePrivateNetworkRequestsAllowed](https://chromeenterprise.google/policies/#InsecurePrivateNetworkRequestsAllowed)
* [InsecurePrivateNetworkRequestsAllowedForUrls](https://chromeenterprise.google/policies/#InsecurePrivateNetworkRequestsAllowedForUrls)

For more details about managing policies for your users, see this [help center
article](https://support.google.com/chrome/a/answer/9037717).

### Accessing localhost

If your website needs to issue requests to localhost, then you just need to
[upgrade your website to HTTPS](https://web.dev/why-https-matters/).

Requests targeting `http://localhost` (or `http://127.*.*.*`, `http://[::1]`)
are not blocked by Mixed Content, even when issued from secure contexts.

Note that the WebKit engine and browsers based on it (most notably, Safari)
deviate from the W3C Mixed Content specification here and [forbid these requests
as Mixed Content](https://bugs.webkit.org/show_bug.cgi?id=171934). They also do
not implement Private Network Access, so websites might wish to redirect clients
using such browsers to a plaintext HTTP version of the website, which would
still be allowed by such browsers to make requests to localhost.

### Accessing private IP addresses

If your website needs to issue requests to a target server on a private IP
address, then simply upgrading the initiator website to HTTPS does not work.
Mixed Content prevents secure contexts from making requests over plaintext HTTP,
so the newly-secured website will still find itself unable to make the requests.
There are a few ways to solve this issue:

* Upgrade both ends to HTTPS.
* Use WebTransport to securely connect to the target server.
* Reverse the embedding relationship.

#### Upgrade both ends to HTTPS {: #both-ends-https}

This solution requires control over users' DNS resolution, such as might be the
case in intranet contexts, or if users obtain the addresses of their name
servers from a DHCP server in your control. It also requires that you possess a
public domain name.

The main problem with serving private websites over HTTPS is that public key
infrastructure certificate authorities (PKI CA) only provide TLS certificates to
websites with public domain names. To work around this:

1. Register a public domain name (for example, `intranet.example`) and publish
   DNS records pointing that domain name to a public server of your choosing. 
2. Obtain a TLS certificate for `intranet.example`. 
3. Inside your private network, configure DNS to resolve `intranet.example` to
   the target server's private IP address. 
4. Configure your private server to use the TLS certificate for
   `intranet.example`. This allows your users to access the private server at
   `https://intranet.example`. 

You can then upgrade the website that initiates the requests to HTTPS and
continue making the requests as before.

This solution is future-proof and reduces the trust you place in your network,
expanding the use of end-to-end encryption within your private network.

#### WebTransport {: #web-transport}

This solution does not require control over your users' DNS resolution. It does
require that the target server run a minimal WebTransport server (HTTP/3 server
with some modifications).

You can bypass the lack of a valid TLS certificate signed by a trusted CA by
using [WebTransport](https://w3c.github.io/webtransport) and its [certificate
pinning
mechanism](https://w3c.github.io/webtransport/#dom-webtransportoptions-servercertificatefingerprints).
This allows establishing secure connections to private devices that might have a
self-signed certificate for example. WebTransport connections allow
bidirectional data transfer, but not fetch requests. You can combine this
approach with a service worker to transparently proxy HTTP requests over the
connection, from the point of view of your web application. On the server side,
a corresponding translation layer can convert the WebTransport messages to HTTP
requests.

We acknowledge that this represents a fair amount of work, but it should be
significantly easier than building on top of WebRTC; our hope is also that some
amount of the necessary investment gets implemented as reusable libraries. We
also believe it especially worthwhile considering the fact that non-secure
contexts are likely to lose access to more and more web platform features as the
platform moves toward encouraging HTTPS use in stronger ways over time.
Regardless of Private Network Access, this would likely be a wise investment
anyway.

We expect WebTransport over HTTP/3 to ship in Chrome 96 (it has begun an [origin
trial](https://groups.google.com/a/chromium.org/g/blink-dev/c/aaLFxzw5zL4/m/H3V_l-qlAgAJ))
with mitigations to protect against key sharing and other substandard security
practices, including:

* A short maximum expiration time for pinned certificates.
* A browser-specific mechanism for revoking certain keys that have been subject
  to abuse.

We will not ship the secure context restriction until at least two milestones
after WebTransport is fully rolled out. The deprecation trial will be extended if
need be.

#### Reverse embedding {: #reverse-embedding}

This solution does not require any administrative control over the network, and
can be used when the target server is not powerful enough to run HTTPS.

Instead of fetching private subresources from a public web app, a skeleton of
the app can be served from the private server, which then fetches all its
subresources (such as scripts or images) from a public server, such as a CDN.
The resulting web app can then make requests to the private server, as these are
considered same-origin. It can even make requests to other servers with private
IPs (but not localhost), though this might change in the long term.

By hosting only a skeleton on the private server, you can update the web app by
pushing new resources to the public server, just as you would update a public
web app. On the other hand, the resulting web app is not a secure context, so it
doesn't have access to some of the more powerful features of the web.

## Plans for the future

Restricting private network requests to secure contexts is only the first step in
launching Private Network Access. Chrome is working towards implementing the rest of
the specification in the coming months. Stay tuned for updates!

### Restricting localhost access from private websites

The changes in Chrome 94 only affect *public* websites accessing private IP addresses
or localhost. The Private Network Access specification also classifies requests from
*private* websites to localhost as problematic. Chrome will eventually deprecate these
too. This presents a slightly different set of challenges however, as many private
websites do not have domain names, complicating the use of deprecation trial tokens.

### CORS preflight requests 

The second part of Private Network Access is to gate private network requests
initiated from secure contexts with [CORS preflight
requests](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls).
The idea is that even when the request was initiated from a secure context, the
target server is asked to provide an explicit grant to the initiator. The
request is only sent if the grant is successful.

In short, a CORS preflight request is an HTTP `OPTIONS` request carrying some
`Access-Control-Request-*` headers indicating the nature of the subsequent
request. The server can then decide whether or not to grant fine-grained access
by responding `200 OK` with `Access-Control-Allow-*` headers.

Find more details about this in the
[specification](https://wicg.github.io/private-network-access).

### Restrict navigation fetches

Chrome is deprecating and eventually blocking subresource requests to private
networks. This will not affect navigations to private networks, which can also
be used in [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
attacks.

The Private Network Access specification doesn't make a distinction between the
two kinds of fetches, which will eventually be subject to the same restrictions.

Cover photo by [Markus
Spiske](https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/s/photos/private?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

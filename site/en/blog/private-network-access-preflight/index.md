---
layout: 'layouts/blog-post.njk'
title: "Private Network Access: introducing preflights"
authors:
  - titouan
  - agektmr
  - lyf
description: Chrome is deprecating access to private network endpoints from non-secure public websites as part of the Private Network Access specification. Read on for recommended actions.
date: 2022-01-06
updated: 2023-02-10
is_outdated: true
new_available_content_url: /blog/private-network-access-update
hero: image/VbsHyyQopiec0718rMq2kTE1hke2/iqanYAE91Ab6BsgwhBjq.jpg
alt: An airplane in the sky
tags:
  - chrome-98
  - chrome-102
  - chrome-104
  - security
---

**Updates**

- **July 7, 2022**: Updated current status and added IP address space definition.
- **April 27, 2022**: Updated timeline announcement.
- **March 7, 2022**: Announced rollback after issues were discovered in
  Chrome 98.

## Introduction

Chrome is deprecating direct access to private network endpoints from public
websites as part of the
[Private Network Access](https://wicg.github.io/private-network-access/) (PNA)
specification.

Chrome will start sending a CORS preflight request ahead of any [private
network request](#what-is-private-network-access-pna) for a subresource, which asks
for explicit permission from the target server. This preflight request will
carry a new header, `Access-Control-Request-Private-Network: true`, and the
response to it must carry a corresponding header,
`Access-Control-Allow-Private-Network: true`.

The aim is to protect users from [cross-site request forgery (CSRF) attacks](https://portswigger.net/web-security/csrf)
targeting routers and other devices on private networks. These [attacks have
affected hundreds of thousands of users](https://securityaffairs.co/wordpress/22743/cyber-crime/soho-pharming-attack.html),
allowing attackers to redirect them to malicious servers.

## Rollout plan

Chrome will roll this change out in two phases to give websites time to notice
the change and adjust accordingly.

1. In Chrome 104:
    * Chrome experiments by sending preflight requests ahead of private network
      subresource requests.
    * Preflight failures only display warnings in DevTools, without otherwise
      affecting the private network requests.
    * Chrome gathers compatibility data and reaches out to the largest affected
      websites.
    * We expect this to be broadly compatible with existing websites.

    {% Aside 'warning' %}

    To limit the effects on websites that do not already support preflights, the
    timeout is restricted to 200 milliseconds in Chrome 104. The restriction is only
    applied in warning mode. The special timeout limit would be removed after
    enabling the enforce mode by switching "Respect the result of Private Network
    Access preflights" to "Enabled" in `chrome://flags` and the default limit is 5
    seconds.
    {% endAside %}

2. In Chrome 113 at the earliest:
    * This will begin _only_ if and when compatibility data indicates that the
      change is safe enough and we've outreached directly when necessary.
    * Chrome enforces that preflight requests must succeed, otherwise failing
      the requests.
    * [A deprecation trial](/blog/origin-trials/#deprecation-trials) starts at
      the same time to allow for websites affected by this phase to request a
      time extension. The trial will last for at least 6 months.

{% Aside %}

An earlier attempt was made to roll out warnings in Chrome 98 and Chrome 102,
previously announced by this blog post. This was rolled back after stability and
compatibility issues were discovered during the rollout.

The identified issues were fixed for Chrome 104.

{% endAside %}

## What is Private Network Access (PNA)

[Private Network Access](https://wicg.github.io/private-network-access/)
(formerly known as [CORS-RFC1918](https://web.dev/cors-rfc1918-feedback/))
restricts the ability of websites to send requests to servers on private
networks.

Chrome has already implemented part of the specification: as of Chrome 96, only
secure contexts are allowed to make private network requests. Refer to our
[previous blog post](/blog/private-network-access-update/) for details.

The specification also extends the Cross-Origin Resource Sharing (CORS)
protocol so that websites must now explicitly request a grant from servers
on private networks before being allowed to send arbitrary requests.

{% Aside 'key-term' %}
**Private network requests** are requests whose target server's IP address is
more private than that from which the request initiator was fetched. For example,
a request from a public website (`https://example.com`) to a private website
(`http://router.local`), or a request from a private website to localhost.
{% endAside %}

### How does PNA classify IP addresses and identify a private network 

The IP addresses are classified into three IP address spaces: 
- `public`
- `private`
- `local`

**Local IP address space** contains IP addresses that are either IPv4
loopback addresses (`127.0.0.0/8`) defined in section 3.2.1.3 of [RFC1122](https://tools.ietf.org/html/rfc1122)
or IPv6 loopback addresses (`::1/128`) defined in section 2.5.3 of [RFC4291](https://tools.ietf.org/html/rfc4291).

**Private IP address space** contains IP addresses that have meaning only
within the current network, including `10.0.0.0/8`, `172.16.0.0/12` and
`192.168.0.0/16` defined in [RFC1918](https://tools.ietf.org/html/rfc1918),
link-local addresses `169.254.0.0/16` defined in [RFC3927](https://tools.ietf.org/html/rfc3927),
unique local IPv6 unicast addresses `fc00::/7` defined in [RFC4193](https://datatracker.ietf.org/doc/html/rfc4193),
link-local IPv6 unicast addresses `fe80::/10` defined in section 2.5.6 of [RFC4291](https://tools.ietf.org/html/rfc4291)
and IPv4-mapped IPv6 addresses where the mapped IPv4 address is itself private.

**Public IP Address space** contains all other addresses not mentioned previously.

A local IP address is considered more private than a private IP address which
is considered more private than a public IP address.

<figure>
{% Img
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/5bLcN5HBih35ykCSpj0z.jpg",
   alt="Requests are private when a more available network sends a request to a
   less available network.",
   width="800",
   height="420"
%}
  <figcaption>
    Relationship between public, private, local networks in Private Network
    Access (CORS-RFC1918)
  </figcaption>
</figure>

Learn more at [Feedback wanted: CORS for private networks (RFC1918)](https://web.dev/cors-rfc1918-feedback/).

## Preflight requests

### Background

Preflight requests are a mechanism introduced by the [Cross-Origin Resource
Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS) standard used
to request permission from a target website before sending it an HTTP request
that might have side effects. This ensures that the target server understands
the CORS protocol and significantly reduces the risk of CSRF attacks.

The permission request is sent as an `OPTIONS` HTTP request with specific [CORS
request headers](https://developer.mozilla.org/docs/Web/HTTP/CORS#the_http_request_headers)
describing the upcoming HTTP request. The response must carry specific [CORS
response headers](https://developer.mozilla.org/docs/Web/HTTP/CORS#the_http_response_headers)
explicitly agreeing to the upcoming request.

{% Img
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/FDj760C71e4YW8eJ0pid.jpg",
   alt="Sequence diagram which represents CORS preflight. An OPTIONS HTTP
   request is sent to the target, which returns a 200 OK. Then the CORS
   request header is sent, returning a CORS response header",
   width="390", height="450"
%}

### What's new in Private Network Access {: #new-in-pna }

A new pair of request and response headers is introduced to preflight requests:


* `Access-Control-Request-Private-Network: true` is set on all PNA preflight requests
* `Access-Control-Allow-Private-Network: true` must be set on all PNA preflight responses

Preflight requests for PNA are sent for all private network requests,
regardless of request method and
[mode](https://developer.mozilla.org/docs/Web/API/Request/mode). They are sent
ahead of requests in `cors` mode as well as `no-cors` and all other modes. This
is because all private network requests can be used for CSRF attacks,
regardless of request mode and whether or not the response contents are made
available to the initiator.

{% Aside %}
If the private network request is made in `cors` mode, then CORS headers must
be set on the final response, in addition to the preflight response.
{% endAside %}

Preflight requests for PNA are also sent for same-origin requests, if the
target IP address is more private than the initiator. This is unlike regular
CORS, where preflight requests are only for cross-origin requests. Preflight
requests for same-origin requests guard against
[DNS rebinding](https://en.wikipedia.org/wiki/DNS_rebinding) attacks.

### Examples

Observable behavior depends on the
[request's mode](https://developer.mozilla.org/docs/Web/API/Request/mode).

#### No-CORS mode

Say `https://foo.example/index.html` embeds
`<img src="https://bar.example/cat.gif" alt="dancing cat"/>`, and
`bar.example` resolves to `192.168.1.1`, a private IP address according to
[RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918).

Chrome first sends a preflight request:

```text
HTTP/1.1 OPTIONS /cat.gif
Origin: https://foo.example
Access-Control-Request-Private-Network: true
```

For this request to succeed, the server must respond with:

```text
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Private-Network: true
```

{% Aside 'warning' %}
The server can set `Access-Control-Allow-Origin: *`, though this is dangerous
and discouraged. Private network resources should rarely be accessible to all
origins, so think carefully about the risks involved in setting such a header.
{% endAside %}

Then Chrome will send the actual request:

```text
HTTP/1.1 GET /cat.gif
...
```

To which the server can respond normally.


#### CORS mode

Say `https://foo.example/index.html` runs the following code:

```text
await fetch('https://bar.example/delete-everything', {
  method: 'PUT',
  credentials: 'include',
})
```

Again, say `bar.example`  resolves to `192.168.1.1`.

Chrome first sends a preflight request:

```text
HTTP/1.1 OPTIONS /delete-everything
Origin: https://foo.example
Access-Control-Request-Method: PUT
Access-Control-Request-Credentials: true
Access-Control-Request-Private-Network: true
```

For this request to succeed, the server must respond with:

```text
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: PUT
Access-Control-Allow-Credentials: true
Access-Control-Allow-Private-Network: true
```

Then Chrome will send the actual request:

```text
HTTP/1.1 PUT /delete-everything
Origin: https://foo.example
```

To which the server can respond per usual CORS rules:

```text
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://foo.example
```

## How to know if your website is affected

Starting in Chrome 104, if a private network request is detected, a preflight
request will be sent ahead of it. If this preflight request fails, the final
request will still be sent, but a warning will be surfaced in the DevTools
issues panel.

{% Img
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/AgZzPf3NkMWQ0Cm6Puu0.png",
   alt="A failed preflight request warning in the Devtools Issues panel. This states:
   ensure private network requests are only made to resources that allow them,
   along with details about the specific request and listed affected resources.",
   class="screenshot",
   width="800", height="556"
%}

Affected preflight requests can also be viewed and diagnosed in the network panel:

{% Img
   src="image/VbsHyyQopiec0718rMq2kTE1hke2/aysOX5wKA1kme8HyV3t0.png",
   alt="A failed preflight request in the DevTools Network panel for localhost
   gives a 501 status.",
   class="screenshot",
   width="800", height="265"
%}

If your request would have triggered a regular CORS preflight without
Private Network Access rules, then two preflights may appear in the
network panel, with the first one always appearing to have failed. This is a
[known bug](https://crbug.com/1290390), and you can safely ignore it.

{% Img
   src="image/I8XwjL2ZK8fUPQRJMwrRzjyKAar1/MaBNk7572rWNybez1FHH.png",
   alt="A spurious failed preflight request ahead of a successful preflight in
   the DevTools Network panel.",
   width="800", height="316"
%}

To review what happens if preflight success was enforced, you can
[pass the following command-line argument](https://www.chromium.org/developers/how-tos/run-chromium-with-flags),
starting in Chrome 98:

```text
--enable-features=PrivateNetworkAccessRespectPreflightResults
```

Any failed preflight request will result in a failed fetch. This can allow you
to test whether your website would work after the
[second phase of our rollout plan](#rollout-plan). Errors can be diagnosed in
the same way as warnings using the DevTools panels mentioned above.

## What to do if your website is affected

When this change rolls out in Chrome 104, it is not expected to break any
website. However, we strongly encourage you to update affected request paths to
ensure your website keeps running as expected.

There are two solutions available to you:

1. Handle preflight requests on the server side
1. Disable PNA checks with enterprise policies

### Handle preflight requests server-side {: #server-side-requests }

Update the target server of any affected fetches to handle PNA preflight
requests. First, implement support for standard CORS preflight requests on
affected routes. Then add support for the [two new response headers](#new-in-pna).

When your server receives a preflight request (an `OPTIONS` request with CORS
headers), the server should check for the presence of an
`Access-Control-Request-Private-Network: true` header. If this header is
present on the request, the server should examine the `Origin` header and the
request path along with any other relevant information (such as
`Access-Control-Request-Headers`) to ensure the request is safe to allow.
Typically, you should allow access to a single origin under your control.

{% Aside 'warning' %}
Beware of insecure (non-https) origins, as they are unauthenticated. An on-path
attacker could masquerade as any such origin!
{% endAside %}

Once your server has decided to allow the request, it should respond
`204 No Content` (or `200 OK`) with the necessary CORS headers and the new PNA
header. These headers include `Access-Control-Allow-Origin` and
`Access-Control-Allow-Private-Network: true`, as well as others as needed.

Refer to the [examples](#examples) for concrete scenarios.

### Disable Private Network Access checks using enterprise policies {: #disable-with-enterprise-policy }

If you have administrative control over your users, you can disable Private
Network Access checks using either of the following policies:

* [`InsecurePrivateNetworkRequestsAllowed`](https://chromeenterprise.google/policies/#InsecurePrivateNetworkRequestsAllowed)
* [`InsecurePrivateNetworkRequestsAllowedForUrls`](https://chromeenterprise.google/policies/#InsecurePrivateNetworkRequestsAllowedForUrls)

For more information, refer to [Understand Chrome policy
management](https://support.google.com/chrome/a/answer/9037717).

## Give us feedback

If you are hosting a website within a private network that expects requests from
public networks, the Chrome team is interested in your feedback and use cases.
Let us know by filing an issue with Chromium at [crbug.com](crbug.com) and set
the component to `Blink>SecurityFeature>CORS>PrivateNetworkAccess`.

## What's next

Next up, Chrome will extend Private Network Access checks to cover
[web workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API):
dedicated workers, shared workers and service workers. We're tentatively aiming
for Chrome 107 to begin showing warnings.

Then, Chrome will extend Private Network Access checks to cover navigations,
including iframes and popups. We're tentatively aiming for Chrome 108 to start
showing warnings.

In both cases, we will be proceeding cautiously with a similar phased rollout,
in order to give web developers time to adjust and estimate compatibility risk.

## Acknowledgements

Cover photo by [Mark Olsen](https://unsplash.com/@markolsen) on
[Unsplash](https://unsplash.com/photos/K5j1KgecVC8).

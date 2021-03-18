---
layout: 'layouts/blog-post.njk'
title: Private Network Access (CORS-RFC1918) updates
authors:
  - agektmr
  - titouan
description: Chrome has some updates to share about the standardization of the Private Network Access - formerly known as CORS-RFC1918 - plans to restrict private network resource accesses, and how your websites can align with those changes.
date: 2021-03-11
hero: image/YLflGBAPWecgtKJLqCJHSzHqe2J2/dwtN0NkxkBmIz1EyhzAm.jpg
alt: A private sign in German
---

Last November, [we asked for feedback about the proposed web platform
specification called CORS-RFC1918](https://web.dev/cors-rfc1918-feedback/) which
restricts the ability of public websites to make requests to servers in more
private networks. Thank you all who have provided feedback.

We have some updates to share about the standardization, Chrome's plans to
restrict private network resource accesses, and how your websites can align with
those changes.

* CORS-RFC1918 is now renamed to **Private Network Access**, a name that we
  believe conveys a clearer intent.
* Chrome will introduce the following changes in Chrome 90:
    * Requests to the private network from a non-secure context will be
      deprecated.
    * Deprecation reports will be sent to websites through the [Reporting
      API](https://developers.google.com/web/updates/2018/09/reportingapi).
    * DevTools warnings and issues will be logged when requests are initiated
      from non-secure contexts.
* Recommendations for mitigating the impact of the changes:
    * Receive reports when there are unexpected non-secure private network
      requests.
    * Avoid crossing address spaces.  
    * Serve embedder page and embedded content over HTTPS.

## What is Private Network Access

[Private Network Access](https://wicg.github.io/private-network-access/)
(formerly known as CORS-RFC1918) restricts the ability of websites to send
requests to servers on the private network. According to the specification, such
requests are only allowed from secure contexts. In addition, the specification
extends the Cross-Origin Resource Sharing (CORS) protocol so that websites now
have to explicitly request a grant from servers on the private network before
being allowed to send arbitrary requests.

**Private network requests** are requests whose target server's IP address is
more private than that from which the request initiator was fetched. For
example, a request from a public website (`https://example.com`) to a private
website (`http://router.local`), or a request from a private website to
localhost.

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

## What's changing in Chrome

### Chrome 90

#### Requests to the private network from non-secure contexts are deprecated

In the Private Network Access specification, requests to the private network
from public websites are allowed only if the initiating context is secure. A
document is considered secure, if its contents were served over
[HTTPS](https://web.dev/why-https-matters/) and all its ancestor documents were
too (no [mixed content](https://web.dev/what-is-mixed-content/)).

In Chrome 90 requests to the private network initiated from non-secure contexts
are therefore officially marked as deprecated. Such requests will be blocked
starting Chrome 92. This is a first step towards launching the full
specification.

#### Deprecation reports are filed via Reporting API

[The Reporting
API](https://developers.google.com/web/updates/2018/09/reportingapi) is a
standard logging functionality for the web. By setting up an endpoint, websites
can instruct the browser to send reports to the endpoint.

[Deprecation Reports](https://wicg.github.io/deprecation-reporting/) are one of
the report types the Reporting API supports. This allows websites to receive
reports when they use deprecated functionality. This helps the websites keep
track of what's going to be unavailable in the future.

Starting in Chrome 90, Chrome will send a deprecation report to a website's
reporting endpoint every time the website initiates a private network request
from a non-secure context.

Deprecation reports are [POSTed as
JSON](https://wicg.github.io/deprecation-reporting/#sample-reports) to websites'
reporting endpoints, as configured by the `Reporting-To` header.

See [Receive reports when there are unexpected non-secure private network
requests](#receive-reports) to learn how to set up a reporting endpoint.

#### DevTools warnings and issues logged when requests are initiated from non-secure contexts

Starting in Chrome 90, Chrome will log a deprecation warning to the console and
surface issues in DevTools every time a website initiates a private network
request from a non-secure context. These warnings look like the following:

<figure>
{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/CJeTlpkOuJMc4ju8Dg8F.png", alt="A deprecation warning is displayed in the DevTools console when requests are initiated from non-secure contexts.", width="800", height="625" %}
  <figcaption>
    A deprecation warning is displayed in the DevTools console when requests are initiated from non-secure contexts.
  </figcaption>
</figure>

<figure>
{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/tqJcP5z0Mk7JHIFu3y0f.png", alt="An issue is displayed in the DevTools Issues panel when requests are initiated from non-secure contexts.", width="800", height="553" %}
  <figcaption>
    An issue is displayed in the DevTools Issues panel when requests are initiated from non-secure contexts.
  </figcaption>
</figure>

### Chrome 92 (advance notice)

Chrome is giving web developers two milestones lead time to address the use of
this deprecated feature in production before enforcement is enabled.

Starting in Chrome 92, private network requests initiated from non-secure
contexts will be blocked by Chrome. No request will be sent. Instead, an error
message will be logged in the DevTools console. For security reasons, this
manifests as a TypeError for fetch requests from Javascript.

## Recommended developer actions

If you know you have a website that fetches subresources from a private network,
here are instructions on how you can mitigate the impact of the upcoming
deprecation.

### Receive reports when there are unexpected non-secure private network requests {: #receive-reports}

We highly recommend that you set up a reporting endpoint server and send a
`Reporting-To` header on your website's documents to keep track of unexpected
non-secure private network requests. This will also serve to warn you of other
upcoming deprecations and errors your clients encounter in the wild.

To receive reports, there are a couple of known SaaS solutions.

* [https://report-uri.com](https://report-uri.com)
* [https://uriports.com](https://uriports.com)

{% Aside %}
We are not aware of any open source solutions that can accumulate reports in a
database. If you know any other solutions, especially open source ones, [let us
know](https://github.com/GoogleChrome/web.dev/issues) so we can add them to the
list.
{% endAside %}

Once the endpoint is set up, send the endpoint URL with a `Reporting-To`
header with the top-level document.

```http
Reporting-Endpoints: default="https://reporting-endpoint.glitch.me/post"
Report-To: { group: 'default', max_age: 86400, endpoints: [{ url: 'https://reporting-endpoint.glitch.me/post'}]}
```

{% Aside %}
The Reporting API is undergoing transition to [a new
version](https://w3c.github.io/reporting/) (from `Reporting-To` to
`Reporting-Endpoint`). Chrome is planning to release it soon, but will leave the
older API in place for some time. Firefox is also [considering the new
API](https://bugzilla.mozilla.org/show_bug.cgi?id=1620573). You may want to use
both APIs during the transition.
{% endAside %}

### Avoid crossing address spaces

The simplest way around the issues caused by private network requests is to
avoid straddling the boundary between public and private IP addresses. There are
two ways to achieve this.

#### Serve the subresources from a more public address space

If the embedder website is served from a public IP address, serve the
subresources from a public IP address.

If the embedder website is served from a private IP address, serve the
subresources from a private IP address instead of localhost. This is relatively
easy to do, since once can use the private IP address pointing to the current
host.

#### Serve the embedder website from a less public address space

If the subresource is served from a private IP address, serve the embedder
website from a private IP address as well.

If the subresource is served from localhost, serve the embedder website from
localhost as well.

### Serve embedder page and embedded content over HTTPS

Another straightforward way of ensuring that your website can continue
performing the same fetches is to issue the fetches from secure contexts. This
boils down to serving your website over HTTPS, as well as all the ancestor
frames of the initiator.

Because of mixed content restrictions, an HTTPS website cannot fetch
subresources from a non-HTTPS origin. It follows that the private network
resources must be fetched over HTTPS as well. This requires a domain name for
your private network server. If you control DNS resolution in your private
network, this is not a big hurdle. Otherwise, one can run into difficulties due
to routers filtering out private IP addresses from DNS responses. Please reach
out if you find yourself in this situation, Chrome would love to know more about
your use case and discuss available options.

## Plans for the future

Restricting private network requests to secure contexts is only the first step
in launching Private Network Access. Chrome is working towards implementing the
rest of the specification in the coming months. Stay tuned for updates!

### CORS preflight requests

The second part of Private Network Access is to gate private network requests
initiated from *secure* contexts with 
[CORS preflight requests](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls). 
The idea is that even when the request was initiated from a secure context, 
the target server is asked to provide an explicit grant to the initiator. 
The request is only sent if the grant is successful.

In short, a CORS preflight request is an HTTP `OPTIONS` request carrying some
`Access-Control-Request-*` headers indicating the nature of the subsequent
request. The server can then decide whether or not to grant fine-grained access
by responding `200 OK` with `Access-Control-Allow-*` headers.

Find more details about this in the
[specification](https://wicg.github.io/private-network-access).

### Restrict navigation fetches

Chrome is deprecating and eventually blocking subresource requests to the
private network. This will not affect navigations to the private network, which
can also be used in
[CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks.

The Private Network Access specification does not make a distinction between the
two kinds of fetches, which will eventually be subject to the same restrictions.

Cover photo by [Markus
Spiske](https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/s/photos/private?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

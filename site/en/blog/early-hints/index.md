---
# Required
layout: 'layouts/blog-post.njk'
title: Faster page loads using server think-time with Early Hints
description: >
  Find out how your server can send hints to the browser about critical sub-resources.
subhead: >
  Find out how your server can send hints to the browser about critical sub-resources.
date: 2022-06-23
updated: 2023-06-10
authors:
  - kenjibaheux
  - tunetheweb
tags:
  - css
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/GDoM9e3pHadjogCPqB4r.jpg'
alt: >
  A hand holding a pocket watch.
---


## What is Early Hints?

Websites have become more sophisticated over time. As such, it's not unusual that a server needs to perform non-trivial work (for example, access to databases, or CDNs accessing the origin server) to produce the HTML for the requested page. Unfortunately, this "server think-time" results in extra latency before the browser can start rendering the page. Indeed, the connection effectively goes idle for as long as it takes the server to prepare the response.

<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/PlT26PkzghLo1EnoXSMI.png", alt="Image showing server think time gap of 200ms between load of page and load of other resources.", width="325", height="365" %}


<figcaption>Without Early Hints: everything is blocked on the server determining how to respond for the main resource.</figcaption>

</figure>

Early Hints is an HTTP status code (`103 Early Hints`) used to send a preliminary HTTP response ahead of a final response. This allows a server to send hints to the browser about critical sub-resources (for example, stylesheet for the page, critical JavaScript) or origins that will be likely used by the page, while the server is busy generating the main resource. The browser can use those hints to warm up connections, and request sub-resources, while waiting for the main resource. In other words, Early Hints helps the browser take advantage of such "server think-time" by doing some work in advance, thereby speeding up page loads.

<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/jBvw3bncw5GZ9DcsH4jy.png", alt="Image showing how Early Hints allows the page to send a partial response.", width="347", height="357" %}

<figcaption>With Early Hints: the server can serve a partial response with resource hints while it determines the final response</figcaption>
</figure>

In some cases, the performance improvement to the [Largest Contentful Paint](http://web.dev/lcp) can go from several hundred milliseconds, as observed by [Shopify](https://twitter.com/colinbendell/status/1539322190541295616) and [by Cloudflare](http://blog.cloudflare.com/early-hints-performance), and up to a second faster, as seen in this before/after comparison:


<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/oMiX9VrAFUtE9U4S3UTt.jpg", alt="Comparison of two sites.", width="800", height="450" %}

<figcaption>Before/After comparison of Early Hints on a test website done with <a href="https://www.webpagetest.org/">WebPageTest</a> (Moto G4 - DSL)</figcaption>
</figure>

## Implementing Early Hints

Early Hints is available from Chrome version 103, as a response to navigation requests, or user interactions that change the url in the status bar, with support for both preconnect and preload hints.

Before going deep into the topic, please note that Early Hints are not useful if your server can send a 200 (or other final responses) right away. Instead, consider using the regular `link rel=preload` or `link rel=preconnect` on the main response ([Link rel HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Link)), or in the main response (`<link>` elements), in such situations. For the cases where your server needs a little time to generate the main response, read on!

The first step to take advantage of Early Hints consists of identifying the top landing pages, that is, the pages where your users typically start when they visit your website. This could be the homepage, or popular product listing pages if you have lots of users coming from other websites. The reason these entry points matter more than other pages is because Early Hints' usefulness decreases as the user navigates around your website (that is, the browser is more likely to have all the sub-resources it needs on the second or third subsequent navigation). It's also always a good idea to deliver a great first impression!

Now that you have this prioritized list of landing pages, the next step consists of identifying which origins or sub-resources would be good candidates for [preconnect](https://web.dev/uses-rel-preconnect) or [preload](https://web.dev/preload-critical-assets/) hints, as a first approximation. Typically, those would be origins and sub-resources that contribute the most to key user metrics such as [Largest Contentful Paint](https://web.dev/lcp/), or [First Contentful Paint](https://web.dev/first-contentful-paint/). More concretely, look for render-blocking sub-resources such as synchronous JavaScript, stylesheets, or even web fonts. Similarly, look for origins that host sub-resources that contribute a lot to key user metrics. Note: if your main resources are already using `<link rel=preconnect>` or `<link rel=preload>`, you may consider these origins or resources among the candidates for Early Hints. See [this article](https://web.dev/lcp/#how-to-improve-lcp) for more details.

{% Aside 'important' %}
What you decide to `preconnect` or `preload` as Early Hints may differ from what you have traditionally used these directives for in your HTML.

When using these in HTML you typically want to `preconnect` or `preload` resources that the [Preload Scanner](https://web.dev/preload-scanner/) will not discover in the HTML—for example, fonts, or background images that would otherwise be discovered late. For Early Hints you will not have the HTML and so you may want to instead `preconnect` to critical domains or `preload` critical resources that perhaps _would_ otherwise be discovered early in the HTML—for example, preloading `main.css` or `app.js`.

Niavely copying the `preconnect` and `preload` directives from HTML to Early Hints [may not be optimal](https://www.youtube.com/watch?v=0kKdMqIhvZs&t=2285s).
{% endAside %}

The second step consists of minimizing the risk of using Early Hints on resources or origins that might be obsolete, or no longer used by the main resource. For instance, resources that are frequently updated and versioned (for example, `example.com/css/main.fa231e9c.css`) may not be the best choice. Note that this concern isn't specific to Early Hints, it applies to any link `rel=preload` or `rel=preconnect` wherever they might be present. This is the sort of detail that's best dealt with automation or templating (for example, a manual process is more likely to lead to mismatched hash or version urls between `link rel=preload` and the actual HTML tag using the resource).

As an example, consider the following flow:

```shell
GET /main.html
Host: example.com
User-Agent: [....] Chrome/103.0.0.0 [...]
```

The server predicts that `main.abcd100.css` will be needed, and suggests preloading it via Early Hints:

```shell
103 Early Hints
Link: </main.abcd100.css>; rel=preload; as=style
[...]
```

A few moments later, the webpage, including the linked CSS is served. Unfortunately, this CSS resource is frequently updated, and the main resource is already five versions ahead (`abcd105`) of the predicted CSS resource (`abcd100`).

```shell
200 OK
[...]
<HTML>
<head>
   <title>Example</title>
   <link rel="stylesheet" href="/main.abcd105.css">
```

In general, aim for resources and origins that are fairly stable, and largely independent of the outcome for the main resource. If necessary, you may consider splitting your key resources in two: a stable part designed to be used with Early Hints, and a more dynamic part left to be fetched after the main resource is received by the browser:

```shell
<HTML>
<head>
   <title>Example</title>
   <link rel="stylesheet" href="/main.css">
   <link rel="stylesheet" href="/experimental.3eab3290.css">
```

Finally, on the server side, look for main resource requests sent by browsers known to support Early Hints, and respond immediately with 103 Early Hints. In the 103 response, include the relevant preconnect and preload hints. Once the main resource is ready, follow up with the usual response (for example, 200 OK if successful). For backward compatibility, it's good practice to also include `Link` HTTP headers in the final response, perhaps even augmenting with critical resources that became evident as part of generating the main resource (for example, the dynamic part of a key resource if you followed the "split in two" suggestion). Here is what this would look like:

```shell
GET /main.html
Host: example.com
User-Agent: [....] Chrome/103.0.0.0 [...]
103 Early Hints
Link: <https://fonts.google.com>; rel=preconnect
Link: </main.css>; rel=preload; as=style
Link: </common.js>; rel=preload; as=script
```

A few moments later:

```shell
200 OK
Content-Length: 7531
Content-Type: text/html; charset=UTF-8
Content-encoding: br
Link: <https://fonts.google.com>; rel=preconnect
Link: </main.css>; rel=preload; as=style
Link: </common.js>; rel=preload; as=script
Link: </experimental.3eab3290.css>; rel=preload; as=style
<HTML>
<head>
   <title>Example</title>
   <link rel="stylesheet" href="/main.css">
   <link rel="stylesheet" href="/experimental.3eab3290.css">
   <script src="/common.js"></script>
   <link rel="preconnect" href="https://fonts.googleapis.com">
```

## Support for Early Hints by HTTP server software

Here is a quick summary of the level of support for Early Hints among popular OSS HTTP server software:

- **Apache:** [supported](https://httpd.apache.org/docs/2.4/howto/http2.html#earlyhints) via mod_http2.
- **H2O:** [supported](https://github.com/h2o/h2o/pull/1767).
- **NGINX:** [experimental module](https://github.com/nginx-modules/ngx_http_early_hints).
- **Node:** supported since [18.11.0](https://nodejs.org/en/blog/release/v18.11.0/) for [http](https://nodejs.org/api/http.html#responsewriteearlyhintshints-callback) and [http2](https://nodejs.org/api/http2.html#responsewriteearlyhintslinks)

## Enabling Early Hints, the easy way

If you are using one of the following CDNs or platforms, you may not need to manually implement Early Hints. Refer to your solution provider's online documentation to find out if it supports Early Hints, or refer to the non-exhaustive list here:

- [Early Hints at Cloudflare](https://developers.cloudflare.com/cache/about/early-hints/)
- [Early Hints at Fastly](https://www.fastly.com/blog/beyond-server-push-experimenting-with-the-103-early-hints-status-code#:~:text=about%20this%20feature.-,Sending%20103%20Early%20Hints,in%20VCL%2C%20like%20this%3A).

## Avoiding issues for clients that do not support Early Hints

Informational HTTP responses in the 100 range are part of the HTTP standard, but some older clients or bots may struggle with these because, prior to the launch of 103 Early Hints, they were rarely used for general web browsing.

Only emitting 103 Early Hints in response to clients that send a `sec-fetch-mode: navigate` HTTP request header has should ensure such hints are only sent for newer clients that understand to wait for the subsequent response. Additionally, since Early Hints are only supported on navigation requests (see [current limitations](#current-limitations)), this has the added benefit of avoiding needlessly sending these on other requests.

In addition, [Early Hints are recommended to only be sent over HTTP/2 or HTTP/3 connections](https://www.rfc-editor.org/rfc/rfc8297.html#section-3).

## Advanced pattern

If you have fully applied Early Hints to your key landing pages and find yourself looking for more opportunities, you might be interested in the following advanced pattern.

For visitors who are on their <em>n</em>th page request as part of a typical user journey, you may want to adapt the Early Hints response to content that is lower and deeper in the page, in other words using Early Hints on lower-priority resources. This may sound counter-intuitive given that we recommended focussing on high-priority, render-blocking sub-resources or origins. However, by the time a visitor has navigated for a while, it's very likely that their browser already has all the critical resources. From there on, it might make sense to switch your attention toward lower-priority resources. For instance, this could mean using Early Hints to load product images, or additional JS/CSS that are only needed for less common user interactions.

## Current limitations

Here are the limitations of Early Hints as implemented in Chrome 103 and future releases until further notice:

- Only available for navigation requests (that is, the main resource for the top level document).
- Only supports preconnect and preload (that is, prefetch isn't supported).
- Early Hint followed by a cross-origin redirect on the final response will result in Chrome dropping the resources and connections it obtained via Early Hints.

## What's next?

Depending on interest from the community, we may augment our implementation of Early Hints with the following capabilities:

- Early Hints sent on sub-resource requests.
- Early Hints sent on iframe main resource requests.
- Support for prefetch in Early Hints.

We welcome [your input](https://github.com/bashi/early-hints-explainer/issues) on which aspects to prioritize, and how to further improve Early Hints.

## Relationship to H2/Push

If you are familiar with the [deprecated HTTP2/Push feature](/blog/removing-push/), you may wonder how Early Hints differs. While Early Hints requires a round trip for the browser to start fetching critical sub-resources, with HTTP2/Push the server could start pushing sub-resources alongside the response. While this sounds amazing, this resulted in a key structural downside: with HTTP2/Push it was extremely hard to avoid pushing sub-resources that the browser already had. This "over-pushing" effect resulted in a less efficient usage of the network bandwidth, which significantly hindered the performance benefits. Overall, Chrome data showed that HTTP2/Push was in fact a net negative for performance across the web.

By contrast, Early Hints performs better in practice because it combines the ability to send a preliminary response with hints that leave the browser in charge of fetching, or connecting to, what it actually needs. While Early Hints doesn't cover all the use cases that HTTP2/Push could address in theory, we believe that Early Hints is a more practical solution for speeding up navigations.

_Hero image by [Pierre Bamin](https://unsplash.com/@bamin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)._

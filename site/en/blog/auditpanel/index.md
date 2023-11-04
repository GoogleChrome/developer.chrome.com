---
layout: 'layouts/blog-post.njk'
title: Auditing Your Web App For Speed
authors:
  - sethladd
date: 2010-07-28
#updated: 2014-07-04
---

## Introduction

{% Aside %}
**Update**: Feel free to use the DevTools Audits Panel, but for hunting down serious performance issues, you'll find the records from the [Pagespeed Insights DevTools extension](https://developers.google.com/speed/pagespeed/insights_extensions) more useful.
{% endAside %}

A fast web app is a successful web app. Your job as a developer is not done until you have optimized both the real and perceived performance of your app. Not only is it simply the right thing to do to ensure your users have an excellent experience, but there are very practical and important business reasons to optimize. Amazon measured a 1% drop in sales for every 100ms of site latency, and Google measured a 20% drop in traffic for every 0.5 second delay ([citation](http://www.scribd.com/doc/4970486/Make-Data-Useful-by-Greg-Linden-Amazoncom). Those are real numbers with real implications for your business and web app.

Web speed is so important, Google even has an entire effort devoted to [making the web faster](http://code.google.com/speed/). If you need yet another reason to optimize your app performance, [Google announced page speed was added to their ranking algorithm](http://googlewebmastercentral.blogspot.com/2010/04/using-site-speed-in-web-search-ranking.html).

There are many published best practices for optimizing the performance of your web app, including two great books ([High Performance Web Sites](http://oreilly.com/catalog/9780596529307/) and [Even Faster Web Sites](http://oreilly.com/catalog/9780596522308/)). Techniques on the server (implement the correct cache control headers) and on the client (provide image width and height attributes) are combined into an end to end strategy for optimizing performance. With so many tips and tricks, it's sometimes difficult to gauge how they all map to real life and your real web app.

Luckily, the [Chrome DevTools](http://devtools.chrome.com) (included in every instance of Chrome), provides an excellent tool which inspects your web app and offers customized recommendations to enhance performance and reduce latency. This article will cover the Audits Panel, which is similar in scope to the very popular [YSlow](http://developer.yahoo.com/yslow/) tool, and how you can use it to speed up your website, decrease latency, and increase user satisfaction.

Note, the Audits Panel tool is currently only available in Chrome, but we expect that other WebKit browsers will eventually integrate it.

## Getting Started

To illustrate how the Audits Panel can recommend web app performance improvements, we'll turn the tool towards our very own [www.html5rocks.com](http://www.html5rocks.com/). We'll use the Audits Panel to help make our site even faster.

Starting DevTools is as easy as using the Chrome icon (upper right of the Chrome window) and selecting Tools > Developer Tools.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/dSHpRxoEaxU9LjXzVjFB.png", alt="The DevTools are accessible in the Chrome menu.", width="595", height="500" %}
  <figcaption>The DevTools are accessible in the Chrome menu.</figcaption>
</figure>

For more information on how to get started with DevTools, please read [the official documentation](http://devtools.chrome.com).

The Audits Panel is located in the main tools button panel. You'll notice that, once selected, the Audits Panel has not yet run through its analysis of your web app. Running all of the heuristics can be slow, especially for a large web app such as GMail, so the tool is disabled by default.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/3Rn5zZTm5Nfo8v6nxMKb.png", alt="Audits Panel.", width="625", height="354" %}
  <figcaption>Audits Panel</figcaption>
</figure>

Let's dive in by clicking the Run button, which reloads the web app with the performance heuristics turned on. After the page reload, you'll see a list of recommendations similar to the screenshot below.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/TqajU7Ggo1dKkD51XRFH.png", alt="Recommendations of performance improvements from the Audits Panel.", width="624", height="237" %}
  <figcaption>Recommendations of performance improvements from the Audits Panel.</figcaption>
</figure>

You'll notice that the Audits Panel classifies the suggestions by severity, with the most severe marked with a red dot, and the medium severity suggestions marked with a yellow dot. This color coding helps you prioritize the suggestions, focusing on the most important (and biggest gains) first.

The number in parenthesis, following the suggestion, is how many instances the Audit Tool detected. For example, there were 12 instances of "Leverage browser caching". This gives you a sense of how often the suggestion can be applied.

## Speed Strategies

As mentioned before, there are plenty of well known and heavily tested strategies for optimizing web app performance. We won't be covering them all in depth with this article, but it's easy to find more information and details. Helpful resources for learning more about the specifics of web app optimization include [Let's make the web faster tutorials](http://code.google.com/speed/articles/) and [High Scalability's Latency is Everywhere and It Costs You Sales](http://highscalability.com/blog/2009/7/25/latency-is-everywhere-and-it-costs-you-sales-how-to-crush-it.html).

The Audits Panel groups its suggestions into two categories, Network Utilization and Web Page Performance.

According to the Audits Panel, to improve Network Utilization we should:

- leverage browser caching
- leverage proxy caching
- minimize cookie size
- serve static content from a cookieless domain
- specify image dimensions


To improve Web Page performance, we should:


- optimize the order of styles and scripts
- remove unused CSS rules

Let's look at one of the strategies we can focus on to improve htmlrocks.com performance.

## Leverage Browser Caching

For example, let's first dive into the recommendation to leverage browser caching. What does this mean, specifically? Opening up the option in the UI, we are presented with the following details:

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/2HeRrat5AjtLguXLVUW5.png", alt="The Audits Panel gives you recommendations for performance improvements.", width="627", height="402" %}
  <figcaption>The Audits Panel gives you recommendations for performance improvements.</figcaption>
</figure>

- The following resources are missing a cache expiration.  Resources that do not specify an expiration may not be cached by browsers.
- The following cacheable resources have a short freshness lifetime.
- The following resources are explicitly non-cacheable.  Consider making them cacheable if possible.

Caching resources is an excellent way to improve network utilization, which leads to lower bandwidth bills for the developer and faster response times for the user. Unfortunately, the tool doesn't tell you exactly what you need to do, so we need to dive into the recommendations a bit and use our knowledge of web app performance optimizations to apply these suggestions.

### Caching
  
  Without diving into HTTP caching, we can certainly cover some of the basics.  The [HTTP protocol includes caching instructions](http://tools.ietf.org/html/rfc2616#section-13), allowing the server and the client to reduce the amount of data that needs to be transferred over the wire.  For example, the server can tell the client to save the resource locally for a certain amount of time, thus eliminating the need to request the resource again.  The client can also ask if the server's resource is newer than the one that is stored locally.  Ideally, if a resource is static, the server should tell the client to store the resource locally and avoid asking the server for the resource in the future.  There are, as you can imagine, an incredible amount of details regarding HTTP caching, but the general theme is "reduce the amount of data sent over the wire by storing resources locally on the client".
 
## Fixing Non-Cacheable Resources

Let's look at one recommendation in depth, and learn how to connect the Audit recommendation to other tools inside DevTools. Specifically, let's look at how to fix "the following resources are explicitly non-cacheable."

Because caching is accomplished via the HTTP protocol, we need to look at the HTTP request and response for the http://www.html5rocks.com/ resource. Simply click on the resource to view the original request and response headers and details.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ZZksPEl53R4nBe5A8zLO.png", alt="Navigating the recommendations.", width="629", height="416" %}
  <figcaption>Navigating the recommendations.</figcaption>
</figure>

You are then taken to the Network, Resources or Sources panel (depending on the type of resource clicked) with further information. In this case we will be taken to the Network panel.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/JnV9ymdeJnc2QiJw6M0p.png", alt="Viewing header information.", width="624", height="419" %}
  <figcaption>Viewing header information.</figcaption>
</figure>

We are trying to confirm that the server has told the client "do not cache the homepage of html5rocks.com". To do this, we click on the resource to look at the Response Headers, as these are the headers and instructions sent by the server.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/FJc38M0as2SvuLprTjU2.png", alt="Example: The Cache-Control header.", width="740", height="420" %}
  <figcaption>Example: The <code>Cache-Control</code> header.</figcaption>
</figure>

Sure enough, the server sent the "Cache-Control: no-cache" header to the client. This, as you would imagine, tells the client to always ask for the resource and to not cache it locally. Specifically, the [HTTP specification for "no-cache"](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9.1) reads:

"If the no-cache directive does not specify a field-name, then a cache MUST NOT use the response to satisfy a subsequent request without successful revalidation with the origin server. This allows an origin server to prevent caching even by caches that have been configured to return stale responses to client requests."

This is exactly why the Audits Panel recommends enabling caching, because otherwise the server and client are sending potentially redundant information.

Now that we have confirmed the root cause of the Audit suggestion, how do we fix it? In this case, the solution involves server side configuration or code. Depending on your setup, you could enable caching through your web server's configuration or through configurations in your web app framework. Specifically, you should include an Expires header and a Cache-Control: private with a max-age parameter for any resource that you would want cached.

## Suggestions Are Just That, Suggestions

Remember that the Audits Panel is recommending improvements based on generic heuristics. It is applying best practices, learned over many years, to your specific web app. Most of the time, these recommendations are spot on and should be taken to heart.

However, there are a few cases where the recommendation may be correct but may not actually lead to any improvement. For example, if your page only has a single large image, the Audits Panel would recommend adding width and height attributes to the `<img>` tag (so that the rendering engine knows the image dimensions without having to download and inspect the image). While this is generally great advice, it won't help much if the image is the only element on the page.

Remember to apply these suggestions after you understand them. And don't forget to measure performance before and after the changes, to ensure there is actually an improvement.

## Summary

The Audits Panel is an excellent and easy to use tool that will quickly show you how to optimize the performance of your web app. Speed is a crucial web app attribute, as many companies have found direct correlations between performance and revenue or activity. Optimizing your app's performance is not just the right thing to do for your users, but it is the right thing to do for your business's bottom line.

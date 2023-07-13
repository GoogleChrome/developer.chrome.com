---
title: New in Chrome 115
description: >
  Use ScrollTimeline and ViewTimeline to create scroll-driven animations that enhance user experience. Fenced frames work along other Privacy Sandbox APIs to embed relevant content while preventing unnecessary context sharing. With the Topics API the browser can share information with third parties about a user's interests while preserving privacy and there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-07-13
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/9sdmAoQgWlK0cRPWRXWq.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-115
---

{% YouTube id='McqCMfREokE' %}

Here's what you need to know:


* Use `ScrollTimeline` and `ViewTimeline` to create [scroll-driven animations](#scroll-driven-animations) that enhance user experience.
* [Fenced frames](#fenced-frames) work along other Privacy Sandbox APIs to embed relevant content while preventing unnecessary context sharing.
* With the [Topics API](#topics-api) the browser can share information with third parties about a user's interests while preserving privacy.
* And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 115.

## Scroll driven animations {: #scroll-driven-animations}

Scroll-driven animations are a common UX pattern on the web. A scroll-driven animation is linked to the scroll position of a scroll container.
This means that as you scroll up or down, the linked animation goes forward or backward in direct response.

The following examples demonstrate some use cases. For example you can create reading indicators which move as you scroll:

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/HiTavHlNjHFrA3NLLDZq.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>A reading indicator atop a document, driven by scroll.</figcaption>
</figure>

Scroll-driven animations can also create elements that fade-in as they come into view:

<figure>
  {% Video src="video/AeNB0cHNDkYPUYzDuv8gInYA9rY2/eV0R7BXHO7ieTFVBfTEE.mp4", width="800", height="800", controls="true", playsinline="true" %}
  <figcaption>The images on this page fade-in as they come into view.</figcaption>
</figure>

By default, an animation attached to an element runs on the document timeline. Its origin time starts at 0 when the page loads, and starts ticking forward as clock time progresses. This is the default animation timeline and, until now, was the only animation timeline you had access to.

The [Scroll-driven Animations Specification](https://drafts.csswg.org/scroll-animations-1/) defines two new types of timelines that you can use:


- **Scroll Progress Timeline**: a timeline that is linked to the scroll position of a scroll container along a particular axis.
- **View Progress Timeline**: a timeline that is linked to the relative position of a particular element within its scroll container.

Here’s a code sample that uses an anonymous Scroll Progress Timeline to create a reading progress indicator fixed to the top of the viewport.

```html
<body>
  <div id="progress"></div>
  …
</body>
```

```css
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

#progress {
  position: fixed;
  left: 0; top: 0;
  width: 100%; height: 1em;
  background: red;

  transform-origin: 0 50%;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}
```

Read [scroll-drive animations](/articles/scroll-driven-animations/) for all the details and more examples.

## Fenced Frames {: #fenced-frames }

The [Privacy Sandbox](/docs/privacy-sandbox/overview/) is an initiative that aims to create technologies that both protect people's privacy online and give developers tools to build thriving digital businesses.

Many of its proposals aim to satisfy cross-site use cases without third-party cookies or other tracking mechanisms. For example:

* The [Protected Audience API](/docs/privacy-sandbox/fledge-api/): allows for interest-based ad serving in a privacy-preserving manner.
* [Shared Storage](/docs/privacy-sandbox/shared-storage/): allows access to unpartitioned cross-site data in a secure environment.

In order to preserve privacy some of these APIs require a new way to embed content. The solution is called a fenced frame.

Fenced frames work in combination with other Privacy Sandbox proposals to display documents from different storage partitions within a single page.

A fenced frame is a HTML element for embedded content, similar to an iframe. Unlike iframes, a fenced frame limits communication with its embedding context to allow the frame access to cross-site data without sharing it with the embedding context.

Similarly, any first-party data in the embedding context cannot be shared with the fenced frame.

<table class="with-heading-tint">
     <thead>
    <tr>
      <th>Feature </th>
      <th><code>iframe</code></th>
      <th><code>fencedframe</code></th>
    </tr></thead>
      <tbody>
    <tr>
      <td>Embed content</td>
      <td>Yes</td>
      <td>Yes</td>
   </tr>
   <tr>
      <td>Embedded content can access embedding context DOM</td>
      <td>Yes</td>
      <td>No</td>
   </tr>
   <tr>
      <td>Embedding context can access embedded content DOM</td>
      <td>Yes</td>
      <td>No</td>
   </tr>
   <tr>
      <td>Observable attributes, such as <code>name</code></td>
      <td>Yes</td>
      <td>No</td>
   </tr>
   <tr>
      <td>URLs (<code>http://example.com</code>) </td>
      <td>Yes</td>
      <td>Yes (<a href="https://github.com/WICG/fenced-frame/blob/master/explainer/use_cases.md">dependent on use case</a>)</td>
   </tr>
   <tr>
      <td>Browser-managed opaque source (<code>urn:uuid</code>)</td>
      <td>No</td>
      <td>Yes</td>
   </tr>
   <tr>
      <td>Access to cross-site data </td>
      <td>No</td>
      <td>Yes (dependent on use case)</td>
   </tr>
</tbody></table>


For example, let's say `news.example` (the embedding context) embeds an ad from `shoes.example` in a fenced frame. `news.example` cannot exfiltrate data from the `shoes.example` ad, and `shoes.example` cannot learn first-party data from `news.example`.

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/ss7wjBshEJcwdQXcXGov.png", alt="A comparison of before and after state of storage partitioning.", width="800", height="613" %}

Check out these articles for documentation about [Fenced Frames](/docs/privacy-sandbox/fenced-frame/), the [Protected Audience API](/docs/privacy-sandbox/fledge-api/), [Shared Storage](docs/privacy-sandbox/shared-storage/) and more

## Topics API {: #topics-api }

In the past, third-party cookies and other mechanisms have been used to track user browsing behavior across sites to infer topics of interest. These mechanisms are being phased out as part of the Privacy Sandbox initiative.

The Topics API allows a browser to share information with third parties about a user's interests while preserving privacy.

The Topics API enables interest-based advertising (IBA)  without tracking the sites a user visits. The browser observes and records topics that appear to be of interest to the user, based on their browsing activity. This information is recorded on the user's device.


For example, the API might suggest the topic `"Fiber & Textile Arts"`  for a user who visits the website `knitting.example`.


Topics are a signal to help ad tech platforms select relevant ads. Unlike third-party cookies, this information is shared without revealing further information about the user themself or the user's browsing activity.

Read [the Privacy Sandbox overview](/docs/privacy-sandbox/topics/overview/)  for all the details on the topics taxonomy and using the Topics API

## And more! {: #more }

Of course there’s plenty more.

* The maximum size of a `WebAssembly.Module` on the main thread increased to 8 megabytes
* The CSS `display` property now accepts multiple keywords as a value, besides the legacy precomposed keywords.
* There is an [origin trial](/origintrials/#/view_trial/1196831600973709313) for the Compute Pressure API, which offers high-level information about the current state of the device hardware.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 115.

* [What's new in Chrome DevTools (115)](/blog/new-in-devtools-115/)
* [Chrome 115 deprecations and removals](/blog/deps-rems-115/)
* [ChromeStatus.com updates for Chrome 115](https://chromestatus.com/features#milestone%3D115)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/114.0.5735.237..115.0.5790.93)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

Yo soy Adriana Jara, and as soon as Chrome 116 is released, I'll be right here to
tell you what's new in Chrome!
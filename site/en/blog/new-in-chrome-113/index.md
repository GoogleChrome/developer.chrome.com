---
title: New in Chrome 113
description: > 
  Chrome 113 is rolling out now! WebGPU is here, it allows high-performance 3D graphics and data-parallel computation on the web, devtools can now override network response headers, First Party Sets, part of the Privacy Sandbox, that allows organizations to declare related sites is starting to roll out, and there's plenty more. 
layout: 'layouts/blog-post.njk'
date: 2023-05-03
authors:
  - ajara
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/8owG1CkvkfqfAXDNcfQG.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-113
---

{% YouTube id='o6V1Le8GS7s' %}

Here's what you need to know:

* [WebGPU](#webgpu) is here, it allows high-performance 3D graphics and data-parallel computation on the web. 
* Devtools can now override network [response headers](#override-headers).
* [First Party Sets](#first-party-sets), part of the [Privacy Sandbox](https://privacysandbox.com/), that allows organizations to declare related sites is starting to roll out.
* And there's plenty [more](#more).

I'm Adriana Jara. Let's dive in and see what's new for developers in Chrome 113.
## WebGPU is here. {: #webgpu}
[WebGPU is a new API](/blog/webgpu-release/) for the web, which exposes modern hardware capabilities and allows rendering and computation operations on a GPU, similar to [Direct3D 12](https://learn.microsoft.com/en-us/windows/win32/direct3d12/what-is-directx-12-), [Metal](https://developer.apple.com/metal/), and [Vulkan](https://developer.nvidia.com/vulkan). 

Unlike the [WebGL](https://www.khronos.org/webgl/wiki/Getting_Started) family of APIs, WebGPU offers access to more advanced GPU features and provides first-class support for general computations on the GPU. 

The API is designed with the web platform in mind. It features:
An idiomatic JavaScript API. 
Integration with promises. 
Support for importing videos. 
A polished developer experience with great error messages.

Many widely used WebGL libraries are already working on implementing WebGPU support or have already done so. This means that using WebGPU may only require making a single line change, for example:

- **Babylon.js:** Has full WebGPU support already.
- **PlayCanvas:** Has announced initial WebGPU support.
- **TensorFlow.js:** Supports WebGPU-optimized versions of most operators.
- **Three.js:** WebGPU support is under development.

Check out [WebGPU's documentation](https://developer.mozilla.org/docs/Web/API/WebGPU_API) on MDN for all the details.


## Devtools response headers override. {: #override-headers }

 In DevTools you can now override response headers in the **Network** panel.

Previously, you needed access to the web server to experiment with HTTP response headers.

With response header overrides, you can locally prototype fixes for various headers, including but not limited to:

- [Cross-Origin Resource Sharing (CORS) Headers](https://developer.mozilla.org/docs/Web/HTTP/CORS)
- [Permissions-Policy Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Permissions-Policy)
- [Cross-Origin Isolation Headers](https://web.dev/coop-coep/)

To override a header, navigate to **Network** > **Headers** > **Response Headers**,
hover over a header's value, click **Edit** and edit it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N0GUECvGcvFad0JFs72l.png", alt="CORS error fixed by a header override.", width="800", height="504" %}

You can also add a new header:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/dRPqQCkvX4GT3KiFonaW.png", alt="Adding a custom header.", width="800", height="506" %}

And edit all overrides in a single place.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XSgXk86kVgdJTlEBplTc.png", alt="Editing all overrides.", width="800", height="431" %}

Check out [this article](/blog/new-in-devtools-113/) for instructions on how to use this feature and other updates in DevTools

## First-Party Sets is rolling out. {: #first-party-sets }

[First-Party Sets (FPS)](/docs/privacy-sandbox/first-party-sets/) is starting to roll out to stable. First Party Sets is part of the [Privacy Sandbox](https://privacysandbox.com/). It is a way for organizations to declare relationships among sites, so that browsers allow limited third-party cookie access for specific purposes.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/OLx3AXkweLjAiDzoDslb.png", alt="Diagram showing brandx.com, fly-brandx.com and drive-brandx.com as one group and example.com, example.rs, example.co.uk as another group.", width="800", height="348" %}

 As part of the work on First-Party Sets, Chrome is implementing and extending the Storage Access API allowing a site to request access to their cookies in a third-party context.
With it, organizations with related sites (for example, using different domain names, or country-specific domains) can still provide services like single sign-on or shared sessions. 
Remember! This API will be rolled out slowly to users over a number of weeks to enable testing and evaluation. 

## And more! {: #more }

Of course there's plenty more.

* The unprefixed [image-set](https://developer.mozilla.org/docs/Web/CSS/image/image-set) type is now available so authors don't need to use `-webkit-image-set` and it is up to date to the current spec.
* The [`overflow-inline`](https://developer.mozilla.org/docs/Web/CSS/@media/overflow-inline) and [`overflow-block`](https://developer.mozilla.org/docs/Web/CSS/@media/overflow-block) media features are now supported.
* There is an origin trial for [WebGPU WebCodecs integration](/origintrials/#/view_trial/1705738358866575361).

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 113.

* [What's new in Chrome DevTools (113)](/blog/new-in-devtools-113/)
* [Chrome 113 deprecations and removals](/blog/deps-rems-113/)
* [ChromeStatus.com updates for Chrome 113](https://www.chromestatus.com/features#milestone%3D113)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/112.0.5615.170..113.0.5672.58)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Adriana Jara, and as soon as Chrome 114 is released, I'll be right here to
tell you what's new in Chrome!

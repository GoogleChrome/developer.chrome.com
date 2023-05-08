---
layout: 'layouts/blog-post.njk'
title: Optimizing Images with the Angular Image Directive
description:
  Introducing the new Angular image directive (NgOptimizedImage) that brings built-in performance optimization techniques to images in Angular apps.
date: 2022-08-26
authors:
  - karaerickson
  - leenasohoni
hero: 'image/IypihH3o5cSpEMVp5i08dp69otp2/ZKPh5cWm0KrZ9XYK7UDV.jpg'
alt: >
  Two people looking at a website with images displayed.
tags:
  - performance
  - news
  - aurora-project
---

In May 2022, the [Aurora](https://web.dev/introducing-aurora/) and Angular teams announced that they would collaborate on an [image directive](https://angular.io/guide/roadmap#improve-image-performance) for Angular. The directive was recently released for developer preview as part of Angular v14.2. This post talks about how the new image directive, `NgOptimizedImage`, supports image optimization in Angular.


## Background

Images are a common and crucial component of web user experience, with [99.9%](https://almanac.httparchive.org/en/2021/media#images) of web pages generating requests for one or more images. Images are also the most significant contributors to page weight, constituting a median of [982 kilobytes](https://almanac.httparchive.org/en/2021/page-weight#fig-2) per page.

Due to their growing number and size, images can hinder the performance of web pages and affect [Core Web Vitals](https://web.dev/vitals/) metrics. For [79.4% of desktop pages](https://almanac.httparchive.org/en/2021/media#fig-4), an image was the Largest Contentful Paint ([LCP](https://web.dev/lcp/)) element in 2021. The pursuit of optimized images has thus become a constant endeavor for many of us.

The Aurora team believes in leveraging the power of frameworks to provide baked-in solutions to common developer challenges. Their first foray into the image optimization space was the [Next.js image component](https://web.dev/image-component/). They considered this component to be a  testing ground for whether improving the developer experience (DX) of image optimization could lead to performance wins for more apps using frameworks.

The first set of results from Next.js user [Leboncoin](https://medium.com/leboncoin-engineering-blog/how-we-are-improving-our-web-performance-9f850d59d810) was encouraging. Leboncoin saw a significant LCP improvement (from 2.4s to 1.7s) after they started using `next/image`. The subsequent adoption of `next/image` in the community played a role in the increase of Next.js origins meeting LCP thresholds. Soon there were [requests](https://github.com/angular/angular/issues/42765) for similar features in other frameworks, one of them being [Angular](https://angular.io/).

As a result, Aurora consulted with Angular and [Nuxt](https://nuxtjs.org/) to prototype image components for these frameworks. The [Nuxt image component](https://image.nuxtjs.org/) was released last year. Now the Angular image directive (`NgOptimizedImage`) has been released to bring image optimization defaults to Angular.


## Opportunity

Angular is one of the leading JavaScript frameworks used by developers today. It is used by more than [50k of the origins](https://datastudio.google.com/u/0/reporting/55bc8fad-44c2-4280-aa0b-5f3f0cd3d2be/page/M6ZPC?s=o6zLzlTpWaI&params=%7B%22df44%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580Angular%25EE%2580%2580Next.js%25EE%2580%2580Nuxt.js%22,%22df46%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580mobile%22%7D) crawled by [HTTPArchive](https://httparchive.org/) on mobile and boasts [nearly 3 million](https://www.npmjs.com/package/@angular/core) weekly downloads on NPM.


<figure>
{% Img src="image/IypihH3o5cSpEMVp5i08dp69otp2/epoxZjv8snr3xdEKl9UB.png", alt="LCP for Angular websites over the last one year.", width="800", height="711" %}
</figure>


Looking at the Core Web Vitals scores, the percentage of Angular origins that meet "good" LCP thresholds still needs work. Only 18.74% of Angular sites had good LCP on mobile in June 2022. Since images are the LCP element for more than 70% of the web pages on mobile and desktop, unoptimized LCP images could be one of the primary causes of poorer LCP on Angular websites.

The Angular image directive was designed to help improve these numbers.


## MVP for the NgOptimizedImage directive

The MVP of the Angular image directive builds on lessons from the image components Aurora has built to date while adapting the design to Angular’s client-side rendering experience. Many of the standard image optimization problems have been addressed by either:

* Providing strong defaults.
* Throwing errors or warnings to ensure conformance to best practices.

The highlights of the design are as follows:

1. **Intelligent lazy loading**

    Images that are invisible to the user on page load (for example, below-the-fold images or hidden carousel images) should ideally be [lazy-loaded](https://web.dev/lazy-loading-images/). Lazy loading frees up browser resources to load other critical text, media, or scripts. Most images are non-critical and should be lazy-loaded, but only [7.8% of pages](https://almanac.httparchive.org/en/2021/resource-hints#fig-16) used native lazy loading in 2021.

    The Angular image directive lazy loads non-critical images by default and only eagerly loads images specially marked as `priority`. This ensures that most images exhibit optimal loading behavior.


2. **Prioritization of critical images**

    Adding resource hints (e.g., <code>[preload](https://web.dev/preload-critical-assets/)</code> or <code>[preconnect](https://web.dev/uses-rel-preconnect/)</code>) to prioritize the loading of critical images is a [recommended best practice](https://web.dev/preload-critical-assets/). However, most apps are not using them. According to the 2021 Web Almanac, only [12.7% of mobile pages](https://almanac.httparchive.org/en/2021/resource-hints#fig-2) use preconnect hints and [only 22.1% of mobile pages](https://almanac.httparchive.org/en/2021/resource-hints#fig-2) use preload hints.


	The image directive acts on two fronts when images are marked as priority.

    * It sets the [fetchpriority](https://web.dev/fetch-priority/#increase-the-priority-of-the-lcp-image) of the image to `"high"` so that the browser knows that it should download the image with a high priority.
    * In development mode, a runtime check confirms that a `preconnect` resource hint has been included corresponding to the image's origin.

    In development mode, the directive also uses the [PerformanceObserver API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) to verify that the [LCP image](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint/element) has been marked `priority` as expected. If it's not marked `priority`, an error is thrown, instructing the developer to add the `priority` attribute to the LCP image.


    Ultimately, this combination of automation and conformance ensures that the LCP image has a `preconnect` hint, a `fetchpriority` attribute value of `high`, and isn't lazy loaded.


3. **Optimized configuration for popular image tooling**

    It's recommended that Angular applications [use image CDNs](https://web.dev/image-cdns/), which often provide optimization services by default.


    The directive encourages using image CDNs by providing an especially appealing developer experience (DX) to configure them in the app. It supports a loader API that allows you to define the CDN provider and your base URL in your configuration. Once configured, you only have to define the asset name in the markup. For example,


    ```html
    // in module providers:
    provideImgixLoader('https://mysite.net/assets/')

    // in markup
    <img ngSrc="image.png" >
    <img ngSrc="image2.png" >
    ```

    This is equivalent to including the following image tags and reduces the markup developers must include for every image.


    ```html
    <img src="https://mysite.net/assets/image.png">
    <img src="https://mysite.net/assets/image2.png">
    ```

    The image directive provides built-in loaders with optimal configuration for the most popular image CDNs. These loaders will format image URLs automatically to ensure that the recommended image format and compression settings are used for each CDN.

4. **Built-in errors and warnings**

    In addition to the above built-in optimizations, the directive also has built-in checks to ensure that developers have followed the recommended best practices in the image markup. The image directive performs the following checks.

    1. **Unsized images:** The image directive throws an error if the image markup does not have defined an explicit width and height. Unsized images can cause [layout shifts](https://web.dev/optimize-cls/#images-without-dimensions), affecting the page's Cumulative Layout Shift ([CLS](https://web.dev/cls/)) metric. The recommended best practice to prevent this is that images should have `width` and `height` attributes specified.

    2. **Aspect ratio:** The image directive throws an error to let developers know if the aspect ratio of the `width`:`height` defined in the HTML is not close to the actual aspect ratio of the rendered image. This can cause the image to look distorted on screen. This can happen if
        1. You have defined the wrong dimensions (width or height) by mistake or
        2. If you have defined one dimension by percentage in your CSS, but not the other (for example, `width: 100%` needs `height: auto` to ensure the image grows in both dimensions).

    3. **Oversized images:** If the image does not define a `srcset `and the intrinsic image is significantly larger than the rendered image, the directive will display a warning suggesting the use of the `srcset` and `sizes` attributes.

    4. **Image density:** The directive will throw an error if you try to include an image in the `srcset` with a pixel density of more than `3x`. Descriptors higher than `2x` are generally not recommended because it has the unintended consequence of forcing high-resolution mobile devices to download huge images. Moreover, [the human eye can't actually tell much of a difference above 2x](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices#:~:text=3x%20resolution%20screens%20are%20wasteful).


## Challenges

Adapting image optimization strategies to work within a client-side framework was a primary challenge when designing `NgOptimizedImage`. The default rendering experience on Next.js is Server Side Rendering (SSR) or Static Site Generation (SSG),  while that on Angular is Client Side Rendering (CSR). Even though Angular supports an SSR library - [angular/universal](https://angular.io/guide/universal) - most Angular apps (~60%) use CSR.

The image directive is entirely built for CSR to align with the typical use case in Angular apps. This set additional constraints, and the team had to rethink how to build specific optimizations for CSR apps.

Some of the challenges encountered are as follows:

1. **Supporting resource hints**

    [Preloading critical assets](https://web.dev/preload-critical-assets/) helps the browser discover them earlier. However, including resource hints in Angular apps is complicated because:


    **Manual Addition**: It's difficult for developers to add the `preload` resource hint manually. Angular uses one shared index.html file for the entire project or for all routes in the website. Thus, the `<head>` of the document is the same for every route (at least at serve time). Adding any `preload` hint to the `<head>` would mean that the resource would be preloaded for all routes even where it is not required. Thus, the manual addition of `preload` hints is not recommended.


    **Automatic addition during render:** Utilizing the framework to add preload hints to the head of the document during render in a CSR app does not help. Since rendering occurs after JavaScript is downloaded and executed, the `<head>` will be rendered too late to be of any value.


    For the first version of the directive, a combination of `preconnect` hints and `fetchpriority` hints serve to prioritize the image in lieu of a `preload`. However, Aurora is currently working with the Angular CLI team to enable automatic injection of resource hints at build time—stay tuned!

2. **Optimizing image size and format on the server**

    As Angular apps are typically client-side rendered, images on the file system cannot be compressed at request time and are served as is. For this reason, using image CDNs is recommended to compress images and convert them into [modern formats like WebP](https://web.dev/serve-images-webp/) or AVIF on demand.


    While the directive does not enforce the use of image CDN’s, it's strongly encouraged to use them with the directive and its built-in loaders ensure that the correct configuration options are used.



## Impact

The following demo demonstrates the difference the Angular image directive can make to image performance. It compares two websites:

**Website One:** Uses native `<img>` elements with images served through the Imgix CDN (with default configuration options).

**Website Two:** Use the image directive for all images. It also includes the optimizations recommended directly by warnings or errors thrown by the directive.


<figure>
{% Img src="image/IypihH3o5cSpEMVp5i08dp69otp2/Jc3mkO2gYZGOPul8Dpgk.png", alt="Filmstrip comparison: Website One with native image tags versus Website Two with the Angular image directive.", width="800", height="391" %}
</figure>


{% Aside 'success' %}
When running these demos through [WebPageTest](https://webpagetest.org) lab tests on a physical Moto G4 device, there is a substantial improvement of 56% in LCP. The original LCP of 4.5 seconds on Website One using native image tags reduces to 2 seconds on Website Two using the image directive.
{% endAside %}


The team worked with partners to validate the image directive's performance impact on real enterprise Angular applications.

One of these partners was [Land's End](https://www.landsend.com/). It was expected that their site would be a good test case for results that real applications might see.

[Lighthouse lab testing](https://philipwalton.com/articles/my-challenge-to-the-web-performance-community/) was performed on their QA environment before and after using the image directive. On desktop, their median LCP decreased from 12.0s to 3.0s, a 75% improvement in LCP. On mobile, the median LCP decreased from 20.2s to 12.0s (40.6% improvement).

{% Aside %}
It's important to note that the lab testing above is only intended as a general demonstration of the potential of the directive. [Field data](https://web.dev/lab-and-field-data-differences/#field-data) is much preferred to validate performance impact. The Aurora team is currently working with a few production partners to attain this data, and the blog post will be updated as soon as it's available.
{% endAside %}



## Future Roadmap

This is only the first installment of the design for the Angular image directive. There are many other features planned for future versions, including:

* **Better support for responsive images:**

    `NgOptimizedImage` currently supports using `srcset`, but the `srcset` and `sizes` attributes must be manually provided for each image. In the future, the directive could generate the `srcset` and `sizes` attributes automatically.

* **Automatic injection of resource hints**

    It might be possible to integrate with the Angular CLI to generate preconnect and preload tags for critical LCP  images.

* **Support for Angular SSR**

    The MVP version is designed keeping in mind Angular CSR constraints, but it will also be important to explore image optimization solutions for Angular SSR (angular/universal).

* **Developer experience improvements**

    `NgOptimizedImage` requires that `width` and `height` attributes are specified for each image. However, specifying these for each image may be tiresome for some developers. There is a potential to improve the developer experience here in the next iteration as follows:

    1. Support an additional mode (similar to the "`fill`" [image layout option in Next.js](https://nextjs.org/docs/api-reference/next/image#layout)) that doesn't require explicit width/height to be defined.
    2. Using CLI integration to automatically set the width and height for [local images](https://nextjs.org/docs/basic-features/image-optimization#local-images) by determining the actual dimensions of the image.


## Conclusion

The Angular image directive will be available to developers in stages, starting with the developer preview version in v14.2.0. Do give `NgOptimizedImage` a try and leave feedback!


*With special thanks to Katie Hempenius and Alex Castle for their contribution.*

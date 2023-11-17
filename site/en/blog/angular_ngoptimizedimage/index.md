---
layout: 'layouts/blog-post.njk'
title: What’s new in the Angular NgOptimizedImage directive
description:
  Learn about the new features included in the Angular NgOptimizedImage directive that further improve image performance in Angular apps.
date: 2023-11-15
authors:
  - alexcastle
hero: 'image/m1xBwEK30TUVOPXOaWN8CXVd3Dg1/4lEN9XIan6f86Y2qoAzS.webp'
alt: >
  The Angular logo
tags:
  - performance
  - news
  - aurora-project
---
 

Just over a year ago the [Chrome Aurora team](/aurora) launched the [Angular NgOptimizedImage directive](/blog/angular-image-directive/). The directive is focused primarily on improving performance, as measured by the [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals) metrics. It bundles common image optimizations and best practices into a user-facing API that’s not much more complicated than a standard `<img>` element.

In 2023, we've enhanced the [directive](https://angular.io/guide/image-directive) with new features. This post describes the most substantial of those new features, with an emphasis on why we chose to prioritize each feature, and how it can help improve the performance of Angular applications.


## New features

NgOptimizedImage has improved substantially over time, including the following new features.


### Fill mode

Sizing your images by providing a `width` and `height` attribute is an extremely important optimization for reducing [layout shift](https://web.dev/articles/cls), because browsers need to know the aspect ratio of the image in order to save room for it. However, sizing images is additional work for application developers, and doesn’t make sense with some image use cases.

Helping to resolve this tension is the first major feature added to the image component post-developer preview: **[fill mode](https://angular.io/guide/image-directive#request-images-at-the-correct-size-with-automatic-srcset)**. This is a way for developers to include images without explicitly sizing them, and without incurring layout shift. 

With fill mode, the image sizing requirement is disabled, and the image is automatically styled to fill its containing element. This decouples an image’s aspect ratio from the space it occupies on the page, and gives you greater control over how images fit into your page layout.

Fill mode uses NgOptimizedImage as a better-performing alternative to the `background-image` css property. Place an image inside the `<div>` or other element that would have had the `background-image` styling, then enable fill mode, as demonstrated in the preceding code example. Use the `object-fit` and `object-position` CSS properties on the `<div>` to control how the image is positioned in the background.

```html
// Height and width are required
<img ngSrc="example.com" height="300" width="400">

// Unless you use fill mode!
<div style="width: 100vw; height: 50em; position: relative">
  <img ngSrc="example.com" fill>
</div>
```

### Srcset generation

One of the most effective image optimization techniques is [the use of the `srcset` attribute](https://web.dev/learn/design/responsive-images#responsive_images_with_srcset) to ensure that properly-sized images are downloaded for any device that accesses your application. Using `srcset` throughout your app can prevent you from wasting bandwidth and substantially improve your [LCP Core Web Vital](https://web.dev/articles/lcp).

The downside to the `srcset` attribute is that it can be cumbersome to implement. Manually writing out `srcset` values means adding multiple lines of markup to each image element in your app, complete with multiple custom URLs for each `srcset`. You also have to decide on a set of breakpoints, which is complicated, as they can represent both screen densities and the viewport sizes of common devices.

That’s why adding **[automated srcset generation](https://angular.io/guide/image-directive#request-images-at-the-correct-size-with-automatic-srcset)** into the NgOptimizedImage directive was a major post-launch milestone. With this addition, any application using a CDN that supports image resizing can get full, customizable, srcsets automatically added to every image generated with the NgOptimizedImage directive. 

We’ve included a simplified API for setting the `sizes` property, which is used to ensure that each image gets the correct type of `srcset`. If you don’t include a `sizes` attribute, we know that the image is meant to be fixed-size, and should get a density-dependent srcset, like the following:

```html
<img src="www.example.com/image.png" srcset="www.example.com/image.png?w=400 1x, www.example.com/image.png?w=800 2x" >
```

This kind of srcset ensures that images are served at a size that takes the user’s device pixel density into account. 

On the other hand, if you do include the `sizes` property, `NgOptimizedImage` generates a responsive srcset that includes breakpoints for many common device and image sizes, using this default list of breakpoints:

```javascript
[16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]
```

### Preconnect generation

To improve LCP, it’s important to reduce the time your users spend downloading the LCP image. In the previous section, you saw how `srcset` can assist  by transferring smaller image files, but an equally important optimization is to start the transfer as soon as possible. One way to do that is by using `link rel="preconnect"` tags to jump-start the connection to your image domain.

From the start, NgOptimizedImage has warned if you fail to preconnect to your LCP image’s domain, but warning isn’t the ideal solution–we’d rather just fix the problem for you. And that’s exactly what NgOptimizedImage now does, with **automated preconnect generation**.

To support this feature, we use static code analysis to attempt to detect image domains in NgOptimizedImage [loaders](https://angular.io/guide/image-directive#configuring-an-image-loader-for-ngoptimizedimage) and automatically generate preconnect link tags for those domains. There still may be cases where manual preconnect links are required, but for most users, automatic preconnect means one less step needed for good image performance.


### Enhanced support for custom loaders

A key element of NgOptimizedImage is the loader architecture, which allows the directive to automatically generate URLs that are tailored to the application’s image CDN. A set of built-in loaders is included for widely-used CDNs. We also provide for the use of [custom loaders](https://angular.io/guide/image-directive#custom-loaders), which allow you to integrate NgOptimizedImage with nearly any image hosting solution.

At launch, these custom loaders were limited in scope, and could only read the `width` attribute from the image element. In response to user feedback, we added support for a customizable `loaderParams` data structure, which allows arbitrary data to be passed from the image element to the custom loader. With the expansion, custom loaders can be as simple or as complex as required by an application’s image infrastructure.

The following example shows how a simple custom loader could use the `loaderParams` API to select between two alternate image domains: 

```javascript
const myCustomLoader = (config: ImageLoaderConfig) => {
  if (config.loaderParams?.alternateDomain) {
    return `https://alternate.domain.com/images/${config.src}`
  }
  return `https://primary.domain.com/images/${config.src}`;
};
```

An example of a more complex custom loader is available in the [Angular documentation](https://angular.io/guide/image-directive#example-custom-loader).


### Expanded guidance for image performance

Up until now, every image performance alert we’ve added to Angular has been part of the NgOptimizedImage directive. If you’re not using the directive in the app, you won’t get any guidance on image performance issues.

In Angular 17, we’re expanding the scope of image performance guidance to include all Angular apps. Now, if we detect image patterns that we know are performance-hurting mistakes, such as lazy-loading your LCP image, or downloading a file that’s much too big for the page, we’ll let you know, even if you’re not using NgOptimizedImage.

Image performance is important for all apps, and we’re excited to continue building out guardrails to help prevent common mistakes in Angular apps.


## Looking forward

We’re already hard at work developing the next set of features for NgOptimizedImage. While image performance remains our central concern, we’d also like to add features that improve developer experience, to make sure that NgOptimizedImage remains an attractive option for including images in Angular applications.

One feature that’s a priority for us is image placeholders. These are commonly used to make image loading look better on web applications, but can hurt performance if implemented incorrectly. We hope to build a performance-first image placeholder system into NgOptimizedImage. Stay tuned to [our blog](/tags/aurora-project/) for further announcements!

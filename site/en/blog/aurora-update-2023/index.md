---
layout: 'layouts/blog-post.njk'
title: What's New with Aurora?
description: >
  Learn what the Chrome Aurora team has been up to lately and their roadmap for 2023.
date: 2023-05-19
authors:
  - karaerickson
tags:
  - aurora-project
hero: image/0SXGYLkliuPQY3aSy3zWvdv7RqG2/KvZQXFKIGKEzAjxzf5bF.jpg
alt: >
  Night sky
---

Chrome's Aurora initiative is a collaboration between Chrome and open-source Javascript frameworks and tooling to improve user experience on the web. If Aurora is new to you, take a look at our [introduction post](/blog/introducing-aurora/) to learn more about our mission and methodology.

Given that we haven't published a roadmap since 2021, we'd like to share what we've been up to and some exciting projects we have in store for 2023. 

## Recent project highlights

For the past few years, we've been partnering with frameworks like Next.js, Angular, and Nuxt to optimize [Core Web Vitals](https://web.dev/vitals/). Here are some highlights since our last update.

### Images

Images are often a source of performance issues. The following are some of the methods we've been pursuing with framework stakeholders to ensure that best practices are available out of the box, so that developers are delivering images optimally by default when they use the frameworks we're partnering with.

#### Angular image directive

We published a [stable image directive](https://angular.io/guide/image-directive) for the Angular framework, available in Angular 15 and specially backported to 13.4 and 14.3. This directive enables [native lazy loading](https://web.dev/browser-level-image-lazy-loading/) by default, adds [`fetchpriority` hints](https://web.dev/fetch-priority/) to priority images, and automatically generates appropriate `srcset` attributes for responsive images.

**The impact**: [Lighthouse lab testing](https://philipwalton.com/articles/my-challenge-to-the-web-performance-community/) was performed on [Land's End's](https://www.landsend.com/) QA environment before and after using the image directive. On desktop, their median [Largest Contentful Paint (LCP)](https://web.dev/lcp/) decreased from 12.0s to 3.0s, a 75% improvement in LCP.

<figure>
{% Img src="image/IypihH3o5cSpEMVp5i08dp69otp2/Jc3mkO2gYZGOPul8Dpgk.png", alt="Filmstrip comparison: Website One with native image tags versus Website Two with the Angular image directive.", width="800", height="391" %}
</figure>

Read more about the directive in our blog post, [Optimizing Images with the Angular image directive](/blog/angular-image-directive/).

#### Revamped `next/image`

We also worked with the Next.js team to update the [image component](https://nextjs.org/docs/app/building-your-application/optimizing/images) to use new browser features like native lazy loading and `fetchpriority` HTML attribute. The new version is available by default from Next 13. 

**The impact** : Our partner [Leboncoin](https://www.leboncoin.fr/) was able to improve the LCP of some pages by up to 60% by switching to the new version of `next/image`.

### Web fonts

Web font optimization can be tricky to get right, as there's more involved than reducing the transfer size of font resources. Web fonts can also contribute significantly to a page's [Cumulative Layout Shift (CLS)](https://web.dev/cls/) metric, and minimizing layout shifts due to font swaps requires considerable effort. Fortunately, we partnered with frameworks to make this task even easier for web developers.

#### Tooling for improved font fallbacks in Next.js, Nuxt, and Vite

We shipped a [feature in Next 13](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) that adjusts the dimensions of a page's fallback font to better align with the web font when it loads in. This reduces font-related CLS. We shared our methodology with the Nuxt team, and it became the inspiration for the [`nuxtjs/fontaine` module](https://github.com/nuxt-modules/fontaine) and the [`fontaine` Vite plugin](https://github.com/danielroe/fontaine), which both use the same underlying algorithm.

**The impact**: Our partner Vox Media was able to reduce CLS on [The Verge](https://www.theverge.com/) down to 0 in production on some pages using this feature.

Read more in our blog posts about [generating improved font fallbacks](/blog/font-fallbacks/) and [font fallback framework tools](/blog/framework-tools-font-fallback/).

#### `nuxtjs/google-fonts` module

We partnered with the Nuxt team to release a [module](https://google-fonts.nuxtjs.org/) to optimize Google Font performance. The module automatically downloads and self-hosts Google fonts to avoid an extra server round trip and also supports font inlining options. 

### Third-party scripts

Third-party JavaScript is a potential source of performance issues, and may affect metrics such as [Interaction to Next Paint (INP)](https://web.dev/inp/), as the work these scripts schedule may delay user interactions from running.

#### `next/script` component for third-party scripts

We built a [script component](https://nextjs.org/docs/app/building-your-application/optimizing/scripts) for Next 12+ that defaults to loading scripts after hydration to prevent blocking the critical path during loading. It also features a web worker mode that integrates [Partytown](https://partytown.builder.io/) to move scripts completely off the main thread.

**The impact**: In Lighthouse lab tests, [CareerKarma](https://careerkarma.com/) saw a 24% reduction in LCP using the `next/script component` with worker mode enabled.

<figure>
  {% Img src="image/IypihH3o5cSpEMVp5i08dp69otp2/a3gpB5Ji7vcvQjBhviCP.png", alt="Film strip comparison showing improvment in LCP", width="800", height="372" %}
</figure>

Read more in our blog post, [Optimizing third-party script loading in Next.js](/blog/script-component/).

### Miscellaneous

Our partnerships with framework developers don't end at improving Core Web Vitals. We're also working to leverage more of what's new, and make it even easier for developers to start using bleeding-edge web platform features.

#### Container queries polyfill

We updated the [container queries polyfill](https://www.npmjs.com/package/container-query-polyfill) to support a wider set of CSS features and improved its performance, working towards its 1.0 release.

Read more in our blog post, [Inside the Container Query Polyfill](/blog/inside-the-container-query-polyfill/).

## What's next for Aurora?

In 2023-2024, we have a number of exciting projects coming down the pipeline to optimize Core Web Vitals for framework developers. 

In the coming year, we will be focused on the following:

* **Third-party wrapper components for Next.js and Nuxt**: Wrapper components can facilitate loading popular 3P libraries in an optimal way for LCP and INP. Drop a component tag into the DOM to load your 3P instead of a script tag and the framework will select the best loading strategy. See [the RFC](https://github.com/vercel/next.js/discussions/48256) for more details. 

* **Angular SSR and hydration developer experience**: We have been working closely with the Angular team on the [SSR and hydration project](https://angular.io/guide/hydration). Our focus has been to upgrade the developer experience of using SSR, allowing more applications to take advantage of the LCP benefits. Stay tuned for an official RFC around SSR DOM manipulation features.

* **Angular image directive and `nuxt/image` features**: We have a number of exciting features planned for Angular, such as automatic preconnect hint generation, migration tools to aid the transition from basic `<img>` elements, `<picture>` element support, and placeholders. We will also be consulting with the Nuxt team on a number of new features for `nuxt/image`.

* **INP research (cross-framework)**: As [Interaction to Next Paint (INP)](https://web.dev/inp/) will be replacing [First Input Delay (FID)](https://web.dev/fid/) in 2024, we are ramping up support for improving INP in frameworks. This will involve analysis of the root causes for INP issues in frameworks and creating built-in solutions for framework users where possible.

* **Speedometer 3**: We are also helping to implement the next generation of the benchmarking tool [Speedometer](https://browserbench.org/Speedometer2.0/) to represent the modern web framework landscape of 2023. 

## Stay up to date

Bookmark [our landing page](/aurora) to stay up-to-date with the latest news, tech talks, and blog posts from the Aurora team. You can also follow us on Twitter:

* Kara Erickson  - [karaforthewin@](https://twitter.com/karaforthewin)
* Houssein Djirdeh - [hdjirdeh@](https://twitter.com/hdjirdeh)
* Katie Hempenius - [katiehempenius@](https://twitter.com/katiehempenius)
* Alex Castle - [atcastle@](https://twitter.com/atcastle)
* Gerald Monaco - [devknoll@](https://twitter.com/devknoll)
* Janicklas Ralph James - [janicklas@](https://twitter.com/janicklas)
* Thorsten Kober - [tckober@](https://twitter.com/tckober)

---
layout: 'layouts/blog-post.njk'
title: Astro View Transitions
description: 
  Highlight how the Astro community embraced View Transitions when Chrome was shaping up the API and the journey towards landing first-class support for it in Astro + persistent islands
date: 2023-08-30
authors:
  - schottfk
  - phillipsm
  - ferreiram
  - karaerickson
  - addyosmani
hero: 'image/1L2RBhCLSnXjCnSlevaDjy3vba73/EncUMvDPYDCZHMbJt3Kg.png'
alt: >
  Logos of Chrome and Astro
tags:
  - aurora-project
---

Today we would like to share more about Chrome and [Astro](https://astro.build/)’s journey with the [View Transitions API](/docs/web-platform/view-transitions/). This includes how the Astro community embraced and experimented with the API early, highlighting the possibilities to the broader community. We’re also excited to share more about the new built-in support for View Transitions in Astro 3.0! 

## Background

Seamless transitions between different states of a page, known as _state transitions,_ have always been a complex aspect of building seamless, animated experiences on the web. Despite the availability of tools like CSS transitions, CSS animations, and the Web Animation API, creating state transitions has remained a daunting task. One of the challenges is handling interaction on outgoing elements, which can make the transitions more complex.

In addition, maintaining reading position and focus for assistive devices is difficult. And, dealing with scroll position differences makes state transitions a cumbersome process. All these factors contribute to the complexity of implementing smooth transitions between various elements on a webpage

**The View Transitions API** emerged as the browser’s solution to these challenges. This new API provides an easier way to change the DOM in a single step while creating an animated transition between two states.  

The [launch of the View Transitions API in Chrome 111](/blog/spa-view-transitions-land/) marked the beginning of a broader vision for transition support for all websites, not just JavaScript-based web applications. Future enhancements are also on their way.  Chrome may explore exciting additions like transitions across documents, compositor-driven animations, scoped transitions, and nested transition groups in the future.

<figure>
  {% Video src="video/1L2RBhCLSnXjCnSlevaDjy3vba73/0o0qMJfjMfQqaldl4N4G.mp4", width="800", height="624", controls=true, autoplay=true, loop=false, muted=true, playsinline=true %}
  <figcaption>
    With the View Transitions API, navigating traditional multi-page applications feels as seamless as using a native app.
  </figcaption>
</figure>

Visit demo: [Live](https://astro-movies.pages.dev/), [Source](https://github.com/Charca/astro-movies)

## Early explorations with view transitions

Chrome's journey with the View Transitions API was not a solitary one. Feedback and collaboration from developers, framework authors, and the CSS Working Group all played a crucial role in shaping the feature over the course of several years.

Developer experimentation played a critical role early on. The earliest versions of the API didn't support CSS animations, and transitions were restricted to a few restrictive presets. Early feedback made it clear that developers wanted transitions to be fully customizable and expressive. This back-and-forth collaboration ensured that the API was designed with a balance of good defaults, extensibility, and customization.

Astro was one of those frameworks that leaned into View Transitions early. The rest of this article is from the point of view of the Astro team, and shares their experience finding, adopting, and bringing View Transitions front-and-center to the web development experience.

## Why Astro bet on view transitions

Astro had been looking for something like View Transitions for a long time. Astro is a JavaScript web framework that server-renders your UI components to lightweight HTML for faster page load performance. Astro intentionally moves as much work off the client device as possible. Astro websites use native browser page navigation, where other web frameworks might hijack browser navigation with JavaScript client-side routing instead.

This tradeoff created a challenge for the Astro team: How could Astro animate page transitions and provide app-like UI persistence across pages without adopting client-side routing? 

<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/SIBoP8VgOkV2bBWTWmwE.png", alt="ALT_TEXT_HERE", width="800", height="678" %}
  <figcaption>
    Challenges of animating page transitions with Astro
  </figcaption>
</figure>


View Transitions were the answer. With View Transitions, Astro could provide the same routing features that JavaScript-heavy SPA web frameworks offered, but without the performance and complexity overhead of client-side routing. Other frameworks approached View Transitions as an optional implementation detail, but for Astro it was something much bigger.

<figure>
{% Img src="image/1L2RBhCLSnXjCnSlevaDjy3vba73/cG7Evh8rZRMB2q0wObHx.png", alt="ALT_TEXT_HERE", width="800", height="455" %}
  <figcaption>
    View Transitions as the answer
  </figcaption>
</figure>


The next question the Astro team had to answer was, “how?” The team looked to projects like Turbo, Swup, and Livewire for inspiration and even prototyped a few similar approaches inside of Astro. 

One of the earliest attempts involved a full-page “smart transition” that would automatically compare every new page of HTML to the current HTML and then attempt to replace every element at once using JavaScript. It was clever, but error-prone.

```javascript
    // An early API design for enabling view transitions
    // in Astro via top-level config. Never implemented.

    export default defineConfig({
      router: 'spa'
    })
```

Thankfully, the Astro community showed that the View Transitions API was already powerful without the product over-complicating things. After seeing some early demos, the Astro team were sold on the idea of a simple Astro API that could match the browser APIs as closely as possible. Instead of seeing View Transitions as an invisible implementation detail hidden inside of Astro, they could be directly exposed to the developer. ligning Astro directly with the web platform and reducing overall complexity on the frontend.

```javascript
    // Add a simple fade transition with 2 lines of code!
    // 1. Import the <ViewTransitions> component
    // 2. Add it to your common/base head component, or individual pages.

    import { ViewTransitions } from 'astro:transitions';
```
```html
    <head>
      <title>My View Transitions Demo</title>
      <ViewTransitions />
    </head>
```

The work became simple: bring the new View Transitions API into Astro and provide automatic fallbacks that would bring to as many websites and browsers as possible. Fallback support is essential, because most browsers (outside of Chrome) haven’t shipped full support for native View Transitions yet.

## Launching official support in Astro

Astro released experimental View Transitions support in Astro 2.9. The response was positive immediately. Developers began sharing incredible demos of so many different use-cases, and in some cases even shipping it all to production. 

<figure>
  {% Video src="video/1L2RBhCLSnXjCnSlevaDjy3vba73/UomZ1Je8dO4WbD6tR5FP.mp4", width="800", height="593", controls=true, autoplay=true, loop=false, muted=true, playsinline=true
  %}
  <figcaption>
    Videos and animations continue to play while View Transitions are taking place. Thanks to Astro 3.0 built-in support, transitions can include shared elements across different routes.
  </figcaption>
</figure>

Visit demo: [Live](https://live-transitions.pages.dev/), [Source](https://github.com/Charca/view-transitions-live)

Astro 3.0, finalizes support and unflags the new View Transitions API for everyone. These new APIs are now ready for you to adopt experimentally, or all-at-once.

```html
    <main transition:animate="slide">
      <p>Slide animation as you navigate to and from the page!</p>
    </main>
    <aside transition:name="my-aside">
      <p>Animate and morph the matching "my-aside" element across pages automatically!</p>
    </aside>
```
An unexpected benefit of aligning Astro with the platform APIs is the ability to to experiment with building new features on top of the native View Transitions API. For example, the new Astro `transition:persist` directive lets any element persist itself across a full-page navigation. This powers long-lived elements like persistent audio and video players, something that used to only be possible in heavy-weight JavaScript SPAs. 

```html
    <video controls="" autoplay="" transition:persist>
      <source src="https://ia804502.us.archive.org/33/items/GoldenGa1939_3/GoldenGa1939_3_512kb.mp4" type="video/mp4">
    </video>
```

<figure>
  {% Video src="video/1L2RBhCLSnXjCnSlevaDjy3vba73/90DVznqvAEye95LiZPED.mp4", width="800", height="692", controls=true, autoplay=true, loop=false, muted=true, playsinline=true
  %}
  <figcaption>
    Astro 3.0 supports persisting HTML elements across page navigations. When persisting interactive UI components, their state is also maintained.
  </figcaption>
</figure>

Visit demo: [Live](https://astro-records.pages.dev/), [Source](https://github.com/Charca/astro-records)

Astro is also free to make View Transitions more ergonomic to the developer. For instance, the team has already added support for custom forward/backward animations and animations for dynamic HTML. Both of these features are difficult to do with the lower-level APIs alone, but in Astro they are practically effortless.

These features are only in Astro for now, but the Astro team hopes to feed their experience back to the specification authors and working groups for potential browser enhancements down the road. For example, by closely monitoring [a proposal](https://github.com/w3c/csswg-drafts/issues/8319) to make it easier to share animations in CSS.


## What comes next?

The future for View Transitions on the web is bright. Astro, Nuxt, and HTMX have all shipped some degree of support, and many others have expressed interest. 

The Chrome team is thrilled about Astro's native View Transitions support. It's a big step for web development, enabling more fluid and dynamic user experiences. Developers, we encourage you to dive into View Transitions in Astro 3.0. Whether you're creating new landing pages or upgrading existing sites, these enhancements are game-changers. View Transitions helped to fill a gap between what was possible with SPAs and MPAs. Chrome would love to hear from you on whether there are additional gaps in support for SPA and/or MPA. Feel free to comment on the [View Transitions WICG GitHub repo](https://github.com/WICG/view-transitions/) to discuss this further. 

We're already inspired by the innovative demos and applications we've seen, and we're eager to see more. Your work with View Transitions is shaping the future of the web. Give View Transitions a try in Astro, share your work, and let's continue this journey together.

## Additional references

* [Experiments with Astro and the Shared Element Transition API](https://www.maxiferreira.com/blog/astro-page-transitions/)
* [View Transitions (Experimental) - Astro Docs](https://docs.astro.build/en/guides/view-transitions/)
* [Astro 2.9: View Transitions (experimental)](https://astro.build/blog/astro-290/)
* [Seamless Page Navigation With the View Transitions API](https://www.youtube.com/watch?v=5K5wNqCUrL8)
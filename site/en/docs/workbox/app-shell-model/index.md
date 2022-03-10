---
layout: "layouts/doc-post.njk"
title: Service workers and the application shell model
date: 2021-11-04
description: >
  How to pair the application shell model with a service worker in your SPA.
---

A common architectural feature of [single page web applications (SPA)](https://en.wikipedia.org/wiki/Single-page_application) is a minimal set of HTML, CSS, and JavaScript needed to power the global functionality of an application. In practice, this tends to be the header, navigation, and other common user interface elements that persist across all pages. When a service worker precaches this minimal UI's HTML and dependent assets, we call this the _application shell_.

{% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/9nNaCUUYNSyBioL9eSiv.png", alt="A diagram of an application shell. It is a screenshot of a web page with a header at top, and a content area at the bottom. The header is labeled 'Application Shell', whereas the bottom is labeled as 'Content'.", width="800", height="678" %}

The application shell plays a significant role in the perceived performance of a web application. It's the first thing that loads, and therefore, it's also the first thing users see while they wait for the content to populate the user interface.

While the application shell is quick to load&mdash;provided the network is available and at least somewhat quick&mdash;a service worker that precaches the application shell and its associated assets gives the application shell model these added benefits:

- **Reliable, consistent performance on repeat visits.** On the first visit to an app without a service worker installed, the application's markup and its associated assets have to be loaded from the network before the service worker can put them in its cache. However, repeat visits will pull the application shell from the cache, meaning that loading and rendering will be instantaneous.
- **Reliable access to functionality in offline scenarios.** Sometimes internet access is spotty, or absent altogether, and the dreaded "we can't find that website" screen rears its head. The application shell model addresses this by responding to any navigation request with the application shell markup from the cache. Even if someone visits a URL in your web app that they've never been to before, the application shell will be served from the cache, and can be populated with useful content.

## When the application shell model should be used

An application shell makes the most sense when you have common user interface elements that don't change from route to route, but the content does. Most SPAs likely use what's effectively an application shell model already.

If this describes your project, and you'd like to add a service worker to enhance its reliability and performance, the application shell should:

- [Load fast](/docs/workbox/app-shell-model/#caching-the-application-shell).
- Use static assets from a `Cache` instance.
- Include common interface elements like a header and sidebar, separate from the page's content.
- Retrieve and display page-specific content.
- If appropriate, optionally cache dynamic content for offline viewing.

The application shell loads page-specific content dynamically through APIs or content bundled in JavaScript. It should also be self-updating in the sense that if the application shell's markup changes, a service worker update should pick up the new application shell and cache it automatically.

## Building the application shell

The application shell should exist independently of the content, yet provide a base for content to be populated within it. Ideally, it should be as slim as possible, but include enough meaningful content in the initial download that the user understands that an experience is loading quickly.

The right balance depends on your app. The application shell for Jake Archibald's [Trained To Thrill app](https://jakearchibald.github.io/trained-to-thrill/) includes a header with a refresh button to pull in new content from Flickr.

{% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/h8snlTewKzeJ7KpX9yR6.png", alt="A screenshot of the Trained to Thrill web app in two different states. At left, only the cached application shell is visible, with no content populated. On the right, the content (a few pictures of some trains) are loaded dynamically into the application shell's content area.", width="800", height="743" %}

The application shell markup will vary from project to project, but here's one example of an `index.html` file that provides the application boilerplate:

```html
​​<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>
      Application Shell Example
    </title>
    <link rel="manifest" href="/manifest.json">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles/global.css">
  </head>
  <body>
    <header class="header">
      <!-- Application header -->
      <h1 class="header__title">Application Shell Example</h1>
    </header>

    <nav class="nav">
      <!-- Navigation items -->
    </nav>

    <main id="app">
      <!-- Where the application content populates -->
    </main>

    <div class="loader">
      <!-- Spinner/content placeholders -->
    </div>

    <!-- Critical application shell logic -->
    <script src="app.js"></script>

    <!-- Service worker registration script -->
    <script>
      if ('serviceWorker' in navigator) {
        // Register a service worker after the load event
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js');
        });
      }
    </script>
  </body>
</html>
```

However you construct an application shell for your project, it must have the following characteristics:

- The HTML should have clearly isolated areas for individual user interface elements. In the above example, this includes the application's header, navigation, main content area, and space for a loading "spinner" that only appears when content is loading.
- The initial JavaScript and CSS loaded for the application shell should be minimal, and only relate to the functionality of the application shell itself and not the content. This ensures that the application renders its shell as fast as possible, and minimizes main thread work until the content appears.
- An inline script that registers a service worker.

Once the application shell is built, you can build a service worker to cache both it and its assets.

## Caching the application shell

The application shell and its required assets are what the service worker should precache immediately at install time. Assuming an application shell like the example above, let's see how one might accomplish this in a basic Workbox example using `workbox-build`:

```js
// build-sw.js
import {generateSW} from 'workbox-build';

// Where the generated service worker will be written to:
const swDest = './dist/sw.js';

generateSW({
  swDest,
  globDirectory: './dist',
  globPatterns: [
    // The necessary CSS and JS for the app shell
    '**/*.js',
    '**/*.css',
    // The app shell itself
    'shell.html'
  ],
  // All navigations for URLs not precached will use this HTML
  navigateFallback: 'shell.html'
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which precaches ${count} assets totaling ${size} bytes.`);
});
```

This configuration stored in `build-sw.js` imports the app's CSS and JavaScript, including the application shell markup file contained in `shell.html`. The script is executed with Node like so:

```shell
node build-sw.js
```

The generated service worker is written to `./dist/sw.js`, and will log the following message when finished:

```shell
Generated ./dist/sw.js, which precaches 5 assets totaling 44375 bytes.
```

When the page loads, the service worker precaches the application shell markup and its dependencies:

<figure>
  {% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/HF6wHmM37KqOEBaJ6c4t.png", alt="A screenshot of the network panel in Chrome's DevTools showing a list of assets downloaded from the network. Assets precached by the service worker are distinguished from other assets with a cog at the left in the row. Several JavaScript and CSS files are precached by the service worker at install time.", width="800", height="353" %}
  <figcaption>The service worker precaches the application shell's dependencies at install time. The precaching requests are the last two rows, and the gear icon next to the request indicates that the service worker handled the request.</figcaption>
</figure>

Precaching your application shell's HTML, CSS and JavaScript is possible in almost any workflow, including projects using bundlers. As you progress through the documentation, you'll learn how to use Workbox directly to set up your toolchain to build a service worker that works best for your project, regardless of whether it's an SPA.

## Conclusion

Combining the application shell model with a service worker is great for offline caching, particularly if you combine its precaching functionality with [a network-first, falling back to cache strategy](/docs/workbox/caching-strategies-overview/#network-first-falling-back-to-cache) for markup or API responses. The result is a reliably fast experience that will instantly render your application shell on repeat visits, even in offline conditions.

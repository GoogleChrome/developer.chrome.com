---
layout: "layouts/doc-post.njk"
title: Faster multipage applications with streams
date: 2022-05-16
description: >
  Learn how you can use workbox-streams to create multipage applications that
  use partial markup from the service worker cache and partial content from the
  network to create fast experiences that render almost instantaneously.
---

{% YouTube id="X6yof_vIQnk" %}

These days, websites&mdash;or web _apps_ if you prefer&mdash;tend to use one of two navigation schemes:

- The navigation scheme browsers provide by default&mdash;that is, you enter a URL in your browser's address bar and a [navigation request](https://web.dev/handling-navigation-requests/#:~:text=Navigation%20requests%20are%20requests%20for,you%20to%20a%20new%20URL.) returns a document as a response. Then you click on a link, which unloads the current document for another one, _ad infinitum_.
- The single page application pattern, which involves an initial navigation request to load the [application shell](/docs/workbox/app-shell-model/) and relies on JavaScript to populate the application shell with client-rendered markup with content from a back-end API for each "navigation".

The benefits of each approach have been touted by their proponents:

- The navigation scheme that browsers provide by default is resilient, as routes don't require JavaScript to be accessible. Client-rendering of markup by way of JavaScript can also be a potentially expensive process, meaning that lower-end devices may end up in a situation where content is delayed because the device is blocked processing scripts that provide content.
- On the other hand, Single Page Applications (SPAs) may provide faster navigations after the initial load. Rather than relying on the browser to unload a document for an entirely brand new one (and repeating this for every navigation) they can offer what feels like a faster, more "app-like" experience&mdash;even if that requires JavaScript to function.

In this post, we're going to talk about a third method that strikes a balance between the two approaches described above: relying on a [service worker](/docs/workbox/service-worker-overview/) to precache the common elements of a website&mdash;such as header and footer markup&mdash;and using streams to provide an HTML response to the client as fast as possible, all while still using the browser's default navigation scheme.

## Why stream HTML responses in a service worker?

Streaming is something your web browser already does when it makes requests. This is extremely important in the context of navigation requests, as it ensures the browser isn't blocked waiting for the entirety of a response before it can start to parse document markup and render a page.

<figure>
  {% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/22mrx0UUZRqhw1PsTfVO.svg", alt="A diagram depicting non-streaming HTML versus streaming HTML. In the former case, the entire markup payload isn't processed until it arrives. In the latter, markup is processed incrementally as it arrives in chunks from the network.", width="600", height="216", loading="lazy" %}
</figure>

For service workers, streaming is a bit different as it uses the JavaScript [Streams API](https://developer.mozilla.org/docs/Web/API/Streams_API). The most important task a service worker fulfills is to intercept and respond to requests&mdash;including navigation requests.

These requests can interact with the cache in a number of ways, but a common caching pattern for markup is to favor using a response from the [network _first_, but fall back to the cache](/docs/workbox/caching-strategies-overview/#network-first-falling-back-to-cache) if an older copy is available&mdash;and optionally [provide a generic fallback response](/docs/workbox/managing-fallback-responses/) if a usable response isn't in the cache.

This is a time-tested pattern for markup that works well, but while it helps with reliability in terms of offline access, it doesn't offer any inherent performance advantages for navigation requests that rely on a network first or network only strategy. That's where streaming comes in, and we'll explore how to use the Streams API-powered [`workbox-streams` module](/docs/workbox/reference/workbox-streams/) in your Workbox service worker to speed up navigation requests on your multipage website.

## Breaking down a typical web page

Structurally speaking, websites _tend_ to have common elements that exist on every page. A typical arrangement of page elements often goes something like:

- Header.
- Content.
- Footer.

Using [web.dev](https://web.dev/) as an example, that breakdown of common elements looks like this:

<figure>
  {% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/hij3AuKFvW4COPXW9dOq.png", alt="A breakdown of the common elements on the web.dev website. The common areas delineated are marked 'header', 'content', and 'footer'.", width="624", height="1078", loading="lazy" %}
</figure>

The goal behind identifying parts of a page is that we determine what can be precached and retrieved without going to the network&mdash;namely the header and footer markup common to all pages&mdash;and the part of the page that we'll always go to the network for first&mdash;the content in this case.

When we know how to segment the parts of a page and identify the common elements, we can write a service worker that always retrieves the header and footer markup instantly from the cache while requesting _only_ the content from the network.

Then, using the Streams API via `workbox-streams`, we can stitch all these parts together and respond to navigation requests instantly&mdash;while requesting the minimum amount of markup necessary from the network.

## Building a streaming service worker

There's a lot of moving parts when it comes to streaming partial content in a service worker, but each step of the process will be explored in detail as you go, starting with how to structure your website.

### Segmenting your website into partials

Before you can start writing a streaming service worker, you'll need to do three things:

1. Create a file containing only your website's header markup.
2. Create a file containing only your website's footer markup.
3. Pull out each page's main content into a separate file, or set up your back end to conditionally serve only the page content based on an HTTP request header.

{% Aside %}
It's not necessary that your individual partial files are valid HTML. For example, your header partial may have an open HTML tag at the end of it. All that matters is that the final combined response is valid HTML.
{% endAside %}

As you might expect, the last step is the hardest, especially if your website is static. If that's the case for you, you'll need to generate two versions of each page: one version will contain the _full_ page markup, while the other will contain only the content.

{% Aside %}
Because a streaming service worker is a progressive enhancement, it's vital that your website functions as a normal multipage experience without one.
{% endAside %}

### Composing a streaming service worker

If you haven't installed the `workbox-streams` module, you'll need to do so in addition to whatever Workbox modules you have currently installed. For this specific example, that involves the following packages:

```shell
npm i workbox-navigation-preload workbox-strategies workbox-routing workbox-precaching workbox-streams --save
```

From here, the next step is to create your new service worker and precache your header and footer partials.

### Precaching partials

The first thing you'll do is create a service worker in the root of your project named `sw.js` (or whatever filename you prefer). In it, you'll start off with the following:

```js
// sw.js
import * as navigationPreload from 'workbox-navigation-preload';
import {NetworkFirst} from 'workbox-strategies';
import {registerRoute} from 'workbox-routing';
import {matchPrecache, precacheAndRoute} from 'workbox-precaching';
import {strategy as composeStrategies} from 'workbox-streams';

// Enable navigation preload for supporting browsers
navigationPreload.enable();

// Precache partials and some static assets
// using the InjectManifest method.
precacheAndRoute([
  // The header partial:
  {
    url: '/partial-header.php',
    revision: __PARTIAL_HEADER_HASH__
  },
  // The footer partial:
  {
    url: '/partial-footer.php',
    revision: __PARTIAL_FOOTER_HASH__
  },
  // The offline fallback:
  {
    url: '/offline.php',
    revision: __OFFLINE_FALLBACK_HASH__
  },
  ...self.__WB_MANIFEST
]);

// To be continued...
```

This code does a couple of things:

1. Enables [navigation preload](/docs/workbox/navigation-preload/) for [browsers that support it](https://caniuse.com/mdn-api_navigationpreloadmanager).
2. Precaches the header and footer markup. This means that the header and footer markup for every page will be retrieved instantaneously, as it won't be blocked by the network.
3. Precaches static assets in the `__WB_MANIFEST` placeholder that uses [`injectManifest`](/docs/workbox/the-ways-of-workbox/#when-to-use-injectmanifest) method.

{% Aside %}
Note the `__PARTIAL_HEADER_HASH__`, `__PARTIAL_FOOTER_HASH__`, and `__OFFLINE_FALLBACK_HASH__` placeholders. The reason for these placeholders is that Workbox's precaching logic versions assets without a hash in the file name. The service worker code in this example relies on `workbox-webpack-plugin` and a [text replacement plugin](https://webpack.js.org/plugins/define-plugin/). This is a setup that doesn't support the [`templatedUrls` option](/docs/workbox/reference/workbox-build/#property-GlobPartial-templatedURLs) available in `workbox-build`, which greatly simplifies hash generation for unversioned assets.
{% endAside %}

### Streaming responses

Getting your service worker to stream concatenated responses is the biggest part of this whole effort. Even so, Workbox and its `workbox-streams` makes this a much more succinct affair than if you had to do all of this on your own:

```js
// sw.js
import * as navigationPreload from 'workbox-navigation-preload';
import {NetworkFirst} from 'workbox-strategies';
import {registerRoute} from 'workbox-routing';
import {matchPrecache, precacheAndRoute} from 'workbox-precaching';
import {strategy as composeStrategies} from 'workbox-streams';

// ...
// Prior navigation preload and precaching code omitted...
// ...

// The strategy for retrieving content partials from the network:
const contentStrategy = new NetworkFirst({
  cacheName: 'content',
  plugins: [
    {
      // NOTE: This callback will never be run if navigation
      // preload is not supported, because the navigation
      // request is dispatched while the service worker is
      // booting up. This callback will only run if navigation
      // preload is _not_ supported.
      requestWillFetch: ({request}) => {
        const headers = new Headers();

        // If the browser doesn't support navigation preload, we need to
        // send a custom `X-Content-Mode` header for the back end to use
        // instead of the `Service-Worker-Navigation-Preload` header.
        headers.append('X-Content-Mode', 'partial');

        // Send the request with the new headers.
        // Note: if you're using a static site generator to generate
        // both full pages and content partials rather than a back end
        // (as this example assumes), you'll need to point to a new URL.
        return new Request(request.url, {
          method: 'GET',
          headers
        });
      },
      // What to do if the request fails.
      handlerDidError: async ({request}) => {
        return await matchPrecache('/offline.php');
      }
    }
  ]
});

// Concatenates precached partials with the content partial
// obtained from the network (or its fallback response).
const navigationHandler = composeStrategies([
  // Get the precached header markup.
  () => matchPrecache('/partial-header.php'),
  // Get the content partial from the network.
  ({event}) => contentStrategy.handle(event),
  // Get the precached footer markup.
  () => matchPrecache('/partial-footer.php')
]);

// Register the streaming route for all navigation requests.
registerRoute(({request}) => request.mode === 'navigate', navigationHandler);

// Your service worker can end here, or you can add more
// logic to suit your needs, such as runtime caching, etc.
```

This code consists of three main parts that satisfy the following requirements:

1. A `NetworkFirst` strategy is used to handle requests for content partials. Using this strategy, a custom cache name of `content` is specified to contain the content partials, as well as a custom plugin that handles whether to set an `X-Content-Mode` request header for browsers that don't support navigation preload (and therefore don't send a `Service-Worker-Navigation-Preload` header). This plugin also figures out whether to send the last cached version of a content partial, or send an offline fallback page in the event that no cached version for the current request is stored.
2. The `strategy` method in `workbox-streams` (aliased as `composeStrategies` here) is used to concatenate the precached header and footer partials along with the content partial requested from the network.
3. The whole scheme is rigged up via `registerRoute` for navigation requests.

With this logic in place, we have streaming responses set up. However, there may be some work you'll need to do on a back end in order to ensure that the content from the network is a partial page that you can merge with the precached partials.

#### If your website has a back end

You'll recall that when navigation preload is enabled, the browser sends a `Service-Worker-Navigation-Preload` header with a value of `true`. However, in the code sample above, we sent a custom header of `X-Content-Mode` in the event navigation preload is unsupported in a browser. In the back end, you'd change the response based on the presence of these headers. In a PHP back end, that might look something like this for a given page:

```php
<?php
// Check if we need to render a content partial
$navPreloadSupported = isset($_SERVER['HTTP_SERVICE_WORKER_NAVIGATION_PRELOAD']) && $_SERVER['HTTP_SERVICE_WORKER_NAVIGATION_PRELOAD'] === 'true';
$partialContentMode = isset($_SERVER['HTTP_X_CONTENT_MODE']) && $_SERVER['HTTP_X_CONTENT_MODE'] === 'partial';
$isPartial = $navPreloadSupported || $partialContentMode;

// Figure out whether to render the header
if ($isPartial === false) {
  // Get the header include
  require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/site-header.php');

  // Render the header
  siteHeader();
}

// Get the content include
require_once('./content.php');

// Render the content
content($isPartial);

// Figure out whether to render the footer
if ($isPartial === false) {
  // Get the footer include
  require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/site-footer.php');

  // Render the footer
  siteFooter();
}
?>
```

In the above example, the content partials are invoked as functions, which take the value of `$isPartial` to change how the partials are rendered. For example, the `content` renderer function may only include certain markup in conditions when retrieved as a partial&mdash;something that'll be covered shortly.

## Considerations

Before you deploy a service worker to stream and stitch partials together, there are some things you must consider. While it's true that using a service worker in this way doesn't fundamentally change the browser's default navigation behavior, there are some things that you'll likely need to address.

### Updating page elements when navigating

The trickiest part of this approach is that some things will need to be updated on the client. For example, precaching header markup means the page will have the same content in the `<title>` element, or even managing on/off states for navigation items will have to be updated on each navigation. These things&mdash;and others&mdash;may have to be updated on the client for each navigation request.

The way to get around this might be to place an inline `<script>` element into the content partial that comes from the network to update a few important things:

```html
<!-- The JSON below contains information about the current page. -->
<script id="page-data" type="application/json">'{"title":"Sand Wasp &mdash; World of Wasps","description":"Read all about the sand wasp in this tidy little post."}'</script>
<script>
  const pageData = JSON.parse(document.getElementById('page-data').textContent);

  // Update the page title
  document.title = pageData.title;
</script>
<article>
  <!-- Page content omitted... -->
</article>
```

This is just one example of what you might have to do if you decide to go with this service worker setup. For more complex applications with user information, for example, you might have to store bits of relevant data in a web store like [`localStorage`](https://developer.mozilla.org/docs/Web/API/Window/localStorage) and update the page from there.

### Dealing with slow networks

One drawback of streaming responses using markup from the precache can occur when network connections are slow. The problem is that the header markup from the precache will arrive instantaneously, but the content partial from the network can take quite some time to arrive after the initial paint of the header markup.

This can create something of a confusing experience, and if networks are very slow, it can even feel like the page is broken and not rendering any further. In cases like this, you can opt to put a loading icon or message in the content partial's markup that you can hide once the content is loaded.

One way to do this is through CSS. Say your header partial ends with an opening `<article>` element that's empty until the content partial arrives to populate it. You could write a CSS rule similar to this:

```css
article:empty::before {
  text-align: center;
  content: 'Loading...';
}
```

This works, but it will show a loading message on the client regardless of the network speed. If you want to avoid a strange flash of messaging, you can try this approach where we nest the selector in the above snippet within a `slow` class:

```css
.slow article:empty::before {
  text-align: center;
  content: 'Loading...';
}
```

From here you could use JavaScript in your header partial to read the [effective connection type]() (at least in Chromium browsers) to add the `slow` class to the `<html>` element on select connection types:

```html
<script>
  const effectiveType = navigator?.connection?.effectiveType;

  if (effectiveType !== '4g') {
    document.documentElement.classList.add('slow');
  }
</script>
```

This will ensure that effective connection types slower than the `4g` type will get a loading message. Then in the content partial, you can put an inline `<script>` element to remove the `slow` class from the HTML to get rid of the loading message:

```html
<script>
  document.documentElement.classList.remove('slow');
</script>
```

{% Aside %}
There are certainly other ways to show a loading message&mdash;for example, using `setTimeout` to wait before showing a loading message could be another way to go. However you go about it, you're going to want to account for slow networks.
{% endAside %}

### Providing a fallback response

Let's say you're using a network-first strategy for your content partials. If the user is offline and goes to a page they've already been to, they're covered. However, if they go to a page they _haven't_ been to yet, they'll get nothing. To avoid this, you'll need to serve a fallback response.

The code required to achieve a fallback response is demonstrated in prior code samples. The process requires two steps:

1. Precache an offline fallback response.
2. Set up a [`handlerDidError` callback](/docs/workbox/reference/workbox-core/#method-HandlerDidErrorCallback) in the plugin for your network-first strategy to check the cache for the last-accessed version of a page. If the page was never accessed, you'll need to use the [`matchPrecache` method](/docs/workbox/reference/workbox-precaching/#method-matchPrecache) from the [`workbox-precaching` module](/docs/workbox/modules/workbox-precaching/) to retrieve the fallback response from the precache.

### Caching and CDNs

If you're using this streaming pattern in your service worker, assess whether the following applies to your situation:

- You use a CDN or any other sort of intermediate/public cache.
- You have specified a `Cache-Control` header with a non-zero [`max-age`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control#max-age) and/or [`s-maxage`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control#s-maxage) directive(s) in combination with the [`public` directive](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control#public).

If both of these are the case for you, the intermediate cache may hold onto responses for navigation requests. However, remember that when you use this pattern, you may be serving two different responses for any given URL:

- The full response, containing the header, content, and footer markup.
- The partial response, containing only the content.

This can cause some undesired behaviors, resulting in doubled header and footer markup, because the service worker may be fetching a full response from the CDN cache and combining that with your precached header and footer markup.

To get around this, you'll need to rely on the [`Vary` header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Vary), which affects caching behavior by keying cacheable responses to one or more headers that were present in the request. Because we're varying the responses to navigation requests based on the `Service-Worker-Navigation-Preload` and custom `X-Content-Mode` request headers, we need specify this `Vary` header in the response:

```http
Vary: Service-Worker-Navigation-Preload,X-Content-Mode
```

With this header, the browser will differentiate between complete and partial responses for navigation requests, avoiding issues with doubled header and footer markup, as will any intermediate caches.

## The outcome

<blockquote cite="https://jakearchibald.com/2016/fun-hacks-faster-content/">
  <p>
    Most load-time performance advice boils down to "show them what you got"&mdash;don't hold back, don't wait until you have everything before showing the user anything.
  </p>
  <cite>
    Jake Archibald in <em><a href="https://jakearchibald.com/2016/fun-hacks-faster-content/" rel="noopener">Fun Hacks for Faster Content</a></em>
  </cite>
</blockquote>

Browsers excel when it comes to dealing with responses to navigation requests, even for huge HTML response bodies. By default, browsers progressively stream and process markup in chunks that avoid long tasks, which is good for startup performance.

This works to our advantage when we use a streaming service worker pattern. Whenever you respond to a request from the service worker cache from the get-go, the start of the response arrives almost instantaneously. When you stitch together precached header and footer markup with a response from the network, you get some notable performance advantages:

- [Time to First Byte (TTFB)](https://web.dev/ttfb/) will often be greatly reduced, as the first byte of the response to a navigation request is instant.
- [First Contentful Paint (FCP)](https://web.dev/fcp/) will be _very_ fast, as the precached header markup will contain a reference to a cached style sheet, meaning that the page will paint very, very quickly.
- In some cases, [Largest Contentful Paint (LCP)](https://web.dev/lcp/) can be faster as well, particularly if the largest onscreen element is provided by the precached header partial. Even so, just serving _something_ out of the service worker cache as soon as possible in tandem with smaller markup payloads may result in a better LCP.

Streaming multipage architectures can be a bit tricky to set up and iterate on, but the complexity involved is often no more onerous than SPAs in theory. The main benefit is that you're not replacing the browser's default navigation scheme&mdash;you're _enhancing_ it.

Better yet, Workbox makes this architecture not just possible, but easier than if you were to implement this on your own. Give it a try on your own website and see how much faster your multipage website can be for users in the field.

## Resources

- [Now THAT'S What I Call Service Worker!](https://alistapart.com/article/now-thats-what-i-call-service-worker/)
- [Smaller HTML Payloads with Service Workers](https://philipwalton.com/articles/smaller-html-payloads-with-service-workers/)
- [Beyond single-page apps: alternative architectures for your PWA (Google I/O '18)](https://www.youtube.com/watch?v=X6yof_vIQnk)

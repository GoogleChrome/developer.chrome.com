---
# Required
layout: 'layouts/blog-post.njk'
title: Prerender pages in Chrome for instant page navigations
description: |
 The Chrome team has been working on options to bring back full prerendering of future pages that a user is likely to navigate to. This modern reboot of prerendering will start rolling out from Chrome 108
authors:
 - tunetheweb
date: 2022-12-02
updated: 2023-04-18
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/eohdiqaZlxnWen7TT66M.jpg
alt: City road at dusk with a long exposure of car lights giving impression of speed
tags:
 - performance
 - chrome-108
---

The Chrome team has been working on options to bring back full prerendering of future pages that a user is likely to navigate to. This modern reboot of prerendering will start rolling out from Chrome 108.

## A brief history of prerender

In the past, Chrome supported the `<link rel="prerender" href="/next-page/">` resource hint, however it was not broadly supported beyond Chrome, and it wasn't a very expressive API.

This legacy prerendering via the link `rel=prerender` hint was deprecated in favor of [NoState Prefetch](/blog/nostate-prefetch/), which instead fetched the resources needed by the future page, but did not fully prerender the page nor execute JavaScript. NoState Prefetch does help improve page performance by improving the resource loading, but will not deliver an _instant_ page load like a full prerender would.

The Chrome team is now ready to reintroduce full prerendering back into Chrome. To avoid complications with existing usage, and to allow for future expansion of prerendering, this new prerender mechanism will not use the `<link rel="prerender"...>` syntax, which remains in place for NoState Prefetch, with a view of retiring this at some point in the future.

## How is a page prerendered?

A page can be prerendered in one of three ways, all of which aim to make navigations quicker:

1. When you type a URL into the Chrome address bar (also known as "the omnibox"), Chrome may automatically prerender the page for you, if it has high confidence you will visit that page.
2. When you type a search term into the Chrome omnibox, Chrome may automatically prerender the search results page, when instructed to do so by the search engine.
3. Sites can use the [Speculation Rules API](https://github.com/jeremyroman/alternate-loading-modes/blob/main/triggers.md#speculation-rules), to programmatically tell Chrome which pages to prerender. This replaces what `<link rel="prerender"...>` used to do and allows sites to proactively prerender a page based on speculation rules on the page. These can statically exist on the pages, or be dynamically injected by JavaScript as the page owner sees fit.

In each of these cases, a prerender behaves as if the page has been opened in an invisible background tab, and then is "activated" by replacing the foreground tab with that prerendered page. If a page is activated before it has fully prerendered, then its current state is "foregrounded" and continues to load, which means you can still get a good head start.

As the prerendered page is opened in a hidden state, [a number of APIs that cause intrusive behaviors](https://wicg.github.io/nav-speculation/prerendering.html#intrusive-behaviors) (for example, prompts) are not activated in this state, and are instead delayed until the page is activated. In the small number of cases where this is not yet possible, the prerender is canceled. The Chrome team is working on exposing prerender cancellation reasons as an API, and also enhancing DevTools capabilities to make identifying such edge cases easier.

{% Aside %}
  Prerendered pages should be treated as a hint and a progressive enhancement. Unlike `preload`, prerender is a speculative _hint_ and the browser may choose not to act upon the hint based on user settings, current memory usage, or other heuristics.
{% endAside %}

### Impact of prerendering

Prerendering allows a near-instant page load as shown in the Video below when prerender was enabled on [web.dev](https://web.dev/), where the first blog article is prerendered:

<figure>
{% Video src="video/W3z1f5ZkBJSgL1V1IfloTIctbIF3/rO1MGC5jaBAIyo79KrVT.mp4",
  controls="true",
  loop="true",
  muted="true",
  playsinline="true",
  poster="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/zFNgVLiXhoPWpuveGPgY.png"
%}
</figure>

The [web.dev](https://web.dev/) site is already a fast site, but even with this you can see how prerendering improves the user experience. This can therefore also have a direct impact on a site's [Core Web Vitals](https://web.dev/vitals/), with near zero LCP, reduced CLS (since any load CLS happens before the initial view), and improved FID (since the load should be completed before the user interacts).

Even when a page activates before it is fully loaded, having a head start to the page load, should improve the loading experience. When a link is activated while prerendering is still happening, the prerendering page will move to the main frame and continue loading.

However, prerendering does use additional memory and network bandwidth. Be careful not to over-prerender, at a cost of user resources. Only prerender when there is a high likelihood of the page being navigated to.

See the [Measuring performance](#measuring-performance) section for more information on how to measure the actual performance impact in your analytics.

### Viewing Chrome's address bar predictions

For the first use case, you can view Chrome's predictions for URLs in the `chrome://predictors` page:

<figure>
{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/Oy3gv9Gyhx0eTKWVtUVo.png", alt="Screenshot of the Chrome Predictors page filtered to show low (grey), medium (amber), and high (green) predictions based on text entered.", width="800", height="560" %}
</figure>

Green lines indicate enough confidence to trigger prerendering. In this example typing "s" gives a reasonable confidence (amber), but once you type "sh" then Chrome has enough confidence that you nearly always navigate to `https://sheets.google.com`.

This screenshot was taken in a relatively fresh Chrome install, and filtering out zero confidence predictions, but if you view your own predictors you will likely see considerably more entries, and potentially more characters required to reach a high enough confidence level.

These predictors are also what drive the address bar suggested options you may have noticed:

<figure>
{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/GcJd2GQ76qdXKbcUb1VD.png", alt="Screenshot of the address bar 'Typeahead' feature", width="400", height="216.5" %}
</figure>

Chrome will continually update its predictors based on your typing and selections.

- For a greater than 50% confidence level (shown in amber), Chrome proactively preconnects to the domain, but does not prerender the page.
- For a greater than 80% confidence level (shown in green), Chrome will prerender the URL.

## The Speculation Rules API

For the third prerender option, web developers can insert JSON instructions onto their pages to inform the browser about which URLs to prerender:

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["next.html", "next2.html"]
    }
  ]
}
</script>
```

Speculation rules can also be used to just prefetch pages, without a full prerender. This can often be a good first step on the road to prerendering:

```html
<script type="speculationrules">
{
  "prefetch": [
    {
      "source": "list",
      "urls": ["next.html", "next2.html"]
    }
  ]
}
</script>
```

{% Aside %}
Unlike the older `<link rel="prefetch">` resource hint which just prefetched to the HTTP cache, documents loaded via speculation rules are processed in the same way that navigations are (but then not rendered) and are held in memory so will be available quicker to the browser once needed. Using speculation rules for prefetches will also allow use of [future enhancements](#speculation-rules-restrictions-and-future-enhancements) as they are added to the API.

[Only Chromium-based browsers support document prefetches](https://github.com/whatwg/html/issues/6723) via `<link rel="prefetch">`, and given the above, it is recommended to use speculation rules for these going forward, with `<link rel="prefetch">` only used for prefetching subresources.
{% endAside %}

Speculation rules can be:

* Statically included in the page's HTML. For example a news media site, or a blog may prerender the newest article, if that is often the next navigation for a large proportion of users.
* Dynamically inserted into the page by JavaScript. This could be based on application logic, personalized to the user, or on certain user actions such as hovering over, or clicking down on a link—as many libraries have done in the past with `preconnect`, `prefetch`, or the older NoState Prefetch `prerender`. Those favoring dynamic insertion, are recommended to keep an eye on speculation rules support, as the document rules may make allow the browser to handle many of your use cases as this is introduced in the future.

Speculation rules can be added in either the `<head>` or the `<body>` of in the main frame. Speculation rules in subframes are not acted upon, and speculation rules in prerendered pages are only acted upon once that page is activated.

### Multiple speculation rules

Multiple speculation rules can also be added to the same page, and they append to the existing rules. Therefore, the following different ways all result in both `one.html` and `two.html` prerendering:

**List of URLs:**

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["one.html", "two.html"]
    }
  ]
}
</script>
```

**Multiple `speculationrules`:**

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["one.html"]
    }
  ]
}
</script>
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["two.html"]
    }
  ]
}
</script>
```

**Multiple lists within one set of `speculationrules`**

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["one.html"]
    },
    {
      "source": "list",
      "urls": ["two.html"]
    }
  ]
}
</script>
```

### Speculation rules restrictions and future enhancements

At present, speculation rules are restricted to pages opened within the same tab, but we are working to reduce that restrictions. By default prerender is restricted to same-origin pages.

{% Aside 'update' %}
[Prerendering same-site cross-origin pages](https://chromestatus.com/feature/4899735257743360) (for example, `https://a.example.com` could prerender a page on `https://b.example.com`) is supported from Chrome 109.

To use this the prerendered page (`https://b.example.com` in this example) needs to opt-in by including a `Supports-Loading-Mode: credentialed-prerender` HTTP header or Chrome will cancel the prerender.
{% endAside %}

Future versions may also [allow prerender for cross-origin pages](https://bugs.chromium.org/p/chromium/issues/detail?id=1176054) (where the site opts in with a similar `Supports-Loading-Mode: uncredentialed-prerender` HTTP header), and [enable prerendering in new tabs](https://bugs.chromium.org/p/chromium/issues/detail?id=1350676).

The Speculation Rules API is planned to be expanded beyond this simple example with the addition of [scores](https://github.com/WICG/nav-speculation/blob/main/triggers.md#scores) (for example, the likelihood of a navigation), and syntax to implement [document rules](https://github.com/WICG/nav-speculation/blob/main/triggers.md#document-rules) instead of `list` rules (for example, matching `href` patterns on the page), which can be combined to only prerender links on mouse down, for example.

{% Aside 'update' %}
A number of [experiments](https://github.com/WICG/nav-speculation/blob/main/chrome-2023q1-experiment-overview.md) are currently being run in Chrome for some of these additional features. Sites can opt-in to via an [origin trial](/origintrials/#/view_trial/705939241590325249) to try out—and give feedback—on these potential future additions. [Learn more about origin trials](/docs/web-platform/origin-trials/).
{% endAside %}

### Detecting of Speculation Rules API support

You can feature detect Speculation Rules API support with standard HTML checks:

```js
if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
  console.log('Your browser supports the Speculation Rules API.');
}
```

### Adding speculation rules dynamically through JavaScript

Below is a simple example of adding a `prerender` speculation rule with JavaScript:

```js
if (HTMLScriptElement.supports &&
    HTMLScriptElement.supports('speculationrules')) {
  const specScript = document.createElement('script');
  specScript.type = 'speculationrules';
  specRules = {
    prerender: [
      {
        source: 'list',
        urls: ['/next.html'],
      },
    ],
  };
  specScript.textContent = JSON.stringify(specRules);
  console.log('added speculation rules to: next.html');
  document.body.append(specScript);
}
```

You can view a demo of Speculation Rules API prerendering, using JavaScript insertion, on [this demo page](https://prerender-demos.glitch.me/).

### Cancelling speculation rules

Removing speculation rules will result in the prerender being cancelled but, by the time this has happened, resources will likely have already been spent to initiate the prerender, so it is recommended not to prerender if there is a likelihood of needing to cancel the prerender.

### Speculation rules and Content Security Policy

As speculation rules use a `<script>` element, even though they only contain JSON, they need to be included in the `script-src` [Content-Security-Policy](https://web.dev/csp/) if the site uses this—either using a hash or nonce.

A new `inline-speculation-rules` can be added to `script-src` allowing `<script type="speculationrules">` elements injected from hash/nonced scripts to be supported. At present, this only supports injected rules and does not [yet support rules includes in the initial HTML](https://bugs.chromium.org/p/chromium/issues/detail?id=1433616).

## Detecting and disabling prerendering

Prerender is usually a positive experience for users as it allows fast page rendering—often instant. This benefits both the user, and the site owner, since prerendered pages allow a better user experience that may be difficult to achieve otherwise.

However, there may be instances when you [do not wish prerendering of pages to happen](https://docs.google.com/document/d/1_9XkDUKMGf2f3tDt1gvQQjfliNLpGyFf36BB1-NUZ98/edit), for example when pages change state—either based on the initial request, or based on JavaScript executing on the page.

### Enabling and disabling prerender in Chrome

Prerender is only enabled for those Chrome users with the "Preload pages for faster browsing and searching" setting in `chrome://settings/cookies/`. Additionally, prerender is also disabled on low-memory devices, or if the operating system is in data-saver or battery-saver modes.

### Detecting and disabling prerender server-side

Prerendered pages will be sent with the following HTTP header:

```http
Sec-Purpose: prefetch;prerender
```

Servers can respond based on this header, to log prerender requests, return different content, or prevent the prerender from happening. If a non-success response code is returned (that is, not a 200 or a 304), then the page will not be prerendered.

If you absolutely do not want a particular page to be prerendered, this is the best way to ensure it won't happen. However, to deliver the best experience, it is recommended to instead allow prerendering, but delay any actions that should only happen then the page is actually viewed, using JavaScript.

### Detecting prerender in JavaScript

The `document.prerendering` API will return `true` while the page is prerendering. This can be used by pages to prevent—or delay—certain activities during the prerender until the page is actually activated.

Once a prerendered document is activated, `PerformanceNavigationTiming`'s `activationStart` will also be set to a non-zero time representing the time between when the prerender was started and the document was actually activated.

You can have a function to check for _prerendering_ and _prerendered_ pages like the following:

```js
function pagePrerendered() {
  return (
    document.prerendering ||
    self.performance?.getEntriesByType?.('navigation')[0]?.activationStart > 0
  );
}
```

The easiest way to see if a page was prerendered is to open DevTools after the prerender has happened, and type `performance.getEntriesByType('navigation')[0].activationStart` in the console. If a non-zero value is returned, you know the page was prerendered:

<figure>
{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/C3pNnuCo3i4zHgbLWEo0.png", alt="Console in Chrome DevTools showing a positive activationStart indicating the page was prerendered", width="400", height="98.5" %}
</figure>

When the page is activated by the user viewing the page, the `prerenderingchange` event will be dispatched on the `document`, which can then be used to enable activities that previously would be started by default on page load but which you wish to delay until the page is actually viewed by the user.

Using these APIs, front-end JavaScript can detect and act upon prerendered pages appropriately.

{% Aside 'warning' %}
  At present, the [`PerformanceNavigationTiming.type`](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming/type) is not using the `prerender` value, that was for the older, original `<link rel="prerender"...>` navigation type. This is liable to change in future but for now, clients should use the `document.prerendering` API to identify prerendering pages and a non-zero `PerformanceNavigationTiming.activationStart` field to identify prerendered pages that have since been activated.
{% endAside %}

## Impact on analytics

Analytics are used to measure website usage, for example using Google Analytics to measure page views, and events. Or by measuring performance metrics of pages using [Real User Monitoring (RUM)](https://en.wikipedia.org/wiki/Real_user_monitoring).

Pages should only be prerendered when there is a high probability the page will be loaded by the user. This is why the Chrome address bar prerendering options only happen when there is such a high probability (greater than 80% of the time).

However—particularly when using the Speculation Rules API—prerendered pages may have an impact on analytics and site owners may wish to add extra code to only enable analytics for prerendered pages on activation.

This could be achieved by using a `Promise` which waits for the `prerenderingchange` event if a document is prerendering, or resolves immediately if it is now:

```js
// Set up a promise for when the page is activated,
// which is needed for prerendered pages.
const whenActivated = new Promise((resolve) => {
  if (document.prerendering) {
    document.addEventListener('prerenderingchange', resolve);
  } else {
    resolve();
  }
});

async function initAnalytics() {
  await whenActivated;
  gtag('config', 'UA-12345678-1');
}

initAnalytics();
```

This is the method we have implemented on this site and on [https://web.dev](https://web.dev).

### Measuring performance

For measuring performance metrics, analytics should consider whether it is better to measure these based upon the activation time rather than the page load time that browser APIs will report.

For Core Web Vitals, measured by Chrome through the [Chrome User Experience Report](/docs/crux/), these are intended to measure the user experience. So these are measured based on activation time. This will often result in a 0 second LCP for example, showing this is great way of improving your Core Web Vitals.

From version 3.1.0, the [`web-vitals` library](https://github.com/GoogleChrome/web-vitals) has been updated to handle prerendered navigations in the same way Chrome measures Core Web Vitals. This version also flags prerendered navigations for those metrics in the [`Metric.navigationType`](https://github.com/GoogleChrome/web-vitals#metric) attribute.

### Measuring prerenders

Whether a page is prerendered can be seen with a non-zero `activationStart` entry of [`PerformanceNavigationTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming). This can then be logged using a Custom Dimension, or similar when logging the page views, for example using the `pagePrerendered` function above:

```js
// Set Custom Dimension for Prerender status
gtag('set', { 'dimension1': pagePrerendered() });
// Initialise GA - including sending page view by default
gtag('config', 'UA-12345678-1');
```

This will allow your analytics to show how many navigation are prerendered compared to other types of navigation, and also allow you to correlation any performance metrics or business metrics to these different navigation types. Faster pages means happier users, which can often have real impact on business measures as our [case studies](https://web.dev/tags/case-study/) show.

As you measure the business impact of prerendering pages for instant navigations, you can decide whether it is worth investing more effort in using this technology to allow more navigations to be prerendered, or to investigate why pages are not being prerendered.

#### Measuring hit rates

In addition to measuring the impact of pages that are visited after a prerender, it is also important to measure pages that are prerendered and _not_ subsequently visited. This could imply you are prerendering too much, and using up valuable resources of the user for little benefit.

This can be measured by firing an analytics event when speculation rules are inserted—after checking the browser supports prerendering using `HTMLScriptElement.supports('speculationrules')`—to indicate that prerender was requested. (Note that just because a prerender was requested, does not indicate that a prerender was started or completed as, as noted previously, a prerender is a hint to the browser and it may choose not to prerender pages on user settings, current memory usage, or other heuristics.)

You can then compare the number of these events, to the actual prerender page views. Or alternatively fire another event on activation if that makes it easier to compare.

The "successful hit rate" can then be approximated by looking at the difference between these two figures. For pages where you are using the Speculation Rules API to prerender the pages, you can adjust the rules appropriately to ensure you keep a high hit rate to maintain the balance between using up the users resources to help them, versus using it needlessly.

Be aware that some prerendering may be taking place due to the address bar prerendering and not just your speculation rules. You can check the `document.referrer` (which will be blank for address bar navigation including prerendered address bar navigations) if you wish to differentiate these.

Remember to also look at pages which have no prerenders, as that could indicate these pages are not eligible for prerendering, even from the address bar. That may mean you are not benefiting from this performance enhancement. The Chrome team is looking to add extra tooling to test for Prerender eligibility perhaps [similar to the bfcache testing tool](https://web.dev/bfcache/#test-to-ensure-your-pages-are-cacheable), and also potentially add an API to expose why a prerender failed.

## Impact on extensions

See the dedicated post on [Chrome Extensions: Extending API to support Instant Navigation](/blog/extension-instantnav/) which details some additional considerations extension authors may need to think about for prerendered pages.

## Feedback

Prerendering is in active development by the Chrome team, and there are plenty of plans to expand the scope of what has been made available in the Chrome 108 release. We welcome any feedback on [the GitHub repo](https://github.com/WICG/nav-speculation/issues) or via [our issue tracker](https://bugs.chromium.org/p/chromium/issues/list), and look forward to hearing and sharing case studies of this exciting new API.

## Related links

- [Introducing NoState Prefetch](/blog/nostate-prefetch/)
- [Speculation Rules API](https://github.com/jeremyroman/alternate-loading-modes/blob/main/triggers.md#speculation-rules)
- [The Navigational speculation GitHub repo](https://github.com/WICG/nav-speculation/)
- [Chrome Extensions: Extending API to support Instant Navigation](/blog/extension-instantnav/)

## Acknowledgements

_Hero image by [Marc-Olivier Jodoin](https://unsplash.com/@marcojodoin) on [Unsplash](https://unsplash.com/photos/NqOInJ-ttqM)_

---
layout: 'layouts/blog-post.njk'
title: What developers need to know about Chrome's Memory and Energy Saver modes
date: 2022-12-08
authors:
  - philipwalton
description: Learn how to ensure your page can gracefully handle Chrome's new Memory and Energy saver modes.
hero: image/eqprBhZUGfb8WYnumQ9ljAxRrA72/J07wJiRCtOoE1sleUViq.png
alt: Graphical icons representing Chrome's Memory and Energy Saver modes
tags:
  - performance
  - chrome-108
---

Chrome 108 [introduced](https://blog.google/products/chrome/new-chrome-features-to-save-battery-and-make-browsing-smoother/) two new modes, [Memory Saver and Energy Saver](https://support.google.com/chrome/answer/12929150#zippy=%2Cturn-memory-saver-on-or-off%2Cturn-energy-saver-on-or-off), to give users more control over how Chrome utilizes their system resources.

While these new modes are primarily user-facing, they do have some implications that are important for web developers to be aware of, as they can potentially impact the user experience of your site.

This post will cover the potential effects of these new modes and what web developers can do to ensure they're delivering the best experience possible.

## Memory Saver mode

When Memory Saver mode is enabled, Chrome will proactively discard tabs that have been unused in the background for some time. This frees up memory for active tabs as well as other applications that may be running. Users can instruct Chrome not to discard tabs for specific sites; however, this is a user preference and not something you can control as a developer.

When a tab is discarded, its title and favicon still appear in the tab strip but the page itself is gone, exactly as if the tab had been closed normally. If the user revisits that tab, the page will be reloaded automatically.

For purely content pages, discarding and reloading a tab will likely not affect the user experience, but for rich, interactive sites with complex user flows, a reload in the middle of that flow could be extremely frustrating if the site is not able to restore the page to exactly where the user left off.

Discarding tabs to conserve memory is something Chrome has been doing for years, but it was only done in situations where the system was under memory pressure. Given its relatively rare occurrence, web developers may not have realized it was happening.

Starting in Chrome 108, tab discarding will become more common, so it's critical that sites can handle these occurrences gracefully.

### Best practices to handle tab discards

Tab discards are not a new challenge to web developers. It's always been possible for a user to reload a page—either intentionally or accidentally—before completing their task. So it's always been important for sites to store user state so they can restore it if the user leaves and comes back.

The most important consideration is not _whether_ to store user state but _when_ to store it. And this is key because there is no event that fires when a tab is discarded, so there's no way for developers to react to the fact that it's happening. Instead developers need to anticipate this possibility and prepare ahead of time.

The best times to store user state are:

- Periodically as the state changes.
- Whenever a tab is backgrounded (the `visibilitychange` event).

The worst times to store state are:

- In a `beforeunload` event callback.
- In an `unload` event callback.

These are the worst times to store state because these events are completely unreliable and do not fire in many situations—including when a tab is being discarded.

You can refer to the [Page Lifecycle event diagram](/blog/page-lifecycle-api/#overview-of-page-lifecycle-states-and-events) to see what events are expected to fire as a page is being discarded. As you can see from that diagram, a tab can get from the "hidden" state to the "discarded" state without any events firing.

<figure>
  <a href="https://wd.imgix.net/image/eqprBhZUGfb8WYnumQ9ljAxRrA72/KCIeOsJ0lCWMthBSSBrn.svg">
    {% Img
      src="image/eqprBhZUGfb8WYnumQ9ljAxRrA72/KCIeOsJ0lCWMthBSSBrn.svg",
      alt="Page Lifecycle API state and event flow. A visual representation of the state and event flow described throughout this document.",
      width="800",
      height="400"
    %}
  </a>
</figure>

In fact, any time the page is in the "hidden" state, there is no guarantee that any other events will fire before the page is either discarded by the browser or terminated by the user, which is why it's important to always store any unsaved user state in the `visibilitychange` event, as you may not get another chance.

The following code outlines some example logic to queue persisting the current user state any time it changes, or immediately if the user backgrounds the tab or navigates away:

```js
let state = {};
let hasUnstoredState = false;

function storeState() {
  if (hasUnstoredState) {
    // Store `state` to localStorage or IndexedDB...
  }
  hasUnstoredState = false;
}

export function updateState(newState) {
  state = newState;
  hasUnstoredState = true;
  requestIdleCallback(storeState);
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    storeState();
  }
});
```

### Detecting that a tab was discarded

As mentioned previously, it's not possible to detect that a tab is about to be discarded, but it is possible to detect that a tab was discarded after a user returns to it and the page is reloaded. In these situations the `document.wasDiscarded` property will be true.

```js
if (document.wasDiscarded) {
  // The page was reloaded after a discard.
} else {
  // The page was not reloaded after a discard.
}
```

If you'd like to understand how often your users experience these types of situations, you can configure your analytics tool to capture this information.

For example, in Google Analytics you can configure a [custom event parameter](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters?client_type=gtag) that will allow you to determine what percentage of pageviews came from tab discards:

```js
gtag('config', 'G-XXXXXXXXXX', {
  was_discarded: document.wasDiscarded,
});
```

If you're an analytics provider, you may want to consider adding this dimension to your product by default.

### Testing your site in Memory Saver mode

You can test how a page handles being discarded by loading the page and then visiting `chrome://discards` in a separate tab or window.

From the `chrome://discards` UI you can locate the tab you want to discard from the list and then click **Urgent Discard** from the **Actions** column.

{% Img
  src="image/eqprBhZUGfb8WYnumQ9ljAxRrA72/tNabAn7X2MKqPpIsORlW.png",
  alt="Screenshot of the chrome://discards UI showing the location of the link to discards tabs",
  width="800",
  height="221"
%}

This will discard the tab, allowing you to revisit it and verify that the page was reloaded to the same state that it was when you left it.

Note that there is not currently a way to automate tab discards via testing tools like webdriver or puppeteer; however, since tab discards and restores are almost identical to page reloads, if you test that user state is restored after a reload in the middle of a user flow, it will likely work for a discard/restore as well. The primary difference between the two is the `beforeunload`, `pagehide`, and `unload` events do not fire when a tab is being discarded, so as long as you're not relying on those events to persist user state, you can use reloads to test the discard/restore behavior.

## Energy Saver mode

When Energy Saver mode is enabled, Chrome conserves battery power by reducing the display refresh rate, affecting scrolling and animation fidelity and video frame rates.

In general, developers do not need to do anything to support Energy Saver mode. CSS and JavaScript APIs for [animations](https://developer.mozilla.org/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [transitions](https://developer.mozilla.org/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions), and <code>[requestAnimationFrame()](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame)</code> will automatically adjust to any change in display refresh rate when this mode is enabled.

The main scenario where this mode _could_ be problematic is if your site uses JavaScript-based animations that assume a particular refresh rate for all users.

For example, if your site uses `requestAnimationFrame()` loops and assumes that exactly 16.67 milliseconds will have elapsed between callbacks, your animations will run twice as slow when Energy Saver mode is enabled.

Note that it has [always been problematic](https://web.dev/speed-rendering/#timing-is-everything-requestanimationframe) for developers to assume a default refresh rate of 60 Hz for all users, since that is not true for many current devices.

### Measuring display refresh rate

There is no dedicated web API to measure display refresh rate, and in general, attempting to do so with current APIs is **not recommended**.

The best developers can do with existing APIs is to compare the timestamps between successive `requestAnimationFrame()` callbacks. While this works in most cases to approximate refresh rate at a given point in time, it doesn't let you know when the refresh rate changes. To do that you'd have to be constantly running a `requestAnimationFrame()` poll, which defeats the goal of conserving energy or battery life for your users.

### Testing your site in Energy Saver mode

One way to test your site in Energy Saver mode is to [enable the mode](https://support.google.com/chrome/answer/12929150#zippy=%2Cturn-energy-saver-on-or-off) in Chrome's settings and configure it to run when your device is unplugged.

If you do not have a device that can be unplugged, you can also enable the mode manually by following these steps:

1. Enable the `chrome://flags/#battery-saver-mode-available` flag.
2. Visit `chrome://discards` and click the **Toggle battery saver mode** link (**important:** the `#battery-saver-mode-available` flag needs to be enabled for the link to work).

{% Img
  src="image/eqprBhZUGfb8WYnumQ9ljAxRrA72/1DM3PrsdEUysGqCV7tvL.png",
  alt="Screenshot of the chrome://discards UI showing the location of the link to enable Energy Saver mode",
  width="800",
  height="221"
%}

Once enabled, you can interact with your site and verify that everything looks as it should: for example that animations and transitions run at the desired speed.

## Summary

While Chrome's Memory Saver and Energy Saver modes are primarily user-facing features, they do have implications for developers as they can negatively affect the experience of visiting your site if not handled properly.

In general, these new modes were designed with existing developer best practices in mind. If developers have been following long-standing web best practices, their sites should continue to work fine with these new modes.

However, if your site contains any of the practices called out in this post, it's likely that your users are experiencing issues that will only increase with these two modes enabled.

As always, the best way to confirm that you're delivering a great experience is to test your site with conditions matching those of your users.

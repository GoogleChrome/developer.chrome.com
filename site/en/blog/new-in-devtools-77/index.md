---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 77)"
authors:
  - kaycebasques
date: 2019-07-22
#updated: YYYY-MM-DD
description: "Copy element styles, visualize layout shifting, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/8kbcGjb0LbEQZIE80gLY.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-77
---

{% YouTube id="R8KzoMoKhnM" %}

## Copy element's styles {: #copystyles }

Right-click a node in the **DOM Tree** to copy that DOM node's CSS to your clipboard.

{% Img src="image/admin/FMGtP4Y7fVFJYuwxuChN.png", alt="Copy styles.", width="800", height="500" %}

Figure 1. Copy element styles.

Thanks [Adam Argyle][1] and [VisBug][2] for the [inspiration][3].

## Visualize layout shifts {: #layoutshifts }

{% Aside 'warning' %}

This feature can cause your screen to flash a lot and may not be suitable for you if you're prone to
photosensitive epilepsy.

{% endAside %}

Supposing you're reading a news article on your favorite website. As you're reading the page, you
keep losing your place because the content is jumping around. This problem is called layout
shifting. It usually happens when images and ads finish loading. The page hasn't reserved any space
for the images and ads, so the browser has to shift all the other content down to make room for
them. The solution is to use [placeholders][4].

DevTools can now help you detect layout shifting:

1.  Open the [Command Menu][5].
2.  Start typing `Rendering`.
3.  Run the **Show Rendering** command.
4.  Enable the **Layout Shift Regions** checkbox. As you interact with a page, layout shifts are
    highlighted blue.

{% Img src="image/admin/WIvRRrpIsp5VXBxpSNMd.png", alt="A layout shift.", width="800", height="589" %}

Figure 2. A layout shift.

[Chromium issue #961846][6]

## Lighthouse 5.1 in the Audits panel {: #audits }

{% Aside %}

This update actually shipped in Chrome 76. We didn't cover it in [What's New In DevTools
(Chrome 76)][7] so we're covering it now.

{% endAside %}

The Audits panel is now running [Lighthouse 5.1][8]. New audits include:

- [Provides a valid `apple-touch-icon`][9]. Checks that a PWA can be added to an iOS homescreen.
- [Keep request counts and file sizes low][10]. Reports the total number of network requests and
  file sizes for various categories, such as documents, scripts, stylesheets, images, and so on.
- [Maximum Potential First Input Delay][11]. Measures the maximum potential time between a user's
  first page interaction and the browser's response to that interaction. Note that this metric
  replaces the Estimated Input Latency metric. Maximum Potential First Input Delay does not factor
  into your Performance category score.

{% Img src="image/admin/EsUVviA3LzqiHGtVFIkT.png", alt="The new Audits panel UI.", width="800", height="709" %}

Figure 3. The new Audits panel UI.

The Node and CLI versions of Lighthouse 5.1 have 3 new major features worth checking out:

- [Performance Budgets][12]. Prevent your site from regressing over time by specifying request
  counts and file sizes that pages should not exceed.
- [Plugins][13]. Extend Lighthouse with your own custom audits.
- [Stack Packs][14]. Add audits tailored to specific technology stacks. The WordPress Stack Pack
  shipped first. React and AMP Stack Packs are in development.

## OS theme syncing {: #theming }

If you're using the dark theme of your OS, DevTools now switches to its own [dark theme][15]
automatically.

## Keyboard shortcut for opening the Breakpoint Editor {: #breakpointeditor }

Press <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or
<kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>B</kbd> (Mac) when focused in the Sources panel's Editor
to open the **Breakpoint Editor**. Use the Breakpoint Editor to create [Logpoints][16] and
[Conditional Breakpoints][17].

{% Img src="image/admin/XFpvnxtGd8QjIj0EcOH0.png", alt="The Breakpoint Editor.", width="800", height="534" %}

Figure 4. The **Breakpoint Editor**.

## Prefetch cache in Network panel {: #prefetch }

The **Size** column of the Network panel now says `(prefetch cache)` when a resource was loaded from
the prefetch cache. [Prefetch][18] is a new-ish web platform feature for speeding up subsequent page
loads. [Can I use...][19] reports that it's supported in 83.33% of global browsers as of July 2019.

{% Img src="image/admin/UgdcdyfEi6gLqOOzfjkv.png", alt="The Size column showing that resources came from the prefetch cache.", width="800", height="475" %}

Figure 5. The **Size** column shows that `prefetch2.html` and `prefetch2.css` came from
`(prefetch cache)`.

See [Prefetch Demo][20] to try it out.

[Chromium issue #935267][21]

## Private properties when viewing objects {: #privateclassfields }

The Console now shows [private class fields][22] in its object previews.

{% Img src="image/admin/XgPBCbTILE6qZ2zOr1VE.png", alt="When inspecting an object, the Console now shows private fields like '#color'.", width="800", height="285" %}

Figure 6. The old version of Chrome on the left does not show the `#color` field when inspecting the
object, whereas the new version on the right does.

## Notifications and push messages in the Application panel {: #backgroundservices }

The Background Services section of the Application panel now supports Push Messages and
Notifications. Push Messages occur when a server sends information to a service worker.
Notifications occur when a service worker or page script shows information to the user.

As with the [Background Fetch and Background Sync features from Chrome 76][23], once you start
recording, Push Messages and Notifications on this page are recorded for 3 days, even when the page
is closed, and even when Chrome is closed.

{% Img src="image/admin/6TR4LtEvJV65NcX0XTtu.png", alt="The new Notifications and Push Messages panes.", width="800", height="401" %}

Figure 7. The new Push Messages and Notifications panes in the Application panel.

[Chromium issue #927726][24]

[1]: https://twitter.com/argyleink
[2]: https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc
[3]: https://twitter.com/argyleink/status/1142216452184821760
[4]:
  https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video#layout_shifting_and_placeholders
[5]: /docs/devtools/command-menu
[6]: https://crbug.com/961846
[7]: /blog/new-in-devtools-76
[8]: https://github.com/GoogleChrome/lighthouse/releases/tag/v5.1.0
[9]: https://developers.google.com/web/fundamentals/design-and-ux/browser-customization#safari
[10]: https://web.dev/use-lighthouse-for-performance-budgets/
[11]: https://developers.google.com/web/updates/2018/05/first-input-delay
[12]: https://web.dev/use-lighthouse-for-performance-budgets/
[13]: https://github.com/GoogleChrome/lighthouse/blob/master/docs/plugins.md
[14]: https://github.com/GoogleChrome/lighthouse-stack-packs
[15]: /docs/devtools/customize/dark-theme
[16]: /blog/new-in-devtools-73#logpoints
[17]: /docs/devtools/javascript/breakpoints#conditional-loc
[18]: https://developers.google.com/web/fundamentals/performance/resource-prioritization#prefetch
[19]: https://caniuse.com/#feat=link-rel-prefetch
[20]: https://devtools.glitch.me/wndt77/prefetch1.html
[21]: https://crbug.com/935267
[22]: https://v8.dev/features/class-fields#private-class-fields
[23]: /blog/new-in-devtools-76#background
[24]: https://crbug.com/927726

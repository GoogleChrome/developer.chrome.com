---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 75)"
authors:
  - kaycebasques
date: 2019-04-17
#updated: YYYY-MM-DD
description:
  "Meaningful autocomplete preset values, clear site data from the Command Menu, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hiLhrNbs3RQTcUscbhKr.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-75
---

Hello! Here's what's new in [Chrome DevTools][1] in Chrome 75.

## Video version of this page {: #video }

{% YouTube id="6zKPwOMFsa4" %}

## Meaningful preset values when autocompleting CSS functions {: #presets }

Some CSS properties, like [`filter`][2], take functions for values. For example, `filter: blur(1px)`
adds a 1-pixel blur to a node. When autocompleting properties like `filter`, DevTools now populates
the property with a meaningful value so that you can preview what kind of change the value will have
on the node.

{% Img src="image/admin/DdRvcEClGIiO7OXkOO1B.png", alt="The old autocomplete behavior.", width="800", height="530" %}

**Figure 1**. The old autocomplete behavior. DevTools is autocompleting to `filter: blur` and no
change is visible in the viewport.

{% Img src="image/admin/pn14H2YyCFv06zM2o4qO.png", alt="The new autocomplete behavior.", width="800", height="529" %}

**Figure 2**. The new autocomplete behavior. DevTools is autocompleting to `filter: blur(1px)` and
the change is visible in the viewport.

Relevant Chromium issue: [#931145][3]

## Clear site data from the Command Menu {: #clear }

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu and then run the
**Clear Site Data** command to clear all data related to the page, including: [Service workers][4],
[`localStorage`][5], [`sessionStorage`][6], [IndexedDB][7], [Web SQL][8], [Cookies][9], [Cache][10],
and [Application Cache][11].

{% Img src="image/admin/g3ip1ThKFE50s1dPgwGO.png", alt="The Clear Site Data command.", width="800", height="481" %}

**Figure 3**. The **Clear Site Data** command.

Clearing site data has been available from **Application** > **Clear Storage** for a while. The new
feature in Chrome 75 is being able to run the command from the Command Menu.

If you don't want to delete _all_ site data, you can control what data gets deleted from
**Application** > **Clear Storage**.

{% Img src="image/admin/Qk1XBPFLJRSbMRASIcFD.png", alt="Application > Clear Storage.", width="800", height="688" %}

**Figure 4**. **Application** > **Clear Storage**.

Relevant Chromium issue: [#942503][12]

## View all IndexedDB databases {: #indexeddb }

Previously **Application** > **IndexedDB** only allowed you to inspect IndexedDB databases from the
main origin. For example, if you had an `<iframe>` on your page, and that `<iframe>` was using
IndexedDB, you wouldn't be able to see its database(s). As of Chrome 75, DevTools shows IndexedDB
databases for all origins.

{% Img src="image/admin/cwYQMte5WDjKECdTMkxs.png", alt="The old behavior. The page is embedding a demo that uses IndexedDB, but no databases are visible.", width="800", height="518" %}

**Figure 5**. The old behavior. The page is embedding a demo that uses IndexedDB, but no databases
are visible.

{% Img src="image/admin/F31CiY149rkyXWZqqAf6.png", alt="The new behavior. The demo's databases are visible.", width="800", height="478" %}

**Figure 6**. The new behavior. The demo's databases are visible.

Relevant Chromium issue: [#943770][13]

## View a resource's uncompressed size on hover {: #uncompressed }

Suppose that you're [inspecting network activity][14]. Your site uses [text compression][15] to
reduce the transfer size of resources. You want to see how large the page's resources are after the
browser uncompresses them. Previously this information was only available when using [large request
rows][16]. Now you can access this information by hovering over the **Size** column.

{% Img src="image/admin/YR6PNeZOoA5uCtJR4QPp.png", alt="Hovering over the Size column to view a resource's uncompressed size.", width="800", height="500" %}

**Figure 7**. Hovering over the Size column to view a resource's uncompressed size.

Relevant Chromium issue: [#805429][17]

## Inline breakpoints in the breakpoint pane {: #inline }

Suppose that you add a [line-of-code breakpoint][18] to the following line of code:

```js
document.querySelector('#dante').addEventListener('click', logWarning);
```

For a while now DevTools has enabled you to specify when exactly it should pause on a breakpoint
like this: at the beginning of the line, before `document.querySelector('#dante')` is called, or
before `addEventListener('click', logWarning)` is called. If you enable all 3, you're essentially
creating 3 breakpoints. Previously the **Breakpoints** pane did not give you the ability to manage
these 3 breakpoints individually. As of Chrome 75 each inline breakpoint gets its own entry in the
**Breakpoints** pane.

{% Img src="image/admin/qy0a4FstNRIVUAccS8Xk.png", alt="The old behavior. There's only one entry in the Breakpoints pane.", width="800", height="360" %}

**Figure 8**. The old behavior. There's only 1 entry in the **Breakpoints** pane.

{% Img src="image/admin/59qgazgk65XVoZYmDBzS.png", alt="The new behavior. There's 3 entries in the Breakpoints pane.", width="800", height="457" %}

**Figure 9**. The new behavior. There's 3 entries in the **Breakpoints** pane.

Relevant Chromium issue: [#927961][19]

## IndexedDB and Cache resource counts {: #counts }

The **IndexedDB** and **Cache** panes now indicate the total number of resources in a database or
cache.

{% Img src="image/admin/9R80yMf5xJQzsSwUZuGZ.png", alt="Total entries in an IndexedDB database.", width="800", height="463" %}

**Figure 10**. Total entries in an IndexedDB database.

Relevant Chromium issues: [#941197][20], [#930773][21], [#930865][22]

## Setting for disabling the detailed inspect tooltip {: #inspect }

Chrome 73 introduced [detailed tooltips when in Inspect mode][23].

{% Img src="image/admin/bZiwRUHS71QoTcp639yN.png", alt="A detailed tooltip.", width="800", height="596" %}

**Figure 11**. A detailed tooltip showing color, font, margin, and contrast.

You can now disable these detailed tooltips from [**Settings**][24] > **Preferences** >
**Elements** > **Show Detailed Inspect Tooltip**.

{% Img src="image/admin/gAKNoI1QKD7Qm9okQsJh.png", alt="A minimal tooltip.", width="800", height="596" %}

**Figure 12**. A minimal tooltip showing only width and height.

Relevant Chromium issue: [#948417][25]

## Setting for toggling tab indentation in the Sources panel editor {: #tab }

Accessibility testing revealed that there was a tab trap in the [**Editor**][26]. Once a keyboard
user tabbed into the **Editor**, they had no way to tab out of it because the <kbd>Tab</kbd> key was
used for indentation. To override the default behavior and use <kbd>Tab</kbd> to move focus, enable
[**Settings**][27] > **Preferences** > **Sources** > **Enable Tab Moves Focus**.

There's been a lot of work recently around making the DevTools UI itself more keyboard navigable.
Check out Rob's [Navigate Chrome DevTools With Assistive Technology][28] to learn more.

[1]: /docs/devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
[3]: https://crbug.com/931145
[4]: https://developers.google.com/web/ilt/pwa/introduction-to-service-worker
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[7]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[8]: https://www.w3.org/TR/webdatabase/
[9]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[11]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[12]: https://crbug.com/942503
[13]: https://crbug.com/943770
[14]: /docs/devtools/network
[15]: https://web.dev/uses-text-compression/
[16]: /docs/devtools/network/reference#uncompressed
[17]: https://crbug.com/805429
[18]: /docs/devtools/javascript/breakpoints#loc
[19]: https://crbug.com/927961
[20]: https://crbug.com/941197
[21]: https://crbug.com/930773
[22]: https://crbug.com/930865
[23]: /blog/new-in-devtools-73#inspect
[24]: /docs/devtools/customize/#settings
[25]: https://crbug.com/948417
[26]: /docs/devtools/sources#edit
[27]: /docs/devtools/customize/#settings
[28]: /docs/devtools/accessibility/navigation

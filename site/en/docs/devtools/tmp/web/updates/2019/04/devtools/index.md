---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 75)"
authors:
  - kaycebasques
date: 2019-04-17
updated: 2019-04-17
description:
  "Meaningful autocomplete preset values, clear site data from the Command Menu, and more."
---

Hello! Here's what's new in [Chrome DevTools][1] in Chrome 75.

## Video version of this page {: #video }

{% youtube id="6zKPwOMFsa4" %}

## Meaningful preset values when autocompleting CSS functions {: #presets }

Some CSS properties, like [`filter`][2], take functions for values. For example, `filter: blur(1px)`
adds a 1-pixel blur to a node. When autocompleting properties like `filter`, DevTools now populates
the property with a meaningful value so that you can preview what kind of change the value will have
on the node.

![The old autocomplete behavior.](/web/updates/images/2019/04/blur1.png)

**Figure 1**. The old autocomplete behavior. DevTools is autocompleting to `filter: blur` and no
change is visible in the viewport.

![The new autocomplete behavior.](/web/updates/images/2019/04/blur2.png)

**Figure 2**. The new autocomplete behavior. DevTools is autocompleting to `filter: blur(1px)` and
the change is visible in the viewport.

Relevant Chromium issue: [#931145][3]

## Clear site data from the Command Menu {: #clear }

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu and then run the
**Clear Site Data** command to clear all data related to the page, including: [Service workers][4],
[`localStorage`][5], [`sessionStorage`][6], [IndexedDB][7], [Web SQL][8], [Cookies][9], [Cache][10],
and [Application Cache][11].

![The Clear Site Data command.](/web/updates/images/2019/04/clearsitedata.png)

**Figure 3**. The **Clear Site Data** command.

Clearing site data has been available from **Application** > **Clear Storage** for a while. The new
feature in Chrome 75 is being able to run the command from the Command Menu.

If you don't want to delete _all_ site data, you can control what data gets deleted from
**Application** > **Clear Storage**.

![Application > Clear Storage.](/web/updates/images/2019/04/clearstoragepane.png)

**Figure 4**. **Application** > **Clear Storage**.

Relevant Chromium issue: [#942503][12]

## View all IndexedDB databases {: #indexeddb }

Previously **Application** > **IndexedDB** only allowed you to inspect IndexedDB databases from the
main origin. For example, if you had an `<iframe>` on your page, and that `<iframe>` was using
IndexedDB, you wouldn't be able to see its database(s). As of Chrome 75, DevTools shows IndexedDB
databases for all origins.

![The old behavior. The page is embedding a demo that uses IndexedDB, but no databases are visible.](/web/updates/images/2019/04/idb1.png)

**Figure 5**. The old behavior. The page is embedding a demo that uses IndexedDB, but no databases
are visible.

![The new behavior. The demo's databases are visible.](/web/updates/images/2019/04/idb2.png)

**Figure 6**. The new behavior. The demo's databases are visible.

Relevant Chromium issue: [#943770][13]

## View a resource's uncompressed size on hover {: #uncompressed }

Suppose that you're [inspecting network activity][14]. Your site uses [text compression][15] to
reduce the transfer size of resources. You want to see how large the page's resources are after the
browser uncompresses them. Previously this information was only available when using [large request
rows][16]. Now you can access this information by hovering over the **Size** column.

![Hovering over the Size column to view a resource's uncompressed size.](/web/updates/images/2019/04/hover.png)

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

![The old behavior. There's only one entry in the Breakpoints pane.](/web/updates/images/2019/04/breakpoints1.png)

**Figure 8**. The old behavior. There's only 1 entry in the **Breakpoints** pane.

![The new behavior. There's 3 entries in the Breakpoints pane.](/web/updates/images/2019/04/breakpoints2.png)

**Figure 9**. The new behavior. There's 3 entries in the **Breakpoints** pane.

Relevant Chromium issue: [#927961][19]

## IndexedDB and Cache resource counts {: #counts }

The **IndexedDB** and **Cache** panes now indicate the total number of resources in a database or
cache.

![Total entries in an IndexedDB database.](/web/updates/images/2019/04/totalentries.png)

**Figure 10**. Total entries in an IndexedDB database.

Relevant Chromium issues: [#941197][20], [#930773][21], [#930865][22]

## Setting for disabling the detailed inspect tooltip {: #inspect }

Chrome 73 introduced [detailed tooltips when in Inspect mode][23].

![A detailed tooltip.](/web/updates/images/2019/04/inspect1.png)

**Figure 11**. A detailed tooltip showing color, font, margin, and contrast.

You can now disable these detailed tooltips from [**Settings**][24] > **Preferences** >
**Elements** > **Show Detailed Inspect Tooltip**.

![A minimal tooltip.](/web/updates/images/2019/04/inspect2.png)

**Figure 12**. A minimal tooltip showing only width and height.

Relevant Chromium issue: [#948417][25]

## Setting for toggling tab indentation in the Sources panel editor {: #tab }

Accessibility testing revealed that there was a tab trap in the [**Editor**][26]. Once a keyboard
user tabbed into the **Editor**, they had no way to tab out of it because the <kbd>Tab</kbd> key was
used for indentation. To override the default behavior and use <kbd>Tab</kbd> to move focus, enable
[**Settings**][27] > **Preferences** > **Sources** > **Enable Tab Moves Focus**.

There's been a lot of work recently around making the DevTools UI itself more keyboard navigable.
Check out Rob's [Navigate Chrome DevTools With Assistive Technology][28] to learn more.

[1]: /web/tools/chrome-devtools
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
[3]: https://crbug.com/931145
[4]: /web/ilt/pwa/introduction-to-service-worker
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[7]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[8]: https://www.w3.org/TR/webdatabase/
[9]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[11]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[12]: https://crbug.com/942503
[13]: https://crbug.com/943770
[14]: /web/tools/chrome-devtools/network
[15]: /web/tools/lighthouse/audits/text-compression
[16]: /web/tools/chrome-devtools/network/reference#uncompressed
[17]: https://crbug.com/805429
[18]: /web/tools/chrome-devtools/javascript/breakpoints#loc
[19]: https://crbug.com/927961
[20]: https://crbug.com/941197
[21]: https://crbug.com/930773
[22]: https://crbug.com/930865
[23]: /web/updates/2019/01/devtools#inspect
[24]: /web/tools/chrome-devtools/ui#settings
[25]: https://crbug.com/948417
[26]: /web/tools/chrome-devtools/sources#edit
[27]: /web/tools/chrome-devtools/ui#settings
[28]: /web/tools/chrome-devtools/accessibility/navigation

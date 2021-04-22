---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 62)"
authors:
  - kaycebasques
date: 2017-08-29
#updated: YYYY-MM-DD
description:
  "Top-level await operators in the Console, new screenshot workflows, CSS Grid highlighting, and
  more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SZvKcTh58DvCQoqImLW0.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-62
---

New features and changes coming to DevTools in Chrome 62:

- [Support for top-level `await` operators in the **Console**][1].
- [Screenshots of a portion of the viewport][2], and [screenshots of specific HTML nodes][3].
- [CSS Grid highlighting][4].
- [A new **Console** API for querying objects][5].
- [Negative filters][6] and [URL filters][7] in the **Console**.
- [HAR imports in the **Network** panel][8].
- [Previewable cache resources][9].
- [More predictable cache debugging][10].
- [Block-level code coverage][11].

{% Aside %}

**Note:** You can check what version of Chrome you're running at `chrome://version`. Chrome
auto-updates to a new major version about every 6 weeks.

{% endAside %}

{% YouTube id="eD4fiqjaxHw" %}

## Top-level await operators in the Console {: #await }

The **Console** now supports top-level `await` operators.

{% Img src="image/admin/71X0fX7b3MPd1XHh4RRq.png", alt="Using top-level await operators in the Console", width="800", height="578" %}

**Figure 1**. Using top-level `await` operators in the **Console**

## New screenshot workflows {: #screenshots }

You can now take a screenshot of a portion of the viewport, or of a specific HTML node.

### Screenshots of a portion of the viewport {: #screenshot-areas }

To take a screenshot of a portion of your viewport:

1.  Click **Inspect** {% Img src="image/admin/nnx3r8nkEF8iDhofWHDV.png", alt="Inspect", width="26", height="26" %} or press
    <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux) to enter Inspect Element Mode.
2.  Hold <kbd>Command</kbd> (Mac) or <kbd>Control</kbd> (Windows, Linux) and select the portion of
    the viewport that you want to take a screenshot of.
3.  Release your mouse. DevTools downloads a screenshot of the portion that you selected.

{% Img src="image/admin/iR7k72K9hcWA3Fa673R5.png", alt="Taking a screenshot of a portion of the viewport", width="800", height="536" %}

**Figure 2**. Taking a screenshot of a portion of the viewport

### Screenshots of specific HTML nodes {: #node-screenshots }

To take a screenshot of a specific HTML node:

1.  [Select an element][12] in the **Elements** panel.

    {% Img src="image/admin/SSf580tYGEHkxnoDw8qH.png", alt="An example of a node", width="800", height="475" %}

    **Figure 3**. In this example, the goal is to take a screenshot of the blue header that contains
    the text `Tools`. Note that this node is already selected in the **DOM Tree** of the
    **Elements** panel

2.  Open the [Command Menu][13].
3.  Start typing `node` and select `Capture node screenshot`. DevTools downloads a screenshot of the
    selected node.

    {% Img src="image/admin/oLRynL854GzTK6y4jzJa.png", alt="The result of the 'Capture node screenshot' command", width="800", height="111" %}

    **Figure 4**. The result of the `Capture node screenshot` command

## CSS Grid highlighting {: #css-grid-highlighting }

To view the CSS Grid that's affecting an element, hover over an element in the **DOM Tree** of the
**Elements** panel. A dashed border appears around each of the grid items. This only works when the
selected item, or the parent of the selected item, has `display:grid` applied to it.

{% Img src="image/admin/N4dPMnuDcJErX3XMDVRF.png", alt="Highlighting a CSS Grid", width="800", height="618" %}

**Figure 5**. Highlighting a CSS Grid

Check out the video below to learn the basics of CSS Grid in less than 2 minutes.

{% YouTube id="AqwPrR7hklE" %}

## A new API for querying heap objects {: #query-objects }

Call `queryObjects(Constructor)` from the **Console** to return an array of objects that were
created with the specified constructor. For example:

- `queryObjects(Promise)`. Returns all Promises.
- `queryObjects(HTMLElement)`. Returns all HTML elements.
- `queryObjects(foo)`, where `foo` is a function name. Returns all objects that were instantiated
  via `new foo()`.

The scope of `queryObjects()` is the currently-selected execution context in the **Console**. See
[Selecting execution context][14].

## New Console filters {: #console-filters }

The **Console** now supports negative and URL filters.

### Negative filters {: #negative-filters }

Type `-<text>` in the **Filter** box to filter out any **Console** message that includes `<text>`.

{% Img src="image/admin/Ukp7ge0eweiyjk77ZaSf.png", alt="An example of 3 messages that will be filtered out", width="800", height="394" %}

**Figure 6**. The first statement logs `one`, `two`, `three`, and `four` to the **Console**. `two`
is hidden because `-two` is entered in the **Filter** box

DevTools filters out a message if `<text>` is found:

- In the message text.
- In the filename from which the message originated.
- In the stack trace text.

The negative filter also works with regular expressions such as `-/[4-5]*ms/`.

### URL filters {: #url-filters }

Type `url:<text>` in the **Filter** box to only show messages that originated from a script whose
URL includes `<text>`.

The filter uses fuzzy matching. If `<text>` appears anywhere in the URL, then DevTools shows the
message.

{% Img src="image/admin/I3Wc8xjZBvzId3BRwEIm.png", alt="An example of URL filtering", width="800", height="389" %}

**Figure 7**. Using URL filtering to only display messages that originate from scripts whose URL
includes `hymn`. By hovering over the script name, you can see that the host name includes this text

## HAR imports in the Network panel {: #har-imports }

Drag and drop a HAR file into the **Network** panel to import it.

{% Img src="image/admin/STHEvnbcwmLRvtK3ybUN.png", alt="Importing a HAR file", width="800", height="518" %}

**Figure 8**. Importing a HAR file

{% Aside %}

**Note**: To export a HAR file, right-click a request and select **Save As HAR With Content**. All
requests that DevTools has recorded are saved to the file. If you've got any filters enabled, those
are ignored.

{% endAside %}

## Previewable cache resources in the Application panel {: #cache-preview }

Click a row in a **Cache Storage** table to see a preview of that resource below the table.

{% Img src="image/admin/J7XEvBzF8nrvxBF8CGMU.png", alt="Previewing a cache resource", width="800", height="759" %}

**Figure 9**. Previewing a cache resource

## More responsive cache debugging {: #cache-debugging }

In Chrome 61 and earlier, debugging caches created with the [Cache API][15] is... rough. For
example, when a page creates a new cache, you have to manually refresh the page or DevTools in order
to see the new cache.

In Chrome 62, the **Cache Storage** tab now updates in real-time whenever you create, update, or
delete a cache or a resource. Watch the video below for an example.

{% YouTube id="laZpBKpjzRM" %}

See the [Cache Storage Demo][16] to try it out yourself.

## Block-level code coverage {: #coverage }

In Chrome 61 and earlier, the **Coverage** tab marks all of the code within a function as used, so
long as the function is called.

{% Img src="image/admin/iInIeUqCY8K85HCu09xT.png", alt="An example of the Coverage tab in Chrome 61", width="800", height="587" %}

**Figure 10**. An example of the **Coverage** tab in Chrome 61. Line 4 is marked used, even though
it never executes

Starting in Chrome 62, the **Coverage** tab now tells you which code within a function is called.

{% Img src="image/admin/lWKkk4JCXIn2Tt3ucxnp.png", alt="An example of the Coverage tab in Chrome 62", width="800", height="622" %}

**Figure 11**. An example of the **Coverage** tab in Chrome 62. Line 4 is marked unused

[1]: #await
[2]: #screenshot-areas
[3]: #node-screenshots
[4]: #css-grid-highlighting
[5]: #query-objects
[6]: #negative-filters
[7]: #url-filters
[8]: #har-imports
[9]: #cache-preview
[10]: #cache-debugging
[11]: #coverage
[12]: /docs/devtools/css/reference#select
[13]: /docs/devtools/command-menu/
[14]: /docs/devtools/console/reference/#context
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[16]: https://googlechrome.github.io/devtools-samples/whatsnew/m62/cache.html
[17]: /blog/new-in-devtools-59#coverage
[18]: /blog/new-in-devtools-59#screenshots
[19]: /blog/new-in-devtools-59#block-requests
[20]: /blog/new-in-devtools-59#async
[21]: /blog/new-in-devtools-59#command-menu

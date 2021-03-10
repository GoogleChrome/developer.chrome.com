---
layout: "layouts/doc-post.njk"
title: "Edit the DOM"
authors:
  - kaycebasques
  - megginkearney
date: 2015-04-29
#updated: YYYY-MM-DD
description: "The DOM tree view in the Chrome DevTools Elements panel displays the DOM structure of the current web page. Live-edit the content and structure of your page through DOM updates."
---

{% Aside 'caution' %}

This page is deprecated.

{% endAside %}

The DOM tree view in the Chrome DevTools Elements panel displays the DOM structure of the current
web page. Live-edit the content and structure of your page through DOM updates.

## Summary {: #summary }

- The DOM defines your page structure. Each DOM node is a page element, for example, a header node,
  paragraph node.
- Live-edit the content and structure of your pages through the rendered DOM.
- But remember, you can't modify source files through DOM changes in the Elements panel. Reloading
  the page erases any DOM tree modifications.
- Watch for changes to the DOM using DOM breakpoints.

## Inspect an element {: #inspect-an-element }

Use the **Elements panel** to inspect all elements in your page in one DOM tree. Select any element
and inspect the styles applied to it.

There are several ways to inspect an element:

Right-click any element on the page and select **Inspect**.

{% Img src="image/admin/ZzD3byOpzH4vyOh9tFa8.png", alt="Inspect an element via right-click", width="800", height="500" %}

Press <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd>
(Windows) or <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd>
(Mac) to open DevTools in Inspect Element mode, then hover over an element. DevTools automatically
highlights the element that you are hovering over in the **Elements** panel. Click on the element to
exit inspect mode while keeping the element highlighted within the **Elements** panel.

Click the **Inspect Element** button
{% Img src="image/admin/E11B8NEUetyjSgEcdaQW.png", alt="Inspect icon", width="40", height="44" %} to go into Inspect
Element Mode, then click on an element.

Use the [`inspect`][1] method in the console, such as `inspect(document.body)`.

### View the rendered and natural sizes of an image {: #image-sizes }

Hover over an `img` tag in the **DOM Tree** to view the rendered and natural sizes of that image.

{% Img src="image/admin/GfWDnUSXa2UOC7QwZnAs.png", alt="Rendered and natural image sizes", width="800", height="514" %}

### View which image in a source set (srcset) is being used {: #srcset }

To view which version of an image in a `srcset` was loaded, select the `img` element, then evaluate
`$0.currentSrc` in the **Console**.

{% Aside %}

**Note:** See [Enhance `img`s with `srcset` for high DPI devices][2] to learn more about image
optimization using `srcset`.

{% endAside %}

{% Img src="image/admin/y8FFlwNqQM87sHUcLfAi.png", alt="currentSrc in the Console", width="800", height="600" %}

{% Aside %}

**Note:** `$0` is a shortcut in the DevTools **Console**. It provides a reference to the
currently-selected element in the **DOM Tree**.

{% endAside %}

You can also view `currentSrc` via the **Properties** tab. The **Properties** tab only displays
properties for the currently-selected element, so make sure that you've selected the correct element
before viewing.

{% Img src="image/admin/dW2JBgBeclU7LpZyI9zb.png", alt="currentSrc in the Properties tab", width="800", height="556" %}

## Navigate the DOM {: #navigate_the_dom }

Navigate through the DOM structure using your mouse or keyboard.

A collapsed node has an arrow next to it pointing right:
{% Img src="image/admin/5nWl9XzVaBSNAT32IYvf.png", alt="collapsed node", width="238", height="36" %}

An expanded node has an arrow next to it pointing down:
{% Img src="image/admin/yT0UQHoAWsNdy0ye6TLQ.png", alt="expanded node", width="130", height="36" %}

Using your mouse:

- Click once to highlight a node.
- To expand a node, double-click anywhere on it or click on the arrow next  
  to it.
- To collapse a node, click on the arrow next to it.

Using your keyboard:

- Press the **Up Arrow** key to select the node above the current one.
- Press the **Down Arrow** to select the node below the current one.
- Press the **Right Arrow** key to expand a collapsed node. Press it again to move to the first
  child of the (now-expanded) node. You can use this technique to quickly navigate deeply-nested
  nodes.

### Navigate the breadcrumb trail {: #navigate_the_breadcrumb_trail }

At the bottom of the Elements panel is a breadcrumb trail.

{% Img src="image/admin/80JnezQlbMWCsIAvRJX7.png", alt="Breadcrumb trail", width="158", height="38" %}

The currently selected node is highlighted in blue. The node to the left is the current node's
parent. And to the left of that is the parent's parent. And so on, all the way up the tree.

{% Img src="image/admin/797gS7TsmZ6utjHFRO0b.png", alt="Extend breadcrumb trail", width="296", height="38" %}

Navigating back up the structure moves the highlight:

{% Img src="image/admin/g26oUnGfVkhBnuUi96IB.png", alt="Navigate up breadcrumb trail", width="286", height="38" %}

DevTools displays as many items as possible in the trail. If the entire trail doesn't fit in the
status bar, an ellipsis (...) shows where the trail has been truncated. Click the ellipsis to show
the hidden elements:

{% Img src="image/admin/7kc0ov3hH02i03PUW7FM.png", alt="Breadcrumb ellipsis", width="800", height="88" %}

## Edit DOM nodes and attributes {: #edit_dom_nodes_and_attributes }

To edit a DOM node name or attribute:

- Double-click directly on the node name or attribute.
- Highlight the node, press <kbd>Enter</kbd>, and then press <kbd>Tab</kbd> until the name or
  attribute is selected.
- Open the [more actions menu][3] and select **Add Attribute** or **Edit Attribute**. **Edit
  Attribute** is context-sensitive; the portion you click on determines what gets edited.

The closing tag is automatically updated when you're finished.

### Edit DOM node and its children as HTML {: #edit_dom_node_and_its_children_as_html }

To edit a DOM node and its children as HTML:

- Open the [more actions menu][4] and select **Edit as HTML**.
- Press <kbd>F2</kbd> (Windows / Linux) or <kbd>Fn</kbd>+<kbd>F2</kbd> (Mac).
- Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows / Linux) or <kbd>Cmd</kbd>+<kbd>Enter</kbd> (Mac)
  to save your changes.
- Press <kbd>Esc</kbd> to exit the editor without saving.

{% Img src="image/admin/UHeWMYzsXrc4iJOOJzwk.png", alt="edit as HTML", width="800", height="827" %}

## Move DOM node {: #move_dom_node }

Click, hold, and drag a node to move it.

## Delete DOM node {: #delete_dom_node }

To delete a DOM node:

- Open the [more actions menu][5] and select **Delete Node**.
- Select the node and press the <kbd>Delete</kbd> key.

{% Aside %}

**Note:** If you delete a node by accident, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Z</kbd>
(or <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Z</kbd> on Mac) to undo your last action.

{% endAside %}

## Show more actions menu {: #more-actions }

The **more actions** menu lets you interact with a DOM node in a variety of ways. To view the menu,
right-click on a node, or select a node and then press the **more actions** button
(![more action 
button](/docs/devtools/inspect-styles/imgs/more-actions-button.png))).
The button is only displayed on the currently selected element.

{% Img src="image/admin/qm3O8Ui3sVOiO0U7LVIK.png", alt="more actions menu", width="800", height="897" %}

## Scroll into view {: #scroll_into_view }

When you hover over or select a DOM node, the rendered node is highlighted in the viewport. If the
node is scrolled offscreen, you'll see a tooltip at the top of the viewport if the node is above the
current viewport, and a tooltip at the bottom if the node is below the current viewport. For
example, in the screenshot below DevTools is indicating that the currently selected element in the
**Elements** panel is below the viewport.

{% Img src="image/admin/jR7FXYuiTHrMlqqXWlzf.png", alt="element below viewport", width="800", height="440" %}

To scroll the page so the node appears in the viewport, **Right-click** the node and select **Scroll
into View**.

## Set DOM breakpoints {: #set_dom_breakpoints }

Set DOM breakpoints to debug complex JavaScript applications. For example, if your JavaScript is
changing the styling of a DOM element, set a DOM breakpoint to fire when the element's attributes
are modified. Trigger a breakpoint on one of the following DOM changes: subtree change, attribute
change, node removal.

### Subtree Modifications {: #subtree_modifications }

A subtree modification breakpoint is triggered when a child element is added, removed, or moved. For
example, if you set a subtree modification breakpoint on the `main-content` element, the following
code triggers the breakpoint:

```js
var element = document.getElementById('main-content');
//modify the element's subtree.
var mySpan = document.createElement('span');
element.appendChild( mySpan );
```

### Attribute Modifications {: #attribute_modifications }

An attribute modification occurs when the attribute of an element (`class, id, name`) is changed
dynamically:

```js
var element = document.getElementById('main-content');
// class attribute of element has been modified.
element.className = 'active';
```

### Node Removal {: #node_removal }

A node removal modification is triggered when the node in question is removed from the DOM:

```js
document.getElementById('main-content').remove();
```

## Interact with DOM breakpoints {: #interact_with_dom_breakpoints }

The Elements and Sources panels both include a pane for managing your DOM breakpoints.

Each breakpoint is listed with an element identifier and the breakpoint type.

{% Img src="image/admin/1fgsvC7Mdss4PH9jGf3z.png", alt="DOM breakpoints pane", width="800", height="564" %}

Interact with each listed breakpoint in any of the following ways:

- **Hover** over the element identifier to show the element's corresponding position on the page
  (similar to hovering over nodes in the Elements panel).
- **Click** an element to select it in the Elements panel.
- **Toggle** the checkbox to enable or disable the breakpoint.

When you trigger a DOM breakpoint, the breakpoint is highlighted in the DOM Breakpoints pane. The
**Call Stack** pane displays the **reason** for a debugger pause:

{% Img src="image/admin/KIYOIUrxafkhPjWgNpsN.png", alt="Breakpoint reason", width="800", height="56" %}

## View element event listeners {: #view_element_event_listeners }

View JavaScript event listeners associated with a DOM node in the **Event Listeners** pane.

{% Img src="image/admin/PlhUYlKn6g1Xb7MU9SUW.png", alt="event listeners pane", width="800", height="498" %}

The top-level items in the Event Listeners pane show the event types that have registered listeners.

Click the arrow next to the event type (for example `click`) to see a list of registered event
handlers. Each handler is identified by a CSS selector-like element identifier, such as `document`
or `button#call-to-action`. If more than one handler is registered for the same element, the element
is listed repeatedly.

Click the expander arrow next to an element identifier to see the properties of the event handler.
The Event Listeners pane lists the following properties for each listener:

<table class="responsive"><thead><tr><th colspan="2">Event Listener Properties &amp; Description</th></tr></thead><tbody><tr><td data-th="Value"><code translate="no" dir="ltr">handler</code></td><td data-th="Description">Contains a callback function. Right-click on the function and select <strong>Show Function Definition</strong> to view where the function is defined (if source code is available).</td></tr><tr><td data-th="Value"><code translate="no" dir="ltr">useCapture</code></td><td data-th="Description">A boolean value stating whether the <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> flag on <code translate="no" dir="ltr">addEventListener</code> was set.</td></tr></tbody></table>

{% Aside %}

**Note:** Many Chrome extensions add their own event listeners onto the DOM. If you see a number of
event listeners that aren't set by your code, you may want to reopen your page in an [Incognito
window][7]. Incognito windows prevent extensions from running by default.

{% endAside %}

### View ancestor event listeners {: #view_ancestor_event_listeners }

When the **Ancestors** checkbox is enabled, the event listeners for the ancestors of the currently
selected node are displayed, in addition to the currently selected node's event listeners.

{% Img src="image/admin/JGfoBcIqVORoMpwnbeZR.png", alt="ancestors enabled", width="800", height="498" %}

When the checkbox is disabled, only the event listeners for the currently selected node are
displayed.

{% Img src="image/admin/dmhpV5zrbLLjmnWqCWDm.png", alt="ancestors disabled", width="800", height="496" %}

### View framework listeners {: #view_framework_listeners }

Some JavaScript frameworks and libraries wrap native DOM events into their custom event APIs. In the
past this made it hard to inspect the event listeners with DevTools, because the function definition
would just reference back to the framework or library code. The **Framework listeners** feature
solves this problem.

When the **Framework listeners** checkbox is enabled, DevTools automatically resolves the framework
or library wrapping portion of the event code, and then tells you where you actually bound the event
in your own code.

{% Img src="image/admin/jAd9uCvW3krq652UZhtj.png", alt="framework listeners enabled", width="800", height="497" %}

When the **Framework listeners** checkbox is disabled, the event listener code will probably resolve
somewhere in the framework or library code.

{% Img src="image/admin/9Q9XrLTnaZARuGo2zd5B.png", alt="framework listeners disabled", width="800", height="498" %}

## Show HTML comments {: #show-html-comments }

To show or hide HTML comments in the Elements panel:

1.  Open [Settings][8].
2.  Click the **Preferences** tab.
3.  Under the **Elements** section, check the **Show HTML comments** checkbox.

To show or hide HTML comments in the **Elements** panel, [open **Settings**][9], go to the
**Preferences** panel, find the **Elements** section, and then toggle the **Show HTML comments**
checkbox.

[1]: /docs/devtools/debug/command-line/command-line-reference#inspect
[2]: https://developers.google.com/web/fundamentals/design-and-ux/responsive/images#enhance_imgs_with_srcset_for_high_dpi_devices
[3]: #more-actions
[4]: #more-actions
[5]: #more-actions
[6]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener
[7]: https://support.google.com/chrome/answer/95464
[8]: /docs/devtools/customize/#settings
[9]: #settings

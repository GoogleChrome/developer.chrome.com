---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 71)"
authors:
  - kaycebasques
date: 2018-10-10
#updated: YYYY-MM-DD
description: "Highlight DOM nodes from Live expressions, store nodes as global variables, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gnfb6rY6bc6nLDRgyenT.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-71
---

New features and major changes coming to Chrome DevTools in Chrome 71 include:

- [Hover over a Live Expression to highlight a DOM node][1]
- [Store DOM nodes as global variables][2]
- [Initiator and priority information now in HAR imports and exports][3]
- [Access the Command Menu from the Main Menu][4]
- [Picture-in-Picture breakpoints][5]
- [(Bonus Tip) Run monitorEvents() in the Console to watch an element's events fire][6]

Read on, or watch the video version of this page:

{% YouTube id="fJxFZO8OEEs" %}

## Hover over a Live Expression to highlight a DOM node {: #hover }

When a [Live Expression][7] evaluates to a DOM node, hover over the Live Expression result to
highlight that node in the viewport.

{% Img src="image/admin/RwKgxU3QgMl4HFhkiwCU.png", alt="Hovering over a Live Expression result to highlight the node in the viewport.", width="800", height="538" %}

**Figure 1**. Hovering over a Live Expression result to highlight the node in the viewport

## Store DOM nodes as global variables {: #store }

To store a DOM node as a global variable, run an expression in the Console that evaluates to a node,
right-click the result, and then select **Store as global variable**.

{% Img src="image/admin/DlSygYaM8NJJwMwWrMtk.png", alt="Store as global variable in the Console.", width="800", height="550" %}

**Figure 2**. Store as global variable in the Console

Or, right-click the node in the **DOM Tree** and select **Store as global variable**.

{% Img src="image/admin/x6QyAxisOZRkPEGGI3Qd.png", alt="Store as global variable in the DOM Tree.", width="800", height="557" %}

**Figure 3**. Store as global variable in the DOM Tree

## Initiator and priority information now in HAR imports and exports {: #HAR }

If you'd like to diagnose network logs with colleagues, you can [export the network requests to a
HAR file][8].

{% Img src="image/admin/opKZS6d6ERQfvdXXhmQo.png", alt="Exporting network requests to a HAR file.", width="800", height="490" %}

**Figure 8**. Exporting network requests to a HAR file

To import the file back into the Network panel, just drag and drop it.

When you export a HAR file, DevTools now includes initiator and priority information in the HAR
file. When you import HAR files back into DevTools, the **Initiator** and **Priority** columns are
now populated.

The `_initiator` field provides more context around what caused the resource to be requested. This
maps to the **Initiator** column in the Requests table.

{% Img src="image/admin/UpzMoXodZw6gqWRZ4v0H.png", alt="The initiator column.", width="800", height="603" %}

**Figure 9**. The initiator column

You can also [hold <kbd>Shift</kbd> and hover over a request][9] to view its initiator and
dependencies.

{% Img src="image/admin/yZxQUHD54lKX0DGvtM9Q.png", alt="Viewing initiators and dependencies.", width="800", height="568" %}

**Figure 10**. Viewing initiators and dependencies

The `_priority` field states what priority level the browser assigned to the resource. This maps to
the **Priority** column in the Requests table, which is hidden by default.

{% Img src="image/admin/3bARzJP9nyrR3Fu7oIl7.png", alt="The Priority column.", width="800", height="603" %}

**Figure 11**. The Priority column

Right-click the header of the Requests table and select **Priority** to show the **Priority**
column.

{% Img src="image/admin/hNGmMyPt6NSDS412Z4FP.png", alt="How to show the Priority column.", width="800", height="670" %}

**Figure 12**. How to show the **Priority** column

{% Aside %}

**Note:** The `_initiator` and `_priority` fields begin with underscores because the [HAR spec][10]
states that custom fields must begin with underscores.

{% endAside %}

## Access the Command Menu from the Main Menu {: #command-menu }

Use the [Command Menu][11] for a fast way to access DevTools panels, tabs, and features.

{% Img src="image/admin/D4633SRg8P0N0DpISp5R.png", alt="The Command Menu.", width="800", height="630" %}

**Figure 13**. The Command Menu

You can now open the Command Menu from the Main Menu. Click the **Main Menu**
{% Img src="image/admin/Z2PMFN1cVLHOqIbJrb23.png", alt="main", width="6", height="26" %} button and select **Run command**.

{% Img src="image/admin/E0sYAOSTscvoAvlPQIbk.png", alt="Opening the Command Menu from the Main Menu.", width="800", height="648" %}

**Figure 14**. Opening the Command Menu from the Main Menu

## Picture-in-Picture breakpoints {: #picture-in-picture }

[Picture-in-Picture][12] is a new experimental API that enables a page to create a floating video
window over the desktop.

Enable the `enterpictureinpicture`, `leavepictureinpicture`, and `resize` checkboxes in the [Event
Listener Breakpoints pane][13] to pause whenever one of these picture-in-picture events fires.
DevTools pauses on the first line of the handler.

{% Img src="image/admin/Cfa2fZ046Odp89JUdjAB.png", alt="Picture-in-Picture events in the Event Listener Breakpoints pane.", width="800", height="570" %}

**Figure 16**. Picture-in-Picture events in the Event Listener Breakpoints pane

## (Bonus Tip) Run monitorEvents() in the Console to watch an element's events fire {: #bonus }

{% Aside %}

**Note:** This section covers a lesser-known feature that has been in DevTools for a long time.

{% endAside %}

Suppose you want to add a red border around a button after focusing it and pressing `R`, `E`, `D`,
but you don't know what events to add listeners to. Use [`monitorEvents()`][14] to log all of the
element's events to the Console.

1.  Get a reference to the node.

    {% Img src="image/admin/4KI3LybfPi0pAZpuB8fT.png", alt="Using 'Store as global variable' to get a reference to the node.", width="800", height="500" %}

    **Figure 17**. Using **Store as global variable** to get a reference to the node

2.  Pass the node as the first argument to `monitorEvents()`.

    {% Img src="image/admin/xlOnKapF3FEesLmEpYSz.png", alt="Passing the node to monitorEvents().", width="800", height="500" %}

    **Figure 18**. Passing the node to `monitorEvents()`

3.  Interact with the node. DevTools logs all of the node's events to the Console.

    {% Img src="image/admin/jIZL7Oqiphr5zAHEPTDx.png", alt="The node's events in the Console.", width="800", height="500" %}

    **Figure 19**. The node's events in the Console

Call [`unmonitorEvents()`][15] to stop logging events to the Console.

```js
unmonitorEvents(temp1);
```

Pass an array as the second argument to `monitorEvents()` if you only want to monitor certain events
or types of events:

```js
monitorEvents(temp1, ['mouse', 'focus']);
```

The `mouse` type tells DevTools to log all mouse-related events, such as `mousedown` and `click`.
Other supported types are `key`, `touch`, and `control`.

Check out [Command Line Reference][16] for other handy functions that you can call from the Console.

[1]: #hover
[2]: #store
[3]: #HAR
[4]: #command-menu
[5]: #picture-in-picture
[6]: #bonus
[7]: /blog/new-in-devtools-70#watch
[8]: /docs/devtools/network/reference#save-as-har
[9]: /docs/devtools/network/reference#initiators-dependencies
[10]: https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html
[11]: /docs/devtools/command-menu/
[12]: https://github.com/WICG/picture-in-picture
[13]: /docs/devtools/javascript/breakpoints#event-listeners
[14]: /docs/devtools/console/utilities#monitorevents
[15]: /docs/devtools/console/utilities#unmonitorevents
[16]: /docs/devtools/console/utilities

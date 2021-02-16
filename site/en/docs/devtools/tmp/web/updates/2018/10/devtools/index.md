---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 71)"
authors:
  - kaycebasques
date: 2018-10-10
updated: 2018-12-03
description: "Highlight DOM nodes from Live expressions, store nodes as global variables, and more."
---

New features and major changes coming to Chrome DevTools in Chrome 71 include:

- [Hover over a Live Expression to highlight a DOM node][1]
- [Store DOM nodes as global variables][2]
- [Initiator and priority information now in HAR imports and exports][3]
- [Access the Command Menu from the Main Menu][4]
- [Picture-in-Picture breakpoints][5]
- [(Bonus Tip) Run monitorEvents() in the Console to watch an element's events fire][6]

Read on, or watch the video version of this page:

{% youtube id="fJxFZO8OEEs" %}

## Hover over a Live Expression to highlight a DOM node {: #hover }

When a [Live Expression][7] evaluates to a DOM node, hover over the Live Expression result to
highlight that node in the viewport.

![Hovering over a Live Expression result to highlight the node in the viewport.](/web/updates/images/2018/10/hover1.png)

**Figure 1**. Hovering over a Live Expression result to highlight the node in the viewport

## Store DOM nodes as global variables {: #store }

To store a DOM node as a global variable, run an expression in the Console that evaluates to a node,
right-click the result, and then select **Store as global variable**.

![Store as global variable in the Console.](/web/updates/images/2018/10/store1.png)

**Figure 2**. Store as global variable in the Console

Or, right-click the node in the **DOM Tree** and select **Store as global variable**.

![Store as global variable in the DOM Tree.](/web/updates/images/2018/10/store2.png)

**Figure 3**. Store as global variable in the DOM Tree

## Initiator and priority information now in HAR imports and exports {: #HAR }

If you'd like to diagnose network logs with colleagues, you can [export the network requests to a
HAR file][8].

![Exporting network requests to a HAR file.](/web/tools/chrome-devtools/network-performance/imgs/save-as-har.png)

**Figure 8**. Exporting network requests to a HAR file

To import the file back into the Network panel, just drag and drop it.

When you export a HAR file, DevTools now includes initiator and priority information in the HAR
file. When you import HAR files back into DevTools, the **Initiator** and **Priority** columns are
now populated.

The `_initiator` field provides more context around what caused the resource to be requested. This
maps to the **Initiator** column in the Requests table.

![The initiator column.](/web/updates/images/2018/10/HAR1.png)

**Figure 9**. The initiator column

You can also [hold <kbd>Shift</kbd> and hover over a request][9] to view its initiator and
dependencies.

![Viewing initiators and dependencies.](/web/tools/chrome-devtools/network-performance/imgs/initiators-dependencies.png)

**Figure 10**. Viewing initiators and dependencies

The `_priority` field states what priority level the browser assigned to the resource. This maps to
the **Priority** column in the Requests table, which is hidden by default.

![The Priority column.](/web/updates/images/2018/10/HAR2.png)

**Figure 11**. The Priority column

Right-click the header of the Requests table and select **Priority** to show the **Priority**
column.

![How to show the Priority column.](/web/updates/images/2018/10/HAR3.png)

**Figure 12**. How to show the **Priority** column

!!!.aside.aside--note

**Note:** The `_initiator` and `_priority` fields begin with underscores because the [HAR spec][10]
states that custom fields must begin with underscores.

!!!

## Access the Command Menu from the Main Menu {: #command-menu }

Use the [Command Menu][11] for a fast way to access DevTools panels, tabs, and features.

![The Command Menu.](/web/tools/chrome-devtools/images/command-menu.png)

**Figure 13**. The Command Menu

You can now open the Command Menu from the Main Menu. Click the **Main Menu**
![main](/web/tools/chrome-devtools/images/shared/main-menu.png) button and select **Run command**.

![Opening the Command Menu from the Main Menu.](/web/updates/images/2018/10/command-menu1.png)

**Figure 14**. Opening the Command Menu from the Main Menu

## Picture-in-Picture breakpoints {: #picture-in-picture }

[Picture-in-Picture][12] is a new experimental API that enables a page to create a floating video
window over the desktop.

Enable the `enterpictureinpicture`, `leavepictureinpicture`, and `resize` checkboxes in the [Event
Listener Breakpoints pane][13] to pause whenever one of these picture-in-picture events fires.
DevTools pauses on the first line of the handler.

![Picture-in-Picture events in the Event Listener Breakpoints pane.](/web/updates/images/2018/10/pip1.png)

**Figure 16**. Picture-in-Picture events in the Event Listener Breakpoints pane

## (Bonus Tip) Run monitorEvents() in the Console to watch an element's events fire {: #bonus }

!!!.aside.aside--note

**Note:** This section covers a lesser-known feature that has been in DevTools for a long time.

!!!

Suppose you want to add a red border around a button after focusing it and pressing `R`, `E`, `D`,
but you don't know what events to add listeners to. Use [`monitorEvents()`][14] to log all of the
element's events to the Console.

1.  Get a reference to the node.

    ![Using 'Store as global variable' to get a reference to the node.](/web/updates/images/2018/10/bonus1.png)

    **Figure 17**. Using **Store as global variable** to get a reference to the node

2.  Pass the node as the first argument to `monitorEvents()`.

    ![Passing the node to monitorEvents().](/web/updates/images/2018/10/bonus2.png)

    **Figure 18**. Passing the node to `monitorEvents()`

3.  Interact with the node. DevTools logs all of the node's events to the Console.

    ![The node's events in the Console.](/web/updates/images/2018/10/bonus3.png)

    **Figure 19**. The node's events in the Console

Call [`unmonitorEvents()`][15] to stop logging events to the Console.

```
unmonitorEvents(temp1);
```

Pass an array as the second argument to `monitorEvents()` if you only want to monitor certain events
or types of events:

```
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
[7]: /web/updates/2018/08/devtools#watch
[8]: /web/tools/chrome-devtools/network-performance/reference#save-as-har
[9]: /web/tools/chrome-devtools/network-performance/reference#initiators-dependencies
[10]: https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html
[11]: /web/tools/chrome-devtools/ui#command-menu
[12]: https://github.com/WICG/picture-in-picture
[13]: /web/tools/chrome-devtools/javascript/breakpoints#event-listeners
[14]: /web/tools/chrome-devtools/console/command-line-reference#monitorevents
[15]: /web/tools/chrome-devtools/console/command-line-reference#unmonitorevents
[16]: /web/tools/chrome-devtools/console/command-line-reference

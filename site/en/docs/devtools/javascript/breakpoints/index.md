---
layout: "layouts/doc-post.njk"
title: "Pause your code with breakpoints"
authors:
  - kaycebasques
date: 2017-02-03
#updated: YYYY-MM-DD
description: "Learn about all the ways you can pause your code in Chrome DevTools."
---

Use breakpoints to pause your JavaScript code. This guide explains each type of breakpoint that's
available in DevTools, as well as when to use and how to set each type. For a hands-on tutorial of
the debugging process, see [Get Started with Debugging JavaScript in Chrome DevTools][1].

## Overview of when to use each breakpoint type {: #overview }

The most well-known type of breakpoint is line-of-code. But line-of-code breakpoints can be
inefficient to set, especially if you don't know exactly where to look, or if you are working with a
large codebase. You can save yourself time when debugging by knowing how and when to use the other
types of breakpoints.

<table><tbody><tr><th>Breakpoint Type</th><th>Use This When You Want To Pause...</th></tr><tr><td><a href="#loc">Line-of-code</a></td><td>On an exact region of code.</td></tr><tr><td><a href="#conditional-loc">Conditional line-of-code</a></td><td>On an exact region of code, but only when some other condition is true.</td></tr><tr><td><a href="#dom">DOM</a></td><td>On the code that changes or removes a specific DOM node, or its children.</td></tr><tr><td><a href="#xhr">XHR</a></td><td>When an XHR URL contains a string pattern.</td></tr><tr><td><a href="#event-listeners">Event listener</a></td><td>On the code that runs after an event, such as <code translate="no" dir="ltr">click</code>, is fired.</td></tr><tr><td><a href="#exceptions">Exception</a></td><td>On the line of code that is throwing a caught or uncaught exception.</td></tr><tr><td><a href="#function">Function</a></td><td>Whenever a specific function is called.</td></tr></tbody></table>

## Line-of-code breakpoints {: #loc }

Use a line-of-code breakpoint when you know the exact region of code that you need to investigate.
DevTools _always_ pauses before this line of code is executed.

To set a line-of-code breakpoint in DevTools:

1.  Click the **Sources** tab.
2.  Open the file containing the line of code you want to break on.
3.  Go the line of code.
4.  To the left of the line of code is the line number column. Click on it. A blue icon appears on
    top of the line number column.

{% Img src="image/admin/0BqKJaEX3Afeq6s5GbA6.png", alt="A line-of-code breakpoint.", width="800", height="572" %}

**Figure 1**: A line-of-code breakpoint set on line **29**

### Line-of-code breakpoints in your code {: #debugger }

Call `debugger` from your code to pause on that line. This is equivalent to a [line-of-code
breakpoint][9], except that the breakpoint is set in your code, not in the DevTools UI.

```js
console.log('a');
console.log('b');
debugger;
console.log('c');
```

### Conditional line-of-code breakpoints {: #conditional-loc }

Use a conditional line-of-code breakpoint when you know the exact region of code that you need to
investigate, but you want to pause only when some other condition is true.

To set a conditional line-of-code breakpoint:

1.  Click the **Sources** tab.
2.  Open the file containing the line of code you want to break on.
3.  Go the line of code.
4.  To the left of the line of code is the line number column. Right-click it.
5.  Select **Add conditional breakpoint**. A dialog displays underneath the line of code.
6.  Enter your condition in the dialog.
7.  Press Enter to activate the breakpoint. An orange icon appears on top of the line number column.

{% Img src="image/admin/g9xQCASKEYBNWZoztC4G.png", alt="A conditional line-of-code breakpoint.", width="800", height="553" %}

**Figure 2**: A conditional line-of-code breakpoint set on line **32**

### Manage line-of-code breakpoints {: #manage-loc }

Use the **Breakpoints** pane to disable or remove line-of-code breakpoints from a single location.

{% Img src="image/admin/dgJMnIWMWFIwtJ76X9w0.png", alt="The Breakpoints pane.", width="800", height="578" %} **Figure
3**: The **Breakpoints** pane showing two line-of-code breakpoints: one on line 15 of
`get-started.js`, another on line 32

- Check the checkbox next to an entry to disable that breakpoint.
- Right-click an entry to remove that breakpoint.
- Right-click anywhere in the **Breakpoints** pane to deactivate all breakpoints, disable all
  breakpoints, or remove all breakpoints. Disabling all breakpoints is equivalent to unchecking each
  one. Deactivating all breakpoints instructs DevTools to ignore all line-of-code breakpoints, but
  to also maintain preserve their enabled state so that they are in the same state as before when
  you reactivate them.

{% Img src="image/admin/jR6uTu7EVph7vbfunUa3.png", alt="Deactivated breakpoints in the Breakpoints pane.", width="800", height="657" %}

**Figure 4**: Deactivated breakpoints in the **Breakpoints** pane are disabled and transparent

## DOM change breakpoints {: #dom }

Use a DOM change breakpoint when you want to pause on the code that changes a DOM node or its
children.

To set a DOM change breakpoint:

1.  Click the **Elements** tab.
2.  Go the element that you want to set the breakpoint on.
3.  Right-click the element.
4.  Hover over **Break on** then select **Subtree modifications**, **Attribute modifications**, or
    **Node removal**.

{% Img src="image/admin/PlPfY25q2BTOrc69IVDj.png", alt="The context menu for creating a DOM change breakpoint.", width="800", height="577" %}

**Figure 5**: The context menu for creating a DOM change breakpoint

### Types of DOM change breakpoints {: #dom-types }

- **Subtree modifications**. Triggered when a child of the currently-selected node is removed or
  added, or the contents of a child are changed. Not triggered on child node attribute changes, or
  on any changes to the currently-selected node.
- **Attributes modifications**: Triggered when an attribute is added or removed on the
  currently-selected node, or when an attribute value changes.
- **Node Removal**: Triggered when the currently-selected node is removed.

## XHR/Fetch breakpoints {: #xhr }

Use an XHR breakpoint when you want to break when the request URL of an XHR contains a specified
string. DevTools pauses on the line of code where the XHR calls `send()`.

{% Aside %}

**Note:** This feature also works with [Fetch][10] requests.

{% endAside %}

One example of when this is helpful is when you see that your page is requesting an incorrect URL,
and you want to quickly find the AJAX or Fetch source code that is causing the incorrect request.

To set an XHR breakpoint:

1.  Click the **Sources** tab.
2.  Expand the **XHR Breakpoints** pane.
3.  Click **Add breakpoint**.
4.  Enter the string which you want to break on. DevTools pauses when this string is present
    anywhere in an XHR's request URL.
5.  Press Enter to confirm.

{% Img src="image/admin/BQXfCgOqQp7usvLOSySx.png", alt="Creating an XHR breakpoint.", width="800", height="698" %}

**Figure 6**: Creating an XHR breakpoint in the **XHR Breakpoints** for any request that contains
`org` in the URL

## Event listener breakpoints {: #event-listeners }

Use event listener breakpoints when you want to pause on the event listener code that runs after an
event is fired. You can select specific events, such as `click`, or categories of events, such as
all mouse events.

1.  Click the **Sources** tab.
2.  Expand the **Event Listener Breakpoints** pane. DevTools shows a list of event categories, such
    as **Animation**.
3.  Check one of these categories to pause whenever any event from that category is fired, or expand
    the category and check a specific event.

{% Img src="image/admin/c40PakNjXuOPIn21VySn.png", alt="Creating an event listener breakpoint.", width="800", height="543" %}

**Figure 7**: Creating an event listener breakpoint for `deviceorientation`

## Exception breakpoints {: #exceptions }

Use exception breakpoints when you want to pause on the line of code that's throwing a caught or
uncaught exception.

1.  Click the **Sources** tab.
2.  Click **Pause on exceptions**
    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Ko2qtw41xR12rOnCfQzt.png", alt="Pause on exceptions", width="28", height="28" %}.
    It turns blue when enabled.

    {% Img src="image/admin/Rc3ID0gnnhS8JBMCbF6J.png", alt="The 'Pause on exceptions' button.", width="800", height="594" %}
    **Figure 8**: The **Pause on exceptions** button

3.  (Optional) Check the **Pause On Caught Exceptions** checkbox if you also want to pause on caught
    exceptions, in addition to uncaught ones.

{% Img src="image/admin/kCtXt5gDE2wHcxyEytig.png", alt="Paused on an uncaught exception.", width="800", height="550" %}

**Figure 9**: Paused on an uncaught exception

## Function breakpoints {: #function }

Call `debug(functionName)`, where `functionName` is the function you want to debug, when you want to
pause whenever a specific function is called. You can insert `debug()` into your code (like a
`console.log()` statement) or call it from the DevTools Console. `debug()` is equivalent to setting
a [line-of-code breakpoint][11] on the first line of the function.

```js
function sum(a, b) {
  let result = a + b; // DevTools pauses on this line.
  return result;
}
debug(sum); // Pass the function object, not a string.
sum();
```

### Make sure the target function is in scope {: #scope }

DevTools throws a `ReferenceError` if the function you want to debug is not in scope.

```js
(function () {
  function hey() {
    console.log('hey');
  }
  function yo() {
    console.log('yo');
  }
  debug(yo); // This works.
  yo();
})();
debug(hey); // This doesn't work. hey() is out of scope.
```

Ensuring the target function is in scope can be tricky if you're calling `debug()` from the DevTools
Console. Here's one strategy:

1.  Set a [line-of-code breakpoint][12] somewhere where the function is in scope.
2.  Trigger the breakpoint.
3.  Call `debug()` in the DevTools Console while the code is still paused on your line-of-code
    breakpoint.

[1]: /docs/devtools/javascript
[2]: #loc
[3]: #conditional-loc
[4]: #dom
[5]: #xhr
[6]: #event-listeners
[7]: #exceptions
[8]: #function
[9]: #loc
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[11]: #loc
[12]: #loc

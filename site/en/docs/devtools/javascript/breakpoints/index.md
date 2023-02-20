---
layout: "layouts/doc-post.njk"
title: "Pause your code with breakpoints"
authors:
  - kaycebasques
  - sofiayem
date: 2017-02-03
updated: 2023-02-05
description: "Learn about all the ways you can pause your code in Chrome DevTools."
tags:
  - javascript
---

Use breakpoints to pause your JavaScript code. This guide explains each type of breakpoint that's
available in DevTools, as well as when to use and how to set each type. For a hands-on tutorial of
the debugging process, see [Get Started with Debugging JavaScript in Chrome DevTools][1].

## Overview of when to use each breakpoint type {: #overview }

The most well-known type of breakpoint is line-of-code. But line-of-code breakpoints can be
inefficient to set, especially if you don't know exactly where to look, or if you are working with a
large codebase. You can save yourself time when debugging by knowing how and when to use the other
types of breakpoints.

<table><tbody><tr><th>Breakpoint Type</th><th>Use this when you want to ...</th></tr><tr><td><a href="#loc">Line-of-code</a></td><td>On an exact region of code.</td></tr><tr><td><a href="#conditional-loc">Conditional line-of-code</a></td><td>Pause on an exact region of code, but only when some other condition is true.</td></tr><tr><td><a href="#log-loc">Logpoint</a></td><td>Log a message to the <b>Console</b> without pausing the execution.</td></tr><tr><td><a href="#dom">DOM</a></td><td>Pause on the code that changes or removes a specific DOM node, or its children.</td></tr><tr><td><a href="#xhr">XHR</a></td><td>Pause when an XHR URL contains a string pattern.</td></tr><tr><td><a href="#event-listeners">Event listener</a></td><td>Pause on the code that runs after an event, such as <code translate="no" dir="ltr">click</code>, is fired.</td></tr><tr><td><a href="#exceptions">Exception</a></td><td>Pause on the line of code that is throwing a caught or uncaught exception.</td></tr><tr><td><a href="#function">Function</a></td><td>Pause whenever a specific function is called.</td></tr></tbody></table>

## Line-of-code breakpoints {: #loc }

Use a line-of-code breakpoint when you know the exact region of code that you need to investigate.
DevTools _always_ pauses before this line of code is executed.

To set a line-of-code breakpoint in DevTools:

1.  Click the **Sources** tab.
2.  Open the file containing the line of code you want to break on.
3.  Go to the line of code.
4.  To the left of the line of code is the line number column. Click on it. A blue icon appears on
    top of the line number column.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IcMBSM988092ZFocJ1LJ.png", alt="A line-of-code breakpoint.", width="800", height="554" %}

This example shows a line-of-code breakpoint set on line **29**.

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

1.  Open the **Sources** tab.
2.  Open the file containing the line of code you want to break on.
3.  Go to the line of code.
4.  To the left of the line of code is the line number column. Right-click it.
5.  Select **Add conditional breakpoint**. A dialog displays underneath the line of code.
6.  Enter your condition in the dialog.
7.  Press <kbd>Enter</kbd> to activate the breakpoint. An orange icon with a question mark appears on top of the line number column.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wbb7VQOAG1GOHvBqqjdt.png", alt="A conditional line-of-code breakpoint.", width="800", height="579" %}

This example shows a conditional line-of-code breakpoint set on line **30**.

### Log line-of-code breakpoints {: #log-loc }

Use log line-of-code breakpoints (logpoints) to log messages to the **Console** without pausing the execution and without cluttering up your code with `console.log()` calls.

To set a logpoint:

1.  Open the **Sources** tab.
1.  Open the file containing the line of code you want to break on.
1.  Go to the line of code.
1.  To the left of the line of code is the line number column. Right-click it.
1.  Select **Add logpoint**. A dialog displays underneath the line of code.
1.  Enter your log message in the dialog.
    
    You can separate strings, variable, and objects with commas. Wrap strings in quotes (`" "`), objects in curly brackets (`{ }`), and type variable names as they are.

    For example: `"I'm a string.", variableName, {object}`.

1.  Press <kbd>Enter</kbd> to activate the breakpoint. A pink icon with two dots appears on top of the line number column.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bOYvXrwYJIxVxapZ7Mdl.png", alt="A logpoint that logs a string, variable, and object to the Console.", width="800", height="687" %}

This example shows a logpoint at line 36 that logs a string, variable, and object to the **Console**.

### Edit line-of-code breakpoints {: #manage-loc }

Use the **Breakpoints** pane to disable, edit, or remove line-of-code breakpoints.

#### Edit groups of breakpoints {: #manage-groups }

The **Breakpoints** pane groups the breakpoints by file and orders them by line and column numbers. You can do the following with groups:

- To collapse or expand a group, click its name.
- To enable or disable a group or breakpoint individually, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} next to the group or the breakpoint. 

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/UslK4pKSMUfuzuzE29gx.mp4", muted="true", controls="true", class="screenshot" %}

This video shows how to collapse groups and disable or enable breakpoints one by one or by groups. When you disable a breakpoint, the **Sources** panel makes its marker next to the line number transparent.

To remove a group, hover over it and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gtAWQj5HMLjKYPqU9dBP.svg", alt="Close.", width="24", height="24" %}.

Groups have context menus. Right-click a group and choose:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SdWkkrJ10XJ7IrsSluZv.png", alt="The context menu of a group.", width="800", height="749" %}

- Remove all breakpoints in file (group).
- Disable all breakpoints in file.
- Enable all breakpoints in file.
- Remove all breakpoints (in all files). 
- Remove other breakpoints (in other groups).

#### Edit breakpoints {: #edit-breakpoints }

To edit a breakpoint:

- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} next to a breakpoint to enable or disable it. When you disable a breakpoint, the **Sources** panel makes its marker next to the line number transparent.
- Hover over a breakpoint and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/k3WKQOAItcJ2pliOyD47.svg", alt="Edit.", width="24", height="24" %} to edit and {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gtAWQj5HMLjKYPqU9dBP.svg", alt="Close.", width="24", height="24" %} to remove it.
- When editing a breakpoint, change its type from the drop-down menu of the inline editor.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nokI9Jswa1DfxNd9cLoO.png", alt="Changing the type of a breakpoint.", width="800", height="600" %}

- Right-click a breakpoint to see its context menu and choose one of the options:

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nXywqsxpmuMDQgDaQusa.png", alt="The context menu of a breakpoint.", width="800", height="749" %}

  - Remove breakpoint.
  - Edit condition or logpoint.
  - Reveal location.
  - Remove all breakpoints (in all files).
  - Remove other breakpoints (in other files).

Watch the video to see various breakpoint edits in action: disable, remove, edit condition, reveal location from the menu, and change type.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/lfy2SaF34u32cXyORfR7.mp4", muted="true", controls="true", class="screenshot" %}

## DOM change breakpoints {: #dom }

Use a DOM change breakpoint when you want to pause on the code that changes a DOM node or its
children.

To set a DOM change breakpoint:

1.  Click the **Elements** tab.
2.  Go to the element that you want to set the breakpoint on.
3.  Right-click the element.
4.  Hover over **Break on** then select **Subtree modifications**, **Attribute modifications**, or
    **Node removal**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XsXVifCHA03yWaSJHeUR.png", alt="The context menu for creating a DOM change breakpoint.", width="800", height="756" %}

This example shows the context menu for creating a DOM change breakpoint.

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

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AAL4i6FKWOaIEdreyLjE.png", alt="Creating an XHR breakpoint.", width="800", height="756" %}

This example shows how to create an XHR breakpoint in the **XHR Breakpoints** for any request that contains
`org` in the URL.

## Event listener breakpoints {: #event-listeners }

Use event listener breakpoints when you want to pause on the event listener code that runs after an
event is fired. You can select specific events, such as `click`, or categories of events, such as
all mouse events.

1.  Click the **Sources** tab.
2.  Expand the **Event Listener Breakpoints** pane. DevTools shows a list of event categories, such
    as **Animation**.
3.  Check one of these categories to pause whenever any event from that category is fired, or expand
    the category and check a specific event.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/aFFgOPi3outuMb32WO3k.png", alt="Creating an event listener breakpoint.", width="800", height="726" %}

This example shows how to create an event listener breakpoint for `deviceorientation`.

## Exception breakpoints {: #exceptions }

Use exception breakpoints when you want to pause on the line of code that's throwing a caught or
uncaught exception. You can pause on both such exceptions independently.

In the **Breakpoints** pane of the **Sources** tab, enable one of the following options or both, then execute the code: 

- Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pause on uncaught exceptions**.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gVGWABNL2GgZYl2BoMHb.png", alt="Paused on an uncaught exception when the corresponding checkbox is enabled.", width="800", height="687" %}

  In this example, the execution is paused on an uncaught exception.

- Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pause on caught exceptions**.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ruYVlG9CAdb86DmnRdsK.png", alt="Paused on a caught exception when the corresponding checkbox is enabled.", width="800", height="687" %}

  In this example, the execution is paused on a caught exception.

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
[10]: https://developer.mozilla.org/docs/Web/API/Fetch_API
[11]: #loc
[12]: #loc

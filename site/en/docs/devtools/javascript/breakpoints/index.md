---
layout: "layouts/doc-post.njk"
title: "Pause your code with breakpoints"
authors:
  - kaycebasques
  - sofiayem
date: 2017-02-03
updated: 2023-04-03
description: "Learn about all the ways you can pause your code in Chrome DevTools."
tags:
  - javascript
---

{% YouTube id='JyHjoaUhAus' %}

Use breakpoints to pause your JavaScript code. This guide explains each type of breakpoint that's
available in DevTools, as well as when to use and how to set each type. For a hands-on tutorial of
the debugging process, see [Get Started with Debugging JavaScript in Chrome DevTools][1].

## Overview of when to use each breakpoint type {: #overview }

The most well-known type of breakpoint is line-of-code. But line-of-code breakpoints can be
inefficient to set, especially if you don't know exactly where to look, or if you are working with a
large codebase. You can save yourself time when debugging by knowing how and when to use the other
types of breakpoints.

<table><tbody><tr><th>Breakpoint Type</th><th>Use this when you want to ...</th></tr><tr><td><a href="#loc">Line-of-code</a></td><td>Pause on an exact region of code.</td></tr><tr><td><a href="#conditional-loc">Conditional line-of-code</a></td><td>Pause on an exact region of code, but only when some other condition is true.</td></tr><tr><td><a href="#log-loc">Logpoint</a></td><td>Log a message to the <b>Console</b> without pausing the execution.</td></tr><tr><td><a href="#dom">DOM</a></td><td>Pause on the code that changes or removes a specific DOM node, or its children.</td></tr><tr><td><a href="#xhr">XHR</a></td><td>Pause when an XHR URL contains a string pattern.</td></tr><tr><td><a href="#event-listeners">Event listener</a></td><td>Pause on the code that runs after an event, such as <code translate="no" dir="ltr">click</code>, is fired.</td></tr><tr><td><a href="#exceptions">Exception</a></td><td>Pause on the line of code that is throwing a caught or uncaught exception.</td></tr><tr><td><a href="#function">Function</a></td><td>Pause whenever a specific function is called.</td></tr><tr><td><a href="#trusted-type">Trusted Type</a></td><td>Pause on <a href="https://www.w3.org/TR/trusted-types/">Trusted Type</a> violations.</td></tr></tbody></table>

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

Use a conditional line-of-code breakpoint when you want to stop the execution but only when some condition is true.

Such breakpoints are useful when you want to skip breaks that are irrelevant to your case, especially in a loop.

To set a conditional line-of-code breakpoint:

1.  Open the **Sources** tab.
2.  Open the file containing the line of code you want to break on.
3.  Go to the line of code.
4.  To the left of the line of code is the line number column. Right-click it.
5.  Select **Add conditional breakpoint**. A dialog displays underneath the line of code.
6.  Enter your condition in the dialog.
7.  Press <kbd>Enter</kbd> to activate the breakpoint. An orange icon with a question mark appears on top of the line number column.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/W2xfoXd2E6y9k4xYfSjX.png", alt="A conditional line-of-code breakpoint.", width="800", height="807" %}

This example shows a conditional line-of-code breakpoint that fired only when the `x` exceeded `10` in a loop at iteration `i=6`.

### Log line-of-code breakpoints {: #log-loc }

Use log line-of-code breakpoints (logpoints) to log messages to the **Console** without pausing the execution and without cluttering up your code with `console.log()` calls.

To set a logpoint:

1.  Open the **Sources** tab.
1.  Open the file containing the line of code you want to break on.
1.  Go to the line of code.
1.  To the left of the line of code is the line number column. Right-click it.
1.  Select **Add logpoint**. A dialog displays underneath the line of code.
1.  Enter your log message in the dialog. You can use the same syntax as you would with a [`console.log(message)`](https://developer.mozilla.org/docs/Web/API/Console/log) call.

    For example, you can log:

    ```js
    "A string " + num, str.length > 1, str.toUpperCase(), obj
    ```

    In this case, the logged message is:

    ```js
    // str = "test"
    // num = 3
    // obj = {attr: "x"}
    A string 42 true TEST {attr: 'x'}
    ```

1.  Press <kbd>Enter</kbd> to activate the breakpoint. A pink icon with two dots appears on top of the line number column.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/daHPau6iUXfqFJSZ61Lh.png", alt="A logpoint that logs a string and a variable value to the Console.", width="800", height="548" %}

This example shows a logpoint at line 30 that logs a string and a variable value to the **Console**.

### Edit line-of-code breakpoints {: #manage-loc }

Use the **Breakpoints** pane to disable, edit, or remove line-of-code breakpoints.

#### Edit groups of breakpoints {: #manage-groups }

The **Breakpoints** pane groups the breakpoints by file and orders them by line and column numbers. You can do the following with groups:

- To collapse or expand a group, click its name.
- To enable or disable a group or breakpoint individually, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} next to the group or the breakpoint.
- To remove a group, hover over it and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gtAWQj5HMLjKYPqU9dBP.svg", alt="Close.", width="24", height="24" %}.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/UslK4pKSMUfuzuzE29gx.mp4", muted="true", controls="true", class="screenshot" %}

This video shows how to collapse groups and disable or enable breakpoints one by one or by groups. When you disable a breakpoint, the **Sources** panel makes its marker next to the line number transparent.

Groups have context menus. In the **Breakpoints** pane, right-click a group and choose:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BN1wTH94xG36ffQm33ue.png", alt="The context menu of a group.", width="800", height="749" %}

- Remove all breakpoints in file (group).
- Disable all breakpoints in file.
- Enable all breakpoints in file.
- Remove all breakpoints (in all files).
- Remove other breakpoints (in other groups).

#### Edit breakpoints {: #edit-breakpoints }

To edit a breakpoint:

- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} next to a breakpoint to enable or disable it. When you disable a breakpoint, the **Sources** panel makes its marker next to the line number transparent.
- Hover over a breakpoint and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/k3WKQOAItcJ2pliOyD47.svg", alt="Edit.", width="24", height="24" %} to edit and {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gtAWQj5HMLjKYPqU9dBP.svg", alt="Close.", width="24", height="24" %} to remove it.
- When editing a breakpoint, change its type from the drop-down list in the inline editor.

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nokI9Jswa1DfxNd9cLoO.png", alt="Changing the type of a breakpoint.", width="800", height="600" %}

- Right-click a breakpoint to see its context menu and choose one of the options:

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/FCsRKMDAEccIPT3ecc0B.png", alt="The context menu of a breakpoint.", width="800", height="749" %}

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

You can find a list of DOM change breakpoints in:

- **Elements** > **DOM Breakpoints** pane.
- **Sources** > **DOM Breakpoints** side pane.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ffaxCrSKWLf8ulyuYePH.png", alt="Lists of DOM Breakpoints in the Elements and Sources panels.", width="800", height="582" %}

There you can:

- Enable or disable them with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %}.
- Right-click > **Remove** or **Reveal** them in the DOM.

### Types of DOM change breakpoints {: #dom-types }

- **Subtree modifications**. Triggered when a child of the currently-selected node is removed or
  added, or the contents of a child are changed. Not triggered on child node attribute changes, or
  on any changes to the currently-selected node.
- **Attributes modifications**: Triggered when an attribute is added or removed on the
  currently-selected node, or when an attribute value changes.
- **Node Removal**: Triggered when the currently-selected node is removed.

## XHR/fetch breakpoints {: #xhr }

Use an XHR/fetch breakpoint when you want to break when the request URL of an XHR contains a specified
string. DevTools pauses on the line of code where the XHR calls `send()`.

One example of when this is helpful is when you see that your page is requesting an incorrect URL,
and you want to quickly find the AJAX or Fetch source code that is causing the incorrect request.

To set an XHR/fetch breakpoint:

1.  Click the **Sources** tab.
2.  Expand the **XHR Breakpoints** pane.
3.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YihNsXarRhDgEi9rOT4H.svg", alt="Add.", width="24", height="24" %} **Add breakpoint**.
4.  Enter the string which you want to break on. DevTools pauses when this string is present
    anywhere in an XHR's request URL.
5.  Press <kbd>Enter</kbd> to confirm.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AAL4i6FKWOaIEdreyLjE.png", alt="Creating an XHR/fetch breakpoint.", width="800", height="756" %}

This example shows how to create an XHR/fetch breakpoint in the **XHR/fetch Breakpoints** for any request that contains
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

Additionally, you can find a list of event listeners in the **Elements** > **Event Listeners** pane.

## Exception breakpoints {: #exceptions }

Use exception breakpoints when you want to pause on the line of code that's throwing a caught or
uncaught exception. You can pause on both such exceptions independently in any debug session other than [Node.js](https://nodejs.org/).

{% Aside 'gotchas' %}
Currently, in a Node.js debug session, you can pause on caught exceptions only if you also pause on uncaught ones.
See [Chromium bug #1382762](https://crbug.com/1382762) for details.
{% endAside %}

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

## Trusted Type breakpoints {: #trusted-type }

The [Trusted Type API](https://developer.mozilla.org/docs/Web/API/Trusted_Types_API) provides protection against security
exploits known as [cross-site scripting](https://owasp.org/www-community/attacks/xss/) (XSS) attacks.

{% Aside 'key-term' %}
DOM-based cross-site scripting happens when data from a user controlled
_source_ (like username, or redirect URL taken from the URL fragment)
reaches a _sink_, which is a function like `eval()` or a property setter like
`.innerHTML`, that can execute arbitrary JavaScript code.
{% endAside %}

In the **Breakpoints** pane of the **Sources** tab, go to the **CSP Violation Breakpoints** section and enable one of the following options or both, then execute the code:

- Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Sink Violations**.

  {% Img src="image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/0XBZkraxRXNBOP7W82K8.png", alt="Paused on a sink violation when the corresponding checkbox is enabled.", width="800", height="687" %}

  In this example, the execution is paused on a sink violation.

- Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Policy Violations**.

  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/n4ml9mus6jP2pl11HNeA.png", alt="Paused on a policy violation when the corresponding checkbox is enabled.", width="800", height="687" %}

  In this example, the execution is paused on a policy violation. Trusted Type policies are set up using [`trustedTypes.createPolicy`](https://developer.mozilla.org/docs/Web/API/TrustedTypePolicyFactory/createPolicy).

You can find more information about using the API:
- To further your security aims, visit [Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types](https://web.dev/trusted-types/).
- For debugging, visit [Implementing CSP and Trusted Types debugging in Chrome DevTools](/blog/csp-issues/#debugging-trusted-types-problems).

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

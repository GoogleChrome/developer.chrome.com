---
layout: "layouts/doc-post.njk"
title: "JavaScript debugging reference"
authors:
  - kaycebasques
  - sofiayem
date: 2017-01-04
updated: 2022-05-30
description:
  "Discover new debugging workflows in this comprehensive reference of Chrome DevTools debugging
  features."
tags:
  - javascript
---

Discover new debugging workflows with this comprehensive reference of Chrome DevTools debugging
features.

See [Get Started With Debugging JavaScript In Chrome DevTools][1] to learn the basics of debugging.

## Pause code with breakpoints {: #breakpoints }

Set a breakpoint so that you can pause your code in the middle of its execution.

See [Pause Your Code With Breakpoints][2] to learn how to set breakpoints.

### Preview class/function properties on hover {: #properties }

While the execution is paused, hover over a class or function name to preview its properties.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wP0xZMDPcIGvz5xE8PAF.png", alt="Preview class/function properties on hover", width="800", height="629" %}

## Step through code {: #stepping }

Once your code is paused, step through it, one line at a time, investigating control flow and
property values along the way.

### Step over line of code {: #step-over }

When paused on a line of code containing a function that's not relevant to the problem you're
debugging, click **Step over**
{% Img src="image/admin/Y91zw0txWmdqrTJ49eeK.png", alt="Step over", width="36", height="20" %} to execute the function
without stepping into it.

{% Img src="image/admin/Rvty5ws4fZ2lid3XeEue.svg", alt="Selecting 'Step over'.", width="800", height="610" %}

**Figure 1**. **Step over**, outlined in blue

For example, suppose you're debugging the following code:

```js
function updateHeader() {
  var day = new Date().getDay();
  var name = getName(); // A
  updateName(name); // D
}
function getName() {
  var name = app.first + ' ' + app.last; // B
  return name; // C
}
```

You're paused on `A`. By pressing **Step over**, DevTools executes all the code in the function that
you're stepping over, which is `B` and `C`. DevTools then pauses on `D`.

### Step into line of code {: #step-into }

When paused on a line of code containing a function call that is related to the problem you're
debugging, click **Step into**
{% Img src="image/admin/htSXjGeDQXrMPRk1PNBC.png", alt="Step into", width="18", height="26" %} to investigate that function
further.

{% Img src="image/admin/dTGivIfR6pShgPSNEpCZ.svg", alt="Selecting 'Step into'.", width="800", height="610" %}

**Figure 2**. **Step into**, outlined in blue

For example, suppose you're debugging the following code:

```js
function updateHeader() {
  var day = new Date().getDay();
  var name = getName(); // A
  updateName(name);
}
function getName() {
  var name = app.first + ' ' + app.last; // B
  return name;
}
```

You're paused on `A`. By pressing **Step into**, DevTools executes this line of code, then pauses on
`B`.

### Step out of line of code {: #step-out }

When paused inside of a function that is not related to the problem you're debugging, click **Step
out** {% Img src="image/admin/xMCC8ajA54Dt06xvvni7.png", alt="Step out", width="18", height="26" %} to execute the rest of
the function's code.

{% Img src="image/admin/Mf2Jkbcv0dBHWTNTMDMQ.svg", alt="Selecting 'Step out'.", width="800", height="610" %}

**Figure 3**. **Step out**, outlined in blue

For example, suppose you're debugging the following code:

```js
function updateHeader() {
  var day = new Date().getDay();
  var name = getName();
  updateName(name); // C
}
function getName() {
  var name = app.first + ' ' + app.last; // A
  return name; // B
}
```

You're paused on `A`. By pressing **Step out**, DevTools executes the rest of the code in
`getName()`, which is just `B` in this example, and then pauses on `C`.

### Run all code up to a certain line {: #continue-to-here }

When debugging a long function, there may be a lot of code that is not related to the problem you're
debugging.

You _could_ step through all the lines, but that can be tedious. You _could_ set a line-of-code
breakpoint on the line you're interested in and then press **Resume Script Execution**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ix91vDLx4PdN9W3x8wOa.png", alt="Resume script execution", width="26", height="20" %}, but there's a faster way.

Right-click the line of code that you're interested in, and select **Continue to here**. DevTools
runs all of the code up to that point, and then pauses on that line.

{% Img src="image/admin/weTYHv4ceNfpam1GEJC9.png", alt="Selecting 'Continue to here'.", width="800", height="573" %}

**Figure 4**. Selecting **Continue to here**


### Resume script execution {: #resume }

To continue your script's execution after a pause, click **Resume Script Execution**
{% Img src="image/admin/c6QDPFXIkyhhqCWYktNB.png", alt="Resume Script Execution", width="26", height="20" %}. DevTools
executes the script up until the next breakpoint, if any.

{% Img src="image/admin/y1FEPpRKSDR894RM2TFG.svg", alt="Selecting 'Resume script execution'.", width="800", height="610" %}

**Figure 6**. **Resume script execution**, outlined in blue

#### Force script execution {: #force-resume }

To ignore all breakpoints and force your script to resume execution, click and hold **Resume Script
Execution** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ix91vDLx4PdN9W3x8wOa.png", alt="Resume script execution", width="26", height="20" %}
and then select **Force script execution**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4rCLPqjmTkTNXXXBA0GQ.png", alt="Force script execution", width="20", height="21" %}.

{% Img src="image/admin/Bgu0IMoqiDsHm8LbCDjK.png", alt="Selecting 'Force script execution'.", width="800", height="561" %}

**Figure 7**. Selecting **Force script execution**

### Change thread context {: #threads }

When working with web workers or service workers, click on a context listed in the Threads pane to
switch to that context. The blue arrow icon represents which context is currently selected.

{% Img src="image/admin/bJO6eqgFRXeXmGmN3jv3.svg", alt="The Threads pane.", width="800", height="564" %}

**Figure 8**. The Threads pane, outlined in blue

For example, suppose that you're paused on a breakpoint in both your main script and your service
worker script. You want to view the local and global properties for the service worker context, but
the Sources panel is showing the main script context. By clicking on the service worker entry in the
Threads pane, you'd be able to switch to that context.

## View and edit local, closure, and global properties {: #scope }

While paused on a line of code, use the Scope pane to view and edit the values of properties and
variables in the local, closure, and global scopes.

- Double-click a property value to change it.
- Non-enumerable properties are greyed out.

{% Img src="image/admin/E1Pz1oku9apJyINg58N0.svg", alt="The Scope pane.", width="800", height="492" %}

**Figure 9**. The Scope pane, outlined in blue

## View the current call stack {: #call-stack }

While paused on a line of code, use the Call Stack pane to view the call stack that got you to this
point.

If you're working with async code, check the **Async** checkbox to enable async call stacks.

Click on an entry to jump to the line of code where that function was called. The blue arrow icon
represents which function DevTools is currently highlighting.

{% Img src="image/admin/z85EIYxxKzDde3aAEhCP.svg", alt="The Call Stack pane.", width="800", height="492" %}

**Figure 10**. The Call Stack pane, outlined in blue

{% Aside %}

**Note:** When not paused on a line of code, the Call Stack pane is empty.

{% endAside %}

### Restart a frame (function) in a call stack {: #restart-frame }

To observe the behavior of a function and re-run it without having to restart the entire debugging flow, you can restart the execution of a single function when this function is paused. In other words, you can restart the function's frame in the call stack.

To restart a frame:

1. [Pause function execution at a breakpoint](#breakpoints). The **Call Stack** pane records the order of function calls.
1. In the **Call Stack** pane, right-click a function and select **Restart frame** from the drop-down menu.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/h54JUoqTr2AvSNesZQI0.png", alt="Selecting Restart frame from the drop-down menu.", width="800", height="497" %}

   {% Aside %}
   **Note**: You can restart any function frame in the **Call Stack**, except WebAssembly, async, and generator functions.
   {% endAside %}

To understand how **Restart frame** works, consider the following code:

```js
function foo(value) {
    console.log(value);
    bar(value);
}
 
function bar(value) {
    value++;
    console.log(value);
    debugger;
}

foo(0);
```

The `foo()` function takes `0` as an argument, logs it, and calls the `bar()` function. The `bar()` function, in turn, increments the argument.

Try restarting the frames of both functions in the following way:

1. Copy the code above to a [new snippet](/docs/devtools/javascript/snippets/#createsources) and [run it](/docs/devtools/javascript/snippets/#runsources). The execution stops at the `debugger` [line-of-code breakpoint](/docs/devtools/javascript/breakpoints/#debugger).
   {% Aside 'caution' %}
   When the execution is paused, don't programmatically change the order of the call stack frames. This may cause unexpected errors.
   {% endAside %}
1. Notice that the debugger shows you the current value next to function declaration: `value = 1`.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/i3Offlw9RToaew8APV4C.png", alt="The current value next to function declaration.", width="800", height="497" %}
1. Restart the `bar()` frame.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sMDXhnV3Ft02evS0PBQR.png", alt="Restarting the bar() frame.", width="800", height="497" %}
1. Step through the value increment statement by pressing `F9`.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jno28U2OaVMnc2s6xtRZ.png", alt="Incrementing current value.", width="800", height="497" %}
   Notice that the current value increases: `value = 2`.
1. Optionally, in the **Scope** pane, double-click the value to edit it and set the desired value.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bduFchfauez6IjMrXOm3.png", alt="Editing the value in the Scopes pane.", width="800", height="497" %}
1. Try restarting the `bar()` frame several more times. The value continues to increase.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LGHUF27jZmP341zxOLZB.png", alt="Restarting the bar() frame again.", width="800", height="497" %}
   
   {% Aside 'gotchas' %}
   Why is the value not reset to `0`?

   Frame restart doesn't reset the arguments. In other words, the restart doesn't restore the initial state at function call. Instead, it simply moves the execution pointer to the start of the function. 

   Therefore, the current argument value persists in memory across restarts of the same function.
   {% endAside %}

1. Now, restart the `foo()` frame in the **Call Stack**.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Fo5JQWKNVhlXPMDkyh6F.png", alt="Restarting the foo() frame.", width="800", height="497" %}
   Notice that the value is `0` again.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ufMoE3upIrSCQRGMaeLI.png", alt="ALT_TEXT_HERE", width="800", height="497" %}
   {% Aside 'gotchas' %}
   Why is the value reset to `0`?

   In JavaScript, changes to arguments are not visible (reflected) outside the function. Nested functions receive values, not their locations in memory.
   {% endAside %}
1. Resume script execution (`F8`) to complete this tutorial.

### Copy stack trace {: #copy-stack-trace }

Right-click anywhere in the Call Stack pane and select **Copy stack trace** to copy the current call
stack to the clipboard.

{% Img src="image/admin/mGJl4FrGxA9mlztfEFeD.png", alt="Selecting 'Copy Stack Trace'.", width="800", height="556" %}

**Figure 11**. Selecting **Copy Stack Trace**

Below is an example of the output:

```js
getNumber1 (get-started.js:35)
inputsAreEmpty (get-started.js:22)
onClick (get-started.js:15)
```

## Ignore a script or pattern of scripts {: #ignore-list }

Ignore a script to skip it while debugging. When ignored, a script is
obscured in the Call Stack pane, and you never step into the script's functions when you step
through your code.

For example, suppose you're stepping through this code:

```js
function animate() {
  prepare();
  lib.doFancyStuff(); // A
  render();
}
```

`A` is a third-party library that you trust. If you're confident that the problem you're debugging
is not related to the third-party library, then it makes sense to ignore the script.

### Ignore a script from the Editor pane {: #editor-ignore-list }

To ignore a script from the Editor pane:

1.  Open the file.
2.  Right-click anywhere.
3.  Select **Add script to ignore list**.

{% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/q7leDy8D975ZlhtiB3f6.png", alt="Ignoring a script from the Editor pane.", width="800", height="575" %}

**Figure 12**. Ignoring a script from the Editor pane

### Ignore a script from the Call Stack pane {: #call-stack-ignore-list }

To ignore a script from the Call Stack pane:

1.  Right-click on a function from the script.
2.  Select **Add script to ignore list**.

{% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/y2NiIZH9UURpEtXAuVCZ.png", alt="Ignoring a script from the Call Stack pane.", width="800", height="575" %}

**Figure 13**. Ignoring a script from the Call Stack pane

### Ignore a script from Settings {: #settings-ignore-list }

To ignore a single script or pattern of scripts from Settings:

1.  Open [Settings][3].
2.  Go to the **Ignore List** tab.
3.  Click **Add pattern**.
4.  Enter the script name or a regex pattern of script names to ignore.
5.  Click **Add**.

{% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/DFANGZspw5B4IlgO04I6.png", alt="Ignoring a script from Settings.", width="800", height="552" %}

**Figure 14**. Ignoring a script from Settings

## Run snippets of debug code from any page {: #snippets }

If you find yourself running the same debug code in the Console over and over, consider Snippets.
Snippets are executable scripts that you author, store, and run within DevTools.

See [Run Snippets of Code From Any Page][4] to learn more.

## Watch the values of custom JavaScript expressions {: #watch }

Use the Watch pane to watch the values of custom expressions. You can watch any valid JavaScript
expression.

{% Img src="image/admin/PzX7IuS3Hezm4ZQvKD5m.svg", alt="The Watch pane.", width="800", height="492" %}

**Figure 15**. The Watch pane, outlined in blue

- Click **Add Expression**
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/QU6fmfF1UA1ckrB3tklD.png", alt="Add expression", width="20", height="20" %}
  to create a new watch expression.
- Click **Refresh** {% Img src="image/admin/UzPRUGsZGyxITgev7q5K.png", alt="Refresh", width="24", height="24" %} to refresh
  the values of all existing expressions. Values automatically refresh while stepping through code.
- Hover over an expression and click **Delete Expression**
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iWsdoHnowdltMpnOfSJG.png", alt="Delete expression", width="20", height="11" %}
  to delete it.

## Make a minified file readable {: #format }

Click **Format** {% Img src="image/admin/nLnqjfo4vbFLkwAuExCY.png", alt="Format", width="30", height="24" %} to make a minified
file human-readable.

{% Img src="image/admin/cttlkengXdMrdvwjh5S3.svg", alt="The Format button.", width="800", height="609" %}

**Figure 16**. **Format**, outlined in blue

## Edit a script {: #edit }

When fixing a bug, you often want to test out some changes to your JavaScript code. You don't need
to make the changes in an external browser and then reload the page. You can edit your script in
DevTools.

To edit a script:

1.  Open the file in the Editor pane of the Sources panel.
2.  Make your changes in the Editor pane.
3.  Press <kbd>Command</kbd>+<kbd>S</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>S</kbd> (Windows, Linux) to
    save. DevTools patches the entire JS file into Chrome's JavaScript engine.

    {% Img src="image/admin/zOITyiLOZPasp6Zf30Xi.svg", alt="The Editor pane.", width="800", height="564" %}

    **Figure 17**. The Editor pane, outlined in blue

## Search and replace text in a script {: #search }

To search for text in a script:

1.  Open the file in the **Editor** pane of the **Sources** panel.
1. To open a built-in search bar, press <kbd>Command</kbd>+<kbd>F</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>F</kbd> (Windows, Linux).
1. In the bar, enter your query.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2oRnZxCkZal6VxqryNTR.png", alt="Search.", width="800", height="354" %}
    Optionally, you can:
    - Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/egjnpBbgTvj6FDiIbfoc.png", alt="Match case.", width="25", height="20" %} **Match Case** to make your query case-sensitive.
    - Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/97kuRQETaw1jnAfMHrbQ.png", alt="RegEx button.", width="17", height="18" %} **Use Regular Expression** to search using a RegEx expression.
1. Press <kbd>Enter</kbd>. To jump to previous or next search result, press the up or down button.

To replace the text you found:

1. On the search bar, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vm7LAoTC4jArS8SjcMM5.png", alt="Replace.", width="22", height="23" %} **Replace** button.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TWp9T4OsMCuxLPAvWmMo.png", alt="Replace.", width="800", height="342" %}
1. Type the text to replace with, then click **Replace** or **Replace all**.

## Disable JavaScript {: #disable }

See [Disable JavaScript With Chrome DevTools][5].

[1]: /docs/devtools/javascript
[2]: /docs/devtools/javascript/breakpoints
[3]: /docs/devtools/customize/#settings
[4]: /docs/devtools/javascript/snippets
[5]: /docs/devtools/javascript/disable

---
layout: "layouts/doc-post.njk"
title: "Console Utilities API reference"
authors:
  - kaycebasques
  - sofiayem
date: 2015-04-13
updated: 2022-08-25
description: "A reference of convenience functions available in the Chrome DevTools Console."
---

The Console Utilities API contains a collection of convenience functions for performing common
tasks: selecting and inspecting DOM elements, querying objects, displaying data in readable format, stopping and
starting the profiler, monitoring DOM events and function calls, and more.

{% YouTube id='hdRDTj6ObiE' %}

{% Aside 'gotchas' %}
These functions only work when you call them from the Chrome DevTools Console. They
won't work if you try to call them in your scripts.
{% endAside %}

Looking for `console.log()`, `console.error()`, and the rest of the `console.*` functions? See
[Console API Reference][1].

## \$\_ {: #recent }

`$_` returns the value of the most recently evaluated expression.

In the following example, a simple expression (`2 + 2`) is evaluated. The `$_` property is then
evaluated, which contains the same value:

{% Img src="image/admin/TfgjCE7ayHU8lwJJTFss.png", alt="$_ is the most recently evaluated expression.", width="800", height="238" %}

In the next example, the evaluated expression initially contains an array of names. Evaluating
`$_.length` to find the length of the array, the value stored in `$_` changes to become the latest
evaluated expression, 4:

{% Img src="image/admin/d2jU3P5gc4G2OuK4PMQ1.png", alt="$_ changes when new commands are evaluated.", width="800", height="319" %}

## $0 - $4 {: #recent-many }

The `$0`, `$1`, `$2`, `$3` and `$4` commands work as a historical reference to the last five DOM
elements inspected within the **Elements** panel or the last five JavaScript heap objects selected in
the Profiles panel. `$0` returns the most recently selected element or JavaScript object, `$1`
returns the second most recently selected one, and so on.

In the following example, an `img` element is selected in the **Elements** panel. In the **Console** drawer,
`$0` has been evaluated and displays the same element:

{% Img src="image/admin/v9jdOozAkvhutIYnejJl.png", alt="Example of $0.", width="800", height="186" %}

The image below shows a different element selected in the same page. The `$0` now refers to newly
selected element, while `$1` returns the previously selected one:

{% Img src="image/admin/ET1JJFtUIXvaoPCGQ94C.png", alt="Example of $1.", width="800", height="318" %}

## \$(selector \[, startNode\]) {: #querySelector-function }

`$(selector)` returns the reference to the first DOM element with the specified CSS selector. When
called with one argument, this function is a shortcut for the [document.querySelector()][2] function.

The following example returns a reference to the first `<img>` element in the document:

{% Img src="image/admin/poVWF9iRLAYZ08O2t88S.png", alt="Example of $('img').", width="800", height="234" %}

Right-click on the returned result and select **Reveal in Elements Panel** to find it in the DOM, or
**Scroll in to View** to show it on the page.

The following example returns a reference to the currently selected element and displays its `src`
property:

{% Img src="image/admin/TLcKoLAXcrFcOgSPnNaD.png", alt="Example of $('img').src.", width="800", height="234" %}

This function also supports a second parameter, `startNode`, that specifies an 'element' or Node from
which to search for elements. The default value of this parameter is `document`.

The following example returns a reference to the first `img` element that is a descendant of `devsite-header-background`, and
displays its `src` property:

{% Img src="image/admin/Q5XlmeIMaHQkpP1QryBd.png", alt="Example of $('img', div).src.", width="800", height="234" %}

{% Aside %}

**Note:** If you are using a library such as jQuery that uses `$`, this functionality will be
overwritten, and `$` will correspond to that library's implementation.

{% endAside %}

## \$\$(selector \[, startNode\]) {: #querySelectorAll-function }

`$$(selector)` returns an array of elements that match the given CSS selector. This command is
equivalent to calling <code>Array.from([document.querySelectorAll()][3])</code>.

The following example uses `$$()` to create an array of all `<img>` elements in the current document
and displays the value of each element's `src` property:

```js
let images = $$('img');
for (let each of images) {
  console.log(each.src);
}
```

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/f3W2BdYq3PAl435AMXso.png", alt="Example of using $$() to select all images in the document and display their sources.", width="800", height="536" %}

This function also supports a second parameter, `startNode`, that specifies an element or Node from
which to search for elements. The default value of this parameter is `document`.

This modified version of the previous example uses `$$()` to create an array of all `<img>` elements
that appear in the current document after the selected Node:

```js
let images = $$('img', document.querySelector('.devsite-header-background'));
for (let each of images) {
  console.log(each.src);
}
```

{% Img src="image/admin/MKKFwNfiqaq8JPUkgchF.png", alt="Example of using $() to select all images appearing after the select div element in the document and displaying their sources.", width="800", height="336" %}

{% Aside %}

**Note:** Press <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Enter</kbd> in the console to start
a new line without executing the script.

{% endAside %}

## \$x(path \[, startNode\]) {: #xpath-function }

`$x(path)` returns an array of DOM elements that match the given XPath expression.

For example, the following returns all the `<p>` elements on the page:

```js
$x("//p")
```

{% Img src="image/admin/8fIwlT9ZWd9109E9jyRb.png", alt="Example of using an XPath selector.", width="800", height="282" %}

The following example returns all the `<p>` elements that contain `<a>` elements:

```js
$x("//p[a]")
```

{% Img src="image/admin/qvqloRRfS4IU1WhDsJkP.png", alt="Example of using a more complicated XPath selector.", width="800", height="251" %}

Similar to the other selector functions, `$x(path)` has an optional second parameter, `startNode`,
that specifies an element or Node from which to search for elements.

{% Img src="image/admin/srYQFy4Y7TRlT0kGarUN.png", alt="Example of using an XPath selector with startNode.", width="800", height="282" %}

## clear() {: #clear-function }

`clear()` clears the console of its history.

```js
clear();
```

## copy(object) {: #copy-function }

`copy(object)` copies a string representation of the specified object to the clipboard.

```js
copy($0);
```

## debug(function) {: #debug-function }

When the specified function is called, the debugger is invoked and breaks inside the function on the
**Sources** panel allowing to step through the code and debug it.

```js
debug(getData);
```

{% Img src="image/admin/dhPBjuzWvsEbHeGR5NpQ.png", alt="Breaking inside a function with debug().", width="800", height="526" %}

Use `undebug(fn)` to stop breaking on the function, or use the UI to disable all breakpoints.

For more information on breakpoints, see [Pause Your Code With Breakpoints][4].

## dir(object) {: #dir-function }

`dir(object)` displays an object-style listing of all the specified object's properties. This method
is a shortcut for the Console API's `console.dir()` method.

The following example shows the difference between evaluating `document.body` directly in the
command line, and using `dir()` to display the same element:

```js
document.body;
dir(document.body);
```

{% Img src="image/admin/SBW2kszkhG1rlXfxtQDg.png", alt="Logging document.body with and without dir() function.", width="800", height="590" %}

For more information, see the [`console.dir()`][console-dir] entry in the Console API.

## dirxml(object) {: #dirxml-function }

`dirxml(object)` prints an XML representation of the specified object, as seen in the **Elements** panel.
This method is equivalent to the [`console.dirxml()`][console-dirxml] method.

## inspect(object/function) {: #inspect-function }

`inspect(object/function)` opens and selects the specified element or object in the appropriate
panel: either the **Elements** panel for DOM elements or the Profiles panel for JavaScript heap objects.

The following example opens the `document.body` in the **Elements** panel:

```js
inspect(document.body);
```

{% Img src="image/admin/BDFR3iEMqRnWIWrrVEu6.png", alt="Inspecting an element with inspect().", width="800", height="337" %}

When passing a function to inspect, the function opens the document up in the **Sources** panel for you
to inspect.

## getEventListeners(object) {: #getEventListeners-function }

`getEventListeners(object)` returns the event listeners registered on the specified object. The
return value is an object that contains an array for each registered event type (`click` or
`keydown`, for example). The members of each array are objects that describe the listener registered
for each type. For example, the following lists all the event listeners registered on the document
object:

```js
getEventListeners(document);
```

{% Img src="image/admin/pVhvAi37yxLejbODHGSZ.png", alt="Output of using getEventListeners().", width="800", height="255" %}

If more than one listener is registered on the specified object, then the array contains a member
for each listener. In the following example, there are two event listeners registered on the
document element for the `click` event:

{% Img src="image/admin/Hlh3CErBYJTTNg9butfj.png", alt="Multiple listeners.", width="800", height="389" %}

You can further expand each of these objects to explore their properties:

{% Img src="image/admin/EJnoDfrKGIhwz7cx0WE3.png", alt="Expanded view of listener object.", width="800", height="389" %}

For more information, see [Inspect object properties](/docs/devtools/console/reference/#inspect-object-properties).

## keys(object) {: #keys-function }

`keys(object)` returns an array containing the names of the properties belonging to the specified
object. To get the associated values of the same properties, use [`values()`](#values-function).

For example, suppose your application defined the following object:

```js
let player = {
    "name": "Parzival",
    "number": 1,
    "state": "ready",
    "easterEggs": 3
};
```

Assuming `player` was defined in the global namespace (for simplicity), typing `keys(player)` and
`values(player)` in the **Console** results in the following:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5EH5ygkcU1pnDf2nIqdS.png", alt="Example of keys() and values() methods.", width="800", height="568" %}

## monitor(function) {: #monitor-function }

When the function specified is called, a message is logged to the console that indicates the
function name along with the arguments that are passed to the function when it was called.

```js
function sum(x, y) {
  return x + y;
}
monitor(sum);
```

{% Img src="image/admin/V28TFRjUqryt2u3b2zls.png", alt="Example of monitor() method.", width="800", height="221" %}

Use [`unmonitor(function)`](#unmonitor-function) to stop monitoring.

## monitorEvents(object \[, events\]) {: #monitorEvents-function }

When one of the specified events occurs on the specified object, the Event object is logged to the
console. You can specify a single event to monitor, an array of events, or one of the generic events
"types" mapped to a predefined collection of events. See examples below.

The following monitors all resize events on the window object.

```js
monitorEvents(window, "resize");
```

{% Img src="image/admin/ZrU8M58cKhN2eZRpiNVI.png", alt="Monitoring window resize events.", width="800", height="252" %}

The following defines an array to monitor both "resize" and "scroll" events on the window object:

```js
monitorEvents(window, ["resize", "scroll"])
```

You can also specify one of the available event "types", strings that map to predefined sets of
events. The table below lists the available event types and their associated event mappings:

<table class="responsive"><thead><tr><th colspan="2">Event type &amp; Corresponding mapped events</th></tr></thead><tbody><tr><td>mouse</td><td>"mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"</td></tr><tr><td>key</td><td>"keydown", "keyup", "keypress", "textInput"</td></tr><tr><td>touch</td><td>"touchstart", "touchmove", "touchend", "touchcancel"</td></tr><tr><td>control</td><td>"resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"</td></tr></tbody></table>

For example, the following uses the "key" event type all corresponding key events on an input text
field currently selected in the **Elements** panel.

```js
monitorEvents($0, "key");
```

Below is sample output after typing a characters in the text field:

{% Img src="image/admin/Shs04IRgNP87cbbjCbtd.png", alt="Monitoring key events.", width="800", height="252" %}

Use [`unmonitorEvents(object[, events])`](#unmonitorEvents-function) to stop monitoring.

## profile(\[name\]) and profileEnd(\[name\]) {: #profile-function }

`profile()` starts a JavaScript CPU profiling session with an optional name. `profileEnd()`
completes the profile and displays the results in the **Performance** > **Main** track.

{% Aside %}
**Note**: The `profile()` and `profileEnd()` are the shorthands for [`console.profile()`](https://developer.mozilla.org/docs/Web/API/console/profile) and [`console.profileEnd()`](https://developer.mozilla.org/docs/Web/API/console/profileEnd).
{% endAside %}

To start profiling:

```js
profile("Profile 1")
```

To stop profiling and see the results in the **Performance** > **Main** track:

```js
profileEnd("Profile 1")
```

Result in the **Performance** > **Main** track:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GAFSVu5lUoZVlumrcmHl.png", alt="Profile 1 in the Performance > Main track.", width="800", height="606" %}

Profiles can also be nested. For example, this will work in any order:

```js
profile('A');
profile('B');
profileEnd('A');
profileEnd('B');
```

{% Aside %}

**Note:** Multiple CPU profiles can operate at once and you aren't required to close them out in
creation order.

{% endAside %}

## queryObjects(Constructor) {: #queryObjects-function }

Call `queryObjects(Constructor)` from the console to return an array of objects that were created
with the specified constructor. For example:

- `queryObjects(Promise)`. Returns all instances of `Promise`.
- `queryObjects(HTMLElement)`. Returns all HTML elements.
- `queryObjects(foo)`, where `foo` is a class name. Returns all objects that were instantiated
  via `new foo()`.

The scope of `queryObjects()` is the currently-selected execution context in the console.

## table(data \[, columns\]) {: #table-function }

Log object data with table formatting by passing in a data object in with optional column headings.
This is a shortcut for [`console.table()`](/docs/devtools/console/api/#table).

For example, to display a list of names using a table in the console, you would do:

```js
let names = [
  { firstName: "John", lastName: "Smith" },
  { firstName: "Jane", lastName: "Doe" },
];
table(names);
```

{% Img src="image/admin/jI1NQZJs08FsKA6nMyIp.png", alt="Example of table() method.", width="800", height="488" %}

## undebug(function) {: #undebug-function }

`undebug(function)` stops the debugging of the specified function so that when the function is
called, the debugger is no longer invoked. This is used in concert with `debug(fn)`.

```js
undebug(getData);
```

## unmonitor(function) {: #unmonitor-function }

`unmonitor(function)` stops the monitoring of the specified function. This is used in concert with
`monitor(fn)`.

```js
unmonitor(getData);
```

## unmonitorEvents(object \[, events\]) {: #unmonitorEvents-function }

`unmonitorEvents(object[, events])` stops monitoring events for the specified object and events. For
example, the following stops all event monitoring on the window object:

```js
unmonitorEvents(window);
```

You can also selectively stop monitoring specific events on an object. For example, the following
code starts monitoring all mouse events on the currently selected element, and then stops monitoring
"mousemove" events (perhaps to reduce noise in the console output):

```js
monitorEvents($0, "mouse");
unmonitorEvents($0, "mousemove");
```

## values(object) {: #values-function }

`values(object)` returns an array containing the values of all properties belonging to the specified
object.

```js
let player = {
    "name": "Parzival",
    "number": 1,
    "state": "ready",
    "easterEggs": 3
};

values(player);
```

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5EH5ygkcU1pnDf2nIqdS.png", alt="Result of values(player).", width="800", height="568" %}

[1]: /docs/devtools/console/api
[2]: https://developer.mozilla.org/docs/Web/API/Document/querySelector
[3]: https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll
[4]: /docs/devtools/javascript/breakpoints
[console-dir]: /docs/devtools/console/api/#dir
[console-dirxml]: /docs/devtools/console/api/#dirxml
[7]: /docs/devtools/rendering-tools/js-execution

---
layout: "layouts/doc-post.njk"
title: "Console features reference"
authors:
  - kaycebasques
  - sofiayem
date: 2019-04-18
updated: 2022-09-22
description:
  "A comprehensive reference on every feature and behavior related to the Console UI in Chrome
  DevTools."
---

This page is a reference of features related to the Chrome DevTools Console. It assumes that you're
already familiar with using the Console to view logged messages and run JavaScript. If not, see [Get
Started][1].

If you're looking for the API reference on functions like `console.log()` see [Console API
Reference][2]. For the reference on functions like `monitorEvents()` see [Console Utilities API
Reference][3].

## Open the Console {: #open }

You can open the Console as a [panel][4] or as a [tab in the Drawer][5].

### Open the Console panel {: #panel }

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> or
<kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac).

{% Img src="image/admin/yA07vZPXixZWv2jHdE6W.png", alt="The Console.", width="800", height="493" %}

To open the Console from the [Command Menu][6], start typing `Console` and then run the **Show
Console** command that has the **Panel** badge next to it.

{% Img src="image/admin/QXom109Oiui7fgVBj38Y.png", alt="The command for showing the Console panel.", width="800", height="413" %}

### Open the Console in the Drawer {: #drawer }

Press <kbd>Escape</kbd> or click **Customize And Control DevTools**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Customize And Controls DevTools.", width="24", height="24" %} and then
select **Show Console Drawer**.

{% Img src="image/admin/KJTO8aoQihf8hrpNdhvD.png", alt="Show Console Drawer.", width="800", height="501" %}

The Drawer pops up at the bottom of your DevTools window, with the **Console** tab open.

{% Img src="image/admin/anf99vgXPq5x3KV21nX0.png", alt="The Console tab in the Drawer.", width="800", height="568" %}

To open the Console tab from the [Command Menu][7], start typing `Console` and then run the **Show
Console** command that has the **Drawer** badge next to it.

{% Img src="image/admin/Zo8atFvEFrTm619HsdRU.png", alt="The command for showing the Console tab in the Drawer.", width="800", height="413" %}

### Open Console Settings {: #settings }

Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Console Settings** in the top-right corner of the **Console**.

{% Aside 'gotchas' %}
Not to be confused with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **DevTools Settings** above and next to the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="22", height="22" %} three-dot menu.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3TK0o3niI3ZMeqMpjU5X.png", alt="Console Settings.", width="800", height="495" %}

The links below explain each setting:

- [**Hide network**][8]
- [**Preserve log**][9]
- [**Selected context only**][10]
- [**Group similar messages in console**][11]
- [**Show CORS errors in console**][48]
- [**Log XMLHttpRequests**][12]
- [**Eager evaluation**][13]
- [**Autocomplete from history**][14]

### Open the Console Sidebar {: #sidebar }

Click **Show Console Sidebar**
{% Img src="image/admin/JWC9AxhF6aRjxKLTIfEv.png", alt="Show Console Sidebar.", width="30", height="26" %} to show
the Sidebar, which is useful for filtering.

{% Img src="image/admin/SgCPLaYCtxNBclGXHz0Q.png", alt="Console Sidebar.", width="800", height="530" %}

## View messages {: #view }

This section contains features that change how messages are presented in the Console. See [View
messages][15] for a hands-on walkthrough.

### Disable message grouping {: #group }

[Open Console Settings][16] and disable **Group similar** to disable the Console's default message
grouping behavior. See [Log XHR and Fetch requests][17] for an example.

### View messages from breakpoints {: #view-breakpoints }

The **Console** marks messages triggered by breakpoints in the following way:

- `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?`
- [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) messages with pink two dots `..`

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/aii8m7RVxpX6DhSCxpb7.png", alt="The Console marks messages created by conditional breakpoints and logpoints.", width="800", height="710" %}

To jump to the [inline breakpoint editor](/docs/devtools/javascript/breakpoints/#edit-breakpoints) in the **Sources** panel, click the anchor link next to the breakpoint message.

### View stack traces {: #view-stack-traces }

The **Console** automatically captures stack traces for errors and warnings. A stack trace is a history of function calls (frames) that led to the error or warning. The **Console** shows them in reverse order: the latest frame is at the top.

To view a stack trace, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MaSHbLXzcTFbxhx9K8hX.svg", alt="Expand.", width="24", height="24" %} expand icon next to an error or warning.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TINzuAQUw7Ug3g2pOljm.png", alt="Stack traces.", width="800", height="401" %}

#### View async stack traces {: #async-stack-traces }

If supported by the framework you are using or when directly using browser scheduling primitives, such as `setTimeout`, DevTools can trace async operations by linking both parts of the async code together.

In this case, the stack trace shows the "full story" of the async operation.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hyeBPwNtQQ933gjh7Sp7.png", alt="Async stack trace.", width="800", height="861" %}

{% Aside 'gotchas' %}
DevTools implements this "Async Stack Tagging" feature based on the `console.createTask()` API method.

DevTools encourages frameworks and abstractions to use this API. For example, [Angular supports this feature](/blog/devtools-better-angular-debugging/#the-async-stack-tagging-api-in-angular).
{% endAside %}

#### Show known third-party frames in stack traces {: #show-third-party }

When source maps include the `x_google_ignoreList` field, by default, the **Console** hides from stack traces the third-party frames from sources generated by bundlers (for example, webpack) or frameworks (for example, Angular).

To view the full stack trace including third-party frames, click **Show N more frames** at the bottom of the stack trace.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2TdZnml7JZ7JZ9aRLs7P.png", alt="Show N more frames.", width="800", height="446" %}

To always view the full stack trace, disable the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Ignore List** > **Automatically add known third-party scripts to ignore list** setting.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4aIHYQjq5gxgrPF9MbkD.png", alt="Automatically add known third-party scripts to ignore list.", width="800", height="496" %}

### Log XHR and Fetch requests {: #xhr }

[Open Console Settings][18] and enable **Log XMLHttpRequests** to log all `XMLHttpRequest` and
`Fetch` requests to the Console as they happen.

{% Img src="image/admin/t9sLCbiL3KrQW9MdLZoV.png", alt="Logging XMLHttpRequest and Fetch requests.", width="800", height="490" %}

The top message in the example above shows the Console's default grouping behavior. The example below shows
how the same log looks after [disabling message grouping][19].

{% Img src="image/admin/5uz4gBdOGdW2RO58Wkui.png", alt="How the logged XMLHttpRequest and Fetch requests look after ungrouping.", width="800", height="589" %}

### Persist messages across page loads {: #persist }

By default the Console clears whenever you load a new page. To persist messages across page loads,
[Open Console Settings][20] and then enable the **Preserve Log** checkbox.

### Hide network messages {: #network }

By default the browser logs network messages to the **Console**. For example, the top message in
the following example represents a 404.

{% Img src="image/admin/rlMckNNbRXvT4xln5jTQ.png", alt="A 404 message in the Console.", width="800", height="497" %}

To hide network messages:

1.  [Open Console Settings][21].
2.  Enable the **Hide Network** checkbox.

### Show or hide CORS errors {: #cors-errors }

The **Console** can show [CORS errors](https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors) if network requests fail due to [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS).

To show or hide CORS errors:

1.  [Open Console Settings][21].
2.  Check or clear the **Show CORS errors in the console** checkbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UHUIHBUpRRHHeRrp7oIX.png", alt="Show CORS errors in the console.", width="800", height="543" %}

If the console is set to show CORS errors and you encounter them, you can click the following buttons next to errors:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/A3O2e55NMBoRtTwDGqml.png", alt="Network and Issues buttons.", width="800", height="553" %}

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4Ff7QbpSsyddZ9FDPmZw.png", alt="Network.", width="22", height="22" %} to open the request with a CORS-related `TypeError` in the **Network** panel.
- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TDnjxpWHnj9MOmmmVpos.png", alt="Issues.", width="22", height="23" %} to get a [potential solution on the **Issues** tab](/docs/devtools/issues/#view-issues).

## Filter messages {: #filter }

There are many ways to filter out messages in the Console.

### Filter out browser messages {: #browser }

[Open the Console Sidebar][22] and click **User Messages** to only show messages that came from the
page's JavaScript.

{% Img src="image/admin/mYDvN18HyYlZszVGzp1F.png", alt="Viewing user messages.", width="800", height="588" %}

### Filter by log level {: #level }

DevTools assigns most of `console.*` methods severity levels.

There are four levels:

- `Verbose`
- `Info`
- `Warning`
- `Error`

For example, `console.log()` is in the `Info` group, whereas
`console.error()` is in the `Error` group.  The [Console API Reference][23] describes the severity
level of each applicable method.

Every message that the browser logs to the Console has a severity
level too. You can hide any level of messages that you're not interested in. For example, if you're
only interested in `Error` messages, you can hide the other 3 groups.

Click the **Log Levels** drop-down to enable or disable `Verbose`, `Info`, `Warning` or `Error`
messages.

{% Img src="image/admin/PX52vbEI6gTFqSmTZNVB.png", alt="The Log Levels drop-down.", width="800", height="529" %}

You can also filter by log level by {% Img src="image/admin/JWC9AxhF6aRjxKLTIfEv.png", alt="Show Console Sidebar.", width="30", height="26" %}  [opening the Console Sidebar][24] and then clicking **Errors**,
**Warnings**, **Info**, or **Verbose**.

{% Img src="image/admin/osvdtWq0DGX1yjkFDGLZ.png", alt="Using the Sidebar to view warnings.", width="800", height="588" %}

### Filter messages by URL {: #url }

Type `url:` followed by a URL to only view messages that came from that URL. After you type `url:`
DevTools shows all relevant URLs.

{% Img src="image/admin/VEumwMRJ7kuQDV3JFtQk.png", alt="A URL filter.", width="800", height="514" %}

Domains also work. For example, if `https://example.com/a.js` and
`https://example.com/b.js` are logging messages, `url:https://example.com` enables you to focus on
the messages from these 2 scripts.

To hide all messages from a specified URL, type `-url:`  followed by the URL, for example, `https://b.wal.co`. This is a negative URL filter.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hyalP82Gj2k0Op3gkfEH.png", alt="A negative URL filter. DevTools is hiding all messages that match the specified URL.", width="800", height="447" %}

You can also show messages from a single URL by [opening the Console Sidebar][25], expanding the
**User Messages** section, and then clicking the URL of the script containing the messages you want
to focus on.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cW0559gsIaUJ1HwTLivi.png", alt="Viewing the messages from a specific script.", width="800", height="435" %}

### Filter out messages from different contexts {: #filtercontext }

Suppose that you've got an ad on your page. The ad is embedded in an `<iframe>` and is generating a
lot of messages in your Console. Because this ad is in a different [JavaScript context][26], one way
to hide its messages is to [open Console Settings][27] and enable the **Selected Context Only**
checkbox.

### Filter out messages that don't match a regular expression pattern {: #regex }

Type a regular expression such as `/[foo]\s[bar]/` in the **Filter** text box to filter out any
messages that don't match that pattern. Spaces are not supported, use `\s` instead. DevTools checks if the pattern is found in the message text
or the script that caused the message to be logged.

For example, the following filters out all messages that don't match `/[gm][ta][mi]/`.

{% Img src="image/admin/1FvJQi69s6J7nHtKUIDy.png", alt="Filtering out any messages that don't match /[gm][ta][mi]/.", width="800", height="512" %}

## Search for text in logs {: #search }

To search for text in log messages:

1. To open a built-in search bar, press <kbd>Command</kbd>+<kbd>F</kbd> (Mac) or <kbd>Ctrl</kbd>+<kbd>F</kbd> (Windows, Linux).
1. In the bar, type your query. In this example the query is `legacy`.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/rLEzbmZU3zU3rE3OWNli.png", alt="Typing a query.", width="800", height="426" %}
    Optionally, you can:
    - Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/egjnpBbgTvj6FDiIbfoc.png", alt="Match case.", width="25", height="20" %} **Match Case** to make your query case-sensitive.
    - Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/97kuRQETaw1jnAfMHrbQ.png", alt="RegEx button.", width="17", height="18" %} **Use Regular Expression** to search using a RegEx expression.
1. Press <kbd>Enter</kbd>. To jump to previous or next search result, press the up or down button.

## Run JavaScript {: #js }

This section contains features related to running JavaScript in the Console. See [Run
JavaScript][28] for a hands-on walkthrough.

### String copy options {: #string-copy-options }

The console outputs strings as valid JavaScript literals by default. Right-click an output and choose between three copy options:

* **Copy as JavaScript literal**. Escapes appropriate special characters and wraps the string in either single quotes, double quotes,
  or backticks depending on the content.
* **Copy string contents**. Copies the exact raw string to the clipboard, including new lines and other special characters.
* **Copy as JSON literal**. Formats the string to valid JSON.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PSEzB4mBuTWeVebHZr5p.png", alt="The copy options.", width="800", height="398" %}

### Re-run expressions from history {: #history }

Press the <kbd>Up Arrow</kbd> key to cycle through the history of JavaScript expressions that you
ran earlier in the Console. Press <kbd>Enter</kbd> to run that expression again.

### Watch an expression's value in real-time with Live Expressions {: #live }

If you find yourself typing the same JavaScript expression in the Console repeatedly, you might find
it easier to create a **Live Expression**. With **Live Expressions**, you type an expression once and
then pin it to the top of your Console. The value of the expression updates in near real-time. See
[Watch JavaScript Expression Values In Real-Time With Live Expressions][29].

### Disable Eager Evaluation {: #eagereval }

As you type JavaScript expressions in the Console, **Eager Evaluation** shows a preview of that
expression's return value. [Open Console Settings][30] and disable the **Eager Evaluation** checkbox
to turn off the return value previews.

### Trigger user activation with evaluation {: #trigger-user-activation }

[User activation](/blog/user-activation/) is the state of a browsing session that depends on user actions. An "active" state means the user is currently interacting with the page or has interacted since page load.

To trigger user activation with any evaluation, [open Console Settings][31] and
check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Evaluate triggers user activation**.

### Disable autocomplete from history {: #autocomplete }

As you type out an expression, the Console's autocomplete popup shows expressions that you ran
earlier. These expressions are prepended with the `>` character. In the following example, DevTools earlier evaluated `document.querySelector('a')` and `document.querySelector('img')`.

{% Img src="image/admin/7HsvmvxxZifd5ZqkP4Hg.png", alt="The autocomplete popup showing expressions from history.", width="800", height="512" %}

[Open Console Settings][31] and
disable the **Autocomplete From History** checkbox to stop showing expressions from your history.

### Select JavaScript context {: #context }

By default the **JavaScript Context** drop-down is set to **top**, which represents the main
document's [browsing context][32].

{% Img src="image/admin/V87tEcP23yWQwPhRlSsR.png", alt="The JavaScript Context drop-down.", width="800", height="512" %}

Suppose you have an ad on your page embedded in an `<iframe>`. You want to run JavaScript in order
to tweak the ad's DOM. To do this, you first need to select the ad's browsing context from the
**JavaScript Context** drop-down.

{% Img src="image/admin/Vl95VEu6LEV6X2cpgyAv.png", alt="Selecting a different JavaScript context.", width="800", height="650" %}

## Inspect object properties {: #inspect-object-properties }

The **Console** can display an interactive list of properties of a JavaScript object you specify.

To browse the list, type the object name into the **Console** and press <kbd>Enter</kbd>.

To inspect the properties of DOM objects, follow the steps in [View the properties of DOM objects](/docs/devtools/dom/properties/).

### Spot own and inherited properties {: #own-properties }

The **Console** sorts own object properties first and highlights them in bold font.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2F9FCRzbXchmgxgeNCjb.png", alt="Displaying object properties.", width="800", height="375" %}

Properties inherited from the prototype chain are in regular font. The **Console** displays them on the object itself by evaluating the corresponding native accessors of built-in objects.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9mBq20PzTJfmsj9PWoXN.png", alt="Displaying inherited properties.", width="800", height="681" %}

### Evaluate custom accessors {: #evaluate-custom-accessors }

By default, DevTools doesn't evaluate accessors you create.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JhB3574SgvRaQ0ybhhkx.png", alt="Custom accessor.", width="800", height="506" %}
To evaluate a custom accessor on an object, click `(...)`.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Bzbdz122FdsNFjz3ajpe.png", alt="Evaluated custom accessor.", width="800", height="382" %}

### Spot enumerable and non-enumerable properties {: #enumerable-properties }

Enumerable properties are bright in color. Non-enumerable properties are muted.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qNr0GSzHF1sAV3hjyqb7.png", alt="Enumerable and non-enumerable properties.", width="800", height="361" %}
Enumerable properties can be iterated over with the `for … in` loop or `Object.keys()` method.

### Spot private properties of class instances {: #private-properties }

The **Console** designates private properties of class instances with a `#` prefix.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sAotDs0veLSGWr6J4ZRG.png", alt="Private property of a class instance.", width="800", height="514" %}

### Inspect internal JavaScript properties {: #inspect-internal-properties }

Borrowing the [ECMAScript notation](https://tc39.es/ecma262/#sec-object-internal-methods-and-internal-slots), the **Console** encloses some properties internal to JavaScript in double square brackets. You can't interact with such properties in your code. However, it might be useful to inspect them.

You might see the following internal properties on different objects:

- Any object has a `[[Prototype]]`.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UiiwMcouRB8PZasbiKhG.png", alt="Object prototype.", width="800", height="667" %}
- Primitive wrappers have a `[[PrimitiveValue]]` property.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jbmea0tvK85vSdwg3ZDV.png", alt="Primitive values.", width="800", height="553" %}
- [`ArrayBuffer` objects][47] have the following properties:
   - [`[[Int8Array]]`, `[[Uint8Array]]`, `[[Int16Array]]`, `[[Int32Array]]`][40]
   - [`[[ArrayBufferByteLength]]`, `[[ArrayBufferData]]`][41]
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Lm75hKTWdO2tJfnbLVEY.png", alt="ArrayBuffer and view objects.", width="800", height="735" %}
   {% Aside 'gotchas' %}
   To [inspect a JavaScripts ArrayBuffer](/docs/devtools/memory-inspector/) that a view object refers to, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/owgvsrFODHWRRAhbIwfT.svg", alt="Memory icon.", width="20", height="20" %} button.
   {% endAside %}
- In addition to `ArrayBuffer`-specific properties, `WebAssembly.Memory` objects have a `[[WebAssemblyMemory]]` property.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DKbH651INnLPj4IZhhbp.png", alt="WebAssemblyMemory object.", width="800", height="562" %}
- [Keyed collections](https://tc39.es/ecma262/#sec-keyed-collections) (maps and sets) have an `[[Entries]]` property that contains their keyed entries.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/PBHT8RBNIVA6iWrBQCz9.png", alt="Keyed collections.", width="800", height="637" %}
- [`Promise` objects][46] have the following properties:
   - [`[[PromiseState]]`][43]: pending, fulfilled, or rejected
   - [`[[PromiseResult]]`][43]: `undefined` if pending, `<value>` if fulfilled, `<reason>` if rejected
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UzW9neGj5VpHaisjkkRb.png", alt="Promise object.", width="800", height="461" %}
- [`Proxy` objects][42] have the following properties: `[[Handler]]` object, `[[Target]]` object, and `[[isRevoked]]` (switched off or not).
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/t0kVs0acn6n7T53eZHHF.png", alt="Proxy object.", width="800", height="542" %}

### Inspect functions {: #inspect-functions }

In JavaScript, functions are also objects with properties. However, if you type a function name into the **Console**, DevTools calls it instead of displaying its properties.

To view function properties internal to JavaScript, use the [console.dir()](/docs/devtools/console/api/#dir) command.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/skX6B0t9ht7jNvem6YZ6.png", alt="Inspecting properties of a function.", width="800", height="613" %}

Functions have the following properties:

- `[[FunctionLocation]]`. A link to the line with the function definition in a source file.
- `[[Scopes]]`. Lists values and expressions the function has access to. To inspect function scopes during debugging, see [View and edit local, closure, and global properties](/docs/devtools/javascript/reference/#scope).
- [Bound functions][44] have the following properties:
   - `[[TargetFunction]]`. The target of `bind()`.
   - `[[BoundThis]]`. The value of `this`.
   - `[[BoundArgs]]`. An array of function arguments.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wIj0KSmY1J3ONQQ023Uw.png", alt="Bound function.", width="800", height="663" %}
- [Generator functions][45] are marked with a `[[IsGenerator]]: true` property.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CFTVrDADzeA5oW3u3n2s.png", alt="Generator function.", width="800", height="568" %}
- Generators return iterator objects and they have following properties:
   - `[[GeneratorLocation]]`. A link to a line with the generator definition in a source file.
   - `[[GeneratorState]]`: `suspended`, `closed`, or `running.`
   - `[[GeneratorFunction]]`. The generator that returned the object.
   - `[[GeneratorReceiver]]`. An object that receives the value.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/aRZ69G9V4cEXeDFK0ia8.png", alt="Iterator object.", width="800", height="532" %}

## Clear the Console {: #clear }

You can use any of the following workflows to clear the Console:

- Click **Clear Console**
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Nh5W7S7oEdlTcjarzxKC.svg", alt="Clear.", width="20", height="20" %}.
- Right-click a message and then select **Clear Console**.
- Type `clear()` in the Console and then press <kbd>Enter</kbd>.
- Call `console.clear()` from your webpage's JavaScript.
- Press <kbd>Control</kbd>+<kbd>L</kbd> while the Console is in focus.

[1]: /docs/devtools/console/
[2]: /docs/devtools/console/api
[3]: /docs/devtools/console/utilities
[4]: #panel
[5]: #drawer
[6]: /docs/devtools/command-menu
[7]: /docs/devtools/command-menu
[8]: #network
[9]: #persist
[10]: #filtercontext
[11]: #group
[12]: #xhr
[13]: #eagereval
[14]: #autocomplete
[15]: /docs/devtools/console/#view
[16]: #settings
[17]: #xhr
[18]: #settings
[19]: #group
[20]: #settings
[21]: #settings
[22]: #sidebar
[23]: /docs/devtools/console/api
[24]: #sidebar
[25]: #sidebar
[26]: #context
[27]: #settings
[28]: /docs/devtools/console/#javascript
[29]: /docs/devtools/console/live-expressions
[30]: #settings
[31]: #settings
[32]: https://developer.mozilla.org/docs/Glossary/Browsing_context
[40]: https://tc39.es/ecma262/#table-the-typedarray-constructors
[41]: https://tc39.es/ecma262/#sec-properties-of-the-arraybuffer-instances
[42]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[43]: https://tc39.es/ecma262/#sec-properties-of-the-promise-prototype-object
[44]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_objects/Function/bind
[45]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*
[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
[47]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
[48]: #cors-errors

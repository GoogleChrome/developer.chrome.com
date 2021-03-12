---
layout: "layouts/doc-post.njk"
title: "Console features reference"
authors:
  - kaycebasques
date: 2019-04-18
#updated: YYYY-MM-DD
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

{% Img src="image/admin/yA07vZPXixZWv2jHdE6W.png", alt="The Console panel.", width="800", height="493" %}

**Figure 1**. The Console panel.

To open the Console panel from the [Command Menu][6], start typing `Console` and then run the **Show
Console** command that has the **Panel** badge next to it.

{% Img src="image/admin/QXom109Oiui7fgVBj38Y.png", alt="The command for showing the Console panel.", width="800", height="413" %}

**Figure 2**. The command for showing the Console panel.

### Open the Console tab in the Drawer {: #drawer }

Press <kbd>Escape</kbd> or click **Customize And Control DevTools**
{% Img src="image/admin/Pw9x0BpjZoeW2Wb5nmTH.png", alt="Customize And Controls DevTools", width="6", height="26" %} and then
select **Show Console Drawer**.

{% Img src="image/admin/KJTO8aoQihf8hrpNdhvD.png", alt="Show Console Drawer.", width="800", height="501" %}

**Figure 3**. Show Console Drawer.

The Drawer pops up at the bottom of your DevTools window, with the **Console** tab open.

{% Img src="image/admin/anf99vgXPq5x3KV21nX0.png", alt="The Console tab in the Drawer.", width="800", height="568" %}

**Figure 4**. The Console tab in the Drawer.

To open the Console tab from the [Command Menu][7], start typing `Console` and then run the **Show
Console** command that has the **Drawer** badge next to it.

{% Img src="image/admin/Zo8atFvEFrTm619HsdRU.png", alt="The command for showing the Console tab in the Drawer.", width="800", height="413" %}

**Figure 5**. The command for showing the Console tab in the Drawer.

### Open Console Settings {: #settings }

Click **Console Settings**
{% Img src="image/admin/X3iDnXdnzdBTOrbaZiP7.png", alt="Console Settings", width="28", height="28" %}.

{% Img src="image/admin/MMPCv1S2FqQVG6qJvByI.png", alt="Console Settings.", width="800", height="541" %}

**Figure 6**. Console Settings.

The links below explain each setting:

- [**Hide Network**][8]
- [**Preserve Log**][9]
- [**Selected Context Only**][10]
- [**Group Similar**][11]
- [**Log XmlHttpRequests**][12]
- [**Eager Evaluation**][13]
- [**Autocomplete From History**][14]

### Open the Console Sidebar {: #sidebar }

Click **Show Console Sidebar**
{% Img src="image/admin/JWC9AxhF6aRjxKLTIfEv.png", alt="Show Console Sidebar", width="30", height="26" %} to show
the Sidebar, which is useful for filtering.

{% Img src="image/admin/SgCPLaYCtxNBclGXHz0Q.png", alt="Console Sidebar.", width="800", height="530" %}

**Figure 7**. Console Sidebar.

## View messages {: #view }

This section contains features that change how messages are presented in the Console. See [View
messages][15] for a hands-on walkthrough.

### Disable message grouping {: #group }

[Open Console Settings][16] and disable **Group similar** to disable the Console's default message
grouping behavior. See [Log XHR and Fetch requests][17] for an example.

### Log XHR and Fetch requests {: #xhr }

[Open Console Settings][18] and enable **Log XMLHttpRequests** to log all `XMLHttpRequest` and
`Fetch` requests to the Console as they happen.

{% Img src="image/admin/t9sLCbiL3KrQW9MdLZoV.png", alt="Logging XMLHttpRequest and Fetch requests.", width="800", height="490" %}

**Figure 8**. Logging `XMLHttpRequest` and `Fetch` requests.

The top message in **Figure 8** shows the Console's default grouping behavior. **Figure 9** shows
how the same log looks after [disabling message grouping][19].

{% Img src="image/admin/5uz4gBdOGdW2RO58Wkui.png", alt="How the logged XMLHttpRequest and Fetch requests look after ungrouping.", width="800", height="589" %}

**Figure 9**. How the logged `XMLHttpRequest` and `Fetch` requests look after ungrouping.

### Persist messages across page loads {: #persist }

By default the Console clears whenever you load a new page. To persist messages across page loads,
[Open Console Settings][20] and then enable the **Preserve Log** checkbox.

### Hide network messages {: #network }

By default the browser logs network messages to the **Console**. For example, the top message in
**Figure X** represents a 404.

{% Img src="image/admin/rlMckNNbRXvT4xln5jTQ.png", alt="A 404 message in the Console.", width="800", height="497" %}

**Figure 10**. A 404 message in the Console.

To hide network messages:

1.  [Open Console Settings][21].
2.  Enable the **Hide Network** checkbox.

## Filter messages {: #filter }

There are many ways to filter out messages in the Console.

### Filter out browser messages {: #browser }

[Open the Console Sidebar][22] and click **User Messages** to only show messages that came from the
page's JavaScript.

{% Img src="image/admin/mYDvN18HyYlZszVGzp1F.png", alt="Viewing user messages.", width="800", height="588" %}

**Figure 11**. Viewing user messages.

### Filter by log level {: #level }

DevTools assigns each `console.*` method a severity level. There are 4 levels: `Verbose`, `Info`,
`Warning`, and `Error`. For example, `console.log()` is in the `Info` group, whereas
`console.error()` is in the `Error` group. The [Console API Reference][23] describes the severity
level of each applicable method. Every message that the browser logs to the Console has a severity
level too. You can hide any level of messages that you're not interested in. For example, if you're
only interested in `Error` messages, you can hide the other 3 groups.

Click the **Log Levels** dropdown to enable or disable `Verbose`, `Info`, `Warning` or `Error`
messages.

{% Img src="image/admin/PX52vbEI6gTFqSmTZNVB.png", alt="The Log Levels dropdown.", width="800", height="529" %}

**Figure 12**. The **Log Levels** dropdown.

You can also filter by log level by [opening the Console Sidebar][24] and then clicking **Errors**,
**Warnings**, **Info**, or **Verbose**.

{% Img src="image/admin/osvdtWq0DGX1yjkFDGLZ.png", alt="Using the Sidebar to view warnings.", width="800", height="588" %}

**Figure 13**. Using the Sidebar to view warnings.

### Filter messages by URL {: #url }

Type `url:` followed by a URL to only view messages that came from that URL. After you type `url:`
DevTools shows all relevant URLs. Domains also work. For example, if `https://example.com/a.js` and
`https://example.com/b.js` are logging messages, `url:https://example.com` enables you to focus on
the messages from these 2 scripts.

{% Img src="image/admin/VEumwMRJ7kuQDV3JFtQk.png", alt="A URL filter.", width="800", height="514" %}

**Figure 14**. A URL filter.

Type `-url:` to hide messages from that URL. This is called a negative URL filter.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hyalP82Gj2k0Op3gkfEH.png", alt="A negative URL filter. DevTools is hiding all messages that match the URL https://b.wal.co", width="800", height="447" %}

**Figure 15**. A negative URL filter. DevTools is hiding all messages that match the URL
`https://b.wal.co`.

You can also show messages from a single URL by [opening the Console Sidebar][25], expanding the
**User Messages** section, and then clicking the URL of the script containing the messages you want
to focus on.

{% Img src="image/admin/7d3qjmCPUgkXVsg1rVf1.png", alt="Viewing the messages that came from wp-ad.min.js.", width="800", height="447" %}

**Figure 16**. Viewing the messages that came from `wp-ad.min.js`.

### Filter out messages from different contexts {: #filtercontext }

Suppose that you've got an ad on your page. The ad is embedded in an `<iframe>` and is generating a
lot of messages in your Console. Because this ad is in a different [JavaScript context][26], one way
to hide its messages is to [open Console Settings][27] and enable the **Selected Context Only**
checkbox.

### Filter out messages that don't match a regular expression pattern {: #regex }

Type a regular expression such as `/[gm][ta][mi]/` in the **Filter** text box to filter out any
messages that don't match that pattern. DevTools checks if the pattern is found in the message text
or the script that caused the message to be logged.

{% Img src="image/admin/1FvJQi69s6J7nHtKUIDy.png", alt="Filtering out any messages that don't match /[gm][ta][mi]/.", width="800", height="512" %}

**Figure 17**. Filtering out any messages that don't match `/[gm][ta][mi]/`.

## Run JavaScript {: #js }

This section contains features related to running JavaScript in the Console. See [Run
JavaScript][28] for a hands-on walkthrough.

### Re-run expressions from history {: #history }

Press the <kbd>Up Arrow</kbd> key to cycle through the history of JavaScript expressions that you
ran earlier in the Console. Press <kbd>Enter</kbd> to run that expression again.

### Watch an expression's value in real-time with Live Expressions {: #live }

If you find yourself typing the same JavaScript expression in the Console repeatedly, you might find
it easier to create a **Live Expression**. With **Live Expressions** you type an expression once and
then pin it to the top of your Console. The value of the expression updates in near real-time. See
[Watch JavaScript Expression Values In Real-Time With Live Expressions][29].

### Disable Eager Evaluation {: #eagereval }

As you type JavaScript expressions in the Console, **Eager Evaluation** shows a preview of that
expression's return value. [Open Console Settings][30] and disable the **Eager Evaluation** checkbox
to turn off the return value previews.

### Disable autocomplete from history {: #autocomplete }

As you type out an expression, the Console's autocomplete popup shows expressions that you ran
earlier. These expressions are prepended with the `>` character. [Open Console Settings][31] and
disable the **Autocomplete From History** checkbox to stop showing expressions from your history.

{% Img src="image/admin/7HsvmvxxZifd5ZqkP4Hg.png", alt="The autocomplete popup showing expressions from history.", width="800", height="512" %}

**Figure 18**. `document.querySelector('a')` and `document.querySelector('img')` are expressions
that were evaluated earlier.

### Select JavaScript context {: #context }

By default the **JavaScript Context** dropdown is set to **top**, which represents the main
document's [browsing context][32].

{% Img src="image/admin/V87tEcP23yWQwPhRlSsR.png", alt="The JavaScript Context dropdown.", width="800", height="512" %}

**Figure 19**. The **JavaScript Context** dropdown.

Suppose you have an ad on your page embedded in an `<iframe>`. You want to run JavaScript in order
to tweak the ad's DOM. To do this, you first need to select the ad's browsing context from the
**JavaScript Context** dropdown.

{% Img src="image/admin/Vl95VEu6LEV6X2cpgyAv.png", alt="Selecting a different JavaScript context.", width="800", height="650" %}

**Figure 20**. Selecting a different JavaScript context.

## Clear the Console {: #clear }

You can use any of the following workflows to clear the Console:

- Click **Clear Console**
  {% Img src="image/admin/PleTkKOHeF03hC4BxBvM.png", alt="Clear Console", width="26", height="26" %}.
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
[32]: https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context

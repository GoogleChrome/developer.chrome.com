---
layout: "layouts/doc-post.njk"
title: "Console Reference"
authors:
  - kaycebasques
date: 2019-04-18
updated: 2020-07-10
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

![The Console panel.](/web/tools/chrome-devtools/console/images/panel.png)

**Figure 1**. The Console panel.

To open the Console panel from the [Command Menu][6], start typing `Console` and then run the **Show
Console** command that has the **Panel** badge next to it.

![The command for showing the Console panel.](/web/tools/chrome-devtools/console/images/showpanelcommand.png)

**Figure 2**. The command for showing the Console panel.

### Open the Console tab in the Drawer {: #drawer }

Press <kbd>Escape</kbd> or click **Customize And Control DevTools**
![Customize And Controls DevTools](/web/tools/chrome-devtools/images/shared/main-menu.png) and then
select **Show Console Drawer**.

![Show Console Drawer.](/web/tools/chrome-devtools/console/images/showconsoledrawer.png)

**Figure 3**. Show Console Drawer.

The Drawer pops up at the bottom of your DevTools window, with the **Console** tab open.

![The Console tab in the Drawer.](/web/tools/chrome-devtools/console/images/drawer.png)

**Figure 4**. The Console tab in the Drawer.

To open the Console tab from the [Command Menu][7], start typing `Console` and then run the **Show
Console** command that has the **Drawer** badge next to it.

![The command for showing the Console tab in the Drawer.](/web/tools/chrome-devtools/console/images/showdrawercommand.png)

**Figure 5**. The command for showing the Console tab in the Drawer.

### Open Console Settings {: #settings }

Click **Console Settings**
![Console Settings](/web/tools/chrome-devtools/console/images/settingsbutton.png).

![Console Settings.](/web/tools/chrome-devtools/console/images/consolesettings.png)

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
![Show Console Sidebar](/web/tools/chrome-devtools/console/images/showconsolesidebar.png) to show
the Sidebar, which is useful for filtering.

![Console Sidebar.](/web/tools/chrome-devtools/console/images/sidebar.png)

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

![Logging XMLHttpRequest and Fetch requests.](/web/tools/chrome-devtools/console/images/xhrgrouped.png)

**Figure 8**. Logging `XMLHttpRequest` and `Fetch` requests.

The top message in **Figure 8** shows the Console's default grouping behavior. **Figure 9** shows
how the same log looks after [disabling message grouping][19].

![How the logged XMLHttpRequest and Fetch requests look after ungrouping.](/web/tools/chrome-devtools/console/images/xhrungrouped.png)

**Figure 9**. How the logged `XMLHttpRequest` and `Fetch` requests look after ungrouping.

### Persist messages across page loads {: #persist }

By default the Console clears whenever you load a new page. To persist messages across page loads,
[Open Console Settings][20] and then enable the **Preserve Log** checkbox.

### Hide network messages {: #network }

By default the browser logs network messages to the **Console**. For example, the top message in
**Figure X** represents a 404.

![A 404 message in the Console.](/web/tools/chrome-devtools/console/images/404.png)

**Figure 10**. A 404 message in the Console.

To hide network messages:

1.  [Open Console Settings][21].
2.  Enable the **Hide Network** checkbox.

## Filter messages {: #filter }

There are many ways to filter out messages in the Console.

### Filter out browser messages {: #browser }

[Open the Console Sidebar][22] and click **User Messages** to only show messages that came from the
page's JavaScript.

![Viewing user messages.](/web/tools/chrome-devtools/console/images/usermessages.png)

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

![The Log Levels dropdown.](/web/tools/chrome-devtools/console/images/loglevels.png)

**Figure 12**. The **Log Levels** dropdown.

You can also filter by log level by [opening the Console Sidebar][24] and then clicking **Errors**,
**Warnings**, **Info**, or **Verbose**.

![Using the Sidebar to view warnings.](/web/tools/chrome-devtools/console/images/sidebarwarnings.png)

**Figure 13**. Using the Sidebar to view warnings.

### Filter messages by URL {: #url }

Type `url:` followed by a URL to only view messages that came from that URL. After you type `url:`
DevTools shows all relevant URLs. Domains also work. For example, if `https://example.com/a.js` and
`https://example.com/b.js` are logging messages, `url:https://example.com` enables you to focus on
the messages from these 2 scripts.

![A URL filter.](/web/tools/chrome-devtools/console/images/urlfilter.png)

**Figure 14**. A URL filter.

Type `-url:` to hide messages from that URL. This is called a negative URL filter.

![A negative URL filter. DevTools is hiding all messages that match the URL
            https://b.wal.co](/web/tools/chrome-devtools/console/images/negativeurlfilter.png)

**Figure 15**. A negative URL filter. DevTools is hiding all messages that match the URL
`https://b.wal.co`.

You can also show messages from a single URL by [opening the Console Sidebar][25], expanding the
**User Messages** section, and then clicking the URL of the script containing the messages you want
to focus on.

![Viewing the messages that came from wp-ad.min.js.](/web/tools/chrome-devtools/console/images/negativeurlfilter.png)

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

![Filtering out any messages that don't match /[gm][ta][mi]/.](/web/tools/chrome-devtools/console/images/regexfilter.png)

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

![The autocomplete popup showing expressions from history.](/web/tools/chrome-devtools/console/images/historyautocomplete.png)

**Figure 18**. `document.querySelector('a')` and `document.querySelector('img')` are expressions
that were evaluated earlier.

### Select JavaScript context {: #context }

By default the **JavaScript Context** dropdown is set to **top**, which represents the main
document's [browsing context][32].

![The JavaScript Context dropdown.](/web/tools/chrome-devtools/console/images/jscontext.png)

**Figure 19**. The **JavaScript Context** dropdown.

Suppose you have an ad on your page embedded in an `<iframe>`. You want to run JavaScript in order
to tweak the ad's DOM. To do this, you first need to select the ad's browsing context from the
**JavaScript Context** dropdown.

![Selecting a different JavaScript context.](/web/tools/chrome-devtools/console/images/selectcontext.png)

**Figure 20**. Selecting a different JavaScript context.

## Clear the Console {: #clear }

You can use any of the following workflows to clear the Console:

- Click **Clear Console**
  ![Clear Console](/web/tools/chrome-devtools/console/images/clearconsole.png).
- Right-click a message and then select **Clear Console**.
- Type `clear()` in the Console and then press <kbd>Enter</kbd>.
- Call `console.clear()` from your webpage's JavaScript.
- Press <kbd>Control</kbd>+<kbd>L</kbd> while the Console is in focus.

[1]: /web/tools/chrome-devtools/console/get-started
[2]: /web/tools/chrome-devtools/console/api
[3]: /web/tools/chrome-devtools/console/utilities
[4]: #panel
[5]: #drawer
[6]: /web/tools/chrome-devtools/command-menu
[7]: /web/tools/chrome-devtools/command-menu
[8]: #network
[9]: #persist
[10]: #filtercontext
[11]: #group
[12]: #xhr
[13]: #eagereval
[14]: #autocomplete
[15]: /web/tools/chrome-devtools/console/get-started#view
[16]: #settings
[17]: #xhr
[18]: #settings
[19]: #group
[20]: #settings
[21]: #settings
[22]: #sidebar
[23]: /web/tools/chrome-devtools/console/api
[24]: #sidebar
[25]: #sidebar
[26]: #context
[27]: #settings
[28]: /web/tools/chrome-devtools/console/get-started#javascript
[29]: /web/tools/chrome-devtools/console/live-expressions
[30]: #settings
[31]: #settings
[32]: https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context

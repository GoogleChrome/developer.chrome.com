---
layout: "layouts/doc-post.njk"
title: "What's New In DevTools (Chrome 73)"
authors:
  - kaycebasques
date: 2019-01-22
updated: 2019-01-21
description: "Logpoints, detailed tooltips in Inspect Mode, and much more."
---

Here's what's new in DevTools in Chrome 73.

## Video version of these release notes {: #video }

{% youtube id="uddZX9ZK6wY" %}

## Logpoints {: #logpoints }

Use Logpoints to log messages to the Console without cluttering up your code with `console.log()`
calls.

To add a logpoint:

1.  Right-click the line number where you want to add the Logpoint.

    ![Adding a Logpoint](/web/updates/images/2019/01/add-logpoint.png)

    **Figure 1**. Adding a Logpoint

2.  Select **Add logpoint**. The **Breakpoint Editor** pops up.

    ![The Breakpoint Editor](/web/updates/images/2019/01/breakpoint-editor.png)

    **Figure 2**. The Breakpoint Editor

3.  In the **Breakpoint Editor**, enter the expression that you want to log to the Console.

    ![Typing the Logpoint expression](/web/updates/images/2019/01/logpoint-expression.png)

    **Figure 3**. Typing the Logpoint expression

    **Tip!** When logging out a variable (e.g. `TodoApp`), wrap the variable in an object (e.g.
    `{TodoApp}`) to log out its name and value in the Console. See [Always Log Objects][1] and
    [Object Property Value Shorthand][2] to learn more about this syntax.

4.  Press <kbd>Enter</kbd> or click outside of the **Breakpoint Editor** to save. The orange badge
    on top of the line number represents the Logpoint.

    ![An orange Logpoint badge on line 174](/web/updates/images/2019/01/logpoint-badge.png)

    **Figure 4**. An orange Logpoint badge on line 174

The next time that the line executes, DevTools logs the result of the Logpoint expression to the
Console.

![The result of the Logpoint expression in the Console](/web/updates/images/2019/01/logpoint-result.png)

**Figure 5**. The result of the Logpoint expression in the Console

See [Chromium issue #700519][3] to report bugs or suggest improvements.

## Detailed tooltips in Inspect Mode {: #inspect }

When inspecting a node, DevTools now shows an expanded tooltip containing commonly important
information like font size, font color, contrast ratio, and box model dimensions.

![Inspecting a node](/web/updates/images/2019/01/inspect.png)

**Figure 6**. Inspecting a node

To inspect a node:

1.  Click **Inspect** ![Inspect](/web/tools/chrome-devtools/images/shared/inspect.png).

    **Tip!** Hover over **Inspect** ![Inspect](/web/tools/chrome-devtools/images/shared/inspect.png)
    to see its keyboard shortcut.

2.  In your viewport, hover over the node.

## Export code coverage data {: #coverage }

[Code coverage][4] data can now be exported as a JSON file. The JSON looks like this:

```js
[
  {
    "url": "https://wndt73.glitch.me/style.css",
    "ranges": [
      {
        "start": 0,
        "end": 21
      },
      {
        "start": 45,
        "end": 67
      }
    ],
    "text": "body { margin: 1em; } figure { padding: 0; } h1 { color: #317EFB; }"
  },
  ...
]
```

`url` is the URL of the CSS or JavaScript file that DevTools analyzed. `ranges` describes the
portions of the code that were used. `start` is the starting offset for a range that was used. `end`
is the ending offset. `text` is the full text of the file.

In the example above, the range 0 to 21 corresponds to `body { margin: 1em; }` and the range 45 to
67 corresponds to `h1 { color: #317EFB; }`. In other words, the first and last rulesets were used
and the middle one was not.

To analyze how much code is used on page load and export the data:

1.  Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
    <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

    ![The Command Menu](/web/updates/images/2019/01/command-menu.png)

    **Figure 7**. The Command Menu

2.  Start typing `coverage`, select **Show Coverage** and then press <kbd>Enter</kbd>.

    ![Show Coverage](/web/updates/images/2019/01/show-coverage.png)

    **Figure 8**. Show Coverage

    The **Coverage** tab opens.

    ![The Coverage tab](/web/updates/images/2019/01/coverage.png)

    **Figure 9**. The Coverage tab

3.  Click **Reload** ![Reload](/web/tools/chrome-devtools/images/shared/reload.png). DevTools
    reloads the page and records how much code is used compared to how much is shipped.
4.  Click **Export** ![Export](/web/tools/chrome-devtools/images/shared/export.png) to export the
    data as a JSON file.

Code coverage is also available in Puppeteer, a browser automation tool maintained by the DevTools
team. See [Coverage][5].

See [Chromium issue #717195][6] to report bugs or suggest improvements.

## Navigate the Console with the keyboard {: #keyboard }

You can now use the keyboard to navigate the Console. Here's an example.

Pressing <kbd>Shift</kbd>+<kbd>Tab</kbd> focuses the last message (or result of an evaluated
expression). If the message contains links, the last link is highlighted first. Pressing
<kbd>Enter</kbd> opens the link in a new tab. Pressing the <kbd>Left</kbd> arrow key highlights the
entire message (see **Figure 13**).

![Focusing a link](/web/updates/images/2019/01/focus1.png)

**Figure 11**. Focusing a link

Pressing the <kbd>Up</kbd> arrow key focuses the next link.

![Focusing another link](/web/updates/images/2019/01/focus2.png)

**Figure 12**. Focusing another link

Pressing the <kbd>Up</kbd> arrow key again focuses the entire message.

![Focusing an entire message](/web/updates/images/2019/01/focus3.png)

**Figure 13**. Focusing an entire message

Pressing the <kbd>Right</kbd> arrow key expands a collapsed stack trace (or object, array, and so
on).

![Expanding a collapsed stack trace](/web/updates/images/2019/01/focus4.png)

**Figure 14**. Expanding a collapsed stack trace

Pressing the <kbd>Left</kbd> arrow key collapses an expanded message or result.

See [Chromium issue #865674][7] to report bugs or suggest improvements.

## AAA contrast ratio line in the Color Picker {: #AAA }

The Color Picker now shows a second line to indicate which colors meet the [AAA contrast ratio
recommendation][8]. The AA line has been there since Chrome 65.

![The AA line (top) and AAA line (bottom)](/web/updates/images/2019/01/AAA.png)

**Figure 15**. The AA line (top) and AAA line (bottom)

Colors between the 2 lines represent colors that meet the AA recommendation but do not meet the AAA
recommendation. When a color meets the AAA recommendation, anything on the same side of that color
also meets the recommendation. For example, in **Figure 15** anything below the lower line is AAA,
and anything above the upper line does not even meet the AA recommendation.

**Tip!** In general, you can improve the readability of your pages by increasing the amount of text
that meets the AAA recommendation. If meeting the AAA recommendation is not possible for some
reason, try to at least meet the AA recommendation.

See [Contrast ratio in the Color Picker][9] to learn how to access this feature.

See [Chromium issue #879856][10] to report bugs or suggest improvements.

## Save custom geolocation overrides {: #geolocation }

The Sensors tab now lets you save custom geolocation overrides.

1.  Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
    <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

    ![The Command Menu](/web/updates/images/2019/01/command-menu.png)

    **Figure 16**. The Command Menu

2.  Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>. The **Sensors** tab opens.

    ![The Sensors tab](/web/updates/images/2019/01/sensors.png)

    **Figure 17**. The Sensors tab

3.  In the **Geolocation** section click **Manage**. **Settings** > **Geolocations** opens up.

    ![The Geolocations tab in Settings](/web/updates/images/2019/01/geolocations.png)

    **Figure 18**. The Geolocations tab in Settings

4.  Click **Add location**.
5.  Enter a location name, latitude, and longitude, then click **Add**.

    ![Adding a custom geolocation](/web/updates/images/2019/01/custom-geolocation.png)

    **Figure 19**. Adding a custom geolocation

See [Chromium issue #649657][11] to report bugs or suggest improvements.

## Code folding {: #folding }

The **Sources** and **Network** panels now support code folding.

![Lines 54 to 65 have been folded](/web/updates/images/2019/01/folding.png)

**Figure 20**. Lines 54 to 65 have been folded

To enable code folding:

1.  Press <kbd>F1</kbd> to open **Settings**.
2.  Under **Settings** > **Preferences** > **Sources** enable **Code folding**.

To fold a block of code:

1.  Hover your mouse over the line number where the block starts.
2.  Click **Fold** ![Fold](/web/updates/images/2019/01/fold.png).

See [Chromium issue #328431][12] to report bugs or suggest improvements.

## Messages tab {: #messages }

The **Frames** tab has been renamed to the **Messages** tab. This tab is only available in the
**Network** panel when inspecting a web socket connection.

![The Messages tab](/web/updates/images/2019/01/messages.png)

**Figure 21**. The Messages tab

See [Chromium issue #802182][13] to report bugs or suggest improvements.

[1]: https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4#a4f3
[2]: https://alligator.io/js/object-property-shorthand-es6/"
[3]: https://crbug.com/700519
[4]: /web/updates/2017/04/devtools-release-notes#coverage
[5]: https://pptr.dev/#?product=Puppeteer&version=v1.11.0&show=api-class-coverage
[6]: https://crbug.com/717195
[7]: https://crbug.com/865674
[8]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html
[9]: /web/updates/2018/01/devtools#contrast
[10]: https://crbug.com/879856
[11]: https://crbug.com/649657
[12]: https://crbug.com/328431
[13]: https://crbug.com/802182

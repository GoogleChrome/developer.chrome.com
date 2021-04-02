---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 73)"
authors:
  - kaycebasques
date: 2019-01-22
#updated: YYYY-MM-DD
description: "Logpoints, detailed tooltips in Inspect Mode, and much more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AhjpnjFaNhPtnS9Hm3HG.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-73
---

Here's what's new in DevTools in Chrome 73.

## Video version of these release notes {: #video }

{% YouTube id="uddZX9ZK6wY" %}

## Logpoints {: #logpoints }

Use Logpoints to log messages to the Console without cluttering up your code with `console.log()`
calls.

To add a logpoint:

1.  Right-click the line number where you want to add the Logpoint.

    {% Img src="image/admin/pZO9nJ979W0K7RciiC9r.png", alt="Adding a Logpoint", width="800", height="461" %}

    **Figure 1**. Adding a Logpoint

2.  Select **Add logpoint**. The **Breakpoint Editor** pops up.

    {% Img src="image/admin/DLYjHddID67skOmdZj3Z.png", alt="The Breakpoint Editor", width="800", height="458" %}

    **Figure 2**. The Breakpoint Editor

3.  In the **Breakpoint Editor**, enter the expression that you want to log to the Console.

    {% Img src="image/admin/TNXzKFBE5QTRP13HAxWR.png", alt="Typing the Logpoint expression", width="800", height="480" %}

    **Figure 3**. Typing the Logpoint expression

    **Tip!** When logging out a variable (e.g. `TodoApp`), wrap the variable in an object (e.g.
    `{TodoApp}`) to log out its name and value in the Console. See [Always Log Objects][1] and
    [Object Property Value Shorthand][2] to learn more about this syntax.

4.  Press <kbd>Enter</kbd> or click outside of the **Breakpoint Editor** to save. The orange badge
    on top of the line number represents the Logpoint.

    {% Img src="image/admin/gtz1tzq3FPcYVZAMeIsK.png", alt="An orange Logpoint badge on line 174", width="800", height="456" %}

    **Figure 4**. An orange Logpoint badge on line 174

The next time that the line executes, DevTools logs the result of the Logpoint expression to the
Console.

{% Img src="image/admin/pFlCz3shVYBTW1HXadCU.png", alt="The result of the Logpoint expression in the Console", width="800", height="242" %}

**Figure 5**. The result of the Logpoint expression in the Console

See [Chromium issue #700519][3] to report bugs or suggest improvements.

## Detailed tooltips in Inspect Mode {: #inspect }

When inspecting a node, DevTools now shows an expanded tooltip containing commonly important
information like font size, font color, contrast ratio, and box model dimensions.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/jnVSeDJJaOZyfO3kvpRp.png", alt="Inspecting a node", width="800", height="736" %}

**Figure 6**. Inspecting a node

To inspect a node:

1.  Click **Inspect** {% Img src="image/admin/ghAgSJFpVdoGNc0rfjbm.png", alt="Inspecting a node", width="26", height="26" %}.

    **Tip!** Hover over **Inspect** to see its keyboard shortcut.

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

    {% Img src="image/admin/BbO98rFQ7sIPXa1pFd5g.png", alt="The Command Menu", width="800", height="513" %}

    **Figure 7**. The Command Menu

2.  Start typing `coverage`, select **Show Coverage** and then press <kbd>Enter</kbd>.

    {% Img src="image/admin/EjGuGZO2Aanf1auzp7a1.png", alt="Show Coverage", width="800", height="222" %}

    **Figure 8**. Show Coverage

    The **Coverage** tab opens.

    {% Img src="image/admin/15C76bRXIwrEwBrdWiUT.png", alt="The Coverage tab", width="800", height="443" %}

    **Figure 9**. The Coverage tab

3.  Click **Reload** {% Img src="image/admin/ulhuP6lZdnSsXFhf18gh.png", alt="Reload", width="24", height="25" %}. DevTools
    reloads the page and records how much code is used compared to how much is shipped.
4.  Click **Export** {% Img src="image/admin/p34prTy4dJsM5bvBIBIg.png", alt="Export", width="20", height="24" %} to export the
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

{% Img src="image/admin/eMMHx7RurYd4DOQ4Gm1W.png", alt="Focusing a link", width="800", height="195" %}

**Figure 11**. Focusing a link

Pressing the <kbd>Up</kbd> arrow key focuses the next link.

{% Img src="image/admin/jl9syC2BIsauEigIZP86.png", alt="Focusing another link", width="800", height="181" %}

**Figure 12**. Focusing another link

Pressing the <kbd>Up</kbd> arrow key again focuses the entire message.

{% Img src="image/admin/NqmAeRDcCuzQXmEBJA42.png", alt="Focusing an entire message", width="800", height="188" %}

**Figure 13**. Focusing an entire message

Pressing the <kbd>Right</kbd> arrow key expands a collapsed stack trace (or object, array, and so
on).

{% Img src="image/admin/Kkg6e0HLh7Fp93msgflj.png", alt="Expanding a collapsed stack trace", width="800", height="481" %}

**Figure 14**. Expanding a collapsed stack trace

Pressing the <kbd>Left</kbd> arrow key collapses an expanded message or result.

See [Chromium issue #865674][7] to report bugs or suggest improvements.

## AAA contrast ratio line in the Color Picker {: #AAA }

The Color Picker now shows a second line to indicate which colors meet the [AAA contrast ratio
recommendation][8]. The AA line has been there since Chrome 65.

{% Img src="image/admin/TgG8SkwxztbICauNVIhb.png", alt="The AA line (top) and AAA line (bottom)", width="800", height="730" %}

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

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/RGDrwE9dWND2s3SlimPk.png", alt="The Command Menu", width="800", height="513" %}

    **Figure 16**. The Command Menu

2.  Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>. The **Sensors** tab opens.

    {% Img src="image/admin/DNzlFkzLvExnjWxtIHlP.png", alt="The Sensors tab", width="800", height="395" %}

    **Figure 17**. The Sensors tab

3.  In the **Geolocation** section click **Manage**. **Settings** > **Geolocations** opens up.

    {% Img src="image/admin/QRiF9MxsP4wu6bi5aNpO.png", alt="The Geolocations tab in Settings", width="800", height="508" %}

    **Figure 18**. The Geolocations tab in Settings

4.  Click **Add location**.
5.  Enter a location name, latitude, and longitude, then click **Add**.

    {% Img src="image/admin/yD7ozmf2YegMorupu1GG.png", alt="Adding a custom geolocation", width="800", height="540" %}

    **Figure 19**. Adding a custom geolocation

See [Chromium issue #649657][11] to report bugs or suggest improvements.

## Code folding {: #folding }

The **Sources** and **Network** panels now support code folding.

{% Img src="image/admin/6lgkXNYx1hQMQj1h8ZnQ.png", alt="Lines 54 to 65 have been folded", width="800", height="513" %}

**Figure 20**. Lines 54 to 65 have been folded

To enable code folding:

1.  Press <kbd>F1</kbd> to open **Settings**.
2.  Under **Settings** > **Preferences** > **Sources** enable **Code folding**.

To fold a block of code:

1.  Hover your mouse over the line number where the block starts.
2.  Click **Fold** {% Img src="image/admin/57zvY4yBV8rY0NR90o90.png", alt="Fold", width="16", height="14" %}.

See [Chromium issue #328431][12] to report bugs or suggest improvements.

## Messages tab {: #messages }

The **Frames** tab has been renamed to the **Messages** tab. This tab is only available in the
**Network** panel when inspecting a web socket connection.

{% Img src="image/admin/cebKJSpVQD5uL8lQJ1xa.png", alt="The Messages tab", width="800", height="260" %}

**Figure 21**. The Messages tab

See [Chromium issue #802182][13] to report bugs or suggest improvements.

[1]: https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4#a4f3
[2]: https://alligator.io/js/object-property-shorthand-es6/
[3]: https://crbug.com/700519
[4]: /blog/new-in-devtools-59#coverage
[5]: https://pptr.dev/#?product=Puppeteer&version=v1.11.0&show=api-class-coverage
[6]: https://crbug.com/717195
[7]: https://crbug.com/865674
[8]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html
[9]: /blog/new-in-devtools-65#contrast
[10]: https://crbug.com/879856
[11]: https://crbug.com/649657
[12]: https://crbug.com/328431
[13]: https://crbug.com/802182

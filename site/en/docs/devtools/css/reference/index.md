---
layout: "layouts/doc-post.njk"
title: "CSS features reference"
authors:
  - kaycebasques
  - jecelynyeen
date: 2017-06-09
#updated: YYYY-MM-DD
description: "Discover new workflows for viewing and changing CSS in Chrome DevTools."
---

Discover new workflows in this comprehensive reference of Chrome DevTools features related to
viewing and changing CSS.

See [Get Started with Viewing and Changing CSS][1] to learn the basics.

## Select an element {: #select }

The **Elements** panel of DevTools lets you view or change the CSS of one element at a time. The
selected element is highlighted blue in the **DOM Tree**. The element's styles are shown in the
**Styles** pane. See [View an element's CSS][2] for a tutorial.

{% Img src="image/admin/Iganvpf9K9dEOpSb6wIA.png", alt="An example of a selected element", width="800", height="503" %}

**Figure 1**. The `h1` element that's highlighted blue in the **DOM Tree** is the selected element.
To the right, the element's styles are shown in the **Styles** pane. To the left, the element is
highlighted in the viewport, but only because the mouse is currently hovering over it in the **DOM
Tree**

There are many ways to select an element:

- In your viewport, right-click the element and select **Inspect**.
- In DevTools, click **Select an element**
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/7HgaRejtWu4NfpPOTtJU.png", alt="Select an element", width="26", height="26" %}
  or press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Mac) or
  <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux), and then click the element in
  the viewport.
- In DevTools, click the element in the **DOM Tree**.
- In DevTools, run a query like `document.querySelector('p')` in the **Console**, right-click the
  result, and then select **Reveal in Elements panel**.

## View CSS {: #view }

### View the external stylesheet where a rule is defined {: #view-external }

In the **Styles** pane, click the link next to a CSS rule to open the external stylesheet that
defines the rule.

If the stylesheet is minified, see [Make a minified file readable][3].

{% Img src="image/admin/DIRRbj70JvHO7EDpeSdC.svg", alt="Viewing the stylesheet where a rule is defined", width="800", height="488" %}

**Figure 2**. Clicking `devsite-google-blue.css:487` takes you to line 487 of
`devsite-google-blue.css`, where the `.devsite-article h1:first-of-type` CSS rule is defined.

### View only the CSS that's actually applied to an element {: #computed }

The **Styles** tab shows you all of the rules that apply to an element, including declarations that
have been overridden. When you're not interested in overridden declarations, use the **Computed**
tab to view only the CSS that's actually being applied to an element.

1.  [Select an element][4].
2.  Go to the **Computed** tab in the **Elements** panel.

{% Aside %}

**Note:** On a wide DevTools window, the **Computed** tab does not exist. The contents of the
**Computed** tab are shown on the **Styles** tab.

{% endAside %}

Inherited properties are opaque. Check the **Show All** checkbox to see all inherited values.

{% Img src="image/admin/QZo3RH4i4zmlurpX8M3B.svg", alt="The Computed tab", width="800", height="488" %}

**Figure 3**. The **Computed** tab shows the CSS properties being applied to the currently-selected
`h1` element

### View CSS properties in alphabetical order {: #alphabetical }

Use the **Computed** tab. See [View only the CSS that's actually applied to an element][5].

### View inherited CSS properties {: #inherited }

Check the **Show All** checkbox in the **Computed** tab. See [View only the CSS that's actually
applied to an element][6].

### View an element's box model {: #box-model }

To view [the box model][7] of an element, go to the **Styles** tab. If your DevTools window is
narrow, the **Box Model** diagram is at the bottom of the tab.

To change a value, double-click on it.

{% Img src="image/admin/3M83x7zsgaeJctz6B3iu.png", alt="The Box Model diagram", width="800", height="592" %}

**Figure 4**. The **Box Model** diagram in the **Styles** tab shows the box model for the currently
selected `h1` element

### Search and filter an element's CSS {: #filter }

Use the **Filter** text box on the **Styles** and **Computed** tabs to search for specific CSS
properties or values.

To also search inherited properties in the **Computed** tab, check the **Show All** checkbox.

{% Img src="image/admin/2wXKvRxuWUObC2uNfIJ5.png", alt="Filtering the Styles tab", width="800", height="460" %}

**Figure 5**. Filtering the **Styles** tab to only show rules that include the search query `color`

{% Img src="image/admin/sORR9WlEYpkRtltoSHp8.png", alt="Filtering the Computed tab", width="800", height="460" %}

**Figure 6**. Filtering the **Computed** tab to only show declarations that include the search query
`100%`

### Toggle a pseudo-class {: #pseudo-class }

To toggle a pseudo-class like `:active`, `:focus`, `:hover`, `:visited`, `:focus-within` or
`focus-visible`:

1.  [Select an element][8].
2.  On the **Elements** panel, go to the **Styles** tab.
3.  Click **:hov**.
4.  Check the pseudo-class that you want to enable.

{% Img src="image/admin/Ag3tYHtZr72Op5Xf1J1A.png", alt="Toggling the :hover pseudo-class", width="800", height="523" %}

**Figure 7**. Toggling the `:hover` pseudo-class. In the viewport you can see that the
`background-color: cornflowerblue` declaration is being applied to the element, even though the
element is not actually being hovered over

See [Add a pseudostate to a class][9] for an interactive tutorial.

### View a page in print mode {: #print-mode }

To view a page in print mode:

1.  Open the [Command Menu][10].
2.  Start typing `Rendering` and select `Show Rendering`.
3.  For the **Emulate CSS Media** dropdown, select **print**.

### View used and unused CSS with the Coverage tab {: #coverage }

The Coverage tab shows you what CSS a page actually uses.

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, Chrome OS) while DevTools is
    in focus to open the Command Menu.
2.  Start typing `coverage` and select **Show Coverage**. The Coverage tab appears.

    {% Img src="image/admin/w4EnEqO6dqj8nGQEMq6j.png", alt="Opening the Coverage tab from the Command Menu.", width="800", height="526" %}

    **Figure 8**. Opening the Coverage tab from the Command Menu

    {% Img src="image/admin/WiWn2DPIl3HGsiM9hxNa.png", alt="The Coverage tab.", width="800", height="575" %}

    **Figure 9**. The Coverage tab

3.  Click **Start Instrumenting Coverage And Reload Page**
    {% Img src="image/admin/7Nr8n3jly53lAoufh6Tn.png", alt="Start Instrumenting Coverage And Reload Page", width="24", height="25" %}.
    The page reloads and the Coverage tab provides an overview of how much CSS (and JavaScript) is
    used from each file that the browser loads. Green represents used CSS. Red represents unused
    CSS.

    {% Img src="image/admin/pvGdoYTcYTA5lO0mptQy.png", alt="An overview of how much CSS (and JavaScript) is used and unused.", width="800", height="575" %}

    **Figure 10**. An overview of how much CSS (and JavaScript) is used and unused

4.  Click a CSS file to see a line-by-line breakdown of what CSS it uses.

    {% Img src="image/admin/rA1y59EuQv5COtnFX8d7.png", alt="A line-by-line breakdown of used and unused CSS.", width="800", height="646" %}

    **Figure 11**. Lines 55 to 57 and 65 to 67 of `devsite-google-blue.css` are unused, whereas
    lines 59 to 63 are used

### Force print preview mode {: #print }

See [Force DevTools Into Print Preview Mode][11].

## Change CSS {: #change }

### Add a CSS declaration to an element {: #add-declaration }

Since the order of declarations affects how an element is styled, you can add declarations in
different ways:

- [Add a inline declaration][12]. Equivalent to adding a `style` attribute to the element's HTML.
- [Add a declaration to a style rule][13].

**What workflow should you use?** For most scenarios, you probably want to use the inline
declaration workflow. Inline declarations have higher specificity than external ones, so the inline
workflow ensures that the changes take effect in the element as you'd expect. See [Selector
Types][14] for more on specificity.

If you're debugging an element's styles and you need to specifically test what happens when a
declaration is defined in different places, use the other workflow.

#### Add an inline declaration {: #add-declaration-inline }

To add an inline declaration:

1.  [Select an element][15].
2.  In the **Styles** pane, click between the brackets of the **element.style** section. The cursor
    focuses, allowing you to enter text.
3.  Enter a property name and press <kbd>Enter</kbd>.
4.  Enter a valid value for that property and press <kbd>Enter</kbd>. In the **DOM Tree**, you can
    see that a `style` attribute has been added to the element.

{% Img src="image/admin/aUviBexUPdpxXvUbSUxS.png", alt="Adding inline declarations", width="800", height="645" %}

**Figure 12**. The `margin-top` and `background-color` properties have been applied to the selected
element. In the **DOM Tree** you can see the declarations reflected in the element's `style`
attribute

#### Add a declaration to a style rule {: #add-declaration-to-rule }

To add a declaration to an existing style rule:

1.  [Select an element][16].
2.  In the **Styles** pane, click between the brackets of the style rule to which you want to add
    the declaration. The cursor focuses, allowing you to enter text.
3.  Enter a property name and press <kbd>Enter</kbd>.
4.  Enter a valid value for that property and press <kbd>Enter</kbd>.

**Figure 13**. Adding the `border-bottom-style:groove` declaration to a style rule

### Change a declaration name or value {: #change-declaration }

Double-click a declaration's name or value to change it. See [Change declaration values with
keyboard shortcuts][17] for shortcuts for quickly incrementing or decrementing a value by 0.1, 1,
10, or 100 units.

{% Img src="image/admin/dQMFYTxsVz5WxQpuvRga.png", alt="Changing the value of a declaration", width="800", height="547" %}

### Change declaration values with keyboard shortcuts {: #values-shortcuts }

While editing the value of a declaration, you can use the following keyboard shortcuts to increment
the value by a fixed amount:

- <kbd>Option</kbd>+<kbd>Up</kbd> (Mac) or <kbd>Alt</kbd>+<kbd>Up</kbd> (Windows, Linux) to
  increment by 0.1.
- <kbd>Up</kbd> to change the value by 1, or by 0.1 if the current value is between -1 and 1.
- <kbd>Shift</kbd>+<kbd>Up</kbd> to increment by 10.
- <kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>Up</kbd> (Mac) or <kbd>Shift</kbd>+<kbd>Page Up</kbd>
  (Windows, Linux) to increment the value by 100.

Decrementing also works. Just replace each instance of <kbd>Up</kbd> mentioned above with
<kbd>Down</kbd>.

### Add a class to an element {: #add-class }

To add a class to an element:

1.  [Select the element][18] in the **DOM Tree**.
2.  Click **.cls**.
3.  Enter the name of the class in the **Add New Class** text box.
4.  Press <kbd>Enter</kbd>.

{% Img src="image/admin/US4gZWGNdDcz4MswYkV3.svg", alt="The Element Classes pane", width="800", height="460" %}

**Figure 14**. The **Element Classes** pane

### Toggle a class {: #toggle-class }

To enable or disable a class on an element:

1.  [Select the element][19] in the **DOM Tree**.
2.  Open the **Element Classes** pane. See [Add a class to an element][20]. Below the **Add New
    Class** text box are all of the classes that are being applied to this element.
3.  Toggle the checkbox next to the class that you want to enable or disable.

### Add a style rule {: #style-rule }

To add a new style rule:

1.  [Select an element][21].
2.  Click **New Style Rule**
    {% Img src="image/admin/XcURsD5IoAJqI4TwgY4w.png", alt="New Style Rule", width="20", height="20" %}. DevTools inserts a
    new rule beneath the **element.style** rule.

{% Img src="image/admin/yAkLVkP6eeeBihslr7oy.png", alt="Adding a new style rule", width="800", height="599" %}

**Figure 15**. DevTools adds the `h1.devsite-page-title` style rule after clicking **New Style
Rule**

#### Choose which stylesheet to add a rule to {: #style-rule-stylesheet }

When [adding a new style rule][22], click and hold **New Style Rule**
![New Style Rule](/docs/devtools/css/imgs/new-style-rule.png) to choose which stylesheet
to add the style rule to.

{% Img src="image/admin/QEehBhl9E7tfEwyfdWgO.png", alt="Choosing a stylesheet", width="800", height="599" %}

**Figure 16**. Choosing a stylesheet

### Toggle a declaration {: #toggle-declaration }

To toggle a single declaration on or off:

1.  [Select an element][23].
2.  In the **Styles** pane, hover over the rule that defines the declaration. Checkboxes appear next
    to each declaration.
3.  Check or uncheck the checkbox next to the declaration. When you uncheck a declaration, DevTools
    crosses it out to indicate that it's no longer active.

{% Img src="image/admin/Z36P2RuDUFAFIp8kTZ6N.png", alt="Toggling a declaration", width="800", height="608" %}

**Figure 20**. The `color` property for the currently-selected element has been toggled off

### Change colors with the Color Picker {: #color-picker }

The **Color Picker** provides a GUI for changing `color` and `background-color` declarations.

To open the **Color Picker**:

1.  [Select an element][24].
2.  In the **Styles** tab, find the `color` or `background-color` declaration that you want to
    change. To the left of the `color` or `background-color` value, there is a small square which is
    a preview of the color.

    {% Img src="image/admin/SuJ1WT25iaaOgt8iWQzj.png", alt="Color preview", width="800", height="517" %}

    **Figure 24**. The small blue square to the left of `rgb(123, 170, 247)` is a preview of that
    color

3.  Click the preview to open the **Color Picker**.

    {% Img src="image/admin/i8pU9ALTZwhbvrhlXGm7.png", alt="The Color Picker", width="800", height="624" %}

    **Figure 25**. The **Color Picker**

Here's a description of each of the UI elements of the **Color Picker**:

{% Img src="image/admin/kAtu8Uoi2x8IFvaX561h.svg", alt="The Color Picker, annotated", width="800", height="548" %}

**Figure 26**. The **Color Picker**, annotated

1.  **Shades**.
2.  **Eyedropper**. See [Sample a color off the page with the Eyedropper][25].
3.  **Copy To Clipboard**. Copy the **Display Value** to your clipboard.
4.  **Display Value**. The RGBA, HSLA, or Hex representation of the color.
5.  **Color Palette**. Click one of these squares to change the color to that square.
6.  **Hue**.
7.  **Opacity**.
8.  **Display Value Switcher**. Toggle between the RGBA, HSLA, and Hex representations of the
    current color.
9.  **Color Palette Switcher**. Toggle between the [Material Design palette][26], a custom palette,
    or a page colors palette. DevTools generates the page color palette based on the colors that it
    finds in your stylesheets.

#### Sample a color off the page with the Eyedropper {: #eyedropper }

When you open the **Color Picker**, the **Eyedropper**
{% Img src="image/admin/FCjp9jpqJo8tAB7LneFU.png", alt="Eyedropper", width="28", height="28" %} is on by default. To change
the selected color to some other color on the page:

1.  Hover over the target color in the viewport.
2.  Click to confirm.

    {% Img src="image/admin/7g1d1iGpJgm98vIHA6pA.png", alt="Using the Eyedropper", width="800", height="529" %}

    **Figure 27**. The **Color Picker** shows a current color value of `#212121`, which is close to
    black. This color would change to the blue that's currently highlighted in the viewport once the
    blue was clicked

### Change angle value with the Angle Clock {: #angle-clock }

The **Angle Clock** provides a GUI for changing `<angle>`s in CSS property values.

To open the **Angle Clock**:

1.  [Select an element][27] with angle declaration. For example, select the text below.
2.  In the **Styles** tab, find the `transform` or `background` declaration that you want to change.
    Click on the **Angle Preview** box next to the angle value.

    {% Img src="image/admin/EjXqoXmADgOgKMRQSBsP.png", alt="Angle preview", width="800", height="661" %}

    **Figure 28**. The small clock to the left of `-5deg` and `0.25turn` are preview of the angle.

3.  Click the preview to open the **Angle Clock**.

    {% Img src="image/admin/CykQzGfW2DfCt2VUmTcR.png", alt="Angle clock", width="800", height="723" %}

    **Figure 29**. The Angle Clock.

4.  Change the angle value by clicking on the **Angle Clock** circle or scroll your mouse to
    increase / decrease the angle value by 1.
5.  There are more keyboard shortcuts to change the angle value. Find out more in the [Styles pane
    keyboard shortcuts][28].

[1]: /docs/devtools/css
[2]: /docs/devtools/css#view
[3]: /docs/devtools/javascript/reference#format
[4]: #select
[5]: #computed
[6]: #computed
[7]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model
[8]: #select
[9]: /docs/devtools/css#pseudostates
[10]: /docs/devtools/command-menu
[11]: /docs/devtools/css/print-preview
[12]: #add-declaration-inline
[13]: #add-declaration-to-rule
[14]: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#Selector_Types
[15]: #select
[16]: #select
[17]: #values-shortcuts
[18]: #select
[19]: #select
[20]: #add-class
[21]: #select
[22]: #style-rule
[23]: #select
[24]: #select
[25]: #eyedropper
[26]: https://material.io/design/color/the-color-system.html#color-usage-and-palettes
[27]: #select
[28]: /docs/devtools/shortcuts#styles

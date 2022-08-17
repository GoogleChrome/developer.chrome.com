---
layout: "layouts/doc-post.njk"
title: "CSS features reference"
authors:
  - kaycebasques
  - jecelynyeen
  - sofiayem
date: 2017-06-09
#updated: YYYY-MM-DD
description: "Discover new workflows for viewing and changing CSS in Chrome DevTools."
tags:
  - css
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

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

Alternatively, scroll down the **Styles** pane and find sections named `Inherited from <element_name>`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TuWZmbeQlHR6Qp6pUHVP.png", alt="View the Inherited from... section of the Styles pane.", width="800", height="361" %}

### View `@supports` at-rules {: #supports }

The **Styles** tab shows you the `@supports` CSS at-rules if they are applied to an element. For example, inspect the following element:

<div class="box"></div>
<style>
  .box {
  width: 300px;
  height: 30px;
  text-align: center;
}
@supports (background: lab(0% 0 0)) {
  .box {
    background: lab(90% -44 55);
  }
  .box::after { content: "I support CIELAB color space!" }
}
@supports not (background: lab(0% 0 0)) {
  .box {
    background:#c9b1d6;
  }
  .box::after { content: "I don\'t support CIELAB color space :(" }
}
</style>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Lw1ZveiO2lxVFDgylmnC.png", alt="View @supports at-rules", width="800", height="453" %}

If your browser supports the `lab()` function, the element is green, otherwise it's purple.

{% Aside %}
**Note**: At the time of writing, only Safari [supports the CIELAB color space](https://caniuse.com/?search=lab).
{% endAside %}

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

### View inherited highlight pseudo-elements {: #view-inherited-highlight-pseudo-elements }

[Pseudo-elements][33] let you style specific parts of elements. Highlight pseudo-elements are document portions with a "selected" status and they are styled as "highlighted" to indicate this status to the user. For example, such pseudo-elements are `::selection`, `::spelling-error`, `::grammar-error`, and `::highlight`.

As mentioned in the [specification](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), when multiple styles conflict, cascade determines the winning style.

{% Aside %}
To enable this feature, run Chrome with the `--enable-blink-features=HighlightInheritance` flag.
{% endAside %}

To better understand the inheritance and priority of the rules, you can view the inherited highlight pseudo-elements:

1. [Inspect the text below](/docs/devtools/open/#elements).

    <div class="text-parent"><div class="highlighted-text">I inherited the style of my parent's highlight pseudo-element. Select me!</div></div>
    <style>
    .text-parent::selection {
      background: #ff0;
      color: #ff1493;
    }
    </style>

1. Select a portion of the text above.
1. In the **Styles** pane, scroll down to find the `Inherited from ::selection pseudo of...` section.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/te2Rhrbqs5BlrlcVFPZf.png", alt="View the Inherited section of the Styles pane.", width="800", height="410" %}

### View cascade layers {: #cascade-layers}

[Cascade layers](/blog/cascade-layers/) enable more explicit control of your CSS files to prevent style-specificity conflicts. This is useful for large codebases, design systems, and when managing third-party styles in applications.

To view cascade layers, [inspect](/docs/devtools/open/#elements) the element below and open **Elements** > **Styles**.

<div class="cascade-box"></div>
<style>
    .cascade-box{
    width: 250px;
    height: 30px;
    text-align: center;}
    .cascade-box::after {
        content: "My styles are layered!";
      }
    /* Define the specificity */
@layer base, component, page;
@layer page {
  .cascade-box {
    background: palegreen;
  }
}
@layer base {
  .cascade-box {
    background: rebeccapurple;
  }
}
@layer component {
  .cascade-box {
    background: hotpink;
  }
}
</style>

In the **Styles** pane, view the 3 cascade layers and their styles: `page`, `component` and `base`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NAXkykrJcC23cZ1jWCin.png", alt="Cascade layers", width="800", height="638" %}

To view the layer order, click the layer name or the **Toggle CSS layers view**<span class="material-icons">layers</span> button.

The `page` layer has the highest specificity, therefore the element's background is green.

### View a page in print mode {: #print-mode }

To view a page in print mode:

1.  Open the [Command Menu][10].
2.  Start typing `Rendering` and select `Show Rendering`.
3.  For the **Emulate CSS Media** dropdown, select **print**.

### View used and unused CSS with the Coverage tab {: #coverage }

The Coverage tab shows you what CSS a page actually uses.

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, ChromeOS) while DevTools is
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

{% Img src="image/admin/dQMFYTxsVz5WxQpuvRga.png", alt="Changing the value of a declaration", width="800", height="547" %}

**Figure 13**. Adding the `border-bottom-style:groove` declaration to a style rule


### Change a declaration name or value {: #change-declaration }

Double-click a declaration's name or value to change it. See [Change declaration values with
keyboard shortcuts][17] for shortcuts for quickly incrementing or decrementing a value by 0.1, 1,
10, or 100 units.


### Change declaration values with keyboard shortcuts {: #values-shortcuts }

While editing the value of a declaration, you can use the following keyboard shortcuts to increment
the value by a fixed amount:

- <kbd>Option</kbd>+<kbd>Up</kbd> (Mac) or <kbd>Alt</kbd>+<kbd>Up</kbd> (Windows, Linux) to
  increment by 0.1.
- <kbd>Up</kbd> to change the value by 1, or by 0.1 if the current value is between -1 and 1.
- <kbd>Shift</kbd>+<kbd>Up</kbd> to increment by 10.
- <kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>Up</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>Page Up</kbd>
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

### Emulate light and dark theme preferences and enable automatic dark mode {: #emulate-light-dark-themes }

To toggle [automatic dark mode][34] or emulate the user's preference of [light or dark themes][35]:

1. On the **Elements** > **Styles** pane, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CNwUGOgogDCqUaQGt9ZS.svg", alt="Toggle common rendering emulations.", width="20", height="20" %}**Toggle common rendering emulations**.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2G2TqgXtPcUnSgRN4saG.png", alt="Toggle common rendering emulations.", width="800", height="376" %}
1. Select one of the following from the drop-down list:

   - **prefers-color-scheme: light**. Indicates that the user prefers the light theme.
   - **prefers-color-scheme: dark**. Indicates that the user prefers the dark theme.
   - **Automatic dark mode**. Displays your page in dark mode even if you didn't implement it. Additionally, sets `prefers-color-scheme` to `dark` automatically.

This drop-down is a shortcut for [Emulate CSS media feature `prefers-color-scheme`](/docs/devtools/rendering/apply-effects/#enable-automatic-dark-mode]) and [Enable automatic dark mode](/docs/devtools/rendering/apply-effects/#enable-automatic-dark-mode) options of the **Rendering** tab.

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

{% YouTube id='TuR27BxCRVk' %}

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
4.  **Display Value**. The [RGBA][29], [HSLA][30], [HWBA][31], or [Hex][32] representation of the color.
5.  **Color Palette**. Click one of these squares to change the color to that square.
6.  **Hue**.
7.  **Opacity**.
8.  **Display Value Switcher**. Toggle between the [RGBA][29], [HSLA][30], [HWBA][31], and [Hex][32] representations of the
    current color.
    {% Aside %}
    **Note**: Alternatively, to toggle between color representations, hold down <kbd>Shift</kbd> and click on the color preview button.
    {% endAside %}
9.  **Color Palette Switcher**. Toggle between the [Material Design palette][26], a custom palette,
    or a page colors palette. DevTools generates the page color palette based on the colors that it
    finds in your stylesheets.

#### Sample a color (anywhere) with the Eyedropper {: #eyedropper }

When you open the **Color Picker**, the **Eyedropper**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WKeaXT922ot9wQjtvwcZ.svg", alt="Eyedropper.", width="20", height="20" %} is on by default.

The **Eyedropper** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WKeaXT922ot9wQjtvwcZ.svg", alt="Eyedropper", width="20", height="20" %} can sample colors both from the page and, with a corresponding experiment enabled, from anywhere on the screen:

- Pick a color from the page:

    1.  Hover over the target color in the viewport.
    1.  Click to confirm.

        {% Img src="image/admin/7g1d1iGpJgm98vIHA6pA.png", alt="Using the Eyedropper on the page.", width="800", height="529" %}

    The **Color Picker** shows a current color value of `#212121`, which is close to black. This color changes to the blue that's highlighted in the viewport once you click the blue.

- (Experimental) Pick a color from anywhere on the screen:

    {% Aside %}
    To enable this experimental feature, check **Enable color picking outside the browser window** under {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bGxcjrhJIjemksd4PcbJ.svg", alt="Settings", width="20", height="20" %} **Settings** > **Experiments** and reload DevTools.
    {% endAside %}

    1. Hover over the target color on your screen.
    1. Click to confirm.

       <div class="elevation--2" style="margin-top: 20px; margin-bottom: 20px;">
       {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8Omn8AauWoiknzjzjlGA.png", alt="Using the Eyedropper anywhere on the screen.", width="800", height="450" %}</div>

    The **Color Picker** shows a current color value of `rgb(224 255 255 / 15%)`. This color changes to the pink from outside the browser window once you click the pink.

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

### Change box and text shadows with the Shadow Editor {: #shadow-editor }

{% YouTube id='DAD72grzDDc', startTime=270 %}

The **Shadow Editor** provides a GUI for changing `text-shadow` and `box-shadow` CSS declarations.

To open the **Shadow Editor**:

1. [Select an element][27] with a shadow declaration. For example, select the element below. {: #shadow-element }

    <div class="shadow-box"></div>
    <style>
      .shadow-box {
      width: 200px;
      height: 50px;
      text-align: center;
      text-shadow: 0px 20px 1px #bebebe;
      box-shadow:
          11px 14px 5px 0px #bebebe, inset 0px 20px 7px 0px #dadce0;
      }
      .shadow-box::after {
        content: "I have a shadow!";
      }
    </style>

1. In the **Styles** tab, find a shadow icon next to the `text-shadow` or `box-shadow` declaration.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oDpRxRK9of3pxQFkFwgc.png", alt="Shadow icons", width="800", height="513" %}

   **Figure 29**. The shadow icon to the left of the `text-shadow` and `box-shadow` values.

1. Click the shadow icon to open the **Shadow editor**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Rp36OO9l2xg2dHW1i35t.png", alt="Shadow editor", width="800", height="513" %}

1. Change the shadow properties:
   - **Type** (only for `box-shadow`). Pick **Outset** or **Inset**.
   - **X and Y offsets**. Drag the blue dot or specify values.
   - **Blur**. Drag the slider or specify a value.
   - **Spread** (only for `box-shadow`). Drag the slider or specify a value.
1. Observe the changes applied to the [element](#shadow-element).

### (Experimental) Copy CSS changes {: #copy-css-changes }

{% Aside %}
To enable this experimental feature, check **Sync CSS changes in the Styles pane** under {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bGxcjrhJIjemksd4PcbJ.svg", alt="Settings", width="20", height="20" %} **Settings** > **Experiments** and reload DevTools.
{% endAside %}

With this experiment enabled, the **Styles** pane highlights your CSS changes in green.

To copy a single CSS declaration change, hover over the highlighted declaration and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0vPvwat277ITJphiOtml.svg", alt="Copy.", width="20", height="20" %} **Copy** button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iKzTdyPSLtN5ZkyGATIt.png", alt="Copy a CSS declaration change.", width="800", height="471" %}

To copy all CSS changes across declarations at once, right-click on any declaration and select **Copy all CSS changes**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/odEF8CoGaRuzvVSJcIzo.png", alt="Copy all CSS changes.", width="800", height="471" %}

Additionally, you can [track changes](/docs/devtools/changes/) you make with the **Changes** tab.

[1]: /docs/devtools/css
[2]: /docs/devtools/css#view
[3]: /docs/devtools/javascript/reference#format
[4]: #select
[5]: #computed
[6]: #computed
[7]: https://developer.mozilla.org/docs/Learn/CSS/Introduction_to_CSS/Box_model
[8]: #select
[9]: /docs/devtools/css#pseudostates
[10]: /docs/devtools/command-menu
[11]: /docs/devtools/css/print-preview
[12]: #add-declaration-inline
[13]: #add-declaration-to-rule
[14]: https://developer.mozilla.org/docs/Web/CSS/Specificity#Selector_Types
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
[29]: https://drafts.csswg.org/css-color/#rgb-functions
[30]: https://drafts.csswg.org/css-color/#the-hsl-notation
[31]: https://drafts.csswg.org/css-color/#the-hwb-notation
[32]: https://drafts.csswg.org/css-color/#hex-notation
[33]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
[34]: /blog/auto-dark-theme/
[35]: https://web.dev/prefers-color-scheme/

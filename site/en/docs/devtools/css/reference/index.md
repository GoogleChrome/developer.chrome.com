---
layout: "layouts/doc-post.njk"
title: "CSS features reference"
authors:
  - kaycebasques
  - jecelynyeen
  - sofiayem
date: 2017-06-09
updated: 2022-06-21
description: "Discover new workflows for viewing and changing CSS in Chrome DevTools."
tags:
  - css
---

Discover new workflows in this comprehensive reference of Chrome DevTools features related to
viewing and changing CSS.

See [View and change CSS][1] to learn the basics.

## Select an element {: #select }

The **Elements** panel of DevTools lets you view or change the CSS of one element at a time.

{% Img src="image/admin/Iganvpf9K9dEOpSb6wIA.png", alt="An example of a selected element.", width="800", height="503" %}

The `h1` element that's highlighted blue in the **DOM Tree** above is the selected element.
To the right, the element's styles are shown in the **Styles** pane. To the left, the element is
highlighted in the viewport, but only because the mouse is currently hovering over it in the **DOM
Tree**.

See [View an element's CSS][2] for a tutorial.

There are many ways to select an element:

- In your viewport, right-click the element and select **Inspect**.
- In DevTools, click **Select an element**
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/7HgaRejtWu4NfpPOTtJU.png", alt="Select an element", width="20", height="20" %}
  or press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Mac) or
  <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux), and then click the element in
  the viewport.
- In DevTools, click the element in the **DOM Tree**.
- In DevTools, run a query like `document.querySelector('p')` in the **Console**, right-click the
  result, and then select **Reveal in Elements panel**.

## View CSS {: #view }

Use the **Elements** > **Styles** and **Computed** panes to view CSS rules and [diagnose CSS issues](/docs/devtools/css/issues/).

### Navigate with links {: #links }

The **Styles** pane displays links in various places to various other places, including but not limited to:

- Next to CSS rules, to stylesheets and CSS sources. Such links open the **Sources** panel. If the stylesheet is minified, see [Make a minified file readable][3].
- In the **Inherited from ...** sections, to parent elements.
- In `var()` calls, to [custom property](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties) declarations.
- In `animation` shorthand properties, to `@keyframes`.
- **Learn more** links in documentation tooltips.
- And more.

Here are some of them highlighted:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VIXGDdosRVMxekn5PQip.png", alt="Various links highlighted.", width="800", height="648" %}

Links may be styled differently. If you're not sure if something is a link, try clicking it to find out.

### View tooltips with CSS documentation, specificity, and custom property values {: #tooltips }

#### View CSS documentation {: #view-docs }

To see a tooltip with a short CSS description, hover over the property name in the **Styles** pane.

{% Aside %}
DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data).
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="The tooltip with documentation on a CSS property.", width="800", height="651" %}

Click **Learn more** to go to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this property.

To turn the tooltips off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**.

To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**.

#### View selector specificity {: #selector-specificity }

Hover over a selector to see a tooltip with its [specificity](https://developer.mozilla.org/docs/Web/CSS/Specificity) weight.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uzY4LvyHgWhD8LEPrXju.png", alt="The tooltip with specificity weight of a matched selector.", width="800", height="451" %}

#### View the values of custom properties {: #custom-css }

Hover over a [`--custom-property`](https://developer.mozilla.org/docs/Web/CSS/--*) to see its value in a tooltip.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7cUcqUfywnS2KQdQqWes.png", alt="The value of a custom property in a tooltip.", width="800", height="645" %}

### View invalid, overridden, inactive, and other CSS {: #css-issues }

The **Styles** pane recognizes many kinds of CSS issues and highlights them in different ways.

See [Understand CSS in the Styles pane](/docs/devtools/css/issues/#css-in-styles).

### View only the CSS that's actually applied to an element {: #computed }

The **Styles** pane shows you all of the rules that apply to an element, including declarations that
have been overridden. When you're not interested in overridden declarations, use the **Computed**
tab to view only the CSS that's actually being applied to an element.

1.  [Select an element][4].
2.  Go to the **Computed** pane in the **Elements** panel.

{% Img src="image/admin/QZo3RH4i4zmlurpX8M3B.svg", alt="The Computed tab.", width="800", height="488" %}

Check the **Show All** checkbox to see all properties.

See [Understand CSS in the Computed pane](/docs/devtools/css/issues/#css-in-computed).

### View CSS properties in alphabetical order {: #alphabetical }

Use the **Computed** pane. See [View only the CSS that's actually applied to an element][5].

### View inherited CSS properties {: #inherited }

Check the **Show All** checkbox in the **Computed** pane. See [View only the CSS that's actually
applied to an element][6].

Alternatively, scroll down the **Styles** pane and find sections named `Inherited from <element_name>`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TuWZmbeQlHR6Qp6pUHVP.png", alt="View the Inherited from... section of the Styles pane.", width="800", height="361" %}

### View `@supports` at-rules {: #supports }

The **Styles** pane shows you the `@supports` CSS at-rules if they are applied to an element. For example, inspect the following element:

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

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Lw1ZveiO2lxVFDgylmnC.png", alt="View @supports at-rules.", width="800", height="453" %}

If your browser supports the `lab()` function, the element is green, otherwise it's purple.

{% Aside %}
**Note**: At the time of writing, only Safari [supports the CIELAB color space](https://caniuse.com/?search=lab).
{% endAside %}

### View `@scope` at-rules {: #scope }

The **Styles** pane shows you [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) if they are applied to an element.

The new `@scope` at-rules are a part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow you to scope CSS styles, in other words, explicitly apply styles to specific elements.

{% Aside %}
**Note**: The `@scope` at-rule feature is experimental. To test it, enable the **Experimental Web Platform features** flag in `chrome://flags/#enable-experimental-web-platform-features`. Otherwise, the preview below doesn't work.
{% endAside %}

View the `@scope` rule in the following preview:

{% Codepen {
 user: 'sofiayem',
 id: 'YzaBqOo',
 height: 270,
 allow: ['geolocation']
} %}

1. [Inspect the text][39] on the card in the preview.
1. On the **Styles** pane, find the `@scope` rule.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/W3Ogu3zoFBFUaPN8JDU7.png", alt="The @scope rule.", width="800", height="660" %}

In this example, the `@scope` rule overrides the global CSS `background-color` declaration for all `<p>` elements inside elements with a `card` class.

To edit the `@scope` rule, double-click it.

### View an element's box model {: #box-model }

To view [the box model][7] of an element, go to the **Styles** pane and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ARurwNZrSDIYQwsVPuUC.png", alt="Show sidebar.", width="22", height="20" %} **Show sidebar** button in the action bar.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/m25vYLlffgUxgGJpqvWF.png", alt="he Box Model diagram.", width="800", height="505" %}

To change a value, double-click on it.

### Search and filter an element's CSS {: #filter }

Use the **Filter** text box on the **Styles** and **Computed** panes to search for specific CSS
properties or values.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/dVowC6jA4kBhp8bqARLw.png", alt="Filtering the Styles pane.", width="800", height="505" %}

To also search inherited properties in the **Computed** pane, check the **Show All** checkbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xe0Rwpze9CKabBVXWKgz.png", alt="Filtering inherited properties in the Computed pane.", width="800", height="505" %}

To navigate the **Computed** pane, group the filtered properties in collapsible categories by checking **Group**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LhNHQarq0y1FuhhJduUE.png", alt="Grouping filtered properties.", width="800", height="505" %}

### Toggle a pseudo-class {: #pseudo-class }

To toggle a pseudo-class like `:active`, `:focus`, `:hover`, `:visited`, `:focus-within` or
`focus-visible`:

1.  [Select an element][8].
2.  On the **Elements** panel, go to the **Styles** pane.
3.  Click **:hov**.
4.  Check the pseudo-class that you want to enable.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Tpu0KZakPrbC89KoYNBs.png", alt="Toggling the hover pseudostate on an element.", width="800", height="505" %}

In the viewport, you can see that DevTools applies the `background-color` declaration to the element, even though the element is not actually hovered over.

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

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NAXkykrJcC23cZ1jWCin.png", alt="Cascade layers.", width="800", height="638" %}

To view the layer order, click the layer name or the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gq5kdwO6HBF7cGv8pkCH.svg", alt="Toggle layers.", width="20", height="20" %} **Toggle CSS layers view** button.

The `page` layer has the highest specificity, therefore the element's background is green.

### View a page in print mode {: #print-mode }

To view a page in print mode:

1.  Open the [Command Menu][10].
2.  Start typing `Rendering` and select `Show Rendering`.
3.  For the **Emulate CSS Media** drop-down, select **print**.

### View used and unused CSS with the Coverage tab {: #coverage }

The Coverage tab shows you what CSS a page actually uses.

1.  Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or
    <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, ChromeOS) while DevTools is
    in focus to open the Command Menu.
2.  Start typing `coverage`.

    {% Img src="image/admin/w4EnEqO6dqj8nGQEMq6j.png", alt="Opening the Coverage tab from the Command Menu.", width="800", height="526" %}

2.  Select **Show Coverage**. The Coverage tab appears.

    {% Img src="image/admin/WiWn2DPIl3HGsiM9hxNa.png", alt="The Coverage tab.", width="800", height="575" %}

3.  Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Start Instrumenting Coverage And Reload Page.", width="20", height="20" %} **Reload**.
    The page reloads and the **Coverage** tab provides an overview of how much CSS (and JavaScript) is
    used from each file that the browser loads.

    {% Img src="image/admin/pvGdoYTcYTA5lO0mptQy.png", alt="An overview of how much CSS (and JavaScript) is used and unused.", width="800", height="575" %}

    Green represents used CSS. Red represents unused CSS.

4.  Click a CSS file to see a line-by-line breakdown of what CSS it uses in the preview above.

    {% Img src="image/admin/rA1y59EuQv5COtnFX8d7.png", alt="A line-by-line breakdown of used and unused CSS.", width="800", height="646" %}

    On the screenshot above, lines 55 to 57 and 65 to 67 of `devsite-google-blue.css` are unused, whereas lines 59 to 63 are used.

### Force print preview mode {: #print }

See [Force DevTools Into Print Preview Mode][11].

## Copy CSS {: #copy-css }

From a single drop-down menu in the **Styles** pane, you can copy separate [CSS rules, declarations, properties, values](https://developer.mozilla.org/docs/Learn/CSS/First_steps/What_is_CSS#css_syntax)

Additionally, you can copy CSS properties in JavaScript syntax. This option is handy if you're using [CSS-in-JS](/blog/css-in-js/) libraries.

To copy CSS:

1. [Select an element][15].
1. In the **Elements** > **Styles** pane, right-click a CSS property.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4yGdaGVOMESwoiAiHIj4.png", alt="Copy CSS drop-down menu.", width="800", height="618" %}
1. Select one of the following options from the drop-down menu:

   - **Copy declaration**. Copies the property and its value in CSS syntax:
     ```css
     property: value;
     ```
   - **Copy property**. Copies only the `property` name.
   - **Copy value**. Copies only the `value`.
   - **Copy rule**. Copies the entire CSS rule:
     ```css
     selector[, selector] {
         property: value;
         property: value;
         ...
     }
     ```
   - **Copy declaration as JS**. Copies the property and its value in JavaScript syntax:
     ```js
     propertyInCamelCase: 'value'
     ```
   - **Copy all declarations**. Copies all properties and their values in the CSS rule:
     ```css
     property: value;
     property: value;
     ...
     ```
   - **Copy all declarations as JS**. Copies all properties and their values in JavaScript syntax:
     ```js
     propertyInCamelCase: 'value',
     propertyInCamelCase: 'value',
     ...

     ```
   - **Copy all CSS changes**. [Copies the changes](#copy-css-changes) you make in the **Styles** pane across all declarations.
   - **View computed value**. Takes you to the [**Computed** pane](#computed).

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

   {% Img src="image/admin/aUviBexUPdpxXvUbSUxS.png", alt="Adding inline declarations.", width="800", height="645" %}

   On the screenshot above, the `margin-top` and `background-color` properties have been applied to the selected element. In the **DOM Tree** you can see the declarations reflected in the element's `style` attribute.

#### Add a declaration to a style rule {: #add-declaration-to-rule }

To add a declaration to an existing style rule:

1.  [Select an element][16].
2.  In the **Styles** pane, click between the brackets of the style rule to which you want to add
    the declaration. The cursor focuses, allowing you to enter text.
3.  Enter a property name and press <kbd>Enter</kbd>.
4.  Enter a valid value for that property and press <kbd>Enter</kbd>.

{% Img src="image/admin/dQMFYTxsVz5WxQpuvRga.png", alt="Changing the value of a declaration.", width="800", height="547" %}

On the screenshot above, a style rule gets the new `border-bottom-style:groove` declaration.

### Change a declaration name or value {: #change-declaration }

Double-click a declaration's name or value to change it. See [Change enumerable values with
keyboard shortcuts][17] for shortcuts for quickly incrementing or decrementing a value by 0.1, 1,
10, or 100 units.

### Change enumerable values with keyboard shortcuts {: #values-shortcuts }

While editing an enumerable value of a declaration, for example, `font-size`, you can use the following keyboard shortcuts to increment the value by a fixed amount:

- <kbd>Option</kbd>+<kbd>Up</kbd> (Mac) or <kbd>Alt</kbd>+<kbd>Up</kbd> (Windows, Linux) to
  increment by 0.1.
- <kbd>Up</kbd> to change the value by 1, or by 0.1 if the current value is between -1 and 1.
- <kbd>Shift</kbd>+<kbd>Up</kbd> to increment by 10.
- <kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>Up</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>Page Up</kbd>
  (Windows, Linux) to increment the value by 100.

Decrementing also works. Just replace each instance of <kbd>Up</kbd> mentioned above with
<kbd>Down</kbd>.

### Change length values {: #change-length-value }

You can use your pointer to change any property with length, such as width, height, padding, margin, or border.

To change the length unit:

1. Hover over the unit name and notice that it's underlined.
1. Click on the unit name to select a unit from the drop-down.

   <div style="margin-top: 20px;">
   {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/vWiU9o1DxsOpWXM0SrBa.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}</div>

To change the length value:

1. Hover over the unit value and notice that your pointer changes to a horizontal double-headed arrow.
1. Drag horizontally to increase or decrease the value.

   <div style="margin-top: 20px;">
   {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/nbvRDPyARJmdTeB9ajOq.mp4", autoplay="true", muted="true", loop="true", controls="true",class="screenshot" %}</div>

To adjust the value by 10, hold <kbd>Shift</kbd> when dragging.

### Add a class to an element {: #add-class }

To add a class to an element:

1.  [Select the element][18] in the **DOM Tree**.
2.  Click **.cls**.
3.  Enter the name of the class in the **Add New Class** text box.
4.  Press <kbd>Enter</kbd>.

{% Img src="image/admin/US4gZWGNdDcz4MswYkV3.svg", alt="The Element Classes pane.", width="800", height="460" %}

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
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YihNsXarRhDgEi9rOT4H.svg", alt="New Style Rule.", width="20", height="20" %}. DevTools inserts a
    new rule beneath the **element.style** rule.

{% Img src="image/admin/yAkLVkP6eeeBihslr7oy.png", alt="Adding a new style rule.", width="800", height="599" %}

On the screenshot above, DevTools adds the `h1.devsite-page-title` style rule after clicking **New Style Rule**.

#### Choose which stylesheet to add a rule to {: #style-rule-stylesheet }

When [adding a new style rule][22], click and hold **New Style Rule**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YihNsXarRhDgEi9rOT4H.svg", alt="New Style Rule.", width="20", height="20" %} to choose which stylesheet
to add the style rule to.

{% Img src="image/admin/QEehBhl9E7tfEwyfdWgO.png", alt="Choosing a stylesheet.", width="800", height="599" %}

### Toggle a declaration {: #toggle-declaration }

To toggle a single declaration on or off:

1.  [Select an element][23].
2.  In the **Styles** pane, hover over the rule that defines the declaration. Checkboxes appear next
    to each declaration.
3.  Check or uncheck the checkbox next to the declaration. When you uncheck a declaration, DevTools
    crosses it out to indicate that it's no longer active.

{% Img src="image/admin/Z36P2RuDUFAFIp8kTZ6N.png", alt="Toggling a declaration.", width="800", height="608" %}

On the screenshot above, the `color` property for the currently-selected element is toggled off.

### Align grid items and their content with the Grid Editor {: #grid-editor }

See the corresponding [section in Inspect CSS grid](/docs/devtools/css/grid/#grid-editor).

### Change colors with the Color Picker {: #color-picker }

See [Inspect and debug HD and non-HD colors with the Color Picker](/docs/devtools/css/color).

### Change angle value with the Angle Clock {: #angle-clock }

The **Angle Clock** provides a GUI for changing `<angle>`s in CSS property values.

To open the **Angle Clock**:

1.  [Select an element][27] with angle declaration. For example, select the text below.
2.  In the **Styles** pane, find the `transform` or `background` declaration that you want to change.
    Click on the **Angle Preview** box next to the angle value.

    {% Img src="image/admin/EjXqoXmADgOgKMRQSBsP.png", alt="Angle preview.", width="800", height="661" %}

    The small clocks to the left of `-5deg` and `0.25turn` are the angle previews.

3.  Click the preview to open the **Angle Clock**.

    {% Img src="image/admin/CykQzGfW2DfCt2VUmTcR.png", alt="Angle clock.", width="800", height="723" %}

4.  Change the angle value by clicking on the **Angle Clock** circle or scroll your mouse to
    increase / decrease the angle value by 1.
5.  There are more keyboard shortcuts to change the angle value. Find out more in the [Styles pane
    keyboard shortcuts][28].

### Change box and text shadows with the Shadow Editor {: #shadow-editor }

{% YouTube id='DAD72grzDDc', startTime=270 %}

The **Shadow Editor** provides a GUI for changing `text-shadow` and `box-shadow` CSS declarations.

To change shadows with the **Shadow Editor**:

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

1. In the **Styles** pane, find a shadow {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7cunvJgztQzUZabOjseC.png", alt="Shadow.", width="24", height="24" %} icon next to the `text-shadow` or `box-shadow` declaration.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oDpRxRK9of3pxQFkFwgc.png", alt="Shadow icons.", width="800", height="513" %}

1. Click the shadow icon to open the **Shadow editor**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Rp36OO9l2xg2dHW1i35t.png", alt="Shadow editor.", width="800", height="513" %}

1. Change the shadow properties:
   - **Type** (only for `box-shadow`). Pick **Outset** or **Inset**.
   - **X and Y offsets**. Drag the blue dot or specify values.
   - **Blur**. Drag the slider or specify a value.
   - **Spread** (only for `box-shadow`). Drag the slider or specify a value.
1. Observe the changes applied to the [element](#shadow-element).

### Edit animation and transition timings with the Easing Editor {: #edit-easing }

The **Easing Editor** provides a GUI for changing the easing values of [`transition-timing-function`][36] and [`animation-timing-function`][37].

To change the values with the **Easing Editor**:

1. [Select an element][27] with a timing function declaration, like the `<body>` element on this page.
1. In the **Styles** tab, find the purple {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U0vVF9a5jrj948Gegu6o.png", alt="Ease.", width="22", height="22" %} icon next to the `transition-timing-function` or `animation-timing-function` declarations.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ulG0cDcH3SnYS13kJbuB.png", alt="Ease icon.", width="800", height="434" %}
1. Click the icon to open the **Easing Editor**:
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JujOC1By7NK2YzfHT7lD.png", alt="The Easing Editor.", width="800", height="584" %}
1. To set a [keyword value][38], click one of the picker buttons:
   - **ease-in-out** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/a0WRju7wMXvxVXiCqFuc.png", alt="The ease-in-out button.", width="24", height="24" %}
   - **ease-in** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3kjLNBHixVNDmxarpnqF.png", alt="The ease-in button.", width="24", height="24" %}
   - **ease-out** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jlueFxpe3WZ05X2lxp20.png", alt="The ease-out button.", width="24", height="24" %}
1. In the **Presets switcher**, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/79O9ggoDdHGLL73Q1tdG.svg", alt="Left.", width="24", height="24" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/19mp1EDARktd9LnrvI5L.svg", alt="Right.", width="24", height="24" %} buttons to pick one of the following presets:

<table>
<thead>
  <tr>
    <th>Easing type</th>
    <th>Preset</th>
    <th>Bezier equivalent</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="5">ease-in-out</td>
    <td>In Out, Sine</td>
    <td><code>cubic-bezier(0.45, 0.05, 0.55, 0.95)</code></td>
  </tr>
  <tr>
    <td>In Out, Quadratic</td>
    <td><code>cubic-bezier(0.46, 0.03, 0.52, 0.96)</code></td>
  </tr>
  <tr>
    <td>In Out, Cubic</td>
    <td><code>cubic-bezier(0.65, 0.05, 0.36, 1)</code></td>
  </tr>
  <tr>
    <td>Fast Out, Slow In</td>
    <td><code>cubic-bezier(0.4, 0, 0.2, 1)</code></td>
  </tr>
  <tr>
    <td>In Out, Back</td>
    <td><code>cubic-bezier(0.68, -0.55, 0.27, 1.55)</code></td>
  </tr>
  <tr>
    <td rowspan="5">ease-in</td>
    <td>In, Sine</td>
    <td><code>cubic-bezier(0.47, 0, 0.75, 0.72)</code></td>
  </tr>
  <tr>
    <td>In, Quadratic</td>
    <td><code>cubic-bezier(0.55, 0.09, 0.68, 0.53)</code></td>
  </tr>
  <tr>
    <td>In, Cubic</td>
    <td><code>cubic-bezier(0.55, 0.06, 0.68, 0.19)</code></td>
  </tr>
  <tr>
    <td>In, Back</td>
    <td><code>cubic-bezier(0.6, -0.28, 0.74, 0.05)</code></td>
  </tr>
  <tr>
    <td>Fast Out, Linear In</td>
    <td><code>cubic-bezier(0.4, 0, 1, 1)</code></td>
  </tr>
  <tr>
    <td rowspan="5">ease-out</td>
    <td>Out, Sine</td>
    <td><code>cubic-bezier(0.39, 0.58, 0.57, 1)</code></td>
  </tr>
  <tr>
    <td>Out, Quadratic</td>
    <td><code>cubic-bezier(0.25, 0.46, 0.45, 0.94)</code></td>
  </tr>
  <tr>
    <td>Out, Cubic</td>
    <td><code>cubic-bezier(0.22, 0.61, 0.36, 1)</code></td>
  </tr>
  <tr>
    <td>Linear Out, Slow In</td>
    <td><code>cubic-bezier(0, 0, 0.2, 1)</code></td>
  </tr>
  <tr>
    <td>Out, Back</td>
    <td><code>cubic-bezier(0.18, 0.89, 0.32, 1.28)</code></td>
  </tr>
</tbody>
</table>

Alternatively, in the **Curve editor**, drag the purple circles to set a custom [`cubic-bezier(x1,y1,x2,y2)`](https://developer.mozilla.org/docs/Glossary/Bezier_curve) value.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrpIeYlQURppXdbUXV6C.png", alt="Curve editor.", width="800", height="584" %}

Any change triggers a ball animation in the **Preview** at the top of editor.

## (Experimental) Copy CSS changes {: #copy-css-changes }

{% Aside %}
To enable this experimental feature, check **Sync CSS changes in the Styles pane** under {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bGxcjrhJIjemksd4PcbJ.svg", alt="Settings.", width="20", height="20" %} **Settings** > **Experiments** and reload DevTools.
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
[33]: https://developer.mozilla.org/docs/Web/CSS/Pseudo-elements
[34]: /blog/auto-dark-theme/
[35]: https://web.dev/prefers-color-scheme/
[36]: https://developer.mozilla.org/docs/Web/CSS/transition-timing-function
[37]: https://developer.mozilla.org/docs/Web/CSS/animation-timing-function
[38]: https://developer.mozilla.org/docs/Web/CSS/animation-timing-function#values
[39]: /docs/devtools/open/#elements

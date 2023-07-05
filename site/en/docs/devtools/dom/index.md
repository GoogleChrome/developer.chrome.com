---
layout: "layouts/doc-post.njk"
title: "Get started with viewing and changing the DOM"
date: 2019-03-01
updated: 2023-04-03
description: "How to view nodes, search for nodes, edit nodes, reference nodes in the Console, break on node changes, and more."
authors:
  - kaycebasques
  - sofiayem
tags:
  - get-started
  - prototype-fixes
  - html
  - dom
---

Complete these interactive tutorials to learn the basics of viewing and
changing a page's DOM using Chrome DevTools.

This tutorial assumes that you know the difference between the DOM and HTML. See
[Appendix: HTML versus the DOM](#appendix) for an explanation.

## View DOM nodes {: #view }

The DOM Tree of the Elements panel is where you do all DOM-related activities in DevTools.

### Inspect a node {: #inspect }

When you're interested in a particular DOM node, **Inspect** is a fast way to open DevTools
and investigate that node.

1. Right-click **Michelangelo** below and select **Inspect**.
     * Michelangelo
     * Raphael
     {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/psbHIPohm8wsZkGA7WXl.png", alt="Inspecting a node", width="800", height="780" %}
     The **Elements** panel of DevTools opens.
     `<li>Michelangelo</li>` is highlighted in the **DOM Tree**.
     {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Cz2LKMmJ3sVjkDdfW4i8.png", alt="Highlighting the Michelangelo< node", width="800", height="483" %}
1. Click the **Inspect** icon in the top-left corner of
   DevTools.
   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2canqdvrgnHBayY1VsLM.png", alt="The Inspect icon", width="800", height="545" %}
1. Click the **Tokyo** text below.
     * Tokyo
     * Beirut

     Now, `<li>Tokyo</li>` is highlighted in the DOM Tree.

Inspecting a node is also the first step towards viewing and changing a node's styles.
See [Get Started With Viewing And Changing CSS](/docs/devtools/css/).

### Navigate the DOM Tree with a keyboard {: #keynav }

Once you've selected a node in the DOM Tree, you can navigate the DOM Tree with your
keyboard.

1. Right-click **Ringo** below and select **Inspect**. `<li>Ringo</li>` is selected in
   the DOM Tree.

     * George
     * Ringo
     * Paul
     * John

     {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/6hDrHKpnSMFwCdugWuXR.png", alt="Inspecting the Ringo node", width="800", height="545" %}

1. Press the <kbd>Up</kbd> arrow key 2 times. `<ul>` is selected.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2rwp1VpNq4vDNAM0Q9hR.png", alt="Inspecting the ul node", width="800", height="545" %}

1. Press the <kbd>Left</kbd> arrow key. The `<ul>` list collapses.
1. Press the <kbd>Left</kbd> arrow key again. The parent of the `<ul>` node
   is selected. In this case it's the `<li>` node containing the instructions for step 1.
1. Press the <kbd>Down</kbd> arrow key 3 times so that you've re-selected the `<ul>`
   list that you just collapsed. It should look like this: `<ul>...</ul>`
1. Press the <kbd>Right</kbd> arrow key. The list expands.

### Scroll into view {: #scroll1 }

When viewing the DOM Tree, sometimes you'll find yourself interested in a DOM node that's
not currently in the viewport. For example, suppose that you scrolled to the bottom of the
page, and you're interested in the `<h1>` node at the top of the page. **Scroll into view**
lets you quickly reposition the viewport so that you can see the node.

1. Right-click **Magritte** below and select **Inspect**.

     * Magritte
     * Soutine

1. Go to the [Appendix: Scroll into view](#scroll2) section at the bottom of this page.
   The instructions continue there.

After completing the instructions at the bottom of the page you should jump back up to here.

### Show rulers {: #rulers }

With rulers above and to the left of your viewport, you can measure the width and height of an element when you hover over it in the **Elements** panel.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DsBqSHZFNeUcr1a1oKd7.png", alt="Rulers.", width="800", height="552" %}

Enable the rulers in one of two ways:

- Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the **Command menu**, type `Show rulers on hover`, and press <kbd>Enter</kbd>.
- Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Preferences** > **Elements** > **Show rulers on hover**.

The sizing unit of the rulers is pixels.

### Search for nodes {: #search }

You can search the DOM Tree by string, CSS selector, or XPath selector.

1. Focus your cursor on the **Elements** panel.
1. Press <kbd>Control</kbd>+<kbd>F</kbd> or <kbd>Command</kbd>+<kbd>F</kbd> (Mac).
   The Search bar opens at the bottom of the DOM Tree.
1. Type `The Moon is a Harsh Mistress`. The last sentence is highlighted in the DOM Tree.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/qigo04bdlo2evHazfIAp.png", alt="Highlighting the query in the Search bar", width="800", height="545" %}

As mentioned above, the Search bar also supports CSS and XPath selectors.

The **Elements** panel selects the first matching result in the DOM tree and rolls it into view in the viewport. By default, this happens as you type. If you always work with long search queries, you can make DevTools run search only when you press <kbd>Enter</kbd>.

To avoid unnecessary jumps between nodes, clear the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Preferences** > **Global** > **Search as you type** checkbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BKcshLBj0EI1OahoEXbS.png", alt="Cleared Search as you type checkbox in Settings.", width="800", height="425" %}

## Edit the DOM {: #edit }

You can edit the DOM on the fly and see how those changes affect the page.

### Edit content {: #content }

To edit a node's content, double-click the content in the DOM Tree.

1. Right-click **Michelle** below and select **Inspect**.

     * Fry
     * Michelle

1. In the DOM Tree, double-click `Michelle`. In other words, double-click the text between
   `<li>` and `</li>`. The text is highlighted blue to indicate that it's selected.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/6izVzx17nim6eDn96Vhd.png", alt="Editing the text", width="800", height="545" %}

1. Delete `Michelle`, type `Leela`, then press <kbd>Enter</kbd> to confirm the change. The text
   above changes from **Michelle** to **Leela**.

### Edit attributes {: #attributes }

To edit attributes, double-click the attribute name or value. Follow the instructions
below to learn how to add attributes to a node.

1. Right-click **Howard** below and select **Inspect**.

     * Howard
     * Vince

1. Double-click `<li>`. The text is highlighted to indicate that the
   node is selected.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/U5cgUXHsZ3H9vnL9TmQ0.png", alt="Editing the node", width="800", height="545" %}

1. Press the <kbd>Right</kbd> arrow key, add a space, type
   `style="background-color:gold"`, and then press <kbd>Enter</kbd>. The background color
   of the node changes to gold.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/7SKDEvndWzq2KPSketg1.png", alt="Adding a style attribute to the node", width="800", height="545" %}

You can also use the **Edit attribute** right-click option.

{% Img src="image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/3OB9C2lU8bm77eTsDXxB.png", alt="Right-click options with edit attribute highlighted.", width="260", height="464" %}

### Edit node type {: #type }

To edit a node's type, double-click the type and then type in the new type.

1. Right-click **Hank** below and select **Inspect**.

     * Dean
     * Hank
     * Thaddeus
     * Brock

1. Double-click `<li>`. The text `li` is highlighted.
1. Delete `li`, type `button`, then press <kbd>Enter</kbd>. The `<li>` node changes to a `<button>`
   node.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nbdyNWefo9fqESvfWdha.png", alt="Changing the node type to button", width="800", height="545" %}

### Edit as HTML {: #as-html }

To edit nodes as HTML with syntax highlighting and autocomplete, select **Edit as HTML** from the node's drop-down menu.

1. Right-click **Leonard** below and select **Inspect**.

     * Penny
     * Howard
     * Rajesh
     * Leonard

1. In the **Elements** panel, right-click the current node and select **Edit as HTML** from the drop-down menu.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2If7eY0I3aNpQcb1fAZg.png", alt="The drop-down menu of a node.", width="800", height="747" %}

1. Press <kbd>Enter</kbd> to start a new line and start typing `<l`. DevTool highlights HTML syntax and autocompletes tags for you.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/B7kQKGGUGf3S2ERmF5dc.png", alt="Autocompletion of HTML tags.", width="800", height="645" %}

    {% Aside %}
    **Note**: Additionally, DevTools can autocomplete DOM properties.
    {% endAside %}

1. Select the `li` element from the autocomplete menu and type `>`. DevTools automatically adds the closing `</li>` tag after the cursor.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/26XrzZDhuvL4KcUGDSvU.png", alt="DevTools closes the tag automatically.", width="800", height="678" %}

1. Type `Sheldon` inside the tag and press <kbd>Control</kbd> / <kbd>Command</kbd> + <kbd>Enter</kbd> to apply changes.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/unvKWSLDvzoh7kHZoWbK.png", alt="Applying changes.", width="800", height="678" %}

### Duplicate a node {: #duplicate }

You can duplicate an element using the **Duplicate element** right-click option.

1. Right-click **Nana** below and select **Inspect**.

    * Bonfire of the Vanities
    * Nana
    * Orlando
    * White Noise

1. In the **Elements** panel, right-click `<li>Nana</li>` and select **Duplicate element** from the drop-down menu.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/u3iK5J8RvHmLY4G6OfJe.png", alt="The Duplicate element option highlighted in the drop-down.", width="800", height="663" %}

1. Return to the page. The list item has been instantly duplicated.

You can also use the keyboard shortcuts: <kbd>Shift + Alt + Down</kbd> arrow (Windows and Linux) and <kbd>Shift + Option + Down</kbd> arrow (MacOS).

### Capture a node screenshot {: #screenshot }

You can screenshot any individual node in the DOM Tree using **Capture node screenshot**.

1. Right-click any image on this page and select **Inspect**.

1. In the **Elements** panel, right-click the image URL and select **Capture node screenshot** from the drop-down menu.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HcMn8iVlx1e53ceGST23.png", alt="A node screenshot being captured.", width="800", height="663" %}

1. The screenshot will be saved to your downloads.

   {% Img src="image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/uIMeY1flDrlSBhvYqU5b.png", alt="Node screenshot saved to downloads.", width="800", height="296", class="screenshot" %}

### Reorder DOM nodes {: #reorder }

Drag nodes to reorder them.

1. Right-click **Elvis Presley** below and select **Inspect**. Notice that it's the last item
   in the list.

     <ul>
       <li>Stevie Wonder</li>
       <li>Tom Waits</li>
       <li>Chris Thile</li>
       <li>Elvis Presley</li>
     </ul>

1. In the DOM Tree, drag `<li>Elvis Presley</li>` to the top of the list.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/qD6OQFkcxcKkOZJxHlqB.png", alt="Dragging the node to the top of the list", width="800", height="592" %}

### Force state {: #state }

You can force nodes to remain in states like `:active`, `:hover`, `:focus`,
`:visited`, and `:focus-within`.

<style>
  .demo--hover:hover {
    background-color: orange;
  }
</style>

1. Hover over **The Lord of the Flies** below. The background color becomes orange.

     <ul>
       <li class="demo--hover">The Lord of the Flies</li>
       <li>Crime and Punishment</li>
       <li>Moby Dick</li>
     </ul>

1. Right-click **The Lord of the Flies** above and select **Inspect**.

1. Right-click `<li class="demo--hover">The Lord of the Flies</li>` and select **Force
   State** > **:hover**. See [Appendix: Missing options](#options) if you don't see this option.
   The background color remains orange even though you're not actually hovering over the node.

[more]: /web/tools/chrome-devtools/dom/imgs/more-actions.png

### Hide a node {: #hide }

Press <kbd>H</kbd> to hide a node.

1. Right-click **The Stars My Destination** below and select **Inspect**.

     * The Count of Monte Cristo
     * The Stars My Destination

1. Press the <kbd>H</kbd> key. The node is hidden. You can also right-click the node and use the **Hide element** option.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ynrZooiPHy2DUBbdGL3k.png", alt="What the node looks like in the DOM Tree after it's hidden", width="800", height="545" %}

1. Press the <kbd>H</kbd> key again. The node is shown again.

### Delete a node {: #delete }

Press <kbd>Delete</kbd> to delete a node.

1. Right-click **Foundation** below and select **Inspect**.

     * The Illustrated Man
     * Through the Looking-Glass
     * Foundation

1. Press the <kbd>Delete</kbd> key. The node is deleted. You can also right-click the node and use the **Delete element** option.
1. Press <kbd>Control</kbd>+<kbd>Z</kbd> or <kbd>Command</kbd>+<kbd>Z</kbd> (Mac).
   The last action is undone and the node reappears.

## Access nodes in the Console {: #console }

DevTools provides a few shortcuts for accessing DOM nodes from the Console, or getting
JavaScript references to them.

### Reference the currently-selected node with $0 {: #current }

When you inspect a node, the `== $0` text next to the node means that you can reference this
node in the Console with the variable `$0`.

1. Right-click **The Left Hand of Darkness** below and select **Inspect**.

     * The Left Hand of Darkness
     * Dune

1. Press the <kbd>Escape</kbd> key to open the Console Drawer.
1. Type `$0` and press the <kbd>Enter</kbd> key. The result of the expression shows that
   `$0` evaluates to `<li>The Left Hand of Darkness</li>`.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/y3AQHZHbv25cRX1AJt4E.png", alt="The result of the first $0 expression in the Console", width="800", height="636" %}

1. Hover over the result. The node is highlighted in the viewport.
1. Click `<li>Dune</li>` in the DOM Tree, type `$0` in the Console again, and then press
   <kbd>Enter</kbd> again. Now, `$0` evaluates to `<li>Dune</li>`.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/AJpUgl9zL9w4skXkaDEE.png", alt="The result of the second $0 expression in the Console", width="800", height="636" %}

### Store as global variable {: #global }

If you need to refer back to a node many times, store it as a global variable.

1. Right-click **The Big Sleep** below and select **Inspect**.

     * The Big Sleep
     * The Long Goodbye

1. Right-click `<li>The Big Sleep</li>` in the DOM Tree and select **Store as global
   variable**. See [Appendix: Missing options](#options) if you don't see this option.
1. Type `temp1` in the Console and then press <kbd>Enter</kbd>. The result of the expression
   shows that the variable evaluates to the node.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hDCScCM1db0EnAM0VYAZ.png", alt="The result of the temp1 expression", width="800", height="636" %}

### Copy JS path {: #path }

Copy the JavaScript path to a node when you need to reference it in an automated test.

1. Right-click **The Brothers Karamazov** below and select **Inspect**.

     * The Brothers Karamazov
     * Crime and Punishment

1. Right-click `<li>The Brothers Karamazov</li>` in the DOM Tree and select
   **Copy** > **Copy JS Path**. A `document.querySelector()` expression that resolves to the
   node has been copied to your clipboard.
1. Press <kbd>Control</kbd>+<kbd>V</kbd> or <kbd>Command</kbd>+<kbd>V</kbd> (Mac) to
   paste the expression into the Console.
1. Press <kbd>Enter</kbd> to evaluate the expression.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/r2zpHdCY7TQ0mMzRg3Ov.png", alt="The result of the Copy JS Path expression", width="800", height="636" %}

## Break on DOM changes {: #breakpoints }

DevTools allows you to pause a page's JavaScript when the JavaScript modifies the DOM.
See [DOM change breakpoints](/docs/devtools/javascript/breakpoints/#dom).

<!--

TODO(kaycebasques): On developers.google.com/web we interactive tutorials that required JS
embedded directly into the page but we can't do that anymore --- 2021 March 11

https://github.com/google/WebFundamentals/blob/f9bd5c30d9cee69556ca15daf14fea29f87c3161/src/content/en/tools/chrome-devtools/dom/index.md

-->

## Next steps {: #next }

[shortcuts]: /docs/devtools/shortcuts#elements

That covers most of the DOM-related features in DevTools. You can discover the rest of them
by right-clicking nodes in the DOM Tree and experimenting with the other options that weren't
covered in this tutorial. See also [Elements panel keyboard shortcuts][shortcuts].

Check out the [Chrome DevTools homepage](/docs/devtools/) to discover everything
else you can do with DevTools.

See [Community](/docs/devtools/overview/#community) if you want to contact the DevTools team
or get help from the DevTools community.

## Appendix: HTML versus the DOM {: #appendix }

This section quickly explains the difference between HTML and the DOM.

When you use a web browser to request a page like `https://example.com` the server
returns HTML like this:

```html
<!doctype html>
<html>
  <head>
    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is a hypertext document on the World Wide Web.</p>
    <script src="/script.js" async></script>
  </body>
</html>
```

The browser parses the HTML and creates a tree of objects like this:

```text
html
  head
    title
  body
    h1
    p
    script
```

This tree of objects, or nodes, representing the page's content is called the DOM.
Right now it looks the same as the HTML, but suppose that the script referenced at the
bottom of the HTML runs this code:

```js
const h1 = document.querySelector('h1');
h1.parentElement.removeChild(h1);
const p = document.createElement('p');
p.textContent = 'Wildcard!';
document.body.appendChild(p);
```

That code removes the `h1` node and adds another `p` node to the DOM. The complete DOM now looks
like this:

```text
html
  head
    title
  body
    p
    script
    p
```

The page's HTML is now different than its DOM. In other words, HTML represents
initial page content, and the DOM represents current page content. When JavaScript
adds, removes, or edits nodes, the DOM becomes different than the HTML.

[mdn]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction

See [Introduction to the DOM][mdn]{: .external } to learn more.

## Appendix: Scroll into view {: #scroll2 }

This is a continuation of the [Scroll into view](#scroll1) section. Follow the
instructions below to complete the section.

1. The `<li>Magritte</li>` node should still be selected in your DOM Tree. If not, go back to
   [Scroll into view](#scroll1) and start over.
1. Right-click the `<li>Magritte</li>` node and select **Scroll into view**. Your viewport scrolls
   back up so that you can see the **Magritte** node.
   See [Appendix: Missing options](#options) if you can't see the **Scroll into view** option.

   {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FBb3y3CzDXA5P0sNEuyd.png", alt="Scroll into view", width="800", height="603" %}

## Appendix: Missing options {: #options }

Many of the instructions in this tutorial instruct you to right-click a node in the DOM Tree
and then select an option from the context menu that pops up. If you don't see the specified
option in the context menu, try right-clicking away from the node text.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/t4SYwbs3B0dqdnS2WSC2.png", alt="Where to click if you're not seeing all the options", width="800", height="545" %}

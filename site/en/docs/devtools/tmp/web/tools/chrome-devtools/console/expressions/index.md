---
layout: "layouts/doc-post.njk"
title: "Evaluate Expressions"
authors:
  - megginkearney
  - josephmedley
date: 2015-04-13
updated: 2020-07-10
description: "Explore the state of any item on your page from the DevTools console."
---

!!!.aside.aside--warning

This page is deprecated.

!!!

Explore the state of any item on your page from the DevTools console using one of its evaluation
capabilities.

The DevTools console allows you to learn the state of items in your page in an ad-hoc manner.
Evaluate any expression you can type using a combination of your knowledge of JavaScript and several
features that support it.

## TL;DR {: #tldr }

- Evaluate an expression just by typing it.
- Select elements using one of the shortcuts.
- Inspect DOM elements and JavaScript heap objects using `inspect()`.
- Access recently selected elements and objects using \$0 - 4.

## Navigate expressions {: #navigate_expressions }

The console evaluates any JavaScript expression you provide when pressing
<kbd class="kbd">Enter</kbd>. As you type an expression, property name suggestions appear; the
console also provides auto-completion and tab-completion.

If there are multiple matches, <kbd class="kbd">↑</kbd> and <kbd class="kbd">↓</kbd> cycles through
them. Pressing <kbd class="kbd">→</kbd> selects the current suggestion. If there's a single
suggestion, <kbd class="kbd">Tab</kbd> selects it.

{% Img src="image/admin/eUU41EnhNvdBKwx4yMhr.png", alt="Simple expressions in the console.", width="800", height="251" %}

## Select elements {: #select_elements }

Use the following shortcuts to select elements:

<table class="responsive"><thead><tr><th colspan="2">Shortcut &amp; Description</th></tr></thead><tbody><tr><td data-th="Shortcut">$()</td><td data-th="Description">Returns the first element that matches the specified CSS selector. Shortcut for <code translate="no" dir="ltr">document.querySelector()</code>.</td></tr><tr><td data-th="Shortcut">$$()</td><td data-th="Description">Returns an array of all the elements that match the specified CSS selector. Alias for <code translate="no" dir="ltr">document.querySelectorAll()</code>.</td></tr><tr><td data-th="Shortcut">$x()</td><td data-th="Description">Returns an array of elements that match the specified XPath.</td></tr></tbody></table>

Examples of target selection:

```js
$('code') // Returns the first code element in the document.
$$('figure') // Returns an array of all figure elements in the document.
$x('html/body/p') // Returns an array of all paragraphs in the document body.
```

## Inspect DOM elements and JavaScript heap objects {: #inspect_dom_elements_and_javascript_heap_objects }

The `inspect()` function takes a DOM element or JavaScript reference as a parameter. If you provide
a DOM element, the DevTools goes to the Elements panel and displays that element. If you provide a
JavaScript reference, then it goes to the Profile panel.

When this code executes in your console on this page, it grabs this figure and displays it on the
Elements panel. This takes advantage of the `$_` property to get the output of the last evaluated
expression.

```js
$('[data-target="inspecting-dom-elements-example"]')
inspect($_)
```

## Access recently selected elements and objects {: #access_recently_selected_elements_and_objects }

The console stores the last five used elements and objects in variables for easy access. Use
$0 - 4, to access these elements from within the console. Remember computers begin counting from 0; this means the latest item is $0
and the oldest item is \$4.

---
layout: "layouts/doc-post.njk"
title: "View the properties of DOM objects"
date: 2022-05-05
#updated: YYYY-MM-DD
description: "View and filter properties of DOM objects."
authors:
  - sofiayem
tags:
  - dom
---

Use the **Elements** > **Properties** pane to browse and filter properties of [DOM][1] objects.

## Open the Properties pane {: #view-properties }

To open the **Properties** pane, follow these steps:

1. [Open DevTools](/docs/devtools/open). By default, the **Elements** panel opens.
1. In the DOM tree, select a node.
1. Open the **Properties** tab. If you can't see the tab, click **More** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iMilAleSjckpicMkG6dM.svg", alt="More", width="20", height="20" %}, then select it from the drop-down menu.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2RCwQPvXwvRO2pkiNCsQ.png", alt="Elements > Properties", width="800", height="397" %}

## Spot own properties {: #spot-own-properties }

The **Properties** pane sorts and displays the object's [own properties](#own-and-inherited) first and in bold font.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NzruyEz6abYfGwIAxoku.png", alt="ALT_TEXT_HERE", width="800", height="455" %}

## Find the origin of an inherited property {: #origin-of-inherited-property }

The **Properties** pane evaluates accessors on built-in elements and displays them on the object as [inherited](#own-and-inherited) and in regular font.

To find the origin of an inherited property, expand an object, then its `[[Prototype]]`, then the nested `[[Prototype]]`, and so on.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BBXkuc1QsZau4tLbZ3s2.png", alt="Tracing the size property up to its getter on the prototype chain.", width="800", height="619" %}

In this example, you can trace where the inherited `size` property came from by locating the original own (bold) property on the prototype chain together with the corresponding getter.

Additionally, prototype-specific properties are shown only on prototypes, not on objects. This makes it easier to diagnose objects.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZbBp2o5zGUOzIc46Xsvi.png", alt="Prototype-specific properties.", width="800", height="455" %}

## Filter properties {: #filter-properties }

To quickly find a property, start typing its name or value in the **Filter** textbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kuYMOi8wXUNTQEiGmGQ3.png", alt="Filter", width="800", height="317" %}

## Show all properties {: #show-all }

By default, the **Properties** pane doesn't show properties with `null` and `undefined` values.

To see all properties, check **Show all**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/k1m66AHOWpw2m96YO64u.png", alt="Properties with null values.", width="800", height="437" %}

## Understand properties {: #understand-properties }

The **Elements** > **Properties** pane shows a variety of properties.

### Simple properties {: #simple-properties }

Simple properties are pairs of `<name>: <value>`.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZmYdzL6Ba28qSYVNt9wQ.png", alt="Simple properties.", width="800", height="322" %}

### Objects and arrays {: #objects-and-arrays }

Collapsible ({% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tFA9uWBcDgv8NNS1FlRm.svg", alt="Arrow right.", width="20", height="20" %}) properties are objects `{}` or arrays `[]`.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/p4tuMj2RjFpieyANV7s1.png", alt="Collapsible properties.", width="800", height="437" %}

For more information on inspecting JavaScript objects, see [Inspect object properties](/docs/devtools/console/reference/#inspect-object-properties).

### Properties that correspond to DOM nodes {: #dom-nodes }

Properties that correspond to DOM nodes are links. Click on a link to select the relevant node in the DOM tree.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2gmf2oRmCAEY3IALwaSY.png", alt="Link to the head DOM node.", width="800", height="401" %}

### Own and inherited properties {: #own-and-inherited }

Properties in bold font are object's own. They are defined directly on the object.

Properties in regular font are inherited from the prototype chain. To show them to you, DevTools evaluates relevant accessors on built-in HTML elements.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HTNE3zZQNBOKCvR3opTC.png", alt="Own and inherited properties.", width="800", height="405" %}
DevTools sorts own properties first to make them easier to spot.

### Enumerable and non-enumerable properties {: #enumerable-and-non-enumerable }

Enumerable properties are bright in color. Non-enumerable properties are muted.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/X0KWrBdSyyBGzNtVfkbk.png", alt="Enumerable and non-enumerable properties.", width="800", height="335" %}
You can iterate over the enumerable properties with the `for … in` loop or `Object.keys()` method.

### Methods {: #methods }

Methods are marked with an *`f ()`*.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KKCw924Jst5jW1qmPnHa.png", alt="Method.", width="800", height="402" %}

For more information on functions, see [Inspect functions](/docs/devtools/console/reference/#inspect-functions) via the **Console**.

[1]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction

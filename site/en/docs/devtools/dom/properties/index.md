---
layout: "layouts/doc-post.njk"
title: "View properties of DOM objects"
date: 2022-05-05
#updated: YYYY-MM-DD
description: "Browse and filter properties of DOM objects."
authors:
  - sofiayem
tags:
  - dom
---

Use the **Elements** > **Properties** pane to browse and filter properties of [DOM][1] objects.

## View the properties of a DOM object {: #browse-properties }

To view properties of a DOM object, follow these steps:

1. [Open DevTools](/docs/devtools/open). By default, the **Elements** panel opens.
1. In the DOM tree, select a node.
1. To view properties, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iMilAleSjckpicMkG6dM.svg", alt="More", width="20", height="20" %}, then select **Properties**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2RCwQPvXwvRO2pkiNCsQ.png", alt="Elements > Properties", width="800", height="397" %}

## Understand properties {: #understand-properties }

The **Properties** pane shows you the following:

- Simple properties are pairs of `name: value`.
- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tFA9uWBcDgv8NNS1FlRm.svg", alt="Arrow right", width="20", height="20" %}Collapsible properties are objects themselves.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6cTP5nhIU3M6gYS76KFs.png", alt="Collapsible property", width="800", height="401" %}
- Collapsible properties that correspond to DOM nodes are links. Click on them to select relevant nodes in the DOM tree.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2gmf2oRmCAEY3IALwaSY.png", alt="Link to the head DOM node", width="800", height="401" %}
- Methods are marked with *`f name()`*.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4KwQ2ehomHaddjspfFGr.png", alt="Methods", width="800", height="405" %}
- Properties in bold font are object's own, in regular font—inherited from the prototype chain.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AjTrazS0WB2N1hgQWkmB.png", alt="Own and inherited properties", width="800", height="417" %}

Bright/muted = enumerable/non-enumerable

accessors - (...)

native accessors = inherited

prototype-specific properties are shown in prototypes, not on objects -> easier to diagnose objects

`[[Scopes]], [[PromiseState]], [[PromiseResult]], [[FunctionLocation]]`

## Show all properties

By default, the **Properties** pane doesn't show properties with `null` and `undefined` values.

To see all properties, check **Show all**.

## Filter properties {: #filter-properties }

To quickly find a property, start typing its name or value in the **Filter** textbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kuYMOi8wXUNTQEiGmGQ3.png", alt="Filter", width="800", height="317" %}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

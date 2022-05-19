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
1. Open the **Properties** tab. If you can't see the tab, click **More** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iMilAleSjckpicMkG6dM.svg", alt="More", width="20", height="20" %}, then select it from the drop-down menu.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2RCwQPvXwvRO2pkiNCsQ.png", alt="Elements > Properties", width="800", height="397" %}

## Understand properties {: #understand-properties }

The **Properties** pane shows you the following:

- Simple properties are pairs of `<name>: <value>`.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZmYdzL6Ba28qSYVNt9wQ.png", alt="Simple properties.", width="800", height="322" %}
- Collapsible ({% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tFA9uWBcDgv8NNS1FlRm.svg", alt="Arrow right.", width="20", height="20" %}) properties are objects.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6cTP5nhIU3M6gYS76KFs.png", alt="Collapsible property.", width="800", height="401" %}
- Objects that correspond to DOM nodes are links. Click on a link to select the relevant node in the DOM tree.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2gmf2oRmCAEY3IALwaSY.png", alt="Link to the head DOM node.", width="800", height="401" %}
- Properties in bold font are object's own. They are defined directly on the object.
   Properties in regular font are inherited from the object's prototype.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uyQ5VEFFkA570chS4BOP.png", alt="Own and inherited properties.", width="800", height="419" %}
   DevTools sorts own properties first to make them easier to spot.
- Enumerable properties are bright in color. Non-enumerable ones are muted.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/X0KWrBdSyyBGzNtVfkbk.png", alt="Enumerable and non-enumerable properties.", width="800", height="335" %}
   Enumerable properties can be iterated over with the `for … in` loop or `Object.keys()` method.
- Methods are marked with *`f <name>()`*.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OnKyVrKCRPlRz9x98sUW.png", alt="Method.", width="800", height="409" %}
- Accessors are marked with `(...)`. Accessors are computed properties, for example, getters and setters.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pXAgvgCdQD7hSRdmhBhe.png", alt="Accessor", width="800", height="338" %}
   DevTools doesn't evaluate accessors by default. To evaluate an accessor, click on `(...)`.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cwGW1PDI1FxEltGcCuxv.png", alt="Evaluated accessor.", width="800", height="338" %}

## Brows prototype chains {: #prototype-chain }

native accessors = inherited

prototype-specific properties are shown in prototypes, not on objects -> easier to diagnose objects

## Show all properties {: # show-all}

By default, the **Properties** pane doesn't show properties with `null` and `undefined` values.

To see all properties, check **Show all**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/k1m66AHOWpw2m96YO64u.png", alt="Properties with null values.", width="800", height="437" %}

## Filter properties {: #filter-properties }

To quickly find a property, start typing its name or value in the **Filter** textbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kuYMOi8wXUNTQEiGmGQ3.png", alt="Filter", width="800", height="317" %}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
[2]: https://tc39.es/ecma262/#sec-object-internal-methods-and-internal-slots

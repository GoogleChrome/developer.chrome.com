---
title: "CSS Grid tooling in DevTools"
description: >
  How we designed and implemented CSS Grid tooling support in DevTools.
layout: "layouts/blog-post.njk"
authors:
  - hanselfmu
date: 2021-08-16
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/tdrObCiQFtDjKT6qgd8e.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

{% Partial 'devtools/banner.md' %}

<!-- lint disable no-smart-quotes -->

## Why did we make CSS Grid Tooling?

[CSS Grid](https://web.dev/learn/css/grid/) is a very powerful CSS layout system that allows web developers to build a complex two-dimensional layout and set out rules about how each and every child item in a grid is sized, aligned, and ordered. CSS Grid was introduced after [Flexbox](https://web.dev/learn/css/flexbox/) became popular, and together, they can help developers achieve better responsive design without complicated alignment hacks or JavaScript-assisted layout.

As a relatively new layout system, CSS Grid is also hard to get right. Its syntax is quite versatile (just search *grid cheatsheet*), there are many ways to achieve the same layout, and flexible sizing and implicit tracks make it harder to reason about why the layout *is* or *isn’t* behaving as it should. This is why we set out to provide dedicated CSS Grid tooling in DevTools, so that developers can have a better understanding of what their CSS code is doing, and how to get to the right layout.

## Tooling design

### A joint effort between Chrome and Edge

CSS Grid tooling captured attention from both Chrome DevTools and Edge DevTools. We decided to collaborate from the beginning. We shared our product, engineering, and design resources from both teams, and coordinated weekly to make this happen.

### Summary of features

There are three main features for CSS Grid tooling:

1. Grid-specific, persistent overlay that helps with dimensional and ordering information
2. Badges in the DOM Tree that  highlight CSS Grid containers and toggle Grid overlays
3. A sidebar pane that allows developers to personalize the display of DOM overlays (e.g., changing the color and width of rules)
4. A CSS Grid editor in the **Styles** pane

Let’s take a deeper look at them next.

## Grid persistent overlays

In DevTools, an overlay is a powerful instrument that provides layout and style information of an individual element:

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/Mor1eKkONzw6PMRu2Fe6.png", alt="ALT_TEXT_HERE", width="652", height="256" %}

This extra information is *overlaid* on top of the element of interest. Previously, when you hover over a Grid with DevTools open, the overlay displayed its box model information, but limited the content highlighting to grid items without explaining why this is the case. There are two major parts we’d like to add for CSS Grid overlays:

- we want to show more useful information about Grids, e.g. **authored** dimensions and gaps
- we want to make the overlays sticky, so that we can look at multiple Grids at the same time, and we can see overlays updating Grid information as we change element styles

Let’s take a look at how we achieved both.

### Authored sizes vs. computed sizes

One of the difficult parts about debugging CSS Grid is the many ways to define grid track sizes. For example, you could use a combination of pixel values, percentage values, fractions, repeat function, and minmax function to create versatile track sizes:

```css
.grid-cards {
    display: grid;
    width: 200px;
    height: 300px;
    grid-template-rows: 20% 0.3fr 100px minmax(100px, auto);
    grid-template-columns: repeat(3, minmax(200px, 1fr));
}
```

However, it would be hard to map these *authored* track sizes to the *computed* track sizes the browser has calculated for us. To bridge this gap, we put these two pieces of information side-by-side on the overlay:

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/QEvAPXmXCsCD4ebD5yfj.png", alt="ALT_TEXT_HERE", width="613", height="312" %}

The string before the dot is the authored value, and the string after the dot represents the actual computed value.

Previously, DevTools did not have the capability to get authored values. In theory, we could somehow parse the authored values in DevTools ourselves and compute them according to the CSS Grid spec. This would have involved many complicated scenarios, and essentially would just be a duplication of Blink’s efforts. Therefore with the help from Blink’s Style team, we got a [new API from the style engine that exposes “cascaded values”](https://chromium-review.googlesource.com/c/chromium/src/+/2324423). A **cascaded value** is the final effective value, after CSS cascading, for a CSS property. This is the value that is *winning* after the style engine has compiled all the stylesheets, but before actually computing any values, e.g. percentage, fractions, etc.

We are now using this API to [display the authored values in grid overlays](https://chromium-review.googlesource.com/c/chromium/src/+/2340043).

### Persistent overlays

Before CSS Grid tooling, overlay in DevTools was straightforward: you hover on an element, either in DevTools’ DOM Tree pane, or directly in the inspected page, and you will see an overlay describing this element. You hover away, and the overlay disappears. For Grid overlays, we wanted something different: multiple Grids can be highlighted simultaneously, and Grid overlays can stay on while regular on-hover overlays are still functional.

For example:

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/0UT0MCoqKo48DYkPXvLU.png", alt="ALT_TEXT_HERE", width="800", height="339" %}

However, the overlay in DevTools was not designed with this multi-element, persistent mechanism in mind (it was created many years ago). Therefore we had to refactor the overlay design to get this working. We [added a new `GridHighlightTool`](https://chromium-review.googlesource.com/c/chromium/src/+/2278408) into an existing [suite of highlighting tools](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/inspector/inspect_tools.h), which later evolved into a global `PersistentTool` for highlighting all the persistent overlays at the same time. For each kind of persistent overlays (Grid, Flex, etc.), we keep a respective configuration field inside the persistent tool. Every time when the overlay highlighter checks what to draw, it will also include these configurations.

To allow DevTools to control what needs to be highlighted, we created a new CDP command for Grid persistent overlay:

```
# Highlight multiple elements with the CSS Grid overlay.
command setShowGridOverlays
  parameters
    # An array of node identifiers and descriptors for the highlight appearance.
    array of GridNodeHighlightConfig gridNodeHighlightConfigs
```

where each `GridNodeHighlightConfig` contains information about which node to draw, and how to draw it. This allows us to add a multi-item persistent mechanism without breaking the current on-hover behavior.

## Real-time Grid badges

To help developers easily toggle on and off the Grid overlays, we decided to add small badges next to Grid containers in the [DOM Tree](/docs/devtools/dom/). These badges can also help developers identify Grid containers in their DOM structures.

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/JuOPl5pjlitbTTptxRw4.png", alt="ALT_TEXT_HERE", width="608", height="322" %}

### Changes to the DOM Tree

Since `Grid` badges are not the only badges we’d like to show in the DOM Tree, we’d like to make badge-adding as easy as possible. `ElementsTreeElement`, the class responsible for creating and managing individual DOM Tree elements in DevTools, has been updated with several new public methods to configure badges. If there are multiple badges for one element, they are sorted by badges’ categories, and then their names alphabetically if they are in the same category. Available categories include `Security`, `Layout`, etc., and `Grid` belongs to the `Layout` category.

Also, we have built-in accessibility support from the start. Every interactive badge is [required to provide a default and an active `aria-label`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/components/adorners/Adorner.ts;l=73;drc=74835cce21f84484f9e2624e56b5b989c4007923), while read-only badges use their badge names as `aria-label`s.

### How did we get real-time style updates?
Many DOM changes are reflected in the DevTools DOM Tree in real time. For example, newly added nodes appear instantaneously in the DOM Tree, and removed class names disappear instantaneously as well. We want the Grid badge status to also reflect the same up-to-date information. However, this proved to be difficult to implement, because there was no way for DevTools to get notifications when elements shown in the DOM Tree get computed style updates. The only existing way of knowing when an element becomes or stops being a Grid container would be to constantly query the browser for each and every element’s up-to-date style information. This would be *prohibitively* expensive.

To make it easier for the front end to know when an element has its style updated, we [added a new CDP method for style updates polling](https://chromium-review.googlesource.com/c/chromium/src/+/2246587). To get style updates of DOM nodes, we start by telling the browser what CSS declarations we want to track. In the case for Grid badges, we would ask the browser to keep track of:

```json
{
  "display": "grid",
  "display": "inline-grid",
}
```

We then send a polling request, and when there are *tracked* style updates for DOM nodes in the Elements panel, the browser will send DevTools a list of updated nodes and resolve the existing polling request. Whenever DevTools wants to be notified for style updates again, it can send this polling request instead of constantly polling the backend from each and every node. DevTools can also change the CSS declarations being tracked by sending a new list to the browser.

## Layout pane

Although DOM Tree badges help the discoverability of CSS Grids, sometimes we want to see a list of all the CSS Grids in a certain page, and easily toggle their persistent overlays on and off to debug their layouts. Therefore, we decided to create a dedicated sidebar pane just for layout toolings. This gives us a dedicated space to gather all the Grid containers, and to configure all the options for Grid overlays. This **Layout** pane also enables us to put future layout-heavy toolings (e.g. [Flexbox](/blog/new-in-devtools-90#flexbox), [Container queries](/blog/new-in-devtools-93/#container-queries)) here as well.

### Find elements by computed styles

In order to show the list of CSS Grid containers in the **Layout** pane, we need to find DOM nodes by computed styles. This turned out to be not straightforward either, because not all the DOM nodes are known to DevTools when DevTools is open. Instead, DevTools only knows a *small* subset of nodes, usually at the top level of the DOM hierarchy, just to get Devtools DOM Tree started. For performance reasons, other nodes will only be fetched upon further request. This means that we need [a new CDP command](https://chromium-review.googlesource.com/c/chromium/src/+/2340975) to collect all the nodes in the page and filter them by their computed styles:

```
# Finds nodes with a given computed style in a subtree.
experimental command getNodesForSubtreeByStyle
  parameters
    # Node ID pointing to the root of a subtree.
    NodeId nodeId
    # The style to filter nodes by (includes nodes if any of properties matches).
    array of CSSComputedStyleProperty computedStyles
    # Whether or not iframes and shadow roots in the same target should be traversed when returning the
    # results (default is false).
    optional boolean pierce
  returns
    # Resulting nodes.
    array of NodeId nodeIds
```

This enables DevTools frontend to get a list of CSS Grid containers in a page, possibly piercing through iframes and shadow roots, and render them in the Layout pane.

## Conclusion

CSS Grid tooling was one of the first DevTools design tooling projects to support a Web Platform feature. It debuted many fundamental toolings in DevTools, e.g. persistent overlays, DOM Tree badges, and the **Layout** pane, and paved the way for future layout toolings in Chrome DevTools like Flexbox and Container queries. It also laid the foundation for Grid and Flexbox editors, which allow developers to change Grid and Flexbox alignments in an interactive way. We'll go through them in the future.

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}
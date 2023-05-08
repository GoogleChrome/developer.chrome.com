---
layout: 'layouts/blog-post.njk'
title: "Top layer support in Chrome DevTools"
description: >
   Discover the top layer and learn how Chrome DevTools implemented support for it.
authors:
    - alinavarkki
date: 2022-07-21
last_updated: 2023-01-25
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/56D6d9pfdEWRPQdima0W.jpg'
alt: ''
tags:
    - devtools-engineering
    - devtools
---

[Chrome DevTools](/docs/devtools/) is adding support for top layer elements, making it easier for developers to debug their code that makes use of top layer elements.

{% Aside %}
**Note**: This is a preview feature available in [Chrome Canary](https://www.google.com/chrome/canary/) from version 105.
{% endAside %}

This article describes what top layer elements are, how DevTools help to visualize the top layer content to understand and debug DOM structure that contains top layer elements, and how DevTools top layer support is implemented.

## What are the top layer and top layer elements?

What exactly happens internally when you open a [`<dialog>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) as a modal? 🤔

It is put into a top layer. Top layer content renders on top of all other content. For example, a modal dialog needs to appear on top of all other DOM content, so the browser automatically renders this element in a 'top layer' instead of forcing authors to manually battle z-index. A top layer element appears on top of an element even with the highest z-index.

The [top layer](https://fullscreen.spec.whatwg.org/#new-stacking-layer) can be described as 'the highest stacking layer'. Each document has a single associated viewport and, therefore, also a single top layer.
Multiple elements can be inside the top layer at the same time. When that happens, they stack on top of each other, the last one on top. In other words, all of the top layer elements are placed in a *last in, first out* (LIFO) stack in the top layer.

The `<dialog>` element is not the only element that the browser renders into a top layer. Currently, the top layer elements are:
[popovers](https://open-ui.org/components/popover.research.explainer), [modal dialogs](https://developer.mozilla.org/docs/Web/HTML/Element/dialog), and elements in a [fullscreen mode](https://developer.mozilla.org/docs/Web/API/Fullscreen_API).

Examine the following dialog implementation:

```html
<main>
  <button onclick="window.dialog.showModal();">Open Dialog</button>
</main>
<dialog id="dialog"></dialog>
```

Here is a demo with a couple of dialogs that have styles applied to their backdrops (backdrops described below):

{% Glitch { id: 'solid-tidal-captain', height: 1000 } %}

### What is a backdrop?

Luckily, there is a way to customize the content beneath the top layer element.

Every element in the top layer has a [CSS pseudo-element](https://web.dev/learn/css/pseudo-elements/) called a [backdrop](https://developer.mozilla.org/docs/Web/CSS/::backdrop).

The Backdrop is a box the size of the viewport which is rendered immediately beneath any top layer element. The `::backdrop` pseudo-element makes it possible to obscure, style, or completely hide everything located below the element when it's the topmost one in the top layer.

When you make multiple elements modal, the browser draws the backdrop immediately beneath the frontmost such element and on top of other fullscreen elements.

Here is how you style a backdrop:

```css
/* The browser displays the backdrop only when the dialog.showModal() function opens the dialog.*/
dialog::backdrop {
    background: rgba(255,0,0,.25);
}
``` 

### How to show only the first backdrop?

Every top layer element has a backdrop that belongs to a top layer stack. These backdrops are designed to overlap each other, so if the opacity of a backdrop is not 100%, the backdrops underneath are visible.

If only the first backdrop in the top layer stack needs to be visible, you can achieve this by keeping track of the item identifiers in the top layer stack.

If the added element is not the first one in the top layer, the function called when the element is put into the top layer applies a `hiddenBackdrop` class to the  `::backdrop`. This class is removed when the element is removed from the top layer.

Check out the code in this example demo:

{% Glitch { id: 'season-dust-money', height: 1000 } %}

### Top layer support design in DevTools

DevTools support for the top layer helps developers understand the concept of the top layer and visualize how the top layer content changes. These features help developers identify the following:

- The elements in the top layer at any time and their order.
- The element at the top of the stack at any point.

Moreover, DevTools top layer support helps to visualize the position of the backdrop pseudo-element in the top layer stack. Even though it is not a tree element, it plays an important role in how the top layer works and can be useful to developers.
 
With the top layer support features, you can:

1. Observe which elements are in the top layer stack at any time. The top layer representation stack changes dynamically as elements are added or removed from the top layer.
1. See the element position in the top layer stack.
1. Jump from the top layer element or elements' backdrop pseudo-element in the tree to the element or backdrop pseudo-element in the top layer representation container and back.

Let's see how to use these features!

#### Top layer container

To help visualize the top layer elements, DevTools adds a _top layer container_ to the elements tree. It resides after the closing `</html>` tag.

This container allows you to observe the elements in the top layer stack at any time. The top layer container is a list of links to the top layer elements and their backdrops. The top layer representation stack changes dynamically as elements are added or removed from the top layer.

To find top layer elements within the elements tree or the top layer container, click the links from the top layer element representation in the top layer container to the same element in the element tree and back.

To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element in the top layer container.

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/36Yck7O77zDipSNGNNbB.gif", alt="Jumping from the top layer container link to the element.", width="800", height="461" %}

To jump from the top layer tree element to the link in the top layer container, click the **top layer** badge next to the element.

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/7azKIV0O938QVIc6YcE3.gif", alt="Jumping from an element to the top layer container link.", width="800", height="274" %}

You can turn off any badge, including the **top-layer** one. To disable the badges, right-click on any badge, choose **Badge settings** and clear the ticks next to badges you want to hide.

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/FJydb49bYgzMh22sAHHC.gif", alt="Turning the badge off.", width="800", height="438" %}
 
{% Aside %}
**Note**: The top layer container appears only when the top layer stack contains rendered content.
{% endAside %}

#### Elements order in the top layer stack

The top layer container shows the elements as they appear in the stack but in reverse order. The top of the stack element is the last in the element list of the top layer container. This means that the last element in the top layer container list is the element you can currently interact with in the document.

The badges next to the tree elements indicate whether the elements belong to the top layer and contain the position number of an element in the stack.

In this screenshot, the top layer stack consists of two elements, with the second element at the top of the stack. If you remove the second element, the first one moves to the top.

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/BhKkmX9qazfUJB0A9p5W.png", alt="The order of elements in the stack.", width="800", height="243" %}

#### Backdrops in the top layer container

As mentioned above, every top layer element has a CSS pseudo-element called backdrop. You can style this element, so it is useful to also inspect it and see its representation.

In the elements tree, a backdrop element resides before the closing tag of the element it belongs to. However, in the top layer container, a backdrop link is listed right above the top layer element it belongs to.

{% Img src="image/1D9D0Ls1ATa2ZPA9x2ZWrGFyZzT2/pplexicnM74T4jDf9B8B.png", alt="Backdrops stack position.", width="800", height="421" %}

### Changes to the DOM tree

`ElementsTreeElement`, the class responsible for creating and managing individual DOM tree elements in DevTools, was not sufficient to implement a top layer container. 

To display the **top layer container** as a node in the tree, we added a new class that creates DevTools tree element nodes. Previously, the class responsible for creating DevTools elements tree initialized every `TreeElement` with a `DOMNode`, which is a class with a `backendNodeId` and other backend-related properties. `backendNodeId`, in turn, is assigned on the backend.

The top layer container node, that has a list of links to top layer elements, needed to behave as a regular tree element node. However, this node is not a 'real' DOM node and the backend doesn't need to create the top layer container node.

To create a frontend node that represents the top layer, we added a new type of frontend node that is created without a `DOMNode`. This top layer container element is the first frontend node that does not have a `DOMNode`, meaning it exists only on the frontend and the backend does not 'know' about it. To have the same behavior as other nodes, we created a new [`TopLayerContainer`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/panels/elements/TopLayerContainer.ts;l=23?q=TopLayerContainer&sq=&ss=chromium) class that extends the [`UI.TreeOutline.TreeElement`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/legacy/Treeoutline.ts;l=431;drc=6bc65d0595702fc826ca87e2cfe519a134b62d90) class which is responsible for the behavior of frontend nodes.

To achieve the desired placement, the class that renders an element attaches `TopLayerContainer` as the next sibling of the `<html>` tag.

A new top layer badge indicates that the element is in the top layer and serves as a link to the shortcut of this element in the `TopLayerContainer` element.

#### Initial design

At first, the plan was to duplicate top layer elements into the top layer container instead of creating a list of links to the elements. We didn't implement this solution because of the way the fetching of element's children works in DevTools. Each element has a parent pointer used in fetching children and it is impossible to have multiple pointers. Therefore, we can't have a node that properly expands and contains all children in multiple places in the tree.
In general, the system was not built with duplicate subtrees in mind.

The compromise we arrived at was creating links to the frontend DOM nodes instead of duplicating those nodes. The class responsible for creating links to elements in DevTools is [`ShortcutTreeElement`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/panels/elements/ElementsTreeOutline.ts;l=1580;drc=6bc65d0595702fc826ca87e2cfe519a134b62d90), which extends the [`UI.TreeOutline.TreeElement`](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/legacy/Treeoutline.ts;l=431;drc=6bc65d0595702fc826ca87e2cfe519a134b62d90). `ShortcutTreeElement` has the same behavior as other DevTools DOM tree elements but doesn't have a corresponding node on the backend and has a button that links to an `ElementsTreeElement`.
Each `ShortcutTreeElement` to the top layer node has a child `ShortcutTreeElement` that links to the representation of a `::backdrop` pseudo-element in the DevTools DOM tree.

Initial design:

{% Img src="image/ChqWwaDOcpfo1hIcJvU9ZaNbWOB2/NuSiLL05niVPnklxtwCy.png", alt="Initial design.", width="800", height="698" %}

### Chrome DevTools Protocol (CDP) changes

To implement the top layer support, changes to [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) are required. CDP serves as a communication protocol between DevTools and Chromium.

We need to add the following:

- A command to call from the frontend at any time.
- An event to trigger on the frontend from the backend side.

#### CDP: `DOM.getTopLayerElements` command

To display the current top layer elements, we need a new experimental CDP command that returns a list of node IDs of the elements that are in the top layer. DevTools calls this command whenever the DevTools are opened or when the top layer elements change. The command looks like the following:

```diff
  # Returns NodeIds of the current top layer elements.
  # Top layer renders closest to the user within a viewport, therefore, its elements always 
  # appear on top of all other content.
  experimental command getTopLayerElements
    returns
      # NodeIds of the top layer elements.
      array of NodeId nodeIds
```

#### CDP: `DOM.topLayerElementsUpdated` event

To get the up-to-date list of the top layer elements, we need every change of the top layer elements to trigger an experimental CDP event. This event informs the frontend of the change that then calls the `DOM.getTopLayerElements` command and receives the new elements list. 

The event looks like the following:

```diff
  # Called by the change of the top layer elements.
  experimental event topLayerElementsUpdated
```

#### CDP considerations

There were multiple options on how the CDP support of the top layer could be implemented. Another option we considered was making an event that would return the list of the top layer elements instead of just informing the front end about an addition or removal of a top layer element. 

Alternatively, we could make two events instead of the command: `topLayerElementAdded` and `topLayerElementRemoved`. In this case, we would be receiving an element and would need to manage the array of the top layer elements on the front end.

Currently, a frontend event calls the `getTopLayerElements` command to get a list of updated elements. If we were to send a list of elements or a specific element that caused the change every time an event is triggered, we could avoid one step of calling the command.
However, in this case, the frontend would lose the control over which elements are pushed. 

We implemented it in this way because, in our opinion, it's better if the frontend decides when to request top layer nodes. For example, if the top layer is collapsed in the UI or the user is using a DevTools panel that doesn't have the elements tree, there's no need to get the extra nodes that could be deeper into the tree.

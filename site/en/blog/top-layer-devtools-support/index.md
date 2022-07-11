---
layout: 'layouts/blog-post.njk'
title: "Top Layer  and it's support in Chrome DevTools"
description: >
    What is top layer, how it is supported by Chrome DevTools and how we implemented Top Layer support.
authors:
    -alinavarkki
date: 2022-07-08
tags:
    - devtools-engineering
    - devtools
---


## What is the Top Layer and how DevTools supports it?

[Chrome DevTools](/docs/devtools/) is adding support for top layer elements, making it easier for developers to debug their code that makes use of top layer elements. This article describes what top layer elements are, how DevTools help to visualize the top layer content to understand and debug DOM structure that contains top layer elements, and how DevTools top layer support is implemented.

## What is the top layer and top layer elements?

What exactly happens internally when you open a ```<dialog>``` as a modal? 🤔
It is put into a top layer. Top layer content renders on top of all other content. Since a modal dialog needs to appear on top of all other DOM content, the browser does this automatically by rendering those elements in a ‘top layer’ instead of forcing authors to manually battle z-index. A top layer element will appear even on top of an element with the highest z-index.
The [top layer](https://fullscreen.spec.whatwg.org/#new-stacking-layer) can be described as ‘the highest stacking layer’. Each document has one associated viewport and therefore also one top layer. 
Multiple elements can be inside the top layer at the same time .When that happens they stack on top of each other, the last one on top. In other words, all of the top layer elements are placed in a last-in/first out (LIFO) stack in the top layer 📚.
Dialog is not the only element that gets rendered into a top layer. Currently, top layer elements are [popup](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups), [modal dialog](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) and elements in [fullscreen mode](https://developer.mozilla.org/docs/Web/API/Fullscreen_API).
Dialog implementation:
``` html
<main>
    <button onclick="window.dialog.showModal();">Open Dialog</button>
</main>
<dialog id="dialog"></dialog>
```
Here is a demo with a couple of dialogs that have styles applied to their backdrops (backdrops described below):
{% Glitch { id: 'solid-tidal-captain', height: 1000 } %}

### What is a backdrop?

Luckily, there is also a way to customize the content beneath the top layer element.

Every element in the top layer has a [CSS pseudo-element](https://www.w3.org/TR/CSS22/selector.html#pseudo-elements)  called [backdrop](https://developer.mozilla.org/docs/Web/CSS/::backdrop).
Backdrop is a box the size of the viewport which is rendered immediately beneath any top layer element. The ::backdrop pseudo-element makes it possible to obscure, style, or completely hide everything located below the element when it's the topmost one in the top layer.
When multiple elements have been made modal, the backdrop is drawn immediately beneath the frontmost such element, and on top of the older fullscreen elements.

Here is how you style a backdrop:

``` css
/* Backdrop is only displayed when dialog is opened with dialog.showModal() */
dialog::backdrop {
    background: rgba(255,0,0,.25);
}
``` 

### How to only show the first backdrop?

Every top layer element has a backdrop that belongs to a top layer stack. These backdrops are designed to overlap each other so if the opacity of a backdrop is not a ‘100%’, the backdrops underneath are visible.
In a use case when only the first backdrop in the top layer stack needs to be visible, it is possible to achieve this with JavaScript code that keeps track of the top layer stack items ids. 
If the element added is not the first top layer element, a class making the :’:backdrop’ hidden is applied. This class is removed when the element is removed from the top layer.
Example demo with code:
{% Glitch { id: 'season-dust-money, height: 1000 } %}

### Top layer DevTools support design

We added DevTools support for the top layer in order to help developers understand the concept of top layer and visualize how the top layer content changes. These features will help developers to see which elements are in the top layer at any time and identify their order. It can be especially useful to know which element is on top of the stack at any point and can be accessed. 
Moreover, DevTools top layer support helps to visualize the position of the backdrop pseudo-element in the top layer stack. Even though it is not a tree element, it plays an important role in how the top layer works and can be made good use of by developers.
 
The top layer support features can be summarized as:

Observe which elements are in the top layer stack at any time. The top layer representation stack changes dynamically as elements are added/removed from the top layer.
See the element position in the top layer stack.
Jump from the top layer element or elements’ backdrop pseudo element in the tree to the element or backdrop pseudo element in the top layer representation container and vice versa.

Let’s look into the ways to use these features!

#### Top layer Container

To help visualize top layer elements, a ‘top layer container’ has been added to the elements tree. It resides at the end of the <body> tag. 
This container allows observing which elements are in the top layer stack at any time. Essentially, the top layer container is a list of links to the top layer elements and their backdrops. The top layer representation stack changes dynamically as elements are added/removed from the top layer.
To easily find top layer elements within the elements tree or the top layer container, there are links from the top layer element representation in the top layer container to the same element in the element tree and vice versa.


To jump from the top layer container element to the top layer tree element, click the ‘reveal’ word next to the element in the top layer container.

{% Img src="image/ChqWwaDOcpfo1hIcJvU9ZaNbWOB2/NPG3v0Nc1pzkbzZAjVPJ.gif", alt="jumping from the top layer container link to the element", width="600", height="318" %}

To jump from the top layer tree element to the link in the top layer container, click on the ‘top layer’ badge next to the element.

{% Img src="image/ChqWwaDOcpfo1hIcJvU9ZaNbWOB2/QIyNqWWscZJEo53NDXrK.gif", alt="jumping from an element to the top layer container link", width="600", height="238" %}


It is possible to turn off any badge, including the ‘top-layer’ badge. In case you do not want to see the ‘top -layer’ badge, right click on any badge, choose ‘badge setting’ and remove the tick from badges you want to hide.

{% Img src="image/ChqWwaDOcpfo1hIcJvU9ZaNbWOB2/poAY4zTO6wnFkAvIIauQ.gif", alt="turning the badge off", width="600", height="226" %}
 

Top layer container only appears when there is content rendered in the top layer stack.


#### Elements order in the top layer stack
Top layer container shows the elements in the sequence of their position in the stack, the top of the stack element being the last in the top layer container list of elements. This means that the last element in the top layer container list is the element that can be currently interacted with in the document.
The badges next to the tree elements that identify elements’ belonging to the top layer also contain the number position of an element in the stack.

In this screenshot the top layer stack consists of 2 elements, therefore element number 2 is the top of the stack. If the second element got removed, element number 1 would become the top of the stack.

{% Img src="image/ChqWwaDOcpfo1hIcJvU9ZaNbWOB2/flRQ3QprqBGGSUpmrjDZ.png", alt="stack elements sequence", width="800", height="267" %}

Backdrops in the Top Layer Container
As mentioned above, every top layer element has a CSS pseudo-element called backdrop. As this element can be styled, it might be useful to also inspect it and see its representation.
In the elements tree, a backdrop element resides before the closing tag of the element it belongs to. In the top layer container however, a backdrop link is listed right above a top layer element it belongs to.

{% Img src="image/ChqWwaDOcpfo1hIcJvU9ZaNbWOB2/AXuiUTG7wZxCgcTOSS1b.png", alt="backdrops stack position", width="800", height="316" %}

 
### Changes to the DOM tree

ElementsTreeElement, the class responsible for creating and managing individual DOM Tree elements in DevTools, was not sufficient to implement a top layer container. 
To display the top layer container as a node in the tree, we needed to add a new class that creates DeevTools Tree element nodes. Previously, every TreeElement was initialized with a DOMNode, which is a class generated with a backendNodeId and other backend-related properties. backendNodeId, in turn, is assigned on the backend.
The top layer container node, that has a list of links to top layer elements, needed to behave as a regular tree element node, but this node is not a ‘real’ DOM node and does not need to be created on the backend.
To create a frontend node that represents the top layer, we needed to add a new type of frontend node that is created without a DOMNode. This top layer container element is the first frontend node that does not have a DOMNode, meaning it is only created on the frontend and the backend does not ‘know’ about it. To have the same behavior as other nodes, we created a new class [TopLayerContainer](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/panels/elements/TopLayerContainer.ts;l=23?q=TopLayerContainer&sq=&ss=chromium) that  extends the [UI.TreeOutline.TreeElement](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/legacy/Treeoutline.ts;l=431;drc=6bc65d0595702fc826ca87e2cfe519a134b62d90) class which is responsible for the behavior of frontend nodes.

To achieve desired placement, TopLayerContainer is attached as the last child of the <body> tag.

A new top layer badge has been added to indicate that the element is in the top layer and serve as a link to the shortcut of this element in the TopLayerContainer element.

#### Initial design

At first, the plan was to duplicate top layer elements into the top layer container instead of creating a list of links to the elements. This solution was not implemented because of the way fetching an elements’ children is implemented in DevTools. Each element has a parent pointer that is used in fetching children and it is impossible to have multiple pointers. Therefore, we can not have a node that will properly expand and contain all children in multiple places in the tree. 
In general, the system was not built with duplicate subtrees in mind. 

The compromise we arrived at was creating links to the frontend DOM nodes instead of duplicating those nodes. The class responsible for creating links to elements in DevTools is [ShortcutTreeElement](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/panels/elements/ElementsTreeOutline.ts;l=1580;drc=6bc65d0595702fc826ca87e2cfe519a134b62d90), which extends [UI.TreeOutline.TreeElement](https://source.chromium.org/chromium/chromium/src/+/main:third_party/devtools-frontend/src/front_end/ui/legacy/Treeoutline.ts;l=431;drc=6bc65d0595702fc826ca87e2cfe519a134b62d90). ShortcutTreeElement has the same behavior as other DevTools DOM tree elements, but does not have a corresponding node on the backend and has a button that links to an ElementsTreeElement.
Each ShortcutTreeElement to the top layer node has a child ShortcutTreeElement that links to the representation of a ‘:backdrop’ pseudo element in the DevTools DOM  tree.

Initial design:

{% Img src="image/ChqWwaDOcpfo1hIcJvU9ZaNbWOB2/NuSiLL05niVPnklxtwCy.png", alt="Initial design", width="800", height="698" %}

### Chrome DevTools Protocol(CDP) changes

To implement top layer support, it was required to make changes to CDP(https://chromedevtools.github.io/devtools-protocol/). CDP stands for Chrome DevToolsProtocol and it serves as a communication protocol between DevTools and Chromium.
A new command and an event had to be added. A command can be called from the frontend at any time while an event is triggered on the frontend from the backend side.

#### CDP: DOM.getTopLayerElements - command

In order to display current top layer elements, we need a new experimental CDP command that returns a list of NodeIDs of the elements that are in the top layer.  This command is called whenever DevTools are opened or when top layer elements change. The command looks as following:

```

  # Returns NodeIds of current top layer elements.
  # Top layer is rendered closest to the user within a viewport, therefore its elements always 
  # appear on top of all other content.
  experimental command getTopLayerElements
    returns
      # NodeIds of top layer elements
      array of NodeId nodeIds
```

#### CDP: DOM.topLayerElementsUpdated - event

To get the up to date list of top layer elements, we need an experimental CDP event that is triggered every time top layer elements change. This event informs the frontend of the change which, thereafter, calls the DOM.getTopLayerElements command and receives the new elements list. The event looks a following:
```
  # Called when top layer elements are changed.
  experimental event topLayerElementsUpdated
```

#### CDP considerations

There were multiple options on how the CDP part supporting the top layer could be implemented. Another option we considered was making an event that would return the list of top layer elements instead of just informing the front end about the fact that an addition or removal of a top layer element has taken place. 
Alternatively, we could make 2 events - topLayerElementAdded / topLayerElementRemoved and get rid of the command. In this case we would be receiving an element and the array of top layer elements would need to be managed on the front end.
Currently, an event is triggered on the frontend and the frontend calls the getTopLayerElements command in order to get a list of updated elements. If we were about to send a list of elements or a specific element that caused the change every time an event is triggered, one step of calling the command would be avoided.
However, in this case the frontend would lose the control over which elements are pushed. 

We implemented it in this way because the top layer element might not be known to the frontend at the time when topElementAdded/topElementRemoved happens but it'd be forcefully pushed. In my opinion, it's better if the frontend has control over when to push the top layer elements (e.g., the top layer might be collapsed in the UI so no need to get those extra nodes that could be deeper into the tree). 

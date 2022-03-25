---
layout: 'layouts/blog-post.njk'
title: Touch action options
description: >
    Touch actions allow a developer to define how a user can interact with an element and Chrome now has wider support for touch-action options in Chrome 55. 
authors:
  - mattgaunt
date: 2016-10-20
updated: 2016-10-20
---


The `touch-action` CSS property allows a developer to restrict how a user
can interact with an element which is especially helpful to prevent events
being dispatched when it's not necessary.

Before version 55, Chrome supported `pan-x` and `pan-y` which restrict elements
to scrolling in one direction.

The video below shows an example of an element without a touch-action defined
(left), as well as pan-x and pan-y (middle and right).

{% YouTube id="qPD2ycbOtLdlFQAo08BoDk" %}


The CSS for the the middle and right hand screen-casts being:

```css
.pan-x {
    touch-action: pan-x;
}

.pan-y {
    touch-action: pan-y;
}
```

In Chrome 55, `pan-left`, `pan-right`, `pan-up` and `pan-down` were added. These
properties have a subtle but important difference in behavior.

These properties force the user to start gestures in one direction before
the element will respond. This is similar to the "pull-to-refresh" gesture
which only responds when the user gestures downwards on the screen.

The following video demonstrates `pan-right` and `pan-down` which
require gestures to start from right to left and bottom to top respectively.
Once the gesture has started, you can actually
pan back and forth. It's only the initial direction that is affected.

While the video demonstrates this behavior, you might find it easier to try
yourself which you can by [checking out the
sample](http://output.jsbin.com/batijohode).


{% YouTube id="jgSKgf32-5Y" %}

The CSS for this demo is:

```js
.pan-right {
    touch-action: pan-right;
}

.pan-down {
    touch-action: pan-down;
}
```

The last thing that's happening in the world of touch-action is the
`pinch-zoom` property. This is a new property in Chrome 55, behind a flag,
that can be used with any of the pan options
(i.e. `pan-x`, `pan-y`, `pan-left`, `pan-right`, `pan-down`, `pan-up`).

If you pinch on a website it'll generally zoom in on the pages content.
Defining a `touch-action` will prevent this behavior, but adding pinch-zoom
will re-enable this behavior.

This video shows the difference between `touch-action: pan-x` and
`touch-action: pan-x pinch-zoom`;

{% YouTube id="-1qCHbS5DzI" %}

All of these properties should simplify some of the logic that would
otherwise need to implemented by developers using `pointer-events`.


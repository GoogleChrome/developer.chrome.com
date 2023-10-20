---
layout: 'layouts/blog-post.njk'
title: "Keyboard focusable scrollers"
description: >
  Scrollers without tabindex value set and without any focusable children are now keyboard focusable.
subhead: >
  Scrollers without tabindex value set and without any focusable children are now keyboard focusable.
date: 2023-10-20
thumbnail: image/kheDArv5csY6rvQUJDbWRscckLr1/syCUeFoHRAmGHWtfuGsX.jpg
authors:
    - dizhang
---

From Chrome 120, scrollers are keyboard focusable by default if they have no keyboard focusable children.

## Background

Scrollers are everywhere. You might find one in a "Terms and Conditions" box,  where you need to scroll all the way down to click on the submit button. Or, you might encounter a vertical menu bar full of icons to choose from.

In such cases, many web users use the up down motions from their mouse or touchpad to scroll across the element. However, a pointing device, trackpad, or touchscreen is not  every user's optimal way to navigate a page. Some people prefer to navigate across an HTML page accessing every focusable element using only their keyboard. This can be for a variety of reasons. From people who have tremors or other issues that make it difficult to operate a mouse, those who have difficulty visually locating the mouse cursor, and others who use a single switch or voice control.

Accessibility best practices recommend that all features must be available via keyboard access. This way, everyone can use the web in the way that works best for them.

> [2.1.1](http://www.w3.org/TR/2008/REC-WCAG20-20081211/#keyboard-operation-keyboard-operable) Keyboard: All [functionality](https://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-keyboard-operable.html#functiondef) of the content is operable through a [keyboard interface](https://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-keyboard-operable.html#keybrd-interfacedef) without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints. (Level A)

{% Aside %}  
Learn more about [keyboard focus](https://web.dev/learn/accessibility/focus) in our Learn Accessibility course.  
{% endAside %}

## Before this change to focus in scrollers

Prior to this change, a scroller element can only be tab focused if the tabindex is explicitly set to 0 or higher. For example, use the following CSS and HTML. Then, try to `tab` from the first button to the scroller element.

```css
div.scroll, button {
  border: 1px solid lightgray;
  margin-top: 1em;
  border-radius: 0.5em;
}

div.scroll {
  overflow: auto;
  width: 20em;
  height: 5em;
  display: block;
}
div.long {
  width: 10em;
  height: 10em;
}
```

```html
<button>Start</button>
<div class="scroll" tabindex="0">
<p>This is a tab focusable scroller...</p>
<div class="long"></div>
<p>You need to scroll down to see this line.</p>
</div>
<button>End</button>
```

<figure>
{% Video
  src="video/kheDArv5csY6rvQUJDbWRscckLr1/tHnEyxfzYBbx9D8I1LuB.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}
    <figcaption>The scroller is focusable due to a positive tabindex.</figcaption>
</figure>

Using a negative tabindex as in the following HTML, the scroller will be skipped.

```html
<button>Start</button>
<div class="scroll" tabindex="-1">
<p>This is not a tab focusable scroller...</p>
<div class="long"></div>
<p>You cannot see this line using the keyboard.</p>
</div>
<button>End</button>
```

<figure>
{% Video
  src="video/kheDArv5csY6rvQUJDbWRscckLr1/NCYssAUl1Ne9wl2A7tr4.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}
    <figcaption>The scroller is skipped due to a negative tabindex.</figcaption>
</figure>

If you do not set a tabindex value, it can be difficult for the user to use sequential focus navigation to access the scroller. This can be very frustrating for users who do not have access to a mouse.

```html
<button>Start</button>
<div class="scroll">
<p>This scroller does not have a tabindex value set...</p>
<div class="long"></div>
<p>You cannot see this line using the keyboard.</p>
</div>
<button>End</button>
```

<figure>
{% Video
  src="video/kheDArv5csY6rvQUJDbWRscckLr1/2TMGev8CQxXpGl7Psm4c.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}
    <figcaption>The scroller has no tabindex.</figcaption>
</figure>

Note that a scroller that contains focusable children, as in the following HTML, is already accessible, since the arrow keys will allow scrolling when the focusable children are focused. No behavior is being changed in this case. 

```html
<button>Start</button>
<div class="scroll">
<p>This is a terms and conditions text. Please scroll down to acknowledge reading.</p>
<div class="long"></div>
<button id="B">Acknowledge</button>
</div>
<button>End</button>
```

<figure>
{% Video
  src="video/kheDArv5csY6rvQUJDbWRscckLr1/9ZRpUnXqYJo3IHbyNLo1.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}
    <figcaption>The scroller is focusable due to containing focusable children.</figcaption>
</figure>

## From Chrome 120 with focusable scrollers

This feature allows scrollers without tabindex value set and without any focusable children to be keyboard focusable. This allows users who cannot or choose not to use a mouse to focus content using a keyboard's tab and arrow keys. 

```html
<button>Start</button>
<div class="scroll">
<p>This scroller does not have a tabindex value set...</p>
<div class="long"></div>
<p>but you can scroll through its content!</p>
</div>
<button>End</button>
```

<figure>
{% Video
  src="video/kheDArv5csY6rvQUJDbWRscckLr1/LmjDOeeHrW0QEcmXW8MG.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}
    <figcaption>The scroller has no tabindex or focusable children yet is still focusable.</figcaption>
</figure>

Note that this behavior only happens if the scroller has no focusable children. For example, if the scroller already contains a button, then the tab focus will skip the scroller and focus on the button directly. In this case, the scroller content can already be accessed using the arrow keys, once the button is focused. Due to this rule, the default might not always behave in the most optimal way if such children exist. If you want the scroller element itself to be keyboard focusable in this situation, it is recommended to set a tabindex value of 0 or higher.

```html
<button>Start</button>
<div class="scroll" tabindex="0">
<p>This is a terms and conditions text. Please scroll down to acknowledge reading.</p>
<div class="long"></div>
<button id="B">Acknowledge</button>
</div>
<button>End</button>
```

<figure>
{% Video
  src="video/kheDArv5csY6rvQUJDbWRscckLr1/K3brWZ9DimwKOXWRo5xw.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}
    <figcaption>The scroller has a tabindex of 0.</figcaption>
</figure>

This feature allows scrollers to be keyboard accessible by default in all cases, which  will help web users have a smoother experience when tab navigating across a page.
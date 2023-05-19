---
layout: "layouts/blog-post.njk"
title: "Introducing the popover API"
description: "Learn how to build tooltips, menus, and more with the new popover API."
authors:
  - unakravets
tags:
  - css
  - html
date: 2023-05-23
hero: 'image/HodOHWjMnbNw56hvNASHWSgZyAf2/xy3BEDAAn4GXMDudViTN.png'
alt: >
  Examples of some popovers demoed throughout the article.
---

Popovers are everywhere on the web. You can see them in menus, toggletips, and dialogs, which could manifest as account settings, disclosure widgets, and product card previews. Despite how prevalent these components are, building them in browsers is still surprisingly cumbersome. You need to add scripting to manage focus, open and close states, accessible hooks into the components, keyboard bindings to enter and exit the experience, and that’s all even before you start building the useful, unique, core functionality of your popover.

To resolve this, a new set of declarative HTML APIs for building popovers is coming to browsers, starting with the `popover` API in Chromium 114. 

## The popover attribute

{% BrowserCompat 'html.global_attributes.popover' %}

Rather than managing all of the complexity yourself, you can let the browser handle it with the [`popover` attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/popover) and subsequent set of features. HTML popovers support:

- **Promotion to the top layer.** Popovers will appear on a [separate layer](/blog/what-is-the-top-layer/) above the rest of the page, so you don’t have to futz around with z-index.
- **Light-dismiss functionality.** Clicking outside of the popover area will close the popover and return focus.
- **Default focus management.** Opening the popover makes the next tab stop inside the popover.
- **Accessible keyboard bindings.** Hitting the `esc` key will close the popover and return focus.
- **Accessible component bindings.** Connecting a popover element to a popover trigger semantically.

You can now build popovers with all of these features without using JavaScript. A basic popover requires three things:

1. A `popover` attribute on the element containing the popover.
2. An `id` on the element containing the popover.
3. A `popovertarget` with the value of the popover's `id` on the element that opens the popover.


```html
<button popovertarget="my-popover"> Open Popover </button>

<div id="my-popover" popover>
  <p>I am a popover with more information.<p>
</div>
```

Now you have a fully-functional basic popover.

{% Codepen {
    user: 'web-dot-dev',
    id: 'poxQPWP',
    height: 300,
    tab: 'result'
  }
%}

{% Video
  src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/8IO7BsdxF8ieyDG0qn0m.mp4",
  autoplay="true",
  loop="true",
  muted="true",
  controls="true"
%}

This popover could be used to convey additional information or  as a disclosure widget. 

## Defaults and overrides

By default, such as in the previous code snippet, setting up a popover with a `popovertarget` means the button or element that opens the popover will toggle it open and closed. However, you can also create explicit popovers using `popovertargetaction`. This overrides the default *toggle* action. `popovertargetaction` options include:

`popovertargetaction="show"`: Shows the popover.
`popovertargetaction="hide"`: Hides the popover.

Using `popovertargetaction="hide"`, you can create a “close” button within a popover, as in the following snippet:

```html
<button popovertarget="my-popover" popovertargetaction="hide">
    <span aria-hidden=”true”>❌</span>
    <span class="sr-only">Close</span>
</button>
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'OJBamvM',
    height: 300,
    tab: 'result'
  }
%}

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/BXZs8RR2ux2edU777Eh5.mp4", loop="true", autoplay="true", controls="true", muted="true" %}

## Auto versus manual popovers

Using the `popover` attribute on its own is actually a shortcut for `popover="auto"`. When opened, the default `popover` will force close other auto popovers, except for ancestor popovers. It can be dismissed via light-dismiss or a close button. 

On the other hand, setting `popover=manual` creates another type of popover: a manual popover. These do not force close any other element type and do not close via light-dismiss. You must close them via a timer or explicit close action. Types of popovers appropriate for `popover=manual` are elements which appear and disappear, but shouldn't affect the rest of the page, such as a toast notification.

{% Codepen {
    user: 'web-dot-dev',
    id: 'mdzpGwq',
    height: 300,
    tab: 'result'
  }
%}

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/J9pcnrgxLu5rhxWSyid8.mp4",  muted="true", loop="true", autoplay="true", controls="true" %}

If you explore the demo above, you can see that clicking outside of the popover area doesn't light-dismiss the popover. Additionally, if there were other popovers open, they wouldn't close.

To review the differences:

Popovers with `popover=auto`:
- When opened, force-close other popovers.
- Can light-dismiss.

Popovers with `popover=manual`:
- Do not force close any other element type.
- Do not light-dismiss. Close them using a toggle or close action.

### Styling popovers

So far you've learned about basic popovers in HTML. But there are also some nice styling features that come with `popover`.  One of those is the ability to style `::backdrop`. 

In `auto` popovers, this is a layer directly beneath the top layer (where the popover lives), which sits above the rest of the page. In the following example, the `::backdrop` is given a semi-transparent color:

```css
#size-guide::backdrop {
  background: rgb(190 190 190 / 50%);
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'jOeKzpb',
    height: 700,
    tab: 'result'
  }
%}

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/MYQK3USGS47wWw9yodA4.mp4", loop="true", autoplay="true", controls="true", muted="true" %}

{% Aside %}
By default, popovers get a 2px border and are positioned in the center of the UI, but they are fully customizable! You can style a popover just like any other HTML element: you can change its size, background, position on the page, and so on. 
{% endAside %}

## The difference between a `popover` and a `dialog`

It's important to note that the `popover` attribute does not provide semantics on its own. And while you can now build modal dialog-like experiences using `popover=”auto”`, there are a few key differences between the two:

A `dialog` element opened with `dialog.showModal` (a modal dialog), is an experience which requires explicit user interaction to close the modal.
A `popover` supports light-dismiss. A modal `dialog` does not.
A modal dialog [makes the rest of the page inert](/articles/inert/). A `popover` does not.

{% Codepen {
    user: 'web-dot-dev',
    id: 'BaqVrxg',
    height: 600,
    tab: 'result'
  }
%}

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/12t9jqC8VDxIiM5MIZb6.mp4", loop="true", autoplay="true", controls="true", muted="true" %}

The above demo is a semantic dialog with popover behavior. This means that the rest of the page is not inert and that the dialog popover does get light-dismiss behavior. You can build this dialog with popover behavior using the following code:

```html
<button popovertarget="candle-01">
  Quick Shop
</button>
<dialog popover id="candle-01">
  <button class="close-btn" popovertarget="candle-01" popovertargetaction="hide">...</button>
  <div class="product-preview-container">
    ...
  </div>
</dialog>
```

{% Aside %}
The [WhatWG](https://github.com/whatwg/html/issues/3567) and [OpenUI](https://github.com/openui/open-ui/issues/741) community group are currently discussing the ability to open a dialog element with HTML ergonomics. This would be similar to popover, but retain the dialog features listed previously, such as making the rest of the page inert. Watch these groups for the future of `popover`, `dialog`, and new elements like `selectmenu`.
{% endAside %}

## Coming soon

### Interactive entry and exit

The ability to animate discrete properties, including animating to and from `display: none` and animating to and from the top layer are not yet available in browsers. However, they are planned for an upcoming version of Chromium, closely following this release.

With the ability to animate discrete properties, and using `:popover-open` and `@starting-style`, you'll be able to set up before-change and after-change styles to enable smooth transitions when opening and closing popovers. Take the previous example. Animating it in and out looks much smoother and supports a more fluid user experience:

{% Codepen {
    user: 'web-dot-dev',
    id: 'OJBoLNb',
    height: 600,
    tab: 'result'
  }
%}

{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/nQfuhpV2iTuq7pQxq5Yg.mp4", loop="true", autoplay="true", controls="true", muted="true" %}

{% Aside %}
The implementation for this is currently in flux, but click through to the codepen demo for the latest syntax and try it out with the *#experimental-web-platform-features* flag turned on in Chrome Canary.
{% endAside %}

### Anchor positioning

Popovers are great when you want to position an alert, modal, or notification based on the viewport. But popovers are also useful for menus, tooltips, and other elements that need to be positioned relative to other elements. This is where CSS anchoring comes in.

The following radial menu demo uses the popover API along with [CSS anchor positioning](/blog/tether-elements-to-each-other-with-css-anchor-positioning/) to ensure that the popover `#menu-items` is always anchored to its toggle trigger, the `#menu-toggle` button.

Setting up anchors is similar to setting up popovers:

```html
<button id="menu-toggle" popovertarget="menu-items">
  Open Menu
</button>
<ul id="menu-items" popover anchor="menu-toggle">
  <li class="item">...</li>
  <li class="item">...</li>
</ul>
```

You set up an anchor by giving it an `id` (in this example, `#menu-toggle`), and then use `anchor="menu-toggle"` to connect the two elements. Now, you can use `anchor()` to style the popover. A centered popover menu that is anchored to the baseline of the anchor toggle might be styled as follows:

```css
#menu-items {
  bottom: calc(anchor(bottom));
  left: anchor(center);
  translate: -50% 0;
}
```

{% Codepen {
    user: 'web-dot-dev',
    id: 'XWxPBdr',
    height: 500,
    tab: 'result'
  }
%}


{% Video src="video/HodOHWjMnbNw56hvNASHWSgZyAf2/imnWsuQJdoTY25mYakHM.mp4", loop="true", autoplay="true", controls="true", muted="true" %}

Now you have a fully-functional popover menu that is anchored to the toggle button and has all of the built-in features of popover, no JavaScript required!

{% Aside %}
There are even more exciting new features of CSS anchoring, such as `@try` statements to swap the position of the menu based on its available viewport space. This implementation is subject to chance. Explore the Codepen demo above with the *#experimental-web-platform-features* flag turned on in Chrome Canary for more.
{% endAside %}

## Conclusion

The popover API is the first step in a series of new capabilities to make building web applications easier to manage and more accessible by default. I'm excited to see how you use popovers!

### Additional Reading
- [Dialogs and popovers seem similar. How are they different?](https://hidde.blog/dialog-modal-popover-differences/)
- [Semantics and the popover attribute](https://hidde.blog/popover-semantics/)
- [MDN documentation on popover](https://developer.mozilla.org/docs/Web/API/Popover_API)
- [OpenUI popover explainer](https://open-ui.org/components/popover.research.explainer/)

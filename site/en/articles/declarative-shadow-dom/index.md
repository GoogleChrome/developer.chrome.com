---
layout: 'layouts/blog-post.njk'
title: Declarative Shadow DOM
subhead: |
  A new way to implement and use Shadow DOM directly in HTML.
date: 2023-02-17
hero: image/admin/IIPe5m8edvp0XMPpzrz9.jpg
alt: decorative shadow dome
authors:
  - developit
  - masonfreed
description: |
  Declarative Shadow DOM is a new way to implement and use Shadow DOM directly in HTML.
tags:
  - dom
  - html
  - javascript
  - rendering
feedback:
  - api
---

Declarative Shadow DOM is a web platform feature, [currently in the standardization process](https://github.com/whatwg/html/pull/5465).
It is enabled by default in Chrome version 111.

{% Aside %}
Declarative Shadow DOM has been available since Chrome 90 and Edge 91, but it used an older non-standard attribute called
`shadowroot` instead of the standardized `shadowrootmode` attribute.
{% endAside %}

[Shadow DOM](https://web.dev/shadowdom-v1/) is one of the three Web Components standards, rounded out by [HTML templates](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots)
and [Custom Elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements). Shadow DOM provides
a way to scope CSS styles to a specific DOM subtree and isolate that subtree from the rest of the document. The `<slot>` element
gives us a way to control where the children of a Custom Element should be inserted within its Shadow Tree. These features
combined enable a system for building self-contained, reusable components that integrate seamlessly into existing applications
just like a built-in HTML element.

Until now, the only way to use Shadow DOM was to construct a shadow root using JavaScript:

```javascript
const host = document.getElementById('host');
const shadowRoot = host.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>';
```

An imperative API like this works fine for client-side rendering: the same JavaScript modules that define our Custom Elements
also create their Shadow Roots and set their content. However, many web applications need to render content server-side or to
static HTML at build time. This can be an important part of delivering a reasonable experience to visitors who may not be capable
of running JavaScript.

The justifications for [Server-Side Rendering](https://web.dev/rendering-on-the-web/) (SSR) vary from project to project. Some
websites must provide fully functional server-rendered HTML in order to meet accessibility guidelines, others choose to deliver a
baseline no-JavaScript experience as a way to guarantee good performance on slow connections or devices.

Historically, it has been difficult to use Shadow DOM in combination with Server-Side Rendering because there was no built-in
way to express Shadow Roots in the server-generated HTML. There are also performance implications when attaching Shadow Roots to
DOM elements that have already been rendered without them. This can cause layout shifting after the page has loaded, or temporarily
show a flash of unstyled content ("FOUC") while loading the Shadow Root's stylesheets.

[Declarative Shadow DOM](https://github.com/mfreed7/declarative-shadow-dom/blob/master/README.md) (DSD) removes this limitation,
bringing Shadow DOM to the server.

## Building a Declarative Shadow Root

A Declarative Shadow Root is a `<template>` element with a `shadowrootmode` attribute:

```html
<host-element>
  <template shadowrootmode="open">
    <slot></slot>
  </template>
  <h2>Light content</h2>
</host-element>
```

A template element with the `shadowrootmode` attribute is detected by the HTML parser and immediately applied as the shadow
root of its parent element. Loading the pure HTML markup from the above sample results in the following DOM tree:


```html
<host-element>
  #shadow-root (open)
  <slot>
    ↳
    <h2>Light content</h2>
  </slot>
</host-element>
```

This code sample is following the Chrome DevTools Elements panel's conventions for displaying Shadow DOM content. For example,
the ↳ character represents slotted Light DOM content.

This gives us the benefits of Shadow DOM's encapsulation and slot projection in static HTML. No JavaScript is needed to produce
the entire tree, including the Shadow Root.

## Component hydration

Declarative Shadow DOM can be used on its own as a way to encapsulate styles or customize child placement, but it's most
powerful when used with Custom Elements. Components built using Custom Elements get automatically upgraded from static HTML.
With the introduction of Declarative Shadow DOM, it's now possible for a Custom Element to have a shadow root before it gets
upgraded.

A Custom Element being upgraded from HTML that includes a Declarative Shadow Root will already have that shadow root
attached. This means the element will have a shadowRoot property already available when it is instantiated, without
your code explicitly creating one. It's best to check `this.shadowRoot` for any existing shadow root in your element's
constructor. If there is already a value, the HTML for this component includes a Declarative Shadow Root. If the value is
null, there was no Declarative Shadow Root present in the HTML or the browser doesn't support Declarative Shadow DOM.

```html
<menu-toggle>
  <template shadowrootmode="open">
    <button>
      <slot></slot>
    </button>
  </template>
  Open Menu
</menu-toggle>
<script>
  class MenuToggle extends HTMLElement {
    constructor() {
      super();

      // Detect whether we have SSR content already:
      if (this.shadowRoot) {
        // A Declarative Shadow Root exists!
        // wire up event listeners, references, etc.:
        const button = this.shadowRoot.firstElementChild;
        button.addEventListener('click', toggle);
      } else {
        // A Declarative Shadow Root doesn't exist.
        // Create a new shadow root and populate it:
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `<button><slot></slot></button>`;
        shadow.firstChild.addEventListener('click', toggle);
      }
    }
  }

  customElements.define('menu-toggle', MenuToggle);
</script>
```

Custom Elements have been around for a while, and until now there was no reason to check for an existing shadow root before
creating one using `attachShadow()`. Declarative Shadow DOM includes a small change that allows existing components to work
despite this: calling the `attachShadow()` method on an element with an existing **Declarative** Shadow Root will **not**
throw an error. Instead, the Declarative Shadow Root is emptied and returned. This allows older components not built for
Declarative Shadow DOM to continue working, since declarative roots are preserved until an imperative replacement is created.

For newly-created Custom Elements, a new [`ElementInternals.shadowRoot`](https://github.com/WICG/webcomponents/issues/871)
property provides an explicit way to get a reference to an element's existing Declarative Shadow Root, both open and closed. This
can be used to check for and use any Declarative Shadow Root, while still falling back `toattachShadow()` in cases where one was
not provided.

```javascript
class MenuToggle extends HTMLElement {
  constructor() {
    super();

    const internals = this.attachInternals();

    // check for a Declarative Shadow Root:
    let shadow = internals.shadowRoot;
    if (!shadow) {
      // there wasn't one. create a new Shadow Root:
      shadow = this.attachShadow({
        mode: 'open'
      });
      shadow.innerHTML = `<button><slot></slot></button>`;
    }

    // in either case, wire up our event listener:
    shadow.firstChild.addEventListener('click', toggle);
  }
}
customElements.define('menu-toggle', MenuToggle);
```

## One shadow per root

A Declarative Shadow Root is only associated with its parent element. This means shadow roots are always colocated with
their associated element. This design decision ensures shadow roots are streamable like the rest of an HTML document. It's
also convenient for authoring and generation, since adding a shadow root to an element does not require maintaining a registry
of existing shadow roots.

The tradeoff of associating shadow roots with their parent element is that it is not possible for multiple elements to be initialized
from the same Declarative Shadow Root `<template>`. However, this is unlikely to matter in most cases where Declarative Shadow DOM is
used, since the contents of each shadow root are seldom identical. While server-rendered HTML often contains repeated element structures,
their content generally differs–for example, slight variations in text, or attributes. Because the contents of a serialized Declarative
Shadow Root are entirely static, upgrading multiple elements from a single Declarative Shadow Root would only work if the elements
happened to be identical. Finally, the impact of repeated similar shadow roots on network transfer size is relatively small due to
the effects of compression.

In the future, it might be possible to revisit shared shadow roots. If the DOM gains support for [built-in templating](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md),
Declarative Shadow Roots could be treated as templates that are instantiated in order to construct the shadow root for a given element.
The current Declarative Shadow DOM design allows for this possibility to exist in the future by limiting shadow root association to a
single element.

## Streaming is cool

Associating Declarative Shadow Roots directly with their parent element simplifies the process of upgrading and attaching them to
that element. Declarative Shadow Roots are detected during HTML parsing, and attached immediately when their **opening** `<template>`
tag is encountered. Parsed HTML within the `<template>` is parsed directly into the shadow root, so it can be "streamed": rendered as it is received.

```html
<div id="el">
  <script>
    el.shadowRoot; // null
  </script>

  <template shadowrootmode="open">
    <!-- shadow realm -->
  </template>

  <script>
    el.shadowRoot; // ShadowRoot
  </script>
</div>
```

## Parser-only

Declarative Shadow DOM is a feature of the HTML parser. This means that a Declarative Shadow Root will only be parsed and attached for `<template>`
tags with a `shadowrootmode` attribute that are present during HTML parsing. In other words, Declarative Shadow Roots can
be constructed during initial HTML parsing:

```html
<some-element>
  <template shadowrootmode="open">
    shadow root content for some-element
  </template>
</some-element>
```

Setting the `shadowrootmode` attribute of a `<template>` element does nothing, and the template remains an ordinary template
element:

```javascript
const div = document.createElement('div');
const template = document.createElement('template');
template.setAttribute('shadowrootmode', 'open'); // this does nothing
div.appendChild(template);
div.shadowRoot; // null
```

To avoid some important security considerations, Declarative Shadow Roots also can't be created using fragment parsing APIs
like `innerHTML` or `insertAdjacentHTML()`. The only way to parse HTML with Declarative Shadow Roots applied is to pass a
new `includeShadowRoots` option to `DOMParser`:

```html
<script>
  const html = `
    <div>
      <template shadowrootmode="open"></template>
    </div>
  `;
  const div = document.createElement('div');
  div.innerHTML = html; // No shadow root here
  const fragment = new DOMParser().parseFromString(html, 'text/html', {
    includeShadowRoots: true
  }); // Shadow root here
</script>
```

## Server-rendering with style

Inline and external stylesheets are fully supported inside Declarative Shadow Roots using the standard `<style>` and `<link>` tags:

```html
<nineties-button>
  <template shadowrootmode="open">
    <style>
      button {
        color: seagreen;
      }
    </style>
    <link rel="stylesheet" href="/comicsans.css" />
    <button>
      <slot></slot>
    </button>
  </template>
  I'm Blue
</nineties-button>
```

Styles specified this way are also highly optimized: if the same stylesheet is present in multiple Declarative Shadow Roots,
it is only loaded and parsed once. The browser uses a single backing `CSSStyleSheet` that is shared by all of the shadow roots,
eliminating duplicate memory overhead.

[Constructable Stylesheets](https://web.dev/constructable-stylesheets/) are not supported in Declarative Shadow DOM. This
is because there is currently no way to serialize constructable stylesheets in HTML, and no way to refer to them when
populating `adoptedStyleSheets`.

## Avoiding the flash of unstyled content

One potential issue in browsers that do not yet support Declarative Shadow DOM is avoiding "flash of unstyled content" (FOUC),
where the raw contents are shown for Custom Elements that have not yet been upgraded. Prior to Declarative Shadow DOM, one common technique
for avoiding FOUC was to apply a `display:none` style rule to Custom Elements that haven't been loaded yet, since these have
not had their shadow root attached and populated. In this way, content is not displayed until it is "ready":

```html
<style>
  x-foo:not(:defined) > * {
    display: none;
  }
</style>
```

With the introduction of Declarative Shadow DOM, Custom Elements can be rendered or authored in HTML such that their shadow
content is in-place and ready before the client-side component implementation is loaded:

```html
<x-foo>
  <template shadowrootmode="open">
    <style>h2 { color: blue; }</style>
    <h2>shadow content</h2>
  </template>
</x-foo>
```

In this case, the `display:none` "FOUC" rule would prevent the declarative shadow root's content from showing. However,
removing that rule would cause browsers without Declarative Shadow DOM support to show incorrect or unstyled content until
the Declarative Shadow DOM [polyfill](https://web.dev/declarative-shadow-dom/#polyfill) loads and converts the shadow root
template into a real shadow root.

Fortunately, this can be solved in CSS by modifying the FOUC style rule. In browsers that support Declarative Shadow DOM, the
`<template shadowrootmode>` element is immediately converted into a shadow root, leaving no `<template>` element in the DOM
tree. Browsers that don't support Declarative Shadow DOM preserve the `<template>` element, which we can use to prevent FOUC:

```html
<style>
  x-foo:not(:defined) > template[shadowrootmode] ~ *  {
    display: none;
  }
</style>
```

Instead of hiding the not-yet-defined Custom Element, the revised "FOUC" rule hides its *children* when they follow a
`<template shadowrootmode>` element. Once the Custom Element is defined, the rule no longer matches. The rule is ignored
in browsers that support Declarative Shadow DOM because the `<template shadowrootmode>` child is removed during HTML parsing.

## Feature detection and browser support

Declarative Shadow DOM has been available since Chrome 90 and Edge 91, but it used an older non-standard attribute called
`shadowroot` instead of the standardized `shadowrootmode` attribute. The newer `shadowrootmode` attribute and streaming
behavior is available in Chrome 111 and Edge Xyz.

As a new web platform API, Declarative Shadow DOM does not yet have widespread support across all browsers. Browser support
can be detected by checking for the existence of a `shadowRootMode` property on the prototype of `HTMLTemplateElement`:

```javascript
function supportsDeclarativeShadowDOM() {
  return HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode');
}
```

## Polyfill

Building a simplified polyfill for Declarative Shadow DOM is relatively straightforward, since a polyfill doesn't need to
perfectly replicate the timing semantics or parser-only characteristics that a browser implementation concerns itself
with. To polyfill Declarative Shadow DOM, we can scan the DOM to find all `<template shadowrootmode>` elements, then convert
them to attached Shadow Roots on their parent element. This process can be done once the document is ready, or triggered by
more specific events like Custom Element lifecycles.

```javascript
(function attachShadowRoots(root) {
  root.querySelectorAll("template[shadowrootmode]").forEach(template => {
    const mode = template.getAttribute("shadowrootmode");
    const shadowRoot = template.parentNode.attachShadow({ mode });
    shadowRoot.appendChild(template.content);
    template.remove();
    attachShadowRoots(shadowRoot);
  });
})(document);
```

## Further reading

* [Chromestatus for Streaming Declarative Shadow DOM](https://chromestatus.com/feature/5161240576393216)
* [HTML Spec Pull Request](https://github.com/whatwg/html/pull/5465)

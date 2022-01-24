---
layout: 'layouts/blog-post.njk'
title: Restricting Wasm module sharing to same-origin
description: >
  Sharing a WebAssembly module between same-site environments will be restricted to just same-origin.
subhead: >
  Sharing a WebAssembly module between same-site environments will be restricted to just same-origin.
date: 2021-07-29
authors:
  - agektmr
tags:
  - security
hero: 'image/QMjXarRXcMarxQddwrEdPvHVM242/xmcGF7REnAOLpRjSI6do.jpg'
alt: >
  'A typewriter typing "Sharing"'
---

Sharing a WebAssembly (Wasm) module between [same-site but
cross-origin](https://web.dev/same-site-same-origin/) environments will be
deprecated to allow [agent
clusters](https://html.spec.whatwg.org/multipage/origin.html#origin-keyed-agent-clusters)
to be scoped to origins long term. Developers who are using Wasm modules in such
a way must make sure to instantiate those modules at the same-origin to continue
using them after Chrome 95.

## What are Wasm modules and how they work

WebAssembly programs are organized into modules, which are the unit of
deployment, loading, and compilation.

In the following example code, a Wasm module imported from
`https://iframe.site.example` is shared with `https://main.site.example` via
`postMessage()`. Notice these domains are [same-site but
cross-origin](https://web.dev/same-site-same-origin/).

Wasm module on `https://iframe.site.example`:

```javascript
(async () => {
  const instance = await WebAssembly.instantiateStreaming(fetch('./add.wasm'), {});
  iframe.contentWindow.postMessage(instance.module, `https://main.site.example`);
})();
```

Starting from Chrome 95, the sender and the receiver must be the same-origin. In
the above case, `https://iframe.site.example` needs to be
`https://main.site.example` or the other way around.

## Why this is needed

Chrome has been internally handling different documents, tabs, and frames on
site-keyed agent clusters. This means the same-site documents are handled within
the same process (how exactly this works varies per browser). Recently, Chrome
started to handle them in more fine grained units: origins. We call it
*origin-keyed agent clusters*. However, because doing so is resource expensive,
origin-keyed agent clusters were applied only to limited websites heuristically.

The plan is to make all agent clusters origin-keyed by default. In order to
achieve this, we need to restrict the capabilities that require site-keyed
origin clusters:

* (Chrome-only) You can no longer send
  [`SharedArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
  or
  [`WebAssembly.Memory`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory)
  objects to other same-site cross-origin pages. This is [already in place since
  Chrome 92](/blog/enabling-shared-array-buffer/).
* You can no longer send
  [`WebAssembly.Module`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module)
  objects to other same-site cross-origin pages via `postMessage()`. This change
  is explained in more detail below..
* You can no longer set
  [`document.domain`](https://developer.mozilla.org/docs/Web/API/Document/domain).
  This is a legacy feature that normally allows same-site cross-origin pages to
  synchronously access each other's DOM, but in origin-keyed agent clusters, it
  is disabled.

By addressing all above changes, Chrome will move to use origin-keyed agent
clusters by default.

To learn more about origin-keyed agent clusters, see [Requesting performance
isolation with the Origin-Agent-Cluster
header](https://web.dev/origin-agent-cluster/).

## Next steps and resources

In order to make Chrome work with origin-keyed agent clusters by default, we'll
make `document.domain` read only. The Chrome team is aiming to land this change
sometime in 2022.

* [Origin-keyed agent clusters
  explainer](https://github.com/WICG/origin-agent-cluster)
* [Isolation by Default](https://speakerdeck.com/mikewest/isolation-by-default)
* [Deprecating
  `document.domain`](https://github.com/mikewest/deprecating-document-domain)

Photo by [Markus
Winkler](https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

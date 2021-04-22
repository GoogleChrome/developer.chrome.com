---
title: "Improved WebAssembly debugging in Chrome DevTools"
description: >
  Step over code, set breakpoints, and resolve stack traces in your source languages from within DevTools.
layout: "layouts/blog-post.njk"
authors:
  - ingvarstepanyan
date: 2019-12-05
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OLwAS705RrpdJkBymTRB.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

## Background

Until recently, the only WebAssembly debugging that Chrome DevTools supported was viewing 
raw WebAssembly stack traces, and stepping over individual instructions in a 
disassembled WebAssembly text format.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AXC6Bckkc9hmT7Ga8LS5.png", alt="A screenshot of the previously limited WebAssembly debugging support in 
            Chrome DevTools.", width="800", height="390" %}

While this works with any WebAssembly module and helps somewhat with debugging small, isolated functions, it's not very practical for larger apps where the mapping between the disassembled code and your sources is less obvious.

### A temporary workaround

To work around this problem, Emscripten and DevTools have temporarily adapted the existing 
[source maps](https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) format to WebAssembly. This allowed mappings
between binary offsets in the compiled module to original locations in source files.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yfen6cmVLP1GamPXkx4R.png", alt="A screenshot of the source-maps-powered debugging.", width="800", height="390" %}

However, source maps were designed for text formats with clear mappings to JavaScript concepts and values, not for binary formats like WebAssembly with arbitrary source languages, type systems, and a linear memory. This made the integration hacky, limited, and not widely supported outside Emscripten.

## Enter DWARF

On the other hand, many native languages already have a common debugging format,
[DWARF](http://dwarfstd.org/), that provides all the necessary information for debuggers to resolve locations, variable names, type layouts, and more.

While there are still some WebAssembly-specific features that need to be added for full compatibility, compilers like Clang and Rust already support emitting DWARF information in WebAssembly modules, which enabled the DevTools team to start using it
directly in DevTools.

As the first step, DevTools now supports native source mapping using this information, so you can start debugging Wasm modules produced by any of these compilers without resorting to the disassembled format or having to use any custom scripts.

Instead, you just need to tell your compiler to include debug info like you normally would on other platforms. For example, in Clang and Emscripten this can be done by passing a `-g` flag during compilation:

```bash
  clang -g …sources… -target wasm32 -o out.wasm

  emcc -g …sources… -o out.js
```

You can use same `-g` flag in Rust:

```bash
  rustc -g source.rs --target wasm32-unknown-unknown -o out.wasm
```

Or, if you're using Cargo, the debug info will be included by default:

```bash
  cargo build --target wasm32-unknown-unknown
```

This new DevTools integration with DWARF already covers support for stepping over the code, setting breakpoints, and resolving stack traces in your source languages.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JSQtk7ODB2OQxWBVTvDV.png", alt="A screenshot of the new DWARF-powered debugging.", width="800", height="390" %}

## The future

There is still quite a bit of work to do though.
For example, on the tooling side, ~~Emscripten (Binaryen) and~~ wasm-pack (wasm-bindgen) doesn't support updating DWARF information on transformations they perform yet. For now, they won't benefit from this integration. 

And on the Chrome DevTools side, we'll be evolving integration more over time to ensure a seamless debugging experience, including: 

* Resolving variable names
* Pretty-printing types
* Evaluating expressions in source languages
* …and much more!

Stay tuned for future updates!

{% Aside %}
*Updated 2020-06-19*: 

The original blog post used to state that Emscripten doesn't support DWARF yet. This has been fixed since, and Emscripten preserves debug information end-to-end, throughout any transformations and optimisations.
{% endAside %}
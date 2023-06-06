---
layout: "layouts/doc-post.njk"
title: "Debug C/C++ WebAssembly"
authors:
  - sofiayem
date: 2023-06-06
#updated: YYYY-MM-DD
description: "Learn how to use Chrome DevTools to find and fix bugs in C/C++ WebAssembly."
tags:
  - get-started
---

[WebAssembly](https://developer.mozilla.org/docs/WebAssembly) provides a way to run, for example, C/C++ code on the web at near native speed and alongside JavaScript. This document shows how to set up and use Chrome DevTools for easier debugging of such applications.

## Set up {: #set-up }

To enable C/C++ WebAssembly debugging in DevTools:

1. Compile your application with [DWARF](https://dwarfstd.org/) debugging information included. Run the [latest Emscripten compiler](https://github.com/emscripten-core/emsdk#downloads--how-do-i-get-the-latest-emscripten-build) and pass it the `-g` flag:

    ```bash
    emcc -g your-app.c -o your-app.html
    ```
1. Install the [C/C++ DevTools Support (DWARF) Chrome extension](goo.gle/wasm-debugging-extension).

## Explore benefits {: #benefits }

Once set up, Chrome DevTools has what it needs to let you:

- Inspect your original source code in **Sources**.
- Pause your code with breakpoints and step through the original code.
- Understand function names in **Call Stack** and variables in **Scope**.
- Evaluate expressions in the original language in **Console**.

## Debug C/C++ WebAssembly {: #debug }


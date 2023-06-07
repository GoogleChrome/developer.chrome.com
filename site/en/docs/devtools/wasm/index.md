---
layout: "layouts/doc-post.njk"
title: "Debug C/C++ WebAssembly"
authors:
  - sofiayem
date: 2023-06-07
#updated: YYYY-MM-DD
description: "Learn how to use Chrome DevTools to find and fix bugs in C/C++ WebAssembly."
tags:
  - get-started
---

[WebAssembly](https://developer.mozilla.org/docs/WebAssembly) provides a way to run, for example, C/C++ code on the web at near native speed and alongside JavaScript. This document shows how to set up and use Chrome DevTools for easier debugging of such applications.

Once you set up DevTools, you can:

- Inspect your original code in **Sources** > **Editor**.
- Pause execution with line-of-code [breakpoints](/docs/devtools/javascript/breakpoints/#loc) and step through your original code, not the packaged `.wasm` file.

And, while paused, you can:

- Hover over variables in the original source file and see their values.
- Understand function names in **Call Stack** and variables in **Scope**.
- Output deeply nested properties and complex objects to the **Console**.
- Inspect object memory with [**Memory Inspector**](/docs/devtools/memory-inspector/#wasm).

## Set up {: #set-up }

To enable C/C++ WebAssembly debugging in DevTools:

1. Compile your application with [DWARF](https://dwarfstd.org/) debugging information included. Run the [latest Emscripten compiler](https://github.com/emscripten-core/emsdk#downloads--how-do-i-get-the-latest-emscripten-build) and pass it the `-g` flag. For example:

    ```bash
    emcc -g source.c -o app.html
    ```
1. Install the [C/C++ DevTools Support (DWARF) Chrome extension](goo.gle/wasm-debugging-extension).

## Debug {: #debug }

Now you can debug C/C++ WebAssembly similar to how you would debug JavaScript:

1. [Open DevTools](/docs/devtools/open/) to inspect your website. For this tutorial, you can try it on this [demo page](https://emscripten-dbg-stories.netlify.app/mandelbrot.html).
1. Optionally, group the files you authored for easier navigation. In **Sources**, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} > **Page** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} > **Group by Authored/Deployed** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}.
1. Select the `mandelbrot.cc` original source file from the file tree.
1. To set a [line-of-code breakpoint](/docs/devtools/javascript/breakpoints/#loc), click a line number in the column to the left of the **Editor**, for example, on line 38.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1Bsy2zi8gmeo3XJX4X3a.png", alt="A line-of-code breakpoint set on line 38.", width="800", height="490" %}

1. Reload the page to run the application again. The execution pauses before the line with the breakpoint.

While paused, try the following:

- In **Sources** > **Editor**, hover over a variable to its value in a tooltip.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RlXe0bF3r7DAb1gOnVxJ.png", alt="The value of a variable in a tooltip.", width="800", height="490" %}

- In **Sources** > **Call Stack**, view function names as they are in the source.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ThxH46EBPaLxqhNAOzXU.png", alt="The main function in the Call Stack.", width="800", height="428" %}

- In **Sources** > **Scope**, view local and global variables, their types, and values.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7kAzmM4kHVKnwyK9XbeM.png", alt="The Scope pane with local variables and their values.", width="800", height="442" %}

- In **Console**, output expandable complex objects and deeply nested variables that are hard to navigate to in **Scope**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/NJQCpiou4bhmV22OL9gT.png", alt="A nested variable and a complex object expanded in the Console.", width="800", height="515" %}

- In **Sources** > **Scope**, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jgJz0iMIw4XhDqhdwYP2.svg", alt="Memory.", width="20", height="20" %} icon to open the **Memory Inspector** and inspect the raw bytes of object memory. For more information, see [WebAssembly memory inspection](/docs/devtools/memory-inspector/#wasm).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mD5y0xEJJ7kCfclIGwWS.png", alt="Inspecting the memory of a variable.", width="800", height="633" %}

## Troubleshoot {: #troubleshoot }
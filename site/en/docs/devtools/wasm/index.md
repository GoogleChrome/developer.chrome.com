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
  - wasm
---

[WebAssembly](https://developer.mozilla.org/docs/WebAssembly) provides a way to run, for example, C/C++ code on the web at near native speed and alongside JavaScript. This document shows how to set up and use Chrome DevTools to better debug such applications.

{% YouTube id='VBMHswhun-s', startTime='170' %}

Once you set up DevTools, you can:

- Inspect your original code in **Sources** > **Editor**.
- Pause execution with line-of-code [breakpoints](/docs/devtools/javascript/breakpoints/#loc) and step through your original C/C++ source code, not the compiled `.wasm` binary file.

And, while paused, you can:

- Hover over variables in the original source file and see their values.
- Understand function names in **Call Stack** and variables in **Scope**.
- Output deeply nested properties and complex objects to the **Console**.
- Inspect object memory with [**Memory Inspector**](/docs/devtools/memory-inspector/#wasm).

## Set up {: #set-up }

To enable C/C++ WebAssembly debugging in DevTools:

1. Compile your application with [DWARF](https://dwarfstd.org/) debug information included. Run the [latest Emscripten compiler](https://github.com/emscripten-core/emsdk#downloads--how-do-i-get-the-latest-emscripten-build) and pass it the `-g` flag. For example:

    ```bash
    emcc -g source.cc -o app.html
    ```
    For more information, see [Building projects with debug information](https://emscripten.org/docs/compiling/Building-Projects.html#building-projects-with-debug-information).
1. Install the [C/C++ DevTools Support (DWARF) Chrome extension](https://goo.gle/wasm-debugging-extension).

## Debug {: #debug }

With DevTools set up, debug your code:

1. [Open DevTools](/docs/devtools/open/) to inspect your website. For this tutorial, you can try it on this [demo page](https://emscripten-dbg-stories.netlify.app/mandelbrot.html), which was compiled with the required `-g` flag.
1. Optionally, group the files you authored for easier navigation. In **Sources**, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} > **Page** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} > [**Group by Authored/Deployed**](/docs/devtools/javascript/reference/#group-authored-and-deployed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}.
1. Select your original source file from the file tree. In this case, `mandelbrot.cc`.
1. To set a [line-of-code breakpoint](/docs/devtools/javascript/breakpoints/#loc), click a line number in the column to the left of the **Editor**, for example, on line 38.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1Bsy2zi8gmeo3XJX4X3a.png", alt="A line-of-code breakpoint set on line 38.", width="800", height="490" %}

1. Run the code again. The execution pauses before the line with the breakpoint.

While paused, try the following:

- In **Sources** > **Editor**, hover over a variable to see its value in a tooltip.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RlXe0bF3r7DAb1gOnVxJ.png", alt="The value of a variable in a tooltip.", width="800", height="490" %}

- In **Sources** > **Call Stack**, view function names as they are in the source.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ThxH46EBPaLxqhNAOzXU.png", alt="The main function in the Call Stack.", width="800", height="428" %}

- In **Sources** > **Scope**, view local and global variables, their types, and values.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7kAzmM4kHVKnwyK9XbeM.png", alt="The Scope pane with local variables and their values.", width="800", height="442" %}

- In **Console**, output variables and objects that are hard to navigate to in **Scope**:

  - Deeply nested variables, for example, indexed items in big arrays.
  - Complex objects, including those you can access with pointers (`->`). Expand them to inspect.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ieeESEUXLsEsP7jl7evq.png", alt="A nested variable and a complex object expanded in the Console.", width="800", height="668" %}

- In **Sources** > **Scope**, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jgJz0iMIw4XhDqhdwYP2.svg", alt="Memory.", width="20", height="20" %} icon to open the **Memory Inspector** and inspect the raw bytes of object memory. For more information, see [WebAssembly memory inspection](/docs/devtools/memory-inspector/#wasm).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mD5y0xEJJ7kCfclIGwWS.png", alt="Inspecting the memory of a variable.", width="800", height="633" %}

## Profile performance {: #perf }

With DevTools set up and open, the code Chrome runs isn't optimized. It's [tiered down](https://v8.dev/docs/wasm-compilation-pipeline#debugging) to give you better debugging experience.

In this case, you can't rely on `console.time()` and `performance.now()`  in your code to profile performance. Instead, use the [**Performance**](/docs/devtools/performance/reference/#record) panel to profile.

Alternatively, you can run your profiling code without opening DevTools, then open it to inspect the messages in the **Console**.

## Separate the debug information {: #separate-debug }

To speed up loading but still have a better debugging experience, you can split out the debug information into a separate `.wasm` file. For more information, see [Debugging WebAssembly Faster](/blog/faster-wasm-debugging/).

You can either keep this file locally or host it on a separate server. To do it with Emscripten, pass the [`-gseparate-dwarf=<filename>`](https://emscripten.org/docs/tools_reference/emcc.html#:~:text=%2Dgseparate%2Ddwarf%5B) flag and specify the path to the file:

```bash
emcc -g source.cc -o app.html \
     -gseparate-dwarf=temp.debug.wasm \
     -s SEPARATE_DWARF_URL=[file://local/path/to/temp.debug.wasm] | [URL]
```

## Build and debug on different machines {: #map-path }

If you build on a machine with a different operating system (container, VM, or remote server) than that on the machine you run Chrome on, you may need to manually map the debug file paths.

For example, if your project is at `C:\src\project` locally but was built in a Docker container with the path `/mnt/c/src/project`, do the following:

1. Go to `chrome://extensions/`, find the **C/C++ DevTools Support (DWARF)** extension, and click **Details** > **Extension options**.
1. Specify the old and the new file paths.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WCOGAriNKcneShbJ2Yvc.png", alt="Specified old and new file paths.", width="800", height="754" %}

## Learn more {: #learn-more }

Check out the Chrome DevTools engineering blog for more information on WebAssembly debugging:

- [Debugging WebAssembly with modern tools](/blog/wasm-debugging-2020/)
- [Debugging WebAssembly Faster](/blog/faster-wasm-debugging/)
- [Introducing the Memory Inspector](/blog/memory-inspector/#introduction)
- [Extending the Memory Inspector for C/C++ debugging](/blog/memory-inspector-extended-cpp/)

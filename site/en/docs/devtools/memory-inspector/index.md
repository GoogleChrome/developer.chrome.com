---
layout: "layouts/doc-post.njk"
title: "Memory Inspector: Inspect ArrayBuffer, TypedArray, DataView, and Wasm Memory."
authors:
  - jecelynyeen
  - sofiayem
date: 2020-08-20
updated: 2022-10-25
description: "Use the Memory inspector to inspect an ArrayBuffer, TypedArray, or DataView in JavaScript as well as WebAssembly.Memory of C++ Wasm apps."
tags:
  - wasm
---

{% Aside %}
The Memory Inspector panel is available from Chrome 91. You can check your version at `chrome://version/`. 
{% endAside %}

Use the new **Memory inspector** to inspect `ArrayBuffer`, `TypedArray`, and `DataView` memory in JavaScript as well as `WebAssembly.Memory` of Wasm applications written in C++.

## Open the Memory Inspector {: #open }

There are a few ways to open the **Memory inspector**.

### Open from the menu  {: #open-from-menu }

1. [Open DevTools](/docs/devtools/open/).
2. Click **More Options** {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="6", height="22" %} > **More tools** > **Memory inspector**.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PBV15PXwV7eftpmeaGVN.png", alt="Memory inspector menu", width="800", height="499" %}


### Open during debugging {: #open-debug }

1. Open a page with JavaScript `ArrayBuffer`. We will be using [this demo page](http://memory-inspector.glitch.me/demo-js.html).
2. [Open DevTools](/docs/devtools/open/).
3. Open the **demo-js.js** file in the **Sources** panel, set a breakpoint at line 18.
4. Refresh the page.
5. Expand the **Scope** section on the right **Debugger** pane. 
6. You can open the **Memory inspector**:
    
    - **From the icon**. Clicking on the icon next to the `buffer` property, or
    - **From the context menu**. Right click on the `buffer` property and select **Reveal in Memory Inspector panel**.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QjCkBSuGQ8x9cj5uDdbo.png", alt="Reveal in Memory Inspector panel", width="800", height="602" %}

### Inspect multiple objects {: #open-multiple }

1. You can inspect [DataView](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) or [TypedArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) as well. For example, `b2` is a `TypedArray`. To inspect that, right click on the `b2` property and select **Reveal in Memory Inspector panel** (No icon for `TypedArray` or `DataView` yet).
2. A new tab is opened in the **Memory inspector**. Please note that you can inspect multiple objects at once. 
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZaLWbrktT6N3sHMhyLHA.png", alt="New tab in the Memory inspector", width="800", height="602" %}


## The Memory inspector {: #inspector }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Q7ynuEVSKHlcLoBI8xjZ.jpg", alt="The Memory inspector", width="800", height="478" %}

The **Memory inspector** consists of 3 main areas:


### Navigation bar {: #nav-bar }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FSDfhwDYEkL2yPwJOWvx.jpg", alt="Navigation bar", width="800", height="85" %}

1. The **address input** shows the current byte address in hex format. You can input a new value to jump to a new location in the memory buffer. For example, try type `0x00000008`.
2. Memory buffers could be longer than a page. Instead of scrolling through, you can use the **left** and **right** button to navigate.
3. The buttons on the left allow a **forward/backward** navigation.
4. By default, the buffer is automatically updated on stepping. In the case it's not, the **refresh** button gives you the option to refresh the memory and update its contents.

### Memory buffer {: #buffer }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4dzzRu6TRCB70fmMXjIS.jpg", alt="Memory buffer", width="613", height="518" %}

1. From the left, the **address** is displayed in hex format.
2. The **memory** is also shown in hex format, each byte separated by a space. The currently selected byte is highlighted. You can click on the byte or navigate with keyboard (left, right, up, down).
3. An **ASCII representation** of the memory is shown on the right side. A highlight shows the corresponding value to the selected bits on the byte. Similar to memory, you can click on the byte or navigate with keyboard (left, right, up, down).


### Value inspector {: #value-inspector }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/icshYGOKAiZp1uy7hOoM.jpg", alt="Value inspector", width="800", height="417" %}

1. A top toolbar features a button to switch between **big and little endian** and to open the **settings**. Open the **settings** to select which value types they want to see per default in the inspector. 
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Yo4JHzfWgfGKEK5FHPvD.png", alt="toolbar button", width="800", height="333" %}
2. The main area shows all the **value interpretations** as per the **settings**. By default, all are shown.
3. The **encoding** is clickable. You can switch between dec, hex, oct for integer and sci, dec for floats.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NIxBbl3ouwAdTlU0xvls.png", alt="Encoding switch", width="800", height="220" %}


## Inspecting memory {: #inspect }

Let's inspect the memory together. 

1. Follow these steps to [start](#open-debug) the debugging.
2. Change the address to `0x00000027` in the **address input**. 
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/S8m0VP5MuCr9YkZQx7mR.png", alt="address input", width="800", height="602" %}
3. Observe the **ASCII representation** and the **value interpretations**. All values are empty at the moment. 
4. Notice the blue **Jump to address** button next to `Pointer 32-bit` and `Pointer 64-bit`. You can click on it to jump to the address. The buttons are grayed out and not clickable if the addresses are not valid.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/sMVdWgtnjhTAb0jlxcu7.png", alt="Jump to address button", width="800", height="602" %}
5. Click on **Resume script execution** to step through the code.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/r0qWvOy2GO8bqUfkjYZa.png", alt="Resume script execution", width="800", height="602" %}
6. Notice the **ASCII representation** is now updated.  All the **value interpretations** are updated as well.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IeVwiaLTr50DjXx59AQi.png", alt="All value interpretations are updated", width="800", height="602" %}
7. Let's customize the **Value inspector** to show only **floating point**. Click on the **settings** button and check only **Float 32-bit** and **Float 64-bit**.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZJFQAJFXB3GOA1hqVcfd.png", alt="settings to customize value inspector", width="800", height="602" %}
8. Let's change the encoding from `dec` to `sci`. Notice the value representations are updated accordingly.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/RqOAPGuSPUReZ6yRIf2Z.png", alt="Change the encoding.", width="800", height="602" %}
9. Try to navigate the memory buffer with your keyboard or using the navigation bar. Repeat step 4 to observe values changes. 

## WebAssembly memory inspection {: #wasm }

The `WebAssembly.Memory` object is an `ArrayBuffer` that holds the raw bytes of object memory. The **Memory Inspector** panel lets you inspect such objects in Wasm applications written in C++.

To take full advantage of `WebAssembly.Memory` inspection:

- Use Chrome 107 or later. Check your version at `chrome://version/`.
- Install the [C/C++ DevTools Support (DWARF)][1] extension. This is a plugin for debugging C/C++ WebAssembly applications using DWARF debug information.

To inspect the `WebAssembly.Memory` of an object:

1. [Open DevTools](/docs/devtools/open/) on [this demo page](https://memory-inspector.glitch.me/demo-cpp.html).
1. In the **Sources** panel, open `demo-cpp.cc` and [set a breakpoint](/docs/devtools/javascript/breakpoints/#loc) in the `main()` function at line 15:  `x[i] = n - i - 1;`.
1. Reload the page to run the application. The debugger pauses at the breakpoint.
1. In the **Debugger** pane, expand **Scope** > **Local**.
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Mv5EULMv6Ep9Z6yHmAVz.png", alt="Reveal in Memory Inspector.", width="26", height="20" %} icon next to the `x: int[10]` array.

   Alternatively, right-click the array and select **Reveal in Memory Inspector panel**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ECgMkcQYWSQY9EsbMicm.png", alt="The x array opened in Memory Inspector.", width="800", height="641" %}

{% Aside %}
Starting from Chrome version 107, the **Memory Inspector** highlights all the bytes of a C/C++ memory object. This lets you tell them apart from the surrounding memory.
{% endAside %}

To stop highlighting object memory, in the **Memory Inspector** panel, hover over the object badge and click the `x` button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/rRh4QAwdRpawIHHQ5hF2.png", alt="Stop highlighting object memory.", width="800", height="641" %}

To learn more, see:

- [Extending the Memory Inspector for C/C++ debugging](/blog/memory-inspector-extended-cpp/)
- [Debugging WebAssembly with modern tools](/blog/wasm-debugging-2020/).

[1]: https://chrome.google.com/webstore/detail/cc%20%20-devtools-support-dwa/pdcpmagijalfljmkmjngeonclgbbannb

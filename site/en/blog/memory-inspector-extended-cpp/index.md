---
layout: 'layouts/blog-post.njk'
title: Extending the Memory Inspector for C/C++ debugging
authors:
  - michalpitr
description: >
    Learn how we improved debugging C/C++ WebAssembly apps with the Memory Inspector
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UWLghnj8M1chllDY0Iir.jpg'
alt: 'Learn how we improved debugging C/C++ WebAssembly apps with the Memory Inspector'
date: 2022-09-09
tags:
    - devtools-engineering
    - devtools
---

In Chrome 92, we introduced the **Memory Inspector**, a tool for inspecting linear memory buffers. In this article, we'll discuss how we've improved the Inspector for C/C++ debugging and the technical challenges encountered along the way.

These are a few relevant blog posts if you are new to C/C++ debugging and the **Memory Inspector**:

- Interested in deep memory debugging? See [Introducing the Memory Inspector](/blog/memory-inspector/).
- Want an introduction to the full C/C++ debugging suite of tools? See [Debugging WASM with modern tools](/blog/wasm-debugging-2020/) and [Debugging WebAssembly Faster](/blog/faster-wasm-debugging/).

## Introduction

The [Memory Inspector](/docs/devtools/memory-inspector/) provides you with more powerful debugging options for linear memory buffers. In the case of C/C++, you can inspect C/C++ memory objects in the WebAssembly Memory.


Recognizing your object’s bytes among the surrounding WebAssembly memory was a pain point. You have to know the object’s size and count bytes from the object’s start. In the screenshot below, the first byte of a 10-element `int32` array is selected but it’s not immediately clear which other bytes belong to the array. Wouldn’t it be nice if you could instantly recognize all the bytes that belong to the object?

{% Img src="image/Pd9q3xrQ8jTnoXTXNDT1eN6CWLJ3/XFHIBCKA6ovohCaDxkkj.png", alt="Screenshot of the original memory inspector with a single highlighted byte", width="800", height="597" %}

## Object highlighting in the Memory Inspector

Starting from Chrome 107, the **Memory Inspector** highlights all the bytes of a C/C++ memory object. This helps you tell them apart from the surrounding memory.

{% Aside %}
**Note**: This is a preview feature already available in [Chrome Canary](https://www.google.com/chrome/canary/).
{% endAside %}

{% Img src="image/Pd9q3xrQ8jTnoXTXNDT1eN6CWLJ3/Tz7k3vzCvHbbANZwte8M.png", alt="Screenshot of the updated memory inspector with a vibrantly highlighted array", width="800", height="594" %}

Watch the video below to see the **Memory Inspector** in action. As you reveal the array `x` in the Memory Inspector,  highlighted memory appears in the Memory Viewer along with a new chip right above it. This chip reminds you the name and type of the highlighted memory. Click on the chip to jump to the object’s memory. If you hover over the chip, a cross icon will appear – click on it to remove the highlight. 

When you select a byte outside the object you inspect, the highlight defocuses to avoid distracting you. To refocus it again, click any of the object’s bytes or the chip again.

{% Video src="video/Pd9q3xrQ8jTnoXTXNDT1eN6CWLJ3/H0X0vtrGbisxszXHm4Dv.mp4", autoplay="true", controls="true" %}

{% Aside gotchas %}
For the best debugging experience, disable compiler optimizations. Learn more in our [Faster WebAssembly Debugging](/blog/faster-wasm-debugging/) blog post.
{% endAside %}

The support for object highlighting isn’t limited to arrays. You can also inspect structs, objects, and pointers. These changes make exploring the memory of your C/C++ apps easier than ever!

Want to give it a try? You will need to:
* Have Chrome 107 or newer.
* Install the C/C++ DWARF Extension.
* Enable DWARF debugging in **DevTools** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Experiments** > **WebAssemble Debugging: Enable DWARF support**.
* Open [this demo page](https://memory-inspector.glitch.me/demo-cpp.html).
* Follow instructions on the page.

### Debugging example

In this section, let’s take a look at a toy bug to illustrate how you can use the **Memory Inspector** for C/C++ debugging. In the code sample below, a programmer creates an integer array and decides to use pointer arithmetic to select the last element. Unfortunately, the programmer made a mistake in their pointer calculation and now instead of printing the last element, the program prints nonsense values.

``` cpp
#include <iostream>

int main()
{
    int numbers[] = {1, 2, 3, 4};
    int *ptr = numbers;
    int arraySize = sizeof(numbers)/sizeof(int);
    int* lastNumber = ptr + arraySize;  // Can you notice the bug here?
    std::cout << *lastNumber << '\n';
    return 0;
}
```
The programmer turns to the **Memory Inspector** to debug the issue. You can follow along with this [demo](https://memory-inspector.glitch.me/demo-pointer-bug.html)! They first inspect the array in the **Memory Inspector** and see that the  `numbers`  array contains only the integers `1`, `2`, `3`, and `4`, as expected.

{% Img src="image/Pd9q3xrQ8jTnoXTXNDT1eN6CWLJ3/Xj2DjeLRDa8085EEFN1Z.png", alt="Screenshot of opened memory inspector with an inspected int32 array. All array elements are highlighted.", width="800", height="594" %}

Next, they reveal the `lastNumber` variable from the **Scope** pane and notice that the pointer points to an integer outside of the array! Equipped with this knowledge, the programmer realizes that they miscounted the pointer offset at line 8. It should have been `ptr + arraySize - 1`.

{% Img src="image/Pd9q3xrQ8jTnoXTXNDT1eN6CWLJ3/LVq43e6xWuHSh6UePOoL.png", alt="Screenshot of opened memory inspector showing highlighted memory pointed to by a pointer named ‘lastNumber’. The highlighted memory lies right after the last byte of the previously highlighted array.", width="800", height="594" %}

Although this is a toy example, it illustrates how object highlighting effectively conveys the size and position of memory objects, which can help you better understand what’s happening inside your C/C++ app’s memory.

## How DevTools figures out what to highlight

In this section, we’ll look at the ecosystem of tools that enables C/C++ debugging. Specifically, you’ll learn how DevTools, V8, the C/C++ DWARF Extension, and Emscripten make C/C++ debugging in Chrome possible.

To unlock the full power of C/C++ debugging in DevTools, you need two things:
* The C/C++ DWARF Extension installed in Chrome
* C/C++ source files compiled to WebAssembly with the latest Emscripten compiler as instructed in [this blog post](/blog/faster-wasm-debugging/#skipping-binaryen)

But why? [V8](https://v8.dev/) , Chrome’s JavaScript and WebAssembly engine, doesn’t know how to execute C or C++. Thanks to [Emscripten](https://emscripten.org/), a C/C++ to WebAssembly compiler, you can compile apps built in C or C++ as WebAssembly and execute them in the browser!

During compilation, emscripten will embed DWARF debug data into your binary. On a high level, this data helps the extension to figure out which WebAssembly variables correspond to your C/C++ variables, and more. This way, DevTools can show you your C++ variables despite V8 actually running WebAssembly. If you're curious, [check  out out this blog post](/blog/faster-wasm-debugging/#for-the-curious-looking-at-the-debug-data) for an example of DWARF debug data.


So what actually happens when you reveal the `lastNumber`? As soon as you click on the memory icon, DevTools checks which variable you want to inspect. It then queries the extension on the data type and location of `lastNumber`. As soon as the extension responds with that info, the **Memory Inspector** can display the relevant slice of memory and knowing its type, it can also show you the object’s size.

If you look at `lastNumber` in the earlier example, you might notice that we inspected `lastNumber: int *`, but the chip in the **Memory Inspector** says `*lastNumber: int`, what gives? The inspector uses C++-style pointer dereferencing to indicate the type of the object shown to you! If you inspect a pointer, the inspector will show you what it points to.
### Persisting highlights on debugger steps

When you reveal an object in the **Memory Inspector** and step with the debugger, the Inspector persists the highlight if it thinks it’s still applicable. Initially, we didn’t have this feature on our roadmap, but we quickly realized this compromises your debugging experience. Imagine having to re-inspect the array after every step like in the video below!

{% Video src="video/Pd9q3xrQ8jTnoXTXNDT1eN6CWLJ3/7HsHXQFrl2g6Qhjeyw1P.mp4", autoplay="true", controls="true" %}

When the debugger hits a new breakpoint, the **Memory Inspector** again queries V8 and the extension for the variable associated with the previous highlight. It then compares the objects’ locations and types. If they match, the highlight persists. In the video above, there’s a for-loop writing to the array `x`. These operations don’t change the type or position of the array, so it stays highlighted.

You might wonder how this affects pointers. If you have a highlighted pointer and re-assign it to a different object, the old and new positions of the highlighted objects differ and the highlight disappears. Since the newly pointed-to object can live anywhere in the WebAssembly Memory and will likely have little relation to the previous memory location, removing the highlight is clearer than jumping to a new memory location. You can highlight the pointer again by clicking its memory icon in the **Scope** pane. 

## Conclusion
This article described our improvements to the Memory Inspector for C/C++ debugging. We hope the new features will simplify debugging the memory of your C/C++ apps! If you have suggestions to improve it further, let us know by [filing a bug](https://crbug.com/new)!

## What’s next

To learn more, see:
* [Introducing the Memory Inspector](/blog/memory-inspector/)
* [Debugging WebAssembly with modern tools](/blog/wasm-debugging-2020/)
* [Faster WebAssembly debugging](/blog/faster-wasm-debugging/)
* [Memory Inspector docs](/docs/devtools/memory-inspector/)

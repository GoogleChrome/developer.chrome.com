---
layout: 'layouts/blog-post.njk'
title: 'How Photoshop solved working with files larger than can fit into memory'
subhead: >
  Learn how Adobe managed to let users edit even the biggest files on the web version of its iconic Photoshop app.
date: 2023-03-17
# updated: 2023-03-17
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/pYiISdhsJe3oEL871Dqp.png
alt: A part of Photoshop's user interface.
authors:
  - nabeelalshamma
  - thomassteiner
tags:
  - capabilities
  - case-study
  - fugu-case-study
---

## Introduction

Adobe Photoshop is the industry leading digital image editing and design application that offers the tools to create anything you can imagine. With its comprehensive set of tools, you can create, modify, refine and remix images into original content. Whether you're creating exceptional photos, tailor-made presentations or eye-catching social media content, Photoshop is versatile enough to be used in any project and produces professional quality outputs every time.

In 2021, Adobe, together with Chrome engineering, [brought a version of Photoshop to the web](https://web.dev/ps-on-the-web/). The software makes innovative use of WebAssembly with features like [SIMD](https://v8.dev/features/simd), high performance storage in the [origin private file system](/articles/file-system-access/#accessing-the-origin-private-file-system), the [P3 color space](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/getContext#colorspace) for canvas, and Web Components with [Lit](https://lit.dev/). In this article, we want to focus on how Adobe Photoshop engineering solved working with files larger than can fit into memory. And, in the case of WebAssembly, how Photoshop works with files larger than the 32-bit address space of wasm32.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/O6HxMybFxb42HZEdcc7Q.png", alt="The Photoshop app while editing an image of the Project Fugu logo.", width="800", height="568" %}

## The problem

Photoshop provides digital image editing and design  solutions for a wide variety of uses. Many of these involve very large amounts of image data. The app can handle the import and creation of files and documents that are several gigabytes in size. Thus, Photoshop must be able to load and process data sets that exceed the amount of physical memory in a device. To work on files or documents that are too large to fit in memory, a memory management approach must be used to be able to edit them effectively. This is in comparison to opening a file for viewing, as there is no edited data to be managed.

The [Photoshop file format](https://helpx.adobe.com/photoshop/using/file-formats.html#photoshop_format_psd) stores data with lossless compression. When a file or document is read, all of the image data is decompressed to allow for more efficient processing. As a result, the amount of memory required can be several times more than the amount of space a document uses on disk or in cloud storage.

On top of that, Photoshop supports a very large undo history. Many operations in Photoshop are what we call destructive operations. That is, making an edit such as painting with a brush will result in new pixel data which can be just as large as the original pixel data. Making these edits in a long editing session yields large amounts of pixel data that must be kept around to support undo operations. Thus, the history can grow to several hundred megabytes or many gigabytes of data.

Devices and platforms, be they desktop machines, mobile devices or browsers, all manage memory. Some are more generous than others in how much memory they make available to applications. The amount of memory also varies from device to device, as you know when you order a new computer or device and specify the amount of [Random-Access Memory](https://en.wikipedia.org/wiki/Random-access_memory) (RAM) desired. Many of these platforms also support [virtual memory](https://en.wikipedia.org/wiki/Virtual_memory), which allows an application to use more memory than is physically available. This support varies by operating system and runtime, as in the case of WebAssembly, may not be readily accessible or usable by applications. On top of that, modern virtual systems have upper limits that are easily exceeded by Photoshop requirements.

Ideally, applications would like to use as much memory as they need. This generally allows them to provide the best performance to their users. However, if they use too much memory, they may be penalized by the runtime platform or may run out of memory, resulting in failures.

As a historical note, the original problem that Photoshop needed to solve was editing print resolution files on early versions of macOS, as low as 1MB for the OS and all applications. A 300 dpi full page image in CMYK is approximately 32MB uncompressed.

## The solution

To solve this problem, Photoshop has implemented a software virtual memory system (VM). Photoshop uses its VM to manage document data, especially image data, all of the undo history and state, as well as the working storage for the current command. It is also used for caching large blocks of data such as brush descriptions so that they only need to be serialized from disk once.

Image data is stored using a [MIPMAP](https://en.wikipedia.org/wiki/Mipmap) representation, which is a pyramidal set of tiles, providing image data at a range of low to high resolutions. This allows Photoshop to operate on the appropriate resolution data for quicker response when zoomed in or looking at a preview, versus zoomed out.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/evq8ZiKQqz3aHT461J9q.png", alt="Example MIPMAP image storage: the principal image on the left is accompanied by filtered copies of reduced size.", width="384", height="256" %}

During application initialization, Photoshop determines how much RAM is available. It sets aside one portion for data to be stored in the VM. The remaining RAM is available for other application needs via the standard C++ runtime library. The VM memory is broken up into [pages](https://en.wikipedia.org/wiki/Page_(computer_memory)). Each page is typically a multiple of the hardware page size for the device. When used for image data, memory is referenced as tiles. A tile is a square area of pixels of a single layer including geometry bounds. A tile consumes one or more pages.

Photoshop creates one or more scratch files to provide disk-based backing for VM pages. These scratch files are stored in the [origin private file system](/articles/file-system-access/#accessing-the-origin-private-file-system). The screenshot shows an exemplary file hierarchy of such a scratch file (highlighted in yellow) and other files during an image editing session. Each scratch file can contain many VM pages. When the VM needs more backing, it creates additional scratch files. As pages are freed, their space in a scratch file can be reused for new pages.
​​
{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/kKYj5nMKPskfps1gD2p1.png", alt="Inspecting Photoshop's origin private file system file hierarchy with the OPFS Explorer Chrome extension.", width="800", height="345" %}

When processing image data, Photoshop iterates over tiles, performing pixel calculations. Each calculation can reference multiple tiles. The VM is responsible for ensuring that source and destination tiles for the current iteration are in memory, loading them from scratch files as required. At the same time, it can flush pages to the scratch files to make room in memory.

## Conclusions

While the concrete implementation details of the VM would go far beyond the scope of this article (and are also proprietary to Adobe), with the high-level description of the solution, we have put you in a position where you can understand how Photoshop can deal with large files. The origin private file system with its highly performant read and write access to files has been key to getting there. If you have an Adobe Creative Cloud subscription, we invite you to download this $n gigabyte Photoshop image and open it in Photoshop.

## Acknowledgements

This blog post was reviewed by Rachel Andrew. Special thanks to Russell Williams for his excellent documentation on the Photoshop VM.

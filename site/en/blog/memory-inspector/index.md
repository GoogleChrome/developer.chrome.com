---
title: "Introducing the Memory Inspector"
description: >
  This article introduces the Memory Inspector that has landed in Chrome 91. It allows you to inspect your ArrayBuffer, TypedArray, DataView, and Wasm Memory.
layout: "layouts/blog-post.njk"
authors:
  - kimanh
date: 2021-06-11
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AxAJQoj0mVzAwSDxUBQI.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

{% Partial 'devtools/banner.md' %}

<!-- lint disable no-smart-quotes -->

This article introduces the Memory Inspector that has landed in Chrome 91. It allows you to inspect your ArrayBuffer, TypedArray, DataView, and Wasm Memory. 


## Introduction

Ever wanted to make sense of the data in your ArrayBuffer? Prior to the Memory Inspector, DevTools only allowed for limited insight into ArrayBuffers. The inspection from the **Scope** view during a debugging session was limited to viewing a list of single values within the array buffer, which made it difficult to make sense of the data as a whole. As an example, the **Scope** view shows the buffer as expandable ranges of arrays in below example:

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SUDWzfUA2n6KopYBHxKh.png", alt="Scope view in DevTools", width="800", height="441" %}

Navigating to a certain range within the buffer was a pain point, requiring the user to scroll down to finally get to that index. But even if navigating to a position would be easy, this way of actually *inspecting* values are cumbersome: it is difficult to tell what these numbers mean. Especially, what if they should not be interpreted as single bytes, but e.g. as 32-bit Integers? 


## Inspecting values using the Memory Inspector

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oQ2b5BLJdmypFhv24rf5.png", alt="Memory Inspector", width="800", height="441" %}

With Chrome 91 we are introducing the Memory Inspector, a tool to inspect array buffers. You might have previously seen memory inspection tools to view binary data, which show the binary content in a grid along with their addresses, and which offer different ways of interpreting the underlying values. This is what the Memory Inspector is bringing to you. With the Memory Inspector you can now view the content, navigate it, and select types to be used to interpret the values at hand. It shows the ASCII values directly next to the bytes, and it allows the user to select different endianness. See the Memory Inspector in action below:

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/gwh42P11Rat7evNHqzfg.mp4", muted="true", controls="true" %}

Want to try it out? To learn how to open the Memory Inspector and view your array buffer (or TypedArray, DataView, or Wasm Memory) and more information on how to use it, head over to [our documentation on the Memory Inspector](/docs/devtools/memory-inspector/). Give it a try on [these toy examples](http://memory-inspector.glitch.me/) (for JS, Wasm, and C++).


## Designing the Memory Inspector

In this part we’ll have a look at how the Memory Inspector is designed using Web Components, and we’ll show one of the design goals that we had and how we implemented it. If you are curious and want to see more, have a look at our [design doc](https://docs.google.com/document/d/1LUOat3Q3pQ08IsnBQLrvL-4zWXSTgIuArb5ig3lEm-Y) for the Memory Inspector.

You might have seen our blog post on [Migrating to Web Components](/blog/migrating-to-web-components/), where Jack has published our internal guide on how to build UI components using Web Components. The migration to Web Components coincided with our work on the Memory Inspector, and as a result, we decided to give the new system a try. Below is a diagram that shows the components that we have built to create the Memory Inspector (note that internally we call it **Linear Memory Inspector**):

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ACJlqjKcViEXjd1IYhd2.png", alt="Web Components", width="622", height="410" %}

The `LinearMemoryInspector` component is the parent component that combines the subcomponents that build up all elements in the Memory Inspector. It basically takes a `Uint8Array` and an `address`, and on each change of either it propagates the data to its children, which triggers a re-render. The `LinearMemoryInspector` itself renders three subcomponents: 

1. `LinearMemoryViewer` (showing the values), 
2. `LinearMemoryNavigator` (allowing the navigation), and 
3. `LinearMemoryValueInterpreter` (showing different type interpretations of the underlying data).

The latter one is itself a parent component, which renders the `ValueInterpreterDisplay` (showing the values), and the `ValueInterpreterSettings` (selecting which types to see in the display).

Each of the components is designed to only represent one small component of the UI, such that components could be reused if needed. Whenever new data is set on a component, a re-rendering is triggered, which shows the reflected change on the data that is set on the component. One example for a workflow with our components is shown below, where the user is changing the address in the address bar, which triggers an update by setting the new data, in this case the address to view:

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yvA6iafQHoD6WazTmodw.png", alt="Components diagram", width="624", height="394" %}

The `LinearMemoryInspector` adds itself as a listener on the `LinearMemoryNavigator`. The `addressChanged` function is to be triggered on an `address-changed` event. As soon as the user is now editing the address input, this sends out the aforementioned event, such that the `addressChanged` function is called. This function now saves the address internally, and updates its subcomponents using the a `data(address, ..)` setter. The subcomponents save the address internally and re-render their views, showing the content at that particular address.


### Design goal: making performance and memory consumption independent of the buffer size

One aspect during the design of the Memory Inspector that we had in mind was that the performance of the Memory Inspector should be independent of the buffer size.

As you have seen in the previous part, the `LinearMemoryInspector` component takes a `UInt8Array` to render the values. At the same time we wanted to make sure that the Memory Inspector would not need to keep hold of the whole data, as the Memory Inspector only shows a part of it (e.g. Wasm Memory can be as big as 4GB, and we do not want to store 4GB within the Memory Inspector).

So in order to ensure that the speed and the memory consumption of the Memory Inspector is independent of the actual buffer that we show, we let the `LinearMemoryInspector` component only keep a *subrange* of the original buffer. 

For this to work, the `LinearMemoryInspector` first needs to take two more arguments: a `memoryOffset` and an `outerMemoryLength`. The `memoryOffset` indicates the offset, *at which the passed Uint8Array* starts, and is required to render the correct data addresses. The `outerMemoryLength` is the length of the original buffer, and is required to understand what range we can show:

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aqZwQH4is1fwBSVBMP6o.png", alt="buffer", width="624", height="234" %}

With this information we can ensure that we can still render the same view as before (the content around the `address`), without actually having all the data in place. So what to do if a different address is requested, which falls into a different range? In that case, the `LinearMemoryInspector` triggers a `RequestMemoryEvent`, which updates the current range that is kept; an example is shown below:

 {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dn2lqBJdF84zIv45KsFL.png", alt="Event trigger flow diagram", width="624", height="180" %}

In this example, the user navigates the memory page (the Memory Inspector is using paging for showing chunks of data), which triggers a `PageNavigationEvent`, which itself triggers a `RequestMemoryEvent`.
That event kicks off fetching the new range, which is then propagated to the `LinearMemoryInspector` component through setting the data. As a result, we show the newly fetched data.


## Oh, and did you know? You can even inspect memory in Wasm and C/C++ code

The Memory Inspector is not only available for `ArrayBuffers` in JavaScript, but can also be used for inspecting Wasm Memory and memory pointed to by C/C++ references/pointers (using our DWARF-extension - give it a try if you haven’t yet! See [Debugging WebAssembly with modern tools here](/blog/wasm-debugging-2020/). A small outlook on the Memory Inspector in action for native debugging of C++ on the web:

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GcHy7qArrsUhF8UaJVIT.png", alt="Inspect memory in C++", width="800", height="441" %}


## Conclusion

This article presented the Memory Inspector and showed a glimpse of its design. We hope that the Memory Inspector will help you to understand what’s happening in your ArrayBuffer :-). If you have suggestions to improve it let us know and [file a bug](https://crbug.com/new)!

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}
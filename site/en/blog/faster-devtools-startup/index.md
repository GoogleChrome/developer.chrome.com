---
title: "Improving DevTools startup time"
description: >
  Reduce DevTools performance overhead of message dispatch in the front-end.
layout: "layouts/blog-post.njk"
authors:
  - sadym
date: 2021-02-04
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/53IuclsjUVBaBME7MPRb.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

## DevTools startup now is ~13% faster 🎉 (from 11.2s down to 10s)
TL;DR; The result is achieved by removing a redundant serialization.

## Overview
While DevTools is starting up, it needs to make some calls to the [V8 JavaScript engine](https://v8.dev/). 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Cj4F4MSl0yvhWmELEHIQ.svg", alt="DevTools starting up process", width="800", height="240" %}

The mechanism Chromium uses to send DevTools commands to V8 (and for IPC in general) is called [`mojo`](https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md). My teammates [Benedikt Meurer](https://twitter.com/bmeurer) and [Sigurd Schneider](https://twitter.com/sigurdschn) discovered an inefficiency while working on another task, and came up with an idea to improve the process by removing two redundant steps in how these messages are sent and received.

Let us dive into how the `mojo` mechanism works!

## The `mojo` mechanisms

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zDmnw4p36OXC30YAwigz.svg", alt="The mojo mechanisms", width="800", height="600" %}

There is a mojo command `EvaluateScript` which runs the JS command. It serializes the whole JS command including the `arguments` into a string of JavaScript source code that can be `eval()`. As you might imagine, these strings can become quite long and expensive. After the command is received by V8, these strings of JavaScript code are deserialized before running. This process of serializing and deserializing for every single message creates significant overhead.

Benedikt Meurer realised that serialisation and deserialisation of the `arguments` is quite expensive, and that the whole  **"Serialize JS command to JS string"** and **"Deserialize JS string"** steps are redundant and can be skipped. 

Technical details: [`RenderFrameHostImpl::ExecuteJavaScript`](https://source.chromium.org/chromium/chromium/src/+/master:content/browser/renderer_host/render_frame_host_impl.cc;drc=df872ce8fcce25af51aa6b0f9fe8b1135b687524;l=1677)

## How we improved

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PlyVRmhCEQ71hMCGqPqu.svg", alt="Improved mechanisms", width="800", height="600" %}

We introduced another mojo API method which allows us to pass the object name, the method to be called, and the list of arguments directly, instead of having to create the string of JavaScript source code. This allows us to skip serialization & deserialization, and removes the need to parse the JavaScript code.

For technical details on how we implemented this optimization, consult these two patches:

1. [CL 2431864: [devtools] Reduce performance overhead of message dispatch in the front-end](https://chromium-review.googlesource.com/c/chromium/src/+/2431864)
2. [CL 2442012: [devtools] Use `ExecuteJavaScriptMethod` in DevTools](https://chromium-review.googlesource.com/c/chromium/src/+/2442012)

## Impact
To measure the effectiveness of the change, we ran some measurements comparing Chromium revisions [cb971089a058](https://chromium.googlesource.com/chromium/src/+/cb971089a058160601940d2b2a12d360115f66e5) and [4f213b39d581](https://chromium.googlesource.com/chromium/src/+/4f213b39d581eaa69a6d70378c91de2768e0004a) (before and after the change).

For both revisions, we ran the following scenario 5 times:

1. Record trace using `chrome://tracing`
2. Open DevTools-on-DevTools
3. Get the recorded `CrRendererMain` trace and compare the V8-specific metrics.

Based on these experiments, DevTools opens **~13% faster (from 11.2s down to 10s)** with the optimization.

### Hightlights, CPU durations

<table class="responsive" markdown="1">
<thead>
  <tr>
  <td><strong>Method name</strong></td>
  <td><strong>Not optimized (ms)</strong></td>
  <td><strong>Optimized (ms)</strong></td>
  <td><strong>Differences (ms)</strong></td>
  <td><strong>Speed improvement (%)</strong></td>
  </tr>
</thead>
<tbody>
  <tr>
  <td><strong>Total</strong></td>
  <td style="text-align: right;"><strong>11,213.19</strong></td>
  <td style="text-align: right;"><strong>9,953.99</strong></td>
  <td style="text-align: right;"><strong>-1,259.20</strong></td>
  <td style="text-align: right;"><strong>12.65%</strong></td>
  </tr>
  <tr>
  <td>v8.run</td>
  <td style="text-align: right;">499.67</td>
  <td style="text-align: right;">3.61</td>
  <td style="text-align: right;">-496.06</td>
  <td style="text-align: right;">12.65%</td>
  </tr>
  <tr>
  <td>V8.Execute</td>
  <td style="text-align: right;">1,654.87</td>
  <td style="text-align: right;">1,349.61</td>
  <td style="text-align: right;">-305.25</td>
  <td style="text-align: right;">3.07%</td>
  </tr>
  <tr>
  <td>v8.callFunction</td>
  <td style="text-align: right;">1,171.84</td>
  <td style="text-align: right;">1,339.77</td>
  <td style="text-align: right;">167.94</td>
  <td style="text-align: right;">-1.69%</td>
  </tr>
  <tr>
  <td>v8.compile</td>
  <td style="text-align: right;">133.93</td>
  <td style="text-align: right;">3.56</td>
  <td style="text-align: right;">-130.37</td>
  <td style="text-align: right;">1.31%</td>
  </tr>
</tbody>
</table>

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/WFqwQ1dMTdEh3v5oH1pP.svg", alt="DevTools load CPU time (ms)", width="800", height="448" %}

[Full tracing metrics comparison table](https://docs.google.com/spreadsheets/d/1WuWWORPwMre3m4N_MmJvtJ0xTfq-oBnz87cGtB532Ms/edit?resourcekey=0-Xxv_HIGfVaIZvbmDrmZ2GA)

As a result, DevTools opens and **works faster with less CPU usage**. 🎉
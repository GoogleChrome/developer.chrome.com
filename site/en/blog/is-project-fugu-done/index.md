---
layout: 'layouts/blog-post.njk'
title: Is Project Fugu "done"?
subtitle: >
  Now that the Project Fugu team has implemented the basic building blocks for creating advanced web
  app experiences, a natural question that arises is whether the project is "done". Spoiler alert:
  It's not!
description:
  This article focuses on the shifted focus of the Project Fugu team from implementing new
  capabilities to refining and improving the existing ones.
authors:
  - thomassteiner
date: 2022-10-04
updated: 2022-10-10
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/8FZcBmFowbDKWxpkOytx.jpg
alt: Blowfish swarm swimming in the ocean.
tags:
  - capabilities
---

With one of the Project Fugu team's objectives being to _make it possible for developers to do
anything on the web that platform-specific apps can_, the team has been busy adding missing features
web developers needed to close this app gap. If you don't believe me, just look at the
["Shipped" section](https://fugu-tracker.web.app/#shipped) of the Fugu API tracker. Here are the 55
shipped APIs, in order of least to most recently shipped:

<div class="table-wrapper scrollbar">
  <table>
    <thead>
      <tr>
        <th>API name</th>
        <th>Shipped in</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><a href="https://crbug.com/419413">Web Bluetooth API</a></td><td>Chrome&nbsp;56</td></tr>
      <tr><td><a href="https://crbug.com/492204">WebUSB API</a></td><td>Chrome&nbsp;61</td></tr>
      <tr><td><a href="https://crbug.com/668389">Web Share Target</a></td><td>Chrome&nbsp;71</td></tr>
      <tr><td><a href="https://crbug.com/903010">Web Share API Level 2</a></td><td>Chrome&nbsp;75</td></tr>
      <tr><td><a href="https://crbug.com/150835">Async Clipboard: Read and Write Images</a></td><td>Chrome&nbsp;76</td></tr>
      <tr><td><a href="https://crbug.com/885313">Web Share Target Level 2</a></td><td>Chrome&nbsp;76</td></tr>
      <tr><td><a href="https://crbug.com/634330">Enter Key Hint</a></td><td>Chrome&nbsp;77</td></tr>
      <tr><td><a href="https://crbug.com/897276">Expand Storage Quota</a></td><td>Chrome&nbsp;78</td></tr>
      <tr><td><a href="https://crbug.com/895854">Get Installed Related Apps API</a></td><td>Chrome&nbsp;80</td></tr>
      <tr><td><a href="https://crbug.com/925297">Periodic Background Sync</a></td><td>Chrome&nbsp;80</td></tr>
      <tr><td><a href="https://crbug.com/1007151">desktop-pwas: Support "minimal-ui" display mode</a></td><td>Chrome&nbsp;80</td></tr>
      <tr><td><a href="https://crbug.com/897298">Compression codecs</a></td><td>Chrome&nbsp;80</td></tr>
      <tr><td><a href="https://crbug.com/860467">Contacts API</a></td><td>Chrome&nbsp;80</td></tr>
      <tr><td><a href="https://crbug.com/719176">Badging API</a></td><td>Chrome&nbsp;81</td></tr>
      <tr><td><a href="https://crbug.com/937720">Allow the Badging API to be used from a service worker via Push</a></td><td>Chrome&nbsp;81</td></tr>
      <tr><td><a href="https://crbug.com/659138">Barcode Detection API</a></td><td>Chrome&nbsp;83</td></tr>
      <tr><td><a href="https://crbug.com/973844">Content Indexing API</a></td><td>Chrome&nbsp;84</td></tr>
      <tr><td><a href="https://crbug.com/670299">WebOTP</a></td><td>Chrome&nbsp;84</td></tr>
      <tr><td><a href="https://crbug.com/257511">Screen Wake Lock API</a></td><td>Chrome&nbsp;84</td></tr>
      <tr><td><a href="https://crbug.com/894838">Streams API: transferable streams</a></td><td>Chrome&nbsp;85</td></tr>
      <tr><td><a href="https://crbug.com/955497">App shortcuts</a></td><td>Chrome&nbsp;85</td></tr>
      <tr><td><a href="https://crbug.com/853326">File System Access</a></td><td>Chrome&nbsp;86</td></tr>
      <tr><td><a href="https://crbug.com/931839">text/html support for async clipboard api</a></td><td>Chrome&nbsp;86</td></tr>
      <tr><td><a href="https://crbug.com/934063">Pan/Tilt support for Camera</a></td><td>Chrome&nbsp;87</td></tr>
      <tr><td><a href="https://crbug.com/1136480">FUGU Implement capture of system and application audio output to headphones and speakers </a></td><td>Chrome&nbsp;88</td></tr>
      <tr><td><a href="https://crbug.com/982379">PointerLock unadjustedMovement</a></td><td>Chrome&nbsp;88</td></tr>
      <tr><td><a href="https://crbug.com/895776">Create a Photo/Video picker similar to the Photo Picker on Android</a></td><td>Chrome&nbsp;88</td></tr>
      <tr><td><a href="https://crbug.com/1035527">Web Share (navigator.share) integration with Windows 10</a></td><td>Chrome&nbsp;88</td></tr>
      <tr><td><a href="https://crbug.com/520391">Web NFC</a></td><td>Chrome&nbsp;89</td></tr>
      <tr><td><a href="https://crbug.com/890096">WebHID (Human Interface Device)</a></td><td>Chrome&nbsp;89</td></tr>
      <tr><td><a href="https://crbug.com/884928">Web Serial API</a></td><td>Chrome&nbsp;89</td></tr>
      <tr><td><a href="https://crbug.com/770595">Web Share on Desktop</a></td><td>Chrome&nbsp;89</td></tr>
      <tr><td><a href="https://crbug.com/1207667">Handwriting Recognition API</a></td><td>Chrome&nbsp;90</td></tr>
      <tr><td><a href="https://crbug.com/1141849">Managed configuration for Web Applications</a></td><td>Chrome&nbsp;91</td></tr>
      <tr><td><a href="https://crbug.com/897302">Run PWA on OS Login</a></td><td>Chrome&nbsp;91</td></tr>
      <tr><td><a href="https://crbug.com/897297">WebCodecs</a></td><td>Chrome&nbsp;93</td></tr>
      <tr><td><a href="https://crbug.com/878979">Idle Detection</a></td><td>Chrome&nbsp;94</td></tr>
      <tr><td><a href="https://crbug.com/897309">EyeDropper API</a></td><td>Chrome&nbsp;95</td></tr>
      <tr><td><a href="https://crbug.com/1069293">App Shortcut menu for PWAs on macOS and Linux</a></td><td>Chrome&nbsp;96</td></tr>
      <tr><td><a href="https://crbug.com/1019239">URL Protocol Handler Registration for PWAs </a></td><td>Chrome&nbsp;96</td></tr>
      <tr><td><a href="https://crbug.com/1011392">WebTransport</a></td><td>Chrome&nbsp;97</td></tr>
      <tr><td><a href="https://crbug.com/698793">Clipboard: Pasting retina-images loses pHYs metadata.</a></td><td>Chrome&nbsp;98</td></tr>
      <tr><td><a href="https://crbug.com/957043">PWA should be able to be uninstalled the same way a "real app" can</a></td><td>Chrome&nbsp;99</td></tr>
      <tr><td><a href="https://crbug.com/1275576">Web NFC: NDEFReader makeReadOnly()</a></td><td>Chrome&nbsp;100</td></tr>
      <tr><td><a href="https://crbug.com/897300">Multi-Screen Window Placement</a></td><td>Chrome&nbsp;100</td></tr>
      <tr><td><a href="https://crbug.com/1279822">HIDDevice forget()</a></td><td>Chrome&nbsp;100</td></tr>
      <tr><td><a href="https://crbug.com/1299351">USBDevice forget()</a></td><td>Chrome&nbsp;101</td></tr>
      <tr><td><a href="https://crbug.com/1274922">Web USB sameObject behavior</a></td><td>Chrome&nbsp;101</td></tr>
      <tr><td><a href="https://crbug.com/937121">Window Controls Overlay for Installed Desktop Web Apps</a></td><td>Chrome&nbsp;102</td></tr>
      <tr><td><a href="https://crbug.com/829689">File Handling</a></td><td>Chrome&nbsp;102</td></tr>
      <tr><td><a href="https://crbug.com/1310149">chrome.management API can no longer interact with PWA apps</a></td><td>Chrome&nbsp;102</td></tr>
      <tr><td><a href="https://crbug.com/1312010">SerialPort forget()</a></td><td>Chrome&nbsp;103</td></tr>
      <tr><td><a href="https://crbug.com/535764">Local Font Access</a></td><td>Chrome&nbsp;103</td></tr>
      <tr><td><a href="https://crbug.com/1327857">Fugu Request: Dynamic App Shortcuts (Shortcuts v2)</a></td><td>Chrome&nbsp;104</td></tr>
      <tr><td><a href="https://crbug.com/106449">Web Custom formats for Async Clipboard API</a></td><td>Chrome&nbsp;104</td></tr>
</tbody>
    <caption>
      All shipped Fugu APIs so far.
    </caption>
  </table>
</div>

It's a long list, and there is more on our plate. There are still a couple of APIs and features
currently in [developer trial](https://fugu-tracker.web.app/#developer-trial) (that is, implemented,
but behind a feature flag), some that we have [started](https://fugu-tracker.web.app/#started) to
work on, and many [under consideration](https://fugu-tracker.web.app/#under-consideration). As you
can see, it's not time to lean back and say we're done.

## Synchronous file methods for the origin private file system

Quite the opposite, rather than declaring our effort as completed, we're actually just getting
started. For example, consider the chart below that shows
[skyrocketing relative usage growth](https://chromestatus.com/metrics/feature/timeline/popularity/3428)
of the
[`navigator.storage.getDirectory()`](https://fs.spec.whatwg.org/#dom-storagemanager-getdirectory)
method, used as an entry point to the origin private file system (OPFS). This method is used, for
example, for
[Photoshop's high performance storage](https://web.dev/ps-on-the-web/#high-performance-storage)
needs, and which the storage community is
[highly interested in](/blog/deprecating-web-sql/#rationale-for-leaving-storage-to-web-developers)
since the started deprecation of Web SQL and even before.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/16nfpJWzOwGgL9YX1AYn.svg", alt="Chart showing the skyrocketing relative usage of the navigator.storage.getDirectory method.", width="600", height="371" %}

Now that more people use the OPFS, additional requirements have emerged. For example, the need for a
fully synchronous set of file methods in a worker context (see
[whatwg/fs#7](https://github.com/whatwg/fs/issues/7) for background). While new web APIs are
generally asynchronous, having synchronous methods would make working with the OPFS a lot simpler in
a Wasm context, and since this is happening in a worker, the main thread can't be blocked.

## Privacy improvements for the hardware APIs

Another example are the [hardware APIs](https://web.dev/tags/devices/) that allow you to connect to
[HID](https://web.dev/hid/), [serial](https://web.dev/serial/), [USB](https://web.dev/usb/),
[Bluetooth](https://web.dev/bluetooth/), and [NFC](https://web.dev/nfc/) devices. While some of
these APIs have been around for a while, until recently there was no way to forget a device that you
had previously connected to. Now there is thanks to the
[`forget()`](https://wicg.github.io/serial/#forget-method) methods for some of the APIs. For
example, here's how to forget a previously connected serial device, which improves the privacy of
the API.

```js
// Request a serial port.
const port = await navigator.serial.requestPort();
// Then later revoke permission to the serial port.
await port.forget();
```

## Refinements for the Multi-Screen Window Placement API

A final example is the
[Multi-Screen Window Placement API](https://web.dev/multi-screen-window-placement/), where, based on
developer feedback, the previously generic screen labels like `"Internal Display 1"` were replaced
with more meaningful labels like `"Built-in Retina Display"` so users can more easily associate
these labels with the screens of their multi-screen setup.

## Conclusions

As you can see from just these three examples, Project Fugu is far from being done. Keep or start
using our APIs and send feedback. Since all Fugu specs are developed in the open on GitHub, you can
file a spec issue on the corresponding GitHub repo or add your thoughts to an existing issue. If you
find a bug with Chrome's implementation, or discover that the implementation is different to the
spec, then file a bug at [new.crbug.com](https://new.crbug.com). Be sure to include as much detail
as you can and provide simple instructions for reproducing.

And, if you are concerned about browser support, many Fugu APIs make for great progressive
enhancements. See my article
[SVGcode: a PWA to convert raster images to SVG vector graphics](https://web.dev/svgcode/) for
inspiration. We also don't consider our job done until these APIs are interoperable, and we will
continue to push for further standardization, testing, and adoption by other browsers.


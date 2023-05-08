---
layout: 'layouts/blog-post.njk'
title: Web custom formats for the Async Clipboard API
subtitle: >
  Web custom formats let websites read and write arbitrary unsanitized payloads using a standard
  format applications can opt in to if they wish to support such payloads.
description: >
  Web custom formats let websites read and write arbitrary unsanitized payloads using a standard
  format applications can opt in to if they wish to support such payloads.
authors:
  - thomassteiner
date: 2022-08-01
updated: 2022-09-16
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/qF12zl6xHIIrHw3S5WfW.jpg
alt: The clip of a clipboard.
tags:
  - chrome-104
  - capabilities
---

Until now, the [Async Clipboard API](https://web.dev/async-clipboard/) supported a limited set of
MIME types to be copied to and pasted from the system clipboard, specifically: `text/plain`,
`text/html`, and `image/png`. The browser typically sanitizes this to, for example, remove embedded
`script` elements or `javascript:` links from an HTML string, or to prevent PNG
[decompression bomb](https://en.wikipedia.org/wiki/Zip_bomb) attacks.

In some cases, though, it can be desirable to support unsanitized content on the clipboard:

- Situations where the application deals with the sanitization itself.
- Situations where it's crucial for the copied data to be identical with the pasted data.

For such cases, the Async Clipboard API now supports web custom formats that let developers write
arbitrary data to the clipboard.

## Browser support

The Async Clipboard API per se with image support is supported as of Chromium&nbsp;76. Web custom
formats for the Async Clipboard API are supported on desktop and on mobile Chromium as of
version&nbsp;104.

## Writing web custom formats to the clipboard

Writing web custom formats to the clipboard is almost identical to
[writing sanitized formats](<https://web.dev/async-clipboard/#write()>), except for the requirement
to prepend the string `"web "` (including the trailing space) to the blob's MIME type.

```js/13-14
// Fetch remote JPEG and GIF images and obtain their blob representations.
const [jpegBlob, gifBlob] = await Promise.all([
  fetch('image.jpg').then((response) => response.blob()),
  fetch('image.gif').then((response) => response.blob()),
]);

try {
  // Write the image data to the clipboard, prepending the blobs' actual
  // types (`"image/jpeg"` and "image/gif") with the string `"web "`, so
  // they become `"web image/jpeg"` and `"web image/gif"` respectively.
  // The code elegantly makes use of computed property names:
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names.
  const clipboardItem = new ClipboardItem({
    [`web ${jpegBlob.type}`]: jpegBlob,
    [`web ${gifBlob.type}`]: gifBlob,
  });
  await navigator.clipboard.write([clipboardItem]);
} catch (err) {
  console.error(err.name, err.message);
}
```

## Reading web custom formats from the clipboard

As with writing, reading web custom formats from the clipboard is almost identical to
[reading sanitized formats](<https://web.dev/async-clipboard/#read()>). The only difference is that
the app now needs to look for clipboard items whose type starts with `"web "`.

```js/6
try {
  // Iterate over all clipboard items.
  const clipboardItems = await navigator.clipboard.read();
  for (const clipboardItem of clipboardItems) {
    for (const type of clipboardItem.types) {
      // Discard any types that are not web custom formats.
      if (!type.startsWith('web ')) {
        continue;
      }
      const blob = await clipboardItem.getType(type);
      // Sanitize the blob if you need to, then process it in your app.
    }
  }
} catch (err) {
  console.error(err.name, err.message);
}
```

## Interoperability with platform-specific apps

Web custom formats like `web image/jpeg` are not something that typical platform-specific
applications understand (since they would expect `image/jpeg`). Over time, concerned apps are
expected to add support for such formats as an opt-in if their developers deem support for web
custom formats to be relevant for their users. On the operating system clipboard, the various
formats are present in multiple formats ready for consumption, as can be seen in the
screenshot for macOS below.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/iYfa9lvLpLQU086GhurF.png", alt="Clipboard expector on macOS showing a custom format map listing two web custom formats.", width="800", height="357" %}

## Demo

You can try the demo below and
[view the source code](https://glitch.com/edit/#!/custom-async-clipboard) to see how the demo works.

<div class="glitch-embed-wrap" style="height: 1500px; width: 100%;">
  <iframe
    src="https://custom-async-clipboard.glitch.me/"
    title="custom-async-clipboard on Glitch"
    allow="clipboard-read; clipboard-write"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>

## Acknowledgements

This article was reviewed by [Joe Medley](https://github.com/jpmedley)
and [François Beaufort](https://github.com/beaufortfrancois).
Hero image by [Neon Tommy](https://www.flickr.com/photos/42757699@N04), used under a
[CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) license.

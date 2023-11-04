---
layout: 'layouts/blog-post.njk'
title: Compression and decompression in the browser with the Compression Streams API
subhead: >
  Write smaller web apps that don't need to ship their own compression or decompression library
date: 2022-08-29
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/koW7cNlWa6BUlJsQR4wI.jpg
alt: Clamp to symbolize how data gets compressed.
author: thomassteiner
tags:
  - capabilities
---

The [Compression Streams API](https://developer.mozilla.org/docs/Web/API/Compression_Streams_API)
is for compressing and decompressing streams of data using the gzip or
deflate (or deflate-raw) formats.

With built in compression JavaScript applications do not need to include a compression
library, making the download size of the application smaller. Stable Chrome and Safari Technology Preview now
support this useful API. Compressing data is shown below.

```js
const readableStream = await fetch('lorem.txt').then(
  (response) => response.body
);
const compressedReadableStream = readableStream.pipeThrough(
  new CompressionStream('gzip')
);
```

To decompress, pipe a compressed stream through the decompression stream.

```js
const decompressedReadableStream = compressedReadableStream.pipeThrough(
  new DecompressionStream('gzip')
);
```

## Demo

{% Glitch { id: 'compressionstream-demo' } %}

## Browser support

The Compression Streams API is supported from Chromium&nbsp;80 and Safari Technology Preview&nbsp;152.
For other browsers, check [CanIUse](https://caniuse.com/mdn-api_compressionstream).

## Acknowledgements

Hero image by [Matt Artz](https://unsplash.com/@mattartz) on
[Unsplash](https://unsplash.com/photos/7_zxKAWCDQI).

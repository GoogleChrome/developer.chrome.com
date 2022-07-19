---
layout: 'layouts/blog-post.njk'
title: Web custom formats for the Async Clipboard API
subtitle: >
  Web custom formats let websites read and write arbitrary unsanitized payloads using a standardized
  format applications can opt in to if they wish to support such payloads.
authors:
  - thomassteiner
date: 2022-07-18
---

Up until now, the [Async Clipboard API](/async-clipboard/) supported a limited set of MIME types to
be copied to and pasted from the system clipboard. Namely, these types are `text/plain`,
`text/html`, and `image/png`, which the browser typically will sanitize, for example, to remove
embedded `script` elements or `javascript:` links from an HTML string, or to prevent PNG
[decompression bomb](https://en.wikipedia.org/wiki/Zip_bomb) attacks.

In some cases, though, it can be desirable to support unsanitized content on the clipboard, for
example, when the application the data is thought for deals itself with the sanitization and where
it's crucial for the copied data to be identical with the pasted data. For such cases, the Async
Clipboard API now supports web custom formats that let developers write arbitrary data to the
clipboard.

## Browser support

The Async Clipboard API per se with image support is supported as of Chromium&nbsp;76. Custom
formats for the Async Clipboard API are supported on desktop and on mobile Chromium as of
version&nbsp;104.

## Writing web custom formats to the clipboard

Writing web custom formats to the clipboard is almost identical to
[writing sanitized formats](<https://web.dev/async-clipboard/#write()>), except for the requirement to prepend the
string `" web"` (including the trailing space) to the blob's MIME type.

```js
// Fetch a remote JPEG image and obtain its blob representation.
const blob = await fetch('image.jpg').then((response) => response.blob);
try {
  // Write the image data to the clipboard, prepending the blob's actual
  // type (`"image/jpeg"`) with the string `"web "`, so it becomes
  // (`"web image/jpeg"`).
  await navigator.clipboard.write([
    new ClipboardItem({
      [`web ${blob.type}`]: blob,
    }),
  ]);
} catch (err) {
  console.error(err.name, err.message);
}
```

## Reading web custom formats from the clipboard

Similar to writing, reading web custom formats from the clipboard is almost identical to
[reading sanitized formats](<https://web.dev/async-clipboard/#read()>). The only difference is that the app now
needs to look for clipboard items whose type starts with `"web "`. Since the pasted blob is of a
pseudo type (like `"web image/jpeg"`) that likely your app doesn't understand, you need to re-encode
the blob using the original MIME type.

```js
try {
  // Iterate over all clipboard items.
  const clipboardItems = await navigator.clipboard.read();
  for (const clipboardItem of clipboardItems) {
    for (const type of clipboardItem.types) {
      // Discard any types that are not web custom formats.
      if (!type.startsWith('web ')) {
        continue;
      }
      const webBlob = await clipboardItem.getType(type);
      const blob = new Blob([webBlob], {
        type: webBlob.type.replace('web ', ''),
      });
      // Sanitize the blob if you need to, then process it in your app.
    }
  }
} catch (err) {
  console.error(err.name, err.message);
}
```

## Interoperability with platform-specific apps

Since web custom formats like `web image/jpeg` are not something that typical platform-specific
applications understand (since they would expect `image/jpeg`), there is the expectation for them to
over time add support for such formats as an opt-in if their developers deem
support for web custom formats to be relevant for their users.

## Demo

<div class="glitch-embed-wrap" style="height: 1500px; width: 100%;">
  <iframe
    src="https://custom-async-clipboard.glitch.me/"
    title="custom-async-clipboard on Glitch"
    allow="clipboard-read; clipboard-write"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>

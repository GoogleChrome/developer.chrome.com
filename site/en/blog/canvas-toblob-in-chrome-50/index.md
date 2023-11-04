---
layout: 'layouts/blog-post.njk'
title: Canvas toBlob() support added in chrome 50
description: >
  Support for canvas.toBlob set to land in Chrome 50.
authors:
  - paullewis
date: 2016-03-14
updated: 2016-03-14
---

The canvas element is getting an upgrade as of Chrome 50: it now supports the `toBlob()` method! This is great news for anyone generating images on the client side, who wants to -- say -- upload them to their server, or store them in IndexedDB for future use.


```js
function sendImageToServer (canvas, url) {

    function onBlob (blob) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.onload = function (evt) {
        // Blob sent to server.
    }

    request.send(blob);
    }

    canvas.toBlob(onBlob);
}
```


Using `toBlob()` is great, because instead of manipulating a base64 encoded string that you get from `toDataURL()`, you can now you work with the encoded binary data directly. It’s smaller, and it tends to fit more use-cases than a data URI.

If you’re wondering whether you can draw image blobs to another canvas context, the answer is -- in Firefox and Chrome -- yes, absolutely! [You can do this with the `createImageBitmap()` API](/blog/createimagebitmap-in-chrome-50), which is also landing in Chrome 50.



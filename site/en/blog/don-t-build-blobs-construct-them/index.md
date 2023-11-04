---
layout: 'layouts/blog-post.njk'
title: Don't build blobs, construct them
description: >
  Recent spec changes to the File API include a new constructor for Blob, which essentially makes BlobBuilder irrelevant.
authors:
  - ericbidelman
date: 2012-06-10
updated: 2019-02-09

---

Here's a heads up to all you [BlobBuilder](https://developer.mozilla.org/docs/Web/API/BlobBuilder) fans, it's going bye bye!

`BlobBuilder` is a handy API for creating Blobs (or Files) in JavaScript. It's been around since Chrome 8, FF 6, and IE 10 but has never shipped in Safari, and likely never will. Recent spec changes to the [File API](https://w3c.github.io/FileAPI/#dfn-Blob) include a new constructor for `Blob`, which essentially makes `BlobBuilder` irrelevant. In fact, Safari nightlies have already disabled it and Chrome will start to warn you in the console very soon.

For comparison, below is the same code using the deprecated `BlobBuilder` and the new `Blob` constructor. The snippet creates a stylesheet and appends it to the DOM.

`BlobBuilder()`:

```js
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
                        window.MozBlobBuilder || window.MSBlobBuilder;
window.URL = window.URL || window.webkitURL;

var bb = new BlobBuilder();
bb.append('body { color: red; }');
var blob = bb.getBlob('text/css');

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = window.URL.createObjectURL(blob);

document.body.appendChild(link);
```

`Blob()`:

```js
window.URL = window.URL || window.webkitURL;

var blob = new Blob(['body { color: red; }'], {type: 'text/css'});

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = window.URL.createObjectURL(blob);
document.body.appendChild(link);
```

Handy! So now, instead of appending to a `BlobBuilder`, we can simply create the `Blob` from an array of data parts. The data parts can be different types (`DOMString`, `ArrayBuffer`, `Blob`) and in any order. For example:


```js
var blob = new Blob(['1234567890', blob, arrayBuffer]);
```

Also note that the second object param is optional. For more info on these changes, see the [MDN docs on Blob](https://developer.mozilla.org/docs/Web/API/Blob).



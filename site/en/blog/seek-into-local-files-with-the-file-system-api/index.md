---
layout: 'layouts/blog-post.njk'
title: Seek into local files with the File System API
description: >
  If you have a File object, it's possible to seek into it and read chunks without reading the entire file into memory.
authors:
  - sethladd
date: 2011-08-04
updated: 2019-01-16

---

If you have a `File` object (say, one stored using the [FileSystem API](https://www.html5rocks.com/tutorials/file/filesystem/)), it's possible to seek into it and read chunks without reading the entire file into memory:


```js
var url = "filesystem:http://example.com/temporary/myfile.zip";

window.webkitResolveLocalFileSystemURL(url, function(fileEntry) {
    fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
        var ab = e.target.result; // arrayBuffer containing bytes 0-10 of file.
        var uInt8Arr = new Uint8Array(ab);
        ...
    };

    var blob = file.webkitSlice(0, 10, "application/zip");  // mimetype is optional
    reader.readAsArrayBuffer(blob);
    }, errorHandler);
}, errorHandler);
```



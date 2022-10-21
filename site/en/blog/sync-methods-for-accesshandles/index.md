---
layout: 'layouts/blog-post.njk'
title: Sync methods for AccessHandles
subtitle: >
  To simplify working with AccessHandles in contexts like Emscripten, we're
  making the methods of the `FileSystemSyncAccessHandle` interface synchronous.
description: >
  To simplify working with AccessHandles in contexts like Emscripten, we're
  making the methods of the FileSystemSyncAccessHandle interface synchronous.
authors:
  - thomassteiner
date: 2022-10-21
# updated: 2022-10-21
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/4nSGWCoK9S3nTr0hASGH.png
alt: Emscripten logo
tags:
  - capabilities
---

The [origin private file system](https://web.dev/file-system-access/#accessing-files-optimized-for-performance-from-the-origin-private-file-system) provides access to a special kind of file that is highly optimized for performance, for example, by offering in-place and exclusive write access to a file's content. Developers can get access to such files by calling [`createSyncAccessHandle()`](https://fs.spec.whatwg.org/#dom-filesystemfilehandle-createsyncaccesshandle), which is a method exposed on [`FileSystemFileHandle`](https://fs.spec.whatwg.org/#api-filesystemfilehandle) objects. This call results in a [`FileSystemSyncAccessHandle`](https://fs.spec.whatwg.org/#filesystemsyncaccesshandle).

`FileSystemSyncAccessHandle` exposes the following methods that used to be asynchronous, but that are **synchronous as of Chromium&nbsp;108**.

- `truncate(newSize)`: Resizes the file associated with the access handle to be `newSize` bytes long. If `newSize` is larger than the current file size, it pads the file with null bytes; otherwise it truncates the file.
- `getSize()`: Returns the size of the file associated with the access handle in bytes.
- `flush()`: Ensures that the contents of the file associated with the access handle contain all the modifications done through `write()`.
- `close()`: Flushes the access handle and then closes it. Closing an access handle disables any further operations on it and releases the lock on the entry associated with handle.

```js
const root = await navigator.storage.getDirectory();
const fileHandle = await root.getFileHandle('test', {create: true});
const accessHandle = await fileHandle.createSyncAccessHandle();
accessHandle.read(/* ... */);
accessHandle.write(/* ... */);

// Synchronous as of Chromium 108:
console.log(accessHandle.getSize());
accessHandle.truncate(123);
accessHandle.flush();
accessHandle.close();
```

## Related links

- [TAG Review](https://github.com/w3ctag/design-reviews/issues/772)
- [Specification](https://fs.spec.whatwg.org/#api-filesystemsyncaccesshandle)
- [Specification Issue](https://github.com/whatwg/fs/issues/7) (which led to the change)
- [ChromeStatus entry](https://chromestatus.com/feature/5149644305203200)
- [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1338340)

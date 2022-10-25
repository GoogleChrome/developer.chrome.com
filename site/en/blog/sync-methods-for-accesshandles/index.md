---
layout: 'layouts/blog-post.njk'
title: 'Breaking change: sync methods for AccessHandles'
subtitle: >
  To simplify working with AccessHandles in contexts like Emscripten, we're making the methods of
  the `FileSystemSyncAccessHandle` interface synchronous.
description: >
  To simplify working with AccessHandles in contexts like Emscripten, we're making the methods of
  the FileSystemSyncAccessHandle interface synchronous.
authors:
  - thomassteiner
date: 2022-10-25
# updated: 2022-10-21
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/4nSGWCoK9S3nTr0hASGH.png
alt: Emscripten logo
tags:
  - capabilities
---

The
[origin private file system](https://web.dev/file-system-access/#accessing-files-optimized-for-performance-from-the-origin-private-file-system)
provides access to a special kind of file that is highly optimized for performance, for example, by
offering in-place and exclusive write access to a file's content. Developers can get access to such
files by calling
[`createSyncAccessHandle()`](https://fs.spec.whatwg.org/#dom-filesystemfilehandle-createsyncaccesshandle),
which is a method exposed on
[`FileSystemFileHandle`](https://fs.spec.whatwg.org/#api-filesystemfilehandle) objects. This call
results in a [`FileSystemSyncAccessHandle`](https://fs.spec.whatwg.org/#filesystemsyncaccesshandle).

{% Aside %} The `createSyncAccessHandle()` method and therefore `FileSystemSyncAccessHandle` is only
exposed in Workers. It is not available in the main thread. {% endAside %}

`FileSystemSyncAccessHandle` is a file primitive that provides performant access to local files. One
of its main use cases is applications porting C/C++ code to Wasm; however, asynchronous calls are
not fully supported on Wasm yet, and using the
[Asyncify](https://emscripten.ru/docs/porting/asyncify.html) library as an alternative has
substantially degraded performance. Making all the methods of the `FileSystemSyncAccessHandle` synchronous matches the synchronous, POSIX-like file API Wasm-based application expect; making the API more ergonomic while bringing substantial performance gains.

## What's new?

`FileSystemSyncAccessHandle` exposes the following methods that used to be asynchronous, but that
are **synchronous as of Chromium&nbsp;108**.

- `truncate(newSize)`: Resizes the file associated with the access handle to be `newSize` bytes
  long. If `newSize` is larger than the current file size, it pads the file with null bytes;
  otherwise it truncates the file.
- `getSize()`: Returns the size of the file associated with the access handle in bytes.
- `flush()`: Ensures that the contents of the file associated with the access handle contain all the
  modifications done through `write()`.
- `close()`: Flushes the access handle and then closes it. Closing an access handle disables any
  further operations on it and releases the lock on the entry associated with the access handle.

```js
// In a `Worker`:
const root = await navigator.storage.getDirectory();
const fileHandle = await root.getFileHandle('test', { create: true });
// `createSyncAccessHandle()` is still async.
const accessHandle = await fileHandle.createSyncAccessHandle();
// Both `read()` and `write()` were sync before.
accessHandle.read(/* ... */);
accessHandle.write(/* ... */);

// New: synchronous as of Chromium 108.
console.log(accessHandle.getSize());
accessHandle.truncate(123);
accessHandle.flush();
accessHandle.close();
```

## What do I need to do?

Note that changing methods from asynchronous to synchronous is a web-exposed change with potential
breakage. While using `await` in synchronous methods is a no-op, any use of `Promise.then()` will break.
If you chain a `then()` call on the result of any of the previously asynchronous and now
synchronous methods, you need to change your code.

```js
// (✅) This won't break, but you better remove the superfluous `await`:
await accessHandle.flush();
// ✅ Correct:
accessHandle.flush();
```

```js
// ⛔️ This will break, and you need to restructure your code:
accessHandle.flush().then(/* Follow-up code */);
// ✅ Correct:
accessHandle.flush();
/* Follow-up code */
```

## Related links

- [TAG Review](https://github.com/w3ctag/design-reviews/issues/772)
- [Specification](https://fs.spec.whatwg.org/#api-filesystemsyncaccesshandle)
- [Specification Issue](https://github.com/whatwg/fs/issues/7) (which led to the change)
- [ChromeStatus entry](https://chromestatus.com/feature/5149644305203200)
- [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1338340)

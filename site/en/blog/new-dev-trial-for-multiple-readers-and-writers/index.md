---
layout: 'layouts/blog-post.njk'
title: New dev trial for multiple readers and writers for FileSystemSyncAccessHandle and exclusive writer for FileSystemWritableFileStream
subhead: >
  Learn about API improvements when working with files in the browser.
date: 2023-10-09
updated: 2023-10-09
authors:
  - thomassteiner
tags:
  - capabilities
---

## Multiple readers and writers for FileSystemSyncAccessHandle

The [origin private file system](https://web.dev/opfs) (sometimes also referred to as the bucket file system) allows developers to access files that are optimized for maximum reading and writing performance. This happens via [`FileSystemSyncAccessHandle`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemSyncAccessHandle) objects. Currently, trying to open multiple `FileSystemSyncAccessHandle` objects for the same file entry fails with a `NoModificationAllowedError`. Since there are use cases where this constraint is limiting, the new origin trial introduces a new `mode` parameter for the [`FileSystemFileHandle.createSyncAccessHandle()`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createSyncAccessHandle) method with the following allowed string values:

- `"readwrite"`: This is the current default. Once open, any methods on `FileSystemSyncAccessHandle` are allowed. Only one instance of `FileSystemSyncAccessHandle` is allowed.
- `"read-only"` : Allows multiple readers. Once open, only read-like methods on `FileSystemSyncAccessHandle` are allowed: `read()`, `getSize()`, and `close()`. Multiple instances of `FileSystemSyncAccessHandle` may be created as long as all of them are in read-only mode.
- `"readwrite-unsafe"`: Allows multiple writers. Once open, any methods on `FileSystemSyncAccessHandle` are allowed. Multiple instances of `FileSystemSyncAccessHandle` may be created as long as all of them are in readwrite-unsafe mode.

The current behavior is preserved by keeping the `"readwrite"` option as the default, which only allows one instance at a time. If a site needs to open multiple `FileSystemSyncAccessHandle` objects but does not need to perform writes, then the `"read-only"` option should be used. Finally, the last option `"readwrite-unsafe"` allows multiple instances as well as both read and write. In this case, writes can be racy if performed from multiple tabs, and sites would need to provide their own locking scheme.

```js
const handle1 = await handle.createSyncAccessHandle({mode: 'readwrite-unsafe'});
// This will succeed:
const handle2 = await handle.createSyncAccessHandle({mode: 'readwrite-unsafe'});
```

## Exclusive writer for FileSystemWritableFileStream

Unlike with `FileSystemSyncAccessHandle`, multiple instances of [`FileSystemWritableFileStream`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream) can be created per file entry today. What's missing is a way to provide an option for an exclusive writer. The new dev trial adds an optional `mode` parameter to the [`FileSystemAccessFileHandle.createWritable()`](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createWritable) method that has the following values:

- `"exclusive"` mode: Only one writer can exist at a time.
- `"siloed"` mode: This is the current default. Each created writer will have its own swap file.

```js
const writable1 = await handle.createWritable({mode: 'exclusive'});
// This will fail:
const writable2 = await handle.createWritable();
```

## Enter the dev trial

To enter the dev trial, set the `#file-system-access-locking-scheme` flag in `chrome://flags` to **Enabled**. This will allow you to test the feature locally on your machine.

## Providing feedback

Please let us know what you think, especially if the proposed designs for both features do not work for you. The best way is by [filing a new Issue](https://github.com/whatwg/fs/issues) on the File System Standard repository on GitHub.

## Acknowledgements

This article was reviewed by [Daseul Lee](https://www.linkedin.com/in/daseul-lee-8297314b), [Nathan Memmott](https://www.linkedin.com/in/nathan-memmott/), and [Rachel Andrew](https://rachelandrew.co.uk/).

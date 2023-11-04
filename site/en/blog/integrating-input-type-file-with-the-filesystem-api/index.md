---
layout: 'layouts/blog-post.njk'
title: Integrating input[type=file] with the Filesystem API
description: >
  Integrating input[type=file] with the Filesystem API
authors:
  - ericbidelman
date: 2012-08-22
updated: 2019-02-21

---

Let's say you have a photo editing app and you'd like users to be able to drag in hundreds of photos and copy them into your app. Ok, what do you do?

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/FKRo1VZzk3qV47Ot3G9a.jpeg", alt="Launch Demo", width="390", height="364" %}
<figcaption><a href="http://html5-demos.appspot.com/static/dnd/all_types_of_import.html" target="_blank">Launch Demo</a></figcaption>
</figure>

In a [recent post](/blog/drag-and-drop-a-folder-onto-chrome-now-available), [Eiji Kitamura](/authors/agektmr) highlighted a subtle, yet powerful new feature in the drag and drop APIs; the ability to drag in folders *and* retrieve them as HTML5 Filesystem API `FileEntry` and `DirectoryEntry` objects (done by accessing a new method on the [DataTransferItem](https://html.spec.whatwg.org/multipage/dnd.html#datatransferitem), `.webkitGetAsEntry()`).

What's remarkably cool about the `.webkitGetAsEntry()` extension is how elegant it makes importing files and entire folders. Once you have a `FileEntry` or `DirectoryEntry` from a drop event, it's a matter of using the Filesystem API's `copyTo()` to get it imported into your app.

An example of copying multiple dropped folders over to the filesystem:


```js
var fs = null; // Cache filesystem for later.

// Not shown: setup drag and drop event listeners.
function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    var items = e.dataTransfer.items;

    for (var i = 0, item; item = items[i]; ++i) {
    var entry = item.webkitGetAsEntry();

    // Folder? Copy the DirectoryEntry over to our local filesystem.
    if (entry.isDirectory) {
        entry.copyTo(fs.root, null, function(copiedEntry) {
        // ...
        }, onError);
    }
    }
}

window.webkitRequestFileSystem(TEMPORARY, 1024 * 1204, function(fileSystem) {
    fs = fileSystem;
}, function(e) {
    console.log('Error', e);
});
```

Very nice! Again, the simplicity comes from integrating DnD with the Filesystem API calls.

Taking this one step further, we also have the ability to drag and drop a folder and/or files onto a normal `<input type="file">`, then access the entries as Filesystem directory or file entries. That is done through `.webkitEntries`:


```html
<input type="file" multiple>
```

```js
function onChange(e) {
    e.stopPropagation();
    e.preventDefault();

    var entries = e.target.webkitEntries; // Get all dropped items as FS API entries.

    [].forEach.call(entries, function(entry) {

    // Copy the entry into our local filesystem.
    entry.copyTo(fs.root, null, function(copiedEntry) {
        ...
    }, onError);

    });
}

document.querySelector('input[type="file"]').addEventListener('change', onChange);
```

I've put together a photo gallery demo to demonstrate these different techniques for importing files/folders.

[Launch Demo](http://html5-demos.appspot.com/static/dnd/all_types_of_import.html)

To learn more about the HTML5 Filesystem API, see [Exploring the Filesystem APIs](https://www.html5rocks.com/tutorials/file/filesystem/).



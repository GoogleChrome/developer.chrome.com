---
api: bookmarks
---

![Clicking the star adds a bookmark](bookmarks.png)

## Manifest

You must declare the "bookmarks" permission in the [extension manifest][1] to use the bookmarks API.
For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "bookmarks"
  ],
  ...
}
```

## Objects and properties

Bookmarks are organized in a tree, where each node in the tree is either a bookmark or a folder
(sometimes called a _group_). Each node in the tree is represented by a
[bookmarks.BookmarkTreeNode][2] object.

`BookmarkTreeNode` properties are used throughout the `chrome.bookmarks` API. For example, when you
call [bookmarks.create][3], you pass in the new node's parent (`parentId`), and, optionally, the
node's `index`, `title`, and `url` properties. See [bookmarks.BookmarkTreeNode][4] for information
about the properties a node can have.

{% Aside %}

**Note:** You cannot use this API to add or remove entries in the root folder. You also cannot
rename, move, or remove the special "Bookmarks Bar" and "Other Bookmarks" folders.

{% endAside %}

## Examples {: #overview-examples }

The following code creates a folder with the title "Extension bookmarks". The first argument to
`create()` specifies properties for the new folder. The second argument defines a function to be
executed after the folder is created.

```js
chrome.bookmarks.create(
  {'parentId': bookmarkBar.id, 'title': 'Extension bookmarks'},
  function(newFolder) {
    console.log("added folder: " + newFolder.title);
  },
);
```

The next snippet creates a bookmark pointing to the developer documentation for extensions. Since
nothing bad will happen if creating the bookmark fails, this code doesn't bother to define a
callback function.

```js
chrome.bookmarks.create({
  'parentId': extensionsFolderId,
  'title': 'Extensions doc',
  'url': 'http://code.google.com/chrome/extensions',
});
```

For an example of using this API, see the [basic bookmarks sample][5]. For other examples and for
help in viewing the source code, see [Samples][6].

[1]: /docs/extensions/mv2/tabs
[2]: #type-BookmarkTreeNode
[3]: #method-create
[4]: #type-BookmarkTreeNode
[5]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/bookmarks/basic/
[6]: /docs/extensions/mv2/samples

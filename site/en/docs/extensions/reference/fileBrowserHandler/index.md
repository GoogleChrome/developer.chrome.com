---
api: fileBrowserHandler
---

The Chrome OS file browser comes up when the user either presses Alt+Shift+M or connects an external storage device, such as an SD card, USB key, external drive, or digital camera. Besides showing the files on external devices, the file browser can also display files that the user has previously saved to the system.

When the user selects one or more files, the file browser adds buttons representing the valid handlers for those files. For example, in the following screenshot, selecting a file with a ".jpg" suffix results in an "Upload to Picasa" button that the user can click.

![File browser screenshot](filebrowserhandler.png)

## Manifest

You must declare the "fileBrowserHandler" permission in the [extension manifest](/extensions/manifest), and you must use the "file_browser_handlers" field to register the extension as a handler of at least one file type. You should also provide a 16x16 icon to be displayed on the button. For example:

```json
{
  "name": "My extension",
  ...
  "file_browser_handlers": [
    {
      "id": "upload",
      "default_title": "Save to Gallery", // What the button will display
      "file_filters": [
        "filesystem:*.jpg", // To match all files, use "filesystem:*.*"
        "filesystem:*.jpeg",
        "filesystem:*.png"
      ]
    }
  ],
  "permissions" : [
    "fileBrowserHandler"
  ],
  "icons": { "16": "icon16.png",
              "48": "icon48.png",
            "128": "icon128.png" },
  ...
}
```

{% Aside %}

**Note:** You can specify locale-specific strings for the value of "default_title". See [Internationalization (i18n)](/extensions/i18n) for details.

{% endAside %}

## Implementing a file browser handler

To use this API, you must implement a function that handles the `onExecute` event of `chrome.fileBrowserHandler`. Your function will be called whenever the user clicks the button that represents your file browser handler. In your function, use the [HTML5 FileSystem API](http://www.html5rocks.com/tutorials/file/filesystem/) to get access to the file contents. Here is an example:

```js
chrome.fileBrowserHandler.onExecute.addListener(function(id, details) {
  if (id == 'upload') {
    var fileEntries = details.entries;
    for (var i = 0, entry; entry = fileEntries[i]; ++i) {
      entry.file(function(file) {
        // send file somewhere
      });
    }
  }
});
```

Your event handler is passed two arguments:

id

: The "id" value from the manifest file. If your extension implements multiple handlers, you can check the id value to see which handler has been triggered.

details

: An object describing the event. You can get the file or files that the user has selected from the `entries` field of this object, which is an array of FileSystem `Entry` objects.
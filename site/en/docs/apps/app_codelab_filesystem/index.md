---
layout: 'layouts/doc-post.njk'
title: "Step 6: Export Todos to the Filesystem"
date: 2014-10-17
#updated: TODO
description: How to write to the file system from your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

{% Aside %}

**Want to start fresh from here?** Find the previous step's code in the [reference code zip][3]
under **_cheat_code > solution_for_step5_**.

{% endAside %}

In this step, you will learn:

- How to get a reference to a file in the external filesystem.
- How to write to the filesystem.

_Estimated time to complete this step: 20 minutes._  
To preview what you will complete in this step, [jump down to the bottom of this page ↓][4].

## Export todos {: #export-todos }

This step adds an export button to the app. When clicked, the current todo items are saved to a text
file selected by the user. If the file exists, it's replaced. Otherwise, a new file gets created.

### Update permissions {: #update-permissions }

File system permissions can be requested as a string for read-only access, or an Object with
additional properties. For example:

```js
// Read only
"permissions": ["fileSystem"]

// Read and write
"permissions": [{"fileSystem": ["write"]}]

// Read, write, autocomplate previous input, and select folder directories instead of files
"permissions": [{"fileSystem": ["write", "retainEntries", "directory"]}]
```

You need read and write access. In _manifest.json_, request the `{fileSystem: [ "write" ] }`
permission:

```json/6
"permissions": [
  "storage", 
  "alarms", 
  "notifications", 
  "webview",
  "<all_urls>", 
  { "fileSystem": ["write"] } 
],
```

### Update HTML view {: #update-html-view }

In _index.html_, add an **Export to disk** button and a `div` where the app shows a status message:

```html/2-3
<footer id="info">
  <button id="toggleAlarm">Activate alarm</button>
  <button id="exportToDisk">Export to disk</button>
  <div id="status"></div>
  ...
</footer>
```

Also in _index.html_, load the _export.js_ script:

```js/2
...
<script src="js/alarms.js"></script>
<script src="js/export.js"></script>
```

### Create export script {: #create-js }

Create a new JavaScript file named _export.js_ using the code below. Save it in the _js_ folder.

```js
(function() {

  var dbName = 'todos-vanillajs';

  var savedFileEntry, fileDisplayPath;

  function getTodosAsText(callback) {
  }

  function exportToFileEntry(fileEntry) {
  }

  function doExportToDisk() {
  }

  document.getElementById('exportToDisk').addEventListener('click', doExportToDisk);

})();
```

Right now, _export.js_ only contains a click listener on the **Export to disk** button and stubs for
`getTodosAsText()`, `exportToFileEntry`, and `doExportToDisk()`.

### Get todo items as text {: #get-todos-as-text }

Update `getTodosAsText()` so that it reads todos from `chrome.storage.local` and generates a textual
representation of them:

```js
function getTodosAsText(callback) {
  chrome.storage.local.get(dbName, function(storedData) {
    var text = '';

    if ( storedData[dbName].todos ) {
      storedData[dbName].todos.forEach(function(todo) {
          text += '- ';
          if ( todo.completed ) {
            text += '[DONE] ';
          }
          text += todo.title;
          text += '\n';
        }, '');
    }

    callback(text);

  }.bind(this));
}
```

### Choose a file {: #choose-file }

Update `doExportToDisk()` with [`chrome.fileSystem.chooseEntry()`][5] to allow the user to choose a
file:

```js
function doExportToDisk() {

  if (savedFileEntry) {

    exportToFileEntry(savedFileEntry);

  } else {

    chrome.fileSystem.chooseEntry( {
      type: 'saveFile',
      suggestedName: 'todos.txt',
      accepts: [ { description: 'Text files (*.txt)',
                   extensions: ['txt']} ],
      acceptsAllTypes: true
    }, exportToFileEntry);

  }
}
```

The first parameter of `chrome.fileSystem.chooseEntry()` is an object of options. The second
parameter is a callback method.

If there's already a saved `FileEntry`, use that instead when calling `exportToFileEntry()`. File
references exist for the lifetime of the object representing the `FileEntry`. This example ties
`FileEntry` to the app window so the JavaScript code can write to the selected file without any user
interaction as long as the app window remains open.

### Use FileEntry to write todos items to disk {: #use-fileentry }

Update `exportToFileEntry()` to save the todos as text via the `FileEntry` Web API:

```js
function exportToFileEntry(fileEntry) {
  savedFileEntry = fileEntry;

  var status = document.getElementById('status');

  // Use this to get a file path appropriate for displaying
  chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
    fileDisplayPath = path;
    status.innerText = 'Exporting to '+path;
  });

  getTodosAsText( function(contents) {

    fileEntry.createWriter(function(fileWriter) {

      var truncated = false;
      var blob = new Blob([contents]);

      fileWriter.onwriteend = function(e) {
        if (!truncated) {
          truncated = true;
          // You need to explicitly set the file size to truncate
          // any content that might have been there before
          this.truncate(blob.size);
          return;
        }
        status.innerText = 'Export to '+fileDisplayPath+' completed';
      };

      fileWriter.onerror = function(e) {
        status.innerText = 'Export failed: '+e.toString();
      };

      fileWriter.write(blob);

    });
  });
}
```

[`chrome.fileSystem.getDisplayPath()`][6] gets a displayable file path that outputs to the status
`div`.

Use `fileEntry.createWriter()` to create a `FileWriter` object. `fileWriter.write()` can then write
a [Blob][7] to the filesystem. Use `fileWriter.onwriteend()` and `fileWriter.onerror()` to update
the status `div`.

For more information about `FileEntry`, read [_Exploring the FileSystem APIs_][8] on HTML5Rocks, or
refer to the [`FileEntry docs`][9] on MDN.

### Persist FileEntry objects {: #persistance }

**Advanced**: `FileEntry` objects cannot be persisted indefinitely. Your app needs to ask the user
to choose a file every time the app is launched. If your app was forced to restart due to a runtime
crash or update, [restoreEntry()][10] is an option to restore a `FileEntry`.

If you wish, experiment by saving the ID returned by [retainEntry()][11] and restoring it on app
restart. (Hint: Add a listener to the `onRestarted` event in the background page.)

## Launch your finished Todo app {: #launch }

You are done Step 6! Reload your app and add some todos. Click **Export to disk** to export your
todos to a .txt file.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/D5YDP8PChoRlsCxAOkPa.png", alt="The Todo app with exported todos", height="650", width="659" %}

## For more information {: #recap }

For more detailed information about some of the APIs introduced in this step, refer to:

- [Using the Chrome Filesystem API][12] [↑][13]
- [Declare Permissions][14] [↑][15]
- [chrome.storage.local.get()][16] [↑][17]
- [chrome.fileSystem.chooseEntry()][18] [↑][19]
- [chrome.fileSystem.getDisplayPath()][20] [↑][21]
- [chrome.fileSystem.restoreEntry()][22] [↑][23]
- [chrome.fileSystem.retainEntry()][24] [↑][25]

Ready to continue onto the next step? Go to [Step 7 - Publish your app »][26]

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://github.com/mangini/io13-codelab/archive/master.zip
[4]: #launch
[5]: /apps/fileSystem#method-chooseEntry
[6]: /apps/fileSystem#method-getDisplayPath
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
[8]: http://www.html5rocks.com/en/tutorials/file/filesystem/
[9]: https://developer.mozilla.org/en-US/docs/Web/API/FileEntry
[10]: /apps/fileSystem#method-restoreEntry
[11]: /apps/fileSystem#method-retainEntry
[12]:
  /apps/app_storage#filesystem
  "Read 'Using the Chrome Filesystem API' in the Chrome developer docs"
[13]: #export-todos "This feature mentioned in 'Export todos'"
[14]: /apps/declare_permissions "Read 'Declare Permissions' in the Chrome developer docs"
[15]: #update-permissions "This feature mentioned in 'Update permissions'"
[16]:
  /apps/storage#method-StorageArea-get
  "Read 'chrome.storage.local.get()' in the Chrome developer docs"
[17]: #get-todos-as-text "This feature mentioned in 'Get todo items as text'"
[18]:
  /apps/fileSystem#method-chooseEntry
  "Read 'chrome.fileSystem.chooseEntry()' in the Chrome developer docs"
[19]: #choose-file "This feature mentioned in 'Choose a file'"
[20]:
  /apps/fileSystem#method-getDisplayPath
  "Read 'chrome.fileSystem.getDisplayPath()' in the Chrome developer docs"
[21]: #use-fileentry "This feature mentioned in 'Use FileEntry to write todos items to disk'"
[22]:
  /apps/fileSystem#method-restoreEntry
  "Read 'chrome.fileSystem.restoreEntry()' in the Chrome developer docs"
[23]: #persistance "This feature mentioned in 'Persist FileEntry objects'"
[24]:
  /apps/fileSystem#method-retainEntry
  "Read 'chrome.fileSystem.retainEntry()' in the Chrome developer docs"
[25]: #persistance "This feature mentioned in 'Persist FileEntry objects'"
[26]: ../app_codelab_publish

---
layout: "layouts/doc-post.njk"
title: "Storage APIs"
date: 2012-09-17
updated: 2014-09-10
description: How to handle storage in your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Almost every aspect of app development involves some element of sending or receiving data. Starting
with the basics, you should use an MVC framework to help you design and implement your app so that
data is completely separate from the app's view on that data (see [MVC Architecture][3]).

You also need to think about how data is handled when your app is offline (see [Offline First][4]).
This doc briefly introduces the storage options for sending, receiving, and saving data locally; the
remainder of the doc shows you how to use Chrome's File System and Sync File System APIs (see also
[fileSystem API][5] and [syncFileSystem API][6]).

{% Aside %}

**API Samples:** Want to play with the code? Check out the [filesystem-access][7],
[syncfs-editor][8] and [storage][9] samples.

{% endAside %}

## Storage options {: #options }

Packaged apps use many different mechanisms to send and receive data. For external data (resources,
web pages), you need to be aware of the [Content Security Policy (CSP)][10]. Similar to Chrome
Extensions, you can use [cross-origin XMLHttpRequests][11] to communicate with remote servers. You
can also isolate external pages, so that the rest of your app is secure (see [Embed external web
pages][12]).

When saving data locally, you can use the [Chrome Storage API][13] to save small amounts of string
data and IndexedDB to save structured data. With IndexedDB, you can persist JavaScript objects to an
object store and use the store's indexes to query data (to learn more, see HTML5 Rock's [Simple Todo
List Tutorial][14]). For all other types of data, like binary data, use the Filesystem and Sync
Filesystem APIs.

Chrome's Filesystem and Sync Filesystem APIs extend the [HTML5 FileSystem API][15]. With Chrome's
Filesystem API, apps can create, read, navigate, and write to a sandboxed section of the user's
local file system. For example, a photo-sharing app can use the Filesystem API to read and write any
photos that a user selects.

With Chrome's Sync Filesystem API, apps can save and synchronize data on a user's Google Drive so
that the same data can be available across different clients. For example, a [cloud-backed text
editor][16] app can automatically sync new text files to a user's Google Drive account. When the
user opens the text editor in a new client, Google Drive pushes new text files to that instance of
the text editor.

Note: Unlike regular Filesystem API, Chrome's Sync Filesystem API currently does **NOT** support
directory operations, except for reading directory entries in the root directory. An attempt to
create a directory in Sync Filesystem will result in INVALID_MODIFICATION_ERROR.

## Using the Chrome Filesystem API {: #filesystem }

### Adding file system permission {: #filesystem-manifest }

To use Chrome's File System API, you need to add the "fileSystem" permission to the manifest, so
that you can obtain permission from the user to store persistent data.

```json
"permissions": [
  "...",
  "fileSystem"
]
```

### User-options for selecting files {: #import }

Users expect to select files in the same way they always do. At a minimum, they expect a 'choose
file' button and standard file-chooser. If your app makes heavy use of file-handing, you should also
implement drag-and-drop (see below and also check out [Native HTML5 Drag and Drop][17]).

### Obtaining the path of a fileEntry {: #path }

To get the full path of the file the user selected, `fileEntry`, call `getDisplayPath()`:

```js
function displayPath(fileEntry) {
  chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
    console.log(path)
  });
}
```

### Implementing drag-and-drop {: #drag }

If you need to implement drag-and-drop selection, the drag-and-drop file controller (`dnd.js`) in
the [filesystem-access][18] sample is a good starting point. The controller creates a file entry
from a `DataTransferItem` via drag-and-drop. In this example, the `fileEntry` is set to the first
dropped item.

```js
var dnd = new DnDFileController('body', function(data) {
  var fileEntry = data.items[0].webkitGetAsEntry();
  displayPath(fileEntry);
});
```

### Reading a file {: #read }

The following code opens the file (read-only) and reads it as text using a `FileReader` object. If
the file doesn't exist, an error is thrown.

```js
var chosenFileEntry = null;

chooseFileButton.addEventListener('click', function(e) {
  chrome.fileSystem.chooseEntry({type: 'openFile'}, function(readOnlyEntry) {

    readOnlyEntry.file(function(file) {
      var reader = new FileReader();

      reader.onerror = errorHandler;
      reader.onloadend = function(e) {
        console.log(e.target.result);
      };

      reader.readAsText(file);
    });
	});
});
```

### Writing a file {: #write }

The two common use-cases for writing a file are "Save" and "Save as". The following code creates a
`writableEntry` from the read-only `chosenFileEntry` and writes the selected file to it.

```js
 chrome.fileSystem.getWritableEntry(chosenFileEntry, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = errorHandler;
      writer.onwriteend = callback;

    chosenFileEntry.file(function(file) {
      writer.write(file);
    });
  }, errorHandler);
});
```

The following code creates a new file with "Save as" functionality and writes the new blob to the
file using the `writer.write()` method.

```js
chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
    writableFileEntry.createWriter(function(writer) {
      writer.onerror = errorHandler;
      writer.onwriteend = function(e) {
        console.log('write complete');
      };
      writer.write(new Blob(['1234567890'], {type: 'text/plain'}));
    }, errorHandler);
});
```

## Using the Chrome Sync Filesystem API {: #sync-filesystem }

Using syncable file storage, returned data objects can be operated on in the same way as local
offline file systems in the [FileSystem API][19], but with the added (and automatic) syncing of that
data to Google Drive.

### Adding sync file system permission {: #sync-manifest }

To use Chrome's Sync Filesystem API, you need to add the "syncFileSystem" permission to the
manifest, so that you can obtain permission from the user to store and sync persistent data.

```json
"permissions": [
  "...",
  "syncFileSystem"
]
```

### Initiating syncable file storage {: #initiate }

To initiate syncable file storage in your app, simply call [syncFileSystem.requestFileSystem][20].
This method returns a syncable filesystem backed by Google Drive, for example:

```js
chrome.syncFileSystem.requestFileSystem(function (fs) {
   // FileSystem API should just work on the returned 'fs'.
   fs.root.getFile('test.txt', {create:true}, getEntryCallback, errorCallback);
});
```

### About file sync status {: #file-status }

Use [syncFileSystem.getFileStatus][21] to get the sync status for a current file:

```js
chrome.syncFileSystem.getFileStatus(entry, function(status) {...});
```

File sync status values can be one of the following: `'synced'`, `'pending'`, or `'conflicting'`.
'Synced' means the file is fully synchronized; there're no pending local changes that haven't been
synchronized to Google Drive. There can, however, be pending changes on the Google Drive side that
haven't been fetched yet.

'Pending' means the file has pending changes not yet synchronized to Google Drive. If the app is
running online, local changes are (almost) immediately synchronized to Google Drive, and the
[syncFileSystem.onFileStatusChanged][22] event is fired with the `'synced'` status (see below for
more details).

The [syncFileSystem.onFileStatusChanged][23] is fired when a file's status changes to
`'conflicting'`. 'Conflicting' means there are conflicting changes on both the local storage and
Google Drive. A file can be in this state only if the conflict resolution policy is set to
`'manual'`. The default policy is `'last_write_win'` and conflicts are automatically resolved by
simple last-write-win policy. The system's conflict resolution policy can be changed by
[syncFileSystem.setConflictResolutionPolicy][24].

If the conflict resolution policy is set to `'manual'` and a file results in `'conflicting'` state,
the app can still read and write the file as a local offline file, but the changes are not sync'ed
and the file will be kept detached from remote changes made on other clients until the conflict is
resolved. The easiest way to resolve a conflict is to delete or rename the local version of file.
This forces the remote version to be synchronized, the conflicting state is resolved, and the
`onFileStatusChanged` event is fired with the `'synced'` status.

### Listening for changes in synced status

The [syncFileSystem.onFileStatusChanged][25] event is fired when the sync status of a file changes.
For example, assume a file has pending changes and is in the 'pending' state. The app may have been
in offline state so that the change is about to be synchronized. When the sync service detects the
pending local change and uploads the change to Google Drive, the service fires the
`onFileStatusChanged` event with following values:
`{ fileEntry:a fileEntry for the file, status: 'synced', action: 'updated', direction: 'local_to_remote' }`.

Similarly, regardless of the local activities, the sync service may detect remote changes made by
another client, and downloads the changes from Google Drive to the local storage. If the remote
change was for adding a new file, an event with following values is fired:
`{ fileEntry: a fileEntry for the file, status: 'synced', action: 'added', direction: 'remote_to_local' }`.

If both the local and remote side have conflicting changes for the same file and if the conflict
resolution policy is set to `'manual'`, the file status is changed to `conflicting` state, is
detached from the sync service, and won't be synchronized until the conflict is resolved. In this
case an event with following values is fired:
`{ fileEntry: a fileEntry for the file, status: 'conflicting', action: null, direction: null }`.

You can add a listener for this event that responds to any changes in status. For example, the
[Chrome Music Player][26] app listens for any new music synced from Google Drive, but not yet
imported to the user's local storage on a particular client. Any music found gets synced to that
client:

```js
chrome.syncFileSystem.onFileStatusChanged.addListener(function(fileInfo) {
  if (fileInfo.status === 'synced') {
    if (fileInfo.direction === 'remote_to_local') {
      if (fileInfo.action === 'added') {
        db.add(fileInfo.fileEntry);
      } else if (fileInfo.action === 'deleted') {
        db.remove(fileInfo.fileEntry);
      }
    }
  }
});
```

### Checking API usage {: #check-usage }

To check the amount of data being used by the API, query the app's local sandboxed directory or the
usage bytes returned by [syncFileSystem.getUsageAndQuota][27]:

```js
chrome.syncFileSystem.getUsageAndQuota(fileSystem, function (storageInfo) {
   updateUsageInfo(storageInfo.usageBytes);
   updateQuotaInfo(storageInfo.quotaBytes);
});
```

You can also look at the user's sync backend service storage (in Google Drive). Synced files are
saved in a hidden Google Drive folder, **Chrome Syncable FileSystem**. The folder won't be shown in
your 'My Drive' list but can be accessed by searching the folder name in the search box. (Note that
the remote folder layout is **not** guaranteed to remain backwards compatible between releases.)

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: app_frameworks
[4]: offline_apps
[5]: fileSystem
[6]: syncFileSystem
[7]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/filesystem-access
[8]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/syncfs-editor
[9]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/storage
[10]: contentSecurityPolicy
[11]: app_external#external
[12]: app_external#webview
[13]: storage
[14]: http://www.html5rocks.com/tutorials/indexeddb/todo/
[15]: http://www.html5rocks.com/tutorials/file/filesystem/
[16]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/syncfs-editor
[17]: http://www.html5rocks.com/tutorials/dnd/basics/
[18]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/filesystem-access
[19]: http://www.w3.org/TR/file-system-api/
[20]: /apps/syncFileSystem#method-requestFileSystem
[21]: /apps/syncFileSystem#method-getFileStatus
[22]: /apps/syncFileSystem#event-onFileStatusChanged
[23]: /apps/syncFileSystem#event-onFileStatusChanged
[24]: /apps/syncFileSystem#method-setConflictResolutionPolicy
[25]: /apps/syncFileSystem#event-onFileStatusChanged
[26]: https://github.com/agektmr/ChromeMusicPlayer
[27]: /apps/syncFileSystem#method-getUsageAndQuota

---
api: storage
---

## Overview

This API has been optimized to meet the specific storage needs of extensions. It provides the same
storage capabilities as the [localStorage API][1] with the following key differences:

- User data can be automatically synced with Chrome sync (using `storage.sync`).
- Your extension's content scripts can directly access user data without the need for a background
  page.
- A user's extension settings can be persisted even when using [split incognito behavior][2].
- It's asynchronous with bulk read and write operations, and therefore faster than the blocking and
  serial `localStorage API`.
- User data can be stored as objects (the `localStorage API` stores data in strings).
- Enterprise policies configured by the administrator for the extension can be read (using
  `storage.managed` with a [schema][3]).

## Manifest

You must declare the "storage" permission in the [extension manifest][4] to use the storage API. For
example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "storage"
  ],
  ...
}
```

## Usage

To store user data for your extension, you can use either `storage.sync`:

```js
chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```

or `storage.local`:

```js
chrome.storage.local.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```

When using `storage.sync`, the stored data will automatically be synced to any Chrome browser that
the user is logged into, provided the user has sync enabled.

When Chrome is offline, Chrome stores the data locally. The next time the browser is online, Chrome
syncs the data. Even if a user disables syncing, `storage.sync` will still work. In this case, it
will behave identically to `storage.local`.

!!!.aside.aside--warning

Confidential user information should not be stored! The storage area isn't encrypted.

!!!

The `storage.managed` storage is read-only.

## Storage and throttling limits

`chrome.storage` is not a big truck. It's a series of tubes. And if you don't understand, those
tubes can be filled, and if they are filled when you put your message in, it gets in line, and it's
going to be delayed by anyone that puts into that tube enormous amounts of material.

For details on the current limits of the storage API, and what happens when those limits are
exceeded, please see the quota information for [sync][5] and [local][6].

## Examples

The following example checks for CSS code saved by a user on a form, and if found, stores it.

```js
function saveChanges() {
  // Get a value saved in a form.
  var theValue = textarea.value;
  // Check that there's some code there.
  if (!theValue) {
    message('Error: No value specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'value': theValue}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}
```

If you're interested in tracking changes made to a data object, you can add a listener to its
`onChanged` event. Whenever anything changes in storage, that event fires. Here's sample code to
listen for saved changes:

```js
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});
```

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[2]: /docs/extensions/mv2/manifest/incognito
[3]: /docs/extensions/mv2/manifest/storage
[4]: /docs/extensions/mv2/tabs
[5]: #property-sync
[6]: #property-local

---
layout: "layouts/doc-post.njk"
title: "Managing HTML5 Offline Storage"
date: 2015-03-10
updated: 2018-04-26
description: How to store data client-side in your Chrome App so that it works offline.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

HTML5 introduced many storage APIs that let you store a large amount of data locally in your users'
browsers. But the amount of space allocated for each app is, by default, restricted to a few
megabytes. Google Chrome lets you ask for a larger storage quota, beyond the previous limit of just
5 MB.

This document introduces you to the basic concepts around the types of storage used in Chrome and
describes the experimental Quota Management API, which lets you manage your storage quota. The
document assumes that you are already familiar with the general concepts of client-side storage and
know how to use offline APIs.

## Contents {: #contents }

1.  [Types of storage][3]
    1.  [Temporary][4]
    2.  [Persistent][5]
    3.  [Unlimited][6]
    4.  [Comparing Storage Types][7]
2.  [Managing your quota][8]
    1.  [Query storage usage and availability][9]
    2.  [Ask for more storage][10]
    3.  [Reset quota for testing][11]
3.  [API reference][12]
    1.  [Constants][13]
    2.  [Method overview][14]
    3.  [Methods][15]
4.  [Future development][16]

## Types of storage {: #types }

In Google Chrome, you can ask for three types of storage:

- [Temporary][17]
- [Persistent][18]
- [Unlimited][19]

These storage types are described in greater detail in the following sections and compared with each
other in the [table][20] below.

### Temporary storage {: #temporary }

Temporary storage is transient storage that is available to any web app. Chrome automatically gives
your app temporary storage, so you do not need to request allocation.

#### Sharing the pool

Temporary storage is shared among all web apps running in the browser.{#It is also shared across all
offline APIs, such as App Cache, IndexedDB, and File System. However, it does not include web
storage APIs like Local Storage and Session Storage, which still has a limit of 5 MB per origin.#}
The shared pool can be up to 1/3 of the of available disk space. Storage already used by apps is
included in the calculation of the shared pool; that is to say, the calculation is based on
`(available storage space + storage being used by apps) * .333` .

Each app can have up to 20% of the shared pool. As an example, if the total available disk space is
60 GB, the shared pool is 20 GB, and the app can have up to 4 GB. This is calculated from 20% (up to
4 GB) of 1/3 (up to 20 GB) of the available disk space (60 GB).

#### Asking for more space

Although you can [query][21] for the amount of storage space available for your app and the amount
of data already stored for your app, you cannot ask for more temporary storage space. If an app
exceeds the allocated quota, an error is thrown.

#### Running out of storage

Once the storage quota for the entire pool is exceeded, the entire data stored for the least
recently used host gets deleted. The browser, however, will not expunge the data in LocalStorage and
SessionStorage. For data stored in other offline APIs, the browser deletes the data in whole and not
in part so that app data doesn't get corrupted in unexpected ways.

As each app is limited to a maximum of 20% of the storage pool, deletion is likely only if the user
is actively running more than five offline apps that are each using the maximum storage.

However, available storage space can shrink as users add more files on their hard drives. When the
available disk space gets tight (Remember, the shared pool only gets half of the _current_ available
disk space), the browser deletes all the data stored for the least recently used host.

### Persistent storage {: #persistent }

Persistent storage is storage that stays in the browser unless the user expunges it. It is available
only to apps that use the File System API, but will eventually be available to other offline APIs
like IndexedDB and Application Cache.

An application can have a larger quota for persistent storage than temporary storage, but you must
request storage using the Quota Management API and the user must grant you permission to use more
space. Chrome presents an info bar that prompts the user to grant the app more local storage space.

### Unlimited storage {: #unlimited }

Unlimited storage is similar to persistent storage, but it is available only to Chrome apps and
extensions (.crx files). The size of unlimited storage is limited only by the availability of space
in the user's hard drive. You can ask for the `unlimitedStorage` permission in the manifest file for
an [app][22] or [extension][23]. At installation, the user is informed of permissions required by
the app or extension. By proceeding with the installation, the user implicitly grants permission for
all pages whose URLs are listed in the manifest.json file.

To learn more, see the respective developer guides for [apps][24] and [extensions][25].

### Comparing Storage Types {: #table }

The following table describes the differences among the three types of storage.

 <table><tbody><tr><th width="215" scope="col">&nbsp;</th><th width="385" scope="col">Temporary storage</th><th width="385" scope="col">Persistent storage</th><th width="385" scope="col">Unlimited storage</th></tr><tr><td><strong>Basic description</strong></td><td><p>Transient storage that is available to any web app.</p><p>It is automatic and does not need to be requested.</p></td><td>Permanent storage that must be requested through the Quota Management API and granted by users.</td><td><p>Permanent storage for Chrome extensions and apps.</p><p>It is set in the manifest file and must be granted by users.</p></td></tr><tr><td><strong>Availability</strong></td><td><p>All web apps.</p></td><td>All web apps.</td><td>Unique to <a href="/extensions">Chrome extensions</a> as well as hosted and installed <a href="/apps/">web apps</a>.</td></tr><tr><td><strong>Permission</strong></td><td>None. You can use it without explicitly requesting it.</td><td><p>You have to request more storage using the Quota Management API.</p></td><td>You can ask for the <code>unlimitedStorage</code> permission in the manifest file for the <a href="/chrome/apps/docs/developers_guide#manifest">app</a> or <a href="/extensions/manifest#permissions">extension</a>.</td></tr><tr><td><strong>User experience at first use</strong></td><td>Invisible to the user. The app just runs.</td><td><p>Chrome displays an info bar that prompts the user to either accept or decline the storage request.</p><p>But if the amount of quota you request is actually less than the app's current allocation, no prompt is shown. The larger quota is kept.</p></td><td><p>At installation, the user is informed of permissions required by the app or extension. By proceeding with the installation, the user implicitly grants permission for all pages whose URLs are listed in the manifest.json file for <a href="/chrome/apps/docs/developers_guide#manifest">app</a> or <a href="/extensions/manifest">extension</a>.</p></td></tr><tr><td><strong>User experience at subsequent requests for increased storage</strong></td><td>Not applicable. You cannot ask for more temporary storage.</td><td><p>Chrome prompts the user again.</p><p>&nbsp;</p><p></p></td><td>Chrome does not prompt the user after installation, regardless of the requests for increased quota by the app or extension.</td></tr><tr><td><strong>Persistence of data</strong></td><td><p>Transient. The browser can delete the data.</p></td><td><p>Persistent. The browser doesn't delete the data unless the user instructs it to. Data is available in subsequent accesses.</p><p>Do not assume that the data is permanent, because the user can delete it.</p></td><td><p>Same as persistent storage.</p><p>&nbsp;</p></td></tr><tr><td><strong>Default storage space</strong></td><td><p>Up to 20% of the shared pool.</p></td><td>0 MB. You have to explicitly ask for a specific storage space.</td><td><p>0 MB. You have to explicitly ask for <code>unlimitedStorage</code> in the manifest file.</p><p>If you do not specify your storage requirements, Chrome allocates storage to the app from the shared pool of temporary storage.</p></td></tr><tr><td><strong>Maximum storage space</strong></td><td>Up to 20% of the shared pool.</td><td>As large as the available space on the hard drive. It has no fixed pool of storage.</td><td>As large as the available space on the hard drive.</td></tr><tr><td><strong>Recommended use case</strong></td><td>Caching.</td><td>Apps that work offline or have a large number of assets.</td><td>Apps that were designed to run in Google Chrome.</td></tr><tr><td><strong>APIs that can use it</strong></td><td><p>Offline APIs</p><ul><li>App Cache</li><li>File System</li><li>IndexedDB</li><li>WebSQL (<a href="https://www.w3.org/TR/webdatabase/">deprecated</a> since November 18, 2010)</li></ul><p class="note"><strong>Note:</strong> Web storage APIs like LocalStorage and SessionStorage remain fixed at 5 MB.</p></td><td>File System API</td><td><p>Offline APIs</p><ul><li>App Cache</li><li>File System</li><li>IndexedDB</li><li>WebSQL (deprecated)</li></ul><p class="note"><strong>Note:</strong> Web storage APIs like LocalStorage and SessionStorage remain fixed at 5 MB.</p></td></tr></tbody></table>
 
## Managing your quota {: #managing_quota }

With the Quota Management API, which was introduced in Chrome 13, you can do the following:

- [Query storage usage and availability][33]
- [Ask for more storage][34]
- [Reset quota for testing][35]

The API is implemented with the global object `window.webkitStorageInfo`.

For the reference documentation, see the [next section][36].

### Querying storage usage and availability {: #query }

To query the storage size that is being used and the available space left for the host, call
`queryUsageAndQuota()` with the following:

- Type of storage you want to check
- Success callback

The usage reported by the API might not match with the actual size of the user data, as each storage
might need some extra bytes to store its metadata. Also, status updates can lag, resulting in the
API not reflecting the most recent storage status.

The following code snippet shows how you can ask about storage space:

```js
// Request storage usage and capacity left
// Choose either Temporary or Persistent
navigator.webkitTemporaryStorage.queryUsageAndQuota (
    function(usedBytes, grantedBytes) {
        console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
    },
    function(e) { console.log('Error', e);  }
);
```

If you want to ask for the status of persistent storage, simply replace
`webkitStorageInfo.TEMPORARY` with `webkitStorageInfo.PERSISTENT`. The enum is also in the
`window` object (global namespace), so you can also use `window.PERSISTENT` and
`window.TEMPORARY`.

### Asking for more storage {: #asking_more }

You don't need to ask for more temporary storage as the allocation is automatic, and you can't get
beyond the maximum limit (as described in the [table][37]).

For persistent storage for File System API, the default quota is 0, so you need to explicitly
request storage for your application. Call `requestQuota()` with the following:

- Type of storage
- Size
- Success callback

Depending on what you ask for, the following happens:

- If you ask for a larger quota, the browser presents an info bar to the user and prompts them to
  either grant or deny permission for increased quota. In some cases, the request might be silently
  rejected, and the current quota or smaller quota is returned.
- If the amount of quota you request is less than the app's current allocation, no prompt is shown.
- If you ask for more storage than what is allowed, you get an error (`QUOTA_EXCEEDED_ERR`).
- If you call `requestQuota()` again after the user has already granted permission, nothing happens.
  So don't bother calling the method again.

The following shows how you can ask for more storage space:

```js
// Request Quota (only for File System API)
var requestedBytes = 1024*1024*10; // 10MB

navigator.webkitPersistentStorage.requestQuota (
    requestedBytes, function(grantedBytes) {
        window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);

    }, function(e) { console.log('Error', e); }
);
});
```

### Resetting quota for testing {: #reset }

When you are testing storage in your app, you might want to clear the stored data so that you can
test quota management afresh in your app. To do so:

1.  Enter `chrome://settings/cookies` in the omnibox (the address bar).
2.  Search for your app.
3.  Select your app.
4.  Click the **X** on the right side of the highlighted selection.

## API reference {: #reference }

This section documents the methods of the Quota Management API.

### Constants {: #constants }

The following are `webkitStorageInfo` constants, which indicate the type of storage.

<table><thead><tr><th scope="col" width="111">Constant</th><th scope="col" width="53">Value</th><th scope="col" width="690">Description</th></tr></thead><tbody><tr><td><a href=""><code>TEMPORARY</code></a></td><td>0</td><td>Temporary storage.</td></tr><tr><td><a href=""><code>PERSISTENT</code></a></td><td>1</td><td>Persistent storage.</td></tr></tbody></table>

### Method overview {: #method_overview }

<table><tbody><tr><td><a href="/apps/offline_storage#queryUsageAndQuota"><code>queryUsageAndQuota</code></a></td></tr><tr><td><a href="/apps/offline_storage#requestQuota"><code>requestQuota</code></a></td></tr></tbody></table>

### Methods {: #methods }

#### queryUsageAndQuota {: #queryUsageAndQuota }

Check the storage size that is being used and the available space left for the host.

```js
 // you could also use it from webkitPersistentStorage
navigator.webkitTemporaryStorage.queryUsageAndQuota(
      successCallback,
      errorCallback);
```

* `successCallback`: Optional callback with two parameters:

  - The current number of bytes the app is using.
  - The number of bytes left in the quota.

* `errorCallback`: Optional error callback.

#### requestQuota {: #requestQuota }

Ask for more storage. The browser presents an info bar to prompt user to grant or deny the app the
permission to have more storage.

```js
 // you could also use it from webkitTemporaryStorage
navigator.webkitPersistentStorage.requestQuota (
      newQuotaInBytes,
      quotaCallback,
      errorCallback);
```

##### Parameters

* `newQuotaInBytes`: The amount of bytes you want in your storage quota.
* `successCallback`: Optional callback that passes the amount of bytes granted.
* `errorCallback`: Optional error callback.

## Future development {: #future }

The plan is to put all HTML5 offline storage APIs—including IndexedDB, Application Cache, File
System,{# LocalStorage, SessionStorage,#} and other APIs that might be specified—under the Quota
Management API. You will be able to manage all storage allocation with it.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: #types
[4]: #temporary
[5]: #persistent
[6]: #unlimited
[7]: #table
[8]: #managing_quota
[9]: #query
[10]: #asking_more
[11]: #reset
[12]: #reference
[13]: #constants
[14]: #method_overview
[15]: #methods
[16]: #future
[17]: #temporary
[18]: #persistent
[19]: #unlimited
[20]: #table
[21]: #query
[22]: /chrome/apps/docs/developers_guide#manifest
[23]: /extensions/manifest#permissions
[24]: /chrome/apps/docs/developers_guide#manifest
[25]: /extensions/manifest
[26]: /extensions
[27]: /apps/
[28]: /chrome/apps/docs/developers_guide#manifest
[29]: /extensions/manifest#permissions
[30]: /chrome/apps/docs/developers_guide#manifest
[31]: /extensions/manifest
[32]: https://www.w3.org/TR/webdatabase/
[33]: #query
[34]: #asking_more
[35]: #reset
[36]: #reference
[37]: #table
[38]: /apps/offline_storage#queryUsageAndQuota
[39]: /apps/offline_storage#requestQuota

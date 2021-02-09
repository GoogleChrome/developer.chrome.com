---
api: browsingData
---

## Manifest

You must declare the "browsingData" permission in the [extension manifest][1] to use this API.

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "browsingData",
  ],
  ...
}
```

## Usage

The simplest use-case for this API is a a time-based mechanism for clearing a user's browsing data.
Your code should provide a timestamp which indicates the historical date after which the user's
browsing data should be removed. This timestamp is formatted as the number of milliseconds since the
Unix epoch (which can be retrieved from a JavaScript `Date` object via the `getTime` method).

For example, to clear all of a user's browsing data from the last week, you might write code as
follows:

```js
var callback = function () {
  // Do something clever here once data has been removed.
};

var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
chrome.browsingData.remove({
  "since": oneWeekAgo
}, {
  "appcache": true,
  "cache": true,
  "cacheStorage": true,
  "cookies": true,
  "downloads": true,
  "fileSystems": true,
  "formData": true,
  "history": true,
  "indexedDB": true,
  "localStorage": true,
  "passwords": true,
  "serviceWorkers": true,
  "webSQL": true
}, callback);
```

The `chrome.browsingData.remove` method allows you to remove various types of browsing data with a
single call, and will be much faster than calling multiple more specific methods. If, however, you
only want to clear one specific type of browsing data (cookies, for example), the more granular
methods offer a readable alternative to a call filled with JSON.

```js
var callback = function () {
  // Do something clever here once data has been removed.
};

var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
chrome.browsingData.removeCookies({
  "since": oneWeekAgo
}, callback);
```

If the user is syncing their data, `chrome.browsingData.remove` may automatically rebuild the cookie
for the Sync account after clearing it. This is to ensure that Sync can continue working, so that
the data can be eventually deleted on the server. However the more specific
`chrome.browsingData.removeCookies` can be used to clear the cookie for the Sync account, and Sync
will be paused in this case.

{% Aside 'caution' %}

**Important**: Removing browsing data involves a good deal of heavy lifting in the background, and
can take _tens of seconds_ to complete, depending on a user's profile. You should use the callback
mechanism to keep your users up to date on the removal's status.

{% endAside %}

## Specific Origins

To remove data for a specific origin or to exclude a set of origins from deletion, you can use the
`RemovalOptions.origins` and `RemovalOptions.excludeOrigins` parameters. They can only be applied to
cookies, cache, and storage (CacheStorage, FileSystems, IndexedDB, LocalStorage, ServiceWorkers, and
WebSQL).

```js
chrome.browsingData.remove({
  "origins": ["https://www.example.com"]
}, {
  "cacheStorage": true,
  "cookies": true,
  "fileSystems": true,
  "indexedDB": true,
  "localStorage": true,
  "serviceWorkers": true,
  "webSQL": true
}, callback);
```

{% Aside 'caution' %}

**Important**: As cookies are scoped more broadly than other types of storage, deleting cookies for
an origin will delete all cookies of the registrable domain. For example, deleting data for
`https://www.example.com` will delete cookies with a domain of `.example.com` as well.

{% endAside %}

## Origin Types

Adding an `originTypes` property to the API's options object allows you to specify which types of
origins ought to be effected. Currently, origins are divided into three categories:

- `unprotectedWeb` covers the general case of websites that users visit without taking any special
  action. If you don't specify an `originTypes`, the API defaults to removing data from unprotected
  web origins.
- `protectedWeb` covers those web origins that have been installed as hosted applications.
  Installing [Angry Birds][2], for example, protects the origin `http://chrome.angrybirds.com`, and
  removes it from the `unprotectedWeb` category. Please do be careful when triggering deletion of
  data for these origins: make sure your users know what they're getting, as this will irrevocably
  remove their game data. No one wants to knock tiny pig houses over more often than necessary.
- `extension` covers origins under the `chrome-extensions:` scheme. Removing extension data is,
  again, something you should be very careful about.

We could adjust the previous example to remove only data from protected websites as follows:

```js
var callback = function () {
  // Do something clever here once data has been removed.
};

var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
chrome.browsingData.remove({
  "since": oneWeekAgo,
  "originTypes": {
    "protectedWeb": true
  }
}, {
  "appcache": true,
  "cache": true,
  "cacheStorage": true,
  "cookies": true,
  "downloads": true,
  "fileSystems": true,
  "formData": true,
  "history": true,
  "indexedDB": true,
  "localStorage": true,
  "passwords": true,
  "serviceWorkers": true,
  "webSQL": true
}, callback);
```

{% Aside 'caution' %}

**Seriously**: Be careful with `protectedWeb` and `extension`. These are destructive operations that
your users will write angry email about if they're not well-informed about what to expect when your
extension removes data on their behalf.

{% endAside %}

## Examples

Samples for the `browsingData` API are available [on the samples page][3].

[1]: /docs/extensions/mv2/tabs
[2]: https://chrome.google.com/webstore/detail/aknpkdffaafgjchaibgeefbgmgeghloj
[3]: /docs/extensions/mv2/samples#search:browsingData

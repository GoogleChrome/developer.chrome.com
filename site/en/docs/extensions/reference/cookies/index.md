---
api: cookies
---

## Manifest

To use the cookies API, declare the `"cookies"` permission in your
manifest along with [host permissions][1] for any hosts whose cookies you want
to access. For example:

```json
{
  "name": "My extension",
  ...
  "host_permissions": [
    "*://*.google.com/"
  ],
  "permissions": [
    "cookies"
  ],
  ...
}
```

## Partitioning {: #partitioning }

[Partitioned cookies][chips] allow a site to mark that certain cookies should be keyed against the
origin of the top-level frame. This means that, for example, if site A is embedded using an iframe in site B
and site C, the embedded versions of a partitioned cookie from A can have different values on B and C.

Because `chrome.cookies` doesn't support partitioning, all of its methods
read and write cookies from all partitions. The [`cookies.set()`](#method-set) method stores cookies in
the default partition.

For details on the general impact of partitioning for extensions, see
[Storage and Cookies][cookie-partitioning].

## Examples

You can find a simple example of using the cookies API in the
[examples/api/cookies][2] directory. For other examples and for help in viewing
the source code, see [Samples][3].

[1]: /docs/extensions/mv3/declare_permissions
[2]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/cookies/cookie-clearer
[3]: /docs/extensions/samples
[chips]: /docs/privacy-sandbox/chips
[partitioning-api-proposal]: https://docs.google.com/document/d/1iZKjdUft0x3m6pTH8hnppF5VHinCy0Wlprk7bUwV-XY/edit?usp=sharing
[cookie-partitioning]: /docs/extensions/mv3/storage-and-cookies/#cookies-partitioning

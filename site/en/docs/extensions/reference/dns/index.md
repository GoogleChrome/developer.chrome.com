---
api: dns
---

## Manifest

To use this API, you must declare the `"dns"` permission in the [manifest][manifest].

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "dns"
  ],
  ...
}
```

{% Aside %}
This API is only available in [Chrome Dev](https://www.google.com/chrome/dev/).
{% endAside %}

### Usage {: #usage }

The following code uses the [`resolve()`](#method-resolve) method to retrieve the IP address of `example.com`.

{% Label %}service-worker.js:{% endLabel %}

```js
const resolveDNS = async () => {
    let record = await chrome.dns.resolve('example.com');
    console.log(record.address); // "192.0.2.172"
};

resolveDNS();
```

{% Aside 'important' %}
Do not include the scheme or trailing slash in the hostname. For example, https://example.com/ is invalid.
{% endAside %}

[manifest]: /docs/extensions/mv3/manifest/

---
api: devtools.network
---

See [DevTools APIs summary][1] for general introduction to using Developer Tools APIs.

## Overview

Network requests information is represented in the HTTP Archive format (_HAR_). The description of
HAR is outside of scope of this document, please refer to [HAR v1.2 Specification][2].

In terms of HAR, the `chrome.devtools.network.getHAR()` method returns entire _HAR log_, while
`chrome.devtools.network.onRequestFinished` event provides _HAR entry_ as an argument to the event
callback.

Note that request content is not provided as part of HAR for efficieny reasons. You may call
request's `getContent()` method to retrieve content.

If the Developer Tools window is opened after the page is loaded, some requests may be missing in
the array of entries returned by `getHAR()`. Reload the page to get all requests. In general, the
list of requests returned by `getHAR()` should match that displayed in the Network panel.

## Examples

The following code logs URLs of all images larger than 40KB as they are loaded:

```js
chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
    if (request.response.bodySize > 40*1024) {
      chrome.devtools.inspectedWindow.eval(
          'console.log("Large image: " + unescape("' +
          escape(request.request.url) + '"))');
    }
  }
);
```

You can find more examples that use this API in [Samples][3].

[1]: /docs/extensions/mv3/devtools
[2]: https://www.softwareishard.com/blog/har-12-spec/
[3]: /docs/extensions/mv3/samples#search:devtools.network

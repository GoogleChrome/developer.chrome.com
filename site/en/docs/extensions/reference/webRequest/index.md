---
api: webRequest
---

## Manifest

You must declare the "webRequest" permission in the [extension manifest][1] to use the web request
API, along with the necessary [host permissions][2]. To intercept a sub-resource request, the
extension needs to have access to both the requested URL and its initiator. If you want to use the
web request API in a blocking fashion, you need to request the "webRequestBlocking" permission in
addition. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "webRequest",
    "*://*.google.com/"
  ],
  ...
}
```

## Life cycle of requests

The web request API defines a set of events that follow the life cycle of a web request. You can use
these events to observe and analyze traffic. Certain synchronous events will allow you to intercept,
block, or modify a request.

The event life cycle for successful requests is illustrated here, followed by event definitions:

![Life cycle of a web request from the perspective of the webrequest API](webrequestapi.png)

`onBeforeRequest` (optionally synchronous)

: Fires when a request is about to occur. This event is sent before any TCP connection is made and can
  be used to cancel or redirect requests.

`onBeforeSendHeaders` (optionally synchronous)

: Fires when a request is about to occur and the initial headers have been prepared. The event is
  intended to allow extensions to add, modify, and delete request headers [(\*)][3]. The
  `onBeforeSendHeaders` event is passed to all subscribers, so different subscribers may attempt to
  modify the request; see the [Implementation details][4] section for how this is handled. This event
  can be used to cancel the request.

`onSendHeaders`

: Fires after all extensions have had a chance to modify the request headers, and presents the final
  [(\*)][5] version. The event is triggered before the headers are sent to the network. This event is
  informational and handled asynchronously. It does not allow modifying or cancelling the request.

`onHeadersReceived` (optionally synchronous)

: Fires each time that an HTTP(S) response header is received. Due to redirects and authentication
  requests this can happen multiple times per request. This event is intended to allow extensions to
  add, modify, and delete response headers, such as incoming Content-Type headers. The caching
  directives are processed before this event is triggered, so modifying headers such as Cache-Control
  has no influence on the browser's cache. It also allows you to cancel or redirect the request.

`onAuthRequired` (optionally synchronous)

: Fires when a request requires authentication of the user. This event can be handled synchronously to
  provide authentication credentials. Note that extensions may provide invalid credentials. Take care
  not to enter an infinite loop by repeatedly providing invalid credentials. This can also be used to
  cancel the request.

`onBeforeRedirect`

: Fires when a redirect is about to be executed. A redirection can be triggered by an HTTP response
  code or by an extension. This event is informational and handled asynchronously. It does not allow
  you to modify or cancel the request.

`onResponseStarted`

: Fires when the first byte of the response body is received. For HTTP requests, this means that the
  status line and response headers are available. This event is informational and handled
  asynchronously. It does not allow modifying or cancelling the request.

`onCompleted`

: Fires when a request has been processed successfully.

`onErrorOccurred`

: Fires when a request could not be processed successfully.

The web request API guarantees that for each request either `onCompleted` or `onErrorOccurred` is
fired as the final event with one exception: If a request is redirected to a `data://` URL,
`onBeforeRedirect` is the last reported event.

<a id="#life_cycle_footnote">*</a>
Note that the web request API presents an abstraction of the network stack to the extension.
Internally, one URL request can be split into several HTTP requests (for example to fetch individual
byte ranges from a large file) or can be handled by the network stack without communicating with the
network. For this reason, the API does not provide the final HTTP headers that are sent to the
network. For example, all headers that are related to caching are invisible to the extension.

The following headers are currently **not provided** to the `onBeforeSendHeaders` event. This list
is not guaranteed to be complete nor stable.

- Authorization
- Cache-Control
- Connection
- Content-Length
- Host
- If-Modified-Since
- If-None-Match
- If-Range
- Partial-Data
- Pragma
- Proxy-Authorization
- Proxy-Connection
- Transfer-Encoding

Starting from Chrome 79, request header modifications affect Cross-Origin Resource Sharing (CORS)
checks. If modified headers for cross-origin requests do not meet the criteria, it will result in
sending a CORS preflight to ask the server if such headers can be accepted. If you really need to
modify headers in a way to violate the CORS protocol, you need to specify `'extraHeaders'` in
`opt_extraInfoSpec`. On the other hand, response header modifications do not work to deceive CORS
checks. If you need to deceive the CORS protocol, you also need to specify `'extraHeaders'` for the
response modifications.

Starting from Chrome 79, the webRequest API **does not** intercept CORS preflight requests and
responses by default. A CORS preflight for a request URL is visible to an extension if there is a
listener with `'extraHeaders'` specified in `opt_extraInfoSpec` for the request URL.
`onBeforeRequest` can also take `'extraHeaders'` from Chrome 79.

Starting from Chrome 79, the following request header is **not provided** and cannot be modified or
removed without specifying `'extraHeaders'` in `opt_extraInfoSpec`:

- Origin

{% Aside %}

**Note:** Modifying the `Origin` request header might not work as intended and may result in
unexpected errors in the response's [CORS checks][6]. This is because while extensions can only
modify the [Origin][7] request header, they can't change the `request origin` or initiator, which is
a concept defined in the Fetch spec to represent who initiates the request. In such a scenario, the
server may allow the CORS access for the modified request and put the header's `Origin` into the
`Access-Control-Allow-Origin` header in the response. But it won't match the immutable
`request origin` and result in a CORS failure.

{% endAside %}

Starting from Chrome 72, if you need to modify responses before [Cross Origin Read Blocking
(CORB)][8] can block the response, you need to specify `'extraHeaders'` in `opt_extraInfpSpec`.

Starting from Chrome 72, the following request headers are **not provided** and cannot be modified
or removed without specifying `'extraHeaders'` in `opt_extraInfoSpec`:

- Accept-Language
- Accept-Encoding
- Referer
- Cookie

Starting from Chrome 72, the `Set-Cookie` response header is **not provided** and cannot be modified
or removed without specifying `'extraHeaders'` in `opt_extraInfoSpec`.

Starting from Chrome 89, the `X-Frame-Options` response header cannot be effectively modified
or removed without specifying `'extraHeaders'` in `opt_extraInfoSpec`.

{% Aside %}

**Note:** Specifying `'extraHeaders'` in `opt_extraInfoSpec` may have a negative impact on
performance, hence it should only be used when really necessary.

{% endAside %}

The webRequest API only exposes requests that the extension has permission to see, given its [host
permissions][9]. Moreover, only the following schemes are accessible: `http://`, `https://`,
`ftp://`, `file://`, `ws://` (since Chrome 58), `wss://` (since Chrome 58), `urn:` (since Chrome 91), or
`chrome-extension://`. In addition, even certain requests with URLs using one of the above schemes
are hidden. These include `chrome-extension://other_extension_id` where `other_extension_id` is not
the ID of the extension to handle the request, `https://www.google.com/chrome`, and other sensitive
requests core to browser functionality. Also synchronous XMLHttpRequests from your extension are
hidden from blocking event handlers in order to prevent deadlocks. Note that for some of the
supported schemes the set of available events might be limited due to the nature of the
corresponding protocol. For example, for the file: scheme, only `onBeforeRequest`,
`onResponseStarted`, `onCompleted`, and `onErrorOccurred` may be dispatched.

Starting from Chrome 58, the webRequest API supports intercepting the WebSocket handshake request.
Since the handshake is done by means of an HTTP upgrade request, its flow fits into HTTP-oriented
webRequest model. Note that the API does **not intercept**:

- Individual messages sent over an established WebSocket connection.
- WebSocket closing connection.

Redirects are **not supported** for WebSocket requests.

Starting from Chrome 72, an extension will be able to intercept a request only if it has host
permissions to both the requested URL and the request initiator.

## Concepts

As the following sections explain, events in the web request API use request IDs, and you can
optionally specify filters and extra information when you register event listeners.

### Request IDs

Each request is identified by a request ID. This ID is unique within a browser session and the
context of an extension. It remains constant during the the life cycle of a request and can be used
to match events for the same request. Note that several HTTP requests are mapped to one web request
in case of HTTP redirection or HTTP authentication.

### Registering event listeners

To register an event listener for a web request, you use a variation on the [usual `addListener()`
function][10]. In addition to specifying a callback function, you have to specify a filter argument
and you may specify an optional extra info argument.

The three arguments to the web request API's `addListener()` have the following definitions:

```js
var callback = function(details) {...};
var filter = {...};
var opt_extraInfoSpec = [...];
```

Here's an example of listening for the `onBeforeRequest` event:

```js
chrome.webRequest.onBeforeRequest.addListener(
    callback, filter, opt_extraInfoSpec);
```

Each `addListener()` call takes a mandatory callback function as the first parameter. This callback
function is passed a dictionary containing information about the current URL request. The
information in this dictionary depends on the specific event type as well as the content of
`opt_extraInfoSpec`.

If the optional `opt_extraInfoSpec` array contains the string `'blocking'` (only allowed for
specific events), the callback function is handled synchronously. That means that the request is
blocked until the callback function returns. In this case, the callback can return a
[`webRequest.BlockingResponse`][11] that determines the further life cycle of the request. Depending
on the context, this response allows cancelling or redirecting a request (`onBeforeRequest`),
cancelling a request or modifying headers (`onBeforeSendHeaders`, `onHeadersReceived`), and
cancelling a request or providing authentication credentials (`onAuthRequired`).

If the optional `opt_extraInfoSpec` array contains the string `'asyncBlocking'` instead (only
allowed for `onAuthRequired`), the extension can generate the [`webRequest.BlockingResponse`][12]
asynchronously.

The [`webRequest.RequestFilter`][13] `filter` allows limiting the requests for which events are
triggered in various dimensions:

URLs

: [URL patterns][14] such as `*://www.google.com/foo*bar`.

Types

: Request types such as `main_frame` (a document that is loaded for a top-level frame), `sub_frame` (a
  document that is loaded for an embedded frame), and `image` (an image on a web site). See
  [`webRequest.RequestFilter`][15].

Tab ID

: The identifier for one tab.

Window ID

: The identifier for a window.

Depending on the event type, you can specify strings in `opt_extraInfoSpec` to ask for additional
information about the request. This is used to provide detailed information on request's data only
if explicitly requested.

## Implementation details

Several implementation details can be important to understand when developing an extension that uses
the web request API:

### Conflict resolution

In the current implementation of the web request API, a request is considered as cancelled if at
least one extension instructs to cancel the request. If an extension cancels a request, all
extensions are notified by an `onErrorOccurred` event. Only one extension is allowed to redirect a
request or modify a header at a time. If more than one extension attempts to modify the request, the
most recently installed extension wins and all others are ignored. An extension is not notified if
its instruction to modify or redirect has been ignored.

### Caching

Chrome employs two caches—an on-disk cache and a very fast in-memory cache. The lifetime of an
in-memory cache is attached to the lifetime of a render process, which roughly corresponds to a tab.
Requests that are answered from the in-memory cache are invisible to the web request API. If a
request handler changes its behavior (for example, the behavior according to which requests are
blocked), a simple page refresh might not respect this changed behavior. To make sure the behavior
change goes through, call `handlerBehaviorChanged()` to flush the in-memory cache. But don't do it
often; flushing the cache is a very expensive operation. You don't need to call
`handlerBehaviorChanged()` after registering or unregistering an event listener.

### Timestamps

The `timestamp` property of web request events is only guaranteed to be _internally_ consistent.
Comparing one event to another event will give you the correct offset between them, but comparing
them to the current time inside the extension (via `(new Date()).getTime()`, for instance) might
give unexpected results.

### Error handling

If you try to register an event with invalid arguments, then a JavaScript error will be thrown, and
the event handler will not be registered. If an error is thrown while an event is handled, or if an
event handler returns an invalid blocking response, an error message is logged to your extension's
console and the handler is ignored for that request.

## Examples

The following example illustrates how to block all requests to `www.evil.com`:

```js
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {cancel: details.url.indexOf("://www.evil.com/") != -1};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
```

As this function uses a blocking event handler, it requires the "webRequest" as well as the
"webRequestBlocking" permission in the manifest file.

The following example achieves the same goal in a more efficient way because requests that are not
targeted to `www.evil.com` do not need to be passed to the extension:

```js
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { return {cancel: true}; },
  {urls: ["*://www.evil.com/*"]},
  ["blocking"]
);
```

The following example illustrates how to delete the User-Agent header from all requests:

```js
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders.splice(i, 1);
        break;
      }
    }
    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);
```

For more example code, see the [web request samples][16].

[1]: /docs/extensions/mv2/tabs
[2]: /docs/extensions/mv2/declare_permissions
[3]: #life_cycle_footnote
[4]: #implementation-details
[5]: #life_cycle_footnote
[6]: https://fetch.spec.whatwg.org/#cors-check
[7]: https://fetch.spec.whatwg.org/#origin-header
[8]:
  https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md
[9]: /docs/extensions/mv2/declare_permissions
[10]: /docs/extensions/events
[11]: #type-BlockingResponse
[12]: #type-BlockingResponse
[13]: #type-RequestFilter
[14]: /docs/extensions/mv2/match_patterns
[15]: #type-RequestFilter
[16]: /docs/extensions/mv2/samples#search:webrequest

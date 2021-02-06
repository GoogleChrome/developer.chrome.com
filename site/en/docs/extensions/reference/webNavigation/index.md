---
api: webNavigation
---

## Manifest

All `chrome.webNavigation` methods and events require you to declare the "webNavigation" permission
in the [extension manifest][1]. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "webNavigation"
  ],
  ...
}
```

## Examples

You can find simple examples of using the tabs module in the [examples/api/webNavigation][2]
directory. For other examples and for help in viewing the source code, see [Samples][3].

## Event order

For a navigation that is successfully completed, events are fired in the following order:

```text
onBeforeNavigate -> onCommitted -> onDOMContentLoaded -> onCompleted
```

Any error that occurs during the process results in an `onErrorOccurred` event. For a specific
navigation, there are no further events fired after `onErrorOccurred`.

If a navigating frame contains subframes, its `onCommitted` is fired before any of its children's
`onBeforeNavigate`; while `onCompleted` is fired after all of its children's `onCompleted`.

If the reference fragment of a frame is changed, a `onReferenceFragmentUpdated` event is fired. This
event can fire any time after `onDOMContentLoaded`, even after `onCompleted`.

If the history API is used to modify the state of a frame (e.g. using `history.pushState()`, a
`onHistoryStateUpdated` event is fired. This event can fire any time after `onDOMContentLoaded`.

If a navigation was triggered via [Chrome Instant][4] or [Instant Pages][5], a completely loaded
page is swapped into the current tab. In that case, an `onTabReplaced` event is fired.

## Relation to webRequest events

There is no defined ordering between events of the [webRequest API][6] and the events of the
webNavigation API. It is possible that webRequest events are still received for frames that already
started a new navigation, or that a navigation only proceeds after the network resources are already
fully loaded.

In general, the webNavigation events are closely related to the navigation state that is displayed
in the UI, while the webRequest events correspond to the state of the network stack which is
generally opaque to the user.

## A note about tab IDs

Not all navigating tabs correspond to actual tabs in Chrome's UI, e.g., a tab that is being
pre-rendered. Such tabs are not accessible via the [tabs API][7] nor can you request information
about them via `webNavigation.getFrame` or `webNavigation.getAllFrames`. Once such a tab is swapped
in, an `onTabReplaced` event is fired and they become accessible via these APIs.

## A note about timestamps

It's important to note that some technical oddities in the OS's handling of distinct Chrome
processes can cause the clock to be skewed between the browser itself and extension processes. That
means that WebNavigation's events' `timeStamp` property is only guaranteed to be _internally_
consistent. Comparing one event to another event will give you the correct offset between them, but
comparing them to the current time inside the extension (via `(new Date()).getTime()`, for instance)
might give unexpected results.

## A note about frame IDs

Frames within a tab can be identified by a frame ID. The frame ID of the main frame is always 0, the
ID of child frames is a positive number. Once a document is constructed in a frame, its frame ID
remains constant during the lifetime of the document. As of Chrome 49, this ID is also constant for
the lifetime of the frame (across multiple navigations).

Due to the multi-process nature of Chrome, a tab might use different processes to render the source
and destination of a web page. Therefore, if a navigation takes place in a new process, you might
receive events both from the new and the old page until the new navigation is committed (i.e. the
`onCommitted` event is send for the new main frame). In other words, it is possible to have more
than one pending sequence of webNavigation events with the same `frameId`. The sequences can be
distinguished by the `processId` key.

Also note that during a provisional load the process might be switched several times. This happens
when the load is redirected to a different site. In this case, you will receive repeated
`onBeforeNavigate` and `onErrorOccurred` events, until you receive the final `onCommitted` event.

## Transition types and qualifiers

The webNavigation API's `onCommitted` event has a `transitionType` and a `transitionQualifiers`
property. The _transition type_ is the same as used in the [history API][8] describing how the
browser navigated to this particular URL. In addition, several _transition qualifiers_ can be
returned that further define the navigation.

The following transition qualifiers exist:

<table><tbody><tr><th>Transition qualifier</th><th>Description</th></tr><tr><td>"client_redirect"</td><td>One or more redirects caused by JavaScript or meta refresh tags on the page happened during the navigation.</td></tr><tr><td>"server_redirect"</td><td>One or more redirects caused by HTTP headers sent from the server happened during the navigation.</td></tr><tr><td>"forward_back"</td><td>The user used the Forward or Back button to initiate the navigation.</td></tr><tr><td>"from_address_bar"</td><td>The user initiated the navigation from the address bar (aka Omnibox).</td></tr></tbody></table>

[1]: /docs/extensions/mv2/tabs
[2]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/webNavigation/
[3]: /docs/extensions/mv2/samples
[4]: https://support.google.com/chrome/answer/177873
[5]: https://support.google.com/chrome/answer/1385029
[6]: /docs/extensions/webRequest
[7]: /docs/extensions/tabs
[8]: /docs/extensions/history#transition_types

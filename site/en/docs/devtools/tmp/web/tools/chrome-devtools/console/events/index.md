---
layout: "layouts/doc-post.njk"
title: "Monitor Events"
authors:
  - megginkearney
  - flaviocopes
date: 2015-04-13
updated: 2020-07-10
description: "The Chrome DevTools Command Line API offers various ways to observe and inspect event listeners"
---

!!!.aside.aside--warning

This page is deprecated.

!!!

The Chrome DevTools Command Line API offers various ways to observe and inspect event listeners.
JavaScript plays a central role in interactive pages, and the browser provides you some useful tools
to debug events and event handlers.

## TL;DR {: #tldr }

- Listen to events of a certain type using `monitorEvents()`.
- Use `unmonitorEvents()` to stop listening.
- Get listeners of a DOM element using `getEventListeners()`.
- Use the Event Listeners Inspector panel to get information on event listeners.

## Monitor events {: #monitor_events }

The [monitorEvents()][1] method instructs the DevTools to log information on the specified targets.

The first parameter is the object to monitor. All events return if the second parameter is not
provided. To specify the events to listen to, pass either a string or an array of strings as the
second parameter.

Listen to click events on the body of the page:

```js
monitorEvents(document.body, "click");
```

If the monitored event is a supported _event type_ that the DevTools maps to a set of standard event
names, then the method listens to the events for that type.

The [Command Line API][2] has a full mapping of _event types_ to the events they cover.

To stop monitoring events, call the `unmonitorEvents()` method and give it the object to stop
monitoring.

Stop listening to events on the `body` object:

```js
unmonitorEvents(document.body);
```

## View event listeners registered on objects {: #view_event_listeners_registered_on_objects }

The [getEventListeners() API][3] returns the event listeners registered on the specified object.

The return value is an object that contains an array for each registered event type (`click` or
`keydown`, for example). The members of each array are objects that describe the listener registered
for each type. For example, the following code lists all the event listeners registered on the
document object:

```js
getEventListeners(document);
```

{% Img src="image/admin/T9sTJoEib9KuMjUO3vrf.png", alt="Output of using getEventListeners()", width="678", height="238" %}

If more than one listener is registered on the specified object, then the array contains a member
for each listener. In the following example, there are two event listeners registered on the
#scrollingList element for the `mousedown` event:

{% Img src="image/admin/uJ1gTpJwcegSK1MxSV0B.png", alt="View of the event listeners attached to mousedown", width="796", height="170" %}

Further expand each of these objects to explore their properties:

{% Img src="image/admin/Jk4QoVM3oMhT9yZM6xPe.png", alt="Expanded view of listener object", width="800", height="278" %}

## View event listeners registered on DOM elements {: #view_event_listeners_registered_on_dom_elements }

By default, the _Event Listeners_ panel in the Elements Inspector shows all the events attached to a
page:

{% Img src="image/admin/O7kMik8HNeeWZhnmYOn4.png", alt="Event listeners panel", width="800", height="178" %}

The filter limits the events just to the selected node:

{% Img src="image/admin/BeOeS9LNOqEYmfbiwpPw.png", alt="Event listeners panel, filtered by selected node only", width="800", height="160" %}

By expanding the object, the panel shows the event listener details. In this example, the page has
two event listeners attached via jQuery:

{% Img src="image/admin/kviukeFg4bMSd1OENbm4.png", alt="Expanded view of the event listeners", width="748", height="314" %}

[1]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events
[2]: /web/tools/chrome-devtools/debug/command-line/command-line-reference
[3]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject

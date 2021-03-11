---
layout: "layouts/doc-post.njk"
title: "Timeline Event Reference"
authors:
  - megginkearney
  - flaviocopes
date: 2015-04-13
#updated: YYYY-MM-DD
description: "The timeline events mode displays all events triggered while making a recording. Use the timeline event reference to learn more about each timeline event type."
---

The timeline events mode displays all events triggered while making a recording. Use the timeline
event reference to learn more about each timeline event type.

## Common timeline event properties {: #common_timeline_event_properties }

Certain details are present in events of all types, while some only apply to certain event types.
This section lists properties common to different event types. Properties specific to certain event
types are listed in the references for those event types that follow.

<table><thead><tr><th>Property</th><th style="text-align: left">When is it shown</th></tr></thead><tbody><tr><td>Aggregated time</td><td style="text-align: left">For events with <a href="/docs/devtools/evaluate-performance/timeline-tool#view-nested-events">nested events</a>, the time taken by each category of events.</td></tr><tr><td>Call Stack</td><td style="text-align: left">For events with <a href="/docs/devtools/evaluate-performance/timeline-tool#view-nested-events">child events</a>, the time taken by each category of events.</td></tr><tr><td>CPU time</td><td style="text-align: left">How much CPU time the recorded event took.</td></tr><tr><td>Details</td><td style="text-align: left">Other details about the event.</td></tr><tr><td>Duration (at time-stamp)</td><td style="text-align: left">How long it took the event with all of its children to complete; timestamp is the time at which the event occurred, relative to when the recording started.</td></tr><tr><td>Self time</td><td style="text-align: left">How long the event took without any of its children.</td></tr><tr><td>Used Heap Size</td><td style="text-align: left">Amount of memory being used by the application when the event was recorded, and the delta (+/-) change in used heap size since the last sampling.</td></tr></tbody></table>

## Loading events {: #loading_events }

This section lists events that belong to Loading category and their properties.

<table><thead><tr><th>Event</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Parse HTML</td><td style="text-align: left">Chrome executed its HTML parsing algorithm.</td></tr><tr><td>Finish Loading</td><td style="text-align: left">A network request completed.</td></tr><tr><td>Receive Data</td><td style="text-align: left">Data for a request was received. There will be one or more Receive Data events.</td></tr><tr><td>Receive Response</td><td style="text-align: left">The initial HTTP response from a request.</td></tr><tr><td>Send Request</td><td style="text-align: left">A network request has been sent.</td></tr></tbody></table>

### Loading event properties {: #loading_event_properties }

<table><thead><tr><th>Property</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Resource</td><td style="text-align: left">The URL of the requested resource.</td></tr><tr><td>Preview</td><td style="text-align: left">Preview of the requested resource (images only).</td></tr><tr><td>Request Method</td><td style="text-align: left">HTTP method used for the request (GET or POST, for example).</td></tr><tr><td>Status Code</td><td style="text-align: left">HTTP response code.</td></tr><tr><td>MIME Type</td><td style="text-align: left">MIME type of the requested resource.</td></tr><tr><td>Encoded Data Length</td><td style="text-align: left">Length of requested resource in bytes.</td></tr></tbody></table>

## Scripting events {: #scripting_events }

This section lists events that belong to the Scripting category and their properties.

<table><thead><tr><th>Event</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Animation Frame Fired</td><td style="text-align: left">A scheduled animation frame fired, and its callback handler invoked.</td></tr><tr><td>Cancel Animation Frame</td><td style="text-align: left">A scheduled animation frame was canceled.</td></tr><tr><td>GC Event</td><td style="text-align: left">Garbage collection occurred.</td></tr><tr><td>DOMContentLoaded</td><td style="text-align: left">The <a href="https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded">DOMContentLoaded</a> was fired by the browser. This event is fired when all of the page's DOM content has been loaded and parsed.</td></tr><tr><td>Evaluate Script</td><td style="text-align: left">A script was evaluated.</td></tr><tr><td>Event</td><td style="text-align: left">A JavaScript event ("mousedown", or "key", for example).</td></tr><tr><td>Function Call</td><td style="text-align: left">A top-level JavaScript function call was made (only appears when browser enters JavaScript engine).</td></tr><tr><td>Install Timer</td><td style="text-align: left">A timer was created with <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval">setInterval()</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout">setTimeout()</a>.</td></tr><tr><td>Request Animation Frame</td><td style="text-align: left">A <code translate="no" dir="ltr">requestAnimationFrame()</code> call scheduled a new frame</td></tr><tr><td>Remove Timer</td><td style="text-align: left">A previously created timer was cleared.</td></tr><tr><td>Time</td><td style="text-align: left">A script called <a href="/docs/devtools/console/reference#consoletimelabel">console.time()</a></td></tr><tr><td>Time End</td><td style="text-align: left">A script called <a href="/docs/devtools/console/reference#consoletimeendlabel">console.timeEnd()</a></td></tr><tr><td>Timer Fired</td><td style="text-align: left">A timer fired that was scheduled with <code translate="no" dir="ltr">setInterval()</code> or <code translate="no" dir="ltr">setTimeout()</code>.</td></tr><tr><td>XHR Ready State Change</td><td style="text-align: left">The ready state of an XMLHTTPRequest changed.</td></tr><tr><td>XHR Load</td><td style="text-align: left">An <code translate="no" dir="ltr">XMLHTTPRequest</code> finished loading.</td></tr></tbody></table>

### Scripting event properties {: #scripting_event_properties }

<table><thead><tr><th>Property</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Timer ID</td><td style="text-align: left">The timer ID.</td></tr><tr><td>Timeout</td><td style="text-align: left">The timeout specified by the timer.</td></tr><tr><td>Repeats</td><td style="text-align: left">Boolean that specifies if the timer repeats.</td></tr><tr><td>Function Call</td><td style="text-align: left">A function that was invoked.</td></tr></tbody></table>

## Rendering events {: #rendering_events }

This section lists events that belong to Rendering category and their properties.

<table><thead><tr><th>Event</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Invalidate layout</td><td style="text-align: left">The page layout was invalidated by a DOM change.</td></tr><tr><td>Layout</td><td style="text-align: left">A page layout was executed.</td></tr><tr><td>Recalculate style</td><td style="text-align: left">Chrome recalculated element styles.</td></tr><tr><td>Scroll</td><td style="text-align: left">The content of nested view was scrolled.</td></tr></tbody></table>

### Rendering event properties {: #rendering_event_properties }

<table><thead><tr><th>Property</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Layout invalidated</td><td style="text-align: left">For Layout records, the stack trace of the code that caused the layout to be invalidated.</td></tr><tr><td>Nodes that need layout</td><td style="text-align: left">For Layout records, the number of nodes that were marked as needing layout before the relayout started. These are normally those nodes that were invalidated by developer code, plus a path upward to relayout root.</td></tr><tr><td>Layout tree size</td><td style="text-align: left">For Layout records, the total number of nodes under the relayout root (the node that Chrome starts the relayout).</td></tr><tr><td>Layout scope</td><td style="text-align: left">Possible values are "Partial" (the re-layout boundary is a portion of the DOM) or "Whole document".</td></tr><tr><td>Elements affected</td><td style="text-align: left">For Recalculate style records, the number of elements affected by a style recalculation.</td></tr><tr><td>Styles invalidated</td><td style="text-align: left">For Recalculate style records, provides the stack trace of the code that caused the style invalidation.</td></tr></tbody></table>

## Painting events {: #painting_events }

This section lists events that belong to Painting category and their properties.

<table><thead><tr><th>Event</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Composite Layers</td><td style="text-align: left">Chrome's rendering engine composited image layers.</td></tr><tr><td>Image Decode</td><td style="text-align: left">An image resource was decoded.</td></tr><tr><td>Image Resize</td><td style="text-align: left">An image was resized from its native dimensions.</td></tr><tr><td>Paint</td><td style="text-align: left">Composited layers were painted to a region of the display. Hovering over a Paint record highlights the region of the display that was updated.</td></tr></tbody></table>

### Painting event properties {: #painting_event_properties }

<table><thead><tr><th>Property</th><th style="text-align: left">Description</th></tr></thead><tbody><tr><td>Location</td><td style="text-align: left">For Paint events, the x and y coordinates of the paint rectangle.</td></tr><tr><td>Dimensions</td><td style="text-align: left">For Paint events, the height and width of the painted region.</td></tr></tbody></table>

[1]: /docs/devtools/evaluate-performance/timeline-tool#view-nested-events
[2]: /docs/devtools/evaluate-performance/timeline-tool#view-nested-events
[3]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
[4]: https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval
[5]: https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout
[6]: /docs/devtools/console/reference#consoletimelabel
[7]: /docs/devtools/console/reference#consoletimeendlabel

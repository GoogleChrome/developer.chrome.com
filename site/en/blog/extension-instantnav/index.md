---
layout: 'layouts/blog-post.njk'
title: "Chrome Extensions: Extending API to support Instant Navigation"
description: >
    The Extensions API has been updated to support back/forward cache, preloading navigations.
authors:
  - dtapuska
hero: 'image/zKrSUSkPboWMTTSEkowJbqw5Egi2/r5IdmaTdE5wBS2d6CCQY.png'
alt: >
  Instant navigation in a tab.
date: 2022-11-30
tags:
 - extensions-news
---

TL;DR: The Extensions API has been updated to support back/forward cache,
preloading navigations. See below for details.

Chrome has been working hard at making navigation fast. Instant Navigation
technologies such as [Back/Forward Cache](https://web.dev/bfcache/)
([shipped](https://chromestatus.com/feature/6279906713403392) on desktop in
Chrome 96) and [Speculation Rules](/blog/prerender-pages/)
([shipped](https://chromestatus.com/feature/5740655424831488) in Chrome 103) improve both the going back and going forward
experience. In this post we will explore the updates we’ve made to browser
extensions APIs to accommodate these new workflows.

## Understanding the types of pages

Prior to the introduction of Back/Forward Cache and prerendering, an individual
tab only had one active page. This was always the one that was visible. If a
user returns to the previous page, the active page would be destroyed (Page B)
and the previous page in history would be completely reconstructed (Page A).
Extensions did not need to worry about what part of the life cycle pages were
in because there was only one for a tab, the active/visible state.

<figure>
  {% Img src="image/zKrSUSkPboWMTTSEkowJbqw5Egi2/VR5hJLKud7lNIou8baHx.png", alt="Eviction of the active page", width="350", height="209" %}
  <figcaption>Eviction of the active page.</figcatpion>
</figure>

With Back/Forward Cache and prerendering, there is no longer a one to one
relationship between tabs and pages. Now, each tab actually stores multiple
pages and pages transition between states rather than being destroyed and
reconstructed.

For example, a page could begin its life as a prerendered (not visible) page,
transition into an active (visible) page when the user clicks a link, and then
be stored in the Back/Forward Cache (not visible) when the user navigates to
another page, all without the page ever being destroyed. Later in this article
we will look at the new properties exposed to help extensions understand what
state pages are in.

<figure>
  {% Img src="image/zKrSUSkPboWMTTSEkowJbqw5Egi2/0DT7Tzx0vQhNZgegsoEj.png", alt="Types of pages", width="531", height="209" %}
  <figcaption>Types of pages.</figcaption>
</figure>

Note that a tab can have a series of prerendered pages (not just one), a single
*active* (visible) page, and a series of Back/Forward cached pages.

## What’s changing for extension developers?
### FrameId == 0
In Chromium, we refer to the topmost/main frame as the outermost frame.

Extension authors that assume the [*frameId*](/docs/extensions/reference/webNavigation/#a-note-about-frame-ids:~:text=onErrorOccurred%20event%20fired.-,frameId,-number)
of the outermost frame is 0 (a previous best practice) may have problems.
Since a tab can now have multiple outermost frames (prerendered and cached
pages), the assumption that there is a single outermost
frame for a tab is incorrect. `frameId == 0` will still continue to represent
the outermost frame of the **active** page, but the outermost frames of
**other** pages in the same tab will be non-zero. A new field **frameType** has
been added to fix this problem. See the [“How do I determine if a frame is the outermost frame?”](#outermost-frame)
section of this post.

### Life cycle of frames versus documents

Another concept that is problematic with extensions is the life cycle of the
frame. A frame hosts a document (which is associated with a committed URL).
The document can change (say by navigating) but the *frameId* won’t, and so it
is difficult to associate that something happened in a specific document with
just *frameIds*. We are introducing a concept of a [documentId](/docs/extensions/reference/webNavigation/#method-getFrame:~:text=retrieve%20information%20about.-,documentId,-string%C2%A0optional)
which is a unique identifier for each document. If a frame is navigated and
opens a new document the identifier will change. This field is useful for
determining when pages change their life cycle state (between
prerender/active/cached) because it remains the same.

### Web navigation events

Events in the [`chrome.webNavigation` namespace](/docs/extensions/reference/webNavigation/)
can fire multiple times on the
same page depending on the life cycle it is in. See
[“How do I tell what life cycle the page is in?”](#lifecyle)
and [“How do I determine when a page transitions?”](#transitions) sections.

## How do I tell what life cycle the page is in? {: #lifecyle}

The [`DocumentLifecycle`](/docs/extensions/reference/extensionTypes/#type-DocumentLifecycle)
type has been added to a number of extensions APIs where the `frameId` was
previously available. If the `DocumentLifecycle` type is present on an event
(such as [`onCommitted`](/docs/extensions/reference/webNavigation/#event-onCommitted)),
its value is the state in which the event was generated. You can always query
information from the `WebNavigation` [`getFrame()`](/docs/extensions/reference/webNavigation/#method-getFrame)
and [`getAllFrames()`](/docs/extensions/reference/webNavigation/#method-getAllFrames)
methods, but using the value from the event is always preferred. If you do use
either method be aware the state of the frame may change between when the event
was generated and when the promises return by both methods is resolved.

The [`DocumentLifecycle`](/docs/extensions/reference/extensionTypes/#type-DocumentLifecycle)
has the following values:

- `"prerender`" : Not currently presented to the user but preparing to possibly be displayed to the user.
- `"active"`: Presently displayed to the user.
- `"cached"`: Stored in the Back/Forward Cache.
- `"pending_deletion"`:  The document is being destroyed.

## How do I determine if a frame is the outermost frame? {: #outermost-frame}

Previously extensions may have checked whether `frameId == 0` to determine
if the event occurring is for the outermost frame or not. With multiple pages
in a tab we now have multiple outermost frames, so the definition of *frameId*
is problematic. You will never receive events about a Back/Forward cached
frame. However, for prerendered frames the `frameId` will be
non-zero for the outermost frame. So using `frameId == 0` as a signal for
determining if it is the outermost frame is incorrect.

To help with this, we introduced a new type called 
[`FrameType`](/docs/extensions/reference/extensionTypes/#type-FrameType)
so determining if the frame is indeed the outermost frame is now easy.
`FrameType` has the following values:

- `"outermost_frame"`: Typically referred to as the topmost frame. Note that
there are multiples of these. For example, if you have a prerendered and cached
pages, each has an outermost frame that could be called its topmost frame.
- `"fenced_frame"`: Reserved for future use.
- `"sub_frame"`: Typically an iframe.


We can combine `DocumentLifecycle` with `FrameType` and determine if a frame is
the active outermost frame. For example:
```js
tab.documentLifecycle == “active” && frameType == “outermost_frame”
```

## How do I solve time of use problems with frames?

As we said above a frame hosts a document and the frame may navigate to a new
document, but the `frameId` will not change. This creates problems when you
receive an event with just a `frameId`. If you [look up the URL](/docs/extensions/reference/webNavigation/#method-getFrame)
of the frame it might be different than when the event occured, this is called
a time of use issue.

To address this, we introduced [`documentId`](/docs/extensions/reference/webNavigation/#method-getFrame:~:text=retrieve%20information%20about.-,documentId,-string%C2%A0optional)
(and [`parentDocumentId`](/docs/extensions/reference/webNavigation/#method-getFrame:~:text=parentDocumentId)).
The [webNavigation.getFrame()](/docs/extensions/reference/webNavigation/#method-getFrame)
method now makes the `frameId` optional if a `documentId` is provided. The
`documentId` will change whenever a frame is navigated.

## How do I determine when a page transitions? {: #transitions}

There are explicit signals to determine when a page transitions between states.

Let’s look at the [`WebNavigation` events](/docs/extensions/reference/webNavigation/#event).

For a very first navigation of any page you will see four events in the order
listed below. Note that these four events could occur with the
`DocumentLifecycle` state being either `"prerender"` or `"active"`.

```js
onBeforeNavigate
onCommitted
onDOMContentLoaded
onCompleted
```

This is illustrated in the diagram below which shows the `documentId` changing
to `"xyz"` when the prerendered page becomes the active page.

<figure>
  {% Img src="image/zKrSUSkPboWMTTSEkowJbqw5Egi2/p0ulwify9TGLuLh6RJpW.png", alt="The documentId changes when the prerendered page becomes the active page", width="350", height="463" %}
  <figcaption>The <code>documentId</code> changes when the prerendered page becomes the
  active page.</figcaption>
</figure>

When a page transitions from either Back/Forward Cache or prerender to the
active state there will be three more events (but with `DocumentLifecyle`
being `"active"`).

```js
onBeforeNavigate
onCommitted
onCompleted
```

The `documentId` will remain the same as in the original events. This is
illustrated above when `documentId` == xyz activates. Note that the
same navigation events fire, except for the `onDOMContentLoaded`
event because the page has already been loaded.

If you have any comments or questions please feel free to ask on the
[chromium-extensions](https://groups.google.com/u/1/a/chromium.org/g/chromium-extensions)
group.

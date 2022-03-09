---
layout: 'layouts/doc-post.njk'
title: Launch Handler API
description: >
  Launch handler lets you control how your app is launched, for example, whether it uses an existing or a new window and whether the chosen window is navigated to the launch URL.
subhead: >
  Control how your app is launched.
date: 2022-03-07
---

The Launch Handler API lets you control how your app is launched, for example, whether it uses an existing or a new window and whether the chosen window is navigated to the launch URL. This also enqueues a `LaunchParams` object in the launched page's `window.launchQueue`, similar to the File Handling API.

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

## Interfaces

The Launch Handler API defines two new interfaces. 

`launchParams`
: An object containing the targetURL to be handled by the consumer. 
`launchQueue`
: Queues launches until they are handled by the specified consumer. 


## The `launch_handler` manifest member

To declaratively specify the launch behavior of your app, add the `launch_handler` manifest member
to your manifest. It has two sub-fields, `route_to` and `navigate_existing_client`. The former lets
you control whether a new or an existing client should be launched, and the latter how and if this
client should be navigated. The Web App Manifest excerpt below shows a file with
exemplary values that would always route all launches to a new client.

```json
{
  "launch_handler": {
    "route_to": "new-client",
    "navigate_existing_client": "always"
  }
}
```

If unspecified, `launch_handler` defaults to
`{"route_to": "auto", "navigate_existing_client": "always"}`. The allowed values for the sub-fields
are as follows:

- `route_to`:
  - `new-client`: A new browsing context is created in a web app window to load the launch's target
    URL.
  - `existing-client`: An existing browsing context is used, specifically the one most recently used. How the launch is handled within that
    browsing context depends on `navigate_existing_client`.
  - `auto`: The behavior is up to the user agent to decide what works best for the platform. For
    example, mobile devices only support single clients and would use `existing-client`, while
    desktop devices support multiple windows and would use `new-client` to avoid data loss.

- `navigate_existing_client`:
  - `always`: Existing browsing contexts chosen for launch will navigate the browsing context to the
    launch's target URL.
  - `never`: Existing browsing contexts chosen for launch will not be navigated and instead have
    `targetURL` in the enqueued `LaunchParams` set to the launch's target URL.

{% Aside 'warning' %}
Setting `navigate_existing_client` to `always` can cause data loss. Only use this
when it is safe to do so (for example, in a music player), or make sure the user's data gets
saved before navigating away from the previous location.
{% endAside%}

Both `route_to` and `navigate_existing_client` also accept a list (array) of values, where the first
valid value will be used. This is to allow new values to be added to the spec without breaking
backwards compatibility with existing implementations.

For example, if the hypothetical value `"matching-url-client"` were added, sites would specify
`"route_to": ["matching-url-client", "existing-client"]` to continue to control the behavior of
older browsers that did not support `"matching-url-client"`.

## Examples

### Is the Launch Handler API supported?

```js
if ('launchQueue' in window && 'targetURL' in LaunchParams.prototype) {
  // The Launch Handler API is supported.
}
```

### Using window.launchQueue

In the following code, the function `extractSongID()` is used to extract a `songID` from the URL passed on launch. This is then used to play a song in a music player PWA.

```js
launchQueue.setConsumer((launchParams) => {
  const songID = extractSongId(launchParams.targetURL);
  if (songID) {
    playSong(songID);
  }
});
```

## Feedback {: #feedback }

The Chromium team wants to hear about your experiences with the Launch Handler API.

### Tell us about the API design

Is there something about the API that does not work like you expected? Or are there missing methods
or properties that you need to implement your idea? Have a question or comment on the security
model? File a spec issue on the corresponding [GitHub repo][issues], or add your thoughts to an
existing issue.

### Report a problem with the implementation

Did you find a bug with Chromium's implementation? Or is the implementation different from the spec?
File a bug at [new.crbug.com](https://new.crbug.com). Be sure to include as much detail as you can,
simple instructions for reproducing, and enter `Blink>AppManifest` in the **Components** box.
[Glitch](https://glitch.com/) works great for sharing quick and easy repros.

### Show support for the API

Are you planning to use the Launch Handler API? Your public support helps the Chromium team
prioritize features and shows other browser vendors how critical it is to support them.

Send a tweet to [@ChromiumDev][cr-dev-twitter] using the hashtag
[`#LaunchHandler`](https://twitter.com/search?q=%23LaunchHandler&src=recent_search_click&f=live) and
let us know where and how you are using it.

## Helpful links {: #helpful }

- [Public explainer][explainer]
- [Launch Handler API Demo][demo] | [Launch Handler API Demo source][demo-source]
- [Chromium tracking bug][cr-bug]
- [ChromeStatus.com entry][cr-status]
- Blink Component: [`Blink>AppManifest`][blink-component]
- [TAG Review](https://github.com/w3ctag/design-reviews/issues/683)
- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/8tNe2jrJ78A)



[issues]: https://github.com/WICG/sw-launch/issues
[demo]: https://launch-handler.glitch.me/
[demo-source]: https://glitch.com/edit/#!/launch-handler
[explainer]: https://github.com/WICG/sw-launch/blob/main/launch_handler.md
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1231886
[cr-status]: https://www.chromestatus.com/feature/5722383233056768
[blink-component]: https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EAppManifest
[cr-dev-twitter]: https://twitter.com/ChromiumDev
[powerful-apis]: https://chromium.googlesource.com/chromium/src/+/lkgr/docs/security/permissions-for-powerful-web-platform-features.md
[ot]: https://developer.chrome.com/origintrials/#/view_trial/2978005253598740481
---
layout: 'layouts/doc-post.njk'
title: Launch Handler API
description: >
  Launch handler lets you control how your app is launched, for example, whether it uses an existing
  or a new window and whether the chosen window is navigated to the launch URL.
subhead: >
  Control how your app is launched.
date: 2021-12-14
updated: 2023-03-17
authors:
  - thomassteiner
---

The Launch Handler API lets you control how your app is launched, for example, whether it uses an
existing or a new window and whether the chosen window is navigated to the launch URL. As with
the File Handing API, this also enqueues a `LaunchParams` object in the launched page's `window.launchQueue`.

## Current status

<div class="table-wrapper scrollbar">

| Step                                     | Status                   |
| ---------------------------------------- | ------------------------ |
| 1. Create explainer                      | [Complete][explainer]    |
| 2. Create initial draft of specification | [Complete][spec]         |
| 3. Gather feedback & iterate on design   | Complete                 |
| 4. Origin trial.                         | Complete                 |
| 5. **Launch**                            | **Complete**             |

</div>

## Using the Launch Handler API

### Browser support

Launch Handler is only available on ChromeOS.

{% BrowserCompat 'html.manifest.launch_handler' %}

### Interfaces

The Launch Handler API defines two new interfaces.

`LaunchParams` : An object containing the `targetURL` to be handled by the consumer.
`LaunchQueue` : Queues launches until they are handled by the specified consumer.

#### The `launch_handler` manifest member

To declaratively specify the launch behavior of your app, add the `launch_handler` manifest member
to your manifest. It has one sub-field called `client_mode`. It lets you control whether a new or an
existing client should be launched and if this client should be navigated. The example
below shows a file with exemplary values that would always route all launches to a new
client.

```json
{
  "launch_handler": {
    "client_mode": "navigate-new"
  }
}
```

If unspecified, `launch_handler` defaults to `{"client_mode": "auto"}`. The allowed values for the
sub-fields are:

- `client_mode`:
  - `navigate-new`: A new browsing context is created in a web app window to load the launch's target
    URL.
  - `navigate-existing`: The most recently interacted with browsing context in a web app
    window is navigated to the launch's target URL.
  - `focus-existing`: The most recently interacted with browsing context in a web app window
    is chosen to handle the launch. A new `LaunchParams` object with its `targetURL` set to the
    launch URL will be enqueued in the document's `window.launchQueue`.
  - `auto`: The behavior is up to the user agent to decide what works best for the platform. For
    example, mobile devices only support single clients and would use `existing-client`, while
    desktop devices support multiple windows and would use `navigate-new` to avoid data loss.

The `client_mode` property also accepts a list (array) of values, where the first valid value will be
used. This is to allow new values to be added to the spec without breaking backwards compatibility
with existing implementations.

For example, if the hypothetical value `"focus-matching-url"` were added, sites would specify
`"client_mode": ["focus-matching-url", "navigate-existing"]` to continue to control the
behavior of older browsers that did not support `"focus-matching-url"`.

#### Using window.launchQueue

In the following code, the function `extractSongID()` extracts a `songID` from the URL
passed on launch. This is used to play a song in a music player PWA.

```js
if ('launchQueue' in window) {
  launchQueue.setConsumer((launchParams) => {
    if (launchParams.targetURL) {
      const songID = extractSongId(launchParams.targetURL);
      if (songID) {
        playSong(songID);
      }
    }
  });
}
```

## Demo

You can see a demo of the Launch Handler API in action in the
[PWA Launch Handler Demo](https://launch-handler.glitch.me/). Be sure to check out the
[source code](https://glitch.com/edit/#!/launch-handler) of the application to see how it uses the
Launch Handler API.

1. Install the _Musicr 2.0_ app on a ChromeOS device.
1. Send yourself a link in a chat application of the form
   `https://launch-handler.glitch.me?track=https://example.com/music.mp3`. (You can customize
   `https://example.com/music.mp3` for any URL pointing to an audio file, for example,
   `https://launch-handler.glitch.me?track=https://cdn.glitch.me/3e952c9c-4d6d-4de4-9873-23cf976b422e%2Ffile_example_MP3_700KB.mp3?v=1638795977190`).
1. Click the link in your chat app and notice how _Musicr 2.0_ opens and plays the track.
1. Click the link in your chat app again and notice that you will not get a second instance of
   _Musicr 2.0_.

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
- [Draft spec][spec]
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
[spec]: https://wicg.github.io/web-app-launch/
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1231886
[cr-status]: https://www.chromestatus.com/feature/5722383233056768
[blink-component]: https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EAppManifest
[cr-dev-twitter]: https://twitter.com/ChromiumDev
[powerful-apis]:
  https://chromium.googlesource.com/chromium/src/+/lkgr/docs/security/permissions-for-powerful-web-platform-features.md

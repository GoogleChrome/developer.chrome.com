---
layout: 'layouts/doc-post.njk'
title: 'Picture-in-Picture for any Element, not just <video>'
description: >
 Display arbitrary HTML content in an always-on-top window.
authors:
  - beaufortfrancois
date: 2023-02-02
updated: 2023-07-07
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/l8xW8V85N60e4dmwUwmE.jpg
alt: Person holding outdoor lounge chairs.
tags:
  - chrome-111
---

The [Document Picture-in-Picture API][spec] makes it possible to open an always-on-top window that can be populated with arbitrary HTML content. It extends the existing [Picture-in-Picture API for `<video>`] that only allows an HTML `<video>` element to be put into a Picture-in-Picture window.

The Picture-in-Picture window in the Document Picture-in-Picture API is similar to a blank same-origin window opened via [`window.open()`], with some differences:
- The Picture-in-Picture window floats on top of other windows.
- The Picture-in-Picture window never outlives the opening window.
- The Picture-in-Picture window cannot be navigated.
- The Picture-in-Picture window position cannot be set by the website.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/Eaaypsy6NZ9UljxtJ2fV.png", alt="A Picture-in-Picture window playing Sintel trailer video.", width="800", height="499" %}
  <figcaption>A Picture-in-Picture window created with the Document Picture-in-Picture API (<a href="https://document-picture-in-picture-api.glitch.me/">demo</a>).</figcaption>
</figure>

## Current status

<div class="table-wrapper scrollbar">

| Step                                     | Status                   |
| ---------------------------------------- | ------------------------ |
| 1. Create explainer                      | [Complete][explainer]    |
| 2. Create initial draft of specification | [In progress][spec]      |
| 3. Gather feedback & iterate on design   | [In progress](#feedback) |
| 4. **Origin trial**                      | [**Started**][ot]        |
| 5. Launch                                | Not started              |

</div>

## Try out the API on desktop

During the trial phase you can test the API on desktop by one of two methods.

### Local testing

To experiment with the Document Picture-in-Picture API locally, without an origin trial token, enable the `chrome://flags/#document-picture-in-picture-api` flag.

### Register for the origin trial

Starting in Chrome 111, the Document Picture-in-Picture API is available as an [origin trial](/docs/web-platform/origin-trials/). It is expected to end in Chrome 115 (September&nbsp;8, 2023). [Register here][ot].

## Use cases

### Custom video player

A website can provide a Picture-in-Picture video experience with the existing [Picture-in-Picture API for `<video>`], however it is very limited. The existing Picture-in-Picture window accepts few inputs, and has limited ability for styling them. With a full Document in Picture-in-Picture, the website can provide custom controls and inputs (for example, [captions], playlists, time scrubber, liking and disliking videos) to improve the user's Picture-in-Picture video experience.

### Video conferencing

It is common for users to leave the browser tab during a video conferencing session for various reasons (for example, presenting another tab to the call or multitasking) while still wishing to see the call, so it's a prime use case for Picture-in-Picture. Once again, the current experience a video conferencing website can provide via the [Picture-in-Picture API for `<video>`] is limited in style and input. With a full Document in Picture-in-Picture, the website can easily combine multiple video streams into a single PiP window without having to rely on [canvas hacks] and provide custom controls such as sending a message, muting another user, or raising a hand.

### Productivity
 
Research has shown that users need more ways to be productive on the web. Document in Picture-in-Picture gives web apps the flexibility to accomplish more. Whether it's text editing, note-taking, task lists, messaging and chat, or design and development tools, web apps can now keep their content always accessible.

## Interface

### Properties

`documentPictureInPicture.window`
: Returns the current Picture-in-Picture window if any. Otherwise, returns `null`.

### Methods

`documentPictureInPicture.requestWindow(options)`
: Returns a promise that resolves when a Picture-in-Picture window is opened.
  The promise rejects if it's called without a user gesture.
  The `options` dictionary contains the optional following members:

  `width`
  : Sets the initial width of the Picture-in-Picture window.

  `height`
  : Sets the initial height of the Picture-in-Picture window.

### Events

`documentPictureInPicture.onenter`
: Fired on `documentPictureInPicture` when a Picture-in-Picture window is opened.

## Examples

The following HTML sets up a custom video player and a button element to open the video player in a Picture-in-Picture window.

```html
<div id="playerContainer">
  <div id="player">
    <video id="video"></video>
  </div>
</div>
<button id="pipButton">Open Picture-in-Picture window</button>
```

### Open a Picture-in-Picture window

The following JavaScript calls `documentPictureInPicture.requestWindow()` when the user clicks the button to open a blank Picture-in-Picture window. The returned promise resolves with a Picture-in-Picture window JavaScript object. The video player is moved to that window using [`append()`].

```js
pipButton.addEventListener('click', async () => {
  const player = document.querySelector("#player");

  // Open a Picture-in-Picture window.
  const pipWindow = await documentPictureInPicture.requestWindow();

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(player);
});
```

### Set the size of the Picture-in-Picture window

To set the size of the Picture-in-Picture window, set the `width` and `height` options of `documentPictureInPicture.requestWindow()` to the desired Picture-in-Picture window size. Chrome may clamp the option values if they are too large or too small to fit a user-friendly window size.

```js
pipButton.addEventListener("click", async () => {
  const player = document.querySelector("#player");

  // Open a Picture-in-Picture window whose size is
  // the same as the player's.
  const pipWindow = await documentPictureInPicture.requestWindow({
    width: player.clientWidth,
    height: player.clientHeight,
  });

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(player);
});
```

### Copy style sheets to the Picture-in-Picture window

To copy all CSS style sheets from the originating window, loop through [`styleSheets`](https://developer.mozilla.org/docs/Web/API/Document/styleSheets) explicitly linked into or embedded in the document and append them to the Picture-in-Picture window. Note that this is a one-time copy.

```js
pipButton.addEventListener("click", async () => {
  const player = document.querySelector("#player");

  // Open a Picture-in-Picture window.
  const pipWindow = await documentPictureInPicture.requestWindow();

  // Copy style sheets over from the initial document
  // so that the player looks the same.
  [...document.styleSheets].forEach((styleSheet) => {
    try {
      const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
      const style = document.createElement('style');

      style.textContent = cssRules;
      pipWindow.document.head.appendChild(style);
    } catch (e) {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.type = styleSheet.type;
      link.media = styleSheet.media;
      link.href = styleSheet.href;
      pipWindow.document.head.appendChild(link);
    }
  });

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(player);
});
```

{% Aside %}
The `copyStyleSheets` option was supported in a previous version of the specification. It is [not the case anymore](https://github.com/WICG/document-picture-in-picture/pull/79).
{% endAside %}

### Handle when the Picture-in-Picture window closes

Listen to the window `"pagehide"` event to know when the Picture-in-Picture window gets closed (either because the website initiated it or the user manually closed it). The event handler is a good place to get the elements back out of the Picture-in-Picture window as shown below.

```js
pipButton.addEventListener("click", async () => {
  const player = document.querySelector("#player");

  // Open a Picture-in-Picture window.
  const pipWindow = await documentPictureInPicture.requestWindow();

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(player);

  // Move the player back when the Picture-in-Picture window closes.
  pipWindow.addEventListener("pagehide", (event) => {
    const playerContainer = document.querySelector("#playerContainer");
    const pipPlayer = event.target.querySelector("#player");
    playerContainer.append(pipPlayer);
  });
});
```

Close the Picture-in-Picture window programmatically by using the [`close()`] method.

```js
// Close the Picture-in-Picture window programmatically. 
// The "pagehide" event will fire normally.
pipWindow.close();
```

### Listen to when the website enters Picture-in-Picture

Listen to the `"enter"` event on `documentPictureInPicture` to know when a Picture-in-Picture window is opened. The event contains a `window` object to access the Picture-in-Picture window.

```js
documentPictureInPicture.addEventListener("enter", (event) => {
  const pipWindow = event.window;
});
```

### Access elements in the Picture-in-Picture window

Access elements in the Picture-in-Picture window either from the object returned by `documentPictureInPicture.requestWindow()`, or with `documentPictureInPicture.window` as shown below.

```js
const pipWindow = documentPictureInPicture.window;
if (pipWindow) {
  // Mute video playing in the Picture-in-Picture window.
  const pipVideo = pipWindow.document.querySelector("#video");
  pipVideo.muted = true;
}
```

### Handle events from the Picture-in-Picture window

Create buttons and controls and respond to user's input events such as `"click"` as you would do normally in JavaScript.

```js
// Add a "mute" button to the Picture-in-Picture window.
const pipMuteButton = pipWindow.document.createElement("button");
pipMuteButton.textContent = "Mute";
pipMuteButton.addEventListener("click", () => { 
  const pipVideo = pipWindow.document.querySelector("#video");
  pipVideo.muted = true;
});
pipWindow.document.body.append(pipMuteButton);
```

## Feature detection

To check if the Document Picture-in-Picture API is supported, use:

```js
if ('documentPictureInPicture' in window) {
  // The Document Picture-in-Picture API is supported.
}
```

## Demos

### VideoJS player

You can play with the Document Picture-in-Picture API [VideoJS player demo]. Be sure to check out the [source code][demo-source].

{% Glitch {
  id: 'document-picture-in-picture-api',
  path: 'script.js',
  previewSize: 0,
  allow: []
} %}

### Pomodoro

[Tomodoro], a pomodoro web app, is also taking advantage of the Document Picture-in-Picture API when available (see [GitHub pull request]).

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/01rnT7Ev3CyWHLykbmWd.png", alt="Screenshot of Tomodoro, a pomodoro web app.", width="800", height="543" %}
  <figcaption>A Picture-in-Picture window in Tomodoro.</figcaption>
</figure>

## Feedback

Developer feedback is really important at this stage, so please [file issues on GitHub][issues] with suggestions and questions.

## Useful links

- [Public explainer][explainer]
- [WICG specification][spec]
- [Chromium tracking bug][cr-bug]
- [ChromeStatus.com entry][cr-status]
- Blink Component: [`Blink>Media>PictureInPicture`][blink-component]
- [TAG Review][tag]
- [Intent to Experiment][intent]

## Acknowledgements

Hero image by [Jakob Owens].

[spec]: https://wicg.github.io/document-picture-in-picture/
[picture-in-picture api for `<video>`]: /blog/watch-video-using-picture-in-picture/
[`window.open()`]: https://developer.mozilla.org/docs/Web/API/Window/open
[explainer]: https://github.com/WICG/document-picture-in-picture/blob/main/README.md
[ot]: /origintrials/#/view_trial/1885882343961395201
[captions]: https://bugs.chromium.org/p/chromium/issues/detail?id=854935
[canvas hacks]: /blog/watch-video-using-picture-in-picture/#show-canvas-element-in-picture-in-picture-window
[`append()`]: https://developer.mozilla.org/docs/Web/API/Element/append
[`close()`]: https://developer.mozilla.org/docs/Web/API/Window/close
[tomodoro]: https://lazy-guy.github.io/tomodoro/index.html
[github pull request]: https://github.com/lazy-guy/tomodoro/pull/2
[issues]: https://github.com/WICG/document-picture-in-picture/issues
[videojs player demo]: https://document-picture-in-picture-api.glitch.me/
[demo-source]: https://glitch.com/edit/#!/document-picture-in-picture-api?path=script.js
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1315352
[cr-status]: https://chromestatus.com/feature/5755179560337408
[blink-component]: https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EMedia%3EPictureInPicture
[tag]: https://github.com/w3ctag/design-reviews/issues/798
[intent]: https://groups.google.com/a/chromium.org/g/blink-dev/c/Tz1gUh92dXs
[jakob owens]: https://unsplash.com/photos/TqnpKA_elIU

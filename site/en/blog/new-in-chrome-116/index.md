---
title: New in Chrome 116
description: >
  Chrome 116 is rolling out now! Use the document picture in picture API to increase user productivity, it is now easier to debug missing stylesheets in DevTools, and there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-08-15
updated: 2023-08-17
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/D40mYqd8kvfXSy2IxbVv.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-116
---

{% YouTube id='JHwWUsMKYdk' %}

Here's what you need to know:

* Use the [Document Picture in Picture API](#document-picture-in-picture) to increase user productivity.
* It is now easier to [debug missing stylesheets](#missing-stylesheets-debug) in DevTools
* And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 116.

## Document Picture-in-Picture API. {: #document-picture-in-picture}

The Document Picture-in-Picture API makes it possible to open an always-on-top window that can be populated with arbitrary HTML content.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/Eaaypsy6NZ9UljxtJ2fV.png", alt="A Picture-in-Picture window playing Sintel trailer video.", width="800", height="499" %}
  <figcaption>A Picture-in-Picture window created with the Document Picture-in-Picture API (<a href="https://document-picture-in-picture-api.glitch.me/">demo</a>).</figcaption>
</figure>

The Picture-in-Picture window in the Document Picture-in-Picture API is similar to a blank same-origin window opened using `window.open()`, with some differences:

* The Picture-in-Picture window floats on top of other windows.
* The Picture-in-Picture window never outlives the opening window.
* The Picture-in-Picture window cannot be navigated.
* The Picture-in-Picture window position cannot be set by the website.

The following HTML sets up a custom video player and a button element to open the video player in a Picture-in-Picture window.

```html
<div id="playerContainer">
  <div id="player">
    <video id="video"></video>
  </div>
</div>
<button id="pipButton">Open Picture-in-Picture window</button>
```
The following JavaScript calls `documentPictureInPicture.requestWindow()` when the user clicks the button to open a blank Picture-in-Picture window. The returned promise resolves with a Picture-in-Picture window JavaScript object. The video player is moved to that window using `append()`.

```js
pipButton.addEventListener('click', async () => {
  const player = document.querySelector("#player");

  // Open a Picture-in-Picture window.
  const pipWindow = await documentPictureInPicture.requestWindow();

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(player);
});
```

Check out [Picture-in-picture for any element](/docs/web-platform/document-picture-in-picture/)  for more details and examples.

## DevTools missing stylesheets debugging improvements. {: #missing-stylesheets-debug }

DevTools got a number of improvements to identify and debug issues with missing stylesheets.

First: the **Sources > Page** tree now shows only the successfully deployed and loaded stylesheets to minimize confusion.

Also the **Sources > Editor** now underlines and shows inline error tooltips next to failed, `@import`,`url()`, and `href` statements.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uv386cOgFWeWnf6ItxOS.png", alt="Underlined statements with tooltips in the Sources panel.", width="800", height="446" %}

- The **Console**, in addition to links to failed requests, now provides links to the exact line that references a stylesheet that failed to load.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/acQGKJmqR7JtA4e9UaIq.png", alt="The Console provides links to the exact lines with problematic statements.", width="800", height="574" %}

The **Network panel** consistently populates the **Initiator** column with links to the exact line that references a stylesheet that failed to load.

The **Issues panel** lists all stylesheets loading issues, including broken URLs, failed requests, and misplaced `@import` statements.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JlcKWWo8z99LqXiHFk53.png", alt="The Issues panel with links to to sources and requests.", width="800", height="668" %}

Check out [what’s new in DevTools](/blog/new-in-devtools-116/) for all the details and more information on DevTools in Chrome 116.

## And more! {: #more }

Of course there’s plenty more.

* [Motion path](https://developer.mozilla.org/docs/Web/CSS/CSS_motion_path) allows authors to position any graphical object and animate it along a path specified by the developer.
* The `display` and `content-visibility` properties are now supported in keyframe animations, which allows exit animations to be added purely in CSS.
* The fetch API can now be used with [Bring Your Own Buffer readers](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader), reducing garbage collection overhead and copies, and improving responsiveness for users.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 116.

* [What's new in Chrome DevTools (116)](/blog/new-in-devtools-116/)
* [Chrome 116 deprecations and removals](/blog/deps-rems-116/)
* [ChromeStatus.com updates for Chrome 116](https://chromestatus.com/features#milestone%3D116)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/115.0.5790.181..116.0.5845.87)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

Yo soy Adriana Jara, and as soon as Chrome 117 is released, I'll be right here to
tell you what's new in Chrome!

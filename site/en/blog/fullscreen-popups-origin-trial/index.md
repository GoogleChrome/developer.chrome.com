---
title: 'New origin trial for fullscreen popup windows'
description: >
  There's now a new origin trial available for opening popup windows in fullscreen mode with just one step.
authors:
  - thomassteiner
layout: 'layouts/blog-post.njk'
date: 2023-09-25
tags:
  - capabilities
---

Imagine you want to open a popup window in fullscreen mode. Until now, opening a
fullscreen popup window consisted of two steps:

1. From the main app window, calling the
    [`window.open()`](https://developer.mozilla.org/docs/Web/API/Window/open)
    method that requires a user gesture like the click on an **Open popup
    window** button.
1. From the popup window, calling the
    [`Element.requestFullscreen()`](https://developer.mozilla.org/es/docs/Web/API/Element/requestFullscreen)
    method, which likewise requires a user gesture like the click on an **Enter
    fullscreen mode** button.

There's now a new
[origin trial](/docs/web-platform/origin-trials/)
available running from Chrome 119 (stable date): {% ChromeDate 119 %} to Chrome
122 (stable date): {% ChromeDate 122 %} for opening popup windows in fullscreen
mode with just one step. Apart from the origin trial, you can also test locally
by setting the `chrome://flags/#fullscreen-popup-windows` flag to **Enabled**.

## Opening fullscreen popup windows on the current screen

This new feature is gated behind the
[`window-management`](/articles/window-management/#the-window-management-permission)
permission. Once the user has granted the permission, you can open a fullscreen
popup window as in the following example.

```js
document.querySelector('.fullscreen-popoup-button').addEventListener('click', (e) => {
  if ((await navigator.permissions.query({name: 'window-management'})).state !== 'granted') {
    // Permission not granted. Call `window.getScreenDetails()` to prompt.
    return await window.getScreenDetails();
  }
  // Permission granted. Open the fullscreen popup window.
  window.open('https://example.com/popup.html', '_blank', 'popup,fullscreen');
});
```

In the last line of the code sample, the first parameter is the
[`url`](https://developer.mozilla.org/docs/Web/API/Window/open#url) to
open in the popup window. The second parameter is the
[`target`](https://developer.mozilla.org/docs/Web/API/Window/open#target),
with the special value of
[`_blank`](https://developer.mozilla.org/docs/Web/HTML/Element/a#target).
The third parameter is for the
[`windowFeatures`](https://developer.mozilla.org/docs/Web/API/Window/open#windowfeatures),
a comma-separated string with the value
[`popup`](https://developer.mozilla.org/docs/Web/API/Window/open) for
opening a popup window and the new value `fullscreen` for opening the popup
window in fullscreen mode. This works with just one user gesture, therefore can
be activated with a single click on a button.

## Opening fullscreen popup windows on other screens

This feature really shines in combination with the
[Window Management API](/articles/window-management/)
which lets you obtain information about all the screens the user has connected
to their computer. For example, to open a fullscreen popup window on another
screen than the user's current screen, you need to first
[find the other screen](/articles/window-management/#the-getscreendetails-method)
and then pass its `availLeft`, `availTop`, `availWidth`, and `availHeight`
values to the corresponding `left`, `top`, `width`, and `height` values of the
`windowFeatures` string.

```js
document.querySelector('.fullscreen-popoup-button-other-screen').addEventListener('click', (e) => {
  const screenDetails = await window.getScreenDetails();
  ​​const otherScreen = screenDetails.screens.find(s => s !== screenDetails.currentScreen);
  window.open('https://example.com/popup.html', '_blank', `left=${otherScreen.availLeft},` +
      `top=${otherScreen.availTop},` +
      `width=${otherScreen.availWidth},` +
      `height=${otherScreen.availHeight},` +
      `fullscreen`);
});
```

{% Aside %}
​​It's not required to add `popup` in the `windowFeatures` strings here, as it's
implicitly assumed when any of `left`, `top`, `width`, or `height` is defined.
{%endAside %}

## Demo

Try fullscreen popup windows in the
[demo](https://michaelwasserman.github.io/window-placement-demo/) on Glitch and
[view the source code](https://github.com/michaelwasserman/window-placement-demo/).
Be sure to check the **fullscreen** checkbox, and, if you have the opportunity,
play with the demo with multiple screens attached to your device.

<iframe src="https://michaelwasserman.github.io/window-placement-demo/" allow="window-management"></iframe>

## Related links

- [Public explainer](https://github.com/bradtriebwasser/fullscreen-popup/blob/main/EXPLAINER.md)
- [ChromeStatus entry](https://chromestatus.com/feature/6002307972464640)
- [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1142516)
- [TAG review](https://github.com/w3ctag/design-reviews/issues/840)
- [Mozilla standards position](https://github.com/mozilla/standards-positions/issues/714)
- [WebKit standards position](https://github.com/WebKit/standards-positions/issues/101)

## Acknowledgements

This article was reviewed by [Brad
Triebwasser](https://www.linkedin.com/in/bradtriebwasser), [Hakan
Isbiliroglu](https://www.linkedin.com/in/hakan-isbiliroglu), and [Rachel
Andrew](https://rachelandrew.co.uk/).

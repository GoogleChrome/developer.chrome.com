---
layout: 'layouts/blog-post.njk'
title: Better full screen mode with the Keyboard Lock API
subhead: >
  Use the Keyboard Lock API to capture the Escape key in full screen mode.
date: 2023-06-26
# updated: 2023-06-26
hero:
alt:
authors:
  - thomassteiner
tags:
  - capabilities
---

If you've ever played a full screen web game that popped up an in-game dialog
that you instinctively canceled with the **Escape** key, you probably found
yourself kicked out of full screen mode.
This frustrating experience is caused by the fact that dialog and full screen
mode "fight" for the **Escape** key. It's an unequal battle because, by default,
full screen mode always wins. But how can you make the dialog the winner for the
**Escape** key? This is where the [Keyboard Lock
API](/articles/keyboard-lock/) comes into play.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/gU5KCZgKBp4319ZjaMR3.png", alt="Press the Escape key to exit full screen mode.", width="406", height="151" %}

## Browser support

{% BrowserCompat 'api.Keyboard.lock' %}

## Using the Keyboard Lock API

The Keyboard Lock API is available on `navigator.keyboard.` The
[`lock()`](https://developer.mozilla.org/docs/Web/API/Keyboard/lock) method of
the [`Keyboard`](https://developer.mozilla.org/docs/Web/API/Keyboard) interface
returns a promise after enabling the capture of keypresses for any or all of the
keys on the physical keyboard. This method can only capture keys that are
granted access by the underlying operating system. Luckily the **Escape** key is
one of them.

If your app has a full screen mode, use the Keyboard Lock API as a progressive
enhancement by capturing the **Escape** key when requesting full screen. Unlock
(that is, no longer capture) the keyboard when leaving full screen mode via the
[`unlock()`](https://developer.mozilla.org/docs/Web/API/Keyboard/unlock) method
of the `Keyboard` interface.

```js
// Feature detection.
const supportsKeyboardLock =
    ('keyboard' in navigator) && ('lock' in navigator.keyboard);

if (supportsKeyboardLock) {
  document.addEventListener('fullscreenchange', async () => {
    if (document.fullscreenElement) {
      // The magic happens here… 🦄
      await navigator.keyboard.lock(['Escape']);
      console.log('Keyboard locked.');
      return;
    }
    navigator.keyboard.unlock();
    console.log('Keyboard unlocked.');
  });
}
```

This means that when the user is in full screen mode, pressing **Escape**
cancels the dialog per default. If the user presses _and holds_ the **Escape**
key, they can still exit full screen mode. The best of both worlds.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/SDcK20YNPCUxgWNhbW28.png", alt="Press and hold the Escape key to exit full screen mode.", width="452", height="149" %}

## Demo

You can test both the default and the progressively enhanced variants in the
[demo](https://fullscreen-keyboard-lock.glitch.me/). The demo's [source
code](https://glitch.com/edit/#!/fullscreen-keyboard-lock) is less clean than
the snippet above, because it needs to show both behaviors.

<a href="https://fullscreen-keyboard-lock.glitch.me/">{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/Oh0pPRRNq5usfo2KboXM.png", alt="Better full screen mode demo.", width="800", height="931" %}</a>

## In practice

To use this progressive enhancement in practice, just copy the snippet above.
It's designed to work with no required changes, even with existing full screen
code. As an example see this
[PR](https://github.com/Lexxie9952/fcw.org-server/pull/204) for the game
[Freeciv](https://www.freecivweb.org/). Once the PR is merged, you can cancel
all in-game dialogs by pressing **Escape**.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/4uP2VvDWzGWyjI0QBDwI.png", alt="GitHub pull request that adds keyboard lock to the Freeciv game.", width="800", height="886" %}

## A bonus bookmarklet

Not all apps or games that support full screen mode will be open-source or
accept your patches, the following
[bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) can be added to your
bookmarks bar and clicked to enable better full screen mode.

Drag and drop the <a href="javascript:(function()%7Bconst%20supportsKeyboardLock%20%3D%20('keyboard'%20in%20navigator)%20%26%26%20('lock'%20in%20navigator.keyboard)%3B%0Aif%20(supportsKeyboardLock)%20%7B%0A%20%20document.addEventListener('fullscreenchange'%2C%20async%20()%20%3D%3E%20%7B%0A%20%20%20%20if%20(document.fullscreenElement)%20%7B%0A%20%20%20%20%20%20await%20navigator.keyboard.lock(%5B'Escape'%5D)%3B%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20return%3B%20%0A%20%20%20%20%7D%0A%20%20%20%20navigator.keyboard.unlock()%3B%0A%20%20%7D)%3B%0A%7D%7D)()%3B">Better full screen mode</a> bookmarklet to your bookmarks bar.

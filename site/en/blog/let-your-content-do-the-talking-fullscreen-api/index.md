---
layout: 'layouts/blog-post.njk'
title: Let Your Content Do the Talking - Fullscreen API
description: >
  The Fullscreen API allows web apps to programmatically tell any content on the page to enter the browser's fullscreen viewing mode, from JavaScript
authors:
  - ericbidelman
date: 2011-10-25
updated: 2019-01-21

---

Most browsers have the ability to enter a fullscreen or kiosk mode for a while now. Basically, the browser's chrome UI gets out of the way, and the content takes over. For apps installed from the Chrome Web Store, it's even been possible for users to [manually configure](https://developers.google.com/webstore/faq?csw=1#faq-app-18) an app to run fullscreen when it's opened from the New Tab Page. Manual fullscreen is good. Programmatic fullscreen is better!

The [Fullscreen API](https://fullscreen.spec.whatwg.org/) allows web apps to programmatically tell any content on the page to enter the browser's fullscreen viewing mode, from JavaScript. This means WebGL and `<canvas>` games can finally become fully immersive, videos can feel like the silver screen, and online magazines can feel like the real deal. I love the browser, but we shouldn't be constrained by it :)

If you want to skip the details, here's a [demo](http://html5-demos.appspot.com/static/fullscreen.html):


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/9AOEb5K4dSqF8fe9w1Nt.jpg", alt="Full screen demo screenshot", width="750", height="188" %}
</figure>

So how does the API work? If you wanted a `<div>`, for example, to go fullscreen, simple tell it to:


```js
div.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
div.mozRequestFullScreen();
div.msRequestFullscreen();
div.requestFullscreen(); // standard
```


Then to exit fullscreen, the `document` exposes a method for that:

```js
document.webkitExitFullscreen();
document.mozCancelFullScreen();
document.msExitFullscreen();
document.exitFullscreen();
```

{% Aside %}
The `exitFullscreen()` is the spec version. However, both FF and WebKit still expose prefixed `cancelFullScreen()`.
{% endAside %}


Content in fullscreen-mode is centered in the browsers viewport. It's left to the developer to style that content in the most appropriate way for viewing. Typically, you'll want your `<div>` to take up the entire screen real-estate. Good news is that the API includes new CSS pseudo-selectors for this:

```css
div:-webkit-full-screen {
    width: 100% !important;
}
div:-moz-full-screen {
    width: 100% !important;
}
div:-ms-fullscreen {
    width: 100% !important;
}
div:fullscreen {
    width: 100% !important;
}

/* While in fullscreen, hide any children with class 'tohide' */
:-webkit-full-screen .tohide {
    display: none;
}
:-moz-full-screen .tohide {
    display: none;
}
:-ms-fullscreen .tohide {
    display: none;
}
:fullscreen .tohide {
    display: none;
}
```

CSS pseudo-selectors make it very easy to style fullscreen content any way you want.

The Fullscreen API is [enabled](https://caniuse.com/#search=fullscreen) by default in Chrome 15, FF 14, IE 11 and Opera 12.1. For more information on the rest of the API, see [the spec](https://fullscreen.spec.whatwg.org/).

*Updated 2012-10-11*: to be inline with spec changes. Lowercased the "S" in `requestFullscreen()`  and changed `document.webkitCancelFullScreen()` to `document.webkitExitFullscreen()`. Updated browser compatibility comment.

*Updated 2014-02-11*: to include prefixes for IE, add the standard CSS syntax, and update the browser compatibility comment. Thanks [@dstorey](https://twitter.com/dstorey) and [@patrickkettner](https://twitter.com/patrickkettner).



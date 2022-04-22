---
layout: 'layouts/blog-post.njk'
title: 'Show a browser picker for date, time, color, and files'
description: >
  The web platform now ships with a canonical way to show a browser picker.
authors:
  - beaufortfrancois
date: 2022-01-28
hero: image/vvhSqZboQoZZN9wBvoXq72wzGAf1/zWT5kk3Q5RlDNqGkdgis.jpeg
alt: A photo of a monthly schedule printed on white paper
tags:
  - chrome-99
---

For a long time, you had to resort to custom widget libraries or hacks to show a
date picker. The web platform now ships with the HTMLInputElement `showPicker()` method,
a canonical way to show a browser picker not only for dates, but also time,
color, and files.

## Background {: #background }

A [frequent request] we hear from web developers is:

<blockquote>
  <p>
    How do I programmatically<br/>
    show a picker for controls like date?
  </p>
  <cite>
    Stack Overflow
  </cite>
</blockquote>

Current answers are not great; they rely on external libraries, CSS hacks, or
specific browser behaviors like simulating a user interaction with `click()`.

I'm happy to share that those days will be over soon as the web platform is
introducing a canonical way to show a browser picker for `<input>` elements with
these types: `"date"`, `"month"`, `"week"`, `"time"`, `"datetime-local"`,
`"color"`, and `"file"`. It will also work for `<input>` elements with
suggestions powered by `<datalist>` or `"autocomplete"` which we'll cover as
well in this article.

<figure class="w-figure">
{% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/uh0U2YQnUMato21MzzbR.png", alt="Screenshots of browser pickers", width="800", height="217" %}
  <figcaption class="w-figcaption">Browser date pickers in Chrome desktop, Chrome mobile, Safari desktop, Safari mobile, and Firefox desktop (July 2021).</figcaption>
</figure>

{% Aside %}
Unlike a third-party picker widget, a browser picker is familiar to the user,
has great platform-specific support, and is always maintained as part of the
browser.
{% endAside %}

## How to show a picker {: #how-to }

Calling `showPicker()` on an `<input>` element shows a browser picker to the
user. It must be called in response to a user gesture such as a touch gesture or
mouse click; otherwise it will fail with a [`NotAllowedError`][error] exception.
For security reasons, it will throw a [`SecurityError`][error] exception when
it's called in a cross-origin iframe.

A browser picker is shown when the `<input>` element is one of these types:
`"date"`, `"month"`, `"week"`, `"time"`, `"datetime-local"`, `"color"`, or
`"file"`.

The example below shows you how to open a browser date picker.

```html/9
<input type="date">
<button>Show the date picker</button>

<script>
  const button = document.querySelector("button");
  const dateInput = document.querySelector("input");

  button.addEventListener("click", () => {
    try {
      dateInput.showPicker();
      // A date picker is shown.
    } catch (error) {
      // Use external library when this fails.
    }
  });
</script>
```

A browser picker can also be prepopulated with items from `<datalist>` or
`"autocomplete"`.

The example below shows you how to open a browser picker with `<datalist>`.

```html/16
<datalist id="ice-cream-flavors">
  <option value="Chocolate"> </option>
  <option value="Coconut"> </option>
  <option value="Mint"> </option>
  <option value="Strawberry"> </option>
  <option value="Vanilla"> </option>
</datalist>
<input type="text" list="ice-cream-flavors">
<button>Show the suggestions</button>

<script>
  const button = document.querySelector("button");
  const iceCreamFlavorsInput = document.querySelector("input");

  button.addEventListener("click", () => {
    try {
      iceCreamFlavorsInput.showPicker();
      // A picker containing some ice cream flavors is shown.
    } catch (error) {
      // Use external library when this fails.
    }
  });
</script>
```

## Feature detection {: #feature-detection }

To check if `showPicker()` is supported, use:

```js
if ('showPicker' in HTMLInputElement.prototype) {
  // showPicker() is supported.
}
```

## Demo

A demo is available at [https://show-picker.glitch.me/demo.html][demo] for you
to play with all pickers supported by the browser. 

{% Video src="video/vvhSqZboQoZZN9wBvoXq72wzGAf1/MMPmrnJnMvFX3eMCUWK9.mov",
autoplay="true", muted="true", loop="true", class="screenshot" %}

## Browser support

`showPicker()` is available in Chrome&nbsp;99 or later.

## What's next {: #future }

At the time of writing, `showPicker()` is new to the web platform. The feature
may need additional work in the future:

- We may want to add a similar `showPicker()` to the `<select>` element in the
  future, if web developers ask for it.
- It's possible `closePicker()` might be useful, and we could consider adding
  that if web developers ask for it.
- We could add a [permissions policy] which allows cross-origin iframes to show
  browser pickers when their parent chain allows them to do so.

## Feedback {: #feedback }

The Chrome team and the web standards community want to hear about your
experiences with `showPicker()`.

### Tell us about the design

Is there something about `showPicker()` that doesn't work like you expected? Or
are there missing methods or properties that you need to implement your idea?
Have a question or comment on the security model?

- File a spec issue on the [WHATWG GitHub repo][issues], or add your thoughts to
  an existing issue.

### Problem with the implementation?

Did you find a bug with Chrome's implementation? Or is the implementation
different from the spec?

- File a bug at <https://new.crbug.com>. Be sure to include as much detail as
  you can, and simple instructions for reproducing. [Glitch](https://glitch.com)
  works great for sharing quick and easy repros.

### Show support

Are you planning to use `showPicker()`? Your public support helps the Chrome
team prioritize features and shows other browser vendors how critical it is to
support them.

Send a tweet to [@ChromiumDev] and let us know where and how you are using it.

## Helpful links {: #links }

- [MDN documentation][mdn]
- [WHATWG explainer][explainer]
- [WHATWG specification][spec]
- [TAG review][tag]
- [Demo][demo] | [Demo source][demo-source]
- [Chromium bug][cr-bug]
- [ChromeStatus.com entry][cr-status]

## Acknowledgements

Thanks to [Joe Medley] for reviewing this article.
Calendar image photo by [Eric Rothermel] on [Unsplash].

[frequent request]: https://www.google.com/search?q=programmatically+open+date+picker+site%3Astackoverflow.com
[error]: https://developer.mozilla.org/en-US/docs/Web/API/DOMException
[demo]: https://show-picker.glitch.me/demo.html
[issues]: https://github.com/whatwg/html/issues
[permissions policy]: /docs/privacy-sandbox/permissions-policy/
[@chromiumdev]: https://twitter.com/ChromiumDev
[mdn]: https://developer.mozilla.org/docs/Web/API/HTMLInputElement/showPicker
[explainer]: https://github.com/whatwg/html/pull/7319
[spec]: https://html.spec.whatwg.org/multipage/input.html#dom-input-showpicker
[tag]: https://github.com/w3ctag/design-reviews/issues/688
[demo-source]: https://glitch.com/edit/#!/show-picker?path=demo.html
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=939561
[cr-status]: https://www.chromestatus.com/feature/5692248021794816
[joe medley]: https://github.com/jpmedley 
[eric rothermel]: https://unsplash.com/@erothermel
[unsplash]: https://unsplash.com/photos/FoKO4DpXamQ

---
layout: 'layouts/doc-post.njk'
title: Prevents users from pasting into input fields
description: |
  Learn how to improve the user experience of your site's login screen by
  allowing users to paste into input fields.
date: 2019-05-02
updated: 2022-02-08
---

Some websites claim that allowing users to paste passwords reduces security.
However, password pasting actually _improves_ security
because it enables the use of password managers.

Password managers typically generate strong passwords for users,
store them securely, and then automatically paste them
into password fields whenever users need to log in. This approach is generally
more secure than forcing users to type in passwords that are short enough
to remember.

In the general case, users should not be prevented from pasting into `<input>` elements.

## How this Lighthouse audit fails

[Lighthouse](/docs/lighthouse/overview/) flags code that prevents users from pasting into non-readonly input fields:

<figure>
  {% Img src="image/JJOjt8Xo67UrV6L5ApflIK1DoWt2/5iOVrFQqbbaFyii47wth.png", alt="Lighthouse audit shows page stops users from pasting into a password field", width="800", height="329" %}
</figure>

Lighthouse gathers all non-readonly `<input>` elements,
pastes some text into each element,
and then verifies that `paste` event was not prevented by a custom event handler.

It's also possible to prevent pasting outside of a `paste` event listener.
Lighthouse doesn't detect that scenario.

{% Partial 'lighthouse-best-practices/scoring.njk' %}

## How to enable pasting into password fields

### Find the code that's preventing pasting

To quickly find and inspect the code that's preventing pasting:

1. Expand the [**Event Listener Breakpoints**](/docs/devtools/javascript/breakpoints/#event-listeners) pane.
1. Expand the **Clipboard** list.
1. Select the **`paste`** checkbox.
1. Paste some text into a password field on your page.
1. DevTools should pause on the first line of code
   in the relevant `paste` event listener.

### Remove the code that's preventing pasting

The source of the problem is often a call to `preventDefault()`
within the `paste` event listener
that's associated with the password input element:

```js
let input = document.querySelector('input');

input.addEventListener('paste', (e) => {
  e.preventDefault(); // This is what prevents pasting.
});
```

If you're only listening to paste events to preempt them,
remove the entire event listener.

## Resources

[Source code for **Prevents users from pasting into input fields** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/dobetterweb/paste-preventing-inputs.js)

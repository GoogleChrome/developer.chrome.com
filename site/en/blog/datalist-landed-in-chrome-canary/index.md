---
layout: 'layouts/blog-post.njk'
title: datalist landed in Chrome Canary
description: >
  By using `datalist`, your app can define a list of suggested results users should select from. They can either select an option from the list or enter freeform text.
authors:
  - agektmr
date: 2012-04-22
updated: 2019-02-09
---

Filling out forms sometimes feel like cumbersome thing. Giving users multiple choice yet enabling them to type freely is important. The `datalist` element (which just landed on Chrome Canary (M20) makes this a breeze.

By using `datalist`, your app can define a list of suggested results users should select from. They can either select an option from the list or enter freeform text.

[Live demo:](https://demo.agektmr.com/datalist/)

Options can be paired with a `datalist` by specifying its `id` in an `input` element's `list` attribute:

```html
<input type="text" value="" list="fruits" />
<datalist id="fruits">
    <option value="Apple"></option>
    <option value="Orange"></option>
    <option value="Peach"></option>
</datalist>
```

`datalist` is widely available on latest Firefox, Opera and Internet Explorer after version 10. So you don’t have to worry about compatibility too much, but if you want to make sure it works across browsers, try the following:


```html
<datalist id="fruits">
    Pick your favorite fruit
    <select name="fruit_sel">
    <option value="Apple">Apple</option>
    <option value="Orange">Orange</option>
    <option value="Peach">Peach</option>
    </select>
    or type one.
</datalist>
<input type="text" name="fruit" value="" list="fruits" />
```

If `datalist` is available on your browser, everything under the `datalist` except the `option` elements will be hidden. If you use this fallback mechanism, make sure your server catches both “fruit_sel” and “fruit” as query parameters.



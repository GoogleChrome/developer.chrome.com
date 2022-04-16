---
layout: 'layouts/blog-post.njk'
title: Five tricks to use in the Console Panel
description: >
   Five tricks to use in the Console Panel
authors:
  - umarhansa
date: 2015-08-09
updated: 2015-08-09
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/lDPJFoRChxKteyYCz3ir.gif", alt="Five tricks to use in the Console Panel", width="674", height="502" %}
</figure>

## Use the inspect() command to jump straight to a passed-in DOM node

```js
inspect($('p'))
```    

## Use the copy() command to copy text to your clipboard

```js
copy(Object.keys(window))
// stores ["top", "window", "location", "external"... and so on
```    

## Style your console output

```js
console.log('%cHello world', 'font-size:40px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
```

## Get the values of an object


```js
values({
    one: 1,
    two: 2,
    three: 3
})

// logs [1, 2, 3]
```    

## Clear the console

`Cmd + K` (Ctrl + L on Windows)



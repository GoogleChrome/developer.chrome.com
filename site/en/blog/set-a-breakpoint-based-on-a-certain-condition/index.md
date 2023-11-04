---
layout: 'layouts/blog-post.njk'
title: Set a breakpoint based on a certain condition
description: >
   When you set a breakpoint, you can make it conditional based on the result of an expression.
authors:
  - umarhansa
date: 2015-07-16
updated: 2015-07-16
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Ui64pnpXXZMiTayTIC9b.gif", alt="Set a breakpoint based on a certain condition.", width="800", height="592" %}
</figure>

When you set a breakpoint, you can make it conditional based on the result of an expression. Right click on the line gutter and select __Add Conditional Breakpoint__ and enter your expression.


If you have a callback like:

```js
function callback(result, err) {
    //set a conditional breakpoint based on the existence of err
}
```

You could set a conditional breakpoint based on the existence of `err`.






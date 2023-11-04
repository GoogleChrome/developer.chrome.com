---
layout: 'layouts/blog-post.njk'
title: Select and execute a block of code in the Sources Panel 
description: >
   Use the shortcut Ctrl + Shift + E to run a block of highlighted code in the Sources Panel.
authors:
  - umarhansa
date: 2015-07-16
updated: 2015-07-16
---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/CJnoTdaCzNZ3EnXMjyHq.gif", alt="Select and execute a block of code in the Sources Panel", width="610", height="606" %}
</figure>

You can use the shortcut `Ctrl + Shift + E` to run a block of highlighted code in the Sources Panel. In the clip, I am paused at a breakpoint, and want to access a bunch of variables attached to the `this` keyword. I select the block where they're defined and change:

```js
this.foo = 'hello'
this.bar = 'world'
```

Into

```js
foo = 'hello'
bar = 'world'
```

Finally, I execute that changed block of code so I have `foo` and `bar` in scope and can use them while debugging.




		



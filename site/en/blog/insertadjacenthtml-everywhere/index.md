---
layout: 'layouts/blog-post.njk'
title: insertAdjacentHTML everywhere
description: >
  How to insert content in a HTML document
authors:
  - paulkinlan
date: 2011-08-27
updated: 2019-01-16

---

If we want to insert content in a HTML document we have three ways to do it:


- Using DOM methods like `createNode` and `appendChild`
- Using [Document Fragments](https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-B63ED1A3)
- Using `innerHTML`


One can arguably say we also have `document.write` for few use cases.

`innerHTML` has been standardized in HTML5 and with it a brother method [insertAdjacentHTML](http://w3c.github.io/html/#insertadjacenthtml) which works as `innerHTML` but allows us to define more specifically where we want to insert the HTML content: beforeBegin, afterBegin, beforeEnd and afterEnd.


```js
var ul = document.getElementById("list");
ul.insertAdjacentHTML("beforeEnd", "&lt;li>A new li on the list.&lt;/li>");
```

Back in 2008 John Resig wrote [an article about insertAdjacentHTML](https://johnresig.com/blog/dom-insertadjacenthtml/) with this conclusion:

{% Aside %}
Having browsers implement this method will dramatically reduce the amount of code needed to write a respectable JavaScript library. I'm looking forward to the day in which this method is more-widely available (along with querySelectorAll) so that we can really buckle down and do some serious code simplification.
{% endAside %}


Until now, the main issue with insertAdjacentHTML has been its lack of browser support. With Firefox [implementing insertAdjacentHTML](https://bugzilla.mozilla.org/show_bug.cgi?id=613662#c13) as of version 8, it will available in all major browsers including mobile browsers. If you want to use it now and make sure it works in Firefox versions earlier than 8 you can use this [polyfill](https://gist.github.com/eligrey/1276030).


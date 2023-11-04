---
layout: 'layouts/blog-post.njk'
title: Flexbox gets new behavior for absolute-positioned children
description: >
    Flexbox gets new behavior for absolute-positioned children
authors:
  - joemedley
date: 2016-06-16
updated: 2016-06-16
---

A previous version of the 
[CSS Flexible Box](https://developer.mozilla.org/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_flexbox_to_lay_out_web_applications) 
Layout specification set the static position of absolute-positioned children as 
though they were a flex item whose size is 0px by 0px. The
[latest version of the spec](https://drafts.csswg.org/css-flexbox/#abspos-items)
takes them fully out  of flow and sets the static position based on align and
justify properties. At  the time of this writing, Edge and Opera 39 for desktop
and Android already  support this.

For an example, let's apply some positioning behaviors to the following HTML.

```html
<div class="container">
    <div>
    <p>In Chrome 52 and later, the green box should be centered vertically and horizontally in the red box.</p>
    </div>
</div>
```    

We'll add something like this:

```css
.container {  
    display: flex;  
    align-items: center;  
    justify-content: center;   
}  
.container > * {  
    position: absolute;  
}
```    

In Chrome 52 or later, the nested `<div>` will be perfectly centered in the 
container `<div>`. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/jMysiyxQNIRfLqJcQiiO.png", alt="Chrome52 behavior.", width="209", height="210" %}
</figure>

In non-conforming browsers, the top left corner of the green box will be in the 
top center of the red box. 


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/s5DoTL3U5SNx3gHra28O.png", alt="Legaci behavior.", width="295", height="213" %}
</figure>

If you want to try this for yourself in Chrome or any other browser,
[download our sample](https://github.com/GoogleChrome/samples/tree/gh-pages/css-flexbox-abspos)
or visit the [live demo](https://googlechrome.github.io/samples/css-flexbox-abspos/index.html).


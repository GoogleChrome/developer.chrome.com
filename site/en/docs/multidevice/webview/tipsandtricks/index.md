---
layout: "layouts/doc-post.njk"
title: WebView Tips & Tricks
date: 2014-02-28
description: Tips and tricks for improving your WebView application.
---

This article outlines some useful tips to enhance your application's user experience.

## Flicker of colors when the application loads

Ever noticed a flash of black and white when an application loads up with a WebView?

This tends to be caused by the loading of the window background color of the app (usually set in the
theme), followed by the white flash of the WebView background before it loads any content and then
the final color defined by the pages CSS.

The fix for this white flash is simple.

### Set the background of the layout

All you need to do is set the background color of the WebView, which removes the white flash. The
only delay in displaying this color will be in the native app to draw the WebView:

```java
mWebView.setBackgroundColor(Color.parseColor("#3498db"));
```

In Android it's generally good practice to define color values in a `res/values/colors.xml` file, as
described in [the Android App Resource guide][1]. Using a color defined in the application's
resources, the above line would become:

```java
mWebView.setBackgroundColor(getResources().getColor(R.color.my_color_name));
```

## Touch Feedback

One of the common differences between native and web applications is the lack of touch feedback in
many web apps.

The solution is simple, you need to support the :active pseudo class.

If you have a simple button with the following styling:

```css
.btn {
  display: inline-block;
  position: relative;
  background-color: #f39c12;
  padding: 14px;

  border-radius: 5px;
  border-bottom-style: solid;
  border-width: 4px;
  border-color: #DA8300;
}
```

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604543700975.png",
       alt="A screenshot of the example button.",
       width="656",
       height="299" %}

The pressed state may look like:

```css
.btn:active {
  background-color: #E68F05;
  border-color: #CD7600;
  border-width: 2px;
  top: 2px;
}
```

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604543733832.png",
       alt="A screenshot of the button being touched.",
       width="656",
       height="299" %}

All this does is darken the background color and border color slightly, decrease the border size, so
it looks like the button is sinking into the UI. The `top` property adjusts the position to balance
the smaller border.

### Lighten / Darken

If you use Sass you can use the darken / lighten mixins to alter the colors of elements without
needing to know the exact hex value. Or you can make use of online tools such as
[http://hexcolortool.com/][2].

### System highlights

Many user agents will add some form of touch feedback to elements, preventing the need for the page
to define anything specific. In the WebView you may notice an orange color on elements or an orange
ring around links and elements.

For example a button element in the new WebView is given an orange outline:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604543764609.png",
       alt="A screenshot of the outlined button.",
       width="656",
       height="195" %}

In the old webview a highlight color is applied on top of certain elements:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604543794370.png", 
       alt="A screenshot of a button with a highlight color on top of it.",
       width="656",
       height="158" %}

If you are taking care of the touch and focus feedback yourself, you can override the defaults with
the following CSS properties:

```css
-webkit-tap-highlight-color: rgba(0,0,0, 0.0);
outline: none;
```

And set your own colors like so:

```css
button {
  …
  outline: 0;
  -webkit-tap-highlight-color: rgba(0,0,0, 0.0);
}

button:focus {
  background-color: #E68F05;
  border-color: #DA8300;
}

button:active {
  background-color: #FFA91F;
  border-color: #E68F05;
}
```

This causes the button to have different colors depending on the state, so there is the default
state, a focused color and then a pressed (or active) state.

Press Me! No, Press Me!

The main areas to set these properties are form input fields and anchor tags.

[1]: https://developer.android.com/guide/topics/resources/more-resources.html#Color
[2]: http://hexcolortool.com/

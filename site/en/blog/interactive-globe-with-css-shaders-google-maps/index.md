---
layout: 'layouts/blog-post.njk'
title: Interactive globe with CSS shaders and Google Maps
description: >
  Interactive Globe with CSS shaders and Google Maps
authors:
  - paulirish
date: 2012-09-25
updated: 2019-02-22

---

{% YouTube id="NZRqnohI3m4" %}

Recently, I have read [news on Webmonkey](https://www.wired.com/2012/09/adobes-css-shaders-now-an-official-web-standard/) that Adobe’s CSS Shaders proposal, which will bring high-quality cinematic effects to the web through some new CSS tools, has been accepted by the W3C. If you haven't seen it yet, watch the video.

Google Chrome's latest Canary added support for CSS shaders, so I decided to experiment with them.

In this experiment, I used custom vertex shader (`spherify.vs`) and fragment shader (`spherify.fs`) to create a globe with Google Maps.

```html
<iframe
  class="globe"
  src="https://maps.google.com/?ie=UTF8&amp;amp;ll=14.597042,-15.625&amp;amp;spn=158.47027,316.054688&amp;amp;t=h&amp;amp;z=2&amp;amp;output=embed"
  scrolling="no"></iframe>
```

```css
.globe {
  width: 550px;
  height: 550px;
  border: 0;
  -webkit-filter: contrast(1.4) custom(url(shaders/spherify.vs) mix(url(shaders/spherify.fs) multiply source-atop),
    50 50 border-box,
    amount 1,
    sphereRadius 0.5,
    sphereAxis -0.41 1 0.19,
    sphereRotation 43.5,
    ambientLight 0.15,
    lightPosition 1 0.87 0.25,
    lightColor 1 1 1 1,
    transform perspective(500));
}
```

Here, we're applying a vertex shader (`spherify.vs`) which will operate on a mesh that has 50 lines and 50 columns (`50 50 border-box`). Feel free to read the source of the vertex shader: [spherify.vs](http://is.gd/spherifyvs). It's written in [GLSL](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) but you can probably follow along.

The `mix()` function provides basic functionalities for color manipulation like blending and alpha compositing on a fragment shader.

We can change the shere's radius, axis, rotation right in the CSS. In this example we set the value of the `sphereRadius: 0.5` and it gives original sphere size.

## Enjoy the demo!

Below is a video of the effect. If you've got shaders enabled you can play with the real thing right below!

{% YouTube id="5TG6TK2nueo" %}

<iframe class="globe" src="https://maps.google.com/?ie=UTF8&amp;ll=14.597042,-15.625&amp;spn=158.47027,316.054688&amp;t=h&amp;z=2&amp;output=embed" scrolling="no"></iframe>

If you just see a flat google maps above, you can enable it with the instructions below

## Browsers support: CSS shaders

This is currently cutting-edge, so it's only available in the latest [Google Chrome Canary](https://www.google.com/intl/en/chrome/canary/) and WebKit nightly. To enjoy the full experience you'll need to turn a few knobs.

### Chrome Canary steps

1. Type `about:flags` in the browser's navigation bar
1. Find "Enable CSS Shaders". Enable it
1. Relaunch the browser

### WebKit nightly steps


1. Download and install [WebKit nightly](https://webkit.org/build-archives/) for Mac OSX
1. Open the browser's preferences panel. Go to **Advanced** tab and tick to show **Develop > Enable WebGL** menu in the menu bar.
1. In the browser's menu bar select **Develop**


{% Aside %}
Avaz Bokiev is a web developer in NYC. Check out his recent experiments (including CSS Shader) [here](https://developers.google.com/web/updates/2012/09/Interactive-Globe-with-CSS-shaders-Google-Maps) and his blog at [avaz.me](https://avaz.me/).
{% endAside %}

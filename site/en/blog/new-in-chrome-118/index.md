---
title: New in Chrome 118
description: >
  Chrome 118 is rolling out now! Declare specific styles within a component with the @scope css rule. Use new media feature: prefers-reduced-transparency. DevTools has improvements in the Sources panel and there's plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-10-10
authors:
  - ajara
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/rcB2kRXs70qfYA0i4iTx.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-118
---

{% YouTube id='zx8OZtKe6hA' %}

Here's what you need to know:

* Declare specific styles within a component with the [`@scope` css rule](#css-scope).
* There's a new media feature: [`prefers-reduced-transparency`](#new-media-queries).
* DevTools has improvements in the [**Sources** panel](#sources-panel-devtools).

* And there's plenty [more](#more).

I'm Adriana Jara. Let's dive in and see what's new for developers in Chrome 118.

## CSS `@scope` rule. {: #css-scope}

The `@scope` at-rule allows developers to scope style rules to a given scoping root, and style elements according to the proximity of that scoping root.

With `@scope` you can override styles based on proximity,  which is different from the usual CSS styles that are applied relying only on source order and specificity.  In the following example, there are two themes.

```html
<div class="lightpink-theme">
  <a href="#">I'm lightpink!</a>
  <div class="pink-theme">
    <a href="#">Different pink!</a>
  </div>
</div>
```
without scope, the style applied is the last one declared.

{% Compare 'worse', 'Without @scope' %}
```css
.pink-theme a { color: hotpink; }
.lightpink-theme a { color: lightpink; }
```
{% endCompare %}

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/N1ZbDIild8BHXJ3GjIey.jpg", alt="Two links, the first one reads &#39; I'm lightpink!' the second one reads 'Different pink', both links are actually light pink, under the links text reads sources order declaration style.", width="800", height="700" %}

With scope you can have nested elements and the style that applies is the one for the nearest ancestor.

{% Compare 'better', 'With @scope' %}
```css
@scope (.pink-theme) {
    a {
        color: hotpink;
    }
}

@scope (.lightpink-theme){
    a {
        color: lightpink;
    }
}
```
{% endCompare %}

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/9svylwmK9QHQJUgAMNkj.jpg", alt="Two links, the first one reads ''I''m lightpink!'' the second one reads 'Different pink', second link is a darker pink, under the links text nearest ancestor style and has a green checkmark next to it.", width="800", height="694" %}

Scope also saves you from writing long, convoluted class names, and makes it easy to manage larger projects and avoid naming conflicts.

{% Compare 'worse', 'Without @scope' %}
```html
<div class="first-container">
  <h1 class="first-container__main-title"> I'm the main title</h1>
</div>
<div class="second-container">
  <h1 class="second-container__main-title"> I'm the main title, but somewhere else</h1>
</div>
```

```css
.first-container__main-title {
  color: grey;
}

.second-container__main-title {
  color: mediumturquoise;
}
```
{% endCompare %}


{% Compare 'better', 'With @scope' %}
```html
<div class="first-container">
  <h1 class="main-title"> I'm the main title</h1>
</div>
<div class="second-container">
  <h1 class="main-title"> I'm the main title, but somewhere else</h1>
</div>
```

```css
@scope(.first-container){
  .main-title {
   color: grey;
  }
}
@scope(.second-container){
  .main-title {
   color: mediumturquoise;
  }
}
```
{% endCompare %}


With scope you can also style a component without styling certain things that are nested within. In a way you can have “holes” where the scoped style doesn't apply.

Like in the following example, we could apply style to the text and exclude controls or vice versa.

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/2OcZt7BEhhMH2dW9earg.jpg", alt="representation of the html above, with the words in scope next to the first and third div and the word excluded next to the second and fourth div.", width="800", height="648" %}

```html
<div class="component">
  <div class="purple">
    <h1>Drink water</h1>
    <p class="purple">hydration is important</p>
  </div>
  <div class="click-here">
    <p>not in scope</p>
    <button>click here</button>
  </div>

  <div class="purple">
    <h1 class="purple">Exercise</h1>
    <p class="purple">move it move it</p>
  </div>

  <div class="link-here">
    <p>Excluded from scope</p>
    <a href="#"> link here </a>
  </div>
</div>
```

```css
@scope (.component) to (.click-here, .link-here) {
  div {
    color: purple;
    text-align: center;
    font-family: sans-serif;
  }
}
```

Checkout the article [Limit the reach of your selectors with the CSS @scope at-rule](/articles/at-scope/) for more information.

## `prefers-reduced-transparency` media feature {: #new-media-queries }

We use media queries to provide user experiences that adapt to the user's preferences and device conditions. This Chrome version adds a new value that can be used to adapt user experience: `prefers-reduced-transparency`.

A new value you can test with media queries is `prefers-reduced-transparency` which lets developers adapt web content to user-selected preference for reduced transparency in the OS, such as the Reduce transparency setting on macOS. Valid options are `reduce` or `no-preference`.

```css
.translucent {
  opacity: 0.4;
}

@media (prefers-reduced-transparency) {
  .translucent {
    opacity: 0.8;
  }
}
```

And, you can check how it looks with DevTools:

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Xh60t9y0KnAIdwoUnbX5.mp4", autoplay="false", loop="true", muted="true", controls="true", class="screenshot", width="800", height="533" %}

For more information checkout the [prefers-reduced-transparency](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-reduced-transparency) documentation.

_Correction: A previous version of this article referred to a new [`scripting`](https://developer.mozilla.org/docs/Web/CSS/@media/scripting) media feature being in this release. It will actually be in version 120._

## Sources panel improvements in DevTools {: #sources-panel-devtools }

DevTools has the following improvements in the **Sources** panel:  the [workspace](/docs/devtools/workspaces/) feature improved consistency, most notably, by renaming the **Sources** > **Filesystem** pane to **Workspace** along with other UI text,  the [**Sources** > **Workspace**](/docs/devtools/workspaces/) also lets you sync changes you make in DevTools directly to your source files.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/1T78X6ldgLhiH6iJgAMk.mp4", width="800", height="436", autoplay="false", loop="true", muted="true", controls="true", class="screenshot" %}

Also, you can now reorder panes on the left side of the **Sources** panel by dragging and dropping, and the **Sources** panel can now pretty-print inline JavaScript within the following script types: [`module`](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules), [`importmap`](https://developer.mozilla.org/docs/Web/HTML/Element/script/type/importmap), [`speculationrules`](/blog/debugging-speculation-rules/) and highlight the syntax of `importmap` and `speculationrules` script types, both of which hold JSON.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yZYe1CF5ObuLu7zVjcot.png", alt="Before and after pretty-printing and syntax highlighting of speculation rules script type.", width="800", height="395" %}

Checkout [What's New in DevTools](/blog/new-in-devtools-118/) for more on Chrome 118 DevTools updates.

## And more! {: #more }

Of course there's plenty more.

* [WebUSB API](/articles/usb/) is now exposed to [Service Workers registered by browser extensions](docs/extensions/mv3/service_workers/) allowing developers to use the API when responding to extension events.

* To help developers reduce friction in Payment Request flows, we are removing the user activation requirement in `Payment Request` and `Secure Payment Confirmation`.

* [Chrome's release cycle is becoming shorter](/blog/faster-chrome-releases-round2/), stable versions will be released every three weeks, starting with Chrome 119 that will be here in three weeks.

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 118.

* [What's new in Chrome DevTools (118)](/blog/new-in-devtools-118/)
* [Chrome 118 deprecations and removals](/blog/deps-rems-118/)
* [ChromeStatus.com updates for Chrome 118](https://chromestatus.com/features#milestone%3D118)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/116.0.5845.171..118.0.5938.57)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

Yo soy Adriana Jara, and as soon as Chrome 119 is released, I'll be right here to
tell you what's new in Chrome!

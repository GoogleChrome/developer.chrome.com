---
title: New in Chrome 112
description: >
  Chrome 112 is rolling out now! Now CSS supports nesting rules, the algorithm to set the initial focus on dialog elements was updated, no-op fetch handlers on service workers are skipped from now on to make navigations faster and there’s plenty more.
layout: 'layouts/blog-post.njk'
date: 2023-04-04
updated: 2023-04-05
authors:
  - ajara
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/kYS3DlJai8qJioFUduBI.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-112
---

{% YouTube id='KGMe4OyXYEc' %}

Here's what you need to know:

* CSS now supports [nesting rules](#nesting-rules).
* The algorithm to set the initial focus on [`<dialog>` elements was updated](#dialog).
* No-op `fetch()` handlers on [service workers are skipped](#no-op-sw) from now on to make navigations faster.
* And there’s plenty [more](#more).

I’m Adriana Jara. Let’s dive in and see what’s new for developers in Chrome 112.
## CSS support for nesting. {: #nesting-rules}
One of our favorite CSS preprocessor features is now built into the language: nesting style rules.

Before nesting, every selector needed to be explicitly declared, separately from
one another. This leads to repetition, stylesheet bulk, and a scattered authoring
experience.

{% Compare 'worse', 'Before' %}
```css
.nesting {
  color: hotpink;
}

.nesting > .is {
  color: rebeccapurple;
}

.nesting > .is > .awesome {
  color: deeppink;
}
```
{% endCompare %}

After [nesting](https://www.w3.org/TR/css-nesting-1/), selectors can be
continued and related style rules to it can be grouped within.

{% Compare 'better', 'After' %}
```css
.nesting {
  color: hotpink;

  > .is {
    color: rebeccapurple;

    > .awesome {
      color: deeppink;
    }
  }
}
```
{% endCompare %}


Nesting helps developers by reducing the need to repeat selectors while also co-locating style rules for related elements. It can also help styles match the HTML they target.

If the `.nesting` component in the example was removed from the project, you could delete the entire group instead of searching files for related selector instances.

Nesting can help with:

* Organization.
* Reducing file size.
* Refactoring.

Checkout [this article](/articles/css-nesting/) for tips to make the most of CSS nesting and you can find the support for nesting in devtools [here](/blog/new-in-devtools-112/#nesting).

## Algorithm update for `<dialog>` initial focus. {: #dialog }

The HTML `<dialog>` element is the standardized way to represent a dialog box or other interactive component, such as a dismissible alert or a subwindow, that needs to be displayed on top of all other content in a web page.

This HTML element is the recommended way to create such content because its features were built to provide better and consistent usability and accessibility.



One of those features is handling which element gets focused when the dialog is opened, in this version the algorithm that selects that element was updated.

From now on:

The dialog focusing steps look at keyboard focusable elements instead of any focusable element
The `<dialog>` element itself gets focus if it has the autofocus attribute set

The `<dialog>` element itself gets focus as a fallback instead of focus being "reset" to the `<body>` element.

Read the [documentation](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) for more details on the `<dialog>` element.

## Skipping service worker no-op fetch handlers. {: #no-op-sw }

From Chrome 112 the service worker start and the listener dispatch from the navigation critical path will be omitted, if a user agent identifies that all the service worker's fetch listeners are no-ops.

This feature makes the navigation of those pages faster.

Having the fetch handler was one of the PWA requirements for a web app to be installable. We suspect that might be the reason some sites have essentially an empty fetch handler. However, to start a service worker and execute a no-op listener only brings overhead, without bringing any of the benefits that could be implemented with the right service worker like caching or offline capabilities. So Chrome now skips them to improve navigation.

As part of this change, Chrome will show console warnings if all the service worker’s fetch listeners are no-ops, and encourage developers to remove those fetch listeners.

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/rVEXxK1RvVOvaz7Gi8FP.png", alt="Warnings in DevTools for empty service worker fetch handlers.", width="800", height="297" %}



## And more! {: #more }

Of course there’s plenty more.

* The setter for `document.domain` is now deprecated.
* There is an [origin trial](/origintrials/#/view_trial/1390486384950640641) for the `X-Requested-With header` deprecation in WebView
* The recorder in devtools can now record with [pierce selectors](/blog/new-in-devtools-112/#pierce-selectors).

## Further reading

This covers only some key highlights. Check the links below for
additional changes in Chrome 112.

* [What's new in Chrome DevTools (112)](/blog/new-in-devtools-112/)
* [Chrome 112 deprecations and removals](/blog/deps-rems-112/)
* [ChromeStatus.com updates for Chrome 112](https://www.chromestatus.com/features#milestone%3D112)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/111.0.5563.53..112.0.5615.54)
* [Chrome release calendar](https://chromiumdash.appspot.com/schedule)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5) to the
[Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I’m Adriana Jara, and as soon as Chrome 113 is released, I'll be right here to
tell you what's new in Chrome!

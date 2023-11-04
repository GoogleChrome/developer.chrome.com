---
layout: 'layouts/blog-post.njk'
title: DevTools go dark, @keyframe editing and smarter autocomplete 
description: >
  Learn how DevTools makes you type less with smarter Console autocomplete, how to edit @keyframe rules directly in the Styles pane, how to have fun with CSS Custom Variables and how to join the dark side.
authors:
  - pbakaus
date: 2016-02-09
updated: 2016-02-09
---

Learn how DevTools makes you type less with smarter Console autocomplete, how to edit `@keyframe` rules directly in the Styles pane, how to have fun with CSS Custom Variables and how to join the dark side.

## A smarter autocomplete in your console

If you’re like me and many others, you type a command into the console to debug your app, see it not working, iterate and type it again, and again, and again. In order to help with that, we’re now autocompleting full statements you typed previously, like so:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/wDdtn6qJ5rZwnuSYVAGA.png", alt="Autocomplete", width="800", height="382" %}
</figure>

## Directly edit @keyframe rules in Styles pane

When we introduced the animation inspector and easing editor to DevTools, it was limited to transitions because we never showed `@keyframe`-based CSS animations in the Style pane. I’m pleased to say that that’s now a thing of the past, so go wild! Check out our [video tweet](https://twitter.com/ChromeDevTools/status/694966453376675840) for a preview.

## Custom CSS properties support

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Xir3SmzWAlVzza3iwVdZ.gif", alt="Custom CSS properties in DevTools", width="800", height="408" %}
</figure>


There’s a lot of goodness coming to CSS, and one of them is custom variables, launching in Chrome 49. We made sure to include full support in DevTools, so if you’ve been using variables in Sass before, give the native ones a try, as they allow you to edit properties on the fly in the Styles pane and immediately update dependent elements.

## A dark theme for DevTools

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/x0yvglS8DfrPLf7XrfSq.png", alt="Dark Theme in action", width="800", height="446" %}
</figure>

We finally gave in to a request that we’ve heard dozens of times over the last couple years: You can now choose the dark side in DevTools. Head to the DevTools settings, Set theme to dark and enjoy. I’d say this is still in beta as a lot of it is auto-generated, so if you see any areas that could see improvements, definitely [let us know](https://crbug.com/new)!

## The best of the rest

  * The console drawer now auto collapses when you click on the full Console tab.
  * The file tree in Sources got a nice overhaul with new icons and new grouping functionality

- - -

As always, [let us know what you think via 
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the 
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!  
Paul Bakaus & the DevTools team


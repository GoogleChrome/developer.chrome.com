---
title: "Auto Dark Theme"
description: >
  Autogenerating a dark theme for light-themed sites.
layout: 'layouts/blog-post.njk'
authors:
  - andreban
date: 2021-10-21
updated: 2021-11-01
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/t98X06XyMtNI4rTmXyfZ.jpg'
alt: >
  Lamp on a dark background.
tags:
  - origin-trials
---

Chrome 96 introduces an [origin trial](/blog/origin-trials/) for Auto Dark Themes on Android.
With this feature, the browser applies an automatically generated dark theme to light themed sites,
when the user has opted into dark themes in the operating system.
Users can opt-out of dark themes by either disabling the option on the OS level or in a specific setting in Chrome.

## Sign-up for the origin trial

You can also enable the darkening algorithm for your users, via an origin trial.
This allows you to test how the Auto Dark Theme performs with regards to your KPIs.

Head over to the documentation to learn
[how to set up an origin trial](/blog/origin-trials/#how-to-register-for-an-origin-trial),
then [sign-up for the AutoDarkMode origin trial](/origintrials/#/view_trial/1626925365387591681)
to get a token.

## Test Auto Dark Theme on your device

### With DevTools

To enable Auto Dark Theme in DevTools:

1. Click the three dots menu.
1. Select **More Tools** then **Rendering**.
1. Select **Enable** on the **Emulate auto dark mode** option.

### On an Android phone

To test Auto Dark Theme on your Android phone:

1. Navigate to `chrome://flags` and enable the `#darken-websites-checkbox-in-theme-setting` experiment.
1. Then, tap the three dots menu, select **Settings** then **Theme**, and check the box with **Apply Dark themes to sites, when possible**.

Now, light pages will be darkened on the phone.

## Per-element customization

Even though we aim for Auto Dark Theme to generate good results in all cases,
early conversations with developers suggested that they would like to tweak specific elements,
to adapt better to their desired look and feel.

In this origin trial,
those customizations are possible by using JavaScript to detect if the user is in Auto Dark Theme and then customizing the desired elements.

{% Aside %}
Using a `prefer-color-scheme: dark` media query to customize elements works when Auto Dark Theme is applied.
However, it would also be applied by other browsers that don't have Auto Dark Theme,
leading to a page that has a light theme, but with only parts of it darkened.
{% endAside %}

### Detecting Auto Dark Theme

To detect if the user is in Auto Dark Theme,
create an element with the `background-color` set to `canvas` and the color-scheme set to light.
If the computed color for the background is other than white (`rgb(255, 255, 255)`),
then Auto Dark Theme is applied to the page.

```html
<div id="detection"
     style="display: none; background-color: canvas; color-scheme: light">
</div>
```
```js
const detectionDiv = document.querySelector('#detection');
// If the computed style is not white then the page is in Auto Dark Theme.
const isAutoDark = getComputedStyle(detectionDiv).backgroundColor != 'rgb(255, 255, 255)';
// Update element styles when Auto Dark Theme is applied.
if (isAutoDark) {
  const myElement = document.querySelector('#my-element');
  myElement.classList.add('autoDarkOnlyStyle');
}
```

### Customizing a large number of elements

The solution above can be hard to scale if you need to customize a larger number of elements.
An alternative is to use Auto Dark Theme detection to add a marker class to the page's body:

```js
function setAutoDarkClass() {
  // We can also use JavaScript to generate the detection element.
  const detectionDiv = document.createElement('div');
  detectionDiv.style.display = 'none';
  detectionDiv.style.backgroundColor = 'canvas';
  detectionDiv.style.colorScheme = 'light';
  document.body.appendChild(detectionDiv);
  // If the computed style is not white then the page is in Auto Dark Theme.
  const isAutoDark = getComputedStyle(detectionDiv).backgroundColor != 'rgb(255, 255, 255)';

  // remove the detection element from the DOM.
  document.body.removeChild(detectionDiv);

  // Set the marker class on the body if in Auto Dark Theme.
  if (isAutoDark) {
    document.body.classList.add('auto-dark-theme');
  }
}
document.addEventListener("DOMContentLoaded", setAutoDarkClass);
```

Then, use CSS to customize elements as needed:

```css
.auto-dark-theme > #my-element {
  border-color: red;
}
```

The per-element customization API is still in early development.
We're working with the standards teams to provide developers with a more expressive API for opt-out.
You can follow the conversation on [this GitHub issue](https://github.com/w3c/csswg-drafts/issues/6664).

## How to opt-out of Auto Dark Theme

Besides respecting the user's choice on their device,
dark themes provide benefits to users such as battery life improvements and accessibility.
Instead of opting out of Auto Dark Theme,
we strongly recommend implementing your own curated dark theme instead,
in order to respect the user's preference and keep those benefits.

However, in the case where it's not viable to implement your own dark theme,
and the result generated by Auto Dark Theme is not satisfactory,
it is possible to opt out from the feature,

### Using a meta tag

The first alternative for opting out of Auto Dark Theme is by adding the following meta tag to your page's header.
The advantage of using the meta tag is that it prevents Auto Dark Theme from being applied at all,
which could cause a "flash of darkened content".

```html
<head>
  <meta name="color-scheme" content="only light">
  ...
</head>
```

### Per element opt-out

A second alternative for opting out is setting the value of the [`color-scheme`](https://developer.mozilla.org/docs/Web/CSS/color-scheme)
CSS property to `only light`.
Even though the per-element opt-out can be used to opt-out the entire page from Auto Dark Mode,
an advantage of this approach is that it allows only opting out specific parts of the page:

```css
#my-element {
  color-scheme: only light;
}
```

It is still possible to use this approach to opt-out the entire page from Auto Dark Theme by setting the color-scheme on the `:root` element:

```css
:root {
  color-scheme: only light;
}
```

## Send us feedback!

Auto Dark Theme is still being specified,
and we are looking for feedback across all areas of the implementation:
from the results of the darkening algorithm to the developer APIs for element customization and opt-out.

There are many channels you can send us your feedback:
 - Via the [developer survey](https://docs.google.com/forms/d/e/1FAIpQLSeb1V8AB1wgvL5mGtRqEmgqSEaUB4ETWEfZyVprYLK9ZP06sA/viewform).
 - Filing a [bug on the Chromium project](https://bugs.chromium.org/p/chromium/issues/list?q=component:Mobile%3EAutoDarkTheme).
 - Via the [Origin Trial feedback form]((/origintrials/#/view_trial/1626925365387591681)).

Photo by [Félix Besombes](https://unsplash.com/@druks?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).

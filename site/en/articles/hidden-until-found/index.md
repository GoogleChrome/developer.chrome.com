---
title: 'Making collapsed content accessible with hidden=until-found'
description: >
  How this new attribute value can ensure that content within accordion sections can be found and linked to. 
layout:
  'layouts/blog-post.njk'
date: 2022-04-28
authors:
  - jarhar
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/KjF2oAvuvbZ1rCQkCXX4.jpg'
alt: A cat hiding behind a curtain.
tags:
  - chrome
  - html
---

Collapsing content sections, sometimes described as [an accordion](https://www.smashingmagazine.com/2017/06/designing-perfect-accordion-checklist/), are a common UI pattern. However, content hidden in the collapsed sections becomes impossible to search using a find-in-page search. Also, it isn't possible to link to [text fragments](https://web.dev/text-fragments/) inside collapsed regions.

The `hidden=until-found` HTML attribute and `beforematch` event can solve these problems. By adding `hidden=until-found` to the container for your hidden content, you make it possible for the browser to search text in that hidden region, and reveal the section if a match is found.

{% Aside %}
In addition to allowing find-in-page search on hidden regions, this feature will allow this hidden content to be accessible to search engines. Google Search will even form links that scroll to the revealed fragment.
{% endAside %}

These features are available from Chrome 102,  so let's take a look at how they work.

## How to use it

If your website already has collapsible sections which you'd like to make searchable, replace the styles that make the section hidden with the `hidden=until-found` attribute. If your page also has another state which needs to be kept in sync with whether or not your section is revealed, then add a `beforematch` event listener that will be fired on the `hidden=until-found` element right before the element is revealed by the browser.

{% Codepen {
  user: 'web-dot-dev',
  id: 'JjMxmom',
  theme: 'dark',
  height: 450,
  tab: 'result'
} %}


## Caveats

For a consistent user experience, the `hidden=until-found` content should be revealable without the use of find-in-page. Not all users will be using find-in-page, and browsers that don't support `hidden=until-found` will get the original experience of hidden content without find-in-page revealing.

If you'd like to make sure your hidden content is searchable on browsers which don't support `hidden=until-found`, you can always expand the hidden content in those browsers. Feature detection can be done by checking for the presence of the `beforematch` event handler:

```js
if (!(‘onbeforematch' in document.body)) {
  // expand all hidden content
}
```

`hidden=until-found` applies the `content-visibility:hidden` CSS property instead of the `display:none` property that the regular hidden attribute applies. This is needed to search the content while it's closed, but also has these side-effects:

- Some layout APIs such as `getBoundingClientRect` will report that the hidden content inside the `hidden=until-found` element takes up space and has a position in the page.
- Child nodes of the `hidden=until-found` element won't be rendered, but the `hidden=until-found` element itself will still have a box. This means that CSS properties such as border and explicit size will still affect the rendering.

As an example of this, the following demo adds margin, border, and padding to the element that has `hidden=until-found` applied. In the place where hidden content will appear is a box with a gray border, which then fills out with the hidden content when it is revealed. This is the box of the hidden element.


{% Codepen {
  user: 'web-dot-dev',
  id: 'oNpmaXV',
  theme: 'dark',
  height: 450,
  tab: 'result'
} %}


To avoid this problem, add the border to an element nested inside the container that has `hidden=until-found`.


{% Codepen {
  user: 'web-dot-dev',
  id: 'Rwxveab',
  theme: 'dark',
  height: 450,
  tab: 'result'
} %}

_Hero image by [Thomas Bormans](https://unsplash.com/@thomasbormans)._

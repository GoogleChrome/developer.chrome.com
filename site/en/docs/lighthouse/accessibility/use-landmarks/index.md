---
layout: 'layouts/doc-post.njk'
title: HTML5 landmark elements are used to improve navigation
description: |
  Learn how to improve the accessibility of your web page by providing
  landmarks that keyboard users can use to navigate.
date: 2019-05-02
updated: 2019-09-19
web_lighthouse:
  - use-landmarks
  - managed-focus
---

HTML5 elements such as `main`, `nav`, and `aside` act as landmarks,
or special regions on the page to which
screen readers and other assistive technologies can jump.
By using landmark elements,
you can dramatically improve the navigation experience on your site
for users of assistive technology.
Learn more in Deque University's
[HTML 5 and ARIA Landmarks](https://dequeuniversity.com/rules/axe/4.4/landmark-one-main).

## How to manually check landmarks

Use [the W3C's list of landmark elements](https://www.w3.org/WAI/ARIA/apg/example-index/landmarks/HTML5.html)
to check that each major section of your page is contained by a landmark element.
For example:

```html
<header>
  <p>Put product name and logo here</p>
</header>
<nav>
  <ul>
    <li>Put navigation here</li>
  </ul>
</nav>
<main>
  <p>Put main content here</p>
</main>
<footer>
  <p>Put copyright info, supplemental links, etc. here</p>
</footer>
```

You can also use tools like Microsoft's
<a href="https://accessibilityinsights.io/" rel="noopener">Accessibility Insights extension</a>
to visualize your page structure and catch sections that aren't contained in landmarks:

<figure>
  {% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/EUH3Yz64EbuAI0GKQoWa.png", alt="Screenshot of web.dev with landmarks highlighted by the Accessibility Insights extension", width="800", height="534" %}
</figure>

## How to use landmarks effectively

- Use landmark elements to define major sections of your page
  instead of relying on generic elements like `<div>` or `<span>`.
- Use landmarks to convey the structure of your page.
  For example, the `<main>` element should include all content directly related
  to the page's main idea, so there should only be one per page.
  See [MDN's summary of content sectioning elements](https://developer.mozilla.org/docs/Web/HTML/Element#content_sectioning)
  to learn how to use each landmark.
- Use landmarks judiciously. Having too many landmarks can actually
  make navigation _more_ difficult for assistive technology users because
  it prevents them from easily skipping to a desired piece of content.

{% Aside %}
If you find that your page has, for example, four `<nav>` elements
or ten `<aside>` elements, that may suggest a need to simplify your
user interface or content structure, which will likely benefit _all_ users.
{% endAside %}

See the [Headings and landmarks](https://web.dev/headings-and-landmarks) post
for more information.

## Resources

- [Source code for **HTML5 landmark elements are used to improve navigation** audit](https://github.com/GoogleChrome/lighthouse/blob/master/core/audits/accessibility/manual/use-landmarks.js)
- [HTML5 Sectioning Elements (W3C)](https://www.w3.org/WAI/ARIA/apg/example-index/landmarks/HTML5.html)
- [HTML 5 and ARIA Landmarks (Deque University)](https://web.archive.org/web/20210320023151/https://dequeuniversity.com/assets/html/jquery-summit/html5/slides/landmarks.html)

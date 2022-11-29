---
layout: "layouts/blog-post.njk"
title: A wordy title used to demonstrate what happens when a title spans multiple lines.
description: Test post
authors:
  - shubhie
  - housseindjirdeh
date: 2022-11-23
hero: image/0SXGYLkliuPQY3aSy3zWvdv7RqG2/tCzTPP3b6A0qk9y7rSzK.jpg
alt: Test post
tags:
  - aurora-project
---

## Markdown

---

### Headings

# Heading 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa
sit amet ullamcorper.

## Heading 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa
sit amet ullamcorper.

### Heading 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa
sit amet ullamcorper.

#### Heading 4

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa
sit amet ullamcorper.

##### Heading 5

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa
sit amet ullamcorper.

###### Heading 6

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa
sit amet ullamcorper.

### Image

![Sample image](https://wd.imgix.net/image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/rod9wVThpgeFVILBoi6L.png)

### Horizontal rule

---

### Lists

Unordered:

* Lorem
  * A
  * B
  * C
* Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
* Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s

Ordered:

1. Lorem
   * A
   * B
   * C
2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
   Ipsum has been the industry's standard dummy text ever since the 1500s
3. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
   Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s

### Code

Inline: `console.warn()`

Block:

```js
function foo() {
  return 'bar';
}
```

{% Label %}Labelled css block:{% endLabel %}

```css
figure {
  break-inside: avoid;
}
```

### Tables

| Step                                       | Status             |
| ------------------------------------------ |--------------------|
| 1. Create explainer                        | Not started        |
| 2. Create initial draft of specification   | Not started        |
| 3. Gather feedback & iterate on design     | Not started        |


### Links

[Example](http://example.com/)

### Text formatting

Text can be *Emphasised*, **Bold** or use ~~Strikethrough.~~

## Shortcodes

---

### Aside

{% Aside 'caution' %}
This type of callout suggests proceeding with caution.
{% endAside %}

{% Aside 'warning' %}
This type of callout is stronger than a Caution; it means "Don't do this."
{% endAside %}

{% Aside 'success' %}
This type of callout describes a successful action or an error-free status.
{% endAside %}

{% Aside 'objective' %}
This type of callout defines the goal of a procedure.
{% endAside %}

{% Aside 'gotchas' %}
This type of callout can be used to outline any potential pitfalls
{% endAside %}

{% Aside 'important' %}
This type of callout defines important terminology.
{% endAside %}

{% Aside 'key-term' %}
This type of callout can be used to describe/expand upon key terms
{% endAside %}

{% Aside 'codelab' %}
This type of callout can be used to link out to code samples
{% endAside %}

### Columns

The columns shortcode supports an abitrary number of columns. Define as many as you need
and the available space will be divided equally between the columns.

**Here's an example with 4 columns:**

{% Columns %}

{% Column %}
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s
{% endColumn %}

{% Column %}
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s
{% endColumn %}

{% Column %}
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s
{% endColumn %}

{% Column %}
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s
{% endColumn %}

{% endColumns %}

**And another with 2:**

{% Columns %}

{% Column %}

* A
* B
* C

{% endColumn %}

{% Column %}

1. 1
2. 2
3. 3

{% endColumn %}

{% endColumns %}

### Compare

The compare shortcode allows two snippets to be clearly contrasted against each other.

There are two types: **better** and **worse**. They look as follows.

{% Compare 'worse' %}
```html
<h1>Some bad code</h1>
```
{% endCompare %}

{% Compare 'better' %}
```html
<h1>Some better code</h1>
```
{% endCompare %}

**You can provide custom labels:**

{% Compare 'worse', 'old' %}The old way{% endCompare %}

{% Compare 'better', 'new' %}The new way{% endCompare %}

**And captions:**

{% Compare 'better' %}
```html
<h1>Some better code</h1>
```
{% CompareCaption %}
This is better
{% endCompareCaption %}

{% endCompare %}

### Details

{% Details 'open' %}
{% DetailsSummary %}
Details summary open - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa sit amet ullamcorper
{% endDetailsSummary %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa sit amet ullamcorper. Suspendisse auctor
ultrices ante, nec tempus nibh varius at. Cras ligula lacus, porta vitae maximus a, ultrices a mauris. Vestibulum porta dolor erat, vel molestie dolor posuere in.

{% endDetails %}

{% Details %}
{% DetailsSummary %}
  Details summary closed
{% endDetailsSummary %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dictum a massa sit amet ullamcorper. Suspendisse auctor
ultrices ante, nec tempus nibh varius at. Cras ligula lacus, porta vitae maximus a, ultrices a mauris. Vestibulum porta dolor erat, vel molestie dolor posuere in.

{% endDetails %}

### Img

<figure>
  {% Img src="image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/rod9wVThpgeFVILBoi6L.png", alt="ALT_TEXT_HERE", width="528", height="264" %}
</figure>

### IncludeRaw

```
{% includeRaw '../../node_modules/webdev-infra/types/shortcodes/Video.d.ts' %}
```

### Partials

Partials can be used to load and inline templates from the partials directory

{% Partial 'test.md' %}


### Video

{% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/4tFe6RarBGc5Jre1bScp.mp4", muted="true" %}

---
title: Components
layout: 'layouts/doc-post.njk'
date: 2021-01-12
updated: 2021-01-27
---

## Details

Use a details section to hide extra information from the user until it's needed. It can have an optional preview.

````md
{% raw %}{% Details %}
{% DetailsSummary %}
A brief summary goes here
{% endDetailsSummary %}

The body of the Details component goes here, and **can** contain markdown.

{% endDetails %}{% endraw %}
````

{% Details %}
{% DetailsSummary %}
A brief summary goes here
{% endDetailsSummary %}

The body of the Details component goes here, and **can** contain markdown.

{% endDetails %}

The details shortcode also supports using headers in the summary.

````md
{% raw %}{% Details %}
{% DetailsSummary %}
### A normal heading goes here
{% endDetailsSummary %}

The body of the Details component goes here, and **can** contain markdown.

{% endDetails %}{% endraw %}
````

{% Details %}
{% DetailsSummary %}
### A normal heading goes here
{% endDetailsSummary %}

The body of the Details component goes here, and **can** contain markdown.

{% endDetails %}

````md
{% raw %}{% Details %}
{% DetailsSummary %}
### Details component summary
This is an optional preview. 
{% endDetailsSummary %}

This is the body of the Details component.
It **can** contain markdown.

```js
const bar = 'foo';
console.log(bar);
```
{% endDetails %}{% endraw %}
````

{% Details %}
{% DetailsSummary %}
### Details component summary
This is an optional preview. 
{% endDetailsSummary %}

This is the body of the Details component.
It **can** contain markdown.

```js
const bar = 'foo';
console.log(bar);
```
{% endDetails %}

## Asides
Use asides to provide information that's related to but distinct from the
content in the body of the post or codelab. Asides should generally be short—no
more than 2–3 lines.

There are several kinds of asides, each for a different purpose.

### Note asides

```md
{% raw %}{% Aside %}
Use the note aside to provide supplemental information.
{% endAside %}{% endraw %}
```

{% Aside %}
Use the note aside to provide supplemental information.
{% endAside %}

Asides can contain links and formatted text, including code.

````md
{% raw %}{% Aside %}
Here is some code:
```js
const foo = 'bar';
function() {
  console.log('hello world');
}
```

Here is a fancy [named markdown link][google].
{% endAside %}{% endraw %}

[google]: https://google.com
````

{% Aside %}
Here is some code:
```js
const foo = 'bar';
function() {
  console.log('hello world');
}
```

Here is a fancy [named markdown link][google].
{% endAside %}

[google]: https://google.com

### Caution asides

```md
{% raw %}{% Aside 'caution' %}
Use the caution aside to indicate a potential pitfall or complication.
{% endAside %}{% endraw %}
```

{% Aside 'caution' %}
Use the caution aside to indicate a potential pitfall or complication.
{% endAside %}

### Warning asides

```md
{% raw %}{% Aside 'warning' %}
The warning aside is stronger than a caution aside; use it to tell the reader
not to do something.
{% endAside %}{% endraw %}
```

{% Aside 'warning' %}
The warning aside is stronger than a caution aside; use it to tell the reader
not to do something.
{% endAside %}

### Success asides

```md
{% raw %}{% Aside 'success' %}
Use the success aside to describe a successful action or an error-free status.
{% endAside %}{% endraw %}
```

{% Aside 'success' %}
Use the success aside to describe a successful action or an error-free status.
{% endAside %}

### Gotchas asides

```md
{% raw %}{% Aside 'gotchas' %}
Use the gotcha aside to indicate a common problem that the reader wouldn't know
without specialized knowledge of the topic.
{% endAside %}{% endraw %}
```

{% Aside 'gotchas' %}
Use the gotchas aside to indicate a common problem that the reader wouldn't know
without specialized knowledge of the topic.
{% endAside %}

### Key-term asides

```md
{% raw %}{% Aside 'key-term' %}
Use the key-term aside to define a term that's essential to understanding an
idea in the body copy. Key-term asides should be a single sentence that
includes the term in italics. For example, "A _portal_ is…"
{% endAside %}{% endraw %}
```

{% Aside 'key-term' %}
Use the key-term aside to define a term that's essential to understanding an
idea in the body copy. Key-term asides should be a single sentence that
includes the term in italics. For example, "A _portal_ is…"
{% endAside %}

### Codelab asides

```md
{% raw %}{% Aside 'codelab' %}
Use the codelab aside to link to an associated codelab.
{% endAside %}{% endraw %}
```

{% Aside 'codelab' %}
Get started: [Measure your page performance with Lighthouse](#).
{% endAside %}

## Blockquotes
Use blockquotes to emphasize a quotation that's important to
the main idea of a post. (For example, in a case study you might include
a quotation from someone on the partner organization's management team.)

Always include a `<cite>` element indicating the quote's source
at the end of a block quote:

```html
<blockquote>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Proin dictum a massa sit amet ullamcorper.
  </p>
  <cite>
    Jon Doe
  </cite>
</blockquote>
```

<blockquote>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Proin dictum a massa sit amet ullamcorper.
  </p>
  <cite>
    Jon Doe
  </cite>
</blockquote>

## Buttons

In general, you shouldn't need to add buttons to your posts.
These buttons are shown for reference.

```html
<button class="material-button button-text color-primary">
  Text button
</button>
```

<button class="material-button button-text color-primary">
  Text button
</button>

<br>

```html
<button class="material-button button-filled color-bg bg-primary">
  Filled button
</button>
```

<button class="material-button button-filled color-bg bg-primary">
  Filled button
</button>

<br>

```html
<button class="material-button button-filled button-round color-bg bg-primary">
  Round button
</button>
```

<button class="material-button button-filled button-round color-bg bg-primary">
  Round button
</button>

## Code

developer.chrome.com uses the same syntax highlighter as web.dev.

See the [Code](https://web.dev/handbook/markup-code/) post for more details.

## Columns

Columns can be used to place elements side-by-side. This works well for
blocks of code or images. On mobile the columns will stack vertically.

```md
{% raw %}{% Columns %}

{% Column %}
{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/iuwBXAyKJMz4b7oRyIdI.jpg", alt="ALT_TEXT_HERE", width="380", height="240" %}
Original
{% endColumn %}

{% Column %}
{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/iuwBXAyKJMz4b7oRyIdI.jpg", alt="ALT_TEXT_HERE", width="380", height="240", params={flip: 'h'} %}
Flipped
{% endColumn %}

{% endColumns %}{% endraw %}
```

{% Columns %}

{% Column %}
{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/iuwBXAyKJMz4b7oRyIdI.jpg", alt="ALT_TEXT_HERE", width="380", height="240" %}
Original
{% endColumn %}

{% Column %}
{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/iuwBXAyKJMz4b7oRyIdI.jpg", alt="ALT_TEXT_HERE", width="380", height="240", params={flip: 'h'} %}
Flipped
{% endColumn %}

{% endColumns %}

````md
{% raw %}{% Columns %}

{% Column %} <!-- Include a newline to mix markdown with shortcodes -->

```js
// v1
const config = {
  foo: 'bar',
  baz: 'qux',
};
```

{% endColumn %}

{% Column %}

```js
// v2
const config = {
  up: 'down',
  left: 'right',
};
```

{% endColumn %}

{% endColumns %}{% endraw %}
````

{% Columns %}

{% Column %}

```js
// v1
const config = {
  foo: 'bar',
  baz: 'qux',
};
```

{% endColumn %}

{% Column %}

```js
// v2
const config = {
  up: 'down',
  left: 'right',
};
```

{% endColumn %}

{% endColumns %}

## Compare

```md
{% raw %}{% Compare 'better' %}
The right way to do something
{% endCompare %}

{% Compare 'worse' %};
Don't do it this way!
{% endCompare %}{% endraw %}
```

{% Compare 'better' %}
The right way to do something
{% endCompare %}

{% Compare 'worse' %}
Don't do it this way!
{% endCompare %}

### Compare with caption

```md
{% raw %}{% Compare 'worse' %}
Bad code example

{% CompareCaption %}
Explanation of why example is **bad**.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better' %}
Good code example

{% CompareCaption %}
Explanation of why example is **good**.
{% endCompareCaption %}

{% endCompare %}{% endraw %}
```

{% Compare 'worse' %}
Bad code example

{% CompareCaption %}
Explanation of why example is **bad**.
{% endCompareCaption %}

{% endCompare %}

{% Compare 'better' %}
Good code example

{% CompareCaption %}
Explanation of why example is **good**.
{% endCompareCaption %}

{% endCompare %}

### Compare with custom labels

To support localization all custom labels will need to be added to the
`site/_data/i18n/common.yml` file.

```yml
# site/_data/i18n/common.yml
compare_unhelpful:
  en: 'Unhelpful'

compare_helpful:
  en: 'Helpful'
```

```md
{% raw %}{% Compare 'worse', 'unhelpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}

{% Compare 'better', 'helpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}{% endraw %}
```

{% Compare 'worse', 'unhelpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}

{% Compare 'better', 'helpful' %}
Lorem ipsum dolor sit amet.
{% endCompare %}

### Compare with fenced code block

````md
{% raw %}{% Compare 'better' %}
```js
const x = 0;
```
{% endCompare %}

{% Compare 'worse' %}
```js
var x = 0;
```
{% endCompare %}{% endraw %}
````

{% Compare 'better' %}
```js
const x = 0;
```
{% endCompare %}

{% Compare 'worse' %}
```js
var x = 0;
```
{% endCompare %}

## Glitches {: #glitches }

### Create a Glitch

* Remix the [web-dev-hello-webpage](https://glitch.com/~web-dev-hello-webpage) or
  [web-dev-hello-express](https://glitch.com/~web-dev-hello-express) template.
* Click **Project options** and update the description of the Glitch.
* Update `README.md`.
* Update `package.json` (if it exists).
* Add the project to [the web.dev team on Glitch](https://glitch.com/@webdev).
* Set the avatar of the project to the [web.dev logo](https://cdn.glitch.com/9b775a52-d700-4208-84e9-18578ee75266%2Ficon.jpeg?v=1585082912878).

### Embed a Glitch

{% raw %}

```html
{% Glitch {
  id: 'tabindex-zero',
  path: 'index.html',
  previewSize: 0,
  allow: []
} %}

<!-- Or just the Glitch ID -->

{% Glitch 'tabindex-zero' %}
```

{% endraw %}

{% Glitch {
  id: 'tabindex-zero',
  path: 'index.html'
} %}

It's OK to adjust the `height` of the Glitch wrapper element
if you need more or less space.

Shortcode object fields allow for modifying how the embed is presented:

* {`string | string[]`} `allow?` List of feature policies of an IFrame either as an array of strings, or as a `;` separated list. By default the following policies are enabled:
  * `'camera', 'clipboard-read', 'clipboard-write', 'encrypted-media', 'geolocation', 'microphone', 'midi'`
* {`string`} `id` ID of Glitch project.
* {`string`} `path?` Lets you specify which source code file to show.
* {`number`} `previewSize?` Defines what percentage of the embed should be dedicated to the preview, default is 100.
* {`number`} `height?` Height, in pixels, of the Glitch wrapper element.

## Images

Images should always use the {% raw %}`{% Img %}`{% endraw %} shortcode. This
shortcode will be generated for you when you upload your image to our CDN.
See the [Add an image or video guide](https://developer.chrome.com/docs/handbook/how-to/add-media/) for upload instructions.

```md
{% raw %}{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/w9i7lEqGw5J5b3jx5fAu.jpg", alt="ALT_TEXT_HERE", width="800", height="450" %}{% endraw %}
```

{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/w9i7lEqGw5J5b3jx5fAu.jpg", alt="ALT_TEXT_HERE", width="800", height="450" %}

Images with a white background should use the `.screenshot` class to give
them a border so they don't appear to "float" on the page.

```md
{% raw %}{% Img src='image/BrQidfK9jaQyIHwdw91aVpkPiib2/TDNgfhI9byR4eeGQ0Xxv.png', alt='Screenshot', height="302", width="770", className="screenshot" %}{% endraw %}

<!-- Add the .screenshot--filled modifier to give the screenshot padding and a grey background. -->
{% raw %}{% Img src='image/BrQidfK9jaQyIHwdw91aVpkPiib2/TDNgfhI9byR4eeGQ0Xxv.png', alt='Screenshot', height="302", width="770", className="screenshot screenshot--filled" %}{% endraw %}
```

{% Img src='image/BrQidfK9jaQyIHwdw91aVpkPiib2/TDNgfhI9byR4eeGQ0Xxv.png', alt='Screenshot', height="302", width="770", className="screenshot" %}

<br>

{% Img src='image/BrQidfK9jaQyIHwdw91aVpkPiib2/TDNgfhI9byR4eeGQ0Xxv.png', alt='Screenshot', height="302", width="770", className="screenshot screenshot--filled" %}

### Full bleed images

Full bleed images break out of the main column.

```md
<div class="type--full-bleed">
{% raw %}{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/w9i7lEqGw5J5b3jx5fAu.jpg", alt="ALT_TEXT_HERE", width="800", height="450" %}{% endraw %}
</div>
```

<div class="type--full-bleed">
{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/w9i7lEqGw5J5b3jx5fAu.jpg", alt="ALT_TEXT_HERE", width="800", height="450" %}
</div>

### Inline images

To place an image inline with text use either the `.float-left` or `.float-right`
class.

```md
<!-- !important: note the commas after each property -->
{% raw %}{% Img
  className="float-right",
  src="image/foR0vJZKULb5AGJExlazy1xYDgI2/w9i7lEqGw5J5b3jx5fAu.jpg",
  alt="ALT_TEXT_HERE",
  width="800",
  height="450"
%}{% endraw %}
```

{% Img className="float-right", src="image/foR0vJZKULb5AGJExlazy1xYDgI2/w9i7lEqGw5J5b3jx5fAu.jpg", alt="ALT_TEXT_HERE", width="800", height="450" %}

Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint eaque iure eveniet
assumenda ea natus perspiciatis, atque totam fugit labore amet facere,
dignissimos sequi cumque repellat dolorum, quaerat voluptatibus sit!

## Lists
See the [Lists section of the Grammar, mechanics, and usage post](https://web.dev/handbook/grammar/#lists)
for information about when to use each list type.

Use standard Markdown syntax for lists: `1.` for ordered lists and `- `
for unordered lists.

### Ordered list

```md
1. Lorem ipsum dolor sit amet…
1. Lorem ipsum dolor sit amet…
1. Lorem ipsum dolor sit amet…
```

1. Lorem ipsum dolor sit amet…
1. Lorem ipsum dolor sit amet…
1. Lorem ipsum dolor sit amet…

### Unordered list

```md
- Lorem ipsum dolor sit amet…
- Lorem ipsum dolor sit amet…
- Lorem ipsum dolor sit amet…
```

- Lorem ipsum dolor sit amet…
- Lorem ipsum dolor sit amet…
- Lorem ipsum dolor sit amet…

## Tables

By default tables are only as wide as their content and are horizontally
centered.

```md
<table>
  <thead>
    <tr>
      <th>Person</th>
      …
    </tr>
  </thead>
  <tr>
    <td>Someone Lastname</td>
    …
  </tr>
</table>
```

<table>
  <thead>
    <tr>
      <th>Person</th>
      <th>Number</th>
      <th>Third Column</th>
    </tr>
  </thead>
  <tr>
    <td>Someone Lastname</td>
    <td>900</td>
    <td>Nullam</td>
  </tr>
  <tr>
    <td><a href="#">Person Name</a></td>
    <td>1200</td>
    <td>Vestibulum</td>
  </tr>
  <tr>
    <td>Another Person</td>
    <td>1500</td>
    <td>Vivamus</td>
  </tr>
  <tr>
    <td>Last One</td>
    <td>2800</td>
    <td>Morbi</td>
  </tr>
</table>

### Tables with borders

To give a table vertical borders add the `.with-borders` class.

```md
<table class="with-borders">
  <thead>
    <tr>
      <th>Person</th>
      …
    </tr>
  </thead>
  <tr>
    <td>Someone Lastname</td>
    …
  </tr>
</table>
```

<table class="with-borders">
  <thead>
    <tr>
      <th>Person</th>
      <th>Number</th>
      <th>Third Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Someone Lastname</td>
      <td>900</td>
      <td>Nullam</td>
    </tr>
    <tr>
      <td><a href="#">Person Name</a></td>
      <td>1200</td>
      <td>Vestibulum</td>
    </tr>
    <tr>
      <td>Another Person</td>
      <td>1500</td>
      <td>Vivamus</td>
    </tr>
    <tr>
      <td>Last One</td>
      <td>2800</td>
      <td>Morbi</td>
    </tr>
  </tbody>
</table>

### Tables with tinted header

To give a table a tinted header add the `.with-heading-tint` class.

```md
<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Person</th>
      …
    </tr>
  </thead>
  <tr>
    <td>Someone Lastname</td>
    …
  </tr>
</table>
```

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Person</th>
      <th>Number</th>
      <th>Third Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Someone Lastname</td>
      <td>900</td>
      <td>Nullam</td>
    </tr>
    <tr>
      <td><a href="#">Person Name</a></td>
      <td>1200</td>
      <td>Vestibulum</td>
    </tr>
    <tr>
      <td>Another Person</td>
      <td>1500</td>
      <td>Vivamus</td>
    </tr>
    <tr>
      <td>Last One</td>
      <td>2800</td>
      <td>Morbi</td>
    </tr>
  </tbody>
</table>

### Tables with a caption

To give a table a caption add a `<caption>` element.

```md
<table>
  <caption>Tables can have captions now.</caption>
  <thead>
    <tr>
      <th>Person</th>
      …
    </tr>
  </thead>
  <tr>
    <td>Someone Lastname</td>
    …
  </tr>
</table>
```

<table>
  <caption>Tables can have captions now.</caption>
  <thead>
    <tr>
      <th>Person</th>
      <th>Number</th>
      <th>Third Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Someone Lastname</td>
      <td>900</td>
      <td>Nullam quis risus eget urna mollis ornare vel eu leo.</td>
    </tr>
    <tr>
      <td><a href="#">Person Name</a></td>
      <td>1200</td>
      <td>Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.</td>
    </tr>
    <tr>
      <td>Another Person</td>
      <td>1500</td>
      <td>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.</td>
    </tr>
    <tr>
      <td>Last One</td>
      <td>2800</td>
      <td>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</td>
    </tr>
  </tbody>
</table>

### Full width tables

To make a table take up the full width add the `width-full` class.

```md
<table class="width-full">
  <thead>
    <tr>
      <th>Person</th>
      …
    </tr>
  </thead>
  <tr>
    <td>Someone Lastname</td>
    …
  </tr>
</table>
```

<table class="width-full">
  <thead>
    <tr>
      <th>Person</th>
      <th>Number</th>
      <th>Third Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Someone Lastname</td>
      <td>900</td>
      <td>Nullam quis risus eget urna mollis ornare vel eu leo.</td>
    </tr>
    <tr>
      <td><a href="#">Person Name</a></td>
      <td>1200</td>
      <td>Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.</td>
    </tr>
    <tr>
      <td>Another Person</td>
      <td>1500</td>
      <td>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.</td>
    </tr>
    <tr>
      <td>Last One</td>
      <td>2800</td>
      <td>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</td>
    </tr>
  </tbody>
</table>

### Non-overflowing tables

By default all tables will `overflow-x` on small screens in order to be
responsive. To prevent this from happening add the `fixed-table` class.

```md
<!-- Resize your screen and compare this table to the one above it. -->
<table class="fixed-table width-full">
  <thead>
    <tr>
      <th>Person</th>
      …
    </tr>
  </thead>
  <tr>
    <td>Someone Lastname</td>
    …
  </tr>
</table>
```

<table class="fixed-table width-full">
  <thead>
    <tr>
      <th>Person</th>
      <th>Number</th>
      <th>Third Column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Someone Lastname</td>
      <td>900</td>
      <td>Nullam quis risus eget urna mollis ornare vel eu leo.</td>
    </tr>
    <tr>
      <td><a href="#">Person Name</a></td>
      <td>1200</td>
      <td>Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.</td>
    </tr>
    <tr>
      <td>Another Person</td>
      <td>1500</td>
      <td>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.</td>
    </tr>
    <tr>
      <td>Last One</td>
      <td>2800</td>
      <td>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</td>
    </tr>
  </tbody>
</table>

## Video

Videos should always use the {% raw %}`{% Video %}`{% endraw %} shortcode. This
shortcode will be generated for you when you upload your video to our CDN.
See the [Add an image or video guide](https://developer.chrome.com/docs/handbook/how-to/add-media/) for upload instructions.

```md
{% raw %}{% Video src='video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mp4' %}{% endraw %}
```

{% Video src="video/foR0vJZKULb5AGJExlazy1xYDgI2/vkRVf2txsBrzkFUMpolP.mp4" %}

{% Aside %}
Note that the video `src` property can either be a string or an array of strings
for multiple sources.
{% endAside %}

See the [Add an image or video guide](https://developer.chrome.com/docs/handbook/how-to/add-media/).

## YouTube

Use the {% raw %}`{% YouTube %}`{% endraw %} shortcode to embed a YouTube video.

```md
{% raw %}{% YouTube id="qPD2yc8BoDk" %}

<!-- You can pass an optional start time as well -->
{% YouTube id="qPD2yc8BoDk", startTime="1678" %}{% endraw %}
```

{% YouTube id="qPD2yc8BoDk" %}
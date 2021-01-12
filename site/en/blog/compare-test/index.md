---
title: Compare Widget
description: Testing the compare widget.
layout: 'layouts/blog-post.njk'
date: 2021-01-12
hero: 'image/BrQidfK9jaQyIHwdw91aVpkPiib2/EnMzOm0mBytBA3AzlCG6.png'
alt: Delete this file.
---

This file will be deleted before the PR is submitted, but will be merged with
the appropriate docs.

## Compare

```md
!!!.compare.compare--better
The right way to do something
!!!

!!!.compare.compare--worse
Don't do it this way!
!!!
```

!!!.compare.compare--better
The right way to do something
!!!

!!!.compare.compare--worse
Don't do it this way!
!!!

### Compare with with caption

```md
!!!.compare.compare--better
You could put an image here.
!!!.compare--caption
this is the better way to do it.
!!!
```

!!!.compare.compare--better
You could put an image here.
!!!.compare--caption
this is the better way to do it.
!!!

### Compare with fenced code block

```md
!!!.compare.compare--better
```js
const x = 0;
\```
!!!.compare--caption
this is the better way to do it.
!!!
```

!!!.compare.compare--better
```js
const x = 0;
```
!!!.compare--caption
this uses `compare--better`.
!!!

!!!.aside.aside--warning
If you include a fenced code block in the compare widget, you **must** include
`.compare--caption`, otherwise the widget won't close.
!!!


Today, we're happy to announce a revamp of the developer.chrome.com
documentation site. Google Chrome was originally released in 2008, and this
domain dates from about the same time—with the last major update back in 2012.



yes.

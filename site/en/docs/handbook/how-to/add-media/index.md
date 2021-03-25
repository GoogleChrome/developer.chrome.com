---
layout: 'layouts/doc-post.njk'
title: Add an image or video
description: 'Upload media to our CDN.'
date: 2020-10-23
updated: 2021-03-11
---

## Navigate to the media uploader

Visit [the image uploader page](https://chrome-gcs-uploader.web.app/) and
sign-in using your Google corporate account. Note that this page only allows
Googlers access, so signing in with a personal account will fail.

{% Aside 'caution' %}
There are different uploaders for developer.chrome.com and web.dev:
* [developer.chrome.com uploader](https://chrome-gcs-uploader.web.app/)
* [web.dev uploader](https://web-dev-uploads.web.app/uploader)
{% endAside %}

## Choose a file

Upload a high quality image (jpg or png if you need alpha transparency). Our
image CDN will handle converting the image to webp if the browser supports it
and it will resize the image so you don't have to.

- Drag one or more files to the **Drop files here!** area
- Click **Upload**

A preview of the image or video with a shortcode snippet will appear. It should
look something like this:

```md
{% raw %}{% Img src="image/foR0vJZKULb5AGJExlazy1xYDgI2/ZOR0at2oFXeasz6jKylI.jpg", alt="ALT_TEXT_HERE", width="380", height="240" %}{% endraw %}
```

- Click the copy button to copy the snippet to your clipboard 📋

## Paste!

Paste the copied code from the previous step into your article.

Be sure to replace the text that says "ALT_TEXT_HERE" with your own description
of the image. You can read more about writing effective alt text over on [the
web.dev handbook](https://web.dev/handbook/inclusion-and-accessibility/#use-inclusive-images).

{% Aside %}
You may notice that the generated code is using either the
{% raw %}`{% Img %}`{% endraw%} or {% raw %}`{% Video %}`{% endraw%} shortcodes.
These are custom components for `developer.chrome.com` that ensure our media is
responsive 📱
{% endAside %}

### Properties

The `{% raw %}`{% Img %}`{% endraw%}` and `{% raw %}`{% Video %}`{% endraw%}`
shortcodes accepts many named arguments. Below are interfaces for both
shortcodes. Each property of the interface is a named argument that can be used
in the shortode.

#### Img Properties (`ImgArgs`)

```typescript
{% include '../../../../../../types/site/_shortcodes/img.d.ts' %}
```

The `{% raw %}`{% Img %}`{% endraw%}` `params` object exposes the entire [Imgix
API](https://docs.imgix.com/apis/rendering) to you. For example, if you wanted
to use the [flip API](https://docs.imgix.com/apis/rendering/rotation/flip) to flip
an image on its horitonzal axis you would do:

```md
{% raw %}{% Img 
  src="image/foR0vJZKULb5AGJExlazy1xYDgI2/iuwBXAyKJMz4b7oRyIdI.jpg",
  alt="ALT_TEXT_HERE",
  width="380",
  height="240",
  params={flip: 'h'}
%}{% endraw%}
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

{% Aside %}
Please call out in a review if you're calling a specific Imgix API, so we can be
aware of custom use-cases and potentially support them through our own shortcode
directly.
{% endAside %}

#### Video Properties (`VideoArgs`)

```typescript
{% include '../../../../../../types/site/_shortcodes/video.d.ts' %}
```

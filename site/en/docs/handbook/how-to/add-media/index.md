---
layout: 'layouts/doc-post.njk'
title: Add an image or video
description: 'Upload media to our CDN.'
date: 2020-10-23
---

## Navigate to the media uploader

Visit [the image uploader page](https://chrome-gcs-uploader.web.app/) and
sign-in using your Google corporate account. Note that this page only allows
Googlers access, so signing in with a personal account will fail.

## Choose a file

- Click **Choose file** and select either an image or a video to upload.
- Click **Upload**

A button with a hashed image or video url will appear. It should look something
like this:

```md
{% raw %}{% img 'image/foR0vJZKULb5AGJExlazy1xYDgI2/1603484068246.jpg' , 'ALT TEXT HERE' %}{% endraw %}
```

- Click the button to copy the snippet to your clipboard 📋

## Paste!

Paste the copied code from the previous step into your article.

Be sure to replace the text that says "ALT TEXT HERE" with your own description
of the image. You can read more about writing effective alt text over on [the
web.dev handbook](https://web.dev/handbook/inclusion-and-accessibility/#use-inclusive-images).

You may notice that the generated code is using either the
{% raw %}`{% img %}`{% endraw%} or {% raw %}`{% video %}`{% endraw%} shortcodes.
These are custom components for `developer.chrome.com` that ensure our media is
responsive 📱

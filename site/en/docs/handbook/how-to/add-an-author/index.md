---
layout: 'layouts/doc-post.njk'
title: Add an author
description: 'Add an author to a post.'
date: 2020-12-07
---

## Add an Author

- Follow the [guide to uploading
  media](/docs/handbook/how-to/add-media/#navigate-to-the-media-uploader) to upload your profile
  photo to our image CDN.
    - Images should be square and less than 5Mb.
- After the image is uploaded, copy the src, it should look like this: `image/foR0vJZKULb5AGJExlazy1xYDgI2/1603484068246.jpg`.
- Open `site/_data/authorsData.json` and add a new entry to the bottom of the file. You can copy this one as a starting point. If you don't have one of the social properties you can omit it.

```json
"robdodson": {
  "name": {
    "given": "Rob",
    "family": "Dodson"
  },
  "org": {
    "name": "Google",
    "unit": "Developer Relations"
  },
  "descriptions": {
    "en": "Describe yourself. This text will appear next to your photo on posts."
  },
  "country": "US",
  "homepage": "https://robdodson.me",
  "twitter": "rob_dodson",
  "github": "robdodson",
  "glitch": "robdodson",
  "image": "image/foR0vJZKULb5AGJExlazy1xYDgI2/hdnOUruuCIijvnGWvleC.jpg"
}
```
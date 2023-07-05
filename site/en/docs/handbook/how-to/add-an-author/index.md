---
layout: 'layouts/doc-post.njk'
title: Add an author
description: 'Add an author to a post and edit their information'
date: 2020-12-07
updated: 2022-04-15
---

## Add someone to the authors list

1. Add a new object to [`authors.yaml`](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/i18n/authors.yaml) with the following structure. Make sure to choose a unique author slug.


   ```yml
   authorslug:
     title:
       en: Full Name
     description:
       en: A relevant description about yourself you'd like to share.
     bio:
       en: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed mollis ipsum. Morbi porta hendrerit neque, eu pretium enim pulvinar vel. Aliquam in leo eu est rutrum tincidunt et ac arcu. Vestibulum nec lorem ut elit tincidunt faucibus sit amet aliquam arcu. Nulla vestibulum fermentum velit, id rhoncus dui blandit vel.
   ```


   You can add multiple paragraphs to your author bio by structuring it as a list.


   ```yml
     bio:
       en:
        - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed mollis ipsum. Morbi porta hendrerit neque, eu pretium enim pulvinar vel. Aliquam in leo eu est rutrum tincidunt et ac arcu. Vestibulum nec lorem ut elit tincidunt faucibus sit amet aliquam arcu. Nulla vestibulum fermentum velit, id rhoncus dui blandit vel.
        - Aliquam eu lorem ac orci consequat faucibus. Cras in orci maximus justo lobortis mollis. Nam volutpat dictum quam. Integer vitae tincidunt est. Quisque fermentum eget lectus a vulputate. Nam blandit urna sed magna lobortis, feugiat volutpat lacus scelerisque.
   ```

   You can add multiple titles and descriptions to your author data for each language that is supported by using the [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code for that language.

   There is no need to duplicate the English version to the other locales, as the translation process automatically falls back.

   ```yml
   authorslug:
     title:
       en: Full Name
       es: Nombre completo
     description:
       en: A relevant description about yourself you'd like to share.
       es: Una descripción relevante traducida por Google sobre usted que le gustaría compartir.
     bio:
       en: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed mollis ipsum. Morbi porta hendrerit neque, eu pretium enim pulvinar vel. Aliquam in leo eu est rutrum tincidunt et ac arcu. Vestibulum nec lorem ut elit tincidunt faucibus sit amet aliquam arcu. Nulla vestibulum fermentum velit, id rhoncus dui blandit vel.
       es: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed mollis ipsum. Morbi porta hendrerit neque, eu pretium enim pulvinar vel. Aliquam in leo eu est rutrum tincidunt et ac arcu. Vestibulum nec lorem ut elit tincidunt faucibus sit amet aliquam arcu. Nulla vestibulum fermentum velit, id rhoncus dui blandit vel.
   ```

2. If you want links to your online accounts to appear in your author lookup add a new object to [`authorsData.json`](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/authorsData.json) with the following structure. Make sure to use the same author slug used in the [`authors.yaml`](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/i18n/authors.yaml).

   ```json
   "jaimiesmith": {
     "twitter": "jaimiesmith",
     "github": "jaimiesmith",
     "glitch": "jaimiesmith",
     "mastodon": "https://status.me/@jaimiesmith",
     "linkedin": "jaimiesmith",
     "webdev": "jaimiesmith",
     "homepage": "https://jaimiesmithis.cool/"
   }
   ```

{% Aside %}
When you add an author, the author profile won't show on the [relevant page](/authors) immediately. You have to associate some content with the profile to see any changes to the authors' page.
{% endAside %}

## Create a profile image

1. Follow the [Images and video](/docs/handbook/how-to/add-media/) guide to upload your photo to the CDN.

2. The image uploader will return a shortcode. Copy the `src` value from the
   shortcode and use it as the `image` value in your profile in the [`authorsData.json`](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/authorsData.json).

   ```json
   "jaimiesmith": {
     "twitter": "jaimiesmith",
     "github": "jaimiesmith",
     "glitch": "jaimiesmith",
     "homepage": "https://jaimiesmithis.cool/",
     "image": "image/foR0vJZKULb5AGJExlazy1xYDgI2/ZOR0at2oFXeasz6jKylI.jpg"
    }
   ```
## Create a featured card

This featured card will be displayed on the author profile page. The following properties are available:

- `title` - the title of the card, like an event's name or a post's title.
- `summary` - a description or short summary.
- `thumbnail` - the thumbnail of the card.
- `eyebrowText` - the keyword to introduce the type of card.
- `eyebrowIcon` - the icon to introduce the type of card, such as star, articles, blog, etc. The default value is star. 
- `url` - the url for the page the card is previewing.
- `alt` - an alt text for image. If no thumbnail is provided, this can be null.
- `theme` - the theme colours of the card. Theme colours available - tertiary, quaternary, pink, dark, and blue. The default theme is quaternary.

1. If you want to set an internal post to be a featured post, copy the post URL and use it as the `url` value for the `featuredPost` key in your profile in the [`authorsData.json`](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/authorsData.json). It will automatically fetch the all data from the post URL, but also allow an author to override the detail, such as title, eyebrow, thumbnail, alt, and summary.

    ```json
    "paulkinlan": {
      "homepage": "https://paul.kinlan.me/",
      "twitter": "paul_kinlan",
      "github": "PaulKinlan",
      "glitch": "PaulKinlan",
      "dcc": "paulkinlan",
      "mastodon": "https://status.kinlan.me/@paul",
      "linkedin": "https://uk.linkedin.com/in/paulkinlan",
      "image": "image/T4FyVKpzu4WKF1kBNvXepbi08t52/0O1ZGr2P0l9oTKabyUK5.jpeg",
      "featuredPost": {
        "url": "/blog/insider-dec-22"
      }
    }
    ```

    <figure>
      {% Img src="image/SZHNhsfjU9RbCestTGZU6N7JEWs1/ZhyxiWaJzb5jnFlbER1F.png", alt="the featured post", width="800", height="348" %}
    </figure>

2. If you want to customise the detail of the featured post, you can specify the title, eyebrow, thumbnail, alt, summary, and theme in the [`authorsData.json`](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/authorsData.json) with the following structure. 

    ```json
    "paulkinlan": {
      "homepage": "https://paul.kinlan.me/",
      "twitter": "paul_kinlan",
      "github": "PaulKinlan",
      "glitch": "PaulKinlan",
      "dcc": "paulkinlan",
      "mastodon": "https://status.kinlan.me/@paul",
      "linkedin": "https://uk.linkedin.com/in/paulkinlan",
      "image": "image/T4FyVKpzu4WKF1kBNvXepbi08t52/0O1ZGr2P0l9oTKabyUK5.jpeg",
      "featuredPost": {
        "url": "/googleio22-recap/",
        "eyebrowText": "Learn",
        "eyebrowIcon": "mortarboard",
        "title": "A simple TODO list using HTML5 WebDatabases",
        "thumbnail": "image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/9WSNd3mdbXACF19ELKJ1.png",
        "summary": "This tool by Josh W Comeau makes it super simple to create nice looking gradients.",
        "alt": "HTML5 text on the black background",
        "theme": "quaternary"
      }
    }
    ```

## Show posts from other platforms on the author page

The author page can show posts from other platforms if they are available via RSS feed.
To do so, add an `external` key to the author in the [`authorsData.json`](https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/_data/authorsData.json), using the
following structure:

```json
  "paulkinlan": {
    "external": [
      {
        "label": "paul.kinlan.me",
        "type": "rss",
        "url": "https://paul.kinlan.me/index.xml"
      }
    ]
  },
```

The only supported type for now is `rss`. The label will be shown as an eybrow in the post card.
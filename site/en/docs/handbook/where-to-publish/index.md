---
title: Where to publish your content
subhead: Is this documentation, a blog post, or an article?
layout: 'layouts/doc-post.njk'
date: 2022-05-19
---

This guide explains the different types of content hosted on this site, and how to choose where your content should be placed. 

{% Aside %}
Right now, there is still a mixture of all these things in the blog. New content should follow the below guidelines, and we're working to tidy up the rest.
{% endAside %}

## Reference documentation 

In [/docs](/docs/) you will find various sections of reference documentation. If the content you are creating is the main reference material for an API, or part of the documentation for a product such as DevTools, it should live here.

If you are launching a new API then the reference documentation should be placed under `/docs/web-platform`. See [this information](/docs/handbook/web-platform/) for help in structuring this reference.

{% Aside %}
[Reference documentation](https://documentation.divio.com/reference/) should not include announcements, or tutorials. Create a companion blog post for the annlouncement of a new API, or a tutorial under `/articles` for this information.
{% endAside %}

## Blog posts

[Blog](/blog/) posts are _news_. They are time bound, and likely to go out of date. This includes announcements, posts about releases, and so on. We want to be able to assume that, other than correcting errors, things in the blog do not need updating. If you intend to update this content when things change, there is a better location for it.

If the thing mentioned in your blog post changes, then post a new blog post to alert developers to the updates, rather than update an old post, which will get very little visibility and is potentially confusing.

## Articles

Content placed in [articles](/articles/) should be considered _evergreen_. We might revisit and update it as things change. This should be engaging developer focused content, and include [tutorials](https://documentation.divio.com/tutorials/), [explanations](https://documentation.divio.com/explanation/), and [how-tos](https://documentation.divio.com/how-to-guides/). 

## Example

On launching a new API as an origin trial. Create:

- Reference documentation under `/docs`.
- A short blog post announcing the origin trial, and linking to the documentation.
- Optionally, a tutorial under `/articles` showing how to use the new API to build something, or solve a common use case.

If there are then significant changes to the API. Update the documentation, and the article if needed, then post a new blog post explaining the changes. 

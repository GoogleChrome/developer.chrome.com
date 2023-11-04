---
title: Web platform docs
layout: 'layouts/doc-post.njk'
date: 2022-05-06
---

## Metadata {: #metadata }

Web Platform documentation should follow the conventions outlined in the [Add a Doc][add-a-doc] guide.

The `toc.yml` file that defines the table of contents structure is located at `site/_data/docs/web-platform/toc.yml`.
Link your new doc in this file in the appropriate category. If your doc moves between Origin and Developer Trials,
and when it ships, make a PR to update this file to move it in the list.

The following is a suggested outline when documenting a new Origin or Developer Trial.
As the intention is for new web platform features to ultimately be documented over on [MDN][mdn],
use the same conventions as described in the [MDN guide to writing API docs][mdn-guide] where possible.

{% Aside %}
Once you have written your docs, or if there has been a big change to the feature, write a [quick blog post][blog] to let developers know.
The blog post shouldnt repeat these docs, but could share the latest news, or demonstrate part of the feature with a tutorial,
then link to the docs for all the details.
{% endAside %}

## Outline

```md

Intro paragraph explaining briefly what this API is for.

## Current status

Add information about status, and how developers can try out the API.

## Use cases

Change the heading above to make sense for your content,
however here you can add a short explanation,
and the core use cases for the API.

## Interfaces

Describe each interface that is part of the API
using a description list format.

`interfaceName`
: Short description.

## Examples

Code snippets should be included here to show the basic use of the API.

## Demo

If you have a demo hosted elsewhere,
add a short description and link out to it.

## Feedback

How should developers offer feedback?

## Useful links

Include links to the spec, explainer,
Chrome Status, MDN, and so on.

```

## Origin trials we are no longer persuing

If the origin trial is abandoned, then move the documentation to the section under `- title: i18n.docs.web-platform.not-persuing` in `toc.yml`.
Then remove information about signing up for the trial from the documentation.

[add-a-doc]: /docs/handbook/how-to/add-a-doc/
[mdn]: https://developer.mozilla.org/docs/Web/API
[mdn-guide]: https://developer.mozilla.org/docs/MDN/Contribute/Howto/Write_an_API_reference
[blog]: /docs/handbook/how-to/add-a-blog-post/

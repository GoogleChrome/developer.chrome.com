---
layout: "layouts/doc-post.njk"
title: "Quality Guidelines"
date: 2022-11-01
---

1. An extension must have a single purpose that is narrow and easy to understand. Do not create an extension that requires users to accept bundles of unrelated functionality. If two pieces of functionality are clearly separate, they should be put into two different extensions, and users should have the ability to install and uninstall them separately. Common violations include:

    1. Functionality that displays product ratings and reviews, but also injects ads into web pages.

    1. Toolbars that provide a broad array of functionality or entry points into services are better delivered as separate extensions, so that users can select the services they want.

    1. Email notifiers combined with a news aggregator.

    1. PDF converters which also aim to change a user’s default search engine.

See [this FAQ][faq] for more information.

[faq]: /docs/extensions/mv2/single_purpose/
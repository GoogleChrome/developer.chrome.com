---
layout: "layouts/doc-post.njk"
title: "Quality Guidelines"
date: 2022-11-01
updated: 2023-05-30
---

1. An extension must have a single purpose that is narrow and easy to understand. Do not create an extension that requires users to accept bundles of unrelated functionality. If two pieces of functionality are clearly separate, they should be put into two different extensions, and users should have the ability to install and uninstall them separately. Common violations include:

    1. Functionality that displays product ratings and reviews, but also injects ads into web pages.

    1. Toolbars that provide a broad array of functionality or entry points into services are better delivered as separate extensions, so that users can select the services they want.

    1. Email notifiers combined with a news aggregator.

    1. PDF converters which also aim to change a user’s default search engine.

2. When designing an extension, it's important to ensure it functions as a helpful companion to users' browsing experiences by providing complementary functionality. If utilizing a persistent user interface, extensions should actively enhance the user's current task while causing minimal distractions. Some common violations include:

    1. Side panel extensions which hijack a user’s browsing or search experience. 

    1. Extensions with the primary purpose of serving ads.

See [this FAQ][faq] for more information.

[faq]: /docs/extensions/mv2/single_purpose/
---
layout: "layouts/doc-post.njk"
title: "Manifest - Homepage Url"
seoTitle: "Manifest V2 - Homepage Url [Deprecated]"
date: 2013-05-12
updated: 2018-04-26
description: Reference documentation for the homepage_url property of manifest.json.
---

{% Aside 'warning' %}
You're viewing the deprecated Manifest V2 version of this article. See [Manifest V3 - Manifest homepage Url](/docs/extensions/mv3/manifest/homepage_url/) for the MV3 equivalent.

The Chrome Web Store no longer accepts Manifest V2 extensions. Follow the [Manifest V3 Migration guide](/docs/extensions/migrating) to convert your extension to Manifest V3.

{% endAside %}

The URL of the homepage for this extension. The extensions management page (chrome://extensions)
will contain a link to this URL. This field is particularly useful if you [host the extension on
your own site][1]. If you distribute your extension using the [Chrome Web Store][2], the homepage
URL defaults to the extension's own page.

[1]: /docs/extensions/mv2/hosting
[2]: https://chrome.google.com/webstore

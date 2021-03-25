---
layout: 'layouts/doc-post.njk'

# The page title. This appears at the top of the doc and as the page name
# in Google Search.
title: Welcome

# This appears below the title and is an optional teaser
subhead: 'Learn about developing extensions for Chrome.'

# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in 
# Google Search.
description: 'Documentation for Chrome extensions developers.'

# The publish date
date: 2020-11-09

# An optional updated date
# updated: 2020-10-16

# A list of authors. These usernames correspond to the keys in the
# _data/authorsData.json file.

---

These pages contain guides and reference information for developers who want to
create extensions for the Chrome browser. If you're not sure where to begin,
have a look at the following starting pages:

* [What are extensions?](/docs/extensions/mv3/overview/) to help you understand just what an extension is.
* The [Getting started tutorial](/docs/extensions/mv3/getstarted/) if you're ready for hello, world.

Beyond that, you might find useful entry points in these pages:

* Learn the scope of things in the [Extension development overview](/docs/extensions/mv3/devguide/)
* Pick something from the [samples page](/docs/extensions/???), install it, and start hacking on it.
* Look for answers in the [Extensions FAQ page](/docs/extensions/mv3/faq/)

{% if process.env.HAS_MV3 %}
{% Aside %}
Now that Manifest V3 has launched, we've changed the default documentation to
be for MV3. If you are maintaining a legacy Manifest V2 extension, see the [MV2
documentation](/docs/extensions/mv2).	
{% endAside %}
{% else %}
{% Aside %}
With Manifest V3 launching soon, we've changed the default documentation
experience to be for MV3. The [Manifest V2 documentation](/docs/extensions/mv2)
is still available.
{% endAside %}
{% endif %}

In addition to the documentation here, many developers find helpful community content at:

* The [Chromium extensions](https://groups.google.com/a/chromium.org/g/chromium-extensions) Google Group.
* The Stack Overflow [google-chrome extension](https://stackoverflow.com/tags/google-chrome-extension/info) tag.

Thank you for being a member of the extension developer community. We're glad you are here!

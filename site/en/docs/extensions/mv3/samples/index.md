---
layout: "layouts/doc-post.njk"
title: "Samples"
seoTitle: "Chrome Extension examples"
date: 2020-12-11
updated: 2023-02-03
description: Intro to extension examples GitHub repository 
---

## Overview {: #overview }

The [Extensions sample GitHub
repository][gh-samples] provides examples of extensions that address various use cases and call appropriate Chrome
APIs. Use these to learn how extensions work or as a starting point for building your own extensions.

## Browse by category {: #categories }

The examples are currently located under the following directories:

[api-samples/][gh-api]
: Extensions designed to demonstrate the capabilities of a specific API. For example, the [Action API example][gh-action] showcases extension UI elements such as the popup, tooltip, and badges among others. 

[functional-samples/sample...][gh-functional-samples]
: Complete extensions that implement all the basic features for a given purpose.

[functional-samples/tutorial...][gh-functional-samples]
: Examples covered in the [tutorials][gs-tutorials]. A few examples include [Tabs manager][tut-tabs-man], [Focus mode][tut-fm], and [Reading time][tut-rt].

[functional-samples/cookbook...][gh-functional-samples]
: Examples demonstrating a particular concept.

[functional-samples/reference...][gh-functional-samples]
: Examples linked to documentation on this site.

{% Details %}
{% DetailsSummary %}
💡 **TIP**: How can I find examples of a particular API quickly?
{% endDetailsSummary %}

To find all examples of a specific Chrome API use Github's search engine to look for "chrome.NAME_OF_API" in this repository. The following example searches for all uses of "chrome.tabs":

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/2OW6hjG5RLoupNCzZk8u.png", alt="Searching for chrome.tabs in the extension Github repository", width="800", height="122", class="screenshot screenshot--filled"  %}  <figcaption>
<code>Chrome.tabs</code> search in the extension Github repository.
  </figcaption>
</figure>

{% endDetails %}

## Try them out {: #testing }

To test these examples in your local machine, follow these steps:

1. Clone the repository.
1. Navigate to the directory of the extension you want to try.
1. [Load your extension locally][dev-basics-locally].

Many samples have a `README.md` with instructions on how the extension works. (We are working to add READMEs to all samples.)
Read the instructions carefully; each extension is different. For example, some extensions run by clicking on the extension icon, while others run automatically but only run on specific sites. 

## Contributing samples {: #collaborating }

If you encounter any problems with an example, let us know by [posting an issue][gh-issues]. If you want to submit a new extension, check out the [Contributing Guide][gh-contributing] to find out how to submit a new example to this collection.

[dev-basics-locally]: /docs/extensions/mv3/getstarted/development-basics/
[gh-action]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/action
[gh-api]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples
[gh-contributing]: https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/CONTRIBUTING.md
[gh-issues]: https://github.com/GoogleChrome/chrome-extensions-samples/issues
[gh-samples]: https://github.com/GoogleChrome/chrome-extensions-samples
[gh-functional-samples]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples
[gs-tutorials]: /docs/extensions/mv3/getstarted/#tutorial
[tut-fm]: /docs/extensions/mv3/getstarted/tut-focus-mode/
[tut-rt]: /docs/extensions/mv3/getstarted/tut-reading-time/
[tut-tabs-man]: /docs/extensions/mv3/getstarted/tut-tabs-manager/

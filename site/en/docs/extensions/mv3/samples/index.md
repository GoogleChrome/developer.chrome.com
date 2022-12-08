---
layout: "layouts/doc-post.njk"
title: "Samples"
seoTitle: "Chrome Extension examples"
date: 2022-12-12
# updated: 2021-07-22
description: Intro to extension examples GitHub repository 
---

## Overview {: #overview }

The [Extensions sample GitHub
repository][gh-samples] aims to provide examples of extensions that address various use cases and call appropriate Chrome
APIs. Use these to learn how extensions work or as a starting point for building your own extensions.

## Choose a category {: #categories }

The examples are currently located under the following directories:

[api/][gh-api]
: Includes extensions that demonstrate the capabilities of a specific API.

[examples/][gh-examples]
: a complete extension that implements all the basic features for a given purpose.

[tutorials/][gh-tutorials]
: this folder contains examples of how to build an extension over a series of steps. For example: Tabs manager, Focus mode, Reading time, etc.

{% Details %}
{% DetailsSummary %}
💡 **TIP**: Find an example quickly.
{% endDetailsSummary %}

To find a particular example of a Chrome API in the repository, search the repository for "chrome._API_". The following example looks for all uses of "chrome.tabs":

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/2OW6hjG5RLoupNCzZk8u.png", alt="Searching for chrome.tabs in the extension Github repository", width="800", height="122", class="screenshot screenshot--filled"  %}  <figcaption>
Chrome.tabs search in the extension Github repository
  </figcaption>
</figure>



{% endDetails %}

## Try them out {: #testing }

To test these examples in your local machine, follow these steps

1. Clone the repository.
1. Navigate to the directory of the extension you want to try.
1. [Load your extension locally][dev-basics-locally].

Each extension example includes a `README.md` with detailed instructions on how the extension works.
Read it carefully; each extension is different. For example, some extensions run by clicking on the extension icon, others run automatically but only run specific sites, among others. 

{% Aside %}

💡 **TIP**: Extensions cannot run on chrome://extensions, so make sure you navigate to another page before testing an extension. 

{% endAside %}



## Contributing {: #collaborating }

If you encounter any problems with an example, let us know by [posting an issue][gh-issues]. If you want to submit a new extension, check out the [Contributing Guide][gh-contributing] to find out how to submit a new example to the collection.

[gh-issues]: https://github.com/GoogleChrome/chrome-extensions-samples/issues
[gh-examples]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/examples
[gh-tutorials]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/tutorials
[gh-api]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api
[gh-samples]: https://github.com/GoogleChrome/chrome-extensions-samples
[dev-basics-locally]: /docs/extensions/mv3/getstarted/development-basics/
[gh-contributing]: https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/CONTRIBUTING.md
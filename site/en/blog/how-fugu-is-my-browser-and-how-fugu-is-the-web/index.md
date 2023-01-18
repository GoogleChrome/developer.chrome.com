---
layout: 'layouts/blog-post.njk'
title: 'Discovering the capable web'
subhead: >
  What advanced web capabilities does your browser support? And what are the web apps that make use
  of these capabilities? To answer these questions, check out a browser testing site and a browser
  extension.
date: 2023-01-18
# updated: 2023-01-18
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/8FZcBmFowbDKWxpkOytx.jpg
alt: Blowfish swarm swimming in the ocean.
authors:
  - thomassteiner
tags:
  - capabilities
---

Project Fugu is a cross company effort to close gaps in the web's capabilities, enabling new classes
of applications to run on the web. More concretely, this means adding new APIs to browsers that app
developers can use to enable previously impossible use cases. What APIs does your browser of choice
support? What web applications make use of these APIs? Let's find out!

## How Fugu is my browser?

Project Fugu APIs such as [File Handling](/articles/file-handling/),
[File System Access](/articles/file-system-access/),
[Async Clipboard](https://web.dev/async-clipboard/), and [Web Share](https://web.dev/web-share/)
have brought capabilities to the web that you might expect only to be possible in platform-specific
apps. For example, you can now double-click an image file so it opens in an associated PWA, make
modifications, save the changes back to the file, and then copy the image contents over into another
app or share it to an email client. This is a flow that wasn't possible on the web until recently.

To learn what is possible, check out the application
[How Fugu is my browser?](https://howfuguismybrowser.dev/) and see what Project Fugu APIs your
browser of choice supports. Not all features are exposed on all platforms—for example, the
[Contact Picker API](/articles/contact-picker/) is currently only exposed on mobile—so it's
technically impossible to reach a score of 100% if you test on desktop (and vice versa). Therefore,
regard this test as a playful competition rather than absolute science. For each tested feature,
there's a link to the relevant documentation so you can learn more about the feature. Where feature
detection is possible, there is also a note on whether the feature is supported by your browser or
not, and finally
[page load statistics linked to Chrome Status](https://chromestatus.com/metrics/feature/timeline/popularity)
that tell you how popular over time a given feature is.

If your browser supports the Web Share API, you can share how Fugu your browser is by clicking the
**Share** button right next to the Fugu fish and the progress bar. Else, you can download a
screenshot, and then share it manually on your online social network of choice.

<figure>
  {% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/8z3ZhxPAq5NxfXEss1XS.png", alt="The site at https://howfuguismybrowser.dev/.", width="800", height="649" %}
  <figcaption>
    Have you ever wondered: "<a href="https://howfuguismybrowser.dev/">How Fugu is my browser?</a>"
  </figcaption>
</figure>

## How Fugu is the web?

The companion browser extension named
[How Fugu is the web?](https://chrome.google.com/webstore/detail/how-fugu-is-the-web/apcghpabklkjjgpfoplnglnjghonjhdl)
will help you to find out which Fugu APIs are used by the sites you are visiting. Install this
extension from the Chrome Web Store and browse the web, then notice how the Fugu fish counter on
some sites displays a badge with the detected Project Fugu APIs. For example, if you browse to
[Excalidraw](https://excalidraw.com/), the counter jumps to 9, since Excalidraw uses nine detectable
Project Fugu APIs. These are:

1. [CacheStorage](https://developer.mozilla.org/docs/Web/API/CacheStorage)
1. [Service Worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)
1. [Web Share](https://web.dev/web-share/)
1. [Async Clipboard](https://web.dev/async-clipboard/)
1. [Async Clipboard (Images)](https://web.dev/async-clipboard/)
1. [File System Access](/articles/file-system-access/)
1. [Web Share Target](/articles/web-share-target/)
1. [Web Share Target (Files)](/articles/web-share-target/)
1. [File Handling](/articles/file-handling/)

<figure>
  {% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/nqW8WRlqQap8cY7sFxRw.png", alt="The extension 'How Fugu is the Web' invoked on the site https://excalidraw.com/.", width="800", height="676" %}
  <figcaption>
    Have you ever wondered: "<a href="https://chrome.google.com/webstore/detail/how-fugu-is-the-web/apcghpabklkjjgpfoplnglnjghonjhdl">How Fugu is the web?</a>"
  </figcaption>
</figure>

As before, you can **Share** the results directly if your browser supports the Web Share API, or
manually if not. To see if your browser supports a feature, read the relevant documentation by
clicking on **Details**. You can also directly check out the relevant source code snippet by
clicking on the source code link in the bullet list.

## Conclusions

When browsing the web with the
[How Fugu is the Web?](https://chrome.google.com/webstore/detail/how-fugu-is-the-web/apcghpabklkjjgpfoplnglnjghonjhdl)
extension installed, it is impressive to see how often the Project Fugu API badge appears. This
ranges from pages with comfort features like being able to paste images into an app like, for
example, in
[GitHub's New Issue page](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)
(instead of uploading them as a less comfortable option), to full-blown apps that make use of
several features such as file handling, file system access, and clipboard access, as in
[Excalidraw](https://excalidraw.com/). Where previously a platform-specific app was required, in
some cases now a web application can fill in. An example of such is [Wooting](https://wooting.io/)'s
[Wootility](https://wootility.io/) app for programming gaming keyboards with the
[WebHID API](/articles/hid/).

Similarly, running [How Fugu is my browser?](https://howfuguismybrowser.dev/) on each new version of
your browser of choice (or just any other browser or embedded WebView) is very satisfying. With
with almost every new browser release, the progress bar moves up a little when your browser has
gained a new capability or two.

Building for the web is more viable than ever, and new features keep being added to the platform at
an amazing pace. The web is not your only choice for building an app, but I hope with this testing
site and the browser extension I have convinced you to give the [capable web](/blog/fugu-showcase/)
a second look if you have not considered it so far.

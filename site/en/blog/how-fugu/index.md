---
layout: 'layouts/blog-post.njk'
title: How Fugu is my browser and how Fugu is the Web?
subhead: >

date: 2022-06-28
# updated: 2022-06-28
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/8FZcBmFowbDKWxpkOytx.jpg
alt: Blowfish swarm swimming in the ocean.
tags:
  - capabilities
---

{% Aside %} This is part two of a two part mini series on the capable web. Be sure to also read
[Why not everyone's building for the web yet, but why potentially they should](/building-for-the-web/)!
{% endAside %}

## How Fugu is my browser?

Given all the reasons (and counterarguments) listed in my previous article
[Why not everyone's building for the Web yet, but why they should](/blog/building-for-the-web/) why
companies are currently _not_ building for the Web, why should you? My hypothesis is that many
developers and executives alike don't realize how capable the modern Web has become. Double-clicking
an image file so it opens in an associated PWA, making some modifications, saving the changes back
to the file and then copying the image contents over into another app or sharing it to an email
client is a flow that wasn't possible on the Web before, but which APIs developed in the context of
[Project Fugu](/blog/fugu-status/) 🐡 like the [File Handling API](https://web.dev/file-handling/),
the [File System Access API](https://web.dev/file-system-access/), the
[Async Clipboard API](https://web.dev/async-clipboard/), and the
[Web Share API](https://web.dev/web-share/) have made possible.

Yes, in many cases the Web can do that! I have developed a test application with the tongue-in-cheek
name [How Fugu is my browser?](https://howfuguismybrowser.dev/) that you can take for a spin to see
what Project Fugu APIs your browser of choice supports. Since not all features are exposed on all
platforms, for example, the [Contact Picker API](https://web.dev/contact-picker/) is currently only
exposed on mobile, it's technically impossible to reach a score of 100% if you test on desktop (and
vice versa), so take it more like a playful competition than absolute science. For each tested
feature, there's a link to the relevant documentation so you can learn more about the feature. Where
feature detection is possible, there is also a note whether the feature is supported by your browser
or not, and finally
[page load statistics linked to Chrome Status](https://chromestatus.com/metrics/feature/timeline/popularity)
that tell you how popular over time a given feature is.

If your browser supports it, you can share how Fugu your browser is by clicking the **Share** button
right next to the Fugu fish and the progress bar.

<figure>
  {% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/8z3ZhxPAq5NxfXEss1XS.png", alt="Screenshot of the site https://howfuguismybrowser.dev/.", width="800", height="649" %}
  <figcaption>
    Have you ever wondered: "<a href="https://howfuguismybrowser.dev/">How Fugu is my browser?</a>"
  </figcaption>
</figure>

## How Fugu is the Web?

Knowing how Fugu your browser is is only half of the equation. Equally interesting is knowing how
Fugu the Web is. To find an answer to this question, I have developed a browser extension with an
equally tongue-in-cheek name that is
[How Fugu is the Web](https://chrome.google.com/webstore/detail/how-fugu-is-the-web/apcghpabklkjjgpfoplnglnjghonjhdl).
When you install this extension from the Chrome Web Store and browse the Web, you will notice the
Fugu fish counter on some sites display a badge with the detected Project Fugu APIs. For example, if
you browse to [Excalidraw](https://excalidraw.com/), the counter jumps to 9, since Excalidraw uses
nine detectable Project Fugu APIs, namely
[Cache Storage](https://developer.mozilla.org/docs/Web/API/CacheStorage),
[Service Worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API),
[Web Share](https://web.dev/web-share/), [Async Clipboard](https://web.dev/async-clipboard/),
[Async Clipboard (Images)](https://web.dev/async-clipboard/),
[File System Access](https://web.dev/file-system-access/),
[Web Share Target](https://web.dev/web-share-target/),
[Web Share Target (Files)](https://web.dev/web-share-target/), and
[File Handling](https://web.dev/file-handling/). Again you can see if your browser supports the
feature and click through to documentation by clicking on **Details**, and also directly check out
the relevant source code snippet by clicking on the source code link in the bullet list.

<figure>
  {% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/nqW8WRlqQap8cY7sFxRw.png", alt="The extension 'How Fugu is the Web' invoked on the site https://excalidraw.com/.", width="800", height="676" %}
  <figcaption>
    Have you ever wondered: "<a href="https://chrome.google.com/webstore/detail/how-fugu-is-the-web/apcghpabklkjjgpfoplnglnjghonjhdl">How Fugu is the web?</a>"
  </figcaption>
</figure>

## Conclusions

After browsing the Web for a while with the
[How Fugu is the Web extension](https://chrome.google.com/webstore/detail/how-fugu-is-the-web/apcghpabklkjjgpfoplnglnjghonjhdl)
installed, it is impressive how often the Project Fugu API badge appears. This ranges from pages
with comfort features like being able to paste images into an app like, for example, in
[GitHub's New Issue page](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue)
(instead of uploading them as a less comfortable option) to full-blown apps that make use of several
features like file handling, file system access, clipboard access, etc. as in
[Excalidraw](https://excalidraw.com/). Where before a platform-specific app was required, in some
cases now a Web application can fill in. An example of such is [Wooting](https://wooting.io/)'s
[Wootility](https://wootility.io/) app for programming gaming keyboards with the
[WebHID API](https://web.dev/hid/).

Similarly, running [How Fugu is my browser](https://howfuguismybrowser.dev/) on each new version of
your browser of choice is very satisfying, since with almost every new browser release the progress
bar moves up a little and your browser has gained a new capability or two.

Building for the Web is more viable than ever, and new features keep being added to the platform at
an amazing pace. The Web is not your only choice for building your app, but I hope with this article
I have convinced you to give The Capable Web a second look if you have dismissed it so far. It has
come a long way.

{% Aside %} This is part two of a two part mini series on the capable web. Be sure to also read
[Why not everyone's building for the web yet, but why they should](/blog/building-for-the-web/)!
{% endAside %}

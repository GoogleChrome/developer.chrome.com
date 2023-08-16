---
title: "Bringing Safety check to the chrome://extensions page"
description: "Starting in Chrome 117, Chrome will proactively highlight to users when an extension they have installed is no longer in the Chrome Web Store."  
layout: "layouts/blog-post.njk"
authors:
  - oliverdunk
date: 2023-08-16
hero: 'image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/329ywsqucWkau6asTLR4.jpg'
alt: Padlocks on a railing.
tags:
  - extensions-news
---

Starting in Chrome 117, Chrome will proactively highlight to users when an extension they have installed is no longer in the Chrome Web Store. This is limited to three specific cases:

- The extension has been unpublished by the developer.
- The extension has been taken down for violating Chrome Web Store policy.
- The item was marked as malware.

We have designed this change to keep the ecosystem safe for users while limiting the chances that this will impact genuine extensions. If an issue is resolved, the notification is automatically cleared. The notification will not be displayed for an extension when the developer has been [notified of a possible violation][violation-notification] and has been given time to address the issue or appeal.

Users are most likely to encounter this feature in the "Privacy and security" section of the settings page.

<figure>
  {% Img src="image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/QgVuPAOzxISY05yD7cND.png", alt="Chrome will highlight these extensions in the Privacy and security settings", width="800", height="537", class="screenshot" %}
  <figcaption>
  Chrome will highlight these extensions in the "Privacy and security" settings.
  </figcaption>
</figure>

When a user clicks "Review", they will be taken to their extensions and given the choice to either remove the extension or hide the warning if they wish to keep the extension installed. As in previous versions of Chrome, extensions marked as malware are automatically disabled.

<figure>
  {% Img src="image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/gd6k7qB6YZNSiU6Bdc4l.png", alt="Two extensions that are no longer present in the Chrome Web Store show on the chrome://extensions page", width="800", height="537", class="screenshot" %}
  <figcaption>
  Two extensions that are no longer present in the Chrome Web Store show on the chrome://extensions page.
  </figcaption>
</figure>

As mentioned, we hope this change will help to keep the ecosystem safe without impacting genuine extensions.

If you have any feedback, we'd love to hear. Consider posting in the [chromium-extensions][mailing-list] mailing list where we'll be looking out for your thoughts.

---

_Photo by [Nicolás Flor][unsplash-credit] on [Unsplash][unsplash]_
  
[violation-notification]: https://developer.chrome.com/docs/webstore/review-process/#warning
[mailing-list]: https://groups.google.com/a/chromium.org/g/chromium-extensions
[unsplash-credit]: https://unsplash.com/@nicolassflorr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
[unsplash]: https://unsplash.com/photos/hOWxbQAuC00?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText

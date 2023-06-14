---
title: "Design a superior user experience with the new Side Panel API"
description: "Introducing the new Side Panel API for Chrome extensions."  
layout: "layouts/blog-post.njk"
authors:
  - oliverdunk
  - amysteam
date: 2023-05-30
hero: 'image/BhuKGJaIeLNPW9ehns59NfwqKxF2/UnBAJwan7EQbuFS3xHwW.jpg'
alt: 'A side panel extension open on Side Panel reference page'
tags:
  - extensions-news
---

A year ago, in May 2022, we added the side panel to Chrome. This is a new companion surface that allows users to use tools alongside the content they are browsing. Today, we're excited to announce that your extension can start showing content in the side panel, beginning in Chrome 114.

<figure>
  {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/OU9486fAP8Dqgrs83L39.png", alt="A dictionary extension that shows the definition of a selected word", width="800", height="537", class="screenshot" %}
  <figcaption>
  A dictionary extension that shows the definition of a selected word. See the <a href="https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.sidepanel-dictionary">code</a> in the chrome-extensions-samples repository.
  </figcaption>
</figure>

## Better for users, easier for developers {: #experience }

We've already seen many developers implement sidebar-like experiences into their extension, which is
why we're thrilled to make it a platform standard. With the new [Side Panel API][api-sidepanel], you
can now offer a persistent UI that opens alongside a page that the user is visiting. Users will
benefit from consistent positioning and layout between extensions. In addition, the ability to show
UI without requesting host permissions is a significant privacy win for users, with the added
benefit of reducing the number of warnings that show for your extension at install time.

The [Side Panel API][api-sidepanel] eliminates the headaches associated with injecting content into
an untrusted page. It also significantly reduces the requirement for maintaining compatibility
across different sites and sifting through bug reports about accidental disruptions caused by your
extension.

## A companion to users across the web {: #web-companion}

When building a new side panel experience as part of your extension, you need to keep one thing in
mind: how are you assisting users to complete tasks across the web? Here are a few questions you
should consider:

How does my side panel help the user?
: The [single-purpose][policy-single-purpose] policy also applies to your side panel. Make sure that your side panel provides functionality that directly relates to the rest of your extension and what the user is trying to achieve.

Does my side panel only appear when it's relevant?
: The [Side Panel API][sp-by-site] lets you choose which sites your users will see the side panel on. This way you can avoid showing it when it isn't relevant to the user or it isn't related to the content the user is browsing.

Is the design consistent with the rest of my extension?
: Your side panel should have a visually appealing design that matches the logo, colors, icons, and fonts of your extension and store listing. This provides users a consistent, recognizable experience wherever they are using your extension.

How do users discover my side panel?
: Let new users know how to use your side panel by providing sufficient documentation or training within the extension. This will help you retain users and avoid bad reviews in your store listing. Remember, you can start to teach users before they install the extension by including a [YouTube video][cws-graphics] that shows how your extension works in your store listing!

We've also updated our [Program Policies][cws-policies], with updates to our [Best Practices][cws-best-practices] and [Quality Guidelines][cws-quality] sections to reflect some of these considerations. These changes highlight that your side panel should act as a helpful companion to users' browsing experiences by providing complementary functionality. They also make it clear that your side panel shouldn't have unnecessary distractions.

## An overview of the API {: #overview }

For your extension to appear in the side panel, request the `"sidePanel"` permission in your [manifest][doc-manifest], and add the `"side_panel"` key with a `"default_path"` pointing to a page within your extension:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "permissions": [
    "sidePanel"
  ]
  ...
}
```

On a side panel page, you can load scripts and call extension APIs as you would on any other
extension page. The icon for your side panel will be taken from your [extension's
icon][manifest-icon] - don't forget to set that for an extra bit of polish.

## Extra capabilities {: #capabilities }

You can link the side panel to your action icon, so it can be easily opened at any time:

{% Label %}service-worker.js:{% endLabel %}

```js
await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
```

If you'd only like your side panel to show up on specific pages, you can control that, and prevent
it from appearing elsewhere where it is not relevant to the user:

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (!tab.url) return;

  const url = new URL(tab.url);

  if (url.origin === 'https://example.com') {
    chrome.sidePanel.setOptions({ tabId, path: 'sidepanel.html', enabled: true });
  } else {
    chrome.sidePanel.setOptions({ tabId, enabled: false });
  }
});
```

## Learn more {: #explore }

We've published the [Side Panel API][api-sidepanel] documentation which you can start reading today. We've also added [samples][gh-sidepanel-samples] to the chrome-extensions-samples repository, which is a great place to see how the API can be used in practice.

As mentioned, our policy pages and best practices have also been revised to share more about how to build a side panel that provides the best experience for your users.

You can keep up with Chrome extension news by visiting our [What's new page][whats-new], and if you have questions or need help with the Side Panel API, you can visit the [Chromium extensions][chromium-groups] Google Group.


---

_Photo by [Vardan Papikyan][unsplash-vardan] on [Unsplash][unsplash]_
  
[api-sidepanel]: /docs/extensions/reference/sidepanel
[chromium-groups]: https://groups.google.com/a/chromium.org/g/chromium-extensions
[cws-best-practices]: /docs/webstore/program-policies/best-practices/
[cws-graphics]: /docs/webstore/cws-dashboard-listing/#graphic-assets
[cws-policies]: /docs/webstore/program-policies/
[cws-quality]: /docs/webstore/program-policies/quality-guidelines/
[doc-manifest]: /docs/extensions/mv3/manifest/
[gh-sidepanel-dictionary]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.sidepanel-dictionary
[gh-sidepanel-samples]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/
[manifest-icon]: /docs/extensions/mv3/manifest/icons/
[policy-single-purpose]: /docs/extensions/mv3/single_purpose/
[sp-by-site]: https://developer.chrome.com/docs/extensions/reference/sidePanel/#by-site
[unsplash-vardan]: https://unsplash.com/@timberfoster?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
[unsplash]: https://unsplash.com/photos/lSegRSDBMLw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
[whats-new]: /docs/extensions/whatsnew/

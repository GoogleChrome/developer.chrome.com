---
layout: 'layouts/doc-post.njk'
title: 'Extension user journey'
seoTitle: 'User journey of extensions users'
date: 2023-09-11
description: >
  Guidance on providing a successful onboarding user experience.
---

A well-designed extension user journey can prevent users from uninstalling your extension because "It doesn't do anything". This article describes how to provide clear instructions and a sense of what to expect during the onboarding process. It also includes a few tips for launching new features and collecting useful feedback when users uninstall your extension. 

## Set expectations before installation {: #before-install }

Make sure the description, screenshots, and promo video of your store listing demonstrates what your extension does, how it works and what service it provides. See [Creating a great listing][cws-great-listing] for best practices.

## Minimize initial permissions {: #minimal-perms }

Some users can become wary when bombarded with too many confusing permissions right away. We recommend requesting the most essential permissions first and during onboarding [explain why you need certain permissions](#explain-perms).


<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/VVyazEJTquUP7aa6OZn0.png", alt="Extension permission warnings on installation", height="269", width="386" %}
  <figcaption>
    An extension requesting too many initial permissions
  </figcaption>
</figure>

When you locally loaded an extension it doesn't display warnings. [View warning][view-warning] explains how to test these warnings.

## Onboarding {: #onboarding }

### Opening an onboarding page {: #onboarding-open }

When the user first installs your extension, listen for the [`runtime.onInstalled()`][runtime-oninstalled] event and open a new page to begin the onboarding flow.

{% Label %}service-worker.js:{% endLabel %}

```javascript
chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "onboarding.html"
    });
  }
});
```

### Welcome users 

Start with a friendly welcome page that explains the extension's purpose. Design it in a way that matches the icons and colors used in the store listing to help users become familiar with your brand.

### How-to guidance

Provide clear guidance on how to use your extension. Such as, opening the side panel, pinning the extension, locating the popup, or refreshing tabs that are already opened to ensure the extension runs on those pages.

If your extension needs to access local files loaded on the browser or run on incognito mode, provide users guidance on how to manually grant the [extension access][allow-access]. 

Another approach is an interactive walkthrough or short video that showcases the main features. Don't forget to offer a way to opt out for users that want to start using it right away.

### Personalize the extension {: #explain-perms }

A way to customize the extension. This can include granting permissions gradually to enable additional features or showing where to find the settings page. 

The [permissions API][api-perms] allows you to request permissions gradually. This way, you can explain in user-friendly terms why the extension needs to run on specific sites or require further access. 



Allow users to explore your extension without requiring an account. And later guide them to create an account if required for advanced features.





Once the user understands, they can accept all permissions or customize the sites they want the extension to run on.

{% Aside %}
This is not available for the host permissions declared under [content scripts][cs-manifest] in the manifest.
{% endAside %}


## Promoting new features {: #upgrade }

<!-- What -->
Announce new features to your users
<!-- Why -->
Remind them of your extension
Increase engagement, adoption of new features
<!-- How -->
The following code demonstrates how to open a new page when you release an update. This way, you can showcase new features to your users:

{% Label %}service-worker.js:{% endLabel %}

```javascript
chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'update') {
    chrome.tabs.create({
      url: "new-features.html"
    });
  }
});
```

## Asking for feedback upon removal {: #uninstall }

If a user decides to uninstall the extension, you can find out why by opening a page with a survey when they uninstall. The following code uses [`runtime.setUninstallURL()`][runtime-uninstall] to set this URL on install.

{% Label %}service-worker.js:{% endLabel %}

```javascript
chrome.runtime.onInstalled.addListener({reason} => {
  if (reason === 'install' ) {
    chrome.runtime.setUninstallURL('https://example.com/extension-survey');
  }
});
```

[access-local-incognito]: /docs/extensions/mv3/declare_permissions/#allow_access
[allow-access]: /docs/extensions/mv3/declare_permissions/#allow_access
[api-perms]: /docs/extensions/reference/permissions
[cs-manifest]: /docs/extensions/mv3/manifest/content_scripts/
[cws-great-listing]: /docs/webstore/best_listing/
[perm-warn]: https://developer.chrome.com/docs/extensions/mv3/permission_warnings/
[runtime-oninstalled]: /docs/extensions/reference/runtime/#event-onInstalled
[runtime-uninstall]: /docs/extensions/reference/runtime/#method-setUninstallURL
[view-warning]: /docs/extensions/mv3/permission_warnings/#view_warnings
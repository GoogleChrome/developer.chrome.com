---
layout: 'layouts/doc-post.njk'
title: 'Onboarding users'
seoTitle: 'Designing an onboarding experience for extensions users'
date: 2023-09-11
description: >
  Guidance on providing a successful onboarding user experience and more.
---

A well-designed extension onboarding can reduce the number of users abandoning your extension
because "It doesn't do anything". In this article we provide guidance for designing an onboarding
experience that will increase user retention. It also describes how you can onboard existing users
to new features and collect useful feedback when users remove the extension.

## Set expectations before installation {: #before-install }

Help users know if your extension is a right fit for them even before installing your extension. A great way to communicate this is by including a detailed description, accurate screenshots, and a short demo video. For more tips on optimizing your store listing, see [Creating a great listing][cws-great-listing].

## Minimize initial permissions {: #minimal-perms }

Some users can become wary when bombarded with too many confusing permissions right away. To build trust, we recommend requesting the most essential permissions first and later during onboarding [explain why you need certain permissions](#trust).

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/VVyazEJTquUP7aa6OZn0.png", alt="Extension permission warnings on installation", height="269", width="386" %}
  <figcaption>
    An extension requesting too many initial permissions
  </figcaption>
</figure>

When you load an extension locally it doesn't display any warnings. See [View warning][view-warning] to learn how to preview the warnings that are shown to the user when they install your extension.

## Onboard users {: #onboarding }

When the user first installs your extension you can listen for the [`runtime.onInstalled()`][runtime-oninstalled] event and open a new page to begin the onboarding flow. See an [sample code here][runtime-install-example].

Here are some ideas on what to include in your onboarding flow. 

### Welcome users {: #welcome }

Start with a friendly welcome page that explains the extension's purpose. Design it in a way that matches the icons and colors used in the store listing to help users become familiar with your brand.

### Customization {: #customize }

- Ask a few questions to customize their extension and onboarding experience. This way, you can demonstrate the value of your extension and how it can solve their specific problem.

They can always go later to the settings page where they can update their preferences. Ensure that this page is both easy to find and user-friendly.

### Explain how it works {: #works }

Educate users on how to use your extension by helping them become familiar with a new interface. For example, show them how to open the side panel, pin the extension, or locate the popup.

Another fun way to explain key functionalities is through an interactive walkthrough or guided tour. Don't forget to offer a way to opt out for users who want to start using it right away.

### Build trust {: #trust }

Building trust helps users stick around long enough to find out what's great about your extension. Here's a few practical ways to accomplish this:

- **Explain permissions**&mdash; The [permissions API][api-perms] allows you to request permission
at runtime. By explaining why certain permissions are necessary to use your extension, you can
help your users understand the reasons behind each request and build trust.

- **Allow exploration without account creation**&mdash; Another way to build trust is to let users
test your extension immediately without the need for account creation. Once they recognize its
value, you can introduce additional features that require an account.

- **Be transparent about user data usage**&mdash; Transparency is key in building trust with your users. Clearly communicate how user data is collected, stored, and used by your extension both in your [privacy policy][cws-privacy-policy] and in the [Data Usage][cws-data-usage] declaration in the developer dashboard. Ensure that your privacy policy is accurate and up-to-date outlining all the ways the data is handled.

## New feature onboarding {: #upgrade }

Onboarding existing users to new features can encourage users to reengage and adopt new
features. When a new feature is released, you can inform users about the latest updates through the extension listen for the reason `"update"` in [runtime.onInstalled()][api-runtime]. See a [code example here][runtime-update-example].

## Follow-up upon removal {: #removal }

If a user decides to uninstall the extension, you can find out why by opening a survey page when
they remove the extension. This way, you can collect valuable feedback to continue improving your
extension. See [Runtime API usage][runtime-remove-example] for a code example.

[access-local-incognito]: /docs/extensions/mv3/declare_permissions/#allow_access
[allow-access]: /docs/extensions/mv3/declare_permissions/#allow_access
[api-perms]: /docs/extensions/reference/permissions
[api-runtime]: /docs/extensions/reference/runtime/
[cs-manifest]: /docs/extensions/mv3/manifest/content_scripts/
[cws-great-listing]: /docs/webstore/best_listing/
[perm-warn]: https://developer.chrome.com/docs/extensions/mv3/permission_warnings/
[runtime-install-example]: /docs/extensions/reference/runtime/#example-install
[runtime-remove-example]: /docs/extensions/reference/runtime/#example-uninstall-url
[runtime-uninstall]: /docs/extensions/reference/runtime/#method-setUninstallURL
[runtime-update-example]: /docs/extensions/reference/runtime/#example-update
[view-warning]: /docs/extensions/mv3/permission_warnings/#view_warnings
[cws-data-usage]: /docs/webstore/cws-dashboard-privacy/#certify-your-data-use-practices
[cws-privacy-policy]: /docs/webstore/publish/#setup-a-developer-account
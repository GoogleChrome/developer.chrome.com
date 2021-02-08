---
layout: "layouts/doc-post.njk"
title: Using Inline Installation
date: 2018-06-12
description: How to use inline installations.
---

{% Aside 'warning' %}
As of 06/12/2018, inline installation is deprecated. For more information, read our
[Chromium Blog post][1] and [Migration FAQ][2].
{% endAside %}

Once you've [published][3] your app or extension, you may be wondering how users will find and
install your app. For users who browse the Chrome Web Store and find your item, its a very easy
one-click process to install it. However, if a user is already on your site, it can be cumbersome
for them to complete the installation - they would need to navigate away from your site to the
store, complete the install process, and then return.

As of Google Chrome 15, you can initiate app and extensions installations "inline" from your site.
These apps and extensions are still hosted in the Chrome Web Store, but users no longer have to
leave your site to install them.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iOr6LOVuZYykpCTpthlq.png", alt="Inline installation dialog", height="241", width="401" %}

When users install the app, they
will see an installation confirmation dialog similar to the one pictured on right. Just like the
dialog displayed when installing directly from the Chrome Web Store, it lists all of the permissions
that your app or extension is requesting. Additionally, this dialog includes the average Chrome Web
Store rating and the number of users, giving users extra confidence about what they are about to
install.

## Overview

Inline installation is composed of two parts: a declarative `<link>` tag and a call to the
JavaScript function `chrome.webstore.install()`. In addition, you must also verify an association
between the site that triggers inline installation and the relevant item(s) in the Chrome Web Store.

## Adding a Chrome Web Store link

The HTML page on your site from which you want inline installation to occur must contain one or more
`<link>` tags in the `<head>` section referencing the items that the user can install. Each `<link>`
tag must have the following format:

```html
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/itemID">
```

The URL in the `<link>` tag must be exactly as specified above, except that you should replace
`_itemID_` with the actual ID value for your item. To determine the ID value for a specific item, go
to the [Chrome Developer Dashboard][4] and click the name of the relevant app or extension. The ID
value for that item will be shown in the browser address bar; it is a string of 32 Latin characters
at the end of the URL in the address bar. Do not use the URL in the address bar as the URL in the
`<link>` tag (the URL in the address bar uses a new format that includes the app name–this new
format does not work for inline installation). Instead, copy the ID value from the URL in the
address bar and paste the ID value into the URL specified in the `<link>` tag above.

As an example, the `<link>` tag for the [Google Drive][5] app would look like this:

```html
<link rel="chrome-webstore-item"
    href="https://chrome.google.com/webstore/detail/apdfllckaahabafndbhieahigkjlhalf">
```

## Triggering inline installation

To actually begin inline installation, the
`chrome.webstore.install(_url_, _successCallback_, _failureCallback_)` function must be called. This
function can only be called in response to a user gesture, for example within a click event handler;
an exception will be thrown if it is not. The function can have the following parameters:

* url (optional string)
  * If you have more than one `<link>` tag on your page with the `chrome-webstore-item` relation, you
    can choose which item you'd like to install by passing in its URL here. If it is omitted, then the
    first (or only) link will be used. An exception will be thrown if the passed in URL does not exist
    on the page.
* successCallback (optional function)
  * This function is invoked when inline installation successfully completes (after the dialog is shown
    and the user agrees to add the item to Chrome). You may wish to use this to hide the user interface
    element that prompted the user to install the app or extension.
* failureCallback (optional function)
  * This function is invoked when inline installation does not successfully complete. Possible reasons
    for this include the user canceling the dialog, the linked item not being found in the store, or the
    install being initiated from a non-verified site. The callback is given a failure detail string as a
    parameter. You may wish to inspect or log that string for debugging purposes, but you should not
    rely on specific strings being passed back.

## User interface elements for inline installation

One of the key concepts behind inline installation is that it allows you, the app developer, to
choose when to prompt the user to install the app or extension. If the item is critical to your
site, you may wish to have a modal dialog or other distinctive noticeable user interface element for
prompting the user. If the item only provides secondary functionality, inline installation may be
hidden away on a secondary page of your site.

Since inline installation has to be triggered via a user gesture (for example, a mouse click) it is
therefore suggested that you tie the action to a clickable user interface element such as a button.
It is suggested that you use the same button label as the Chrome Web Store itself (in English, this
is "Add to Chrome").

## Checking if an item is already installed

You may wish to only show user interface elements that prompt the user to install the item if it's
not already installed.

To check if an app is already installed, you can use the [`chrome.app.isInstalled`][6] property. By
querying it from a page contained within your app's [URLs][7], you can show or hide interface
elements as appropriate. For example:

```html
<button onclick="chrome.webstore.install()" id="install-button">Add to Chrome</button>
<script>
if (chrome.app.isInstalled) {
  document.getElementById('install-button').style.display = 'none';
}
</script>
```

Extensions can [communicate][8] with the embedding page via content scripts to let it know that they
are already installed. For example, you could have a content script that targets the installation
page:

```js
var isInstalledNode = document.createElement('div');
isInstalledNode.id = 'extension-is-installed';
document.body.appendChild(isInstalledNode);
```

Then your installation page can check for the presence of that DOM node, which signals that the
extension is already installed:

```js
<button onclick="chrome.webstore.install()" id="install-button">Add to Chrome</button>
<script>
if (document.getElementById('extension-is-installed')) {
  document.getElementById('install-button').style.display = 'none';
}
</script>
```

## Verified site requirement

For security reasons, inline installations can only be initiated by a page on a site that is
[verified][9] (via [Webmaster Tools][10]) as being associated with that item in the Chrome Web
Store. Note that if you verify ownership for a domain (for example, `http://example.com`) you can
initiate inline installation from any subdomain or page (for example, `http://app.example.com` or
`http://example.com/page.html`). We may revoke your app or extension's ability to use Inline
Installation if we detect any association with deceptive practices, including deceptive ads and
landing pages, or installation patterns that suggest user confusion.

## Enforcement FAQ

**Why are we disabling inline installation for certain extensions?**
Inline installation is a powerful distribution mechanism that offers users a smoother experience
installing Chrome extensions and helps developers reach more users. While the vast majority of
developers have used this feature as intended, we have seen instances where an inline installation
has been paired with ads and landing pages that confuse and mislead users into installing extensions
they may not want. In response to this, we [launched][11] our inline installation enforcement effort
in September 2015, which we updated in March 2016.

**What happens when inline installation is disabled?**
When an extension's inline installation is disabled, attempts to trigger inline installation for
your extension will result in a redirect to your item's Chrome Web Store listing. Inline
installation enforcement does not result in removal of your extension from the Chrome Web Store.
Users will still be able to access and install your extension through the Chrome Web Store. Repeated
abuse of inline installation, however, may lead to further enforcement actions.

Starting in July 2017, inline installation may also be selectively disabled for malicious or
deceptive webpage leading to your extension, on a per-install basis. When inline installation is
disabled in this way, it will not affect other inline installations of the same extension
originating from non-deceptive sources.

**Will I know if my inline installation has been disabled?**
If inline installation has been disabled at the extension level, you will receive an alert to
developer email account. If inline installation is disabled at the installation level, due to a
deceptive or malicious installation context and not the extension itself, the developer will receive
not receive an alert.

**What are the criteria for disabling inline installation?**
The Chrome Web Store has two separate processes that govern inline installation. The first is run
completely by an automated enforcement system. This system regularly scans all extensions hosted on
the Chrome Web Store and tracks various signals associated with potential abuse of the inline
installation mechanism. These signals include anomalous installations patterns and user complaints.
Inline installation is automatically disabled for an extension when it significantly exceeds the
typical values for these inline installation abuse metrics.

In January 2018, we updated our automated enforcement systems to incorporate additional signals and
disable deceptive or confusing flows faster.

In addition to the automated enforcement system, the Chrome Web Store team periodically conducts
manual reviews of landing pages and ads associated with an extension's inline installation. If the
team encounters a landing page or ad that violates the [Unwanted Software Policy][12] or any other
aspect of the [Developer Program Policies][13], inline installation for the associated extension
will be permanently disabled. For violations involving malware or social engineering, further
enforcement action may result.

Please note that we may periodically adjust our enforcement signals. If we detect repeated or
egregious violations or any attempts to game or manipulate our signals in any way, we may apply
further enforcement actions.

**How can I have inline installation reenabled for my extension?**
Once an extension's inline installation has been disabled by our automated enforcement system, we
closely track the extension's installation patterns. If our system determines that user intent
remains strong after a redirect to the extension's Chrome Web Store listing, the system will
automatically reenable inline installation. This process takes at least 30 days. If our system finds
that user intent dramatically weakens following a redirect to the extension's listing, inline
installation will remain disabled.

For cases where inline installation has been permanently disabled by our manual review process,
there is no path to reenable that particular extension's inline installation.

**How can I ensure inline installation remains enabled for my extension?**
In general, we urge Chrome Web Store developers to ensure their inline installation landing pages
prominently feature their extensions' core features and deliver experiences that align with the
expectations conveyed by the ads and landing pages associated with the installation flow. For more
guidance on how to build clear and transparent landing pages, please refer to our [Unwanted Software
Policy][14] as well as our AdWords policies on [misrepresentation][15] and [abuse of the ad
network][16].

Additionally, we recommend that Chrome Web Store developers carefully track any user feedback that
indicate their extension's installation may have led to any confusion or unexpected changes, in
addition to installation metrics that may convey low user satisfaction, e.g., high churn rates.

**Is there any way that I can request a re-review, or appeal this decision?**
Yes, appeals can be made through the instructions included in the notification email you will
receive to the email address listed under your CWS developer account. Our enforcement team will
process the appeal within 48 hours.

**Why do you have an automated enforcement system?**
Our automated disable was built to ensure we are responsive to user feedback on unwanted extensions
in a scalable, fair, and objective manner.

[1]: https://blog.chromium.org/2018/06/improving-extension-transparency-for.html
[2]: /docs/extensions/mv2/inline_faq
[3]: /docs/webstore/publish
[4]: https://chrome.google.com/webstore/developer/dashboard
[5]: https://chrome.google.com/webstore/detail/apdfllckaahabafndbhieahigkjlhalf
[6]: /docs/webstore/faq#faq-app-24
[7]: https://developers.google.com/chrome/apps/docs/developers_guide#manifest
[8]: http://code.google.com/chrome/extensions/content_scripts.html#host-page-communication
[9]: http://www.google.com/support/webmasters/bin/answer.py?hl=en&answer=34592
[10]: http://www.google.com/webmasters/
[11]: http://blog.chromium.org/2015/08/protecting-users-from-deceptive-inline.html
[12]: https://www.google.com/about/company/unwanted-software-policy.html
[13]: /docs/webstore/program_policies#spam
[14]: https://www.google.com/about/company/unwanted-software-policy.html
[15]:
  https://support.google.com/adwordspolicy/answer/6020955?hl=en&vid=1-635766371629017731-609235876
[16]: https://support.google.com/adwordspolicy/answer/6020954?hl=en&ref_topic=1626336

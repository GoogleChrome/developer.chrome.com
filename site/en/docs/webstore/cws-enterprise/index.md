---
layout: "layouts/doc-post.njk"
title: "Enterprise publishing options"
date: 2021-07-29
updated: 2021-11-22
description: How to distribute  extensions to enterprise users
---

When you are in a Google Workspace organization, there are some additional options available for
publishing extensions to your domain. This article summarizes these options, but they are detailed
as part of the [Chrome enterprise documentation][ent-chrome-management].

Some of these enterprise features involve how the Chrome Web Store works within a Google Workspace:

* **Domain publishing** &mdash; Lets you publish only to your organization's private Chrome Web
  Store.

* **Collections** &mdash; These provide curated collections of extensions specific to your
  organization.

* **Blocklist and allowlist** &mdash; These options let your admins manage which extensions can
  be used in your organization.

* **Force install** &mdash; Administrators can set policies that automatically and silently install
  extensions for users in the organization. Once installed, users cannot disable or remove these
  extensions.

The following sections provide a brief overview of these features. See the cited enterprise
documentation for each topic to learn about them in more detail.

## Private Chrome Web Store for your organization {: #private-cws }

Any Google Workspace organization can have its own private instance of the Chrome Web Store. To
access it, users must be signed into Chrome with their organization credentials.

You also need to use a slightly different URL than that of the public store, which specifies your
Google Workspace domain:

Public Chrome Web Store
: `chrome.google.com/webstore`
  
Private Chrome Web Store
: `https://chrome.google.com/webstore/category/for_your_domain`
  
For a private Chrome Web Store, use the URL exactly as shown here. It will resolve to the correct domain based on your login.

The option that enables this is available to administrators at **Devices > Chrome > Apps &
extensions > Users & browsers > Additional settings > Chrome Web store permissions**:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/o8yqCGh07bdtYmRbKSKa.png", alt="Screenshot of option
to enable private domain publishing", width="800", height="121", class="screenshot"  %}

## Domain publishing {: #domain-publishing }

This option lets you publish an extension that appears on your organization's private Chrome Web
Store, so any users in your organization can install it. Nobody outside of your organization can see
this private instance of the Chrome Web Store.

{% Aside %}
In addition to the privacy and availability benefits of publishing to your Workspace domain, a nice
side effect is that domain-published extensions usually get through the review process more quickly.
{% endAside %}

If domain publishing is enabled for your organization, an additional option appears in the
distribution page of the developer console:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/zpV6tBHuf3HLBpRjGsNA.png", alt="Screenshot showing
the domain publishing option in the developer console", width="643", height="200",
class="screenshot" %}

Select this option to publish privately to your domain.

For further instructions on how to publish to your organization's domain, see [Chrome Insider:
Publishing custom extensions for the enterprise][ent-ext-blog-how].

## Managing domain Chrome Web Store extensions {: #manage-domain-extensions }

There are also features that you don't use directly as an extension developer, but which you should
be aware of.

**Collections:** Administrators in your organization can curate *collections* of extensions that are
appropriate to your org. These collections can include both public and privately published
extensions. These collections are like the ones in the public Chrome Web Store, such as Editor's
Picks, but appear in your private Chrome Web Store.

The article [Create a Chrome app collection][ent-ext-admin-collections] provides instructions for
administrators to add collections to your private Chrome Web Store.

**Blocklist and allowlist:** These are options that your organization's administrators can use to
explicitly control which extensions may or that may not be installed by members of the organization.

These and other enterprise extension controls are set by administrators using policies in the
[extensions atomic policy group][ent-ext-admin-policies].

## Non-webstore installations {: #side-loading }

There are ways to install enterprise extensions without requiring users to go to the Chrome Web
Store, such as those described in this section.

**Force install:** Administrators can set policies that automatically and silently install
extensions for users in the organization. This is typically used for extensions that support
workflows and other core business operations.

{% Aside %}
Users can't remove extensions that are force installed.
{% endAside %}

See the [ExtensionInstallForcelist][ent-ext-admin-forcelist] documentation to learn more about this
feature.

## Troubleshooting tips for domain extensions {: #troubleshooting }

This section addresses a few common issues that extension developers may encounter when publishing
to a domain.

**I don't see the "Only to my domain" option under the private publishing option.**

This option is only available to domain users when it has been enabled for the domain. Make sure
that:

* You are logged in using your domain identity, and not a public (gmail) or other non-domain
  identity.
* Your administrator has configured domain publishing.

**Why are my users not getting extension updates after I publish them?**

It can take a while for Chrome to pull updates from the Chrome Web Store. Make sure your users are
staying logged into Chrome with their domain identity for at least a few hours at a time.

**I published an extension to my domain but I don't see it on the Chrome Web Store.**

Here are a few things to check:

* Remember that there is a review that takes place between the time you submit your item to the
  Chrome Web Store and when it is available for installation. This review can be quicker for
  domain-published extensions, but still takes some time.

* Also note that extensions roll out over a period of time, so&mdash;especially if your organization
  has a large user base&mdash;some users may see the update before others.

* Make sure you're checking the [private Chrome Web Store URL][private-cws] and not the public one.

[ent-chrome-management]: https://support.google.com/chrome/a/answer/9296680
[ent-ext-admin-collections]: https://support.google.com/chrome/a/answer/2649489
[ent-ext-admin-forcelist]: https://chromeenterprise.google/policies/?policy=ExtensionInstallForcelist
[ent-ext-admin-policies]: https://chromeenterprise.google/policies/atomic-groups/#Extensions
[ent-ext-blog-how]: https://cloud.google.com/blog/products/chrome-enterprise/publishing-extensions-for-the-enterprise
[private-cws]: #private-cws

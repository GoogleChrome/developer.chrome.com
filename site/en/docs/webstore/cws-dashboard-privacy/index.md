---
layout: "layouts/doc-post.njk"
title: Fill out the privacy fields
date: 2020-06-12
updated: 2023-05-01
description: >
  Use the privacy practices tab to help the Chrome Web Store team review your extension as quickly
  as possible.
---

The Privacy practices tab for an extension lets you state what the extension is for and list/justify its
permissions. Providing accurate information in these fields helps us review your extension as
quickly as possible.

## State the extension's purpose

The [Extension Quality Guidelines][extension-policies] state that an extension must have a single
purpose that is narrow and easy to understand. Make sure that this field clearly communicates this
purpose for your extension.

**Single purpose description**&emsp;Fill out this field to help the reviewers understand the focus
of your extension.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lQuFOcL3XgQseosEwxk1.png",
       alt="Screenshot of the 'single purpose' privacy field",
       height="278", width="800" %}

## List and justify any permissions

Your extension should request the [minimum permissions][minimum-permissions] consistent with the
purpose of the extension. Requesting broader permissions than necessary may cause your extension to
be rejected.

**Permissions justification**&emsp;This section contains a list of permissions that your extension
uses (as declared in your manifest), with a field for you to state the justification for each
permission. Fill out these fields to tell the reviewers why your extension needs to use each
permission. If there are permissions listed here that you don't require, remove them from your
manifest and [upload][upload-item] a new version of your extension before continuing.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/xTk11mZFXz9K0RkLAcmb.png",
       alt="Screenshot of the permissions list privacy field set",
       height="162", width="800" %}

## Declare any remote code

Your extension should avoid using remote code except where absolutely necessary. Extensions that use
remote code will need extra scrutiny, resulting in longer review times. Extensions that call remote
code and do not declare and justify it using the field shown above will be rejected.

{% Aside 'warning' %}

In **Manifest V3** you can no longer load and execute a [remotely hosted file][remote-code].

{% endAside %}

**Remote Code**&emsp;Use this field to tell reviewers whether your extension executes remote code
and, if so, why this is necessary. If your extension doesn't need to execute remote code, make sure
that it does not and select "No, I am not using remote code."

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/c7Fo3mIpx0i5j4eXEhev.png",
       alt="Screenshot of the remote code declarations field of the privacy field set",
       height="170", width="800" %}

## Certify your data use practices

You must disclose how your extension collects and uses user data. These disclosures include:

* The nature of the data that the extensions collects from users
* Your certification that the extension complies with the policy on limited use

{% Aside 'note' %}

Your disclosures are displayed to Chrome users, and should be consistent with the existing privacy
policy URL that you provided to the Chrome Web Store under your [developer account
page][setup-account].

{% endAside %}

**Data usage**&emsp;Use this field to disclose and certify your data collection practices. Use the
first group of checkboxes to disclose which types of data your extension collects. Use the second
group of checkboxes to certify that you comply with each of the disclosure statements.

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/PwmNuP356TsVi80bxWAj.png",
  alt="Screenshot of data use certification fields", width="800", height="495" %}

## You are almost ready to publish this item!

If you haven't done so yet, complete your listing by
-  Providing your [distribution preferences][distribution]
-  Filling out your [store listing][listing]

[distribution]: /docs/webstore/cws-dashboard-distribution/
[extension-policies]: /docs/webstore/program-policies/#extensions
[listing]: /docs/webstore/cws-dashboard-listing/
[minimum-permissions]: /docs/extensions/mv3/security/#permissions
[remote-code]: /docs/extensions/mv3/intro/mv3-overview/#remotely-hosted-code
[setup-account]: /docs/webstore/publish#setup-a-developer-account
[upload-item]: /docs/webstore/publish/#upload-your-item

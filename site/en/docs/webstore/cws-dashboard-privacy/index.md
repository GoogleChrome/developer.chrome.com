---
layout: "layouts/doc-post.njk"
title: Fill out the privacy fields
date: 2020-06-12
description: >
  Use the privacy tab to help the Chrome Web Store team review your extension as quickly
  as possible.
---

The privacy tab for an extension lets you state what the extension is for and list/justify its
permissions. Providing accurate information in these fields helps us review your extension as
quickly as possible.

## State the extension's purpose

The [Extension Quality Guidelines][1] state that an extension must have a single purpose that is
narrow and easy to understand. Make sure that this field clearly communicates this purpose for your
extension.

**Single purpose description** Fill out this field to help the reviewers understand the focus of
your extension.

{% img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lQuFOcL3XgQseosEwxk1.png",
       alt="Screenshot of the 'single purpose' privacy field",
       height="278", width="800" %}

## List and justify any permissions

Your extension should request the [minimum permissions][2] consistent with the purpose of the
extension. Requesting broader permissions than necessary may cause your extension to be rejected.

**Permissions list** This section contains a list of permissions that your extension uses (as
declared in your manifest), with a field for you to state the justification for each permission.
Fill out these fields to tell the reviewers why your extension needs to use each permission. If
there are permissions listed here that you don't require, remove them from your manifest before
continuing.

{% img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/xTk11mZFXz9K0RkLAcmb.png",
       alt="Screenshot of the permissions list privacy field set",
       height="162", width="800" %}

## Declare any remote code

Your extension should avoid using remote code except where absolutely necessary. Extensions that use
remote code will need extra scrutiny, resulting in longer review times. Extensions that call remote
code and do not declare and justify it using the field shown above will be rejected.

**Remote Code** Use this field to tell reviewers whether your extension executes remote code and, if
so, why this is necessary. If your extension doesn't need to execute remote code, make sure that it
does not and select "No, I am not using remote code."

{% img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/c7Fo3mIpx0i5j4eXEhev.png",
       alt="Screenshot of the remote code declarations field of the privacy field set",
       height="170", width="800" %}

[1]: /docs/webstore/program_policies/#extensions
[2]: /docs/extensions/mv2/security/#permissions

---
layout: "layouts/doc-post.njk"
title: "Content Security Policy"
date: 2012-09-17
updated: 2018-05-14
description: An overview of CSP for Chrome Apps and how to comply with it.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

If you're not familiar with Content Security Policy (CSP), [An Introduction to Content Security
Policy][3] is a good starting point. That document covers the broader web platform view of CSP;
Chrome App CSP isn't as flexible.

CSP is a policy to mitigate against cross-site scripting issues, and we all know that cross-site
scripting is bad. We aren't going to try and convince you that CSP is a warm-and-fuzzy new policy.
There's work involved; you'll need to learn how to do fundamental tasks differently.

The purpose of this document is to tell you exactly what the CSP policy is for Chrome Apps, what you
need to do to comply with it, and how you can still do those fundamental tasks in a way that is
CSP–compliant.

## What is the CSP for Chrome Apps? {: #what }

The content security policy for Chrome Apps restricts you from doing the following:

- You can't use inline scripting in your Chrome App pages. The restriction bans both `<script>` blocks
  and event handlers (`<button onclick="...">`).
- You can't reference any external resources in any of your app files (except for video and audio
  resources). You can't embed external resources in an iframe.
- You can't use string-to-JavaScript methods like `eval()` and `new Function()`.

This is implemented via the following policy value:

```text
default-src 'self';
connect-src * data: blob: filesystem:;
style-src 'self' data: 'unsafe-inline';
img-src 'self' data:;
frame-src 'self' data:;
font-src 'self' data:;
media-src * data: blob: filesystem:;
```

Your Chrome App can only refer to scripts and objects within your app, with the exception of media
files (apps can refer to video and audio outside the package). Chrome extensions will let you relax
the default Content Security Policy; Chrome Apps won't.

## How to comply with CSP {: #how }

All JavaScript and all resources should be local (everything gets packaged in your Chrome App).

## "But then how do I..." {: #but }

It's very possible that you are using templating libraries and many of these won't work with CSP.
You may also want to access external resources in your app (external images, content from websites).

### Use templating libraries {: #templating }

Use a library that offers precompiled templates and you're all set. You can still use a library that
doesn't offer precompilation, but it will require some work on your part and there are restrictions.

You will need to use sandboxing to isolate any content that you want to do 'eval' things to.
Sandboxing lifts CSP on the content that you specify. If you want to use the very powerful Chrome
APIs in your Chrome App, your sandboxed content can't directly interact with these APIs (see
[Sandbox local content][4]).

### Access remote resources {: #remote_resources }

You can fetch remote resources via `XMLHttpRequest` and serve them via `blob:`, `data:`, or
`filesystem:` URLs (see [Referencing external resources][5]).

Video and audio can be loaded from remote services because they have good fallback behavior when
offline or under spotty connectivity.

### Embed web content {: #embed_content }

Instead of using an iframe, you can call out to an external URL using a webview tag (see [Embed
external web pages][6]).

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: http://www.html5rocks.com/en/tutorials/security/content-security-policy/
[4]: app_external#sandboxing
[5]: app_external#external
[6]: app_external#webview

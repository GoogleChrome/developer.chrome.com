---
layout: "layouts/doc-post.njk"
title: "Overriding Chrome pages"
date: 2012-09-18
updated: 2015-05-11
description: >
  How to override the Chrome bookmark manager, history, and new tab
  pages from your Chrome Extension.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Override pages are a way to substitute an HTML file from your extension for a page that Google
Chrome normally provides. In addition to HTML, an override page usually has CSS and JavaScript code.

An extension can replace any one of the following pages:

- **Bookmark Manager:** The page that appears when the user chooses the Bookmark Manager menu item
  from the Chrome menu or, on Mac, the Bookmark Manager item from the Bookmarks menu. You can also
  get to this page by entering the URL **chrome://bookmarks**.
- **History:** The page that appears when the user chooses the History menu item from the Chrome
  menu or, on Mac, the Show Full History item from the History menu. You can also get to this page
  by entering the URL **chrome://history**.
- **New Tab:** The page that appears when the user creates a new tab or window. You can also get to
  this page by entering the URL **chrome://newtab**.

<div class="aside aside--note"><b>Note:</b> A single extension can override <b>only one page</b>. For example, an extension can't override both the Bookmark Manager and History pages.</div>

Incognito windows are treated specially. New Tab pages cannot be overridden in incognito windows.
Other override pages work in incognito windows as long as the [incognito][1] manifest property is
set to "spanning" (which is the default value). See [Saving data and incognito mode][2] in the
Overview for more details on how you should treat incognito windows.

The following screenshots show the default New Tab page and then a custom New Tab page.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LbjiI23vPdf5z8jjttwN.png",
       alt="The default new tab page", height="173", width="200" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OvYbqxEERBMXwIQsxkm7.png",
       alt="A custom new tab page", height="173", width="200" %}

## Manifest {: #manifest }

Register an override page in the [extension manifest][3] like this:

```json/4-6
{
  "name": "My extension",
  ...

  "chrome_url_overrides" : {
    "pageToOverride": "myPage.html"
  },
  ...
}
```

For `_pageToOverride_`, substitute one of the following:

- `bookmarks`
- `history`
- `newtab`

## Tips {: #tips }

For an effective override page, follow these guidelines:

- **Make your page quick and small.**
  Users expect built-in browser pages to open instantly. Avoid doing things that might take a long
  time. For example, avoid synchronous fetches of network or database resources.
- **Include a title in your page.**
  Otherwise people might see the URL of the page, which could be confusing. Here's an example of
  specifying the title: `<title>New Tab</title>`
- **Don't rely on the page having the keyboard focus.**
  The address bar always gets the focus first when the user creates a new tab.
- **Don't try to emulate the default New Tab page.**
  The APIs necessary to create a slightly modified version of the default New Tab page—with top
  pages, recently closed pages, tips, a theme background image, and so on—don't exist yet. Until
  they do, you're better off trying to make something completely different.

## Examples {: #examples }

See the [override samples][4].

[1]: /docs/extensions/mv2/manifest/incognito
[2]: /docs/extensions/mv2/overview#incognito
[3]: /docs/extensions/mv2/tabs
[4]: /docs/extensions/mv2/samples#search:chrome_url_overrides

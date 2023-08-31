---
layout: "layouts/doc-post.njk"
title: "Override Chrome pages"
seoTitle: "Chrome Extensions: Override Chrome pages"
date: 2012-09-18
updated: 2023-02-06
description: >
  How to override the Chrome bookmark manager, history, and new tab
  pages from your Chrome Extension.
---

Extensions can use HTML override pages to replace a page Google Chrome normally provides. An extension can contain an override for any of the following pages, but each extension can only override one page:

Bookmark Manager
: The page that appears when the user chooses the Bookmark Manager menu item
from the Chrome menu or, on Mac, the Bookmark Manager item from the Bookmarks menu. You can also
get to this page by entering the URL **chrome://bookmarks**.

History
: The page that appears when the user chooses the History menu item from the Chrome
menu or, on Mac, the Show Full History item from the History menu. You can also get to this page
by entering the URL **chrome://history**.

New Tab
: The page that appears when the user creates a new tab or window. You can also get to
this page by entering the URL **chrome://newtab**.

The following screenshots show the default New Tab page and then a custom New Tab page.

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LbjiI23vPdf5z8jjttwN.png",
       alt="The default new tab page", height="173", width="200" %}
  <figcaption>The default new tab page.</figcaption>
</figure>

<figure>
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OvYbqxEERBMXwIQsxkm7.png",
       alt="A custom new tab page", height="173", width="200" %}
  <figcaption>A custom new tab page.</figcaption>
</figure>

To try this out, see our [override samples][1].

## Incognito window behavior {: #incognito }

In incognito windows, extensions can't override New Tab pages. Other pages still work if the [incognito][2] manifest property is
set to "spanning" (the default value). For details on how to handle incognito windows, see [Saving data and incognito mode][3].

## Manifest {: #manifest }

Use the following code to register an override page in the [extension manifest][4]:

```json/4-6
{
  "manifest_version": 3,
  "name": "My extension",
  ...

  "chrome_url_overrides" : {
    "PAGE_TO_OVERRIDE": "myPage.html"
  },
  ...
}
```

For `PAGE_TO_OVERRIDE`, substitute one of the following:

- `bookmarks`
- `history`
- `newtab`

## Best practices {: #tips }

* **Make your page quick and small.** <br/>Users expect built-in browser pages to open instantly. Avoid doing things that might take a long
time, like synchronous fetches of network or database resources.

* **To avoid user confusion, give your page a title.** <br/> Without a title, the page title defaults to the URL. Specify the title using the `title` tag in your HTML file.

* **Remember that new tabs give keyboard focus to the address bar first.** Don't rely on keyboard focus defaulting to other parts of the page.

* **Don't copy the default New Tab page.** <br/>The APIs necessary to create a slightly modified version of the default New Tab page—with top
pages, recently closed pages, tips, a theme background image, and so on—don't exist.

## Examples {: #examples }

See the [override samples][4].


[1]: /docs/extensions/mv3/samples#search:chrome_url_overrides
[2]: /docs/extensions/mv3/manifest/incognito
[3]: /docs/extensions/mv3/user_privacy#data-incognito
[4]: /docs/extensions/mv3/manifest/

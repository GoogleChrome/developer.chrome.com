---
layout: "layouts/doc-post.njk"
title: "Extension development overview"
seoTitle: "Chrome Extension development overview"
date: 2012-09-17
updated: 2018-06-12
description: An overview of Chrome Extension capabilities and components.
---

After reading the [Getting Started][doc-getstarted] guides and [Architecture Overview][doc-arch], use this guide as an outline of extension components and their capabilities in Manifest V3. You are encouraged to explore and expand extension
functionality.

## Customize the user interface

[Action](/docs/extensions/reference/action)
: Control the display of an extension's icon in the toolbar.

[Commands](/docs/extensions/reference/commands)
: Add keyboard shortcuts that trigger actions.

[Menus](/docs/extensions/reference/contextMenus)
: Add items to Google Chrome's context menu.

[Omnibox](/docs/extensions/reference/omnibox)
: Add keyword functionality to the address bar.

[Pages](/docs/extensions/mv3/override)
: Create a version of the New Tab, Bookmark, or History page.

[Actions](/docs/extensions/reference/pageAction)
: Dynamically display icons in the toolbar.</td>

## Build extension utilities

[Accessibility](/docs/extensions/mv3/a11y)
: Make an extension accessible to people with disabilities.

[Service workers](/docs/extensions/mv3/migrating_to_service_workers)
: Detect and react when something interesting happens.

[Internationalization](/docs/extensions/reference/i18n)
: Work with language and locale.

[Identity](/docs/extensions/reference/identity)
: Get OAuth2 access tokens.

[Management](/docs/extensions/reference/management)
: Manage extensions that are installed and running.

[Message passing](/docs/extensions/mv3/messaging)
: Communicate from a content script to its parent extension, or vice versa.

[Options page](/docs/extensions/mv3/options)
: Let users customize an extension.

[Permissions](/docs/extensions/reference/permissions)
: Modify an extension's permissions.

[Storage](/docs/extensions/reference/storage)
: Store and retrieve data.

## Modify and observe the Chrome browser

[Bookmarks](/docs/extensions/reference/bookmarks)
: Create, organize, and manipulate bookmark behavior.

[Browsing data](/docs/extensions/reference/browsingData)
: Remove browsing data from a user's local profile.

[Downloads](/docs/extensions/reference/downloads)
: Programmatically initiate, monitor, manipulate, and search for downloads.

[Settings](/docs/extensions/reference/fontSettings)
: Manage Chrome's font settings.

[History](/docs/extensions/reference/history)
: Interact with the browser's record of visited pages.

[Privacy](/docs/extensions/reference/privacy)
: Control Chrome privacy features.

[Proxy](/docs/extensions/reference/proxy)
: Manage Chrome's proxy settings.

[Sessions](/docs/extensions/reference/sessions)
: Query and restore tabs and windows from a browsing session.

[Tabs](/docs/extensions/reference/tabs)
: Create, modify, and rearrange tabs in the browser.

[Top sites](/docs/extensions/reference/topSites)
: Access users most visited URLs.

[Themes](/docs/extensions/mv3/themes)
: Change the overall appearance of the browser.

[Windows](/docs/extensions/reference/windows)
: Create, modify, and rearrange windows in the browser.

## Modify and observe the web

[Active tab](/docs/extensions/mv3/manifest/activeTab)
: Securely access websites by removing most needs for <code>&lt;all_urls&gt;</code> host permission.

[Content settings](/docs/extensions/reference/contentSettings)
: Customize websites features such as cookies, JavaScript, and plugins.

[Content scripts](/docs/extensions/mv3/content_scripts)
: Run JavaScript code in the context of web pages.

[Cookies](/docs/extensions/reference/cookies)
: Explore and modify the browser's cookie system.

[Cross-origin XMLHttpRequest](/docs/extensions/mv3/xhr)
: Use XMLHttpRequest to send and receive data from remote servers.

[Declarative content](/docs/extensions/reference/declarativeContent)
: Perform actions on the content of a page without requiring permission.

[Desktop capture](/docs/extensions/reference/desktopCapture)
: Capture content of screen, individual windows or tabs.

[Page capture](/docs/extensions/reference/pageCapture)
: Save a tab's source information as MHTML.

[Tab capture](/docs/extensions/reference/tabCapture)
: Interact with tab media streams.

[Web navigation](/docs/extensions/reference/webNavigation)
: Status updates of navigation requests in-flight.

[Declarative net request](/docs/extensions/reference/declarativeNetRequest)
: Provide rules that tell Chrome how to intercept, block, or modify requests in-flight.

## Package, deploy, and update

[Chrome Web Store](/docs/extensions/mv3/hosting)
: Hosting and updating extensions with the Chrome Web Store.

[Other deployment options](/docs/extensions/mv3/external_extensions)
: Distribute extensions on a designated network or with other software.

## Expand Chrome DevTools

[Debugger](/docs/extensions/reference/debugger)
: Instrument network interaction, debug JavaScript, mutate the DOM and CSS.

[Devtools](/docs/extensions/mv3/devtools)
: Add features to Chrome Developer Tools.

[doc-getstarted]: /docs/extensions/mv3/getstarted
[doc-arch]: /docs/extensions/mv3/architecture-overview/


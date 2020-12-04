---
layout: "layouts/doc-post.njk"
title: "Develop Extensions"
date: 2012-09-17
updated: 2018-06-12
description: An overview of Chrome Extension capabilities and components.
---

After reading the [Getting Started][1] tutorial and [Overview][2], use this guide as an outline to
extension components and abilities. Developers are encouraged to explore and expand extension
functionality.

<table class="simple"><tbody><tr><th colspan="2"><strong>Customize extension user interface</strong></th></tr><tr><td><a href="browserAction">Browser&nbsp;Actions</a></td><td>Add an icon, tooltip, badge, and popup to the toolbar.</td></tr><tr><td><a href="commands">Commands</a></td><td>Add keyboard shortcuts that trigger actions.</td></tr><tr><td><a href="contextMenus">Context&nbsp;Menus</a></td><td>Add items to Google Chrome's context menu.</td></tr><tr><td><a href="omnibox">Omnibox</a></td><td>Add keyword functionality to the address bar.</td></tr><tr><td><a href="override">Override&nbsp;Pages</a></td><td>Create a version of the New Tab, Bookmark, or History page.</td></tr><tr><td><a href="pageAction">Page&nbsp;Actions</a></td><td>Dynamically display icons in the toolbar.</td></tr></tbody></table>

<table class="simple"><tbody><tr><th colspan="2"><strong>Build extension utilities</strong></th></tr><tr><td><a href="a11y">Accessibility (a11y)</a></td><td>Make an extension accessible to people with disabilities.</td></tr><tr><td><a href="background_pages">Background Scripts</a></td><td>Detect and react when something interesting happens.</td></tr><tr><td><a href="i18n">Internationalization</a></td><td>Work with language and locale.</td></tr><tr><td><a href="identity">Identity</a></td><td>Get OAuth2 access tokens.</td></tr><tr><td><a href="management">Management</a></td><td>Manage extensions that are installed and running.</td></tr><tr><td><a href="messaging">Message&nbsp;Passing</a></td><td>Communicate from a content script to its parent extension, or vice versa.</td></tr><tr><td><a href="options">Options&nbsp;Pages</a></td><td>Let users customize an extension.</td></tr><tr><td><a href="permissions">Permissions</a></td><td>Modify an extension's permissions.</td></tr><tr><td><a href="storage">Storage</a></td><td>Store and retrieve data.</td></tr></tbody></table>

<table class="simple"><tbody><tr><th colspan="2"><strong>Modify and observe the Chrome Browser</strong></th></tr><tr><td><a href="bookmarks">Bookmarks</a></td><td>Create, organize, and manipulate bookmark behavior.</td></tr><tr><td><a href="browsingData">Browsing&nbsp;Data</a></td><td>Remove browsing data from a user's local profile.</td></tr><tr><td><a href="downloads">Downloads</a></td><td>Programmatically initiate, monitor, manipulate, and search for downloads.</td></tr><tr><td><a href="fontSettings">Font&nbsp;Settings</a></td><td>Manage Chrome's font settings.</td></tr><tr><td><a href="history">History</a></td><td>Interact with the browser's record of visited pages.</td></tr><tr><td><a href="privacy">Privacy</a></td><td>Control Chrome privacy features.</td></tr><tr><td><a href="proxy">Proxy</a></td><td>Manage Chrome's proxy settings.</td></tr><tr><td><a href="sessions">Sessions</a></td><td>Query and restore tabs and windows from a browsing session.</td></tr><tr><td><a href="tabs">Tabs</a></td><td>Create, modify, and rearrange tabs in the browser.</td></tr><tr><td><a href="topSites">Top&nbsp;Sites</a></td><td>Access users most visited URLs.</td></tr><tr><td><a href="themes">Themes</a></td><td>Change the overall appearance of the browser.</td></tr><tr><td><a href="windows">Windows</a></td><td>Create, modify, and rearrange windows in the browser.</td></tr></tbody></table>

<table class="simple"><tbody><tr><th colspan="2"><strong>Modify and observe the web</strong></th></tr><tr><td><a href="activeTab">Active&nbsp;Tab</a></td><td>Securely access websites by removing most needs for <code>&lt;all_urls&gt;</code> host permission.</td></tr><tr><td><a href="contentSettings">Content&nbsp;Settings</a></td><td>Customize websites features such as cookies, JavaScript, and plugins.</td></tr><tr><td><a href="content_scripts">Content&nbsp;Scripts</a></td><td>Run JavaScript code in the context of web pages.</td></tr><tr><td><a href="cookies">Cookies</a></td><td>Explore and modify the browser's cookie system.</td></tr><tr><td><a href="xhr">Cross-Origin&nbsp;XHR</a></td><td>Use XMLHttpRequest to send and receive data from remote servers.</td></tr><tr><td><a href="declarativeContent">Declarative&nbsp;Content</a></td><td>Perform actions on the content of a page without requiring permission.</td></tr><tr><td><a href="desktopCapture">Desktop&nbsp;Capture</a></td><td>Capture content of screen, individual windows or tabs.</td></tr><tr><td><a href="pageCapture">Page&nbsp;Capture</a></td><td>Save a tab's source information as MHTML.</td></tr><tr><td><a href="tabCapture">Tab&nbsp;Capture</a></td><td>Interact with tab media streams.</td></tr><tr><td><a href="webNavigation">Web&nbsp;Navigation</a></td><td>Status updates of navigation requests in-flight.</td></tr><tr><td><a href="webRequest">Web&nbsp;Request</a></td><td>Observe and analyze traffic. Intercept block, or modify requests in-flight.</td></tr></tbody></table>

<table class="simple"><tbody><tr><th colspan="2"><strong>Package, deploy and update</strong></th></tr><tr><td><a href="autoupdate">Autoupdating</a></td><td>Update extensions automatically.</td></tr><tr><td><a href="hosting">Hosting</a></td><td>Host extensions on Google or a designated server.</td></tr><tr><td><a href="external_extensions">Other&nbsp;Deployment&nbsp;Options</a></td><td>Distribute extensions on a designated network or with other software.</td></tr><tr><td><a href="packaging">Packaging</a></td><td>Create a <code>.crx</code> file to distribute an extension outside of the <a href="https://chrome.google.com/webstore/category/extensions">Chrome Webstore</a>.</td></tr></tbody></table>

<table class="simple"><tbody><tr><th colspan="2"><strong>Expand Chrome DevTools</strong></th></tr><tr><td><a href="debugger">Debugger</a></td><td>Instrument network interaction, debug JavaScript, mutate the DOM and CSS.</td></tr><tr><td><a href="devtools">Devtools</a></td><td>Add features to Chrome Developer Tools.</td></tr><tr></tr></tbody></table>

[1]: /docs/extensions/mv2/getstarted
[2]: /docs/extensions/mv2/overview
[3]: /docs/extensions/browserAction
[4]: /docs/extensions/reference/commands
[5]: /docs/extensions/contextMenus
[6]: /docs/extensions/reference/omnibox
[7]: /docs/extensions/mv2/override
[8]: /docs/extensions/pageAction
[9]: /docs/extensions/mv2/a11y
[10]: /docs/extensions/mv2/background_pages
[11]: /docs/extensions/i18n
[12]: /docs/extensions/identity
[13]: /docs/extensions/management
[14]: /docs/extensions/mv2/messaging
[15]: /docs/extensions/mv2/options
[16]: /docs/extensions/permissions
[17]: /docs/extensions/storage
[18]: /docs/extensions/bookmarks
[19]: /docs/extensions/browsingData
[20]: /docs/extensions/downloads
[21]: /docs/extensions/fontSettings
[22]: /docs/extensions/history
[23]: /docs/extensions/privacy
[24]: /docs/extensions/proxy
[25]: /docs/extensions/sessions
[26]: /docs/extensions/tabs
[27]: /docs/extensions/topSites
[28]: /docs/extensions/mv2/themes
[29]: /docs/extensions/windows
[30]: /docs/extensions/activeTab
[31]: /docs/extensions/contentSettings
[32]: /docs/extensions/mv2/content_scripts
[33]: /docs/extensions/cookies
[34]: /docs/extensions/mv2/xhr
[35]: /docs/extensions/declarativeContent
[36]: /docs/extensions/desktopCapture
[37]: /docs/extensions/pageCapture
[38]: /docs/extensions/tabCapture
[39]: /docs/extensions/webNavigation
[40]: /docs/extensions/webRequest
[41]: /docs/extensions/autoupdate
[42]: /docs/extensions/mv2/hosting
[43]: /docs/extensions/mv2/external_extensions
[44]: /docs/extensions/packaging
[45]: https://chrome.google.com/webstore/category/extensions
[46]: /docs/extensions/debugger
[47]: /docs/extensions/mv2/devtools

---
layout: "layouts/doc-post.njk"
title: "Extension development overview"
date: 2012-09-17
updated: 2018-06-12
description: An overview of Chrome Extension capabilities and components.
---

After reading the [Getting Started][1] tutorial and [Overview][2], use this guide as an outline to
extension components and abilities. Developers are encouraged to explore and expand extension
functionality.

<table class="width-full">
  <tbody>
    <tr>
      <th colspan="2"><strong>Customize extension user interface</strong></th>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/browserAction">Browser&nbsp;Actions</a></td>
      <td>Add an icon, tooltip, badge, and popup to the toolbar.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/commands">Commands</a></td>
      <td>Add keyboard shortcuts that trigger actions.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/contextMenus">Context&nbsp;Menus</a></td>
      <td>Add items to Google Chrome's context menu.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/omnibox">Omnibox</a></td>
      <td>Add keyword functionality to the address bar.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/override">Override&nbsp;Pages</a></td>
      <td>Create a version of the New Tab, Bookmark, or History page.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/pageAction">Page&nbsp;Actions</a></td>
      <td>Dynamically display icons in the toolbar.</td>
    </tr>
  </tbody>
</table>

<table class="width-full">
  <tbody>
    <tr>
      <th colspan="2"><strong>Build extension utilities</strong></th>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/a11y">Accessibility (a11y)</a></td>
      <td>Make an extension accessible to people with disabilities.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/migrating_to_service_workers">Service Workers</a></td>
      <td>Detect and react when something interesting happens.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/i18n">Internationalization</a></td>
      <td>Work with language and locale.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/identity">Identity</a></td>
      <td>Get OAuth2 access tokens.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/management">Management</a></td>
      <td>Manage extensions that are installed and running.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/messaging">Message&nbsp;Passing</a></td>
      <td>Communicate from a content script to its parent extension, or vice versa.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/options">Options&nbsp;Pages</a></td>
      <td>Let users customize an extension.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/permissions">Permissions</a></td>
      <td>Modify an extension's permissions.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/storage">Storage</a></td>
      <td>Store and retrieve data.</td>
    </tr>
  </tbody>
</table>

<table class="width-full">
  <tbody>
    <tr>
      <th colspan="2"><strong>Modify and observe the Chrome Browser</strong></th>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/bookmarks">Bookmarks</a></td>
      <td>Create, organize, and manipulate bookmark behavior.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/browsingData">Browsing&nbsp;Data</a></td>
      <td>Remove browsing data from a user's local profile.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/downloads">Downloads</a></td>
      <td>Programmatically initiate, monitor, manipulate, and search for downloads.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/fontSettings">Font&nbsp;Settings</a></td>
      <td>Manage Chrome's font settings.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/history">History</a></td>
      <td>Interact with the browser's record of visited pages.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/privacy">Privacy</a></td>
      <td>Control Chrome privacy features.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/proxy">Proxy</a></td>
      <td>Manage Chrome's proxy settings.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/sessions">Sessions</a></td>
      <td>Query and restore tabs and windows from a browsing session.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/tabs">Tabs</a></td>
      <td>Create, modify, and rearrange tabs in the browser.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/topSites">Top&nbsp;Sites</a></td>
      <td>Access users most visited URLs.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/themes">Themes</a></td>
      <td>Change the overall appearance of the browser.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/windows">Windows</a></td>
      <td>Create, modify, and rearrange windows in the browser.</td>
    </tr>
  </tbody>
</table>

<table class="width-full">
  <tbody>
    <tr>
      <th colspan="2"><strong>Modify and observe the web</strong></th>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/manifest/activeTab">Active&nbsp;Tab</a></td>
      <td>Securely access websites by removing most needs for <code>&lt;all_urls&gt;</code> host permission.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/contentSettings">Content&nbsp;Settings</a></td>
      <td>Customize websites features such as cookies, JavaScript, and plugins.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/content_scripts">Content&nbsp;Scripts</a></td>
      <td>Run JavaScript code in the context of web pages.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/cookies">Cookies</a></td>
      <td>Explore and modify the browser's cookie system.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/xhr">Cross-Origin&nbsp;XHR</a></td>
      <td>Use XMLHttpRequest to send and receive data from remote servers.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/declarativeContent">Declarative&nbsp;Content</a></td>
      <td>Perform actions on the content of a page without requiring permission.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/desktopCapture">Desktop&nbsp;Capture</a></td>
      <td>Capture content of screen, individual windows or tabs.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/pageCapture">Page&nbsp;Capture</a></td>
      <td>Save a tab's source information as MHTML.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/tabCapture">Tab&nbsp;Capture</a></td>
      <td>Interact with tab media streams.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/webNavigation">Web&nbsp;Navigation</a></td>
      <td>Status updates of navigation requests in-flight.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/declarativeNetRequest">Declarative&nbsp;Net&nbsp;Request</a></td>
      <td>Provide rules that tell Chrome how to intercept, block, or modify requests in-flight.</td>
    </tr>
  </tbody>
</table>

<table class="width-full">
  <tbody>
    <tr>
      <th colspan="2"><strong>Package, deploy and update</strong></th>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/hosting">Chrome Web Store</a></td>
      <td>Hosting and updating extensions with the Chrome Web Store.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/external_extensions">Other&nbsp;Deployment&nbsp;Options</a></td>
      <td>Distribute extensions on a designated network or with other software.</td>
    </tr>
  </tbody>
</table>

<table class="width-full">
  <tbody>
    <tr>
      <th colspan="2"><strong>Expand Chrome DevTools</strong></th>
    </tr>
    <tr>
      <td><a href="/docs/extensions/reference/debugger">Debugger</a></td>
      <td>Instrument network interaction, debug JavaScript, mutate the DOM and CSS.</td>
    </tr>
    <tr>
      <td><a href="/docs/extensions/mv3/devtools">Devtools</a></td>
      <td>Add features to Chrome Developer Tools.</td>
    </tr>
  </tbody>
</table>

[1]: /docs/extensions/mv3/getstarted
[2]: /docs/extensions/mv3/overview

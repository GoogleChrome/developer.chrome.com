---
layout: 'layouts/doc-post.njk'
title: "Manifest V3 upgrade checklist"
subhead: Keep track of you upgrade progress
description: A quick reference for upgrading your extensions from Manifest V2 to Manifest V3.
date: 2023-02-28
---

The checklists below are here to help you keep track of your upgrade work. They define tasks that must be completed with links to instructions for the work. Migration work is broadly divided into five categories as described in the [Migration summary](). 

{% Details  'open' %}

{% DetailsSummary %}
## Update the manifest {: update-manifest }
{% endDetailsSummary %}

The `manifest.json` file requires a slightly different format for V3 than for V2. This page describes changes that only affect the `manifest.json` file. But many of the changes to scripts and pages also require changes to the manifest. Those changes are covered with the upgrade tasks that require them.

* [Change the manifest version number](/docs/extensions/upgrading/manifest/#change-version).
* [Update host permissions](/docs/extensions/upgrading/manifest/#update-host-permissions).
* [Update web accessible resources](/docs/extensions/upgrading/manifest/#update-wa-resources).
{% endDetails %}

{% Details  'open' %}

{% DetailsSummary %}
## Upgrade to a service worker
{% endDetailsSummary %}

A service worker replaces the extension's background or event page to ensure that background code stays off the main thread. This enables extensions to run only when needed, saving resources.

Before beginning, read about the [differences between background scripts and extension service workers](/docs/extensions/upgrading/to-service-workers/#differences-with-sws).

* [Update the "background" field in the manifest](/docs/extensions/upgrading/to-service-workers/#update-bg-field)
* [Move DOM and window calls to an offscreen document](/docs/extensions/upgrading/to-service-workers/#move-dom-and-window)
* [Register listeners synchronously](/docs/extensions/upgrading/to-service-workers/#register-listeners)
* [Replace calls to `XMLHttpRequest()` with global `fetch()`](/docs/extensions/upgrading/to-service-workers/#replace-xmlhttprequest).
* [Persist states](/docs/extensions/upgrading/to-service-workers/#persist-states)
* [Convert timers to alarms](/docs/extensions/upgrading/to-service-workers/#convert-timers)

{% endDetails %}

{% Details  'open' %}

{% DetailsSummary %}
## Update API calls
{% endDetailsSummary %}

Some features need to be replaced with more modern equivalents. Others need to be removed entirely.

* [Replace `tabs.executeScript()` with `scripting.executeScript()`](/docs/extensions/upgrading/api-calls/#replace-executescript).
* [Replace `tabs.insertCSS()` and `tabs.removeCSS()` with `scripting.insertCSS()` and `scripting.removeCSS()`](/docs/extensions/upgrading/api-calls/#replace-insertcss-removecss).
* [Replace Browser Actions and Page Actions with Actions](/docs/extensions/upgrading/api-calls/#replace-browser-page-actions)
* [Replace functions that expect a Manifest V2 background context](/docs/extensions/upgrading/api-calls/#replace-mv2-function).
* [Replace unsupported APIs](/docs/extensions/upgrading/api-calls/#replace-unsupported-apis) 
{% endDetails %}

{% Details  'open' %}

{% DetailsSummary %}
## Replace blocking web request listeners
{% endDetailsSummary %}

Instead of programmatically reading network requests and altering them (as you did in Manifest V2), your extension specifies rules that describe actions to perform when a given set of conditions is met.

* [Update permissions](/docs/extensions/upgrading/blocking-web-requests/#update-permissions)
* [Create declarative net request rules](/docs/extensions/upgrading/blocking-web-requests/#create-dnr-rules)

After completing the items above, you may want to review a few [common use cases](/docs/extensions/upgrading/blocking-web-requests/#common-use-cases):

* [Block a single URL](/docs/extensions/upgrading/blocking-web-requests/#block-a-single-url)
* [Redirect-multiple-urls](/docs/extensions/upgrading/blocking-web-requests/#redirect-multiple-urls)
* [Block cookies](/docs/extensions/upgrading/blocking-web-requests/#block-cookies)

{% endDetails %}

{% Details  'open' %}

{% DetailsSummary %}
## Improve extension security
{% endDetailsSummary %}

Changes are required to improve the security of extensions. This includes ending support for remotely hosted code.
* [Remove execution of arbitrary strings](/docs/extensions/upgrading/improve-security/#remove-execution-of-strings).
* [Remove remotely hosted code](/docs/extensions/upgrading/improve-security/#remove-remote-code)
* [Update content security policy](/docs/extensions/upgrading/improve-security/#update-csp).
* [Remove unsupported content security policy values](/docs/extensions/upgrading/improve-security/#remove-unsupported-csv)

{% endDetails %}
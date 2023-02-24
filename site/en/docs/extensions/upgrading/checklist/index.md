---
layout: 'layouts/doc-post.njk'
title: "Manifest V3 upgrade checklist"
subhead: Keep track of you upgrade progress
description: A quick reference for upgrading your extensions from Manifest V2 to Manifest V3.
date: 2023-02-21
---

The checklists below are here to help you keep track of your upgrade work. They define tasks that must be completed with links to instructions for the work. Migration work is broadly divided into five categories as described in the [Migration summary](). 

{% Details  'open' %}

{% DetailsSummary %}
## Update the manifest {: update-manifest }
{% endDetailsSummary %}

The `manifest.json` file requires a slightly different format for V3 than for V2. This page describes changes that only affect the `manifest.json` file. But many of the changes to scripts and pages also require changes to the manifest. Those changes are covered with the upgrade tasks that require them.

* [Change the version number](/docs/extensions/upgrade-to-mv3/update-the-manifest/#manifest-version). {: change-version }
* [Update host permissions](/docs/extensions/upgrade-to-mv3/update-the-manifest/#host-permissions). {: #api-host-perms}
* [Update web accessible resources](/docs/extensions/upgrade-to-mv3/update-the-manifest/#web-accessible-resources).
{% endDetails %}



{% Details  'open' %}

{% DetailsSummary %}
## Upgrade to a service worker
{% endDetailsSummary %}

A service worker replaces the extension's background or event page to ensure that background code stays off the main thread. This enables extensions to run only when needed, saving resources. 

* [Update the "background" field in the manifest](/docs/extensions/upgrade-to-mv3/upgrade to-a-service-worker#update-bg-field)
* [Move DOM and window calls to an offscreen document]()
* [Move event listeners to the top level](/docs/extensions/upgrade-to-mv3/upgrade to-a-service-worker#move-event-listeners)
* [Replace calls to `XMLHttpRequest()` with global `fetch()`](/docs/extensions/upgrade-to-mv3/upgrade to-a-service-worker#use-global-fetch).
* [Persist states]()
* [Convert timers to alarms]()

{% endDetails %}


{% Details  'open' %}

{% DetailsSummary %}
## Update API calls
{% endDetailsSummary %}

Some features need to be replaced with more modern equivalents. Others need to be removed entirely.

* [Replace `tabs.executeScript()` with `scripting.executeScript()`](/docs/extensions/upgrade-to-mv3/update-code#move-executescript).
* [Replace `tabs.insertCSS()` and `tabs.removeCSS()` with `scripting.insertCSS()` and `scripting.removeCSS()`](/docs/extensions/upgrade-to-mv3/update-code#move-css-calls).
* [Replace Page Actions and Browser Actions with Actions](/docs/extensions/upgrade-to-mv3/upgrade to-a-service-worker#consolidate-actions)
* [Replace functions that expect a Manifest V2 background context](/docs/extensions/upgrade-to-mv3/update-code#api-background-context).
* [Replace unsupported APIs]() 
{% endDetails %}



{% Details  'open' %}

{% DetailsSummary %}
## Replace blocking web request listeners
{% endDetailsSummary %}

Instead of programmatically reading network requests and altering them (as you did in Manifest V2), your extension specifies rules that describe actions to perform when a given set of conditions is met.

[Replace callbacks](/docs/extensions/upgrade-to-mv3/replace-blocking-web-requests).
TBD


{% endDetails %}


{% Details  'open' %}

{% DetailsSummary %}
## Improve extension security
{% endDetailsSummary %}

Changes are required to improve the security of extensions. This includes ending support for remotely hosted code.
* [Remove execution of arbitrary strings](/docs/extensions/upgrade-to-mv3/improve-extension-security#arbitrary-strings).
* [Remove remotely hosted code](/docs/extensions/upgrade-to-mv3/improve-extension-security#remotely-hosted-code)
* [Update content security policy](/docs/extensions/upgrade-to-mv3/improve-extension-security#security-csp).
* [Remove unsupported content security policy values](/docs/extensions/upgrade-to-mv3/improve-extension-security#remove-unsupported-csp)

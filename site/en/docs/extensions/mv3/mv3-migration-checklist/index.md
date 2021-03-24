---
layout: 'layouts/doc-post.njk'
title: "Manifest V3 migration checklist"
date: 2019-11-02
updated: 2020-11-11
description: A quick reference on migrating your Chrome Extensions from Manifest V2 to Manifest V3.

---

This page provides a quick reference to help you identify any changes you might need to
make to an Manifest V2 extension so that it works under Manifest V3 (MV3). For more
description of the nature of these changes see the [MV3 migration guide](/docs/extensions/mv3/intro/mv3-migration).


## API checklist {: #api_checklist }

There are some changes you may need to make based on changes to the API surface. This section lists these changes.

**Do you have host permissions in your manifest?**
<br/>
*Host permissions in MV3 [are a separate element](/docs/extensions/mv3/intro/mv3-migration#host-permissions); you don't specify them in `permissions` or `optional_permissions`.*

- Move host permissions into the `host_permissions` field in manifest.json.

**Are you using background pages?**
<br/>
*Background pages are [replaced by service workers](/docs/extensions/mv3/intro/mv3-migration#background-service-workers) in MV3.*

- Replace `background.page` or `background.scripts` with `background.service_worker` in
  manifest.json. Note that the `service_worker` field takes a string, not an array of strings.
- Remove `background.persistent` from manifest.json.
- Update background scripts to adapt to the service worker execution context.

{% Aside 'gotchas' %}
Service workers must be registered at root level: they cannot be in a nested directory.
{% endAside %}

**Are you using the `browser_action` or `page_action` property in manifest.json?**
<br/>
*These properties are [unified into a single property](/docs/extensions/mv3/intro/mv3-migration#action-api-unification) in MV3.*

- Replace these properties with `action`.

**Are you using the `chrome.browserAction` or `chrome.pageAction` JavaScript API?**
<br/>
*These two equivalent APIs are [unified into a single API](/docs/extensions/mv3/intro/mv3-migration#action-api-unification) in MV3.*
- Migrate to the `chrome.action` API.

**Are you currently using the blocking version of `chrome.webRequest`?**
<br/>
*This API is [replaced by `declarativeNetRequest`](/docs/extensions/mv3/intro/mv3-migration#modifying-network-requests) in MV3.*

{% Aside %}
This only applies to user-installed extensions; force installed extensions (extensions
distributed using
[ExtensionInstallForcelist](https://www.chromium.org/administrators/policy-list-3#ExtensionInstallForcelist)).
These extensions &mdash; typically used in an enterprise setting &mdash; can
still use the blocking version of `chrome.webRequest`. 
{% endAside %}

- Migrate request modification logic to `chrome.declarativeNetRequest` rules.
- Replace the `webRequestBlocking` permission with `declarativeNetRequest`.
- Remove the `webRequest` permission if you no longer need to observe network requests.
- Remove unnecessary host permissions; blocking a request or upgrading a request's protocol
  doesn't require host permissions with `declarativeNetRequest`.

**Are you using these scripting/CSS methods in the chrome.tabs API?**
<br/>
*In Manifest V3, several methods move from `chrome.tabs` to the `chrome.scripting` API.*

- Change any of the following MV2 calls to use the correct MV3 API:

<table class="with-heading-tint">
  <thead>
    <tr>
      <th>Manifest V2</th>
      <th>Manifest V3</th>
    </tr>
  </thead>
    <tr>
      <td>tabs.executeScript()</td>
      <td>scripting.executeScript()</td>
    </tr>
    <tr>
      <td>tabs.insertCSS()</td>
      <td>scripting.insertCSS()</td>
    </tr>
    <tr>
      <td>tabs.removeCSS()</td>
      <td>scripting.removeCSS()</td>
    </tr>
</table>

**Are you executing remote code or arbitrary strings?**
<br/>
*You can no longer [execute external
logic](/docs/extensions/mv3/intro/mv3-migration#remotely-hosted-code) using `chrome.scripting.executeScript({code: '...'})`, `eval()`, and `new Function()`.*

- Move all external code (JS, Wasm, CSS) into your extension bundle.
- Update script and style references to load resources from the extension bundle.
- Use `chrome.runtime.getURL()` to build resource URLs at runtime.

**Are you executing functions that expect an MV2 background context?**
<br/>
*The [adoption of service workers](/docs/extensions/mv3/intro/mv3-migration#background-service-workers) in MV3 isn't compatible with 
methods like `chrome.runtime.getBackgroundPage()`,
`chrome.extension.getBackgroundPage()`, `chrome.extension.getExtensionTabs()`,
and `chrome.extension.getViews()`.*

- Migrate to a design that passes messages between other contexts and the background service worker.

## Security Checklist {: #security_checklist }

There are some changes you may need to make based on changes in security policy. This section lists these changes.

**Are you making CORS requests in content scripts?**
- Move these requests to the background service worker.

**Are you using a custom `content_security_policy` in manifest.json?**
- Replace `content_security_policy` with `content_security_policy.extension_pages`
  or `content_security_policy.sandbox` as appropriate.
- Remove references to external domains in `script-src`, `worker-src`, `object-src`, and
  `style-src` directives if present.

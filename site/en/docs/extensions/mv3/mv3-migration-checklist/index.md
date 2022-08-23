---
layout: 'layouts/doc-post.njk'
title: "Manifest V3 migration checklist"
date: 2019-11-02
updated: 2020-11-11
description: A quick reference on migrating your Chrome Extensions from Manifest V2 to Manifest V3.

---

This page provides a quick reference to help you identify any changes you might need to
make to an Manifest V2 extension so that it works under Manifest V3. For more
description of the nature of these changes see the [Manifest V3 migration guide][mv3-migration-guide].


## API checklist {: #api_checklist }

There are some changes you may need to make based on changes to the API surface. This section lists these changes.

### Do you have host permissions in your manifest? {: #api-host-perms}

*Host permissions in Manifest V3 [are a separate
element][mv3-host-perms]; you don't specify them in
`permissions` or `optional_permissions`.*

- Move host permissions into the `host_permissions` field in manifest.json.

### Are you using background pages? {: #api-background-pages }

*Background pages are [replaced by service workers][mv3-sw] in Manifest V3.*

- Replace `background.page` or `background.scripts` with `background.service_worker` in
  manifest.json. Note that the `service_worker` field takes a string, not an array of strings.
- Remove `background.persistent` from manifest.json.
- Update background scripts to adapt to the service worker execution context.

### Are you using the `browser_action` or `page_action` property in manifest.json? {: #api-browser-action-manifest}

*These properties are [unified into a single property][mv3-action] in Manifest V3.*

- Replace these properties with `action`.

### Are you using the `chrome.browserAction` or `chrome.pageAction` JavaScript API? {: #api-browser-action-js}

*These two equivalent APIs are [unified into a single API][mv3-action] in Manifest V3.*
- Migrate to the [Action API][api-action].

### Are you currently using the blocking version of `chrome.webRequest`? {: #api-blocking}

*This API is [replaced by `declarativeNetRequest`][mv3-network-request] in Manifest V3.*

{% Aside %}
This only applies to user-installed extensions; force installed extensions (extensions distributed using
[ExtensionInstallForcelist][chromium-force-install]).
These extensions &mdash; typically used in an enterprise setting &mdash; can
still use the blocking version of `chrome.webRequest`. 
{% endAside %}

- Migrate request modification logic to `chrome.declarativeNetRequest` rules.
- Replace the `webRequestBlocking` permission with `declarativeNetRequest`.
- Remove the `webRequest` permission if you no longer need to observe network requests.
- Remove unnecessary host permissions; blocking a request or upgrading a request's protocol
  doesn't require host permissions with `declarativeNetRequest`.

### Are you using these scripting/CSS methods in the Tabs API? {: #api-tabs}

*In Manifest V3, several methods move from the [Tabs API][api-tabs] to the [Scripting API][api-scripting].*

- Change any of the following Manifest V2 calls to use the correct Manifest V3 API:

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

### Are you executing remote code or arbitrary strings? {: #api-remote-code}

*You can no longer [execute external
logic][mv3-remote-code] using `chrome.scripting.executeScript({code: '...'})`, `eval()`, and `new Function()`.*

- Move all external code (JS, Wasm, CSS) into your extension bundle.
- Update script and style references to load resources from the extension bundle.
- Use [`chrome.runtime.getURL()`][runtime-geturl] to build resource URLs at runtime.

### Are you executing functions that expect an Manifest V2 background context? {: #api-background-context}

*The [adoption of service workers][mv3-sw] in Manifest V3 isn't compatible with methods like `chrome.runtime.getBackgroundPage()`,
`chrome.extension.getBackgroundPage()`, `chrome.extension.getExtensionTabs()`,
and `chrome.extension.getViews()`.*

- Migrate to a design that [passes messages][doc-messages] between other contexts and the background service worker.

## Security Checklist {: #security_checklist }

There are some changes you may need to make based on changes in security policy. This section lists these changes.

### Are you making CORS requests in content scripts? {: #security-cors }

- Move these requests to the background service worker.

### Are you using a custom `content_security_policy` in manifest.json? {: #security-csp }

- Replace `content_security_policy` with `content_security_policy.extension_pages`
  or `content_security_policy.sandbox` as appropriate.
- Remove references to external domains in `script-src`, `worker-src`, `object-src`, and
  `style-src` directives if present.

[api-action]: /docs/extensions/reference/action
[api-scripting]: /docs/extensions/reference/scripting
[api-tabs]: /docs/extensions/reference/tabs
[chromium-force-install]: https://www.chromium.org/administrators/policy-list-3#ExtensionInstallForcelist
[mv3-action]: /docs/extensions/mv3/intro/mv3-migration#action-api-unification
[mv3-host-perms]: /docs/extensions/mv3/intro/mv3-migration#host-permissions
[mv3-migration-guide]: /docs/extensions/mv3/intro/mv3-migration
[mv3-network-request]: /docs/extensions/mv3/intro/mv3-migration#modifying-network-requests
[mv3-remote-code]: /docs/extensions/mv3/intro/mv3-migration#remotely-hosted-code
[mv3-sw]: /docs/extensions/mv3/intro/mv3-migration#background-service-workers
[runtime-geturl]: /docs/extensions/reference/runtime/#method-getURL
[doc-messages]: /docs/extensions/mv3/messaging/


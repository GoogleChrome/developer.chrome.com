---
layout: 'layouts/doc-post.njk'
title: "Migrating to Manifest V3"
date: 2019-11-02
updated: 2020-11-11
description: Guidelines on migrating your Chrome Extensions from manifest version 2 to manifest version 3.
---

This is a living document. It will receive regular updates from Chromium contributors as
implementation work on manifest version 3 (MV3) progresses.

## Legend {: #legend }

<table><thead><tr><th>Term</th><th>Description</th></tr></thead><tbody><tr><td>NYI</td><td>Not Yet Implemented – Work has either not yet begun or is not substantial enough for the feature to be considered ready for experimentation.</td></tr><tr><td>In Preview</td><td>The implementation has progressed far enough that the team is looking for developer feedback. The feature may continue to evolve during this stage.</td></tr><tr><td>Stable</td><td>The feature is complete. The API should be considered stable and safe to implement against.</td></tr><tr><td>TBD</td><td>To Be Determined — Has not yet been scheduled.</td></tr><tr><td>MV#</td><td>Manifest Version &lt;Number&gt;— Indicates that the associated item applies to either the current (MV2) or future (MV3) version of the Chrome Extension platform.</td></tr></tbody></table>

## Timeline {: #timeline }

The following timeline provides a very rough estimate. Dates associated with the below milestones
represent the earliest expected point at which the milestone may land and are subject to change.

<table><thead><tr><th>Milestone</th><th>(Estimated) Release Date</th></tr></thead><tbody><tr><td>MV3 Preview/Alpha</td><td>October 31st, 2019</td></tr><tr><td>MV3 Stable Release</td><td>2020</td></tr><tr><td>MV2 End of Life</td><td>TBD</td></tr></tbody></table>

We have not decided on a final end of life date for MV2. We will continue evaluating necessary
features in Manifest V3 and we don't have a firm timeline as dates are heavily dependent on
implementation progress and implementation based on developer feedback.

## Release Channels {: #release-channels }

MV3 is in active development. Developers that wish to experiment with the latest extension platform
changes should install [Chrome Canary][1]. For additional information, see the Chromium project's
documentation on [Chrome Release Channels][2] and [Release Process][3].

## API Checklist {: #api_checklist }

- Do you have host permissions in your `permissions` or `optional_permissions` arrays in
  manifest.json?
  - Move host permissions into the `host_permissions` field in manifest.json.
- Are you using background pages?
  - Replace `background.page` or `background.scripts` with `background.service_worker` in
    manifest.json. Note that the `service_worker` field takes a string, not an array of strings.
  - Remove `background.persistent` from manifest.json.
  - Update background scripts to adapt to the service worker execution context.
- Are you using the `browser_action` or `page_action` property in manifest.json?
  - Replace with `action`.
- Are you using the `chrome.browserAction` or `chrome.pageAction` JavaScript API?
  - Migrate to `chrome.action`.
- Are you currently using the blocking version of `chrome.webRequest` in a consumer-facing
  extension? (Does not apply to extensions only distributed using [ExtensionInstallForcelist][4])?
  - Migrate request modification logic to `chrome.declarativeNetRequest` rules.
  - Replace the `webRequestBlocking` permission with `declarativeNetRequest`.
  - Remove the `webRequest` permissions if you no longer need to observe network requests.
  - Remove unnecessary host permissions; blocking a request or upgrading a request's protocol
    doesn't require host permissions with `declarativeNetRequest`.
- Are you currently using `chrome.tabs.executeScript({code: '...'})`, `eval()`, or `new Function()`
  in background contexts or content scripts?
  - Move all external code (JS, Wasm, CSS) into your extension bundle.
  - Update script and style references to load resources from the extension bundle.
  - Use `chrome.runtime.getURL()` to build resource URLs at runtime.
- Are you currently using `chrome.runtime.getBackgroundPage()`,
  `chrome.extension.getBackgroundPage()`, `chrome.extension.getExtensionTabs()`, or
  `chrome.extension.getViews()`?
  - Migrate to passing messages between other contexts and the background service worker.

## Security Checklist {: #security_checklist }

- Are you making CORS requests in content scripts?
  - Move these requests to the background service worker.
- Are you using a custom `content_security_policy` in manifest.json?
  - Replace `content_security_policy` with `content_security_policy.extension_pages`,
    `content_security_policy.isolated_world` (NYI), or `content_security_policy.sandbox` as
    appropriate.
  - Remove references to external domains in `script-src`, `worker-src`, `object-src`, and
    `style-src` directives if present.

## API Changes {: #api_changes }

### Background Service Workers (In Preview) {: #service_workers }

Background service workers are available to MV3 extensions in Canary as of October 31, 2019. Once
this feature stabilizes, it will be available to MV2 extensions in Stable.

- The `background` field remains in manifest.json
- `background.page`, `background.scripts`, and `background.persistent` fields in manifest.json are
  not supported in MV3.
- `background.service_worker` has been added. It takes a string specifying the relative path of the
  extension's root service worker. Additional scoped service workers can be registered from the root
  service worker, but they will not have access to Chrome APIs and cannot be registered for the root
  ('/') scope.
- Additional guidance on migrating to service workers can be found in [Migrating from Background
  Pages to Service Workers][5].

### Extension Actions (In Preview) {: #actions }

The [page action][6] and [browser action][7] APIs have been consolidated into a single API called
action. Once this feature stabilizes, it will be available to MV2 extensions in Stable.

- `page_action` and `browser_action` fields in manifest.json have been replaced with the `action`
  property.
- `chrome.browserAction` and `chrome.pageAction` APIs have been replaced by the `chrome.action` API.
- `chrome.action` should behave the same as `chrome.browserAction`. This API is subject to change.

### Removals {: #api_removals }

- `chrome.runtime.getBackgroundPage()`, `chrome.extension.getBackgroundPage()`,
  `chrome.extension.getExtensionTabs()`, and `chrome.extension.getViews()` are not exposed in
  service workers.
  - Due to the asynchronous design of workers, we currently do not plan on exposing any API that
    allows synchronous DOM access to other pages.

### Promise-based APIs (NYI) {: #promises }

!!!.aside.aside--note

NOTE: This feature is still in early development.

!!!

## Security Changes {: #security_changes }

### Cross Origin Requests in Content Scripts (MV2-3) {: #cors_changes }

!!!.aside.aside--note

Note: This change took place in MV2 around the same time as early MV3 work. It is included here for
the sake of completeness.

!!!

Content scripts now have similar privileges to the host page they're injected into. Consequently,
fetches initiated by a content scripts share the page's origin and content scripts can only execute
cross-origin requests that the host page could make. In order to perform a cross-origin request to a
resource the page is not allowed to access, extension authors should adapt by executing the request
from their background context and passing the response to a content script. See [Changes to
Cross-Origin Requests in Chrome Extension Content Scripts][8] for additional guidance on how to
safely execute cross-origin requests in an extension.

### Extension Content Security Policy (NYI) {: #csp_changes }

The way Chrome handles content security policy (CSP) customization is changing slightly in MV3. In
MV2, Chrome enforced a default CSP and developers could override it by providing a custom
`content_security_policy` in their manifest.json. In MV3, developers provide CSP overrides for
specific execution environments rather than a single override. Additionally, Chrome now disallows
specific directives in CSP overrides in order to prevent the extension from loading code that isn't
distributed in its bundle.

- `content_security_policy` in manifest.json will take an object rather than a string. Properties of
  this object define CSPs for various environments.
- MV3 extensions that specify a `content_security_policy` string will throw an error on load.
- `content_security_policy.extension_pages` is a string that defines the CSP for the extension's
  service worker(s), popup, extension pages, etc.
- `content_security_policy.isolated_world` is a string that defines the CSP used by content scripts.
  This can be used to protect against attackers that attempt to gain privileged access to your
  extension's content scripts. (NYI)
- `content_security_policy.sandbox` is a string that defines the CSP for sandboxed pages. Note that
  sandbox pages can still use remotely hosted code. See also [Using eval in Chrome Extensions.
  Safely.][9]
- Developers can no longer use CSP directives that enable remotely hosted code (code that is not
  bundled with the extension). Manifests that include such directives will error at parse time.
  - `script-src`, `worker-src`, `object-src`, and `style-src` with non-local values are disallowed.

## Known Issues {: #known_issues }

- `chrome.action.setIcon()`, `chrome.browserAction.setIcon()`, and `chrome.pageAction.setIcon()` do
  not currently accept a path property in service workers ([1015136][10]).
- The following APIs are not currently exposed in service workers\* `chrome.enterprise.platformKeys`
  - `chrome.fileBrowserHandler`
  - `chrome.fileSystem`
  - `chrome.fileSystemProvider`
  - `chrome.i18n`, except `getAcceptLanguages()`
  - `chrome.login`
  - `chrome.tabCapture`
  - `chrome.pageCapture`
  - `chrome.printerProvider`
  - `chrome.platformKeys`
  - `chrome.system.display`
- The following APIs are exposed but do not function as expected
  - `chrome.tabs.captureVisibleTab()` will error

[1]: https://www.google.com/chrome/canary/
[2]: https://www.chromium.org/getting-involved/dev-channel
[3]: https://www.chromium.org/developers/tech-talk-videos/release-process
[4]: https://cloud.google.com/docs/chrome-enterprise/policies/?policy=ExtensionInstallForcelist
[5]: /migrating_to_service_workers
[6]: /pageAction
[7]: /browserAction
[8]: https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
[9]: /sandboxingEval
[10]: https://bugs.chromium.org/p/chromium/issues/detail?id=1015136

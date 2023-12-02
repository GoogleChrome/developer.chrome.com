---
title: Participate in the origin trial for non-cookie storage access through the Storage Access API
description: >
  Chrome is proposing the ability for third parties to request storage or communication access (both cookie and non-cookie) through the Storage Access API.
layout: 'layouts/blog-post.njk'
date: 2023-12-04
authors:
  - helencho
  - arichiv
---

[Chrome 115](https://chromiumdash.appspot.com/schedule) introduced changes to storage, service workers, and communication APIs by [partitioning in third-party contexts](/docs/privacy-sandbox/storage-partitioning/). In addition to being isolated by the same-origin policy, the affected APIs used in third-party contexts are also isolated by the site of the top-level context.

Sites that haven't had time to implement support for third-party storage partitioning are able to take part in a [deprecation trial](/blog/storage-partitioning-deprecation-trial/) to temporarily unpartition (continue isolation by same-origin policy but remove isolation by top-level site) and restore prior behavior of storage, service workers, and communication APIs, in content embedded on their site. This deprecation trial is set to expire with the release of Chrome 127 on September 3, 2024. Note that this is separate from the deprecation trial for access to third-party cookies: this is just for access to storage.

As a long-term solution to address [certain use cases](https://arichiv.github.io/saa-non-cookie-storage/#use-cases) disrupted by third-party non-cookie storage partitioning, Chrome is proposing the ability for third parties to request storage/communication access (both cookie and non-cookie) through the [Storage Access API](https://webkit.org/blog/8124/introducing-storage-access-api/) ([shipping](https://groups.google.com/a/chromium.org/g/blink-dev/c/JHf7CWXDZUc/m/Dy2EElgvAgAJ) as of Chrome 117), which already allows third parties to request cookie access.

As of Chrome 120, this proposal will be available for experimentation through an origin trial. Developers should participate in this origin trial to evaluate how the proposed solution addresses their use cases to ensure they are prepared before the deprecation trial ends.

## Origin trial details

Beginning in Chrome 120, Chrome will support an [origin trial](/docs/web-platform/origin-trials/),[StorageAccessAPIBeyondCookies](/origintrials/#/view_trial/577023702256844801), to enable the proposed extension of the Storage Access API (backwards compatible) to allow access to unpartitioned storage (cookie and non-cookie) in a third-party context.

## Mechanics

The API can be used as follows (JavaScript running in an embedded iframe):

```js
// Request a new storage handle via rSA (this should prompt the user)
const handle = await document.requestStorageAccess({all: true});
// Write some 1P context sessionStorage
handle.sessionStorage.setItem('userid', '1234');
// Write some 1P context localStorage
handle.localStorage.setItem('preference', 'A');
// Open or create an indexedDB that is shared with the 1P context
const messageDB = handle.indexedDB.open('messages');
// Use locks shared with the 1P context
await handle.locks.request('example', ...);
```

If you want just specific API access rather than access to `all` you can pass the names of just the API handles you need. For example you could pass `{sessionStorage: true}` to just get access to `sessionStorage`, or `{indexedDB: true, locks:true}` to get access to IndexedDB and Web Locks.

Beyond calling this additional extension, access to non-cookie storage would match the current requirements for cookie access through the Storage Access API. For example, in Chrome, no prompt is shown when the origins are in the same [Related Website Set](/blog/related-website-sets/) (RWS, the new name for First Party Sets). Origins that are not part of the same RWS would be subject to the [prompting requirements of the Storage Access API in Chrome](https://github.com/cfredric/chrome-storage-access-api).

## Duration

The origin trial will be available from Chrome 120 until Chrome 124 (or after June 25, 2024 in any milestone).

## Scope

Only DOM Storage (session and local storage), Indexed DB, and Web Locks will be available initially, but other storage and communication mechanisms will be added to the origin trial in future milestones. This blog post will be updated to reflect additions and the milestones in which they will be available. Feedback from developers would aid us in prioritizing specific mechanisms for inclusion.

## Participate

1.  Assess how you use cookie and non-cookie storage in a third-party context. The [example use cases](https://arichiv.github.io/saa-non-cookie-storage/#use-cases) may help in understanding whether this proposal may fit your needs.
1.  Launch Chrome version 120 (or later) and ensure the **[ThirdPartyStoragePartitioning](/blog/storage-partitioning-dev-trial/)** flag is enabled.
1.  [Register](/origintrials/#/trials/active) for the [StorageAccessAPIBeyondCookies**](/origintrials/#/view_trial/577023702256844801) origin trial and get a token for your domains.
    1.  For more detailed instructions, visit [Get started with origin trials](/docs/web-platform/origin-trials/). The guide to [troubleshooting Chrome origin trials](/docs/web-platform/origin-trial-troubleshooting/) provides a full checklist for ensuring your token is correctly configured.
1.  Embed that origin trial token in the iframe you wish to use the Storage Access API handle within, via an [HTTP header](/docs/web-platform/origin-trials/#take-part-in-an-origin-trial), [HTML meta tag](/docs/web-platform/origin-trials/#take-part-in-an-origin-trial), or [programmatically](/docs/web-platform/origin-trials/#programmatic). Note that the token must be embedded by any frame that wishes to use this API, embedding it in the parent frame won't enable the API in child frames.
1.  Migrate the storage related in your iframe to use the Storage Access API handle if it's available (for example, calls to ``window.sessionStorage.setItem(`...)` become ``handle.sessionStorage.setItem(`...)`.
1.  Open your website and verify that the storage access handle is working as intended.
1.  To stop participating in the origin trial, remove the token you added in step 3.
1.  Submit feedback or raise any issues you encounter to the [Storage Access API Non-Cookie Storage GitHub repository](https://github.com/arichiv/saa-non-cookie-storage/issues).

## Additional resources

-   [Explainer: Extending Storage Access API (SAA) to non-cookie storage](https://arichiv.github.io/saa-non-cookie-storage/)
-   [Explainer: How Chrome is implementing the Storage Access API](https://github.com/cfredric/chrome-storage-access-api/blob/main/README.md)
-   [Get started with Origin Trials](/docs/web-platform/origin-trials/)

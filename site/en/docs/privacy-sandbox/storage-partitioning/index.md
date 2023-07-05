---
layout: "layouts/blog-post.njk"
title: "Storage Partitioning"
subhead: >
  To prevent certain types of side-channel cross-site tracking, Chrome is partitioning storage and communications APIs in third-party contexts.
description: >
  To prevent certain types of side-channel cross-site tracking, Chrome is partitioning storage and communications APIs in third-party contexts.
authors:
 - kevinkiklee
 - mihajlija
date: 2022-08-24
updated: 2023-05-16
tags:
 - privacy
---
 
## Implementation status

- Full implementation is available for testing in Chrome Beta 113 and later.
- The initial implementation has been [available behind a flag since Chrome 105](/blog/storage-partitioning-dev-trial/).
- [Storage Partitioning proposal](https://github.com/privacycg/storage-partitioning) is open for discussion.
- [Chrome Platform Status](https://chromestatus.com/feature/5723617717387264)


The feature is rolling out to a small percentage of users starting in Chrome 113. 
Depending on the stability and compatibility, it will be made fully available in
Chrome Stable mid-year 2023. Testing third-party storage partitioning now
and filing bugs will help uncover any potential issues and resolve them before
the full rollout.
 
## What is storage partitioning?
 
To prevent certain types of side-channel cross-site tracking, Chrome is
partitioning storage and communications APIs in third-party contexts.

Without
storage partitioning, a site can join data across different sites to track the
user across the web. Also, it allows the embedded site to infer specific states
about the user in the top-level site using side-channel techniques such as
[Timing Attacks](https://dl.acm.org/doi/10.1145/352600.352606),
[XS-Leaks](https://github.com/xsleaks/xsleaks), and
[COSI](https://arxiv.org/pdf/1908.02204.pdf).
 
Historically, storage has been keyed only by origin. This means that if an
iframe from `example.com` is embedded on `a.com` and `b.com`, it could learn
about your browsing habits for those two sites by storing and successfully
retrieving an ID from storage. With third-party storage partitioning enabled,
storage for `example.com` exists in two different partitions, one for `a.com`
and the other for `b.com`.

Partitioning generally means that data stored by storage APIs like local
storage and IndexedDB by an iframe will no longer be accessible to all contexts
in the same origin. Instead, the data will only be available to contexts with
the same origin and same top-level site.
 
 {% Columns %}

 {% Column %}

### Before

<figure>
 {% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/wOagNNjLO8LHJUn6p1iM.png", alt="Diagram of storage APIs without partitioning.", width="793", height="415" %}
   <figcaption>
     Before storage partitioning, a.com and b.com can share data.<br/><a href="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/wOagNNjLO8LHJUn6p1iM.png">View full size diagram</a>.
   </figcaption>
</figure>
 {% endColumn %}

 {% Column %}

### After
 
<figure>
  {% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/X8tExxdcoVSE4P1bUKQJ.png", alt="Diagram of storage APIs with partitioning.", width="800", height="553" %}
    <figcaption>
      After storage partitioning, b.com cannot access a.com's storage.<br/><a href="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/X8tExxdcoVSE4P1bUKQJ.png">View full size diagram</a>.
    </figcaption>
</figure>
 {% endColumn %}

{% endColumns %}
 
## How to test storage partitioning
 
To try it out:
 
1.  Use Chrome Canary version 113 or higher.
1.  Visit `chrome://flags/#third-party-storage-partitioning`.
1.  Enable the "Experimental Third-party Storage Partitioning" flag.
 
Participate in testing and
[report bugs](https://bugs.chromium.org/p/chromium/issues/entry?labels=StoragePartitioning-trial-bugs&components=Blink%3EStorage)
to help the Chrome team identify and fix any unexpected behavior before the
stable launch. 
 
## Updated APIs

### Storage APIs

   [Quota system](https://web.dev/storage-for-the-web/#how-much)
   :   The quota system is used to determine how much disk space is
       allocated for storage. The quota system will manage each partition as a
       separate bucket to determine how much space is permitted, and when it
       is cleared.
   :   The `navigator.storage.estimate()`will return the information of
       the partition. Chrome-only APIs such as `window.webkitStorageInfo` and
       `navigator.webkitTemporaryStorage` will be deprecated.
   :   [IndexedDB](https://developer.mozilla.org/docs/Web/API/IndexedDB_API)
       and [Cache storage](https://web.dev/cache-api-quick-guide) will use the
       new partitioned quota system.

   [Web Storage API](https://developer.mozilla.org/docs/Web/API/Web_Storage_API)
   :   The Web Storage API provides mechanisms by which browsers can
       store key/value pairs. There are two mechanisms:
       [Local Storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
       and
       [Session Storage](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage).
       They are not currently quota-managed, but will still be partitioned.

   [Origin Private File System](https://web.dev/file-system-access/#accessing-the-origin-private-file-system)
   :   The [File System Access
       API](https://web.dev/file-system-access) allows a site to read or save
       changes directly to files and folders on the device after the user
       grants access. Origin Private File System allows an origin to store
       private content to disk that can be easily accessed by the user, and
       will be partitioned.
   
   [Storage Bucket API](https://wicg.github.io/storage-buckets/explainer.html)
   :   The Storage Bucket API is being developed for [Storage
       Standard](https://storage.spec.whatwg.org/) which consolidates various
       storage APIs such as IndexedDB and localStorage by using a new concept
       called buckets. The data stored in the buckets and the metadata
       associated with the buckets will be partitioned.
   
   [Clear-Site-Data header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Clear-Site-Data)
   :   Including the `Clear-Site-Data` header in the response allows a
       server to request to clear the data stored in the user's browser.
       Cache, cookies, and DOM storage can be cleared. Using the header will
       only clear the storage within one partition.
   
   [Blob URL](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL) store
   :   A [blob](https://developer.mozilla.org/docs/Web/API/Blob)
       is an object that contains raw data to be processed, and a blob URL can
       be generated to access the resource.  To support a use case for
       navigating in a top-level context to any blob URL
       ([discussion](https://github.com/w3c/FileAPI/issues/153)), the blob URL
       store might be partitioned by the agent cluster instead of the top-level
       site. This feature will not be available for testing yet, and the
       partitioning mechanism may change in the future.
 
### Communication APIs
 
Along with storage APIs, communication APIs that allow one context to
communicate across origin boundaries are also partitioned. The changes mainly
affect APIs that allow the discovery of other contexts via broadcasting or
same-origin rendezvous.
 
For the following communication APIs, third party iframe will no longer be able
to communicate with its same-origin context:
 
   [Broadcast Channel](/blog/broadcastchannel/)
   :   Broadcast Channel API allows communication between
       [browsing contexts](https://developer.mozilla.org/docs/Glossary/Browsing_context)
       (windows, tabs, or iframes) and workers of the same origin.
   :   Cross-site iframe `postMessage()` where the relationship between
       contexts is clearly defined  is not proposed to be changed.
   
   [SharedWorker](https://developer.mozilla.org/docs/Web/API/SharedWorker)
   :   SharedWorker API provides a worker that can be accessed across
       browsing contexts of the same origin.
   
   [Web Locks](https://developer.mozilla.org/docs/Web/API/Web_Locks_API)
   :   The Web Locks API allows code running in one tab or worker of
       the same origin to acquire a lock for a shared resource while some work
       is performed.
 
### Service Worker API
 
The [Service Worker API](https://developer.mozilla.org/docs/Web/API/Service_Worker_API)
provides the interface for conducting tasks in the background. Sites create
persistent registrations that create new worker context to respond to events,
and that worker can communicate with any same-origin context. Also, the
Service Worker API can change the timing of navigation requests leading to the
potential for cross-site information leaks such as
[history sniffing](https://www.ndss-symposium.org/wp-content/uploads/ndss2021_1C-2_23104_paper.pdf).

Therefore, Service Workers registered from a third-party context will be
partitioned.
 
### Extension APIs
 
[Extensions](/docs/extensions/mv3/) are programs
that customize the browsing experience for the user. With Manifest V2,
extensions can create
[background pages](/docs/extensions/mv2/background_pages/)
that have the extension's origin, but can embed iframes with web content's
origins.

Because partitioning the storage will break some use cases, a
couple of mitigations will be provided. If the extension has
[host_permissions](/docs/extensions/mv2/runtime_host_permissions/)
for the iframe origin, then the iframe will be treated as the top-level frame
and not the extension page. If an extension embeds an iframe with an extension
URL into a top-level site with host permissions, the iframe will be treated as
first-party with the extension rather than partitioned by the top-level site.

{% Aside %} 
Manifest V2 has been
[deprecated](/docs/extensions/mv3/mv2-sunset/) and
will be removed. It is recommended to
[migrate to Manifest V3](/docs/extensions/mv3/intro/mv3-migration/).
{% endAside %} 
 
## Engage and share feedback
 
The shared storage proposal is under active discussion and subject to change in
the future. If you try these APIs and have feedback, we'd love to hear it.
 
-   **GitHub**: Read the
   [proposal](https://github.com/wanderview/quota-storage-partitioning/blob/main/explainer.md),
   [raise questions and participate in discussion](https://github.com/wanderview/quota-storage-partitioning/issues).
-   **Developer support**: Ask questions and join discussions on the
   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

---
title: "The transition of Chrome extensions to Manifest V3"
description: >
  Sharing details about the plan to move extensions to Manifest V3
layout: "layouts/blog-post.njk"
authors:
  - dsli
date: 2021-09-23
updated: 2022-10-03
hero: image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/fjebBemTd8DpKrEe3ya3.png
alt: Image with extensions logo and text saying Manifest V3 transition timeline
tags:
  - extensions-news

---

{% Aside %}

The Manifest V2 support timeline has been updated. See our [September 2022 blog post](/blog/more-mv2-transition/) and the [Manifest V2 support timeline](/docs/extensions/mv3/mv2-sunset/) page for more details.

{% endAside %}

Earlier this year, for Chrome 88, we announced [the availability of a new manifest
version](https://blog.chromium.org/2020/12/manifest-v3-now-available-on-m88-beta.html) for the
Chrome extension ecosystem. Years in the making, Manifest V3 is more secure, performant, and
privacy-preserving than its predecessor. It is an evolution of the extension platform that takes
into consideration both the changing web landscape and the future of browser extensions.

As we look to the future by continuing to iterate on and improve upon Manifest V3 functionality, we
also want to share details about the plan to phase out Manifest V2 extensions.

There are two key dates for the phase-out:

*   **January 17, 2022**: New Manifest V2 extensions will no longer be accepted by the Chrome Web
    Store. Developers may still push updates to existing Manifest V2 extensions, but no new Manifest
    V2 items may be submitted.

*   **January 2023**: The Chrome browser will no longer run Manifest V2 extensions. Developers may
    no longer push updates to existing Manifest V2 extensions.

As these dates draw closer, we will share more details around the Chrome version targeted for the
change, as well as more information on how both extension developers and users may be affected.
Refer to [this page](/docs/extensions/mv3/mv2-sunset/) for more granular timeline information, which
will be kept up to date as more exact dates and milestone details are available.

In the meantime, we will continue to add new capabilities to Manifest V3 based on the needs and
voices of our developer community. Even in the last few months, there have been a number of exciting
expansions of the extension platform. We introduced additional mechanisms to the new [Scripting
API](/docs/extensions/reference/scripting/), and we expanded the
[Declarative Net Request
API](/docs/extensions/reference/declarativeNetRequest/) with support for
multiple static rulesets, filtering based on tab ID, and session-scoped rules.

In the coming months, we'll also be launching support for dynamically configurable content scripts
and an in-memory storage option, among other new capabilities. These changes were crafted with
community feedback in mind, and we will continue to build more powerful extension API functionality
as developers share more information about their migration challenges and business needs. Finally,
we'll continue working with other browser vendors in the Web Extensions Community Group to iterate
on the platform and pursue a common cross-browser extension model.

If you have feedback on Manifest V3 or are encountering unique challenges with the migration
process, please post to the
[chromium-extensions](https://groups.google.com/a/chromium.org/g/chromium-extensions) Google Group.
The earlier issues are raised and the earlier feedback is given, the more options the team has to
address them prior to Manifest V2 phase-out.


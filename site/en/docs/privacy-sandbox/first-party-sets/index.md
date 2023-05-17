---
layout: 'layouts/doc-post.njk'
title: 'First-Party Sets'
subhead: >
  First-Party Sets (FPS) is a way for a company to declare relationships among sites, so that browsers allow limited third-party cookie access for specific purposes.
description: >
  First-Party Sets (FPS) is a way for a company to declare relationships among sites, so that browsers allow limited third-party cookie access for specific purposes.
hero: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/OLx3AXkweLjAiDzoDslb.png
date: 2023-03-07
updated: 2023-05-16
authors:
  - mihajlija
---

Many organizations have related sites with different domain names, such as `brandx.com` and `fly-brandx.com`—or domains for different countries such as `example.com`, `example.rs`, `example.co.uk` and so on.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/OLx3AXkweLjAiDzoDslb.png", alt="Diagram showing brandx.com, fly-brandx.com and drive-brandx.com as one group and example.com, example.rs, example.co.uk as another group.", width="800", height="348" %}


Imagine a company that helps you book a vacation. The company has two related sites: `fly-brandx.com` and `drive-brandx.com` to separate flights and car hire. Over the course of booking one journey, you can go between these sites to select their different options and you'd expect your shopping cart to remember your choices across these sites.

Related sites like these often rely on cookies to keep you signed in or show you personalized content.

As [Chrome moves towards blocking third-party cookies](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html) to improve privacy on the web, new mechanisms are needed to enable these experiences to work.

{% Aside %}
Cookies set by the site you visit—the one shown in the URL bar—are first-party cookies. A site you visit can embed content from other sites, for example, images, ads, and text. Cookies coming from sites other than the current site are [third-party cookies](https://web.dev/samesite-cookie-recipes/#use-cases-for-cross-site-or-third-party-cookies).
{% endAside %}

## Defining related sites with First-Party Sets

First-Party Sets (FPS) is a way for a company to declare relationships among sites, so that browsers allow limited third-party cookie access for specific [purposes](#first-party-sets-use-cases). Chrome will use these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

At a high level, a First-Party Set is a collection of domains, for which there is a single "set primary" and potentially multiple "set members".

Site authors need to [submit their domains to a set](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md). Set members can include a range of different domain types with [subsets based on use cases](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets).

## First-Party Sets use cases

First-Party Sets are a good match for cases when an organization needs a form of shared identity across different top-level sites. Shared identity in this case means anything from a full single sign-on solution to just needing a shared preference across sites.

An organization may have different top-level domains for:

-   **Branded domains**: `fly-brandx.com, drive-brandx.com`
-   **App domains**: `calendar-brandx.com, mail-brandx.com`
-   **Country-specific domains** to enable localization: `brandx.co.uk`, `brandx.rs`
-   **Service domains** that users never directly interact with, but provide services across the same organization's sites: `brandx-assets.com`
-   **Sandbox domains** that users never directly interact with, but exist for security reasons: `brandx-usercontent.com`

## Find out more

-   [First-Party developer guide](/docs/first-party-sets-integration/)
-   [First-Party Sets technical explainer](https://github.com/WICG/first-party-sets#introduction)
-   [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232)
-   [Chromium Projects](https://www.chromium.org/updates/first-party-sets)
-   [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
-   [Create an issue](https://github.com/privacycg/first-party-sets/issues) on the proposal repo for questions about the proposal.

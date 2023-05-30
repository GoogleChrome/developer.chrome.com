---
layout: 'layouts/doc-post.njk'
title: 'Opt-out of the Protected Audience API'
subhead: >
  For developers and users who want to opt-out of the Protected Audience API.
description: >
  For developers and users who want to opt-out of the Protected Audience API.
date: 2022-10-29
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

You can block access to the Protected Audience API, as a [site owner](#opt-out-site) or as an [individual user](#opt-out-user).

## Site owners {: #opt-out-site}

The Protected Audience API will eventually require sites to set a [Permissions Policy](/docs/privacy-sandbox/permissions-policy/)
to allow the Protected Audience API functionality to be available. This will help ensure that
arbitrary third parties can't use the API without a site's knowledge. However,
to facilitate testing during [the first origin trial](/blog/privacy-sandbox-unified-origin-trial),
this requirement is [waived by default](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy).

Sites that would like to explicitly disable Protected Audience API functionality during the
testing period can use the relevant Permissions Policy to block access. There
are two Protected Audience API permissions policies that can be set independently:

* `join-ad-interest-group` enables/disables functionality to add a browser to
  interest groups
* `run-ad-auction` enables/disables functionality to run an on-device auction

Access to Protected Audience APIs can be disabled completely in first-party contexts by
specifying the following permissions policy in an HTTP response header:

``` text
Permissions-Policy: join-ad-interest-group=(), run-ad-auction=()
```

You can disable usage of the APIs in an iframe by adding the following `allow`
attribute to an iframe element:

``` html
<iframe src="https://example.com" allow="join-ad-interest-group 'none'; run-ad-auction 'none'"></iframe>
```

The [Proposed First Protected Audience API Origin Trial Permissions-Policy](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy)
section provides more detail.

## User opt-out {: #opt-out-user}

A user can block access to the Protected Audience API and other Privacy Sandbox features by
using any of the following mechanisms:

*  **Disable the Privacy Sandbox trials** in Chrome Settings: **Settings** >
    **Security and privacy** > **Privacy Sandbox**. This is also accessible at `chrome://settings/privacySandbox`.
* **Disable third-party cookies** in Chrome Settings: **Settings** > **Security and privacy**.
* Set **Cookies and other site data** to either "Block third-party cookies" or "Block all cookies" from `chrome://settings/cookies`.
* Use Incognito mode.

The Protected Audience API explainer provides [more detail about API design elements](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements)
and describes how the API seeks to meet
[privacy goals](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=privacy%20goal).

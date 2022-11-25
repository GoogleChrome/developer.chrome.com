---
layout: 'layouts/doc-post.njk'
title: 'Opt-out of FLEDGE'
subhead: >
  For developers and users who want to opt-out of FLEDGE.
description: >
  For developers and users who want to opt-out of FLEDGE.
date: 2022-10-29
authors:
  - samdutton
  - alexandrawhite
---

You can block access to the FLEDGE API, as a [site owner](#opt-out-site) or as an [individual user](#opt-out-user).

## Site owners {: #opt-out-site}

FLEDGE will eventually require sites to set a [Permissions Policy](/docs/privacy-sandbox/permissions-policy/)
to allow FLEDGE functionality to be available. This will help ensure that
arbitrary third parties can't use the API without a site's knowledge. However,
to facilitate testing during [the first origin trial](/blog/privacy-sandbox-unified-origin-trial),
this requirement is [waived by default](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy).

Sites that would like to explicitly disable FLEDGE functionality during the
testing period can use the relevant Permissions Policy to block access. There
are two FLEDGE permissions policies that can be set independently:

* `join-ad-interest-group` enables/disables functionality to add a browser to
  interest groups
* `run-ad-auction` enables/disables functionality to run an on-device auction

Access to FLEDGE APIs can be disabled completely in first-party contexts by
specifying the following permissions policy in an HTTP response header:

``` text
Permissions-Policy: join-ad-interest-group=(), run-ad-auction=()
```

You can disable usage of the APIs in an iframe by adding the following `allow`
attribute to an iframe element:

``` html
<iframe src="https://example.com" allow="join-ad-interest-group 'none'; run-ad-auction 'none'"></iframe>
```

The [Proposed First FLEDGE Origin Trial Permissions-Policy](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy)
section provides more detail.

## User opt-out {: #opt-out-user}

A user can block access to the FLEDGE API and other Privacy Sandbox features by
using any of the following mechanisms:

*  **Disable the Privacy Sandbox trials** in Chrome Settings: **Settings** >
    **Security and privacy** > **Privacy Sandbox**. This is also accessible at `chrome://settings/privacySandbox`.
* **Disable third-party cookies** in Chrome Settings: **Settings** > **Security and privacy**.
* Set **Cookies and other site data** to either "Block third-party cookies" or "Block all cookies" from `chrome://settings/cookies`.
* Use Incognito mode.

The FLEDGE explainer provides [more detail about API design elements](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements)
and describes how the API seeks to meet
[privacy goals](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=privacy%20goal).

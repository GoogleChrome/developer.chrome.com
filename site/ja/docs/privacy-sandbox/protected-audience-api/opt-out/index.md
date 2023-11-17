---
layout: layouts/doc-post.njk
title: Protected Audience API のオプトアウト
subhead: |2

  For developers and users who want to opt-out of the Protected Audience API.
description: |2

  For developers and users who want to opt-out of the Protected Audience API.
date: '2022-10-29'
updated: '2023-09-18'
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

You can block access to the Protected Audience API, as a [site owner](#opt-out-site) or as an [individual user](#opt-out-user).

## サイト所有者 {: #opt-out-site}

The Protected Audience API will eventually require sites to set a [Permissions Policy](/docs/privacy-sandbox/permissions-policy/) to allow the Protected Audience API functionality to be available. This will help ensure that arbitrary third parties can't use the API without a site's knowledge. However, to facilitate testing during the first origin trial, this requirement was [waived by default](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy).

Sites that would like to explicitly disable Protected Audience API functionality during the testing period can use the relevant Permissions Policy to block access. There are two Protected Audience API permissions policies that can be set independently:

- `join-ad-interest-group` enables/disables functionality to add a browser to interest groups
- `run-ad-auction` enables/disables functionality to run an on-device auction

Access to Protected Audience APIs can be disabled completely in first-party contexts by specifying the following permissions policy in an HTTP response header:

```text
Permissions-Policy: join-ad-interest-group=(), run-ad-auction=()
```

次の `allow` 属性を iframe 要素に追加することで、iframe での API の使用を無効にすることができます。

```html
<iframe src="https://example.com" allow="join-ad-interest-group 'none'; run-ad-auction 'none'"></iframe>
```

The [Proposed First Protected Audience API Origin Trial Permissions-Policy](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy) section provides more detail.

## ユーザーのオプトアウト {: #opt-out-user}

ユーザーは、次のいずれかのメカニズムを使用して、Protected Audience API およびその他のプライバシー サンドボックス機能へのアクセスをブロックできます。

- **Disable the Privacy Sandbox trials** in Chrome Settings: **Settings** &gt; **Security and privacy** &gt; **Privacy Sandbox**. This is also accessible at `chrome://settings/privacySandbox`.
- Chrome 設定で **設定** &gt; **セキュリティとプライバシー**に移動し、**サードパーティの Cookie を無効**にします。
- <code>chrome://settings/cookies</code> で、<strong>Cookie とその他のサイト データ</strong>を「サードパーティの Cookie をブロックする」または「すべての Cookie をブロックする」に設定します。
- シークレットモードを使用します。

The Protected Audience API explainer provides [more detail about API design elements](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements) and describes how the API seeks to meet [privacy goals](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=privacy%20goal).

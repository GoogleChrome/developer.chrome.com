---
layout: layouts/doc-post.njk
title: Protected Audience API のオプトアウト
subhead: Protected Audience API からのオプトアウトを希望する開発者およびユーザー向け。
description: Protected Audience API からのオプトアウトを希望する開発者およびユーザー向け。
date: 2022-10-29
updated: 2023-09-18
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

[サイト所有者](#opt-out-site)または[個人ユーザー](#opt-out-user)として Protected Audience API へのアクセスをブロックできます。

## サイト所有者 {: #opt-out-site}

Protected Audience API は、サイトの知識がなければ任意のサードパーティが API を使用できないようにするために、最終的にはサイトに Protected Audience API の機能を利用できるようにするための[権限ポリシー](/docs/privacy-sandbox/permissions-policy/)を設定することが必要となりますが、最初のオリジン トライアル中のテストを容易に行えるように、この要件は[デフォルトで免除](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy)されています。

テスト期間中に Protected Audience API 機能を明示的に無効にしたいサイトは、関連する権限ポリシーを使用してアクセスをブロックできます。Protected Audience API 権限ポリシーは 2 つあり、個別に設定することができます。

- `join-ad-interest-group`: ブラウザをインタレスト グループに追加する機能を有効/無効にします。
- `run-ad-auction`: オンデバイス オークションを実行する機能を有効または無効にします。

Protected Audience API へのアクセスは、HTTP 応答ヘッダーで次の権限ポリシーを指定することで、ファーストパーティ コンテキストで完全に無効にすることができます。

```text
Permissions-Policy: join-ad-interest-group=(), run-ad-auction=()
```

次の `allow` 属性を iframe 要素に追加することで、iframe での API の使用を無効にすることができます。

```html
<iframe src="https://example.com" allow="join-ad-interest-group 'none'; run-ad-auction 'none'"></iframe>
```

詳細については、[最初の Protected Audience API オリジン トライアルの権限ポリシーの提案](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy)セクションをご覧ください。

## ユーザーのオプトアウト {: #opt-out-user}

ユーザーは、次のいずれかのメカニズムを使用して、Protected Audience API およびその他のプライバシー サンドボックス機能へのアクセスをブロックできます。

- Chrome 設定で **設定** &gt; **セキュリティとプライバシー** &gt; **プライバシー サンドボックス** に移動し、**プライバシー サンドボックスのトライアルを無効**にします。これには `chrome://settings/privacySandbox` からもアクセスできます。
- Chrome 設定で **設定** &gt; **セキュリティとプライバシー**に移動し、**サードパーティの Cookie を無効**にします。
- <code>chrome://settings/cookies</code> で、<strong>Cookie とその他のサイト データ</strong>を「サードパーティの Cookie をブロックする」または「すべての Cookie をブロックする」に設定します。
- シークレットモードを使用します。

Protected Audience API Explainer には、[API の設計要素に関する詳細](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements)が説明されています。また、API が[プライバシーの目標](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=privacy%20goal)をどのように満たそうとしているのかが記載されています。

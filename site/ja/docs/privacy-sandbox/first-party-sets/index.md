---
layout: layouts/doc-post.njk
title: First-Party Sets
subhead: First-Party Sets（FPS）は、企業がサイト間の関係を宣言し、ブラウザが特定の目的で限定的なサードパーティ Cookie を許可できるようにする方法です。
description: First-Party Sets（FPS）は、企業がサイト間の関係を宣言し、ブラウザが特定の目的で限定的なサードパーティ Cookie を許可できるようにする方法です。
hero: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/OLx3AXkweLjAiDzoDslb.png
date: 2023-03-07
updated: 2023-05-16
authors:
  - mihajlija
---

多くの組織には、`brandx.com` や `fly-brandx.cime` などの異なるドメイン名に関連するサイト、または `example.com`、`example.rs`、`example.co.uk` のように異なる国のドメインに関連するサイトがあります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/OLx3AXkweLjAiDzoDslb.png", alt="brandx.com、fly-brandx.com、drive-brandx.com を 1 グループ、example.com、example.rs、example.co.uk を別の 1 グループとして示す図。", width="800", height="348" %}

休暇の予約を支援する会社を想像してみてください。この会社には、`fly-brandx.com` と `drive-brandx.com` という 2 つの関連サイトがあり、フライトとレンタカーを分けています。1 つの旅行を予約する過程で、これらのサイト間を移動してさまざまなオプションを選択できます。ショッピング カートには、これらのサイト全体での選択が記憶されていると期待できます。

このような関連サイトは、多くの場合、Cookie を使用してログイン状態を維持したり、パーソナライズされたコンテンツを表示したりします。

ウェブのプライバシーを改善するために、[Chrome はサードパーティ Cookie をブロックする方向に転換している](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)ため、こういったエクスペリエンスの機能には新しいメカニズムが必要です。

{% Aside %} アクセスしたサイト（URL バーに表示されるサイト）によって設定される Cookie は、ファースト パーティ Cookie です。アクセスしたサイトには、他のサイトのコンテンツ（画像、広告、テキストなど）を埋め込むことができます。現在のサイト以外のサイトからの Cookie は[サードパーティ Cookie](https://web.dev/samesite-cookie-recipes/#use-cases-for-cross-site-or-third-party-cookies) です。 {% endAside %}

## First-Party Sets で関連サイトを定義する

First-Party Sets（FPS）は、企業がサイト間の関係を宣言し、ブラウザが特定の[目的](#first-party-sets-use-cases)で限定的なサードパーティ Cookie を許可できるようにする方法です。Chrome は、これらの宣言された関係を使用して、サードパーティのコンテキストで、Cookie へのサイトアクセスをいつ許可または拒否するかを決定します。

大まかに言えば、First-Party Set はドメインの集合であり、単一の「セット プライマリ」と場合によっては複数の「セット メンバー」が存在します。

サイトの作成者は、[ドメインをセットに提出](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md)する必要があります。セットメンバーには、 [ユースケースに基づいたサブセット](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets)を含むさまざまなドメイン タイプを含めることができます。

## First-Party Sets のユースケース

First-Party Sets は、組織が異なるトップレベルサイト間でなんらかの 共有 ID 形態が必要となる場合に適しています。この場合の共有 ID とは、完全なシングルサインオンソリューションから、サイト間で共有された設定が必要なだけの場合まで、あらゆるものを指しています。

組織では、以下の項目に対して異なるトップレベルドメインを使用している可能性があります。

- **ブランドドメイン**: `fly-brandx.com、drive-brandx.com`
- **アプリドメイン**: `calendar-brandx.com、mail-brandx.com`
- ローカリゼーションを有効にするための**国固有のドメイン**: `brandx.co.uk`、`brandx.rs`
- ユーザーが直接やり取りすることはないが、同じ組織のサイト全体でサービスを提供する**サービス ドメイン**: `brandx-assets.com`
- ユーザーが直接操作することはないが、セキュリティ上の理由から存在する**サンドボックスドメイン**: `brandx-usercontent.com`

## 詳細

- [ファースト パーティ開発者ガイド](/docs/first-party-sets-integration/)
- [First-Party Sets の技術 Explainer](https://github.com/privacycg/first-party-sets)
- [Chrome プラットフォームのステータス](https://chromestatus.com/feature/5640066519007232)
- [Chromium プロジェクト](https://www.chromium.org/updates/first-party-sets)
- [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
- この提案に関するご質問がございましたっら、提案リポジトリで[イシューを提出](https://github.com/privacycg/first-party-sets/issues)してください。

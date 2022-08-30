---
layout: layouts/doc-post.njk
title: First-Party Sets
subhead: 同じ組織が所有、運用する関連するドメイン名が同じファーストパーティに属することを宣言できる。
description: First-Party Sets を使用すると、同じ組織が所有、運用する関連ドメイン名が、同じファーストパーティに属することを宣言できる。
date: 2021-05-18
updated: 2022-08-04
authors:
  - samdutton
---

{% Aside 'caution' %} First-Party Sets の提案は、[ユースケース別の定義と Storage Access API を基に、新しいデザインに更新](https://github.com/WICG/first-party-sets/issues/92)されています。[レポジトリで議論をご覧頂くこともできますし](https://github.com/WICG/first-party-sets/issues)、進捗があればこちらの内容も更新していきます。{% endAside %}

## 実装状況

- First-Party Sets の[デザイン変更提案、2022 年 7 月](https://github.com/WICG/first-party-sets/issues/92)。
- First-Party Sets と SameParty の最初の[オリジン トライアル](/origintrials/#/view_trial/988540118207823873)は、Chrome のバージョン 89 から 93 で利用できましたが、現在は終了しています。
- [Chrome Platform Status](https://chromestatus.com/feature/5640066519007232)。
- [Chromium プロジェクト](https://www.chromium.org/updates/first-party-sets)。

## First-Party Sets が必要な理由

{% YouTube id='cNJ8mZ-J3F8' %}

Webページは、複数の[オリジン](/docs/privacy-sandbox/glossary#origin)のコンテンツで構成されています。 一部のコンテンツはファーストパーティで、ユーザーがアクセスしている最上位のサイトから取得されます。 その他のコンテンツ は、広告、埋め込みメディア、または [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) の JavaScript ライブラリといった共有リソースなどのサードパーティから取得される場合があります。 サードパーティは、 [Cookie](/docs/privacy-sandbox/glossary#origin)などのメカニズムを使用して、異なるサイト間のユーザーアクティビティを関連付けようとする場合もあります。

ブラウザは、クロスサイトコンテキスト内のユーザー ID へのアクセスを制限するプライバシーモデルを提案しています。 ただし、ほとんどの組織には、さまざまな国のドメイン (例: `example.com` および `example.co.uk`) のように、さまざまなドメイン名が付けられた関連するサイトが存在します。 適切な関係があり、おそらく共通の所有権を有する関連ドメイン名は、同じファーストパーティに属することを宣言できるはずです。このようにすると、ファーストパーティとサードパーティとの間で処理が異なる状況では、ブラウザでこれらのドメインがファーストパーティとして処理されます。

どのような解決策でも、システムの悪用を防ぐ必要があります。 たとえば、ファーストパーティ権限を得るために、所有者が異なる無関係なサイトを含む組織を宣言することは禁止すべきです。

## First-Party Sets の仕組み

Web サイトは、他のドメインとの関係を定義するマニフェスト ファイル (`.well-known/first-party-set` アドレスの JSON ファイル) を提供することにより、一連の Web ドメインのメンバー (または所有者) であることを宣言できます。

`a.example`、`b.example`、および `c.example` が `a.example` が所有する first-party set を形成しようとしているとします。 その後、サイトは次のリソースを提供します。

```json
// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}

// https://b.example/.well-known/first-party-set
{
    "owner": "a.example"
}

// https://c.example/.well-known/first-party-set
{
    "owner": "a.example"
}
```

所有者ドメインは、そのメンバードメインを一覧表示するマニフェストファイルをホストします。 ブラウザは、メンバーの Web サイトに対して、所有者を指定し、所有者のマニフェストを確認して関係を検証するように要求できます。

ブラウザポリシーは、悪用や誤用を防ぐことが期待されています。 たとえば、First-Party Sets は、関連のないサイト間でのユーザー情報の交換、または同じ組織が所有していないサイトのグループ化を有効にすることは禁止されます。 1 つの考えられるサイト登録の方法は、提案されたドメインのグループと、ブラウザポリシーを満たすために必要な情報を、パブリックトラッカー (専用の GitHub リポジトリなど) に送信することです。 メンバードメインに対する所有者の制御の検証では、セットの各ドメインの `.well-known` URL でサービスを提供するために、チャレンジが必要になる場合もあります。

First-Party Sets を補完する提案は、`SameParty` Cookie 属性です。 Cookie で `SameParty` 属性を指定すると、そのコンテキストが最上位のコンテキストと同じ First-Party Set の一部であるときに、Cookie を含めるようにブラウザに指示します。

たとえば、上記の First-Party Set の場合、a.example は次の Cookie を設定できます。

`Set-Cookie: session=123; Secure; SameSite=Lax; SameParty`

つまり、b.example または c.example の訪問者が a.example に対してリクエストを行うと、`セッション` Cookie がそのリクエストに含まれます。

---

## 貢献とフィードバックの共有

- **オリジントライアル**: First-Party Sets と SameParty の最初の[オリジントライアル](/origintrials/#/view_trial/988540118207823873)は Chrome バージョン 89 ～ 93 で公開されていましたが、現在は終了しています。
- **GitHub**: [提案](https://github.com/privacycg/first-party-sets)を読んで、[質問を挙げ、ディスカッションをフォロー](https://github.com/privacycg/first-party-sets/issues)できます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

## 詳細

- [First-Party Sets 属性と sameParty 属性](/blog/first-party-sets-sameparty/)
- [First-Party Sets の技術 Explainer](https://github.com/privacycg/first-party-sets)
- [Chrome プラットフォームのステータス](https://chromestatus.com/feature/5640066519007232)
- [Chromium プロジェクト](https://www.chromium.org/updates/first-party-sets)

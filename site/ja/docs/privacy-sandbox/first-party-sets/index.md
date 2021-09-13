---
layout: 'layouts/doc-post.njk'
title: First-Party Sets
subhead: 同じエンティティが所有および運営する関連ドメイン名が、同じファーストパーティに属していると宣言できるようにします。
description: First-Party Sets を使用すると、同じエンティティが所有および運営する関連ドメイン名が、同じファーストパーティに属していると宣言できるようなります。
date: 2021-05-18
updated: 2021-08-12
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## 実装状況

- Chrome 89 から 93 の[オリジン トライアル](https://web.dev/origin-trials/)。
- [オリジン トライアルに登録](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873)。
- [Chrome プラットフォームの状態](https://chromestatus.com/feature/5640066519007232)。
- [Chromium プロジェクト](https://www.chromium.org/updates/first-party-sets)。

## First-Party Sets が必要な理由

{% YouTube
  id='cNJ8mZ-J3F8'
%}

Web ページには、複数の[オリジン](/docs/privacy-sandbox/glossary#origin)に由来するコンテンツが含まれています。一部のコンテンツはファーストパーティ コンテンツであり、ユーザーがアクセスしているトップレベルのサイトが提供するものです。広告、埋め込みメディア、[CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) の JavaScript ライブラリのような共有リソースなどのその他のコンテンツは、サードパーティから提供されている場合があります。[Cookie](/docs/privacy-sandbox/glossary#origin) などのメカニズムを使用して、さまざまなサイト間でユーザーの行動を相互に関連付けたいというサードパーティも存在します。

ブラウザーは、サイト間ではユーザーを特定できないプライバシー モデルを提案しています。ただし、多くの組織には、さまざまな国のドメイン (`example.com` や `example.co.uk` など) など、さまざまなドメイン名の関連サイトがあります。適切な関係 (たとえば共通の所有権) を持つ関連ドメイン名には、同じファーストパーティであると宣言する能力が必要です。この能力が備わっていれば、ブラウザーはファーストパーティとサードパーティの扱いが異なる状況でもこれらのドメインをファーストパーティとして扱うことができます。

どのようなソリューションであっても、システムの悪用を防止する必要があります。たとえば、ファーストパーティの特権を取得するために、所有者が異なる無関係のサイトが同じファーストパーティであると宣言できないようにする必要があります。

## First-Party Sets の仕組み

Web サイトは、`.well-known/first-party-set` アドレスから JSON ファイルを提供することにより、一連の Web ドメインのメンバー (または所有者) であると宣言できます。

`a.example`、`b.example`、`c.example` が `a.example` が所有するファーストパーティ セットを形成するとします。この場合、サイトは次のリソースを提供します。

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

所有者ドメインは、そのメンバー ドメインが記載されているマニフェスト ファイルをホストします。ブラウザーは、メンバーの Web サイトに所有者を指定するように要求し、所有者のマニフェストをチェックしてサイトの関係を確認できます。

ブラウザーのポリシーが悪用や誤用を防げると期待されています。たとえば First-Party Sets では、無関係のサイト間でのユーザー情報の交換、または同じエンティティによって所有されていないサイトのグループ化を防ぐ必要があります。サイトを登録するために考えられる 1 つの方法は、ブラウザーのポリシーを満たすために必要な情報とともに、提案するドメインのグループをパブリック トラッカー (専用の GitHub リポジトリなど) に投稿することです。メンバー ドメインが所有者の管理下であることを証明するために、セットにある各ドメインに対して `.well-known` の URL でチャレンジを提供することが必要になる可能性もあります。

First-Party Sets を補うために、`SameParty` という Cookie 属性が提案されています。`SameParty` の Cookie 属性を指定すると、Cookie のコンテキストがトップレベル コンテキストと同じ First-Party Set の一部である場合に Cookie を含めるようにブラウザーに指示します。

たとえば、上記の First-Party Set の場合、a.example は次の Cookie を設定できます。

`Set-Cookie: session=123; Secure; SameSite=Lax; SameParty`

つまり、b.example または c.example の訪問者が a.example にリクエストを送信すると、そのリクエストに`セッション` Cookie が含まれるということです。

---

## 本 API に貢献し、フィードバックを共有しましょう

- **オリジン トライアル**: 登録して [Chrome オリジン トライアル](https://developer.chrome.com/origintrials/#/view_trial/988540118207823873)に参加しましょう。
- **GitHub**: [提案](https://github.com/privacycg/first-party-sets)を読み、[質問をして、議論に参加しましょう](https://github.com/privacycg/first-party-sets/issues)。
- **開発者サポート**: [プライバシー サンドボックス開発者サポート リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、議論に参加したりしましょう。

## 詳細はこちら

- [ファーストパーティセットの技術説明者](https://github.com/privacycg/first-party-sets)
- [Chrome プラットフォームの状態](https://chromestatus.com/feature/5640066519007232)。
- [Chromium プロジェクト](https://www.chromium.org/updates/first-party-sets)。

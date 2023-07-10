---
layout: layouts/doc-post.njk
title: サードパーティ Cookie の段階的廃止への準備
subhead: コードを監査してサードパーティ Cookie を探す方法と、サードパーティ Cookie の終了に向けて準備を確実に整えておくための作業について説明します。
description: コードを監査してサードパーティ Cookie を探す方法と、サードパーティ Cookie の終了に向けて準備を確実に整えておくための作業について説明します。
date: 2023-05-17
authors:
  - mihajlija
---

サードパーティ Cookie は、クロスサイトトラッキングを可能にする重要なメカニズムであり、いくつかの主要なブラウザは、すでに何らかの方法でサードパーティ Cookie に制限を設けているか、または制限を設定する予定です。サードパーティ Cookie を使用すると、埋め込みコンテンツの状態を管理したり、複数のサイトにわたるユーザーセッションを有効にしたりするなど、多くの有効なユースケースも可能になります。

[プライバシーサンドボックス](https://privacysandbox.com/)プロジェクトの一環として、Chrome はサードパーティ Cookie のサポートを段階的に廃止し、ユーザーのプライバシーを保護しながら正当なユースケースのサポートを継続できるよう、専用の API とともに Cookie の新しい機能を提案しています。廃止は [2024 年半ばから](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)段階的に行われます。

クロスサイトトラッキングのない将来に備えるために、Cookie の使用箇所を監査し、サイトに影響がある場合に必要となる作業を計画してください。

## 概要

1. コード内の[ファーストパーティ Cookie とサードパーティ Cookie を識別](#identify)します。 `SameSite=None` を含む Cookie は更新が必要です。
2. 完全に包含された埋め込みコンテキストでサードパーティ Cookie を使用している場合は、[パーティション化された Cookie](#partitioned-cookies)を調べます。
3. 1 つのまとまったグループを形成する複数のサイトにわたってサードパーティ Cookie が必要な場合は、 [First-Party Sets](#first-party-sets) を調べます。
4. これらのオプションのいずれも該当しない場合は、クロスサイトトラッキングに依存しない個別のユースケースについて、[他のプライバシー サンドボックス API を調べます](#other-apis)。

## ファーストパーティ Cookie とサードパーティ Cookie を識別する {: #identify }

Cookie は、ユーザーのコンテキストに応じてファーストパーティまたはサードパーティになりえます。ユーザーがその時点でどのサイトにアクセスしているかによって異なります。ウェブ上のファーストパーティコンテキストとサードパーティコンテキストの区別は必ずしも明らかではなく、さまざまなリソースに及ぼす影響もさまざまです。

Cookie はそれを設定したサイトに関連付けられており、HTTP リクエストで送信したり、JavaScript でアクセスしたりできます。ブラウザのロケーションバーに示されるサイトが Cookie リクエストに関連付けられたサイトと一致する場合、それはファーストパーティ Cookie です。これが異なる場合は、サードパーティ Cookie です。

### ファーストパーティ Cookie

サイト上のセッションを管理するために Cookie を設定してもクロスサイト iframe では使用されない場合など、Cookie がサードパーティのサイトで使用されない場合、その Cookie は常にファーストパーティのコンテキストで使用されます。{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ArhVqaVr6O2X0mE0YYxp.png", alt="ファーストパーティ Cookie を示す図。", width="800", height="653" %} ファーストパーティまたは同一サイトの Cookie を識別するには、次のものを探してください。

- `SameSite` 属性なしで設定された Cookie。
    - `Set-Cookie: cookie-name=value;`
- `SameSite` が `Lax` または `Strict` に設定された Cookie。
    - `Set-Cookie: cookie-name=value; SameSite=Lax;`
    - `Set-Cookie: cookie-name=value; SameSite=Strict;`

{% Aside 'important' %} この場合、Cookie はサードパーティ Cookie の段階的廃止の影響を受けることはありません。

ファーストパーティ Cookie で `SameSite` 属性に適切な値を明示的に設定していない場合は、ブラウザ間で一貫した動作を保証するためにそれを設定しておく必要があります。

{% endAside %}

ベストプラクティスのレシピには、他のファーストパーティ Cookie 属性に使用できる合理的なデフォルトが他にも多数あります。

```text
Set-Cookie:
__Host-cookiename=value;
Secure;
Path=/;
HttpOnly;
Max-Age=7776000;
SameSite=Lax
```

詳細については、「 [ファーストパーティ Cookie のレシピ](https://web.dev/first-party-cookie-recipes)」を参照してください。

### サードパーティ Cookie

iframe やサブリソースリクエストなど、クロスサイトのコンテキストで送信される Cookie は通常、サードパーティ Cookie と呼ばれます。{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/NJLl1qG9AN8tD9GwR2jp.png", alt="サードパーティ Cookie を示す図。", width="800", height="646" %} [サードパーティ Cookie のユースケース](https://web.dev/samesite-cookie-recipes/#use-cases-for-cross-site-or-third-party-cookies)には次のようなものがあります。

- 動画、地図、コードサンプル、ソーシャルメディア投稿など、他のサイトから共有される埋め込みコンテンツ。
- ペイメント、カレンダー、予約、予約機能などの外部サービスのウィジェット。
- ソーシャルボタンや詐欺対策サービスなどのウィジェット。
- リクエストとともに送信される Cookie に依存する `<img>` や `<script>` タグなどのページ上のリモートリソース（通常、ピクセルのトラッキングやコンテンツのパーソナライズに使用されます）。

[2019 年には、ブラウザの Cookie の動作が変更され、デフォルトでファーストパーティのアクセスに制限されました](https://web.dev/samesite-cookies-explained/#changes-to-the-default-behavior-without-samesite)。現在、クロスサイトコンテキストで使用されるすべての Cookie は、`SameSite=None` 属性で設定されている必要があります。

```text
Set-Cookie: cookie-name=value; SameSite=None; Secure
```

{% Aside 'important' %} Cookie を必ず確認し、`SameSite=None` が設定されている Cookie のリストを作成してください。これらは、適切に機能し続けるための対応が必要な Cookie です。{% endAside %}

これらを識別するには、1 つの方法として、コードベースを調べて `SameSite=None` を含む Cookie を検索することができます。

または、マシン上でサードパーティ Cookie がブロックされている状態でサイトを閲覧し、DevTools を使用して潜在的な破損を調査することができます。

サードパーティ Cookie の調査に使用できる DevTools 機能の詳細については、[chromium.org に記載の手順](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox/third-party-cookie-phaseout/)をご覧ください。

## パーティション化された Cookie

[CHIPS（Cookies Have Independent Partitioned State）](/docs/privacy-sandbox/chips/) は、新しい Cookie 属性の `Partitioned` を使用してサードパーティの Cookie をトップレベルサイトごとにパーティション化することにオプトインする仕組みを導入するプライバシーサンドボックスの提案です。

別のサイトのコンポーネントとして使用されているサービスがある場合、そのサービスが設定する Cookie はクロスサイトコンテキストです。現在の Cookie の仕組みでは、この Cookie をサービス C がサイト A に設定すると、サービス C がサイト B に埋め込まれている場合でも読み取られます。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/4eKoilhldt8qdmiEvEDo.jpg", alt="パーティション化されていない Cookie を含むサイトとストレージを示す図。", width="800", height="450" %}

サービスとそれを使用するサイトが 1 対 1 の関係にある場合、それらの Cookie は設定されたサイトでのみ必要となり、複数のサイトで使用されることはありません。[例](/docs/privacy-sandbox/chips/#use-cases)には、ウィジェットの設定の保存や API のセッション Cookie の共有などが含まれます。

この場合、Cookie をトップレベル サイトごとにパーティション化すると、複雑さとサイト間のデータ漏洩のリスクが軽減されるため、改善となります。サードパーティ Cookie は引き続きサイト間で使用できますが、ブラウザが異なるトップレベルサイトにある場合は、異なる Cookie が表示されます。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Myb2Km4gEVROgCi5NZFQ.png", alt="サイトと、Cookie でパーティション化されたストレージを示す図。", width="800", height="393" %}

```text
Set-Cookie: __Host-cookie=value; SameSite=None; Secure; Path=/; Partitioned;
```

### 詳細について

技術的な設計、ユースケース、テストに関する詳細については、[CHIPS ドキュメント](/docs/privacy-sandbox/chips/)をご覧ください。

## First-Party Sets

First-Party Sets（FPS）は、開発者がサイト間の関係を宣言するためのウェブプラットフォーム メカニズムです。これにより、ブラウザはこの情報を使用して、特定のユーザー向けの目的で制限付きのクロスサイト Cookie アクセスを有効にできます。Chrome は、これらの宣言された関係を使用して、サードパーティのコンテキストで、Cookie へのサイトアクセスをいつ許可または拒否するかを決定します。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/NIUl4xLnUCe3yYP7TblC.png", alt="相互の Cookie にアクセスしている 3 つのサイトを示す図。", width="800", height="446" %}

Cookie が複数の関連サイト間で使用されている場合、クロスサイト Cookie をブロックするか、トップレベル サイトごとにパーティション化すると、シングルサインオンや共有ショッピングカートなどの[ユースケース](/blog/first-party-sets-sameparty/#usecases)がブロックされてしまいます。

これらのサイトを First-Party Sets の一部として宣言すると、[Storage Access API（SAA）](/docs/privacy-sandbox/first-party-sets-integration/#storage-access-api)と [requestStorageAccessFor API](/docs/privacy-sandbox/first-party-sets-integration/#requeststorageaccessfor-in-chrome) を使用して、これらの Cookie へのアクセスをリクエストできるようになります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/zbeLi9FbtJVhLXiCiRig.png", alt="同じ First-Party Sets 内のサイトのみが相互の Cookie にアクセスし、3 番目のサイトはアクセスが拒否されていることを示す図。", width="800", height="452" %}

このセットは JSON 形式で宣言されます。以下の例では、プライマリドメインは `travel.site` で、 `air-travel.site` 関連サイトのリストに含まれています。

```json
{
 "primary": "https://travel.site",
 "associatedSites": ["https://air-travel.site"]
}
```

トップレベルサイトは、[`Document.requestStorageAccessFor()`](https://privacycg.github.io/requestStorageAccessFor/)（rSAFor）を使用して、特定のオリジンに代わってストレージ アクセスをリクエストできます。

```js
document.requestStorageAccessFor('https://target.site')
```

### 詳細について

技術的な設計、ユースケース、セットの提出プロセスに関する詳細については、[First-Party Sets 開発者ドキュメント](/docs/privacy-sandbox/first-party-sets-integration/)をご覧ください。

## Cookie の必要性を置き換えるプライバシーサンドボックス API {: #other-apis }

CHIPS と First-Party Sets は、プライバシーを保護しながらクロスサイト Cookie に依存し続ける可能性のあるユースケースに対応しています。

どちらもニーズを満たさない場合は、Cookie の必要性に代わって特定のユースケースに対応できるように、プライバシーサンドボックスの新しい API の提案が多数用意されています。新しい API の中には、ID や不正行為の検出などに焦点を当てたものもありますが、広告に対応するものもあります。

[Federated Credential Management（FedCM）](/docs/privacy-sandbox/fedcm/)では、ID 連携サービスに対するプライバシー保護のアプローチが可能になるため、ユーザーは個人情報をサードパーティのサービスやウェブサイトと共有することなくサイトにログインできます。

[プライベートステートトークン](/docs/privacy-sandbox/trust-tokens/)は、ウェブサイトが、ある閲覧コンテキストから別の閲覧コンテキスト（サイト間など）に限定された量の情報を伝達できるようにして、パッシブトラッキングを行わずに不正行為に対抗できるようにします。

API スイートは、インタレストベース広告、カスタムオーディエンス向けのオンデバイスオークション、クロスサイトコンテンツの選択、広告コンバージョンの測定とアトリビューションなど、[広告の関連性](/docs/privacy-sandbox/#show-relevant-content)と[測定](/docs/privacy-sandbox/#measure-digital-ads)のユースケースに対応するために利用できます。

この記事で取り上げられていないユースケースに新しい API がどのように対応できるかについては、[プライバシーサンドボックスのドキュメント](/docs/privacy-sandbox/)をご覧ください。

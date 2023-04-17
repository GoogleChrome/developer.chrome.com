---
layout: layouts/blog-post.njk
title: Accept-Language の情報量削減のオリジントライアルに参加する
description: Accept-Language の情報量削減は、Chrome ブラウザにおけるパッシブフィンガープリンティングの攻撃サーフェスを削減するための取り組みです。
date: 2022-12-01
tags:
  - privacy
authors:
  - victortan
---

Accept-Language の情報量削減は、[`Accept-Language`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language) ヘッダーでユーザーの言語設定を減らし、ユーザーが最も優先する言語（1 つだけ）のみを送信することにより、パッシブフィンガープリンティングの攻撃サーフェスを減らす取り組みです。

[Chrome 109](https://chromiumdash.appspot.com/schedule) ベータ版より、Accept-Language の情報量削減の[オリジントライアル](/origintrials/#/view_trial/-7166352907053301759)を開始し、削減された `Accept-Language` ヘッダーをサイトが受け取ることを選択できるようにします。これにより、削減された `Accept-Language` が Chrome の将来のリリースでデフォルトの動作になる前に、サイトがイシューを発見して修正できるようになります。安定したユーザー数に対して公開される前に機能をテストするには、Chrome 109 のリリース日（[現時点では 2023 年 1 月 10 日予定](https://chromiumdash.appspot.com/schedule)）の前に必ずオプトインしてテストしてください。

以下は削減前後の`Accept-Language`ヘッダーの例です。

{% Compare 'worse', 'current' %}

```text
Accept-Language: en-GB,en;q=0.9,de;q=0.8,fr;q=0.7
```

{% endCompare %}

{% Compare 'better', 'proposed' %}

```text
Accept-Language: en-GB
```

{% endCompare %}

以下は、オリジントライアルの概要と今後の予定です。[Accept-Language の情報量削減 GitHub リポジトリ](https://github.com/Tanych/accept-language)で、この変更またはオリジントライアル中に見つかったイシューに関するフィードバックを共有できます。

## Accept-Language とは？

[Accept-Language](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language) 文字列はすべての HTTP リクエストで共有され、ブラウザによって読み込まれたすべてのリソースに JavaScript で公開されます。現在、ユーザーの優先言語がすべて含まれています。

## Accept-Language が削減される理由

Accept-Language の情報量削減は、Chrome ブラウザにおけるパッシブフィンガープリンティングの攻撃サーフェスを削減する取り組みです。

現在、`Accept-Language` ヘッダーはデフォルトですべての HTTP リクエストで共有され、ブラウザによって読み込まれたすべてのリソースに JavaScript で公開されます。これには、ユーザーのすべての言語設定が含まれています。サイトが多言語コンテンツを提供する場合に、ブラウザがユーザー構成の完全な言語リストを送信するのではなく、サイトが多言語コンテンツを示し、ブラウザが言語ネゴシエーションを行って優先言語を表示するタスクを担当する、新しい手法を導入しています。

もう 1 つに、多くのサイトが言語ネゴシエーションに `Accept-Language` ヘッダーをまったく使用していない可能性があるという理由があります（たとえば、[ある調査](https://wonderproxy.com/blog/accept-language/)によると、上位 10,000 サイトの 7.2% のみが `Accept-Language` を使用していることがわかりました）。Chrome のシークレットモードでは、`Accept-Language` がすでに 1 つに減らされています。

## ウェブ開発者にとっての意味

言語ネゴシエーションを `Accept-Language` に任せているサイトは、削減された `Accept-Language` を受け取る準備をし、オリジントライアルへの参加を検討することをお勧めします。削減された `Accept-Language` 値は以下のの場所に表示されます。

- `Accept-Language` HTTP リクエストヘッダー。
- `navigator.languages` JavaScript ゲッター。

サイトに送信するユーザーの優先言語を選択するための言語ネゴシエーションは、ブラウザが担当するようになります。これを実現するには、サイトはレスポンスヘッダーに `Accept-Language` と [`Content-Language`](https://datatracker.ietf.org/doc/html/rfc3282) の 2 つのヘッダー [`Variants`](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-variants-06#section-2)（サイトがサポートする言語を示す新しいヘッダー）を追加する必要があります（詳細は以下の例をご覧ください）。

削減された `Accept-Language` の計画には現在、iOS と WebView が含まれていません。これらのプラットフォームでは、ユーザーの完全な `Accept-Language` リストが引き続き取得されます。これらのプラットフォームは後日サポートされる予定です。

## Accept-Language の情報量削減のオリジントライアル

オリジントライアルでは、参加サイトがレスポンスでトークンを提供する必要があります。このトークンは、指定されたトライアルを有効にするようにブラウザに指示するものです。ただし、これは、サイトに対するブラウザの最初のリクエストにおいて、サイトがオリジントライアルに参加しているかどうかを確認する方法がないということになります。つまり、*セッションの最初のリクエストでは縮小された `Accept-Language header` は送信されません*。そのページのサブリソースのリクエストでは、同一オリジンやクロスオリジンに関係なく、縮小された `Accept-Language` ヘッダーが受け取られます。その後の同一オリジンの移動操作においても、縮小された `Accept-Language` ヘッダーが受け取られます。クロスオリジンの移動操作では完全なヘッダーの送信に戻りますが、ページ内のクロスオリジンリクエスト（サードパーティの iframe リクエストなど）では、トップレベルのフレームリクエストに有効なオリジントライアルトークンがある場合に、削減された `Accept-Language` ヘッダーが引き続き送信されます。

これは User-Agent の情報量削減のオリジントライアルに似ています。Chromium 内部の実装についての詳細は、[削減された Accept-Language HTTP ヘッダーの実装](https://docs.google.com/document/d/1RkPDf7DNtcOj4KXeW8wNCuYfto-drnGYST_NvZe3GoY/)をご覧ください。

## Accept-Language の情報量削減オリジントライアルに参加する

[Chrome のオリジントライアルを開始する](/docs/web-platform/origin-trials/)で詳細なガイダンスを読むことができますが、基本的な手順を以下に示します。

### ステップ 1

オリジントライアルに登録してドメインのトークンを取得するには、 [Accept-Language の情報量削減のトライアル](/origintrials/#/view_trial/-7166352907053301759)ページにアクセスしてください。

### ステップ 2

HTTP レスポンスヘッダーを以下のように更新します。

1. `Origin-Trial: <ORIGIN TRIAL TOKEN>` を HTTP レスポンスヘッダーに追加します。&lt;`ORIGIN TRIAL TOKEN`&gt; には、オリジントライアル登録時に取得したトークンが含まれています。
2. `Content-Language` を HTTP レスポンスヘッダーに追加して、オーディエンス向けの言語を示します。
3. `Variants` をHTTP レスポンスヘッダーに追加して、サイトがサポートする言語を示します。
4. ［オプション］`Vary: Accept-Language` を HTTP レスポンスに追加して、コンテンツネゴシエーション用のキャッシュキーを作成します。
5. これらのヘッダーを設定すると、指定されたオリジンのブラウザ言語ネゴシエーション（最初のリクエストでは再起動の可能性）のみがトリガーされます。サイトがユーザーに対して正しい言語表現を表示するようにするには、ユーザーの Accept-Language ヘッダーに基づいてコンテンツを送信するサイトを更新する必要もあります（以下の例を参照）。

{% Aside %} レスポンスヘッダーに有効な `Origin-Trial` トークン、`Content-Language` ヘッダー、および有効な `Variants` ヘッダーが含まれている場合、すべてのサブリソースリクエスト（画像やスタイルシートなど）とサブナビゲーション（iframe など）は、これらのリクエストのオリジンがオリジントライアルに登録されていない場合でも、削減された Accept-Language 文字列を送信します。{% endAside %}

### ステップ 3

ウェブサイトを Chrome M109 Beta（またはそれ以降）で読み込み、削減された Accept-Language 文字列の受信を開始します。

イシューやフィードバックについては、Accept-Language の情報量削減の [GitHub リポジトリ](https://github.com/Tanych/accept-language)に送信してください。

## デモ

オリジントライアルにオプトインした多言語サイトのデモ（およびソースコード）については、[https://reduce-accept-language.glitch.me/](https://reduce-accept-language.glitch.me/) をご覧ください。

オリジントライアルのオプトインとオプトアウトのデモ（およびソースコード）については、[https://reduce-accept-language-ot.glitch.me/](https://reduce-accept-language-ot.glitch.me/) をご覧ください。

たとえば、`example.com` では、`ja`（日本語）と `en`（英語）がサポートされています。リクエストは以下のようになります。

```text
GET / HTTP/1.1
Host: example.com
Accept-Language: en
```

サイトは、ユーザーの Accept-Language に基づいて、ユーザーが英語のコンテンツを優先することを認識しています。レスポンスヘッダーには以下が含まれる可能性があります。

```text
HTTP/1.1 200 OK
Content-Language: en
Variants: Accept-Language=(en ja)
Origin-Token: a-valid-token
```

ユーザーが日本語のコンテンツを優先する場合、リクエストは以下のようになります。

```text
GET / HTTP/1.1
Host: example.com
Accept-Language: ja
```

この場合、サイトは日本語コンテンツのヘッダーで応答します。

```text
HTTP/1.1 200 OK
Content-Language: ja
Variants: Accept-Language=(en ja)
Origin-Token: a-valid-token
```

サーバー側では、サイトが特定の言語サポートを探しているにもかかわらず、サポートが検出されない場合は、デフォルトにフォールバックします。

```js
if(accept_language == 'ja') {
    res.response('ja_page')
}
else {
   res.response('en_page')
}
```

上記の例では、`example.com` は、`Accept-Language` 値に基づいて `en` または `ja` のいずれかを応答し、一致するものがなければデフォルトで `en` になります。この場合、サイトは、`Accept-Language` 値に基づいて、`/en` または `/ja` に対応する言語ページへのリダイレクトを提供することもできます。リダイレクトに関連する詳細な例については、[実装ドキュメント](https://docs.google.com/document/d/1RkPDf7DNtcOj4KXeW8wNCuYfto-drnGYST_NvZe3GoY/edit#bookmark=id.eml73ve0kywe)をご覧ください。

## サードパーティオリジントライアルのサポート

現在、[トライアル用のサードパーティ](/docs/web-platform/third-party-origin-trials/)としてドメインを登録することはサポートされていません。オリジン間でサブリソースとして実装されているサービス（広告配信や分析など）を運用している場合、トップレベルサイトがオリジントライアルに参加している場合にのみ、削減された `Accept-Language` ヘッダーを受け取ります。

## オリジントライアルの動作状況の確認

[Chrome のオリジントライアルのトラブルシューティング](/docs/web-platform/origin-trial-troubleshooting/)ガイドでは、トークンが正しく構成されていることを確認するための完全なチェックリストを提供しています。

`chrome://settings/languages` または［設定］→［言語］から、複数の言語とその優先度を構成します。サイトで**サポートされていない**言語を選択し、それをリストの一番上に移動して、追加のネゴシエーションが確実にトリガーされるようにすることを検討してください。

origin-trial トークンを含む最初のレスポンスヘッダーは以下のようになります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/9vMsKcqCF2wEQ7K4dxKT.png", alt="削減された Accept-Language を含むリクエストヘッダーのスクリーンショット", width="800", height="228" %}

削減された Accept-Language を含む後続のリクエストヘッダーは以下のようになります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/kdfphse1F4gscnY74UJi.png", alt="origin-trial トークンを含む最初のレスポンスのヘッダー。", width="800", height="257" %}

## オリジントライアルへの参加を中止する

トライアル期間中の任意の時点で参加を中止すると、ユーザーの Accept-Language の全リストを受け取ることができます。参加を中止するには、以下のようにします。

1. Accept-Language の情報量削減トライアルの `Origin-Trial` ヘッダーを HTTP レスポンスから削除します。
2. ［オプション］このヘッダーの送信に関心がない場合は、オリジントライアルにオプトインするために HTTP レスポンスに追加された `Variants` ヘッダーを削除します。また、`Variants` に空の値を使用しても、同じことを行えます。
3. ［オプション］このヘッダーの送信に関心がない場合は、オリジントライアルにオプトインするために HTTP レスポンスに追加された `Content-Language` ヘッダーを削除します。

## オリジントライアルの期間

Accept-Language の情報量削減オリジントライアルは、少なくとも 6 か月間実施されます。これは、約 6 つの Chrome マイルストーンに対応する期間です。オリジントライアルは M109 で開始され、M114 （トライアルを使用できる最後の Chrome リリース）で終了します。この時点で、オリジントライアルからのフィードバックが評価され、その後 Chrome は削減された Accept-Language  文字列を段階的にロールアウトします（まず、削減された Accept-Language HTTP ヘッダーをロールアウトしてから、JS インターフェースを削減します）。サイトがテスト期間の延長を必要とする場合は、その後のデプリケーショントライアルにオプトインできます。これにより、少なくともさらに 6 か月間、完全な Accept-Language 文字列にアクセスすることが可能です。デプリケーショントライアルの詳細については、準備が整い次第公開します。

## フィードバックを共有する

イシューやフィードバックについては、Accept-Language の情報量削減の [GitHub リポジトリ](https://github.com/Tanych/accept-language)に送信してください。

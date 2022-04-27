---
layout: 'layouts/doc-post.njk'
title: 'Cookies Having Independent Partitioned State (CHIPS)'
subhead: >
  デベロッパーは、トップレベル サイト別の「パーティション化した」Cookie の保存に オプトインできます。
description: >
  デベロッパーは、トップレベル サイト別の「パーティション化した」Cookie の保存に オプトインできます。
  パーティション化した Cookie はサードパーティー サービスからセット可能ですが、最初にセットされたトップレベル サイト内からしか読み込むことはできません。
date: 2022-02-15
updated: 2022-04-01
authors:
  - mihajlija
---

## 実装ステータス

- [オリジン トライアル](/origintrials/#/view_trial/1239615797433729025)は Chrome 100～103 で使用できます
- [テストの目的](https://groups.google.com/a/chromium.org/g/blink-dev/c/_dJFNJpf91U)
- [Chrome プラットフォームのステータス](https://chromestatus.com/feature/5179189105786880)

## CHIPS とは

Cookies Having Independent Partitioned State（CHIPS）は、プライバシー
サンドボックスの提案の 1 つで、デベロッパーは、トップレベル
サイト別のストレージに「パーティション化して」保存される Cookie
にオプトインできます。

パーティション化されたサードパーティの Cookie
は、最初に設定されたトップレベル
サイトに関連付けられ、他からアクセスすることはできません。これは、サードパーティのサービスによる
Cookie の設定を可能にしつつ、ただし読み取りは Cookie
が最初に設定されたトップレベル
サイトに関連する場合にのみ許可されるようにすることを目的とします。

## CHIPS が必要な理由

現在、サードパーティのサービスは Cookie
を使用することにより、多くの無関係なトップレベル
サイトでユーザーをトラッキングし、それらの情報を結合できます。いわゆる「クロスサイト
トラッキング」です。

{% Img
   src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jLOlPtLY9Zqte4IOoU6g.png",
   alt="Without cookie partitioning, a third-party service can set a cookie when embedded in one top-level site and access that same cookie when the service is embedded in other top-level sites.",
   width="800", height="450"
%}

たとえば、あるユーザーがサイト A にアクセスすると、サイト C
から埋め込まれたコンテンツによって、クロスサイト
リクエストに対するレスポンスとしてユーザーのデバイスに Cookie
が設定されます。その後、同様に C が埋め込まれたサイト B
にユーザーがアクセスした場合、サイト C ではユーザーが先にサイト A
にアクセスしたときに設定した同じ Cookie
にアクセスできます。これにより、サイト C では、サイト A、サイト B
のほか、C
が埋め込まれたすべてのサイトでユーザーの閲覧アクティビティを集約できるようになります。

ブラウザ
ベンダーは、ユーザーのプライバシーを保護するため、こうした行為を制限し、サードパーティの
Cookie のサポートを段階的に廃止しつつあります。

クロスサイト
トラッキングが問題となっている一方、現在ウェブでは有効なクロスサイト
Cookie が求められており、Cookie
のパーティション化によりプライバシーを保護する上記の手法は、このニーズに応えるものです。

## ユースケース

たとえば、サイト `retail.example` で、サードパーティのサービス
`support.chat.example` を使用してサイトにチャット
サポート用のボックスを埋め込むとします。現在、埋め込み可能なチャット
サービスの多くは Cookie を使用してサポート履歴を保存しています。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jsxgCpkMRXwXughPjg7j.png", alt="Top-level site retail.example embedding a third-party service support.chat.example.", width="400", height="310" %}

`support.chat.example` で、クロスサイトの Cookie
を設定できない場合に、`retail.example`
から自社のセッション識別子（またはその派生値）を渡してもらうことができます。この場合、`support.chat.example`
が埋め込まれたすべてのウェブサイトでは、状態を渡すための追加の設定が必要になります。

または、`support.chat.example` から `retail.example`
に依頼して、support.chat.example でホストされている JavaScript を
`retail.example`
のページに埋め込んでもらうことができます。なお、この場合、`retail.example`
で `support.chat.example` のスクリプトが昇格された権限（認証 Cookie
にアクセスできるなど）を持てるため、セキュリティ上のリスクが発生します。

CHIPS のユースケースの例には、以下のような、クロスサイトのサブリソースで
1 つのトップレベル サイトのユーザー
アクティビティをスコープとするセッション概念または永続状態が必要となるあらゆるシナリオが含まれます。

- サードパーティのチャットの埋め込み
- サードパーティのマップの埋め込み
- サブリソースの CDN 負荷分散
- ヘッドレス CMS プロバイダ
- 信頼できないユーザー コンテンツを配信するサンドボックス ドメイン（googleusercontent.com、githubusercontent.com など）
- Cookie を使用して自社サイトでの認証ステータスに基づきアクセス制御したコンテンツを配信しているサードパーティの
  CDN（例: サードパーティの CDN でホストされているソーシャル メディア サイト上のプロフィール写真）
- Cookie を使用したリモート API をリクエストに組み込んでいるフロントエンドのフレームワーク

## 仕組み

CHIPS
では、トップレベルのコンテキストごとにパーティション化されるクロスサイト
Cookie に対応するために、新しい Cookie
属性「`Partitioned`」が導入されています。

この提案では、あるユーザーがサイト A にアクセスし、サイト C
から埋め込まれたコンテンツによって Cookie が `Partitioned`
属性付きで設定されると、その Cookie は、サイト A
に埋め込まれている場合にサイト C で設定された Cookie
専用のパーティション化された格納場所に保存されます。ブラウザでは、トップレベル
サイトが A の場合にのみ、その Cookie を送信します。

このユーザーが新しいサイト、たとえばサイト B
にアクセスしても、埋め込みの C フレームでは、C がサイト A
に埋め込まれている場合に設定された Cookie を受け取ることはありません。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/PODInBIXZrgGeUoFhipj.png", alt="With cookie partitioning, a third-party service that sets a cookie when embedded in one top-level site cannot access that same cookie when the service is embedded in other top-level sites.", width="800", height="443" %}

ユーザーがトップレベル サイトとしてのサイト C にアクセスした場合も、C が
A に埋め込まれている場合に設定されたパーティション化された Cookie
がリクエストで送信されることはありません。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/FaQYaZyTsAxCm8GvvVc8.png", alt="With cookie partitioning, a third-party service that sets a cookie when embedded in a site cannot access that same cookie even when the users visits the service as top-level site.", width="400", height="304" %}

## Cookie のパーティション化が重要な理由

ブラウザ側でパーティション化されていないサードパーティの Cookie
が段階的に廃止されつつあるのに伴い、別のパーティション化の方法もいくつか試みられています。

Firefox は、ETP Strict モードとプライベート ブラウジング
モードでは[すべてのサードパーティの Cookie をデフォルトでパーティション化](https://hacks.mozilla.org/2021/02/introducing-state-partitioning/)すると発表しました。これにより、すべてのクロスサイト
Cookie がトップレベル
サイトごとにパーティション化されます。ただし、オプトインしていないサードパーティの
Cookie
をパーティション化した場合は予期しないバグが発生する可能性があります。これは、一部のサードパーティのサービスでは、パーティション化されていないサードパーティの
Cookie を想定したサーバーを構築しているためです。

[Safari は、これまでにヒューリスティックに基づく Cookie のパーティション化を試みました](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/)が、最終的には、デベロッパーの混乱を招くなどの理由により、それらをすべてブロックすることを決めました。最近は、[オプトインに基づくモデルに関心を示しています](https://github.com/privacycg/storage-access/issues/75)。

すでに実装されている Cookie のパーティション化と CHIPS
の違いは、サードパーティのオプトインです。（パーティション化されていない）サードパーティの
Cookie の廃止後は、クロスパーティのリクエストで送信するためには Cookie
を新しい属性付きで設定する必要があります。

サードパーティの Cookie は引き続き存在しますが、`Partitioned`
属性を使用することにより、より限定的でより安全な種類の Cookie
動作にオプトインできるようになります。CHIPS
は、各サービスが今後のサードパーティの Cookie
がない環境にスムーズに移行できるようにするための重要なステップです。

## CHIPS の設計の詳細

### パーティション モデル

現在の Cookie
には、設定元のサイトのホスト名またはドメインがキー（_ホストキー_）として設定されています。

たとえば、`https://support.chat.example` からの Cookie
の場合、ホストキーは `("support.chat.example")` となります。

CHIPS では、パーティション化にオプトインしている Cookie
には、ホストキーと _パーティション キーの 2_ つが設定されるようになります。

Cookie のパーティション キーは、Cookie
を設定したエンドポイントへのリクエストの開始時にブラウザがアクセスしていたトップレベル
URL
のサイト（[スキームと登録可能なドメイン](https://web.dev/same-site-same-origin/#%22schemeful-same-site%22)）になります。

`https://support.chat.example` が `https://retail.example`
に埋め込まれた上記の例の場合、トップレベル URL は `https://retail.example`
となります。

この場合のパーティション キーは `("https", "retail.example")`
になります。

同様に、_リクエストのパーティション_
キーは、リクエストの開始時にブラウザがアクセスしているトップレベル URL
のサイトになります。ブラウザは、`Partitioned` 属性が設定された Cookie
を、そのCookie と同じパーティション
キーを含むリクエストに対してのみ送信する必要があります。

以下は、CHIPS の適用前と適用後で Cookie
のキーがどう変わるかを、上記の例を使って示しています。

{% Img
   src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ZZm3G3cCgziUK2eezdiu.png",
   alt="Site A and the embedded site C share a partitioned cookie. When not embedded, site C cannot access the partitioned cookie.",
   width="800", height="204"
%}

**CHIPS の適用前**

```text
key=("support.chat.example")
```

**CHIPS の適用後**

```text
key={("https", "retail.example"),
     ("support.chat.example")}
```

#### First-Party Sets と Cookie のパーティション化

[First-Party
Sets](blog/first-party-sets-sameparty/#how-to-define-a-first-party-set)
では、Chrome で制限（サードパーティのサブリソースの Cookie
へのアクセスなど）が適用されている場合に、同じエンティティにより所有、運営されている複数の関連するドメイン名をトップレベル
サイトと同じファーストパーティとして扱うことができます。

First-Party Set のメンバーサイトで、埋め込みのサービスにより Cookie
が設定されると、その Cookie は、First-Party Set
の任意のメンバーサイトに埋め込まれた同サービスからアクセスできるようになります。これにより、埋め込みのサービスでは、すべてのメンバーサイト間で統一されたシームレスなユーザー
セッションを提供することが可能になります。

同じ First-Party Set に属するサイトでは、同じパーティション
キー（First-Party Set のオーナー）が使用されます。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ho7jqWrZzBxmX3fsIpTt.png", alt="", width="800", height="548" %}

### セキュリティ設計

適切なセキュリティ対策を促進するため、CHIPS では、Cookie
の設定と送信は安全なプロトコルを介してのみ行うよう提案しています。

パーティション化された Cookie を設定する際は、`Secure` と `Path=/`
を指定します。`Domain` 属性は指定しません。Cookie に Domain
を指定すると、パーティション内の異なるサードパーティのサブドメイン間で共有される可能性があるため、これを許可しないことにより、パーティション化された
Cookie を[オリジン バインド](docs/privacy-sandbox/glossary/#origin)にできるだけ近づけ、[同一オリジン ポリシー](https://developer.mozilla.org/docs/Web/Security/Same-origin_policy)に厳密に沿うようにできます。

パーティション化された Cookie
を設定する際は（登録可能なドメインではなく）ホスト名に紐づけられるように
`__Host` プレフィックスを使用することをおすすめします。

例:

```text
Set-Cookie: __Host-example=34d8g; SameSite=None; Secure; Path=/; Partitioned;
```

## 試してみる

[CHIPS のオリジン トライアル](/blog/chips-origin-trial)は Chrome 100～103 で使用できます。

CHIPS は、Chrome 99
でフラグを介して使用することもできます。[chromium.org](https://www.chromium.org/updates/chips/)
でテスト手順とデモをご確認ください。

ローカルで試す場合は、Chrome Canary チャンネルで
`chrome://flags/#partitioned-cookies`
フラグを有効にするか、`--partitioned-cookies=true` コマンドライン
フラグを使用します。

{% Img
   src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Afo08gb3WxuNT77Bi6xc.png",
   alt="Set the partitioned cookies flag to Enabled.",
   width="779", height="329"
%}

## 意見交換とフィードバックの提供

- **GitHub**: [提案](https://github.com/WICG/CHIPS)の確認、[質問の投稿、意見交換](https://github.com/WICG/CHIPS/issues)を行えます。
- **デベロッパー サポート**: [プライバシー サンドボックス デベロッパー サポート リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問や意見交換を行えます。

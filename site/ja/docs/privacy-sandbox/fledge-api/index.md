---
layout: layouts/doc-post.njk
title: 'FLEDGE API: 開発者ガイド'
subhead: クロスサイトサードパーティトラッキングを使わずにリマーケティングとカスタムオーディエンスにサービスを提供するオンデバイス広告オークションの開発者ガイド
description: サードパーティがサイト間でユーザーのブラウジング行動を追跡できないように過去にアクセスしたウェブサイトから関連する広告を選択するように設計された、オンデバイス広告オークションの開発者ガイド。
date: 2022-01-27
updated: 2022-11-01
authors:
  - samdutton
  - kevinkiklee
---

FLEDGE を初めて使用する場合は、この提案の概説について [FLEDGE の概要](/docs/privacy-sandbox/fledge)をお読みください。

この記事は、実験的な FLEDGE API の最新のイテレーションに関するテクニカルリファレンスとして開発者向けに執筆されています。基本的な FLEDGE 導入の[デモ](#demo)と、[広告の購入者と販売者向けの API リファレンス](#api-reference)が提供されています。

## FLEDGE とは？ {: #what}

FLEDGE は、[リマーケティング](/docs/privacy-sandbox/fledge#remarketing)およびカスタムオーディエンスのユースケースに対応するための[プライバシーサンドボックス](/docs/privacy-sandbox/overview)の提案であり、サードパーティがサイトを跨いでユーザーのブラウジング行動を追跡できないように設計されています。この API は、ブラウザによるオンデバイスオークションを有効にし、ユーザーが以前にアクセスしたウェブサイトに関連する広告を選択します。

FLEDGE は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリの提案の中で Chromium に実装された最初の実験です。

## FLEDGE を試す {: #try-fledge}

### 利用可能な API リファレンス {: #api-reference }

このドキュメントは、FLEDGE API の概要として機能します。特定の API メソッドとパラメーターを探している場合は、以下をご覧ください。

- セラー向けの [`joinAdInterestGroup()` と `generateBid()`](/docs/privacy-sandbox/fledge-api/interest-groups) ガイド
- セラー向けの FLEDGE [`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction) ガイド
- バイヤー向けの [`reportWin()`](/docs/privacy-sandbox/fledge-api/reports) ガイドとセラー向けの [`reportResult()`](/docs/privacy-sandbox/fledge-api/reports) ガイド
- [FLEDGE API のトラブルシューティング](/docs/privacy-sandbox/fledge-api/troubleshoot)

また、[FLEDGE 広告オークションの待ち時間に関するベストプラクティス](/docs/privacy-sandbox/fledge-api/latency)もご覧ください。

### FLEDGE デモ {: #demo}

広告主とサイト運営者のサイトにまたがる基本的な FLEDGE のデプロイに関するウォークスルーは、[fledge-demo.glitch.me](https://fledge-demo.glitch.me/) で入手できます。

<figure>{% YouTube id='znDD0gkdJyM' %}<figcaption>FLEDGE デモコードがどのように機能するか、および Chrome DevTools をデバッグに使用する方法について、こちらのエンドツーエンドのデプロイをご覧ください。</figcaption></figure>

### オリジントライアルに参加する {: #origin-trial}

[プライバシーサンドボックスの関連性と測定のオリジントライアル](/docs/privacy-sandbox/unified-origin-trial)は、FLEDGE、[Topics](/docs/privacy-sandbox/topics/)、および [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) API について、デスクトップの Chrome ベータ版 101.0.4951.26 以降で公開されています。

参加するには、[オリジントライアルトークンに登録](/origintrials/#/view_trial/771241436187197441)してください。

トライアルへの登録が完了すると、有効なトライアルトークンを提供するページで FLEDGE API を試すことができます。たとえば、ブラウザに [1 つ以上のインタレストグループに参加](#joinadinterestgroup)するように依頼してから、<a>広告オークションを実行</a>して広告を選択し、表示することができます。

FLEDGE API コードを実行するすべてのページにトライアルトークンを指定します。

- `<head>`のメタタグとして:

```html
<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
```

- HTTP ヘッダーとして:

```text
Origin-Trial: TOKEN_GOES_HERE
```

- プログラムでトークンを提供する:

```javascript
const otMeta = document.createElement('meta');
otMeta.httpEquiv = 'origin-trial';
otMeta.content = 'TOKEN_GOES_HERE';
document.head.append(otMeta);
```

インタレストグループ オーナーによる [`navigator.joinAdInterestGroup()`](#joinadinterestgroup) 呼び出しなどの FLEDGE コードを実行する iframe は、そのオリジンと一致するトークンを提供する必要があります。

[Proposed First FLEDGE Origin Trial Details](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)（提案された最初の FLEDGE オリジントライアルの詳細）には、最初のトライアルの目標に関する詳細と、どの機能がサポートされているかが説明されています。

{% Aside 'caution' %}

有効なトライアルトークンを提供するページであっても、すべてのユーザーがプライバシーサンドボックスの関連性と測定のオリジントライアルの対象となるわけではありません。

[関連性と測定の統一オリジントライアルの概要](/docs/privacy-sandbox/unified-origin-trial#eligible-users)にはその理由が説明されており、オリジントライアル機能を使用する前に使用可能かどうかを検出する方法（検出する必要があります）が示されています。

{% endAside %}

### `chrome://flags` または機能フラグでテストする {: #flags}

デスクトップでは Chrome ベータ版 101.0.4951.26 以降を使って、1 人のユーザーに対して FLEDGE をテストできます。

- `chrome://flags/#privacy-sandbox-ads-apis` を有効にします。
- [コマンドラインでフラグを設定](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)します。利用可能な FLEDGE フラグの全リストは、[Chromium Code Search](https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/about_flags.cc;l=7135;drc=e50bce9adfbbac13d8ec1017f9239fe1ae06cc72) で検索できます。

#### iframe または Fenced Frame に広告を表示する

広告は、設定されているフラグに応じて、`<iframe>` または [`<fencedframe>`](/docs/privacy-sandbox/fenced-frame/) にレンダリングできます。

`<fencedframe>` を使用して広告をレンダリングするには:

```text
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,FencedFrames
```

`<iframe>` を使用して広告をレンダリングするには:

```text
--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge,AllowURNsInIframes --disable-features=FencedFrames
```

`BiddingAndScoringDebugReportingAPI` フラグを含めて、[一時的なデバッグの落札/競り負けレポートメソッド](#temporary-reporting)を有効にします。

{% Aside %}

これは、初期テスト用の FLEDGE の進行中のバージョンです。これは、完全なもの、または最終的な実装を示すものと見なすべきではありません。FLEDGE の進捗状況とステータスは、定期的な WICG 会議で議論されます。

[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline)には、FLEDGE およびその他のプライバシーサンドボックスの提案の実装タイミングが記載されています。

{% endAside %}

## サポートされる機能

Chromium でのフラグ設定による FLEDGE は、FLEDGE 提案の以下の機能をテストするための最初の実験です。

- **インタレストグループ**: 広告の入札とレンダリングを構成するための関連付けられたメタデータとともに、ブラウザによって保存されます。
- **バイヤー（DSP または広告主）によるオンデバイス入札**: 保存されているインタレストグループとセラーからのシグナルに基づきます。
- **セラー（SSP またはサイト運営者）によるオンデバイス広告の選択**: バイヤーからのオークション入札とメタデータに基づきます。
- **一時的に緩和されたバージョンの Fenced Frames での広告レンダリング**: 広告のレンダリングが許可されたネットワークアクセスとロギング。

機能のサポートと制約について詳しくは、[FLEDGE API の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary) をご覧ください。

### インタレストグループの権限

FLEDGE の現在の実装のデフォルトでは、クロスドメイン iframe も含むページ内のどこからでも [`joinAdInterestGroup()`](/docs/privacy-sandbox/fledge-api/interest-groups) を呼び出すことができます。

将来的には、サイト所有者にクロスドメイン iframe の[権限ポリシー](/docs/privacy-sandbox/permissions-policy/)を更新する時間ができたら、クロスドメイン iframe からの呼び出しを禁止する予定です。

### Key/Value サービス

FLEDGE 広告オークションをサポートするために、ブラウザは [Key/Value サービス](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)にアクセスして、FLEDGE 広告オークションをサポートするリアルタイム情報を取得できます。この情報は、さまざまな方法で使用できます。

- バイヤーが、広告キャンペーンの残りの予算を計算する場合。
- セラーが、広告クリエイティブをサイト運営者のポリシーに照らして確認する必要がある場合。

[FLEDGE Key/Value サービスコード](https://github.com/privacysandbox/fledge-key-value-service)が公開されました。ステータスの更新については、[ブログの発表の記事](/blog/open-sourcing-fledge-key-value-service/)をご覧ください。

初期テストでは、 [「Bring Your Own Server」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)モデルが使用されました。長期的には、アドテックは、信頼できる実行環境で実行するオープンソースの FLEDGE Key/Value サービスを使用する必要があります。

タイムラインの更新については、[FLEDGE サービスのブログ記事](/blog/fledge-service-overview/#timeline)をご覧ください。この移行が行われる前に、開発者がテストと採用を開始できるように十分な通知を行います。

### 機能サポートを検出する

API を使用する前に、API がブラウザでサポートされており、ドキュメントで使用できるかどうかを確認してください。

```javascript
'joinAdInterestGroup' in navigator &&
  document.featurePolicy.allowsFeature('join-ad-interest-group') &&
  document.featurePolicy.allowsFeature('run-ad-auction') ?
  console.log('navigator.joinAdInterestGroup() is supported on this page') :
  console.log('navigator.joinAdInterestGroup() is not supported on this page');
```

{% Aside 'caution' %}

現在のページでの機能のサポートは、API が使用できることを保証するものではありません。ユーザーがブラウザの設定で API を無効にしたか、API を使用できないように他の設定をしている可能性があります。ユーザーのプライバシーを保護するために、これをプログラムで確認する方法はありません。

{% endAside %}

## FLEDGE API の仕組み {: #how}

この例では、ユーザーがカスタム バイク メーカーのウェブサイトを閲覧した後、ニュースサイトにアクセスすると、そのバイク メーカーの新しい自転車の広告が表示されます。

{% Aside 'warning' %}

この記事で説明されているすべての機能が、現在 Chrome でテストされている FLEDGE API のバージョンに実装されている（または完全に実装されている）わけではありません。[機能フラグを使用したテスト](#flags)では、 コマンドラインから実行される Chrome で現在どの FLEDGE 機能をテストできるかについて説明されています。

{% endAside %}

FLEDGE の機能は、実装作業が進むにつれて徐々に追加されます。

### 1. ユーザーが広告主のサイトにアクセスする

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png", alt="ノートパソコンのブラウザでカスタムバイクメーカーのサイトにアクセスしている人。", width="400", height="190" %}</figure>

ユーザーがカスタム バイク メーカー（この例では広告主）のウェブサイトにアクセスし、手作りのスチール バイクの製品ページにしばらくアクセスしたとします。これにより、バイク メーカーは[リマーケティング](/docs/privacy-sandbox/glossary#remarketing)の機会を得ることができます。

### 2. ユーザーのブラウザがインタレストグループを追加するよう求められる  {: #joinadinterestgroup}

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png", alt="ノートパソコンでブラウザを開き、サイトにアクセスするユーザー。インタレストグループに参加するための JavaScript コードがブラウザで実行されています。",  width="400", height="187" %}</figure>

広告主のデマンドサイド プラットフォーム（DSP）（または広告主自体）は、`navigator.joinAdInterestGroup()` を呼び出して、ブラウザがメンバーであるグループのリストにインタレストグループを追加するようブラウザに要求します。

この例では、グループの名前は `custom-bikes` で、オーナーは `dsp.example` です。インタレストグループのオーナー（この場合は DSP）は、FLEDGE 広告オークションのバイヤーになります。インタレストグループのメンバーシップは、ブラウザによってユーザーのデバイスに保存され、ブラウザベンダーや他の誰とも共有されません。

- **FLEDGE の Explainer を読む**: [ブラウザによるインタレストグループの記録](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups)
- **API ガイド を読む** : バイヤーと DSP 向け。[`joinAdInterestGroup()`](/docs/privacy-sandbox/fledge-api/interest-groups) に参加して入札を生成する方法を学びます。

{% Aside %} `joinAdInterestGroup()` の呼び出しコンテキストのオリジンは、インタレストグループのオーナーのオリジンと一致する必要があります。

[`joinAdInterestGroup()`](/docs/privacy-sandbox/fledge-api/interest-groups) は、インタレスト グループのオーナーが所有する iframe から（たとえば、DSP から）呼び出す必要があります。現在のドキュメントのオリジンがインタレストグループのオーナーと同じ場合（独自のインタレストグループを持つウェブサイトなど）、iframe は必要ありません。 {% endAside %}

#### インタレストグループの広告を指定する

`ads` および `adComponents` オブジェクトには、広告クリエイティブの URL と、オプションで、入札時に使用できる任意のメタデータが含まれます。以下に例を示します。

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

#### バイヤーの入札方法 {: #generatebid}

`generateBid()` は、インタレストグループのオーナーが入札に招待された場合に、ブラウザがメンバーであるインタレストグループごとに呼び出されます。

[`generatedBid()` 開発者向けドキュメント](/docs/privacy-sandbox/fledge-api/interest-groups#generatebid)をお読みください。

### 3. ユーザーが広告スペースを販売するサイトにアクセスする

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png", alt="ノートパソコンのブラウザでニュースサイトにアクセスしている人。サイトには空の広告スロットがあります。", width="400", height ="182" %}</figure>

後になって、ユーザーは広告スペースを販売するサイト（この例ではニュースサイト）にアクセスします。このサイトには<a>広告枠</a>があり、<a>リアルタイム入札</a>を使用してプログラムで販売しています。

### 4. ブラウザで広告オークションが実行される {: #ad-auction}

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。利用可能な広告スペースの広告を選択するために、FLEDGE 広告オークションが実行されています。", width="400", height="182" %}</figure>

広告オークションは、サイト運営者のサプライサイドプロバイダー（SSP）またはサイト運営者自身によって実行される可能性があります。オークションの目的は、現在のページで使用可能な単一の広告スロットに最も適した広告を選択することです。オークションでは、広告スペースのバイヤーと [Key/Value サービス](#keyvalue-service)のセラーからのデータとともに、ブラウザがメンバーであるインタレストグループが考慮されます。

- **FLEDGE の Explainer を読む**: [セラーによるオンデバイスオークションの実行](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)
- **API ガイドを読む**: セラーは、[`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction/) と [広告オークションの待ち時間のベストプラクティス](/docs/privacy-sandbox/fledge-api/latency)について詳しく知ることができます。

### 5. セラーと参加するバイヤーが、Key/Value サービスにリアルタイムデータをリクエストする

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。FLEDGE API を使用した広告オークションが行われており、参加者が Key/Value サービスからデータを取得しています 。", width="400", height="126" %}</figure>

広告オークション中、セラーは [Key/Value サービス](#keyvalue-service)にリクエストを送信して、特定の広告クリエイティブに関するリアルタイムデータを要求できます。セラーは、`trustedScoringSignalsUrl` プロパティと、オークション内のすべてのインタレストグループの `ads` と `adComponents` フィールドにあるすべてのエントリの `renderUrl` から得るキーを使って、[`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction/) を実行中にこの情報を要求できます。

バイヤーは、`navigator.joinAdInterestGroup()` に渡されるインタレストグループ引数の `trustedBiddingSignalsUrl` と `trustedBiddingSignalsKeys` プロパティを使用して、Key/Value サービスからリアルタイムデータをリクエストできます。

`runAdAuction()` が呼び出されると、ブラウザは各広告バイヤーの信頼できるサーバーにリクエストを送信します。リクエストの URL は以下のようになります。

```javascript
https://kv-service.example/getvalues?hostname=publisher.example&keys=key1,key2
```

- ベース URL は `trustedBiddingSignalsUrl` から取得されます。
- `hostname` はブラウザによって提供されます。
- `keys` の値は `trustedBiddingSignalsKeys` から取得されます。

このリクエストへのレスポンスは、各キーの値を提供する JSON オブジェクトです。

- **FLEDGE の Explainer を読む:** [FLEDGE Key/Value サービスからリアルタイムデータを取得する](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server)。
- **[FLEDGE Key/Value サービスのオープンソース化](/blog/open-sourcing-fledge-key-value-service/)**をお読みください。

{% Aside 'gotchas' %} FLEDGE をテストするための初期実験段階では、`trustedBiddingSignalsUrl` はインタレストグループのオーナーと同じオリジンを持つ必要があります。詳細は、[Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=bring%20your%20own%20server) をご覧ください。 {% endAside %}

### 6. 落札した広告が表示される

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。自転車 20% オフの広告が安全な Fenced Frame に表示されています。", width="400", height="192" %}</figure>

[`runAdAuction()`](/docs/privacy-sandbox/fledge-api/ad-auction) によって返される promise は、URI（統一リソース識別子）に解決されます。この URN は、[Fenced Frame](/docs/privacy-sandbox/fenced-frame) 内のサイトに埋め込まれ、落札広告をレンダリングします。

- **FLEDGE の Explainer を読む**: [ブラウザによる落札広告のレンダリング](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#4-browsers-render-the-winning-ad)

### 7. オークション結果が報告される

長期的には、[プライベート集計 API の API](/docs/privacy-sandbox/private-aggregation) を使用して、ブラウザがセラーとバイヤーのオークション結果をレポートできるようにすることを計画しています。

一時的なイベントレベルのレポートの仕組みとして、セラー用に `reportResult()` を実装し、落札者用に `reportWin()` を実装するコードは、<code>sendReportTo()</code> 関数を呼び出すことができます。これはオークションの完了後に取得される URL を表す文字列を引数として取ります。これにより、レポートされるイベントレベルの情報が暗号化されます。

- **API ガイドを読む**: [セラーとバイヤーのレポート](/docs/privacy-sandbox/fledge-api/reports)についてお読みください。

### 8. 広告クリックがレポートされる

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png", alt="ニュースサイトで Fenced Frame に埋め込まれた自転車の広告をクリックする人。レポートデータはセラーとバイヤーに送られます。" , width="600", height="220" %}</figure>

Fenced Frame にレンダリングされた広告のクリックが報告されます。これがどのように機能するかについて詳しくは、[Fenced Frames 広告のレポート](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent)を参照してください。

<hr>

{: #auction-diagram}

<figure class="w-figure">{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png", alt="FLEDGE 広告オークションの各ステージの概要", width="800", height="481" %}<figcaption>この図は、FLEDGE オークションの各ステージの概要を示しています。 <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&amp;w=1600" target="_blank">拡大版を表示</a>。</figcaption></figure>

{% Details %}

{% DetailsSummary %}

### FLEDGE と TURTLEDOVE の違い

{% endDetailsSummary %}

FLEDGE は、<a>TURTLEDOVE</a> ファミリの提案の中で Chromium に実装された最初の実験です。

FLEDGE は、TURTLEDOVE の高レベルの原則に従います。一部のオンライン広告は、以前に広告主または広告ネットワークとやり取りしたことのある潜在的に関心のある人に広告を表示することに基づいています。これまで、これは広告主がウェブサイトをブラウジングする際に特定の人物を認識することで機能してきました。これが、今日のウェブのプライバシーに関する主な懸念事項です。

TURTLEDOVE の取り組みは、このユースケースに対処するための新しい API を提供すると同時に、プライバシーに関する以下のような重要な進化を提供することにあります。

- 広告主が考えるユーザーの興味についての情報を、広告主ではなくブラウザが保持する。
- 広告主は興味に基づいて広告を配信できますが、その興味を個人に関する他の情報（特に、そのユーザーやアクセスしているページなど）と組み合わせることはできません。

FLEDGE は、TURTLEDOVE と、API を使用する開発者により良いサービスを提供するための変更に関する関連提案のコレクションから生まれました。

- [SPARROW](https://github.com/WICG/sparrow): [Criteo](https://www.admonsters.com/what-is-sparrow/) は、[信頼できる実行環境（TEE）](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment)で実行される（「ゲートキーパー」）サービスモデルの追加を提案しました。 FLEDGE には、リアルタイムのデータ検索と集計レポートのための、より限定された TEE の使用が含まれます。
- NextRoll の [TERN](https://github.com/WICG/turtledove/blob/main/TERN.md) と Magnite の [PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md) の提案には、オンデバイス オークションにおけるバイヤーとセラーのさまざまな役割が説明されています。FLEDGE の広告入札・スコア付けフローは、この作業に基づいています。
- RTB House の[結果ベース](https://github.com/WICG/turtledove/blob/main/OUTCOME_BASED.md)および[プロダクトレベル](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md)の TURTLEDOVE の変更により、匿名モデルとオンデバイス オークションのパーソナライズ機能が改善されました。
- [PARAKEET](https://github.com/WICG/privacy-preserving-ads/blob/main/Parakeet.md) は、ブラウザとアドテック プロバイダーの間の TEE で実行されているプロキシサーバーに依存して広告要求を匿名化し、プライバシーのプロパティを強制する、TURTLEDOVE のような広告サービスに対する Microsoft の提案です。FLEDGE は、このプロキシモデルを採用していません。PARAKEET と FLEDGE の JavaScript API を連携させ、両方の提案の最良の機能をさらに組み合わせる将来の作業をサポートします。

FLEDGE はまだ、ユーザーがどの広告を見たかをウェブサイトの広告ネットワークが学習できないようにしていません。今後、よりプライベートになるように API を変更する予定です。

{% endDetails %}

{% Details %}

{: #user-controls}

{% DetailsSummary %}

### 利用可能なブラウザ構成

{% endDetailsSummary %}

ユーザーは、`chrome://settings/privacySandbox` のトップレベルの設定を有効または無効にすることで、Chrome のプライバシーサンドボックストライアルへの参加を調整できます。

初期のテストでは、ユーザーはこの高レベルのプライバシーサンドボックス設定を通じて FLEDGE をオプトアウトできます。Chrome では、ユーザーがアクセスしたウェブサイト全てで、自分が追加されたインタレストグループのリストを表示および管理できるようにする予定です。プライバシーサンドボックスのテクノロジー自体と同様に、ユーザー設定は、ユーザー、規制当局などからのフィードバックによって進化する可能性があります。

FLEDGE の提案が進むにつれて、[テストとフィードバックに基づいて](/docs/privacy-sandbox/proposal-lifecycle/#collaborate)、Chrome で利用可能な設定を更新し続けます。将来的には、FLEDGE と関連データを管理するためのより詳細な設定を提供する予定です。

ユーザーがシークレットモードで閲覧している場合、API 呼び出し元はグループ メンバーシップにアクセスできません。また、ユーザーがサイトデータを消去すると、メンバーシップが削除されます。

{% endDetails %}

{: #engage}

## 貢献とフィードバックの共有

### サポートを受ける {: #get-support }

実装、デモ、またはドキュメントに関する質問とサポートについては、以下をご覧ください。

- **GitHub**: [提案](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/WICG/turtledove/issues)したりできます。
- **デモ**: [demo code リポジトリ](https://github.com/JackJey/fledge-demo)でイシューを提起してください。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。FLEDGE のイシューテンプレートを選択してください。
- **Chrome の実装**: FLEDGE API の Chrome の実装に関するバグやイシューについて、[既存のイシューを閲覧](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)したり、[新しいイシューを提起](https://crbug.com/new)したりできます。

FLEDGE でのニーズへの対応に関する一般的な質問については、[提案のリポジトリでイシューを報告](https://github.com/WICG/turtledove/issues/new)してください。また、W3C の [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) で業界のユースケースについて話し合うこともできます。

プライバシーサンドボックスの[フィードバックフォーム](/docs/privacy-sandbox/feedback/#feedback-form)を使用すると、公開フォーラムの外で Chrome チームと非公開でフィードバックを共有できます。

#### オプトアウト {: #opt-out}

FLEDGE からのオプトアウトをご希望ですか？サイトオーナーまたは個人ユーザーとして [FLEDGE API へのアクセスをブロックする](/docs/privacy-sandbox/fledge-api/opt-out/)方法をご覧ください。

### アップデートを入手する

- API ステータス変更の通知を受け取るには、[開発者向けメーリングリスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)に参加してください。
- API に関する現在進行中のすべてのディスカッションを細かくフォローするには、[GitHub の提案ページ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)にある **Watch** ボタンをクリックしてください。これには、[GitHub アカウントを持っているか作成する](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account)必要があります。
- プライバシーサンドボックスの包括的な最新情報を入手するには、RSS フィードで「[プライバシーサンドボックスの進行状況](/tags/progress-in-the-privacy-sandbox/)」を購読してください。
- [FLEDGE の定例会議にご参加](https://github.com/WICG/turtledove/issues/88)ください（隔週）。どなたでも参加できますが、参加するにはまず [WICG に参加](https://www.w3.org/community/wicg/)してください。積極的に参加するのでも、聞くだけでも構いません！

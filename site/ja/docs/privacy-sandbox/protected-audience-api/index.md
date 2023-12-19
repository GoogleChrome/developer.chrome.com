---
layout: layouts/doc-post.njk
title: 'Protected Audience API: 開発者ガイド'
subhead: クロスサイト サードパーティトラッキングを使わずにリマーケティングとカスタム オーディエンスにサービスを提供するオンデバイス広告オークションの開発者ガイド
description: サードパーティがサイト間でユーザーのブラウジング行動を追跡できないように過去にアクセスしたウェブサイトから関連する広告を選択するように設計された、オンデバイス広告オークションの開発者ガイド。
date: 2022-01-27
updated: 2023-09-18
authors:
  - samdutton
  - kevinkiklee
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

{% Partial 'privacy-sandbox/ot-end.njk' %}

Protected Audience API を初めて使用する方は、API の概要を説明した [Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)をお読みください。

この記事は、実験的な Protected Audience API の最新のイテレーションに関するテクニカル リファレンスとして開発者向けに執筆されています。基本的な Protected Audience API の導入に関する[デモ](#demo)と、[広告の買い手と売り手向けの API リファレンス](#api-reference)が提供されています。

## 実装状況

{% Partial 'privacy-sandbox/timeline/fledge.njk' %}

## Protected Audience API とは？ {: #what}

Protected Audience API は、[リマーケティング](/docs/privacy-sandbox/overview)およびカスタム オーディエンスのユースケースに対応するための[プライバシー サンドボックス](/docs/privacy-sandbox/protected-audience#remarketing) API であり、サードパーティがサイト間でユーザーのブラウジング行動を追跡できないように設計されています。この API は、ブラウザによるオンデバイス オークションを有効にし、ユーザーが以前にアクセスしたウェブサイトに関連する広告を選択します。

Protected Audience API は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリの提案の中で Chromium に実装された最初の実験です。

## Protected Audience API を試す {: #try-fledge}

### 利用可能な API リファレンス {: #api-reference }

このドキュメントは、Protected Audience API の概要です。特定の API メソッドとパラメーターを探している場合は、以下をご覧ください。

- [`joinAdInterestGroup()` と `generateBid()`](/docs/privacy-sandbox/protected-audience-api/interest-groups) の買い手向けガイド
- Protected Audience API [`runAdAuction()`](/docs/privacy-sandbox/protected-audience-api/ad-auction) の売り手向けガイド
- 買い手向けの [`reportWin()`](/docs/privacy-sandbox/protected-audience-api/reports) ガイドと売り手向けの [`reportResult()`](/docs/privacy-sandbox/protected-audience-api/reports) ガイド
- [Protected Audience API のトラブルシューティング](/docs/privacy-sandbox/protected-audience-api/troubleshoot)

また、[Protected Audience API 広告オークションの待ち時間に関するベストプラクティス](/docs/privacy-sandbox/protected-audience-api/latency)もご覧ください。

### Protected Audience API のデモ {: #demo}

広告主とサイト運営者のサイト間の基本的な Protected Audience API のデプロイに関するウォークスルーは、[protected-audience-demo.web.app](https://protected-audience-demo.web.app/) で入手できます。

<figure>{% YouTube id='znDD0gkdJyM' %}<figcaption>Protected Audience API デモコードがどのように機能するか、および Chrome DevTools をデバッグに使用する方法について、こちらのエンドツーエンドのデプロイをご覧ください。</figcaption></figure>

### `chrome://flags` または機能フラグでテストする {: #flags}

デスクトップでは Chrome ベータ版 101.0.4951.26 以降を使って、1 人のユーザーに対して Protected Audience API をテストできます。

- `chrome://flags/#privacy-sandbox-ads-apis` を有効にします。
- [コマンドラインでフラグを設定](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)します。利用可能な Protected Audience API フラグの全リストは、[Chromium Code Search](https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/about_flags.cc;l=7135;drc=e50bce9adfbbac13d8ec1017f9239fe1ae06cc72) で検索できます。

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

これは、初期テスト用の Protected Audience API の進行中のバージョンです。これは、完全なもの、または最終的な実装を示すものと見なすべきではありません。Protected Audience API の進捗状況とステータスは、定期的な WICG 会議で議論されます。

[プライバシー サンドボックスのタイムライン](https://privacysandbox.com/timeline)には、Protected Audience API やその他のプライバシー サンドボックス提案の実装タイムラインが記載されています。

{% endAside %}

## サポートされる機能

Chromium でのフラグ設定による Protected Audience API は、Protected Audience API の以下の機能をテストするための最初の実験です。

- **インタレスト グループ**: 広告の入札とレンダリングを構成するための関連付けられたメタデータとともに、ブラウザによって保存されます。
- **買い手（DSP または広告主）によるオンデバイス入札**: 保存されているインタレスト グループと売り手からのシグナルに基づきます。
- **売り手（SSP またはサイト運営者）によるオンデバイス広告の選択**: 買い手からのオークション入札とメタデータに基づきます。
- **一時的に緩和されたバージョンの Fenced Frames での広告レンダリング**: 広告のレンダリングが許可されたネットワーク アクセスとロギング。

機能のサポートと制約について詳しくは、[Protected Audience API の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary) をご覧ください。

### インタレスト グループの権限

Protected Audience API の現在の実装のデフォルトでは、クロスドメイン iframe も含むページ内のどこからでも [`joinAdInterestGroup()`](/docs/privacy-sandbox/protected-audience-api/interest-groups) を呼び出すことができます。

将来的には、サイト所有者にクロスドメイン iframe の[権限ポリシー](/docs/privacy-sandbox/permissions-policy/)を更新する時間ができたら、クロスドメイン iframe からの呼び出しを禁止する予定です。

### Key/Value サービス

Protected Audience API 広告オークションをサポートするために、ブラウザは [Key/Value サービス](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)にアクセスして、Protected Audience API 広告オークションをサポートするリアルタイム情報を取得できます。この情報は、さまざまな方法で使用できます。

- 買い手が、広告キャンペーンの残りの予算を計算する場合。
- 売り手が、広告クリエイティブをサイト運営者のポリシーに照らして確認する必要がある場合。

[Protected Audience API Key/Value サービスコード](https://github.com/privacysandbox/fledge-key-value-service)が公開されました。ステータスの更新については、[ブログの発表記事](/blog/open-sourcing-fledge-key-value-service/)をご覧ください。

初期テストでは、 [「Bring Your Own Server」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)モデルが使用されました。長期的には、アドテックは、信頼できる実行環境で実行するオープンソースの Protected Audience API Key/Value サービスを使用する必要があります。

タイムラインの更新については、[Protected Audience API サービスのブログ記事](/blog/fledge-service-overview/#timeline)をご覧ください。この移行が行われる前に、開発者がテストと採用を開始できるように十分な通知を行います。

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

## Protected Audience API の仕組み {: #how}

この例では、ユーザーがカスタム バイク メーカーのウェブサイトを閲覧した後、ニュースサイトにアクセスすると、そのバイク メーカーの新しい自転車の広告が表示されます。

{% Aside 'warning' %}

この記事で説明されているすべての機能が、現在 Chrome でテストされている Protected Audience API のバージョンに実装されている（または完全に実装されている）わけではありません。[機能フラグを使用したテスト](#flags)では、 コマンドラインから実行される Chrome で現在どの Protected Audience API 機能をテストできるかについて説明されています。

{% endAside %}

Protected Audience API の機能は、実装の作業が進むにつれて追加されます。

### 1. ユーザーが広告主のサイトにアクセスする

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png", alt="ノートパソコンのブラウザでカスタムバイクメーカーのサイトにアクセスしている人。", width="400", height="190" %}</figure>

ユーザーがカスタム バイク メーカー（この例では広告主）のウェブサイトにアクセスし、手作りのスチール バイクの製品ページにしばらくアクセスしたとします。これにより、バイク メーカーは[リマーケティング](/docs/privacy-sandbox/glossary#remarketing)の機会を得ることができます。

### 2. ユーザーのブラウザがインタレスト グループを追加するよう求められる  {: #joinadinterestgroup}

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png", alt="ノートパソコンでブラウザを開き、サイトにアクセスするユーザー。インタレスト グループに参加するための JavaScript コードがブラウザで実行されています。",  width="400", height="187" %}</figure>

広告主のデマンドサイド プラットフォーム（DSP）（または広告主自体）は、`navigator.joinAdInterestGroup()` を呼び出して、ブラウザがメンバーであるグループのリストにインタレストグループを追加するようブラウザに要求します。

この例では、グループの名前は `custom-bikes` で、オーナーは `dsp.example` です。インタレスト グループのオーナー（この場合は DSP）は、Protected Audience API 広告オークションの買い手になります。インタレスト グループのメンバーシップは、ブラウザによってユーザーのデバイスに保存され、ブラウザベンダーや他の誰とも共有されません。

- **Protected Audience API の Explainer を読む**: [ブラウザによるインタレスト グループの記録](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups)
- **API ガイド を読む** : 買い手と DSP 向け。[`joinAdInterestGroup()`](/docs/privacy-sandbox/protected-audience-api/interest-groups) に参加して入札を生成する方法を学びます。

{% Aside %} `joinAdInterestGroup()` の呼び出しコンテキストのオリジンは、インタレスト グループのオーナーのオリジンと一致する必要があります。

[`joinAdInterestGroup()`](/docs/privacy-sandbox/protected-audience-api/interest-groups) は、インタレスト グループのオーナーが所有する iframe から（たとえば、DSP から）呼び出す必要があります。現在のドキュメントのオリジンがインタレスト グループのオーナーと同じ場合（独自のインタレスト グループを持つウェブサイトなど）、iframe は必要ありません。 {% endAside %}

#### インタレストグループの広告を指定する

`ads` および `adComponents` オブジェクトには、広告クリエイティブの URL と、オプションで、入札時に使用できる任意のメタデータが含まれます。以下に例を示します。

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

#### 買い手の入札方法 {: #generatebid}

`generateBid()` は、インタレストグループのオーナーが入札に招待された場合に、ブラウザがメンバーであるインタレスト グループごとに呼び出されます。

[`generatedBid()` 開発者向けドキュメント](/docs/privacy-sandbox/protected-audience-api/interest-groups#generatebid)をお読みください。

### 3. ユーザーが広告スペースを販売するサイトにアクセスする

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png", alt="ノートパソコンのブラウザでニュースサイトにアクセスしている人。サイトには空の広告スロットがあります。", width="400", height ="182" %}</figure>

後になって、ユーザーは広告スペースを販売するサイト（この例ではニュースサイト）にアクセスします。このサイトには<a>広告枠</a>があり、<a>リアルタイム入札</a>を使用してプログラムで販売しています。

### 4. ブラウザで広告オークションが実行される {: #ad-auction}

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。利用可能な広告スペースの広告を選択するために、Protected Audience API 広告オークションが実行されています。", width="400", height="182" %}</figure>

広告オークションは、サイト運営者のサプライサイド プロバイダー（SSP）またはサイト運営者自身によって実行される可能性があります。オークションの目的は、現在のページで使用可能な単一の広告スロットに最も適した広告を選択することです。オークションでは、広告スペースの買い手と [Key/Value サービス](#keyvalue-service)の売り手からのデータとともに、ブラウザがメンバーであるインタレスト グループが考慮されます。

- **Protected Audience API の Explainer を読む**: [売り手によるオンデバイス オークションの実行](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)
- **API ガイドを読む**: 売り手は、[`runAdAuction()`](/docs/privacy-sandbox/protected-audience-api/ad-auction/) と [広告オークションの待ち時間のベストプラクティス](/docs/privacy-sandbox/protected-audience-api/latency)について詳しく知ることができます。

### 5. 売り手と参加する買い手が、Key/Value サービスにリアルタイム データをリクエストする

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。Protected Audience API を使用した広告オークションが行われており、参加者が Key/Value サービスからデータを取得しています 。", width="400", height="126" %}</figure>

広告オークション中、売り手は [Key/Value サービス](#keyvalue-service)にリクエストを送信して、特定の広告クリエイティブに関するリアルタイム データを要求できます。売り手は、<code>trustedScoringSignalsUrl</code> プロパティと、オークション内のすべてのインタレスト グループの `ads` と `adComponents` フィールドにあるすべてのエントリの `renderUrl` から得るキーを使って、<a><code data-md-type="codespan">runAdAuction()</code></a> を実行中にこの情報を要求できます。

買い手は、`navigator.joinAdInterestGroup()` に渡されるインタレスト グループ引数の `trustedBiddingSignalsUrl` と `trustedBiddingSignalsKeys` プロパティを使用して、Key/Value サービスからリアルタイム データをリクエストできます。

`runAdAuction()` が呼び出されると、ブラウザは各広告の買い手の信頼できるサーバーにリクエストを送信します。リクエストの URL は以下のようになります。

```javascript
https://kv-service.example/getvalues?hostname=publisher.example&keys=key1,key2
```

- ベース URL は `trustedBiddingSignalsUrl` から取得されます。
- `hostname` はブラウザによって提供されます。
- `keys` の値は `trustedBiddingSignalsKeys` から取得されます。

このリクエストへのレスポンスは、各キーの値を提供する JSON オブジェクトです。

- **Protected Audience API の Explainer を読む:** [Protected Audience API Key/Value サービスからリアルタイム データを取得する](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server)。
- **[Protected Audience API Key/Value サービスのオープンソース化](/blog/open-sourcing-fledge-key-value-service/)**をお読みください。

{% Aside 'gotchas' %} Protected Audience API をテストするための初期実験段階では、`trustedBiddingSignalsUrl` はインタレスト グループのオーナーと同じオリジンを持つ必要があります。詳細は、[Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=bring%20your%20own%20server) をご覧ください。 {% endAside %}

### 6. 落札した広告が表示される

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。自転車 20% オフの広告が安全な Fenced Frame に表示されています。", width="400", height="192" %}</figure>

[runAdAuction()](/docs/privacy-sandbox/protected-audience-api/ad-auction/) によって返される Promise は、オークション構成で `resolveToConfig` フラグが `true` に設定されている場合、Fenced Frame 構成オブジェクト（`FencedFrameConfig`）に解決されます。フレーム構成は、フレームを落札広告に移動する目的で Fenced Frame によって使用されますが、広告の URL はフレームのエンベッダーには表示されません。

{% Aside 'important' %} `FencedFrameConfig` オブジェクトは、オークション構成でフラグ `resolveToConfig` が `true` に設定されている場合にのみ返されます。フラグが設定されていないか `false` の場合、iframe でのみレンダリングできる不透明な [URN](https://en.wikipedia.org/wiki/Uniform_Resource_Name) が返されます。{% endAside %}

Fenced Frame 構成オブジェクトは、M114 以降で利用可能です。`FencedFrameConfig` オブジェクトの詳細については、[Chrome ブログの記事](/docs/privacy-sandbox/fenced-frame)をご覧ください。

- **Protected Audience API の Explainer を読む**: [ブラウザによる落札広告のレンダリング](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#4-browsers-render-the-winning-ad)

### 7. オークション結果が報告される

長期的には、[Private Aggregation API](/docs/privacy-sandbox/private-aggregation) を使用して、ブラウザが売り手と買い手にオークション結果をレポートできるようにすることを計画しています。

一時的なイベントレベルのレポートの仕組みとして、売り手用に `reportResult()` を実装し、落札者用に `reportWin()` を実装するコードは、<code>sendReportTo()</code> 関数を呼び出すことができます。これはオークションの完了後に取得される URL を表す文字列を引数として取ります。これにより、レポートされるイベントレベルの情報が暗号化されます。

- **API ガイドを読む**: [売り手と買い手のレポート](/docs/privacy-sandbox/protected-audience-api/reports)についてお読みください。

### 8. 広告クリックがレポートされる

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png", alt="ニュースサイトで Fenced Frame に埋め込まれた自転車の広告をクリックする人。レポートデータは売り手と買い手に送られます。" , width="600", height="220" %}</figure>

Fenced Frame にレンダリングされた広告のクリックが報告されます。これがどのように機能するかについて詳しくは、[Fenced Frames 広告のレポート](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent)を参照してください。

<hr>

{: #auction-diagram}

<figure class="w-figure">{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png", alt="Protected Audience API 広告オークションの各ステージの概要", width="800", height="481" %}<figcaption>この図は、Protected Audience API オークションの各ステージの概要を示しています。 <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&amp;w=1600" target="_blank">拡大版を表示</a>。</figcaption></figure>

{% Details %}

{% DetailsSummary %}

### Protected Audience API と TURTLEDOVE の違い

{% endDetailsSummary %}

Protected Audience API は、TURTLEDOVE ファミリの提案の中で Chromium に実装された最初の実験です。

Protected Audience API は、TURTLEDOVE の高レベルの原則に従います。一部のオンライン広告は、以前に広告主または広告ネットワークとやり取りしたことのある潜在的に関心のある人に広告を表示することに基づいています。これまで、これは広告主がウェブサイトをブラウジングする際に特定の人物を認識することで機能してきました。これが、今日のウェブのプライバシーに関する主な懸念事項です。

TURTLEDOVE の取り組みは、このユースケースに対処するための新しい API を提供すると同時に、プライバシーに関する以下のような重要な進化を提供することにあります。

- 広告主が考えるユーザーの興味についての情報を、広告主ではなくブラウザが保持する。
- 広告主は興味に基づいて広告を配信できますが、その興味を個人に関する他の情報（特に、そのユーザーやアクセスしているページなど）と組み合わせることはできません。

Protected Audience API は、TURTLEDOVE と、API を使用する開発者により良いサービスを提供するための修正に関する一連の関連提案から生まれました。

- [SPARROW](https://github.com/WICG/sparrow): [Criteo](https://www.admonsters.com/what-is-sparrow/) は、[信頼できる実行環境（TEE）](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment)で実行される（「ゲートキーパー」）サービスモデルの追加を提案しました。 Protected Audience API には、リアルタイムのデータ検索と集計レポートのための、より限定された TEE の使用が含まれます。
- NextRoll の [TERN](https://github.com/WICG/turtledove/blob/main/TERN.md) と Magnite の [PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md) の提案には、オンデバイス オークションにおける買い手と売り手のさまざまな役割が説明されています。Protected Audience API の広告入札・スコア付けフローは、この作業に基づいています。
- RTB House の[結果ベース](https://github.com/WICG/turtledove/blob/main/OUTCOME_BASED.md)および[プロダクトレベル](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md)の TURTLEDOVE の変更により、匿名モデルとオンデバイス オークションのパーソナライズ機能が改善されました。
- [PARAKEET](https://github.com/WICG/privacy-preserving-ads/blob/main/Parakeet.md) は、ブラウザとアドテック プロバイダーの間の TEE で実行されているプロキシサーバーに依存して広告要求を匿名化し、プライバシーのプロパティを強制する、TURTLEDOVE のような広告サービスに対する Microsoft の提案です。Protected Audience API は、このプロキシモデルを採用していません。PARAKEET と Protected Audience API の JavaScript API を連携させ、両方の提案の最良の機能をさらに組み合わせる将来の作業をサポートします。

Protected Audience API はまだ、ユーザーがどの広告を見たかをウェブサイトの広告ネットワークが学習できないようにしていません。今後、よりプライベートになるように API を変更する予定です。

{% endDetails %}

{% Details %}

{% DetailsSummary %}

### Topics API と Protected Audience API を併用できますか？

{% endDetailsSummary %}

はい。Protected Audience API によって提供される、現在のユーザーについて観察されたトピックは、売り手または入札者がコンテキスト情報として使用することができます。トピックは、次のプロパティに含めることができます。

- `auctionSignals`: `navigator.runAdAuction()` に渡されるオークション構成オブジェクトのプロパティ
- `userBiddingSignals`: `navigator.joinAdInterestGroup()` に渡されるインタレスト グループ構成オブジェクトのプロパティ

{% endDetails %}

{% Details %} {% DetailsSummary %}

### 利用可能なブラウザ構成 {: #user-controls}

{% endDetailsSummary %}

ユーザーは、`chrome://settings/privacySandbox` のトップレベルの設定を有効または無効にすることで、Chrome のプライバシー サンドボックス トライアルへの参加を調整できます。

初期のテストでは、ユーザーはこの高レベルのプライバシー サンドボックス設定を通じて Protected Audience API をオプトアウトできます。Chrome では、ユーザーがアクセスしたウェブサイト全てで、自分が追加されたインタレストグループのリストを表示および管理できるようにする予定です。プライバシー サンドボックスのテクノロジー自体と同様に、ユーザー設定は、ユーザー、規制当局などからのフィードバックによって進化する可能性があります。

[テストとフィードバックに基づいて](/docs/privacy-sandbox/proposal-lifecycle/#collaborate)、Chrome で利用可能な設定を更新し続けます。将来的には、Protected Audience API と関連データを管理するためのより詳細な設定を提供する予定です。

ユーザーがシークレットモードで閲覧している場合、API 呼び出し元はグループ メンバーシップにアクセスできません。また、ユーザーがサイトデータを消去すると、メンバーシップが削除されます。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Protected Audience ワークレットはブラウザによってキャッシュされますか？

{% endDetailsSummary %}

Protected Audience ワークレット（買い手の入札生成とレポートのワークレット、および売り手の広告スコアリングとレポートのワークレット）を含むリソースは、ブラウザによってキャッシュされます。キャッシュの動作は、`Cache-Control` ヘッダーを使用して制御することが可能です。{% endDetails %}

{: #engage}

## 貢献とフィードバックの共有

### サポートを受ける {: #get-support }

実装、デモ、またはドキュメントに関する質問とサポートについては、以下をご覧ください。

- **GitHub**: [Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/WICG/turtledove/issues)したりできます。
- **デモ**: [demo code リポジトリ](https://github.com/GoogleChromeLabs/protected-audience-demo)でイシューを提起してください。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。Protected Audience API のイシュー テンプレートを選択してください。
- **Chrome の実装**: Protected Audience API の Chrome の実装に関するバグやイシューについて、[既存のイシューを閲覧](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)したり、[新しいイシューを提起](https://crbug.com/new)したりできます。

Protected Audience API でのニーズへの対応に関する一般的な質問については、[API のリポジトリでイシューを報告](https://github.com/WICG/turtledove/issues/new)してください。また、W3C の [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) で業界のユースケースについて話し合うこともできます。

プライバシー サンドボックスの[フィードバック フォーム](/docs/privacy-sandbox/feedback/#feedback-form)を使用すると、公開フォーラムの外で Chrome チームと非公開でフィードバックを共有できます。

#### オプトアウト {: #opt-out}

Protected Audience API からのオプトアウトをご希望ですか？サイトオーナーまたは個人ユーザーとして [Protected Audience API へのアクセスをブロックする](/docs/privacy-sandbox/protected-audience-api/opt-out/)方法をご覧ください。

### アップデートを入手する

- API ステータス変更の通知を受け取るには、[開発者向けメーリングリスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)に参加してください。
- API に関する現在進行中のすべてのディスカッションを細かくフォローするには、[GitHub の API ページ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)にある **Watch** ボタンをクリックしてください。これには、[GitHub アカウントを持っているか作成する](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account)必要があります。
- プライバシー サンドボックスの包括的な最新情報を入手するには、RSS フィードで「[プライバシー サンド ボックスの進行状況](/tags/progress-in-the-privacy-sandbox/)」を購読してください。
- [Protected Audience API の定例会議にご参加](https://github.com/WICG/turtledove/issues/88)ください（隔週）。どなたでも参加できますが、参加するにはまず、[WICG に参加](https://www.w3.org/community/wicg/)してください。積極的に参加することも、聞くだけでも構いません。

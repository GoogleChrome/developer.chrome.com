---
layout: layouts/doc-post.njk
title: 'Protected Audience API: 開発者ガイド'
subhead: |2

  Developer guide for on-device ad auctions to serve remarketing and custom audiences,
  without cross-site third-party tracking.
description: サードパーティがサイト間でユーザーのブラウジング行動を追跡できないように過去にアクセスしたウェブサイトから関連する広告を選択するように設計された、オンデバイス広告オークションの開発者ガイド。
date: '2022-01-27'
updated: '2023-09-18'
authors:
  - samdutton
  - kevinkiklee
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

{% Partial 'privacy-sandbox/ot-end.njk' %}

Protected Audience API を初めて使用する方は、API の概要を説明した [Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)をお読みください。

This post is written for developers as a technical reference for the most recent iteration of the experimental Protected Audience API. A [demo](#demo) of a basic Protected Audience API deployment is available, as are [API references for ad buyers and sellers](#api-reference).

## Implementation status

{% Partial 'privacy-sandbox/timeline/fledge.njk' %}

## Protected Audience API とは？ {: #what}

The Protected Audience API is a [Privacy Sandbox](/docs/privacy-sandbox/overview) API designed to serve [remarketing](/docs/privacy-sandbox/protected-audience#remarketing) and custom audience use cases, designed so that it cannot be used by third parties to track user browsing behavior across sites. The API enables on-device auctions by the browser, to choose relevant ads for websites the user has previously visited.

Protected Audience API は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリの提案の中で Chromium に実装された最初の実験です。

## Protected Audience API を試す {: #try-fledge}

### 利用可能な API リファレンス {: #api-reference }

このドキュメントは、Protected Audience API の概要です。特定の API メソッドとパラメーターを探している場合は、以下をご覧ください。

- Buyers guide for [`joinAdInterestGroup()` and `generateBid()`](/docs/privacy-sandbox/protected-audience-api/interest-groups).
- Seller's guide for the Protected Audience API [`runAdAuction()`](/docs/privacy-sandbox/protected-audience-api/ad-auction)
- Buyers guide to [`reportWin()`](/docs/privacy-sandbox/protected-audience-api/reports) and sellers guide to [`reportResult()`](/docs/privacy-sandbox/protected-audience-api/reports)
- [Protected Audience API のトラブルシューティング](/docs/privacy-sandbox/protected-audience-api/troubleshoot)

また、[Protected Audience API 広告オークションの待ち時間に関するベストプラクティス](/docs/privacy-sandbox/protected-audience-api/latency)もご覧ください。

### Protected Audience API のデモ {: #demo}

A walk-through of a basic Protected Audience API deployment across advertiser and publisher sites is available at [protected-audience-demo.web.app/](https://protected-audience-demo.web.app/).

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

The [Privacy Sandbox timeline](https://privacysandbox.com/timeline) provides implementation timelines for Protected Audience API and other Privacy Sandbox APIs.

{% endAside %}

## サポートされる機能

Chromium でのフラグ設定による Protected Audience API は、Protected Audience API の以下の機能をテストするための最初の実験です。

- **Interest groups**: stored by the browser, with associated metadata to configure ad bidding and rendering.
- **On-device bidding by buyers (DSP or advertiser)**: based on stored interest groups and signals from the seller.
- **On-device ad selection by the seller (SSP or publisher)**: based on auction bids and metadata from buyers.
- **Ad rendering in a temporarily relaxed version of Fenced Frames**: with network access and logging allowed for ad rendering.

機能のサポートと制約について詳しくは、[Protected Audience API の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary) をご覧ください。

### Interest group permissions

Protected Audience API の現在の実装のデフォルトでは、クロスドメイン iframe も含むページ内のどこからでも [`joinAdInterestGroup()`](/docs/privacy-sandbox/protected-audience-api/interest-groups) を呼び出すことができます。

将来的には、サイト所有者にクロスドメイン iframe の[権限ポリシー](/docs/privacy-sandbox/permissions-policy/)を更新する時間ができたら、クロスドメイン iframe からの呼び出しを禁止する予定です。

### Key/Value サービス

Protected Audience API 広告オークションをサポートするために、ブラウザは [Key/Value サービス](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)にアクセスして、Protected Audience API 広告オークションをサポートするリアルタイム情報を取得できます。この情報は、さまざまな方法で使用できます。

- Buyers may want to calculate the remaining budget in an ad campaign.
- Sellers may be required to check ad creatives against publisher policies.

The [Protected Audience API key/value service code](https://github.com/privacysandbox/fledge-key-value-service) is now available. Check out the [announcement blog post](/blog/open-sourcing-fledge-key-value-service/) for the status update.

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

### 2. The user's browser is asked to add an interest group {: #joinadinterestgroup}

<figure> {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png",   alt="A user opens a browser on their laptop and visits a site. JavaScript   code for joining ad interest groups is running in the browser.", width="400", height="187" %} </figure>

広告主のデマンドサイド プラットフォーム（DSP）（または広告主自体）は、`navigator.joinAdInterestGroup()` を呼び出して、ブラウザがメンバーであるグループのリストにインタレストグループを追加するようブラウザに要求します。

In this example, the group is named `custom-bikes`, and the owner is `dsp.example`. The interest group owner (in this case, the DSP) will be a buyer in the Protected Audience API ad auction. Interest group membership is stored by the browser, on the user's device, and is not shared with the browser vendor or anyone else.

- **Read the Protected Audience API explainer**: [Browsers Record Interest Groups](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups).
- **Read the API guide**: buyers and DSPs, learn how to [`joinAdInterestGroup()`](/docs/privacy-sandbox/protected-audience-api/interest-groups) and generate bids.

{% Aside %} The origin of the calling context for `joinAdInterestGroup()` must match the interest group owner's origin.

[`joinAdInterestGroup()`](/docs/privacy-sandbox/protected-audience-api/interest-groups) must be called from an iframe owned by the interest group owner (for example, from a DSP). If the origin of the current document is the same as the interest group owner (for example, a website with its own interest groups), no iframe is needed. {% endAside %}

#### インタレストグループの広告を指定する

`ads` および `adComponents` オブジェクトには、広告クリエイティブの URL と、オプションで、入札時に使用できる任意のメタデータが含まれます。以下に例を示します。

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

#### How do buyers make bids? {: #generatebid}

`generateBid()` is called for each interest group that the browser is a member of—if the interest group's owner is invited to bid.

Read the [`generatedBid()` developer documentation](/docs/privacy-sandbox/protected-audience-api/interest-groups#generatebid).

### 3. ユーザーが広告スペースを販売するサイトにアクセスする

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png", alt="ノートパソコンのブラウザでニュースサイトにアクセスしている人。サイトには空の広告スロットがあります。", width="400", height ="182" %}</figure>

後になって、ユーザーは広告スペースを販売するサイト（この例ではニュースサイト）にアクセスします。このサイトには<a>広告枠</a>があり、<a>リアルタイム入札</a>を使用してプログラムで販売しています。

### 4. ブラウザで広告オークションが実行される {: #ad-auction}

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。利用可能な広告スペースの広告を選択するために、Protected Audience API 広告オークションが実行されています。", width="400", height="182" %}</figure>

The ad auction is likely to be run by the publisher's supply-side provider (SSP), or the publisher itself. The purpose of the auction is to select the most appropriate ad for a single available ad slot on the current page. The auction takes into account the interest groups the browser is a member of, along with data from ad-space buyers and the sellers from the [Key/Value services](#keyvalue-service).

- **Read the Protected Audience API explainer**: [Sellers Run On-Device Auctions](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)
- **Read the API guide**: sellers can learn more about [`runAdAuction()`](/docs/privacy-sandbox/protected-audience-api/ad-auction/) and the [ad auction latency best practices](/docs/privacy-sandbox/protected-audience-api/latency).

### 5. The seller and participating buyers request real-time data from the Key/Value service

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。Protected Audience API を使用した広告オークションが行われており、参加者が Key/Value サービスからデータを取得しています 。", width="400", height="126" %}</figure>

During an ad auction, the seller can request real-time data about specific ad creatives by making a request to their [Key/Value service](#keyvalue-service). The seller can request this information during [`runAdAuction()`](/docs/privacy-sandbox/protected-audience-api/ad-auction/) by the `trustedScoringSignalsUrl` property, along with the keys from the `renderUrl` properties of all entries in the `ads` and `adComponents` fields of all interest groups in the auction.

A buyer can request real-time data from their Key/Value service using the `trustedBiddingSignalsUrl` and `trustedBiddingSignalsKeys` properties of the interest group argument passed to `navigator.joinAdInterestGroup()`.

When  `runAdAuction()` is called, the browser makes a request to each ad buyer's trusted server. The URL for the request might look like this:

```javascript
https://kv-service.example/getvalues?hostname=publisher.example&keys=key1,key2
```

- ベース URL は `trustedBiddingSignalsUrl` から取得されます。
- `hostname` はブラウザによって提供されます。
- `keys` の値は `trustedBiddingSignalsKeys` から取得されます。

このリクエストへのレスポンスは、各キーの値を提供する JSON オブジェクトです。

- **Read the Protected Audience API explainer**: [Fetching Real-Time Data from the Protected Audience API Key/Value service](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server).
- **[Protected Audience API Key/Value サービスのオープンソース化](/blog/open-sourcing-fledge-key-value-service/)**をお読みください。

{% Aside 'gotchas' %} While in the initial experimental phase of testing the Protected Audience API, `trustedBiddingSignalsUrl` must have the same origin as the interest group owner. Learn more in [Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=bring%20your%20own%20server). {% endAside %}

### 6. 落札した広告が表示される

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人。自転車 20% オフの広告が安全な Fenced Frame に表示されています。", width="400", height="192" %}</figure>

[runAdAuction()](/docs/privacy-sandbox/protected-audience-api/ad-auction/) によって返される Promise は、オークション構成で `resolveToConfig` フラグが `true` に設定されている場合、Fenced Frame 構成オブジェクト（`FencedFrameConfig`）に解決されます。フレーム構成は、フレームを落札広告に移動する目的で Fenced Frame によって使用されますが、広告の URL はフレームのエンベッダーには表示されません。

{% Aside ' important' %} `FencedFrameConfig` オブジェクトは、オークション構成でフラグ `resolveToConfig` が `true` に設定されている場合にのみ返されます。フラグが設定されていないか `false` の場合、iframe でのみレンダリングできる不透明な [URN](https://en.wikipedia.org/wiki/Uniform_Resource_Name) が返されます。{% endAside %}

Fenced Frame 構成オブジェクトは、M114 以降で利用可能です。`FencedFrameConfig` オブジェクトの詳細については、[Chrome ブログの記事](/docs/privacy-sandbox/fenced-frame)をご覧ください。

- **Protected Audience API の Explainer を読む**: [ブラウザによる落札広告のレンダリング](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#4-browsers-render-the-winning-ad)

### 7. オークション結果が報告される

The long-term plan is to allow the browser to report auction results for the seller and buyers using the [Private Aggregation APIs](/docs/privacy-sandbox/private-aggregation).

As a temporary event-level reporting mechanism, the code implementing `reportResult()` for the seller, and `reportWin()` for the winning bidder, can call the `sendReportTo()` function. This takes a single argument: a string representing a URL that is fetched after the auction completes, which encodes event-level information to be reported.

- **Read the API guide**: learn about [seller and buyer reporting](/docs/privacy-sandbox/protected-audience-api/reports)

### 8. 広告クリックがレポートされる

<figure> {% Img   src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png",   alt="A person clicks on an ad for a bike, embedded with a fenced frame, on a news website. The report data is sent to seller and buyers.",   width="600", height="220" %} </figure>

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
- NextRoll's [TERN](https://github.com/WICG/turtledove/blob/main/TERN.md) and Magnite's [PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md) proposals described the different roles that buyers and sellers had in the on-device auction. The Protected Audience API's ad bidding/scoring flow is based on this work.
- RTB House の[結果ベース](https://github.com/WICG/turtledove/blob/main/OUTCOME_BASED.md)および[プロダクトレベル](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md)の TURTLEDOVE の変更により、匿名モデルとオンデバイス オークションのパーソナライズ機能が改善されました。
- [PARAKEET](https://github.com/WICG/privacy-preserving-ads/blob/main/Parakeet.md) は、ブラウザとアドテック プロバイダーの間の TEE で実行されているプロキシサーバーに依存して広告要求を匿名化し、プライバシーのプロパティを強制する、TURTLEDOVE のような広告サービスに対する Microsoft の提案です。Protected Audience API は、このプロキシモデルを採用していません。PARAKEET と Protected Audience API の JavaScript API を連携させ、両方の提案の最良の機能をさらに組み合わせる将来の作業をサポートします。

Protected Audience API はまだ、ユーザーがどの広告を見たかをウェブサイトの広告ネットワークが学習できないようにしていません。今後、よりプライベートになるように API を変更する予定です。

{% endDetails %}

{% Details %}

{% DetailsSummary %}

### Topics API と Protected Audience API を併用できますか？

{% endDetailsSummary %} Yes. An observed topic for the current user, provided by the [Topics API](/docs/privacy-sandbox/topics/), could be used as contextual information by a seller or bidder. A topic could be included in the following properties:

- `auctionSignals`, a property of the auction configuration object passed to `navigator.runAdAuction()`
- `userBiddingSignals`, a property of the interest group configuration object passed to `navigator.joinAdInterestGroup()`

{% endDetails %}

{% Details %} {% DetailsSummary %}

### 利用可能なブラウザ構成 {: #user-controls}

{% endDetailsSummary %}

Users can adjust their participation for Privacy Sandbox trials in Chrome by enabling or disabling the top-level setting in `chrome://settings/privacySandbox`.

During initial testing, people will be able to use this high-level Privacy Sandbox setting to opt-out of the Protected Audience API. Chrome plans to allow users to see and manage the list of interest groups that they have been added to across the web sites they have visited. As with the Privacy Sandbox technologies themselves, user settings may evolve with feedback from users, regulators and others.

[テストとフィードバックに基づいて](/docs/privacy-sandbox/proposal-lifecycle/#collaborate)、Chrome で利用可能な設定を更新し続けます。将来的には、Protected Audience API と関連データを管理するためのより詳細な設定を提供する予定です。

ユーザーがシークレットモードで閲覧している場合、API 呼び出し元はグループ メンバーシップにアクセスできません。また、ユーザーがサイトデータを消去すると、メンバーシップが削除されます。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Protected Audience ワークレットはブラウザによってキャッシュされますか？

{% endDetailsSummary %}

The resources that contain the Protected Audience worklets—the buyer's bid generation and reporting worklets, and seller's ad scoring and reporting worklets—are cached by the browser. You can use the `Cache-Control` header to control the caching behavior. {% endDetails %}

{: #engage}

## 貢献とフィードバックの共有

### サポートを受ける {: #get-support }

実装、デモ、またはドキュメントに関する質問とサポートについては、以下をご覧ください。

- **GitHub**: [Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/WICG/turtledove/issues)したりできます。
- **Demo**: Raise an issue on the [demo code repository](https://github.com/GoogleChromeLabs/protected-audience-demo).
- **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support). Select the issue template for the Protected Audience API.
- **Chrome の実装**: Protected Audience API の Chrome の実装に関するバグやイシューについて、[既存のイシューを閲覧](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)したり、[新しいイシューを提起](https://crbug.com/new)したりできます。

Protected Audience API でのニーズへの対応に関する一般的な質問については、[API のリポジトリでイシューを報告](https://github.com/WICG/turtledove/issues/new)してください。また、W3C の [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) で業界のユースケースについて話し合うこともできます。

Use the Privacy Sandbox [feedback form](/docs/privacy-sandbox/feedback/#feedback-form) to share feedback privately with the Chrome team outside of public forums.

#### オプトアウト {: #opt-out}

Protected Audience API からのオプトアウトをご希望ですか？サイトオーナーまたは個人ユーザーとして [Protected Audience API へのアクセスをブロックする](/docs/privacy-sandbox/protected-audience-api/opt-out/)方法をご覧ください。

### アップデートを入手する

- API ステータス変更の通知を受け取るには、[開発者向けメーリングリスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)に参加してください。
- API に関する現在進行中のすべてのディスカッションを細かくフォローするには、[GitHub の API ページ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)にある **Watch** ボタンをクリックしてください。これには、[GitHub アカウントを持っているか作成する](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account)必要があります。
- To get overall updates on the Privacy Sandbox, subscribe to the RSS feed [Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/).
- [Protected Audience API の定例会議にご参加](https://github.com/WICG/turtledove/issues/88)ください（隔週）。どなたでも参加できますが、参加するにはまず、[WICG に参加](https://www.w3.org/community/wicg/)してください。積極的に参加することも、聞くだけでも構いません。

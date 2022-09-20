---
layout: layouts/blog-post.njk
title: FLEDGE API 開発者ガイド
authors:
  - samdutton
  - kevinkiklee
description: FLEDGE は、リマーケティングおよびカスタム オーディエンスのユースケースに対応するためのプライバシーサンドボックスの提案であり、サードパーティがサイトを跨いでユーザーのブラウジング行動を追跡できないように設計されています。
date: 2022-01-27
updated: 2022-08-24
thumbnail: image/80mq7dk16vVEg8BBhsVe42n6zn82/UiyBX61nCLHExFoy0eEn.jpg
alt: 米国ニュージャージー州ミドルタウンの砂浜で、雛と一緒に鳴く千鳥の写真。
tags:
  - privacy
  - security
---

{% YouTube id='HkvmYKqnytw' %}

## この記事の対象者 {: #who}

この記事は、実験的な FLEDGE API の現在のイテレーションに関する技術リファレンスです。

- [FLEDGE API](/docs/privacy-sandbox/fledge)は、提案の技術的な概要ではなく、[用語集](/docs/privacy-sandbox/fledge#glossary)もあります。

- [FLEDGE デモ](https://fledge-demo.glitch.me)では、FLEDGE の基本的なデプロイのウォークスルーを説明します。

- [FLEDGE デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードがどのように動作するかを説明し、FLEDGE のデバッグに Chrome DevTools を使用する方法を示します。

## FLEDGEとは {: #what}

FLEDGE は、[リマーケティング](/docs/privacy-sandbox/fledge#remarketing)およびカスタム オーディエンスのユースケースに対応するための[プライバシーサンドボックス](/docs/privacy-sandbox/overview)の提案であり、サードパーティがサイトを跨いでユーザーのブラウジング行動を追跡できないように設計されています。この API は、ブラウザによるオンデバイス オークションを有効にし、ユーザーが以前にアクセスしたウェブサイトに関連する広告を選択します。

FLEDGE は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリの提案の中で Chromium に実装された最初の実験です。

以下の図は、FLEDGE のライフサイクルの概要を示しています（<a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png?auto=format&amp;w=1600" target="_blank">拡大版を表示</a>）。

<figure class="w-figure">{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/XLqHPEchhnDcrXGzbby6.png", alt="FLEDGE のライフサイクルの各段階の概要を示す図", width="800", height="366" %}</figure>

<br>

## FLEDGE を試すには {: #try-fledge}

### FLEDGE デモ {: #demo}

広告主とサイト運営者のサイトにまたがる基本的な FLEDGE のデプロイのウォークスルーは、[fledge-demo.glitch.me](https://fledge-demo.glitch.me/) で入手できます。

[デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードがどのように動作するかを説明し、FLEDGE のデバッグに Chrome DevTools を使用する方法を示します。

{% YouTube id='znDD0gkdJyM' %}

### FLEDGE オリジントライアルに参加する {: #origin-trial}

プライバシーサンドボックスの関連性と測定の[オリジントライアル](/blog/origin-trials/)は、FLEDGE、[Topics](/docs/privacy-sandbox/topics/)、および[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) API について、デスクトップの Chrome ベータ版 101.0.4951.26 以降で公開されています。

参加するには、[オリジントライアル トークンに登録](/origintrials/#/view_trial/771241436187197441)してください。

トライアルへの登録に成功したら、有効なトライアル トークンを提供するページで FLEDGE JavaScript API を試すことができます。たとえば、ブラウザに [1 つ以上のインタレストグループに参加](#ad-auction)するように依頼してから、[広告オークションを実行](#joinadinterestgroup)して広告を選択し、表示することができます。

[FLEDGE デモ](#demo)では、FLEDGE デプロイの基本的なエンドツーエンドの例を説明しています。

FLEDGE API コードを実行するすべてのページにトライアルトークンを提供してください。

- &lt;head&gt; のメタタグの場合:<br>

    `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`

- HTTP ヘッダーの場合:<br>

    `Origin-Trial: TOKEN_GOES_HERE`

- プログラムでトークンを提供する場合:<br>

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

[プライバシーサンドボックス広告の関連性と測定 API をテストする](/blog/privacy-sandbox-unified-origin-trial#eligible-users)にはその理由が説明されており、オリジントライアル機能を使用する前に使用可能かどうかを検出する方法（検出する必要があります）が示されています。

{% endAside %}

### `chrome://flags` または機能フラグでテストする {: #flags}

デスクトップの Chrome ベータ版 101.0.4951.26 以降で、1 人のユーザーに対して FLEDGE をテストできます。

- `chrome://flags/#privacy-sandbox-ads-apis` を有効にします。
- コマンドラインからフラグを設定します。

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

[Run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) には、コマンドラインから Chrome やその他の Chromium ベースブラウザを実行する際にフラグを設定する方法が説明されています。FLEDGE フラグの完全なリストは、[Chromium Code Search](https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/about_flags.cc;l=7135;drc=e50bce9adfbbac13d8ec1017f9239fe1ae06cc72) から入手できます。

{% Aside %}

これは、初期テスト用の FLEDGE の進行中のバージョンです。これは、完全なもの、または最終的な実装を示すものと見なすべきではありません。FLEDGE の進捗状況とステータスは、定期的な WICG 会議で議論されます。

2021 年 5 月 12 日の WICG 会議の[議事録](https://github.com/WICG/turtledove/blob/main/meetings/2021-05-12-FLEDGE-call-minutes.md#agenda)には、現在の実装でサポートされているものとサポートされていないものに関する詳細が記載されています。

[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline)には、FLEDGE およびその他のプライバシーサンドボックスの提案の実装タイミングに関する情報が提供されています。

{% endAside %}

### 最新バージョンの Chrome でサポートされている機能

FLEDGE は、FLEDGE 提案の次の機能をテストする最初の実験として、Chromium で[機能フラグの使用](#flags)によって利用できるようになっています。

- **インタレストグループ**: 広告の入札とレンダリングを構成するための関連付けられたメタデータとともに、ブラウザによって保存されます。
- **バイヤー（DSP または広告主）によるオンデバイス入札**: 保存されているインタレストグループとセラーからのシグナルに基づきます。
- **セラー（SSP またはサイト運営者）によるオンデバイス広告の選択**: バイヤーからのオークション入札とメタデータに基づきます。
- **一時的に緩和されたバージョンの Fenced Frames での広告レンダリング**: 広告のレンダリングが許可されたネットワークアクセスとロギング。

[API Explainer には、機能のサポートと制約に関する詳細が提供](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary)されています。

#### インタレストグループの権限

FLEDGE の現在の実装のデフォルトでは、クロスドメイン iframe からでも、ページ内のどこからでも `joinAdInterestGroup()` を呼び出すことができるようになっています。将来的には、サイト所有者がクロスドメイン iframe の[権限ポリシー](/docs/privacy-sandbox/permissions-policy/)を調整する時間ができたら、Explainer で説明されているように、クロスドメイン iframe からの呼び出しを禁止する予定です。

#### Key/Value サービス

FLEDGE 広告オークションの一部として、ブラウザは、単純なキーと値のペアを返す[Key/Value サービス](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server)にアクセスして、残りのキャンペーン予算などの情報を広告バイヤーに提供できます。FLEDGE 提案は、このサーバーが「イベントレベルのログ記録を実行しないこと、およびこれらのリクエストに基づくその他の副作用がないこと」を[義務付け](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements)ています。

FLEDGE Key/Value サービスコードは、[Privacy Sandbox GitHub リポジトリ](https://github.com/privacysandbox/fledge-key-value-service)で提供されるようになりました。このサービスは、Chrome および Android の開発者が使用できます。ステータスの更新については、[お知らせのブログ記事](/blog/open-sourcing-fledge-key-value-service/)をご覧ください。[API Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md) および [Trust Model Explainer](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md) から FLEDGE Key/Value サービスの詳細をご覧ください。

初期テストでは、 [「Bring Your Own Server」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)モデルが使用されます。長期的には、アドテックはリアルタイムデータを取得するために、[信頼できる実行環境](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment)で実行されるオープンソースの FLEDGE Key/Value サービスを使用する必要があります。

エコシステムがテストするのに十分な時間を確保するために、サードパーティの Cookie が廃止されるまでは、オープンソースの Key/Value サービスまたは TEE の使用が必要になるとは考えていません。この移行が行われる前に、開発者がテストと採用を開始できるのに十分な通知を行う予定です。

### 機能サポートの検出

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

## FLEDGE をオプトアウトするには {: #opt-out}

サイト所有者または個人ユーザーは、FLEDGE API へのアクセスをブロックできます。

### サイトによるアクセス制御 {: #opt-out-site}

FLEDGE では、最終的に、FLEDGE 機能を利用できるようにするために、サイトが[アクセス許可ポリシー](/docs/privacy-sandbox/permissions-policy/)を設定するように要求する意向です。これにより、任意の第三者はサイトに知られることなく API を使用できないようにすることができます。ただし、[最初のオリジントライアル](/blog/privacy-sandbox-unified-origin-trial)中のテストを実施しやすくするために、この要件は[デフォルトで免除](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy)されます。テスト期間中に FLEDGE 機能を明示的に無効にしたいサイトは、関連する権限ポリシーを使用してアクセスをブロックできます。

FLEDGE の権限ポリシーには、個別に設定できる 2 つのポリシーがあります。

- `join-ad-interest-group`: ブラウザをインタレストグループに追加する機能を有効/無効にします。
- `run-ad-auction`: オンデバイスオークションを実行する機能を有効または無効にします。

FLEDGE API へのアクセスは、HTTP レスポンスヘッダーで次のアクセス許可ポリシーを指定することにより、ファーストパーティのコンテキストで完全に無効にすることができます。

```text
Permissions-Policy: join-ad-interest-group=(), run-ad-auction=()
```

次の `allow` 属性を iframe 要素に追加することで、iframe での API の使用を無効にすることができます。

```html
<iframe src="https://example.com" allow="join-ad-interest-group 'none'; run-ad-auction 'none'"></iframe>
```

[Proposed First FLEDGE Origin Trial Permissions-Policy](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#permissions-policy) セクションに詳細が記載されています。

### ユーザーのオプトアウト {: #opt-out-user}

ユーザーは、次のいずれかの仕組みを使用して、FLEDGE API およびその他のプライバシーサンドボックス機能へのアクセスをブロックできます。

- Chrome 設定で **設定** &gt; **セキュリティとプライバシー** &gt; **プライバシーサンドボックス** に移動し、**プライバシーサンドボックスのトライアルを無効**にします。これには `chrome://settings/privacySandbox` からもアクセスできます。
- Chrome 設定で **設定** &gt; **セキュリティとプライバシー**に移動し、**サードパーティの Cookie を無効**にします。
- `chrome://settings/cookies` で、**Cookie とその他のサイト データ**を「サードパーティの Cookie をブロックする」または「すべての Cookie をブロックする」に設定します。
- シークレットモードを使用します。

FLEDGE Explainer には、[API の設計要素に関する詳細](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#design-elements)が説明されています。また、API が[プライバシーの目標](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=privacy%20goal)をどのように満たそうとしているのかが記載されています。

## FLEDGE ワークレットのデバッグ {: #debugging }

Chrome Canary 98.0.4718.0 より、Chrome DevTools 内で FLEDGE ワークレットをデバッグできます。

最初のステップは、[**ソース**] パネルの [**イベント リスナー ブレークポイント**] ペインの新しいカテゴリを介してブレークポイントを設定することです。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/x0jhCIMB8L8tV9bcpkPi.png", alt="[ソース] パネルの [イベント リスナー ブレークポイント] ペインが強調表示されている、Chrome Canary の DevTools のスクリーンショット。[広告オークション ワークレット] で [ビッダーの入札フェーズの開始] が選択されています。", width="800", height="549" %}

ブレークポイントがトリガーされると、ワークレット スクリプトの最上位にある最初のステートメントの前で実行が一時停止されます。通常のブレークポイントまたはステップ コマンドを使用して、入札/スコアリング/レポート機能自体にアクセスできます。

ライブ ワークレット スクリプトも [スレッド] パネルの下に表示されます。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/yJYTFRRcPmVse2teuc7u.png", alt="Chrome Canary の DevTools のスクリーンショット。[ソース] パネルの [スレッド] ペインが強調表示され、一時停止されている現在のワークレット スクリプトが表示されています。", width="800", height="537" %}

一部のワークレットは並行して実行される可能性があるため、複数のスレッドがそこで「一時停止」状態になる可能性があります。スレッド リストを使用してスレッドを切り替え、必要に応じてスレッドを再開または詳細に調べることができます。

### FLEDGE イベントを観察する

Chrome DevTools の [アプリケーション] パネルから、FLEDGE インタレスト グループとオークション イベントを観察できます。

FLEDGE が有効になっているブラウザで [FLEDGE のデモショッピングサイト](https://shopping-fledge-demo.glitch.me/advertiser/shopping.html)にアクセスすると、DevTools に `join` イベントに関する情報が表示されます。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/3jI5bJh8XKiZP5WHMBYl.png", alt="Chrome Canary の DevTools [アプリケーション] パネル。FLEDGE インタレストグループ参加イベントに関する情報が表示されています。", width="800", height="402" %}

これで、FLEDGE が有効になっているブラウザで[FLEDGE のデモサイト運営者サイト](https://publisher-fledge-demo.glitch.me/publisher/index.html?fencedframe)にアクセスすると、DevTools は `bid` イベントと `win` イベントに関する情報を表示します。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wMvNrY9GrcD2p3Q6wTsw.png", alt="Chrome Canary の DevTools [アプリケーション] パネル。FLEDGE オークションの入札および落札イベントに関する情報が表示されます。", width="800", height="482" %}

{% Aside %}

サイトに移動したときに DevTools が開いていなかった場合は、ページを更新して FLEDGE イベントを表示する必要があります。

{% endAside %}

## FLEDGE API の仕組み {: #how}

この例では、ユーザーがカスタム バイク メーカーのウェブサイトを閲覧した後、ニュースサイトにアクセスすると、そのバイク メーカーの新しい自転車の広告が表示されます。

{% Aside 'warning' %}

この記事で説明されているすべての機能が、現在 Chrome でテストされている FLEDGE API のバージョンに実装されている（または完全に実装されている）わけではありません。[機能フラグを使用したテスト](#flags)では、 [機能フラグ](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)を使用してコマンドラインから実行される Chrome で現在どの FLEDGE 機能をテストできるかについて説明されています。

FLEDGE の機能は、実装作業が続くにつれて徐々に追加されることを期待しています。API がオリジントライアルの段階に達すると、定期更新のリストで実装済みの部分とまだ進行中の部分をお知らせします。

{% endAside %}

### 1. ユーザーが広告主のサイトにアクセスする

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/lrC3QOqthGpWyI6Ou9Eb.png", alt="ノートパソコンのブラウザでカスタム バイク メーカーのサイトにアクセスしている人を示す図。", width="400", height="190" %}

ユーザーがカスタム バイク メーカー（この例では[広告主](/docs/privacy-sandbox/fledge#advertiser)）のウェブサイトにアクセスし、手作りのスチール バイクの製品ページにしばらくアクセスしたとします。これにより、バイク メーカーは[リマーケティング](/docs/privacy-sandbox/fledge#remarketing)の機会を得ることができます。

{% Aside 'key-term' %}*デマンドサイド プラットフォーム*（DSP）は、広告購入の自動化に使用されるアドテック サービスです。 DSP は、広告主がさまざまなサイト運営者サイトで[広告インプレッション](https://en.wikipedia.org/wiki/Impression_(online_media))を購入するために使用されます。サイト運営者は、アドエクスチェンジと呼ばれるマーケットプレイスを通じて[広告枠](/docs/privacy-sandbox/fledge#ad-inventory)を売りに出し、DSP は、広告主が購入するのに最も意味のある利用可能な広告インプレッションをプログラムで決定します。

*サプライサイド プラットフォーム*（SSP）は、広告枠の販売を自動化するために使用されるアドテック サービスです。SSP を使用すると、サイト運営者は広告枠（広告が表示される空の矩形）を複数のアドエクスチェンジ、DSP、およびネットワークにオファーできます。これにより、幅広い潜在的なバイヤーが広告スペースに入札できるようになります。 {% endAside %}

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 2. ユーザーのブラウザがインタレストグループを追加するよう求められる  {: #joinadinterestgroup}

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/vF5beSa9j6VJBTtEcyC1.png", alt="ノートパソコンのブラウザでサイトを表示している人を示す図。JavaScript コード joinAdInterestGroup() がブラウザで実行されています。",  width="400", height="187" %}

**Explainer のセクション:** [ブラウザがインタレストグループを記録する](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups)

広告主の[デマンド サイド プラットフォーム](/docs/privacy-sandbox/fledge/#dsp)（DSP）（または広告主自体）は、 `navigator.joinAdInterestGroup()` を呼び出して、ブラウザがメンバーであるグループのリストにインタレストグループを追加するようブラウザに要求します。この例では、グループの名前は `custom-bikes` で、所有者は `dsp.example` です。インタレストグループのオーナー（この場合は DSP）は、[ステップ 4](/docs/privacy-sandbox/fledge/#buyer)で説明した広告オークションの[バイヤー](#ad-auction)になります。インタレストグループのメンバーシップは、ブラウザによってユーザーのデバイスに保存され、ブラウザ ベンダーや他の誰とも共有されません。

{% Aside %} `joinAdInterestGroup()` の呼び出し元コンテキストのオリジンは、インタレストグループのオーナーのオリジンと一致する必要があるため、`joinAdInterestGroup()` は、インタレストグループのオーナーのオリジンと現在のドキュメントのオリジンが一致しない限り（たとえば、独自のインタレストグループを持つウェブサイト）、iframe から呼び出す必要があります。

[`runAdAuction`](#ad-auction) には同じ要件がないため、&lt;script&gt; タグから `runAdAuction()` を呼び出すと、おそらくクロスオリジン iframe よりもはるかにパフォーマンスが向上します。{% endAside %}

`joinAdInterestGroup()` には以下からの許可が必要です。

- アクセスされているサイト
- インタレストグループのオーナー

例: `malicious.example` が `dsp.example` の許可なしにオーナーとして `dsp.example` を使用して `joinAdInterestGroup()` を呼び出すことが可能であってはいけません。

#### アクセスされているサイトからの許可

**同じオリジン**: デフォルトでは、アクセスされているサイトと同じオリジン、つまり、現在のページのトップレベル フレームと同じオリジンからの `joinAdInterestGroup()` 呼び出しに対して許可が暗黙的に付与されます。サイトは、FLEDGE の[アクセス許可ポリシー ヘッダー](/docs/privacy-sandbox/permissions-policy/)の `join-ad-interest-group` ディレクティブを使用して、`joinAdInterestGroup()` 呼び出しを無効にすることができます。

**クロスオリジン**: 現在のページとは異なるオリジンからの `joinAdInterestGroup()` の呼び出しは、アクセスされているサイトがクロスオリジン iframe からの `joinAdInterestGroup()` の呼び出しを許可するアクセス許可ポリシーを設定している場合にのみ成功します。

{% Aside %} FLEDGE の現在の実装のデフォルトでは、クロスオリジン iframe からでも、ページ内のどこからでも `joinAdInterestGroup()` を呼び出すことができます。将来、サイト所有者がアクセス許可ポリシーを調整する時間ができたら、FLEDGE の Explainer で説明されているように、クロスオリジン iframe からの呼び出しをデフォルトで禁止する予定です。 {% endAside %}

#### インタレストグループのオーナーからの許可

インタレストグループのオーナーのアクセス許可は、インタレストグループのオーナーと同じオリジンを持つ iframe から `joinAdInterestGroup()` を呼び出すことによって暗黙的に付与されます。たとえば、`dsp.example` iframe は、 `dsp.example` が所有するインタレストグループに対して `joinAdInterestGroup()` を呼び出すことができます。

提案は、`joinAdInterestGroup()` がオーナーのドメインのページまたは iframe で実行されるか、`.well-known` URL のリストを使用して提供される他のドメインに委譲されることです。

#### navigator.joinAdInterestGroup() の使用

API の使用方法の例を次に示します。

{: #ad-components}

```javascript
const interestGroup = {
  owner: 'https://dsp.example',
  name: 'custom-bikes',
  biddingLogicUrl: ...,
  biddingWasmHelperUrl: ...,
  dailyUpdateUrl: ...,
  trustedBiddingSignalsUrl: ...,
  trustedBiddingSignalsKeys: ['key1', 'key2'],
  userBiddingSignals: {...},
  ads: [bikeAd1, bikeAd2, bikeAd3],
  adComponents: [customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2],
};

navigator.joinAdInterestGroup(interestGroup, 7 * kSecsPerDay);
```

関数に渡される `interestGroup` オブジェクトのサイズは 50 kiB を超えてはいけません。超えてしまうと、呼び出しは失敗します。2 番目のパラメーターは、インタレストグループの期間を指定します。上限は 30 日です。連続して呼び出すと、以前に保存された値が上書きされます。

{% Aside 'gotchas' %}

FLEDGE API メソッドのパラメーターとして使用されるすべての URL は、安全なオリジンからのものである必要があります。すべてのリソースは、HTTPS URL 経由で提供される必要があります。[ローカル開発での HTTPS の使用方法](https://web.dev/how-to-use-local-https/)には、FLEDGE をローカルで実行するときにこれをどのように行うかが説明されています。

さらに、`biddingLogicUrl`、`decisionLogicUrl`、`trustedBiddingSignals` にはすべて、`X-Allow-FLEDGE: true` HTTP レスポンスヘッダーが必要です。

{% endAside %}

#### インタレストグループのプロパティ {: #interest-group-properties}

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">プロパティ</th>
        <th style="font-weight: bold; text-align: left;">必須</th>
        <th style="font-weight: bold; text-align: left;">例</th>
        <th style="font-weight: bold; text-align: left;">役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>owner</code></td>
        <td style="vertical-align: top;">必須</td>
        <td style="vertical-align: top;"><code>'https://dsp.example'</code></td>
        <td style="vertical-align: top;">インタレストグループ オーナーのオリジン。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>name</code></td>
        <td style="vertical-align: top;">必須</td>
        <td style="vertical-align: top;"><code>'custom-bikes'</code></td>
        <td style="vertical-align: top;">インタレストグループの名前。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">
<code>biddingLogicUrl</code>**</td>
        <td style="vertical-align: top;">オプション*</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/bid/custom-bikes/bid.js'</code></td>
        <td style="vertical-align: top;">ワークレットで実行される入札 JavaScript の URL。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">
<code>biddingWasmHelperUrl</code> **</td>
        <td style="vertical-align: top;">オプション*</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/bid/custom-bikes/bid.wasm'</code></td>
        <td style="vertical-align: top;">
<code>biddingLogicUrl</code> から駆動される WebAssembly コードの URL。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">
<code>dailyUpdateUrl</code> **</td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/bid/custom-bikes/update'</code></td>
        <td style="vertical-align: top;">インタレストグループの属性を更新する JSON を返す URL。（<a href="#update-interest-group">インタレストグループを更新する</a>を参照してください。）</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">
<code>trustedBiddingSignalsUrl</code> **</td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>'https://dsp.example/trusted/bidding-signals'</code></td>
        <td style="vertical-align: top;">ビッダーの信頼できるサーバーへの Key-Value リクエストのベース URL。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedBiddingSignalsKeys</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>['key1', 'key2' ...]</code></td>
        <td style="vertical-align: top;">Key-Value の信頼できるサーバーへのリクエストのキー。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>userBiddingSignals</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">オーナーが入札中に使用できる追加のメタデータ。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>ads</code></td>
        <td style="vertical-align: top;">オプション*</td>
        <td style="vertical-align: top;"><code>[bikeAd1, bikeAd2, bikeAd3]</code></td>
        <td style="vertical-align: top;">このインタレストグループ向けにレンダリングされる可能性のある広告。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>adComponents</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>[customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2]</code></td>
        <td style="vertical-align: top;">
<a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">複数のピースで構成される広告の</a>コンポーネント。</td>
      </tr>
    </tbody>
  </table>
</div>

\* `owner` と `name` を除くすべてのプロパティはオプションです。 `biddingLogicUrl` および `ads` プロパティはオプションですが、オークションに参加するには必須です。これらのプロパティを使用せずにインタレストグループを作成するユースケースもあるかもしれません。たとえば、インタレストグループ オーナーがまだ実行していないキャンペーンもしくは将来的な他の用途のインタレストグループにブラウザを追加したいと考える可能性があります。または、一時的に広告バジェットが不足している可能性も考えられます。

\*\* FLEDGE の現在の実装では、`biddingLogicUrl`、`biddingWasmHelperUrl`、`dailyUpdateUrl`、`trustedBiddingSignalsUrl` にはオーナーとして同じオリジンを持つ必要があります。これは長期的な制約ではない可能性があり、`ads` と `adComponents` の URL にはそのような制約はありません。

#### インタレストグループの属性を更新する {: #update-interest-group}

`dailyUpdateUrl`は、`navigator.joinAdInterestGroup()` に渡されるインタレストグループ オブジェクトに対応してインタレストグループ プロパティを定義する JSON を返すウェブサーバーを指定します。これにより、グループのオーナーがインタレストグループの属性を定期的に更新する仕組みが提供されます。[現在の実装](https://source.chromium.org/chromium/chromium/src/+/main:content/browser/interest_group/interest_group_storage.cc;l=671;drc=5a102f146faa0c21eb9cf255ceb46b35a158ab3f)では、次の属性を変更できます。

- `biddingLogicUrl`
- `biddingWasmHelperUrl`
- `trustedBiddingSignalsUrl`
- `trustedBiddingSignalsKeys`
- `ads`
- `priority`

JSON で指定されていないフィールドは上書きされず、JSON で指定されたフィールドのみが更新されますが、`navigator.joinAdInterestGroup()` を呼び出すと、既存のインタレストグループが上書きされます。

更新はベストエフォートであり、次の状況では失敗する可能性があります。

- ネットワークリクエストのタイムアウト（現在 30 秒）。
- その他のネットワーク障害。
- JSON 解析の失敗。

更新に連続して長い時間が費やされた場合には、更新がキャンセルされることもありますが、これによりキャンセルされた（残りの）更新にレート制限が課されることはありません。更新は、1 日あたり最大 1 回にレート制限されています。ネットワーク エラーが原因で失敗した更新は 1 時間後に再試行され、インターネットからの切断が原因で失敗した更新は再接続後にすぐに再試行されます。

##### 手動更新

現在のフレームのオリジンが所有するインタレストグループの更新は、`navigator.updateAdInterestGroups()` を介して手動でトリガーできます。頻繁な更新はレート制限によって防止されています。`navigator.updateAdInterestGroups()` を繰り返し呼び出しても、レート制限期間（現在は 1 日）が経過するまで何も起こりません。`navigator.joinAdInterestGroup()` が同じインタレストグループの `owner` と `name` に対して再度呼び出されると、レート制限がリセットされます。

##### 自動更新

オークションにロードされたすべてのインタレストグループは、オークションの完了後に自動的に更新されますが、手動更新と同じレート制限が適用されます。オークションに参加しているインタレストグループが少なくとも 1 つあるオーナーごとに、そのオーナーと一致するオリジンを持つ iframe から `navigator.updateAdInterestGroups()` が呼び出されたかのように動作します。

#### インタレストグループの広告を指定する

`ads` および `adComponents` オブジェクトには、広告クリエイティブの URL と、オプションで、入札時に使用できる任意のメタデータが含まれます。以下に例を示します。

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // オプション
}
```

#### バイヤーの入札方法 {: #generatebid}

インタレストグループのオーナーが提供する `biddingLogicUrl` のスクリプトには、`generateBid()` 関数が含まれている必要があります。[広告スペースのセラーが `navigator.runAdAuction()` を呼び出す](#ad-auction)際にインタレストグループのオーナーが入札に招待されていれば、ブラウザがメンバーであるインタレストグループごとに `generatedBid()` 関数が 1 回呼び出されます。つまり、`generateBid()` は候補広告ごとに 1 回呼び出されます。セラーは、`navigator.runAdAuction()` に渡されるオークション構成パラメーターで `decisionLogicUrl` プロパティを提供します。この URL のコードには、`generateBid()` によって返される各入札をスコアリングするために、オークションの各入札者に対して実行される `scoreAd()` 関数を含める必要があります。

{% Aside %}

`biddingWasmHelperUrl` プロパティはオプションですが、入札者は、`biddingLogicUrl` によって提供される JavaScript 関数から駆動されるように、JavaScript ではなく [WebAssembly](https://developer.mozilla.org/docs/WebAssembly) で計算コストの高いサブルーチンを提供できます。指定する場合は、`application/wasm mimetype` で配信される WebAssembly バイナリを指す必要があります。対応する `WebAssembly.Module` は、ブラウザによって `generateBid()` 関数で使用できるようになります。

{% endAside %}

広告スペースのバイヤーが提供する、`biddingLogicUrl` のスクリプトには、`generateBid()` 関数が含まれている必要があります。この関数は、候補広告ごとに 1 回呼び出されます。[`runAdAuction()`](#ad-auction) は、関連付けられた入札とメタデータとともに各広告を個別にチェックしてぁら、数値の望ましさスコアを広告に割り当てます。

```javascript
generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
  ...
  return {
    ad: adObject,
    bid: bidValue,
    render: renderUrl,
    adComponents: [adComponentRenderUrl1, ...]
   };
}
```

`generateBid()` は次の引数を取ります。

- `interestGroup`<br> 広告バイヤーによって `joinAdInterestGroup()` に渡されるオブジェクト。（インタレストグループは、`dailyUpdateUrl` を介して更新される場合があります。）

- `auctionSignals`<br>広告スペースの**セラー**によって `navigator.runAdAuction()` に渡される[オークション構成](#ad-auction)引数のプロパティ。これにより、ページ コンテキスト（広告サイズやサイト運営者 ID など）、オークションの種類（ファーストプライスまたはセカンドプライス）、およびその他のメタデータに関する情報が提供されます。

- `perBuyerSignals`<br> `auctionSignals` と同様に、セラーによって `navigator.runAdAuction()` に渡される[オークション構成](#ad-auction)引数のプロパティ。これにより、セラーが [SSP](/docs/privacy-sandbox/fledge#ssp) であり、バイヤーのサーバーにリアルタイムの入札呼び出しを実行してレスポンスを返す場合、またはサイト運営者のページがバイヤーのサーバーに直接接続する場合、バイヤーのサーバーからページに関するコンテキストシグナルを提供できます。その場合、バイヤーは、改ざんに対する保護として、generateBid() 内のこれらのシグナルの暗号署名を確認することを希望する場合があります。

- `trustedBiddingSignals`<br> キーがインタレストグループの `trustedBiddingSignalsKeys` であり、その値が `trustedBiddingSignals` リクエストで返されるオブジェクト。

- `browserSignals`<br> ブラウザによって作成されたオブジェクトで、ページコンテキストに関する情報（現在のページの `hostname` など、セラーが偽造する可能性があるもの）やインタレストグループ自体のデータ（グループが以前に落札したときの記録など、オンデバイスのフリークエンシーキャップを許可するためのデータ）が含まれる場合があります。

`browserSignals` オブジェクトには次のプロパティがあります。

```javascript
{
  topWindowHostname: 'publisher.example',
  seller: 'https://ssp.example',
  joinCount: 3,
  bidCount: 17,
  prevWins: [[time1,ad1],[time2,ad2],...],
  wasmHelper: ... /* インタレストグループの biddingWasmHelperUrl に基づく WebAssembly.Module オブジェクト */
  dataVersion: 1, /* バイヤーの Key/Value サービスレスポンスの Data-Version 値 */
}
```

`bid` 値を計算するには、`generateBid()` のコードで関数のパラメーターのプロパティを使用できます。以下に例を示します。

```javascript
function generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
  return {
    ...
    bid: auctionSignals.is_above_the_fold ? perBuyerSignals.atf_value : perBuyerSignals.btf_value,
    ...
  }
}
```

`generateBid()` は、以下の 4 つのプロパティを持つオブジェクトを返します。

- `ad`<br> セラーがこの入札または広告クリエイティブについて知ることを期待する情報など、広告に関する任意のメタデータ。[セラー](/docs/privacy-sandbox/fledge/#seller)は、この情報をオークションおよび決定ロジックで使用します。

- `bid`<br> オークションに入力する数値入札。セラーは、さまざまなバイヤーの入札を比較できる立場にある必要があります。したがって、入札は、セラーが選択した単位で行う必要があります（例: 「1,000 単位あたりの USD」)。入札額がゼロまたはマイナスの場合、このインタレストグループはセラーのオークションにまったく参加しません。この仕組みにより、バイヤーは、広告が表示される場所と表示されない場所に関する広告主ルールを実装できます。

- `render`<br>この入札が落札になった場合にクリエイティブのレンダリングに使用される URL または URL のリスト。（API の Explainer で、[複数のピースで構成された広告](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces)を参照してください。）値は、[インタレストグループに対して定義された広告](#ad-components)の 1 つの `renderUrl` と一致する必要があります。

- `adComponents`<br> `navigator.joinAdInterestGroup()` に渡されるインタレストグループ引数の <a href="#ad-components" data-md-type="link">`adComponents`</a> プロパティから取得される、[複数のピースで構成される広告](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces)の最大 20 個のコンポーネントのオプション リスト。

#### インタレストグループからの除外をブラウザに求める

インタレストグループのオーナーは、ブラウザをインタレストグループから削除するよう要求できます。言い換えれば、ブラウザは、メンバーであるグループのリストからインタレストグループを削除するように求められます。

```javascript
navigator.leaveAdInterestGroup({
  owner: 'https://dsp.example',
  name: 'custom-bikes'
});
```

ユーザーがインタレストグループの追加をブラウザに要求したサイトに戻った場合、インタレストグループのオーナーは `navigator.leaveAdInterestGroup()` 関数を呼び出してブラウザにインタレストグループの削除を要求できます。広告のコードを使って、そのインタレストグループに対してこの関数を呼び出すこともできます。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 3. ユーザーが広告スペースを販売するサイトにアクセスする

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/95tUp50coQWLsqzxQhgi.png", alt="ノートパソコンのブラウザでニュースサイトにアクセスしている人を示す図。サイトには空の広告スロットがあります。", width="400", height ="182" %}

後になって、ユーザーは広告スペースを販売するサイト（この例ではニュースサイト）にアクセスします。このサイトには[広告枠](/docs/privacy-sandbox/fledge/#ad-inventory)があり、[リアルタイム入札](/docs/privacy-sandbox/fledge/#rtb)を使用してプログラムで販売しています。

{% Aside %}

FLEDGE 提案の Explainer には、主に以下の 3 つの役割が説明されています。

- **広告主**: 商品を宣伝するために料金を支払うサイト。この例では、カスタム バイク メーカーです。
- **サイト運営者**: この例にあるオンライン ニュースサイトなど、広告スペースを販売するサイト。広告スペースを販売しているサイトの多く（すべてではない）は、コンテンツパブリッシャーです。
- **セラー**: 広告オークションを運営する当事者（次のステップ）。ほとんどのサイト運営者は、[SSP](/docs/privacy-sandbox/fledge#ssp) などのアドテックサービスを使用して、広告枠の販売を最適化しています。

{% endAside %}

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 4. ブラウザで広告オークションが実行される {: #ad-auction}

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fP9qHtCjfk8IwrJLtOpo.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人を示す図。FLEDGE API を使用した広告オークションが行われています。", width="400", height="182" %}

**Explainer のセクション:** [セラーがオンデバイスオークションを実行する](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#2-sellers-run-on-device-auctions)

広告オークションは、サイト運営者の [SSP](/docs/privacy-sandbox/fledge#ssp) またはサイト運営者自身によって実行される可能性があります。オークションの目的は、現在のページで使用可能な単一の広告スロットに最も適した広告を選択することです。オークションでは、広告スペースのバイヤーと [Key/Value サービス](#keyvalue-service)のセラーからのデータとともに、ブラウザがメンバーであるインタレストグループが考慮されます。

広告スペースの**セラー**は、`navigator.runAdAuction()` を呼び出して、ユーザーのブラウザに広告オークションを開始するよう要求します。

例えば以下のようにします。

```javascript
const auctionConfig = {
  seller: 'https://ssp.example',
  decisionLogicUrl: ...,
  trustedScoringSignalsUrl: ...,
  interestGroupBuyers: ['https://dsp.example', 'https://buyer2.example', ...],
  auctionSignals: {...},
  sellerSignals: {...},
  sellerTimeout: 100,
  perBuyerSignals: {
    'https://dsp.example': {...},
    'https://another-buyer.example': {...},
    ...
  },
  perBuyerTimeouts: {
    'https://dsp.example': 50,
    'https://another-buyer.example': 200,
    '*': 150,
    ...
  },
  componentAuctions: [
    {
      'seller': 'https://some-other-ssp.example',
      'decisionLogicUrl': ...,
      ...
    },
    ...
  ]
};

const auctionResultPromise = navigator.runAdAuction(auctionConfig);
```

`runAdAuction()` は、広告オークションの結果を表す [URN](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns)（`urn:uuid:<something>`）に解決される promise を返します。これは、レンダリングのために [Fenced Frame](/docs/privacy-sandbox/fledge#fenced-frame) に渡された場合にのみ、ブラウザによってデコードできます。したがってサイト運営者のページは、落札した広告を検査できません。

{% Aside %} [`joinAdInterestGroup()`](#joinadinterestgroup) の呼び出し元コンテキストのオリジンは、インタレストグループのオーナーのオリジンと一致する必要があるため、`joinAdInterestGroup()` は、インタレストグループのオーナーのオリジンと現在のドキュメントのオリジンが一致しない限り（たとえば、独自のインタレストグループを持つウェブサイト）、iframe から呼び出す必要があります。

[`runAdAuction`](#ad-auction) には同じ要件がないため、&lt;script&gt; タグから `runAdAuction()` を呼び出すと、おそらくクロスオリジン iframe よりもはるかにパフォーマンスが向上します。{% endAside %}

`decisionLogicUrl` スクリプトは、関連する入札とメタデータとともに個々の広告を 1 つずつ検討し、数値的な望ましさスコアを割り当てます。

#### <code>auctionConfig</code> のプロパティ

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">プロパティ</th>
        <th style="font-weight: bold; text-align: left;">必須</th>
        <th style="font-weight: bold; text-align: left;">例</th>
        <th style="font-weight: bold; text-align: left;">役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>seller</code></td>
        <td style="vertical-align: top;">必須</td>
        <td style="vertical-align: top;"><code>'https://ssp.example'</code></td>
        <td style="vertical-align: top;">セラーのオリジン</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>decisionLogicUrl</code></td>
        <td style="vertical-align: top;">必須</td>
        <td style="vertical-align: top;"><code>'https://ssp.example/auction-decision-logic.js'</code></td>
        <td style="vertical-align: top;">オークション ワークレット JavaScript の URL。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>trustedScoringSignalsUrl</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>'https://ssp.example/scoring-signals'</code></td>
        <td style="vertical-align: top;">セラーの信頼できるサーバーの URL。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>interestGroupBuyers*</code></td>
        <td style="vertical-align: top;">必須</td>
        <td style="vertical-align: top;"><code>['https://dsp.example', 'https://buyer2.example', ...]</code></td>
        <td style="vertical-align: top;">オークションへの入札を依頼されたすべてのインタレストグループのオーナーのオリジン。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionSignals</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">ページのコンテキスト、オークションの種類などに関するセラー情報。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>sellerSignals</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>{...}</code></td>
        <td style="vertical-align: top;">サイト運営者の設定、コンテキスト広告リクエストの作成などに基づく情報。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>sellerTimeout</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>100</code></td>
        <td style="vertical-align: top;">セラーの <code>scoreAd()</code> スクリプトの最大実行時間（ミリ秒）。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerSignals</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>{'https://dsp.example': {...},&lt;br&gt;
            'https://another-buyer.example': {...},&lt;br&gt;
          ...}</code></td>
        <td style="vertical-align: top;">特定のバイヤーごとのページに関する、それぞれのサーバーから得るコンテキストシグナル。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerTimeouts</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>50</code></td>
        <td style="vertical-align: top;">特定のバイヤーの <code>generateBid()</code> スクリプトの最大実行時間（ミリ秒）。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>componentAuctions</code></td>
        <td style="vertical-align: top;">オプション</td>
        <td style="vertical-align: top;"><code>[{'seller': 'https://www.some-other-ssp.com',&lt;br&gt;
            'decisionLogicUrl': ..., ...},&lt;br&gt;
            ...]</code></td>
        <td style="vertical-align: top;">
<a href="#ad-components">コンポーネント オークション</a>の追加設定。</td>
      </tr>
    </tbody>
  </table>
</div>

\* セラーは、`interestGroupBuyers: '*'` を指定することで、すべてのインタレストグループが入札できるようにすることができます。すると、インタレストグループのオーナーが含まれていること以外の基準に基づいて、広告が承認または拒否されます。たとえば、セラーは広告クリエイティブをレビューして、ポリシーへの準拠を確認することがあります。

\*\* `additionalBids` は、FLEDGE の現在の実装ではサポートされていません。詳細については、FLEDGE Explainer の[オークション参加者](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#22-auction-participants)セクションをお読みください。

#### 広告の選択方法

`decisionLogicUrl` のコード（[`runAdAuction()`](#ad-auction) に渡されるオークション構成オブジェクトのプロパティ）に、`scoreAd()` 関数が含まれている必要があります。これは、広告の望ましさを判断するために、広告ごとに 1 回実行されます。

```javascript
scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  ...
  return desirabilityScoreForThisAd;
}
```

`scoreAd()` は次の引数を取ります。

- `adMetadata`<br> バイヤーが提供する任意のメタデータ。
- `bid`<br> 数値による入札値。
- `auctionConfig`<br> `navigator.runAdAuction()` に渡されるオークション構成オブジェクト。
- `trustedScoringSignals`<br> オークション時にセラーの信頼できるサーバーから取得された値で、広告に対するセラーの意見を表します。
- `browserSignals`<br> ブラウザが認識し、セラーのオークション スクリプトが検証する可能性のある情報を含む、ブラウザによって構築されたオブジェクト。

```javascript
{
  topWindowHostname: 'publisher.example',
  interestGroupOwner: 'https://dsp.example',
  renderUrl: 'https://cdn.example/render',
  adComponents: ['https://cdn.com/ad-component-1', ...],
  biddingDurationMsec: 12,
  dataVersion: 1 /* Data-Version value from the seller's Key/Value service response. */
}
```

オークションが始まる前に、セラーは利用可能な広告スロットに最適なコンテキスト広告を見つけます。その `scoreAd()` ロジックには、コンテキストの落札者に勝てない広告を拒否するロジックが含まれます。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 5. セラーと参加するバイヤーが、Key/Value サービスからリアルタイム データを受け取る

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rn0slzXLZNSzGHMm6w7Y.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人を示す図。FLEDGE API を使用した広告オークションが行われており、参加者が Key/Value サービスからデータを取得しています 。", width="400", height="126" %}

**Explainer のセクション:** [FLEDGE Key/Value サービスからリアルタイムデータを取得する](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#31-fetching-real-time-data-from-a-trusted-server)。

広告オークション中、広告スペースの**セラー**は、`navigator.runAdAuction()` に渡される[オークション構成](#ad-auction)引数の `trustedScoringSignalsUrl` プロパティと、オークションのすべてのインタレストグループの `ads` フィールドと `adComponents` フィールドのすべてのエントリの `renderUrl` プロパティのキーを使用して [Key/Value サービス](#keyvalue-service)にリクエストを行うことにより、特定の広告クリエイティブに関するリアルタイムデータを取得できます。

同様に、広告スペースの**バイヤー**は、`navigator.joinAdInterestGroup()`に渡されるインタレストグループ引数の `trustedBiddingSignalsUrl` プロパティと `trustedBiddingSignalsKeys` プロパティを使用して、Key/Value サービスからリアルタイムデータをリクエストできます。

`runAdAuction()` が呼び出されると、ブラウザは各広告バイヤーの信頼できるサーバーにリクエストを送信します。リクエストの URL は以下のようになります。

```javascript
https://kv-service.example/getvalues?hostname=publisher.example&keys=key1,key2
```

- ベース URL は `trustedBiddingSignalsUrl` から取得されます。
- `hostname` はブラウザによって提供されます。
- `keys` の値は `trustedBiddingSignalsKeys` から取得されます。

このリクエストへのレスポンスは、各キーの値を提供する JSON オブジェクトです。

{% Aside 'gotchas' %} FLEDGE をテストするための現在の初期実験段階では、`trustedBiddingSignalsUrl` はインタレストグループのオーナーと同じオリジンを持つ必要があります。[インタレストグループのプロパティ](#interest-group-properties)と [Bring Your Own Server](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#:~:text=bring%20your%20own%20server) を参照してください。 {% endAside %}

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 6. 落札した広告が表示される

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wlkJ84sb3tRjJXHkCDfE.png", alt="ノートパソコンのブラウザでニュースサイトを表示している人を示す図。自転車（20% オフ）の広告が表示されています。上部のロックは、広告が Fenced Frame に表示されることを示します。", width="400", height="192" %}

**Explainer のセクション:** [ブラウザが落札者の広告をレンダリングする](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#4-browsers-render-the-winning-ad)

前に説明したように、[`runAdAuction()`](#ad-auction) によって返される promise は、レンダリングするために [Fenced Frame](/docs/privacy-sandbox/fledge#fenced-frame) に渡される [URN](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web#urns) に解決され、サイトは落札した広告を表示します。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 7. オークション結果が報告される

**Explainer のセクション:** [イベントレベルのレポート（現時点でのレポート）](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)

{% Aside %}

長期的には、[要約レポート API](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)を使用して、ブラウザがセラーとバイヤーのオークション結果をレポートできるようにすることを計画しています。一時的なイベントレベルのレポートの仕組みとして、セラー用に `reportResult()` を実装し、落札者用に `reportWin()` を実装するコードは、`sendReportTo()` 関数を呼び出すことができます。これはオークションの完了後に取得される URL を表す文字列を引数として取ります。これにより、レポートされるイベントレベルの情報が暗号化されます。

{% endAside %}

#### セラーによる結果の報告

**Explainer のセクション:** [セラーがレンダリングについて報告する](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#51-seller-reporting-on-render)

{: #reportresult}

`decisionLogicUrl` で提供されるセラーの JavaScript（`scoreAd()` でも提供）には、オークションの結果を報告するための `reportResult()` 関数を含めることができます。

```javascript
reportResult(auctionConfig, browserSignals) {
  ...
  return signalsForWinner;
}
```

この関数には以下の引数が渡されます。

- `auctionConfig`<br> `navigator.runAdAuction()` に渡されるオークション構成オブジェクト。

- `browserSignals`<br> オークションに関する情報を提供するブラウザによって作成されるオブジェクト。以下に例を示します。<br><br>

    ```javascript
    {
      'topWindowHostname': 'publisher.example',
      'interestGroupOwner': 'https://dsp.example',
      'renderUrl': 'https://cdn.example/url-of-winning-creative.wbn',
      'bid:' <bidValue>,
      'desirability': <winningAdScore>
    }
    ```

この関数の戻り値は、落札者の `reportWin()` 関数の `sellerSignals` 引数として使用されます。

#### 落札者による結果の報告

**Explainer のセクション:** [バイヤーがレンダリングと広告イベントについて報告する](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#52-buyer-reporting-on-render-and-ad-events)

落札者の JavaScript（`generateBid()` も提供）には、オークションの結果を報告するための `reportWin()` 関数を含めることができます。

```javascript
reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  ...
}
```

{% Aside %}

Chrome の FLEDGE の現在の実装では、`reportWin()` が定義されていない場合に警告が表示されます。

{% endAside %}

この関数には以下の引数が渡されます。

- `auctionSignals`と`perBuyerSignals`<br> 落札者の [`generateBid()`](#generatebid) に渡されるのと同じ値。

- `sellerSignals`<br> [`reportResult()`](#reportresult) の戻り値。これにより、バイヤーに情報を渡す機会がセラーに与えられます。

- `browserSignals`<br> オークションに関する情報を提供するブラウザによって作成されるオブジェクト。以下に例を示します。<br><br>

    ```javascript
    {
      'topWindowHostname': 'publisher.example',
      'seller': 'https://ssp.example',
      'interestGroupOwner': 'https://dsp.example',
      'interestGroupName': 'custom-bikes',
      'renderUrl': 'https://cdn.example/winning-creative.wbn',
      'bid:' <bidValue>
    }
    ```

#### 一時的な勝敗レポートの実装 {: #temporary-reporting}

Chrome では、暫定的に 2 つの方法でオークションの勝敗をレポートできます。

- `forDebuggingOnly.reportAdAuctionLoss()`
- `forDebuggingOnly.reportAdAuctionWin()`

これらのメソッドはそれぞれ、オークションの完了後に取得する URL を引数として取ります。`scoreAd()` と `generateBid()` の両方で、異なる URL 引数を使用して何度も呼び出すことができます。

Chrome は、オークションが完了するまで実行された場合にのみ、デバッグの勝敗レポートを送信します。オークションがキャンセルされた場合（新しいナビゲーションなどが原因で）、レポートは生成されません。

これらのメソッドは、Chrome で `chrome://flags/#privacy-sandbox-ads-apis` が有効になっている場合にデフォルトで使用できます。ただし、FLEDGE を有効にするコマンドライン フラグを使用して Chrome を実行している場合は、`BiddingAndScoringDebugReportingAPI` フラグを含めて、メソッドを明示的に有効にする必要があります。フラグが有効になっていない場合、メソッドは引き続き使用できますが、何も起こりません。

<p style="color: #547fc0; font-size: 4rem; text-align: center;" aria-hidden="true">⬇︎</p>

### 8. 広告クリックが報告される

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/rDAkvTMMDjwc7MuMjzqw.png", alt="ニュースサイトで Fenced Frame 内の自転車の広告をクリックする人を示す図。レポートデータはセラーとバイヤーに送られます。" , width="600", height="220" %}

Fenced Frame にレンダリングされた広告のクリックが報告されます。これがどのように機能するかについて詳しくは、[Fenced Frames 広告のレポート](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#reportevent)を参照してください。

<hr>

<br>

{: #auction-diagram}

以下の図は、FLEDGE の[広告オークション](#ad-auction)の各段階の概要を示しています（<a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&amp;w=1600" target="_blank">拡大版を表示</a>）。

<figure class="w-figure">{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png", alt="FLEDGE 広告オークションの各段階の概要を示す図", width="800", height="481" %}</figure>

<br>

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

ユーザーは、chrome://settings/privacySandbox の最上位の設定を有効または無効にすることで、Chrome のプライバシーサンドボックス トライアルへの参加を調整できます。初期のテストでは、ユーザーはこの高レベルのプライバシーサンドボックス設定を通じて FLEDGE をオプトアウトできます。Chrome では、ユーザーがアクセスしたウェブサイト全てで、自分が追加されたインタレストグループのリストを表示および管理できるようにする予定です。プライバシーサンドボックスのテクノロジー自体と同様に、ユーザー設定は、ユーザー、規制当局などからのフィードバックによって進化する可能性があります。

[テストとフィードバックに基づいて](/docs/privacy-sandbox/cds21-update/#collaborate)、FLEDGE の提案が進むにつれて、Chrome で利用可能な設定を更新し続けます。将来的には、FLEDGE と関連データを管理するためのより詳細な設定を提供する予定です。

ユーザーがシークレットモードで閲覧している場合、API 呼び出し元はグループ メンバーシップにアクセスできません。また、ユーザーがサイトデータを消去すると、メンバーシップが削除されます。

{% endDetails %}

<br><br>

## エンゲージメントとフィードバックの共有 {: #engage}

- **GitHub**: [提案](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/WICG/turtledove/issues)したりできます。
- **W3C**: [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) で業界のユースケースについて議論できます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。
- **FLEDGE メーリング リスト**: [fledge-api-announce](https://groups.google.com/u/1/a/chromium.org/g/fledge-api-announce) では、API に関するお知らせと更新を配信します。
- [FLEDGE の定例会議にご参加](https://github.com/WICG/turtledove/issues/88)ください（隔週）。どなたでも参加できますが、参加するにはまず [WICG に参加](https://www.w3.org/community/wicg/)してください。積極的に参加するのでも、聞くだけでも構いません！
- プライバシーサンドボックスの[フィードバックフォーム](/docs/privacy-sandbox/feedback/#feedback-form)を使用すると、公開フォーラムの外で Chrome チームと非公開でフィードバックを共有できます。

## サポートを受ける

**ユーザーの実装**、**デモ**、または**ドキュメント**について質問するには、以下の方法を利用できます。

- privacy-sandbox-dev-support リポジトリ[で新しいイシューを投稿](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)します。FLEDGE のイシューテンプレートを必ず選択してください。
- [GitHub の demo code リポジトリ](https://github.com/JackJey/fledge-demo)でイシューを提起してください。
- API を使って**ユースケース**を実現する方法に関する一般的な質問については、[提案のリポジトリでイシューを提出](https://github.com/WICG/turtledove/issues/new)してください。

Chrome での FLEDGE API の実装に関するバグとイシューについては、以下の方法を利用できます。

- API について報告された[既存のイシューを表示](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)します。
- 新しいイシューは、[crbug.com/new](https://crbug.com/new) に報告してください。

## アップデートを入手する

- API のステータス変更の通知を受け取るには、[開発者向けメーリングリスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)に参加してください。
- API に関する現在進行中のすべてのディスカッションを細かくフォローするには、[GitHub の提案ページ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)にある **Watch** ボタンをクリックしてください。これには、[GitHub アカウントを持っているか作成する](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)必要があります。
- プライバシーサンドボックスの包括的な最新情報を入手するには、RSS フィードで「[プライバシーサンドボックスの進行状況](/tags/progress-in-the-privacy-sandbox/)」を購読してください。

## 詳細について

- [FLEDGE API](/docs/privacy-sandbox/fledge) : あまり技術的でない、提案の概要。
- [FLEDGE デモ](https://fledge-demo.glitch.me): FLEDGE の基本的なデプロイのウォークスルー。
- [FLEDGE デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv): デモコードを説明し、FLEDGE のデバッグに Chrome DevTools を使用する方法を示します。
- [FLEDGE API のテクニカル Explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
- [プライバシーサンドボックスの詳細](https://web.dev/digging-into-the-privacy-sandbox)
- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI)。

<hr>

写真提供: [Ray Hennessy](https://unsplash.com/photos/GL6ORxDMswI)（[Unsplash](https://unsplash.com/@rayhennessy)）

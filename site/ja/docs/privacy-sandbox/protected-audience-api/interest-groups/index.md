---
layout: layouts/doc-post.njk
title: '買い手向けガイド: インタレスト グループに参加して入札を生成する'
subhead: Protected Audience API オークションでリマーケティング リストに参加して入札するための買い手向け API ガイドとリファレンス。
description: Protected Audience API オークションでリマーケティング リストに参加して入札するための買い手向け API ガイドとリファレンス。
date: 2022-11-01
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

この記事では、実験的な Protected Audience API の現在のイテレーションで使用されている、インタレスト グループの技術リファレンスを紹介します。

Protected Audience API のライフサイクル全体については[開発者ガイド](/docs/privacy-sandbox/protected-audience-api)を読み、[ブラウザによるインタレスト グループの記録](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups)方法に関する詳細な提案については Protected Audience API の Explainer をご覧ください。

開発者でない方は、[Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)をご覧ください。

## Protected Audience API インタレスト グループ

Protected Audience API インタレスト グループは、共通の関心を持つユーザーを[リマーケティング](/docs/privacy-sandbox/glossary/#remarketing) リストに対応してグループ化したものです。すべての Protected Audience API インタレスト グループには[オーナー](/docs/privacy-sandbox/protected-audience#interest-group-types)が存在します。

インタレスト グループのオーナーは、Protected Audience API 広告オークションの買い手として機能します。インタレスト グループのメンバーシップはブラウザによってユーザーのデバイスに保存されるものであり、ブラウザのベンダーや他の誰とも共有されることはありません。

## Protected Audience API 広告オークションに入札する

Protected Audience API インタレスト グループのオーナーは、[Protected Audience API 広告オークションへの入札](#generatebid)に招待されます。

## API 関数

### `joinAdInterestGroup()`

広告主のデマンドサイド プラットフォーム（DSP）または広告主自体は、`navigator.joinAdInterestGroup()` を呼び出して、ブラウザに対し、ブラウザのメンバーシップ リストにインタレスト グループを追加するよう要求します。

`joinAdInterestGroup()` の呼び出し元コンテキストのオリジンは、インタレスト グループのオーナーのオリジンと一致する必要があるため、`joinAdInterestGroup()` は、インタレスト グループのオーナーのオリジンと現在のドキュメントのオリジンが一致しない限り（たとえば、独自のインタレスト グループを持つウェブサイト）、iframe から呼び出す必要があります。

`joinAdInterestGroup()` には以下からの許可が必要です。

- [アクセスされているサイト](#visited-site-permission)
- インタレスト グループのオーナー

つまり、`dsp.example.com` が許可を付与しない限り、`malicious.example` は `dsp.example.com` が所有するインタレスト グループに対して `joinAdInterestGroup()` を呼び出せないということです。

#### アクセスされているサイトからの許可 {: #visited-site-permission}

許可は、同じオリジンまたはクロスオリジンから付与できます。

デフォルトでは、アクセスされているサイトと同じオリジン（現在のページのトップレベル フレームと同じオリジン）からの `joinAdInterestGroup()` 呼び出しに対して許可が付与されます。サイトは、[`join-ad-interest-group` 権限ポリシーヘッダー](/docs/privacy-sandbox/permissions-policy/)を使用して、`joinAdInterestGroup()` 呼び出しを無効にすることができます。

`joinAdInterestGroup()` クロスオリジン（現在のページとは異なるオリジン）の呼び出しは、アクセスされているサイトがクロスオリジン iframe からの `joinAdInterestGroup()` の呼び出しを許可する権限ポリシーを設定している場合にのみ成功します。

{% Aside %} Protected Audience API の現在の実装のデフォルトでは、クロスオリジン iframe も含むページ内のどこからでも `joinAdInterestGroup()` を呼び出すことができます。

将来的には、サイト所有者に権限ポリシーを調整する時間ができたら、クロスオリジン iframe からの呼び出しをデフォルトで禁止にする予定です。 {% endAside %}

#### インタレスト グループのオーナーからの許可

インタレスト グループのオーナーの許可は、インタレスト グループのオーナーと同じオリジンを持つ iframe から `joinAdInterestGroup()` を呼び出すことによって暗黙的に付与されます。たとえば、`dsp.example.com` iframe は、 `dsp.example.com` が所有するインタレスト グループに対して `joinAdInterestGroup()` を呼び出すことができます。

基本的に、`joinAdInterestGroup()` はオーナーのドメインのページまたは iframe で実行されるか、`.well-known` URL のリストを使用して提供される他のドメインに委譲されます。

#### 使用例

以下は、インタレスト グループを定義し、ブラウザにグループへの参加を要求する方法を例で示しています。

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

関数に渡される `interestGroup` オブジェクトのサイズは 50 kiB を超えてはいけません。超えてしまうと、呼び出しは失敗します。2 番目のパラメーターは、インタレスト グループの期間を指定します。上限は 30 日です。連続して呼び出すと、以前に保存された値が上書きされます。

{% Aside 'gotchas' %}

Protected Audience API メソッドのパラメーターとして使用されるすべての URL は、安全なオリジンからのものである必要があります。つまり、すべてのリソースは、HTTPS URL 経由で提供される必要があります。[ローカル開発での HTTPS の使用方法](https://web.dev/how-to-use-local-https/)には、Protected Audience API をローカルで実行するときにこれをどのように行うかが説明されています。

さらに、`biddingLogicUrl`、`decisionLogicUrl`、`trustedBiddingSignals` には、`X-Allow-FLEDGE: true` HTTP レスポンスヘッダーが必要です。

{% endAside %}

#### 必須のプロパティ {: #interest-group-properties}

インタレスト グループに必要なプロパティは、`owner` と `name` のみです。

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">プロパティ</th>
        <th style="font-weight: bold; text-align: left;">例</th>
        <th style="font-weight: bold; text-align: left;">役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>owner</code></td>
        <td style="vertical-align: top;"><code>https://dsp.example</code></td>
        <td style="vertical-align: top;">インタレスト グループ オーナーのオリジン。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>name</code></td>
        <td style="vertical-align: top;"><code>custom-bikes</code></td>
        <td style="vertical-align: top;">インタレスト グループの名前。</td>
      </tr>
    </tbody>
  </table>
</div>

#### オプションのプロパティ

残りのプロパティはオプションです。

<dl>
    <dt>
<code>biddingLogicUrl</code><sup><a href="#first-ref">1、2</a> <a href="#second-ref">_</a></sup>
</dt>
        <dd>例: <code>https://dsp.example/bid/custom-bikes/bid.js</code>
</dd>
        <dd>役割: ワークレットで実行される入札 JavaScript の URL。</dd>
    <dt>
<code>biddingWasmHelperUrl</code><sup><a href="#first-ref">1、2</a> <a href="#second-ref">_</a></sup>
</dt>
        <dd>例: <code>https://dsp.example/bid/custom-bikes/bid.wasm</code>
</dd>
        <dd>役割: <code>biddingLogicUrl</code> から駆動される WebAssembly コードの URL。</dd>
    <dt>
<code>dailyUpdateUrl</code><sup><p data-md-type="paragraph"><a href="#second-ref">2</a></p></sup>
</dt>
        <dd>例: <code>https://dsp.example/bid/custom-bikes/update</code>
</dd>
        <dd>役割: インタレスト グループの属性を更新する JSON を返す URL。（<a href="#update-interest-group">インタレスト グループを更新する</a>をご覧ください。）</dd>
    <dt>
<code>trustedBiddingSignalsUrl</code><sup><p data-md-type="paragraph"><a href="#second-ref">2</a></p></sup>
</dt>
        <dd>例: <code>https://dsp.example/trusted/bidding-signals</code>
</dd>
        <dd>役割: 入札者の信頼できるサーバーへの Key-Value リクエストのベース URL。</dd>
    <dt><code>trustedBiddingSignalsKeys</code></dt>
        <dd>例: <code>['key1', 'key2' ...]</code>
</dd>
        <dd>役割: Key-Value の信頼できるサーバーへのリクエストのキー。</dd>
    <dt><code>userBiddingSignals</code></dt>
        <dd>例: <code>{...}</code>
</dd>
        <dd>役割: オーナーが入札中に使用できる追加のメタデータ。</dd>
    <dt>
<code>ads</code><sup><p data-md-type="paragraph"><a href="#first-ref">1</a></p></sup>
</dt>
        <dd>例: <code>[bikeAd1, bikeAd2, bikeAd3]</code>
</dd>
        <dd>役割: このインタレスト グループ向けにレンダリングされる可能性のある広告。</dd>
    <dt><code>adComponents</code></dt>
        <dd>例: <code>[customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2]</code>
</dd>
        <dd>役割: <a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">複数の部分で構成される広告</a>のコンポーネント。</dd>
</dl>

<caption style="text-align:left">
<p id="first-ref"><sup>1</sup> The `biddingLogicUrl` and `ads` properties are optional, but
required to participate in an auction. There may be use cases for creating an interest group without these properties: for example, an interest group owner might want to add a browser to an interest group for a campaign that isn't running yet, or for some other future use, or they may temporarily have run out of advertising budget.</p>

<p id="second-ref"><sup>2</sup> In the current implementation of the Protected Audience API, `biddingLogicUrl`,
`biddingWasmHelperUrl`, `dailyUpdateUrl` and `trustedBiddingSignalsUrl` must
have the same origin as owner. That may not be a long-term constraint, and
the `ads` and `adComponents` URLs have no such constraint.</p>
</caption>

#### 属性の更新 {: #update-interest-group}

`dailyUpdateUrl` は、`joinAdInterestGroup()` に渡されるインタレスト グループ オブジェクトに対応してインタレスト グループ プロパティを定義する JSON を返すウェブサーバーを指定します。

これにより、グループのオーナーは、インタレスト グループの属性を定期的に更新できます。[現在の実装](https://source.chromium.org/chromium/chromium/src/+/main:content/browser/interest_group/interest_group_storage.cc;l=671;drc=5a102f146faa0c21eb9cf255ceb46b35a158ab3f)では、次の属性を変更できます。

- `biddingLogicUrl`
- `biddingWasmHelperUrl`
- `trustedBiddingSignalsUrl`
- `trustedBiddingSignalsKeys`
- `ads`
- `priority`

JSON で指定されていないフィールドは上書きされず、JSON で指定されたフィールドのみが更新されますが、`navigator.joinAdInterestGroup()` を呼び出すと、既存のインタレスト グループが上書きされます。

更新はベストエフォートであり、次の条件では失敗する可能性があります。

- ネットワーク リクエストのタイムアウト（現在 30 秒）。
- その他のネットワーク障害。
- JSON 解析の失敗。

更新は 1 日あたり最大 1 回に制限されています。

更新に連続して長い時間が費やされた場合には、更新がキャンセルされることもありますが、これによりキャンセルされた（残りの）更新にレート制限が課されることはありません。ネットワーク エラーが原因で失敗した更新は 1 時間後に再試行され、インターネットからの切断が原因で失敗した更新は再接続後にすぐに再試行されます。

##### 手動更新

現在のフレームのオリジンが所有するインタレスト グループの更新は、`navigator.updateAdInterestGroups()` を介して手動でトリガーできます。

レート制限により、更新が頻繁に行われることが防止されています。`navigator.updateAdInterestGroups()` を繰り返し呼び出しても、レート制限期間（現在は 1 日）が経過するまでは何も行われません。

同じインタレスト グループの `owner` と `name` に対して `navigator.joinAdInterestGroup()` が再度呼び出される場合、レート制限はリセットされます。

##### 自動更新

オークション用にロードされたすべてのインタレスト グループは、手動更新と同じレート制限が適用される上で、オークションの完了後に自動的に更新されます。

少なくとも 1 つのインタレスト グループがオークションに参加しているオーナーごとに、そのオーナーと一致するオリジンの iframe から `navigator.updateAdInterestGroups()` が呼び出されたかのように動作します。

#### インタレスト グループの広告の指定

`ads` および `adComponents` オブジェクトには、広告クリエイティブの URL と、オプションで、入札時に使用できる任意のメタデータが含まれます。

以下に例を示します。

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

### `generateBid()` {: #generatebid}

`biddingLogicUrl` にあるインタレスト グループオーナーのスクリプトには、`generateBid()` 関数が含まれている必要があります。

[売り手が `navigator.runAdAuction()` を呼び出す](/docs/privacy-sandbox/protected-audience-api/ad-auction)と、`generateBid()` 関数が広告の候補ごとに 1 回呼び出されます。つまり、インタレスト グループのオーナーが入札に招待されている場合、ブラウザがメンバーとなっているインタレスト グループごとに呼び出されます。

売り手は、`navigator.runAdAuction()` に渡されるオークション構成パラメーターに `decisionLogicUrl` を提供します。この URL のコードには、参加している各入札者によって生成された入札をスコアリングする `scoreAd()` 関数が含まれている必要があります。

{% Aside %}

`biddingWasmHelperUrl` プロパティはオプションです。このプロパティにより、入札者は、JavaScript ではなく [WebAssembly](https://developer.mozilla.org/docs/WebAssembly) で計算量の多いサブルーチンを提供し、`biddingLogicUrl` によって提供される JavaScript 関数から駆動できるようになります。

指定される場合は、`application/wasm mimetype` で配信される WebAssembly バイナリを指している必要があります。対応する `WebAssembly.Module` は、ブラウザによって `generateBid()` 関数で使用できるようになります。

{% endAside %}

買い手が提供する `biddingLogicUrl` のスクリプトには、`generateBid()` 関数が含まれている必要があります。

この関数は、候補広告ごとに 1 回呼び出されます。[`runAdAuction()`](/docs/privacy-sandbox/protected-audience-api/ad-auction/) は、関連付けられた入札とメタデータとともに各広告を個別にチェックしてから、数値の望ましさスコアを広告に割り当てます。

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

#### 引数

`generateBid()` は次の引数を取ります。

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">引数</th>
        <th style="font-weight: bold; text-align: left;">役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>interestGroup</code></td>
        <td style="vertical-align: top;">広告の買い手によって渡されるオブジェクト。インタレスト グループは、<code>dailyUpdateUrl</code> で更新される場合があります。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionSignals</code></td>
        <td style="vertical-align: top;">売り手によって <code>navigator.runAdAuction()</code> に渡される<a href="#ad-auction">オークション構成</a>引数のプロパティ。これにより、ページ コンテキスト（広告サイズやサイト運営者 ID など）、オークションの種類（ファースト プライスまたはセカンド プライス）、およびその他のメタデータに関する情報が提供されます。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerSignals</code></td>
        <td style="vertical-align: top;">売り手によって渡される<a href="#ad-auction">オークション構成</a>引数のプロパティ。これにより、売り手が <a href="/docs/privacy-sandbox/glossary#ssp">SSP</a> であり、買い手のサーバーにリアルタイムの入札呼び出しを実行してレスポンスを返す場合、またはサイト運営者のページが買い手のサーバーに直接接続する場合、買い手のサーバーからページに関するコンテキスト シグナルを提供できます。その場合、買い手は、改ざんに対する保護として、<code>generateBid()</code> 内のこれらのシグナルの暗号署名を確認することを希望する場合があります。</td>
      </tr>
      <tr>
              <td style="vertical-align: top;"><code>trustedBiddingSignals</code></td>
              <td style="vertical-align: top;">キーがインタレスト グループの <code>trustedBiddingSignalsKeys</code> であり、その値が <code>trustedBiddingSignals</code> リクエストで返されるオブジェクト。</td>
       </tr>
       <tr>
         <td style="vertical-align: top;">
<code>browserSignals</code><sup>3</sup>
</td>
         <td style="vertical-align: top;">ブラウザによって作成されたオブジェクトで、ページコンテキストに関する情報（現在のページの <code>hostname</code> など、売り手が偽造する可能性があるもの）やインタレスト グループ自体のデータ（グループが以前に落札したときの記録など、オンデバイスのフリークエンシー キャップを許可するためのデータ）が含まれる場合があります。</td>
       </tr>
    </tbody>
  </table>
</div>

<sup>3</sup> `browserSignals` オブジェクトには次のプロパティがあります。

```javascript
{
  topWindowHostname: 'publisher.example',
  seller: 'https://ssp.example',
  joinCount: 3,
  bidCount: 17,
  prevWins: [[time1,ad1],[time2,ad2],...],
  wasmHelper: ... /* WebAssembly.Module object based on interest group's biddingWasmHelperUrl. */
  dataVersion: 1, /* Data-Version value from the buyer's Key/Value service response(s). */
}
```

`bid` 値を計算するには、`generateBid()` のコードで関数のパラメーターのプロパティを使用できます。

以下に例を示します。

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

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">プロパティ</th>
        <th style="font-weight: bold; text-align: left;">役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>ad</code></td>
        <td style="vertical-align: top;">売り手がこの入札または広告クリエイティブについて知ることを期待する情報など、広告に関する任意のメタデータ。売り手は、この情報をオークションおよび決定ロジックで使用します。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>bid</code></td>
        <td style="vertical-align: top;">オークションに入力する数値入札。売り手は、さまざまな買い手の入札を比較できる立場にある必要があります。したがって、入札は、売り手が選択した単位で行う必要があります（例: 「1,000 単位の USD」)。入札額がゼロまたはマイナスの場合、このインタレスト グループは売り手のオークションにまったく参加しません。この仕組みにより、買い手は、広告が表示される場所と表示されない場所に関する広告主ルールを実装できます。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>render</code></td>
        <td style="vertical-align: top;">この入札がオークションで落札された場合にクリエイティブをレンダリングするために使用される URL または URL のリスト。値は、<a href="#ad-components">インタレスト グループに対して定義されたいずれかの広告</a>の `renderUrl` と一致する必要があります。<br><br><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">複数の部分で構成される広告の Explainer</a>
</td>
      </tr>
            <tr>
              <td style="vertical-align: top;"><code>adComponents</code></td>
              <td style="vertical-align: top;">`navigator.joinAdInterestGroup()` に渡されるインタレスト グループ引数の <a href="#ad-components">adComponents</a> プロパティから取得される、<a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">複数の部分で構成される広告</a>の最大 20 個のコンポーネントのオプションリスト。</td>
            </tr>
    </tbody>
  </table>
</div>

### ` leaveAdInterestGroup()`

インタレスト グループのオーナーは、ブラウザをインタレスト グループから削除するよう要求できます。メンバーシップ リストからインタレスト グループを削除するのはブラウザです。

```javascript
navigator.leaveAdInterestGroup({
  owner: 'https://dsp.example',
  name: 'custom-bikes'
});
```

ユーザーがインタレスト グループの追加をブラウザに要求したサイトに戻った場合、インタレスト グループのオーナーは `navigator.leaveAdInterestGroup()` 関数を呼び出してブラウザにインタレスト グループの削除を要求できます。

広告のコードを使って、そのインタレスト グループに対してこの関数を呼び出すこともできます。

## よくある質問

{% Details %} {% DetailsSummary %}

### クリックによるフリークエンシー制御を実装するにはどうすればよいですか？

{% endDetailsSummary %}

単純なフリークエンシー制御であれば、`generateBid()` 内の `browserSignals` の `prevWins` フィールドを使用できます。または、`navigator.leaveAdInterestGroup()` を呼び出して、広告がクリックされたときにユーザーのブラウザがインタレスト グループから外されるようにリクエストすることもできます。このようにすると以降の入札が阻止されるため、フリークエンシー <br> キャップの一種として機能します。

ファーストパーティ Cookie を使用してクリック情報を保存することもできます。広告がレンダリングされると、既存のインタレスト グループがユーザーの入札シグナルとしてのクリック データで上書きされます。ワークフローは次のようになります。

- ユーザーが、`advertiser.com/product` にアクセスします。
- 広告主はファーストパーティ Cookie に「0 クリック」を書き込み、`joinAdInterestGroup({ ..., userBiddingSignals: { clicks: [] } })` を呼び出します。
- ユーザーが後で広告をクリックすると、`advertiser.com/product` に移動されます。
- 広告主はファーストパーティ Cookie のクリックデータを読み取って増分し、`joinAdInterestGroup({ userBiddingSignals: { clicks: ["1667499972"] } })` を呼び出します。
- 以降の入札では、`userBiddingSignals` で利用可能なクリックデータを入札ロジックで使用できます。{% endDetails %}

{% Details %} {% DetailsSummary %}

### ユーザーの最近の閲覧履歴を広告の推奨に使用するにはどうすればよいですか？

{% endDetailsSummary %}

`joinAdInterestGroup()` を呼び出したサイトのユーザーの閲覧履歴は、`userBiddingSignals` で更新でき、オンデバイス入札中に使用できます。[製品レベルの TURTLEDOVE](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md) の原案を参照してください。これには、推奨ユースケース採用のためのコア指標の影響に関する RTB House による分析が含まれています。

`dailyUpdateUrl` はインタレスト グループの属性を定期的に更新するメカニズムを提供していますが、この更新はユーザーの閲覧履歴に基づくものではありません。 {% endDetails %}

{% Details %} {% DetailsSummary %}

### グループオーナーあたり、最大いくつの単一ユーザーインタレスト グループが許可されていますか？

{% endDetailsSummary %}

Chrome では、オーナーあたり最大 1,000 個のインタレスト グループ、および最大 1,000 個のインタレスト グループ オーナーを許可しています。これらはガードレールとしての役割を果たしており、通常の操作では到達することはありません。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### 𝑘-anon のしきい値を満たすインタレスト グループ広告を最大化するにはどうすればよいですか？

{% endDetailsSummary %}

[公開 Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#12-interest-group-attributes) に指摘されているように、1 つのインタレスト グループは、表示される可能性のある複数の広告を掲載できるため、そのグループには、最も優先される広告がしきい値を下回るたびに、「フォールバック広告」として機能する別の広告を再入札する機会が与えられます。つまり、𝑘 匿名性のしきい値を未だに下回っている小規模の専門的な広告でもオークションに参加することを選択でき、そのインタレスト グループには、より専門的な広告が十分な数のオーディエンスを獲得するまで、より一般的な広告にフォールバックする方法があるということです。

戦術的には、以下のことを考慮するとよいでしょう。

- 新しい広告が表示され始めるようにするには、その広告を表示したいケースへの入札を開始します。ほかに何も行う必要はありません。

- 新しい広告が 𝑘-anon ではない場合に使用するフォールバック広告を設定できます。フォールバック広告自体が 𝑘-anon ではないリスクがあるため、場合によっては最初からフォールバック広告のみで入札することを検討することもできます。フォールバックがしきい値を上回る状態を維持できる十分なレベルであれば、たとえばこれを 1% の確率で実行することができます。

最近、他の方法で機能する可能性についてのディスカッションがありました。このメカニズムで問題が起きるユースケースがある場合は、API を改善する方法についての公開ディスカッションに引き続き参加してください。{% endDetails %}

## すべての Protected Audience API リファレンス

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

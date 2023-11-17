---
layout: layouts/doc-post.njk
title: 'Buyer guide: join interest groups and generate bids'
subhead: |2

  Buyer API guide and references to join remarketing lists and bid
  in Protected Audience API auctions.
description: |2

  Buyer API guide and references to join remarketing lists and bid
  in Protected Audience API auctions.
date: '2022-11-01'
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

In this article, you'll find a technical reference for interest groups, as used in the current iteration of the experimental Protected Audience API.

Read the [developer guide](/docs/privacy-sandbox/protected-audience-api) for the full life cycle of the Protected Audience API, and refer to the Protected Audience API explainer for an in-depth proposal of how [browsers record interest groups](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#1-browsers-record-interest-groups).

開発者でない方は、[Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)をご覧ください。

## Protected Audience API interest groups

A Protected Audience API interest group represents a group of people with a common interest, corresponding to a [remarketing](/docs/privacy-sandbox/glossary/#remarketing) list. Every Protected Audience API interest group has an [owner](/docs/privacy-sandbox/protected-audience#interest-group-types).

Interest group owners act as the buyer in the Protected Audience API ad auction. Interest group membership is stored by the browser, on the user's device, and is not shared with the browser vendor or anyone else.

## Bid in a Protected Audience API ad auction

Owners of Protected Audience API interest groups can be invited to [bid in Protected Audience API ad auctions](#generatebid).

## API 関数

### `joinAdInterestGroup()`

The advertiser's demand-side platform (DSP) or the advertiser itself calls `navigator.joinAdInterestGroup()` to ask the browser to add an interest group to the browser's membership list.

The origin of the calling context for `joinAdInterestGroup()` must match the interest group owner's origin, so `joinAdInterestGroup()` will need to be called from an iframe (for example, from a DSP) unless the origin of the interest group owner matches the origin of the current document (for example, a website with its own interest groups).

`joinAdInterestGroup()` requires permission from:

- The [site being visited](#visited-site-permission)
- The interest group owner

This means it's not possible for `malicious.example` to call `joinAdInterestGroup()` for an interest group owned by  `dsp.example.com`, without `dsp.example.com` granting permission.

#### アクセスされているサイトからの許可 {: #visited-site-permission}

Permission can be granted from the same origin or cross-origin.

By default, permission is granted for `joinAdInterestGroup()` calls from the same origin as the site visited, (in other words, from the same origin as the top-level frame of the current page). Sites can use the [`join-ad-interest-group` permissions policy header](/docs/privacy-sandbox/permissions-policy/) to disable `joinAdInterestGroup()` calls.

`joinAdInterestGroup()` クロスオリジン（現在のページとは異なるオリジン）の呼び出しは、アクセスされているサイトがクロスオリジン iframe からの `joinAdInterestGroup()` の呼び出しを許可する権限ポリシーを設定している場合にのみ成功します。

{% Aside %} Protected Audience API の現在の実装のデフォルトでは、クロスオリジン iframe も含むページ内のどこからでも `joinAdInterestGroup()` を呼び出すことができます。

将来的には、サイト所有者に権限ポリシーを調整する時間ができたら、クロスオリジン iframe からの呼び出しをデフォルトで禁止にする予定です。 {% endAside %}

#### Permission from the interest group owner

Interest group owner permission is implicitly granted by calling `joinAdInterestGroup()` from an iframe with the same origin as that of the interest group's owner. For example, a `dsp.example.com` iframe can call `joinAdInterestGroup()` for interest groups owned by `dsp.example.com`.

基本的に、`joinAdInterestGroup()` はオーナーのドメインのページまたは iframe で実行されるか、`.well-known` URL のリストを使用して提供される他のドメインに委譲されます。

#### Example usage

Here's an example of how one might define an interest group and ask the browser to join the group.

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

The `interestGroup` object passed to the function must be no more than 50 kiB in size, otherwise the call will fail. The second parameter specifies the duration of the interest group, capped at 30 days. Successive calls overwrite previously stored values.

{% Aside 'gotchas' %}

Protected Audience API メソッドのパラメーターとして使用されるすべての URL は、安全なオリジンからのものである必要があります。つまり、すべてのリソースは、HTTPS URL 経由で提供される必要があります。[ローカル開発での HTTPS の使用方法](https://web.dev/how-to-use-local-https/)には、Protected Audience API をローカルで実行するときにこれをどのように行うかが説明されています。

さらに、`biddingLogicUrl`、`decisionLogicUrl`、`trustedBiddingSignals` には、`X-Allow-FLEDGE: true` HTTP レスポンスヘッダーが必要です。

{% endAside %}

#### Required properties {: #interest-group-properties}

The only required properties for interest groups are `owner` and `name`:

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Property</th>
        <th style="font-weight: bold; text-align: left;">Example</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>owner</code></td>
        <td style="vertical-align: top;"><code>https://dsp.example</code></td>
        <td style="vertical-align: top;">Origin of the interest group owner.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>name</code></td>
        <td style="vertical-align: top;"><code>custom-bikes</code></td>
        <td style="vertical-align: top;">Name of the interest group.</td>
      </tr>
    </tbody>
  </table>
</div>

#### Optional properties

The remaining properties are optional:

<dl>
    <dt>
<code>biddingLogicUrl</code><sup><a href="#first-ref">1</a>, <a href="#second-ref">2</a></sup>
</dt>
        <dd>Example: <code>https://dsp.example/bid/custom-bikes/bid.js</code>
</dd>
        <dd>役割: ワークレットで実行される入札 JavaScript の URL。</dd>
    <dt>
<code>biddingWasmHelperUrl</code><sup><a href="#first-ref">1</a>, <a href="#second-ref">2</a></sup>
</dt>
        <dd>Example: <code>https://dsp.example/bid/custom-bikes/bid.wasm</code>
</dd>
        <dd>役割: <code>biddingLogicUrl</code> から駆動される WebAssembly コードの URL。</dd>
    <dt>
<code>dailyUpdateUrl</code><sup><p data-md-type="paragraph"><a href="#second-ref">2</a></p></sup>
</dt>
        <dd>Example: <code>https://dsp.example/bid/custom-bikes/update</code>
</dd>
        <dd>Role: URL that returns JSON to update interest group attributes.         (See <a href="#update-interest-group">Update the interest group</a>.)</dd>
    <dt>
<code>trustedBiddingSignalsUrl</code><sup><p data-md-type="paragraph"><a href="#second-ref">2</a></p></sup>
</dt>
        <dd>Example: <code>https://dsp.example/trusted/bidding-signals</code>
</dd>
        <dd>役割: 入札者の信頼できるサーバーへの Key-Value リクエストのベース URL。</dd>
    <dt><code>trustedBiddingSignalsKeys</code></dt>
        <dd>Example: <code>['key1', 'key2' ...]</code>
</dd>
        <dd>役割: Key-Value の信頼できるサーバーへのリクエストのキー。</dd>
    <dt><code>userBiddingSignals</code></dt>
        <dd>Example: <code>{...}</code>
</dd>
        <dd>役割: オーナーが入札中に使用できる追加のメタデータ。</dd>
    <dt>
<code>ads</code><sup><p data-md-type="paragraph"><a href="#first-ref">1</a></p></sup>
</dt>
        <dd>Example: <code>[bikeAd1, bikeAd2, bikeAd3]</code>
</dd>
        <dd>Role: Ads that might be rendered for this interest group.</dd>
    <dt><code>adComponents</code></dt>
        <dd>Example: <code>[customBike1, customBike2, bikePedal, bikeFrame1, bikeFrame2]</code>
</dd>
        <dd>役割: <a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">複数の部分で構成される広告</a>のコンポーネント。</dd>
</dl>

```
<caption style="text-align:left">
<p id="first-ref"><sup>1</sup> The `biddingLogicUrl` and `ads` properties are optional, but
required to participate in an auction. There may be use cases for creating an interest group without these properties: for example, an interest group owner might want to add a browser to an interest group for a campaign that isn't running yet, or for some other future use, or they may temporarily have run out of advertising budget.</p>

<p id="second-ref"><sup>2</sup> In the current implementation of the Protected Audience API, `biddingLogicUrl`,
`biddingWasmHelperUrl`, `dailyUpdateUrl` and `trustedBiddingSignalsUrl` must
have the same origin as owner. That may not be a long-term constraint, and
the `ads` and `adComponents` URLs have no such constraint.</p>
</caption>
```

#### Update attributes {: #update-interest-group}

`dailyUpdateUrl` specifies a web server that returns JSON defining interest group properties, corresponding to the interest group object passed to `joinAdInterestGroup()`.

This allows the group's owner to periodically update the attributes of the interest group. In the [current implementation](https://source.chromium.org/chromium/chromium/src/+/main:content/browser/interest_group/interest_group_storage.cc;l=671;drc=5a102f146faa0c21eb9cf255ceb46b35a158ab3f), the following attributes can be changed:

- `biddingLogicUrl`
- `biddingWasmHelperUrl`
- `trustedBiddingSignalsUrl`
- `trustedBiddingSignalsKeys`
- `ads`
- `priority`

Any field not specified in the JSON will not be overwritten—only fields specified in the JSON get updated—whereas calling `navigator.joinAdInterestGroup()` overwrites any existing interest group.

更新はベストエフォートであり、次の条件では失敗する可能性があります。

- Network request timeout (currently 30 seconds).
- Other network failure.
- JSON 解析の失敗。

Updates are rate-limited to a maximum of one per day.

Updates can be canceled if too much contiguous time has been spent updating, though this doesn't impose any rate limiting on canceled (remaining) updates. Updates that fail due to network errors are retried after an hour, and updates that fail due to disconnection from the internet are retried immediately on reconnection.

##### 手動更新

Updates to interest groups owned by the current frame's origin can be triggered manually via `navigator.updateAdInterestGroups()`.

レート制限により、更新が頻繁に行われることが防止されています。`navigator.updateAdInterestGroups()` を繰り返し呼び出しても、レート制限期間（現在は 1 日）が経過するまでは何も行われません。

The rate limit gets reset if `navigator.joinAdInterestGroup()` is called again for the same interest group `owner` and `name`.

##### Automatic updates

All interest groups loaded for an auction are updated automatically after an auction completes, subject to the same rate limits as manual updates.

For each owner with at least one interest group participating in an auction, it's as if `navigator.updateAdInterestGroups()` is called from an iframe whose origin matches that owner.

#### Specify ads for an interest group

`ads` および `adComponents` オブジェクトには、広告クリエイティブの URL と、オプションで、入札時に使用できる任意のメタデータが含まれます。

以下に例を示します。

```javascript
{
  renderUrl: 'https://cdn.example/.../bikeAd1.html',
  metadata: bikeAd1metadata // optional
}
```

### `generateBid()` {: #generatebid}

The interest group owner's script at `biddingLogicUrl` must include a `generateBid()` function.

When a [seller calls `navigator.runAdAuction()`](/docs/privacy-sandbox/protected-audience-api/ad-auction), the `generateBid()` function is called once for each candidate ad. In other words, it's called for each interest group that the browser is a member of—if the interest group's owner is invited to bid.

The seller provides a `decisionLogicUrl` in the auction configuration parameter passed to `navigator.runAdAuction()`. The code at this URL must include a `scoreAd()` function, which scores the bid generated by each participating bidder.

{% Aside %}

`biddingWasmHelperUrl` プロパティはオプションです。このプロパティにより、入札者は、JavaScript ではなく [WebAssembly](https://developer.mozilla.org/docs/WebAssembly) で計算量の多いサブルーチンを提供し、`biddingLogicUrl` によって提供される JavaScript 関数から駆動できるようになります。

指定される場合は、`application/wasm mimetype` で配信される WebAssembly バイナリを指している必要があります。対応する `WebAssembly.Module` は、ブラウザによって `generateBid()` 関数で使用できるようになります。

{% endAside %}

The script at `biddingLogicUrl` provided by a buyer must include a `generateBid()` function.

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

#### Arguments

`generateBid()` takes the following arguments:

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">引数</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>interestGroup</code></td>
        <td style="vertical-align: top;">An object passed to by the ad buyer. The interest group may be updated with <code>dailyUpdateUrl</code>.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>auctionSignals</code></td>
        <td style="vertical-align: top;">A property of the <a href="#ad-auction">auction config</a> argument passed to <code>navigator.runAdAuction()</code> by the seller. This provides information about page context (such as the ad size and the publisher ID), the type of auction (first-price or second-price), and other metadata.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>perBuyerSignals</code></td>
        <td style="vertical-align: top;">A property of the <a href="#ad-auction">auction config</a> argument passed by the seller. This can provide contextual signals from the buyer's server about the page, if the seller is an <a href="/docs/privacy-sandbox/glossary#ssp">SSP</a> which performs a real-time bidding call to buyer servers and pipes the response back, or if the publisher page contacts the buyer's server directly. If so, the buyer may wish to check a cryptographic signature of those signals inside <code>generateBid()</code> as protection against tampering. </td>
      </tr>
      <tr>
              <td style="vertical-align: top;"><code>trustedBiddingSignals</code></td>
              <td style="vertical-align: top;">An object whose keys are the <code>trustedBiddingSignalsKeys</code> for the interest group, and whose values are returned in the <code>trustedBiddingSignals</code> request.</td>
       </tr>
       <tr>
         <td style="vertical-align: top;">
<code>browserSignals</code><sup>3</sup>
</td>
         <td style="vertical-align: top;">An object constructed by the browser, which might include information about page context (such as the <code>hostname</code> of the current page, which the seller could otherwise fake) and data for the interest group itself (such as a record of when the group previously won an auction, to allow on-device frequency capping). </td>
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

`generateBid()` returns an object with four properties:

<div class="w-table-wrapper">
  <table class="w-table--top-align width-full">
    <thead>
      <tr>
        <th style="font-weight: bold; text-align: left;">Property</th>
        <th style="font-weight: bold; text-align: left;">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;"><code>ad</code></td>
        <td style="vertical-align: top;">Arbitrary metadata about the ad, such as information the seller expects to learn about this bid or ad creative. The seller uses this information in its auction and decision logic.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>bid</code></td>
        <td style="vertical-align: top;">A numerical bid that will enter the auction. The seller must be in a position to compare bids from different buyers, therefore bids must be in some seller-chosen unit (such as"USD per thousand"). If the bid is zero or negative, then this interest group will not participate in the seller's auction at all. With this mechanism, the buyer can implement any advertiser rules for where their ads may or may not appear.</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><code>render</code></td>
        <td style="vertical-align: top;">A URL, or a list of URLs, that will be used to render the creative if this bid wins the auction. The value has to match the `renderUrl` of one of the <a href="#ad-components">ads defined for the interest group</a>.<br><br><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">Ads Composed of Multiple Pieces explainer</a> </td>
      </tr>
            <tr>
              <td style="vertical-align: top;"><code>adComponents</code></td>
              <td style="vertical-align: top;">An optional list of up to 20 components for <a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces">ads composed of multiple pieces</a>, taken from the <a href="#ad-components">adComponents</a> property of the interest group argument passed to `navigator.joinAdInterestGroup()`.</td>
            </tr>
    </tbody>
  </table>
</div>

### ` leaveAdInterestGroup()`

The interest group owner can request to a browser be removed from an interest group. The browser removes the interest group from its membership list.

```javascript
navigator.leaveAdInterestGroup({
  owner: 'https://dsp.example',
  name: 'custom-bikes'
});
```

If a user returns to the site which asked the browser to add an interest group, the interest group owner can call the `navigator.leaveAdInterestGroup()` function to request the browser remove the interest group.

Code for an ad can also call this function for its interest group.

## Frequently asked questions

{% Details %} {% DetailsSummary %}

### クリックによるフリークエンシー制御を実装するにはどうすればよいですか？

{% endDetailsSummary %}

For simple frequency control, you can use the `prevWins` field in `browserSignals` inside `generateBid()`. Alternatively, you can call `navigator.leaveAdInterestGroup()` to request that a user's browser leave an interest group when an ad is clicked. This prevents future bidding and acts as a form of frequency capping.

You can also use a first-party cookie to store click information. When the ad is rendered, overwrite an existing interest group with the click data as user bidding signals. The workflow would look something like:

- ユーザーが、`advertiser.com/product` にアクセスします。
- 広告主はファーストパーティ Cookie に「0 クリック」を書き込み、`joinAdInterestGroup({ ..., userBiddingSignals: { clicks: [] } })` を呼び出します。
- ユーザーが後で広告をクリックすると、`advertiser.com/product` に移動されます。
- 広告主はファーストパーティ Cookie のクリックデータを読み取って増分し、`joinAdInterestGroup({ userBiddingSignals: { clicks: ["1667499972"] } })` を呼び出します。
- 以降の入札では、`userBiddingSignals` で利用可能なクリックデータを入札ロジックで使用できます。{% endDetails %}

{% Details %} {% DetailsSummary %}

### ユーザーの最近の閲覧履歴を広告の推奨に使用するにはどうすればよいですか？

{% endDetailsSummary %}

`joinAdInterestGroup()` を呼び出したサイトのユーザーの閲覧履歴は、`userBiddingSignals` で更新でき、オンデバイス入札中に使用できます。[製品レベルの TURTLEDOVE](https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md) の原案を参照してください。これには、推奨ユースケース採用のためのコア指標の影響に関する RTB House による分析が含まれています。

`dailyUpdateUrl` provides a mechanism to periodically update the attributes of the interest group, but this update is not based on the user's browsing history. {% endDetails %}

{% Details %} {% DetailsSummary %}

### What's the maximum number of interest groups per group owner for a single user?

{% endDetailsSummary %}

Chrome allows up to 1000 interest groups per owner, and up to 1000 interest group owners. These limits are meant as guard rails, not to be hit in regular operation.

{% endDetails %}

{% Details %} {% DetailsSummary %}

### How can I maximize interest group ads that meet 𝑘-anon thresholds?

{% endDetailsSummary %}

As the [public explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#12-interest-group-attributes) notes, since a single interest group can carry multiple possible ads that it might show, the group will have an opportunity to re-bid another one of its ads to act as a "fallback ad" any time its most-preferred choice is below threshold. This means that a small, specialized ad that is still below the 𝑘-anonymity threshold could still choose to participate in auctions, and its interest group has a way to fall back to a more generic ad until the more specialized one has a large enough audience.

戦術的には、以下のことを考慮するとよいでしょう。

- 新しい広告が表示され始めるようにするには、その広告を表示したいケースへの入札を開始します。ほかに何も行う必要はありません。

- 新しい広告が 𝑘-anon ではない場合に使用するフォールバック広告を設定できます。フォールバック広告自体が 𝑘-anon ではないリスクがあるため、場合によっては最初からフォールバック広告のみで入札することを検討することもできます。フォールバックがしきい値を上回る状態を維持できる十分なレベルであれば、たとえばこれを 1% の確率で実行することができます。

最近、他の方法で機能する可能性についてのディスカッションがありました。このメカニズムで問題が起きるユースケースがある場合は、API を改善する方法についての公開ディスカッションに引き続き参加してください。{% endDetails %}

## All Protected Audience API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

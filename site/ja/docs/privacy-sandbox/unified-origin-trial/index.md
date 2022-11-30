---
layout: layouts/doc-post.njk
title: 関連性と測定の統一オリジントライアル
subhead: >
   アトリビューション レポート、FLEDGE、
   Topics、Fenced Frames、および共有ストレージの統一実験を実行します。
description: >
   アトリビューション レポート、FLEDGE、
   Topics、Fenced Frames、および共有ストレージの統一実験を実行します。
date: 2022-09-08
updated: 2022-11-04
authors:
  - anusmitaray
  - rowan_m
---

プライバシーサンドボックスには、クロスサイトトラッキングを必要とせずに広告のユースケースを有効にするための提案が含まれています。[オリジントライアル](/blog/origin-trials/)では、開発者が実際のテストを通じて新しいウェブテクノロジーを評価し、フィードバックを提供する機会を提供しています。[プライバシーサンドボックスの関連性と測定](/origintrials/#/view_trial/771241436187197441)のオリジントライアルでは、単一のトライアルを提供することで、サイトがアトリビューション レポート、FLEDGE、Topics、Fenced Frames、および共有ストレージを統合した実験を実行できます。

開発者は、この単一のオリジントライアルに登録すると、Topics、FLEDGE、および Attribution Reporting API をテストすることができます。このガイドでは、これらの API にアクセスするための構成手順と構成を検証する方法を説明し、API に対してテストするためのその他のリソースを提供しています。

## オリジントライアルのステータスを確認する {: #status}

### 2022 年 11 月

共有ストレージの `selectURL` API は、11 月 9 日から Chrome Stable トラフィックの 1% で[オリジントライアルに追加](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wXlBwB_UAQAJ)されます。アトリビューション レポートと Topics については、以前に[プライバシーサンドボックスの関連性と測定のオリジントライアルを 5% に引き上げる](/blog/privacy-sandbox-origin-trial-increase/)というブログ記事で発表したとおり、現在 5% で実施されており、FLEDGE と Fenced Frames も 11 月 9 日からそれに続いています。

<table>
  <tr>
   <th>API</th>
   <th>備考</th>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューション レポート</a></td>
   <td>安定版で利用可能、10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a></td>
   <td>安定版で利用可能、10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">FLEDGE</a></td>
   <td>安定版で利用可能、11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
   <td>安定版で利用可能、11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">共有ストレージ</a></td>
   <td>11 月 9 日に安定版で 1% から提供開始。</td>
  </tr>
</table>

{% Details %} {% DetailsSummary %}

### これまでの更新内容

オリジントライアルに関する過去の更新内容をご覧ください。 {% endDetailsSummary %}

#### 2022 年 10 月: 5% 増加

アトリビューション レポート、Topics、FLEDGE、Fenced Frames はすべて Chrome Stable で現在利用可能であり、トラフィック増加の一部になります。アトリビューション レポートと Topics のトラフィック増加は今週から開始し、FLEDGE と Fenced Frames の増加は 11 月 9 日開始予定です。詳しくは、[プライバシーサンドボックスの関連性と測定のオリジントライアルの 5% 引き上げ](/blog/privacy-sandbox-origin-trial-increase/)に関するブログ記事をご覧ください。

<table>
  <tr>
   <th>API</th>
   <th>備考</th>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューション レポート</a></td>
   <td>安定版で利用可能、10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a></td>
   <td>安定版で利用可能、10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">FLEDGE</a></td>
   <td>安定版で利用可能、11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
   <td>安定版で利用可能、11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">共有ストレージ</a></td>
   <td>現在、M105+ Canary、Dev、およびベータ版でのみ利用可能。</td>
  </tr>
</table>

#### 2022 年 10 月

- オリジントライアルの期間が[Chrome 110 まで延長](https://groups.google.com/a/chromium.org/g/blink-dev/c/xm9EvnaVBj8)されました。[Chrome のオリジントライアルを始める](/docs/web-platform/origin-trials/#renew)では、オリジントライアルの登録を更新する方法について説明されています。これには、参加しているオリジンへの新しいトークンの提供が含まれます。これは、他のオリジントライアルの延長と同じプロセスです。

この延長は、Stable チャンネルのエコシステムに API の改善のテストと検証を継続しながら、既存の公開タイムラインに合わせてフィードバックを提供する時間を提供することを目的としています。

[プライバシーサンドボックスの全体的なタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)は変更されていません。

トライアルに含まれる API:

<table class="with-heading-tint fixed-table width-full">
  <thead>
    <tr>
      <th><strong>API</strong></th>
      <th><strong>備考</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューション レポート</a></td>
      <td>
<a href="/docs/privacy-sandbox/attribution-reporting-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fledge/">FLEDGE</a></td>
      <td>
<a href="/docs/privacy-sandbox/fledge-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/topics/">Topics</a></td>
      <td>
<a href="/docs/privacy-sandbox/topics-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
      <td>オリジントライアルの使用方法については、FLEDGE ガイドをご覧ください。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/shared-storage/">共有ストレージ</a></td>
      <td>現在、M105+ Canary、Dev、およびベータ版でのみ利用可能。</td>
    </tr>
  </tbody>
</table>

#### 2022 年 8 月

- オリジントライアルは、[Chrome Stable 104 デスクトップ版の最大 1% のユーザー](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/KhFZN95WBgAJ)に提供されます。

    - この提供にモバイルユーザーが追加されると、更新が行われます。

- 安定版前のチャンネル（Canary、ベータ）のユーザー数は 50% のままです。

- これらの API は、iOS Chrome では使用できません。

#### 2022 年 5 月

オリジントライアルは、[Chrome 102 ベータ版の最大 50% のユーザー](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/WBPqGvscAgAJ)に提供されます。このトライアルには以下の API が含まれます。

<table class="with-heading-tint fixed-table width-full">
  <thead>
    <tr>
      <th><strong>API</strong></th>
      <th><strong>備考</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/privacy-sandbox/attribution-reporting-experiment/">アトリビューション レポート</a></td>
      <td>
<a href="/docs/privacy-sandbox/attribution-reporting-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fledge-experiment/">FLEDGE</a></td>
      <td>
<a href="/docs/privacy-sandbox/fledge-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/topics-experiment/">Topics</a></td>
      <td>
<a href="/docs/privacy-sandbox/topics-experiment/">オリジントライアル開発者ガイド</a>。<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1321140">ブラウザの安定性に影響を与えるバグ</a>があったため、オリジントライアルで一時的に Topics が無効にされていました。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
      <td>Fenced Frames がオリジントライアルに追加されました。実験の使用方法については、FLEDGE ガイドをご覧ください。</td>
    </tr>
  </tbody>
</table>

#### 2022 年 4 月

オリジントライアルは、[Chrome 102 ベータ版の一部の限定ユーザー](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wzeBWfxxEgAJ)に提供が開始されます。このトライアルには以下の API が含まれます。

<table class="with-heading-tint fixed-table width-full"> <thead> <tr> <th> <strong>API</strong>
</th> <th> <strong>備考</strong>
</th> </tr> </thead> <tbody> <tr> <td> <a href="/docs/privacy-sandbox/attribution-reporting-experiment/">アトリビューション レポート</a>
</td> <td> 個別の <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y/m/nlEDdjmnCgAJ">Intent to Experiment（I2E）</a>に関する記事。アトリビューション レポートは専用のオリジントライアルとしても提供されます。</td> </tr> <tr> <td> <a href="/docs/privacy-sandbox/fledge-experiment/">FLEDGE</a>
</td> <td> 個別の <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg/m/_0T5qleqCgAJ">Intent to Experiment（I2E）</a>に関する記事。FLEDGE は<a href="https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md">機能サブセット</a>付きでデスクトップでのみ利用できます。</td> </tr> <tr> <td> <a href="/docs/privacy-sandbox/topics-experiment/">Topics</a>
</td> <td> 個別の <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs/m/jPkW3T-mCgAJ">Intent to Experiment（I2E）</a>に関する記事。</td> </tr> </tbody> </table> {% endDetails %}

## オリジントライアルへの登録と設定 {: #configure}

サイトでオリジントライアルを有効にするには、割り当てられたオリジントライアルトークン（オリジントライアルへの特定のアクセスを提供する時間ベースの文字列）を登録して埋め込む必要があります。詳細については、[Chrome のオリジントライアル入門](/docs/web-platform/origin-trials)をご覧ください。

{% Aside %}[プライバシーサンドボックスの関連性と測定のトライアル](/origintrials/#/view_trial/771241436187197441)に登録してください。 {% endAside %}

オリジントライアルトークンがすぐに付与されます。取り消しまたは再作成はいつでも可能です。

オリジントライアルを使用するすべてのページについて、その特定のページの HTML またはレスポンスにトライアルトークンを含める必要があります。

ページの `<head>`セクションに `<meta>` タグを使用します。

```html
<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
```

または、レスポンスに次の HTTP ヘッダーを含めます。

```http
Origin-Trial: TOKEN_GOES_HERE
```

### iframe で構成する

iframe 内でオリジントライアルの機能（FLEDGE の `joinAdInterestGroup()` など）を使用する場合、トークンは iframe 内に提供し、iframe のオリジンと一致させる必要があります。

### JavaScript でクロスサイトに構成する

トップレベルページに含まれるサードパーティの JavaScript のプロバイダーとしてクロスサイト JavaScript を介してオリジントライアルの機能を使用する場合は、以下を行う必要があります。

- オリジントライアルに登録する際に、**Third-party matching** オプションを選択します。
- **Web Origin フィールド**は、スクリプトのオリジンである必要があります。
- スクリプトからトップレベルページ（あなた自身のコンテンツではなくファーストパーティのページ）に `<meta>` タグを挿入します。例えば以下のようにします。

```js
const otMeta = document.createElement('meta');
otMeta.setAttribute('http-equiv', 'origin-trial');
otMeta.setAttribute('content', 'TOKEN_GOES_HERE');
document.querySelector('head').appendChild(otMeta);
```

## オリジントライアルをデバッグする {: #debug}

オリジントライアルのステータスは、**DevTools** &gt; **アプリケーション**パネルで確認できます。

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/j2eSl60izhpZDVz4Ea3o.png", alt="Token Success ステータスと有効化。", width="800", height="397" %}

1. **フレーム**ペインまで下にスクロールします。
2. トップレベルページの場合は **top** フレーム、埋め込みページの場合は特定の **iframe** など、トークンを設定するフレームを選択します。
3. 右側のペインで、 **Origin Trials**セクションまで下にスクロールします。
4. `PrivacySandboxAdsAPIs` トライアルのエントリが表示されます。
5. このエントリを展開して、オリジントライアルと特定のトークンのステータスを確認します。

オリジントライアルはごく一部の Chrome ユーザーに限定して提供されており、お使いのブラウザが実験グループに含まれていない場合があります。その結果、`PrivacySandboxAdsAPIs` に対して赤い `TrialNotAllowed` メッセージが表示されることがあります。エントリを展開してトークンステータスを確認したときに緑色の `Success` メッセージが表示されている場合は、オリジントライアルが正しく構成されています。対象ユーザーには、`Enabled` に設定されたメッセージが表示されます。

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/BPIbYn2BIAWXHfncyoQi.png", alt="Token Success ステータスと有効化。", width="800", height="398" %}

異なるメッセージが表示される場合は、オリジントライアルの構成を検証するための詳細なチェックリストについて、[Chrome のオリジントライアルのトラブルシューティング](/docs/web-platform/origin-trial-troubleshooting/#devtools-status)をご覧ください。

## 機能を検出する {: #feature-detection}

ウェブのあらゆる機能と同様に、それらを使用する前に、ブラウザで使用可能であることが報告されていることを確認する必要があります。これを行うには、関連する API が適切な場所に存在するかどうかを確認します。

```js
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // Attribution Reporting enabled
}

if ('runAdAuction' in navigator) {
  // FLEDGE enabled
}

if ('browsingTopics' in document) {
  // Topics enabled
}

if ('HTMLFencedFrameElement' in window) {
  // Fenced Frames enabled
}

if ('sharedStorage' in window) {
  // Shared Storage enabled
}

if (window?.sharedStorage?.selectURL instanceof Function) {
  // optionally check specifically for the selectURL function in Shared Storage
}
```

## ユーザーの資格を判定する {: #eligible-users}

オリジントライアルは一部の Chrome ユーザーを対象に実施されています。また、トライアルの資格を得るには、関連する機能が設定で有効になっていることが必要です。

### ブラウザの設定

ユーザーがトライアルの資格を得るには、次に該当する必要があります。

- オリジントライアルを実施している **Chrome のバージョンとチャンネル**を使用していること。

    - 最新の構成については、[オリジントライアルのステータス](#status)をご覧ください。

- **Chrome のアクティブな実験グループ**に属していること。

### ユーザー設定

ユーザーがトライアルの資格を得るには、次にも該当する必要があります。

- [設定] &gt; [セキュリティとプライバシー] &gt; [プライバシー サンドボックス] から**プライバシーサンドボックスのトライアルを有効**にすること。これは `chrome://settings/privacySandbox`からもアクセスできます。
- [設定] &gt; [セキュリティとプライバシー] &gt; [Cookie とその他のサイト データ] で**サードパーティ Cookie を有効**にし、「すべての Cookie を許可する」または「シークレット モードでサードパーティの Cookie をブロックする」に設定すること。これは `chrome://settings/cookies` からもアクセスできます。
- **シークレットモードではなく**、標準のブラウジングセッションを使用すること。

オリジントライアルは資格のあるユーザーに対してのみアクティブとして表示されますが、[開発者フラグ](#test-locally)を使用して、独自の本番サイトに対してテストすることもできます。

## オリジントライアルへの参加を制御する {: #control-participation }

オリジントライアルの仕組みは変わりません。API を試したいコンテキストのオリジントライアルトークンを取得します。テスト人口が拡大したため、トライアルを有効にすることを選択したトラフィックのレベルを積極的に監視し、確実に制御することが必要です。

{% Aside %} Chrome Stable トラフィックの 5% が、あなた自身のトラフィックの 5% に直接対応するわけではありません。サイトやサービスが受け取るトラフィックの実際の割合は、訪問者の構成によって異なります。 {% endAside %}

ここでは以下のアプローチが推奨されます。

1. 実験するすべてのコンテキストに、デフォルトでオリジントライアルトークンを含めます。
2. 機能検出を使用して、アクティブな API を確認します。
3. API がアクティブな場合（したがって、ブラウザがこの実験に適している場合）、独自の実験基準に基づいて使用するかどうかを選択します。たとえば、トラフィックの割合、サンプリング、またはその他の属性で実験するための A/B テスト インフラストラクチャが既に存在する場合は、この時点で積極的に使用する機能を決定できます。

レスポンスにトークンを含めないことで、どのブラウザインスタンスもオリジントライアルに参加しないようにすることができます。たとえば、実験の独自のクォータに達した場合、またはトライアル中に問題に対処する必要がある場合、トークンを含めないことで、実験的な機能がページで使用可能にならない、またはアクティブにならないことが保証されます。

## トークンを更新する

オリジントライアルトークンの有効期限は、発行日から 6 週間です（トライアルが終了した場合は、これより早く期限切れとなります）。

オリジントライアルの機能を中断なく使用するには、その期間内に[新しいトークンを更新してデプロイする](/docs/web-platform/origin-trials/#renew)ことが重要です。

トークンの更新には数分しかかからず、同じページ内で同じトライアルに複数のトークンをデプロイできます。既存のトークンの有効期限が切れる前に、更新されたトークンをデプロイできるため、ユーザーへのサービスが中断されることはありません。

{% Aside 'caution'%} 10 月末にトークンを更新すると、12 月初旬までしか使えません。年末にかけてコードがフリーズする場合は、更新されたトークンをデプロイできるようにするか、その期間中はオリジントライアルへの参加を一時停止するように計画する必要があります。 {% endAside %}

## ローカルでテストする {: #test-locally}

ローカル開発者テストに関する具体的なガイドについては、以下をご覧ください。

- [Topics](/docs/privacy-sandbox/topics-experiment/)
- [FLEDGE](/docs/privacy-sandbox/fledge-experiment/)
- [アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting-experiment/)

API はデフォルトではオンにならないため、テスト用の[フラグで有効にする](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)必要があります。上記と同じ構成設定が有効になっていることを確認してから、以下を行ってください。

- 機能を利用できる **Chrome のバージョンとチャンネル**を使用します。
- `chrome://flags/#privacy-sandbox-ads-apis` フラグを有効にします。
    - 追加のフラグはこれと競合する可能性があるため、問題が発生した場合は、このフラグのみを設定することを検討してください。

特定の API と機能の可用性と、より詳細な構成に使用する追加のフラグについては、開発者ガイドをご覧ください。

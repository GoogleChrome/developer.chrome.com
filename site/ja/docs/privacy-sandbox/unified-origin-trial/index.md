---
layout: layouts/doc-post.njk
title: 広告関連 API の統一オリジントライアル
subhead: アトリビューション レポート、Protected Audience API、Topics、Fenced Frames、および共有ストレージの統一実験を実行します。
description: アトリビューション レポート、Protected Audience API、Topics、Fenced Frames、および共有ストレージの統一実験を実行します。
date: 2022-09-08
updated: 2023-06-05
authors:
  - anusmitaray
  - kevinkiklee
  - rowan_m
---

プライバシーサンドボックスには、クロスサイトトラッキングを必要とせずに広告のユースケースを有効にするための提案が含まれています。[オリジントライアル](/blog/origin-trials/)は、開発者が実際のテストを通じて新しいウェブテクノロジーを評価し、フィードバックを提供する機会です。[プライバシーサンドボックスの広告関連](/origintrials/#/view_trial/771241436187197441)のオリジントライアルでは、サイトがアトリビューション レポート、Protected Audience API、Topics、Fenced Frames、および共有ストレージを統合した単一のトライアルで実験することが可能です。

開発者は、この単一のオリジントライアルに登録すると、Topics、Protected Audience API、および Attribution Reporting API をテストすることができます。このガイドでは、これらの API にアクセスするための構成手順と構成を検証する方法を説明し、API に対してテストするためのその他のリソースを提供しています。

{% Aside 'key-term' %} *トラフィック*とは、このトライアルに含まれる Chrome ブラウザインスタンスの割合を指しており、個々のサイトに対して行われたリクエストの割合ではありません。 {% endAside %}

## オリジントライアルのステータスを確認する {: #status}

### 2023 年 6 月

#### プライベート集計: 安定版で 1% 増加

[Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) は、2023 年 6 月 6 日火曜日から 7% の Chrome 安定版トラフィックで利用可能になります。この API は、メインの統合オリジントライアルグループ（5%）、Protected Audience の隔離グループ（1%）、および共有ストレージの隔離グループ（1％）で利用可能になります。プライベート集計が既存の隔離実験に追加されるため、プライベート集計と共有ストレージのトラフィックの割り当てに変更はありません。

6 月 6 日火曜日現在のトラフィック割り当て:

<table>
  <tr>
   <td>
<strong>API</strong>
   </td>
   <td>
<strong>トラフィックの割り当て</strong>
   </td>
   <td>
<strong>状況</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="2">アトリビューション レポート</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日時点で 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - ARA のみ</td>
  </tr>
  <tr>
   <td rowspan="3">Fenced Frames</td>
   <td>統合 - 5%</td>
   <td rowspan="3">2023 年 3 月 13 日時点で 7% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - 共有ストレージ + プライベート集計 + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td>隔離 - 1% - Protected Audience + プライベート集計 + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">Protected Audience</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日時点で 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - Protected Audience + プライベート集計 + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="3">プライベート集計</td>
   <td>統合 - 5%</td>
   <td rowspan="3">2023 年 6 月 6 日時点で 7% の安定版トラフィック</td>
  </tr>
  <tr>
    <td>隔離 - 1% - Protected Audience + プライベート集計 + Fenced Frames のみ</td>
    </tr>
    <tr>
    <td>隔離 - 1% - 共有ストレージ + プライベート集計 + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">共有ストレージ</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日時点で 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - 共有ストレージ + プライベート集計 + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">Topics</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日時点で 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - ARA のみ</td>
  </tr>
</table>

{% Details %} {% DetailsSummary %}

### これまでの更新内容

オリジントライアルに関する過去の更新内容をご覧ください。 {% endDetailsSummary %}

#### 2023 年 4 月

##### プライベート集計: 安定版で 1% 増加

[Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) オリジントライアルは、4 月 17 日月曜日から Chrome 安定版統合実験トラフィックの 1% で利用可能になります。プライベート集計の <code>[sendHistogramReport()](/docs/privacy-sandbox/private-aggregation/#sendhistogramreport)</code> 関数は、[Protected Audience API](/docs/privacy-sandbox/fledge/) および共有ストレージワークレットで使用できます。

4 月 17 日月曜日から、トラフィックの割り当ては次のようになります。

<table>
  <tr>
   <td>
<strong>API</strong>
   </td>
   <td>
<strong>トラフィックの割り当て</strong>
   </td>
   <td>
<strong>スターテス</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="2">アトリビューション レポート</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - ARA のみ</td>
  </tr>
  <tr>
   <td rowspan="3">Fenced Frames</td>
   <td>統合 - 5%</td>
   <td rowspan="3">2023 年 3 月 13 日以降 7% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - 共有ストレージ（URL Selection）+ Fenced Frames のみ</td>
  </tr>
  <tr>
   <td>隔離 - 1% - Protected Audience API + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">Protected Audience API</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - Protected Audience API + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td>プライベート集計</td>
   <td>統合 - 1%</td>
   <td>2023 年 4 月 17 日以降 1% の安定版トラフィック</td>
  </tr>
  <tr>
   <td rowspan="2">共有ストレージ（URL Selection）</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - 共有ストレージ（URL Selection）+ Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">Topics</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 13 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - ARA のみ</td>
  </tr>
</table>

#### 2023 年 3 月

##### タイムラインの更新

当初、隔離実験を 2023 年 3 月 13 日月曜日に開始するとお伝えしていましたが、実験の準備に追加の時間が必要となったため、新しい実験は 2023 年 3 月 16 日木曜日に開始されることになりました。Protected Audience API が 4% から 5% に 1% 増加することについても、2023 年 3 月 16 日木曜日を予定しています。

##### Protected Audience API: 1% 増加

先月、[Protected Audience API のオリジントライアルのトラフィックをテスト用に Chrome 安定版の 5% から 4% に一時的に削減](/docs/privacy-sandbox/unified-origin-trial/#january-2023)しました。初期テストは終了し、2023 年 3 月 16 日木曜日の統合実験では、Protected Audience API を 4% から最大 5% に戻す予定です。

ランプアップユーザーは、ランプダウンユーザーのセットと同じになりますが、減少から 30 日以上が経過したため、以前のインタレストグループは期限切れとなっています。

##### 隔離実験

テストプロセスを改善し、オリジントライアル API のメトリクスを継続的に観察するために、既存の統合実験に加えて、API ごとに隔離された実験を作成しています。新しい実験は、アトリビューション レポート、Topics、Protected Audience API と Fenced Frames のコンボ、および共有ストレージの URL Selection 操作と Fenced Frames のコンボに対して作成されます。それぞれの隔離実験では、割り当てられた API のみがそのグループのユーザーに利用可能になります。

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>隔離実験の<br>トラフィックの割り当て</th>
  </tr>
</thead>
<tbody>
  <tr>
   <td>アトリビューション レポート</td>
   <td>1%</td>
  </tr>
  <tr>
   <td>Protected Audience API + Fenced Frames</td>
   <td>1%</td>
  </tr>
  <tr>
   <td>共有ストレージ（URL Selection）+ Fenced Frames</td>
   <td>1%    </td>
  </tr>
  <tr>
   <td>Topics</td>
   <td>1%</td>
  </tr>
</tbody>
</table>

3 月 16 日木曜日より、既存の統合実験から受信している 5% のトラフィックに加えて、上記の API の Chrome 安定版トラフィックの 1% が追加で受信され始めます。各実験には新しいユーザーが割り当てられます。

##### トラフィックの割り当て

2 月 28 日火曜日時点での、統合オリジントライアルのトラフィックの割り当ては次のとおりです。

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>現在の統合実験の<br>トラフィックの割り当て</th>
  </tr>
</thead>
<tbody>
  <tr>
   <td>アトリビューション レポート</td>
   <td>5%</td>
  </tr>
  <tr>
   <td>Fenced Frames</td>
   <td>5%</td>
  </tr>
  <tr>
   <td>Protected Audience API</td>
   <td>4%</td>
  </tr>
  <tr>
   <td>共有ストレージ（URL Selection）</td>
   <td>5%</td>
  </tr>
  <tr>
   <td>Topics</td>
   <td>5%</td>
  </tr>
</tbody>
</table>

Protected Audience API の割り当てが戻され、新しい隔離実験が開始された後、3 月 16 日木曜日からのトラフィックの割り当ては次のようになります。

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>新しいトラフィックの割り当て</th>
   <th>スターテス    </th>
  </tr>
</thead>
<tbody>
  <tr>
   <td rowspan="2">アトリビューション レポート</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 16 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - ARA のみ</td>
  </tr>
  <tr>
   <td rowspan="3">Fenced Frames</td>
   <td>統合 - 5%</td>
   <td rowspan="3">2023 年 3 月 16 日以降 7% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - 共有ストレージ（URL Selection）+ Fenced Frames のみ</td>
  </tr>
  <tr>
   <td>隔離 - 1% - Protected Audience API + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">Protected Audience API</td>
   <td>統合 - 5%（4% の現在の割り当て + 1% 増加）</td>
   <td rowspan="2">2023 年 3 月 16 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - Protected Audience API + Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">共有ストレージ（URL Selection）</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 16 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - 共有ストレージ（URL Selection）+ Fenced Frames のみ</td>
  </tr>
  <tr>
   <td rowspan="2">Topics</td>
   <td>統合 - 5%</td>
   <td rowspan="2">2023 年 3 月 16 日以降 6% の安定版トラフィック</td>
  </tr>
  <tr>
   <td>隔離 - 1% - ARA のみ</td>
  </tr>
</tbody>
</table>

これらの変更は、既存のオリジントライアルトークンの設定には影響しないため、新しいオリジントライアルトークンへの更新や生成は必要はありません。

#### 2023 年 1 月

Chrome の回帰調査の一環として、2023 年 1 月 26 日から、Protected Audience API のオリジントライアルトラフィックを Chrome 安定版の 5% から 4% に一時的に削減します。調査には約 1 か月かかると予想しており、トラフィックが戻される際にお知らせします。

この変更は自動的に行われ、既存のオリジントライアルトークンには影響しません。トラフィックが 1% 減少するユーザーの場合、インタレストグループはブラウザに残ります。同じユーザーがバックアップの一部となるため、そのインタレストグループを再利用できます。ただし、インタレストグループの有効期限は 30 日です。回帰調査にはそれよりも時間がかかる可能性があります。

また、共有ストレージの URL Selection API オリジントライアルは、2023 年 1 月 26 日から Chrome 安定版トラフィックの 5% に増加される予定です。

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>備考</th>
  </tr>
</thead>
  <tbody>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューション レポート</a></td>
   <td>安定版で提供中。2022 年 10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a></td>
   <td>安定版で提供中。2022 年 10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a></td>
   <td>安定版で提供中。2023 年 10 月 26 日から一時的に 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
   <td>安定版で提供中。2022 年 11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">共有ストレージ</a></td>
   <td>安定版で提供中。2023 年 10 月 26 日から 5% に増加。</td>
  </tr>
</tbody>
</table>

#### 2022 年 11 月

共有ストレージの `selectURL` API は、11 月 9 日から Chrome 安定版トラフィックの 1% で[オリジントライアルに追加](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wXlBwB_UAQAJ)されます。以前に「[プライバシー サンドボックスの広告関連のオリジントライアルを 5% に増加](/blog/privacy-sandbox-origin-trial-increase/)」というブログ記事で発表したように、アトリビューション レポートと Topics は現在 5% になり、11 月 9 日には Protected Audience API と Fenced Frames も 5% となります。

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>備考</th>
  </tr>
</thead>
<tbody>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューション レポート</a></td>
   <td>安定版で提供中。10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a></td>
   <td>安定版で提供中。10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a></td>
   <td>安定版で提供中。11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
   <td>安定版で提供中。11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">共有ストレージ</a></td>
   <td>安定版で提供予定。11 月 9 日より 1% で提供開始。</td>
  </tr>
</tbody>
</table>

#### 2022 年 10 月: 5% 増加

アトリビューション レポート、Topics、Protected Audience API、Fenced Frames はすべて Chrome 安定版で現在利用可能であり、トラフィック増加の一部になります。アトリビューション レポートと Topics のトラフィック増加は今週から開始し、Protected Audience API と Fenced Frames の増加は 11 月 9 日開始予定です。詳しくは、[プライバシーサンドボックスの広告関連のオリジントライアルの 5% 引き上げ](/blog/privacy-sandbox-origin-trial-increase/)に関するブログ記事をご覧ください。

<table class="with-heading-tint">
    <thead>
  <tr>
   <th>API</th>
   <th>備考</th>
  </tr>
</thead>
<tbody>
  <tr>
   <td><a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューション レポート</a></td>
   <td>安定版で提供中。10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/topics/">Topics</a></td>
   <td>安定版で提供中。10 月 26 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a></td>
   <td>安定版で提供中。11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
   <td>安定版で提供中。11 月 9 日から 5% に増加。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/shared-storage/">共有ストレージ</a></td>
   <td>現在、M105+ Canary、Dev、およびベータ版でのみ提供中。</td>
  </tr>
</tbody>
</table>

#### 2022 年 10 月

- オリジントライアルの期間が [Chrome 110 まで延長](https://groups.google.com/a/chromium.org/g/blink-dev/c/xm9EvnaVBj8)されました。[Chrome のオリジントライアルを始める](/docs/web-platform/origin-trials/#renew)では、オリジントライアルの登録を更新する方法について説明されています。これには、参加しているオリジンへの新しいトークンの提供が含まれます。これは、他のオリジントライアルの延長と同じプロセスです。

この延長は、Stable チャンネルのエコシステムに API の改善のテストと検証を継続しながら、既存の公開タイムラインに合わせてフィードバックを提供する時間を提供することを目的としています。

[プライバシーサンドボックスの全体的なタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)は変更されていません。

トライアルに含まれる API:

<table class="with-heading-tint fixed-table width-full">
  <thead>
    <tr>
      <th>API</th>
      <th>備考</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> <a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューション レポート</a>
</td>
      <td> <a href="/docs/privacy-sandbox/attribution-reporting-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a></td>
      <td> <a href="/docs/privacy-sandbox/fledge-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/topics/">Topics</a></td>
      <td> <a href="/docs/privacy-sandbox/topics-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
      <td>オリジントライアルの使用方法については、Protected Audience API ガイドをご覧ください。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/shared-storage/">共有ストレージ</a></td>
      <td>現在、M105+ Canary、Dev、およびベータ版でのみ提供中。</td>
    </tr>
  </tbody>
</table>

#### 2022 年 8 月

- オリジントライアルは、[Chrome 安定版 104 の最大 1% のデスクトップユーザー](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/KhFZN95WBgAJ)に提供されます。

    - この提供にモバイルユーザーが追加されると、更新が行われます。

- 安定版前のチャンネル（Canary、ベータ）のユーザー数は 50% のままです。

- これらの API は、iOS Chrome では使用できません。

#### 2022 年 5 月

オリジントライアルは、[Chrome 102 ベータ版の最大 50% のユーザー](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/WBPqGvscAgAJ)に提供されます。このトライアルには以下の API が含まれます。

<table class="with-heading-tint">
  <thead>
    <tr>
      <th> API</th>
      <th>備考</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/privacy-sandbox/attribution-reporting-experiment/">アトリビューション レポート</a></td>
      <td> <a href="/docs/privacy-sandbox/attribution-reporting-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fledge-experiment/">Protected Audience API</a></td>
      <td> <a href="/docs/privacy-sandbox/fledge-experiment/">オリジントライアル開発者ガイド</a>。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/topics-experiment/">Topics</a></td>
      <td> <a href="/docs/privacy-sandbox/topics-experiment/">オリジントライアル開発者ガイド</a>。<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1321140">ブラウザの安定性に影響を与えるバグ</a>があったため、オリジントライアルで一時的に Topics が無効にされていました。</td>
    </tr>
    <tr>
      <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
      <td>Fenced Frames がオリジントライアルに追加されました。実験の使用方法については、Protected Audience API ガイドをご覧ください。</td>
    </tr>
  </tbody>
</table>

#### 2022 年 4 月

オリジントライアルは、[Chrome 102 ベータ版の一部の限定ユーザー](https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wzeBWfxxEgAJ)に提供が開始されます。このトライアルには以下の API が含まれます。

<table class="with-heading-tint">   <thead>     <tr>       <th> API</th>       <th>備考</th>     </tr>   </thead>   <tbody>     <tr>       <td> <a href="/docs/privacy-sandbox/attribution-reporting-experiment/">アトリビューション レポート</a>
</td>       <td> 個別の <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y/m/nlEDdjmnCgAJ">Intent to Experiment（I2E）</a>に関する記事。 アトリビューション レポートは専用のオリジントライアルとしても提供されます。</td>     </tr>     <tr>       <td> <a href="/docs/privacy-sandbox/fledge-experiment/">Protected Audience API</a>
</td>       <td>個別の <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg/m/_0T5qleqCgAJ">Intent to Experiment（I2E）</a>に関する記事。Protected Audience API は<a href="https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md">機能サブセット</a>限定でデスクトップで提供されます。</td>     </tr>     <tr>       <td> <a href="/docs/privacy-sandbox/topics-experiment/">Topics</a>
</td>       <td>個別の <a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs/m/jPkW3T-mCgAJ">Intent to Experiment（I2E）</a>に関する記事。</td>     </tr>   </tbody> </table> {% endDetails %}

## オリジントライアルへの登録と設定 {: #configure}

サイトでオリジントライアルを有効にするには、割り当てられたオリジントライアルトークン（オリジントライアルへの特定のアクセスを提供する時間ベースの文字列）を登録して埋め込む必要があります。詳細については、[Chrome のオリジントライアル入門](/docs/web-platform/origin-trials)をご覧ください。

{% Aside %}[プライバシーサンドボックスの広告関連のトライアル](/origintrials/#/view_trial/771241436187197441)に登録してください。 {% endAside %}

オリジントライアルトークンがすぐに付与されます。取り消しまたは再作成はいつでも可能です。

オリジントライアルを使用するすべてのページについて、その特定のページの HTML またはレスポンスにトライアルトークンを含める必要があります。

ページの `<head>` セクションに `<meta>` タグを使用します。

```html
<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
```

または、レスポンスに次の HTTP ヘッダーを含めます。

```http
Origin-Trial: TOKEN_GOES_HERE
```

### iframe で構成する

iframe 内でオリジントライアルの機能（Protected Audience API の `joinAdInterestGroup()` など）を使用する場合、トークンは iframe 内に提供し、iframe のオリジンと一致させる必要があります。

### JavaScript でクロスサイトに構成する

トップレベルページに含まれるサードパーティの JavaScript のプロバイダーとしてクロスサイト JavaScript を介してオリジントライアルの機能を使用する場合は、以下を行う必要があります。

- オリジントライアルに登録する際に、**Third-party matching** オプションを選択します。
- **Web Origin フィールド**は、スクリプトのオリジンである必要があります。
- スクリプトからトップレベルページ（あなた自身のコンテンツではなくファースト パーティのページ）に `<meta>` タグを挿入します。例えば以下のようにします。

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

{% Aside %} Chrome 安定版トラフィックの 5% が、あなた自身のトラフィックの 5% に直接対応するわけではありません。サイトやサービスが受け取るトラフィックの実際の割合は、訪問者の構成によって異なります。 {% endAside %}

ここでは以下のアプローチが推奨されます。

1. 実験するすべてのコンテキストに、デフォルトでオリジントライアルトークンを含めます。
2. 機能検出を使用して、アクティブな API を確認します。
3. API がアクティブな場合（したがって、ブラウザがこの実験に適している場合）、独自の実験基準に基づいて使用するかどうかを選択します。たとえば、トラフィックの割合、サンプリング、またはその他の属性で実験するための A/B テスト インフラストラクチャが既に存在する場合は、この時点で積極的に使用する機能を決定できます。

レスポンスにトークンを含めないことで、どのブラウザインスタンスもオリジントライアルに参加しないようにすることができます。たとえば、実験の独自のクォータに達した場合、またはトライアル中に問題に対処する必要がある場合、トークンを含めないことで、実験的な機能がページで使用可能にならない、またはアクティブにならないことが保証されます。

### 地域別のオリジントライアルの管理

特定の地域のオリジントライアルをオプトアウトすることはできません。オリジントライアルは、HTTP ヘッダー（サーバー側）または HTML メタタグ（クライアント側）を介して含まれる[トークン](/docs/web-platform/origin-trials/#take-part-in-an-origin-trial)を含むページで有効です。

ユーザーの場所を特定できる場合は、その位置情報に基づいてオリジントライアルトークンを含めるコードを記述することが*可能*です。たとえば、IP アドレスを使用してユーザーの場所を特定しようとする場合がありますが、IP アドレスはスプーフィングされる可能性があるため、これは保証されたソリューションではありません。

ただし、地理固有のオリジンは、[権限ポリシー](/docs/privacy-sandbox/permissions-policy/)を設定して、使用できる機能を制御できます。たとえば、`us.example.com` と `uk.example.com` は、制御可能な地理固有のオリジンです。これは、地域がオリジントライアルをオプトアウトしたことを意味するものではありません。

権限ポリシーを使用すると、サイトはブラウザに指示を与える小さなコードスニペットをページに追加します。ページが読み込まれると、ブラウザは権限ポリシーの指示を読み取り、権限ポリシーに記載されている機能（または API）を許可またはブロックします。サイトが特定の地域で API を制限する場合、開発者はその地域から要求されたすべてのページに対してポリシーを設定できます。

{% Aside 'warning' %} ユーザーは、現在地とは異なる地域からオリジンにアクセスすることを選択する場合があります。つまり、米国のユーザーが `uk.example.com` にアクセスできる可能性があるということです。これらのユーザーには、英国のサイトではブロックされていた米国のサイトの機能が表示されます。 {% endAside %}

## トークンを更新する

オリジントライアルトークンの有効期限は、発行日から 6 週間です（トライアルが終了した場合は、これより早く期限切れとなります）。

オリジントライアルの機能を中断なく使用するには、その期間内に[新しいトークンを更新してデプロイする](/docs/web-platform/origin-trials/#renew)ことが重要です。

トークンの更新には数分しかかからず、同じページ内で同じトライアルに複数のトークンをデプロイできます。既存のトークンの有効期限が切れる前に、更新されたトークンをデプロイできるため、ユーザーへのサービスが中断されることはありません。

{% Aside 'caution'%} 10 月末にトークンを更新すると、12 月初旬までしか使えません。年末にかけてコードがフリーズする場合は、更新されたトークンをデプロイできるようにするか、その期間中はオリジントライアルへの参加を一時停止するように計画する必要があります。 {% endAside %}

## ローカルでテストする {: #test-locally}

ローカル開発者テストに関する具体的なガイドについては、以下をご覧ください。

- [Topics](/docs/privacy-sandbox/topics-experiment/)
- [Protected Audience API](/docs/privacy-sandbox/fledge-experiment/)
- [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting-experiment/)

API はデフォルトではオンにならないため、テスト用の[フラグで有効にする](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)必要があります。上記と同じ構成設定が有効になっていることを確認してから、以下を行ってください。

- 機能を利用できる **Chrome のバージョンとチャンネル**を使用します。
- `chrome://flags/#privacy-sandbox-ads-apis` フラグを有効にします。
    - 追加のフラグはこれと競合する可能性があるため、問題が発生した場合は、このフラグのみを設定することを検討してください。

特定の API と機能の可用性と、より詳細な構成に使用する追加のフラグについては、開発者ガイドをご覧ください。

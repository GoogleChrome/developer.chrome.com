---
layout: layouts/doc-post.njk
title: "FLEDGE の保留中の機能の状況"
subhead: サードパーティ Cookie の廃止を進めるにあたり、FLEDGE のオークション機能の現状について説明します。
description: サードパーティ Cookie の廃止を進めるにあたり、FLEDGE のオークション機能の現状について説明します。
date: 2023-02-09
authors:
  - tristramsouthey
  - kevinkiklee
---

[FLEDGE](/docs/privacy-sandbox/fledge/) の一般公開が近づき、Chrome のサードパーティ Cookie の廃止が近づく中、FLEDGE のサービスや機能の利用可能性が気になるのではないでしょうか。この更新では、FLEDGE の詳細な機能一覧とそれらのサポート時期について説明を行います。

<table>
  <tr>
   <td>
<strong>特徴</strong>
   </td>
   <td>
<strong>テスト利用の可否</strong>
   </td>
   <td>
<strong>状況</strong>
   </td>
  </tr>
  <tr>
   <td><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now">イベントレベルのオークション落札レポート</a></td>
   <td>利用可</td>
   <td>
   <p>少なくとも 2026 年まではサポートされます。</p>
<br>
   <p>この機能は、サードパーティ Cookie レポートから FLEDGE レポートへの移行の簡素化を目的としています。そのため、広告テクノロジーがそのレポートメカニズムを更新するのに十分な時間が経過した後は、このレポートはサポートされなくなります。</p>
   </td>
  </tr>
  <tr>
   <td>Key/Value サービスでの <a href="https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment">Trusted Execution Environment (TEE)</a> の使用</td>
   <td>利用可</td>
   <td>2025 年の第三四半期以降に必須となります。</td>
  </tr>
  <tr>
   <td><a href="/docs/privacy-sandbox/fenced-frame/">Fenced Frames</a></td>
   <td>利用可</td>
   <td>2026 年以降に必須となります。</td>
  </tr>
  <tr>
   <td><a href="https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md">K-匿名性</a></td>
   <td>2023 年第三四半期後半</td>
   <td>クリエイティブのレンダリングについては、「1 件のクリエイティブにつき 7 日間で 50 人のユーザー」という K-匿名性の閾値を満たす必要があります。</td>
  </tr>
  <tr>
   <td>改善された FLEDGE と<a href="/docs/privacy-sandbox/attribution-reporting/">アトリビューションレポート</a>の統合</td>
   <td>2023 年第二四半期</td>
   <td>Chrome Stable M112+ でテストできます。</td>
  </tr>
  <tr>
   <td><a href="/blog/fledge-service-overview/#bidding-auction-service">入札およびオークションサービス</a></td>
   <td>2023 年下半期のテスト実施を目標としています。</td>
   <td>現在開発中です。</td>
  </tr>
</table>

## イベントレベルのオークション落札レポート

当初私たちは、イベントレベルのオークション落札レポートは一時的な解決策に過ぎないため、[集計](/docs/privacy-sandbox/private-aggregation/)を使用するとしていました。フィードバックに耳を傾け、集計ベースのソリューションの (特に課金に関する) 相対的な複雑さを検討した結果、私たちは[イベントレベルのオークション落札結果レポート](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)のサポートを `reportResult()` および `reportWin()` 関数に [`sendReportTo()`](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#reporting) を呼び出す機能を持たせることによりサードパーティ Cookie の廃止後もある程度の期間にわたり削除しないことを決定しました。

イベントレベルのオークション落札レポートは少なくとも 2026 年までサポートされます。この API が何らかの代替ソリューションへと移行する際は、事前に通知を行います。

オークションの落札失敗レポートについては、引き続き [Private Aggregation API](https://github.com/WICG/turtledove/blob/main/FLEDGE_extended_PA_reporting.md) を介してサポートされます。

## Key/Value サービスでの Trusted Execution Environment (TEE) の使用

[FLEDGE Key/Value サービス](/blog/open-sourcing-fledge-key-value-service/)は、バイヤーにより入札が生成され、セラーにより広告のスコアリングが行われる際のオークションによるリアルタイムのシグナルの取得を可能にします。最終的に Key/Value サービスはユーザーのデータが非公開となっていることを保証するために [Trusted Execution Environment (TEE)](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment) での実行が必須となります。

TEE での Key/Value サービスの実行は、サードパーティー Cookie の廃止後しばらくは必要なくなるはずです。TEE の利用が必須となる前に、少なくとも 12 か月間は通知を行います。それまでは、[自身のサーバー](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)を使用して引き続きリアルタイムでの Key/Value シグナルをご利用いただけます。なお、[ユーザー定義関数](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md#support-for-user-defined-functions-udfs) (UDF) を使用した TEE での Key/Value サービスの実行は、2023 年第一四半期末までにデバイス上の FLEDGE でテストが可能になる予定です。

## Fenced frames

[Fenced frames](/docs/privacy-sandbox/fenced-frame/) はコンテンツとエンベダーの間の通信を制限する新しい HTML 要素であり、クロスサイトデータに基づいてコンテンツをレンダリングするために使用されます。FLEDGE はコンテンツを Fenced frames へとレンダリングします。

様々なステークホルダーと緊密に連携しながらこの変更への対応方法に関する努力を検討した結果、Chrome はエコシステムの包括性を維持するために少なくとも 2026 年までは Fenced frames の義務化を見送ることにしました。変更の際は、Chrome は事前に周知を行う予定です。それまでは、Fenced frames を使用しない場合には iframe を使用して [opaque URN](https://github.com/WICG/fenced-frame/blob/master/explainer/opaque_src.md)  をレンダリングする必要があります。また、セラーが Fenced frames の使用をまだ必要とする可能性があることに留意する必要もあります。

{% Aside %}一時的な `navigator.deprecatedURNToURL()` は、サードパーティ Cookie の廃止により削除されます。{% endAside %}

## 改善された FLEDGE とアトリビューションレポートの統合

最近では、[Attribution Reporting API](https://github.com/WICG/turtledove/issues/281) と FLEDGE の統合について、特に Fenced frames が含まれる状況における課題が[指摘されていました](/docs/privacy-sandbox/attribution-reporting/)。

FLEDGE を使用したイベントレベルレポートについては、この統合をより簡素化するための初期改善案を用意しており、[Explainer](https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md#support-for-attribution-reporting) で詳細な内容をご確認いただけます。この統合は、Fenced frames と iframe の両方で利用できるようになります。イベントレベルレポートのテストは、Chrome 安定版 M112+ に提供される予定です。

[FLEDGEを使用したアトリビューションレポートの集計](https://github.com/WICG/turtledove/issues/289)が必要な方向けには、集計レポートでより多くの入札シグナルをキャプチャするためのより柔軟なソリューションの開発に取り組んでいます。準備が整い次第、提案内容を公開する予定です。

## K-匿名性

FLEDGE フレームワークを使用して [K-匿名性](https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md)を強制する方法については、近日中に詳細な説明を公開する予定です。

クリエイティブのレンダリングには、広告が配信される前に*クリエイティブごとに 7 日間で 50 人のユーザー*という K-匿名性の閾値をパスする必要があります。クリエイティブは広告 50 件という閾値に到達した時点ですぐに利用可能となるため、7 日間待つ必要はありません。

K-匿名性の要求はテスト利用が可能となり、2023 年の後半には強制される予定です。このパラメータについては、広告技術者の方からのフィードバックをお待ちしております。

## Bidding and Auction Services

[FLEDGE の遅延](https://github.com/WICG/turtledove/issues/385)に関する懸念がいくつか寄せられており、デバイス上の遅延を改善するために積極的に取り組んでおります。Chrome と Android の両方で、デバイス上でのオークション以外の方法を用いて入札とスコアリングのロジックを実行する追加の方法として [入札およびオークションサービス](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md) の提供を計画しています。入札およびオークションサービスはデバイス外でのオークションの実行を目的とした [FLEDGE サービス](/blog/fledge-service-overview/)ソリューションであり、これによりさらなるパフォーマンスの高速化が可能になると考えています。

デバイス上でのオークションは今後もサポートされますので、特定のユースケースに合致する場合を除いて入札およびオークションサービスの利用は必須ではありません。

詳細については、[ブログ投稿](/blog/bidding-and-auction-services-availability/)を参照してください。

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}

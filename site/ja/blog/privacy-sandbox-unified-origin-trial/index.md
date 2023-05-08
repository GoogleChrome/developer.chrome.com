---
title: プライバシーサンドボックス広告の関連性と測定 API をテストする
description: プライバシーサンドボックスの関連性と測定の API（Topics、FLEDGE、アトリビューション レポート）を統括して実験するための開発者テストと今後のオリジントライアルについて説明します。
layout: layouts/blog-post.njk
date: 2022-03-31
updated: 2022-06-27
authors:
  - rowan_m
hero: image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/1Eh5fSHWhurUuED3WGU1.png
alt: プライバシーサンドボックス ベータ版のロゴ
tags:
  - privacy
  - origin-trials
---

[プライバシーサンドボックス](https://privacysandbox.com/open-web/)には、サイト間のトラッキングを必要とせずに広告のユースケースを有効にするための提案が含まれています。[オリジントライアル](/blog/origin-trials/)は、開発者が実際のテストを通じて新しいウェブテクノロジーを評価し、フィードバックを提供する機会です。以前のオリジントライアルでは、サイトは個々の API に対してテストすることができました。Topics、FLEDGE、および Attribution Reporting API については、**単一のオリジントライアル**を提供することで、サイトがエンドツーエンドの広告ライフサイクルの初期バージョンを構成する複数の API を通して統一された実験を実行できるようになっています。これらの API は Chrome 101 [ベータ版](https://www.google.com/chrome/beta/)以降でテストできます。Chrome 101 ベータ版リリースでは、構成オプションのイテレーションを進めながら、[ユーザーコントロールの更新](https://blog.chromium.org/2022/03/what-to-expect-from-ps-testing.html)も行われています。

開発者は、この単一のオリジントライアルに登録すると、Topics、FLEDGE、および Attribution Reporting API をテストすることができます。このガイドでは、API にアクセスするための構成手順と構成を検証する方法を説明し、API に対してテストするためのその他のリソースを提供しています。

## オリジントライアルの目的

このオリジントライアルの目的は、複数のサイトで広告ライフサイクル全体にわたって意味のあるテストを行えるようにすることです。この行程に対応できるように、オリジントライアルには以下が含まれています。

- **[Topics](/docs/privacy-sandbox/topics/)**: `document.browsingTopics()` を介してブラウザのトピックを観察し、それにアクセスします。
- **[FLEDGE](/docs/privacy-sandbox/fledge/)**: ブラウザのインタレストグループを管理し、それらのグループやその他のシグナルに基づいて広告の入札と選択を行います。
    - このオリジントライアルでは、FLEDGE はデスクトップで利用でき、提案されたすべての機能の特定のサブセットが含まれています。詳細については、[FLEDGE オリジントライアルの詳細](https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md)をお読みください。
- **[Fenced frames](https://github.com/WICG/fenced-frame/blob/master/explainer/opaque_src.md)**: [FLEDGE 広告オークションの落札者](/docs/privacy-sandbox/fenced-frame/)の[不透明な URL](https://github.com/WICG/fenced-frame/blob/master/explainer/opaque_src.md) をレンダリングします。
- **[アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting/)**: 広告ライフサイクル全体のパフォーマンスを測定してレポートします。
    - アトリビューション レポートの一部として、要約レポートを生成するには、集計可能なレポートを処理し、[集計サービス](/docs/privacy-sandbox/attribution-reporting/summary-reports/#aggregation-service)によって集計する必要があります。ローカルおよびオリジントライアルのテストに関する追加のツールとガイドを近日中に公開する予定です。
    - アトリビューション レポートの以前のオリジントライアルに参加したことがある場合は、最新の API の変更に合わせて更新する必要があることに注意してください。詳細については、[移行ガイド](https://docs.google.com/document/d/1NY7SScCYcPc9v5wtf_fVAikFxGQTAFvwldhExN1P03Y/edit#)をご覧ください。

このセットアップでは、これらすべての API にわたって統一のテストを行うことができますが、実装する側面を、必要に応じて選択することができます。

## 開発者がオリジントライアルに登録する方法

[プライバシーサンドボックスの関連性と測定](/origintrials/#/view_trial/771241436187197441)のトライアルに登録します。以下の HTML タグを使用して、API コードを実行するすべてのページにトライアルトークンを提供します。

- トップレベル ページの `<head>` セクションの `<meta>`タグ: `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
- トップレベル ページのレスポンスの HTTP ヘッダー: `Origin-Trial: TOKEN_GOES_HERE`

オリジントライアルで利用できる一部の機能は、トップレベル サイトでサードパーティとしてサービスを提供する場合など、クロスサイト コンテキストでの使用を目的としています。これらの追加のコンテキストでオリジントライアルを有効にする必要がある場合は、**必ず「Third-party matching」のオプションを選択してください**。サードパーティ JavaScript からオリジントライアルを有効にするには、スクリプトから `<meta>` タグを**トップレベルのページ**（独自のコンテンツではなく、ファーストパーティのページ）に注入します。以下に例を示します。

```javascript
const otMeta = document.createElement('meta');
otMeta.setAttribute('http-equiv', 'origin-trial');
otMeta.setAttribute('content', 'TOKEN_GOES_HERE');
document.querySelector('head').appendChild(otMeta);
```

詳細については、[Chrome のオリジントライアルを開始するためのガイド](/blog/origin-trials/)をご覧ください。

{% Aside 'caution' %} トライアル機能（FLEDGE の [`joinAdInterestGroup()`](/blog/fledge-api#joinadinterestgroup) など）にアクセスする iframe は、そのオリジンと一致するトークンを提供する必要があります。 {% endAside %}

## 開発者によるローカルテスト {: #local-testing}

[Topics](/docs/privacy-sandbox/topics-experiment/)、[FLEDGE](/docs/privacy-sandbox/fledge-experiment/)、および [アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting-experiment/) の個々の開発者ドキュメントには、各 API のローカル開発者テストに関する具体的なガイダンスが記載されています。API はデフォルトではオンになっていないため、テスト用の[フラグを使って有効にする](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)必要があります。

テスト用に API を有効にするには、以下を行います。

- **Chrome 101 [ベータ版](https://www.google.com/chrome/beta/)以降を使用してください**。
    - FLEDGE にはデスクトップ版の Chrome が必要です。
    - API は Chrome の iOS バージョンでは使用できません。
- **API の有効化**には、`chrome://flags/#privacy-sandbox-ads-apis` フラグを使用します。
    - このフラグは、テストをより簡単に行えるように API を強制的にオンにします。対象のオリジントライアルユーザーを複製して、追加の設定で API を無効にできるようにするには、`--enable-features=BrowsingTopics,InterestGroupStorage,AllowURNsInIframes,PrivacySandboxAdsAPIs` という CLI フラグを使用して Chrome を起動する必要があります:。
    - 個々の API には、よりきめ細かい設定を行うための追加のフラグがある場合があります。詳細については、個々のガイドを確認してください。
    - 追加のフラグはこれと競合する可能性があるため、問題が発生した場合は、この 1 つのフラグのみを設定することを検討してください。
- Chrome 設定で **設定** &gt; **セキュリティとプライバシー** &gt; **プライバシー サンドボックス** に移動し、**プライバシーサンドボックスのトライアルを有効にします**。これには `chrome://settings/privacySandbox` からもアクセスできます。
- Chrome の設定で **設定** &gt; **セキュリティとプライバシー** に移動し、**サードパーティ Cookie を有効**にします。**Cookie とその他のサイト データ**を「すべての Cookie を許可する」または「シークレットモードでサードパーティの Cookie をブロックする」に設定します。これには `chrome://settings/cookies` からもアクセスできます。
- 標準のブラウジング セッションを開始します。シークレット モードは使用しないでください。

## オリジントライアルの正しい構成を確認する方法

「[Chrome のオリジントライアルのトラブルシューティング](/blog/origin-trial-troubleshooting/)」には、オリジントライアルの構成を検証するための詳細なチェックリストが用意されています。

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/GQv4Ybw6AVXCMwbyZtmN.png", alt="DevToolsの「アプリケーション」&gt;「フレーム」にオリジントライアルのステータスが表示されます", width="800", height="326" %}

DevTools は、「アプリケーション」タブの「フレーム」にオリジントライアルのステータスを表示します。

以下に説明するように、オリジントライアルは[有効なユーザー](#eligible-users)に対してのみアクティブとして表示されますが、[開発者フラグ](#local-testing)を使用して、独自の本番サイトに対してテストすることもできます。

## オリジントライアルの対象ユーザー {: #eligible-users}

オリジン トライアルは、[Chrome トラフィック全体のごく一部でのみ実行](/blog/origin-trial-troubleshooting/#usage-restrictions)されるように設計されているため、サイトで**オリジントライアルを有効**にしても、**ユーザーが API をアクティブにできない可能性がある**ことを必ず想定する必要があります。オリジントライアルのアクティブな実験グループは、引く割合のユーザー数で開始され、トライアルが進むにつれてその数が増加する可能性があります。実験での Chrome ユーザーの割合は、サイトで有効になっているユーザーの割合と一致しない場合があることに注意してください。

ただし、サイト全体で統一されたテストを可能にするために、その対象ユーザーのセットはほぼ一貫したままにする必要があります。たとえば、ユーザーが参加しているサイト運営者のサイトで広告を表示したときにオリジントライアルの対象である場合、その同じユーザーは、参加している広告主のサイトで変換したときにも対象のままとなります。

ユーザーが対象となるには、以下に該当する必要があります。

- **Chrome 101 [ベータ版](https://www.google.com/chrome/beta/)以降**を使用していること。
    - FLEDGE にはデスクトップ版の Chrome が必要です。
    - Chrome の iOS バージョンではオリジントライアルを利用できません。
- **アクティブなオリジントライアル期間**に閲覧していること。
- 「設定」&gt;「セキュリティとプライバシー」&gt;「プライバシー サンドボックス」で**プライバシーサンドボックスのトライアルが有効**であること。`chrome://settings/privacySandbox` からもアクセスできます。
- 「設定」&gt;「セキュリティとプライバシー」&gt;「Cookie とその他のサイトデータ」で**サードパーティ Cookie を有効**にし、「すべての Cookie を許可する」または「シークレットモードでサードパーティ Cookie をブロックする」に設定していること。これには `chrome://settings/cookies` からもアクセスできます。
- 標準のブラウジング セッションを開始しており、**シークレット モードは使用していない**こと。
- **Chrome のアクティブな実験グループ**に属していること。

## 開発者の機能が API サポートを検出する仕組み

他のウェブプラットフォーム機能と同様に、使用する前に機能がサポートされていることを検出する必要があります。

### Topics

`document` 内の `browsingTopics()` 関数と、「browsing-topics」の[アクセス許可ポリシー](/docs/privacy-sandbox/permissions-policy/#featurepolicyallowsfeaturefeature)を確認してください。

```javascript
if ('browsingTopics' in document && document.featurePolicy.allowsFeature('browsing-topics')) {
  // Topics enabled
}
```

### FLEDGE

広告のインタレストグループに参加する場合は、`navigator` の `joinAdInterestGroup` 関数と「join-ad-interest-group」のアクセス許可ポリシーを確認してください。

```javascript
if ('joinAdInterestGroup' in navigator && document.featurePolicy.allowsFeature('join-ad-interest-group')) {
  // FLEDGE interest group enabled
}
```

オークションを実行する場合は、`navigator` の `runAdAuction` 関数と、「run-ad-auction」の権限ポリシーを確認してください。

```javascript
if ('runAdAuction' in navigator && document.featurePolicy.allowsFeature('run-ad-auction')) {
  // FLEDGE auction enabled
}
```

### アトリビューション レポート

`window` 内の `attributionReporting` オブジェクトと、「attribution-reporting」のアクセス許可ポリシーを確認してください。

```javascript
if (document.featurePolicy.allowsFeature('attribution-reporting')) {
  // Attribution Reporting API enabled
}
```

## フィードバックの提供先とサポート

[フィードバックの概要ページ](/docs/privacy-sandbox/feedback/)には、プライバシーサンドボックスのさまざまな側面に関するフィードバックを提供するためのさまざまな方法が詳しく説明されています。[Topics](/docs/privacy-sandbox/feedback/#topics-api)、[FLEDGE](/docs/privacy-sandbox/feedback/#fledge-api)、および [アトリビューション レポート](/docs/privacy-sandbox/feedback/#measure-digital-ads) には、各 API の個別のリンクを提供する特定のセクションがあります。

また、重要なニュースの概要を提供する[プライバシーサンドボックスの進行状況](/tags/progress-in-the-privacy-sandbox/)に関する定期的な更新も提供しています。

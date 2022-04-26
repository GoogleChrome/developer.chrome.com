---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting: テストとディスカッション'
date: 2022-03-31
authors:
  - maudn
---

## 基礎を学ぶ

[Attribution
Reporting](/docs/privacy-sandbox/attribution-reporting/)
をお読みください。

## API を試す

1. [デモ](https://goo.gle/attribution-reporting-demo)をお試しになれます。
2. 今すぐ API を試す方法については、[API のステータス](/docs/privacy-sandbox/attribution-reporting/#status)で確認できます。
3. API をテストできます。
    * 任意）2021 年にこの API のオリジン トライアルを実施している場合は、[移行ガイド](https://docs.google.com/document/d/1NY7SScCYcPc9v5wtf_fVAikFxGQTAFvwldhExN1P03Y/edit)に沿って今後のオリジン トライアルの準備を行ってください。
    * API をテストするには、以下のガイドを参照してください。
        * [Attribution Reporting API に関する必知事項](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/)
        * [ハンドブック](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/):
        デモ、詳細なコードサンプル、（ローカルの）デバッグに関するヒントが掲載されています。
4. [概要レポート](/docs/privacy-sandbox/attribution-reporting/summary-reports/)をテストできます。
    * （任意）Trusted Execution Environment（TEE）で動作する集計サービスのテストや、復号済みデバッグ レポートに基づくローカルテストのための追加インストラクションがまもなく提供される予定です。

## サポートを受ける

{% Aside %} API のテストを妨げている障害がある場合は、ぜひご連絡ください。{% endAside %}

ご使用の実装、[デモ](https://goo.gle/attribution-reporting-demo)、ドキュメントについて質問がある場合:

* [privacy-sandbox-dev-support リポジトリに新しいイシューを投稿](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)してください。イシュー テンプレートについては  **Attribution Reporting** を選択してください。
* または、[デベロッパー向けの Attribution Reporting メーリング リストに参加](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)して質問してください。

予期しない動作が発生した場合:

* API 実装について報告されている [Chrome の問題を確認](https://bugs.chromium.org/p/chromium/issues/list?q=component%3AInternals%3EConversionMeasurement)してください。
* [Chrome の新しい問題を投稿](https://crbug.com/new)してください。

API のユースケースに関する一般的な質問がある場合は、[API
についてディスカッションする](/docs/privacy-sandbox/attribution-reporting-experiment/#discuss-the-api)をご覧ください。

## ディスカッションに参加する

どなたでもディスカッションに参加できます。特に、あなたが API
をテストしている場合、あなたのフィードバックはとても重要です。

### API についてディスカッションする

{% Aside %} プライバシー サンドボックスに関する他の提案と同様に、この API についても
_GitHub_ にドキュメントを掲載し、公開ディスカッションを行っています。[こちらの提案](https://github.com/WICG/conversion-measurement-api/)をご覧ください。
{% endAside %}

- [既存のイシュー](https://github.com/WICG/conversion-measurement-api/issues)に関するやり取りに参加できます。
- [新しいイシューを投稿](https://github.com/WICG/conversion-measurement-api/issues/new)して質問したり、機能を提案したり、ユースケースについてディスカッションしたりすることができます。イシューの投稿方法が不明な場合は、[こちらの例](https://github.com/WICG/conversion-measurement-api/issues/147)をご覧ください。
- [隔週開催のミーティングに参加](https://github.com/WICG/conversion-measurement-api/issues/80)できます。どなたでもご参加になれます。参加するには、まず [WICG に参加](https://www.w3.org/community/wicg/)してください。積極的な活動はもちろん、閲覧のみの参加も歓迎いたします。

### 関連トピックについてディスカッションする

- 業界のユースケースについては、[Private Advertising Technology コミュニティ グループ](https://github.com/patcg)または [Improve
  Web Advertising ビジネス グループ](https://www.w3.org/community/web-adv/participants)でディスカッションすることができます。
- [WebKit/Safari Measurement API](https://github.com/privacycg/private-click-measurement) については、[Privacy コミュニティ
   グループ](https://www.w3.org/community/privacycg/)でディスカッションすることができます。

## 最新情報を入手する

- API のステータス変更について通知を受け取るには、[デベロッパー向けのメーリング リスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に参加してください。
- API に関する進行中のディスカッションをつぶさにチェックするには、[GitHub の提案ページ](https://github.com/WICG/conversion-measurement-api)で **Watch** ボタンをクリックしてください。そのためには、[GitHub アカウントを持っているか作成する](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)必要があります。
- プライバシー サンドボックスに関する最新情報全般を入手するには、[プライバシー サンドボックスの進捗状況](/tags/progress-in-the-privacy-sandbox/)の RSS フィードを購読してください。

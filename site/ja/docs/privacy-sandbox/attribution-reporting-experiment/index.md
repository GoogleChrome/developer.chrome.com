---
layout: 'layouts/doc-post.njk'
title: 'アトリビューション レポート: テストとディスカッション'
date: 2022-03-31
updated: 2022-06-23
authors:
  - maudn
  - alexandrawhite
---

## 基礎を学ぶ

[アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting/)と[最新のアップデート](/docs/privacy-sandbox/attribution-reporting-updates/)
をお読みください。

## API を試す

1. [デモ](https://goo.gle/attribution-reporting-demo)をお試しになれます。
2. 今すぐ API を試す方法については、[API のステータス](/docs/privacy-sandbox/attribution-reporting/#status)で確認できます。
3. API をテストできます。
    * 任意）2021 年にこの API のオリジン トライアルを実施した場合は、[移行ガイド](https://docs.google.com/document/d/1NY7SScCYcPc9v5wtf_fVAikFxGQTAFvwldhExN1P03Y/edit)に沿って最新のオリジン トライアルにご参加ください。
    * API をテストするには、以下のガイドを参照してください。
        * [Attribution Reporting API に関する必知事項](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/)
        * [ハンドブック](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/):
        デモ、詳細なコードサンプル、（ローカルの）デバッグに関するヒントが掲載されています。
4. [要約レポート](/docs/privacy-sandbox/attribution-reporting/summary-reports/)をテストできます。
    *  アドテクは集計サービスで要約レポートを生成することができます。[ローカルテスト](https://github.com/google/trusted-execution-aggregation-service/#set-up-local-testing)および [Amazon Web Services（AWS）上での本番環境でのテスト](https://github.com/google/trusted-execution-aggregation-service/#test-on-aws-with-support-for-encrypted-reports)のセットアップ方法について学んでください:    
        *  [AWS アカウント](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) を作る、または用意する。
        *  プライバシーサンドボックスの関連性と測定オリジン トライアルに[登録します](/origintrials/#/view_trial/771241436187197441)。
        *  集計サービスの[オンボーディング フォーム](https://forms.gle/EHoecersGKhpcLPNA)を完了します。フォームが提出されたら、確認メールと手順書をお送りします。
   *  [要約レポートのストラテジーとコツ](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit?usp=sharing) を参照してください。


## サポートを受ける

ご使用の実装、[デモ](https://goo.gle/attribution-reporting-demo)、ドキュメントについて質問がある場合:

* [privacy-sandbox-dev-support リポジトリに新しいイシューを投稿](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)してください。イシュー テンプレートについては  **Attribution Reporting** を選択してください。
* または、[デベロッパー向けのアトリビューション レポート メーリング リストに参加](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)して質問してください。

予期しない動作が発生した場合:

* API 実装について報告されている [Chrome の問題を確認](https://bugs.chromium.org/p/chromium/issues/list?q=component%3AInternals%3EConversionMeasurement)してください。
* [Chrome の新しい問題を投稿](https://crbug.com/new)してください。

API のユースケースに関する一般的な質問がある場合は、[API
についてディスカッションする](/docs/privacy-sandbox/attribution-reporting-experiment/#discuss-the-api)をご覧ください。

{% Partial 'privacy-sandbox/ar-join-discussion-long.njk' %}

{% Partial 'privacy-sandbox/ar-get-updates.njk' %}

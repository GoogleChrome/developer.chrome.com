---
layout: layouts/blog-post.njk
title: 集計サービスを使用して要約レポートを生成する
authors:
  - alexandrawhite
description: アトリビューション レポートの概要レポートを生成する集計サービスを試して設定します。
date: 2022-06-06
hero: image/VbsHyyQopiec0718rMq2kTE1hke2/ASAZM31nd8FvgV22LTvJ.jpg
alt: サーバーに接続されたコード。サービスのセットアップを表します。
tags:
  - privacy
  - experiment
---

アトリビューション レポートの[オリジントライアルの実験と参加](/docs/privacy-sandbox/attribution-reporting-experiment/)が可能になりました。開始するため使用できる開発者リソースとコードサンプルが多数用意されています。

オリジントライアルで要約レポートを生成するにはまず、集計サービスをセットアップする必要があります。このブログ記事では、その手順の概要について説明します。

{% Aside %} 2021 年にこの API でオリジントライアルを実行した場合は、[移行ガイド](https://docs.google.com/document/d/1NY7SScCYcPc9v5wtf_fVAikFxGQTAFvwldhExN1P03Y/edit?usp=sharing)に従って、最新のオリジントライアルの準備を行ってください。 {% endAside %}

## 重要な用語

[アトリビューション レポートの概要](/docs/privacy-sandbox/attribution-reporting-introduction/)と[要約レポート](/docs/privacy-sandbox/attribution-reporting/summary-reports/)の詳細をまだお読みでない場合は、集計サービスのセットアップについて学習する前に、それらに目を通しておくことをお勧めします。

- *要約レポート*は Attribution Reporting API 用にコンパイルされた出力であり、ユーザーグループに関する情報を集計したものです。要約レポートは、購入金額やカートの内容などの詳細なコンバージョン データを提供し、クリックやビューのデータを柔軟に表示します。
- *集計可能なレポート*は、個々のユーザーのブラウザによって生成される暗号化されたレポートです。これらには、広告主またはアドテックによって定義された、個々のコンバージョンと関連する指標に関するデータが含まれています。 [集計可能なレポート](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md)の詳細について、さらにお読みください。
- *集計サービス*は、集計可能なレポートのデータを処理して、要約レポートを作成します。

## 集計サービスをセットアップする

[集計サービスの提案](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATION_SERVICE_TEE.md)では、必要なセキュリティ機能をサポートするクラウド サービスに信頼できる実行環境（TEE）をデプロイして集計サービスの独自のインスタンスを運用することを各アドテックプロバイダーに求めています。

初期実装とオリジントライアルにおいては、アドテックは[ローカルテスト](https://github.com/google/trusted-execution-aggregation-service/#set-up-local-testing)をセットアップするか、[Amazon Web Services（AWS）を使用した TEE でテスト](https://github.com/google/trusted-execution-aggregation-service/#test-on-aws-with-support-for-encrypted-reports)できます。

1. プライバシーサンドボックスの関連性と測定のオリジントライアル（OT）に[登録](/origintrials/#/view_trial/771241436187197441)します。
2. [Amazon Web Services アカウント](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html)を作成するか、用意します。
3. 集計サービスの[オンボーディング フォーム](https://forms.gle/EHoecersGKhpcLPNA)に記入します。このフォームに入力すると、登録確認と集計サービスのセットアップ手順が記載されたメールが届きます。

ローカルテスト ツールと AWS で実行されている集計サービスではいずれも、集計可能なレポートが [Apache Avro](https://avro.apache.org/) 形式でバッチ処理されることが想定されています。集計可能なレポートを収集してバッチ処理する方法を説明する[コードスニペット](https://github.com/google/trusted-execution-aggregation-service/blob/main/COLLECTING.md)を確認してください。

## AWS の TEE で要約レポートを生成する

{% Aside %} これは、TEE で要約レポートを生成する方法を大まかに説明したものです。[AWS での集計サービスのテスト](https://github.com/google/trusted-execution-aggregation-service/#test-on-aws-with-support-for-encrypted-reports)についての詳細は、開発者ドキュメントをお読みください。 {% endAside %}

要約レポートを生成するには、[Terraform](https://www.terraform.io/) を使用して AWS に集計サービスをセットアップする必要があります。Terraform は、AWS [Nitro Enclave インスタンス](https://aws.amazon.com/ec2/nitro/nitro-enclaves/)における集約サービスのプロビジョニング、管理、廃止を支援します。

1. 最新の AWS クライアントを[インストール](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)して[セットアップ](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)します。
2. [Terraform をセットアップ](https://github.com/google/trusted-execution-aggregation-service/#set-up-terraform)します。
3. [集約サービスの依存関係](https://github.com/google/trusted-execution-aggregation-service/#download-dependencies)をダウンロードします。
4. [デプロイメント環境](https://github.com/google/trusted-execution-aggregation-service/#set-up-your-deployment-environment)をセットアップします。
5. [システムをテスト](https://github.com/google/trusted-execution-aggregation-service/#testing-the-system)します。

## サポートを受ける

Attribution Reporting API のサポートがさらに必要な場合は、以下をご覧ください。

- [Privacy Sandbox Developer Support の GitHub リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)で新しいイシューを発行します。アトリビューション レポートのイシューテンプレートを選択してください。
- または、[開発者向けのアトリビューション レポート メーリング リストに参加](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)して、そこでご質問ください。

予期しない動作に遭遇した場合は、以下を行ってください。

- API 実装に関して報告された [Chrome のイシューを表示](https://bugs.chromium.org/p/chromium/issues/list?q=component%3AInternals%3EConversionMeasurement)します。
- [Chrome のバグ](https://crbug.com/new)を開きます。
- [Trusted Execution Aggregation Service](https://github.com/google/trusted-execution-aggregation-service/issues)（信頼できる実行集計サービス）に関する新しいイシューを提起します。

---
layout: layouts/doc-post.njk
title: 集計サービス
subhead: このサービスを導入して管理を行い、Attribution Reporting API または Private Aggregation API のサマリーレポートを作成します。
description: このサービスを導入して管理を行い、Attribution Reporting API または Private Aggregation API のサマリーレポートを作成します。
date: 2022-11-29
authors:
  - alexandrawhite
---

[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) または [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) からの集計可能なレポートを処理して[サマリーレポート](/docs/privacy-sandbox/summary-report/)を作成するための集計サービスの導入および管理を行います。

## 実装状況

- [集計サービスの提案](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md)の公開ディスカッションが開始されました。
- [集計サービスのテスト](#test)は、FLEDGE と共有ストレージの Attribution Reporting API と Private Aggegration API で行えます。

この提案では、集計サービスを理解する上で役立つ[キーワード](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md#key-terms)について解説を行っています。

## 安全なデータ処理

集計サービスは集計可能なレポートから収集したデータを復号化して結合し、[ノイズを追加](#noise-scale)してから最終的な集計レポートとして返します。このサービスは、データの保護に必要なセキュリティ対策をサポートするクラウドサービス上に実装された TEE（Trusted Execution Environment、信頼できる実行環境）上で実行されます。

{% Aside %}[Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) とは、コンピューターで実行されているソフトウェアの正確なバージョンを外部の団体が検証できるようにするためのコンピューターのハードウェアとソフトウェアの特別な構成のことを指します。TEE を使用することで、ソフトウェアがソフトウェアの作成者が (それ以上でもそれ以下でもなく) 意図した通りに動作しているかどうかを外部の団体が検証できるようになります。{% endAside %}

TEE のコードは集計サービスの中で唯一未加工のレポートにアクセスできる場所となっており、このコードは、セキュリティ研究者、プライバシー権の擁護者、広告技術者などが監査を実施することができます。TEE が承認されたソフトウェアのみを実行し、データが安全に保護されていることを確認するために、コーディネーターが認証を行います。

<figure>{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/b1avI43zUaKT2UAdGOo1.png", alt="集計可能なレポートを収集してバッチ処理を行い、TEE に送信して最終的なサマリーレポートへと変換します。", width="800", height="457" %} <figcaption> <p>集計可能なレポートは、収集が行われ、バッチ処理が施された後に TEE で実行される集計サービスへと送信されます。集計サービスの環境はデータ収集を行う団体と同一の団体が所有し、運営を行います。</p> </figcaption></figure>

### TEE のコーディネーター認証 {: #coordinator }

*コーディネーター*は、キーの管理や集計可能なレポートの処理を担当するエンティティです。

コーディネーターには、以下のような役割が課せられています。

- 承認済みバイナリイメージの一覧の維持。これらのイメージは Google が定期的にリリースする集計サービスソフトウェアビルドの[暗号化ハッシュ](https://en.wikipedia.org/wiki/Cryptographic_hash_function)として機能します。これらは再現性を持つため、イメージが集計サービスのビルドに一致しているかどうかをすべての団体が確認できます。
- 鍵管理システムの運用。暗号鍵は、ユーザーのデバイス上の Chrome が集計可能なレポートの暗号化を行う際に必要となります。復号鍵は、集計サービスのコードがバイナリイメージと一致していることを証明するために必要となります。
- 集計可能なレポートを再利用することで個人を特定できる情報 (PII) が暴露されてしまう可能性があるため、集計可能なレポートを追跡してサマリーレポートの集計に再利用されないようにします。

{% Aside %}集計サービスをテストする場合には、「[コーディネーターサービスに関する追加の利用規約](/docs/privacy-sandbox/aggregation-service/tos/)」を参照してください。{% endAside %}

## ノイズとスケーリング {: #noise-scale}

ユーザーのプライバシーを保護するために、集計サービスは[加法ノイズ・メカニズム](https://en.wikipedia.org/wiki/Additive_noise_mechanisms)を集計可能なレポートからの未加工データに適用します。これは、サマリーレポートでのリリースの前に各集計値に一定量の統計的ノイズを追加することを意味しています。

ノイズの追加方法を直接制御することはできませんが、ノイズが測定データに与える影響をある程度制御することは可能です。

<figure>{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qJ182Vhszwsgf1PVLEpT.png", alt="ノイズは集計値に関わらず一定です。", width="600", height="462" %}</figure>

ノイズの値は[ラプラス確率分布](https://en.wikipedia.org/wiki/Laplace_distribution)によりランダムに抽出され、集計可能なレポートで収集したデータの量に関わらず同一の分布となります。収集するデータが多ければ多いほど、ノイズがサマリーレポートの結果に与える影響は少なくなります。集計可能なレポートのデータにスケーリングファクターを掛けることによってノイズの影響を軽減することができます。

ノイズの追加方法、制御方法、レポートに与える影響については、[「アトリビューションレポートの戦略ガイド」の「コントリビューション」セクション](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.683u7t2q1xk2)を参照してください。

## サマリーレポートの生成

サマリーレポートの生成方法は、API の使用状況に応じて異なってきます。[Private Aggregation API](/docs/privacy-sandbox/summary-reports#private-aggregation) と [Attribution Reporting API](/docs/privacy-sandbox/summary-reports#attribution-reporting) のサマリーレポート生成に関する詳細情報をご確認ください。

## 集計サービスをテストする {: #test}

テストする API に対応する実験と参加ガイドを読むことをお勧めします。

- [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-experiment/)
- [Private Aggregation API](/docs/privacy-sandbox/private-aggregation-experiment/)

### ローカルテスト

Attribution Reporting と Private Aggregation API の集計可能なレポートを処理するためのローカルテストツールを作成しました。[使用方法をお読みください](https://github.com/privacysandbox/aggregation-service/blob/main/README.md)。

### AWS でテストする

AWS で集計サービスをテストするには、[オリジントライアルに登録](/origintrials/#/view_trial/771241436187197441)し、[オンボーディングフォーム](https://forms.gle/EHoecersGKhpcLPNA)に入力してください。送信後、フォームの内容を確認して、以降の手順とともにご連絡いたします。

AWS でテストするには、[Terraform](https://www.terraform.io/) と最新の [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) をインストールします。

[手順をお読みください](https://github.com/privacysandbox/aggregation-service/blob/main/README.md#test-on-aws-with-support-for-encrypted-reports)。

## エンゲージメントとフィードバックの共有

集計サービスは、プライバシーサンドボックスの測定に関する提案において重要な位置を占めています。プライバシーサンドボックスに関するその他の提案と同様に GitHub で文書化されており、ディスカッションが公開されています。

- **Github**: [提案](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md)を読み、[質問をしてディスカッションに参加してください](https://github.com/WICG/attribution-reporting-api/issues)。また、[集計サービスの実装](https://github.com/privacysandbox/aggregation-service)をご覧いただき、[実装に関するフィードバック](https://github.com/privacysandbox/aggregation-service/issues)をご提供ください。
- **開発者向けサポート**: [プライバシーサンドボックスの開発者向けサポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、ディスカッションに参加したりすることができます。

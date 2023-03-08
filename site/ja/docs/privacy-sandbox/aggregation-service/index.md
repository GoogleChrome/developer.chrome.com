---
layout: layouts/doc-post.njk
title: 集計サービス
subhead: このサービスを導入して管理を行い、Attribution Reporting API または Private Aggregation API のサマリーレポートを作成します。
description: このサービスを導入して管理を行い、Attribution Reporting API または Private Aggregation API のサマリーレポートを作成します。
date: '2022-11-29'
authors:
  - alexandrawhite
---

Deploy and manage an Aggregation Service to process aggregatable reports from the [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) or the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) to create a [summary report](/docs/privacy-sandbox/summary-report/).

## 実装状況

- The [Aggregation Service proposal](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md) is available for discussion.
- The [Aggregation Service can be tested](#test) with the Attribution Reporting API and the Private Aggegration API for FLEDGE and Shared Storage.

The proposal outlines [key terms](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md#key-terms), useful for understanding the Aggregation Service.

## 安全なデータ処理

The Aggregation Service decrypts and combines the collected data from the aggregatable reports, [adds noise](#noise-scale), and returns the final summary report. This service runs in a trusted execution environment (TEE), which is deployed on a cloud service that supports necessary security measures to protect this data.

{% Aside %}[Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) とは、コンピューターで実行されているソフトウェアの正確なバージョンを外部の団体が検証できるようにするためのコンピューターのハードウェアとソフトウェアの特別な構成のことを指します。TEE を使用することで、ソフトウェアがソフトウェアの作成者が (それ以上でもそれ以下でもなく) 意図した通りに動作しているかどうかを外部の団体が検証できるようになります。{% endAside %}

The TEE's code is the only place in the Aggregation Service which has access to raw reports—this code will be auditable by security researchers, privacy advocates, and ad techs. To confirm that the TEE is running the exact approved software and that data remains secured, a coordinator performs attestation.

<figure> {% Img   src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/b1avI43zUaKT2UAdGOo1.png",   alt="Aggregatable reports are collected, batched, and send to the TEE to be transformed into a final summary report.",   width="800", height="457" %} <figcaption>   <p>Aggregatable reports are collected, batched, and send to the Aggregation Service, running on a TEE. The Aggregation Service environment is owned and operated by the same party collecting the data.</p> </figcaption></figure>

### TEE のコーディネーター認証 {: #coordinator }

*コーディネーター*は、キーの管理や集計可能なレポートの処理を担当するエンティティです。

コーディネーターには、以下のような役割が課せられています。

- Maintain a list of authorized binary images. These images are [cryptographic hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of the Aggregation Service software builds, which Google will periodically release. This will be reproducible so that any party can verify the images are identical to the Aggregation Service builds.
- Operate a key management system. Encryption keys are required for the Chrome on a user's device to encrypt aggregatable reports. Decryption keys are necessary for proving the Aggregation Service code matches the binary images.
- 集計可能なレポートを再利用することで個人を特定できる情報 (PII) が暴露されてしまう可能性があるため、集計可能なレポートを追跡してサマリーレポートの集計に再利用されないようにします。

{% Aside %}集計サービスをテストする場合には、「[コーディネーターサービスに関する追加の利用規約](/docs/privacy-sandbox/aggregation-service/tos/)」を参照してください。{% endAside %}

## ノイズとスケーリング {: #noise-scale}

To protect user privacy, the Aggregation Service applies an [additive noise mechanism](https://en.wikipedia.org/wiki/Additive_noise_mechanisms) to the raw data from aggregatable reports. This means that a certain amount of statistical noise is added to each aggregate value before its release in a summary report.

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

We've created a local testing tool to process aggregatable reports for Attribution Reporting and the Private Aggregation API. [Read the instructions](https://github.com/privacysandbox/aggregation-service/blob/main/README.md).

### AWS でテストする

To test the Aggregation Service on AWS, [register for the origin trial](/origintrials/#/view_trial/771241436187197441) and complete the [onboarding form](https://forms.gle/EHoecersGKhpcLPNA). Once submitted, we'll contact you to verify your information and send the remaining instructions.

To test on AWS, install [Terraform](https://www.terraform.io/) and the latest [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

[Read the instructions](https://github.com/privacysandbox/aggregation-service/blob/main/README.md#test-on-aws-with-support-for-encrypted-reports).

## エンゲージメントとフィードバックの共有

The Aggregation Service is a key piece of the Privacy Sandbox measurement proposals. Like other Privacy Sandbox proposals, this is documented and discussed publicly on GitHub.

- **Github**: [提案](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md)を読み、[質問をしてディスカッションに参加してください](https://github.com/WICG/attribution-reporting-api/issues)。また、[集計サービスの実装](https://github.com/privacysandbox/aggregation-service)をご覧いただき、[実装に関するフィードバック](https://github.com/privacysandbox/aggregation-service/issues)をご提供ください。
- **開発者向けサポート**: [プライバシーサンドボックスの開発者向けサポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、ディスカッションに参加したりすることができます。

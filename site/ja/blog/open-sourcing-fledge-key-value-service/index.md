---
title: FLEDGE Key/Value サービスのオープンソース化
description: FLEDGE Key/Value サービス
layout: layouts/blog-post.njk
date: 2022-08-23
hero: image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/FQx2L0MGnXgrcAOzkVmm.png
alt: ''
authors:
  - kevinkiklee
tags:
  - privacy
  - proposal
---

[FLEDGE Key/Value サービス コード](https://github.com/privacysandbox/fledge-key-value-service)が Privacy Sandbox GitHub リポジトリで利用できるようになりました。このサービスは、Chrome および Android の開発者が使用できます。

## FLEDGE とは？

[FLEDGE](/docs/privacy-sandbox/fledge/) は、ユーザーのプライバシーを保護しながら、リマーケティングとカスタム オーディエンスのユースケースを提供するための提案です。FLEDGE がバイヤー（DSP）とセラー（SSP）の間で広告オークションを実行すると、クライアントは FLEDGE Key/Value サービスからリアルタイムのシグナルを受け取ります。リアルタイム シグナルは、入札の計算時にバイヤーの予算などの情報を提供するため、非常に重要です。また、ユーザーに表示する広告を決定するために、広告クリエイティブに関する情報をセラーに提供することもできます。これらのシグナルがなければ、バイヤーとセラーは、広告業界が依存する基本的な操作を行うことができません。

オークションが実行されると、 [FLEDGE Key/Value サービス](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)が照会され、バイヤーとセラーが値を利用できるようになります。バイヤーが入札を行っているときは、DSP Key/Value サービスにクエリを実行して、入札を決定するのに役立つリアルタイム情報を受け取ることができます。セラーが入札について決定を下すときは、クリエイティブのレンダリング URL を使用して SSP Key/Value サービスをクエリし、クリエイティブに関する情報を取得して、広告のスコアリングに役立てることができます。

## FLEDGE Key/Value サービスの運用

リポジトリの [README ファイル](https://github.com/privacysandbox/fledge-key-value-service/blob/main/README.md)は、必要な AWS インフラストラクチャのセットアップ、サービス アーティファクトの構築、サービスの実行、および FLEDGE API との統合の手順にリンクされています。ドキュメントは、サービスの開発が進むにつれて更新されます。

アドテックは現在、テスト用に独自のサービスを運用できますが（[「Bring Your Own Server」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)）、長期的には、アドテックはリアルタイムデータを取得するために、信頼できる実行環境（TEE）で実行されているオープンソースの FLEDGE Key/Value サービスを使用する必要があります。

エコシステムがテストするのに十分な時間を確保するために、サードパーティの Cookie が廃止されるまでは、オープンソースの Key/Value サービスまたは TEE の使用が必要になるとは考えていません。この移行が行われる前に、開発者がテストと採用を開始できるのに十分な通知を行う予定です。

## 初期の実装計画

最初のリリースでは、以下を提供します。

- サンプル データまたはライブラリの基本セットと、独自のデータを生成するための手順。将来的には、お客様のシステムとより簡単に統合できる追加のデータ生成ソリューションを提供する予定です。
- 基本的なキーと値のルックアップ機能を備えた Amazon Web Service（AWS）Nitro Enclave 環境で実行されるサービスのセットアップ。

{% Aside %} 初期バージョンでは、Key/Value サービス コードは Amazon Web Services でのみサポートされています。 {% endAside %}

現時点では、クライアントとサービス間の信頼を確立するためのサポートは制限されているか、まったくありませんが、将来的には提供される予定です。

{% Aside 'warning' %} FLEDGE Key/Value サービスはパブリックにクエリ可能であり、呼び出し元を認証しません。サービスにロードしたデータは誰でもクエリできるため、個人を特定できる情報を提供しないことを強くお勧めします。 {% endAside %}

## フィードバック

FLEDGE Key/Value サービスの提案は活発な議論が行われており、将来変更される可能性があります。このシステムを試してフィードバックがあれば、ぜひお聞かせください。

- **ディスカッションと質問**
    - [トラスト モデル](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md)を読み、 [FLEDGE WICG ミーティングに参加](https://github.com/WICG/turtledove/issues/88)してください。
    - [質問を提起し、GitHub リポジトリでのディスカッションに参加してください。](https://github.com/WICG/turtledove/issues)
- **開発者サポート**: 以下の場所では質問を投稿したり、ディスカッションに参加したりできます。
    - [Privacy Sandbox for the Web Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
    - [プライバシーサンドボックスに関する Android イシュー トラッカー](https://issuetracker.google.com/issues/new?component=1116743&template=1642575)

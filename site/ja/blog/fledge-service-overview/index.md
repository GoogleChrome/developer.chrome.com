---
layout: layouts/blog-post.njk
title: Chrome と Android 向けの FLEDGE サービス
authors:
  - alexandrawhite
  - joelewis
hero: image/VbsHyyQopiec0718rMq2kTE1hke2/Hw1FzR5OI1KbQMQVzO3c.png
alt: プライバシーサンドボックス FLEDGE サービスの概要。
description: FLEDGE は、リマーケティングおよびカスタム オーディエンスのユースケースに対応するためのプライバシーサンドボックスの提案であり、サードパーティがサイトをまたいでユーザーのブラウジング行動を追跡できないように設計されています。
date: 2022-08-24
tags:
  - privacy
  - proposal
---

<style type="text/css">
	.type figcaption {text-align:left;}
</style>

FLEDGE（[Android](https://developer.android.com/design-for-safety/ads/fledge)、[Chrome](/docs/privacy-sandbox/fledge/#overview)）は、マーケティング担当者が、サードパーティのデータ共有を制限しながら、オーディエンスメンバーのモバイルアプリまたはウェブにおける過去のエンゲージメントに基づいて、カスタムオーディエンスに広告をターゲティングできるようにするプライバシーサンドボックスの提案です。FLEDGE サービスは、広告主とアドテックにリアルタイムの情報を提供します。

## この更新の対象者 {: #who}

- あなたが**アドテック**、**広告**、または**広告仲介**に従事している場合、この記事には、FLEDGE を最適化するために使用できるクラウドサービスの概要が説明されています。
- あなたが**開発者**の場合、Explainer からより詳細な技術情報とセットアップ情報にアクセスできます。

これらのサービスは、サプライサイド プロバイダー（SSP）とデマンドサイド サプライヤー（DSP）向けに設計されています。ウェブサイトおよびアプリケーションのコンテンツパブリッシャーからの操作は現在必要ありませんが、SSP が直接連絡を取り、取り組みを調整する場合があります。

## クロスプラットフォームかつリアルタイムのサービス

FLEDGE はアプリとウェブ向けに構築されているため、サービスがプラットフォーム間でリアルタイムに機能することが重要です。

[FLEDGE サービスの Explainer](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md) では、現時点で提案されている FLEDGE サービスと今後の同サービスに関するハイレベルなシステム概要、信頼モデル、プライバシーの考慮事項、およびセキュリティ目標について詳しく説明しています。

本番環境で FLEDGE をテストしている場合は、**[Key-Value サービス](#key-value-service)** についてよく理解していると思います。この提案は、クラウド実装のための新しい信頼モデルとして更新されました。「Bring Your Own Server」モデルに精通している場合には、[移行方法の詳細とタイムラインの更新](#byos-to-tee)をご覧ください。

2 つ目のサービスは、FLEDGE の傘下で新たに提案された **[入札・オークション サービス](#bidding-auction-service)** です。この新しい提案では、広告オークションと入札サービスのプライバシーを保護しながら、入札と広告オークションをクライアントからクラウドにオフロードします。新しい入札およびオークション サービスのアイデアと現在のオンデバイス デザインとの比較についてのフィードバックをお待ちしております。特に、進行中の Chrome 広告の関連性と測定のオリジントライアルの一環として、すでに経験を積んでいるテスターからのフィードバックをお待ちしております。この提案は、[提案ライフ サイクルのディスカッションの段階](/docs/privacy-sandbox/proposal-lifecycle/)にあります。入札・オークションサービスは、「Bring Your Own Server」モデルの対象外です。

### Key-Value サービス {: #key-value-service }

アドテックは、[Key-Value サービス](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)を使用して、リアルタイムの情報を FLEDGE 広告オークションに提供できます。この情報は、さまざまな方法で使用できます。

- バイヤーが、広告キャンペーンの残りの予算を計算したい場合があります。
- セラーが、広告クリエイティブをサイト運営者のポリシーに照らして確認する必要がある場合があります。

Key-Value サービスには、[カスタムのユーザー定義関数](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_trust_model.md#support-for-user-defined-functions-udfs)を可能にする開発者向けの API があります。これにより、開発者は、複数のルックアップやその他の高度なクエリなどのタスクに対して独自のロジックを実行できます。

クラウドサービスを実装することで、アドテックは使用するデータを安全に保存し、広告キャンペーンの進行に合わせて最新の状態に保つことができます。

TEE ベースの [FLEDGE Key-Value サービス](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md)が[オープン ソース化](/blog/open-sourcing-fledge-key-value-service/)されました。

### 入札・オークションサービスの提案 {: #bidding-auction-service }

{% Aside %} これは議論中の新しい提案であり、**現在の FLEDGE のオンデバイス入札とオークションのアプローチは変更されていません**。入札・オークションサービスは、必要に応じて入札とオークションの計算を信頼できる実行環境（TEE）にオフロードするための補完的な提案です。

皆様からの[フィードバックをお待ちしております](#engage-and-share-feedback)。特に、[広告の関連性と測定のオリジントライアル](/blog/privacy-sandbox-unified-origin-trial/)に参加しているテスターからのフィードバックをお待ちしております。 {% endAside %}

FLEDGE の提案では、広告の入札とオークションの実行をオンデバイスで行うことが提案されています。

FLEDGE の入札とオークションのプロセスは、計算集約型であり、ネットワークを介した複数の呼び出しを伴う場合があります。これらの計算をクラウドに移行すると、デバイスの計算リソースとネットワーク帯域幅が解放され、全体的な広告レンダリングのレイテンシが最適化されます。

[入札・オークションサービスを使用](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md)すると、広告スペースのバイヤーとセラーは、広告の入札とオークションの実行を、クラウド内の信頼できる実行環境で実行されているサービスにオフロードすることができます。

Key-Value サービスとは異なり、入札・オークションサービスは「Bring Your Own Server」モデルの対象外です。

## FLEDGE サービスのインフラストラクチャ

これらのサービス提案は、オンデバイスで実行されるサービスではなく、プライバシーに重点を置いたクラウドベースのサービスを提示します。

FLEDGE サービスがタスクを実行できるように相互作用するエンティティがいくつかあります。

- **[クライアント](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#clients)**（Android デバイスと Chrome ブラウザ）は、暗号化された要求を FLEDGE サービスに送信します。
- **[クラウドプラットフォーム](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#cloud-platform)** は、FLEDGE サービスがサードパーティと情報を共有することを防止する、信頼できる実行環境（TEE）によってバックアップされた仮想マシンで FLEDGE サービスをホストします。
- **[鍵管理システム](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#key-management-systems)** には、公開鍵と秘密鍵を生成して配布するサービスとデータベースが含まれており、クライアントサービス通信のエンドツーエンドの暗号化を保証します。

<figure class="screenshot">{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/5XMXkDmG1Tx07DPdHHIR.jpg", alt="FLEDGE サービスのシステム通信。", width="770", height="415" %}<figcaption><strong>図 1</strong>:<br><br>クライアントは FLEDGE サービスにリクエストを送信します。FLEDGE サービスは、入札・広告オークションプロセスに重要な情報を返します。クライアントは、鍵管理システムでホストされている公開鍵を使用して、これらの要求を暗号化します。 FLEDGE サービスは、鍵管理システムに依存して、要求を復号化し、応答を暗号化します。<br><br> <a href="https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#system-overview">FLEDGE サービス  Explainer のシステム概要</a>をご覧ください。</figcaption></figure>

## プライバシーとセキュリティに関する考慮事項

FLEDGE サービスの提案されたアーキテクチャでは、インフラがプライバシーを保護し、安全であることを保証するためにいくつかの決定を下しました。

アドテックは、必要なセキュリティ機能を備えたクラウドプロバイダーで実行される信頼できる実行環境（TEE）でこれらのサービスを運用します。

データの機密性と安全性を確保するためのメカニズムには、次のようなものがあります。

- すべてのクライアントサービスおよびサービス間通信のエンドツーエンドの暗号化。
- 信頼できるパーティが運営する鍵管理システム。
- FLEDGE サービスは、クライアントのリクエストを復号化するために必要な秘密鍵へのアクセスを取得する前に証明されます。

アドテック、Google、またはその他のエンティティによって、機密データがサービスから盗み出されることはありません。

### Bring Your Own Server から TEE への移行 {: #byos-to-tee}

FLEDGE for Chrome は現在、Key-Value サービスの[「Bring Your Own Server」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)（BYOS）モデルを許可していますが、これは将来 TEE に移行する必要があります。BYOS モデルは、[入札・オークションサービス](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md)の対象外です。

BYOS モデルからの移行を容易にするために、FLEDGE Key-Value  サービスの新しい[オープンソース API、ドキュメント、サーバー実装、および Explainer](/blog/open-sourcing-fledge-key-value-service/) を提供しています。これらの API は、TEE で実行できるアドテックによるカスタムスクリプトとカスタムコードを許可することを目的としています。

Chrome と Android は Key-Value  サービスをオープンソース化する予定です。これにより、アドテックプラットフォームは開発を監視し、データプレーンのコードベースに貢献できる可能性があります。

#### タイムライン

BYOS モデルを実装したアドテックプラットフォームは、FLEDGE が開発中である間に、TEE ベースの Key-Value サービス実装への移行を検討できます。

長期的には、アドテックはリアルタイムデータを取得するために、信頼できる実行環境（TEE）で実行されるオープンソースの FLEDGE Key-Value サービスを使用する必要があります。エコシステムがテストするのに十分な時間を確保するために、サードパーティの Cookie が廃止されるまでは、オープンソースの Key-Value  サービスまたは TEE の使用が必要になるとは考えていません。この移行が行われる前に、開発者がテストと採用を開始できるのに十分な通知を行う予定です。

さらに、2023 年半ばまでにユーザー定義関数 API やその他の Key-Value サービスの統合を提供することを目指しています。準備が整ったら、アドテックはより高度なロジックを開発できます。この実装を改善し、お客様のニーズを最大限に満たすために、[皆さんのご協力](#feedback)をお待ちしております。

## 貢献とフィードバックの共有 {: #feedback}

プライバシーサンドボックスは Chrome と Android のコラボレーションであり、ユーザーのプライバシーを保護するテクノロジーを提供し、企業や開発者がインタレストベース広告を活用するために必要なツールを提供します。

「プライバシーサンドボックス」イニシアチブの詳細については、次をご覧ください。

- **GitHub**:
    - [FLEDGE サービスの提案](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md)を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/privacysandbox/fledge-docs/issues)したりできます。
    - [入札・オークションサービスの提案](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md)を読み、[質問を投稿したり、ディスカッションを閲覧したり](https://github.com/privacysandbox/fledge-docs/issues)できます。特に、広告の関連性と測定のオリジントライアルの参加者からの意見をお待ちしております。現在のオンデバイス設計と比較して、この提案をどう思いますか？
- **W3C**: [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)  では業界のユースケースについて、Web Platform Incubation Community Group の [FLEDGE GitHub リポジトリと定期ミーティング](https://github.com/WICG/turtledove/issues/88)では FLEDGE 設計について話し合えます。
- **開発者サポート**: 以下の場所では質問を投稿したり、ディスカッションに参加したりできます。
    - [Privacy Sandbox for the Web Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
    - [プライバシーサンドボックスに関する Android イシュー トラッカー](https://issuetracker.google.com/issues/new?component=1116743&template=1642575)
- **Chrome:** [Chrome の FLEDGE API](/docs/privacy-sandbox/fledge/) についての詳細をご覧ください。
- **Android:** [FLEDGE on Android の設計提案](https://developer.android.com/design-for-safety/privacy-sandbox/fledge)を読み、Android プロジェクトで FLEDGE を[構築する](https://developer.android.com/design-for-safety/privacy-sandbox/guides/fledge)方法について詳しくご覧ください。

---
layout: layouts/blog-post.njk
title: FLEDGE 入札およびオークションサービスの提供状況
authors:
  - priyankachatterjee
hero: image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/J1xttcy4grVMCckg0Feu.png
alt: FLEDGE 入札およびオークションサービスの提供状況
description: >
  これらのサービスは、2023 年に Chrome と Android でテストできるようになります。
date: 2023-02-09
tags:
  - privacy
---

FLEDGE の採用と提供規模が拡大し続けているため、先日、オンデバイスオークションの遅延の改善に役立つ一連の最適化を新たに開始しました。これらの改善に加えて、[入札サービスとオークションサービス](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md)のサポートをウェブプラットフォームに拡大することを予定しています。

入札サービスとオークションサービスは、既存の FLEDGE 設計と統合され、入札計算とスコアリングはクラウドベースの信頼できる実行環境にオフロードされます。これは 2022 年に提案されていたもので、慎重な検討の結果、Chrome と Android の両方で入札サービスとオークションサービスのサポートを提供するように計画されました。

オンデバイスオークションは今後もサポートされますので、特定のユースケースに合致する場合を除いて、入札およびオークションサービスを使用する要件はありません。

入札サービスとオークションサービスのテストと展開にかかる労力を最小限に抑えることを目標としています。

## プライバシーとセキュリティ

入札サービスとオークションサービスは、ユーザーのプライバシーを保護し、アドテックが保護された情報にアクセスできないように、安全なクラウド環境を提供します。

入札サービスとオークションサービスのコードとクラウド構成は、外部関係者が検証し、パブリッククラウドプラットフォーム上の[信頼できる実行環境](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment)（TEE）に展開されるように、GitHub でオープンソース化されるます。このモデルでは、ユーザーのデバイスが広告のターゲティングに必要なデータを暗号化し、[入札およびオークションサービス](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md)のみがこのデータを復号化できるようになっています。暗号化と復号化のための暗号鍵の生成と管理は、独立したサードパーティエンティティが行います。アドテックは復号鍵にアクセスできないため、未加工の暗号化されていないデータにアクセスすることはできません。

{% Aside %}<a>信頼できる実行環境</a>とは、コンピューターで実行されているソフトウェアの正確なバージョンを外部の団体が検証できるようにするためのコンピューターのハードウェアとソフトウェアの特別な構成のことを指します。TEE を使用することで、ソフトウェアがソフトウェアの作成者が意図した通りに（それ以上でもそれ以下でもなく）動作しているかどうかを外部の団体が検証できるようになります。
{% endAside %}

さらに、入札を生成したり、広告のスコアリングを行ったりするアドテック独自のコードは、TEE 内の別の安全な環境でカスタム [V8 エンジン](https://v8.dev/)に分離されたプロセスとして実行されるため、情報をログに記録する方法がなく、ディスクやネットワーク アクセスもありません。 .

## タイムライン

Chrome の入札およびオークションサービスは、2023 年半ばまでにテスト向けに提供され、2023 年末までには規模が拡大されます。これにより、[privacysandbox.com](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) で共有されているサードパーティ Cookie の廃止に関わる Chrome のタイムラインが影響されることはありません。

アドテックは、[関連性と測定の統合オリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)で、FLEDGE API の上に構築されたソリューションの設計とデプロイを継続することをお勧めします。入札サービスとオークションサービスは、これらのソリューションに統合され、ほぼドロップイン置換ソリューションとして拡張される予定です。

[コンポーネントオークション](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md#types-of-auctions)と同じ機能をサポートする設計を含む、[シングルセラーおよびマルチセラーオークション](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#21-initiating-an-on-device-auction)をサポートするための入札およびオークションサービスを計画しています。これらは、2023 年半ばまでにテスト向けに提供され、2023 年末までには規模を拡大したテスト向けに提供されるようになります。

## 貢献とフィードバックの共有

プライバシーサンドボックスは Chrome と Android のコラボレーションであり、ユーザーのプライバシーを保護するテクノロジーを提供し、企業や開発者がインタレストベース広告を活用するために必要なツールを提供します。

これらのサービスとプライバシーサンドボックス提案の詳細については、次をご覧ください。

- **GitHub**:
    - [入札およびオークションサービスの提案](https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md)を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/privacysandbox/fledge-docs/issues)できます。入札およびオークションサービスに関する説明をさらに公開する予定です。
    - [FLEDGE サービスの提案](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md)を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/privacysandbox/fledge-docs/issues)したりできます。
- **W3C**: [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)  では業界のユースケースについて、Web Platform Incubation Community Group の [FLEDGE GitHub リポジトリと定期ミーティング](https://github.com/WICG/turtledove/issues/88)では FLEDGE 設計について話し合えます。
- **開発者サポート**: 以下の場所では質問を投稿したり、ディスカッションに参加したりできます。
    - [Privacy Sandbox for the Web Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
    - [プライバシーサンドボックスに関する Android イシュー トラッカー](https://issuetracker.google.com/issues/new?component=1116743&template=1642575)
- **Chrome:** [Chrome の FLEDGE API](/docs/privacy-sandbox/fledge/)の詳細を確認し、[オリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)に参加してください。
- **Android:** [FLEDGE on Android の設計提案](https://developer.android.com/design-for-safety/privacy-sandbox/fledge)を読み、Android プロジェクトで FLEDGE を[構築する](https://developer.android.com/design-for-safety/privacy-sandbox/guides/fledge)方法について詳しくご覧ください。

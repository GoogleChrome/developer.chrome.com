---
layout: 'layouts/doc-post.njk'
title: アトリビューションレポート
subhead: Cross-Site Identifier (クロスサイト識別子) を使用せずに、ユーザーの操作 ( 広告のクリックや表示など) がコンバージョンにつながるタイミングを測定します。
description: Attribution Reporting API を使用すると、クロスサイト識別子を使用しなくてもユーザーの操作 (広告のクリックや表示など) がコンバージョンにつながるタイミングを測定できます。
date: 2021-05-18
updated: 2021-08-24
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %} Attribution Reporting API は以前まで Conversion Measurement API と呼ばれていました。{% endAside %}

## 実装状況

[ステータスを](/docs/privacy-sandbox/attribution-reporting-introduction/#status)参照してください。

## 用語集

{% Aside %}

[完全なプライバシーサンドボックスの用語集](/docs/privacy-sandbox/glossary/)を参照することもお勧めします。

{% endAside %}

- **アドテックプラットフォーム**：ブランドや代理店がデジタル広告のターゲティング、配信、分析を行えるようにするソフトウェアとツールを提供する企業。
- **広告主**：広告にお金を払っている会社。
- **パブリッシャー**：ウェブサイトに広告を表示する会社。
- **クリックスルーコンバージョン**：広告のクリックに起因するコンバージョン。
- **ビュースルーコンバージョン**：広告のインプレッションに起因するコンバージョン (ユーザーが広告を操作しない場合は後でコンバージョンします)。

## この API について知っておく必要がある人: アドテックプラットフォーム、広告主、パブリッシャーです。

- [デマンドサイドプラットフォーム](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) や[データ管理プラットフォーム](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) などのアドテックプラットフォームは、この API を使用して、現在サードパーティの Cookie に依存している機能をサポートする場合があります。
- 広告またはコンバージョン測定にカスタムコードを使用している広告主およびパブリッシャーは、既存の手法をこの API に置き換えることができます。
- アドテックプラットフォームを使用してコンバージョン測定を行う広告主とサイト運営者は、API を直接使用する必要はありませんが、API を統合する可能性のあるアドテックプラットフォームを使用している場合は、API を理解しておくと良いでしょう。

{% Aside %} 広告に関係のないユースケースがあるかもしれません。ユースケースを共有することに[参加](#engage)しましょう！{% endAside %}

## この API が必要なのはなぜですか？ {: #why-is-this-api-needed }

今日、広告のコンバージョン測定は、[サードパーティの Cookie](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies) を使って行われることが多くなっています。サードパーティの Cookie はサイト間でユーザーを追跡することに使用でき、それが原因でユーザーのプライバシーに影響が出る可能性があるため、ブラウザではサードパーティの Cookie へのアクセスが制限されています。この API を使用すると、サードパーティの Cookie を使用しいなくてもプライバシーを保護しながら測定することができます。

## Attribution Reporting API はどのような機能を持っていますか？

{% Aside %} この API は、オープンにインキュベートおよび開発されています。変更される場合があります。ぜひフィードバックをお寄せください。[参加する方法](#engage)を参照してください。{% endAside %}

Attribution Reporting API を使用すると、リンクされた 2 つのイベント、すなわちパブリッシャーのサイトで発生するイベント (ユーザーによる広告の表示やクリック) およびその後に広告主のサイトで発生するコンバージョンを測定できます。

この API は、クリックスルーコンバージョンアトリビューション測定 (この API の最初の実装で利用可能。現在は、[オリジントライアル中](https://web.dev/conversion-measurement/#browser-support)) とビュースルーアトリビューション測定 ([公開説明を参照](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md)) をサポートしています。

この API は、さまざまなユースケースで使用できる 2 種類のアトリビューションレポートを提供します。

- **イベントレベルのレポート**は、特定の広告クリックまたは表示 (広告側) をコンバージョン側のデータに関連付けます。サイト間でユーザー ID が紐づけられるのを防止してユーザーのプライバシーを保護するために、コンバージョン側のデータは大きく制限されます。またデータには「ノイズ」が含まれます (ごく一部のケースではランダムなデータが送信されます)。プライバシー保護を高める手段として、レポートはすぐには送信されません。
- **集計レポート**は、広告側の特定のイベントに紐づけられていません。こうしたレポートは、イベントレベルのレポートよりも内容が充実した忠実度の高いコンバージョンデータを提供します。暗号化、信頼の分配、および差分プライバシーで用いられるプライバシー技術を組み合わせることにより、サイト間で ID が紐づけられるリスクを軽減するのに役立ちます。両方のレポートタイプは同時に使用でき、お互いを補完し合うものとなっています。この API に設計された他の機能には、[クロスデバイスアトリビューションレポート](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md)や[アプリからウェブへのアトリビューションレポート](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md)が含まれています。

## 参加してフィードバックを共有する {: #engage }

- **オリジントライアル**： [最初のオリジントライアルに登録する (クリックのみ)](/origintrials/#/view_trial/3411476717733150721) か、[最初のデモ (クリックのみ) をご覧ください](https://goo.gle/demo-event-level-conversion-measurement-api) 。
- さらなる機能を提供し、Chrome での実験 (オリジントライアル) に利用できるこの API の次の実装に関する最新情報を把握しておきたい方は、[開発者向けメーリングリスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)にご登録ください。
- **GitHub**: [提案](https://github.com/WICG/conversion-measurement-api/)を読み、[質問をしてディスカッションをフォロー](https://github.com/WICG/conversion-measurement-api/issues)しましょう。
- **W3C**: [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) で業界のユースケースについて話し合い、[Privacy CommunityGroup](https://www.w3.org/community/privacycg/) の WebKit / Safari API に関するディスカッションに参加しましょう。
- **開発者サポート**[：プライバシーサンドボックスの開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、ディスカッションに参加したりしましょう。

## 詳しく見る

- [アトリビューションレポートの手引き (コンバージョン測定)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [API 技術説明者](https://github.com/WICG/conversion-measurement-api/)
- (⚠️廃止) [広告コンバージョンを測定する一層プライベートな方法](https://web.dev/conversion-measurement/)：この API の最初のイテレーションを Web 開発者向けにまとめた概要
- (⚠️廃止) [広告コンバージョンを測定する一層プライベートな方法-動画](https://www.youtube.com/watch?v=jcDfOoWwZcM)：この API の最初のイテレーションのデモ (クリックのみ)
- (⚠️廃止) [Event Conversion Measurement API の使用](https://web.dev/using-conversion-measurement/)：この API の最初のイテレーションを試す方法 (Web開発者向け)
- [プライバシーサンドボックスを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)
- [ChromeDevTools を使用した API のデバッグ](/blog/new-in-devtools-93/#attribution-reporting)

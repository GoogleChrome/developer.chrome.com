---
layout: layouts/blog-post.njk
title: 10 月の User-Agent 削減の変更に備える
subhead: User-Agent 文字列に起きていること、Chrome がこの変更を行う理由、および準備作業について。
description: 10 月、Chrome はユーザーのプライバシーを向上させるために、ブラウザの User-Agent 文字列で利用できる情報を削減するための次のステップに進みます。この変更に伴い、User-Agent 文字列の特定の情報に依存する Web サイトとサービスは何らかの対策を講じる必要がある場合があります。この記事では、この変更の背景情報、Chrome がこの変更を行う理由、およびこれに対応するための準備作業ついて説明します。
hero: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/LSV0dVu9tz6GWlyQ2yKm.png
alt: User-Agent 削減への変更作業のタイムライン。
authors:
  - jney
date: 2022-08-25
tags:
  - privacy
---

10 月、Chrome はユーザーのプライバシーを向上させるために、ブラウザの User-Agent 文字列で利用できる情報を削減するための次のステップに進みます。この変更に伴い、User-Agent 文字列の特定の情報に依存する Web サイトとサービスは何らかの対策を講じる必要がある場合があります。

この記事では、この変更の背景情報、Chrome がこの変更を行う理由、およびこれに対応するための準備作業ついて説明します。

## User-Agent 文字列の変更理由

User-Agent 文字列には、ブラウザとユーザーが使用しているデバイスの種類に関する情報が含まれています。UA 文字列は、ユーザーエクスペリエンスをカスタマイズしたい Web サイトや、ボットと悪意のある攻撃を識別するためにこの情報に依存する詐欺防止プロバイダーにとって[重要な役割](https://www.rfc-editor.org/rfc/rfc1945#section-10.15)を果たしてきました。Chrome は、これらの重要なユースケースを維持することに取り組んでいます。

とは言え、UA 文字列は最新の Web プライバシーの期待を満たしていません。デフォルトでは、User-Agent 文字列から、Web 中のユーザーの識別とトラッキングに使用できる情報を得られます。また、すべての Web サイトやサービスが UA 文字列が提供する情報を必要とするわけではありません。

そのため、Chrome では UA 文字列でデフォルトで共有される情報を削減し、サイトやサービスが必要な情報のみをリクエストできるようにうする User-Agent Client Hints（UA-CH）という[新しい API](https://web.dev/user-agent-client-hints/) を導入しています。この計画を最初に[発表](https://groups.google.com/a/chromium.org/g/blink-dev/c/-2JIRNMWJ7s/m/yHe4tQNLCgAJ)したのは 2020 年 1 月で、 [段階的なロードマップ](https://blog.chromium.org/2021/05/update-on-user-agent-string-reduction.html)を 2021 年 5 月に共有しました。この変更により、UA 文字列の情報の制限において、Chrome と他のブラウザの機能が同調されます。

## 段階的アプローチ

Chrome は 4 月下旬、[マイナー バージョン](https://chromestatus.com/feature/6311349754789888)を筆頭にプライバシー改善を目的とした UA 文字列の一部の除去作業を開始しました。この作業が、私たちが[UA 削減](/docs/privacy-sandbox/user-agent/)と呼んでいるプロジェクトです。

直近のフェーズの一環では、Chrome は 2022 年 10 月下旬から、デスクトップのブラウザの UA 文字列に含まれる OS バージョンやデバイス プラットフォームなどの情報を削減し始める予定となっています。Google の標準のテスト アプローチと同様に、期間を設けて Chrome ユーザーへの段階的なロールアウトを行います。次のフェーズは 2023 年 2 月を予定としており、モバイルの Chrome ブラウザを対象としています。完全な [タイムラインは Chromium.org をご覧ください](https://www.chromium.org/updates/ua-reduction/#proposed-rollout-plan)。

## フィードバックとテスト

企業がこれらの変更による影響を評価し、UA 削減と新しい UA-CH API に関するインサイトを共有していただけるのを楽しみにしています。この種のフィードバックによって、他の人がその学習から集合的に利益を得られるのと同時に、ウェブ上のプライバシーを改善する方法についてオープンな会話を活性化させることができます。

たとえば、ブラジルのデジタル コマース プラットフォームである[VTEX は、UA 削減のテスト結果を公開し](https://github.com/WICG/ua-client-hints/issues/314)、ペイメント ゲートウェイへの影響が見られなかったと報告しました。ブラジルの詐欺防止プロバイダーである ClearSale も同様に結果を公開し、ユーザーのプライバシーを改善しながら独自のユースケースを維持できると[結論付け](https://github.com/WICG/ua-client-hints/issues/315)ました。 Chrome は引き続き関係者と協力して追加のユースケースを評価し、さらなるテストを実施しています。[影響を受ける可能性](https://wicg.github.io/ua-client-hints/#use-cases)のある他の種類の Web サイトやサービスには、分析会社、詐欺防止プロバイダー、および支払い処理業者が含まれます。

User-Agent 文字列を使用している可能性のある Web サイトまたはサービスを運用している場合は、これをテストする絶好の機会です。Chrome は、[User-Agent 削減のオリジントライアル](/blog/user-agent-reduction-origin-trial/)の実施期間を 2022 年 10 月中旬末（M106）まで延長しました。ローカル テストは、`chrome://flags/#reduce-user-agent` を使った機能フラグ経由でも利用できます。

UA-CH API への移行にさらに時間が必要な場合は、 [User-Agent 削減のデプリケーション トライアル](blog/user-agent-reduction-deprecation-trial/)にオプトインできます。これにより、サイトは 2023 年 5 月（M113）まで完全なレガシー UA 文字列を受け取ることができます。

最後に、これらの変更によって、UA 文字列情報を使用してサービスを提供するサードパーティ パートナーに影響があると思われる場合のために、Chrome は、サードパーティ ベンダーが顧客サイトに影響を与えずにテストできる[新しいツール](/docs/privacy-sandbox/user-agent/#prepare-and-test)をいくつか開発しました。

## エンゲージメントとフィードバックの共有

- **オリジントライアル**: [フィードバックをお寄せください](https://github.com/miketaylr/user-agent-reduction/issues)。
- **デモ**: [User-Agent 削減のデモ](https://uar-ot.glitch.me/)をお試しください。
- **GitHub**: [UA-CH の提案](https://github.com/WICG/ua-client-hints)を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/WICG/ua-client-hints/issues)したりできます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

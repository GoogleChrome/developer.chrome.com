---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE: 実験と参加'
subhead: >
  FLEDGE は、リマーケティングとカスタムオーディエンスのユースケースを提供するためのプライバシーサンドボックスの提案であり、サードパーティがサイト間でユーザーの閲覧行動を追跡するために使用できないように設計されています。
description: >
  FLEDGE は、リマーケティングとカスタムオーディエンスのユースケースを提供するためのプライバシーサンドボックスの提案であり、サードパーティがサイト間でユーザーの閲覧行動を追跡するために使用できないように設計されています。 この API を使用すると、ブラウザによるオンデバイスオークションが可能になり、ユーザーが以前にアクセスしたウェブサイトから関連性の高い広告を選択できます。
date: 2022-03-31
updated: 2022-04-19
authors:
  - samdutton
---

## 要点を学ぶ

* 開発者またはソフトウェア エンジニアの方は、この提案に関する詳細な技術リファレンスとして、[FLEDGE API 開発者ガイド](/blog/fledge-api)をご覧ください。

* [FLEDGE API](/docs/privacy-sandbox/fledge) の内容はそれほど技術的でなく、[用語集](/docs/privacy-sandbox/fledge#glossary)も提供されています。


## API を試す

{% Aside 'caution' %}

有効なトライアルトークンが提供されているページであっても、すべてのユーザーにプライバシーサンドボックスの関連性と測定のオリジントライアルを実施する資格があるわけではありません。

「[プライバシーサンドボックス広告の関連性と測定 API をテストする](/blog/privacy-sandbox-unified-origin-trial#eligible-users)」には、その理由が説明されています。また、オリジントライアル機能を使用する前に、それが利用可能かどうかを検出する理由と方法が示されています。

{% endAside %}

1. [デモ](https://fledge-demo.glitch.me)を試す: 基本的な FLEDGE 実装手順が説明されています。 [FLEDGE のデモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードの仕組みと、Chrome DevTools を使用して FLEDGE をデバッグする方法が説明されています。
2. FLEDGE API の実装状況に関する最新情報については、プライバシーサンドボックスの[ステータスページ](/docs/privacy-sandbox/status/#fledge)を確認してください。
3. API を使って実験する:
   * [FLEDGE API 開発者ガイド](/blog/fledge-api#try-fledge)には、プライバシーサンドボックスの関連性と測定のオリジントライアルに参加する方法が説明されています。
   * `chrome://flags/#privacy-sandbox-ads-apis` を有効にするか、コマンドラインから [FLEDGE 機能フラグ](/blog/fledge-api#flags)を指定して Chrome を実行し、単一ユーザーに対して FLEDGE を試してください。
   * [開発者ガイド](/blog/fledge-api)には、API メソッドとパラメーターのリファレンスガイドも記載されています。
   * [FLEDGE デモ](https://fledge-demo.glitch.me)の[ソースコード](https://github.com/JackJey/fledge-demo)には、独自の実験の開始するための出発点が示されています。
   * [FLEDGE ワークレットのデバッグ](/blog/fledge-api/#debug-fledge-worklets)には、Chrome DevTools を使用してFLEDGE 入札とオークションコードをデバッグする方法が説明されています。
   * [開発者ガイド](/blog/fledge-api/#what-features-are-supported-behind-these-feature-flags-in-the-latest-version-of-chrome)には、最新バージョンの Chrome でサポートされている機能について詳しく説明されています。 機能のサポートと制約については、[API Explainer に詳しく説明](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary)されています。

## サポートを受ける

何かが API の実験を妨げていますか？ **あなたの実装**、**デモ**、または**ドキュメント**についてご質問ください。

*  Privacy Sandbox Dev Suppot（プライバシーサンドボックス開発サポート）リポジトリに[新しいイシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)してください。 FLEDGE 用のイシューテンプレートを必ず選択してください。
*  [GitHub のデモコードリポジトリ](https://github.com/JackJey/fledge-demo)にイシューを作成してください。
*  API を使って**ユースケース**を満たす方法に関する一般的な質問については、[提案リポジトリにイシューを提出](https://github.com/WICG/turtledove/issues/new)してください。

Chrome での FLEDGE API の実装に関するバグとイシューの場合:

*  この API について報告されている[既存のイシューをご覧ください](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)。
*  [crbug.com/new](https://crbug.com/new) で新しいイシューを作成してください。

## ディスカッションに参加する

FLEDGE の提案に関するディスカッションは、誰でも参加できます。 特に、API を試している場合は、フィードバックが不可欠です。

### API について話し合う

他のプライバシーサンドボックスの提案と同様に、この API のドキュメントとディスカッションも公開されています。

*  [GitHub で提案の Explainer をお読みください](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)。
*  [既存のイシュー](https://github.com/WICG/turtledove/issues)に関する会話に参加してください。
*  質問、機能の提案、またはユースケースについて議論するには、[新しいイシューを作成](https://github.com/WICG/turtledove/issues/new)してください。
*  [定期的に開催される FLEDGE の会議](https://github.com/WICG/turtledove/issues/88)に参加してください（隔週開催）。 誰でも参加できます。これに参加する前に、必ず [WICG に参加](https://www.w3.org/community/wicg/)してください。 積極的に参加することも、ただ内容を聞くだけでもかまいません！

### 関連するトピックについて話し合う

- [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)（ウェブ広告の改善ビジネスグループ）では、業界のユースケースについて話し合います。

### フィードバックを送信する

* プライバシーサンドボックスの[フィードバックフォーム](/docs/privacy-sandbox/feedback/#feedback-form)を使用して、公開フォーラム外部の Chrome チームに非公開でフィードバックをお送りいただけます。
* その他のタイプのフィードバックを提供する方法と、プライバシーサンドボックス提案のディスカッションに参加する方法については、[Privacy Sandbox Feedback（プライバシーサンドボックスに関するフィードバック）](/docs/privacy-sandbox/feedback/#fledge-api)に説明されています。


## 最新情報を入手する

- API のステータス変更の通知を受け取るには、[開発者向けメーリング リスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)に参加してください。
- API に関する進行中のすべてのディスカッションを細かくフォローするには、[GitHub の提案ページ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)にある **Watch** ボタンをクリックしてください。 これには、GitHub アカウントが必要です。お持ちでない場合は、[GitHub アカウントを作成](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)する必要があります。
- プライバシーサンドボックスに関する総合的な最新情報を入手するには、[Progress in the Privacy Sandbox（プライバシーサンドボックスの進捗状況）](/tags/progress-in-the-privacy-sandbox/)という RSSフィードを購読してください。

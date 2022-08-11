---
layout: 'layouts/doc-post.njk'
title: 'Topics API: 実験と参加'
subhead: >
  ユーザーがアクセスしたサイトを追跡せずに、インタレストベース広告を可能にします。
description: >
  ユーザーがアクセスしたサイトを追跡せずに、インタレストベース広告を可能にするメカニズムの提案。
date: 2022-03-31
updated: 2022-04-19
authors:
  - samdutton
---

## 要点を学ぶ

[Topics API](/docs/privacy-sandbox/topics) には、提案の概要が示されています。


## API を試す

{% Aside 'caution' %}

有効なトライアルトークンが提供されているページであっても、すべてのユーザーにプライバシーサンドボックスの関連性と測定のオリジントライアルを実施する資格があるわけではありません。

「[プライバシーサンドボックス広告の関連性と測定 API をテストする](/blog/privacy-sandbox-unified-origin-trial#eligible-users)」には、その理由が説明されています。また、オリジントライアル機能を使用する前に、それが利用可能かどうかを検出する理由と方法が示されています。

{% endAside %}

1. Topics API の実装状況に関する最新情報については、プライバシーサンドボックスの[ステータスページ](/docs/privacy-sandbox/status/#topics)を確認してください。
2. API を使って実験する:
   * [Topics API](/docs/privacy-sandbox/topics/#origin-trial) には、プライバシーサンドボックスの関連性と測定のオリジントライアルに参加する方法が説明されています。
   * Chrome 101 以降で `chrome://flags/#privacy-sandbox-ads-apis` を有効にするか、コマンドラインから `--enable-features=PrivacySandboxAdsAPIsOverride` [機能フラグ](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)を指定して Chrome を実行し、単一ユーザーに対して Topics を試してください。
   * 「[Topics JavaScript API を使ってトピックにアクセスする](/docs/privacy-sandbox/topics/#access-topics)」には、API を使用して現在のユーザーで観察されたトピックにアクセスする方法を説明する短いコードサンプルが含まれています。
   * 「[Topics API の仕組み](/docs/privacy-sandbox/topics/#what-might-the-topics-javascript-api-look-like)」には、API によって返される値の概要と、機能のサポートと制約に関する詳細情報が示されています。


## サポートを受ける

何かが API の実験を妨げていますか？ **あなたの実装**または**ドキュメント**についてご質問ください。

*  Privacy Sandbox Dev Suppot（プライバシーサンドボックス開発サポート）リポジトリに[新しいイシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)してください。 Topics 用のイシューテンプレートを必ず選択してください。
*  API を使って**ユースケース**を満たす方法に関する一般的な質問については、[提案リポジトリにイシューを提出](https://github.com/jkarlin/topics/issues/new)してください。

Chrome での Topics API の実装に関するバグとイシューの場合:

*  この API について報告されている[既存のイシューをご覧ください](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestCohort)。
*  [crbug.com/new](https://crbug.com/new) で新しいイシューを作成してください。


## ディスカッションに参加する

Topics の提案に関するディスカッションは、誰でも参加できます。 特に、API を試している場合は、フィードバックが不可欠です。

### API について話し合う

他のプライバシーサンドボックスの提案と同様に、この API のドキュメントとディスカッションも公開されています。

* [GitHub で提案の Explainer をお読みください](https://github.com/jkarlin/topics)。
* [既存のイシュー](hhttps://github.com/jkarlin/topics/issues)に関する会話に参加してください。
* 質問、機能の提案、またはユースケースについて議論するには、[新しいイシューを作成](https://github.com/jkarlin/topics/issues/new)してください。

### 関連するトピックについて話し合う

* [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)（ウェブ広告の改善ビジネスグループ）では、業界のユースケースについて話し合います。

### フィードバックを送信する

* プライバシーサンドボックスの[フィードバックフォーム](/docs/privacy-sandbox/feedback/#feedback-form)を使用して、公開フォーラム外部の Chrome チームに非公開でフィードバックをお送りいただけます。
* その他のタイプのフィードバックを提供する方法と、プライバシーサンドボックス提案のディスカッションに参加する方法については、[Privacy Sandbox Feedback（プライバシーサンドボックスに関するフィードバック）](/docs/privacy-sandbox/feedback/#topics-api)に説明されています。


## 最新情報を入手する

* API のステータス変更の通知を受け取るには、[開発者向けメーリング リスト](https://groups.google.com/u/3/a/chromium.org/g/topics-api-announce)に参加してください。
* API に関する進行中のすべてのディスカッションを細かくフォローするには、[GitHub の提案ページ](https://github.com/jkarlin/topics)にある **Watch** ボタンをクリックしてください。 これには、GitHub アカウントが必要です。お持ちでない場合は、[GitHub アカウントを作成](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)する必要があります。
* プライバシーサンドボックスに関する総合的な最新情報を入手するには、[Progress in the Privacy Sandbox（プライバシーサンドボックスの進捗状況）](/tags/progress-in-the-privacy-sandbox/)という RSSフィードを購読してください。

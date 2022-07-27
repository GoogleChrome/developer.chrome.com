---
layout: 'layouts/doc-post.njk'
title: 'FLEDGE: テストとディスカッションへの参加'
subhead: FLEDGE はプライバシー サンドボックスの提案で、リマーケティングとカスタム オーディエンスに利用することができますが、第三者がサイト間のユーザーの閲覧行動を追跡できないように設計されています。
description: FLEDGE はプライバシー サンドボックスの提案で、リマーケティングとカスタム オーディエンスに利用することができますが、第三者がサイト間のユーザーの閲覧行動を追跡できないように設計されています。この API は、ユーザーが以前にアクセスした Web サイトが提供する関連広告を選択するための、ブラウザーによるデバイス上の「オークション」を実現します。
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

## 基礎を学ぶ

- デベロッパーやソフトウェア エンジニアの方は、[FLEDGE API デベロッパーガイド](/blog/fledge-api/)で、この提案の詳細な技術情報を確認できます。

- [FLEDGE API](/docs/privacy-sandbox/fledge/) では概要と[用語集](/docs/privacy-sandbox/fledge#glossary)を参照できます。

## API を試す

1.  [デモ](https://fledge-demo.glitch.me/)をお試しください。基本的な FLEDGE の実装のチュートリアルとなっています。[FLEDGE のデモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードの仕組みと、Chrome > DevTools を使用して FLEDGE > のデバッグを行う方法について説明しています。

2.  FLEDGE API の最新の実装状況については、プライバシーサンドボックスの[ステータスページ](/docs/privacy-sandbox/status/#fledge)をご確認ください。

3.  API を試す方法は次のとおりです。

    - [FLEDGE デモ](https://fledge-demo.glitch.me/)の[ソースコード](https://github.com/JackJey/fledge-demo)からテストを開始できます。

    - [FLEDGE API デベロッパーガイド](/blog/fledge-api/)では、API メソッドとパラメータを参照できます。

    - [FLEDGE ワークレットのデバッグ](/blog/fledge-api/#debug-fledge-worklets)では、Chrome DevTools を使って FLEDGE の入札とオークションのコードをデバッグする方法について説明しています。

    - [デベロッパーガイド](/blog/fledge-api/#what-features-are-supported-behind-these-feature-flags-in-the-latest-version-of-chrome)では、最新バージョンの Chrome でサポートされている機能について説明しています。[API の解説](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary)では、機能のサポートと制約についてさらに詳しく説明しています。

## サポートを受ける

{% Aside %}
API のテストをうまく進められない場合はご連絡ください。
{% endAside %}

**ご自身の実装**、**デモ**、**ドキュメント**について質問がある場合:

- privacy-sandbox-dev-support リポジトリで[新しいイシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)してください。その際、必ず FLEDGE 用のイシュー テンプレートを選択します。

- [GitHub のデモコードリポジトリ](https://github.com/JackJey/fledge-demo)でイシューを作成してください。

- この API を使用した**ユースケース**への対応に関する全般的な質問がある場合は、[提案リポジトリでイシューを作成](https://github.com/WICG/turtledove/issues/new)してください。

Chrome での FLEDGE API の実装に関してバグや問題がある場合:

- [既存のイシューを確認](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)し、この API について報告されているものがないかお探しください。

- 新しいイシューを作成するには [crbug.com/new](https://crbug.com/new) にアクセスしてください。

## ディスカッションに参加する

FLEDGE
の提案に関するディスカッションにはどなたでもご参加いただけます。特にこの
API をテストしている場合は、フィードバックをぜひご提供ください。

### この API について意見を交換する

プライバシー サンドボックスに関する他の提案と同様に、この API
についてもドキュメントを公開し、どなたでもディスカッションに参加できるようにしています。

- [GitHub の提案の解説](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)をご覧ください。

- [既存のイシュー](https://github.com/WICG/turtledove/issues)に関するやり取りに参加できます。

- [新しいイシューを作成](https://github.com/WICG/turtledove/issues/new)できます。質問、機能の提案、ユースケースについてのディスカッションといった用途にご利用ください。

- [FLEDGE > に関する会議](https://github.com/WICG/turtledove/issues/88)が隔週で開催されています。どなたでも参加できますが、まず > [WICG
  に参加](https://www.w3.org/community/wicg/)していることをご確認ください。積極的な発言はもちろん、閲覧のみの参加でもかまいません。

### 関連トピックについて意見を交換する

- [「ウェブ広告ビジネスの改善」グループ](https://www.w3.org/community/web-adv/participants)で、業界のユースケースについて意見を交換できます。

### フィードバックを送信する

- プライバシー サンドボックスの[フィードバックフォーム](/docs/privacy-sandbox/feedback/#feedback-form)を使用して、公開フォーラムではなく Chrome チーム宛に非公開でフィードバックを送信できます。

- [プライバシーサンドボックスのフィードバック](/docs/privacy-sandbox/feedback/#fledge-api)では、他の種類のフィードバックを送信する方法や、プライバシーサンドボックスの提案に関するディスカッションに参加する方法について説明しています。

## 最新情報を入手する

- この API のステータス変更について通知を受け取るには、[デベロッパー向けのメーリングリスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)にご参加ください。

- この API に関する進行中のディスカッションすべてを常にチェックするには、[GitHub の提案ページ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)で **Watch** ボタンをクリックしてください。なお、この操作を行うには GitHub > アカウントが必要です。お持ちでない場合は [GitHub アカウントを作成](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)してください。

- プライバシー > サンドボックス全般に関する最新情報を入手するには、[プライバシーサンドボックスの進捗状況](/tags/progress-in-the-privacy-sandbox/)の > RSS フィードを購読してください。

---
layout: layouts/doc-post.njk
title: 'Protected Audience API: 実験と参加'
subhead: API の実装とテストのクイック ガイド。プライバシーを保護する広告オークションをセットアップし、リマーケティングやカスタム オーディエンスのユースケースに対応します。
description: Protected Audience API は、リマーケティングおよびカスタム オーディエンスのユースケースに対応するためのプライバシー サンドボックス API であり、サードパーティがサイト間でユーザーのブラウジング行動を追跡できないように設計されています。この API は、ブラウザによるオンデバイス オークションを有効にし、ユーザーが以前にアクセスしたウェブサイトに関連する広告を選択します。
date: 2022-03-31
updated: 2022-09-18
authors:
  - samdutton
---

{% Partial 'privacy-sandbox/ot-end.njk' %}

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

## 要点を学ぶ

- 開発者またはソフトウェア エンジニアの場合は、[Protected Audience API 開発者ガイド](/docs/privacy-sandbox/protected-audience-api/)に詳細な技術リファレンスが記載されています。
- [Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)では、プライバシー サンドボックスを初めて使用する広告主およびアドテック向けに、より高度な説明を提供しています。

## API を試す

{% Aside 'caution' %}

機能を使用する前にその機能が利用可能かを判断する方法を学ぶには、[機能の検出](/docs/privacy-sandbox/unified-origin-trial/#feature-detection)をお読みください。

{% endAside %}

1. Protected Audience API の使用方法を学習する。
    - [Protected Audience API 開発者ガイド](/docs/privacy-sandbox/protected-audience-api/)を参照してください。このガイドでは、API メソッドとパラメーターのリファレンスを提供します。
    - [Protected Audience サービス](/blog/fledge-service-overview/)についてお読みください。たとえば、Key/Value サービスは、広告オークション中に売り手と買い手にリアルタイムの情報を提供します。
2. [デモ](https://protected-audience-demo.web.app/)試す。
    - [ソースコード](https://github.com/GoogleChromeLabs/protected-audience-demo)をご覧ください。
    - [Protected Audience デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードがどのように機能するか、FLEDGE のデバッグに Chrome DevTools を使用する方法を学びます。
3. API を使って実験する。
    - `chrome://flags/#privacy-sandbox-ads-apis` を有効にするか、[Protected Audience 機能フラグ](/docs/privacy-sandbox/protected-audience-api/#flags)を使用してコマンドラインから Chrome を実行して、単一ユーザーに対して Protected Audience API を試すことができます。
    - Chrome DevTools を使用して、[Protected Audience ワークレットのトラブルシューティング](/docs/privacy-sandbox/protected-audience-api/troubleshoot/)を行います。保護されたオーディエンスの入札とオークションのコードをデバッグする方法を学びます。
4. Protected Audience API の実装に関する最新情報については、[Protected Audience のステータス](/docs/privacy-sandbox/status/#fledge)をご覧ください。詳細については、[保留中の Protected Audience 機能](/docs/privacy-sandbox/protected-audience-api/feature-status/)を確認してください。

[Protected Audience API の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary) には、機能のサポートと制約に関する詳細が提供されています。

## サポートを受ける

API を実験できない問題が起きていませんか？**実装**、**デモ**、または**ドキュメント**についてご質問ください。

- Privacy Sandbox Dev Support リポジトリで[新しいイシューを提出](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)できます。必ず Protected Audience API のイシュー テンプレートを選択してください。
- [GitHub の demo code リポジトリ](https://github.com/GoogleChromeLabs/protected-audience-demo)でイシューを提起してください。
- API を使って**ユースケース**を実現する方法に関する一般的な質問については、[API リポジトリでイシューを提出](https://github.com/WICG/turtledove/issues/new)してください。

Chrome での Protected Audience API の実装に関するバグとイシューについては、以下の方法を利用できます。

- この API について報告されている[既存のイシューをご覧ください](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)。
- [crbug.com/new](https://crbug.com/new) で新しいイシューを作成してください。

## ディスカッションに参加する

どなたでも、Protected Audience API のディスカッションに参加できます。特に、API を使って実験している場合は、フィードバックが不可欠です。

### API について話し合う

他のプライバシー サンドボックス API と同様に、この API は文書化され、公に議論されています。

- [GitHub にある FLEDGE の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) をお読みください。
- [既存のイシュー](https://github.com/WICG/turtledove/issues)に関する会話に参加してください。
- 質問、機能の提案、またはユースケースについて議論するには、[新しいイシューを作成](https://github.com/WICG/turtledove/issues/new)してください。
- [保護されたオーディエンスの定例会議にご参加](https://github.com/WICG/turtledove/issues/88)ください（隔週）。どなたでも参加できますが、参加するにはまず、[WICG に参加](https://www.w3.org/community/wicg/)してください。積極的に参加することも、聞くだけでも構いません。

### 関連するトピックについて話し合う

[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)（ウェブ広告の改善ビジネスグループ）では、業界のユースケースについて話し合います。

### フィードバックを送信する

[プライバシー サンドボックスのフィードバック](/docs/privacy-sandbox/feedback/#fledge-api)では、他の種類のフィードバックを提供する方法と、プライバシー サンドボックス API についてのディスカッションに参加する方法について説明されています。

## 最新情報を入手する

- API のステータス変更の通知を受け取るには、[開発者向けメーリング リスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)に参加してください。
- API に関する現在進行中のすべてのディスカッションを細かくフォローするには、[GitHub の API ページ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)にある **Watch** ボタンをクリックしてください。これには、[GitHub アカウントを持っているか作成する](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account)必要があります。
- プライバシー サンドボックスに関する総合的な最新情報を入手するには、[Progress in the Privacy Sandbox（プライバシー サンドボックスの進捗状況）](/tags/progress-in-the-privacy-sandbox/)という RSSフィードを購読してください。

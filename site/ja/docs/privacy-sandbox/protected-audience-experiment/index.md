---
layout: layouts/doc-post.njk
title: 'The Protected Audience API: experiment and participate'
subhead: |2-

  API の実装とテストのクイック ガイド。プライバシーを保護する広告オークションをセットアップし、リマーケティングやカスタム オーディエンスのユースケースに対応します。
description: Protected Audience API は、リマーケティングおよびカスタム オーディエンスのユースケースに対応するためのプライバシー サンドボックス API であり、サードパーティがサイト間でユーザーのブラウジング行動を追跡できないように設計されています。この API は、ブラウザによるオンデバイス オークションを有効にし、ユーザーが以前にアクセスしたウェブサイトに関連する広告を選択します。
date: '2022-03-31'
updated: '2022-09-18'
authors:
  - samdutton
---

{% Partial 'privacy-sandbox/ot-end.njk' %}

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

## 要点を学ぶ

- If you're a developer or software engineer, the [Protected Audience API Developer Guide](/docs/privacy-sandbox/protected-audience-api/) provides an in-depth technical reference.
- [Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)では、プライバシー サンドボックスを初めて使用する広告主およびアドテック向けに、より高度な説明を提供しています。

## API を試す

{% Aside 'caution' %}

機能を使用する前にその機能が利用可能かを判断する方法を学ぶには、[機能の検出](/docs/privacy-sandbox/unified-origin-trial/#feature-detection)をお読みください。

{% endAside %}

1. Learn how to use the Protected Audience API.
    - Review the [Protected Audience API Developer Guide](/docs/privacy-sandbox/protected-audience-api/). This guide offers a reference for API methods and parameters.
    - [Protected Audience サービス](/blog/fledge-service-overview/)についてお読みください。たとえば、Key/Value サービスは、広告オークション中に売り手と買い手にリアルタイムの情報を提供します。
2. Try the [demo](https://protected-audience-demo.web.app/).
    - Review the [source code](https://github.com/GoogleChromeLabs/protected-audience-demo).
    - Watch the [Protected Audience demo video](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv) to learn how the demo code works and how to use Chrome DevTools for FLEDGE debugging.
3. Experiment with the API.
    - Try out the Protected Audience API for a single user by enabling `chrome://flags/#privacy-sandbox-ads-apis` or by running Chrome from the command line with [Protected Audience feature flags](/docs/privacy-sandbox/protected-audience-api/#flags).
    - [Troubleshoot Protected Audience worklets](/docs/privacy-sandbox/protected-audience-api/troubleshoot/) with Chrome DevTools. Learn how to debug Protected Audience bidding and auction code.
4. Review the [Protected Audience status](/docs/privacy-sandbox/status/#fledge) for updates on the implementation of the Protected Audience API. Review the [pending Protected Audience capabilities](/docs/privacy-sandbox/protected-audience-api/feature-status/) for more details.

The [Protected Audience API explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#summary) provides more detail about feature support and constraints.

## サポートを受ける

Is anything blocking you from experimenting with the API? Ask a question about **your implementation**, the **demo**, or the **documentation**:

- Privacy Sandbox Dev Support リポジトリで[新しいイシューを提出](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)できます。必ず Protected Audience API のイシュー テンプレートを選択してください。
- Raise an issue on the [demo code repo on GitHub](https://github.com/GoogleChromeLabs/protected-audience-demo).
- For more general questions about how to meet your **use cases** with the API, [file an issue on the API repository](https://github.com/WICG/turtledove/issues/new).

For bugs and issues with the implementation of the Protected Audience API in Chrome:

- この API について報告されている[既存のイシューをご覧ください](https://bugs.chromium.org/p/chromium/issues/list?q=component:Blink%3EInterestGroups)。
- [crbug.com/new](https://crbug.com/new) で新しいイシューを作成してください。

## ディスカッションに参加する

Everyone is welcome to join in discussion of the Protected Audience API. In particular, if you're experimenting with the API, your feedback is essential.

### API について話し合う

他のプライバシー サンドボックス API と同様に、この API は文書化され、公に議論されています。

- Read the [FLEDGE explainer on GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md).
- [既存のイシュー](https://github.com/WICG/turtledove/issues)に関する会話に参加してください。
- 質問、機能の提案、またはユースケースについて議論するには、[新しいイシューを作成](https://github.com/WICG/turtledove/issues/new)してください。
- [Join the scheduled calls for Protected Audience](https://github.com/WICG/turtledove/issues/88) (every second week). Everyone is welcome to join—to participate, first make sure to [join the WICG](https://www.w3.org/community/wicg/). You can actively participate or just listen in!

### 関連するトピックについて話し合う

[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)（ウェブ広告の改善ビジネスグループ）では、業界のユースケースについて話し合います。

### フィードバックを送信する

[プライバシー サンドボックスのフィードバック](/docs/privacy-sandbox/feedback/#fledge-api)では、他の種類のフィードバックを提供する方法と、プライバシー サンドボックス API についてのディスカッションに参加する方法について説明されています。

## 最新情報を入手する

- API のステータス変更の通知を受け取るには、[開発者向けメーリング リスト](https://groups.google.com/u/3/a/chromium.org/g/fledge-api-announce)に参加してください。
- To closely follow all ongoing discussions on the API, click the **Watch** button on the [API page on GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md). This requires you have or [create a GitHub account](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
- プライバシー サンドボックスに関する総合的な最新情報を入手するには、[Progress in the Privacy Sandbox（プライバシー サンドボックスの進捗状況）](/tags/progress-in-the-privacy-sandbox/)という RSSフィードを購読してください。

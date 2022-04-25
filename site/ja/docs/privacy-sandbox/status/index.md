---
layout: 'layouts/doc-post.njk'
title: 実装ステータス
subhead: Privacy Sandbox API の実装ステータス。注意 API ごとに個別のオリジン トライアル期間が複数ある場合があります。
description: Privacy Sandbox API の実装ステータス。注意 API ごとに個別のオリジン トライアル期間が複数ある場合があります。
date: 2021-05-18
updated: 2022-03-31
authors:
  - samdutton
  - alexandrawhite
---

Privacy Sandbox API の実装ステータス。注意 API ごとに個別のオリジン トライアル期間が複数ある場合があります。

## [アトリビューション レポート](/docs/privacy-sandbox/status/#attribution-reporting)

旧称: Conversion Measurement。

- [デモ](https://goo.gle/demo-event-level-conversion-measurement-api)。

- [Chrome プラットフォームのステータス](https://www.chromestatus.com/features/6412002824028160)。

- [Blink のステータス](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=attribution%20reporting)。

- [GitHub](https://github.com/WICG/conversion-measurement-api/): API に関する質問とディスカッションについては、[イシュー](https://github.com/WICG/conversion-measurement-api/issues)をご覧ください。

### [ステータス: 詳細](/docs/privacy-sandbox/status/#status-details)

[ステータス](/docs/privacy-sandbox/attribution-reporting/#status)をご覧ください。

### [すべてのリソース](/docs/privacy-sandbox/status/#all-resources)

- [Attribution Reporting（Conversion Measurement](/docs/privacy-sandbox/attribution-reporting/)

- [Attribution Reporting（Conversion Measurement）の概要](/docs/privacy-sandbox/attribution-reporting-introduction/)

- [API のテクニカル Explainer](https://github.com/WICG/conversion-measurement-api/)

- （廃止）[広告コンバージョンを測定するプライバシーに配慮した方法](https://web.dev/conversion-measurement/): API の最初のバージョンの概要（ウェブ デベロッパー向け）

- （廃止）[広告コンバージョンを測定するプライバシーに配慮した方法 -動画](https://www.youtube.com/watch?v=jcDfOoWwZcM): この API の最初のバージョンのデモ（クリックのみ）

- （廃止）[Event Conversion Measurement API の使用](https://web.dev/using-conversion-measurement/): この API の最初のバージョンを試す方法（ウェブ デベロッパー向け）

- [プライバシーサンドボックスの詳細](https://web.dev/digging-into-the-privacy-sandbox)

## [Trust Tokens](/docs/privacy-sandbox/status/#trust-tokens)

- [現在のオリジントライアル](https://web.dev/origin-trials/) : Chrome 84 から、現在は Chrome 101 まで[ご利用いただけるようになりました](https://groups.google.com/a/chromium.org/g/blink-dev/c/lv2JQjDdyhM/m/lZ-Ri4fcAQAJ)。

- [オリジントライアルに登録](/origintrials/#/view_trial/2479231594867458049)。

- [デモ](https://trust-token-demo.glitch.me/)。

- [Chrome プラットフォームのステータス](https://www.chromestatus.com/feature/5078049450098688)。

- [Blink のステータス](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%25tokens)。

- [GitHub](https://github.com/WICG/trust-token-api): API に関する質問とディスカッションについては、[問題](https://github.com/WICG/trust-token-api/issues)をご覧ください。

- [Chrome DevTools のデバッグ機能](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token)。

- 詳細: [Trust Tokens のスタートガイド](https://web.dev/trust-tokens/)

## [First-Party Sets](/docs/privacy-sandbox/status/#first-party-sets)

- [現在のオリジントライアル](https://web.dev/origin-trials/): Chrome 89 から 93。

- [オリジントライアルに登録](/origintrials/#/view_trial/988540118207823873)。

- [Chrome プラットフォームのステータス](https://chromestatus.com/feature/5640066519007232)。

- [Blink のステータス](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets)。

- [API の提案](https://github.com/privacycg/first-party-sets): API に関する質問やディスカッションについては、問題をご覧ください。

- 詳細:[Chromium プロジェクト: First-Party Sets](https://www.chromium.org/updates/first-party-sets)。

## [User-Agent Client Hints（UA-CH）](/docs/privacy-sandbox/status/#user-agent-client-hints-ua-ch)

- [オリジントライアルとスケジュール](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)

- [オリジントライアルに登録](/origintrials/#/view_trial/-7123568710593282047)

- [デモ](https://uar-ot.glitch.me/)

- [UA-CH の提案](https://github.com/WICG/ua-client-hints)

- [UA 文字列から UA-CH に移行](https://web.dev/migrate-to-ua-ch/)するためのチュートリアル

- 詳細: [User-Agent の削減](/docs/privacy-sandbox/user-agent/)

## [FLoC](/docs/privacy-sandbox/status/#floc)

Topics API に置き換えられました。

- 最初の[オリジントライアル](https://web.dev/origin-trials)は終了しました。最新情報については、[Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) をご覧ください。

- [初期バージョンのデモ](https://floc.glitch.me/)（オリジン トライアルは終了しました）。

- [Blink のステータス](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc)。

- [API の提案](https://github.com/WICG/floc)は、[WICG](https://www.w3.org/community/wicg/)、インタレスト グループと検討中です。

- [GitHub](https://github.com/WICG/floc): API に関する質問とディスカッションについては、[イシュー](https://github.com/WICG/floc/issues)をご覧ください。

- [Chrome プラットフォームのステータス](https://www.chromestatus.com/features/5710139774468096)。

- 詳細: [FLoC とは](https://web.dev/floc/)

## [FLEDGE](/docs/privacy-sandbox/status/#fledge)

[TURTLEDOVE](https://github.com/WICG/turtledove) の子孫。

- [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg)。

- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ)。

- [Blink のステータス](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge)。

- [API の提案](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)は、[WICG](https://www.w3.org/community/wicg/)、インタレスト グループと検討中です。

- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) : API に関する質問とディスカッションについては、[TURTLEDOVE のイシュー](https://github.com/WICG/turtledove/issues)をご覧ください。

## [Topics](/docs/privacy-sandbox/status/#topics)

FLoC に代わるものです。

- [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs)。

- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/59uTw_dxM3M/m/vF9lF9BVAgAJ)。

- [Blink のステータス](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=%22topics%20api%22)。

- [API の提案](https://github.com/jkarlin/topics)は、[WICG](https://www.w3.org/community/wicg/)、インタレスト グループと検討中です。

- [GitHub](https://github.com/jkarlin/topics/blob/main/README.md) : API に関する質問とディスカッションについては、[Topics API のイシュー](https://github.com/jkarlin/topics/issues)をご覧ください。

## [詳細](/docs/privacy-sandbox/status/#find-out-more)

### [Blink、Chromium、Chrome](/docs/privacy-sandbox/status/#blink-chromium-and-chrome)

- [Chrome のリリース スケジュール](https://www.chromestatus.com/features/schedule)

- [Chromium の新機能のリリース プロセス](https://www.chromium.org/blink/launching-features)

- [Intent to Explain: Blink の提供プロセスの説明](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)

- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): 実装ステータスと、Blink（Chromium で使用されるレンダリング エンジン）の機能に関する説明。

- [Chromium のコード検索](https://source.chromium.org/)。

### [オリジン トライアル](/docs/privacy-sandbox/status/#origin-trials)

- [Chrome のオリジン トライアルのスタートガイド](https://web.dev/origin-trials/)

- [サードパーティのオリジン トライアルとは](https://web.dev/third-party-origin-trials)

- [Chrome のオリジン トライアルのトラブルシューティング](/blog/origin-trial-troubleshooting/)

- [オリジン トライアル ガイド（ウェブ デベロッパー向け）](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)

- [オリジン トライアルの解説](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)

- [オリジン トライアルの実行](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)

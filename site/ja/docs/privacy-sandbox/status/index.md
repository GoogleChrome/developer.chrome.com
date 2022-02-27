---
layout: 'layouts/doc-post.njk'
title: 準備はできていますか？
subhead: Privacy Sandbox APIの実装状況。
description: Privacy Sandbox APIの実装状況。最終更新2021-05-18。
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %}APIごとに複数の個別のオリジントライアル期間が存在する場合があります。 {% endAside %}

## アトリビューションレポート

*以前はコンバージョン測定と呼ばれていました。*

- [現在のオリジントライアル](https://web.dev/origin-trials/)：Chrome 86から、Chrome93に[拡張されました](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM)。
- [オリジントライアルに登録](/origintrials/#/view_trial/3411476717733150721)。
- [デモ](https://goo.gle/demo-event-level-conversion-measurement-api)。
- [Chromeプラットフォームでの状況](https://www.chromestatus.com/features/6412002824028160)。
- [Blinkでの状況](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement)。
- [GitHub](https://github.com/WICG/conversion-measurement-api/) ：APIの質問とディスカッションについては[問題](https://github.com/WICG/conversion-measurement-api/issues)を参照してください。

### 状況：詳細

[状況](/docs/privacy-sandbox/attribution-reporting-introduction/#status)を参照してください。

### すべてのリソース

- [アトリビューションレポート（コンバージョン測定）](/docs/privacy-sandbox/attribution-reporting)
- [アトリビューションレポートの概要（コンバージョン測定）](/docs/privacy-sandbox/attribution-reporting-introduction)
- [APIの技術的説明](https://github.com/WICG/conversion-measurement-api/)
- （⚠️廃止）[広告コンバージョンを測定するためのよりプライベートな方法](https://web.dev/conversion-measurement/)：Web開発者向けのこのAPIの最初のバージョンの概要
- （⚠️廃止）[広告コンバージョンを測定するためのよりプライベートな方法 - ビデオ](https://www.youtube.com/watch?v=jcDfOoWwZcM)：このAPIの最初のバージョンのデモ（クリックのみ）
- （⚠️廃止）[イベント変換測定APIの使用](https://web.dev/using-conversion-measurement/)：Web開発者向けのこのAPIの最初のバージョンを試す方法
- [Privacy Sandboxを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)

## Trust Tokens

- [現在のオリジントライアル](https://web.dev/origin-trials/)：Chrome 84から、Chrome94に[拡張され](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ)ました。
- [オリジントライアルに登録](/origintrials/#/view_trial/2479231594867458049)。
- [デモ](https://trust-token-demo.glitch.me/)。
- [Chromeプラットフォームでの状況](https://www.chromestatus.com/feature/5078049450098688)。
- [Blinkで状況](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens)。
- [GitHub](https://github.com/WICG/trust-token-api) ：APIの質問とディスカッションについては[問題](https://github.com/WICG/trust-token-api/issues)を参照してください。
- [ChromeDevToolsの統合](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token)。
- 詳細：[トラストトークンの使用を開始する](https://web.dev/trust-tokens/)

## First-Party Sets

- [現在のオリジントライアル](https://web.dev/origin-trials/)：Chrome89から93。
- [オリジントライアルに登録](/origintrials/#/view_trial/988540118207823873)。
- [Chromeプラットフォームでの状態](https://chromestatus.com/feature/5640066519007232)。
- [Blinkでの状況](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets)。
- [APIの提案](https://github.com/privacycg/first-party-sets)：APIの質問とディスカッションについては[問題](hhttps://github.com/privacycg/first-party-sets/issues)を参照してください。
- 詳細： [Chromiumプロジェクト：First-Party Sets](https://www.chromium.org/updates/first-party-sets)。

## FLoC

- 最初の[オリジントライアル](https://web.dev/origin-trials)は現在終了しています。更新については、[Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs)を参照してください。
- [初期バージョンのデモ](https://floc.glitch.me/)（オリジントライアルは終了しました）。
- [Blinkでの状況](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc)。
- [APIの提案](https://github.com/WICG/floc)は、 [WICG](https://www.w3.org/community/wicg/)および利害関係者グループと議論中です。
- [GitHub](https://github.com/WICG/floc) ：APIの質問とディスカッションについては[問題](https://github.com/WICG/floc/issues)を参照してください。
- [Chromeプラットフォームでの状況](https://www.chromestatus.com/features/5710139774468096)。
- 詳細： [FLoCとは？](https://web.dev/floc/)

## FLEDGE

[TURTLEDOVEの](https://github.com/WICG/turtledove)から生まれたAPI。

- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ)。
- [Blinkで状況](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge)。
- [APIの提案](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)は、 [WICG](https://www.w3.org/community/wicg/)および利害関係者グループと議論中です。
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) ：APIの質問とディスカッションについて[は、TURTLEDOVEの問題](https://github.com/WICG/turtledove/issues)を参照してください。

<br>

---

## 詳細はこちら

### Blink、Chromium 、Chrome

- [Chromeのリリーススケジュール](https://www.chromestatus.com/features/schedule)
- [Chromiumで新機能をリリースするためのプロセス](https://www.chromium.org/blink/launching-features)
- [説明の意図：Blinkリリースプロセスの謎を解き明かす](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/) ：Chromiumで使用されるレンダリングエンジンであるBlinkの実装状況と機能の説明。
- [Chromiumコード検索](https://source.chromium.org/)。

### オリジントライアル

- [Chromeのオリジントライアルの紹介](https://web.dev/origin-trials/)
- [サードパーティのオリジントライアルとは？](https://web.dev/third-party-origin-trials)
- [Chromeのオリジントライアルのトラブルシューティング](/blog/origin-trial-troubleshooting/)
- [Web開発者向けのオリジントライアルガイド](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [オリジントライアルの説明](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [オリジントライアルの実行](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)

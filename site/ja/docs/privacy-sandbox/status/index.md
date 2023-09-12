---
layout: layouts/doc-post.njk
title: API のステータスと機能のリリース
subhead: Chrome プラットフォームのステータス、リソース、機能リリースのタイムラインをご覧ください。
description: Chrome プラットフォームのステータス、リソース、機能リリースのタイムラインをご覧ください。
date: 2021-05-18
updated: 2023-03-16
authors:
  - alexandrawhite
---

プライバシー サンドボックスの各提案は、開発プロセスのさまざまな段階にあります。それぞれの提案には、予想される可用性が異なる機能が個別に存在します。

提案または API に関する最新情報を確認するには、それぞれの概要ドキュメントと[プライバシー サンドボックス タイムライン](https://privacysandbox.com/open-web/)にアクセスしてください。

## アトリビューション レポート

{% Partial 'privacy-sandbox/timeline/attribution-reporting.njk' %}

{% Partial 'privacy-sandbox/timeline/attribution-reporting-features.njk' %}

## バウンストラッキング対策

{% Partial 'privacy-sandbox/timeline/bounce-tracking.njk' %}

## CHIPS

{% Partial 'privacy-sandbox/timeline/chips.njk' %}

## <a>Federated Credential Management（FedCM）</a>

{% Partial 'privacy-sandbox/timeline/fedcm.njk' %}

## Fenced Frames

{% Partial 'privacy-sandbox/timeline/fenced-frames.njk' %}

{% Partial 'privacy-sandbox/timeline/fenced-frames-features.njk' %}

## First-Party Sets

{% Partial 'privacy-sandbox/timeline/first-party-sets.njk' %}

## FLEDGE

[TURTLEDOVE](https://github.com/WICG/turtledove) の子孫。

{% Partial 'privacy-sandbox/timeline/fledge.njk' %}

{% Partial 'privacy-sandbox/timeline/fledge-features.njk' %}

## IP 保護

{% Partial 'privacy-sandbox/timeline/ip-protection.njk' %}

## Private Aggregation API

{% Partial 'privacy-sandbox/timeline/private-aggregation.njk' %}

## プライベートステートトークン

{% Partial 'privacy-sandbox/timeline/private-state-tokens.njk' %}

## Topics API

{% Partial 'privacy-sandbox/timeline/topics.njk' %}

## ユーザーエージェントの削減と User-Agent Client Hints (UA-CH)

ブラウザが提供するデータを制限して機密情報が含まれないようにし、フィンガープリンティングを削減します。

{% Partial 'privacy-sandbox/timeline/ua-ch.njk' %}

## 共有ストレージ

{% Partial 'privacy-sandbox/timeline/shared-storage.njk' %}

{% Partial 'privacy-sandbox/timeline/shared-storage-features.njk' %}

{% Details %} {% DetailsSummary %}

## 終了した提案

{% endDetailsSummary %}

### FLoC

[Topics API](#topics) に置き換えられました。

- [Chrome プラットフォームのステータス](https://www.chromestatus.com/features/5710139774468096)。
- 最初の[オリジントライアル](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs)は終了しました。最新情報については、<a>Intent to Experiment</a> をご覧ください。
- [Blink のステータス](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc)。
- [API の提案](https://github.com/WICG/floc)は、[WICG](https://www.w3.org/community/wicg/)、インタレストグループと検討されました。
- [GitHub](https://github.com/WICG/floc): API に関する質問とディスカッションについては、[イシュー](https://github.com/WICG/floc/issues)をご覧ください。

{% endDetails %}

---

## 詳細について

### Blink、Chromium、Chrome

- [Chrome リリースチャンネルとは？](/docs/web-platform/chrome-release-channels/)
- [Chrome のリリース スケジュール](https://www.chromestatus.com/features/schedule)
- [Chromium の新機能のリリース プロセス](https://www.chromium.org/blink/launching-features)
- [Intent to Explain: Blink の提供プロセスの説明](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): 実装ステータスと、Blink（Chromium で使用されるレンダリング エンジン）の機能に関する説明。
- [Chromium のコード検索](https://source.chromium.org/)
- [Chrome フラグとは？](/docs/web-platform/chrome-flags/)

### オリジントライアル

- [Chrome のオリジントライアルを開始する](/docs/web-platform/origin-trials/)
- [サードパーティオリジントライアル](/docs/web-platform/third-party-origin-trials/)
- [オリジントライアルのトラブルシューティング](/docs/web-platform/origin-trial-troubleshooting/)

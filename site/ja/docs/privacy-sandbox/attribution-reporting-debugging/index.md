---
title: アトリビューションレポートのデバッグ
description: Attribution Reporting API をテストし、測定結果の誤差について理解します。
subhead: このプライバシーサンドボックス API の実装のデバッグを行います。
layout: layouts/collection-in-docs.njk
collection_tag: ara-debugging
articles:
  - url: "/docs/privacy-sandbox/attribution-reporting-debugging/part-1/"
  - url: "/docs/privacy-sandbox/attribution-reporting-debugging/part-2/"
  - url: "/docs/privacy-sandbox/attribution-reporting-debugging/part-3/"
---

サードパーティ Cookie は、サイト全体でユーザーを追跡してユーザーのプライバシーを侵害する目的で使用される可能性があるため、ブラウザーはサードパーティ Cookie へのアクセスを制限しています。[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) を使用することで、サードパーティ Cookie を使用せずにプライバシーを保護しながらこれらの測定を実行できるようになります。テスト担当者は、デバッグレポートを使用して Cookie ベースの実装とアトリビューションレポートとの間の測定結果の誤差を理解することができます。

---
layout: layouts/doc-post.njk
title: デバッグレポートをセットアップする
subhead: アトリビューション レポートのデバッグに関するパート 2/3。デバッグレポートをセットアップします。
description: アトリビューション レポートのデバッグに関するパート 2/3。デバッグレポートをセットアップします。
date: 2022-12-13
authors:
  - maudn
  - alexandrawhite
---

{% Partial 'privacy-sandbox/ara-debugging-series-intro.njk' %}

{% Details %} {% DetailsSummary 'h2' %}

## 用語集 {: #glossary}

{% endDetailsSummary %}

{% Partial 'privacy-sandbox/ara-debugging-glossary.njk' %}

{% endDetails %}

## 実装に関する質問がございますか？

デバッグレポートのセットアップ中にイシューが発生した場合は、[開発者サポートリポジトリでイシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues)してください。トラブルシューティングをお手伝いします。

## デバッグレポートのセットアップ準備

デバッグレポートをセットアップする前に、次の手順を実行します。

{% Details %} {% DetailsSummary 'h3' %}

API 統合のベストプラクティスの適用を確認する

{% endDetailsSummary %}

- コードが[機能検出の](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.7yomtnn3mrs4)背後でゲートされていることを確認してください。
- （テスト段階では必要ありません: [Permissions-Policy](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.ju0kr1sopvhz)を設定したことを確認してください）

{% Aside 'gotchas' %} Permissions-Policy の要件はテスト用に[緩和](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.91d3lqdesjt)されていますが、サイト運営者または広告主は Permissions-Policy を介して Attribution Reporting API を明示的に無効にすることを引き続き決定できます。この場合、ソースもトリガーも記録できません（したがって、レポートを生成または送信することはできません）。 {% endAside %}

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

基本的な統合のイシューを修正する {: #fix-fundament-issues}

{% endDetailsSummary %}

デバッグレポートは損失を大規模に検出して分析するのに役立ちますが、一部の統合のイシューはローカルで検出できます。ソースとトリガーヘッダーの構成ミスのイシュー、JSON 解析のイシュー、安全でないコンテキスト（HTTPS 以外）、および API の機能を妨げるその他のイシューは、[DevTools の **Issues** タブ](/docs/devtools/issues/)に表示されます。

{% Aside %} これらのイシューにより、API が機能しなくなるため、詳細デバッグレポートは生成されません。成功デバッグレポートがない場合のみ、これらのイシューのいくつかが発生している可能性があります。詳細については、[パート 3: デバッグのクックブック](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/)をご覧ください。 {% endAside %}

DevTools のイシューにはさまざまな種類があります。`invalid header` イシューが発生した場合は、ヘッダーを[ヘッダー検証ツール](https://wicg.github.io/attribution-reporting-api/validate-headers)にコピーします。こうすることで、イシューの原因となっているフィールドを特定して修正することができます。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TafeqOxgeSrRWhakTQmh.png", alt="スクリーンショット: ヘッダー検証ツール", width="800", height="399", class="screenshot screenshot--filled" %}

{% endDetails %}

## デバッグレポートのセットアップ: 成功レポートと詳細レポートに共通の手順

{% Details %} {% DetailsSummary 'h3' %}

ステップ 1: デバッグ Cookie をセットアップする {: #debug-cookie}

{% endDetailsSummary %}

[レポート作成元](#glossary)に次の Cookie を設定します。

```http
Set-Cookie: ar_debug=1; SameSite=None; Secure; Path=/; HttpOnly
```

ブラウザは、ソースとトリガーの両方の登録でこの Cookie の有無を確認します。両方の時点で Cookie が存在する場合にのみ、成功のデバッグレポートが生成されます。

**[デモ コード: デバッグ Cookie](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L91)**

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

ステップ 2: デバッグキーを設定する

{% endDetailsSummary %}

各デバッグ キーは、基数 10 の文字列としてフォーマットされた 64 ビットの符号なし整数である必要があります。各デバッグキーを一意の ID にします。

- ソース側のデバッグキーを、デバッグに関連すると思われる追加のソース時間情報にマッピングします。
- トリガー側のデバッグ キーを、デバッグに関連すると思われる追加のトリガー時間情報にマッピングします。

たとえば、次のデバッグキーを設定できます。

- Cookie ID + ソースデバッグキーとしてのソースタイムスタンプ（および Cookie ベースのシステムで同じタイムスタンプを取得します）
- Cookie ID + トリガーデバッグキーとしてのトリガータイムスタンプ（および Cookie ベースのシステムで同じタイムスタンプを取得します）

**これにより、Cookie ベースのコンバージョン情報を使用して、対応するデバッグレポートまたはアトリビューション レポートを検索できます。**詳細については、[パート 3: クックブック](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/)をご覧ください。

ソース側のデバッグキーを `source_event_id` とは異なるものにして、同じソースイベント ID を持つ個々のレポートを区別できるようにします。

```http
Attribution-Reporting-Register-Source:
{
// … Usual fields for Attribution-Reporting-Register-Source
"debug_key":"647775351539539"
}
```

```http
Attribution-Reporting-Register-Trigger:
{
// … Usual fields for Attribution-Reporting-Register-Trigger
"debug_key":"938321351539743"
}
```

**[デモ コード: ソースデバッグキー](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L160)****[デモ コード: トリガーデバッグキー](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L278)**

{% Aside %} デモコードでは、両方のデバッグキーに従来の測定サードパーティ Cookie の値を指定しています。実際のシステムでは、上記のデバッグキーの例で提案されているように、各キーを一意の ID にして、デバッグに役立つと思われる追加のソース時間情報にマッピングします。

{% endAside %}

{% endDetails %}

## 成功デバッグレポートをセットアップする

{% Aside %} [デモ](https://goo.gle/attribution-reporting-demo)を試して、ブラウザで成功デバッグレポートを生成し、プレビューしてください。対応する[コード](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting)を確認してください。 {% endAside %}

このセクションのサンプルコードは、イベントレベルのレポートと集計可能なレポートの両方の成功デバッグレポートを生成します。イベント レベルのレポートと集計可能なレポートは、同じデバッグキーを使用します。

{% Details %} {% DetailsSummary 'h3' %}

ステップ 3: 成功デバッグレポートを収集するエンドポイントをセットアップする

{% endDetailsSummary %}

デバッグレポートを収集するエンドポイントをセットアップします。このエンドポイントは、パスに `debug` 文字列が追加されたメインのアトリビューションエンドポイントに似ている必要があります。

- **イベントレベル**の成功デバッグレポートのエンドポイント: `https://adtech.example/.well-known/attribution-reporting/debug/report-event-attribution`
- **集計可能**な成功デバッグレポートのエンドポイント: `https://adtech.example/.well-known/attribution-reporting/debug/report-aggregate-attribution`

アトリビューションがトリガーされると、ブラウザは `POST` リクエストを介してこのエンドポイントにデバッグレポートをすぐに送信します。着信成功デバッグレポートを処理するサーバーコードは次のようになります（ここではノードエンドポイントです）。

```javascript
// Handle incoming event-Level Success Debug reports
adtech.post(
  '/.well-known/attribution-reporting/debug/report-event-attribution',
  async (req, res) => {
    // Debug report is in req.body
    res.sendStatus(200);
  }
);

// Handle incoming aggregatable Success Debug reports
adtech.post(
  '/.well-known/attribution-reporting/debug/report-aggregate-attribution',
  async (req, res) => {
    // Debug report is in req.body
    res.sendStatus(200);
  }
);
```

**[デモ コード: イベントレベルデバッグレポートのエンドポイント](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L318)**

**[デモ コード: 集約可能なデバッグレポートのエンドポイント](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/763079d962dca0e9cf3d8e68dc18b57784fb98d7/attribution-reporting/functions/apps/adtech.js#L353)**

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

ステップ 4: このセットアップで成功デバッグレポートが生成されることを確認する

{% endDetailsSummary %}

- ブラウザで `chrome://attribution-internals` を開きます。
- **Event-Level Reports** タブと **Aggregatable Reports** タブの両方で、**Show Debug Reports** チェックボックスがオンになっていることを確認します。
- アトリビューション レポートを実装したサイトを開きます。アトリビューション レポートの生成に使用する手順を完了します。これらの同じ手順により、成功デバッグレポートが生成されます。
- `chrome://attribution-internals` で以下を確認します。
    - アトリビューション レポートが正しく生成されていることを確認します。
    - **Event-Level Reports** タブと **Aggregatable Reports** タブで、成功デバッグレポートも生成されていることを確認します。リスト内の青い `debug` パスでそれらを認識できます。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/n3BCxJZ9h915NJIrMdsi.png", alt="スクリーンショット: Attribution internals", width="800", height="484", class="screenshot screenshot--filled" %}

- サーバーで、エンドポイントがこれらの成功デバッグレポートをすぐに受信することを確認します。イベントレベルと集計可能な成功デバッグレポートの両方を確認してください。

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/LWwuTRFZIIbY4g5aGYmI.png", alt="スクリーンショット: レポート元のサーバーログ", width="800", height="381", class="screenshot screenshot--filled" %}

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

ステップ 5: 成功デバッグレポートを観察する {: #success-reports-examples}

{% endDetailsSummary %}

成功デバッグレポートはアトリビューション レポートと同じで、ソース側とトリガー側の両方のデバッグキーが含まれています。

<web-tabs>
  <web-tab title="Example event-level success debug report"></web-tab></web-tabs>

```json
{
  "attribution_destination": "https://advertiser.example",
  "randomized_trigger_rate": 0.0000025,
  "report_id": "7d76ef29-d59e-4954-9fff-d97a743b4715",
  "source_debug_key": "647775351539539",
  "source_event_id": "760938763735530",
  "source_type": "event",
  "trigger_data": "0",
  "trigger_debug_key": "156477391437535"
}
```

  
  <web-tab title="Example aggregatable success debug report"></web-tab>

```json
{
  "aggregation_service_payloads": [
    {
      "debug_cleartext_payload": "omRkYXRhgqJldmFsdWVEAACAAGZidWNrZXRQPPhnkD+7c+wm1RjAlowp3KJldmFsdWVEAAARMGZidWNrZXRQJFJl9DLxbnMm1RjAlowp3GlvcGVyYXRpb25paGlzdG9ncmFt",
      "key_id": "d5f32b96-abd5-4ee5-ae23-26490d834012",
      "payload": "0s9mYVIuznK4WRV/t7uHKquHPYCpAN9mZHsUGNiYd2G/9cg87Y0IjlmZkEtiJghMT7rmg3GtWVPWTJU5MvtScK3HK3qR2W8CVDmKRAhqqlz1kPZfdGUB4NsXGyVCy2UWapklE/r7pmRDDP48b4sQTyDMFExQGUTE56M/8WFVQ0qkc7UMoLI/uwh2KeIweQCEKTzw"
    }
  ],
  "shared_info": "{\"api\":\"attribution-reporting\",\"attribution_destination\":\"https://advertiser.example\",\"debug_mode\":\"enabled\",\"report_id\":\"4a04f0ff-91e7-4ef6-9fcc-07d000c20495\",\"reporting_origin\":\"https://adtech.example\",\"scheduled_report_time\":\"1669888617\",\"source_registration_time\":\"1669852800\",\"version\":\"0.1\"}",
  "source_debug_key": "647775351539539",
  "trigger_debug_key": "156477391437535"
}
```

  



{% endDetails %}

## 詳細デバッグレポートをセットアップする

{% Aside %} [デモ](https://goo.gle/attribution-reporting-demo)を試して、ブラウザで詳細デバッグレポートを生成し、プレビューしてください。対応する[コード](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting)を確認してください。 {% endAside %}

{% Details %} {% DetailsSummary 'h3' %}

ステップ 3: ソースヘッダーとトリガーヘッダーで詳細デバッグを有効にする

{% endDetailsSummary %}

`Attribution-Reporting-Register-Source` と `Attribution-Reporting-Register-Trigger` の両方で `debug_reporting` を `true` に設定します。

```http
Attribution-Reporting-Register-Source:
{
// … Usual fields for Attribution-Reporting-Register-Source
"debug_key":"938321351539743",
"debug_reporting": true // defaults to false if not present
}

Attribution-Reporting-Register-Trigger:
{
// … Usual fields for Attribution-Reporting-Register-Trigger
"debug_key":"938321351539743",
"debug_reporting": true // defaults to false if not present
}
```

**[デモ コード: ソースヘッダー](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/main/attribution-reporting/functions/apps/adtech.js#L168)**

**[デモ コード: トリガーヘッダー](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/main/attribution-reporting/functions/apps/adtech.js#L280)**

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

ステップ 4: 詳細デバッグレポートを収集するエンドポイントをセットアップする

{% endDetailsSummary %}

デバッグレポートを収集するエンドポイントをセットアップします。このエンドポイントは、パスに `debug/verbose` 文字列が追加されたメインのアトリビューションエンドポイントに似ている必要があります。

```text
https://adtech.example/.well-known/attribution-reporting/debug/verbose
```

詳細デバッグレポートが生成されると、つまりソースまたはトリガーが登録されていない場合、ブラウザは `POST` リクエストを介して詳細デバッグレポートをこのエンドポイントにすぐに送信します。着信の詳細デバッグレポートを処理するサーバーコードは次のようになります（ここではノードエンドポイントです）。

```javascript
// Handle incoming verbose debug reports
adtech.post(
  '/.well-known/attribution-reporting/debug/verbose',
  async (req, res) => {
    // List of verbose debug reports is in req.body
    res.sendStatus(200);
  }
);
```

成功デバッグレポートとは異なり、詳細レポートのエンドポイントは 1 つしかありません。イベントレベルおよび集計レポートに関連する詳細レポートは、すべて同じエンドポイントに送信されます。

**[デモ コード: 詳細デバッグレポートのエンドポイント](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/d6e4c38664b6631657f81e6bdd13d0480be3c07d/attribution-reporting/functions/apps/adtech.js#L373)**

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

ステップ 5: このセットアップで詳細デバッグレポートが生成されることを確認する

{% endDetailsSummary %}

詳細デバッグレポートにはさまざまなタイプがありますが、**1 タイプ**の詳細デバッグレポートだけで詳細なデバッグのセットアップを確認すれば十分です。すべての詳細デバッグレポートが同じ構成を使用し、同じエンドポイントに送信されるため、この 1 タイプの詳細デバッグレポートが正しく生成され、受信されれば、すべてのタイプの詳細デバッグレポートも正しく生成され、受信されることになります。

{% Aside 'gotchas' %} 簡単にテストできる詳細デバッグレポートを選びます。`trigger-no-matching-source` は、単に変換するだけで生成できるため、良い候補と言えます。トリガーイベントに関連する詳細レポートが、より適している傾向があります。ソースイベントに関連する詳細レポートタイプは、意図的に生成するのが面倒です。 {% endAside %}

1. ブラウザで `chrome://attribution-internals` を開きます。
2. アトリビューション レポートでセットアップされたサイトでアトリビューション（コンバージョン）をトリガーします。このコンバージョンの前に広告エンゲージメント（インプレッションまたはクリック）がなかったことを考えると、`trigger-no-matching-source` タイプの詳細デバッグレポートが生成されることが予想されます。
3. `chrome://attribution-internals` で、**Verbose debug reports** タブを開き、`trigger-no-matching-source` タイプの詳細デバッグレポートが生成されていることを確認します。
4. サーバーで、エンドポイントがこの詳細デバッグレポートをすぐに受信したことを確認します。

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %}

ステップ 6: 成功デバッグレポートを観察する {: #success-reports-examples}

{% endDetailsSummary %}

トリガー時に生成される詳細デバッグレポートには、ソース側とトリガー側の両方のデバッグキーが含まれます（トリガーに一致するソースがある場合）。ソース時に生成される詳細デバッグレポートには、ソース側のデバッグキーが含まれます。

ブラウザから送信される、詳細デバッグレポートを含むリクエストの例:

```json
[
  {
    "body": {
      "attribution_destination": "http://arapi-advertiser.localhost",
      "randomized_trigger_rate": 0.0000025,
      "report_id": "92b7f4fd-b157-4925-999e-aad6361de759",
      "source_debug_key": "282273499788483",
      "source_event_id": "480041649210491",
      "source_type": "event",
      "trigger_data": "1",
      "trigger_debug_key": "282273499788483"
    },
    "type": "trigger-event-low-priority"
  },
  {
    "body": {
      "attribution_destination": "http://arapi-advertiser.localhost",
      "limit": "65536",
      "source_debug_key": "282273499788483",
      "source_event_id": "480041649210491",
      "source_site": "http://arapi-publisher.localhost",
      "trigger_debug_key": "282273499788483"
    },
    "type": "trigger-aggregate-insufficient-budget"
  }
]
```

{% Aside 'gotchas' %} 成功デバッグリクエストとは異なり、詳細なデバッグリクエストには詳細レポートの**リスト（配列）**が本文に含まれます。 {% endAside %}

詳細レポートごとに、次のフィールドが含まれています。

`Type`: レポートが生成された原因。すべての詳細レポートのタイプと、それぞれのタイプに応じて実行するアクションについては、[パート 3: デバッグのクックブック](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/)の詳細レポートのリファレンスをご覧ください。

`Body`: レポートの本文。レポートのタイプによって異なります。[パート 3: デバッグのクックブック](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/)の詳細レポートのリファレンスをご覧ください。

リクエストの本文には、少なくとも 1 つ、最大で 2 つの詳細レポートが含まれます。

- 障害がイベントレベルのレポートにのみ影響する場合（または、集計可能なレポートにのみ影響する場合）は、1 つの詳細レポート。ソースまたはトリガーの登録失敗の理由は 1 つだけです。したがって、失敗ごと、およびレポートタイプ（イベントレベルまたは集計可能）ごとに 1 つの詳細レポートを生成できます。
- 失敗がイベントレベルレポートと集計可能レポートの両方に影響する場合は、2 つの詳細レポート。ただし例外があり、イベントレベルレポートと集計可能レポートの障害の理由が同じである場合、詳細レポートは 1 つしか生成されません（例: `trigger-no-matching-source`）

{% endDetails %}

## 次の記事

[パート 3: デバッグのクックブック](/docs/privacy-sandbox/attribution-reporting-debugging/part-3/)

{% Aside 'update' %} M115 ベータ版と安定版リリースでは Private Aggregation API に次の重大な変更が含まれます。

1. `sendHistogramReport()` 関数の名前が `contributeToHistogram()` に変更されました。
2. `reportContributionForEvent()` 関数の名前が `contributeToHistogramOnEvent()` に変更されました。
3. `enableDebugMode()` の `debug_key` パラメーターの名前が `debugKey` に変更されました。
4. レポートエンドポイントの名前が `/.well-known/private-aggregation/report-fledge` から `/.well-known/private-aggregation/report-protected-audience` に変更されました。
5. 集計可能レポートの `api` プロパティ値の名前が `fledge` から `protected-audience` に変更されました。

Private Aggregation API が今後も Protected Audience API と連携して動作するように、コードを更新する必要があります。古い Chrome インスタンスのユーザーは既存のエンドポイントにレポートを送信できるままになるため、すべてのレポートを収集できるように下位互換性を確保することが求められます。`if ('contributeToHistogram' in privateAggregation))` により、機能検出を使用することをお勧めします。

これらの変更は、Canary および Dev チャンネルで、5 月 22 日月曜日以降のテストで可能になります。{% endAside %}

- [Private Aggregation API](https://github.com/patcg-individual-drafts/private-aggregation-api/) の[公開ディスカッション](https://github.com/patcg-individual-drafts/private-aggregation-api/issues)が開始しました。
- Private Aggregation API は[プライバシーサンドボックス統合オリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)でテストできます。
    - `sendHistogramReport()` 関数は次のリリースに含まれます。
        - Chrome Canary、Dev、およびベータ版 M107+
        - Chrome 安定版 M112+
    - `reportContributionForEvent()` 関数は次のリリースに含まれます。
        - Chrome Canary および Dev M113+
    - 共有ストレージ経由でレポート検証用のコンテキスト ID を指定するのは、以下のリリースで行えます。
        - Chrome Canary、Dev、ベータ版、安定版 M114+
    - 最新のトラフィック割り当てを確認するには、[プライバシー サンドボックスのオリジントライアル](/docs/privacy-sandbox/unified-origin-trial/#status)ページをご覧ください。
- API の現在のステージを確認するには、[Chrome プラットフォームのステータスページ](https://chromestatus.com/feature/5743412790689792)をご覧ください。

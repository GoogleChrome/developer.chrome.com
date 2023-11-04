---
layout: layouts/doc-post.njk
title: デバッグのクックブック
subhead: アトリビューション レポートのデバッグに関するパート 3/3。デバッグレポートの使用方法について説明します。
description: アトリビューション レポートのデバッグに関するパート 3/3。デバッグレポートの使用方法について説明します。
date: 2022-12-13
updated: 2023-03-02
authors:
  - maudn
  - alexandrawhite
---

{% Partial 'privacy-sandbox/ara-debugging-series-intro.njk' %}

このクックブックでは、[パート 1: デバッグレポートの概要](/docs/privacy-sandbox/attribution-reporting-debugging/part-1/)で説明したさまざまなユースケースでデバッグレポートを使用する方法について説明します。

{% Details %} {% DetailsSummary 'h2' %}

## 用語集 {: #glossary}

{% endDetailsSummary %}

{% Partial 'privacy-sandbox/ara-debugging-glossary.njk' %}

{% endDetails %}

## 使用方法: 統合をリアルタイムで確認する

1. **成功デバッグレポート**を生成するようにシステムをセットアップします。方法については、[パート 2: デバッグレポートのセットアップ](/docs/privacy-sandbox/attribution-reporting-debugging/part-2/)をご覧ください。
2. Attribution Reporting コードをデプロイするときは必ず、エンドポイントで成功デバッグレポートを受信しているかどうかをリアルタイムで確認します。受信していれば、アトリビューション レポートのセットアップが機能していることになります。
3. 成功デバッグレポートは、変換が行われたときにのみ送信されますが、代わりに、変換に関係なく統合が適切にセットアップされていることを確認したい場合があります。つまり、ソースが正常に登録されていることを確認したい場合です。これには、*ソース登録成功*の**詳細デバッグレポート**を利用できます。セットアップ方法については、「[パート 2: デバッグ レポートのセットアップ](/docs/privacy-sandbox/attribution-reporting-debugging/part-2/)」をご覧ください。

{% Aside 'caution' %} これは基本的なチェックにすぎません。実装にはまだバグが含まれている可能性があり、他の要因によって測定データが失われる可能性があります。より高度なチェックについては、他のユースケースを確認してください。 {% endAside %}

## 使用方法: 損失を分析し、統合のトラブルシューティングを行う

Cookie ベースのコンバージョン測定結果を Attribution Reporting レポートと比較するには、[デバッグキー](#glossary)を使用し、Cookie コンバージョンをデバッグレポートにマッピングします。デバッグレポートはエンドポイントに[すぐに送信](/docs/privacy-sandbox/attribution-reporting-debugging/part-1/#debug-reports-are-sent-immediately)されることに注意してください。

### 概要

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/VZpOhA8ra1QtQ9W34tBH.png", alt="損失分析の手順", width="800", height="609" %}

デバッグキー（`<source_debug_key, trigger_debug_key>` ペア）を使用して、Cookie のコンバージョンを成功デバッグレポートにマッピングします。**各 Cookie のコンバージョンについて、コンバージョン時に、対応する成功デバッグレポートを受け取りましたか？**

**受け取った場合**: これらすべての成功デバッグレポートについて、いくつかの例外を除き、後でアトリビューション レポートを受け取ることができます。**詳細については、[成功デバッグレポートのシナリオ](#success-debug-report)を確認してください。**

**受け取らなかった場合**: これは、コンバージョンがアトリビューション レポートに登録されなかったことを意味します。`<source_debug_key, trigger_debug_key>` ペア（トリガーデバッグキーがない場合はソースデバッグ キー）を使用して、Cookie のコンバージョンを詳細デバッグレポートにマッピングします。**これらのコンバージョンのそれぞれについて、ある時点（ソースまたはトリガー時間）で、対応する詳細デバッグレポートを受け取りましたか？**

- 詳細デバッグレポートを受け取らなかった場合: これは、ユーザーの動作または統合の問題が原因である可能性があります。**詳細については、[デバッグレポートなしのシナリオ](#no-debug-reports)を確認してください。**

- 詳細デバッグレポートを受け取った場合は、その `type` フィールドを確認します。

    - `type` が `source-success` である場合: ソースは正常に登録されましたが、トリガーは登録されなかったことを意味します。成功デバッグレポートが欠落している理由を絞り込むには、トリガー側の問題を示す他のタイプの対応する詳細デバッグレポートを探します。

    - 上記以外の `type` である場合: ソースまたはトリガーは登録されていません。`type` にはその理由が示されています。対応するアトリビューション レポート（および成功デバッグでポート）が欠落しています。詳細デバッグレポートの `type` によっては、この情報を損失分析データポイントとして取得したい（つまり、対処しない）場合もあれば、バグを報告したり、実装のトラブルシューティングを行ったりする場合もあります。**詳細については、[詳細デバッグレポートのシナリオ](#verbose-debug-report)をご覧ください。**

{% Aside 'gotchas' %} *成功デバッグレポート*は、ブラウザがイベントレベルのレポートまたは集計可能なレポートを正常に生成した場合に送信されますが、ほとんどの*詳細デバッグレポート*は、ソースまたはトリガーが正常に登録されなかった場合に送信されます。ただし、*ソース登録成功の詳細デバッグレポート*は除きます。 {% endAside %}

{% Aside %} この概要では、潜在的な実装の問題のトラブルシューティングを含む包括的な分析を実行する方法について説明します。

ただし、包括的な損失分析を実行して特定のコンバージョンセットを待つ必要はなく、実装の問題を排除することに専念したいテスト段階にある場合があります。その場合は、受信時に[実装の問題を示している可能性がある特定の詳細レポートタイプ](#other-verbose-reports)を直接調べることができます。 {% endAside %}

### 考えられるシナリオ

#### 成功デバッグレポート

特定の Cookie コンバージョンについて、成功デバッグレポートを受け取った場合、これは、このコンバージョンがアトリビューション レポートに正常に登録されたことを意味します。

いくつかの例外を除いて、**このコンバージョンのアトリビューション レポートを後で受け取ることができます**。

- ユーザーの行動: コンバージョン後、アトリビューション レポートが送信される前に[データを消去](/docs/privacy-sandbox/attribution-reporting-data-clearing/)した、ブラウザを閉じたなど。コンバージョン後にユーザーがブラウザを閉じ、その後 1 週間ブラウザを起動しなかった場合、レポートは 1 週間以上送信されません。この遅延は損失と見なすことができます。
- イベントレベルのみに適用: イベントレベルのレポートは、優先度の高い別のレポートに置き換えられます。
- 潜在的なネットワークの問題。

{% Aside %} ブラウザがレポートを送信しようとしたときに、ネットワークの問題によって送信できなかった場合、送信は 2 回リトライされます。その後最終的に送信を中止します。{% endAside %}

#### `source-success` タイプの詳細デバッグレポート

特定の Cookie コンバージョンのソースについて、`source-success` タイプの詳細デバッグレポートを受け取った場合、これはソースの登録が成功したことを意味します。トリガー登録も後で成功するかどうかによって、そのコンバージョンのレポートを受け取る場合と受け取らない場合があります。

これには、注意事項が 1 つあります。

{% Aside 'gotchas' %} ソース登録成功の詳細デバッグレポートは、アトリビューションのないレポート作成元の制限に達した場合でも送信されます。その場合、ソース登録が実際には成功していなくても、セキュリティ上の理由により送信されます。 {% endAside %}

#### 上記以外のタイプの詳細デバッグレポート

特定の Cookie コンバージョンについて、詳細デバッグレポートを受け取った場合、成功デバッグレポートを受け取らないため、後でアトリビューション レポートも生成されません。これは報告可能なエラーが発生したことを意味します。ソースの登録、トリガーの登録、レポートの生成、またはレポートの送信が何らかの原因で妨げられています。以下のような原因が考えられます。

- プライバシーの制限
- 保管制限
- カスタムルール
- コードの実装の問題
- ブラウザのバグ

こういった原因はよくあることです！どのように対処するかは、各詳細レポートの `type` によって異なります。[詳細レポートのリファレンス](#verbose-reference)を確認してください。

#### デバッグレポートなし

特定の Cookie コンバージョンについて、アトリビューション レポートのみを受信した場合（成功デバッグレポートも詳細デバッグレポートも受信しなかった）、これは何らかの理由でデバッグレポートの生成が妨げられたことを意味します。以下のような原因が考えられます。

- ユーザーの設定（ユーザーがサードパーティ Cookie をオフにしている）
- Cookie が見つからない、またはデバッグキーが見つからない（Cookie が欠落されているためデバッグキーが消去された）。`chrome://attribution-internals` で **Logs** タブを開き、問題が発生していないかどうかを確認します。
- アトリビューション レポートの送信時ではなく、ソースまたはトリガー時にネットワークの問題が発生した。

**アトリビューション レポートを受け取っていますか？**

これは、デバッグレポートを受信していない場合のケースです。特定の Cookie コンバージョンについて、いかなるタイプのレポートも受信しなかった場合（いかなるタイプのデバッグレポートもアトリビューション レポートも受信しなかった）、これは報告不可能なエラーが発生したことを意味します。以下のような原因が考えられます。

- 基本的な統合の問題。この問題をトラブルシューティングする方法について、[基本的な統合の問題を解決する](/docs/privacy-sandbox/attribution-reporting-debugging/part-2/#fix-fundamental-issues)をご覧ください。
- 潜在的なネットワークの問題。
- ブラウザ設定のユーザー設定（プライバシーサンドボックスがオフになっている、ユーザーのブラウザでオリジントライアルが有効になっていない、など）。

## 詳細デバッグレポートのリファレンス

それぞれの詳細デバッグレポートには、対応するアトリビューション レポートがドロップされた理由を取得する `type` フィールドがあります。リファレンスを使用して、詳細レポートの `type` ごとに、対処方法を判断してください。

{% Aside %} 詳細レポートの `type` が `trigger-event` で始まる場合、アトリビューション レポートは、イベントレベルのレポートに関連付けられたソースイベントまたはトリガーイベントに対してのみ生成されます。詳細レポートの `type` が `trigger-aggregate` で始まる場合、集計可能なレポートに関連付けられているソースイベントまたはトリガーイベントに対してのみ生成されます。それ以外の場合はすべて、イベントレベルまたは集計可能なレポート用です。 {% endAside %}

### ソース登録成功

ソースは正常に登録されています。

`source-success`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-success)

{% Aside 'gotchas' %} ソース登録成功の詳細デバッグレポートは、アトリビューションのないレポート作成元の制限に達した場合でも送信されます。その場合、ソース登録が実際には成功していなくても、セキュリティ上の理由により送信されます。 {% endAside %}

### プライバシー制限レポート

**以下のレポートが期待されます。**これらは、サイト間のユーザー ID の漏えいを抑制するためのプライバシー制限を示しています。

`source-destination-limit`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-destination-limit)

`source-noised`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-noised)

`trigger-attributions-per-source-destination-limit`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md)

`trigger-reporting-origin-limit`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-reporting-origin-limit)

`trigger-event-noise`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-noise)

`trigger-event-excessive-reports`: レポート数が制限を超えた場合に生成されます。ビューに対して最大 1 つのコンバージョン、クリックに対して最大 3 つのコンバージョンを登録できます。[優先順位](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/edit#heading=h.4ju6u3z5bons)を設定すれば、どのレポートを受け取るかを構成できます。[詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md)

### ストレージ制限レポート

**こ以下のレポートが期待されます。**これらは、過度のリソース使用を防ぐためのストレージ制限を示しています。

`source-storage-limit`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-storage-limit)

`trigger-event-storage-limit`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-storage-limit)

`trigger-aggregate-storage-limit`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-storage-limit)

### カスタムルールレポート

**以下のレポートは、フィルタリング、重複排除、優先度、またはウィンドウベースのフィルタリングを使用している場合に期待されます**。念のため、対応するカスタムルールを再確認して、その詳細レポートに対応するレポートが実際に削除したいレポートであることを確認してください。これが正しければ、何もする必要はありません。

`trigger-no-matching-filter-data`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-no-matching-filter-data)

`trigger-event-no-matching-configuration`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-no-matching-configurations)

`trigger-event-deduplicated`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-deduplicated)

`trigger-aggregate-deduplicated`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-deduplicated)

`trigger-event-low-priority`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-low-priority)

`trigger-event-report-window-passed`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-event-report-window-passed)

`trigger-aggregate-report-window-passed`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-report-window-passed)

### その他の詳細レポート

**以下のレポートは、コードの潜在的な実装の問題を示している可能性があります。**

`trigger-no-matching-source`: これは実装の問題である可能性があります。`<reporting origin, destination>` の構成に誤りがないことを確認してください。これも期待される API の動作である可能性があります。たとえば、ユーザーが広告を操作した後、コンバージョンに至る前のある時点でデータを消去した場合や、ユーザーが関連付けられた広告をまったく表示せずにコンバージョンに至った場合などです。[詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-no-matching-source)

`trigger-aggregate-no-contributions`: これは、コードに意図した動作ではない可能性があります。トリガー登録コードをトラブルシューティングします。コントリビューションの構成が正しいことを確認してください。[詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-no-contributions)

`trigger-aggregate-insufficient-budget`: これは、コードに意図した動作ではない可能性があります。トリガー登録コードを再確認して、すべてのコントリビューションの合計がコントリビューションの予算を超えていないことを確認してください。[詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-aggregate-insufficient-budget)

### 予期しないエラー（潜在的なブラウザのバグ）

**以下のレポートは想定外のレポートです**。ブラウザのバグが原因である可能性があります。[バグを報告](https://bugs.chromium.org/p/chromium/issues/entry?components=Internals%3EAttributionReporting')し、説明にこの問題を再現する手順を示してください。

`source-unknown-error`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#source-unknown-error)

`trigger-unknown-error`: [詳細とレポート本文](https://github.com/WICG/attribution-reporting-api/blob/main/verbose_debugging_reports.md#trigger-unknown-error)

{% Details %} {% DetailsSummary 'h2' %}

## 損失分析例

{% endDetailsSummary %}

### ステップ 1: Cookie を使用したセットアップとマッピング

[パート 2: デバッグレポートのセットアップ](/docs/privacy-sandbox/attribution-reporting-debugging/part-2)の手順に従って、**成功デバッグレポート**と**詳細デバッグレポート**を生成するようにシステムを設定します。

これにより、Cookie ベースのコンバージョン情報を使用して、対応するデバッグレポートまたはアトリビューション レポートを検索できます。

### ステップ 2: 成功した登録と不足しているレポートを特定する

この例では、Cookie ベースのシステムで 100 件のコンバージョンを追跡したと仮定します。

Cookie ベースのコンバージョンを記録するたびに、この Cookie ベースのコンバージョンと同じ `<source_debug_key, trigger_debug_key>` ペアを持つ成功デバッグレポートを探します（すぐに送信されます）。

これらの Cookie コンバージョンのうち 70 件の成功デバッグレポートを受け取ったとします。

- 成功レポートはアトリビューションが正常に記録されたことを意味するため、いくつかの例外を除いて、各成功レポートに対応するアトリビューション レポートを取得すると想定できます。
- これらの例外を監視することを決定できます。これを行うには、アトリビューション レポートが次の数日または数週間にわたって（有効期限に応じて）エンドポイントに送信されるため、各成功デバッグレポートと同じデバッグキーペアを持つアトリビューション レポートを探します。各ウィンドウの最後にレポートがすぐに送信されない場合があるため、必ずしばらくお待ちください。アトリビューション レポートが 60 件しか見つからなかったとしましょう。10 件のアトリビューション レポートが表示されないのは、ユーザーの行動が原因である可能性があります。

{% Aside %} Cookie ベースのコンバージョンにマッピングされないイベントレベルのアトリビューション レポートがある可能性があります。これらは、API によってランダムに生成されたノイズを含むレポートである可能性が最も高いです。これは、イベントレベルのレポートと同じソースデバッグキーを持つ `source-noised` タイプのデバッグ詳細レポートを探すことで確認できます。 {% endAside %}

### ステップ 3: 簡単な損失評価

100-70 = 30 件の成功デバッグレポートが見つかりません。これは、これらの 30 件のコンバージョン（Cookie ベースの実装で追跡されたもの）がアトリビューション レポートで記録されなかったことを意味します。これらのアトリビューション レポートを受け取ることはありません。

Cookie ベースのコンバージョンが 100 件あり、アトリビューション ベースのコンバージョンが 70 件しかないため、損失は 30% です。これで、簡単な損失評価ができました。

### ステップ 4: 原因を分析する

これらのレポートが欠落している理由を調査するには、コンバージョン（トリガー登録）時またはそれ以前のソース登録時に受け取った、対応する詳細デバッグレポートを探します。Cookie ベースのコンバージョンのキーを使用して、これらを詳細なデバッグレポートにマッピングします。

- 詳細デバッグレポートがない 10 個のキーがあるとします。この場合は統合の問題があるかどうかを確認します。問題がない場合は、これはユーザーの行動が原因である可能性があります。
- 20 件の詳細デバッグレポートがあります。これで、損失分析を改善できます。各詳細レポートの `type` フィールドを分析すると、次のようなことがわかります。
    - 10 （= この例では 10%）件のレポートが `pending destination limit` により欠落しています。
    - 5（= 5%）件のレポートが `trigger-aggregate-no-contributions` により欠落しています。
    - 5（= 5%）件のレポートが `unknown-error` により欠落しています。

### ステップ 5: 対処してトラブルシューティングを行う

レポートが欠落している理由が明らかになったので、これらのインサイトに基づいて対処できます。

どのように対処するかは、各詳細レポートの `type` によって異なります。詳細については、詳細レポートのリファレンスを確認してください。以下に例を示します。

- `pending-destination-limit` はプライバシー保護です。対処することはありません。この数値をデータポイントとして使用して、独自の可視性と監視を行います。
- `trigger-aggregate-no-contributions` は実装上の問題を示している可能性があります。これをさらに分析し、詳細レポートの本文の内容を使用して、必要に応じてこれをトラブルシューティングし、修正します。
- `unknown-error` はブラウザのバグかネットワークエラーを示している可能性があります。これが繰り返し発生する場合は、ブラウザ開発者にバグを報告してください。

{% endDetails %}

---
layout: 'layouts/doc-post.njk'
title: コンバージョン測定APIから Attribution Reporting API への移行ガイド（Chrome 92）
subhead: |2-

  Conversion Measurement（コンバージョン測定）APIがChrome92で変更されます。
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %}移行する際、質問があった場合、またはサポートが必要な場合は、 [メーリングリスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に参加して質問してください。{% endAside %}

## 変更内容

[2021年の最初の四半期におけるAPI提案](https://github.com/WICG/conversion-measurement-api)の変更に続いて、ChromeでのAPI実装は進化しています。変更点は次のとおりです。

- API名、および機能ポリシー名。
- HTML属性名と`.well-known` のURL。
- レポートの形式。レポートは、リクエスト本文でJSONとして送信されるようになりました。
- レポートの内容。 `credit`と、クレジットが0になるレポートが削除されました。

サポートされているクリックのみのイベントレベルのレポート機能のセットはChrome 92で変更されません。**これに関しては後ほど新しい情報を発表する予定です**。この変更後、他のアップデートと機能が将来のChromeバージョンでリリースされる予定です。

{% Aside %}このAPIのオリジントライアルと今後の機能に関する最新情報を受け取るには、 [メーリングリスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に登録してください。 {% endAside %}

## これらの変更はいつから有効になりますか？

これらの変更は、2021年7月20日、安定バージョンの[Chrome 92](https://chromestatus.com/features/schedule)から有効になります。Chrome 92のベータバージョンは2021年6月3日にリリースされました。

## 取るべき対策

{% Aside %}将来のバージョンでAPIにさらに変更が加えられ、Chrome 92で採用された新しい名前を使用します。{% endAside %}

オリジントライアルを実行している場合、またはこのAPIのデモを実装している場合は、次の2つのオプションがあります。

- **オプション1（お勧め）** ：コードを今または数週間以内に、（できれば2021年7月中旬までに）移行すること。こうすれば、コードベースを将来の変更に備えることができ、新しいChromeクライアントでも引き続き機能します。
- **オプション2** ：今後のChromeバージョンでさらに多くのアップデートと機能がリリースされてから、すべての必要なコード変更を一度に行うこと。

## 移行

### 移行の例

[このプルリクエスト（ドラフト）](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files)で、デモアプリを移行する簡単な例を紹介しています。

### 機能ポリシーコードを更新

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">レガシーコード</th>
<th style="text-align: left;">新しいコード</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### 機能検出コードを更新

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">レガシーコード</th>
<th style="text-align: left;">新しいコード</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()<br>.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()<br>.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### HTML属性を更新

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">レガシーコード</th>
<th style="text-align: left;">新しいコード</th>
</tr></thead>
<tbody>
<tr>
<td><code>conversiondestination</code></td>
<td><code>attributiondestination</code></td>
</tr>
<tr>
<td><code>impressiondata</code></td>
<td><code>attributionsourceeventid</code></td>
</tr>
<tr>
<td><code>impressionexpiry</code></td>
<td><code>attributionexpiry</code></td>
</tr>
<tr>
<td><code>reportingorigin</code></td>
<td><code>attributionreportto</code></td>
</tr>
</tbody>
</table>

### `window.open()`引数を更新

`window.open()`によって開始されるナビゲーションにアトリビューションソースを登録できます。 `window.open()`を使用してアトリビューションソースを登録している場合は、これらの呼び出しを更新してください。

新しいコードは次のようになります（この名前の変更は、 [HTML属性の名前の変更](#update-the-html-attributes)に従います）。

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### 登録呼び出しのURLとパラメータを更新

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">レガシーコード</th>
<th style="text-align: left;">新しいコード</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### レポートエンドポイントコードを更新します

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">レガシーコード</th>
<th style="text-align: left;">新しいコード</th>
</tr></thead>
<tbody><tr>
<td>期待されるブラウザからのリクエスト</td>
<td><code>.well-known/register-conversion?impression-data=&conversion-data={DATA}&attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution</td> </tr> <tr> <td>着信レポート</td> <td>URLパラメータとして送信</td> <td>リクエスト本文でJSONとして送信<br> <br>レポートデータは、<strong>リクエストの本文にJSONオブジェクトとして含まれ</strong>次のキーを使います。<br> <code>source_event_id</code> ：以前は<code>impression-data</code>のアトリビューションソースに設定された64ビットのイベントIDでした。<br> <code>trigger_data</code> ：以前は<code>conversion-data</code>のアトリビューショントリガーリダイレクトの3ビットデータセットでした。<br><br> ⚠️ <code>credit</code>が削除されました。</td>
</tr></tbody>
</table>

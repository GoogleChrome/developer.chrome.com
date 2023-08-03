---
layout: layouts/doc-post.njk
title: Private Aggregation API の基礎
subhead: Private Aggregation API の主なコンセプト
description: Private Aggregation API の主なコンセプト
date: 2022-10-11
authors:
  - kevinkiklee
---

## この記事はどのようなユーザーを対象としていますか？

[Private Aggregation API](/docs/privacy-sandbox/private-aggregation) は、クロスサイトデータへのアクセスによりワークレットからの集計データの収集を可能にします。ここで共有するコンセプトは、共有ストレージおよび FLEDGE 内でレポート作成機能を構築する開発者にとって重要となります。

- クロスサイト測定を目的としたレポートシステムを構築する**開発者**。
- **マーケター**、**データサイエンティスト**、またはその他の**サマリーレポートユーザー**であれば、これらのメカニズムに対する理解は、最適化されたサマリーレポートの抽出を目的とした設計に関する決定を下す際の助けとなるでしょう。

## キーワード

この記事を読む前に、キーワードやコンセプトに慣れておくと良いでしょう。これらの用語は、この記事の中で詳しく説明していきます。

- [*集計キー*](#aggregation-key) (バケットとも呼ばれます) とは、あらかじめ決められたデータポイントのコレクションのことを指します。たとえば、ブラウザーが国名を報告する位置データのバケットを収集する必要があるとします。集計キーには、複数のディメンション (たとえば、国名とコンテンツウィジェットの ID など) を含めることができます。
- [*集計可能な値*](#aggregatable-value)とは、集計キーに収集された個々のデータポイントのことを指します。フランスからのユーザーが何人コンテンツを閲覧したかを測定する場合、`France` が集計キーのディメンションとなり、`1` の `viewCount` が集計可能な値となります。
- *集計可能なレポート*は、ブラウザー内で生成および暗号化が行われます。Private Aggregation API の場合、これには 1 件のイベントに関するデータが含まれます。
- [*集計サービス*](/docs/privacy-sandbox/aggregation-service)は、集計可能なレポートからのデータを処理してサマリーレポートを作成します。
- *サマリーレポート*は集計サービスの最終的な出力結果であり、ノイズの多い集計済みのユーザーデータと詳細な変換データを含んでいます。
- *[ワークレット](https://developer.mozilla.org/docs/Web/API/Worklet)*は、特定の JavaScript 関数を実行して情報をリクエストしたユーザーに返すことができるインフラストラクチャの一部です。ワークレットの内部では JavaScript を実行することができますが、外部のページと対話したり通信を行ったりすることはできません。

## プライベート集計のワークフロー

集計キーと集計可能な値を使用して Private Aggregation API を呼び出すと、ブラウザーは集計可能なレポートを生成します。そのレポートは、レポートのバッチ化を行うサーバーへと送信されます。バッチ化されたレポートはその後集計サービスによって処理され、サマリーレポートが生成されます。

<figure class="screenshot">{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/NqNZ51sVCASKNyNbYoHv.png", alt="データはクライアントからコレクター、そして集計サービスへと送られてサマリーレポートが生成されます", width="800", height="211" %}</figure>

1. Private Aggregation API を呼び出すとクライアント (ブラウザー) は集計可能なレポートを生成してサーバーへと送信し、収集が行われます。
2. サーバーはクライアントからレポートを収集し、集計サービスへと送るためにバッチ化を行います。
3. 十分な数のレポートが収集できたら TEE で動作する集計サービスへとバッチ化を行ってから送信し、サマリーレポートを作成することになります。

{% Aside 'key-term' %}*Trusted Execution Environment (TEE)* とは、コンピューターのハードウェアとソフトウェアの特別な構成のことを指し、外部の人間がコンピュータ上で実行されているソフトウェアの正確なバージョンを検証できるようにするものです。TEEを使用することで、外部の関係者は、ソフトウェアがソフトウェア製造者が主張するとおりの動作をすること、それ以上でも以下でもないことを確認することができます。{% endAside %}

このセクションで説明するワークフローは [Attribution Reporting API](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#) のものに似ています。しかしながら、アトリビューションレポートは異なる時間に発生するインプレッションイベントとコンバージョンイベントから収集したデータを関連付けるものです。プライベート集計は、単一のクロスサイトイベントを測定します。

## 集計キー

*集計キー* ("キー" と略します) は、集計可能な値が蓄積されるバケットを表しています。1 つ以上のディメンションをキーへとエンコードすることができます。ディメンションは、ユーザーの年齢層や広告キャンペーンのインプレッション数などのより詳細な分析情報を得るための視点を表しています。

たとえば、複数のサイトにウィジェットを埋め込んでいて、そのウィジェットを閲覧したユーザーの国を分析したいとします。その場合、"ウィジェットを閲覧したユーザーのうち何人が X 国からアクセスしているのだろうか？" といった問いに対する回答が欲しいはずです。この質問に対するレポートを作成するには、ウィジェット ID と国 ID という 2 つのディメンションをエンコードする集計キーをセットアップします。

Private Aggregation API に提供されるキーは、[BigInt](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 型で複数のディメンションから構成されます。この例では、ウィジェット ID と 国 ID がディメンションに含まれます。ウィジェット ID は `1234` のように最大で 4 桁の長さで、国 ID についてはアフガニスタンが `1`、フランスが `61`、ジンバブエが 195 などのようにそれぞれの国名がアルファベット順に数字へとマッピングされているとします。この場合、集計可能なキーの長さは 7 桁となり、最初の 4 文字が `WidgetID`に、最後の 3 文字が `CountryID` に予約されます。

たとえば、キーがウィジェット ID `3276` を閲覧したフランス (国 ID `061`) からのユーザーの数を表すとすると、集計キーは `3276061` となります。

<table>
  <tr>
   <td colspan="2" style="background-color: #efefef">集計キー</td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">ウィジェット ID</td>
   <td style="background-color: #92da78">国 ID</td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">3276</td>
   <td style="background-color: #92da78">061</td>
  </tr>
</table>

{% Aside %}ディメンションに複数桁のキースペースがあるものの値の桁数が少ない場合には、先頭に 0 を追加します。たとえば国 ID が 3 桁の場合、アルジェリアの国 ID は `003` となります。{% endAside %}

集計キーは、SHA-256 などのハッシュ生成メカニズムを用いて生成することも可能です。たとえば、文字列 `“WidgetID=3276;CountryID=67”` は同等の 16 進数列である BigInt `86849257128445315549261263548129498923703362729078813106545648910309959898558n` へと変換することができます。

[`Crypto`](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) などのハッシュを生成するために必要となるいくつかの重要な Web API については、現時点で 共有ストレージワークレットや FLEDGE ワークレット内で利用することができません。これらのワークレットは外部との通信ができないため、ハッシュを作成する場合にはワークレットの外部で 1 つ以上のハッシュを事前に生成し、それを渡す必要があります。

{% Aside %}コンセプトは似ていますが、Private Aggregation API と Attribution Reporting API ではキーの構成が異なっています。プライベート集計では、完全なキーが一度だけ JavaScript の呼び出しの中で指定されます。{% endAside %}

## 集計可能な値

集計可能な値は、多くのユーザーについてキーごとに合算され、サマリーレポートのサマリー値という形で集計後の分析情報を生成します。

先に挙げた質問例に戻りましょう。"ウィジェットを閲覧したユーザーのうち何人がフランスからアクセスしているのだろうか？" この質問に対する解答は、"Widget ID 3276 を閲覧したおよそ 4881 人のユーザーがフランスからアクセスしています。" のようになるでしょう。*集計可能な値*は各ユーザーが 1 となり、"4881 人のユーザー" がその*集計キー*についてすべての*集計可能な値*を合計した*集計された値*となります。

<table>
  <tr>
   <td colspan="2" style="background-color: #efefef">集計キー</td>
   <td style="background-color: #efefef">集計可能な値</td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">ウィジェットID</td>
   <td style="background-color: #92da78">国 ID</td>
   <td style="background-color: #d2e9ff">ビュー数</td>
  </tr>
  <tr>
   <td style="background-color: #d3f1c8">3276</td>
   <td style="background-color: #92da78">061</td>
   <td style="background-color: #d2e9ff">1</td>
  </tr>
</table>

この例では、ウィジェットを閲覧した各ユーザーごとに値を 1 ずつインクリメントします。実際には、[信号対雑音比](#noise-and-scaling)を改善するために集計可能な値のスケーリングを行います。

### コントリビューション予算

Private Aggregation API に対する各呼び出しは*コントリビューション*と呼ばれます。ユーザーのプライバシーを保護するために、個人から収集可能なコントリビューションの数は制限されています。

すべての集計キーで集計可能な値を合計する場合、その合計はコントリビューション予算を下回る必要があります。予算はワークレットの[オリジン](https://web.dev/same-site-same-origin/#origin)ごと、日付ごとに範囲指定され、FLEDGE および共有ストレージワークレットでは分離されています。日付については、直近およそ 24 時間のローリングウィンドウが使用されます。新しい集計可能なレポートが予算を超過する原因となってしまう場合には、レポートは作成されません。

*コントリビューション予算*はパラメーター `L<sub>1</sub>` で表されており、現行のプライバシーサンドボックスオリジントライアルではコントリビューション予算は 2<sup>16</sup> = 65,536 に設定されています。コントリビューション予算の値は、ノイズがスケーリングされる場合は任意であり、サマリー値の信号対雑音比を最大化するためにこの予算を使用することができます (詳細については、後述する「ノイズとスケーリング」セクションで説明します)。

コントリビューション予算の詳細については「[説明](https://github.com/patcg-individual-drafts/private-aggregation-api#contribution-bounding-and-budgeting)」を参照してください。また、[「アトリビューションレポートの戦略ガイド」の「コントリビューション予算」セクション](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#)を参照し、より詳細なガイダンスをご覧ください。

## 集計可能なレポート

ユーザーが Private Aggregation API を呼び出すと、ブラウザーは集計可能なレポートを生成し、そのレポートはその後集約サービスで処理が行われ[サマリーレポート](/docs/privacy-sandbox/summary-reports/)が生成されます。集計可能なレポートは JSON フォーマットで、暗号化されたコントリビューションの一覧を含み、それぞれが `{集計キー, 集計可能な値}` のペアとなっています。集計可能なレポートは最大 1 時間のランダムな遅延と共に送信されます。

コントリビューションは暗号化されており、集計サービスの外部で判読することはできません。集計サービスはレポートを復号化し、サマリーレポートを生成します。ブラウザー用の暗号化キーおよび集計サービス用の復号化キーは、キー管理サービスとして機能するコーディネーターで発行されます。コーディネーターはサービスイメージのバイナリハッシュ一覧を保持しており、呼び出し元が復号化キーの受け取りを許可されているかどうかの検証を行います。

[デバッグモード](/docs/privacy-sandbox/private-aggregation#enabledebugmode)を有効化した集計可能なレポートの例:

```js
"aggregation_service_payloads": [
{
"debug_cleartext_payload": "omRkYXRhgaJldmFsdWVEAAAAgGZidWNrZXRQAAAAAAAAAAAAAAAAAAAE0mlvcGVyYXRpb25paGlzdG9ncmFt",
"key_id": "2cc72b6a-b92f-4b78-b929-e3048294f4d6",
"payload": "a9Mk3XxvnfX70FsKrzcLNZPy+00kWYnoXF23ZpNXPz/Htv1KCzl/exzplqVlM/wvXdKUXCCtiGrDEL7BQ6MCbQp1NxbWzdXfdsZHGkZaLS2eF+vXw2UmLFH+BUg/zYMu13CxHtlNSFcZQQTwnCHb"
}
],
"debug_key": "777",
"shared_info": "{\"api\":\"private-aggregation\",\"debug_mode\":\"enabled\",\"report_id\":\"5bc74ea5-7656-43da-9d76-5ea3ebb5fca5\",\"reporting_origin\":\"https://localhost:4437\",\"scheduled_report_time\":\"1664907229\",\"version\":\"0.1\"}"
```

集計可能なレポートは `chrome://private-aggregation-internals` ページで閲覧可能です。

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/mUpLvkqjpzATYeKtUDrW.png", alt="Private Aggregation API 内部ページのスクリーンショット", width="800", height="303" %}

テストが目的であれば、「選択したレポートを送信」ボタンを使用してすぐにサーバーにレポートを送信することができます。

### 集計可能なレポートを収集してバッチ化を行う

ブラウザーは、リスト化された well-known パスを使用して Private Aggregation API への呼び出しを含むワークレットのオリジンへと集計可能なレポートを送信します。

- 共有ストレージの場合: `/.well-known/private-aggregation/report-shared-storage`
- Protected Audience の場合: `/.well-known/private-aggregation/report-protected-audience`

これらのエンドポイントでは、クライアントから送信された集計可能なレポートを受信する (コレクターとして機能する) サーバーを運用する必要があります。

次に、サーバーはレポートをバッチ化し、そのバッチを集計サービスへと送信する必要があります。`shared\_info` フィールドなど、集計可能なレポートに含まれる暗号化されていないペイロードの中で利用可能な情報に基づいてバッチを作成します。この時、1 件のバッチにつき 100 件以上のレポートが含まれているのが理想です。

1 日または 1 週間ごとにバッチ化を行うことも可能です。この戦略には柔軟性があるため、より多くのアクセスが予想される特定のイベント (たとえば、1 年の間により多くのインプレッションが予想される日) に合わせてバッチ戦略を変更することが可能です。バッチには、同一の API バージョン、レポートのオリジン、レポート時間のスケジュールから収集されたレポートを含める必要があります。

## 集計サービス

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/b1avI43zUaKT2UAdGOo1.png", alt="サービスは TEE で実行し、集計可能なレポートを復号化してノイズを追加することで、最終的なサマリーレポートを作成します。", width="800", height="457" %}

[集計サービス](/docs/privacy-sandbox/aggregation-service/)は、コレクターから暗号化された集計可能なレポートを受け取り、サマリーレポートを生成します。

レポートのペイロードを復号化するために、集計サービスはコーディネーターから復号化キーを取得します。このサービスは、データの整合性、データの機密性、コードの整合性について一定レベルの保証を提供する Trusted Execution Environment（TEE、信頼できる実行環境）で実行されます。自身でサービスを所有し運用することは可能ですが、TEE の内部で処理されているデータを可視化することはできません。

## サマリーレポート

[サマリーレポート](/docs/privacy-sandbox/summary-reports/)では、収集したデータをノイズが追加された状態で確認することができます。指定したキーのセットについてサマリーレポートをリクエストすることが可能です。

サマリーレポートには、JSON 形式で辞書型のキーと値のペアによるデータセットが含まれています。各ペアには、以下が含まれています。

- *`bucket`*: 2 進数列による集計キー。使用される集計キーが "123" の場合、bucket は "1111011" となります。
- *`value`*: 特定の測定目標についてのサマリー値。利用可能なすべてのノイズが追加された集計可能なレポートから合算されます。

例えば以下のようにします。

```js
[
{"bucket":` `"111001001",` `"value":` `"2558500"},
{"bucket":` `"111101001",` `"value":` `"3256211"},
{"bucket":` `"111101001",` `"value":` `"6536542"},
]
```

### ノイズとスケーリング

ユーザーのプライバシーを保護するために、集計サービスはサマリーレポートがリクエストされるたびに各サマリー値に一度だけノイズを追加します。ノイズ値は[ラプラス確率分布](https://en.wikipedia.org/wiki/Laplace_distribution)によりランダムに選択されます。ノイズの追加方法を直接制御することはできませんが、ノイズが測定データに与える影響にある程度働きかけることは可能です。

ノイズの分布は、集計可能な値の合計値に関わらず同一となります。そのため、集計可能な値が大きいほどノイズの影響は小さくなるはずです。

たとえば、ノイズの分布が標準偏差 100 で、中心が 0 だとします。収集された集計可能なレポートの値 (もしくは "集計可能な値") が 200 しかない場合、ノイズの標準偏差は集計された値の 50% となります。しかしながら、集計可能な値が 20,000 であれば、ノイズの標準偏差は集計された値の 0.5% にしかなりません。つまり、集計可能な値が 20,000 であれば、信号対雑音比はかなり高くなります。

したがって、集計可能な値にスケーリングファクターを掛けることで、ノイズを減らすことができるのです。スケーリングファクターは、特定の集計可能な値をどの程度スケーリングするかを表しています。

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qJ182Vhszwsgf1PVLEpT.png", alt="ノイズは集計値に関わらず一定です。", width="600", height="462" %}

より大きなスケーリングファクターを選択して値をスケールアップすることで、相対的なノイズが減少します。しかしながら、これはすべてのバケットにわたるすべてのコントリビューションの合計が、コントリビューション予算の上限により早く到達してしまうことの原因にもなります。より小さなスケーリングファクター定数を選択して値をスケールダウンすれば相対的なノイズは増加しますが、予算の上限に到達するリスクは減少します。

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qgDt0a7GaMFJ07zibVUw.png", alt="集計可能な値をコントリビューション予算へとスケーリングする", width="400", height="340" %}

適切なスケーリングファクターを計算するには、コントリビューション予算をすべてのキーにわたる集計可能な値の最大合計値で割ります。

詳細については、[「アトリビューションレポートの戦略ガイド」の「コントリビューション」セクション](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.683u7t2q1xk2)を参照してください。

## 貢献とフィードバックの共有 {: #feedback}

Private Aggregation API の提案については現在活発な議論が行われており、将来的に変更される可能性があります。この API を試してフィードバックがあれば、ぜひお寄せください。

- **GitHub**: [提案](https://github.com/patcg-individual-drafts/private-aggregation-api)を読み、[質問を投稿したり、ディスカッションに参加](https://github.com/patcg-individual-drafts/private-aggregation-api/issues)したりできます。
- **開発者向けサポート**: [プライバシーサンドボックスの開発者向けサポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、ディスカッションに参加したりすることができます。
- [Shared Storage API グループ](https://groups.google.com/a/chromium.org/g/shared-storage-api-announcements)や [FLEDGE API グループ](https://groups.google.com/a/chromium.org/g/fledge-api-announce/)に参加して、プライベート集計に関する最新情報をご確認ください。

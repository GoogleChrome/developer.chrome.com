---
layout: layouts/doc-post.njk
title: Topics API 開発者ガイド
subhead: テスト用の Chrome フラグの使用方法など、API の操作方法を学びます。
description: テスト用の Chrome フラグの使用方法など、API の操作方法を学びます。
date: 2022-01-25
updated: 2023-03-29
authors:
  - samdutton
---

## 実装状況

{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## Topics API を試す

Topics は現在、Chrome のどのバージョンでもデフォルトでは利用できませんが、以下の 2 つの方法で、単一ユーザーとしてまたは大規模に API を有効にすることができます。

- Topics API のデモでは、1 人のユーザーとして試すことができます。
- Topics オリジントライアルでは、ウェブサイトのユーザーと共に API を大規模に試すことができます。

### デモを試す {: #demo}

Topics API のデモは [topics-demo.glitch.me](https://topics-demo.glitch.me/) にあり、単一ユーザー向けに API を試してデバッグする方法について説明されています。

また、Topics [colab](/docs/privacy-sandbox/topics/colab/) を実行して、Topics の[分類器モデル](/docs/privacy-sandbox/topics/topic-classification/#classifier-model)を試すこともできます。

### オリジントライアルで Topics をテストする {: #origin-trial}

Topics、[FLEDGE](/docs/privacy-sandbox/unified-origin-trial/)、および [アトリビューション レポート](/docs/privacy-sandbox/fledge/)の API に関するプライバシーサンドボックスの関連性と測定の[オリジントライアル](/docs/privacy-sandbox/attribution-reporting/)が、デスクトップ版 Chrome Beta 101.0.4951.26 以降で利用できるようになりました。

## トピックの取得と設定 {: #epoch}

The Topics JavaScript API JavaScript API には、トピックの取得と設定に使用される `document.browsingTopics()` という 1 つのメソッドがあります。これは、ランダムな順序で、最新の 3 つのエポックごとに 1 つずつ、最大 3 つのトピックの配列に解決される promise を返します。エポックとは期間であり、現在 1 週間に設定されています。

`document.browsingTopics()` が返す配列内の各トピックオブジェクトには、次のプロパティがあります。

- `configVersion`: 現在の Topics API 構成を識別する文字列
- `modelVersion`: サイトのトピックを推論するために使用される機械学習分類器を識別する文字列
- `taxonomyVersion`: ブラウザで現在使用されているトピックの集合を識別する文字列
- `topic`: [分類](/docs/privacy-sandbox/topics/overview/#how-topics-are-curated-and-selected)内のトピックを識別する数値
- `version`: `configVersion` と `modelVersion` を組み合わせた文字列

この記事で説明するパラメーターと API の詳細 (分類サイズ、1 週間に計算されるトピック数、呼び出しごとに返されるトピック数など) は、エコシステムのフィードバックを取り入れ、API に反映させることを繰り返すため、変更される可能性があります。

### document.browsingTopics のサポートを検出する

APIを使用する前に、API がブラウザでサポートされており利用可能であるかを、ドキュメントで確認してください。

```javascript
'browsingTopics' in document && document.featurePolicy.allowsFeature('browsing-topics') ?
  console.log('document.browsingTopics() is supported on this page') :
  console.log('document.browsingTopics() is not supported on this page');
```

{% Aside 'caution' %}

現在のページでの機能のサポートは、API が使用できることを保証するものではありません。ユーザーがブラウザの設定で API を無効にしたか、API を使用できないように他の設定をしている可能性があります。ユーザーのプライバシーを保護するために、これをプログラムで確認する方法はありません。

{% endAside %}

### JavaScript API でトピックにアクセスする {: #access-topics}

これは、現在のユーザーのトピックにアクセスするための API の使用方法として考えられる基本的な例です。単純さを維持するために、エラー処理を含めていません。

```javascript
// Get the array of top topics for this user.
const topics = await document.browsingTopics();

// Request an ad creative.
const response = await fetch('https://ads.example/get-creative', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(topics)
})

// Get the JSON from the response.
const creative = await response.json();

// Display ad.
```

### 状態を変更せずにトピックにアクセスする {: #skipobservation}

`document.browsingTopics()` はデフォルトで、トピックを返すたびにトピックの観測を記録します。Chrome 108 以降では、`document.browsingTopics()` メソッドにオプションの `{skipObservation:true}` 引数を渡すと、この記録を省略できます。

つまり、呼び出しによって現在のページが毎週のエポック計算に含まれることがなく、呼び出し元について観測されたトピックのリストも更新されません。

### ヘッダーを使ってトピックにアクセスし、観測する

[リクエスト](https://developer.mozilla.org/docs/Web/API/Request/headers)ヘッダーと[レスポンス](https://developer.mozilla.org/docs/Web/API/Response/headers)ヘッダーを使用してトピックにアクセスし、それを観測できます。ヘッダーは、JavaScript API を呼び出すよりもはるかに効率的な場合があります。

トピックには、`fetch()` または <code>XHR</code> リクエストの `Sec-Browsing-Topics` ヘッダーからアクセスできます。

{% Aside %} `XHR` リクエストにトピックヘッダーを含めることは一時的にのみ利用可能であり、サポートは今後削除される予定です。{% endAside %}

リクエストヘッダーで提供されるトピックは、リクエストへのレスポンスに `Observe-Browsing-Topics: ?1` ヘッダーを設定することで、観測済みとしてマークできます。ブラウザは、リクエストヘッダーに含まれているトピックを使用してユーザーが関心のあるトピックを計算します。

トピックは、以下の 2 つの方法で HTTP ヘッダーを使用してアクセス・監視できます。

- **`fetch()`**: `fetch()` リクエストが広告サーバーに対して行われたときに、ヘッダーを使用してトピックを呼び出します。この手法の詳細については、[デモ](/docs/privacy-sandbox/topics/demo#the-topics-api-headers-demo)をご覧ください。
- **iframe attributes**: `browsingtopics` 属性を iframe に追加するか、同等の IDL 属性 `iframe.browsingTopics = true` を使用して、ドキュメント リクエストと共にリクエストにヘッダーを送信します。iframe ソースは、トピック観測用の登録可能なドメインである必要があります。
    - 例: `<iframe src="https://example.com" browsingtopics></iframe>`
    - これは、Chrome M114 以降で利用できます。

ヘッダーに関するその他の注意事項:

- リダイレクトは追跡され、リダイレクトリクエストで送信されるトピックはリダイレクト URL に固有のものになります。
- 対応するレスポンスヘッダーがない限り、リクエストヘッダーは呼び出し元の状態を変更しません。つまり、ページのトピックは観察されたとは見なされず、次のエポックのユーザーのトピック計算にも影響しません。
- レスポンスヘッダーは、対応するリクエストにトピックヘッダーが含まれている場合（または、リクエストが空でない場合はヘッダーが含まれていた場合）にのみ受け入れられます。
- リクエストの URL は、トピックの観察に使用される登録可能なドメインを提供します。

## API 実装をデバッグする {: #debug}

[Topics API を有効にする](/docs/privacy-sandbox/topics/demo/#feature-flags)と、デスクトップの Chrome で `chrome://topics-internals` ページを使用できます。このページには、現在のユーザーのトピック、ホスト名から推測されるトピック、および API 実装に関する技術情報が表示されます。

`chrome://topics-internals` ページが新しくなりました。デザインと機能性はまだ検討中です。現在、開発者からのフィードバックに基づいてデザインのイタレーションと改善を行っています。[bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect+report+from+developer&components=Blink%3ETopicsAPI) にフィードバックを追加してください。

### ユーザーのブラウザに対して計算されたトピックを見る {: #observed-topics}

ユーザーは、`chrome://topics-internals` を表示することで、現在および以前のエポック中にブラウザで観測されたトピックに関する情報を閲覧できます。

<figure> {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/M253GclVFDCnvPJlTSVR.png",   alt="Topics State パネルが選択された chrome://topics-internals ページ。",   width="800", height="697" %} <figcaption>chrome://topics-internals ページの Topics State パネルでは、Topics ID、ランダムおよび実際のトピック割り当て、および分類とモデルバージョンを閲覧できます。 </figcaption></figure>

この例では、最近アクセスしたサイトに、topics-demo-cats.glitch.me と cats-cats-cats-cats.glitch.me が含まれています。これにより、Topics API は現在のエポックの 2 つのトップトピックとして `Pets` と `Cats` を選択します。残りの 3 つのトピックについては、5 つのトピックを提供するのに十分な閲覧履歴（トピックを観測するサイト）がないため、ランダムに選択されています。

**Observed-by context domains (hashed)** 列には、トピックが観測されたホスト名のハッシュ値が表示されます。

### ホスト名に対して推論されたトピックを見る {: #view-inferred-topics}

1 つ以上のホスト名に対して Topics の[分類器モデル](https://github.com/patcg-individual-drafts/topics#:~:text=classifier%20model)が推論したトピックも `chrome://topics-internals` で確認できます。

<figure> {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/SOTuE2ljC55PaYll1UP1.png",   alt="chrome://topics-internals ページの Classifier パネル。",   width="800", height="695" %}   <figcaption>chrome://topics-internals ページの Classifier パネルでは、選択されたトピック、アクセスしたホスト、およびモデルバージョンとパスを閲覧できます。</figcaption></figure>

Topics API の現在の実装では、トピックはホスト名のみから推論されます。URL の他の部分からではありません。

`chrome://topics-internals` 分類器から推論されたトピックを表示するには、ホスト名のみ（プロトコルまたはパスを含めない）を使用します。Host フィールドに「/」を含めようとすると、`chrome://topics-internals` にエラーが表示されます。

### Topics API に関する情報を見る {: #view-api-information}

[分類](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)のバージョンやエポック期間といった Topics API の実装と設定に関する情報は、`chrome://topics-internals` にあります。これらの値は、コマンドラインから正常に設定された API またはパラメータのデフォルト設定を反映しています。これは、コマンドラインフラグが期待どおりに機能したことを確認するのに役立つ場合があります。

以下の例では、`time_period_per_epoch` は 15 秒に設定されています（デフォルトは 7 日です）。

<figure> {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/7vFveJtxWgY6yB8gHnW3.png",   alt="chrome://topics-internals page with Features and Parameters panel selected.",   width="800", height="695" %} <figcaption>chrome://topics-internals の Features and Parameters パネルでは、有効な機能、エポック当たりの時間、トピックの計算に使用されるエポック数、分類バージョンなどの設定を閲覧できます。 </figcaption></figure>

スクリーンショットに示されているパラメーターは、コマンド ラインから Chrome を実行するときに設定できるフラグに対応しています。たとえば、[topics-demo.glitch.me](https://topics-demo.glitch.me/) のデモでは、次のフラグの使用が推奨されています。

```text
--enable-features=BrowsingTopics:time_period_per_epoch/15s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting
```

各パラメーター、そのデフォルト値、およびその目的について、以下のリストで説明します。

#### Chrome フラグ {: #feature-flags}

<dl>
<dt>
      </dt>
<dd><code>BrowsingTopics</code></dd>
      <dd>
<strong>デフォルト値:</strong> enabled</dd>
      <dd>Topics API が有効であるかどうか。</dd>
    <br>
    <dt>
      </dt>
<dd><code>PrivacySandboxAdsAPIsOverride</code></dd>
      <dd>
<strong>デフォルト値:</strong> enabled</dd>
      <dd>広告の API（アトリビューション レポート、FLEDGE、Topics、Fenced Frames）を有効にします。</dd>
    <br>
    <dt>
      </dt>
<dd><code>PrivacySandboxSettings3</code></dd>
      <dd>
<strong>デフォルト値:</strong> disabled</dd>
      <dd>プライバシーサンドボックス UI 設定の 3 つ目のリリースを有効にします。</dd>
    <br>
    <dt>
      </dt>
<dd><code>OverridePrivacySandboxSettingsLocalTesting</code></dd>
      <dd>
<strong>デフォルト値:</strong> enabled</dd>
      <dd>有効である場合、プライバシーサンドボックス機能を有効にするためにブラウザの基本設定を有効にする必要がありません。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopicsBypassIPIsPubliclyRoutableCheck</code></dd>
      <dd>
<strong>デフォルト値:</strong> disabled</dd>
      <dd>有効である場合、トピックの計算に含まれるページの適格性を判断する際に、IP アドレスがパブリックにルーティング可能かどうかのチェックがバイパスされます。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:number_of_epochs_to_expose</code></dd>
      <dd>
<strong>デフォルト値:</strong> 3</dd>
      <dd>要求しているコンテキストに与えるトピックを計算する場所からのエポックの数。ブラウザは内部で最大 N+1 個のエポックを維持します。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:time_period_per_epoch</code></dd>
      <dd>
<strong>デフォルト値:</strong> 7d-0h-0m-0s</dd>
      <dd>各<a href="https://developer.chrome.com/docs/privacy-sandbox/topics/#:~:text=epoch">エポック</a>の期間。デバッグの場合、これをデフォルトの 7 日ではなく、（たとえば）15 秒に設定すると便利な場合があります。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:number_of_top_topics_per_epoch</code></dd>
      <dd>
<strong>デフォルト値:</strong> 5</dd>
      <dd>エポックごとに計算されたトピックの数。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:use_random_topic_probability_percent</code></dd>
      <dd>
<strong>デフォルト値:</strong> 5</dd>
      <dd>エポック内の個々のトピックが、トピックの<a href="https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md">分類</a>全体からランダムに返されるトピックである確率。ランダム性は、エポックとサイトに対してスティッキーです。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:number_of_epochs_of_observation_data_to_use_for_filtering</code></dd>
      <dd>
<strong>デフォルト値:</strong> 3</dd>
      <dd>呼び出し元のコンテキストに対してトピックをフィルタリングするために使用される API 使用状況データ（トピックの観測）のエポック数。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_keep_per_topic</code></dd>
      <dd>
<strong>デフォルト値:</strong> 1000</dd>
      <dd>上位トピックごとに保持する、observed-by コンテキストドメインの最大数。使用中のメモリを制限するのが目的です。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:max_number_of_api_usage_context_entries_to_load_per_epoch</code></dd>
      <dd>
<strong>デフォルト値:</strong> 100000</dd>
      <dd>API 使用状況コンテキストのクエリごとにデータベースから取得できるエントリの最大数。クエリは、トピックの計算時にエポックごとに 1 回発生します。ピークメモリ使用量を制限するのが目的です。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_store_per_page_load</code></dd>
      <dd>
<strong>デフォルト値:</strong> 30</dd>
      <dd>ページの読み込みごとに保存できる API 使用状況コンテキストドメインの最大数。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:config_version</code></dd>
      <dd>
<strong>デフォルト値:</strong> 1</dd>
      <dd>Topics API 構成パラメーターをエンコードします。各バージョン番号は、1 つの構成セットにのみマッピングする必要があります。<code>config_version</code> を更新せずに構成パラメーターを更新することは、通常、ローカル テストでは問題ありませんが、状況によっては、ブラウザが一貫性のない状態のままになったり、ブラウザがクラッシュしたりする可能性があります（<code>number_of_top_topics_per_epoch</code> の更新時など）。</dd>
    <br>
    <dt>
      </dt>
<dd><code>BrowsingTopics:taxonomy_version</code></dd>
      <dd>
<strong>デフォルト値:</strong> 1</dd>
      <dd>API が使用する<a href="https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md">分類</a>バージョン。</dd>
    <br>
</dl>

## サイトをオプトアウトする {: #site-opt-out}

サイトの特定のページのトピック計算をオプトアウトするには、ページに `Permissions-Policy: browsing-topics=()` [Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) ヘッダーを含めると、、そのページに限りすべてのユーザーのトピックの推論が防止されます。サイトの他のページへのその後のアクセスには影響しません。あるページで Topics API をブロックするポリシーを設定しても、他のページには影響しません。

また、Permission Policy ヘッダーを使用して Topics API へのサードパーティ アクセスを制御することにより、ページ上のトピックにアクセスできるサードパーティを制御することもできます。

`self` と任意のドメインを使用して、パラメーターとして API にアクセスできます。

たとえば、自分のオリジンと `https://example.com` をオリジンとするものを除くすべてのブラウジングコンテキスト内での Topics API の使用を完全に無効にするには、次の HTTP 応答ヘッダーを設定します。

```text
Permissions-Policy: geolocation=(self "https://example.com")
```

## 次のステップ

- [トピックの概要と仕組み](/docs/privacy-sandbox/topics/topic-classification)について学習します。<!-- トピック分類ページ、およびデモとトライアルへのリンク -->
- [デモ](/docs/privacy-sandbox/topics/demo)を試すか、[オリジントライアル](/docs/web-platform/origin-trials/)に参加します。

## 詳細

- [Topics API テクニカル Explainer](https://github.com/jkarlin/topics)
- [プライバシーサンドボックスを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)

{% Partial 'privacy-sandbox/topics-feedback.njk' %}

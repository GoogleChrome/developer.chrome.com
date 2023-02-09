---
layout: layouts/doc-post.njk
title: 'Topics API: developer guide'
subhead: |2

  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
description: |2

  Try out the Topics demo, and learn about the API and how to run Topics with flags or participate in an origin trial.
date: '2022-01-25'
updated: '2022-01-30'
authors:
  - samdutton
---

## 実装状況

このドキュメントでは、インタレストベース広告の新しい提案である Topics API について概説します。

- [Topics APIの提案](https://github.com/jkarlin/topics)の[公開ディスカッション](https://github.com/jkarlin/topics/issues)が開始し、[オリジントライアル](#origin-trial)で利用できるようになりました。
- この提案には皆さんからのフィードバックが必要です。コメントがある場合は、[Topics Explainer リポジトリ](https://github.com/jkarlin/topics)でイシューを作成するか、[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)（ウェブ広告の改善ビジネスグループ）のディスカッションに参加してください。Explainer には、さらに定義が必要な[未解決の質問](https://github.com/jkarlin/topics/issues)が多数あります。
- [プライバシーサンドボックスのタイムライン](http://privacysandbox.com/timeline)は、Topics API とその他のプライバシーサンドボックス提案の実装のタイミングを示しています。

{% Aside %}

[Topics API: latest updates](/docs/privacy-sandbox/topics/latest) details changes and enhancements to the API and implementations.

{% endAside %}

---

## Try the demo {: #demo}

There is a demo of the Topics API at [topics-demo.glitch.me](https://topics-demo.glitch.me/). This explains how to try out and debug the API for a single user.

You can also run the Topics [colab](#colab) to try out the Topics [classifier model](#classifier-model).

{% YouTube id='hEBzWuXjeTQ' %}

## Topics オリジントライアルに参加する {: #origin-trial}

Topics、[FLEDGE](/docs/privacy-sandbox/fledge)、および [アトリビューション レポート](/docs/privacy-sandbox/attribution-reporting/)の API に関するプライバシーサンドボックスの関連性と測定の[オリジントライアル](/blog/origin-trials/)が、デスクトップ版 Chrome Beta 101.0.4951.26 以降で利用できるようになりました。

参加するには、[オリジントライアルトークンに登録](/origintrials/#/view_trial/771241436187197441)してください。

トライアルに正しく登録できたら、有効なトライアルトークンを提供するページで Topics JavaScript API を試すことができます。

- &lt;head&gt; のメタタグ:<br>

    `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`

- HTTP ヘッダー:<br>

    `Origin-Trial: TOKEN_GOES_HERE`

- プログラムでトークンを指定:<br>

    ```javascript
    const otMeta = document.createElement('meta');
    otMeta.httpEquiv = 'origin-trial';
    otMeta.content = 'TOKEN_GOES_HERE';
    document.head.append(otMeta);
    ```

トピックを監視するための `document.browsingTopics()` 呼び出しなどの Topics コードを実行している iframe は、オリジンに一致するトークンを提供する必要があります。

{% Aside 'caution' %}

有効なトライアルトークンが提供されているページであっても、すべてのユーザーにプライバシーサンドボックスの関連性と測定のオリジントライアルを実施する資格があるわけではありません。

「[プライバシーサンドボックス広告の関連性と測定 API をテストする](/blog/privacy-sandbox-unified-origin-trial#eligible-users)」には、その理由が説明されています。また、オリジントライアル機能を使用する前に、それが利用可能かどうかを検出する理由と方法が示されています。

{% endAside %}

## `chrome://flags` または機能フラグを使ってテストする {: #feature-flags}

There are two ways to try the Topics API as a single user, running Chrome 101 or above:

- `chrome://flags/#privacy-sandbox-ads-apis` を有効にします。
- Run Chrome from the command line with the following flags:

```text
--enable-features=BrowsingTopics,PrivacySandboxAdsAPIsOverride,OverridePrivacySandboxSettingsLocalTesting
```

The [Topics demo](#demo) shows how to use additional flags to adjust settings such as epoch length. If you access the Topics API by running Chrome with command-line flags, don't set `chrome://flags`, as these can override command-line settings.

「[フラグを使用して Chromium を実行する](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)」には、Chrome やその他の Chromium ベースのブラウザを実行する際にコマンドラインからフラグを設定する方法について説明されています。

{% Aside %}

これは、初期テスト用の進行中の API バージョンであるため、機能が完全である、または最終的な実装を示すものと見なされるべきではありません。

[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline)には、FLEDGE とその他のプライバシーサンドボックス提案の実装時期に関する情報が提供されています。

{% endAside %}

## 機能サポートの検出

APIを使用する前に、API がブラウザでサポートされており利用可能であるかを、ドキュメントで確認してください。

```javascript
'browsingTopics' in document && document.featurePolicy.allowsFeature('browsing-topics') ?
  console.log('document.browsingTopics() is supported on this page') :
  console.log('document.browsingTopics() is not supported on this page');
```

{% Aside 'caution' %}

現在のページで機能がサポートされていても、API が使用可能であることは保証されません。ユーザーがブラウザの設定で API を無効にしたり、API の使用を妨げる他の設定が使用されていたりする可能性があるためです。ユーザーのプライバシーを保護する理由から、このことをプログラムでチェックする方法は存在しません。

{% endAside %}

---

## この API が必要な理由

Topics APIは、ユーザーがアクセスしたサイトを追跡せずに、インタレストベース広告を可能にするメカニズムに関する[プライバシーサンドボックス](/docs/privacy-sandbox/overview/)提案です。

{% Aside %}

**インタレストベース広告（IBA）** は、ユーザーが最近アクセスしたサイトから推測された、ユーザーの興味に基づいて広告が選択されるパーソナライズされた広告の形態です。これは、ユーザーがアクセスしているページのコンテンツと照合することを目的としたコンテンツターゲット広告とは異なります。

IBA は、広告主が潜在的な顧客にリーチするのを支援し、コンテンツターゲット広告だけでサイトへのアクセスを簡単に収益化できない Web サイトに資金を提供するのに役立ちます。 IBA は、現在のページのコンテキスト情報を補足して、ユーザーにとって適切な広告を表示できるようにします。

{% endAside %}

Topics API は、ユーザーが現在関心を持っている可能性のあるトピックを、最近の閲覧アクティビティに基づいて提供する方法を提案します。 これらのトピックはコンテキスト情報を補足し、適切な広告を選択できるようにします。

Topics API には、次の 3 つの主要なタスクがあります。

- Web サイトのホスト名を関心のあるトピックにマッピングする。 たとえば、ヨガの Web サイトは、「フィットネス」に関連する項目 に分類されることが考えられます。
- 最近の閲覧アクティビティに基づいて、ユーザーの上位のトピックを計算する。
- ユーザーが現在関心を持っているトピックを提供し、適切な広告を選択できるようにする JavaScript API を提供します。

Topics API は、人が認識可能かつハイレベルなトピックで構成されているため、堅牢なユーザー制御が容易に可能です。 Chrome では、個々のトピックを削除するオプションと、ブラウザーに保存されているトピックを表示するオプションを提供する予定です。

### トピックの分類と選択の方法

トピックは[分類体系](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)から選択されます。これは、「カントリーミュージック」、「メークアップとコスメ」、「ベジタリアン料理」などの項目のリストです。これらのトピックは、当初、テスト用に Chrome で分類されますが、最終的には、トピックの分類は、エコシステムに貢献している信頼された組織によって管理されることを目指しています。多くのブラウザーが各トピックに関連付けられるように、分類に使用されるトピックの数はある程度絞る必要があります（現在の提案は約 350 ですが、最終的なトピックの数は数百から数千になると想定されています）。

センシティブなカテゴリを避けるには、これらのトピックを公開し、人間が分類し、 最新の状態に保つ必要があります。Chrome のテスト用に提案された最初の分類は、民族性や性的指向など、[一般的にセンシティブと考えられるのカテゴリを除外](#sensitive-topics)するために人間が分類しています。

{: #classifier-model}

Topics API では、[機械学習](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)を使用して、ホスト名からトピックを推測することを提案しています。このための分類器モデルは、最初は、ブラウザベンダーまたは信頼できるサードパーティによって、人間が分類するホスト名とトピックを使用してトレーニングされます。モデルはブラウザとともに配布されるため、オープンに開発され、自由に利用できます。するとユーザーのデバイスのブラウザは、このモデルを使用して、最近アクセスしたサイトの[ホスト名](https://web.dev/same-site-same-origin/#origin)に基づいて、ユーザーに最も関心のあるトピックを計算できるようになります。

{% Aside %} Chrome's implementation of the Topics API downloads a [TensorFlow Lite](tensorflow.org/lite/guide) file representing the model, so it can be used locally on your device. The model file is in an efficient, portable format known as FlatBuffers, which has the `.tflite` filename extension.

Access the TensorFlow Lite model file, and the topics inferred for hostnames, [from the `chrome://topics internal` page](#view-inferred-topics). {% endAside %}

下の図は、アドテクプラットフォームが適切な広告を選択する方法を Topics API がどうサポートするかを単純化した例として示しています。この例では、ユーザーのブラウザに、ウェブサイトのホスト名をトピックにマッピングするための モデルが既に存在していることを前提としています。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png", alt="ユーザーが Web サイトにアクセスしてから広告 が表示されるまでの Topics API ライフサイクルのステージを示す図", width="800", height="275" %}

The Topics API lifecycle: [view a larger version](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## Topics API の仕組み

{% Aside %}

The Topics API proposal is in the [discussion phase](/docs/privacy-sandbox/proposal-lifecycle/#discussion) to gather and act on feedback from the ecosystem. The API design is not final and the details below will change as discussions progress.

{% endAside %}

Topics APIなどのインタレストベース広告を容易にするメカニズムは、提供される興味/関心のトピックが最新の状態であることを保証する必要があります。

{: #epoch}

Topics API の提案では、ブラウザは、現時点では 1 週間と提案されている「*エポック*」と呼ばれる期間の閲覧行動に基づいて、ユーザーのトピックを推測します。エポックごとに選択されたトピックは、その期間におけるユーザーの上位 5 つのトピックからランダムに選択されます。プライバシーをさらに強化し、すべてのトピックが確実に表示されるようにするため、5% の確率で分類上のすべてのトピックからランダムに選択されます。

Topics JavaScriptAPI には、`document.browsingTopics()` という 1 つのメソッドがあります。 これは、最大 3 つのトピック (直近の 3 つのエポックごとに 1 つずつ) をランダムに含む配列に解決される Promise を返します。

Topics の Explainer では、`document.browsingTopics()` 返す配列のトピックオブジェクトごとに、3 つのプロパティが含まれることが提案されています。

- `configVersion`: 現在の構成を識別する文字列
- `modelVersion`: サイトの推測に使用される機械学習分類器を識別する文字列
- `taxonomyVersion`: ブラウザーで現在使用されているトピックの集合を識別する文字列
- `topic`: [分類体系](#how-would-topics-be-curated-and-selected)のトピックを識別する数値
- `version`: `configVersion` と `modelVersion` を組み合わせた文字列

{% Aside %}

The design of the Topics API is currently under discussion as an [explainer](https://github.com/patcg-individual-drafts/topics). The API is not finalized.

この記事で説明するパラメーターと API の詳細 (分類サイズ、1 週間に計算されるトピック数、呼び出しごとに返されるトピック数など) は、エコシステムのフィードバックを取り入れ、API に反映させることを繰り返すため、変更される可能性があります。

{% endAside %}

{: #observed-topics}

### API 呼び出し元は観測したトピックのみを受信する

Topics API の設計目標は、現在サードパーティ Cookie よりも少ない数のエンティティに情報を共有しながら、インタレスト ベース広告を実現することです。 Topics API では、制限された時間枠内で、すでにユーザーを観測した API 呼び出し元に対してのみ、そのユーザーのトピックを返すことを提案しています。

{: #caller}

{% Aside 'key-term' %}

トピック API の **呼び出し元** は、`document.browsingTopics()` JavaScript メソッドを「呼び出す」エンティティで、メソッドによって返されたトピックを使用して、関連する広告を選択できるようにします。 通常、 `document.browsingTopics()` の呼び出しは、アドテクプラットフォームなどのサードパーティのサイトに含まれているコードから実行されます。 ブラウザーが現在のドキュメントのサイトから呼び出し元を判定します。 そのため、ページのサードパーティである場合は、必ず自社サイトが所有する iframe から API を呼び出してください。

`Document.browsingTopics ()` が 1 つ以上のトピックを返すには、それらのトピックが観測されたサイトのコードと同じオリジンのコードでこのメソッドが呼び出される必要があります。

{% endAside %}

API呼び出し元は、Topics API がそのトピックにマッピングしたサイトに含まれるコードで `document.browsingTopics()` メソッドを呼び出した場合に、ユーザーのトピックを「観測」したとされます。 たとえば、次のようになります。

1. Topics API は、ホスト名 `knitting.example` を「布&amp;織物製品」を含むトピックにマッピングします。
2. `adtech.example` のコードは、`knitting.example` のページに含まれます。
3. ユーザーが `knitting.example` にアクセスします。
4. `adtech.example` のコードが `document.browsingTopics ()` を呼び出します。
5. ブラウザーが `knitting.example` で推測したトピックの 1 つは、「 布&amp;織物製品」です。
6. `adtech.example` は、そのユーザーの「布&amp;織物製品」というトピックを観測したとされます。

API の `document.browsingTopics()` メソッドは、直近の 3 つの[エポック](#epoch)で呼び出し元によってすでに観測されたトピックのみを提供します。 これにより、ユーザーに関する情報が、API が取って代わるテクノロジー (サードパーティ Cookie を含む) よりも多くのエンティティと共有されるのを防ぐことができます。

`document.browsingTopics()` によって返されるトピックの数は、[API 呼び出し元](#caller)が以前に観測したトピックの数と、ユーザーが利用できるトピックの数 (データが蓄積された週数など) によって異なります。 0 ～ 3 つのトピックが返される可能性があります。

{: #skipobservation}

{% Aside %} From Chrome 108, the `document.browsingTopics()` method can be passed an optional `{skipObservation:true}` argument.

This allows the method to return topics without causing the browser to record a topic observation (the default is `false`). In other words, `document.browsingTopics({skipObservation:true})` can be used to return topics of interest for the current user, but with no side effects. {% endAside %}

### JavaScript APIを使用してトピックにアクセスする {: #access-topics}

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

{% Aside 'warning' %} このコードスニペットは、Topics JavaScript API の使用方法を示すためにのみ提供されています。API の設計は変更される可能性があります。 {% endAside %}

#### Access topics without modifying state {: #observe-false}

A caller can specify that they would like to retrieve topics without modifying state by calling `document.browsingTopics({observe: false})`.

Including the `{observe: false}` argument means that topics can be returned, but the call will not cause the current page to be included in the weekly epoch calculation, nor will it update the list of topics observed for the caller.

### Use headers to access and observe topics {: #headers}

Rather than use the Topics JavaScript API from an iframe, topics can be accessed and marked as observed by using request and response headers:

- Topics can be accessed from the `Sec-Browsing-Topics` header of a `fetch()` or `XHR` request.
- Topics that were provided in a request header can be marked as observed by setting a `Observe-Browsing-Topics: ?1` header on the response to the request. The browser will then use those topics (that were included in the request header) for calculating topics of interest for a user.

Using request and response headers to access topics and mark them as observed can be much more performant than using the JavaScript API from an iframe. For example, the header mechanism could be used when a `fetch()` request is made to an ad server. No iframe required!

#### Demo

The demo at [topics-fetch-demo.glitch.me](https://topics-fetch-demo.glitch.me) shows how to use `fetch()` request and response headers to access topics and mark them as observed.

#### Access the `Sec-Browsing-Topics` request header to view topics

Instead of using `document.browsingTopics()` from an iframe to view topics for a user, API callers can access observed topics from the `Sec-Browsing-Topics` request header of a [`fetch()`](https://developer.mozilla.org/docs/Web/API/fetch) request that includes `{browsingTopics: true}` in its `options` parameter—or from the same header of an [`XHR`](https://developer.mozilla.org/docs/Glossary/XHR_(XMLHttpRequest)) request that sets `deprecatedBrowsingTopics` attribute to `true`.

For example:

```javascript
fetch('https://topics-server.glitch.me', {browsingTopics: true}).
  then(...);
```

In browsers that support the API, the `fetch()` request will include a `Sec-Browsing-Topics` header that lists topics observed for the request URL hostname: in this example, `topics-server.glitch.me`.

If no topics have been observed for this hostname and this user, the header is included but the value is empty. In other words, the `Sec-Browsing-Topics` header on a `fetch()` request only includes topics that have been observed for the current user's browser by a caller whose origin matches the hostname of the request URL. This is the same as if you were calling `document.browsingTopics()` from an iframe to view observed topics for the current user.

{% Aside %} The request header is sent on a request as long as it has the appropriate [permission policy](#site-opt-out) is in play, the context is secure, and user settings permit it. Topics [are not provided](https://github.com/patcg-individual-drafts/topics/issues/7) in headers for navigation requests. {% endAside %}

The Topics request header looks like this:

```text
Sec-Browsing-Topics: 186;version="chrome.1:1:2206021246";config_version="chrome.1";model_version="2206021246";taxonomy_version="1", 265;version="chrome.1:1:2206021246";config_version="chrome.1";model_version="2206021246";taxonomy_version="1"
```

This example includes two topics from the [Topics taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md), 186 and 265, along with each topic's version information.

{% Aside %} The [fetch()](https://chromium-review.googlesource.com/c/chromium/src/+/4044267) and [XHR](https://chromium-review.googlesource.com/c/chromium/src/+/4103742) implementations were first made available in Chrome 111.

Inclusion of the topics header in `XHR` requests is only available temporarily, and support will be removed in future. {% endAside %}

#### Use the `Observe-Browsing-Topics` response header to mark topics as observed

If a request includes a `Sec-Browsing-Topics` header and the response to that request includes an `Observe-Browsing-Topics: ?1` header, then topics from the request header will be marked by the browser as observed. Observed topics are eligible for calculation by the Topics API. This mechanism is designed to match the functionality provided by using the JavaScript API from an iframe.

#### Notes

- Redirects will be followed, and the topics sent in the redirect request will be specific to the redirect URL.
- The request header will not modify state for the caller unless there is a corresponding response header. That is, the topic of the page won't be considered observed, nor will it affect the user's topic calculation for the next epoch.
- The response header is only honored if the corresponding request included the topics header (or would have included the header, if the request wasn't empty).
- The URL of the request provides the registrable domain used for topic observation.

### Topics API でどの呼び出し元がどのトピックを表示できるのかを決定する方法

API 呼び出し元は、最近観察したトピックのみを受け取り、ユーザーのトピックはエポックごとに 1 回更新されます。つまり、API には、特定の呼び出し元が特定のトピックを受け取る可能性のある周期があります。

下の表は、1 つのエポックにおけるユーザーの仮説的な閲覧履歴の（非現実的に小さい）例をまとめたものです。ユーザーがアクセスしたサイトに関連付けられたトピックと、各サイトに存在する API [呼び出し元](#caller)（サイトに含まれる JavaScript コードで `document.browsingTopics()` を呼び出すエンティティ）が示されています。

<table>
  <thead>
  <tr>
  <th style="text-align: left;"><strong>サイト</strong></th>
  <th style="text-align: left;"><strong>トピック</strong></th>
  <th style="text-align: left;"><strong>サイトの API 呼び出し元</strong></th>
  </tr>
  </thead>
  <tbody>
    <tr>
    <td>yoga.example</td>
    <td>フィットネス</td>
    <td>adtech1.example adtech2.example</td>
    </tr>
    <tr>
    <td>knitting.example</td>
    <td>手工芸</td>
    <td>adtech1.example</td>
    </tr>
    <tr>
    <td>hiking-holiday.example</td>
    <td>フィットネス、旅行 &amp; 交通</td>
    <td>adtech2.example</td>
    </tr>
    <tr>
    <td>diy-clothing.example</td>
    <td>手工芸、ファッション &amp; スタイル</td>
    <td>[none]</td>
    </tr>
  </tbody>
</table>

エポックの終わり (現在の提案では 1 週間) に、Topics API はブラウザーの 1 週間の上位トピック を生成します。

- adtech1.example は、yoga.example と knitting.example で観測されたため、「フィットネス」トピックと「手工芸」のトピックを受信する資格があります。
- adtech1.example には、このユーザーの「旅行 &amp; 交通」トピックを受信する資格がありません。理由は、ユーザーが最近アクセスした「旅行 &amp; 交通」トピックに関連付けられたサイトに、adtech1.example が存在しないためです。
- adtech2.example では「フィットネス」と「旅行 &amp; 交通」のトピックは見ていますが、「手工芸」のトピックは見ていません。

ユーザーは「ファッション &amp; スタイル」というトピックを持つ diy-clothing.example にアクセスしましたが、そのサイトで Topics API への呼び出しはありませんでした。 この時点で、どの呼び出し元に対する「ファッション &amp; スタイル」トピックも API によって返されません。

第 2 週目に、ユーザーが別のサイトにアクセスします。

<table>
  <thead>
    <tr>
    <th style="text-align: left;"><strong>サイト</strong></th>
    <th style="text-align: left;"><strong>トピック</strong></th>
    <th style="text-align: left;"><strong>サイトの API 呼び出し元</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>sewing.example</td>
    <td>手工芸</td>
    <td>adtech2.example</td>
    </tr>
  </tbody>
</table>

さらに、adtech2.example のコードが diy-clothing.example に追加されます。

<table>
  <thead>
    <tr>
    <th style="text-align: left;"><strong>サイト</strong></th>
    <th style="text-align: left;"><strong>トピック</strong></th>
    <th style="text-align: left;"><strong>サイトの API 呼び出し元</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>diy-clothing.example</td>
    <td>手工芸、ファッション &amp; スタイル</td>
    <td>adtech2.example</td>
    </tr>
  </tbody>
</table>

これは、第 1 週の「フィットネス」と「旅行 &amp; 交通」に加えて、adtech2.example は「手工芸」と「ファッション &amp; スタイル」のトピックを受信できることを意味します。ただし、次のエポックである第 3 週目までは受信しません。 これにより、サードパーティが Cookie を使用する場合よりもユーザーの過去 (この場合はファッションへの関心) について得られる情報が限定的になることが担保されます。

さらに 2 週間後、ユーザーが adtech2.example のコードを含むトピックのサイトにアクセスしなかった場合、「フィットネス」と「旅行 &amp; 交通」は adtech2.example が受信資格のあるトピックのリストから削除される可能性があります。

### API がサイトのトピックを推測する方法

Topis API の Explainer は、トピックは、ウェブサイトの[ホスト名](https://github.com/jkarlin/topics#:~:text=classifier)を 0 個以上のトピックにマッピングする[分類器モデル](https://web.dev/same-site-same-origin/#origin)から抽出されることが提案されています。

追加情報（完全な URL やページコンテンツなど）を分析すると、より関連性の高い広告が可能になる可能性がありますが、プライバシーが低下する可能性もあります。

ホスト名をトピックにマッピングするための分類器モデルは公開され、Explainer ではブラウザ開発者ツールを使用してサイトのトピックを表示できる可能性について提案しています。このモデルは長期的に進化し改善され、定期的に更新されることが期待されていますが、その頻度については未だ検討中です。

#### 現在の分類器モデルはどこにありますか？

{: #manually-curated}

トピックは 10,000 件の上位ドメインに対して手動で分類されており、この分類は分類器のトレーニングに使用されています。このリストは `override_list.pb.gz` にあり、`chrome://topics-internals/` の［Classifier］タブの現在のモデルから利用できます。リスト内のドメインとトピックの関連付けは、モデル自体の出力ではなく API によって使用されます。

モデルを直接実行するには、[TensorFlow のモデルの実行ガイド](https://www.tensorflow.org/lite/guide/inference#running_a_model)をご覧ください。

`override_list.pb.gz` ファイルを検査するには、以下のようにします。

- 解凍します: `gunzip -c override_list.pb.gz > override_list.pb`
- protoc を使用して検査します: `protoc --decode_raw < override_list.pb > output.txt`

[ID を持つトピックの完全な分類体系は、GitHub で入手できます](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md)。

#### 分類器モデルに関するフィードバックまたは意見を提供するには？

Topics 提案に関するフィードバックを提供するには、[いくつかのチャンネル](/docs/privacy-sandbox/feedback/)を使用できます。分類器モデルに関するフィードバックについては、[GitHub 課題を提出](https://github.com/patcg-individual-drafts/topics/issues)するか、既存の課題に返信することをお勧めします。たとえば、以下のようなイシューをご覧ください。

- [長期的には、どのトピック分類体系を使用すべきですか？](https://github.com/patcg-individual-drafts/topics/issues/3)
- [割り当てられたトピックにサイトが一致しない場合は？](https://github.com/patcg-individual-drafts/topics/issues/2)

### ユーザーの上位 5 つのトピックが選ばれる方法

API はエポックごとに 1 つのトピック、最大 3 つのトピックを返します。 3 つのトピックが返された場合、現在のエポックと前の 2 つのエポックのトピックが含まれます。

1. 各エポックの終わりに、ブラウザーは以下の条件を満たすページのリストをコンパイルします。

    - エポック中にユーザーがこのページにアクセスした。
    - このページに `document.browsingTopics()` を呼び出すコードが含まれている。
    - API が有効になっている (例: [ユーザーまたは応答ヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)によってブロックされていない)。

2. ユーザーのデバイスのブラウザーは、Topics API によって提供される分類子モデルを使用して、各ページのホスト名としてトピックのリストにマッピングします。

3. ブラウザーにはトピックのリストが蓄積されます。

4. ブラウザーは、上位 5 つのトピックのリストを頻度に応じて生成します。

`Document.browsingTopics()` メソッドは、エポックごとに上位 5 つのトピックからランダムにトピックを返します。トピックの完全な分類からこれらのいずれかがランダムに選択される確率は 5% です。 Chrome では、ユーザーが個々のトピックを削除したり、閲覧履歴をにクリアして API から返されるトピックの数を減らしたりすることもできます。 ユーザーは API をオプトアウトすることもできます。[ユーザーオプトアウト](#opt-out)を参照してください。

{% Aside %} 現在のエポック中に観察されたトピックに関する情報は、[`chrome://topics internal` ページ](#view-current-topics)に表示されます。 {% endAside %}

### API の使用箇所をデバッグするには？ {: #debug}

The `chrome://topics-internals` page is available in Chrome on desktop if [you enable the Topics API](/docs/privacy-sandbox/topics/#feature-flags). This displays topics for the current user, topics inferred for hostnames, and technical information about the API implementation.

{% Aside %} `chrome://topics-internals` は新しいページです！デザインと機能は現在議論中です。

We're currently iterating and improving the design based on developer feedback. Add your feedback at [bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect+report+from+developer&components=Blink%3ETopicsAPI). {% endAside %}

#### ブラウザに対して計算されたトピックを表示する {: #view-current-topics}

現在および前のエポックにおいて、ブラウザに対して観察されたトピックに関する情報を表示できます。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/M253GclVFDCnvPJlTSVR.png", alt="chrome://topics-internal page with Topics State panel selected.", width="800", height="697" %}

この例では、最近アクセスしたサイトに [topics-demo-cats.glitch.me](http://topics-demo-cats.glitch.me) と [cats-cats-cats-cats.glitch.me](cats-cats-cats-cats.glitch.me) が含まれています。これを基に、Topics API は、現在のエポックの上位トピックから `Pets` と `Cats` の 2 つを選択しました。残りの 3 つのトピックについては、5 つのトピックを提供するのに十分な閲覧履歴（トピックを観察するサイト上の履歴）がないため、[ランダムに選択](https://github.com/patcg-individual-drafts/topics#:~:text=random)されています。

**Observed-by context domains (hashed)** 列には、トピックが観測されたホスト名のハッシュ値が表示されます。

#### ホスト名について推測されたトピックを表示する {: #view-inferred-topics}

1 つ以上のホスト名に対して Topics [分類器モデル](https://github.com/patcg-individual-drafts/topics#:~:text=classifier%20model)が推測したトピックを表示できます。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/SOTuE2ljC55PaYll1UP1.png", alt="chrome://topics-internal page with Classifier panel selected.", width="800", height="695" %}

{% Aside %} Topics API の現在の実装は、ホスト名からのみトピックを推測します。URL の他の部分からは推測しません。

`chrome://topics-internals` の［Classifier］から推測されたトピックを表示するには、ホスト名のみ（プロトコルまたはパスを除外）を使用します。Host フィールドに「/」を含めると、`chrome://topics-internals` にエラーが表示されます。 {% endAside %}

#### Topics API の表示を表示する {: #view-api-information}

[分類体系](/docs/privacy-sandbox/topics/#taxonomy)のバージョンや[エポック](/docs/privacy-sandbox/topics/#epoch)期間など、Topics API の実装と設定に関する情報が提供されています。これらの値は、[コマンドラインから](#feature-flags)正常に設定された API またはパラメーターのデフォルト設定を反映します。この情報は、コマンドラインフラグが期待どおりに機能したことを確認するのに役立ちます。以下の例では、`time_period_per_epoch` が 15 秒（デフォルトは 7 日）に設定されています。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/7vFveJtxWgY6yB8gHnW3.png", alt="chrome://topics-internal page with Features and Parameters panel selected.", width="800", height="695" %}

以下の表では、各パラメータの意味を説明しています。（すべての情報を見るには、水平方向にスクロールする必要があります！）

パラメーターは、コマンドラインから Chrome を実行するときに設定されるフラグに対応しています。たとえば、[topics-demo.glitch.me](https://topics-demo.glitch.me/) のデモでは、次のフラグを使用することを推奨しています。

```text
--enable-features=BrowsingTopics:time_period_per_epoch/15s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting
```

<table>
  <thead>
    <tr>
      <th style="text-align: left;"><strong>パラメーター</strong></th>
      <th style="text-align: left;"><strong>デフォルト値</strong></th>
      <th style="text-align: left;"><strong>意味</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>BrowsingTopics</code></td>
      <td>有効</td>
      <td>Topics API が有効であるかどうか。</td>
    </tr>
    <tr>
      <td><code>PrivacySandboxAdsAPIsOverride</code></td>
      <td>有効</td>
      <td>広告の API（アトリビューション レポート、FLEDGE、Topics、Fenced Frames）を有効にします。</td>
    </tr>
    <tr>
      <td><code>PrivacySandboxSettings3</code></td>
      <td>無効</td>
      <td>プライバシーサンドボックス UI 設定の 3 つ目のリリースを有効にします。</td>
    </tr>
    <tr>
      <td><code>OverridePrivacySandboxSettingsLocalTesting</code></td>
      <td>有効</td>
      <td>有効である場合、プライバシーサンドボックス機能を有効にするためにブラウザの基本設定を有効にする必要がありません。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopicsBypassIPIsPubliclyRoutableCheck</code></td>
      <td>無効</td>
      <td>有効である場合、トピックの計算に含まれるページの適格性を判断する際に、IP アドレスがパブリックにルーティング可能かどうかのチェックがバイパスされます。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:number_of_epochs_to_expose</code></td>
      <td>3</td>
      <td>要求しているコンテキストに与えるトピックを計算する場所からのエポックの数。ブラウザは内部で最大 N+1 個のエポックを維持します。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:time_period_per_epoch</code></td>
      <td style="white-space: nowrap;">7d-0h-0m-0s</td>
      <td>各<a href="https://developer.chrome.com/docs/privacy-sandbox/topics/#:~:text=epoch">エポック</a>の期間。デバッグの場合、これをデフォルトの 7 日ではなく、（たとえば）15 秒に設定すると便利な場合があります。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:number_of_top_topics_per_epoch</code></td>
      <td>5</td>
      <td>エポックごとに計算されたトピックの数。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:use_random_topic_probability_percent</code></td>
      <td>5</td>
      <td>エポック内の個々のトピックが、トピックの<a href="https://developer.chrome.com/docs/privacy-sandbox/topics/#:~:text=taxonomy">分類体系</a>全体からランダムに返される確率。ランダム性は、エポックとサイトにスティッキーです。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:number_of_epochs_of_observation_data_to_use_for_filtering</code></td>
      <td>3</td>
      <td>呼び出し元のコンテキストに対してトピックをフィルタリングするために使用される API 使用状況データ（トピックの観測）のエポック数。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_keep_per_topic</code></td>
      <td>1000</td>
      <td>上位トピックごとに保持する、observed-by コンテキストドメインの最大数。使用中のメモリを制限するのが目的です。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:max_number_of_api_usage_context_entries_to_load_per_epoch</code></td>
      <td>100000</td>
      <td>API 使用状況コンテキストのクエリごとにデータベースから取得できるエントリの最大数。クエリは、トピックの計算時にエポックごとに 1 回発生します。ピークメモリ使用量を制限するのが目的です。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:max_number_of_api_usage_context_domains_to_store_per_page_load</code></td>
      <td>30</td>
      <td>ページの読み込みごとに保存できる API 使用状況コンテキストドメインの最大数。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:config_version</code></td>
      <td>1</td>
      <td>Topics API 構成パラメーターをエンコードします。各バージョン番号は、1 つの構成セットにのみマッピングされている必要があります。ローカルテストでは、通常、`config_version` を更新せずに構成パラメーターを更新することで問題ありませんが、状況によっては、`number_of_top_topics_per_epoch` が更新されるなど、ブラウザが一貫性のない状態になったり、ブラウザがクラッシュしたりする可能性があります。</td>
    </tr>
    <tr>
      <td><code>BrowsingTopics:taxonomy_version</code></td>
      <td>1</td>
      <td>API で使用される<a href="https://developer.chrome.com/docs/privacy-sandbox/topics/#:~:text=taxonomy">分類体系</a>バージョン。</td>
    </tr>
  </tbody>
</table>

## Run the Topics colab to test topic inference {: #colab}

A colab—or colaboratory—is a data analysis tool that combines code, output, and descriptive text into one collaborative document. You can run the [Topics Model Execution Demo colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) to test topic inference using the Topics classifier model.

1. From the **Classifier** tab of the `chrome://topics-internals` page get the directory path for the `.tflite` file used by the Topics API. The [override list](#manually-curated) `.pb.gz` file is in the same directory.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/txujKqPgnQdbwmTfdPZT.png", alt="chrome://topics-internal page with Classifier panel selected and tflite file path highlighted.", width="800", height="696" %}

1. Open the [colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) and click on the folder icon.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/FcBRhBOyLm2EEU1J4ET0.png", alt="Topics API colab.", width="800", height="605" %}

1. Click the Upload icon and upload `model.tflite` and `override_list.pb.gz` from your computer to the colab.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/8PiaYhdpKUx5hyMNcVwG.png", alt="Topics API colab file upload.", width="800", height="402" %}

You can then run all the colab steps, by selecting **Run all** from the **Runtime** menu.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/gP8GmUH2xiwbEz27LbjO.png", alt="Topics API colab page, 'Run all' selected form the Runtime menu.", width="800", height="605" %}

This does the following:

1. Install the Python packages used by the colab.
2. Install the `tflite` libraries and the Topics taxonomy.
3. Define the taxonomy.
4. Run each of the Model Execution Demo steps to show how classification works for two example domains.

You'll see a green tick next to each step that completes successfully. (Each step can also be run individually, by clicking the Play button next to it.)

For each of the domains defined, you can see the topic scores inferred by the classifier. Try listing different domains to see how they compare.

{% Aside 'caution' %} For some domains you may notice a difference in topic inference, between the colab and the `chrome://topics-internals` Classifier.

This is because the colab only uses the classifier model to infer topics, whereas `chrome://topics-internals` uses Chrome's Topics implementation, which uses a [manually-curated list of topics](#manually-curated) (rather than the classifier model) for the top 10,000 sites. {% endAside %}

## FLoC に関する懸案事項に Topics API がどう対処するのか

2021 年の [FLoC](https://github.com/WICG/floc) のオリジントライアルでは、アドテクおよび Web エコシステムのコントリビューターから幅広いフィードバックを受け取りました。 特に、ユーザーを識別するために FLoC コホートがフィンガープリント面として使用されたり、ユーザーとセンシティブなカテゴリとの関連付けが明らかにされたりする可能性があるという懸念がありました。 FLoC をユーザーにとってより透過的で理解しやすいものにするための喚起もありました。

Topics API は、このフィードバックを念頭に置いて設計されており、透明性の向上、プライバシー保護の強化、センシティブなカテゴリに対するさまざまなアプローチによって、インタレストベース広告をサポートする他の方法を模索しています。

### フィンガープリントの削減

Topics API では、Topics API だけを使用してサイト全体でかなりの数のユーザーの再識別を確実に防止するために、複数のメカニズムが提案されています。

- Topics 分類は粒度の粗いトピックの集合を提供します (最初の分類の合計は約 350)。つまり、(特定のブラウザーの合計ユーザー数によりますが) 各トピックに多数のユーザーが存在する可能性を高めます。 実際、返されるトピックは 5％ の確率でランダムであるため、トピックごとのユーザーの最小数が保証されています。
- トピックは、ユーザーの上位 5 つからランダムに返されます。
- 5％ の確率で、ランダムなトピックが (全てのトピックセットから選択され) 提供されます。
- ユーザーが同じサイトに頻繁に (毎週など) アクセスする場合、サイトで実行されているコードは、1 週間に最大 1 つの新しいトピックしか学習しません。
- サイトが異なると、同じエポック内の同じユーザーでも受信するトピックが異なります。 あるサイトのユーザーに対して返されたトピックが別のサイトのユーザーに対して返されたトピックと一致する確率はわずか 5 分の 1 です。 このため、同じユーザーであるかどうかを判断するのがさらに難しくなります。
- ユーザーのトピックは週に 1 回更新されるため、情報を共有できる確率が制限されます。
- A topic will only be returned for an API caller that [previously observed the same topic](#observed-topics) for the same user recently. This approach helps limit the potential for entities to learn about (or share) information about user interests they have not observed firsthand.

{: #sensitive-topics}

### 注意が必要なトピック

Topics [分類](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)はセンシティブなカテゴリを避けるために人間が分類します。

さらに、サイトとユーザーの両方が、Topics API を[オプトアウト](#opt-out)できます。

{% Aside %}

[Topics 提案の Explainer では以下のように述べられています](https://github.com/jkarlin/topics#meeting-the-privacy-goals)。

「サードパーティ Cookie を使用すると、ユーザーがアクセスした正確な URL から、それらのページの正確なページコンテンツまで、ユーザーに関するあらゆる情報を追跡できます。これには、機密資料が無制限に含まれる可能性があります。一方、Topics API は、人間が分類するトピックの分類体系に制限されています。これは、他のものがその分類体系のトピックと統計的に相関できないということではありません。それは可能ではありますが、2 つを比較した場合、Topics の方が Cookie よりも明らかに改善されているように見受けられます。」

{% endAside %}

### ユーザー制御と透明性

ユーザーは、Topics API の目的を理解し、ユーザーについて何が言われているのかを認識し、API がいつ使用されているかを把握し、それを有効または無効にするための制御方法が提供されている必要があります。

API の人間が認識できる分類により、人々はブラウザーによって関連付けられる可能性のあるトピックについて学習、管理できます。 ユーザーは、Topics API で広告主やパブリッシャーと共有したくない具体的なトピックを削除できます。また、API と API を有効または無効にする方法についてユーザーに通知するための UX も考えられます。 Chrome は chrome: //settings/privacySandbox で Topics API の情報と設定を提供します。 また、シークレットモードにある API 呼び出し元はトピックを使用できず、閲覧履歴がクリアされるとトピックもクリアされます。

{: #opt-out}

### サイトオプトアウト

Topics API を呼び出すコードを含むサイトのみが閲覧履歴に含まれ、トピック頻度計算の対象になります。API 呼び出し元は[観測したトピックのみを受信します](#observed-topics)。 つまり、サイトまたは組み込まれたコードが API を呼び出すアクションを実行しないかぎり、サイトはトピック頻度計算の対象にはなりません。

Topics の Explainer では、以下の [Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) ヘッダーを使用して、サイトが訪問者に対するトピックの計算をブロックできるようにすることも提案されています。

```text
Permissions-Policy: browsing-topics=()
```

### ユーザーオプトアウト

Topics API の Explainer では、次の場合に返されるトピックのリストが空になることが[提案](https://github.com/jkarlin/topics#:~:text=empty)されています。

- ユーザーが chrome: //settings/privacySandbox のブラウザー設定を使用して Topics API をオプトアウトする。
- ユーザーが (chrome://settings/privacySandbox のブラウザー設定を使用して) トピックをクリアしたか、[Cookie をクリア](https://support.google.com/accounts/answer/32050)した。
- ブラウザーがシークレットモードである。

Explainer では、[プライバシー目標](https://github.com/jkarlin/topics#meeting-the-privacy-goals)と、API がどのようにプラバシー目標に対処しているのかについて、詳細を提供しています。

---

## 議論への参加とフィードバックの共有

- **GitHub**: [提案の Explainer](https://github.com/jkarlin/topics) を読み、質問を提起し、[提案リポジトリに関する問題](https://github.com/jkarlin/topics/issues)のディスカッションをフォローしてください。
- **W3C**: [Web 広告事業の改善グループ](https://www.w3.org/community/web-adv/participants)で、業界ユースケースについて議論できます。
- **Topics API の通知**: [groups.google.com/a/chromium.org/g/topics-api-announce](https://groups.google.com/a/chromium.org/g/topics-api-announce) でメーリングリストに参加するか、閲覧できます。
- **プライバシーサンドボックス開発者サポート**: [プライバシーサンドボックス開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、ディスカッションに参加します。

## 詳細

- [Topics API 技術解説](https://github.com/jkarlin/topics)
- [プライバシーサンドボックスを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)

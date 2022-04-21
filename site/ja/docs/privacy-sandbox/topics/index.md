---
layout: 'layouts/doc-post.njk'
title: 'Topics API'
subhead: >
  ユーザーがアクセスしたサイトを追跡せずに、インタレストベース広告を可能にします。
description: >
  ユーザーがアクセスしたサイトを追跡せずに、インタレストベース広告を可能にするメカニズムの提案。
date: 2022-01-25
updated: 2022-03-31
authors:
  - samdutton
---


## 実装状況

このドキュメントでは、インタレストベース広告の新しい提案である Topics API について概説します。

-  [Topics API 提案](https://github.com/jkarlin/topics)は[公開 ディスカッション](https://github.com/jkarlin/topics/issues)に入り、オリジントライアルで利用可能になりました。
-  この提案にはフィードバックが必要です。 コメントがあれば、[Topics Explainer リポジトリ](https://github.com/jkarlin/topics)で問題を報告するか、 [Web 広告の改善ビジネスグループ](https://www.w3.org/community/web-adv/participants)でのディスカッションに参加してください。 Explainer には、さらに定義が必要な多数の[未解決のイシュー](https://github.com/jkarlin/topics/issues)があります。
-  [プライバシーサンドボックスのタイムライン](http://privacysandbox.com/timeline)は、Topics API とその他のプライバシーサンドボックス提案の実装のタイミングを示しています。

---

## chrome://flags または機能フラグでテストする {: #feature-flags}

Chrome Canary 102 を実行している単一のユーザーに対して Topics API を試すことができます。
* コマンドラインから `privacySandboxAdSapisOverride`  フラグを設定する
* `chrome://flags/#privacy-sandbox-ads-apis` を有効にする

[フラグを使用してChromiumを実行する](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)では、コマンド行から Chrome およびその他の Chromium ベースのブラウザーを実行するときにフラグを設定する方法を説明しています。

{% Aside %}

これは、初期テストに向けた開発中の API バージョンであるため、機能が完全である、または最終的な実装を示しているとは見なさないでください。

[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline)には、FLEDGE とその他のプライバシーサンドボックス提案の実装時期に関する情報が提供されています。

{% endAside %}

## 機能サポートの検出

API を使用する前に、ページで使用できるかどうかを確認してください。 たとえば、次のようになります。

```javascript
'browsingTopics' in document ?
  console.log ('Document.browsingTopics() はこのページでサポートされています'):
  console.log ('Document.browsingTopics() はこのページでサポートされていません');
```

{% Aside 'caution' %}

現在のページでの機能のサポートは、API が使用可能であることを保証するものではありません。ユーザーがブラウザー設定で API を無効にしたり、API の使用が防止される他の設定が存在する可能性があります。 ユーザーのプライバシーを保護するために、これをプログラムで確認する方法はありません。

{% endAside %}

---

## この API が必要な理由

Topics API は 、ユーザーがアクセスしたサイトを追跡せずに、インタレストベース広告を可能にするメカニズムのための[プライバシーサンドボックス](/docs/privacy-sandbox/overview/) の提案 です。

{% Aside %}

**インタレストベース広告 (IBA)** はパーソナライズド広告の一形態で、最近アクセスしたサイトから推測されるユーザーの興味/関心に基づいて広告が選択されます。 これは、ユーザーがアクセスしているページのコンテンツと照合することを目的としたコンテンツターゲット広告とは異なります。

IBA は、広告主が潜在的な顧客にリーチするのを支援し、コンテンツターゲット広告だけでサイトへのアクセスを簡単に収益化できない Web サイトに資金を提供するのに役立ちます。 IBA は、現在のページのコンテキスト情報を補足して、ユーザーにとって適切な広告を表示できるようにします。

{% endAside %}

Topics API は、ユーザーが現在関心を持っている可能性のあるトピックを、最近の閲覧アクティビティに基づいて提供する方法を提案します。 これらのトピックはコンテキスト情報を補足し、適切な広告を選択できるようにします。

Topics API には、次の 3 つの主要なタスクがあります。

-  Web サイトのホスト名を関心のあるトピックにマッピングする。 たとえば、ヨガの Web サイトは、「フィットネス」に関連する項目 に分類されることが考えられます。
-  最近の閲覧アクティビティに基づいて、ユーザーの上位のトピックを計算する。
-  ユーザーが現在関心を持っているトピックを提供する JavaScript API を提供し、適切な広告を選択できるようにする。

Topics API は、人が認識可能かつハイレベルなトピックで構成されているため、堅牢なユーザー制御が容易に可能です。 Chrome では、個々のトピックを削除するオプションと、ブラウザーに保存されているトピックを表示するオプションを提供する予定です。

## トピックの分類と選択の方法

トピックは[分類体系](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)から選択されます。これは、「カントリーミュージック」、「メークアップ&nbsp;&&nbsp;コスメ」、「ベジタリアン料理」などの項目のリストです。 これらのトピックは、当初、テスト用に Chrome で分類されますが、最終的には、トピックの分類は、エコシステムに貢献している信頼された組織によって管理されることを目指しています。 できる限り多くのブラウザーが各トピックに関連付けられるように、分類はに使用されるトピックの数はある程度絞る必要があります (現在の提案は約 350 ですが、最終的なトピックの数は数百から数千になると想定されています)。 センシティブなカテゴリを避けるには、これらのトピックを公開し、人間が分類し、 最新の状態に保つ必要があります。 Chrome のテスト用に提案された最初の分類は、民族性や性的指向など、[一般的にセンシティブと考えられるのカテゴリを除外](#sensitive-topics)するために人間が分類しています。

Topics API では、[機械学習](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)を使用して、ホスト名からトピックを推測することを提案しています。 このための分類子モデルは、最初は、ブラウザーベンダー、または信頼できるサードパーティによって、人間が分類するホスト名とトピックを使用して学習されます。 モデルはブラウザーとともに配布されるため、オープンに開発され、自由に利用できます。 ユーザーのデバイスのブラウザーは、このモデルを使用して、最近アクセスしたサイトの [のホスト名](https://web.dev/same-site-same-origin/#origin) に基づいて、ユーザーに最も関心のあるトピックを計算できます。 以下の図は、アドテクプラットフォームが適切な広告を選択する方法を Topics API がどうサポートするかを単純化した例として示しています。 この例では、ユーザーのブラウザーに、Web サイトのホスト名をトピックにマッピングするための モデルが既に存在していることを前提としています。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png", alt="ユーザーが Web サイトにアクセスしてから広告 が表示されるまでの Topics API ライフサイクルのステージを示す図", width="800", height="275" %}

Topics API ライフサイクル: [拡大バージョンを表示](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## Topics API の仕組み

{% Aside %}

Topics API の提案は、エコシステムからフィードバックを収集し、そのフィードバックに基づいて行動するための[最初のディスカッションフェーズ](/docs/privacy-sandbox/cds21-update/#discussion)です。

API 設計は最終段階ではなく、検討が進むにつれて次の詳細内容が変更されます。

{% endAside %}

Topics APIなどのインタレストベース広告を容易にするメカニズムは、提供される興味/関心のトピックが最新の状態であることを保証する必要があります。

{: #epoch}

Topics API の提案では、ブラウザーは、「エポック」と呼ばれる期間（現在 1 週間と提案されている）の閲覧アクティビティに基づいて、ユーザーのトピックを推測します。 エポックごとに選択されたトピックは、その期間におけるユーザーの上位 5 つのトピックからランダムに選択されます。 プライバシーをさらに強化し、すべてのトピックが確実に表示されるようにするため、5% の確率で分類上のすべてのトピックからランダムに選択されます。

Topics JavaScriptAPI には、`document.browsingTopics()` という 1 つのメソッドがあります。 これは、最大 3 つのトピック (直近の 3 つのエポックごとに 1 つずつ) をランダムに含む配列に解決される Promise を返します。

Topics の Explainer では、`document.browsingTopics ()` によって返される配列の各トピックオブジェクトに次の 3 つのプロパティを設定することを提案しています。

-  `value`: 分類体系のトピックを識別する数値
-  `taxonomyVersion`: ブラウザーで現在使用されているトピックの集合を識別する文字列
-  `classifierVersion`: ホスト名からサイトのトピックを推測するために使用される機械学習分類子を識別する文字列

{% Aside %}

現在、Topics API の設計は、[Explainer](https://github.com/jkarlin/topics) として議論されています。これは標準化プロセスの最初のステップに過ぎません。 API は確定されていません。

この記事で説明するパラメーターと API の詳細 (分類サイズ、1 週間に計算されるトピック数、呼び出しごとに返されるトピック数など) は、エコシステムのフィードバックを取り入れ、API に反映させることを繰り返すため、変更される可能性があります。

{% endAside %}

{: #observed-topics}

### API 呼び出し元は観測したトピックのみを受信する

Topics API の設計目標は、現在サードパーティ Cookie よりも少ない数のエンティティに情報を共有しながら、インタレスト ベース広告を実現することです。 Topics API では、制限された時間枠内で、すでにユーザーを観測した API 呼び出し元に対してのみ、そのユーザーのトピックを返すことを提案しています。

{: #caller}

{% Aside 'key-term' %}

トピック API の**呼び出し元**は、`document.browsingTopics()` JavaScript メソッドを「呼び出す」エンティティで、メソッドによって返されたトピックを使用して、関連する広告を選択できるようにします。 通常、 `document.browsingTopics()` の呼び出しは、アドテクプラットフォームなどのサードパーティのサイトに含まれているコードから実行されます。 ブラウザーが現在のドキュメントのサイトから呼び出し元を判定します。 そのため、ページのサードパーティである場合は、必ず自社サイトが所有する iframe から API を呼び出してください。

`Document.browsingTopics ()` が 1 つ以上のトピックを返すには、それらのトピックが観測されたサイトのコードと同じオリジンのコードでこのメソッドが呼び出される必要があります。

{% endAside %}

API呼び出し元は、Topics API がそのトピックにマッピングしたサイトに含まれるコードで `document.browsingTopics()` メソッドを呼び出した場合に、ユーザーのトピックを「観測」したとされます。 たとえば、次のようになります。

1. Topics API は、ホスト名 `knitting.example` を「布&織物製品」を含むトピックにマッピングします。
1. `adtech.example` のコードは、`knitting.example` のページに含まれます。
1. ユーザーが `knitting.example` にアクセスします。
1. `adtech.example` のコードが `document.browsingTopics ()` を呼び出します。
1. ブラウザーが `knitting.example` で推測したトピックの 1 つは、「 布&織物製品」です。
1. `adtech.example` は、そのユーザーの「布&織物製品」というトピックを観測したとされます。

API の `document.browsingTopics()` メソッドは、直近の 3 つの[エポック](#epoch)で呼び出し元によってすでに観測されたトピックのみを提供します。 これにより、ユーザーに関する情報が、API が取って代わるテクノロジー (サードパーティ Cookie を含む) よりも多くのエンティティと共有されるのを防ぐことができます。

`document.browsingTopics()` によって返されるトピックの数は、[API 呼び出し元](#caller)が以前に観測したトピックの数と、ユーザーが利用できるトピックの数 (データが蓄積された週数など) によって異なります。 0 ～ 3 つのトピックが返される可能性があります。

### Topics JavaScript API の記述例

次のコードは、考えられる API の使用方法の基本的な例を示しています (簡潔にするために、エラー 処理はありません)。

{% Aside 'warning' %}

このコードスニペットは Topics JavaScript API の記述例です。 API の設計は変更される可能性があり、このコードは現在どのブラウザでも動作しません。

{% endAside %}


```javascript
// このユーザーの上位トピックの配列を取得する。
const topics = await document.browsingTopics();

// 広告クリエイティブを要求する。
const response = await fetch('https://ads.example/get-creative', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(topics)
})

// 応答から JSON を取得する。
const creative = await response.json();

// 広告を表示する。
```

### Topics API でどの呼び出し元がどのトピックを表示できるのかを決定する方法

API 呼び出し元は最近観測されたトピックのみを受信します。ユーザーのトピックはエポックごとに 1 回更新されます。 つまり、API は定期的に繰り返される時間枠を提供し、その時間枠内では特定の呼び出し元が特定のトピックを受信できます。 次の表は、1 つのエポックにおけるユーザーの仮説的な閲覧履歴の例 (確率的に非常に小さい) の概要を示します。ユーザーがアクセスしたサイトに関連付けられたトピックと、API [呼び出し元](#caller) が各サイト (サイトに含まれる JavaScript コードで `document.browsingTopics ()` を呼び出すエンティティ) に提示するトピックを示します。

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
    <td>フィットネス、旅行 & 交通</td>
    <td>adtech2.example</td>
    </tr>
    <tr>
    <td>diy-clothing.example</td>
    <td>手工芸、ファッション & スタイル</td>
    <td>[none]</td>
    </tr>
  </tbody>
</table>

エポックの終わり (現在の提案では 1 週間) に、Topics API はブラウザーの 1 週間の上位トピック を生成します。

-  adtech1.example は、yoga.example と knitting.example で観測されたため、「フィットネス」トピックと「手工芸」のトピックを受信する資格があります。
-  adtech1.example には、このユーザーの「旅行 & 交通」トピックを受信する資格がありません。理由は、ユーザーが最近アクセスした「旅行 & 交通」トピックに関連付けられたサイトに、adtech1.example が存在しないためです。
-  adtech2.example では「フィットネス」と「旅行 & 交通」のトピックは見ていますが、「手工芸」のトピックは見ていません。

ユーザーは「ファッション & スタイル」というトピックを持つ diy-clothing.example にアクセスしましたが、そのサイトで Topics API への呼び出しはありませんでした。 この時点で、どの呼び出し元に対する「ファッション & スタイル」トピックも API によって返されません。

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
    <td>手工芸、ファッション & スタイル</td>
    <td>adtech2.example</td>
    </tr>
  </tbody>
</table>

これは、第 1 週の「フィットネス」と「旅行 & 交通」に加えて、adtech2.example は「手工芸」と「ファッション & スタイル」のトピックを受信できることを意味します。ただし、次のエポックである第 3 週目までは受信しません。 これにより、サードパーティが Cookie を使用する場合よりもユーザーの過去 (この場合はファッションへの関心) について得られる情報が限定的になることが担保されます。

さらに 2 週間後、ユーザーが adtech2.example のコードを含むトピックのサイトにアクセスしなかった場合、「フィットネス」と「旅行 & 交通」は adtech2.example が受信資格のあるトピックのリストから削除される可能性があります。

### API がサイトのトピックを推測する方法

Topics API Explainer は、トピックが[分類子 モデル](https://github.com/jkarlin/topics#:~:text=classifier)から派生し、Web サイト[ホスト名](https://web.dev/same-site-same-origin/#origin)を 0 個以上のトピックにマッピングすることを提案しています。 追加情報 (完全な URL やページコンテンツなど) を分析すると、関連性の高い広告が有効になりますが、プライバシーが低下する可能性もあります。 ホスト名をトピックにマッピングするための分類子モデルは公開され、Explainer ではブラウザー開発者ツールを使用してサイトのトピックを表示できると提案しています。 マッピングモデルは定期的に更新されます。更新の頻度は現在検討中です。

### ユーザーの上位 5 つのトピックが選ばれる方法

API はエポックごとに 1 つのトピック、最大 3 つのトピックを返します。 3 つのトピックが返された場合、現在のエポックと前の 2 つのエポックのトピックが含まれます。

1. 各エポックの終わりに、ブラウザーは以下の条件を満たすページのリストをコンパイルします。
   - エポック中にユーザーがこのページにアクセスした。
   - このページに `document.browsingTopics()` を呼び出すコードが含まれている。
   - API が有効になっている (例: [ユーザーまたは応答ヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)によってブロックされていない)。

1. ユーザーのデバイスのブラウザーは、Topics API によって提供される分類子モデルを使用して、各ページのホスト名としてトピックのリストにマッピングします。
1. ブラウザーにはトピックのリストが蓄積されます。
1. ブラウザーは、上位 5 つのトピックのリストを頻度に応じて生成します。

`Document.browsingTopics()` メソッドは、エポックごとに上位 5 つのトピックからランダムにトピックを返します。トピックの完全な分類からこれらのいずれかがランダムに選択される確率は 5% です。 Chrome では、ユーザーが個々のトピックを削除したり、閲覧履歴をにクリアして API から返されるトピックの数を減らしたりすることもできます。 ユーザーは API をオプトアウトすることもできます。[ユーザーオプトアウト](#opt-out)を参照してください。

## FLoC に関する懸案事項に Topics API がどう対処するのか

2021 年の [FLoC](https://github.com/WICG/floc) のオリジントライアルでは、アドテクおよび Web エコシステムのコントリビューターから幅広いフィードバックを受け取りました。 特に、ユーザーを識別するために FLoC コホートがフィンガープリント面として使用されたり、ユーザーとセンシティブなカテゴリとの関連付けが明らかにされたりする可能性があるという懸念がありました。 FLoC をユーザーにとってより透過的で理解しやすいものにするための喚起もありました。

Topics API は、このフィードバックを念頭に置いて設計されており、透明性の向上、プライバシー保護の強化、センシティブなカテゴリに対するさまざまなアプローチによって、インタレストベース広告をサポートする他の方法を模索しています。

### フィンガープリントの削減

Topics API では、Topics API だけを使用してサイト全体でかなりの数のユーザーの再識別を確実に防止するために、複数のメカニズムが提案されています。

-  Topics 分類は粒度の粗いトピックの集合を提供します (最初の分類の合計は約 350)。つまり、(特定のブラウザーの合計ユーザー数によりますが) 各トピックに多数のユーザーが存在する可能性を高めます。 実際、返されるトピックは 5％ の確率でランダムであるため、トピックごとのユーザーの最小数が保証されています。
-  トピックは、ユーザーの上位 5 つからランダムに返されます。
-  5％ の確率で、ランダムなトピックが (全てのトピックセットから選択され) 提供されます。
-  ユーザーが同じサイトに頻繁に (毎週など) アクセスする場合、サイトで実行されているコードは、1 週間に最大 1 つの新しいトピックしか学習しません。
-  サイトが異なると、同じエポック内の同じユーザーでも受信するトピックが異なります。 あるサイトのユーザーに対して返されたトピックが別のサイトのユーザーに対して返されたトピックと一致する確率はわずか 5 分の 1 です。 このため、同じユーザーであるかどうかを判断するのがさらに難しくなります。
-  ユーザーのトピックは週に 1 回更新されるため、情報を共有できる確率が制限されます。
-  トピックは、最近同じユーザーに対して[同じトピックを観察した](#observed-topics) API 呼び出し元に対してのみ返されます。 このモデルは、エンティティが最初に観測していなかったユーザーの興味/関心に関する情報を知る (または共有する) 可能性を制限するのに役立ちます。

{: #sensitive-topics}

### 注意が必要なトピック

Topics [分類](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)はセンシティブなカテゴリを避けるために人間が分類します。

さらに、サイトとユーザーの両方が、Topics API を[オプトアウト](#opt-out)できます。

{% Aside %}

[Topics API の提案の Explainer では次のように説明されています。](https://github.com/jkarlin/topics#meeting-the-privacy-goals) 「サードパーティ Cookie を使用して、ユーザーがアクセスした正確な URL から、それらのページの正確なページコンテンツまで、ユーザーに関するあらゆる情報を追跡できます。 これには、センシティブな資料が無限に含まれる可能性があります。 一方、Topics API は、人間が管理するトピックの分類法に制限されています。 他の項目がその分類のトピックと統計的に相関することができないわけではありません。 これは可能です。 しかし、2 つを比較すると、Topics は Cookie よりも明らかに改善されているようです。」


{% endAside %}

### ユーザー制御と透明性

ユーザーは、Topics API の目的を理解し、ユーザーについて何が言われているのかを認識し、API がいつ使用されているかを把握し、それを有効または無効にするための制御方法が提供されている必要があります。

API の人間が認識できる分類により、人々はブラウザーによって関連付けられる可能性のあるトピックについて学習、管理できます。 ユーザーは、Topics API で広告主やパブリッシャーと共有したくない具体的なトピックを削除できます。また、API と API を有効または無効にする方法についてユーザーに通知するための UX も考えられます。 Chrome は chrome: //settings/privacySandbox で Topics API の情報と設定を提供します。 また、シークレットモードにある API 呼び出し元はトピックを使用できず、閲覧履歴がクリアされるとトピックもクリアされます。

{: #opt-out}

### サイトオプトアウト

Topics API を呼び出すコードを含むサイトのみが閲覧履歴に含まれ、トピック頻度計算の対象になります。API 呼び出し元は[観測したトピックのみを受信します](#observed-topics)。 つまり、サイトまたは組み込まれたコードが API を呼び出すアクションを実行しないかぎり、サイトはトピック頻度計算の対象にはなりません。

Topics API の Explainer では、次の [Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) ヘッダーを使用して、サイトが訪問者のトピック計算をブロックできるようにすることも提案されています。

```text
Permissions-Policy: browsing-topics=()
```

{% Aside %}

FLOC の既存の Permissions-Policy `interest-cohort=()` もトピック計算を禁止します。

{% endAside %}

### ユーザーオプトアウト

Topics API の Explainer では、次の場合に返されるトピックのリストが空になることが[提案](https://github.com/jkarlin/topics#:~:text=empty)されています。

-  ユーザーが chrome: //settings/privacySandbox のブラウザー設定を使用して Topics API をオプトアウトする。
-  ユーザーが (chrome://settings/privacySandbox のブラウザー設定を使用して) トピックをクリアしたか、[Cookie をクリア](https://support.google.com/accounts/answer/32050)した。
-  ブラウザーがシークレットモードである。

Explainer では、[プライバシー目標](https://github.com/jkarlin/topics#meeting-the-privacy-goals)と、API がどのようにプラバシー目標に対処しているのかについて、詳細を提供しています。

---

## 議論への参加とフィードバックの共有

-  **GitHub**: [提案の Explainer](https://github.com/jkarlin/topics) を読み、質問を提起し、[提案リポジトリに関する問題](https://github.com/jkarlin/topics/issues)のディスカッションをフォローしてください。
-  **W3C**: [Web 広告事業の改善グループ](https://www.w3.org/community/web-adv/participants)で、業界ユースケースについて議論できます。
-  **Topics API の通知**: [groups.google.com/a/chromium.org/g/topics-api-announce](https://groups.google.com/a/chromium.org/g/topics-api-announce) でメーリングリストに参加するか、閲覧できます。
-  **プライバシーサンドボックス開発者サポート**: [プライバシーサンドボックス開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、ディスカッションに参加します。

## 詳細

-  [Topics API 技術解説](https://github.com/jkarlin/topics)
-  [プライバシーサンドボックスを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)

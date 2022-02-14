---
layout: 'layouts/doc-post.njk'
title: 'Topics API'
subhead: >
  Enable interest-based advertising, without having to resort to tracking the sites a user visits.
description: >
 A proposal for a mechanism to enable interest-based advertising without having to resort to tracking the sites a user visits.
date: 2022-02-14
updated: 2022-02-14
authors:
  - samdutton
---

## 実装ステータス

このドキュメントでは、インタレスト ベース広告に関する新しい提案「Topics API」の概要を説明します。

-  [Topics API
   の提案](https://github.com/jkarlin/topics)は、[公開での検討段階](https://github.com/jkarlin/topics/issues)にあります。
-  この提案についてフィードバックをお寄せください。ご協力いただける場合は、[「Topics API
   の解説」リポジトリ](https://github.com/jkarlin/topics)で問題を作成するか、 
   [「ウェブ広告ビジネスの改善」グループ](https://www.w3.org/community/web-adv/participants)で意見交換に参加してください。この解説には、さらなる定義が必要な[未解決の質問](https://github.com/jkarlin/topics/issues)が多く残っています。
-  この API はまだどのブラウザにも実装されていません。
-  [プライバシー サンドボックスのタイムライン](http://privacysandbox.com/timeline)では、Topics API や他のプライバシー
   サンドボックスに関する提案の実装スケジュールをご確認いただけます。

## この API が必要な理由

Topics API は、ユーザーがアクセスしたサイトをトラッキングせずにインタレスト ベースの広告を掲載できるようにする、[プライバシー
サンドボックス](/docs/privacy-sandbox/overview/)に関連した提案です。

{% Aside %}

**インタレスト
ベース広告（IBA）**は、パーソナライズド広告の一種で、ユーザーが最近アクセスしたサイトから推定される興味や関心に基づいて広告が選ばれます。これは、ユーザーが閲覧しているページの内容に合わせて表示されるコンテンツ
ターゲット広告とは異なります。  
IBA は、広告主が潜在顧客にリーチできる有効な手段です。パブリッシャーにとっては、コンテンツ ターゲット広告だけでは収益化が難しいサイトで資金を得る手段となります。また、IBA
は現在のページのコンテキスト情報を補完し、ユーザーに関連性の高い広告を提供するうえでも役立ちます。  

{% endAside %}

Topics API
は、ユーザーの最近の閲覧アクティビティに基づいて、関心を持ちそうなトピックを提供する手段を提案するものです。こうしたトピックは、コンテキスト情報と合わせて、関連性の高い広告の選択に使用できます。  
Topics API は主に次の 3 つのタスクを行います。

-  ウェブサイトのホスト名を、関心のあるトピックにマッピングする。たとえば、ヨガのウェブサイトは「フィットネス」に関するカテゴリに分類されます。
-  最近の閲覧アクティビティに基づいて、ユーザーが最も関心を持っているトピックを推定する。
-  JavaScript API により、現在ユーザーが関心を持っているトピックを返し、適切な広告を選択できるようにする。

Topics API は高度に分類された判読可能なトピックに基づいて構築されているため、ユーザーは詳細な管理が可能となります。Chrome
では、個々のトピックの削除や、ブラウザに保存されているトピックの確認をできるようにする予定です。

## トピックの選定方法

トピックは、「カントリー
ミュージック」、「メイク、化粧品」、「ベジタリアン料理」などの[分類](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)リストから選定されます。トピックはテストのため最初は
Chrome
で選定されますが、最終的には信頼できるエコシステムの協力者によるトピック分類の維持管理を目標としています。分類においては、各トピックにより多くのブラウザが関連付けられるよう、トピック数を必要最小限にする必要があります（現在は
350 程度ですが、数百から数千の間になると想定しています）。デリケートなカテゴリが含まれないよう、トピックは公開され、判読可能で、常に更新される必要があります。テストのため Chrome
により提供される最初の分類は、手動で選定され、[一般的にデリケートと考えられるカテゴリ](#sensitive-topics)（民族や性的指向など）は除外されます。
  
Topics API
では、[機械学習](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)を使用して、ホスト名からトピックを推定します。この分類モデルは、最初の段階ではブラウザのベンダーや信頼できる第三者によって、手動で選定されたホスト名やトピックを使用してトレーニングされます。モデルはブラウザで配布されるため、自由に開発、使用できます。ユーザーのデバイスのブラウザでは、このモデルを使用し、最近アクセスしたサイトの[ホスト名](https://web.dev/same-site-same-origin/#origin)に基づいて、ユーザーが最も関心を持っているトピックを推定します。  
以下の図は、Topics API がアドテック
プラットフォームの適切な広告選択にどのように役立つかをわかりやすく示したものです。この例では、ウェブサイトのホスト名をトピックにマッピングするモデルがユーザーのブラウザに組み込み済みであることを前提としています。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
  alt="Diagram showing the stages in the Topics API lifecycle, from a user visiting websites to an ad
  being displayed.", width="800", height="275" %}

Topics API のライフサイクル:
[拡大版を表示](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## Topics API の仕組み

{% Aside %}

Topics API
の提案は、エコシステムからフィードバックを集めて反映する、[最初の検討段階](/docs/privacy-sandbox/cds21-update/#discussion)にあります。
API の設計は最終的なものではなく、以下の仕様は検討の過程で変わる可能性があります。  

{% endAside %}

Topics API のようなインタレスト ベース広告をサポートするメカニズムでは、関心のあるトピックが最新の状態に保たれている必要があります。  

{: #epoch}

Topics API の提案では、ブラウザで_エポック_と呼ばれる一定期間（提案では現在 1
週間）の閲覧アクティビティに基づいてユーザーのトピックを推定します。エポックごとに選ばれるトピックは、その期間にユーザーが最も関心を持っている 5
つのトピックからランダムに抽出したものとなります。プライバシーを強化し、すべてのトピックが使用されるように、20 回に 1 回は分類に含まれる可能性があるすべてのトピックから無作為に選ばれます。  
Topics JavaScript API には、`document.browsingTopics()` というメソッドがあり、最近の 3 つのエポックから 1
つずつ選ばれたトピックをランダムな順序の配列で返します。  
Topics API の解説では、`document.browsingTopics()` で返す配列の各トピック オブジェクトに次の 3 つのプロパティを含めることを提案しています。

-  `id`: 分類におけるトピックの ID
-  `taxonomyVersion`: ブラウザで現在使用されているトピックのセット
-  `classifierVersion`: ホスト名からのサイトのトピックの推定に使用されている機械学習の分類システム

{% Aside %}

現在、Topics API の設計は、[解説](https://github.com/jkarlin/topics)として検討中で、標準化プロセスの最初の段階にあり、確定版ではありません。  
この記事で説明したパラメータや API の詳細（分類トピックの数、1 週間に推定されるトピックの数、1 回の呼び出しで返されるトピックの数など）は、エコシステムからのフィードバックに基づく
API の調整に伴い変わる可能性があります。

{% endAside %}

{: #observed-topics}

### API 呼び出し元は確認済みのトピックのみを受け取る

Topics API の設計目標は、現在使用されているサードパーティの Cookie よりも情報を共有するエンティティの数を抑えて、インタレスト ベースの広告を可能とすることです。Topics API
では、API 呼び出し元に返されるトピックは、その API 呼び出し元が限られた期間内にすでに確認しているトピックのみであるという仕組みを提唱しています。  

{: #caller}

{% Aside 'key-term' %}

Topics API の**呼び出し元は**、`document.browsingTopics()` JavaScript
メソッドを呼び出すエンティティであり、そのメソッドが返すトピックを使用して関連する広告を選択できるようにします。  
通常、`document.browsingTopics()` の呼び出しは、アドテック
プラットフォームなどサイトに含まれる第三者コードで行います。ブラウザは、現在のドキュメントのサイトから呼び出し元を判断します。そのため、ページ上の第三者コードから呼び出す場合は、ご自身のサイトの iframe
上から API を呼び出すようにしてください。  
`document.browsingTopics()` が 1
つ以上のトピックを返すためには、それらのトピックが確認済みのサイトに存在したコードと同じオリジンのコードからメソッドが呼び出される必要があります。  

{% endAside %}

API 呼び出し元が、あるユーザーについて特定のトピックを確認したとするためには、Topics API によってそのトピックがすでにマッピングされているサイトに含まれるコードから、`document.browsingTopics()` メソッドを呼び出している必要があります。次に例を示します。

1. Topics API がホスト名 `knitting.example` を「手芸」などのトピックにマッピングします。
1. `adtech.example` のコードは `knitting.example` のページに含まれています。
1. ユーザーが `knitting.example` にアクセスします。
1. `adtech.example` のコードが `document.browsingTopics() を呼び出します。`
1. ブラウザが knitting.example に対して推測したトピックの一つは「手芸」です。
1. `adtech.example` は、そのユーザーについてトピック「手芸」を確認したことになります。

Topics API の `document.browsingTopics()` メソッドは、直近の 3
[エポック](#epoch)内に呼び出し元によってすでに確認されているトピックのみを提供します。これにより、ユーザーに関する情報が、Topics
API が置き換える技術（サードパーティ Cookie を含む）よりも多くのエンティティで共有されることを防止できます。  
`document.browsingTopics()`
が返すトピックの数は、[API 呼び出し元](#caller)
がすでに確認しているトピックの数、ユーザーについて利用できるトピックの数（データ累積週数など）によって異なり、0～3 個のトピックが返される可能性があります。

### Topics JavaScript API の例

次のコードは、想定される基本的な API 使用例を示しています（簡単にするために、エラー処理は省略しています）。  

{% Aside 'warning' %}

このコード スニペットは、あくまでも Topics JavaScript API を例示するためのものです。API
の設計は変更される可能性があり、このコードはすぐにブラウザで機能するものではありません。  

{% endAside %}

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

### どの呼び出し元がどのトピックを確認できるのかを Topics API が判断する仕組み

Topics API 呼び出し元は最近確認したトピックのみを受け取り、ユーザーのトピックはエポックごとに 1 回更新されます。つまり Topics API
には、特定の呼び出し元が特定のトピックを受け取ることができるローリング ウィンドウが存在します。  
次の表は、非現実的なほど小規模ですが、あるユーザーの 1 つのエポックにおける仮想的な閲覧履歴の例です。ユーザーがアクセスしたサイトに関連するトピックと、各サイトに存在する API
[呼び出し元](#caller)（サイトに含まれる
JavaScript コードで `document.browsingTopics()` を呼び出すエンティティ）を示しています。

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
<td>工芸品</td>
<td>adtech1.example</td>
</tr>
<tr>
<td>hiking-holiday.example</td>
<td>フィットネス、<br>
旅行、交通</td>
<td>adtech2.example</td>
</tr>
<tr>
<td>diy-clothing.example</td>
<td>工芸品、ファッション、スタイル</td>
<td>なし</td>
</tr>
</tbody>
</table>

エポック（現在は 1 週間）の最後に、Topics API はその週について、ブラウザの上位のトピックを生成します。

-  adtech1.example は「フィットネス」と「工芸品」のトピックを受け取ることができます（yoga.example と knitting.example で確認したため）。
-  adtech1.example は、このユーザーについて「旅行、交通」トピックを受け取ることができません（このトピックに関連する、ユーザーが最近アクセスしたどのサイトにも存在しないため）。
-  adtech2.example は「フィットネス」と「旅行、交通」のトピックを確認していますが、「工芸品」トピックは確認していません。

ユーザーは「ファッション」のトピックがある diy-clothing.example にアクセスしましたが、そのサイトに Topics API
の呼び出しはありませんでした。つまりこの時点では、どの呼び出し元に対しても API が「ファッション」トピックを返すことはありません。  
第 2 週に、ユーザーが別のサイトにアクセスします。

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
<td>工芸品</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

また、adtech2.example のコードが diy-clothing.example に追加されます。

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
<td>工芸品、ファッション、スタイル</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

第 1 週の「フィットネス」と「旅行、交通」と同様に、adtech2.example は後続のエポック（第 3
週）から「工芸品」と「ファッション、スタイル」のトピックを受け取れるようになります。これにより、第三者がユーザーの過去（この場合、ファッションに興味があること）について、Cookie
を使用した場合よりも詳細に把握することはできなくなります。  
さらに 2 週間後、「フィットネス」と「旅行、交通」は、adtech2.example
のコードが含まれる、これらのトピックを持つサイトにユーザーがアクセスしなかった場合、adtech2.example の対象トピックのリストから外れる可能性があります。

### API がサイトのトピックを推測する仕組み

Topics API の解説では、ウェブサイトの[ホスト名](https://web.dev/same-site-same-origin/#origin)を 0
個以上のトピックにマッピングする[分類モデル](https://github.com/jkarlin/topics#:~:text=classifier)からトピックを導出することが提案されています。  
追加の情報（完全な URL やページ コンテンツなど）を分析することで、広告の関連性が高まる可能性はありますが、プライバシーが損なわれるおそれもあります。  
ホスト名をトピックにマッピングする分類モデルは一般公開されます。解説では、ブラウザのデベロッパー ツールを使用してサイトのトピックを表示できるようにすることが提案されています。マッピング
モデルは定期的に更新されますが、頻度については現在検討中です。

### ユーザーの上位 5 つのトピックが選ばれる仕組み

API はエポックごとにトピックを 1 つ返します（最大 3 つ）。3 つ返される場合は、現在のエポックのトピックと、前 2 つのエポックのトピックが返されます。

1. 各エポックの最後に、ブラウザは次の基準を満たすページのリストをコンパイルします。
   1. 対象エポック中にユーザーによってアクセスされたページ。
   1. `document.browsingTopics()` を呼び出すコードが含まれているページ。
   1. API が有効になっている（たとえばユーザーまたは[レスポンス
      ヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)によってブロックされていない）。

1. ユーザーのデバイスで、ブラウザは Topics API が提供する分類モデルを使用して、各ページのホスト名をトピックのリストにマッピングします。
1. ブラウザがトピックのリストを蓄積します。
1. ブラウザが頻度別に上位 5 つのトピックのリストを生成します。

次に、`document.browsingTopics()` メソッドは、エポックごとに上位 5 つの中からランダムにトピックを返します（トピックの全分類からランダムに選ばれる確率は 5%）。  
Chrome では、ユーザーが個々のトピックを削除したり、閲覧履歴を消去したりすることで、API から返されるトピックの数を減らすこともできます。ユーザーは API
をオプトアウトすることもできます（[ユーザーによるオプトアウト](#opt-out)をご覧ください）。

## Topics API で FLoC に関する懸念を解決する方法

2021 年に行った [FLoC](https://github.com/WICG/floc) のオリジン トライアルでは、アドテックとウェブ
エコシステムの参加者からさまざまなフィードバックがありました。特に、FLoC
コホートがフィンガープリントのサーフェスとしてユーザーの識別に使用される可能性や、ユーザーとデリケートなカテゴリの関連付けが開示される可能性について懸念が寄せられました。また、FLoC
の透明性を高め、ユーザーにわかりやすくする必要があるとの意見も挙がりました。  
Topics API は、こうしたフィードバックを念頭に、透明性の改善、プライバシー保護の強化、デリケートなカテゴリに対するアプローチの変更などを行い、インタレスト
ベース広告を新たな方法でサポートできるように設計されました。

### フィンガープリントの削減

Topics API は、複数のメカニズムを採用して、Topics API だけではサイト間で多数のユーザーを再識別できないようにすることを提案しています。

-  Topics API の分類では、最初に 350 程度の大まかなトピックを使用し、対象ブラウザの全ユーザー数に基づき、各トピックに多数のユーザーが関連付けられるようにします。20 回に
   1 回は無作為に抽出されたトピックが返されるため、トピックあたりのユーザー数は一定数以上となります。
-  トピックは、ユーザーが最も関心を持っている 5 つのトピックからランダムに返されます。
-  20 回に 1 回は、すべてのトピックから無作為に抽出されたトピックが返されます。
-  ユーザーが同じサイトを頻繁（たとえば毎週など）に利用する場合、サイト上で実行されるコードは週に最大 1 つのトピックしか新たに学習できません。
-  別のサイトでは、同じエポックで同じユーザーについて個別のトピックを受け取ります。あるサイトでユーザーについて返されたトピックが、別のサイトで返されたトピックと一致する可能性は 5 分の 1
   しかありません。そのため、同じユーザーかどうかを判別することはより難しくなります。
-  ユーザーのトピックは週 1 回更新され、情報を共有できる頻度が制限されます。
-  トピックは、最近同じユーザーについて[同じトピックを取得した](#observed-topics)
   API 呼び出し元にのみ返されます。このモデルにより、直接取得していないユーザーの関心に関する情報が学習または共有される可能性を制限できます。

{: #sensitive-topics}

### デリケートなトピック

Topics API
の[分類](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)は公開され、デリケートなカテゴリが含まれないよう手動で選定されます。  
また、サイトとユーザーは Topics API
を[オプトアウト](#opt-out)できます。

{% Aside %}

Topics API の提案の解説に次の記載があります:  「サードパーティの Cookie は、ユーザーに関するあらゆる情報のトラッキングに使用可能です。これには、ユーザーがアクセスした正確な URL やこれらのページの具体的なコンテンツだけでなく、デリケートな情報も無制限に含まれます。一方、Topics API では、トラッキングできる情報は人間が選定した分類トピックのみに制限されます。この分類トピックに他の情報を統計的に関連付けることが不可能なわけではなく、実際のところ可能です。しかしながら、Topics API は Cookie と比べて明確に進歩していると考えられます。」

{% endAside %}


### ユーザー コントロールと透明性

ユーザーは、Topics API の目的とそれに対する意見を理解して、API がいつ使用されているかを把握し、API を有効または無効にする管理機能を使用できる必要があります。  
この API では、判読可能な分類により、ユーザーはブラウザで提案される可能性のあるトピックを把握し管理することができます。広告表示を希望しないトピックは削除可能で、API
とそれを有効または無効にする方法についてユーザーに説明するための UX も用意されています。Chrome では、Topics API の情報と設定を
chrome://settings/privacySandbox で提供します。また、API の呼び出し元はシークレット
モードの場合はトピックを取得できず、閲覧履歴が削除されるとトピックも消去されます。

{: #opt-out}


### サイトのオプトアウト

Topics API を呼び出すコードを実装しているサイトのみが、トピックの頻度の推定対象の閲覧履歴に含められます。API
の呼び出し元は、[そのサイトで取得したトピックのみ受け取ります](#observed-topics)。つまり、サイトや埋め込まれたサービスで
API を呼び出す操作が行われないと、そのサイトはトピックの頻度の推定対象とはなりません。  
また、Topics API の解説では、サイトに対して、次の
[Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)
ヘッダーを使用して、ユーザーのトピックの推定を許可またはブロックできるようにすることを提案しています。  

```text  
Permissions-Policy: browsing-topics=()
````

{% Aside %}

FLOC の既存の Permissions-Policy `interest-cohort=()` でもトピックの推定を禁止できます。

{% endAside %}

### ユーザーのオプトアウト

Topics API の解説では、次の場合に空のトピックリストを返すことを[提案](https://github.com/jkarlin/topics#:~:text=empty)しています。

-  ユーザーがブラウザの設定（chrome://settings/privacySandbox）で Topics API をオプトアウトしている。
-  ユーザーがブラウザの設定（chrome://settings/privacySandbox）でトピックまたは [Cookie
   を消去](https://support.google.com/accounts/answer/32050)した。
-  ブラウザがシークレット モードになっている。

API の解説では、[プライバシー目標の詳細](https://github.com/jkarlin/topics#:~:text=privacy%20goals)と API
がその目標を達成する方法について詳しく説明しています。

---

## 意見交換とフィードバックの提供

-  **GitHub**:
   [提案に関する解説](https://github.com/jkarlin/topics)を読み、[提案に関する問題のリポジトリ](https://github.com/jkarlin/topics/issues)で質問を投稿し、意見を交換してください。
-  **W3C**:
   [「ウェブ広告ビジネスの改善」グループ](https://www.w3.org/community/web-adv/participants)で業界のユースケースについて意見を交換してください。
-  **Topics API に関するお知らせ**: メーリング
   リスト（[groups.google.com/a/chromium.org/g/topics-api-annnounce](https://groups.google.com/a/chromium.org/g/topics-api-annnounce)）を購読またはご覧ください。
-  **プライバシー サンドボックスに関するデベロッパーのサポート**:   
   [「プライバシー サンドボックス デベロッパー サポート」リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問を投稿し、意見を交換してください。

## 詳細

-  [Topics API の技術解説](https://github.com/jkarlin/topics)
-  [プライバシー サンドボックスの詳細](https://web.dev/digging-into-the-privacy-sandbox)  
  

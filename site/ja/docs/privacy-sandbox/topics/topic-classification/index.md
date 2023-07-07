---
layout: layouts/doc-post.njk
title: トピックの分類
subhead: トピックの推論方法、ユーザーのブラウザへのトピックの割り当て方法、ユーザーによるトピックリストの制御方法について説明します。
description: トピックそのものとその選択方法に関する詳細情報です。
date: 2022-01-25
updated: 2023-06-26
authors:
  - samdutton
---

## 実装ステータス

{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## トピックとは？

Topics API におけるトピックとは、ユーザーが訪問するウェブサイトからわかる、ユーザーが興味を持っている主題です。

トピックは、アドテックプラットフォームが関連性の高い広告を選択するのに役立つシグナルです。サード パーティ Cookie とは異なり、この情報はユーザー自身やユーザーの閲覧アクティビティに関するさらなる情報を明らかにすることなく共有されます。

Topics API を使用すると、アドテックプラットフォームなどのサードパーティがユーザーの関心のあるトピックを観察し、アクセスできるようになります。たとえば、API は、ウェブサイト `knitting.example` にアクセスしたユーザーに「Fiber &amp; Textile Arts」というトピックを提案する場合があります。

Topics API で使用されるトピックのリストは公開されており、人間が厳選し、人間が判読できるものであり、デリケートなカテゴリを避けるように設計されています。これは[現在のリスト](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md)であり、時間の経過とともに拡大されます。リストは*分類法*として構造化されています。トピックは高レベルの場合もあれば、より具体的な場合もあります。たとえば、`Food & Drink` は広いカテゴリであり、`Cooking & Recipes` というサブカテゴリがあります。サブカテゴリはさらに追加のサブカテゴリに分割される場合があります。

このようなトピックの分類では、実用性とプライバシーの間でトレードオフを行う必要があります。トピックが具体的すぎる場合、個々のユーザーを特定するために使用される可能性があります。一般的すぎると、広告やその他のコンテンツを選択するのに役に立ちません。

トピック分類は、次の 2 つの基本的な要件を念頭に置いて構築されています。

- インタレストベース広告をサポートする
- ユーザーの安全を確保し、プライバシーを保護する

これは以下のようないくつかの疑問を示唆しています。

- ユーザーのプライバシーを保ちながら、ユーザーの閲覧アクティビティに基づいてユーザーが興味のあるトピックを API が推測する最善の方法は何か？
- 分類法をより便利にするためにはどのように構造化すればよいか？
- 分類法には具体的にどのような項目を含める必要があるか？

{% Partial 'privacy-sandbox/topics-taxonomy-v2.njk' %}

## API がサイトのトピックを推測する方法

トピックは、ウェブサイトの[ホスト名](https://web.dev/same-site-same-origin/#origin)を 0 個以上のトピックにマッピングする[分類器モデル](https://github.com/jkarlin/topics#:~:text=classifier)から派生します。追加情報（完全な URL やページ コンテンツなど）を分析すると、より関連性の高い広告が表示される可能性がありますが、プライバシーが低下する可能性もあります。

ホスト名をトピックにマッピングするための分類器モデルは公開されており、[Explainer](https://github.com/patcg-individual-drafts/topics) で指摘されているように、ブラウザ開発者ツールを介してサイトのトピックを表示することが可能です。モデルは時間の経過とともに進化と改善を繰り返し、定期的に更新されることが期待されます。この頻度についてはまだ検討中です。

トピック頻度の計算対象となる閲覧履歴に含まれるのは Topics API を呼び出すコードを含むサイトのみであり、API 呼び出し元は観察したトピックのみを受け取ります。言い換えれば、サイトまたは API を呼び出す埋め込みサービスがなければ、サイトはトピック頻度の計算の対象になりません。

{: #caller}

さらに、呼び出し元は、コードが「見た」トピックのみを受信できます。したがって、別の呼び出し元のコードがユーザーのブラウザに対して `/Autos & Vehicles/Motor Vehicles (By Type)/Hatchbacks` などのトピックを登録し、あなたのコードによってそのトピックがそのユーザーのブラウザに登録されなかった場合、埋め込みコードから API を呼び出すときに、そのユーザーのブラウザで関心のあるトピックを知ることはできません。ご覧のように、API には先祖が含まれるようになったため、上記の `/Autos & Vehicles/Motor Vehicles (By Type)/Hatchbacks` によって `Autos & Vehicles` と `Motor Vehicles` も観察されることに注意してください。

{% Aside 'key-term' %}

Topics API の*呼び出し元*とは、`document.browsingTopics()` を使用してトピックを観察しリクエストするエンティティのことです。通常、この呼び出し元はサードパーティ（アドテックなど）であり、このメソッドによって返されたトピックを使用して、関連する広告の選択を支援します。

ブラウザはリクエストの発信元から呼び出し元を特定します。サイト A が、サイト B でホストされている iframe 内のコードからトピックをリクエストした場合、ブラウザは呼び出し元がサイト A であると判断します。サードパーティの場合は、所有する iframe から Topics API を呼び出すようにしてください。

`document.browsingTopics()` を使用して 1 つ以上のトピックを取得するには、API 呼び出し元は同じオリジンからトピックを観察してリクエストする必要があります。

呼び出し元は、`document.browsingTopics()` を使用して、[iframe 内](/docs/privacy-sandbox/topics/integration-guide/#implement-with-javascript-and-iframes)から JavaScript API を介してトピックにアクセスできます。

呼び出し元は、`fetch()` リクエストまたは iframe の [`Sec-Browsing-Topics` ヘッダー](docs/privacy-sandbox/topics/integration-guide/#implement-with-http-headers)からトピックにアクセスすることも可能です。XHR リクエストもオリジントライアル期間中限定で有効になりますが、このメソッドは推奨されません。

{% endAside %}

## 分類器モデル {: #classifier-model}

トピックは上位 10,000 件のドメインに対して手動で厳選され、この厳選されたトピックが分類器のトレーニングに使用されます。このリストは、`chrome://topics-internals/` の **Classifier** タブの現在のモデルにある `override_list.pb.gz` にあります。リスト内のドメインとトピックの関連付けは、モデル自体の出力の代わりに API によって使用されます。

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/SOTuE2ljC55PaYll1UP1.png", alt="Classifier パネルが選択された chrome://topics-internals ページ。", width="800", height="695" %} <figcaption> chrome://topics-internals ページの [Classifier] パネルには、モデルのバージョン、そのパス、およびリストされた各ホストに関連付けられたトピックがリストされます。</figcaption></figure>

モデルを直接実行するには、[TensorFlow のモデルの実行ガイド](https://www.tensorflow.org/lite/guide/inference#running_a_model)を参照してください。

`override_list.pb.gz` ファイルを検査するには、まずファイルを解凍します。

```text
gunzip -c override_list.pb.gz > override_list.pb
```

[`protoc`](https://grpc.io/docs/protoc-installation/) を使用してテキストとして検査します。

```text
protoc --decode_raw < override_list.pb > output.txt
```

[ID を含むトピックの全分類](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md)は GitHub にあります。

### 分類器モデルに関するフィードバックの提供

トピックの提案に関するフィードバックを提供するための[チャンネルがいくつか](/docs/privacy-sandbox/feedback/)あります。分類器モデルに関するフィードバックについては、[GitHub イシューを送信](https://github.com/patcg-individual-drafts/topics/issues)するか、以下のような既存のイシューに返信することをお勧めします。

- [どのようなトピック分類法を長期的に使用する必要がありますか？](https://github.com/patcg-individual-drafts/topics/issues/3)
- [サイトと割り当てられたトピックが一致しない場合はどうなりますか？](https://github.com/patcg-individual-drafts/topics/issues/2)

## ユーザーの上位 5 つのトピックが選択される仕組み

API は、エポックごとに 1 つのトピックを最大 3 つまで返します。 3 つが返された場合、これには現在のエポックのトピック 1 つと前のエポックのトピック  2 つが含まれます。

1. 各エポックの終わりに、ブラウザは次の基準を満たすページのリストをコンパイルします。
    - このエポック中にユーザーがページにアクセスした。
    - このページに、`document.browsingTopics()` を呼び出すコードが含まれている。
    - API が有効になっている（ユーザーによってブロックされていない、または[レスポンスヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)によってブロックされていないなど）。
2. ユーザーのデバイス上のブラウザは、Topics API によって提供される分類器モデルを使用して、各ページのホスト名をトピックのリストにマッピングします。
3. ブラウザはトピックのリストを蓄積します。
4. ブラウザは頻度順に上位 5 つのトピックのリストを生成します。

`document.browsingTopics()` メソッドは、各エポックの上位 5 つからランダムなトピックを返します。5% の確率で、トピックの完全な分類からこれらのいずれかがランダムに選択されます。Chrome では、ユーザーが個々のトピックを削除したり、閲覧履歴をクリアして API から返されるトピックの数を減らしたりすこともできます。ユーザーは API を[オプトアウトする](#opt-out)ことも可能です。

現在のエポック中に観察されたトピックに関する情報は `chrome://topics-internals` ページで確認できます。

## どの呼び出し元がどのトピックを見るかを API が決定する仕組み

API 呼び出し元は最近観察したトピックのみを受け取り、ユーザーのトピックはエポックごとに 1 回更新されます。つまり、API には、特定の呼び出し元が特定のトピックを受信できるローリング ウィンドウがあります。

以下の表は、1 エポック中のユーザーの仮想閲覧履歴の例（非現実的ですが）を概説しており、ユーザーが訪問したサイトに関連付けられたトピックと、各サイトに存在する API 呼び出し元（サイトに含まれる JavaScript コードで `document.browsingTopics()` を呼び出すエンティティ）を示しています。

<table class="with-heading-tint">
  <thead>
  <tr>
  <th>サイト</th>
  <th>トピック</th>
  <th>サイト上の API 呼び出し元</th>
  </tr>
  </thead>
  <tbody>
    <tr>
    <td>yoga.example</td>
    <td>Fitness</td>
    <td>adtech1.example adtech2.example</td>
    </tr>
    <tr>
    <td>knitting.example</td>
    <td>Crafts</td>
    <td>adtech1.example</td>
    </tr>
    <tr>
    <td>hiking-holiday.example</td>
    <td>Fitness, Travel &amp; Transportation</td>
    <td>adtech2.example</td>
    </tr>
    <tr>
    <td>diy-clothing.example</td>
    <td>Crafts, Fashion &amp; Style</td>
    <td>[なし]</td>
    </tr>
  </tbody>
</table>

エポック（現在は 1 週間であることが提案されています）の終わりに、Topics API はその週のブラウザのトップトピックを生成します。

- adtech1.example は、yoga.example と knitting.example で「Fitness」と「Crafts」トピックを観察したため、これらのトピックを受信できるようになりました。
- adtech1.example は、このユーザーの「Travel &amp;Transportation」トピックを受信する資格がありません。これは、ユーザーが最近アクセスした、そのトピックに関連付けられているサイトにトピックが存在しないためです。
- adtech2.example は、「Fitness」と「Travel &amp; Transportation」のトピックを確認しましたが、「Crafts」のトピックを確認していません。

ユーザーは「Fashion &amp; Style」トピックを持つ diy-clothing.example にアクセスしましたが、そのサイトでは Topics API への呼び出しはありませんでした。この時点で、これは、どの呼び出し元に対しても API によって「Fashion &amp; Style」トピックが返されることがないことを意味します。

2 週目では、ユーザーは別のサイトにアクセスします。

<table class="with-heading-tint">
  <thead>
    <tr>
    <th>サイト</th>
    <th>トピック</th>
    <th>サイト上の API 呼び出し元</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>sewing.example</td>
    <td>Crafts</td>
    <td>adtech2.example</td>
    </tr>
  </tbody>
</table>

さらに、adtech2.example のコードが diy-clothing.example に追加されます。

<table class="with-heading-tint">
  <thead>
    <tr>
    <th>サイト</th>
    <th>トピック</th>
    <th>サイト上の API 呼び出し元</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>diy-clothing.example</td>
    <td>Crafts, Fashion &amp; Style</td>
    <td>adtech2.example</td>
    </tr>
  </tbody>
</table>

これは、第 1 週の「Fitness」と「Travel &amp; Transportation」に加えて、adtech2.example が「Crafts」と「Fashion &amp; Style」トピックを受信できるようになることを意味します。ただし、次のエポックである第 3 週までは受信できません。これにより、サードパーティは Cookie を使用する場合よりもユーザーの過去（この場合はファッションへの関心）について知ることができなくなります。

さらに 2 週間後、ユーザーが adtech2.example のコードを含むトピックでサイトにアクセスしなかった場合、「Fitness」と「Travel &amp; Transportation」が adtech2.example の対象トピックのリストから除外される可能性があります。

## ユーザー制御、透明性、オプトアウト {: #opt-out}

ユーザーは、Topics API の目的を理解し、Topics API について言われている内容を認識し、API がいつ使用されているかを知り、API を有効または無効にするための制御を与えられている必要があります。

人間が判読できる API の分類法によって、ユーザーはブラウザが提案するトピックについて学習し、制御することができます。ユーザーは、Topics API で広告主やサイト運営者と共有したくないトピックを削除できます。また、API についてユーザーに通知し、API を有効または無効にする方法を示すコントロールを設けることもできます。Chrome では、`chrome://settings/privacySandbox` で Topics API の情報と設定を提供しています。さらに、シークレットモードの場合は API 呼び出し元はトピックを利用できず、さらに閲覧履歴がクリアされるとトピックもクリアされます。

次の場合、返されるトピックのリストは空になります。

- ユーザーが `chrome://settings/privacySandbox`にあるブラウザ設定を介して Topics API をオプトアウトしている。
- ユーザーがトピックをクリア（`chrome://settings/privacySandbox` にあるブラウザ設定経由で）、Cookie をクリアした。
- ブラウザがシークレットモードになっている。

Explainer には、[プライバシーの目標と、API がそれらの目標にどのように対処しようとしているかについて詳しく説明](https://github.com/jkarlin/topics#meeting-the-privacy-goals)されています。

{: #opt-out }

### サイトのオプトアウト

ユーザーがオプトアウトできることに加えて、サイトまたはサイト上のページのトピックをオプトアウトすることもできます。方法については、[開発者ガイド](/docs/privacy-sandbox/topics/#site-opt-out)をご覧ください。

## `prebid.js` を使用するウェブサイトでの Topics API の使用

[Prebid 7](https://prebid.org/blog/the-release-of-prebid-7-0/) のリリースに記載されているように、コミュニティは新しいモジュールを介した Topics API との統合を積極的に開発しました。このモジュールは 2022 年 12 月にマージされています。

詳細については、こちらをご覧ください。

- Prebid の [Topics API モジュールのドキュメント](https://docs.prebid.org/dev-docs/modules/topicsFpdModule.html)をお読みください。
- 詳細については、Prebid.js が提供する通常のチャ​ン​ネルを通じてお問い合わせください。

## 次のステップ

- アドテック開発者の方は、Topics API を[試して参加してください](/docs/privacy-sandbox/topics-experiment/)。
- さらに詳しいリソースは、[開発者ガイド](/docs/privacy-sandbox/topics/)をお読みください。
- 具体的なアドテックのユースケースに関する詳細は、[Topics API 統合ガイド](/docs/privacy-sandbox/topics/integration-guide/)をご覧ください。

{% Partial 'privacy-sandbox/topics-feedback.njk' %}

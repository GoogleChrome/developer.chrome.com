---
layout: layouts/doc-post.njk
title: Topics API の概要
subhead: Topics API を使用すると、ユーザーが訪問するサイトをトラッキングすることなく、インタレストベース広告（IBA）が可能になります。
description: Topics API を使用すると、ユーザーが訪問するサイトをトラッキングすることなく、インタレストベース広告（IBA）が可能になります。
date: 2022-01-25
updated: 2023-06-26
authors:
  - samdutton
---

## 実装ステータス

{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## Topics API とは？

Topics API は、ブラウザがユーザーの興味に関する情報をサードパーティと共有できるようにしながら、プライバシーを保護するように設計された[プライバシー サンドボックス](/docs/privacy-sandbox/overview/)メカニズムです。これにより、ユーザーが訪問するサイトをトラッキングせずに、インタレストベース広告（IBA）が可能になります。

インタレストベース広告は、Topics API の重要な概念です。これはパーソナライズされた広告の一種で、ユーザーが最近アクセスしたサイトから推定された興味に基づいて、ユーザーに表示する広告が選択されます。これは、ユーザーがアクセスしているページのコンテンツに広告を一致させることを目的としたコンテキスト広告とは異なります。

インタレストベース広告は、広告主（製品やサービスを宣伝したいサイト）とサイト運営者（コンテンツの収益化を支援するために広告を使用するサイト）の両方に役立ちます。

- IBA は、広告主が潜在顧客にリーチする上で役立ちます。
- IBA は、サイト運営者が広告を使用してウェブサイトに資金を提供できるように、コンテキスト情報を補足できます。

Topics API は、最近のユーザーアクティビティに基づいてブラウザに割り当てられるトピック（興味のあるカテゴリ）を使用した、新しい形式のインタレストベース広告を提供します。これらのトピックによって、適切な広告の選択に役立つコンテキスト情報が補足されます。

## 仕組み

これまで、サード パーティ Cookie やその他のメカニズムは、サイト全体でのユーザーの閲覧行動を追跡し、関心のあるトピックを推測するために使用されてきました。これらのメカニズムは段階的に廃止されています。

Topics API を使用すると、ブラウザは、ユーザーの閲覧アクティビティに基づいて、ユーザーに関心があると思われるトピックを観察し、記録します。この情報はユーザーのデバイスに記録されます。 Topics API は、ユーザーの閲覧アクティビティに関する追加情報を明らかにすることなく、API 呼び出し元（アドテックプラットフォームなど）にユーザーが興味を持つトピックへのアクセスを提供します。

### 先祖トピックの観察 {: #ancestor}

Chrome 114 以降、呼び出し元がページ上のユーザーのトピックを観察すると、ブラウザは呼び出し元がトピックのすべての先祖も観察したものとみなします。

たとえば、呼び出し元がユーザーの `Shopping/Apparel/Footwear/Boots` を観察したことをブラウザが記録した場合、そのトピックの先祖である `Shopping/Apparel/Footwear`、`Shopping/Apparel`、および `Shopping` も観察されたとみなされます。

以前は、呼び出し元がブラウザによって（例えば）`Shopping/Apparel` が観察されたと見なされた場合、その特定のトピックが観察されたトピックとして API によって返される必要がありました。つまり、あるページで呼び出し元に対してユーザーの `Shopping/Apparel` が観察され、別のページで `Shopping/Apparel/Footwear/Boots` が観察されると、API は両方のページで `Shopping/Apparel` が観察されたとして処理するようになります。

### エポック {: #epoch}

もちろん、Topics API は、それが提供する関心トピックが最新の状態に保たれるようにする必要があります。ブラウザは、*エポック*と呼ばれる期間（現在は 1 週間）におけるユーザーの閲覧アクティビティに基づいてユーザーのトピックを推測します。各エポックに選択されるトピックは、その期間におけるユーザーの上位 5 つのトピックからランダムに選択されます。プライバシーをさらに強化し、すべてのトピックが表現されることを保証するために、トピックは、興味の[分類](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)に含まれるすべての可能なトピックから 5% の確率でランダムに選択されます。

Topics API には主に次の 3 つのタスクがあります。

- ブラウザのアクティビティを関心トピックにマッピングします。Topics API の現在の設計では、トピックはユーザーがアクセスするページのホスト名から推測されます。たとえば水族館に関するウェブサイトで推定されるトピックは、[/Pets &amp; Animals/Pets/Fish &amp; Aquaria](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md#:~:text=/Pets%20%26%20Animals/Pets/Fish%20%26%20Aquaria) となるでしょう。
- ユーザーの最近の閲覧アクティビティに基づいて、ユーザーのトップトピックを計算します。
- 適切な広告を選択できるように、ユーザーが現在興味のあるトピックにアクセスするメカニズムを提供します。

Topics API は人間が判読可能で理解しやすいトピックを提供するため、ユーザーに意味のあるコントロールを提供できます。

### トピックの厳選と選択の方法 {: #manually-curated}

トピックは、[/Arts &amp; Entertainment/Music &amp; Audio/Soul &amp; R&amp;B](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md#:~:text=/Arts%20%26%20Entertainment/Music%20%26%20Audio/Soul%20%26%20R%26B) および [/Business &amp; Industrial/Agriculture &amp; Forestry](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md#:~:text=106-,/Business%20%26%20Industrial/Agriculture%20%26%20Forestry,-107) などの階層カテゴリで構成される[分類](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)から選択されます。これらのトピックは初期テスト用に Chrome によって厳選されていますが、その目的は、分類が信頼できるエコシステム貢献者によって維持されるリソースになることです。多くのユーザーのブラウザが各トピックに関連付けられるように、分類のサイズは十分に小さいことが必要です。現在のトピック数は 349 個ですが、最終的なトピック数は数百から数千になると予想されます。

{% Partial 'privacy-sandbox/topics-taxonomy-v2.njk' %}

{: #sensitive-topics}

デリケートな内容のカテゴリを避けるために、トピックは公開され、人間によって厳選され、最新の状態に保たれている必要があります。 Chrome によるテスト用に提案された最初の分類法は、民族や性的指向など、 [一般にデリケートとされるカテゴリを除外するために](https://github.com/patcg-individual-drafts/topics#meeting-the-privacy-goals:~:text=of%20a%20page.-,The,-topics%20revealed%20by)人の手で精選されています。

上位 10,000 件のサイトに対し、Chrome の Topics API 実装は、手動で厳選された公開中の[オーバーライドリスト](/docs/privacy-sandbox/topics/topic-classification/#classifier-model)を使用して、ホスト名をトピックにマッピングします。他のサイトの場合は、Topics API は[機械学習](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)モデルを使用してホスト名からトピックを推測します。

Chrome の Topics API の実装は、モデルを表現する [TensorFlow Lite](https://www.tensorflow.org/lite/guide) ファイルをダウンロードして、ユーザーのデバイス上でローカルに使用できるようにします。

TensorFlow Lite モデル ファイルと、ホスト名に対して推定されたトピックには `chrome://topics-internals` からアクセスできます。

以下の図は、Topics API がアドテックプラットフォームによる適切な広告の選択にどのように役立つかを示す簡略化された例を示しています。この例では、ユーザーのブラウザにウェブサイトのホスト名をトピックにマッピングするモデルがすでに存在していることを前提としています。

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png", alt="ユーザーがウェブサイトにアクセスしてから広告が表示されるまでの Topics API ライフサイクルの段階を示す図。", width="800", height="275" %} <figcaption> Topics API のライフサイクルの図。API アクションの段階を高レベルの観点から説明しています。<a href="https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&amp;w=1600">拡大版を表示</a>。</figcaption></figure>

### API 呼び出し元は、観察したトピックのみを受け取る

Topics API の設計目標は、サード パーティ Cookie で現在可能であるより多くのエンティティと情報を共有することなく、インタレストベース広告を有効にすることです。Topics API は、限られた時間枠内でトピックをすでに観察した API 呼び出し元に対してのみトピックを返すことができるように設計されています。API 呼び出し元は、Topics API がそのトピックにマッピングしたサイトに含まれるコード内の `document.browsingTopics()` メソッドを呼び出した場合に、ユーザーのトピックを観察したと判断されます。

API は、最近の 3 エポック以内に呼び出し元によって観察されたトピックのみを返します。これは、API が置き換えるテクノロジー（サード パーティ Cookie を含む）以外のエンティティとユーザーに関する情報が共有されるのを防ぐのに役立ちます。

返されるトピックの数は、API 呼び出し元が以前に観察したトピックの数と、ユーザーが利用できるトピックの数（蓄積されたデータの週数など）によって異なります。最近の 3 つのエポックごとに 1 つのトピックを示すことができるため、0 ～ 3 つのトピックを返すことができます。

Topics API の使用方法とテスト方法の詳細については、[Topics API 開発者ガイド](/docs/privacy-sandbox/topics/)をご覧ください。

{% Details %} {% DetailsSummary %}

#### API によるフィンガープリティング削減の仕組み

{% endDetailsSummary %}

Topics API には、Topics API だけを使用してサイト*間で*多数のユーザーを再同定することを困難にするために役立つ複数のメカニズムが備わっています。

- トピック分類法では大まかなトピックが提供されるため、各トピックには多数のユーザーが含まれることが予想されます。実際、トピックは 5% の確率でランダムに返されるため、トピックごとに最小ユーザー数が保証されています。
- トピックはユーザーの上位 5 件からランダムに返されます。
- ユーザーが同じサイトに頻繁に（毎週など）アクセスする場合、そのサイト上で実行されているコードは、最大でも 1 週間に 1 つの新しいトピックを学習できます。
- 異なるサイトでは、同じエポック内の同じユーザーに対して異なるトピックが受信されます。あるサイトでユーザーに返されたトピックが別のサイトでユーザーに返されたトピックと一致する確率は 5 分の 1 のみです。これにより、同じユーザーであるかどうかを判断することがさらに困難になります。
- ユーザーのトピックは毎週 1 回更新されるため、情報を共有できる速度が制限されます。言い換えれば、API はトピック更新をあまり頻繁に提供しないことで、フィンガープリンティングを軽減するのに役立ちます。
- トピックは、同じユーザーについて<a>最近同じトピックを観察した</a> API 呼び出し元に対してのみ返されます。このアプローチは、エンティティが直接観察していないユーザーの関心に関する情報を知る（または共有する）可能性を制限するのに役立ちます。

{% endDetails %}

{% Details %} {% DetailsSummary %}

#### API による FLoC に関する懸念への対処

{% endDetailsSummary %}

2021 年の [FLoC](https://github.com/WICG/floc) のオリジントライアルでは、アドテックやウェブエコシステムの貢献者から幅広いフィードバックが寄せられました。特に、FLoC コホートがユーザーを特定するためのフィンガープリンティングのサーフェスとして使用される可能性や、ユーザーとデリケートなカテゴリとの関連性が明らかになる可能性があるという懸念がありました。FLoC をより透明性が高く、ユーザーにとって理解しやすいものにするよう求める声もありました。

Topics API は、このフィードバックを念頭に置いて設計されました。透明性の向上、プライバシー保証の強化、デリケートなカテゴリに対する異なるアプローチなど、インタレストベース広告をサポートする別の方法を模索することを目的としています。{% endDetails %}

## 次のステップ

[トピックとは何か、またトピックの仕組み](/docs/privacy-sandbox/topics/topic-classification/)については、こちらをご覧ください。

アドテック開発者の方は、Topics API を[試して参加してください](/docs/privacy-sandbox/topics-experiment/)。さらに詳しいリソースについては、[開発者ガイド](/docs/privacy-sandbox/topics)をお読みください。

{% Partial 'privacy-sandbox/topics-feedback.njk' %}

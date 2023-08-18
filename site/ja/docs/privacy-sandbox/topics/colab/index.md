---
layout: layouts/doc-post.njk
title: colab でのトピック推論のテスト
subhead: colab を試して、Chrome がホスト名からトピックを推測するために使用する TensorFlow Lite モデルを読み込むする方法を学習します。
description: colab を試して、Chrome がホスト名からトピックを推測するために使用する TensorFlow Lite モデルを読み込むする方法を学習します。
date: 2022-01-25
updated: 2023-03-08
authors:
  - samdutton
---

## 実装ステータス

{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

## Colab の実行

colab（colaboratory）は、コード、出力、説明テキストを 1 つの共同ドキュメントに結合するデータ分析ツールです。[Topics Model Execution Demo colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) を実行して、Topics 分類器モデルが、ユーザーがアクセスするページのホスト名からユーザーが興味のあるトピックをどのように推測するかをテストできます。

1. `chrome://topics-internals` ページの **Classifier** タブから、Topics API で使用される `.tflite` ファイルのディレクトリパスを取得します。オーバーライドリストの `override_list.pb.gz` ファイルは、`chrome://topics-internals/` ページの **Classifier** タブの現在のモデルにあります。

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/txujKqPgnQdbwmTfdPZT.png", alt="［Classifier］パネルが選択されており、tflite のファイルパスがハイライトされている chrome://topics-internal ページ。", width="800", height="696" %}

2. [colab](https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn) を開き、フォルダアイコンをクリックします。

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/FcBRhBOyLm2EEU1J4ET0.png", alt="Topics API の colab", width="800", height="605" %}

3. **アップロード**アイコンをクリックして、 `model.tflite` と `override_list.pb.gz` をコンピューターから colab にアップロードします。

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/8PiaYhdpKUx5hyMNcVwG.png", alt="Topics API の colab ファイルのアップロード。", width="800", height="402" %}

4. すると、**Runtime** メニューから **Run all** を選択して、colab のすべてのステップを実行できるようになります。

    {% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/gP8GmUH2xiwbEz27LbjO.png", alt="Topics API の colab ページ。Runtime メニューで「Run all」を選択。", width="800", height="605" %}

これにより次のことが行われます。

1. colab で使用される Python パッケージをインストールします。
2. `tflite` ライブラリとトピック分類をインストールします。
3. 分類法を定義します。
4. Model Execution Demo の各ステップを実行して、2 つのサンプルドメインで分類がどのように機能するかを示します。

正常に完了した各ステップの横には、緑色のチェックマークが表示されます。（各ステップは、横にある**再生**ボタンをクリックして、個別に実行することもできます。）

定義されたドメインごとに、分類器によって推測されたトピック のスコアを確認できます。さまざまなドメインをリストに表示してみて、それらがどのように比較されるかを確認してください。

{% Aside 'caution' %} 一部のドメインについては、colab と`chrome://topics-internals` 分類器の間でトピックの推論に違いがある場合があります。

colab は分類器モデルのみを使用してトピックを推論しますが、`chrome://topics-internals` は Chrome のトピック実装を使用します。Chrome は、上位 10,000 サイトに対して分類器モデルを使用するのではなく、[トピックのリストを手動で作成](/docs/privacy-sandbox/topics/topic-classification/#classifier-model)します。厳選されたリストは、`chrome://topics-internals` で提供されている `override_list.pb.gz` にあります。{% endAside %}

## 次のステップ

アドテック開発者の方は、Topics API を[試して参加してください](/docs/privacy-sandbox/topics-experiment/)。また、[Topics API のデモ](/docs/privacy-sandbox/topics/demo)をご覧ください。

{% Partial 'privacy-sandbox/topics-feedback.njk' %}

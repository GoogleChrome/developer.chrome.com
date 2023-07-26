---
layout: layouts/doc-post.njk
title: Topics API デモ
subhead: 最小限のセットアップでホスト名からトピックがどのように推測されるかを実験して学習します。
description: 最小限のセットアップでホスト名からトピックがどのように推測されるかを実験して学習します。
date: 2023-03-08
authors:
  - samdutton
---

## 実装ステータス

{% Partial 'privacy-sandbox/ps-implementation-status.njk' %}

Topics API のデモでは、ホスト名からトピックがどのように推測されるかを確認できます。デモ サイトにアクセスすると、どのようなトピックが観察されるかをプレビューできます。セットアップはほとんど必要ありません。

ユーザーと一緒に API をテストする場合は、[広告関連のオリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)に登録してください。

このデモは、Topics API の実装を学習できるように、ほとんどの機能を実演するプレビュー版です。

また、Topics [colab](/docs/privacy-sandbox/topics/colab) を実行して、Topics の[分類器モデル](/docs/privacy-sandbox/topics/topic-classification/#classifier-model)を試すこともできます。

以下の動画では、デモの動作を説明しています。

{% YouTube id='hEBzWuXjeTQ' %}

## chrome://flags または機能フラグを使用してテストする {: #feature-flags}

Chrome 101 以降を実行する際に、シングルユーザーとして以下の 2 つの方法で Topics API を試すことができます。

- `chrome://flags/#privacy-sandbox-ads-apis` Chrome ページで API を有効にします。

      <figure></figure>

    {% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/4kpW1PAuzrMrecSAR3tU.png", alt="chrome://flags/#privacy-sandbox-ads-apis ページを使用してトピック API を有効にする", width="800", height=" 246" %}<figcaption> chrome://flags/#privacy-sandbox-ads-apis ページでは、API を有効または無効にできます。 <a href="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/4kpW1PAuzrMrecSAR3tU.png?auto=format&amp;w=1600">拡大版を表示</a></figcaption>




- コマンドラインから次のフラグを使用して Chrome を実行します。

    ```text
    --enable-features=BrowsingTopics,BrowsingTopicsParameters:time_period_per_epoch/15s/browsing_topics_max_epoch_introduction_delay/3s,PrivacySandboxAdsAPIsOverride,PrivacySandboxSettings3,OverridePrivacySandboxSettingsLocalTesting
    ```

{% Aside %} フラグを使用して Chrome を起動する前に、Chrome を実行しているプロセスを終了するか、「強制終了」を使用してください。 {% endAside %}

## Topics API デモ

[Topics デモ](https://topics-demo.glitch.me/)では、追加のフラグを使用してエポックの長さなどの設定を調整する方法を示しています。コマンドラインでフラグ指定で Chrome を実行し、Topics API にアクセスする場合は、コマンドライン設定が上書きされる可能性があるため`chrome://flags` は設定しないでください。

[Run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) には、コマンドラインから Chrome やその他の Chromium ベースブラウザを実行する際にフラグを設定する方法が説明されています。ただしこのデモは、Google Chrome に特化しています。

## Topics API ヘッダーのデモ

[topics-fetch-demo.glitch.me](https://topics-fetch-demo.glitch.me/) のデモでは、`fetch()` リクエストとレスポンスヘッダーを使用してトピックにアクセスし、観察済みとしてマークする方法を示しています。

### `Sec-Browsing-Topics` リクエストヘッダーにアクセスする {: #headers}

iframe から `document.browsingTopics()` を使ってユーザーのトピックを閲覧する代わりに、API 呼び出し元は options パラメーターに `{browsingTopics: true}` を含む [fetch() リクエスト](https://developer.mozilla.org/docs/Web/API/fetch)か、`deprecatedBrowsingTopics` 属性を `true` に設定する [XHR リクエスト](https://developer.mozilla.org/docs/Web/API/fetch)のヘッダーから、観察されたトピックにアクセスできます。

例えば以下のようにします。

```javascript
fetch('https://topics-server.glitch.me', {browsingTopics: true})
    .then((response) => {
        // Process the response
 })
```

API をサポートするブラウザでは、`fetch()` リクエストに `Sec-Browsing-Topics` ヘッダーが含まれます。このヘッダーには、リクエスト URL のホスト名（この例では `topics-server.glitch.me`）で観察されたトピックがリスト表示されます。

このホスト名とこのユーザーのトピックが観察されていない場合、ヘッダーは含まれますが、値は空です。つまり、`fetch()` リクエストの code0}Sec-Browsing-Topics ヘッダーには、リクエスト URL のホスト名と一致するオリジンの呼び出し元が現在のユーザーのブラウザで観察したトピックのみが含まれます。これは、iframe から `document.browsingTopics()` を呼び出して、現在のユーザーの観察済みトピックを閲覧する場合と同じです。

リクエストヘッダーは、適切な権限ポリシーが有効であり、コンテキストが安全であり、ユーザー設定が許可している限り、リクエストで送信されます。Topics は、ナビゲーションリクエストのヘッダーには提供されません。

Topics リクエストヘッダーは以下のようになります。

```text
Sec-Browsing-Topics: 186;version="chrome.1:1:2206021246";config_version="chrome.1";model_version="2206021246";taxonomy_version="1", 265;version="chrome.1:1:2206021246";config_version="chrome.1";model_version="2206021246";taxonomy_version="1"
```

この例には、[Topics 分類体系](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v1.md)の 186 と 265 の 2 つのトピックと、各トピックのバージョン情報が含まれています。

{% Aside 'note' %} [fetch()](https://chromium-review.googlesource.com/c/chromium/src/+/4044267) と [XHR](https://chromium-review.googlesource.com/c/chromium/src/+/4103742) の実装は、Chrome 111 で初めて提供されました。（詳細については、これらのビルドを参照してください。） {% endAside %}

<code>XHR</code> リクエストにトピックヘッダーを含めることは一時的にのみ利用可能であり、サポートは今後削除される予定です。

### `Observe-Browsing-Topics` で観察されたトピックにマークを付ける

リクエストに `Sec-Browsing-Topics` ヘッダーが含まれていて、そのリクエストへのレスポンスに `Observe-Browsing-Topics: ?1` ヘッダーが含まれている場合、ブラウザはリクエストヘッダーのトピックを観察済みとしてマークします。観察されたトピックは、Topics API による計算の対象となります。このメカニズムは、iframe から JavaScript API を使用して提供される機能と一致するように設計されています。

以下のスクリーンショットは、API デモ ページのサイトへのアクセスから記録されたトピックを示しています。

<figure>{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/7GjvLNY86mBzeXPERRam.png", alt="glitch.me の Topics API デモページ", width="656", height="566" %} <figcaption> API を試すための glitch.me デモ。<a href="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/7GjvLNY86mBzeXPERRam.png?auto=format&amp;w=1600">拡大版を表示</a></figcaption></figure>

このリストには、デモからアクセスして興味のあるトピックを記録できるサイトが表示されます。ご覧のとおり、スクリーンショットの Arts &amp; Entertainment/Humor のカテゴリは、これらのウェブサイトのトピックではないため、この記録されたトピックは、5% のランダムなトピックとして追加されたトピックです。

- pets-animals-pets-cats.glitch.me
- cats-cats-cats-cats.glitch.me
- cats-pets-animals-pets.glitch.me
- cats-feline-meow-purr-whiskers-pet.glitch.

`chrome://topics-internals` ページの [Topics State] タブで、どのトピックが本物でどれがランダムであるかを確認できます。このスクリーンショットは、さまざまな閲覧セッションの例を示しています。

<figure>{% Img src="image/RtQlPaM9wdhEJGVKR8boMPkWf443/Ef9ml82uPg3RdX5PX5QU.png", alt="[Topics State] タブには、観察されたトピックに関する情報が表示されます。", width="474", height="416" %}<figcaption>実際のトピックとランダムなトピックを表示する [Topics State] タブ。 <a href="https://wd.imgix.net/image/RtQlPaM9wdhEJGVKR8boMPkWf443/Ef9ml82uPg3RdX5PX5QU.png?auto=format&amp;w=1600">拡大版を表示</a></figcaption></figure>

## 次のステップ

アドテック開発者の方は、Topics API を[試して参加してください](/docs/privacy-sandbox/topics-experiment/)。さらに詳しいリソースについては、[開発者ガイド](/docs/privacy-sandbox/topics/)をお読みください。

{% Partial 'privacy-sandbox/topics-feedback.njk' %}

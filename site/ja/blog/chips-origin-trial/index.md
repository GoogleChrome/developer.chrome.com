---
layout: layouts/doc-post.njk
title: Cookies Having Independent State（CHIPS）オリジントライアル
subhead: Chrome 100 以降、CHIPS オリジントライアルでは、トップレベル サイトごとに個別の Cookie ジャーを使用して、「パーティション化された」ストレージに Cookie をオプトインできます。
description: Chrome 100 以降、CHIPS オリジントライアルでは、トップレベル サイトごとに個別の Cookie ジャーを使用して、「パーティション化された」ストレージに Cookie をオプトインできます。パーティション化された Cookie はサードパーティのサービスによって設定できますが、最初に設定されたトップレベルサイトのコンテキスト内でのみ読み取られます。
date: 2022-03-17
updated: 2022-06-10
authors:
  - mihajlija
tags:
  - origin-trials
  - cookies
  - privacy
---

## 変更点

- **2022 年 6 月**: Chrome 104 以降、 `Partitioned` 属性を使用して Cookie を設定する際に `Domain` 属性を省略する必要がなくなりました。
- **2022 年 5 月**: Chrome 103 以降、オリジントライアルをオプトインするために `Accept-CH: Sec-CH-Partitioned-Cookies` ヘッダーを送信する必要がなくなりました。

## CHIPS とは？

[Cookies Having Independent State（CHIPS）](/docs/privacy-sandbox/chips/)は、プライバシーサンドボックスの提案であり、開発者が Cookie を「パーティション化された」ストレージにオプトし、トップレベルサイトごとに個別の Cookie ジャーを使用できるようにします。

パーティション化されたサードパーティ Cookie は、最初に設定されたトップレベルサイトに関連付けられ、他の場所からはアクセスできません。目的は、サードパーティサービスによって Cookie が設定されることを許可することですが、最初に設定されたトップレベルサイトのコンテキスト内でのみ読み取られるようにします。

## オリジントライアルの対象者

このトライアルは、[サードパーティ オリジントライアル](/blog/third-party-origin-trials/)として公開されます。これにより、埋め込みコンテンツのプロバイダーは、複数のサイトで新しい機能を試すことができます。

サイトがファーストパーティとしてトライアルに登録されている場合、Cookie のパーティション機能は、そのサイトのサードパーティ コンテンツプロバイダーでも利用できます。これらのサードパーティプロバイダーは、オリジントライアルへの登録を示す追加の HTTP ヘッダーも受信する必要があります。

## トライアルの実施期間

トライアルは、Chrome 100 から Chrome 105 までで利用できます。予定されているリリース日については、[Chrome のリリーススケジュール](https://chromiumdash.appspot.com/schedule)を確認してください。

## オリジントライアルの登録方法

### 前提条件

Chrome 安定版 103

### 手順

1. [CHIPS オリジントライアル ページ](/origintrials/#/view_trial/1239615797433729025)にアクセスして、オリジントライアルに登録し、ドメインのトークンを取得します。

2. `Partitioned` を含む `Set-Cookie` ヘッダーを持つすべてのレスポンスに、有効なトークンを含む `Origin-Trial` ヘッダーを含めます。

    ```js
    Origin-Trial: <ORIGIN TRIAL TOKEN>
    ```

3. 以下のいずれかの方法で、 `Partitioned` 属性を Cookie に追加します。

    - `Set-Cookie` ヘッダー:

        ```text
        Set-Cookie: __Host-name=value; Secure; Path=/; SameSite=None; Partitioned;
        ```

    - Javascript:

        ```js
        cookieStore.set({
        name: '__Host-name',
        value: 'value',
        secure: true,
        path: '/',
        sameSite: 'none',
        // Set a partitioned cookie using the attribute below.
        partitioned: true,
        });
        ```

### 例

オリジントライアルに参加しているサイトは、レスポンスに以下のヘッダーを含める必要があります。

```text
Origin-Trial: <ORIGIN TRIAL TOKEN>
Set-Cookie: __Host-name=value; Secure; Path=/; SameSite=None; Partitioned;
```

## 動作の確認

### ヘッダーを調べる

オリジントライアルのオプトインに成功し、パーティション化された Cookie を設定すると、現在のセッションが終了するまで、Chrome クライアントからの後続のリクエストに `Sec-CH-Partitioned-Cookies: ?0` リクエストヘッダーが含まれます。

```text
Sec-CH-Partitioned-Cookies: ?0
Cookie: __Host-name=value
```

サイトがこのクライアントヒントなしで Cookie を受信した場合、オリジントライアルのオプトインは成功しておらず、受信している Cookie はパーティション化されていません。

`Partitioned` の `Set-Cookie` ヘッダーを含まないレスポンスは、サイトのオリジントライアル参加ステータスに影響しません。

有効なトークンを含む `Origin-Trial` ヘッダーで応答しない場合、マシン上のパーティション化された Cookie はパーティション化されていない Cookie に変換されます。

詳細については、[chromium.org の CHIPS ドキュメント](https://www.chromium.org/updates/chips/)をご覧ください。

### DevTools

1. `chrome://flags/#partitioned-cookies` に移動し、設定を「有効」に変更します。
2. 右下にある「再起動」ボタンをクリックするか、chrome://restart に移動して、Chromium を再起動します。
3. `chrome://settings/cookies` に移動し、ラジオ ボタンが「すべての Cookie を許可する」または「シークレットモードでサードパーティの Cookie をブロックする」に設定されていることを確認します。
4. 埋め込みのあるサイトを読み込みます。
5. DevTools を開いて「**アプリケーション**」&gt;「**Cookies**」&gt;あなたのサイトに移動し、DevTools で「**Partition Key**」列を探します。

{% Aside %} すべてのクライアントがオリジントライアルを有効にしているわけではありません。 {% endAside %}

## その他の詳細

### Cookie の要件

- パーティション化された Cookie は、`Secure` と `Path=/` で設定する必要があります。
- `SameParty` 属性を `Partitioned` と併用することはできません。

Chrome は、Cookie のパーティション化が有効か無効かに関係なく、`Partitioned` 属性で設定された Cookie にこれらのルールを適用します。正しく設定されていない Cookie は拒否されます。

Cookie のパーティション化が無効になっていても、Cookie に正しい属性が設定されている場合、Chrome は `Partitioned` 属性を無視し、結果の Cookie は設定された場所とは異なるトップレベルサイトのホストにリクエストで送信されます。

パーティション化された Cookie には、`SameSite=None` 属性も含める必要があります。これにより、Cookie のパーティション化をサポートしていないブラウザで、サードパーティのコンテキストで Cookie を送信できるようになります。

### JavaScript と Service Worker

オリジントライアルにオプトインするフレームは、`document.cookie` や CookieStore API などの JavaScript API を介して、パーティション化された Cookie の読み取りと書き込みにアクセスできます。トライアルのスクリプトに含まれていないフレームは、パーティション化された Cookie の読み取りも書き込みもできません。<br>CHIPS オリジントライアルは現在、Service Worker ではサポートされていません。

## エンゲージメントとフィードバックの共有

- イシューを提起し、[GitHub](https://github.com/WICG/CHIPS/issues) でのディスカッションをご覧ください。
- [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。
- [プライバシーサンドボックスの提案に関するフィードバック](/docs/privacy-sandbox/feedback/)を提供するためのさまざまな方法を確認してください。

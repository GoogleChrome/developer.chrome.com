---
layout: layouts/blog-post.njk
title: Accept-Language の情報量削減のオリジントライアルに参加する
description: |2-

  Accept-Language の情報量削減は、Chrome ブラウザにおけるパッシブフィンガープリンティングの攻撃サーフェスを削減するための取り組みです。
date: '2022-12-01'
tags:
  - privacy
authors:
  - victortan
---

Accept-Language の情報量削減は、[`Accept-Language`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language) ヘッダーでユーザーの言語設定を減らし、ユーザーが最も優先する言語（1 つだけ）のみを送信することにより、パッシブフィンガープリンティングの攻撃サーフェスを減らす取り組みです。

[Chrome 109](https://chromiumdash.appspot.com/schedule) ベータ版より、Accept-Language の情報量削減の[オリジントライアル](/origintrials/#/view_trial/-7166352907053301759)を開始し、削減された `Accept-Language` ヘッダーをサイトが受け取ることを選択できるようにします。これにより、削減された `Accept-Language` が Chrome の将来のリリースでデフォルトの動作になる前に、サイトがイシューを発見して修正できるようになります。安定したユーザー数に対して公開される前に機能をテストするには、Chrome 109 のリリース日（[現時点では 2023 年 1 月 10 日予定](https://chromiumdash.appspot.com/schedule)）の前に必ずオプトインしてテストしてください。

Check out the examples of `Accept-Language` header before and after the reduction below.

{% Compare 'worse', 'current' %}

```text
Accept-Language: en-GB,en;q=0.9,de;q=0.8,fr;q=0.7
```

{% endCompare %}

{% Compare 'better', 'proposed' %}

```text
Accept-Language: en-GB
```

{% endCompare %}

以下は、オリジントライアルの概要と今後の予定です。[Accept-Language の情報量削減 GitHub リポジトリ](https://github.com/Tanych/accept-language)で、この変更またはオリジントライアル中に見つかったイシューに関するフィードバックを共有できます。

## What is Accept-Language?

The [Accept-Language](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language) string is shared on every HTTP request and exposed in JavaScript to all resources loaded by the browser. Currently, it contains all of the user's preferred languages.

## Why is Accept-Language being reduced?

Accept-Language の情報量削減は、Chrome ブラウザにおけるパッシブフィンガープリンティングの攻撃サーフェスを削減する取り組みです。

Currently, the `Accept-Language` header is shared by default on every HTTP request and exposed in JavaScript to all resources loaded by the browser. It contains all language preferences of the user. Rather than the browser sending the full list of languages that the user has configured in case sites wish to provide multilingual content, we are introducing a new way for sites to indicate multilingual content and the browser will take responsibility to do the language negotiation and display the preferred language.

Another reason is that many sites may not be using the `Accept-Language` headers for language negotiation at all (for example, [one study](https://wonderproxy.com/blog/accept-language/) indicates only 7.2% of the top 10,000 sites use `Accept-Language`). Chrome Incognito mode already reduced the `Accept-Language` to one.

## What does this mean for web developers?

Sites that rely on `Accept-Language` to do language negotiation should prepare to receive reduced `Accept-Language` and consider participating in the origin trial. The reduced `Accept-Language` values will appear in:

- The `Accept-Language` HTTP request header.
- The `navigator.languages` JavaScript getter.

The browser will take responsibility for language negotiation to select the user's preferred language to send to sites. To make this happen, sites need to add two headers [`Variants`](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-variants-06#section-2) (a new header indicates sites supporting languages) `Accept-Language` and [`Content-Language`](https://datatracker.ietf.org/doc/html/rfc3282) in the response header (see detailed example below).

The reduced `Accept-Language` plans currently don't include iOS and WebView, and those platforms will continue to get users' full list of `Accept-Language`. Support for these platforms is planned for a later date.

## Accept-Language の情報量削減のオリジントライアル

An origin trial requires the participating site to provide a token in its response which tells the browser to enable the specified trial. However, this means that on the browser's initial request to the site it has no way of knowing if the site is participating in an origin trial. This means that *the initial request in a session will not send the reduced `Accept-Language header`*. Requests for subresources in that page, both same-origin and cross-origin, will receive the reduced `Accept-Language` header. Subsequent same-origin navigations will also receive the reduced `Accept-Language` header. Cross-origin navigations will revert to sending the full header, while the cross-origin requests within the page (such as third-party iframe requests) will still send the reduced `Accept-Language` header if the top-level frame request has a valid origin trial token.

これは User-Agent の情報量削減のオリジントライアルに似ています。Chromium 内部の実装についての詳細は、[削減された Accept-Language HTTP ヘッダーの実装](https://docs.google.com/document/d/1RkPDf7DNtcOj4KXeW8wNCuYfto-drnGYST_NvZe3GoY/)をご覧ください。

## Accept-Language の情報量削減オリジントライアルに参加する

You can read further guidance in [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/), but the essential steps are shown below.

### Step 1

オリジントライアルに登録してドメインのトークンを取得するには、 [Accept-Language の情報量削減のトライアル](/origintrials/#/view_trial/-7166352907053301759)ページにアクセスしてください。

### Step 2

Update your HTTP response headers:

1. Add `Origin-Trial: <ORIGIN TRIAL TOKEN>` to your HTTP response header, where &lt;`ORIGIN TRIAL TOKEN`&gt; contains the token you got when registering for the origin trial.
2. Add `Content-Language` to your HTTP response header to indicate the language(s) intended for the audience.
3. Add `Variants` to your HTTP response header to indicate sites supported languages.
4. [Optional] Add `Vary: Accept-Language` to your HTTP response to create a cache key for content negotiation.
5. Setting those headers will only trigger browser language negotiation (a potential restart for the initial request) for the given origin. To make sites display the correct language representation for the users, you also need to update sites sending the content based on the user's Accept-Language header (see example below).

{% Aside %} If the response headers contain a valid `Origin-Trial` token, `Content-Language` and valid `Variants` header, then all subresource requests (for example, for images or stylesheets) and subnavigations (for example, iframes) will send the reduced Accept-Language string, even if the origins of those requests are not enrolled in the origin trial. {% endAside %}

### Step 3

Load your website in Chrome M109 Beta (or later) and start receiving the reduced Accept-Language string.

イシューやフィードバックについては、Accept-Language の情報量削減の [GitHub リポジトリ](https://github.com/Tanych/accept-language)に送信してください。

## Demo

For a demonstration of a multilingual site which opted-in the origin trial (along with the source code) see [https://reduce-accept-language.glitch.me/](https://reduce-accept-language.glitch.me/).

For a demonstration of opt-in and opt-out the origin trial (along with the source code) see [https://reduce-accept-language-ot.glitch.me/](https://reduce-accept-language-ot.glitch.me/).

For example, `example.com` supports `ja` (Japanese) and `en` (English). A request may be:

```text
GET / HTTP/1.1
Host: example.com
Accept-Language: en
```

The site knows the user prefers content in English based on the user's accept-language. The response headers may include:

```text
HTTP/1.1 200 OK
Content-Language: en
Variants: Accept-Language=(en ja)
Origin-Token: a-valid-token
```

If user has a preference for Japanese language content, the request would be:

```text
GET / HTTP/1.1
Host: example.com
Accept-Language: ja
```

In this case, the site responds with headers for Japanese content:

```text
HTTP/1.1 200 OK
Content-Language: ja
Variants: Accept-Language=(en ja)
Origin-Token: a-valid-token
```

On the server-side, the site may be looking for specific language support but falling back to a default if no support is detected:

```js
if(accept_language == 'ja') {
    res.response('ja_page')
}
else {
   res.response('en_page')
}
```

In the example above, `example.com` responds either `en` or `ja` based on the `Accept-Language` value, defaulting to `en` if none match.  In this case, the site can also provide redirects to corresponding language pages either `/en` or `/ja` based on the `Accept-Language` value.  See detailed examples related to redirects on [the implementation doc](https://docs.google.com/document/d/1RkPDf7DNtcOj4KXeW8wNCuYfto-drnGYST_NvZe3GoY/edit#bookmark=id.eml73ve0kywe).

## Third-party origin trial support

We currently don't support registering your domains as a [third-party for the trial](/docs/web-platform/third-party-origin-trials/). If you operate a service that is implemented as a subresource across origins (like ad serving or analytics), you will only receive the reduced `Accept-Language` header if the top-level site is participating in the origin trial.

## Validate that the origin trial is working

The guide to [troubleshooting Chrome's origin trials](/docs/web-platform/origin-trial-troubleshooting/) provides a full checklist for ensuring your token is correctly configured.

You configure multiple languages and their priority from `chrome://settings/languages` or Settings → Languages. Consider selecting a language your site does **not** support and moving that to the top of the list to ensure that the additional renegotiation is triggered.

The initial response's headers containing the origin trial token should look like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/9vMsKcqCF2wEQ7K4dxKT.png", alt="A screenshot of the request header with the reduce Accept-Language.", width="800", height="228" %}

Subsequent request headers containing the reduced Accept-Language look like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/kdfphse1F4gscnY74UJi.png", alt="The initial response's headers containing the origin trial token.", width="800", height="257" %}

## Stop participating in the origin trial

At any given point in time during the trial, you can stop participating and receive the full list of user's Accept-Language. To stop participating:

1. Accept-Language の情報量削減トライアルの `Origin-Trial` ヘッダーを HTTP レスポンスから削除します。
2. [Optional] Remove `Variants` header which is added to opt-in the origin trial in your HTTP response if you are not interested in sending this header. You can also use `Variants` with an empty value to accomplish this.
3. [Optional] Remove `Content-Language` header which is added to opt-in the origin trial in your HTTP response if you are not interested in sending this header.

## Origin trial duration

Accept-Language の情報量削減オリジントライアルは、少なくとも 6 か月間実施されます。これは、約 6 つの Chrome マイルストーンに対応する期間です。オリジントライアルは M109 で開始され、M114 （トライアルを使用できる最後の Chrome リリース）で終了します。この時点で、オリジントライアルからのフィードバックが評価され、その後 Chrome は削減された Accept-Language  文字列を段階的にロールアウトします（まず、削減された Accept-Language HTTP ヘッダーをロールアウトしてから、JS インターフェースを削減します）。サイトがテスト期間の延長を必要とする場合は、その後のデプリケーショントライアルにオプトインできます。これにより、少なくともさらに 6 か月間、完全な Accept-Language 文字列にアクセスすることが可能です。デプリケーショントライアルの詳細については、準備が整い次第公開します。

## Share feedback

イシューやフィードバックについては、Accept-Language の情報量削減の [GitHub リポジトリ](https://github.com/Tanych/accept-language)に送信してください。

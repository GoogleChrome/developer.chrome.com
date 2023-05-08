---
layout: 'layouts/doc-post.njk'
title: User-Agent の情報量削減スニペット
subhead: >
  現在の Chrome の User-Agent 文字列を情報量削減後の形式に変換するためのコード スニペットです。
description: >
  現在の Chrome の User-Agent 文字列を、正規表現を使って情報量削減後の形式に変換することで、あなたのサイトやサービスが情報量削減後の形式で正常に動作するかをテストしてください。
date: 2021-11-26
authors:
  - rowan_m
---

現在の Chrome の User-Agent
文字列を情報量削減後の形式に変換するためのコード
スニペットのコレクションです。[ご希望のプラットフォームとプログラミング言語に対応した提案を送る](https://github.com/GoogleChrome/developer.chrome.com//blob/main/site/en/docs/privacy-sandbox/user-agent/snippets/index.md)、もしくは追加する価値があるものをお知らせください。

## 背景

今後、Chrome の [User-Agent 文字列中で開示される情報が削減されていきます](/docs/privacy-sandbox/user-agent/)。これは、一定期間をかけて段階的に行われ、最終的には
OS のバージョン、デバイス、ブラウザの詳細バージョンの部分が User-Agent
文字列から削除されます。

モバイル デバイスの場合の例を次に示します。

{% Compare 'worse', 'old' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android <span style="background: #ef9a9a">12; Pixel 5</span>)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.<span  style="background:
#ef9a9a">0.4638.16</span> Mobile Safari/537.36</span> {% endCompare %}

{% Compare 'better', 'new' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android <span style="background: #a5d6a7">10; K</span>)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.<span style="background:
#a5d6a7">0.0.0</span> Mobile Safari/537.36</span> {% endCompare %}

## コード内で User-Agent をオーバーライドする方法

正規表現を用いて、[User-Agent 文字列をローカルでテスト](/docs/privacy-sandbox/user-agent/#test-locally)できます。

{% Aside %}
[サイトをオリジントライアルに登録](/blog/user-agent-reduction-origin-trial/)すると、そのサイトにアクセスする
Chrome ブラウザは情報量削減後の形式の User-Agent を送信するようになります。
{% endAside %}

情報量削減後の形式の `User-Agent` 文字列を使用できれば、それを自分のコードに照らして変換したりテストしたりできます（オーバーライドや置き換えを行う、新しいバージョンを作成して並列にテストするなど）。

### 正規表現

確実に変換可能な Chrome の User-Agent **のみ**に一致し、必要な変数値（後で新しい形式のテンプレートに挿入する）を抜き出すための正規表現です。

コピーしやすいように 1 行で記述されています。長いですが、Chrome
のみに一致させることと比較的低負荷なチェックで済ませることを優先した結果です。

```text
/^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/
```

この式から次の値が得られます。

- `platform`: プラットフォームまたはオペレーティング システム
- `major`: ブラウザのメジャー バージョン
- `mobile`: モバイル デバイス インジケーター

ここで得られた値を、次に示す情報量削減後の形式のテンプレート文字列に挿入します。

```text
Mozilla/5.0 (${unifiedPlatform[matched.platform]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${matched.major}.0.0.0${matched.mobile} Safari/537.36
```

`unifiedPlatform` の値は、一致する短縮形の `platform` を適切な情報量削減後の値に置き換えることで得られます。

- `Lin` → `Linux; Android 10; K`
- `Win` → `Windows NT 10.0; Win64; x64`
- `Mac` → `Macintosh; Intel Mac OS X 10_15_7`
- `X11; C` → `X11; CrOS x86_64 14541.0.0`
- `X11; L` → `X11; Linux x86_64`

### JavaScript

クライアントサイドの JavaScript で [navigator.userAgent](https://developer.mozilla.org/docs/Web/API/Navigator/userAgent) の現在の値を情報量削減後の形式でオーバーライドするには、次のスニペットを使用します。

デモ: [reduced-ua.glitch.me/javascript.html](https://reduced-ua.glitch.me/javascript.html)

```javascript
const chromeUAs = /^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/;
const matched = chromeUAs.exec(navigator.userAgent);

if (matched) {
  // 検出した platform を情報量削減後の値にマッピングする
  const unifiedPlatform = {
    'Lin': 'Linux; Android 10; K',
    'Win': 'Windows NT 10.0; Win64; x64',
    'Mac': 'Macintosh; Intel Mac OS X 10_15_7',
    'X11; C': 'X11; CrOS x86_64 14541.0.0',
    'X11; L': 'X11; Linux x86_64',
  };
  const reducedUA =
        `Mozilla/5.0 (${unifiedPlatform[matched.groups.platform]}) ` +
        `AppleWebKit/537.36 (KHTML, like Gecko) ` +
        `Chrome/${matched.groups.major}.0.0.0${matched.groups.mobile} Safari/537.36`
  // navigator.userAgent を情報量削減後の文字列でオーバーライドする
  Object.defineProperty(navigator, 'userAgent', {
    value: reducedUA,
    writable: false,
    configurable: true
  });
}
```

### Node.js

[Node.js](https://nodejs.org/) で受信した [User-Agent ヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)を情報量削減後の形式でオーバーライドするには、次のスニペットを使用します。

デモ: [reduced-ua.glitch.me/server-side](https://reduced-ua.glitch.me/server-side)

```javascript
const chromeUAs = /^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/;
const matched = chromeUAs.exec(request.get('user-agent'));

if (matched) {
  const unifiedPlatform = {
    'Lin': 'Linux; Android 10; K',
    'Win': 'Windows NT 10.0; Win64; x64',
    'Mac': 'Macintosh; Intel Mac OS X 10_15_7',
    'X11; C': 'X11; CrOS x86_64 14541.0.0',
    'X11; L': 'X11; Linux x86_64',
  };
  request.headers['user-agent'] = `Mozilla/5.0 (${unifiedPlatform[matched.groups.platform]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${matched.groups.major}.0.0.0${matched.groups.mobile} Safari/537.36`;
}
```

### Cloudflare Workers

[Cloudflare Workers](https://developers.cloudflare.com/workers/) を使用すると、サイトへのリクエストをプロキシして変換できます。次のスニペットは、受信した [`User-Agent` ヘッダー](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)を情報量削減後の形式に置き換えます。

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
  const chromeUAs = /^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/;
  const matched = chromeUAs.exec(request.headers.get('user-agent'));

  if (matched) {
    const unifiedPlatform = {
      'Lin': 'Linux; Android 10; K',
      'Win': 'Windows NT 10.0; Win64; x64',
      'Mac': 'Macintosh; Intel Mac OS X 10_15_7',
      'X11; C': 'X11; CrOS x86_64 14541.0.0',
      'X11; L': 'X11; Linux x86_64',
    };

    const clonedRequest = new Request(request, {referrer: request.referrer});
    clonedRequest.headers.set('user-agent', `Mozilla/5.0 (${unifiedPlatform[matched.groups.platform]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${matched.groups.major}.0.0.0${matched.groups.mobile} Safari/537.36`);
    return await fetch(clonedRequest);
  } else {
    return await fetch(request);
  }
}
```

最終更新日: 2021 年 11 月 26 日（金）• [記事を改善](https://github.com/GoogleChrome/developer.chrome.com//blob/main/site/en/docs/privacy-sandbox/user-agent/snippets/index.md)

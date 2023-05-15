---
layout: layouts/doc-post.njk
title: Permissions Policy によるブラウザ機能の制御
subhead: ページとページ内のサードパーティ iframe がブラウザ機能にアクセスする方法を管理します。
description: ページと埋め込みのサードパーティ iframe がブラウザ機能にアクセスする方法を管理するための提案。
date: 2022-04-20
authors:
  - kevinkiklee
---

以前は機能ポリシー (Feature Policy) と呼ばれていた権限ポリシー (Permissions Policy) を使用すると、開発者は、ブラウザが適用する一連のポリシーを宣言することにより、ページ、その iframe、およびサブリソースで使用できるブラウザ機能を制御できます。これらのポリシーは、レスポンスヘッダーのオリジンリストで提供されるオリジンに適用されます。オリジンリストには、同一オリジンやクロスオリジンを含めることができ、開発者はブラウザ機能へのファーストパーティとサードパーティのアクセスを制御できます。

より強力な機能へのアクセスを許可する最終決定権はユーザーにあり、プロンプトを介して明示的な許可を与える必要があります。

権限ポリシーにより、トップレベルサイトは、サイトとそのサードパーティが何を使用する予定であるかを定義できるようになり、機能アクセスリクエストが正当かどうかを判断するユーザーの負担が軽減されます。たとえば、権限ポリシーを使用してすべてのサードパーティの位置情報機能をブロックすることにより、開発者は、サードパーティがユーザーの位置情報にアクセスできないことを確証できます。

{% Aside %} [プライバシーサンドボックス](https://web.dev/digging-into-the-privacy-sandbox/)は、サードパーティ Cookie やその他の追跡メカニズムを使用せずに、サードパーティのユース ケースを満たすための一連の提案です。

[User-Agent Client Hints](https://web.dev/user-agent-client-hints/) や [Topics API](/docs/privacy-sandbox/topics/) などのプライバシーサンドボックス API は、 `geolocation` や `camera` などの機能が管理されるのと同じ方法で、権限ポリシーによって管理されます。権限ポリシーに依存するウェブプラットフォーム API のリストについては、[機能リスト](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md)をご覧ください。このリストは最新のものではない場合があることに注意してください。 {% endAside %}

## 権限ポリシーへの変更

権限ポリシー（Permissions Policy）は、以前は機能ポリシー（Feature Policy）と呼ばれていました。 主要な概念は変わりませんが、名前に伴っていくつかの重要な変更が適用されています。

### 構造化フィールドの使用方法

[構造化フィールド](https://www.rfc-editor.org/rfc/rfc8941.html)は、HTTP ヘッダーフィールド値の解析とシリアル化を標準化するための一連の共通データ構造を提供します。 構造化フィールドの詳細については、Fastly のブログ記事「[Improving HTTP with structured header fields](https://www.fastly.com/blog/improve-http-structured-headers)（構造化ヘッダーフィールドによる HTTP の改善）」をご覧ください。

{% Compare 'worse', 'old' %}

```text
geolocation 'self' https://example.com; camera 'none'
```

{% CompareCaption %} 以前は機能ポリシーを使用していました。 {% endCompareCaption %} {% endCompare %}

{% Compare 'better', 'new' %}

```text
geolocation=(self "https://example.com"), camera=()
```

{% CompareCaption %} 権限ポリシーを使用するようになりました。 {% endCompareCaption %} {% endCompare %}

### ヘッダーと iframe `allow` 属性の併用

機能ポリシーでは、クロスオリジンフレームに機能を追加する場合に、オリジンをヘッダーオリジンリストに追加するか、iframe タグに `allow` 属性を追加していました。 権限ポリシーでは、オリジンリストにクロスオリジンフレームを追加する場合、そのオリジンの iframe タグに `allow` 属性を含める必要があります。 レスポンスに権限ポリシーのヘッダーが含まれていない場合、オリジンリストのデフォルト値は `*` であると見なされるため、 iframe に `allow` 属性を追加すれば、その機能にアクセスできるようになります。

したがって、`allow` が存在する場合でも、オリジンリストにリストされていないクロスオリジン iframe がこの機能にアクセスできないように、開発者は、レスポンスに権限ポリシーのヘッダーを明示的に設定することをお勧めします。

機能ポリシーは Chrome 88 以降もそのまま使用できますが、権限ポリシーのエイリアスとして動作します。 構文以外は、ロジックに違いはありません。 権限ポリシーと機能ポリシーの両方のヘッダーが同時に使用されている場合、`Permissions-Policy` ヘッダーが優先され、`Features Policy` ヘッダーが指定する値が上書きされます。

## 権限ポリシーの使用方法 {: #usage }

### 簡単な概要

深く掘り下げる前に、一般的なシナリオを見てみましょう。あなたがウェブサイトの所有者であり、サイトとサードパーティコードがブラウザ機能をどのように使用するかを制御したいと考えているとします。

- サイトは `https://your-site.example`です。
- サイトには同一オリジン（`https://your-site.example`）の iframe が埋め込まれています。
- あなたのサイトには、信頼できる `https://trusted-site.example` の iframe が埋め込まれています。
- サイトには、`https://ad.example` が配信する広告も表示されます。
- 位置情報を許可するのは自分のサイトと信頼済みサイトだけで、広告には許可しません。

この場合は、次のヘッダーを使用します。

```text
Permissions-Policy: geolocation=(self "https://trusted-site.example")
```

また、信頼済みサイトの iframe タグに `allow` 属性を明示的に設定します。

```html
<iframe src="https://trusted-site.example" allow="geolocation">
```

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/8mRSZZQAhoAHsa6Tgvyo.png", alt="権限ポリシーの使用に関する簡単な概要図。", width="700", height="238" %}

この例では、ヘッダーのオリジンリストにより、サイト（`self`）と `trusted-site.example` のみが位置情報機能を使用できます。`ad.example` は位置情報の使用を許可されていません。

1. あなたのサイト `your-site.example` は、ユーザーの同意を得て位置情報機能を使用することが許可されています。
2. 同一オリジンの iframe（`your-site.example`）は、`allow` 属性を使用せずに機能を使用できます。
3. オリジンリストに追加されておらず、iframe タグに allow 属性が設定されている別のサブドメイン（`subdomain.your-site-example`）から提供される iframe は、この機能の使用がブロックされます。異なるサブドメインは、同じサイトですがクロスオリジンと見なされます。
4. オリジンリストに追加され、iframe タグに `allow` 属性が設定されているクロスオリジン iframe（`trusted-site.example`）は、この機能を使用できます。
5. `allow` 属性なしでオリジンリストに追加されたクロスオリジン iframe（`trusted-site.example`）は、機能の使用がブロックされます。
6. オリジンリストに追加されていないクロス オリジン iframe（`ad.example`）は、iframe タグに `allow` 属性が含まれていても、機能の使用がブロックされます。

### `Permissions-Policy` HTTP レスポンスヘッダー

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/jfhckpPdaepkw8bRPM0G.png", alt="ユーザーがリクエストを行うと、サーバーは権限ポリシーヘッダーで応答し、ブラウザはそのヘッダーに基づいてアクセスを許可します。", width="800", height="459" %}

```text
Permissions-Policy: <feature>=(<token>|<origin(s)>)
```

サーバーからのレスポンスに含まれる `Permissions-Policy` ヘッダーは、機能の許可されるオリジンを設定するために使用されます。 ヘッダー値は、オリジンのトークンと文字列の組み合わせを取ることができます。 [使用可能なトークン](https://w3c.github.io/webappsec-permissions-policy/#structured-header-serialization)は、すべてのオリジンの場合は `*`、同一オリジンの場合は `self` です。 ヘッダーに含まれる機能が複数ある場合は、それらをカンマで区切ります。 オリジンリストに含まれるオリジンが複数ある場合は、それらをスペースで区切ります。

ヘッダーが複数の機能に対応している場合は、機能をコンマで区切ります。複数のオリジンをリストする場合は、オリジンリスト内の各オリジンをスペースで区切ります。クロスオリジンリクエストであるオリジンをリストするヘッダーの場合、iframe タグに `allow` 属性を含める必要があります。

Key-Value ペアの例を以下に示します。

- 構文: `[FEATURE]=*`
    - ポリシーをすべてのオリジンに適用
    - 例: `geolocation=*`
- 構文: `[FEATURE]=(self)`
    - ポリシーを同一オリジンに適用
    - 例: `geolocation=(self)`
- 構文: `[FEATURE]=([ORIGIN(s)])`
    - ポリシーを指定されたオリジンに適用
    - 例: `geolocation=("https://a.example" "https://b.example")`
    - `self` は `https://your-site.example` のショートハンドです
- 構文: `[FEATURE]=(self [ORIGIN(s)])`
    - ポリシーを同一オリジンと指定されたオリジンに適用
    - 例: `geolocation=(self "https://a.example" "https://b.example")`
    - この構文を使用する場合、オリジンの 1 つが埋め込み側のオリジンである必要があります。埋め込みページ自体にアクセス許可が付与されていない場合、権限ポリシーがアクセス許可を委任するため、オリジンリストに追加されていても、そのページに埋め込まれた iframe もブロックされます。`self` トークンを使用することもできます。
- 構文: `[FEATURE]=()`
    - すべてのオリジンで機能をブロック
    - 例: `geolocation=()`

{% Aside 'warning' %} レスポンスに権限ポリシーヘッダーが含まれていない場合は、デフォルト値の `*` トークンが使用されます。これにより、`allow` 属性を持つページ上のすべての iframe が機能を使用できるようになります。したがって、オリジンリストを権限ポリシーヘッダーに明示的に設定して、アクセスを制御することを強くお勧めします。{% endAside %}

{% Aside 'gotchas' %} 権限ポリシーが機能ポリシーから変更されたため、ヘッダーのオリジンリストにオリジンを追加するだけでは、クロスオリジン iframe の機能を有効にするのに十分ではなくなりました。iframe がオリジン間である場合は、ヘッダーのオリジンリストの設定に関係なく、iframe に `allow` 属性を含める必要があります。{% endAside %}

#### さまざまなサブドメインとパス

`https://your-site.example` や `https://subdomain.your-site.example` などの異なるサブドメインは、同一サイトであってもクロスオリジンと見なされます。したがって、オリジンリストにサブドメインを追加しても、同じサイトの別のサブドメインへのアクセスは許可されません。この機能を使用するすべての埋め込みサブドメインは、オリジンリストに個別に追加する必要があります。たとえば、ユーザーのブラウジングトピックへのアクセスが、`Permissions-Policy: browsing-topics=(self)` ヘッダーで同一オリジンにのみ許可されている場合、同じサイトの別のサブドメイン `https://subdomain.your-site.example` はトピックにアクセスできません。

`https://your-site.example` や `https://your-site.example/embed` などの異なるパスは同一オリジンとみなされ、このように異なるパスをオリジンリストに含める必要はありません。

### Iframe の `allow` 属性

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/mD9lgR2lky1kdL8tohHx.png", alt="Iframes のセットアップ", width="800", height="316" %}

クロスオリジンを使用する場合、iframe が機能にアクセスするには、そのタグに `allow` 属性が必要です。

構文: `<iframe src="[ORIGIN]" allow="[FEATURE] <'src' | [ORIGIN(s)]"></iframe>`

たとえば、次のようになります。

```html
<iframe src="https://trusted-site.example" allow="geolocation">
```

{% Aside %} 構文 `allow="geolocation"` は、allow="geolocation 'src'" のショートハンドです。src は、iframe の `src` 属性のオリジンに展開される特別なトークンです。{% endAside %}

#### iframe ナビゲーションの処理

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/Y7RGrm7k7ysTtKfLvhO4.png", alt="Iframe ナビゲーションのセットアップ", width="500", height="283" %}

デフォルトでは、iframe が別のオリジンに移動する場合、そのポリシーは iframe が移動する先のオリジンには適用されないようになっています。 iframe が移動する先のオリジンを `allow` 属性にリストすることで、元の iframe に適用されていた権限ポリシーを、iframe が移動する先のオリジンに適用することができます。

```html
<iframe src="https://trusted-site.example" allow="geolocation https://trusted-site.example https://trusted-navigated-site.example">
```

[iframe navigation demo](https://permissions-policy-demo.glitch.me/demo/nav-allowed)（iframe ナビゲーションデモ）にアクセスすると、実際の動作を確認できます。

## 権限ポリシーのセットアップ例

次のセットアップ例は、[デモ](https://permissions-policy-demo.glitch.me/demo/)でご覧いただけます。

### 機能がすべてのオリジンに許可される例

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/uzpMbPWgvHjJwF4TTAIG.png", alt="機能へのアクセスがすべてのオリジンに許可されるアーキテクチャ", width="800", height="491" %}

```text
Permissions-Policy: geolocation=*
```

```html
<iframe src="https://trusted-site.example" allow="geolocation">
<iframe src="https://ad.example" allow="geolocation">
```

オリジンリストが `*` トークンに設定されている場合、その機能は、それ自体とすべての iframe を含む、ページに存在するすべてのオリジンに対して許可されます。この例では、`https://your-site.example` から提供されるすべてのコードと、`https://trusted-site.example` iframe および `https://ad.example` から提供されるコードは、ユーザーのブラウザの位置情報機能にアクセスできます。ヘッダーのオリジンリストにオリジンを追加するとともに、iframe 自体にも allow 属性を設定する必要があることに注意してください。

このセットアップは、[デモ](https://permissions-policy-demo.glitch.me/demo/all-allowed)でご覧いただけます。

### 機能が同一オリジンにのみ許可される例

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qMXplbgF43NkktDHgyec.png", alt="機能へのアクセスが同一オリジンにのみ許可されるアーキテクチャ", width="800", height="490" %}

```text
Permissions-Policy: geolocation=(self)
```

`self` トークンを使用すると、位置情報機能の使用は同一オリジンにのみ許可されます。 クロスオリジンはこの機能にアクセスできません。 この例では、`https://trusted-site.example`（`self`）のみが位置情報機能にアクセスできます。 この構文は、機能を自分のページにだけ提供し、他のページには提供しない場合に使用します。

このセットアップは、[デモ](https://permissions-policy-demo.glitch.me/demo/same-allowed)でご覧いただけます。

### 機能が同一オリジンと特定のクロスオリジンに許可される例

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/txgnW1b0dQRvnxhrjnGZ.png", alt="機能へのアクセスが指定されたオリジンに許可されるアーキテクチャ", width="683", height="429" %}

```text
Permissions-Policy: geolocation=(self "https://trusted-site.example")
```

この構文では、self（`https://your-site.example`）と `https://trusted-site.example` の両方で位置情報を使用できます。allow 属性を iframe タグに明示的に追加することを忘れないでください。`<iframe src="https://ad.example" allow="geolocation">` を持つ別の iframe がある場合、`https://ad.example` は位置情報機能にアクセスできません。元のページと、オリジンリストにリストされ、iframe タグに allow 属性がある `https://trusted-site.example` のみが、ユーザーの機能にアクセスできます。

このセットアップは、[デモ](https://permissions-policy-demo.glitch.me/demo/some-allowed)でご覧いただけます。

### 機能がすべてのオリジンでブロックされる例

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/QplbQpjXOSnZxMBlNeLN.png", alt="機能へのアクセスがすべてのオリジンにブロックされるアーキテクチャ", width="682", height="421" %}

```text
Permissions-Policy: geolocation=()
```

オリジンリストが空の場合、その機能はすべてのオリジンにブロックされます。 このセットアップは、[デモ](https://permissions-policy-demo.glitch.me/demo/none-allowed)でご覧いただけます。

{% Aside 'gotchas' %} 機能が同一オリジンに対してブロックされている場合、埋め込まれたクロスオリジンに対して機能を許可することはできません。親ページに適用されるアクセス許可は埋め込まれた iframe に委任されるため、クロスオリジンに対して機能を許可する場合は、同じオリジンに対して機能を有効にする必要があります。 {% endAside %}

## JavaScript API を使用する

機能ポリシーの既存の JavaScript API は、document または element（`document.featurePolicy または element.featurePolicy`）のオブジェクトとして検出されます。 権限ポリシーの JavaScript API はまだ実装されていません。

機能ポリシー API は、いくつかの制限はありますが、権限ポリシーによって設定されるポリシーに使用できます。 JavaScript API の実装に関する[未解決の質問](https://github.com/w3c/webappsec-permissions-policy/issues/401)があり、ロジックを [Permissions API](https://developer.mozilla.org/docs/Web/API/Permissions_API) に移動するための[提案](https://github.com/w3c/webappsec-permissions-policy/issues/401#issuecomment-824878596)が作成済みです。 意見がございましたら、ディスカッションにご参加ください。

### featurePolicy.allowsFeature(feature)

- default-origin に機能が許可される場合に `true` を返します。
- 権限ポリシーが設定するポリシーの動作と以前の機能ポリシーが設定するポリシーの動作に違いはありません。
- `allowsFeature()` が iframe 要素（`iframeEl.featurePolicy.allowsFeature('geolocation')`）で呼び出されると、iframe で allow 属性が設定されているかどうかが返された値に反映されます。

### featurePolicy.allowsFeature(feature, origin)

- 指定したオリジンに機能が許可される場合に `true` を返します。
- メソッドが `document` で呼び出された場合、このメソッドは、機能ポリシーが行ったように、指定されたオリジンに対して機能が許可されているかどうかを通知しなくなりました。ここで、このメソッドは、機能がそのオリジンに許可される可能性があることを示しています。iframe に `allow` 属性が設定されているかどうかをさらに確認する必要があります。開発者は、iframe 要素の `allow` 属性に対して追加のチェックを実行して、機能がサードパーティのオリジンに対して許可されているかどうかを判断する必要があります。

#### `element` オブジェクトによる iframe 内の機能のチェック

`document.allowsFeature(feature, origin)` とは異なり、allow 属性を考慮する `element.allowsFeature(feature)` を使用できます。

```js
const someIframeEl = document.getElementById('some-iframe')
const isCameraFeatureAllowed = someIframeEl.featurePolicy.allowsFeature('camera')
```

### featurePolicy.allowedFeatures()

- default-origin に許可されている機能のリストを返します。
- 権限ポリシーが設定するポリシーの動作と機能ポリシーが設定するポリシーの動作に違いはありません。
- 関連付けられているノードが iframe の場合、allow 属性が考慮されます。

### featurePolicy.features()

- ブラウザで使用できる機能のリストを返します。
- 権限ポリシーが設定するポリシーの動作と機能ポリシーが設定するポリシーの動作に違いはありません。

## Chrome DevTools の統合

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/BBe4KFDoiYEkWApctsOE.png", alt="Chrome DevTools と権限ポリシーの統合", width="800", height="446" %}

権限ポリシーが DevTools でどのように機能するかを確認してください。

1. [Chrome DevTools を開きます](/docs/devtools/open/#elements)。
2. ［**アプリケーション**］パネルを開き、フレームごとに許可されている機能と許可されていない機能を確認します。
3. サイドバーで、検査するフレームを選択します。 選択したフレームが使用できる機能のリストと、そのフレームでブロックされている機能のリストが表示されます。

## Feature-Policy からの移行

現在 `Feature-Policy` ヘッダーを使用している場合は、次の手順を実行して権限ポリシーに移行できます。

### 機能ポリシーヘッダーを権限ポリシーヘッダーに置き換える

機能ポリシーヘッダーは Chromium ベースのブラウザでのみサポートされており、権限ポリシーヘッダーは [Chrome 88](https://chromestatus.com/feature/5745992911552512) 以降でサポートされているため、既存のヘッダーから権限ポリシーへの更新を安全に実行できます。

{% Compare 'worse', 'old' %}

```text
Feature-Policy:
  autoplay *;
  geolocation 'self';
  camera 'self' 'https://trusted-site.example';
  fullscreen 'none';
```

{% CompareCaption %} 以前の機能ポリシー。 {% endCompareCaption %} {% endCompare %}

{% Compare 'better', 'new' %}

```text
Permissions-Policy:
  autoplay=*,
  geolocation=(self),
  camera=(self "https://trusted-site.example"),
  fullscreen=()
```

{% CompareCaption %} 現在の権限ポリシー。 {% endCompareCaption %} {% endCompare %}

### `document.allowsFeature(feature, origin)` の使用を更新する

`document.allowsFeature(feature, origin)` メソッドを使用して iframe に許可された機能を確認する場合は、iframe を格納する `document` ではなく、iframe element に関連付けられた `allowsFeature(feature)` メソッドを使用します。 `element.allowsFeature(feature)` メソッドは allow 属性を考慮しますが、`document.allowsFeature(feature, origin)` は考慮しません。

#### `document` で機能アクセスをチェックする

`document` をベースノードとして引き続き使用するには、iframe タグの `allow` 属性をさらにチェックする必要があります。

```html
<iframe id="some-iframe" src="https://example.com" allow="camera"></iframe>
```

```text
Permissions-Policy: camera=(self "https://example.com")
```

```js
const isCameraPolicySet = document.featurePolicy.allowsFeature('camera', 'https://example.com')

const someIframeEl = document.getElementById('some-iframe')
const hasCameraAttributeValue = someIframeEl.hasAttribute('allow')
&& someIframeEl.getAttribute('allow').includes('camera')

const isCameraFeatureAllowed = isCameraPolicySet && hasCameraAttributeValue
```

`document` を使用して既存のコードを更新する代わりに、前の例のように `element` オブジェクトで `allowsFeature()` を呼び出すことをお勧めします。

## Reporting API

[Reporting API](https://web.dev/reporting-api/) は Web アプリケーションのレポートメカニズムを一貫した方法で提供します。権限ポリシーの違反に利用できる Reporting API は実験的機能として提供されています。

この実験的機能をテストするには、[ウォークスルー](https://web.dev/reporting-api/#use-devtools)に従い、`chrome://flags/#enable-experimental-web-platform-features` でフラグを有効にします。 このフラグが有効な場合、DevTools の［アプリケーション］タブで権限ポリシー違反を確認できます。

次の例は、Reporting API ヘッダーの構造を示しています。

```text
Reporting-Endpoints: main-endpoint="https://reports.example/main", default="https://reports.example/default"

Content-Security-Policy: script-src 'self'; object-src 'none'; report-to main-endpoint;
Document-Policy: document-write=?0; report-to=main-endpoint;
```

現在の実装では、上記の例のように「default」という名前のエンドポイントを構成することで、そのフレーム内で発生している違反からポリシー違反レポートを受け取ることができます。 サブフレームには独自のレポート構成が必要です。

{% Aside %} Reporting API に権限ポリシーのサポートがデフォルトで表示されるようになることを希望する方は、[ディスカッションにサポートまたはコメントを追加](https://github.com/w3c/webappsec-permissions-policy/issues/386)してください。 {% endAside %}

## 詳細について

権限ポリシーをより深く理解するには、次のリソースを参照してください。

- [権限ポリシーの仕様](https://www.w3.org/TR/permissions-policy-1/)
- [権限ポリシーの Explainer](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md)
- [ポリシーで制御される機能](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md)のリスト。

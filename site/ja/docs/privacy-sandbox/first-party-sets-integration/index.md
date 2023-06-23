---
layout: layouts/blog-post.njk
title: 'First-Party Sets: 開発者ガイド'
date: '2023-01-12'
updated: '2023-05-10'
thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/SV7SXAQRcVnBZEgjgxYc.png
alt: A diagram showing an embedded site calling requestStorageAccess.
tags:
  - privacy
authors:
  - mihajlija
  - jney
  - sarino
---

[First-Party Sets（FPS）](docs/privacy-sandbox/first-party-sets/)は、ブラウザがドメインのコレクション間の関係を理解するのに役立つウェブプラットフォーム メカニズムです。これにより、ブラウザは特定のサイト機能（クロスサイト Cookie へのアクセスを許可するかどうかなど）を有効にし、その情報をユーザーに表示するための重要な決定を行うことができます。

Chrome はサード パーティ Cookie を廃止するにおいて、ユーザーのプライバシーを向上させながら、ウェブ上の主要なユースケースを維持することを目標としています。たとえば、多くのサイトは、一貫したユーザー エクスペリエンスを提供するために複数のドメインを使用している場合があります。組織によっては、国固有のドメインやサービス ドメインを使って画像や動画をホストするなど、複数のユースケースに応じて異なるトップレベル ドメインを維持したいと考えているかもしれません。FPS を使用すれば、サイトは特定の制御を使用してドメイン間でデータを共有できます。

## First-Party Set とは

At a high level, a First-Party Set is a collection of domains, for which there is a single "set primary" and potentially multiple "set members".

In the example below, `primary` lists the primary domain, and `associatedSites` lists domains that meet the requirements of the [associated subset](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements).

```js
{
  "primary": "https://primary.com",
  "associatedSites": ["https://associate1.com", "https://associate2.com", "https://associate3.com"]
}
```

正規の FPS リストは、[FPS GitHub リポジトリ](https://github.com/googlechrome/first-party-sets)にホストされた JSON ファイル形式で公開され、すべてのセットの信頼できる情報源として機能します。Chrome はこのファイルを使用して、その動作に適用します。

ドメインのセットを作成できるのは、そのドメインに対する管理権限を持つユーザーのみです。提出者は「セット メンバー」と「セット プライマリ」の関係を宣言する必要があります。セット メンバーには様々なドメインタイプを含めることができ、[ユースケースに基づくサブセット](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements)の一部である必要があります。

アプリケーションが同じ First-Party Set 内のサイト間でクロスサイト Cookie（サード パーティ Cookie）へのアクセスを使用している場合、[Storage Access API（SAA）](https://privacycg.github.io/storage-access/)と [requestStorageAccessFor API](https://privacycg.github.io/requestStorageAccessFor/) を使用して、それらの Cookie へのアクセスをリクエストできます。各サイトが属するサブセットに応じて、ブラウザはリクエストを異なる方法で処理する場合があります。

セットを提出するためのプロセスと要件の詳細については、[提出ガイドライン](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md)をご覧ください。提出されたセットは、提出内容を検証するためのさまざまな技術的チェックにかけられます。

## FPS のユースケース

First-Party Sets は、組織がさまざまなトップレベル サイト間で共有 ID の形式を必要とする場合に適しています。

FPS には、以下のようなユースケースが挙げられます。

- **国のカスタマイズ**。共有インフラストラクチャに依存しながら、ローカライズされたサイトを活用する（example.co.uk は、example.ca がホストするサービスに依存する場合があります）。
- **サービスドメインの統合**。ユーザーが直接対話することはないが、同じ組織のサイト（example-cdn.com）全体でサービスを提供するサービスドメインを活用します。
- **ユーザーコンテンツの分離**。セキュリティ上の理由からユーザーがアップロードしたコンテンツを他のサイトのコンテンツから分離するさまざまなドメイン上のデータにアクセスする一方で、サンドボックス化されたドメインが認証（およびその他の）Cookie にアクセスできるようにします。ユーザーがアップロードした非アクティブなコンテンツを提供している場合は、[こちら](https://security.googleblog.com/2023/04/securely-hosting-user-data-in-modern.html)のベスト プラクティスに従って同じドメインで安全にホストできる場合もあります。
- **埋め込みの認証済みコンテンツ**。関連プロパティ（最上位サイトにサインインしたユーザーに限定された動画、ドキュメント、またはリソース）からの埋め込みコンテンツをサポートします。
- **サインイン**。関連プロパティ間でのサインインをサポートします。ただし、一部のユースケースでは、[FedCM API](/docs/privacy-sandbox/fedcm/) も適している場合があります。
- **分析**。サービスの質を向上させるために、関連プロパティ全体でユーザージャーニーの分析と測定を展開します。

## FPS integration details

### Storage Access API

[Storage Access API（SAA）](https://privacycg.github.io/storage-access/) を使うと、埋め込みのクロスオリジン コンテンツから、通常はファースト パーティ コンテキストでしかアクセスできないストレージへのアクセスが可能になります。

埋め込みリソースは、SAA メソッドを使用して、現在ストレージにアクセスできるかどうかを確認し、ユーザーエージェントからのアクセスを要求できます。

サード パーティ Cookie がブロックされていても、First-Party Set が許可されている場合、Chrome はセット内のサイトに対してそのアクセス許可を自動的に付与し、セット外のサイトに対して拒否します。

{% Aside %} SAA は複数のブラウザで提供されていますが、ストレージ アクセスの処理ルールには[ブラウザ実装ごとに違い](https://developer.mozilla.org/docs/Web/API/Storage_Access_API#safari_implementation_differences)があります。 {% endAside %}

### ストレージアクセスのチェックとリクエスト

現在ストレージ埋め込みサイトにアクセスできるかどうかの確認には、[`Document.hasStorageAccess()`](https://developer.mozilla.org/docs/Web/API/Document/requestStorageAccess) メソッドを使用できます。

The method returns a promise that resolves with a boolean value indicating whether the document already has access to its cookies or not. The promise also returns true if the iframe is same-origin as the top frame.

{% BrowserCompat 'api.Document.hasStorageAccess' %}

埋め込みサイトがクロスサイト コンテキストで Cookie へのアクセスをリクエストするには、[`Document.requestStorageAccess()`](https://developer.mozilla.org/docs/Web/API/Document/requestStorageAccess) (rSA) を使用できます。

このメソッドには、呼び出されたときに解決する[ユーザー ジェスチャ](https://html.spec.whatwg.org/multipage/interaction.html#user-activation-processing-model)が必要です。そうでない場合は、例外がスローされます。ストレージへのアクセスが許可された場合は解決し、アクセスが拒否された場合は拒否する Promise を返します。

{% BrowserCompat 'api.Document.requestStorageAccess' %}

### requestStorageAccessFor in Chrome

SAA では、埋め込みサイトによるストレージへのアクセスリクエストは、ユーザー操作を受け取った `<iframe>` 要素内からのみ許可されています。

This poses challenges in adopting SAA for top-level sites that use cross-site images or script tags requiring cookies.

これに対処するために、Chrome はトップレベル サイトが [`Document.requestStorageAccessFor()`](https://privacycg.github.io/requestStorageAccessFor/)（rSAFor）を使用して特定のオリジンに代わってストレージ アクセスをリクエストする方法を実装しました。

```js
 document.requestStorageAccessFor('https://target.site')
```

### ストレージアクセス権限のチェック

カメラや地理位置情報などの一部のブラウザ機能へのアクセスは、ユーザーが付与した権限に基づいています。Permissions API は、API へのアクセスの権限ステータス（許可されたか拒否されたか、またはプロンプトのクリックやページの操作などの何らかの形式のユーザー操作が必要かどうか）を確認する方法を提供します。

権限ステータスのクエリには、`navigator.permissions.query()` を使用できます。

現在のコンテキストのストレージ アクセス権限をチェックするには、`'storage-access'` 文字列を渡す必要があります。

```js
navigator.permissions.query({name: 'storage-access'})
```

指定したオリジンのストレージ アクセス許可を確認するには、`'top-level-storage-access'` 文字列を渡す必要があります。

```js
navigator.permissions.query({name: 'top-level-storage-access', requestedOrigin: 'https://target.site'})
```

埋め込まれたオリジンの整合性を保護するために、`document.requestStorageAccessFor` を使用してトップレベルドキュメントによって付与された権限のみがチェックされることに注意してください。

権限を自動的に付与できるか、ユーザーのジェスチャが必要かに応じて、`prompt` または `granted` が返されます。

### フレーム単位モデル

rSA 許可は[フレーム](https://www.w3.org/TR/html401/present/frames.html)ごとに適用されます。rSA および rSAFor の許可は、個別の権限として扱われます。

新しいフレームはそれぞれ個別にストレージアクセスをリクエストする必要があり、自動的にアクセスが許可されます。最初のリクエストのみがユーザージェスチャを必要とし、ナビゲーションやサブリソースなど、iframe によって開始される後続のリクエストは、最初のリクエストによってブラウジングセッションに対して許可されるため、ユーザー ジェスチャを待つ必要はありません。

iframe を更新、再読み込み、または再作成すると、再度アクセスをリクエストする必要があります。

### Cookie の要件

rSAは、[クロスサイト コンテキストでの使用がすでにマークされている Cookie へのアクセスのみを提供](https://privacycg.github.io/storage-access/#cookies)するため、Cookie では `SameSite=None` と `Secure` 属性の両方を指定する必要があります。

`SameSite=Lax` または `SameSite=Strict` 属性のある Cookie、または `SameSite` 属性のない Cookie はファースト パーティでしか使用されず、rSA に関係なくクロスサイトのコンテキストで**共有されることはありません**。

### セキュリティ

rSAFor の場合、サブリソースリクエストには [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS) ヘッダーまたはリソースの `crossorigin` 属性が必要で、明示的なオプトインが保証されます。

## Implementation examples

### Requesting access to storage from an embedded cross-origin iframe

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/SV7SXAQRcVnBZEgjgxYc.png", alt="", width="800", height="402" %}

#### Check if you have storage access

すでにストレージにアクセスできるかどうかを確認するには、`document.hasStorageAccess()` を使用します。

If the promise resolves true, you can access storage in the cross-site context. If it resolves false, you need to request storage access.

```js
document.hasStorageAccess().then((hasAccess) => {
    if (hasAccess) {
      // You can access storage in this context
    } else {
      // You have to request storage access
    }
});
```

#### Request storage access

ストレージ アクセスをリクエストする必要がある場合は、まずストレージ アクセス権限 `navigator.permissions.query({name: 'storage-access'})` をチェックして、ユーザー ジェスチャが必要か、自動的に付与されるかを確認します。

権限が `granted` である場合は、`document.requestStorageAccess()` を呼び出すことができ、ユーザーのジェスチャなしでアクセスできます。

権限ステータスが `prompt` の場合は、ボタンのクリックなどのユーザー ジェスチャの後に `document.requestStorageAccess()` 呼び出しを開始する必要があります。

{% Aside %} 権限が付与される前、またはユーザー ジェスチャが登録される前に `requestStorageAccess()`を呼び出そうとすると、*"requestStorageAccess: Must be handling a user gesture to use"* というエラーがスローされます。{% endAside %}

例:

```js
navigator.permissions.query({name: 'storage-access'}).then(res => {
  if (res.state === 'granted') {
    // Permission has already been granted
    // You can request storage access without any user gesture
    rSA();
  } else if (res.state === 'prompt') {
    // Requesting storage access requires user gesture
    // For example, clicking a button
    const btn = document.createElement("button");
    btn.textContent = "Grant access";
    btn.addEventListener('click', () => {
      // Request storage access
      rSA();
    });
    document.body.appendChild(btn);
  }
});

function rSA() {
  if ('requestStorageAccess' in document) {
    document.requestStorageAccess().then(
      (res) => {
        // Use storage access
      },
      (err) => {
        // Handle errors
      }
    );
  }
}
```

フレーム、ナビゲーション、またはサブリソース内からの後続のリクエストには、クロスサイト Cookie への権限が自動的に与えられます。`hasStorageAccess()` は true を返し、追加の JavaScript 呼び出しを行わずに、同じ First-Party Set からのクロスサイト Cookie がそれらのリクエストに送信されます。

### クロスオリジン サイトに代わって Cookie アクセスをリクエストするトップレベル サイト

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jRgDgWl7yb1cEcwpcdMo.png", alt="", width="800", height="408" %}

トップレベル サイトは `requestStorageAccessFor()` を使用して、特定のオリジンに代わってストレージ アクセスをリクエストできます。

`hasStorageAccess()` は、それを呼び出しているサイトにストレージ アクセスがあるかどうかのみをチェックするため、トップレベル サイトは別のオリジンの権限をチェックできます。

ユーザーにプロンプ​​トが表示されるかどうか、または指定されたオリジンにストレージ アクセスがすでに許可されているかどうかを確認するには、`navigator.permissions.query({name: 'top-level-storage-access', requestedOrigin: 'https://target.site'})` を呼び出します。

権限が `granted` である場合は、`document.requestStorageAccessFor('https://target.site')` を呼び出すことができます。ユーザーのジェスチャなしでアクセスできます。

権限が `prompt` である場合は、ボタンのクリックなどのユーザー ジェスチャの背後で `document.requestStorageAccessFor('https://target.site')` 呼び出しを行う必要があります。

例:

```js
navigator.permissions.query({name:'top-level-storage-access',requestedOrigin: 'https://target.site'}).then(res => {
  if (res.state === 'granted') {
    // Permission has already been granted
    // You can request storage access without any user gesture
    rSAFor();
  } else if (res.state === 'prompt') {
    // Requesting storage access requires user gesture
    // For example, clicking a button
    const btn = document.createElement("button");
    btn.textContent = "Grant access";
    btn.addEventListener('click', () => {
      // Request storage access
      rSAFor();
    });
    document.body.appendChild(btn);
  }
});

function rSAFor() {
  if ('requestStorageAccessFor' in document) {
    document.requestStorageAccessFor().then(
      (res) => {
        // Use storage access
      },
      (err) => {
        // Handle errors
      }
    );
  }
}
```

`requestStorageAccessFor()` 呼び出しが成功した後、クロスサイト リクエストに CORS または crossorigin 属性が含まれていれば、そのリクエストには Cookie が含まれるため、サイトでは、リクエストをトリガーする前に待機することが必要な場合があります。

リクエストは `credentials: 'include'` オプションを使用し、リソースには `crossorigin="use-credentials"` 属性が含まれている必要があります。

```js
function checkCookie() {
    fetch('https://first-party-sets.glitch.me/getcookies.json', {
        method: 'GET',
        credentials: 'include'
      })
      .then((response) => response.json())
      .then((json) => {
      // Do something
      });
  }
```

## How to test locally

### Prerequisites

FPS をローカルでテストするには、Chrome 113 以降をコマンドラインで起動して使用します。

To preview upcoming Chrome features before they're released, download the Beta or Canary version of Chrome.

### Example

{% Aside %} To see a FPS demo in action, visit [https://first-party-sets.glitch.me/](https://first-party-sets.glitch.me/). {% endAside %}

FPS をローカルで有効にするには、このセクションで説明されているカンマ区切りのフラグリストで Chrome の `--enable-features` オプションを使用する必要があります。

Learn more about how to [run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/).

```js
--enable-features="FirstPartySets,StorageAccessAPI,StorageAccessAPIForOriginExtension,PageInfoCookiesSubpage,PrivacySandboxFirstPartySetsUI" \
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}" \
https://first-party-sets.glitch.me/
```

- `FirstPartySets` は、Chrome の FPS を有効にします。` StorageAccessAPI` は Storage Access API を有効にします。
- `StorageAccessAPIForOriginExtension` は、トップレベルサイトが requestStorageAccessFor() を使用して、特定のオリジンに代わってストレージアクセスをリクエストできるようにします。
- `PageInfoCookiesSubpage` は、URL バーからアクセス可能な PageInfo セクションに FPS を表示できるようにします。
- `PrivacySandboxFirstPartySetsUI` は、Chrome 設定の［プライバシーとセキュリティ］→［Cookie およびその他のサイト データ］（chrome://settings/cookies）で、FPS UI の［関連サイトがグループ内のアクティビティを表示できるようにする］オプションを有効にします。

### Declare a set locally

セットをローカルで宣言するには、セットのメンバーである URL を含む JSON オブジェクトを作成し、それを `--use-first-party-set` に渡します。

```text
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}" \
https://first-party-sets.glitch.me/
```

### サード パーティ Cookie がブロックされていることを検証する

1. In Chrome settings, go to Privacy and Security → Cookies and other site data or chrome://settings/cookies.
2. Under General settings ensure that "Block third-party cookies" is enabled.
3. Check that the sub-option "Allow related sites to see your activity in the group" is also enabled.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/dPck21yLTAF5cU59DzdZ.png", alt="Screenshot of Chrome settings page", width="800", height="486" %}

### クロスサイト Cookie にアクセスできることを検証する

テスト対象のサイトから API（rSA または rSAFor）を呼び出し、クロスサイト Cookie へのアクセスを検証します。

## FPS の提出プロセス

ドメイン間の関係を宣言し、ドメインが属するサブセットを指定するには、次の手順に従います。

1. 関連するドメインを特定します。これには、FPS の一部となる**セットプライマリ**と**セットメンバー**が含まれます。また、各セットメンバーが属する**サブセットタイプ**を特定します。
2. [セット形成要件](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements)と[セット検証要件が](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-validation-requirements)整っていることを確認します。
3. FPS を正しい [JSON 形式](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-submissions)で宣言します。
4. Chrome が正規の FPS リストをホストする [`first_party_sets.JSON`](https://github.com/GoogleChrome/first-party-sets/blob/main/first_party_sets.JSON) への[プルリクエスト（PR）](https://github.com/GoogleChrome/first-party-sets/blob/main/first_party_sets.JSON)を作成して、First Party Set を提出します。（PR の作成には GitHub アカウントが必要です。また、リストに貢献するには、[Contributor's License Agreement（CLA）](https://cla.developers.google.com/about)に署名する必要があります。）

PR が作成されると、一連のチェックが行われ、手順 2 の要件が満たされていることが検証されます。

{% Aside %} PR を作成する前に、[送信内容をローカルでテスト](https://github.com/GoogleChrome/first-party-sets/blob/main/Getting-Started.md#testing-your-submission-locally)して、チェックに合格するかどうかを確認できます。{% endAside %}

成功した場合、PR がチェックに合格したことが示されます。承認された PR は、週に 1 回（火曜日の午後 12 時（米国東部標準時））に手動で一括して正規の FPS リストにマージされます。

いずれかのチェックが失敗した場合は、GitHub 上の PR 失敗を通じて提出者に通知されます。提出者はエラーを修正して PR を更新できますが、次の点に留意してください。

- PR が失敗すると、提出が失敗した理由に関する追加情報がエラー メッセージに表示されます（[例](https://github.com/GoogleChrome/first-party-sets/pull/26)）。
- セットの送信を管理するすべての技術的チェックは GitHub で実施されるため、技術的チェックに起因するすべての送信の失敗は GitHub で表示できます。

## Enterprise policies

To meet the needs of enterprise users Chrome has a couple of enterprise policies in place:

- First-Party Sets と統合できない可能性があるシステムは、[`FirstPartySetsEnabled` ポリシー](https://chromeenterprise.google/policies/#FirstPartySetsEnabled)を使用して Chrome のすべてのエンタープライズ インスタンスで First-Party Sets 機能を無効にすることができます。
- 一部のエンタープライズ システムには、First-Party Set 内のドメインとは異なる登録可能なドメインを持つ内部限定サイト（イントラネットなど）があります。これらのサイトを（ドメインが機密である可能性があるため）公開せずに First-Party Set の一部として扱う必要がある場合は、[`FirstPartySetsOverrides` ポリシー](https://chromeenterprise.google/policies/#FirstPartySetsOverrides)を使用してパブリックの First-Party Set を拡張または上書きできます。

## Share feedback

GitHub へのセットの提出や Storage Access API と `requestStorageAccessFor` API の使用を通じ、プロセスに関する経験や遭遇したイシューを共有することができます。

First Party Sets に関するディスカッションには、以下の方法で参加できます。

- First-Party Sets の[公開メーリングリスト](https://groups.google.com/u/2/a/chromium.org/g/first-party-sets-discuss)に参加します。
- [First-Party Sets の GitHub リポジトリ](https://github.com/WICG/first-party-sets)にイシューを定義し、ディスカッションをフォローします。

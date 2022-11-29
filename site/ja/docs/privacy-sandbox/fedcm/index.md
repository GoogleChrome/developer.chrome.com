---
layout: layouts/doc-post.njk
title: Federated Credential Management API
subhead: |2-

  プライバシーを保護する ID 連携のためのウェブ API。
description: |2-

  ユーザーがブラウザのプライバシーの向上と互換性のある方法で、アカウント連携を使ってウェブサイトにログインできるようにするウェブプラットフォーム API。
date: '2022-04-25'
updated: '2022-11-08'
authors:
  - agektmr
---

## 実装ステータス

このドキュメントでは、ID 連携の新しい提案である Federated Credential Management API（FedCM）の概要を説明します。

- [FedCM の提案](https://github.com/fedidcg/FedCM)は[公開ディスカッション](https://github.com/fedidcg/FedCM/issues)を進行中です。
- FedCM is shipped in Chrome 108.
- FedCM は他のブラウザではまだサポートされていませんが、Mozilla は Firefox に[プロトタイプを実装](https://bugzilla.mozilla.org/show_bug.cgi?id=1782066)しています 。[Apple は、FedCM の提案に協力することに全般的な支持と関心を表明](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)しています。
- [Chrome プラットフォームのステータス](https://chromestatus.com/feature/6438627087220736)

Moving forward, we plan to introduce [a number of new features](#roadmap) based on the feedback we received from identity providers (IdP), relying parties (RP) and browser vendors. While we hope identity providers will adopt FedCM, please be aware that FedCM is still an API under active development and that backward incompatible changes are expected until Q4 2023.

下位互換性のない変更をデプロイする際の課題を最小限に抑えるために、現在、ID プロバイダーに対し 2 つの推奨事項があります。

- Subscribe to our [newsletter](https://groups.google.com/g/fedcm-developer-newsletter) where we will send updates as the API evolves.
- We encourage IdPs to distribute the FedCM API via JavaScript SDKs while the API is maturing, and to discourage RPs from self-hosting SDKs. This will ensure IdPs can make changes as the API evolves, without having to ask all of their relying parties to redeploy.

## FedCM が必要な理由

過去 10 年間、ID 連携は、サイトごとのユーザー名とパスワードを使用した方法に比べ、信頼性、使いやすさ（パスワードレスのシングルサインインなど）、およびセキュリティ（フィッシングやクレデンシャルスタッフィング攻撃への耐性の向上など）の観点から、ウェブでの認証の基準を引き上げる上で中心的な役割を果たしてきました。

With identity federation, an RP (relying party) relies on an IdP (identity provider) to provide the user an account without requiring a new username and password.

{% Aside 'key-term' %}

*Identity federation* delegates authentication or authorization of an individual (user or entity) to a trusted external party (an *identity provider* or IdP). The identity provider then allows the individual to sign in to a website (a *relying party* or RP).

{% endAside %}

残念ながら、ID 連携が依存してきた仕組み（iframe、リダイレクト、および Cookie）は、ウェブ全体でユーザーを追跡する方法として活発に悪用されています。ユーザーエージェントは ID 連携と追跡を区別できないため、さまざまな種類の悪用を軽減する取り組みが ID 連携の展開をより困難にしています。

[Federated Credential Management API（FedCM）](https://fedidcg.github.io/FedCM/)は、ユーザーが IdP からアカウントを選択してウェブサイトにログインできるようにするブラウザ経由のダイアログを公開することで、ウェブ上の ID 連携フローのユースケース固有の抽象化を提供します。

FedCM は、ウェブ上の ID を改善するための複数のステップからなるプロセスであり、その最初のステップでは、ID 連携に対するサードパーティ Cookie の段階的廃止の影響を軽減することに重点を置いています（この先のいくつかのステップについては、[ロードマップのセクション](#roadmap)をご覧ください）。

<figure class="screenshot">{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/2ZZ58TQMavJfj047XM5I.mov", autoplay="true", loop="true" %} <figcaption>ユーザーは FedCM を使用して RP にサインインします</figcaption></figure>

### 期待される影響

{% Aside 'caution' %}

[プライバシーサンドボックスイニシアチブ](https://privacysandbox.com/)の目的は、Chrome でのすべての追跡ベクトルを軽減することです。最初のステップでは、サードパーティ Cookie の段階的廃止の影響の緩和を行います。この段階的廃止は、他のブラウザですでに行われており、[Chrome では 2024 年に予定](https://blog.google/products/chrome/update-testing-privacy-sandbox-web/)されています。これらの Cookie を削除すれば、サードパーティの追跡を減らすことができますが、他のクロスサイトのユースケースにも影響が及びます。

{% endAside %}

[コミュニティの取り組み](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)と私たちの調査を通じて、サードパーティ Cookie の段階的廃止の影響を受ける ID 連携関連の統合がいくつかあることがわかりました。

- [OpenID Connect フロントチャンネルのログアウト](https://openid.net/specs/openid-connect-frontchannel-1_0.html)
- [OpenID Connect セッション管理](https://openid.net/specs/openid-connect-session-1_0.html)
- [iframe ベースのバックグラウンドトークンの更新](https://github.com/fedidcg/use-case-library/issues/10)
- [iframe ベースのログインウィジェット](https://github.com/fedidcg/use-case-library/issues/12)

FedCM の最初の目標は、サードパーティ Cookie の段階的廃止が ID 連携に与える影響を減らすことです。上記は、影響を受けると予想される領域のリストです。その他のユースケースでリストに含まれていないものがある場合は、[貢献とフィードバックの共有](#share-feedback)をお勧めします。

## FedCM の推奨使用対象者 {: #who-uses-fedcm }

以下の**すべて**の条件に該当する場合にのみ、FedCM が役立つと考えています。

1. ID プロバイダー（IdP）である
2. サードパーティ Cookie の段階的廃止の影響を受ける
3. RP がサードパーティである。 使用している RP が [SameParty](/blog/first-party-sets-sameparty/) である場合、[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) での配信が適している可能性があります。

### IdP である場合 {: #idp }

FedCM requires support from an identity provider. A relying party cannot use FedCM independently. If you are an RP, you can ask your IdP to provide instructions.

### サードパーティ Cookie の段階的廃止の影響を受ける場合 {: #unaffected-by-3p-cookies }

<figure class="float-right"> {%    Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/GMv2zAgNt8dG62JnoSEC.png", alt="Chrome でサードパーティ Cookie をブロックする構成を行い、サードパーティ Cookie の段階的廃止をシミュレーションします", width="800", height="908" %}    <figcaption>Chrome でサードパーティ Cookie をブロックする構成を行い、サードパーティ Cookie の段階的廃止をシミュレーションします</figcaption> </figure>

You should only use FedCM if your current integration is affected by the third-party cookie phase out.

Chrome のサードパーティ Cookie が段階的に廃止された後も ID 連携が引き続き機能するかどうかわからない場合は、[シークレットモード](https://support.google.com/chrome/answer/95464)でウェブサイトでの統合への影響をテストすることができます。 または、デスクトップの場合は `chrome://settings/cookies` で、モバイルの場合は**設定** &gt; **サイト設定** &gt; **Cookie** に移動して、サードパーティ Cookie をブロックすることができます。

サードパーティ Cookie を使用しなくても ID 連携への影響が検出されない場合は、FedCM を使用せずに、現在の統合を引き続き使用できます。

確認すべき内容がわからない場合は、段階的廃止による影響が期待される[既知の機能](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)について詳しくお読みください。

### RP がサードパーティである場合

RP が IdP と[同じパーティ](/blog/first-party-sets-sameparty/#first-party-sets-policy)内にある ID プロバイダーの場合は、[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) の方が適していると考えられます。First-Party Sets を使用すると、同じエンティティが所有して運用する関連ドメイン名が、同じファーストパーティに属していると宣言できます。これにより、サードパーティ Cookie が段階的に廃止された後でも、同じパーティのサードパーティ Cookie が機能します。

First-Party Sets は常に使用できるわけではありませんが、RP が [SameParty](/blog/first-party-sets-sameparty/#first-party-sets-policy) の場合は、First-Party Sets の使用を検討してください。

## ユーザーと FedCM の対話 {: #use-cases}

Currently, FedCM's primary focus is to mitigate the impact of third-party cookie phase-out. Users can enable or disable FedCM in [Chrome's user settings](#user-settings).

FedCM はプロトコルに依存しないように設計されており、次の認証関連機能を提供します。

- [リライングパーティへのサインインに、ID プロバイダーを使用する](#sign-in)

仕組みについては、[デモを確認](https://fedcm-rp-demo.glitch.me)してください。

### リライングパーティにサインインする {: #sign-in}

<figure class="float-right screenshot">{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4", width="280", autoplay="true", loop="true" %} <figcaption>ユーザーは FedCM を使用して RP にサインインします</figcaption></figure>

ユーザーがリライングパーティ（RP）のウェブサイトにアクセスすると、ユーザーが IdP にサインインしている場合は FedCM サインインダイアログが表示されます。

ユーザーが IdP を使用する RP にアカウントを持っていない場合、サインアップ ダイアログが表示され、RP の利用規約やプライバシーポリシー（提供されている場合）などの追加の開示テキストが表示されます。

ユーザーは、リライングパーティのトークンを取り消すことができます（リライングパーティからの登録解除など）。 ユーザーが IdP にサインインしている場合、RP は FedCM を使用して、その IdP にユーザーのトークンを取り消すように要求できます。 同時に、FedCM は RP のサインイン状態をブラウザからクリアします。

{% Aside %}

If the user closes the UI manually, an entry would be added to the [settings UI](#user-settings) and the UI won't be displayed in the same website for a period of time. The UI will be reenabled after the period, but the duration will [be exponentially expanded](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown). Users can reenable FedCM on the RP manually by either going to the [settings page](#user-settings) or clicking on the PageInfo UI (a lock icon beside the URL bar) and reset the permission.

{% endAside %}

RP は、FedCM をサポートしていないブラウザで動作することが期待されています。ユーザーは、FedCM 以外の既存のサインイン プロセスを使用できる必要があります。[FedCM でのサインインの仕組み](#sign-into-rp)の詳細についてさらにご覧ください。

### FedCM を有効化または無効化する設定 {: #user-settings}

ユーザーは Android の Chrome の設定で FedCM を有効または無効にできます。**設定** &gt; **サイトの設定** &gt; **サードパーティのサインイン**に移動し、トグルを変更します。

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ThWp3UvxdbU6TzwxlC1j.jpg", alt="モバイルの Chrome 設定でサードパーティのサインインをトグルして、FedCM を有効にします", width="550", height="257", class="screenshot" %}

デスクトップの Chrome では、`chrome://settings/content/federatedIdentityApi` で同じ操作を行えます。

{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/8zR9MNWyt0c6M5GjWpfw.png", alt="デスクトップの Chrom 設定でサードパーティのサインインをトグルして、FedCM を有効にします", width="800", height="678", class="screenshot" %}

## Roadmap {: #roadmap}

We are working on landing a number of changes on the FedCM.

There are a few things we know that still need to be done, including issues we heard about from IdPs, RPs and browser vendors. We believe we know how to resolve these issues:

- **Cross-origin iframe support**: IdPs can call FedCM from within a cross-origin iframe.
- **パーソナライズされたボタン**: IdP は、IdP が所有するクロスオリジン iframe 内のサインインボタンに、再度アクセスしたユーザーの ID を表示できます。
- **Metrics endpoint**: Provides performance metrics to IdPs.

また、評価中またはプロトタイプ作成中の特定の提案を含め、活発に調査を進めている未解決の問題があります。

- **CORS**: FedCM フェッチの仕様を確実に改善するために、[Apple と Mozilla と話し合っています](https://github.com/fedidcg/FedCM/issues/320)。
- **Multiple-IdP API**: We are exploring ways to support [multiple IdPs](https://github.com/fedidcg/FedCM/issues/319) to coexist cooperatively in the FedCM account chooser.
- **IdP Sign-in Status API**: Mozilla has identified a [timing attack issue](https://github.com/fedidcg/FedCM/issues/230), and we are exploring ways for an IdP to proactively [notify the browser of the user's sign-in status](https://fedidcg.github.io/FedCM/#the-idp-sign-in-status-api) to mitigate the issue.
- **Sign in to IdP API**: To support [various scenarios](https://github.com/fedidcg/FedCM/issues/348), when a user is not signed in to the IdP, the browser provides a UI for the user to sign in without leaving the RP.

最後に、[Mozilla](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677)、[Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)、および [TAG のレビュー担当者](https://github.com/w3ctag/design-reviews/issues/718#issue-1165654549)からのフィードバックに基づき、まだ実行する必要があると思われることがいくつかあります。私たちは、これらの未解決の問題に対する最善の解決策を評価する取り組みを続けています。

- **ユーザーの理解と一致する意図の改善**: [Mozilla が指摘](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677)したように、さまざまな UX の定式化とサーフェスエリア、およびトリガー基準を引き続き調査したいと考えています。
- **Identity Attributes and Selective Disclosure**: As our [TAG Reviewers noted](https://github.com/w3ctag/design-reviews/issues/718#issuecomment-1171733526), we’d like to provide a mechanism to selectively share more or less identity attributes (such as emails, age brackets, phone numbers, and so on).
- **Raising the Privacy Properties**: As Mozilla suggested [here](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677), we’d like to continue exploring  mechanisms to offer better privacy guarantees, such as IdP blindness, directed identifiers.
- **WebAuthn との関係**: [Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)が提案したように、[パスキー](http://goo.gle/passkeys)の進歩を確認し、FedCM、パスワード、WebAuthn、および WebOTP の間で首尾一貫したまとまりのあるエクスペリエンスを提供することに取り組むことに非常にワクワクしています。
- **ログイン ステータス**: Apple がプライバシー CG の [Login Status API](https://github.com/privacycg/is-logged-in)で提案したように、ユーザーのログイン ステータスは、ブラウザが十分な情報に基づいて決定を下すのに役立つ有用な情報であるという直感を共有しており、そこからどのような機会が生まれるか楽しみにしています。
- **Enterprises and Education**: As is clear at the FedID CG, there are still [a lot of use cases](https://github.com/fedidcg/use-case-library/blob/main/decision_tree_flows/login/Federated%20Login%20OIDC%20Oauth2%20Auth%20Code%20Flow.png) that are not well served by FedCM that we’d like to work on, such as
     front-channel logout (the ability for an IdP to send a signal to RPs to logout) and support for SAML.
- **Relationship with mDLs/VCs/etc**: continue working to understand how these fit within FedCM, for example with the [Mobile Document Request API](https://github.com/WICG/mobile-document-request-api).

## FedCM の開発方法

FedCM を使用するには、Chrome の IdP と RP の両方で安全なコンテキスト（HTTPS または localhost）が必要です。

### トークンを取り消す  {: #revocation}

サーバーをローカルでセットアップして実行し、FedCM コードをデバッグします。[ポートフォワーディング付きの USB ケーブルを使用して接続された Android デバイスの Chrome で、このサーバーにアクセス](/docs/devtools/remote-debugging/local-server/)できます。

デスクトップで DevTools を使用して Android 上の Chrome をデバッグするには、「 [Android デバイスのリモートデバッグ](/docs/devtools/remote-debugging/)」の手順に従います。

## Use the FedCM API {: #use-api }

You integrate with FedCM by creating [a well-known file](#well-known-file), [config file and endpoints](#idp-config-file) for [accounts list](#accounts-list-endpoint), [assertion issuance](#id-assertion-endpoint) and optionally [client metadata](#client-metadata-endpoint).

そこから、FedCM は、RP が IdP で[サインイン](#sign-into-rp)するために使用できる JavaScript API を公開します。

### Create a well-known file {: #well-known-file }

[トラッカーによる API の悪用](https://github.com/fedidcg/FedCM/issues/230)を防ぐには、IdP の [eTLD+1](https://web.dev/same-site-same-origin/#same-site-cross-site) の `/.well-known/web-identity` から well-known ファイルを提供する必要があります。

For example, if the IdP endpoints are served under `https://accounts.idp.example/`, they must serve a well-known file at `https://idp.example/.well-known/web-identity` as well as [an IdP config file](#idp-config-file). Here's an example well-known file content:

```json
{
  "provider_urls": ["https://accounts.idp.example/config.json"]
}
```

The JSON file must contain the `provider_urls` property with an array of [IdP config file](#idp-config-file) URLs that can be [specified as a path part of `configURL` in `navigator.credentials.get` by RPs](#sign-into-rp). The number of URL strings in the array is limited to one, but this may change with [your feedback](#next-steps) in the future.

### Create an IdP config file and endpoints {: #idp-config-file }

The IdP config file provides a list of required endpoints for the browser. IdPs will host this config file and the required endpoints. All JSON response must be served with `application/json` content type.

The config file's URL is determined by the values provided to the [`navigator.credentials.get` call executed on an RP](#sign-into-rp).

```javascript
const credential = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: 'https://accounts.idp.example/config.json',
      clientId: '********',
      nonce: '******'
    }]
  }
});
const { token } = credential;
```

Specify a full URL of the IdP config file location as a `configURL`. When [`navigator.credentials.get()` is called](#sign-into-rp) on the RP, the browser fetches the config file with a `GET` request without the `Referer` header. The request doesn't have cookies and doesn't follow redirects. This effectively prevents the IdP from learning who made the request and which RP is attempting to connect. For example:

```http
GET /config.json HTTP/1.1
Host: accounts.idp.example
Accept: application/json
Sec-Fetch-Dest: webidentity
```

{% Aside 'caution' %}

FedCM 経由でブラウザから送信されるすべてのリクエストには、 [CSRF 攻撃](https://portswigger.net/web-security/csrf)を防ぐための `Sec-Fetch-Dest: webidentity` ヘッダーが含まれています。すべての IdP エンドポイントは、このヘッダーが含まれていることを確認する必要があります。

{% endAside %}

ブラウザは、次のプロパティを含む IdP からの JSON レスポンスを期待します。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>accounts_endpoint</code>（必須）</td>
    <td>
<a href="#accounts-list-endpoint">アカウントリストエンドポイント</a>の URL。</td>
  </tr>
  <tr>
     <td>
<code>client_metadata_endpoint</code>（オプション）</td>
     <td>
<a href="#client-metadata-endpoint">クライアントメタデータエンドポイント</a>の URL。</td>
  </tr>
  <tr>
     <td>
<code>id_assertion_endpoint</code>（必須）</td>
     <td>
<a href="#id-assertion-endpoint">ID アサーションエンドポイント</a>の URL。</td>
  </tr>
  <tr>
     <td>
<code>branding</code>（オプション）</td>
     <td>さまざまなブランドオプションを含むオブジェクト。</td>
  </tr>
  <tr>
     <td>
<code>branding.background_color</code>（オプション）</td>
     <td>[Continue as...] ボタンのテキストの色を設定するブランディングオプション。関連する CSS 構文、つまり <a href="https://drafts.csswg.org/css-color-4/#typedef-hex-color"><code>hex-color</code></a>、<a href="https://drafts.csswg.org/css-color-5/#funcdef-hsl"><code>hsl()</code></a>、<a href="https://drafts.csswg.org/css-color-5/#funcdef-rgb"><code>rgb()</code></a>、または <a href="https://drafts.csswg.org/css-color-4/#typedef-named-color"><code>named-color</code></a> を使用します。</td>
  </tr>
  <tr>
     <td>
<code>branding.color</code>（オプション）</td>
     <td>Branding option which sets the text color of the "Continue as..." button. Use the relevant CSS syntax, namely <a href="https://drafts.csswg.org/css-color-4/#typedef-hex-color"><code>hex-color</code></a>, <a href="https://drafts.csswg.org/css-color-5/#funcdef-hsl"><code>hsl()</code></a>, <a href="https://drafts.csswg.org/css-color-5/#funcdef-rgb"><code>rgb()</code></a>, or <a href="https://drafts.csswg.org/css-color-4/#typedef-named-color"><code>named-color</code></a>.</td>
  </tr>
  <tr>
     <td>
<code>branding.icons</code>（オプション）</td>
     <td>サインインダイアログに表示されるアイコンオブジェクトを設定するブランディングオプション。アイコンオブジェクトは、次の 2 つのパラメーターを持つ配列です。<ul> <li>
<code>url</code>（必須）: アイコン画像の URL。これは SVG 画像をサポートしていません。</li>
<li> </li>
<li> <code>size</code>（オプション）: アイコンの寸法。アプリケーションでは、正方形で単一の解像度であると想定されます。この数は 25 以上である必要があります。</li> </ul>
</td>
  </tr>
</table>

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/rFrfrCL0awt5zmyqvaM9.jpg", alt="How branding is applied to the FedCM dialog", width="600", height="332", class="screenshot" %}

IdP からのレスポンス本文の例を次に示します。

```json
{
  "accounts_endpoint": "/accounts.php",
  "client_metadata_endpoint": "/client_metadata.php",
  "id_assertion_endpoint": "/assertion.php",
  "branding": {
    "background_color": "green",
    "color": "0xFFEEAA",
    "icons": [{
      "url": "https://idp.example/icon.ico",
      "size": 25
    }]
  }
}
```

Once the browser fetches the config file, it sends subsequent requests to the IdP endpoints:

{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/3tkfSwwLSUnVrbesKX2K.png", alt="IdP endpoints", width="800", height="1085", class="type--full-bleed" %}

{% Aside 'caution' %}

If the RP deploys [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP) on the page FedCM is called and enforce `connect-src` directive, they must explicitly allow endpoints described in the config file.

{% endAside %}

#### アカウントリストエンドポイント {: #accounts-list-endpoint }

IdP のアカウントリストエンドポイントは、ユーザーが現在 IdP にサインインしているアカウントのリストを返します。 IdP が複数のアカウントをサポートしている場合、このエンドポイントはサインインしているすべてのアカウントを返します。

The browser sends a `GET` request with cookies, but without a `client_id` parameter or the `Referer` header. This effectively prevents the IdP from learning which RP the user is trying to sign in to. For example:

```http
GET /accounts.php HTTP/1.1
Host: accounts.idp.example
Accept: application/json
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
```

ブラウザは、次のプロパティを持つアカウント情報の配列を持つ `accounts` プロパティを含む JSON レスポンスを期待します。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>id</code>（必須）</td>
    <td>Unique ID of the user.</td>
  </tr>
  <tr>
    <td>
<code>name</code>（必須）</td>
    <td>ユーザーの名と姓。</td>
  </tr>
  <tr>
    <td>
<code>email</code>（必須）</td>
    <td>ユーザーのメールアドレス。</td>
  </tr>
  <tr>
    <td>
<code>given_name</code>（オプション）</td>
    <td>Given name of the user.</td>
  </tr>
  <tr>
    <td>
<code>picture</code>（オプション）</td>
    <td>URL of the user avatar image.</td>
  </tr>
  <tr>
    <td>
<code>approved_clients</code>（オプション）</td>
    <td>An array of RP client IDs which the user has registered with.</td>
  </tr>
</table>

Example response body:

```json
{
 "accounts": [{
   "id": "1234",
   "given_name": "John",
   "name": "John Doe",
   "email": "john_doe@idp.example",
   "picture": "https://idp.example/profile/123",
   "approved_clients": ["123", "456", "789"],
  }, {
   "id": "5678",
   "given_name": "Johnny",
   "name": "Johnny",
   "email": "johnny@idp.example",
   "picture": "https://idp.example/profile/456"
   "approved_clients": ["abc", "def", "ghi"],
  }]
}
```

If the user is not signed in, respond with HTTP 401 (Unauthorized).

The returned accounts list is consumed by the browser and will not be available to the RP.

#### クライアントメタデータエンドポイント {: #client-metadata-endpoint }

The IdP's client metadata endpoint returns the relying party's metadata such as the RP's privacy policy and terms of service. RPs should provide links to their privacy policy and terms of service to the IdP in advance. These links are displayed in the sign-in dialog when the user hasn't registered on the RP with the IdP yet.

ブラウザは、Cookie なしで `client_id` [`navigator.credentials.get`](#sign-into-rp) を使用して `GET` リクエストを送信します。次に例を示します。

```http
GET /client_metadata.php?client_id=1234 HTTP/1.1
Host: accounts.idp.example
Referer: https://rp.example/
Accept: application/json
Sec-Fetch-Dest: webidentity
```

クライアントメタデータエンドポイントのプロパティは次のとおりです。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>privacy_policy_url</code>（オプション）</td>
    <td>RP プライバシーポリシーの URL。</td>
  </tr>
  <tr>
     <td>
<code>terms_of_service_url</code>（オプション）</td>
     <td>RP terms of service URL.</td>
  </tr>
</table>

ブラウザは、エンドポイントからの JSON レスポンスを期待します。

```json
{
  "privacy_policy_url": "https://rp.example/privacy_policy.html",
  "terms_of_service_url": "https://rp.example/terms_of_service.html",
}
```

The returned client metadata is consumed by the browser and will not be available to the RP.

#### ID アサーションエンドポイント {: #id-assertion-endpoint }

IdP の ID アサーション エンドポイントは、サインインしているユーザーのアサーションを返します。ユーザーが [`navigator.credentials.get()` 呼び出し](#sign-into-rp)を使用して RP のウェブサイトにサインインすると、ブラウザは `application/x-www-form-urlencoded` の Cookie とコンテンツタイプ`application/x-www-form-urlencoded` を含む `POST` リクエストを、次の情報と共にこのエンドポイントに送信します。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>client_id</code>（必須）</td>
    <td>The RP's client identifier.</td>
  </tr>
  <tr>
     <td>
<code>account_id</code>（必須）</td>
     <td>The unique ID of the signing in user.</td>
  </tr>
  <tr>
     <td>
<code>nonce</code>（オプション）</td>
     <td>The request nonce, provided by the RP.</td>
  </tr>
  <tr>
     <td><code>disclosure_text_shown</code></td>
     <td>
<code>"true"</code> または <code>"false"</code> の（ブール値ではなく）文字列になります。開示テキストが表示されなかった場合、結果は <code>"false"</code> です。これは、RP のクライアント ID が、<a href="#accounts-list-endpoint">アカウントリストエンドポイント</a>からのレスポンスの <code>approved_clients</code> プロパティリストに含まれていた場合、またはブラウザが過去に <code>approved_clients</code> がないためにサインアップしたことを観察した場合に発生します。</td>
  </tr>
</table>

Example HTTP header:

```http
POST /assertion.php HTTP/1.1
Host: accounts.idp.example
Referer: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
account_id=123&client_id=client1234&nonce=Ct60bD&disclosure_text_shown=true
```

On the server, the IdP should confirm that:

1. 要求されたアカウント ID が、既にサインインしているアカウントの ID と一致していること。
2. `Referer` ヘッダーが、所定のクライアント ID に対して事前に登録された RP のオリジンと一致すること。

{% Aside 'warning' %}

OAuth または OpenID Connect でのドメイン検証はブラウザのリダイレクトに依存しているため、FedCM では、 `Referer` ヘッダー値が RP の登録済みオリジンと一致することを IdP サーバーがチェックすることが重要です。

{% endAside %}

ブラウザは、次のプロパティを含む JSON レスポンスを期待します。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>token</code>（必須）</td>
    <td>トークンは、認証に関する主張を含む文字列です。</td>
  </tr>
</table>

```json
{
  "token": "***********"
}
```

返されたトークンはブラウザによって RP に渡されるため、RP は認証を検証できます。

### Sign in to the relying party with the identity provider {: #sign-into-rp }

IdP の構成とエンドポイントが利用可能になると、RP は `navigator.credentials.get()`を呼び出して、ユーザーが IdP を使用して RP にサインインできるように要求できます。

<a name="feature-detection"></a>

API を呼び出す前に、[ユーザーのブラウザーで FedCM が利用可能であること] を確認する必要があります。FedCM が利用可能かどうかを確認するには、次のコードを FedCM 実装にラップします。

```javascript
if ('IdentityCredential' in window) {
  // If the feature is available, take action
}
```

ユーザーが RP から IdP にサインインできるように要求するには、たとえば次のようにします。

```javascript
const credential = await navigator.credentials.get({
  identity: {
    providers: [{
      configURL: 'https://accounts.idp.example/config.json',
      clientId: '********',
      nonce: '******'
    }]
  }
});
const { token } = credential;
```

`providers` プロパティは、次のプロパティを持つ [`IdentityProvider` オブジェクト](https://fedidcg.github.io/FedCM/#dictdef-identityprovider)の配列を受け取ります。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>configURL</code>（必須）</td>
    <td>A full path of the IdP config file.</td>
  </tr>
  <tr>
     <td>
<code>clientId</code>（必須）</td>
     <td>The RP's client identifier, issued by the IdP.</td>
  </tr>
  <tr>
    <td>
<code>nonce</code>（オプション）</td>
    <td>A random string to ensure the response is issued for this specific request. Prevents replay attacks.</td>
  </tr>
</table>

ブラウザは、[アカウントリストエンドポイント](#accounts-list-endpoint)からのレスポンス内の `approved_clients` の有無に応じて、サインアップとサインインのユース ケースを異なる方法で処理します。`clientId` が `approved_clients` から提供されていないか RP の `clientId` に含まれておらず、ユーザーがこのブラウザで過去に RP にサインアップしたことが場合、ブラウザはダイアログに [RP のプライバシーポリシーと利用規約](#client-metadata-endpoint)のみを表示します。

<figure class="float-right screenshot" style="max-width:300px">{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4", width="280", autoplay="true" %} <figcaption>ユーザーは FedCM を使用して RP にサインインします</figcaption></figure>

RP が `navigator.credentials.get()` を呼び出すと、その次のアクティビティが発生します。

1. ブラウザはリクエストを送信し、いくつかのドキュメントを取得します。
    1. [The well-known file](#well-known-file) and [an IdP config file](#idp-config-file) which declare endpoints.
    2. [アカウントリスト](#accounts-list-endpoint)。
    3. オプション: [クライアントメタデータエンドポイント](#client-metadata-endpoint)から取得した RP のプライバシーポリシーと利用規約の URL。
2. ブラウザには、ユーザーがサインインに使用できるアカウントのリストと、利用可能な場合は利用規約とプライバシーポリシーが表示されます。
3. ユーザーがサインインするアカウントを選択すると、[ID アサーションエンドポイント](#id-assertion-endpoint)へのリクエストが IdP に送信され、トークンが取得されます。
4. The RP can validate the token to authenticate the user.

{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/3tkfSwwLSUnVrbesKX2K.png", alt="login API call", width="800", height="1085", class="type--full-bleed" %}

{% Aside 'caution' %}

FedCM は、ユーザーが **Continue as** を明示的に確認してサインインするまで、ユーザーの IdP サインイン状態を RP に通知しないように設計されています。つまり、次の場合、RP には FedCM API への接続が通知されません。アカウントリストエンドポイントが空のリストを返すか、エンドポイントがエラーを返します。

RP は、FedCM をサポートしていないブラウザをサポートすることが期待されているため、ユーザーは FedCM 以外の既存のサインインプロセスを使用できる必要があります。サードパーティ Cookie が完全に廃止されるまで、これは問題にならないはずです。

{% endAside %}

トークンが RP サーバーによって検証されると、RP はユーザーを登録するか、サインインさせて新しいセッションを開始できるようにします。

## 貢献とフィードバック {: #share-feedback}

- **GitHub**: [提案](https://github.com/fedidcg/FedCM/blob/main/explainer.md)を読み、[イシューを投稿したり、ディスカッションを閲覧](https://github.com/fedidcg/FedCM/issues)したりできます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

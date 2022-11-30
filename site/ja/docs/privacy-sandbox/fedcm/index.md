---
layout: layouts/doc-post.njk
title: Federated Credential Management API
subhead: >
  プライバシーを保護する ID 連携のためのウェブ API。
description: >
  ユーザーがブラウザのプライバシーの向上と互換性のある方法で、アカウント連携を使ってウェブサイトにログインできるようにするウェブプラットフォーム API。
date: 2022-04-25
updated: 2022-11-08
authors:
  - agektmr
---

## 実装ステータス

このドキュメントでは、ID 連携の新しい提案である Federated Credential Management API（FedCM）の概要を説明します。

- [FedCM の提案](https://github.com/fedidcg/FedCM)は[公開ディスカッション](https://github.com/fedidcg/FedCM/issues)を進行中です。
- FedCM は Chrome 108 で出荷されます。
- FedCM は他のブラウザではまだサポートされていませんが、Mozilla は Firefox に[プロトタイプを実装](https://bugzilla.mozilla.org/show_bug.cgi?id=1782066)しています 。[Apple は、FedCM の提案に協力することに全般的な支持と関心を表明](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)しています。
- [Chrome プラットフォームのステータス](https://chromestatus.com/feature/6438627087220736)

今後は、ID プロバイダー（IdP）、リライングパーティー（RP）、およびブラウザベンダーから受け取ったフィードバックに基づいて、[多数の新機能](#roadmap)を導入する予定です。ID プロバイダーが FedCM を採用することを願っていますが、FedCM はまだ開発中の API であり、2023 年第 4 四半期まで下位互換性のない変更が予想されることに注意してください。

下位互換性のない変更をデプロイする際の課題を最小限に抑えるために、現在、ID プロバイダーに対し 2 つの推奨事項があります。

- API の進化に合わせて更新情報をお送りする[ニュースレター](https://groups.google.com/g/fedcm-developer-newsletter)を購読してください。
- API が成熟するまでは、IdP が JavaScript SDK を介して FedCM API を配布し、RP はセルフホスティング SDK を使用しないようにすることをお勧めします。これにより、IdP は API の進化に合わせて変更を加えることができ、すべてのリライングパーティーに再デプロイを依頼する必要がなくなります。

## FedCM が必要な理由

過去 10 年間、ID 連携は、サイトごとのユーザー名とパスワードを使用した方法に比べ、信頼性、使いやすさ（パスワードレスのシングルサインインなど）、およびセキュリティ（フィッシングやクレデンシャルスタッフィング攻撃への耐性の向上など）の観点から、ウェブでの認証の基準を引き上げる上で中心的な役割を果たしてきました。

ID 連携では、RP（リライングパーティー）は IdP（ID プロバイダー）に依存して、新しいユーザー名とパスワードを作成することなくユーザーにアカウントを提供することができます。

{% Aside 'key-term' %}

*ID 連携*では、個人（ユーザーまたはエンティティ）の認証または承認を、信頼できる外部のパーティ（*ID プロバイダー*または IdP）に委任します。ID プロバイダーはその上で、個人がウェブサイト（*リライングパーティー*または RP）にサインインできるようにしています。

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

FedCM には、ID プロバイダーのサポートが必要です。RP は、FedCM を単独で使用することはできません。RP の場合は、IdP に指示を仰ぎましょう。

### サードパーティ Cookie の段階的廃止の影響を受ける場合 {: #unaffected-by-3p-cookies }

<figure class="float-right"> {%    Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/GMv2zAgNt8dG62JnoSEC.png", alt="Chrome でサードパーティ Cookie をブロックする構成を行い、サードパーティ Cookie の段階的廃止をシミュレーションします", width="800", height="908" %}    <figcaption>Chrome でサードパーティ Cookie をブロックする構成を行い、サードパーティ Cookie の段階的廃止をシミュレーションします</figcaption> </figure>

現在の統合がサードパーティ Cookie の段階的廃止の影響を受ける場合にのみ、FedCM を使用してください。

Chrome のサードパーティ Cookie が段階的に廃止された後も ID 連携が引き続き機能するかどうかわからない場合は、[シークレットモード](https://support.google.com/chrome/answer/95464)でウェブサイトでの統合への影響をテストすることができます。 または、デスクトップの場合は `chrome://settings/cookies` で、モバイルの場合は**設定** &gt; **サイト設定** &gt; **Cookie** に移動して、サードパーティ Cookie をブロックすることができます。

サードパーティ Cookie を使用しなくても ID 連携への影響が検出されない場合は、FedCM を使用せずに、現在の統合を引き続き使用できます。

確認すべき内容がわからない場合は、段階的廃止による影響が期待される[既知の機能](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)について詳しくお読みください。

### RP がサードパーティである場合

RP が IdP と[同じパーティ](/blog/first-party-sets-sameparty/#first-party-sets-policy)内にある ID プロバイダーの場合は、[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) の方が適していると考えられます。First-Party Sets を使用すると、同じエンティティが所有して運用する関連ドメイン名が、同じファーストパーティに属していると宣言できます。これにより、サードパーティ Cookie が段階的に廃止された後でも、同じパーティのサードパーティ Cookie が機能します。

First-Party Sets は常に使用できるわけではありませんが、RP が [SameParty](/blog/first-party-sets-sameparty/#first-party-sets-policy) の場合は、First-Party Sets の使用を検討してください。

## ユーザーと FedCM の対話 {: #use-cases}

現在、FedCM の主な焦点は、サードパーティ Cookie の段階的廃止の影響を軽減することです。ユーザーは、 [Chrome のユーザー設定](#user-settings)で FedCM を有効または無効にできます。

FedCM はプロトコルに依存しないように設計されており、次の認証関連機能を提供します。

- [RP へのサインインに、ID プロバイダーを使用する](#sign-in)

仕組みについては、[デモを確認](https://fedcm-rp-demo.glitch.me)してください。

### RP にサインインする {: #sign-in}

<figure class="float-right screenshot">{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4", width="280", autoplay="true", loop="true" %} <figcaption>ユーザーは FedCM を使用して RP にサインインします</figcaption></figure>

ユーザーがリライングパーティー（RP）のウェブサイトにアクセスすると、ユーザーが IdP にサインインしている場合は FedCM サインインダイアログが表示されます。

ユーザーが IdP を使用する RP にアカウントを持っていない場合、サインアップ ダイアログが表示され、RP の利用規約やプライバシーポリシー（提供されている場合）などの追加の開示テキストが表示されます。

ユーザーは **Continue as...**（...として続行）をタップしてサインインを完了できます。成功した場合、ブラウザは、ユーザーが IdP を使用して RP でアカウント連携を作成したという事実を保存します。

{% Aside %}

ユーザーが手動で UI を閉じると、[設定 UI](#user-settings) にエントリが追加され、UI が同じウェブサイトに一定期間表示されなくなります。 UI は期間後に再度有効になりますが、[期間は指数的に拡大](https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown)されます。ユーザーは、[設定ページ](#user-settings)に移動するか、ページ情報 UI（URL バーの横にあるロック アイコン）をクリックして、RP で FedCM を手動で再度有効にし、権限をリセットできます。

{% endAside %}

RP は、FedCM をサポートしていないブラウザで動作することが期待されています。ユーザーは、FedCM 以外の既存のサインイン プロセスを使用できる必要があります。[FedCM でのサインインの仕組み](#sign-into-rp)の詳細についてさらにご覧ください。

### FedCM を有効化または無効化する設定 {: #user-settings}

ユーザーは Android の Chrome の設定で FedCM を有効または無効にできます。**設定** &gt; **サイトの設定** &gt; **サードパーティのサインイン**に移動し、トグルを変更します。

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ThWp3UvxdbU6TzwxlC1j.jpg", alt="モバイルの Chrome 設定でサードパーティのサインインをトグルして、FedCM を有効にします", width="550", height="257", class="screenshot" %}

デスクトップの Chrome では、`chrome://settings/content/federatedIdentityApi` で同じ操作を行えます。

{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/8zR9MNWyt0c6M5GjWpfw.png", alt="デスクトップの Chrom 設定でサードパーティのサインインをトグルして、FedCM を有効にします", width="800", height="678", class="screenshot" %}

## ロードマップ {: #roadmap}

FedCM に多くの変更を加える作業を進めています。

IdP、RP、ブラウザベンダーから寄せられた問題点など、まだ解決しなければならないことはいくつかありますが、これらの問題を解決できると信じています。

- **クロスオリジン iframe のサポート**: IdP は、クロスオリジン iframe 内から FedCM を呼び出すことができます。
- **パーソナライズされたボタン**: IdP は、IdP が所有するクロスオリジン iframe 内のサインインボタンに、再度アクセスしたユーザーの ID を表示できます。
- **Metrics エンドポイント**: IdP にパフォーマンス指標を提供します。

また、評価中またはプロトタイプ作成中の特定の提案を含め、活発に調査を進めている未解決の問題があります。

- **CORS**: FedCM フェッチの仕様を確実に改善するために、[Apple と Mozilla と話し合っています](https://github.com/fedidcg/FedCM/issues/320)。
- **Multiple-IdP API**: FedCM アカウントのチューザーで[複数の IdP](https://github.com/fedidcg/FedCM/issues/319) が協調して共存できるようにする方法を検討しています。
- **IdP Sign-in Status API**: Mozilla は[タイミング攻撃の問題](https://github.com/fedidcg/FedCM/issues/230)を特定しました。私たちは IdP が[ユーザーのサインイン ステータスをブラウザにプロアクティブに通知](https://fedidcg.github.io/FedCM/#the-idp-sign-in-status-api)することで問題を軽減していく方法を検討しています。
- **IdP へのサインイン API**: [さまざまなシナリオ](https://github.com/fedidcg/FedCM/issues/348)をサポートできるよう、ブラウザは、ユーザーが IdP にサインインしていない場合に、ユーザーが RP を離れずにサインインするための UI を提供します。

最後に、[Mozilla](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677)、[Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)、および [TAG のレビュー担当者](https://github.com/w3ctag/design-reviews/issues/718#issue-1165654549)からのフィードバックに基づき、まだ実行する必要があると思われることがいくつかあります。私たちは、これらの未解決の問題に対する最善の解決策を評価する取り組みを続けています。

- **ユーザーの理解と一致する意図の改善**: [Mozilla が指摘](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677)したように、さまざまな UX の定式化とサーフェスエリア、およびトリガー基準を引き続き調査したいと考えています。
- **個人属性と選択的開示**: [TAG レビュー担当者が指摘](https://github.com/w3ctag/design-reviews/issues/718#issuecomment-1171733526)したように、多かれ少なかれ個人属性（メール、年齢層、電話番号など）を選択的に共有するメカニズムを提供したいと考えています。
- **プライバシー プロパティの引き上げ**: Mozilla が[ここ](https://github.com/mozilla/standards-positions/issues/618#issuecomment-1221964677)で提案したように、IdP ブラインドネスや有向識別子など、より優れたプライバシー保証を提供するメカニズムを引き続き調査したいと考えています。
- **WebAuthn との関係**: [Apple](https://lists.webkit.org/pipermail/webkit-dev/2022-March/032162.html)が提案したように、[パスキー](http://goo.gle/passkeys)の進歩を確認し、FedCM、パスワード、WebAuthn、および WebOTP の間で首尾一貫したまとまりのあるエクスペリエンスを提供することに取り組むことに非常にワクワクしています。
- **ログイン ステータス**: Apple がプライバシー CG の [Login Status API](https://github.com/privacycg/is-logged-in)で提案したように、ユーザーのログイン ステータスは、ブラウザが十分な情報に基づいて決定を下すのに役立つ有用な情報であるという直感を共有しており、そこからどのような機会が生まれるか楽しみにしています。
- **エンタープライズと教育**: FedID CG で明らかなように、FedCM では十分に対応できない[多くのユースケース](https://github.com/fedidcg/use-case-library/blob/main/decision_tree_flows/login/Federated%20Login%20OIDC%20Oauth2%20Auth%20Code%20Flow.png)があり、私たちが取り組みたいと考えています。<br>フロントチャンネル ログアウト（IdP がシグナルを RP に送信してログアウトする機能）、SAML のサポートなどです。
- **mDL、VC 等との関係**: [Mobile Document Request API](https://github.com/WICG/mobile-document-request-api) など、FedCM 内でこれらがどのように適合するかを理解するために引き続き作業します。

## FedCM の開発方法

FedCM を使用するには、Chrome の IdP と RP の両方で安全なコンテキスト（HTTPS または localhost）が必要です。

### Android 上の Chrome でコードをデバッグする {: #remote-debug-android}

サーバーをローカルでセットアップして実行し、FedCM コードをデバッグします。[ポートフォワーディング付きの USB ケーブルを使用して接続された Android デバイスの Chrome で、このサーバーにアクセス](/docs/devtools/remote-debugging/local-server/)できます。

デスクトップで DevTools を使用して Android 上の Chrome をデバッグするには、「 [Android デバイスのリモートデバッグ](/docs/devtools/remote-debugging/)」の手順に従います。

## FedCM API を使用する {: #use-api }

[well-known ファイル](#client-metadata-endpoint)と[設定ファイル](#well-known-file)、そして[アカウントリスト](#idp-config-file)、[アサーション発行](#accounts-list-endpoint)、オプションで[クライアントメタデータ](#id-assertion-endpoint)のエンドポイントを作成することにより、FedCM と統合します。

そこから、FedCM は、RP が IdP で[サインイン](#sign-into-rp)するために使用できる JavaScript API を公開します。

### well-known ファイルを作成する {: #well-known-file }

[トラッカーによる API の悪用](https://github.com/fedidcg/FedCM/issues/230)を防ぐには、IdP の [eTLD+1](https://web.dev/same-site-same-origin/#same-site-cross-site) の `/.well-known/web-identity` から well-known ファイルを提供する必要があります。

たとえば、IdP エンドポイントが `https://accounts.idp.example/` で配信されている場合、`https://idp.example/.well-known/web-identity` の well-known ファイルと [IdP 設定ファイル](#idp-config-file)を配信する必要があります。以下は、well-known ファイルの例です。

```json
{
  "provider_urls": ["https://accounts.idp.example/config.json"]
}
```

JSON ファイルには、[RP によって `navigator.credentials.get` の `configURL` のパス部分として指定](#sign-into-rp)できる [IdP 設定ファイル](#idp-config-file)URL の配列を持つ `provider_urls` プロパティが含まれている必要があります。配列内の URL 文字列の数は 1 つに制限されていますが、これは今後の[皆さんからのフィードバック](#next-steps)によって変更される可能性があります。

### IdP 設定ファイルとエンドポイントを作成する {: #idp-config-file }

IdP 設定ファイルには、ブラウザに必要なエンドポイントのリストがあり、IdP は、この設定ファイルと必要なエンドポイントをホストします。すべての JSON レスポンスは、`application/json` コンテンツ タイプで提供する必要があります。

設定ファイルの URL は、[RP で実行される `navigator.credentials.get`呼び出し](#sign-into-rp)に提供される値によって決定されます。

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

IdP 設定ファイルの場所の完全な URL を `configURL` として指定します。[`navigator.credentials.get()` が RP で呼び出される](#sign-into-rp)と、ブラウザは `Referer` ヘッダーなしで `GET` リクエストを使用して設定ファイルをフェッチします。リクエストには Cookie がなく、リダイレクトに従いません。これにより、誰がリクエストを行い、どの RP が接続を試みているかを IdP が知ることを効果的に防ぎます。次に例を示します。

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
      <th>プロパティ</th>
      <th>説明</th>
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
     <td>[Continue as...] ボタンのテキストの色を設定するブランディング オプション。関連する CSS 構文、つまり<a href="https://drafts.csswg.org/css-color-4/#typedef-hex-color"><code>hex-color</code></a> 、 <a href="https://drafts.csswg.org/css-color-5/#funcdef-hsl"><code>hsl()</code></a> 、 <a href="https://drafts.csswg.org/css-color-5/#funcdef-rgb"><code>rgb()</code></a> 、または<a href="https://drafts.csswg.org/css-color-4/#typedef-named-color"><code>named-color</code></a>使用します。</td>
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

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/rFrfrCL0awt5zmyqvaM9.jpg", alt="FedCM ダイアログにブランディングを適用する方法", width="600", height="332", class="screenshot" %}

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

ブラウザが設定ファイルをフェッチしたら、後続のリクエストが IdP エンドポイントに送信されます。

{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/3tkfSwwLSUnVrbesKX2K.png", alt="IdP エンドポイント", width="800", height="1085", class="type--full-bleed" %}

{% Aside 'caution' %}

RP が[Content Security Policy（CSP）](https://developer.mozilla.org/docs/Web/HTTP/CSP)をページに展開し、FedCM が呼び出されて `connect-src` ディレクティブを強制する場合、設定ファイルに記述されているエンドポイントを明示的に許可する必要があります。

{% endAside %}

#### アカウントリストエンドポイント {: #accounts-list-endpoint }

IdP のアカウントリストエンドポイントは、ユーザーが現在 IdP にサインインしているアカウントのリストを返します。 IdP が複数のアカウントをサポートしている場合、このエンドポイントはサインインしているすべてのアカウントを返します。

ブラウザは、cookie を含む `GET` リクエストを送信しますが、`client_id`パラメーターまたは `Referer` ヘッダーは使用しません。これにより、ユーザーがサインインしようとしている RP を IdP が知ることを効果的に防止します。次に例を示します。

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
      <th>プロパティ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>id</code>（必須）</td>
    <td>ユーザーの一意の ID。</td>
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
    <td>ユーザーの名。</td>
  </tr>
  <tr>
    <td>
<code>picture</code>（オプション）</td>
    <td>ユーザーのアバター画像の URL。</td>
  </tr>
  <tr>
    <td>
<code>approved_clients</code>（オプション）</td>
    <td>ユーザーが登録した RP クライアント ID の配列。</td>
  </tr>
</table>

レスポンス本文の例:

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

ユーザーがサインインしていない場合は、HTTP 401 (Unauthorized) で応答します。

返されたアカウントリストはブラウザによって消費され、RP は使用できません。

#### クライアントメタデータエンドポイント {: #client-metadata-endpoint }

IdP のクライアントメタデータエンドポイントは、RP のプライバシーポリシーや利用規約などのリライングパーティーのメタデータを返します。RP は、事前に IdP にプライバシーポリシーと利用規約へのリンクを提供する必要があります。これらのリンクは、ユーザーがまだ IdP を使用して RP に登録していない場合に、サインイン ダイアログに表示されます。

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
      <th>プロパティ</th>
      <th>説明</th>
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
     <td>RP 利用規約の URL。</td>
  </tr>
</table>

ブラウザは、エンドポイントからの JSON レスポンスを期待します。

```json
{
  "privacy_policy_url": "https://rp.example/privacy_policy.html",
  "terms_of_service_url": "https://rp.example/terms_of_service.html",
}
```

返されたクライアントメタデータはブラウザによって消費され、RP は使用できません。

#### ID アサーションエンドポイント {: #id-assertion-endpoint }

IdP の ID アサーション エンドポイントは、サインインしているユーザーのアサーションを返します。ユーザーが [`navigator.credentials.get()` 呼び出し](#sign-into-rp)を使用して RP のウェブサイトにサインインすると、ブラウザは `application/x-www-form-urlencoded` の Cookie とコンテンツタイプ`application/x-www-form-urlencoded` を含む `POST` リクエストを、次の情報と共にこのエンドポイントに送信します。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>プロパティ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>client_id</code>（必須）</td>
    <td>RP のクライアント ID。</td>
  </tr>
  <tr>
     <td>
<code>account_id</code>（必須）</td>
     <td>サインインしているユーザーの一意の ID。</td>
  </tr>
  <tr>
     <td>
<code>nonce</code>（オプション）</td>
     <td>RP によって提供されるリクエスト nonce。</td>
  </tr>
  <tr>
     <td><code>disclosure_text_shown</code></td>
     <td>
<code>"true"</code> または <code>"false"</code> の（ブール値ではなく）文字列になります。開示テキストが表示されなかった場合、結果は <code>"false"</code> です。これは、RP のクライアント ID が、<a href="#accounts-list-endpoint">アカウントリストエンドポイント</a>からのレスポンスの <code>approved_clients</code> プロパティリストに含まれていた場合、またはブラウザが過去に <code>approved_clients</code> がないためにサインアップしたことを観察した場合に発生します。</td>
  </tr>
</table>

HTTP ヘッダーの例:

```http
POST /assertion.php HTTP/1.1
Host: accounts.idp.example
Referer: https://rp.example/
Content-Type: application/x-www-form-urlencoded
Cookie: 0x23223
Sec-Fetch-Dest: webidentity
account_id=123&client_id=client1234&nonce=Ct60bD&disclosure_text_shown=true
```

サーバー上で、IdP は次のことを確認する必要があります。

1. 要求されたアカウント ID が、既にサインインしているアカウントの ID と一致していること。
2. `Referer` ヘッダーが、所定のクライアント ID に対して事前に登録された RP のオリジンと一致すること。

{% Aside 'warning' %}

OAuth または OpenID Connect でのドメイン検証はブラウザのリダイレクトに依存しているため、FedCM では、 `Referer` ヘッダー値が RP の登録済みオリジンと一致することを IdP サーバーがチェックすることが重要です。

{% endAside %}

ブラウザは、次のプロパティを含む JSON レスポンスを期待します。

<table class="with-heading-tint with-borders">
  <thead>
    <tr>
      <th>プロパティ</th>
      <th>説明</th>
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

### ID プロバイダーを使って RP にサインインする {: #sign-into-rp }

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
      <th>プロパティ</th>
      <th>説明</th>
    </tr>
  </thead>
  <tr>
    <td>
<code>configURL</code>（必須）</td>
    <td>IdP 設定ファイルのフルパス。</td>
  </tr>
  <tr>
     <td>
<code>clientId</code>（必須）</td>
     <td>IdP によって発行された RP のクライアント識別子。</td>
  </tr>
  <tr>
    <td>
<code>nonce</code>（オプション）</td>
    <td>この特定のリクエストに対してレスポンスが発行されるようにするためのランダムな文字列。リプレイ攻撃を防ぎます。</td>
  </tr>
</table>

ブラウザは、[アカウントリストエンドポイント](#accounts-list-endpoint)からのレスポンス内の `approved_clients` の有無に応じて、サインアップとサインインのユース ケースを異なる方法で処理します。`clientId` が `approved_clients` から提供されていないか RP の `clientId` に含まれておらず、ユーザーがこのブラウザで過去に RP にサインアップしたことが場合、ブラウザはダイアログに [RP のプライバシーポリシーと利用規約](#client-metadata-endpoint)のみを表示します。

<figure class="float-right screenshot" style="max-width:300px">{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4", width="280", autoplay="true" %} <figcaption>ユーザーは FedCM を使用して RP にサインインします</figcaption></figure>

RP が `navigator.credentials.get()` を呼び出すと、その次のアクティビティが発生します。

1. ブラウザはリクエストを送信し、いくつかのドキュメントを取得します。
    1. エンドポイントを宣言する [well-known ファイル](#well-known-file)と [IdP 設定ファイル](#idp-config-file)。
    2. [アカウントリスト](#accounts-list-endpoint)。
    3. オプション: [クライアントメタデータエンドポイント](#client-metadata-endpoint)から取得した RP のプライバシーポリシーと利用規約の URL。
2. ブラウザには、ユーザーがサインインに使用できるアカウントのリストと、利用可能な場合は利用規約とプライバシーポリシーが表示されます。
3. ユーザーがサインインするアカウントを選択すると、[ID アサーションエンドポイント](#id-assertion-endpoint)へのリクエストが IdP に送信され、トークンが取得されます。
4. RP はトークンを検証してユーザーを認証できます。

{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/3tkfSwwLSUnVrbesKX2K.png", alt="ログイン API 呼び出し", width="800", height="1085", class="type--full-bleed" %}

{% Aside 'caution' %}

FedCM は、ユーザーが **Continue as** を明示的に確認してサインインするまで、ユーザーの IdP サインイン状態を RP に通知しないように設計されています。つまり、次の場合、RP には FedCM API への接続が通知されません。アカウントリストエンドポイントが空のリストを返すか、エンドポイントがエラーを返します。

RP は、FedCM をサポートしていないブラウザをサポートすることが期待されているため、ユーザーは FedCM 以外の既存のサインインプロセスを使用できる必要があります。サードパーティ Cookie が完全に廃止されるまで、これは問題にならないはずです。

{% endAside %}

トークンが RP サーバーによって検証されると、RP はユーザーを登録するか、サインインさせて新しいセッションを開始できるようにします。

## 貢献とフィードバック {: #share-feedback}

- **GitHub**: [提案](https://github.com/fedidcg/FedCM/blob/main/explainer.md)を読み、[イシューを投稿したり、ディスカッションを閲覧](https://github.com/fedidcg/FedCM/issues)したりできます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

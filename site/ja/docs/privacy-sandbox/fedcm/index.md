---
layout: 'layouts/doc-post.njk'
title: 'Federated Credential Management API'
subhead: >
  プライバシーを保護する ID 連携のためのウェブ API。
description: >
  ユーザーがブラウザのプライバシーの向上と互換性のある方法で、フェデレーションアカウントを使用してウェブサイトにログインできるようにするウェブプラットフォーム API。
date: 2022-04-25
updated: 2022-05-23
authors:
  - agektmr
---

## 実装状況

このドキュメントでは、ID 連携の新しい提案である Federated Credential Management API（FedCM）の概要を説明します。

*  [FedCM 提案](https://github.com/fedidcg/FedCM)の[公開ディスカッション](https://github.com/fedidcg/FedCM/issues)が開始しました。
*  [FedCM のオリジントライアル](/blog/fedcm-origin-trial)は、Android の Chrome 101 から 105で利用できます。 デスクトップ版 Chrome では、Chrome 103 以降でサポートされています。 他のブラウザでは 未対応です。
*  [プライバシーサンドボックスのタイムライン](http://privacysandbox.com/timeline)では、FedCMおよびプライバシーサンドボックスのその他の提案の実装時期を提供しています。
*  [Chrome プラットフォームの状況](https://chromestatus.com/feature/6438627087220736)

## FedCM が必要な理由

過去 10 年間、ID 連携は、使いやすさ（パスワードレスのシングルサインオンなど）、セキュリティ（フィッシング攻撃やクレデンシャルスタッフィング攻撃への耐性の向上など）、サイト単位でのユーザー名とパスワードに比較した信頼性の観点から、ウェブでの認証の水準を上げる上で中心的な役割を果たしてきました。

ID 連携を採り入れることで、RP（リライングパーティ）は IDP（ID プロバイダー）に依存して、ユーザーに新しいユーザー名とパスワードを要求せずにアカウントを提供することが可能となっています。


{% Aside 'key-term' %}
_ID 連携_ は、信頼できる外部パーティ（_ID プロバイダー_ または IdP）に個人（ユーザーまたはエンティティ）の認証または認可を委任します。 すると ID プロバイダーは、その個人のウェブサイト（_リライングパーティ_ または RP）へのサインインを許可します。
{% endAside %}

残念ながら、ID 連携の設計基盤（iframe、リダイレクト、Cookie）の仕組みでは、ウェブ全体でユーザーをトラッキングすることも可能です。 ユーザーエージェントは ID 連携とトラッキングを区別できないため、これらの仕組みが ID 連携をサポートするために使用されているのかどうかを判断するのが困難となっています。

Federated Credential Management API（FedCM）は、ウェブ上の ID 連携フローをユースケースごとに抽象化することができます この専用の API を用いることで、ブラウザは RP と IdP が情報を交換するコンテキストを理解し、共有される情報と特権レベルをユーザーに伝達することで、意図しない悪用を防ぐことができます。

### 期待される影響

{% Aside 'caution' %}
[プライバシーサンドボックスイニシアチブ](https://privacysandbox.com/)を使用して、Chrome 上のすべてのトラッキングベクターを軽減することを目指しています。 サードパーティ Cookie の段階的廃止による影響を減らすことを最初の取り組みとしています。他のブラウザですでに行われている最中ですが、[Chrome では 2023 年に予定](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/)されています。 これらの Cookie を削除すると、サードパーティの追跡を減らすことができますが、他のクロスサイトのユースケースにも影響が及ぼされます。
{% endAside %}

[コミュニティの取り組み](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)と私たちの調査を通じて、サードパーティ Cookie の段階的廃止の影響を受ける ID 連携関連の統合がいくつかあることがわかりました。

* [OpenID Connect Front-Channel Logout](https://openid.net/specs/openid-connect-frontchannel-1_0.html)
* [OpenID Connect Session Management](https://openid.net/specs/openid-connect-session-1_0.html)
* [iframeベースのバックグラウンドトークン 更新](https://github.com/fedidcg/use-case-library/issues/10)
* [Iframeベースのログインウィジェット](https://github.com/fedidcg/use-case-library/issues/12)（[Facebook のパーソナル化されたログインボタン](https://developers.facebook.com/docs/facebook-login/web/login-button/)など）

FedCM の最初の目標は、サードパーティ Cookie の段階的廃止が ID 連携に与える影響を減らすことです。上記は、影響を受けると予想される領域のリストです。 その他のユースケースでリストに含まれていないものがある場合は、[貢献とフィードバックの共有](#share-feedback)をお勧めします。

## FedCM の推奨使用対象者 {: #who-uses-fedcm }

以下の**すべて**の条件に該当する場合にのみ、FedCM が役立つと考えています。

1. ID プロバイダー（IdP）である
1. サードパーティ Cookie の段階的廃止の影響を受ける
1. RP がサードパーティである。 使用している RP が [SameParty](/blog/first-party-sets-sameparty/) である場合、[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) での配信が適している可能性があります。

### IdP である場合 {: #idp }

FedCM は ID プロバイダーからのサポートを必要とします。 リライングパーティは単独で FedCM を使用することはできません。 あなたが RP である場合は、IdP に指示を求めてください。

### サードパーティ Cookie の段階的廃止の影響を受ける場合 {: #unaffected-by-3p-cookies }

<figure class="float-right">
{%
   Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/GMv2zAgNt8dG62JnoSEC.png", alt="Chrome でサードパーティ Cookie をブロックする構成を行い、サードパーティ Cookie の段階的廃止をシミュレーションします", width="800", height="908"
%}
   <figcaption>Chrome でサードパーティ Cookie をブロックする構成を行い、サードパーティ Cookie の段階的廃止をシミュレーションします</figcaption>
</figure>

FedCM は、現在の統合がサードパーティ Cookie の段階的廃止による影響を受ける場合にのみ使用してください。 影響を受けない場合は、FedCM を使用しないことをお勧めします。

Chrome のサードパーティ Cookie が段階的に廃止された後も ID 連携が引き続き機能するかどうかわからない場合は、[シークレットモード](https://support.google.com/chrome/answer/95464)でウェブサイトでの統合への影響をテストすることができます。 または、デスクトップの場合は `chrome://settings/cookies` で、モバイルの場合は**設定** > **サイト設定** > **Cookie** に移動して、サードパーティ Cookie をブロックすることができます。

サードパーティ Cookie を使用しなくても ID 連携への影響が検出されない場合は、FedCM を使用せずに、現在の統合を引き続き使用できます。

確認すべき内容がわからない場合は、段階的廃止による影響が期待される[既知の機能](https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case)について詳しくお読みください。

### RP がサードパーティである場合

RP が IdP と[同一パーティ](/blog/first-party-sets-sameparty/#first-party-sets-policy)内にある ID プロバイダーの場合、[First-Party Sets](/docs/privacy-sandbox/first-party-sets/) がより適切なオプションであると予想されます。 First-Party Sets を使用すると、同じエンティティが所有および運営する関連ドメイン名を、同じファーストパーティに属していると宣言できます。 このため、サードパーティ Cookie が段階的に廃止された後でも、同一パーティのサードパーティ Cookie が機能します。

First-Party Sets は常に使用できるわけではありませんが、 RP が [SameParty](/blog/first-party-sets-sameparty/#first-party-sets-policy) の場合は、First-Party Setsの使用を検討してください。

## ユーザーと FedCM の対話 {: #use-cases}

FedCM の最初のオリジントライアルでは、主にサードパーティ Cookie の段階的廃止による影響を軽減することに焦点が当てられています。 ユーザーは、[Chrome のユーザー設定](#user-settings)で FedCM を有効または無効にできます。

FedCM はプロトコルに依存しないように設計されており、次の 認証関連機能を提供します。

* [リライングパーティへのサインインに、ID プロバイダーを使用する](#sign-in)
* [リライングパーティからサインアウトする](#sign-out)
* [認証用のトークンを取り消す](#revoke-tokens)

仕組みについては、[デモ](https://fedcm-rp-demo.glitch.me)を確認してください。

将来的には、以下を含むより多くの機能をサポートしたいと考えています。

*  自動サインイン
*  認可プロンプト
*  アクセストークンとリフレッシュトークン
*  フロントチャネルログアウト: ID プロバイダー（IdP）が開始するリライングパーティ（RP）からのサインアウト
*  OpenID Connect（OIDC） セッション管理
*  クロスオリジン iframe
*  パーソナル化されたボタン

### リライングパーティにサインインする {: #sign-in}

<figure class="float-right screenshot">
{% Video
   src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Qx48SEGIEqi5OtPE9ogn.mp4",
   width="280", autoplay="true"
%}
  <figcaption>ユーザーは FedCM を使用して RP にサインインする</figcaption>
</figure>

ユーザーがリライングパーティ（RP）のウェブサイトにアクセスすると、ユーザーが IdP にサインインしている場合は FedCM サインインダイアログが表示されます。

ユーザーが RP にサインインしていない場合は、ユーザー登録ダイアログが表示され、RP の利用規約（必須）やプライバシーポリシー（提供されている場合）などの追加の開示文言が表示されます。

ユーザーが「**～として続行**」をタップするとサインインが完了します。 成功した場合、ユーザーのアカウントステータスとサインインステータスがブラウザに保存されます。

{% Aside 'caution' %}

**既知のイシューがあります**。 ユーザーが IdP でサインインしないか、セッションが期限切れになっている場合、FedCM ダイアログが表示されません。 この修正が必要な場合は、[フィードバックをお送りください](#share-feedback)。

{% endAside %}

RP が FedCM をサポートしていないブラウザをサポートする可能性がありますが、 その場合でも、ユーザーは FEDCM 以外の既存のサインインプロセスを使用できるはずです。 [FedCM のオリジントライアルでサインインがどのように機能するか](/blog/fedcm-origin-trial#sign-into-rp)について、詳細をご覧ください。

### RP からサインアウトする {: #sign-out}

ユーザーが RP からサインアウトすると、FedCM はブラウザからサインイン状態をクリアします。

### トークンを取り消す  {: #revocation}

ユーザーは、リライングパーティのトークンを取り消すことができます（リライングパーティからの登録解除など）。 ユーザーが IdP にサインインしている場合、RP は FedCM を使用して、その IdP にユーザーのトークンを取り消すように要求できます。 同時に、FedCM は RP のサインイン状態をブラウザからクリアします。

### FedCM の有効化または無効化を設定する {: #user-settings}

ユーザーは Android の Chrome の設定で FedCM を有効または無効にできます。 **設定** > **サイトの設定** > **サードパーティのサインイン**に移動し、トグルを変更します。

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ThWp3UvxdbU6TzwxlC1j.jpg", alt="モバイルの Chrome 設定でサードパーティのサインインをトグルして、FedCM を有効にします", width="550", height="257", class="screenshot" %}

デスクトップの Chrome では、`chrome://settings/content/federatedIdentityApi` で同じ操作を行えます。

{% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/8zR9MNWyt0c6M5GjWpfw.png", alt="デスクトップの Chrom 設定でサードパーティの再任をトグルして、FedCM を有効にします", width="800", height="678", class="screenshot" %}

## IdP による FedCM のサポート方法 {: #support-fedcm}

サポートの詳細については、実装方法と [FedCM の サードパーティオリジントライアル](/blog/fedcm-origin-trial)への参加方法について、詳細な指示をお読みください。

## 貢献とフィードバックの共有 {: #share-feedback}

*  **オリジンライアル**: [FedCM のオリジントライアル](/origintrials/#/view_trial/3977804370874990593)は、バージョン 101 から 105 までの Chrome で利用可能です。 [オリジントライアル](/blog/fedcm-origin-trial)について、詳細をご覧ください。
*  **GitHub**: [提案](https://github.com/fedidcg/FedCM/blob/main/explorations/proposal.md)を読み、[イシューを投稿し、ディスカッションをフォロー](https://github.com/fedidcg/FedCM/issues)できます。
*  **開発者サポート**: [Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)リポジトリで質問をしたり、ディスカッションに参加したりできます。

## 詳細について

*  API の実装についての詳細は、[Participate in an origin trial for FedCM](/blog/fedcm-origin-trial)（FedCM のオリジントライアルに参加する）をお読みください。
*  [Federated Credential Management のテクニカル Explainer](https://github.com/fedidcg/FedCM/) をお読みください。
*  FedCM に関する [Chrome プラットフォームの実装状況](https://chromestatus.com/feature/6438627087220736)をご覧ください。

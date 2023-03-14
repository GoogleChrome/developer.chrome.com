---
layout: layouts/blog-post.njk
title: "[OUTDATED] First-Party Sets と SameParty 属性"
description: >

  First-Party Sets では、ファーストパーティとサードパーティが別の物として処理される場合に、同一のエンティティが所有して運営している関連ドメイン名をファースト パーティとして扱えるようにすることができます。
date: 2021-08-26
updated: 2022-11-30
thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg
alt: First-Party Sets を示す図。1 つのセットには example.com、example.rs、および example.co.uk ドメインが、もう 1 つのセットには brandx.site、fly-brandx.site、および drive-brandx.site ドメインが含まれている。
tags:
  - privacy
authors:
  - rowan_m
  - mihajlija
---

{% Aside 'warning' %} First-Party Sets の提案が更新されたため、この記事は最新ではありません。最新情報については、[Explainer](https://github.com/WICG/first-party-sets) と[テスト手順](/blog/first-party-sets-testing-instructions)を参照してください。 {% endAside %}

多くの組織には、`brandx.site` や `fly-brandx.site` などの異なるドメイン名に関連するサイト、または `example.com`、`example.rs`、`example.co.uk` のように異なる国のドメインに関連するサイトがあります。

ブラウザは、ウェブ上のプライバシーを改善するために[サードパーティの Cookie を廃止](https://blog.google/products/ads-commerce/a-more-privacy-first-web/)する方向に進んでいますが、このようなサイトは、多くの場合 Cookie に依存して、ドメイン全体で状態を維持し、それにアクセスする必要のある機能（シングル・サインオンや同意管理機能）を備えています。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JNtmMZl7o44LwUk7mE5G.png", alt="", width="800", height="316" %}

First-Party Sets では、ファーストパーティとサードパーティが別の物として処理される場合に、同一のエンティティが所有して運営している関連ドメイン名をファースト パーティとして扱えるようにすることができます。First-Party Sets 内のドメイン名は *same-party* と見なされるため、same-party のコンテキストで設定または送信されることを意図している Cookie にラベルを付けることができます。有効なユースケースを壊さない方法を維持しながら、サードパーティによるクロスサイトトラッキングを防止するバランスを見つけることが目的です。

First-Party Sets の提案は現在[テスト段階](https://privacysandbox.com/timeline/)にあります。その仕組みとそれを試す方法については、続きをご覧ください。

## ファーストパーティ Cookie とサードパーティ Cookie の違いは？

Cookie は本質的にファーストパーティまたはサードパーティではなく、Cookie が含まれる現在のコンテキストに依存します。これは、`cookie` ヘッダー内、または JavaScript の `document.cookie` を介したリクエストのいずれかです。

たとえば、 `video.site` に `theme=dark` Cookie がある場合、`video.site` を閲覧中にリクエストが `video.site` に対して行われると、これは [same-site コンテキスト](https://web.dev/same-site-same-origin/#same-site-cross-site)であり、含まれる Cookie は *first-party* となります。

ただし、`video.site` の iframe プレーヤーを埋め込んだ `my-blog.site` を閲覧している場合に `my-blog.site` から `video.site` にリクエストが送信されると、これはクロスサイトコンテキストであり、`theme` Cookie は *third-party* となります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/zHa3CTG1l3lYA6C3P433.png", alt="video.site からの Cookie を 2 つのコンテキストで示す図。トップレベルのコンテキストも video.site である場合は same-site Cookie であり、トップレベルのコンテキストが my-blog.site で、iframe のコンテキストが video.site である場合は cross-site となる。", width="800", height="514" %}

Cookie の組み込みは、Cookie の `SameSite` 属性によって決定されます。

- `SameSite=Lax`、`Strict`、または `None` を指定した [**same-site コンテキスト**](https://web.dev/same-site-same-origin/#same-site-cross-site)では、Cookie は**ファーストパーティ**になります。
- `SameSite=None` を指定した **cross-site コンテキスト**では、Cookie は**サードパーティ**になります。

ただし、必ずしも明確ではありません。`brandx.site` が旅行予約サイトで、`fly-brandx.site` と `drive-brandx.site` も併用してフライトとレンタカーのサービスを分けているとします。1 つの旅行を予約する過程で、訪問者はこれらのサイト間を移動してさまざまなオプションを選択し、これらのサイト間で、「ショッピングカート」の中身が維持されることを期待しています。`brandx.site`は、`SameSite=None` Cookie を使用して、cross-site コンテキストを許可することでユーザーのセッションを管理します。ただし欠点があり、Cookie にクロスサイトリクエストフォージェリ（CSRF）保護がありません。`evil.site` が `brandx.site` へのリクエストを含めると、その Cookie が含まれてしまうことになります！

Cookie はクロスサイトですが、これらのサイトはすべて同じ組織が所有し、運営しています。訪問者も同じ組織であると認識しており、それらのサイト間で同じセッション、つまり共通のアイデンティティが使用されることを望んでいます。

{% Aside %} First-Party Sets には、**cross-site コンテキスト**がそれでも **first-party** である状況を定義する方法があります。Cookie は、First-Party Set に含めることも、サードパーティのコンテキストで除外することも可能です。{% endAside %}

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/oNCKndk5TJyiqcPgvv5E.png", alt="サイトが同じ First-Party Set の一部であれば cross-site コンテキストに Cookie が含まれる可能性があるが、そのセット外の cross-site コンテキストでは拒否されることを示す図。", width="400", height="362" %}

## First-Party Sets ポリシー

[First-Party Sets](https://github.com/privacycg/first-party-sets)は、**同じパーティが所有し、運営している複数のサイト間でこの関係を明示的に定義する**方法を提案しています。これにより、 `brandx.site` は `fly-brandx.site` や `drive-brandx.site` などとのファーストパーティの関係を定義できるようになります。

さまざまなプライバシーサンドボックスの提案を推進する[プライバシーモデル](https://github.com/michaelkleber/privacy-model)は、ID を分割してクロスサイトトラッキングを防ぐという概念に基づいています。つまり、ユーザーの識別に使用できる情報へのアクセスを制限する境界線をサイト間に引くということです。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/bTGzUkmiyY1d0ZssO8Jq.png", alt="複数の cross-site コンテキストで同じサードパーティ Cookie にアクセスできる未分割の状態と、各トップレベルコンテキストが cross-site Cookie の個別のインスタンスを持ち、それらのサイト間のリンクアクティビティを防止する分割モデルを示す図。", width="800", height="305" %}

デフォルトのオプションはサイトごとに分割することであり、これによって多くのファーストパーティのユース ケースは解決されますが、`brandx.site` の例では、ファーストパーティが 1 つ以上のサイトで構成される可能性があることを示しています。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/mGJiTbDhAYa9ZpChapX3.png", alt="すべてのサイトが同じセットの一部である場合に、1 つのセットの Cookie の同じインスタンスが cross-site コンテキストにどのように含まれるかを示す図。", width="400", height="356" %}

First-Party Sets の提案で重要となる部分は、ブラウザ全体のポリシーが乱用や誤用を防止することを保証するというところです。たとえば、First-Party Sets を使って、無関係なサイト間でのユーザー情報の交換、または同じエンティティによって所有されていないサイトのグループ化を有効にしてはなりません。First-Party Set がファーストパーティとして人が理解するものにマッピングされ、さまざまなパーティ間でアイデンティティを共有する方法として使用されないようにすることが、この構想としてあります。

サイトが First-Party Set を登録するには、提案されたドメイングループを、ブラウザポリシーを満たすために必要な情報と共に公開トラッカー（専用の GitHub リポジトリなど）に送信することが 1 つの方法として挙げられます。

{% Aside %} 新しい First-Party Set の承認プロセスについては W3C と協議中であり、検討されているオプションの 1 つに、検証をブラウザ会社ではなく、独立したエンティティが処理することが挙げられています。<br> {% endAside %}

First-Party Set のアサーションがポリシーに従って検証されると、ブラウザは更新プロセスを通じてセットのリストを取得することが可能です。

オリジントライアルには定義済みのポリシーがあります。これは最終版ではありませんが、原則は同じままである可能性があります。

- First-Party Set 内のドメインは、同じ組織が所有し、運営しているものである必要があります。
- これらのドメインは、ユーザーが 1 つのグループとして認識できるものである必要があります。
- ドメイン間で共通のプライバシーポリシーが共有されている必要があります。

{% Aside %} [First-Party Sets に提案されたポリシー](https://github.com/privacycg/first-party-sets/blob/main/ua_policy_proposal.md)の詳細をご覧ください。 {% endAside %}

## First-Party Set の定義方法

組織の First-Party Set のメンバーと所有者を特定したら、提案されたセットを送信して承認を受けることが重要です。実際のプロセスについてはまだ議論中です。

{% Aside 'caution' %} First-Party Set は、同じ組織に属するサイトの完全なリストを*意図したものではありません*。サイト間で cross-site Cookie を明示的に許可する必要がある場合に*のみ*、サイトのセットを作成する必要があります。以下の「[First-Party Sets オリジントライアルに適したユースケース](#usecases)」をご覧ください。<br> {% endAside %}

First-Party Set を宣言するには、メンバーと所有者をリストする静的 JSON リソースを、セットに含まれる各ドメインのトップレベルにある `/.well-known/first-party-set` にホストする必要があります。

`brandx` の First-Party Set の例では、所有者ドメインは以下のコードを次の場所にホストしています。<br> `https://brandx.site/.well-known/first-party-set`:

```text
{
  "owner": "brandx.site",
  "version": 1,
  "members": ["fly-brandx.site", "drive-brandx.site"]
}
```

このセットの各メンバーは、セットの所有者を指す静的 JSON リソースもホストします。<br> `https://fly-brandx.site/.well-known/first-party-set` には以下のコードがあります。

```text
{ "owner": "brandx.site" }
```

そして `https://drive-brandx.site/.well-known/first-party-set` には、以下のコードがあります。

```text
{ "owner": "brandx.site" }
```

First-Party Sets には以下のようないくつかの制約があります。

- セット は 1 人しか所有できません。
- メンバーは 1 つのセットにのみ属することができ、重複や混合はできません。
- メンバーリストは、比較的人間が判読でき、大きすぎないように意図されています。

{% Aside %} 同じアカウント管理バックエンドを共有する[サイトを Digital Asset Link でリンク](/blog/site-affiliation/)している場合、既に同様のファイルをホストしている可能性があります。これは特に、関連サイト全体で Chrome パスワードマネージャーが同じ資格情報を提案できるようにするためです。 {% endAside %}

## First-Party Sets による Cookie への影響

Cookie の照合に必要なのは、提案された [`SameParty`属性](https://github.com/cfredric/sameparty)です。`SameParty` を指定すると、Cookie のコンテキストがトップレベルのコンテキストと同じ First-Party Set の一部であれば、その Cookie を含めるようにブラウザに指示します。

つまり、`brandx.site` が以下の Cookie を設定している場合:

```text
Set-Cookie: session=123; Secure; SameSite=Lax; SameParty
```

訪問者が `fly-brandx.site` を閲覧中に、リクエストが `brandx.site` に送信されると、`session` Cookie がそのリクエストに含まれるようになります。<br> 例えば `hotel.xyz` など、First-Party Set の一部ではない他のサイトが `brandx.site` にリクエストを送信すると、この Cookie は含められません。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/bmNqQh85YU16Bw2YEi5L.png", alt="説明のとおり、cross-site コンテキストで許可またはブロックされる brandx.site Cookie を示す図。", width="800", height="483" %}

`SameParty` が広くサポートされるまでは、それと一緒に `SameSite` 属性を使用して、Cookie のフォールバック動作を定義してください。`SameParty`属性は、`SameSite=Lax` と `SameSite=None` の間の設定を提供するものと考えることができます。

- `SameSite=Lax; SameParty` は **`Lax` 機能を拡張**して、サポートされている場合は same-party コンテキストを含めますが、サポートされていない場合は `Lax` 制限にフォールバックします。
- `SameSite=None; SameParty` は、サポートされている場合は same-party コンテキストのみに **`None` 機能を制限**しますが、サポートされていない場合はより広い `None` 権限にフォールバックします。

以下のような追加の要件がいくつかあります。

- `SameParty` Cookie には `Secure` を**含める必要**があります。
- `SameParty` Cookie に `SameSite=Strict`を**含めてはいけません**。

これは依然として cross-site であるため、`Secure` は必須です。安全な（HTTPS）接続を確保することでこれらのリスクを軽減する必要があります。同様に、これはクロスサイトの関係であるため、`SameSite=Strict` は無効です。これは、セット内で厳密にサイトベースの CSRF 保護を引き続き許可してしまうためです。

{% Aside 'gotchas' %} `SameParty` 属性は、Cookie が送信されるコンテキストにのみ影響を与えます。共通の Cookieジャーは**作成されません**。`brandx.site` からの Cookie は、`brandx.site` のリクエストまたはドキュメントに対して**のみ使用できます**。Cookie が `fly-brandx.site` で**直接利用できるようになることは絶対にありません** 。これは共有 ID として参照されているため、混乱を招く可能性がありますが、これは、サイト間の境界が緩和されているため、same-party の cross-site コンテキストで Cookie を設定または送信できることを意味します。Cookie が直接共有されるということではありません。 {% endAside %}

## First-Party Sets に適したユースケース {: #usecases}

First-Party Sets は、組織が異なるトップレベルサイト間でなんらかの 共有 ID 形態が必要となる場合に適しています。この場合の共有 ID とは、完全なシングルサインオンソリューションから、サイト間で共有された設定が必要なだけの場合まで、あらゆるものを指しています。

{% Aside %} これらのユースケースは、関連するすべてのサイトを所有する cross-site コンテキストのみの場合であっても、既に Cookie を `SameSite=None` としてマークしているインスタンスになるため、これらのユース ケースの候補を特定できます。<br> {% endAside %}

組織では、以下の項目に対して異なるトップレベルドメインを使用している可能性があります。

- **アプリ用ドメイン**: `office.com`、`live.com`、`microsoft.com`
- **ブランド別ドメイン**: `amazon.com`、`audible.com` / `disney.com`、`pixar.com`
- ローカリゼーションを有効にするための**国固有のドメイン**: `google.co.in`、`google.co.uk`
- ユーザーが直接操作することはないが、同じ組織のサイト全体でサービスを提供する**サービス用ドメイン**: `gstatic.com`、`githubassets.com`、`fbcdn.net`
- ユーザーが直接操作することはないが、セキュリティ上の理由から存在する**サンドボックスドメイン**: `googleusercontent.com`、`githubusercontent.com`

## 貢献方法

上記の条件に一致する一連のサイトをお持ちの場合は、参加オプションが多数あります。最も簡単なのは、以下の 2 つの提案に関するディスカッションを読んで参加することです。

- [First-Party Sets Privacy Community Group のディスカッション](https://github.com/privacycg/first-party-sets)
- [SameParty Cookie 属性に関するディスカッション](https://github.com/cfredric/sameparty)

テスト段階では、`--use-first-party-set` コマンドラインフラグを使用し、カンマ区切りのサイトリストを指定することで、機能を試すことができます。

以下のフラグを使って Chrome を起動すると、[https://fps-member1.glitch.me/](https://fps-member1.glitch.me/) のデモ サイトでこれを試すことができます。

```text
--use-first-party-set=https://fps-member1.glitch.me,https://fps-member2.glitch.me,https://fps-member3.glitch.me
```

これは、開発環境でテストしたい場合、またはライブ環境で `SameParty` 属性を追加して、First-Party Set が Cookie にどのように影響するかを確認したい場合に役立ちます。

実験とフィードバックに使用できる帯域幅がある場合は、バージョン 89 から 93 までの Chrome で利用できる [First Party Sets と SameParty のオリジントライアル](/origintrials/#/view_trial/988540118207823873)にサインアップすることもできます。

{% Aside 'key-term' %} オリジントライアルは、外部の開発者が初期の提案を実際のシナリオでテストして、ウェブプラットフォームのニーズを満たすものになるように進化させ、イテレーションを行うために必要なフィードバックを提供できるようにする Chrome の手法です。詳細については、[Chrome のオリジン トライアルを開始する](/blog/origin-trials/)をご覧ください。{% endAside %}

## オリジントライアルの Cookie を更新する方法

オリジン トライアルに参加し、Cookie の `SameParty` 属性をテストする場合は、以下の 2 つのパターンを検討してください。

### オプション 1

まず、`SameSite=None` のラベルを付けた Cookie があるが、ファーストパーティのコンテキストに制限したい場合は、それらに `SameParty` 属性を追加できます。オリジントライアルがアクティブなブラウザでは、Cookie はセット外の cross-site コンテキストで送信されません。

ただし、オリジントライアル以外の大半のブラウザでは、Cookie は通常どおりクロスサイトで送信され続けます。これは漸進的な強化アプローチと考えてください。

**前:**
`set-cookie: cname=cval; SameSite=None; Secure`

**後:**
`set-cookie: cname=cval; SameSite=None; Secure; SameParty`

### オプション 2

2 番目のオプションは手間がかかりますが、オリジントライアルを既存の機能から完全に分離し、`SameSite=Lax; SameParty` の組み合わせに特定してテストすることができます。

**前:**
`set-cookie: cname=cval; SameSite=None; Secure`

**後:**

```text
set-cookie: cname=cval; SameSite=None; Secure
set-cookie: cname-fps=cval; SameSite=Lax; Secure; SameParty
```

送られてくるリクエストの Cookie をチェックする際に、関連するサイトがセット内に含まれており、ブラウザがオリジントライアルを有効にしている場合は、クロスサイトリクエストの `cname-fps` Cookie のみを期待できます。このアプローチは、以前のバージョンを停止する前に、新しい機能を同時に起動するようなものと考えてください。

## First-Party Set が不要なケースとは？

ほとんどのサイトでは、パーティションまたはプライバシーの境界を引くのに適した場所はサイトの境界です。これは [CHIPS（パーティション化された独立した状態を持つ Cookie）](https://github.com/DCtheTall/CHIPS)で提案されているルートであり、`Partitioned` 属性を介してサイトにオプトインルートを提供し、重要なクロスサイトの埋め込み、リソース、API、およびサービスを保持しながら、サイト間でのデータの漏洩を防ぐ提案です。

サイトがセットを必要としなくても問題でないことを示す、その他のいくつかの考慮事項:

- 異なるサイトではなく、異なるオリジンでホストしている。上記の例において、`brandx.site` に `fly.brandx.site` と `drive.brandx.site` がある場合、それらはすべて同じサイト内の異なるサブドメインとなります。Cookie は `SameSite=Lax` を使用できるため、セットは必要ありません。
- サードパーティの埋め込みを他のサイトに提供している。導入で紹介した、`my-blog.site` に埋め込まれた `video.site` の動画は、明確なサードパーティ分離の例です。これらのサイトは異なる組織によって運営されており、ユーザーはそれらを個別のエンティティとして認識します。これらの 2 つのサイトを 1 つのセットとすることはできません。
- サードパーティのソーシャルサインインサービスを提供している。OAuth や OpenId Connect などを使用する ID プロバイダーは、多くの場合、ユーザーにスムーズなサインインエクスペリエンスを提供するためにサードパーティの Cookie に依存しています。これは有効なユースケースではありますが、組織が明確に異なるため、First-Party Sets には適していません。[WebID](https://github.com/WICG/WebID) などの早期提案では、これらのユースケースを実現する方法を模索しています。

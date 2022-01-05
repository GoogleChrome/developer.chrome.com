---
layout: layouts/doc-post.njk
title: Privacy Sandbox とは何ですか？
subhead: Privacy Sandbox とは、サードパーティ Cookie やその他の追跡メカニズムを使用せずにクロスサイトのユース ケースに対応するための一連の提案のことを指しています。
description: "何がその中に含まれているのか、どのようにして参加するのか、何のためのものなのか。"
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---


{% YouTube id='WnCKlNE52tc' %}

## Privacy Sandboxが必要な理由

Privacy Sandboxのイニシアチブには、2つの主要な目的があります。

- ユーザーのサイト間での追跡やユーザーに知らせずに行うサイト間での追跡行為を防ぎながら、Webで活用でき、ビジネスモデルをサポートする代替ソリューションを開発すること。
- 新しいソリューションが導入されたら、サードパーティのCookieのサポートを段階的に廃止すること。

## Privacy Sandboxの提案とは？

Chromeやその他のエコシステムの利害関係者は、これまでに31件以上の提案を提供してきました。これらの提案は、さまざまな使い方と要件に対応しています。<a href="https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo" data-md-type="link"> W3Cグループの公開リソース</a>で確認できます。

Chromeチームによって立案された主な提案を以下の通りです。

### 関連するコンテンツと広告

- [**FLoC**](/docs/privacy-sandbox/floc)：プライバシーを保護する、関心事に基づいた広告とコンテンツの選択：「関連広告」。
- [**FLEDGE**](/docs/privacy-sandbox/fledge)：リマーケティングのための広告の選択。 [TURTLEDOVE](https://github.com/WICG/turtledove)から生まれたAPI。

### 測定とアトリビューション

- [**アトリビューションレポート**](/docs/privacy-sandbox/attribution-reporting)：広告へのクリックまたは広告閲覧とコンバージョンとの関連性を探れます。以前はEvent Conversion Measurement APIとして知られていました。イベントレベルレポートと集計レポートという2種類のレポートを実現します。

### ファーストパーティの保護

- [**SameSite Cookieの変更**](https://web.dev/samesite-cookies-explained/)：クロスサイトCookieを明示的にマークして、サイトを保護できます。
- [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets)：同じエンティティが所有する関連ドメイン名が同じファーストパーティに属していると名乗れるようにします。

### 不正検出

- [**Trust Tokens**](/docs/privacy-sandbox/trust-tokens)：不正行為を防ぎ、ボットと人間を区別するために、ユーザーに対するコンテキスト間の信頼を表します。

### データ収集の制限

- [**Privacy Budget**](https://www.youtube.com/watch?v=0STgfjSA6T8)：Webサイトがユーザーのブラウザーまたはデバイスに関する情報を取得できるようにしますが、ブラウザーがサイトがアクセスできる情報の合計量を制限できるようにし、ユーザーを識別できないようにします。
- [**User-Agent Client Hints**](https://web.dev/user-agent-client-hints/)：[User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)（UA）という文字列は、消極的にユーザーを識別できる重要でかつ処理しにくい[情報源](https://w3c.github.io/fingerprinting-guidance/#passive)です。Client Hintsを使用すると、開発者は、User-Agent文字列からこのデータを解析する必要がなくなり、ユーザーのデバイスまたは条件について必要な情報のみを積極的に要求できます。
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness)：IPアドレスを利用して個々のユーザーを識別する機能を制限します。提案には2つの部分があります。[<strong data-md="">Willful IP Blindness</strong>](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md)では、WebサイトがIPアドレスをユーザーに関連付けしていないことをブラウザに通知できるようになります。[<strong data-md-type="double_emphasis">Near-path NAT</strong>](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md)では、ユーザーのグループが同じプライベートサーバーを介してトラフィックを送信し、実質、サイトホストからIPアドレスを隠せます。Gnatcatcherはまた、不正使用防止などの正当な目的でIPアドレスの情報を必要とするサイトが、認証と監査を条件としてIPアドレス情報を取得できるようにします。

### アイデンティティ

- [**WebID**](https://github.com/WICG/WebID)：ユーザーが明示的に同意しない限り、ユーザーのメールアドレスやその他の識別情報をサードパーティのサービスまたはWebサイトと共有せずに、フェデレーションID（ユーザーがサードパーティのサービスを介してWebサイトにサインインできるもの）をサポートします。WebIDを使用すると、リダイレクト、ポップアップ、またはサイト間でユーザーを識別および追跡するために使用できるサードパーティのCookieを使用せずに、フェデレーションサインインを実現できます。

## Privacy Sandboxに取り組んでいるのは誰ですか？

2021年頭までに次のような取り組みがありました。

- Chromeなどが30件以上のPrivacy Sandboxの提案を立案しました。
- [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants)および[Privacy Community Group](https://www.w3.org/community/privacycg/participants)を含めて、400以上の参加者がW3Cグループに参加して感想を寄せました。
- Chromeでのテスト用の5つのAPI実装が利用可能になりました。

## APIの実装日

このサイトの[実装状況ページ](/docs/privacy-sandbox/status/)には、個々のAPIの進捗状況に関する最新情報が記載されています。

---

## 本APIに関わってフィードバックを共有しましょう

- **GitHub**：GitHubで提案の説明を読み、説明用の [問題] タブで質問やコメントを投稿しましょう。<br> [説明へのリンク](#explainers)は以下に記載されています。
- **W3C**：W3C <a href="https://www.w3.org/community/web-adv/" data-md-type="link">Improving Web Advertising Business Group</a>、[Privacy Community Group](https://www.w3.org/community/privacycg/participants)、および[Web Incubator Community Group](https://github.com/WICG)で使い方について話し合い、業界での使用に関してフィードバックを提供できます。
- **開発者サポート**：[Privacy Sandbox開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問をしたり、ディスカッションに参加したりしましょう。

## 詳細はこちら

### プライバシーサンドボックス提案の説明 {: #explainers }

API提案の説明にはフィードバックが必要です。特に述べられていない使い方や目標を達成するためのよりプライベートな方法を提案するフィードバックが必要です。各説明の [問題] タブでコメントしたり質問したりできます。

- [Privacy Budget](https://github.com/bslassey/privacy-budget)
- [Trust Tokens](https://github.com/dvorak42/trust-token-api)
- [First-Party Sets](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [集計レポートAPI](https://github.com/csharrison/aggregate-reporting-api)
- [アトリビューションレポート](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### Web開発者向けの記事とビデオ

- [Privacy Sandboxを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)
- [SameSite Cookieの説明](https://web.dev/samesite-cookies-explained/)
- [Trust Tokensの入門](https://web.dev/trust-tokens)
- [広告のコンバージョンを測定するためのよりプライベートな方法](https://web.dev/conversion-measurement/)
- [FLoC とは](https://web.dev/floc/)
- [Privacy Budgetの紹介](https://www.youtube.com/watch?v=0STgfjSA6T8)

### 提案の背後にある原則と概念

- [Webの潜在的なプライバシーモデル](https://github.com/michaelkleber/privacy-model)は、APIの基礎となる主な原則を示しています。
- [Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- Privacy Sandboxの概要：[よりプライベートなウェブの構築](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Google AIブログ：[連合学習：一元化されたトレーニングデータを使用しない協調的な機械学習](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [サードパーティCookieの未来について](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

---
layout: layouts/blog-post.njk
title: First-Party Sets のテスト手順
description: First-Party Sets では、ファーストパーティとサードパーティが別の物として処理される場合に、同一のエンティティが所有して運営している関連ドメイン名をファースト パーティとして扱えるようにすることができます。
date: 2022-12-01
thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg
alt: First-Party Sets を示す図。1 つのセットには example.com、example.rs、および example.co.uk ドメインが、もう 1 つのセットには brandx.site、fly-brandx.site、および drive-brandx.site ドメインが含まれている。
tags:
  - privacy
authors:
  - mihajlija
---

First-Party Sets の最新のイテレーションは、Chrome 108 以降において、開発者向け機能フラグテストの準備を完了しています。出荷に向けて移行することを目的に First-Party Sets に積極的に取り組んでいるため、開発者テストのこのフェーズのフィードバックを 3 月上旬（2023 年 3 月 7 日）の Chrome 111 のリリースまで検討する予定です。

エコシステムのフィードバックにより、サードパーティの Cookie が Chrome でサポートされなくなったときに影響を受けるクロスサイトのユースケースが浮き彫りになりました。 First-Party Sets の提案では、相互に依存するサイトがブラウザに表現できる関係を共有し、ブラウザがユーザーに代わって適切なアクションを実行するか、その情報をユーザーに効果的に提供できるように、クロスサイト ユースケースを調査し、対処しています。

更新された提案では、2 つの API（Storage Access API と、暫定的に `requestStorageAccessForOrigin` という名前が付けられた新しい API）を使用して、First-Pary Sets 内の Cookie のクロスサイト アクセスを要求するアクティブな方法をサイトに提供します。以下の手順により、サイト用に作成するセットと、2 つの異なる API を呼び出すための適切なポイントをテストおよび検証できます。

## First-Party Sets の概要

First-Party Sets（FPS）は、開発者がサイト間の関係を宣言するためのウェブプラットフォーム メカニズムです。これにより、ブラウザはこの情報を使用して、特定のユーザー向けの目的で制限付きのクロスサイト Cookie アクセスを有効にできます。Chrome は、これらの宣言された関係を使用して、サードパーティのコンテキストで、Cookie へのサイトアクセスをいつ許可または拒否するかを決定します。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg", alt="", width="800", height="513" %}

大まかに言えば、First-Party Set はドメインのコレクションであり、単一の「セットプライマリ」と場合によっては複数の「セットメンバー」が存在します。サイトの作成者のみが独自のセットを送信でき、各「セットメンバー」と「セットプライマリ」との関係を宣言する必要があります。セットメンバーにはさまざまなドメインタイプを含めることができ、[ユース ケースに基づくサブセット](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets)の一部である必要があります。

{% Aside %} 提案が進化したため、FPS はクロスサイト Cookie アクセスを有効にするために、Cookie の `SameParty` 属性に依存しなくなりました。 {% endAside %}

各サブセットのプライバシーへの影響に応じて各サブセットのブラウザの処理を容易にするために、[Storage Access API（SAA）](https://privacycg.github.io/storage-access/)と requestStorageAccessForOrigin を活用して、FPS 内での Cookie アクセスを有効にすることを提案しています。

SAA を使用すると、サイトはクロスサイト Cookie アクセスを積極的に要求できます。リクエストしているサイトとトップレベルのウェブサイトが同じ FPS 内にある場合、Chrome はリクエストを自動的に許可します。SAA への呼び出しが他のブラウザでどのように処理されるかについては、[Storage Access API（SAA）のドキュメント](https://developer.mozilla.org/docs/Web/API/Storage_Access_API)を参照してください。

SAA では現在、ドキュメントが API のメソッドを呼び出す前にユーザーのアクティベーションを取得する必要があります。

これにより、クロスサイト画像や Cookie を必要とするスクリプトタグを使用するトップレベル サイトでは、FPS の採用が困難になる可能性があります。[これらの課題のいくつかに対処する](https://github.com/WICG/first-party-sets#extending-the-storage-access-api)ために、新しい API である [`requestStorageAccessForOrigin`](https://github.com/mreichhoff/requestStorageAccessForOrigin) を提案し、開発者がこの変更を簡単に採用できるようにしました。この API はテスト用にも利用できます。

## セットの送信

正規の FPS リストは、新しい [FPS GitHub リポジトリ](https://github.com/googlechrome/first-party-sets)に格納された JSON ファイル形式で公開され、すべてのセットの信頼できる情報源として機能します。Chrome はこのファイルを使用して、その動作に適用します。

セットを送信するための提案されたプロセスと要件の詳細については、 [送信ガイドライン](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md)を確認してください。セットを送信して、送信を検証するさまざまな技術チェックをテストすることもできます。すべての送信は、Chrome の安定版で FPS が利用可能になる前にクリアされることに注意してください。

セットの送信プロセスはまだ活発な開発段階にあるため、ローカルテストでは、コマンドラインでセットを作成し、ブラウザに直接渡すことしかできません。ローカルテストでは、機能フラグを使用してテストするため、セットを GitHub リポジトリに送信する必要はありません。

## ローカルでテストする方法

### 前提条件

FPS をローカルでテストするには、Chrome 108 以降をコマンドラインで起動して使用します。

今後のリリース前の Chrome 機能をプレビューするには、[ベータ版](https://www.google.com/chrome/beta/)または [Canary](https://www.google.com/chrome/canary/) 版の Chrome をダウンロードしてください。

### 例

{% Aside %} 実際の FPS デモを見るには、[https://first-party-sets.glitch.me/](https://first-party-sets.glitch.me/) にアクセスしてください。 {% endAside %}

```text
google-chrome \
--enable-features="FirstPartySets,StorageAccessAPI,StorageAccessAPIForOriginExtension,PageInfoCookiesSubpage,PrivacySandboxFirstPartySetsUI" \
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}" \
```

[フラグを使用して Chromium を実行する方法](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)については、こちらをご覧ください。

### 手順

FPS をローカルで有効にするには、このセクションで説明されているカンマ区切りのフラグリストとともに Chrome の `--enable-features` オプションを使用し、一連の関連サイトを `--use-first-party-set` に渡す JSON オブジェクトとして宣言する必要があります。

#### FPS を有効にする

`FirstPartySets` を使って Chrome で FPS を有効にします。

```text
FirstPartySets
```

{% Aside %} Chrome M109 以降、[セットのメンバーが変更された場合、サイトデータは消去される](https://github.com/WICG/first-party-sets#clearing-site-data-on-set-transitions)ようになっています。このため、サイトがこれまでに存在したすべてのセットでユーザーの ID を関連付けることができなくなります。 {% endAside %}

#### Storage Access API を有効にする

```text
StorageAccessAPI
```

Chrome で [Storage Access API](https://privacycg.github.io/storage-access/)（SAA）を有効にすると、サードパーティ Cookie がブラウザによってブロックされている場合でも、埋め込まれた iframe が `requestStorageAccess()` を使用してクロスサイト コンテキストで Cookie へのアクセスを要求できるようになります。

`requestStorageAccess()` が呼び出されると、解決するためにユーザーのジェスチャーが必要になることに注意してください。SAA 仕様はまだ進化しているため、Chrome の将来のバージョンでは、さまざまな要件が課される可能性があります。Chrome の SAA の実装について計画されている改善のリストについては、[こちら](https://bugs.chromium.org/u/shuuran@chromium.org/hotlists/First-Party-Sets-GA)を参照してください。

```text
StorageAccessAPIForOriginExtension
```

トップレベルサイトが `requestStorageAccessForOrigin()` を使用して、特定のオリジンに代わってストレージアクセスを要求できるようにします。これは、Cookie を必要とするクロスサイト画像またはスクリプトタグを使用するトップレベル サイトに役立ち、SAA を[採用する際のいくつかの課題に対処します](https://github.com/WICG/first-party-sets#extending-the-storage-access-api)。

#### セットをローカルで宣言する

First-Party Set はドメインのコレクションであり、単一の「セットプライマリ」と場合によっては複数の「セットメンバー」が存在します。セットメンバーには、[ユース ケースに基づいたサブセット](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsetsgh-use-case-based-subsets)を含むさまざまなドメインタイプを含めることができます。

セットのメンバーである URL を含む JSON オブジェクトを作成し、それを `--use-first-party-set` に渡します。

以下の例では、`primary` はプライマリドメインをリストし、`associatedSites` は[関連付けられたサブセット](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets)の要件を満たすドメインをリストします。

```json
{
     "primary": "https://primary.com",
    "associatedSites": ["https://associate1.com", "https://associate2.com", "https://associate3.com"]
}
```

例:

{% Aside %} コマンドラインでセットを定義するときは、文字列全体を引用符で囲み、JSON 内の引用符をエスケープしてください。 {% endAside %}

```text
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}"
```

ローカルテストでは、コマンドラインでセットを作成し、ブラウザに直接渡すことしかできません。ローカルでのテスト目的では、セットの検証はありませんが、FPS が安定バージョンで出荷される場合には、すべてのセットを FPS GitHub リポジトリに提出し、検証基準に従う必要があります。

#### FPS UI を有効にする

```text
PageInfoCookiesSubpage
```

URL バーからアクセスできる PageInfo セクションで FPS を表示できるようにします。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ZljqGAmnZWXbFTQWhtMw.png", alt="", width="800", height="513" %}

```text
PrivacySandboxFirstPartySetsUI
```

Chrome 設定の［プライバシーとセキュリティ］→［Cookie およびその他のサイト データ］（chrome://settings/cookies）で、FPS UI の［関連サイトがグループ内のアクティビティを表示できるようにする］オプションを有効にします。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Bp6CSnAztSTEB7epeAm0.png", alt="", width="800", height="513" %}

#### サードパーティ Cookie がブロックされていることを確認する

1. Chrome の設定で、［プライバシーとセキュリティ］→［Cookie およびその他のサイト データ］または chrome://settings/cookies に移動します。
2. ［一般設定］で、［サード パーティの Cookie をブロックする］が有効になっていることを確認します。
3. サブオプションの［関連サイトがグループ内のアクティビティを表示できるようにする］も有効になっていることを確認します。

## セキュリティに関する考慮事項

Storage Access API により、ウェブサイトは特定のケースでサードパーティ Cookie へのアクセスを取り戻すことができるため、ウェブアプリケーションがクロスサイト攻撃や情報漏えいの影響を受けやすくなる可能性があります。クロスサイト コンテキストで Cookie に依存するサイトは、[CSRF](https://developer.mozilla.org/docs/Glossary/CSRF) やその他の攻撃のリスクを認識する必要があります。

### 改善予定

これを改善するために、将来の Chrome リリースでは、明示的な埋め込み先のオプトインを確実にすることを目的として、追加のセキュリティ制御が必要になります。提案された改善点は、フレームごとにのみアクセスを許可し、認証されたリクエストで CORS を要求し、オリジンへのアクセス範囲のみを維持することです。詳細については、[最近のセキュリティ分析](https://docs.google.com/document/d/1AsrETl-7XvnZNbG81Zy9BcZfKbqACQYBSrjM3VsIpjY/edit#heading=h.vb3ujl8dnk4q)をご覧ください。

Chrome の SAA の実装について[予定されている改善のリスト](https://bugs.chromium.org/u/shuuran@chromium.org/hotlists/First-Party-Sets-GA)をご覧ください。

Chrome は、SameSite=None とマークされた Cookie を、Storage Access API が関連するクロスサイト埋め込みコンテキストでのみ送信することに注意してください。ただし、すべてのブラウザがこれらの Cookie へのデフォルトアクセスを非推奨にするまでは、Cookie がどこで使用されるかを推測することはできません。アクセスが FPS 内でのみ許可されると想定するのは安全ではなく、サイトは引き続き標準のセキュリティのベストプラクティスを使用する必要があります。

## 貢献とフィードバックの共有

ローカルテストは、FPS を有効にするための Storage Access API メカニズムを試し、フィードバックや遭遇したイシューを共有する機会です。さらに、GitHub でセットの送信プロセスをテストすることで、プロセスと検証手順に関する経験を共有することができます。更新された提案に関するフィードバックを共有するには、以下をご利用ください。

- イシューを提起し、[GitHub](https://github.com/WICG/first-party-sets/issues) でのディスカッションをご覧ください。
- [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。
- [プライバシーサンドボックスの提案に関するフィードバック](/docs/privacy-sandbox/feedback/)を提供するためのさまざまな方法を確認してください。

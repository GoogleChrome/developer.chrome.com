---
layout: layouts/blog-post.njk
title: 'First-Party Sets: 統合ガイド'
date: '2023-01-12'
thumbnail: image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg
alt: example.com、example.rs、および example.co.uk のドメインを含む 1 つの First-Party Set を示す図。もう 1 つには、brandx.site、fly-brandx.site、および drive-brandx.site を含む。
tags:
  - privacy
authors:
  - jney
  - sarino
---

First-Party Sets（FPS）は、ブラウザがドメインのコレクション間の関係を理解するのに役立つウェブプラットフォーム メカニズムです。これにより、ブラウザは重要な決定（クロスサイト Cookie へのアクセスを容易にするかどうかなど）を行って、特定のサイト機能を有効にし、この情報をユーザーに提示することができます。FPS を使用すると、特定の制御を使用して、サイトによるドメイン間でのデータの共有を実現できます。

## API を知る

Chrome は、エコシステムからのフィードバックに基づいて FPS をイテレートしています。最初の提案では、サイトが共通のブランド、共通のプライバシーポリシー、および共通のオーナーシップを共有する必要がありました。[GitHub リポジトリに要約](https://github.com/WICG/first-party-sets/issues/93#issuecomment-1298786481)されているフィードバックに耳を傾けた後、Chrome は提案を更新し、ドメインの「プライマリ」と「サブセット」を中心に据えて、FPS がユースケースにもっと焦点を合わせられるようにしました。サブセットアプローチでは、ドメインごとに異なるルールを作成して、柔軟性と透過性を向上させます。

There are two key components to the proposal:

- **Policy**. The framework governing how relationships amongst domains may be declared.
- **テクノロジー**。宣言されたドメイン間の関係に基づいて、ブラウザがクロスドメイン Cookie アクセスを管理する方法。

大まかに言えば、First-Party Set はドメインのコレクションであり、単一の「セットプライマリ」と場合によっては複数の「セットメンバー」が存在します。サイトの作成者のみが独自のセットを送信でき、各「セットメンバー」と「セットプライマリ」との関係を宣言する必要があります。セットメンバーにはさまざまなドメインタイプを含めることができ、[ユース ケースに基づくサブセット](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets)の一部である必要があります。

ブラウザが各サブセットを異なる方法で処理できるようにするために、[Storage Access API（SAA）](https://privacycg.github.io/storage-access/)を活用して FPS 内での Cookie アクセスを有効にしています。

## Goals

Chrome はサードパーティの Cookie を廃止するため、ウェブでのユーザー エクスペリエンスに影響を与える非追跡フローの破損を軽減したいと考えています。たとえば、多くのサイトが単一のユーザー エクスペリエンスを提供するために複数のドメインに依存していることがわかっています。組織は、画像や動画をホストするための国固有のドメインやサービス ドメインなど、複数のユース ケースに対応するさまざまなトップレベル ドメインを維持したい場合があります。Chrome の目標は、ユーザーのプライバシーを改善しながら、ウェブ上での主要な用途を維持することです。

FPS は、次の 2 つの目標に到達することでこれを達成できます。

- ブラウザがマルチドメイン サイトのドメイン間の関係を理解できるようにして、ユーザーに代わって決定を下したり（クロスサイト Cookie へのアクセス要求を促進するなど）、その情報を効果的にユーザーに提示したりできるようにします。
- 既存のウェブセキュリティ原則を支持します。

## Prerequisites and setup

Chrome は現在、機能フラグを使用して FPS をテストすることのみを計画しています。これは、すべてのテストがこれらのフラグを使用してローカルで行われることを意味します。FPS をローカルでテストするには、Chrome 108 以降をコマンドラインから起動して使用します。

Use the steps outlined in the [testing instructions](/blog/first-party-sets-testing-instructions/) to set up.

## ユースケースの応用

すべてのドメインが First-Party Set に含まれるわけではありません。プライバシーの境界をどこに引くか、およびドメインをさまざまなサブセットにどのように適合させたいかを理解することをテストの一環としています。

FPS を使用したテストの目的は、Storage Access API と FPS によって適用されるロジックを使用して、サイトのユースケースが引き続き維持されるかどうかを評価することです。

FPS が評価する[ユースケース](https://github.com/WICG/first-party-sets#use-cases)は次のとおりです。

- **国のカスタマイズ**。共有インフラストラクチャに依存しながら、ローカライズされたサイトを活用する（example.co.uk は、example.ca がホストするサービスに依存する場合があります）。
- **サービスドメインの統合**。ユーザーが直接対話することはないが、同じ組織のサイト（example-cdn.com）全体でサービスを提供するサービスドメインを活用します。
- **ユーザーコンテンツの分離**。セキュリティ上の理由から、ユーザーがアップロードしたコンテンツを他のサイトコンテンツから分離するさまざまなドメインのデータにアクセスする一方で、サンドボックス化されたドメインに認証（およびその他の）Cookie へのアクセスを許可します。
- **埋め込みの認証済みコンテンツ**。関連プロパティ（最上位サイトにサインインしたユーザーに限定された動画、ドキュメント、またはリソース）からの埋め込みコンテンツをサポートします。
- **サインイン**。関連プロパティ間でのサインインをサポートします。ただし、Chrome が[指摘](https://github.com/WICG/first-party-sets#use-cases)しているように、[FedCM API](https://github.com/fedidcg/FedCM) は一部のユースケースにも適している場合があります。
- **分析**。サービスの質を向上させるために、関連プロパティ全体でユーザージャーニーの分析と測定を展開します。

## Testing methodology

### Scope

FPS 提案には 2 つの重要なコンポーネントがあります。

- GitHub を介した FPS 送信プロセス。
- API を介して、宣言された FPS 内で Cookie アクセスを有効にする。

初期のテストの目標と私たちが求めているもの:

- "Functional testing" of both components, the submission process and enabling cookie access.
- Validating that the process and the technology work and that cookie access can be enabled within the declared FPS.
- Identifying potential bugs.

The testing methodology for both of these components is outlined below.

### Key aspects

- Chrome 108 からは、開発者の機能フラグテストのみが利用可能になります。つまり現時点では、オリジントライアル テストはありません。
- ローカルでのテストでは、コマンドラインでセットを宣言し、ブラウザに直接渡すことしかできません。機能フラグを使用したローカルテストを実施するために、セットを GitHub リポジトリに送信する必要はありません。

{% Aside 'caution' %} テストフェーズ中に GitHub で作成されたすべてのセットは、First-Party Sets が Chrome でリリースされる前に削除されます。つまり、エンティティはそれらを再度送信する必要があります。 {% endAside %}

## Testing the FPS submission process

To declare the relationship amongst the domains and specify which subset they are part of, follow the steps below:

1. 関連するドメインを特定します。これには、FPS の一部となる**セットプライマリ**と**セットメンバー**が含まれます。また、各セットメンバーが属する**サブセットタイプ**を特定します。
2. Ensure the [set formation requirements](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements) and [set validation requirements](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-validation-requirements) are in place.
3. FPS を正しい [JSON 形式](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-submissions)で宣言します。
4. Chrome が**正規の FPS リスト**をホストする [`first_party_sets.JSON`](https://github.com/GoogleChrome/first-party-sets/blob/main/first_party_sets.JSON) に[プル リクエスト（PR）](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)を作成して、First Party Set（前のステップの JSON 形式）を送信します。
    - A GitHub account is required to create PRs.
    - The canonical FPS list is a public JSON file that serves as the source-of-truth of approved sets. It will be consumed by Chrome to apply the behavior.

Once the PR is created, a series of checks will happen to validate that the requirements from step 2 are in place.

成功した場合、送信者に通知されます。現時点では、承認された PR は、1 週間に 1 回（火曜日の午後 12 時（東部標準時））に手動で一括して正規の FPS リストにマージされます。

If any of the checks fails, the submitter will be notified through a PR failure on GitHub. The submitter can fix the errors and create a new PR, and keep in mind that:

- The PR failure notification may also provide additional information on why the submission may have failed.
- セットの送信を管理するすべての技術的チェックは GitHub で実施されるため、技術的チェックに起因するすべての送信の失敗は GitHub で表示できます。

## Testing the APIs to enable cookie access within a declared FPS

This is the process to verify that cross-site cookie access is enabled in the declared FPS.

Storage Access API（SAA）と、暫定的に `requestStorageAccessForOrigin`（rSAFor）という名前が付けられている新しい API を使用します。これらの API は、First-Party Set 内の Cookie のクロスサイトアクセスを要求するアクティブな方法をサイトに提供します。

To run the tests locally follow these steps:

1. Chrome 108 以降を使用していることを確認します（Chrome [Beta](https://www.google.com/chrome/beta/) または [Canary](https://www.google.com/chrome/canary/) を使用できます）。
2. （ドキュメントに示されているように）機能フラグを含む[コマンドライン](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)で Chrome を起動します。
3. Chrome の設定でサードパーティ Cookie が**無効になっている**ことを確認します。
4. テスト対象のサイトから API（SAA または rSAFor）を呼び出し、クロスサイト Cookie へのアクセスを検証します。

詳細については、Chrome の[開発者ドキュメント](/blog/first-party-sets-testing-instructions/)のステップバイステップ ガイドをご覧ください。

### Demo

開発者ドキュメントの手順に従っている場合は、[デモ](https://first-party-sets.glitch.me/)を試して動作を確認し、[デモのソース コード](https://glitch.com/edit/#!/first-party-sets)を確認してください。

The demo First-Party Set is declared as following:

```js
{
  "primary": "https://first-party-sets.glitch.me",
  "associatedSites": ["https://fps-member-1.glitch.me"]
}
```

ローカルテストの場合、これはコマンドラインを介して宣言されます（上記の手順 2 を参照）。

デモサイトでは、ブラウザが API をサポートしているかどうかを確認するために、いくつかの検証が行われます。

```js
/*
 * UA-CH to validate supported browser version
 */
if (navigator.userAgentData.brands.some(b => { return b.brand === 'Google Chrome' && parseInt(b.version, 10) >= 108 })) {
// Supported
} else {
	// Not supported
}

/*
 * Validate SAA and rSAFor are available
 */
if ('requestStorageAccess' in document) {
	// SAA available
} else {
	// SAA not available
}

if ('requestStorageAccessForOrigin' in document) {
	// rSAFor available
} else {
	// rSAFor not available
}
```

[Glitch でデモのソースコード](https://glitch.com/edit/#!/first-party-sets?path=public%2Findex.html%3A99%3A28)を確認してください。

すべてのチェックに合格したら、ボタンをクリックして、*プライマリサイトに Cookie を作成*できます。次に、両方の API（SAA と rSAFor）を使用して、*関連付けられたサイトからこの Cookie にアクセス*できるようになります。

#### Accessing the cookie with SAA

関連サイトの `fps-member-1.glitch.me` には、プライマリサイトの `first-party-sets.glitch.me` を埋め込んだ `<iframe>` があります。

*`<iframe>` 内で*次のコードが実行され、Cookie へのアクセスが許可されているかどうかが確認されます。

```js
if ('requestStorageAccess' in document) {
document.requestStorageAccess().then(
    		(res) => { console.log('access granted', res) },
    		(err) => { console.log('access denied', err) }
  	);
}
```

Note that the very first time this site is visited, the access should be **denied**.

`<iframe>` 内には `<button>` があり、クリックすると次のコードが実行されます。

```js
if ('requestStorageAccess' in document) {
  	document.requestStorageAccess();
  	location.reload();
} else {
window.alert('document.requestStorageAccess not enabled.');
}
```

The page is reloaded and the cookies should be accessible now.

#### Accessing the cookie with rSAFor

関連サイトの `fps-member-1.glitch.me` には、プライマリサイトの `first-party-sets.glitch.me` を埋め込んだ `<iframe>` があります。

サイトには、クリックすると次のコードを実行する `<button>` があります。

```js
if ('requestStorageAccessForOrigin' in document) {
document.requestStorageAccessForOrigin('https://first-party-sets.glitch.me');
  	location.reload();
} else {
  	window.alert('document.requestStorageAccessForOrigin not enabled.');
}
```

この場合の*重要な違い*に注意してください。 **`<iframe>` の外側**で rSAFor を呼び出します。これには、トップレベル サイトがクロスサイト画像または Cookie を必要とするスクリプトタグを使用できるというメリットがあります。

### API roadmap

The team is implementing improvements to the API in light of [security considerations](https://docs.google.com/document/d/1AsrETl-7XvnZNbG81Zy9BcZfKbqACQYBSrjM3VsIpjY/edit#heading=h.vb3ujl8dnk4q).

Some key changes that are in progress are the following:

- rSA 許可は**フレームごとに**適用されます（現在のコードでは、許可はページごとです）
    - この変更に対応して、rSA および rSAForOrigin の許可は**別個の権限**として扱われます。
- rSAForOrigin の場合、サブリソース リクエストには、 `SameSite=None` Cookie を指定して **CORS 保護**を要求し、明示的なオプトインを保証します。

これらの変更により、ウェブ開発者は追加の統合作業が必要になる場合があります。計画されている改善の完全なリストは、[Chromium バグ](https://bugs.chromium.org/u/3722074794/hotlists/First-Party-Sets-GA) をご覧ください。

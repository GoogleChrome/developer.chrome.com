---
layout: layouts/doc-post.njk
title: よくある質問
subhead: プライバシー サンドボックスは、サードパーティの Cookie や他のトラッキング メカニズムを使用せずに、複数のサイトにまたがるユースケースに対応するための提案をまとめたものです。
description: プライバシーサンドボックスに関するよくある質問
date: 2021-09-21
updated: 2022-11-11
authors:
  - samdutton
---

ここでは、プライバシー サンドボックスに関するよくある質問をご確認いただけます。なお、現時点での質問の範囲は全体を網羅したものではなく、各見出しの下のトピックの一覧は今後大幅に増えることが予想されます。

ご協力のお願い: ここに掲載されていない、プライバシー サンドボックスに関する質問がありましたら、以下のとおり、ご協力をお願いいたします。

- 質問の対象となっている提案の解説用レポジトリで問題を報告してください。各レポジトリには、下記のリンクまたは[プライバシーサンドボックスのステータスページ](/docs/privacy-sandbox/status/)からアクセスできます。
- プライバシー サンドボックスに関する一般的な質問と、複数の API にまたがる質問については、[プライバシー サンドボックス デベロッパー サポート リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)に投稿してください。
- 必要に応じて、このサイトのリポジトリで[機能リクエストを提出](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request%2CP2&template=feature_request.md&title=)できます。

## 一般的な質問

### プライバシー サンドボックスが必要な理由を教えてください。

プライバシー サンドボックスは、次の 2 つを主な目的とするイニシアチブです。

- 複数のサイトにまたがるユーザーの追跡をブロックし、ユーザーが気付かないクロスサイト トラッキングを防止しながら、ウェブのユースケースやビジネスモデルに対応する代替ソリューションを開発する。
- 新しいソリューションの導入に合わせて、サードパーティの Cookie や他のトラッキング方式のサポートを段階的に廃止する。

### プライバシー サンドボックスに携わっているメンバーを教えてください。

プライバシー サンドボックスは、ウェブ標準の提案をまとめたものです。

Chrome などのブラウザ ベンダーや広告会社などの関係者が、これまでに 30 を超える提案を行ってきました。これらの提案は、[W3C グループのパブリックリソース](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)で確認でき、さまざまなユースケースや要件に対応しています。

### プライバシー サンドボックスに関する変更や進捗状況を確認するにはどうすればよいですか？

毎月の更新情報を[プライバシーサンドボックスの進捗状況](/tags/progress-in-the-privacy-sandbox/)に関する一連の記事でご確認いただけます。これらの記事には、ご希望のリーダーで[登録可能な RSS / Atom フィード](/feeds/progress-in-the-privacy-sandbox.xml)も含まれています。

これらの一連の記事は、各提案の現在のステータスとスケジュールを示した[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline/)の対応する毎月の更新情報にリンクしています。

これらの概要リソースでは、プロジェクト全体の変更を確認できます。ただし、個々の提案の詳細を確認する場合は、以下の手順を行う必要があります。

- GitHub で提案リポジトリを確認するか、スターを付けて新しい問題や更新に関する通知を受け取る: プライバシー サンドボックスの[ステータスページ](/docs/privacy-sandbox/status/)には、各提案のリポジトリへのリンクが表示されます
- 提案の詳細を話し合う定例会議に参加するには、関連する [W3C グループ](https://www.w3.org/groups/)に参加します
- Chrome の実装に関する変更について更新情報をメールで受け取るには、[プラットフォームのステータス](https://chromestatus.com/)で、関連するエントリにスターを付けます

### 参加するにはどうすればよいですか？

- API の検討、テスト、改良に参加する: [プライバシー サンドボックスイニシアチブに参加する方法](/blog/privacy-sandbox-participate/)をご覧ください
- デベロッパーとしてディスカッションに参加したり、質問したりする: [プライバシー サンドボックス デベロッパーサポート](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)にアクセスしてください

特定の API について質問がある場合は、[API の解説用 GitHub レポジトリ](/docs/privacy-sandbox/status/)で問題を報告できます。

### API の解説で用語は定義されていますか？

はい。[プライバシーサンドボックスの用語集](/docs/privacy-sandbox/glossary/)をご覧ください。

### Privacy Sandbox API はいつ実装されますか？

[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline/)では、サードパーティの Cookie を段階的に廃止するためのロードマップをご確認いただけます。その他の、個々の API の最新情報については、[実装ステータスページ](/docs/privacy-sandbox/status/)をご覧ください。

### Privacy Sandbox API が搭載されているのは Chromium と Chrome のどちらですか？

API は、Chrome の作成に使用されるオープンソース ブラウザの [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) で実装されています。Privacy Sandbox API のコードには、[Chromium のコード検索](https://source.chromium.org/search?q=floc)を使ってアクセスできます。

実装途中の API にアクセスできるようにするには、[Chromium をダウンロード](http://chromium.org/getting-involved/download-chromium)して、[フラグ付きで実行](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)します。

### まだデフォルトで有効になっていない Privacy Sandbox API を試すにはどうすればよいですか？

API は、Chrome での開発の進行状況に応じて、複数の方法で試すことができます。

- **1 人のユーザーがコマンドライン フラグを介して使用する場合**
     初期の機能には特定のコマンドライン フラグが提供されていることが多く、デベロッパーはそのフラグを使用することで、新機能を有効にしてブラウザを起動できます。
- **1 人のユーザーが `chrome://flags` を介して使用する場合**
     通常は、機能の開発が進むと、よりアクセスしやすい `chrome://flags` 画面内で試験運用版フラグを介して利用できるようになります。これらのフラグは、コマンドラインから有効にすることも可能です。`chrome://flags#enable-experimental-web-platform-features` には、現在の試験運用版機能がまとめられています。
- **複数のユーザーがオリジン トライアルで使用する場合**
     新機能のコードが完成し、比較的安定したバージョンになったら、[オリジントライアル](https://web.dev/origin-trials)が可能になり、個々のサイトで Chrome ユーザー向けに機能を有効化できるようになります。ユーザーによるテストが必要な API で[オリジントライアル](https://web.dev/origin-trials)が実施可能な場合は、[オリジントライアルに登録](/origintrials/#/trials/active)すると、ページが読み込まれるたびに有効なトライアル トークンを提供できます。
- **複数のユーザーが Chrome の早期リリースで使用する場合**
     特定のリリースに機能を搭載することが承認されたら、その後は Canary チャンネルと Beta チャンネルを経て Stable チャンネルに進みます。これらのチャンネルでは、すべてのユーザーに対してデフォルトで機能が有効になります。

{% Aside 'caution' %} Chrome ユーザーは、ブラウザの設定でプライバシー サンドボックス（試用版）を無効にすることができます。無効にした場合、有効なオリジン トライアル トークンを提供するページであっても、プライバシー サンドボックスの機能は有効になりません。 {% endAside %}

### オリジン トライアルに登録したにもかかわらず、サイトで API が機能しません。

[Chrome のオリジントライアルでのトラブルシューティング](/blog/origin-trial-troubleshooting/#chrome) ページをご覧ください。

### プライバシー サンドボックスのオリジン トライアルは、Chromium や他のブラウザでも可能ですか？

Chrome オリジン トライアルは、Chrome ユーザー向けに設計されています。Chrome オリジン トライアル トークンを使用して、他のブラウザ（Chromium と他の Chromium ベースのブラウザを含む）で試用版機能を許可しないでください。

詳しくは、[Chrome のオリジントライアルでのトラブルシューティング](/blog/origin-trial-troubleshooting/#chrome) ページをご覧ください。

iOS と iPadOS の Chrome では Chrome オリジン トライアルはサポートされていません。

### サードパーティの Cookie が廃止された後、`SameSite` は不要になりますか？

- 現在のデフォルトは `SameSite=Lax` です。厳密に含める*必要*はありませんが、ブラウザ間の一貫性のために指定することをお勧めします。
- `SameSite=Strict` は、ユーザーが既にサイトにいる場合にのみ送信する必要がある Cookie に対して、引き続きより制限的なオプションです。これは、特に機密性の高いアクセスの管理の一部である Cookie の優れたセキュリティ実践であり、現在もそれに変わりありません。
- `SameSite=None` は、ブラウザ間の一貫性のために引き続き送信する必要があります。ただし、サードパーティの Cookie を段階的に廃止するという Chrome の提案された変更により、これらの Cookie はクロスサイトコンテキストでそのまま送信されなくなります。

例外は、[CHIPS](/docs/privacy-sandbox/chips/) または [First-Party Sets](/docs/privacy-sandbox/first-party-sets/) の提案によって変更された Cookie です。これらにより、クロスサイト ユース ケースのサブセットが可能になります。これらの提案は活発に議論されているため、最終的な形式と機能は変更される可能性があります。

### サイトはオリジントライアルに参加できても、特定の地域での機能の使用をオプトアウトできますか？

簡単に言えば、特定の地域のオリジントライアルをオプトアウトすることはできません。オリジントライアルは、HTTP ヘッダー（サーバー側）または HTML メタタグ（クライアント側）を介して含まれる[トークン](/blog/origin-trials/#take-part-in-an-origin-trial)を含むページで有効です。

ユーザーの場所を特定できる場合は、その場所情報に基づいてオリジントライアルトークンを含めることを選択するコードを記述できます。たとえば、IP アドレスを使用してユーザーの場所を特定しようとする場合がありますが、IP アドレスはスプーフィングされる可能性があるため、これは保証されたソリューションではありません。

ただし、地理固有のオリジンは、[アクセス許可ポリシー](/docs/privacy-sandbox/permissions-policy/)を設定して、使用できる機能を制御できます。たとえば、`us.example.com` と `uk.example.com` は、制御可能な地理固有のオリジンです。これは、地域がオリジントライアルをオプトアウトしたことを意味するものではありません。

アクセス許可ポリシーを使用すると、サイトはブラウザに指示を与える小さなコードスニペットをページに追加します。ページが読み込まれると、ブラウザはアクセス許可ポリシーの指示を読み取り、アクセス許可ポリシーに記載されている機能（または API）を許可またはブロックします。サイトが特定の地域で API を制限する場合、開発者はその地域から要求されたすべてのページに対してポリシーを設定できます。

{% Aside 'warning' %} ユーザーは、現在地とは異なる地域からオリジンにアクセスすることを選択する場合があります。つまり、米国のユーザーが `uk.example.com` にアクセスできる可能性があるということです。これらのユーザーには、英国のサイトではブロックされていた米国のサイトの機能が表示されます。 {% endAside %}

## プライバシー状態トークン

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/jkarlin/topics/issues)してください。
- Chrome で現在テスト可能な実装について質問がある場合は、[Chromium バグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=topics)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### プライバシー状態トークン用のツールはありますか？

Chrome DevTools では、[ネットワーク] タブと [アプリケーション] タブでトラスト トークン インスペクションをオンにできます。[トラストトークンの概要](https://web.dev/trust-tokens/#summary)を参照してください。

### サイト運営者は、複数の信頼できる発行者からのトークンをどのように処理しますか？

サイト運営者は、一度に 1 つの発行者に対し、`document.hasTrustToken()` を使用してユーザーのブラウザに有効なトークンがあるかを確認できます。これが `true` を返してトークンが利用可能な場合、サイト運営者はそのトークンを引き換えて、他のトークンの検索を停止できます。

サイト運営者は、チェックするトークン発行者とその順序を決定する必要があります。

## Topics

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/turtledove/issues)してください。
- Chrome で現在テスト可能な実装について質問がある場合は、[Chromium バグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=fledge)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### サイトの特定のページでトピックの推定を無効にすることはできますか？

はい。ページに `Permissions-Policy: browsing-topics=()` ヘッダーを追加すると、そのページに限りすべてのユーザーのトピックの推定が行われなくなります。サイトでそれ以降にアクセスする他のページには影響はありません。たとえば、あるページで Topics API をブロックするポリシーを設定しても、他のページには影響しません。

トピックはホスト名からのみ推測され、URL パスからは推測されません。

### アトリビューション レポートと Event Conversion Measurement API は同じものですか？

はい。Permission Policy ヘッダーを使用して、ページ上の Topics API へのサードパーティアクセスを制御できます。`self` と、API へのアクセスを許可する任意のドメインをパラメーターとして使用します。

たとえば、独自のオリジンと `https://example.com` をオリジンとするものを除くすべてのブラウジングコンテキスト内での Topics API の使用を完全に無効にするには、次の HTTP 応答ヘッダーを設定します: 'Permissions-Policy: geolocation=(self " https://example.com")`

### `prebid.js` を使用するウェブサイトで Topics API を使用できますか？

[Prebid 7](https://prebid.org/blog/the-release-of-prebid-7-0/) のリリースで述べたように、コミュニティは新しいモジュールを介して Topics API との統合を積極的に開発しています。ただし、2022 年 11 月現在、Topics モジュールはまだ完成していません。開発に遅れないようにするために、次のことをお勧めします。

- [Prebid PR #8947: Topics module: Initial Topics iframe implementation](https://github.com/prebid/Prebid.js/pull/8947) をフォローしてください。これは、Prebid Topics Module を作成するための PR です。
- [Prebid Issue #8741: Enhancements to Topics module](https://github.com/prebid/Prebid.js/pull/8741) をフォローしてください。Prebid Topics Module の意図したワークフローについて活発な議論が行われています。
- 依存度が高い場合は、Prebid.js にアクセスして、提供されている標準チャンネルを通じてステータスの更新とタイムラインを確認してください。

## FLEDGE

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/turtledove/issues)してください。
- 現在 Chrome でテストできる実装に関する質問については、[Chromium のバグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=fledge)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### FLEDGE と TURTLEDOVE の違い

[FLEDGE](/docs/privacy-sandbox/fledge) は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリの提案の中でも Chromium に実装された最初の実験です。違いは主に、広告のバイヤーとセラーのデバイス上のロールの分離に関連しています。

FLEDGE は、「信頼できるサーバー」が、プライバシーを侵害することなく、ワークレットによって入札で使用されるリアルタイムデータへのアクセスを提供できるようにします。各インタレストグループは `trusted_bidding_signals_url` と `trusted_bidding_signals_keys` 属性を持つことができます。

オークション時に、ブラウザは信頼できるサーバーと通信してこれらのキーの値を取得し、それらの値を `generate_bid()` 関数で使用できるようにします。広告主（広告バイヤー）は、インタレストグループとともに追加のメタデータを保存して、オンデバイス入札を改善できます。

### Topics API と FLEDGE API を併用できますか？

はい。Topics API によって提供される、現在のユーザーについて観察されたトピックは、セラーまたは入札者がコンテキスト情報として使用することができます。トピックは、次のプロパティに含めることができます。

- `auctionSignals`: `navigator.runAdAuction()` に渡されるオークション構成オブジェクトのプロパティ
- `userBiddingSignals`: `navigator.joinAdInterestGroup()` に渡されるインタレストグループ構成オブジェクトのプロパティ

## アトリビューション レポート

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/conversion-measurement-api/issues)してください。
- オリジントライアルの参加者で技術的な質問がある場合は、開発者向けの [Attribution Reporting メーリング リスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に参加して質問するか、[Chromium のバグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=attribution%20reporting)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### Attribution Reporting は Event Conversion Measurement API と同じですか？

はい。元のイベントレベルの範囲が拡張され、追加の測定ユースケースをカバーするようになったため、[名前が変更されました](/docs/privacy-sandbox/attribution-reporting-introduction/)。

## First-Party Sets

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/privacycg/first-party-sets/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### First-Party Sets のコンテキストで「分割」とはどういう意味ですか？

登録可能なドメイン、または「First-Party Set」は、ドメイン間で結合されていません。

たとえば、`a.example`、`b.example`、および `c.example` は、本質的にいずれかのドメインが所有する First-Party Sets の一部ではありません。所有者ドメインは、他のドメインとの関係を定義するマニフェストファイルを提供する必要があります。

## User-Agent Client Hints (UA-CH)

### この機能について質問するにはどうすればよいですか？

- この API に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/ua-client-hints/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### UA-CH API を使ってタブレットデバイスを検出するには？

モバイル、タブレット、およびデスクトップデバイス間の境界線が明確ではなくなり、動的なフォームファクターがより一般的になるにつれて（折りたたみ式スクリーン、ノートパソコンとタブレットのモードの切り替え）、レスポンシブデザインと機能検出を使用して適切なユーザーインターフェースを提供することをお勧めします。

ただし、ユーザーエージェント文字列と User-Agent Client Hints の両方についてブラウザが提供する情報は同じソースから取得されるため、同じ形式のロジックが機能するはずです。

たとえば、このパターンが UA 文字列でチェックされている場合:

- 携帯のパターン: `'Android' + 'Chrome/[.0-9]* Mobile'`
- タブレットのパターン: `'Android' + 'Chrome/[.0-9]* (?!Mobile)'`

一致するデフォルトの UA-CH ヘッダーインターフェースをチェックできます。

- 携帯のパターン: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?1`
- タブレットのパターン: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?0`

または同等の JavaScript インターフェース:

- 携帯のパターン: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === true`
- タブレットのパターン: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === false`

ハードウェア固有のユースケースでは、高エントロピー `Sec-CH-UA-Model` ヒントを介してデバイスのモデル名を要求できます。

### `Accept-CH` ヘッダーで指定されたヒントはどのくらいの期間送信されますか？

`Accept-CH` ヘッダーで指定されたヒントは、ブラウザセッションの間、または別のヒントセットが指定されるまで送信されます。

### UA-CH は HTTP/2 と HTTP/3 で動作しますか？

UA-CH は、HTTP/2 接続と HTTP/3 接続の両方で動作します。

{% Aside 'caution' %} クライアント ヒントは安全な接続でのみ送信されるため、HTTPS を使用していることを確認してください。 {% endAside %}

### サブドメイン（および CNAME）が高エントロピー UA-CH にアクセスするには、トップレベルページの `Permissions-Policy` が必要ですか？

DNS 側でオリジンがどのように定義されているかに関係なく、リクエスト ヘッダーの高エントロピー UA-CH はクロスオリジン リクエストで制限されます。委譲は、クロスオリジン サブリソースの `Permissions-Policy` を介して処理するか、クロスオリジンコンテキストで実行される JavaScript を介して取得する必要があります。

### ユーザーエージェントの削減はボット検出にどのように影響しますか？

ユーザーエージェント文字列に対する Chrome の変更は、ボットが送信するユーザーエージェント文字列に直接影響しません。

ボットは、Chrome が送信する削減された情報を反映するために独自の文字列を更新することを選択する場合がありますが、それは完全に実装上の選択です。 Chrome は引き続き同じユーザー エージェント形式を送信しており、Chrome ユーザー エージェント文字列の末尾に独自の識別子を追加するボットは引き続き送信できます。

特定のボットに関する懸念事項がある場合は、所有者に直接連絡して、ユーザー エージェント文字列を変更する計画があるかどうかを確認することをお勧めします。

## 共有ストレージ

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/pythagoraskitty/shared-storage/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

## CHIPS

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/CHIPS/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

## ストレージのパーティショニング

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案の解説用レポジトリで[イシューを作成](https://github.com/MattMenke2/Explainer---Partition-Network-State/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

## Fenced Frames

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/shivanigithub/fenced-frame/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### Fenced Frames のユースケースを教えてください。

この API は、[新しい形式の埋め込みドキュメント](https://github.com/shivanigithub/fenced-frame)を提案します。これにより、新しい API は埋め込み元から自身を分離できるので、クロスサイト認識を防止できます。

広告のユースケースについては、[広告デザインドキュメント用のフェンス付きフレーム](https://docs.google.com/document/d/17rtX55WkxMcfh6ipuhP4mNULIVxUApvYt4ZYXfX2x-s/edit#heading=h.jy0hectpkl95)についての記事をご覧ください。

## ネットワーク状態のパーティショニング

### この機能について質問するにはどうすればよいですか？

- この仕様に関する質問がある場合は、解説用レポジトリで[イシューを作成](https://github.com/shivanigithub/fenced-frame/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

## FedCM

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/FedCM/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### FedCM とは何ですか？

FedCM（Federated Credential Management）は、ID 連携サービス（「～でログイン」など）へのプライバシーを保護したアプローチの提案です。ID 連携サービスを利用すると、ユーザーは個人情報を ID サービスやサイトと共有することなくサイトにログインできます。

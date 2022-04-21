---
layout: layouts/doc-post.njk
title: よくある質問
date: 2021-09-21
updated: 2021-04-12
authors:
	- samdutton
---

プライバシー サンドボックスは、サードパーティの Cookie や他のトラッキング メカニズムを使用せずに、複数のサイトにまたがるユースケースに対応するための提案をまとめたものです。

ここでは、プライバシー サンドボックスに関するよくある質問をご確認いただけます。なお、現時点での質問の範囲は全体を網羅したものではなく、各見出しの下のトピックの一覧は今後大幅に増えることが予想されます。

ご協力のお願い: ここに掲載されていない、プライバシー サンドボックスに関する質問がありましたら、以下のとおり、ご協力をお願いいたします。

- 質問の対象となっている提案の解説用レポジトリで問題を報告してください。各レポジトリには、下記のリンクまたは[プライバシーサンドボックスのステータスページ](/docs/privacy-sandbox/status/)からアクセスできます。
- プライバシー サンドボックスに関する一般的な質問と、複数の API にまたがる質問については、[プライバシー サンドボックス デベロッパー サポート リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)に投稿してください。
- 必要に応じて、このサイトのレポジトリで[機能をリクエスト](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request%2CP2&template=feature_request.md&title=)してください。

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

API は、Chrome の作成に使用されるオープンソース ブラウザの [Chromium](<https://en.wikipedia.org/wiki/Chromium_(web_browser)>) で実装されています。Privacy Sandbox API のコードには、[Chromium のコード検索](https://source.chromium.org/search?q=floc)を使ってアクセスできます。

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

{% Aside 'caution' %}
Chrome ユーザーは、ブラウザの設定でプライバシー サンドボックス（試用版）を無効にすることができます。無効にした場合、有効なオリジン トライアル トークンを提供するページであっても、プライバシー サンドボックスの機能は有効になりません。
{% endAside %}

### オリジン トライアルに登録したにもかかわらず、サイトで API が機能しません。

[Chrome のオリジントライアルでのトラブルシューティング](/blog/origin-trial-troubleshooting/#chrome) ページをご覧ください。

### プライバシー サンドボックスのオリジン トライアルは、Chromium や他のブラウザでも可能ですか？

Chrome オリジン トライアルは、Chrome ユーザー向けに設計されています。Chrome オリジン トライアル トークンを使用して、他のブラウザ（Chromium と他の Chromium ベースのブラウザを含む）で試用版機能を許可しないでください。

詳しくは、[Chrome のオリジントライアルでのトラブルシューティング](/blog/origin-trial-troubleshooting/#chrome) ページをご覧ください。

iOS と iPadOS の Chrome では Chrome オリジン トライアルはサポートされていません。

## トラスト トークン

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/trust-token-api/issues)してください。
- オリジン トライアルに関する質問がある場合は、[Chromium バグを報告する](https://bugs.chromium.org/p/chromium/issues/list?q=trust%20tokens)か、オリジン トライアルの参加者にお送りしたフィードバック フォームに返信してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### トラスト トークンにツールを使用できますか？

Chrome DevTools の Network タブと Application タブでトラスト トークンの検査を有効にできます。[トラストトークンの使用を開始する](https://web.dev/trust-tokens/#summary)をご覧ください。

## Topics

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/jkarlin/topics/issues)してください。
- Chrome で現在テスト可能な実装について質問がある場合は、[Chromium バグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=topics)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### サイトの特定のページでトピックの推定を無効にすることはできますか？

はい。ページに `Permissions-Policy: browsing-topics=()` ヘッダーを追加すると、そのページに限りすべてのユーザーのトピックの推定が行われなくなります。サイトでそれ以降にアクセスする他のページには影響はありません。たとえば、あるページで Topics API をブロックするポリシーを設定しても、他のページには影響しません。

トピックはホスト名からのみ推測され、URL パスからは推測されません。

## FLEDGE

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/turtledove/issues)してください。
- Chrome で現在テスト可能な実装について質問がある場合は、[Chromium バグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=fledge)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### FLEDGE と TURTLEDOVE の違いを教えてください。

[FLEDGE](/docs/privacy-sandbox/fledge/) は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリーの提案のうち、Chromium で実装された最初の試験運用版です。両者の違いは、広告の購入者と販売者のデバイス上の役割の分離に関連するものがほとんどです。

FLEDGE では、「信頼できるサーバー」がプライバシーを損なうことなく入札のワークレットで使用されるリアルタイム データへのアクセスを提供できます。各インタレスト グループには、`trusted_bidding_signals_url` 属性と `trusted_bidding_signals_keys` 属性を含めることができます。

オークションの際、ブラウザは信頼できるサーバーとやり取りしてこれらのキーの値を取得し、`generate_bid()` 関数で使用できるようにします。広告主（広告の購入者）は、オンデバイスの入札を改善する目的で、インタレスト グループとともに追加のメタデータを保存することができます。

## アトリビューション レポート

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/WICG/conversion-measurement-api/issues)してください。
- オリジン トライアルの参加者で技術的な質問がある場合は、デベロッパー向けの[アトリビューションレポート メーリングリスト](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)に参加して質問するか、[Chromium バグを報告](https://bugs.chromium.org/p/chromium/issues/list?q=attribution%20reporting)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### アトリビューション レポートと Event Conversion Measurement API は同じものですか？

はい。元のイベントレベルのスコープが拡張されて追加の測定ユースケースに対応できるようになったため、[名称が変更](/docs/privacy-sandbox/attribution-reporting-introduction/)されました。

## ファーストパーティ セット

### この機能について質問するにはどうすればよいですか？

- この提案に関する質問がある場合は、提案リポジトリで[イシューを作成](https://github.com/privacycg/first-party-sets/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、プライバシー サンドボックス デベロッパー サポート リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### ファーストパーティ セットにおける「シャードされている」とはどういう意味ですか？

登録可能なドメイン（「ファーストパーティ セット」）がドメイン全体で登録されていません。

たとえば、`a.example`、`b.example`、`c.example` は、本質的に 1 つのドメインが所有するファーストパーティ セットには含まれません。所有者ドメインは、他のドメインとの関係を定義したマニフェスト ファイルを提供する必要があります。

## User-Agent Client Hints（UA-CH）

### この機能について質問するにはどうすればよいですか？

- この API に関する質問がある場合は、仕様リポジトリで[イシューを作成](https://github.com/WICG/ua-client-hints/issues)してください。
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### UA-CH API を使用してタブレット デバイスを検出するにはどうすればよいですか？

今後、モバイル デバイス、タブレット デバイス、デスクトップ デバイスの境界はあいまいになり、動的なフォーム ファクタがより一般的になります（画面の折りたたみ、ノートパソコン モードとタブレット モードの切り替え）。そのため、レスポンシブ デザインと機能検出を使用して適切なユーザー インターフェースを表示することをおすすめします。

ただし、ブラウザから User-Agent 文字列と User-Agent Client Hints に提供される情報はどちらも同じソースから取得されるため、同じロジック形式が有効です。

たとえば、次のパターンが UA 文字列でチェックされるとします。
- スマートフォンのパターン: `'Android' + 'Chrome/[.0-9]* Mobile`'
- タブレットのパターン: `'Android' + 'Chrome/[.0-9]* (?!Mobile)`'

この場合、一致するデフォルトの UA-CH ヘッダー インターフェースがチェック可能です。
- スマートフォンのパターン: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?1`
- タブレットのパターン: `Sec-CH-UA-Platform: "Android"`, `Sec-CH-UA-Mobile: ?0`

または同等の JavaScript インターフェースも考えられます。
- スマートフォンのパターン: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === true`
- タブレットのパターン: `navigator.userAgentData.platform === 'Android' && navigator.userAgentData.mobile === false`

ハードウェア固有のユースケースには、高エントロピーの `Sec-CH-UA-Model` ヒントを介してデバイスモデル名をリクエストできます。

### Accept-CH ヘッダーを介して指定されたヒントはいつまで送信されますか？

`Accept-CH` ヘッダーを介して指定されたヒントは、ブラウザのセッション中、または別のヒントセットが指定されるまで送信されます。

### UA-CH は HTTP/2 や HTTP/3 で動作しますか？

UA-CH は HTTP/2 接続と HTTP/3 接続の両方で動作します。

{% Aside 'caution' %}
Client Hint は安全な接続を介してのみ送信されるため、HTTPS を使用していることを確認してください。
{% endAside %}

### サブドメイン（および CNAME）で高エントロピー UA-CH にアクセスするには、トップレベル ページの `Permissions-Policy` が必要ですか？

リクエスト ヘッダーの高エントロピー UA-CH は、発信元が DNS 側で定義されているかどうかにかかわらず、クロスオリジン リクエストでは制限されます。任意のクロスオリジン サブリソースに対する `Permissions-Policy` を介して委任を処理するか、クロスオリジン コンテキストで実行される JavaScript を介して委任を取得する必要があります。

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
- 実装、統合、一般的なベスト プラクティスに関する質問がある場合は、「プライバシー サンドボックス デベロッパー サポート」リポジトリで[イシューを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)してください。

### FedCM とは何ですか？

FedCM（Federated Credential Management）は、ID 連携サービス（「～でログイン」など）へのプライバシーを保護したアプローチの提案です。ID 連携サービスを利用すると、ユーザーは個人情報を ID サービスやサイトと共有することなくサイトにログインできます。

FedCM は [W3C で検討中](https://github.com/WICG/FedCM)です。

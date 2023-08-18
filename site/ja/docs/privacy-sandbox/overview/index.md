---
layout: layouts/doc-post.njk
title: プライバシーサンドボックスとは？
subhead: サードパーティ Cookie やその他のトラッキングメカニズムを使用せずに、クロスサイトのユースケースを満たすための一連の提案です。
description: 内容、目的、および貢献方法について。
date: 2021-05-18
updated: 2023-02-27
authors:
  - samdutton
  - alexandrawhite
---

プライバシーサンドボックスイニシアチブは、オンラインユーザーのプライバシーを保護し、繁栄するデジタルビジネスを構築するためのツールを企業や開発者に提供するテクノロジーを作成することを目的としています。

プライバシーサンドボックスには、主に次の 2 つの目的があります。

- 新しいソリューションが導入されたら、サードパーティ Cookie のサポートを段階的に廃止する。
- オンラインコンテンツとサービスをすべての人に無料で提供しながら、クロスサイトやクロスアプリによるトラッキングを減らします。

{% YouTube id='WnCKlNE52tc' %}

プライバシーサンドボックス API では、ウェブブラウザが新しい役割を担うことが必要です。API を使用すると、限られたツールや保護機能を使用するのではなく、ユーザーのブラウザがユーザーに代わってデバイス上でローカルに動作し、ウェブをナビゲートするユーザーの識別情報を保護できます。これはブラウザの方向性の転換です。

プライバシーサンドボックスの将来のビジョンは、ユーザーのプライバシーを保護しながら、特定のユース ケースを満たす特定のツールを提供するブラウザにあります。

## プライバシーサンドボックスの提案とは？

Chrome やその他のエコシステムの関係者は、これまでに 30 件を超える提案を提出し、[W3C グループの公開リソース](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)で閲覧できるようになっています。 これらの提案では、多様なユースケースと要件がカバーされています。

提案には、[Web 標準](https://www.w3.org/standards/)になるまでに、最大 3 つのフェーズ（ディスカッション、テスト、大規模な採用）のライフサイクルがあります。開発者や業界のリーダーからフィードバックを受けて、幅広いユーティリティと堅牢なプライバシー保護をユーザーに提供する耐久性のあるウェブ機能を確実に作成することが重要です。提案のライフサイクルについて詳しくは、こちらをご覧ください。

いくつかの主要な提案を以下に示します。

### サイト間プライバシーの境界の強化

- [**CHIPS**](/docs/privacy-sandbox/chips/): トップレベル サイトごとに個別の Cookie ジャーを使用して、開発者がパーティション化されたストレージに Cookie をオプトインできるようにします。
- [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets): 同じエンティティが所有する関連ドメイン名が、同じファーストパーティに属していることを宣言できるようにします。
- [**共有ストレージ**](/docs/privacy-sandbox/shared-storage/): サイトがパーティション化されていないクロスサイトデータを保存してアクセスできる汎用 API を作成します。このデータは、漏えいを防ぐために安全な環境で読み取る必要があります。
- [**ストレージパーティション**](https://github.com/privacycg/storage-partitioning): `localStorage` または Cookie など、あらゆる形態の[ユーザーエージェントステート](https://github.com/privacycg/storage-partitioning#user-agent-state)を、単一のオリジンまたはサイトではなく、トップレベルサイトと読み込まれるリソースのオリジンによってダブルキーで使用できるようにします。
- [**Fenced Frames**](/docs/privacy-sandbox/fenced-frame): クロスサイトデータを共有することなく、ページにコンテンツを安全に埋め込みます。
- [**ネットワークの状態のパーティション**](https://github.com/MattMenke2/Explainer---Partition-Network-State): リソースの再利用の際に一致する必要のあるネットワークパーティションキーをリクエストごとに提供し、ブラウザネットワークリソースがファーストパーティのコンテキストで共有されないようにします。
- [**Federated Credential Management（FedCM）**](/docs/privacy-sandbox/fedcm/): ユーザーが明示的に同意しない限り、ユーザーのメールアドレスやその他の識別情報をサードパーティのサービスやウェブサイトと共有することなく、ID 連携をサポートします。

### 関連するコンテンツと広告の表示

- [**Topics API**](/docs/privacy-sandbox/topics): サードパーティ Cookie を使用したり、サイト全体でユーザーの行動をトラッキングしたりせずに、インタレストベース広告を有効にします。
- [**FLEDGE**](/docs/privacy-sandbox/fledge): リマーケティングおよびカスタムオーディエンスのユースケースに対応するための広告選択。サード パーティがサイト間でのユーザーの閲覧行動を追跡するために使用できないように設計されています。FLEDGE は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリーの提案から Chromium に実装された最初の実験です。

### デジタル広告の測定

- [**アトリビューション レポート**](/docs/privacy-sandbox/attribution-reporting): 広告のクリックまたは広告の表示をコンバージョンと関連付けます。アドテックは、イベントレベルまたは[要約レポート](/docs/privacy-sandbox/summary-reports)を生成できます。
- [**Private Aggregation API**](/docs/privacy-sandbox/private-aggregation/): クロスサイトデータを使用してノイズを含む要約レポートを生成します。

### 隠されたトラッキングの防止

- [**ユーザー エージェントの削減と User-Agent Client Hints**](/docs/privacy-sandbox/user-agent/): 受動的に共有されるブラウザー データを制限して、フィンガープリンティングにつながる機密情報の量を減らします。クライアント ヒントを使用すると、開発者は、ユーザーのデバイスまたは状態について必要な情報のみを積極的に要求できます。
- [**IP 保護**](/docs/privacy-sandbox/ip-protection/): IP アドレスが追跡に使用されないように保護することで、ユーザーのプライバシーを向上させます。
- [**バウンス トラッキングの軽減策**](/docs/privacy-sandbox/bounce-tracking-mitigations/): コンテキスト全体で人を認識するバウンス トラッキングの機能を削減または排除する提案。
- [**プライバシー バジェット**](/docs/privacy-sandbox/privacy-budget/):<br>隠されたトラッキングを防ぐために、サイトに公開される個々のユーザー データの量を制限する提案です。

### ウェブのスパムや詐欺への対抗

- [**プライベートステートトークン**](/docs/privacy-sandbox/trust-tokens): ウェブサイトが、ある閲覧コンテキストから別の閲覧コンテキスト（サイト間など）に限定された量の情報を伝達できるようにして、受動的なトラッキングを行わずに詐欺に対抗できるようにします。

## プライバシー サンドボックスは誰が担当していますか？

Chrome やその他のブラウザ ベンダー、広告会社やその他の関係者から、これまでに 30 以上の提案が寄せられています。これらの提案は、[W3C グループの公開リソース](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)で見つけることができ、さまざまなユースケースと要件をカバーしています。

400 人以上が参加しました。これらのユーザーは、W3C グループに参加して、[Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) や [Privacy Community Group](https://www.w3.org/community/privacycg/participants) などに意見を投稿しています。

## プライバシー サンドボックス API はどこで提供されていますか？

現在、Chrome でのテスト用に 5 つの API 実装を利用できます。

API は、Chrome の作成に使用されるオープンソース ブラウザである [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) に実装されています。プライバシー サンドボックス API のコードには、[Chromium Code Search](https://source.chromium.org/search?q=floc) からアクセスできます。

[Chromium をダウンロード](http://chromium.org/getting-involved/download-chromium)してからフラグ付きで実行すると、実装中の API にアクセスできます。

{% Aside 'caution' %}<br> Chrome オリジントライアルは、Chrome ユーザー向けに設計されています。Chromium を含む他のブラウザや他の Chromium ベースのブラウザでトライアル機能を許可するために Chrome オリジントライアルトークンを使用しないでください。

詳細については、[Chrome のオリジントライアルのトラブルシューティング](/blog/origin-trial-troubleshooting/#chrome)をご覧ください。

iOS および iPadOS の Chrome は、Chrome オリジントライアルをサポートしていません。 {% endAside%}

## API の実装時期

[タイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)には、ウェブにおけるプライバシーサンドボックスの最新の実装ステータスが記載されています。各 API のドキュメントには、実装状況が記載されています。

API が提案から実験、拡大提供に移行する過程で、[Chrome 開発者ブログ](/tags/privacy/)で定期的にお知らせを公開しています。

## デフォルトで有効になっていないプライバシー サンドボックス API を試すには？

Chrome で API の開発が進むにつれて、API をテストに使用できるようにする方法は複数あります。

- **コマンドラインフラグを介した単一ユーザーの場合**<br>初期の機能では、開発者が新機能を有効にしてブラウザーを起動できるように、特定のコマンドラインフラグが提供されることがよくあります。
- **`chrome://flags` 経由の単一ユーザーの場合**<br> 機能が進歩するにつれて、よりアクセスしやすい `chrome://flags` インターフェース内の実験的フラグを介して提供されることがよくあります。`chrome://flags#enable-experimental-web-platform-features` は現在の実験的機能にバンドルされています。
- **ユーザー向けはオリジントライアルで試す**<br> 新機能のイテレーションのコードが完成し、比較的安定したら、[オリジントライアル](/docs/web-platform/origin-trials/)の提供により、サイトごとに Chrome ユーザーに対する機能を有効にできるようになります。ユーザーに対してテストしたいAPI の[オリジントライアル](/docs/web-platform/origin-trials/)が公開されたら、[オリジントライアルに登録](/origintrials/#/trials/active)して、ページが読み込まれるたびに有効なトライアルトークンを提供します。
- **初期の Chrome リリースのユーザー向け**<br> 特定のリリースでの機能の出荷が承認されると、安定版に到達するまで、カナリーやベータなどの [Chrome リリースチャンネル](/docs/web-platform/chrome-release-channels/)を通過します。この機能は、これらのチャンネルのすべてのユーザーに対してデフォルトで有効になります。

{% Aside 'caution' %}<br> Chrome では、ブラウザの設定でプライバシー サンドボックスのトライアルをオプトアウトする機能がユーザーに提供されています。オプトアウトしたユーザーは、有効なオリジントライアル トークンを提供するページであっても、プライバシー サンドボックス機能が有効になりません。<br> {% endAside%}

## サードパーティ Cookie が廃止された後、`SameSite` は不要になりますか？

- 現在のデフォルトは `SameSite=Lax` です。厳密に含める*必要*はありませんが、ブラウザ間の一貫性のために指定することをお勧めします。
- `SameSite=Strict` は、ユーザーが既にサイトにいる場合にのみ送信する必要がある Cookie に対して、引き続きより制限的なオプションです。これは、特に機密性の高いアクセスの管理の一部である Cookie の優れたセキュリティ実践であり、現在もそれに変わりありません。
- `SameSite=None` は、ブラウザ間の一貫性のために引き続き送信する必要があります。ただし、サードパーティの Cookie を段階的に廃止するという Chrome の提案された変更により、これらの Cookie はクロスサイトコンテキストでそのまま送信されなくなります。

例外は、[CHIPS](/docs/privacy-sandbox/chips/) または [First-Party Sets](/docs/privacy-sandbox/first-party-sets/) の提案によって変更された Cookie です。これらにより、クロスサイト ユース ケースのサブセットが可能になります。これらの提案は活発に議論されているため、最終的な形式と機能は変更される可能性があります。

## 貢献とフィードバックの共有

- **GitHub**: GitHub で Explainer を読み、それぞれの Issues タブで質問やコメントを投稿してください。
- **W3C**: W3C の [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/)、[Privacy Community Group](https://www.w3.org/community/privacycg/participants)、および [Web Incubator Community Group](https://github.com/WICG) では、ユースケースに関するディスカッションや業界のフィードバックが共有されています。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

## 詳細について

- [プライバシーサンドボックスを掘り下げる](https://web.dev/digging-into-the-privacy-sandbox)
- 「[A Potential Privacy Model for the Web](https://github.com/michaelkleber/privacy-model)」（ウェブの潜在的なプライバシーモデル）は、API の基盤となるコア原則を説明しています。
- Chromium の[プライバシーサンドボックス](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)の概要
- Google AI ブログ: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)（連合学習: 一元化されたトレーニングデータを使用しない共同機械学習）
- [The future of third-party cookies（サードパーティ Cookie の未来）](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

### プライバシーサンドボックスの最新の進捗

毎月の更新情報は、[Progress in the Privacy Sandbox](/feeds/progress-in-the-privacy-sandbox.xml)（プライバシーサンドボックスの進捗）連載記事で確認できます。これには、[RSS / Atom フィードが含まれているため、任意のリーダーで購読](/tags/progress-in-the-privacy-sandbox/)できます。

連載記事は、[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline/)に行われる毎月の更新情報にリンクしており、提案の現状とスケジュールを確認できます。

これらの概要は、プロジェクト全体に渡る変更に関する情報にアクセスするための道しるべとなりますが、個々の提案について詳細な情報をフォローする場合は、以下をお勧めします。

- GitHub で提案のリポジトリを確認するか作成し、新しいイシューや更新に関する通知を受け取るようにします。プライバシーサンドボックスの[ステータスページ](/docs/privacy-sandbox/status/)には、各提案のリポジトリへのリンクが記載されています。
- 関連する [W3C グループ](https://www.w3.org/groups/)に参加して、提案の詳細について話し合う定期的な会議に参加してください。
- 実装の変更に関する更新をメールで受け取るには、[Chrome プラットフォームステータス](https://chromestatus.com)に関連するエントリに星を付けてください。

### 参加する

- API のインキュベーション、テスト、改良に参加する:<br> [プライバシーサンドボックスイニシアチブに参加するには](/blog/privacy-sandbox-participate/)
- 開発者は、以下のディスカッションに参加し、質問を投稿できます:<br> [Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)

この仕様に関する質問がある場合は、解説用レポジトリで[イシューを作成](/docs/privacy-sandbox/status/)してください。

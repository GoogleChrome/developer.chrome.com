---
layout: layouts/doc-post.njk
title: Chrome を利用したテスト
subhead: サードパーティ Cookie を無効にしてサイトをテストします。
description: サードパーティ Cookie を無効にしてサイトをテストします。
date: '2023-05-18'
updated: '2023-09-01'
authors:
  - alexandrawhite
  - rowan_m
---

サードパーティ Cookie の廃止に備え、サイトがサードパーティ Cookie を使用せずにサイトがどのように動作し機能するかをプレビューできるテストモードを Chrome で提供する予定です。この記事では、Chrome が提供する予定のテストモードの概要と、実験グループのラベルにアクセスする方法について説明します。

{% Aside %}

このテストは、次のプライバシーサンドボックス広告関連 API（PS R&amp;M API）のパフォーマンスの測定に焦点を当てています: アトリビューション レポート、保護されたオーディエンス、トピック、プライベート集計、共有ストレージ、および Fenced Frames。

{% endAside %}

Google は CMA との連携により、これらのテストモードが[業界テストに関するガイダンス](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing)に記載されているサードパーティ向けのテストフレームワーク（およびタイムライン）に準じていることを確認してきました。そのため、CMA は、これらのモードでのテストの結果がプライバシーサンドボックスの評価に使用できると考えています。

Chrome を利用したテストには 2 つのモードを用意する予定です。

- **モード A**: アドテックは、トラフィックの一部でコントロールラベルと実験ラベルを受け取り、これらを使用してテストと実験を実施できます。
- **モード B**: Chrome は、全 Chrome ユーザーの一部に対してサードパーティ Cookie をグローバルに無効にします。

{% Aside %}

ラベルは、HTTP ヘッダーまたは JavaScript API 経由でアクセスできる一時的な cookie-deprecation 値を介して利用可能になります。実装の詳細については、後の[「cookie-deprecation 値を介したラベルへのアクセス」](#cookie-deprecation-value)セクションをご覧ください。

{% endAside %}

モード内のグループの構成とサイズに関する一部の詳細は正確で最終的なものではありませんが、それらは CMA のテストガイダンスで定義されている処置と制御のグループに一致する予定であり、2023 年第 3 四半期にさらなる実装ガイダンスを公開する予定です。現在の提案は以下のとおりです。

## モード A: オプトインテスト {: #mode-a }

アドテックは、Chrome トラフィックの一部について実験的な処置と制御グループのラベルを受け取ることができます。アドテックは、他のアドテックと連携して、たとえば、一貫した実験グループに対してサードパーティ Cookie を使用せずに [Protected Audience](/docs/privacy-sandbox/protected-audience/) オークションを実行することを選択できます。アドテックは、これらのラベルを独自の実験やテストに使用することもできます。

Chrome は、モード A のユーザーのサードパーティ Cookie の状態を変更しません。Chrome は、アドテックが一貫したコントロールグループと実験グループを使用して実験できるように、ラベルを提供するだけです。つまり、アドテックパートナーが実験に参加している場合でも、サイト運営者自身が使用する目的でサイト運営者のサイトがサードパーティ Cookie データを受け取る可能性があるということになります。

これにより、関係するすべてのサイトとサービスが連携して、プロセス内のどの時点でもサードパーティ Cookie が使用されないようにすることができる、有意義な実験が可能になると期待しています。最大 9% の Chrome ブラウザにラベルが提供される予定です。テストに興味がある方は、ラベルへのアクセス方法とラベルの粒度についてエコシステムから[フィードバック](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues)を提供することをお勧めします。

オプトインテストモードは 2023 年第 4 四半期から利用可能になる予定で、サードパーティ Cookie が廃止されるまでこのモードは継続されます。

## モード B: サードパーティ Cookie の 1% 廃止 {: #mode-b }

Chrome は最大 1% のブラウザに対してサードパーティ Cookie を廃止します。このモードはグローバルに適用されるため、オプトインはありません。もちろん、サイトが [CHIPS](/docs/privacy-sandbox/chips/) や [First-Party Sets](/docs/privacy-sandbox/first-party-sets/) などの代替ソリューションをまだ採用していない場合、一部のサイト機能が影響を受ける可能性があります。

{% Aside %}

サイトの機能としてサードパーティ Cookie データに依存している場合は、[サードパーティ Cookie の段階的廃止に備えるためのガイド](/docs/privacy-sandbox/third-party-cookie-phase-out/)を読んで、CHIPS または First-Party Sets がニーズに対応できるかどうかを理解してください。サードパーティ Cookie の廃止に起因するサイトの問題を報告できる[公開イシュートラッカー](https://goo.gle/report-3pc-broken)を開始しました。

{% endAside %}

私たちは、この段階でユーザーエクスペリエンスに影響を与えるイシューを検出し、対処し、サイト所有者に積極的に警告するための緩和策に取り組んでいます。

さらに、プライバシーサンドボックス広告関連 API が無効になっているモード B 内のトラフィックのごく一部を提供する予定です。First-Party Sets、CHIPS、FedCM などの他の API は無効になりません。この組み合わせは、サードパーティ Cookie を使用しないパフォーマンスのベースラインを確立するのに役立つと予想されており、このサブセットのテストに充てるトラフィックの適切な割合に関する[フィードバック](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing)を求めています。

2024 年第 1 四半期にサードパーティ Cookie の 1% を廃止する予定であり、廃止範囲を拡大するためのさらなる措置を講じる前に CMA と緊密に連携します。

## `Cookie-Deprecation` 値を介したラベルへのアクセス {: #cookie-deprecation-value}

モード A とモード B の期間中、オプトイン HTTP ヘッダーと JavaScript API 経由でアクセスできる一時的な `Cookie-Deprecation` 値を導入します。これにより、いずれかに該当する場合に、ブラウザの該当するモード A または B の実験グループ（上述の割合で定義）用のラベルが提供されます。実験が終了したら、この値は削除されます。

ラベルへのアクセスには、ユーザーのデバイスに保存されている情報へのアクセスが含まれます。一部の法域（EU や英国など）では、このアクティビティは Cookie の使用に類似しているため、ラベルにアクセスするにはエンド ユーザーの同意が必要になる可能性があると理解しています。ラベルのリクエストを開始する前に、この同意義務があなたに適用されるかどうかについて法的なアドバイスを求めることをお勧めします。

{% Aside %}

Chromium で出荷されるすべての機能と同様に、[Blink 開発プロセスの一環として Intent to Prototype を送信](/docs/privacy-sandbox/proposal-lifecycle/)します。以下の実装の詳細は Google が提案しているものですが、Chrome 安定版で**機能を出荷する前に変更される可能性があります**。このドキュメントの更新は継続して行われる予定です。また、この Intent が [blink-dev メーリングリスト](https://groups.google.com/a/chromium.org/g/blink-dev)に投稿されたら、公開ディスカッションをフォローすることもできます。

{% endAside %}

### `Sec-Cookie-Deprecation` HTTP ヘッダーへのアクセス

`Sec-Cookie-Deprecation` リクエストヘッダーを受信するには、サイトはまず、`receive-cookie-deprecation` Cookie を設定する必要があります。この Cookie は <code>[Partitioned attribute](/docs/privacy-sandbox/chips/)</code> を使用する必要があります。つまり、ヘッダーを受信するためのオプトインをトップレベルサイトごとに行う必要があるということです。

たとえば、`3p-example.site` が `example.com` に埋め込まれたリソースで `Sec-Cookie-Deprecation` ヘッダーを受信したい場合、`3p-example.site` はそのコンテキストで次の Cookie を設定する必要があります。

```text
Set-Cookie: receive-cookie-deprecation=1; Secure; HttpOnly; Path=/; SameSite=None; Partitioned;
```

`Secure`、`HttpOnly`、`Path`、`SameSite`、および `Partitioned` Cookie 属性は必須です。他の属性の `Domain`、`Expires`、および `Max-Age` はニースに応じて適切に設定できます。

ブラウザが `example_label_1 group` に属していると仮定すると、この Cookie を含む後続のリクエストには `Sec-Cookie-Deprecation` ヘッダーも含まれます。

```text
Sec-Cookie-Deprecation: example_label_1
```

ブラウザがグループに属していない場合、ヘッダーは送信されません。

ラベルは Cookie の存在に関連付けられているため、Cookie が削除されるとラベルも送信されなくなります。`Partitioned` 属性は、サードパーティ Cookie が完全に廃止になった後も継続して使用することを目的としているため、サードパーティ Cookie がブロックされるときに `Partitioned` Cookie が設定される可能性があります。

### cookieDeprecationLabel JavaScript API へのアクセス

`Cookie-Deprecation` 値には、`navigator.cookieDeprecationLabel.getValue()` JavaScript API を介してアクセスすることもできます。これにより、該当するグループラベルを含む文字列に解決される Promise が返されます。たとえば、ブラウザが `example_label_1` グループに属していた場合、以下のようになります。

```js
// Feature detect temporary API first
if ('cookieDeprecationLabel' in navigator) {
  // Request value and resolve promise
  navigator.cookieDeprecationLabel.getValue().then((label) => {
    console.log(label);
    // Expected output: "example_label_1"
  });
}
```

ブラウザがグループの一部ではない場合、値は `null` になります。

JavaScript API は `receive-cookie-deprecation` Cookie の存在に関係なく呼び出すことができます。

## フィードバック

ウェブエコシステム全体の多様な関係者からのフィードバックは、プライバシーサンドボックスイニシアチブにとって非常に重要です。専用の[フィードバックセクション](/docs/privacy-sandbox/feedback/)には、フォローしたりディスカッションに参加したりできる既存の公開チャンネルの概要と、いつでも Chrome チームに直接連絡できるフィードバックフォームが用意されています。

質問を管理するために、GitHub の開発者サポートリポジトリでは ["chrome-testing"](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing) ラベルを使用しています。以下の最初の質問に関するフィードバックやディスカッションをお待ちしています。

- [テストにはモード A とモード B のいずれか、または両方を使用していますか？](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/112)
- [Chrome が提供するテストのラベルサイズの選択](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/113)
- [Chrome が提供するテストでのクライアントヒントの使用](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/114)

「Chrome-facilitated testing」テンプレートを使用して、リポジトリ内に[新しい質問やディスカッションを作成](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose)することもできます。

{% Aside %}

英国の [Competition and Markets Authority](https://www.gov.uk/government/organisations/competition-and-markets-authority)（CMA）は、タイムライン、テスト方法、および次のステップに関する関連情報を記載した[プライバシーサンドボックス API のテストに関するガイダンス](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing)を公開しました。

{% endAside %}

開発者は、GitHub の [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問したり、ディスカッションに参加したりできます。

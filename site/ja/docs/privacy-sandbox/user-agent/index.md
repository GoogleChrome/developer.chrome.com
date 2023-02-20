---
layout: 'layouts/doc-post.njk'
title: User-Agent の情報量削減
subhead: >
  ブラウザが提供するデータを制限して機密情報が含まれないようにし、フィンガープリントを削減します。
description: ブラウザが提供するデータを制限して機密情報が含まれないようにし、フィンガープリントを削減します。
date: 2021-11-09
updated: 2022-07-28
authors:
  - alexandrawhite
---

## 実装ステータス

- [オリジントライアル中](/blog/user-agent-reduction-origin-trial/) Chrome 95 ～ 103
- [サポート終了トライアル中](/blog/user-agent-reduction-deprecation-trial/) Chrome 103 ～ Chrome 112
- [Chrome DevTools の統合](/blog/new-in-devtools-89/#ua-ch)
- [UA-CH Chrome プラットフォームのステータス](https://chromestatus.com/feature/5995832180473856)

## User-Agent の情報量削減とは

User-Agent（UA）の情報量削減とは、 [パッシブフィンガープリントに使用される](https://www.w3.org/2001/tag/doc/unsanctioned-tracking/#unsanctioned-tracking-tracking-without-user-control). 可能性のある User-Agent 文字列中の識別情報を最小限に抑える取り組みです。この [変更が展開される](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html), と、すべてのリソース リクエストには情報量が削減された `User-Agent` ヘッダーが含まれるようになります。その結果、いくつかの `Navigator` インターフェース `navigator.userAgent`、`navigator.appVersion`、`navigator.platform` など から返される値の情報量が削減されます。

ウェブ デベロッパーは、サイトのコードの中で User-Agent 文字列のインスタンスや使用に関係する部分を確認し、[User-Agent 文字列の情報量削減に備える](#prepare-and-test) 必要があります。User-Agent 文字列を解析することでデバイスのモデル、プラットフォームのバージョン、ブラウザのフルバージョンの情報を取得しているサイトの場合は、[User-Agent Client Hints API の実装](https://web.dev/migrate-to-ua-ch/) が必要になります。

User-Agent [の情報量削減のスケジュールに関する最新情報をご確認ください](https://www.chromium.org/updates/ua-reduction)。

{% Aside 'key-term' %}  [`User-Agent` 文字列](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) とは、HTTP リクエスト ヘッダーの一つです。これにより、サーバーやネットワークはユーザー エージェントのアプリケーション、オペレーティング システム（OS）、ベンダー、バージョンを識別できます。現在、`User-Agent` はすべての HTTP リクエストで提供され、JavaScript で内容を見ることができます。 {% endAside %}

### User-Agent Client Hints (UA-CH)

[User-Agent Client Hints](https://wicg.github.io/ua-client-hints/) を使用すると、User-Agent のすべてのデータを利用できます。ただし、サーバーが特定のデータに対する明確な必要性を能動的に宣言した場合に限ります。

受動的に開示されるユーザーデータを削除することで、リクエスト ヘッダーや JavaScript API などのメカニズムによって意図的に開示される情報の量を、より適切に調整し削減できます。

## UA の情報量削減と UA-CH が必要な理由

現在 User-Agent 文字列は、HTTP リクエストごとに、ユーザーのブラウザ、オペレーティング システム、バージョンを示す大きな文字列データをブロードキャストしています。これには、次の 2 つの問題があります。

- データが詳細かつ豊富であることから、ユーザーが特定される可能性がある
- この情報がデフォルトで利用可能であることから、密かなトラッキングが行われる可能性がある

デフォルトで提供される情報を基本的なもののみにすることで、ユーザーのプライバシーを強化できます。

情報量削減後の User-Agent には、リクエストを送信したパソコンまたはモバイルのブラウザのブランドとメジャー バージョン、プラットフォームが含まれます。それ以外のデータを利用する場合は、User-Agent Client Hints を使用して、ユーザーのデバイスや状態に関する特定の情報をリクエストします。

さらに `User-Agent` 文字列が長く複雑になったことで、文字列解析でエラーが発生しやすいという問題も生じています。UA-CH を使用すれば、構造化された信頼できるデータが提供され、解釈が容易になります。UA 文字列解析のための既存のコードがエラーになることはないはずですが、返される情報量は少なくなります。 [特定の情報が必要](https://wicg.github.io/ua-client-hints/#use-cases) なサイトの場合は、UA-CH への移行が必要になります。

## 情報量削減後の UA と UA-CH の機能

情報量削減後の UA と UA-CH がどのように機能するかについて、簡単な例を次に示します。より詳細な例については、[User-Agent Client Hints によるユーザーのプライバシーとデベロッパーエクスペリエンスの改善](https://web.dev/user-agent-client-hints/#example-exchange) をご覧ください。

ユーザーがブラウザを開き、アドレスバーに「`example.com` 」と入力します。

1. ブラウザがウェブページを読み込むためのリクエストを送信します。
    1. ブラウザは、`User-Agent` ヘッダーに情報量が削減された User-Agent 文字列を含めます。例: `User-Agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML,    like Gecko) Chrome/98.0.0.0 Mobile Safari/537.36`
    2. ブラウザは、デフォルトの User-Agent Client Hints ヘッダーにこれと同じ情報を含めます。次に例を示します。
        ```powershell
        Sec-CH-UA: "Chrome"; v="98"
        Sec-CH-UA-Mobile: ?1
        Sec-CH-UA-Platform: "Android"
        ```
2. サーバーは、`Accept-CH` レスポンス ヘッダーを使用して、追加の Client Hints を送信するようブラウザにリクエストできます。例:`Accept-CH: Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Model`
3. ブラウザは、ポリシーとユーザー設定に照らして、その後のリクエスト ヘッダーでサーバーに返すことができるデータを決定します。次に例を示します。
    ```powershell
    Sec-CH-UA: "Chrome"; v="93"
    Sec-CH-UA-Mobile: ?1
    Sec-CH-UA-Platform: "Android"
    Sec-CH-UA-Model: "Pixel 2"
    ```

### Critical Client Hints

最初のリクエストで特定の Client Hints のセットが必要な場合は、`Critical-CH` レスポンス ヘッダーを使用します。`Critical-CH` の値は、`Accept-CH` でリクエストされた値のサブセットである必要があります。

たとえば、最初のリクエストに `Device-Memory` と `Viewport-Width`に関するリクエストが含まれていたとします。ここでは、 `Device-Memory`  が必要不可欠とします。

```powershell
GET / HTTP/1.1
Host: example.com

HTTP/1.1 200 OK
Content-Type: text/html
Accept-CH: Device-Memory, Viewport-Width
Vary: Device-Memory, Viewport-Width
Critical-CH: Device-Memory
```

`Accept-CH header`  ヘッダーが処理された後にクライアントが Critical Hints を送信した場合、クライアントはリクエストを再試行します。

要約すると、`Accept-CH` はページにあると望ましいすべての値をリクエストするのに対し、 `Critical-CH` はページを適切に読み込むために必要不可欠な一部の値のみをリクエストします。詳しくは、[Client Hints の信頼性に関する仕様](https://github.com/WICG/client-hints-infrastructure/blob/main/reliability.md) をご覧ください。

## UA の情報量削減への準備方法 {: #prepare-and-test}

Stable 版 Chrome で情報量削減後の User-Agent が大規模に利用可能になるのに合わせて、User-Agent 文字列のインスタンスや使用に関係する [サイトのコードをご確認ください](https://web.dev/migrate-to-ua-ch/#audit-collection-and-use-of-user-agent-data) 。User-Agent 文字列を解析することでデバイスのモデル、プラットフォームのバージョン、ブラウザのフルバージョンの情報を取得しているサイトの場合は、 [UA-CH API の実装](https://web.dev/migrate-to-ua-ch/)が必要になります。

UA-CH API に更新したら、User-Agent から想定どおりのデータが得られることを確認するためのテストを行います。テスト方法は 3 つありますが、いずれもこれまでより複雑です。

情報量削減後の User-Agent が大規模に利用可能になるのは、完全に情報量が削減された UA 文字列がすべての Chrome デバイスで提供されるようになるときです。この情報量削減は、2022 年第 2 四半期の Chrome のマイナー リリースで開始される予定です。

### 文字列をローカル環境でテストする {: #test-locally}

情報量削減後の User-Agent をローカルでテストするには、次の方法を使用します。

-  `chrome://flags/#reduce-user-agent`  フラグを有効化する
    - これにより、ローカルのブラウザがすべてのサイトから情報量削減後の`user-agent` 文字列のみを受信するよう（それがデフォルトの設定になる前に）設定できます。
- DevTools で正しい `user-agent` 文字列と Client Hints を使ってエミュレートされたデバイスを設定する
    - DevTools {% Img src="image/C47gYyWYVMMhDmtYSLOWazuyePF2/gznkUDBvjL2bg44T30ij.png", alt="画面の右上で", width="28", height="28" %} &gt; **設定** &gt;**&nbsp;[デバイス]** &gt;**&nbsp;[カスタム デバイスを追加]** をクリックし、必要な  `user-agent` 文字列と User-Agent Client Hints 値の組み合わせを提供するようエミュレートされたデバイスを構成します。
    - DevTools 画面の左上で {% Img src="image/C47gYyWYVMMhDmtYSLOWazuyePF2/eLRsSnxmkhz0yKsXTjxD.png", alt="ALT_TEXT_HERE", width="30", height="32" %} **T [デバイスのツールバーを切り替え]** をクリックして DevTools の UI を開き、デバイスをエミュレートします。
- Chrome を `「--user-agent="（ここにカスタム文字列を記述）"」` 付きで起動する
    - この[コマンドラインフラグ](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) を使用して、カスタム User-Agent 文字列を付けて Chrome を起動します。

### サイト上のコードで文字列を変換する

既存の Chrome の `user-agent` 文字列をクライアントサイドまたはサーバーサイドのコードで処理している場合、その文字列を新しい形式に変換することで互換性をテストできます。オーバーライドと置き換えによりテストすることも、新しいバージョンを作成して並列にテストすることもできます。

 [User-Agent の情報量削減スニペット](/docs/privacy-sandbox/user-agent/snippets/) で、正規表現の例をご確認ください。

### オリジン トライアルで実際のユーザー トラフィックをテストする

[Chrome オリジントライアルに登録](/origintrials/#/view_trial/-7123568710593282047) することにより、ご使用のプラットフォームで実際のユーザートラフィックにおける情報量削減後の User-Agent をテストできます。

他のウェブサイトに埋め込まれるコンテンツ（つまり、サードパーティのコンテンツ）を作成している場合は、[サードパーティのオリジントライアル](/blog/third-party-origin-trials/) に参加して複数のサイトにわたってこの変更をテストできます。Chrome オリジン トライアルに登録する際に「サードパーティ マッチング」のオプションを選択すると、サイトがサードパーティに埋め込まれるときにスクリプトを挿入できます。

## Client Hints と Critical Hints のサポート

サーバーに返される[デフォルトの Client Hints](https://web.dev/migrate-to-ua-ch/#are-you-only-using-basic-user-agent-data) は 3 つあります。これには、ブラウザー名とメジャー バージョン、ブラウザーがモバイル デバイス上にあるかどうかを示すブール値、およびオペレーティング システム名が含まれます。これらは TLS ハンドシェイクの後に送信されます。これらは既に利用可能で、ブラウザでサポートされています。

ただし、サイトをレンダリングするために重要な情報を取得する必要がある場合があります。

### Critical Hints を最適化する

{% Aside 'warning' %}

Critical Hints を使用することはめったにないはずなので、実装の理由を確認してください。考えるべきなのは、最初のページ読み込みで拡張データが必要かどうかです。この情報がないとページの読み込みに失敗しますか?

{% endAside %}

Transport Layer Security プロトコル (TLS) ハンドシェイクは、ブラウザーと Web サーバー間の安全な接続を確立するための最初のステップです。 [Critical-CH レスポンス ヘッダー](https://www.ietf.org/archive/id/draft-davidben-http-client-hint-reliability-03.html#name-the-critical-ch-response-he)は、最初のリクエストが Critical Hints なしで送信された場合、ブラウザにリクエストをすぐに再試行するように指示するように設計されています。

<figure>{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/Ce0SL7g881Kjoa0VyhUc.png", alt="Critical Hints を含む Client Hints のシーケンス図", width="800", height="939" %}<figcaption>サーバーから重要なヒントが要求されると、クライアントは重要なヒントを含む Web ページの最初のリクエストの送信を再試行します。この例では、 <code>Sec-CH-UA-Model</code>のヒントが 2 回リクエストされます。1 回目は<code>Accept-CH</code>を使用した Client Hints として、2 回目は<code>Critical-CH</code>を使用した Critical Hints としてリクエストされます。</figcaption></figure>

Critical Hints ( [`Critical-CH`ヘッダー](https://groups.google.com/a/chromium.org/g/blink-dev/c/zPYGbULXn7o/m/q3OJ2kZAAQAJ)) を最適化するには、このハンドシェイクをインターセプトし、Client Hints のモデルを提供する必要があります。これらの手順は複雑な場合があり、高度な知識が必要です。

[`ACCEPT_CH` HTTP/2 および HTTP/3 フレーム](https://datatracker.ietf.org/doc/html/draft-davidben-http-client-hint-reliability-02#section-4)は、 [TLS ALPS 拡張機能](https://github.com/vasilvv/tls-alps)と組み合わせて、最初の HTTP リクエストに間に合うようにサーバーの Client Hints 設定を配信するための接続レベルの最適化です。これらには複雑な構成が必要なため、本当に重要な情報にのみ使用することをお勧めします。 BoringSSL (OpenSSL のフォーク) は、Chromium で Google の実験的な機能を操作するのに役立ちます。現時点では、ALPS は[BoringSSL にのみ実装されています](https://commondatastorage.googleapis.com/chromium-boringssl-docs/ssl.h.html#Application-layer-protocol-settings)。

Critical Hints を使用する必要がある場合は、 [Critical Hints の信頼性と最適化](https://docs.google.com/document/d/1HQd3vosjFls2jp6DwpkNMUN4CBdmmxZJJz0WhhcqOPw/edit?usp=sharing)に関するガイドを参照してください。

## 意見交換とフィードバックの提供

- **オリジン トライアル**: [フィードバックを共有しましょう。](https://github.com/miketaylr/user-agent-reduction/issues).
- **デモ:** [User-Agent の情報量削減のデモ](https://uar-ot.glitch.me/) をお試しください。
- **GitHub**: の確認 [UA-CH に関する提案](https://github.com/WICG/ua-client-hints), [質問の投稿、意見交換](https://github.com/WICG/ua-client-hints/issues) を行えます。
- **デベロッパー サポート**: で質問や意見交換を行えます [プライバシー サンドボックスデベロッパー サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## 詳細

- [ユーザー プライバシーとデベロッパーエクスペリエンスの改善に関するウェブデベロッパー向け概要](https://web.dev/user-agent-client-hints/): に関するウェブデベロッパー向け概要
- [UA 文字列から UA-CH に移行する](https://web.dev/migrate-to-ua-ch/): ためのウェブデベロッパー向けチュートリアル
- [User-Agent の情報量削減スニペット](/docs/privacy-sandbox/user-agent/snippets/): （テストのために現在の User-Agent 文字列を情報量削減後の形式に変換するコード スニペット）
- [プライバシーサンドボックスの詳細](https://web.dev/digging-into-the-privacy-sandbox)

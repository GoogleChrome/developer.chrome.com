---
layout: 'layouts/doc-post.njk'
title: 'Fenced Frames'
subhead: >
  クロスサイトデータを共有することなく、コンテンツをページに安全に埋め込むことができます。
description: |
  クロスサイトデータを共有することなく、コンテンツをページに安全に埋め込むことができます。
authors:
  - jackjey
  - alexandrawhite
  - kevinkiklee
date: 2022-03-07
updated: 2022-05-10
---

## 実装状況

この文書では、新しい HTML 要素 `<fencedframe>` の提案の概要について説明します。

*  M102 ～ M105 の[プライバシーサンドボックス統合オリジントライアル](/origintrials/#/view_trial/771241436187197441)で Fenced Frames を試してください。 [オリジントライアルを設定](/blog/privacy-sandbox-unified-origin-trial/)する方法を習得し、[フィードバック/ディスカッションに参加](https://github.com/WICG/fenced-frame/issues)してください。
*  [Fenced Frames 提案](https://github.com/shivanigithub/fenced-frame)
*  [Chrome プラットフォームのステータス](https://chromestatus.com/feature/5699388062040064)
*  この機能は、[Chrome フラグを有効にすることで提供](#try-fenced-frames)されています。
*  [プライバシーサンドボックスタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)は、Fenced Frames やその他の提案の実装タイミングを提供します。

## Fenced Frames が必要な理由

Fenced Frames (`<fencedframe>`) は、iframe と同様に、埋め込まれた コンテンツ向けに提案された HTML 要素です。 Fenced Frames は、iframe とは異なり、埋め込みコンテキストとの通信を制限し、フレームが埋め込みコンテキストとは共有されずにクロスサイトデータにアクセスできるようにします。 一部のプライバシーサンドボックス API では、[Fenced Frames 内でレンダリングする文書を選択する必要がある](#use-cases)場合があります。

同様に、埋め込みコンテキストのファーストパーティデータは、Fenced Frames と共有できません。

```html
<fencedframe src="https://3rd.party.example"></fencedframe>
```

たとえば、`news.example` (埋め込みコンテキスト) が `shoes.example` の広告を Fenced Frames に埋め込んだとします。 `news.example` は `shoes.example` 広告からデータを抽出できません。また、`shoes.example` は `news.example` のファーストパーティデータを認識できません。

### ストレージパーティショニングによるクロスサイトプライバシーの強化

Web を閲覧しているときに、あるサイトで商品を見た後に、まったく別のサイトの広告でその商品が表示されたという経験があると思います。

現在、この広告手法は、主に、サードパーティの Cookie を使用してサイト間で情報を共有するトラッキング技術によって実現されています。 [Chrome はこの技術を段階的に廃止](https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/)し、プライバシー保護を強化する他の技術で置き換えることを約束しています。

Chrome チームは[ストレージ パーティション](https://github.com/privacycg/storage-partitioning)に取り組んでいます。これは、サイトごとにブラウザストレージを分離する技術です。  つまり、`frame.example` や `site.example` のように、同じ eTLD+1 でサイトに埋め込まれた iframes がブラウザストレージを共有できることを意味します。 `frame.example` や `site.other` のように、ホスト名が異なるサイトに埋め込まれた iframe は、ブラウザストレージを共有しません。

ストレージパーティショニングは、localStorage、indexedDB、および Cookie といった標準ストレージ API に適用されます。 パーティション分割された環境では、ファーストパーティのストレージ全体の情報漏えいが大幅に減少します。

### クロスサイトデータの処理 {: #cross-site-data }

Fenced Frames は[プライバシーサンドボックス提案](/docs/privacy-sandbox/overview/)であり、最上位のサイトがデータをパーティション分割する必要があることを提言しています。 多くのプライバシーサンドボックス提案は、サードパーティ Cookie やその他のトラッキングメカニズムを使用せずに、クロスサイトユースケースを満たすことを目指しています。 たとえば、次のようになります。

*  [FLEDGE](/docs/privacy-sandbox/fledge/) では、プライバシーを保護しながら、インタレストベース広告サービスを実現できます。
*  [共有ストレージ](https://github.com/pythagoraskitty/shared-storage)では、安全な環境で、パーティション分割されていないクロスサイトデータにアクセスできます。

[FLEDGE](/docs/privacy-sandbox/fledge/) 提案では、Fenced Frames がどのように機能するかを考えてみましょう。 FLEDGE を使用すると、ユーザーの関心と、ユーザーが関心を持つ可能性がある広告が、広告主のサイトで[関心グループ](/docs/privacy-sandbox/fledge/#interest-group-detail)に登録されます。 次に、別のサイト (「パブリッシャー」) で、関連する関心グループに登録された広告がオークションにかけられ、勝った広告が Fenced Frames に表示されます。

パブリッシャーが勝った広告を iframe に表示し、スクリプトが iframe の `src` 属性を読み取れる場合、パブリッシャーはその広告の URL から訪問者の関心に関する情報を推測できます。 これではプライバシーが保護されていません。

Fenced Frames では、パブリッシャーは訪問者の関心と一致する広告を表示できますが、`src` と関心グループは、フレーム内の広告主にのみ認識されます。 パブリッシャーはこの情報にアクセスできませんでした。

## Fenced Frames の仕組み

Fenced Frames は、FLEDGE API 広告オークションで勝った広告から作成されます。 FLEDGE API から取得された情報は、広告自体の URL ではありませんが、[不透明なソース](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/opaque_src.md)になります。

{% Aside 'key-term' %}
_不透明なソース_ は、[UUID の Uniform Resource Name (URN)](https://datatracker.ietf.org/doc/html/rfc4122) で表されます。 したがって、不透明なソースは、`http://example.com` (URL) ではなく、`urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a`として表されます。 URN スキームは永続的で、場所に依存しない識別子です。つまり、リソース (広告クリエイティブなど) を検索するために使用することはできません。
{% endAside %}

不透明なソースを使用すると、サイトの所有者に広告のソース URL を公開しなくても、サイトで広告を表示できます。

広告を表示するだけでは十分ではありません。 iframe のように、広告がパブリッシャーのサイトに `postMessage` を送信できる場合、表示されているの広告のコンテンツがリークする可能性があります。 そのため、Fenced Frames は、iframe とは異なり、[postMessage](https://developer.mozilla.org/docs/Web/API/Window/postMessage) を使用して最上位のサイトと通信できません。

Fenced Frames は、他の方法でパブリッシャーから分離されます。 たとえば、パブリッシャーは Fenced Frame 内の DOM にアクセスできず、 Fenced Frames はパブリッシャーの DOM にアクセスできません。 さらに、`name` などの属性は、任意の値に設定し、パブリッシャーが観察することができますが、Fenced Frames では使用できません。

Fenced Frames は、[トップレベルブラウジングコンテキスト](https://html.spec.whatwg.org/multipage/browsers.html#top-level-browsing-context) (ブラウザタブなど) のように動作します。 Fenced Frames の特性は、[Explainer](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/README.md)で詳しく説明されています。

### Fenced Frames と iframe を比べたときの違い {: #compare }

Fenced Frames でできることとできないことを理解したところで、わかりやすくするために、既存の iframe 機能と比較してみます。

| 機能                                | `<iframe>` | `<fencedframe>` |
| --------------------------------- | ---------------- | --------------------- |
| 埋め込みコンテンツ                         | はい               | はい                    |
| 埋め込みコンテンツは埋め込みコンテキスト DOM にアクセスできる | はい               | いいえ                   |
| 埋め込みコンテキストは埋め込みコンテンツ DOM にアクセスできる | はい               | いいえ                   |
| `name` などの監視可能な属性                 | はい               | いいえ                   |
| URL (`http://example.com`)        | はい               | はい (モードに依存)           |
| ブラウザが管理する不透明なソース (`urn: uuid`)    | いいえ              | はい                    |
| パーティション分割されていないストレージへのアクセス        | いいえ              | はい                    |

Fenced Frames では、プライバシーを保護するために、サポートされている外部通信オプションの数が少なくなっています。

### Fenced Frames は iframe に取って代わるのか

最終的には、Fenced Frames は iframe に取って代わることはなく、それらを使用する必要もありません。 Fenced Frames は、異なる最上位のパーティションのデータを同じページに表示する必要があるときに使用できる、よりプライベートなフレームとして提案されています。

同じサイトの iframe (フレンドリな iframe) は、信頼できるコンテンツと見なされます。

## Fenced Frames の使用 {: #use-cases }

Fenced Frames は、他のプライバシーサンドボックス提案と連携し、1 つのページ内にさまざまなストレージパーティションの文書を表示します。 候補の API は現在検討中です。

この組み合わせの現在の候補は次のとおりです。

* [TURTLEDOVE API](https://github.com/WICG/turtledove) ファミリー (FLEDGE の基礎) から、Fenced Frames は、[共有ストレージ](https://github.com/pythagoraskitty/shared-storage)を使用して、[コンバージョン リフト測定](https://github.com/w3c/web-advertising/blob/main/support_for_advertising_use_cases.md#conversion-lift-measurement)と連動します。
* もう一つのオプションは、Fenced Frames を[読み取り専用](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md#read-only)にするか、[パーティション分割されていないストレージにアクセス](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md#unpartitioned-storage)できるようにすることです。

詳細については、[Fenced Frames Explainer](https://github.com/shivanigithub/fenced-frame/blob/master/explainer/modes.md) を参照してください。


### 例

`<fencedframe>` 内の埋め込みコンテンツは `src` 属性で記述されます。

```html
<fencedframe src="demo_fenced_frame.html"></fencedframe>
```

ブラウザは、特定のユースケース API の要求に応じて、Fenced Frames `src` の不透明な URL を生成する場合があります。 たとえば、FLEDGE 広告オークションが実行されている場合、ブラウザは `urn: uuid` を生成できます。これは、勝った広告クリエイティブの URL にマッピングされます。 その `urn:uuid` を Fenced Frames で使用して、勝った広告を表示できます。

```html
<fencedframe src="urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a" mode="opaque-ads" ></fencedframe>
```

Fenced Frames は、`postMessage` を使用して親要素と通信できないことを覚えておいてください。 ただし、Fenced Frames は、トップレベルブラウジングコンテキストのように動作するため、Fenced Frames の子である iframe で `postMessage` を使用できます。

ブラウザは、Fenced Frames と Fenced Frames 内に埋め込まれた iframe からの要求に対して、`Sec-Fetch-Dest: fencedframe` を設定します。

```http
Sec-Fetch-Dest: fencedframe
```

#### サーバーオプトイン

文書を Fenced Frames に読み込むには、サーバーで `Supports-Loading-Mode: fenced-frame` 応答ヘッダーを設定する必要があります。 ヘッダーは、Fenced Frames 内のすべての iframe にも存在する必要があります。

```http
Supports-Loading-Mode: fenced-frame
```

## Fenced Frames を試す

[Chrome フラグを使用](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)すると、`chrome://flags/#enable-fenced-frames` で Fenced Frame API を有効にできます。

{% Img src="image/PV7xjXdOKHP8LWt9XhstsToJeK82/AeU7fj1b3I9dfnqkDc6h.png", alt="Chrome Experiments で Enable the Fenced frame element というフラグを Enabled に設定する", width="800", height="211" %}

ダイアログには複数の選択肢があります。 ****Enable**** を選択することを強くお勧めします。これにより、Chrome は新しいアーキテクチャ が利用可能になったときに自動的に更新されます。

他のオプションの **Enabled with ShadowDOM** および **Enabled with multiple page architecture** は、ブラウザエンジニアにのみ関連する別の実装ストラテジを提供します。 現在、**Enable** は **Enabled with ShadowDOM** と同じように動作します。 今後、**Enable** は **Enable with multiple page architecture** にマッピングされます。

### 機能の検出

Fenced Frames が定義されているかどうかを判断するには、次の手順を実行します。

```js
if (window.HTMLFencedFrameElement) {
  // The fenced frame element is defined
}
```

### ブラウザのサポート

`<fencedframe>` 要素はまだ実験モードであるため、現在は Chrome 97 以降でサポートされています。 現時点では、[他のブラウザではサポートされていません](https://chromestatus.com/feature/5699388062040064#consensus)。

## 貢献とフィードバックの共有

Fenced Frames の提案は現在も検討中であるため、今後変更される可能性があります。 この API を試して、フィードバックがある場合は、ぜひお聞かせください。

*  **GitHub**: [提案](https://github.com/shivanigithub/fenced-frame)を読んで、 [質問を挙げ、ディスカッションをフォロー](https://github.com/shivanigithub/fenced-frame/issues)できます。
*  **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。

## 詳細

*  [Chrome プラットフォームのステータス](https://chromestatus.com/feature/5699388062040064)
*  [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/Ko9UXQYPgUE/m/URRsB-qvAAAJ)

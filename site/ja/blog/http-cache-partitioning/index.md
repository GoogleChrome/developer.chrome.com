---
layout: layouts/blog-post.njk
title: キャッシュをパーティション化してセキュリティとプライバシーを確保する
description: Chrome の HTTP キャッシュ パーティションは、セキュリティとプライバシーの向上に役立ちます。
authors:
  - agektmr
date: 2020-10-06
updated: 2020-10-24
---

一般に、キャッシュは、データを保存することで同じデータに対する将来のリクエストをより迅速に処理できるようにするため、パフォーマンスを向上させることができます。たとえば、ネットワークからリソースをキャッシュすることで、サーバーへのラウンド トリップを回避することが可能です。計算結果がキャッシュされるため、同じ計算を行う時間が省略されます。

Chrome では、キャッシュの仕組みがさまざまな方法で使用されています。HTTP キャッシュはその一例です。

## Chrome の HTTP キャッシュの現在の仕組み

バージョン 85 の時点では、Chrome はネットワークから取得したリソースをキャッシュし、それぞれのリソース URL をキャッシュ キーとして使用します（キャッシュキーは、キャッシュされたリソースを識別するために使用されます）。

以下の例は、単一の画像がどのようにキャッシュされて 3 つの異なるコンテキストで処理されるかを示しています。

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/zqkRCKG9jR3uBtcEwPgV.png", alt="キャッシュキー: https://x.example/doge.png", width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://x.example/doge.png</code> }</figcaption></figure>

ユーザーが、画像（`https://x.example/doge.png`）をリクエストするページ（`https://a.example`）にアクセスします。画像はネットワークからリクエストされ、`https://x.example/doge.png` をキーとして使用してキャッシュされます。

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/sXZTOs9iABokE7VsOoXT.png", alt="キャッシュキー: https://x.example/doge.png", width="570", height="433" %} <figcaption> <b>キャッシュキー</b>: { <code>https://x.example/doge.png</code> }</figcaption></figure>

同じユーザーが別のページ（`https://b.example`）にアクセスし、同じ画像（`https://x.example/doge.png`）をリクエストします。<br>ブラウザは、HTTP キャッシュをチェックして、画像 URL をキーとして使用して、このリソースが既にキャッシュされているかどうかを確認します。ブラウザはキャッシュ内で一致するものを見つけるため、キャッシュされたバージョンのリソースを使用します。

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/c8jEGuxXemlwMbezevOc.png", alt="キャッシュキー: https://x.example/doge.png", width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://x.example/doge.png</code> }</figcaption></figure>

画像が iframe 内から読み込まれるかどうかは問題ではありません。ユーザーが iframe（`https://d.example`）のある別のウェブサイト（`https://c.example`）にアクセスし、その iframe が同じ画像（`https://x.example/doge.png`）をリクエストした場合、キャッシュキーはすべてのページで同じであるため、ブラウザはキャッシュから画像を読み込めます。

この仕組みは、パフォーマンスの観点からは長い間うまく機能してきましたが、ウェブサイトが HTTP リクエストに応答するのにかかる時間によって、ブラウザが過去に同じリソースにアクセスしたことが明らかになるため、ブラウザが次のようなセキュリティとプライバシー攻撃にさらされる可能性がでてきました。

- **ユーザーが特定のサイトにアクセスしたかどうかを検出**: 攻撃者は、特定のサイトまたはサイト郡に固有のリソース キャッシュがあるかどうかを確認することで、ユーザーの閲覧履歴を検出できます。
- **[クロスサイト検索攻撃](https://portswigger.net/daily-swig/new-xs-leak-techniques-reveal-fresh-ways-to-expose-user-information)**: 攻撃者は、特定のウェブサイトで使用される「検索結果なし」の画像がブラウザのキャッシュにあるかどうかを確認することで、ユーザーの検索結果に任意の文字列が含まれているかどうかを検出できます。
- **クロスサイトトラッキング**: クロスサイトトラッキングの仕組みとして、Cookie のような識別子を格納するためにキャッシュを使用できます。

これらのリスクを軽減するために、Chrome は Chrome 86 以降、HTTP キャッシュを分割することにしました。

## キャッシュのパーティション化は Chrome の HTTP キャッシュにどのように影響しますか？

キャッシュ パーティションでは、キャッシュされたリソースは、リソース URL に加えて新しい「ネットワーク分離キー」を使用するキーとなります。ネットワーク分離キーは、トップレベルサイトと現在のフレームのサイトで構成されます。

{% Aside %} 「サイト」は「[scheme://eTLD+1](https://web.dev/same-site-same-origin/)」を使用して認識されるため、リクエストが異なるページからのものであっても、同じスキームと有効なトップレベルドメイン+1 を持つ場合、同じキャッシュ分割が使用されます。詳細については、「[「same-site」と「same-origin」を理解する](https://web.dev/same-site-same-origin/)」をご覧ください。 {% endAside %}

前の例をもう一度見て、さまざまなコンテキストでキャッシュ パーティションがどのように機能するかを確認しましょう。

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/zqkRCKG9jR3uBtcEwPgV.png", alt="キャッシュキー { https://a.example, https://a.example, https://x.example/doge.png}" , width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://a.example</code>, <code>https://a.example</code>, <code>https://x.example/doge.png</code> }</figcaption></figure>

ユーザーが、画像（`https://x.example/doge.png`）をリクエストするページ（`https://a.example`）にアクセスします。この場合、画像はネットワークからリクエストされ、`https://a.example`（トップレベルサイト）、`https://a.example`（現在のフレームのサイト）、および `https://x.example/doge.png`（リソース URL）で構成されるタプルをキーとして使用してキャッシュされます。（リソースリクエストがトップレベルフレームからのものである場合、ネットワーク分離キーのトップレベルサイトと現在のフレームのサイトは同じであることに注意してください。）

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/sXZTOs9iABokE7VsOoXT.png", alt="キャッシュキー { https://a.example, https://a.example, https://x.example/doge.png}" , width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://b.example</code>, <code>https://b.example</code>, <code>https://x.example/doge.png</code> } </figcaption></figure>

同じユーザーが、同じ画像（`https://x.example/doge.png`）をリクエストする別のページ（`https://b.example`）にアクセスします。先ほどの例でも同じ画像を読み込んでいましたが、キーが一致しないためキャッシュヒットにはなりません。

画像はネットワークからリクエストされ、`https://b.example`、`https://b.example`、および `https://x.example/doge.png` で構成されるタプルをキーとして使用してキャッシュされます。

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/kr9TtbDQPQfR86rNSrJX.png", alt="キャッシュキー { https://a.example, https://a.example, https://x.example/doge.png}" , width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://a.example</code>, <code>https://a.example</code>, <code>https://x.example/doge.png</code> } </figcaption></figure>

次に、ユーザーは `https://a.example` に戻りますが、今回は画像（`https://x.example/doge.png`）が iframe に埋め込まれています。この場合、キーは `https://a.example`、`https://a.example`、および `https://x.example/doge.png` を含むタプルであるため、キャッシュヒットが発生します。（トップレベルサイトと iframe が同じサイトの場合、トップレベルフレームでキャッシュされたリソースが使用されることに注意してください。）

<div class="clearfix"></div>

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/BIJfNKd7YfXuXR3xdafb.png", alt="キャッシュキー { https://a.example, https://a.example, https://x.example/doge.png}" , width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://a.example</code>, <code>https://c.example</code>, <code>https://x.example/doge.png</code> } </figcaption></figure>

ユーザーは `https://a.example` に戻りますが、今回は画像が `https://c.example` の iframe にホストされています。

この場合、`https://a.example`、`https://c.example`、および `https://x.example/doge.png` で構成されるキーに一致するリソースがキャッシュにないため、画像はネットワークからダウンロードされます。

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Gg99hTwbcxc3DdUtgdnM.png", alt="キャッシュキー { https://a.example, https://a.example, https://x.example/doge.png}" , width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://a.example</code>, <code>https://c.example</code>, <code>https://x.example/doge.png</code> } </figcaption></figure>

ドメインにサブドメインまたはポート番号が含まれている場合はどうでしょうか？ユーザーは、画像をリクエストする iframe（`https://c.example:8080`）が埋め込まれた `https://subdomain.a.example` にアクセスします。

キーは「scheme://eTLD+1」に基づいて作成されるため、サブドメインやポート番号は無視されます。したがって、キャッシュヒットが発生します。

<figure class="float-left">{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/47mGHE7I9qlFpPER12CL.png", alt="キャッシュキー { https://a.example, https://a.example, https://x.example/doge.png}" , width="570", height="433" %}<figcaption><b>キャッシュキー</b>: { <code>https://a.example</code>, <code>https://c.example</code>, <code>https://x.example/doge.png</code> } </figcaption></figure>

iframe が何度もネストされている場合はどうでしょうか？ユーザーが `https://a.example` にアクセスすると、iframe（`https://b.example`）が埋め込まれ、さらに別の iframe（`https://c.example`）が埋め込まれ、最終的に画像がリクエストされます。

トップフレーム（`https://a.example`）とリソースを読み込むフレームそのもの（`https://c.example`）からキーが取得されるため、キャッシュヒットが発生します。

## よくある質問

### Chrome で既に有効になっていますか？どうすれば確認できますか？

この機能は 2020 年後半あたりにロールアウトされています。ご利用の Chrome インスタンスが既にサポートしているかどうかを確認するには、以下を行ってください。

1. `chrome://net-export/` を開き、**Start Logging to Disk** を押します。
2. ログファイルを保存するコンピュータ上の場所を指定します。
3. Chrome で 1 分間、ウェブを閲覧します。
4. `chrome://net-export/` に戻り、**Stop Logging** を押します。
5. `https://netlog-viewer.appspot.com/#import` に移動します。
6. **Choose File** を押して、保存したログファイルを指定します。

ログファイルの出力が表示されます。

同じページで、`SplitCacheByNetworkIsolationKey` を探します。後に `Experiment_[****]` が続く場合、Chrome で HTTP キャッシュのパーティション化が有効になっています。`Control_[****]` または `Default_[****]` が続く場合は、有効になっていません。

### Chrome で HTTP キャッシュのパーティション化をテストするには？

Chrome で HTTP キャッシュのパーティション化をテストするには、`--enable-features=SplitCacheByNetworkIsolationKey` というコマンドラインフラグを使用して Chrome を起動する必要があります。ご利用のプラットフォームでコマンドラインフラグを指定して Chrome を起動する方法については、「[フラグを指定して Chromium を実行する](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)」の手順をご覧ください。

### ウェブ開発者はこの変更に応じて何らかのアクションが必要ですか？

これは重大な変更ではありませんが、一部のウェブサービスのパフォーマンスに関する考慮事項が発生する可能性があります。

たとえば、多くのサイトで非常にキャッシュ可能な大量のリソース（フォントや一般的なスクリプトなど）を提供している場合は、トラフィックが増加する可能性があります。また、そのようなサービスを利用する人の依存度がさらに高まる可能性があります。

（[Web Shared Libraries](https://docs.google.com/document/d/1lQykm9HgzkPlaKXwpQ9vNc3m2Eq2hF4TY-Vup5wg4qg/edit#) と呼ばれる、プライバシーを保護する方法で共有ライブラリを有効にする提案（[プレゼンテーション動画](https://www.youtube.com/watch?v=cBY3ZcHifXw)）がありますが、まだ検討中です。）

### この動作変更によってどのような影響がありますか？

全体的なキャッシュミス率は約 3.6% 増加し、FCP（First Contentful Paint）への変更はやや増加（約 0.3%）し、ネットワークから読み込まれるバイトの全体的な割合は約 4% 増加します。パフォーマンスへの影響について詳しくは、[HTTP キャッシュ分割の Explainer](https://github.com/shivanigithub/http-cache-partitioning#impact-on-metrics) をご覧ください。

### これは標準化されていますか？他のブラウザの動作は異なりますか？

「HTTP キャッシュ パーティション」は[フェッチ仕様で標準化されています](https://fetch.spec.whatwg.org/#http-cache-partitions)が、ブラウザの動作はそれぞれに異なります。

- **Chrome**: トップレベルの scheme://eTLD+1 とフレームの scheme://eTLD+1 を使用
- **Safari**: [トップレベル eTLD+1](https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/) を使用
- **Firefox**: トップレベル scheme://eTLD+1 での[実装を計画](https://bugzilla.mozilla.org/show_bug.cgi?id=1536058)しており、Chrome のような 2 つ目のキーを含めることを検討中

### ワーカーからのフェッチはどのように処理されますか？

専用ワーカーは、現在のフレームと同じキーを使用します。Service Worker と Shared Worker は、複数のトップレベルサイト間で共有される可能性があるため、より複雑です。それらの解決策については現在議論中です。

## リソース

- [Storage Isolation Project](https://docs.google.com/document/d/1V8sFDCEYTXZmwKa_qWUfTVNAuBcPsu6FC0PhqMD6KKQ/edit#heading=h.oixrt0wpp8h5)
- [Explainer - HTTP キャッシュの分割](https://github.com/shivanigithub/http-cache-partitioning)

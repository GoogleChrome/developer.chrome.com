---
layout: layouts/blog-post.njk
title: User-Agent 削減オリジントライアル
subhead: ''
description: Chrome 95 ベータ版以降、オリジントライアルにより、サイトは削減された User Agent 文字列の受信にオプトインできます。これらの文字列には、ブラウザのブランドと重要なバージョン、デスクトップとモバイルの区別、およびそれが実行されているプラットフォームのみが含まれます。
authors:
  - arichiv
  - abeyad
date: 2021-09-14
updated: 2022-01-07
tags:
  - privacy
  - origin-trials
  - chrome-95
---

User-Agent 削減は、[User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)（UA）文字列内の情報をブラウザのブランドと重要なバージョン、デスクトップとモバイルの区別、およびそれが実行されているプラットフォームのみに縮小することにより、パッシブフィンガープリンティングのサーフェスを削減する取り組みです。現在、UA 文字列はすべての HTTP リクエストで共有され、ブラウザによって読み込まれたすべてのリソースに JavaScript で公開されます。ブラウザ、ブラウザが実行されているプラットフォーム、およびその機能に関する重要な情報が含まれています。[User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)（UA-CH）では、サイトが必要な UA 情報のみを要求できるようにしながら、完全な UA 文字列と同じ情報を提供することが可能です。

[Chrome 95](https://chromiumdash.appspot.com/schedule) ベータ版より、[User-Agent 削減](/origintrials/#/view_trial/-7123568710593282047)の[オリジントライアル](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)を開始し、削減された UA 文字列をサイトが今すぐ受け取ることを選択できるようにします。これにより、削減された UA が Chrome のデフォルトの動作になる前に、サイトがイシューを見つけて修正できるようになります（削減は [2022 年の第 2 四半期](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)に開始される予定です）。安定版ユーザーにリリースする前に、95 のベータユーザーを対象にオリジントライアルをテストしたい場合は、Chrome 95 のリリース日（[現在の予定](https://chromiumdash.appspot.com/schedule)では、2021 年 10 月 19 日となっています）までに必ずオプトインしてテストしてください。

以下はオリジントライアルの概要と今後の予定です。いつものように、UA Reduction [GitHub リポジトリ](https://github.com/miketaylr/user-agent-reduction/issues)でこのトライアルのフィードバックやイシューをお知らせください。

## User-Agent とは

[User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)（UA）文字列は、すべての HTTP リクエストで共有され、ブラウザによって読み込まれたすべてのリソースに JavaScript で公開されます。現在、ブラウザとそれが実行されているプラットフォームに関する重要な情報が含まれています。

## User-Agent が削減される理由

User-Agent 削減は、Chrome ブラウザのパッシブ フィンガープリンティング サーフェスを削減するための取り組みで、2020 年 1 月に最初に発表されました。UA 文字列の情報を、ブラウザのブランドと重要なバージョン、デスクトップとモバイルの区別、およびそれが実行されているプラットフォームのみに縮小することにより、個々のユーザーの識別がより困難になります。

## ウェブ開発者にとっての意味

サイトは、削減された UA 文字列を受け取る準備をし、オリジントライアルへの参加を検討する必要があります（詳細は以下をご覧ください）。削減された User Agent値は以下の場所に表示されます。

- `User-Agent` HTTP リクエストヘッダー
- `navigator.userAgent` Javascript ゲッター
- `navigator.platform` Javascript ゲッター
- `navigator.appVersion` Javascript ゲッター

削減された User-Agent によって共有されるものよりも多くのクライアント情報を受け取るには、サイトを新しい User-Agent [Client Hints](https://web.dev/migrate-to-ua-ch/) API に移行する必要があります。移行戦略の詳細については、「[User-Agent Client Hints への移行](https://web.dev/migrate-to-ua-ch/)」をご覧ください。

現在、User-Agent 削減計画には iOS と WebView が含まれていないため、これらのプラットフォームは引き続き完全な User Agent 文字列を取得します。主に、これらのプラットフォームがまだ User-Agent [Client Hints](https://web.dev/migrate-to-ua-ch/) を実装していないことがその理由です。

## このオリジントライアルの仕組み

このオリジントライアルは、通常のオリジントライアルとは少し異なります。標準のオリジントライアルは、レスポンスの動作のみを制御できます（たとえば、レスポンスの JavaScript で API へのアクセスを制御します）が、このトライアルでは、JavaScript API で提供される UA 文字列を変更するだけでなく、HTTP リクエストで送信される User-Agent ヘッダーも変更することを目標としています。

これを可能にするために、 `Sec-CH-UA-Reduced`という名前の一時的な Client Hint を定義しています。これがリクエストに存在すると、User-Agent ヘッダー値に削減された UA 文字列が含まれていることが示されます。`Sec-CH-UA-Reduced` Client Hintは、オリジントライアルのトークンが有効な場合にのみ（削減された UA 文字列と共に）送信され、オリジントライアルが期限切れになると、`Sec-CH-UA-Reduced` Client Hint は機能しなくなります。[`Critical-CH header`](#validate) を設定しない限り、最初のナビゲーションリクエストは削減されていない User-Agent 文字列を受け取ることに注意してください。

同じオリジンへのサブリソース リクエストは、送信されたトップレベル リクエストと同じ User-Agent 文字列を自動的に送信します。[権限ポリシー](/docs/privacy-sandbox/permissions-policy/)で許可されている場合、サードパーティのオリジンへのサブリソース リクエストでも、オリジントライアル トークンが有効な場合は削減された UA 文字列を含む、トップレベルのリクエストと同じ User-Agent 文字列が送信されます。

## User-Agent 削減オリジントライアルへの参加方法 {: #enroll-top-level }

1. オリジントライアルに登録してドメインのトークンを取得するには、
    [User Agent 削減のトライアルのページ](/origintrials/#/view_trial/-7123568710593282047)にアクセスしてください。

    {% Aside %}
    トライアル用のドメインをサードパーティの埋め込みとして登録するには、
        [別のトークンが必要](#enroll-third-party)です。
        {% endAside %}

2. HTTP レスポンスヘッダーを以下のように更新します。

    1. `Origin-Trial: <ORIGIN TRIAL TOKEN>` を HTTP レスポンスヘッダーに追加します。<`ORIGIN TRIAL TOKEN`> には、オリジントライアル登録時に取得したトークンが含まれています。
    2. `Accept-CH: Sec-CH-UA-Reduced` を HTTP レスポンスヘッダーに追加します。
    3. `Accept-CH`を設定すると、縮小された User-Agent 文字列のみがオリジンへの後続のリクエストで送信されます。 User-Agent 文字列を縮小して最初のナビゲーション リクエストを再送信するには、 `Accept-CH`ヘッダーと`Origin-Trial`ヘッダーに加えて、 `Critical-CH: Sec-CH-UA-Reduced`を HTTP 応答ヘッダーに追加します。
    4. 注意: レスポンスヘッダーに有効な `Origin-Trial` トークンと `Accept-CH: Sec-CH-UA-Reduced` が含まれている場合、すべてのサブリソース リクエスト（画像やスタイルシートなど）とサブナビゲーション（iframe など）は、これらのリクエストのオリジンがオリジントライアルに登録されていない場合でも、削減された UA 文字列を送信します。

3. ウェブサイトを Chrome M95（またはそれ以降）に読み込み、削減された UA 文字列の受信を開始します。

4. イシューやフィードバックについては、UA Reduction [GitHub リポジトリ](https://github.com/miketaylr/user-agent-reduction/issues)に送信してください。

5. オリジントライアルの簡単なデモ（ソースコード付き）については、[https://uar-ot.glitch.me/](https://uar-ot.glitch.me/)をご覧ください。

## サードパーティの埋め込みとしてオリジントライアルに参加する方法 {: #enroll-third-party }

Chrome 96 以降、サードパーティの埋め込み（別のサイト内の iframe など）は、トップレベル サイトを登録せずに、オリジントライアルに参加できます。

サードパーティの埋め込みとして登録するには:

1. [User Agent 削減のトライアル](/origintrials/#/view_trial/-7123568710593282047)にアクセスし、「**登録**」をクリックします。
2. トークンを作成するときは、必ず「`Third-party matching`」チェックボックスを選択してください。
3. サードパーティの埋め込みから削減された User-Agent ヘッダーを受け取るには、[HTTP レスポンスヘッダーを更新します](#enroll-top-level)。
4. JavaScript API で削減された User-Agent 文字列を受け取るには、トライアルトークンを [JavaScript 経由で注入](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#16-can-i-provide-tokens-by-running-script)する必要があります。

サードパーティの埋め込みでオリジントライアルを実行する際の重要なポイント:

- `Critical-CH` はサードパーティの埋め込みには指定できないため、最初のナビゲーションでは削減された UA 文字列は送信されませんが、サードパーティの埋め込みのサブリソース リクエストでは削減された UA 文字列が送信されます。
- オリジントライアルがサードパーティの埋め込みのオリジンとして検証された場合、トップレベル ナビゲーションの同じオリジンへの後続のリクエストは、削減された UA 文字列を送信します。このため、トップレベル リクエストと埋め込みリクエストの両方について、オリジントライアルへの参加を増やすことをお勧めします。
- User Agent がサードパーティ Cookie を無効にしている場合、オリジントライアルはサードパーティの埋め込みリクエストの `User-Agent` ヘッダーに対して機能しませんが、JavaScript API は削減された UA 文字列を引き続き取得します。

## オリジントライアルの動作状況の確認方法 {: #validate }

オリジントライアルが動作していることを検証するには、リクエストヘッダーを調べて、以下のことを確認します。

1. User-Agent ヘッダーには、削減されたバージョンが含まれていること。こちらの[削減された UA 文字列のサンプルのリスト](https://www.chromium.org/updates/ua-reduction#TOC-Sample-UA-Strings:-Phase-4)をご覧ください。簡単には、Chrome のマイナーバージョン文字列に `0.0.0` が含まれていることを確認してください。
2. `Sec-CH-UA-Reduced` ヘッダーが `?1` に設定されていること。

origin-trial トークンを含む最初のレスポンスヘッダーは以下のようになります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/INqCEg57xx8MbFBnLIUD.png", alt="origin-trial トークンを含む最初のレスポンスのヘッダー。", width="800", height="138", class="screenshot" %}

削減された UA 文字列を含む後続のリクエストヘッダーは以下のようになります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/C9AX8VAk50i23LzNTNuw.png", alt="削減された UA 文字列を含む後続のリクエストヘッダー。", width="800", height="150", class="screenshot" %}

## User-Agent 削減オリジントライアルの中止方法

トライアル期間中の任意の時点で参加を中止すると、完全な User-Agent 文字列を受け取ることができます。参加を中止するには、以下のようにします。

1. `Accept-CH` ヘッダーに `Sec-CH-UA-Reduced` を **含めずに**、HTTP レスポンスを送信します。注意: サイトが他の Client Hints をリクエストしない場合、空の値を持つ `Accept-CH` は、これを達成するための有効な方法です。
2. User-Agent 削減トライアルの `Origin-Trial` ヘッダーを HTTP レスポンスから削除します。
3. HTTP レスポンスの `Critical-CH` ヘッダーに `Sec-CH-UA-Reduced` が設定されている場合は、それを削除します。

## オリジントライアルの実施期間

UA 削減オリジントライアルは、少なくとも 6 か月間実施されます。これは、約 6 つの Chrome マイルストーンに対応する期間です。オリジントライアルは M95 で開始され、M101 までに終了します。この時点で、Chrome が削減された User-Agent 文字列を[ロールアウト計画](https://www.chromium.org/updates/ua-reduction#TOC-Proposed-Rollout-Plan)に従って段階的に送信する前に、オリジン トライアルからのフィードバックが評価されます。サイトがさらに長い期間での実施を必要とする場合は、その後のデプリケーション トライアルにオプトインできます。これにより、少なくともさらに 6 か月間、完全な UA 文字列にアクセスすることが可能です。デプリケーション トライアルの詳細については、準備が整い次第公開します。

## User-Agent 削減オリジントライアルのフィードバックの共有方法

イシューやフィードバックについては、UA Reduction [GitHub リポジトリ](https://github.com/miketaylr/user-agent-reduction/issues)に送信してください。

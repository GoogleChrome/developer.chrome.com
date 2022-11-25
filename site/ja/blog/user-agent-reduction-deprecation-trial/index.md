---
layout: layouts/blog-post.njk
title: User-Agent 削減デプリケーショントライアル
subhead: 完全な User-Agent 文字列を引き続き受信するには、登録してください。
description: Chrome 101 以降、User-Agent 文字列で利用できる情報量が減少します。削減された User-Agent 文字列の使用から移行する時間がないサイトは、デプリケーション トライアルに参加すると完全な User-Agent 文字列を引き続き受け取ることができます。
authors:
  - abeyad
  - victortan
date: 2022-02-24
tags:
  - privacy
  - origin-trials
  - chrome-101
---

Chrome 101 以降、User-Agent（UA）文字列で利用できる情報量は、[段階的なアプローチに沿って](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)削減されます。削減された User-Agent 文字列の使用から [User-Agent Client Hints に移行](https://web.dev/migrate-to-ua-ch/)する時間がないサイトは、デプリケーション トライアルに参加すると、完全な User-Agent 文字列を引き続き受け取ることができます。

デプリケーション トライアルへの登録は、[Chrome 100](https://chromiumdash.appspot.com/schedule) ベータ版から開始されます。これにより、マイナーバージョン文字列が削減される Chrome 101 リリースの前に、サイトは完全な User-Agent 文字列を受け取れるようになります。安定版チャンネルにリリースされる前に Chrome 100 ベータ版でオリジン トライアルをテストしたい場合は、必ず Chrome 100 のリリース日（[現時点では 2022 年 3 月 31 日を予定](https://chromiumdash.appspot.com/schedule)）までに登録を済ませてテストしてください。

以下は、デプリケーション トライアルの概要と予想される内容です。共有するフィードバックがある場合、またはこのトライアル中にイシューが発生した場合は、[UA Reduction GitHub リポジトリ](https://github.com/miketaylr/user-agent-reduction/issues)でお知らせください。

## ウェブ開発者にとっての意味

デプリケーション トライアルに登録すると、サイトは引き続き `navigator.userAgent` で完全な UA 文字列を受け取り、関連する `navigator.platform` および `navigator.appVersion` JavaScript ゲッターで削減されていない値を受け取ることができます。

- `User-Agent` HTTP リクエストヘッダー
- `navigator.userAgent` Javascript ゲッター
- `navigator.platform` Javascript ゲッター
- `navigator.appVersion` Javascript ゲッター

サイトは引き続き User-Agent ヘッダーと関連する API の使用状況を監査し、必要に応じてデプリケーション トライアルが終了する前に [User-Agent Client Hints に移行](https://web.dev/migrate-to-ua-ch/)する準備をする必要があります。[User-Agent 削減のロールアウト](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)が完了したら、このデプリケーション トライアルを終了することが目的です。

## User-Agent 削減デプリケーション トライアルへの参加方法

### トライアルに登録する

オリジントライアルに登録してドメインのトークンを取得するには、[User Agent 削減デプリケーション トライアルのページ](/origintrials/#/view_trial/2608710084154359809)にアクセスしてください。

### セットアップ

トライアルに登録したら、HTTP レスポンスヘッダーを以下のように更新します。

1. `Origin-Trial: <ORIGIN TRIAL TOKEN>` を HTTP レスポンスヘッダーに追加します。&lt; `ORIGIN TRIAL TOKEN` &gt;には、オリジントライアル登録時に取得したトークンが含まれています。
2. `Accept-CH: Sec-CH-UA-Full` を HTTP レスポンスヘッダーに追加します。`Accept-CH` を設定すると、オリジンへの後続のリクエストで完全な User-Agent 文字列が送信されます。それ以外には何も起こりません。
3. 完全な User-Agent 文字列とともに最初のナビゲーションリクエストを再送信するには、`Accept-CH` ヘッダーと `Origin-Trial` ヘッダーの他に、`Critical-CH: Sec-CH-UA-Full` を HTTP レスポンスヘッダーに追加します。
4. サードパーティのサブリソースリクエストでも完全な UA 文字列を受け取るようにするには、以下の 2 つのオプションがあります。
    - `Permissions-Policy` ヘッダーに完全な UA を受け取る必要があるサードパーティドメインを含めてそれを追加します。
        - サードパーティドメインの名前付きリストを許可するには、`Permissions-Policy: ch-ua-full=(self "https://google.com")` を追加します。
        - すべてのサードパーティドメインを許可するには、 `Permissions-Policy: ch-ua-full=*` を追加します。
    - `Accept-CH` メタタグに完全な UA を受け取る必要があるサードパーティドメインを含めてそれを追加します（Chrome 100 以降のみ）。
        - サードパーティドメインの名前付きリストを許可するには、`<meta name="accept-ch" content="ch-ua-full=( https://google.com )">` を追加します。
        - メタタグの `*` を使用して、すべてのサードパーティドメインにデリゲートすることはできません。
5. Chrome 100（またはそれ以降）でウェブサイトをロードし、完全な User-Agent 文字列を引き続き受け取ります。

### デモ

トライアルのデモ（ソース コード付き）については、[https://uard-ot-demo.glitch.me](https://uard-ot-demo.glitch.me) をご覧ください。

## トライアルの動作状況の確認方法

オリジントライアルが動作していることを検証するには、リクエストヘッダーを調べて、以下のことを確認します。

1. User-Agent ヘッダーに完全なバージョンが含まれていること。削減された値（[削減された User-Agent 文字列の例のリスト](https://www.chromium.org/updates/ua-reduction#TOC-Sample-UA-Strings:-Phase-4)にあります）が含まれていてはいけません。簡単には、Chrome のマイナーバージョン文字列が `0.0.0`では**ない**こと確認してください。
2. `Sec-CH-UA-Full` ヘッダーが `?1` に設定されていること。

origin-trial トークンを含む最初のレスポンスヘッダーは以下のようになります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/AIlPxFBDvO7jQrXuKfWU.png", alt="", width="800", height="175" %}

完全な User-Agent 文字列を含む後続のリクエストヘッダーは以下のようになります。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Hzi5O1mZQyZEKeokCQSe.png", alt="", width="800", height="191" %}

## User-Agent 削減デプリケーション トライアルの中止方法

トライアル期間中の任意の時点で参加を中止すると、削減された User-Agent 文字列を受け取ることができます。参加を中止するには、以下のようにします。

1. `Accept-CH` ヘッダーに `Sec-CH-UA-Full` を **含めずに**、HTTP レスポンスを送信します。サイトが他の Client Hints をリクエストしない場合、空の値を持つ `Accept-CH` は、これを達成するための有効な方法です。
2. User-Agent 削減デプリケーション トライアルの `Origin-Trial` ヘッダーを HTTP レスポンスから削除します。
3. HTTP レスポンスの `Critical-CH` ヘッダーに `Sec-CH-UA-Full` が設定されている場合は、それを削除します。

## このトライアルと他の User-Agent オリジントライアルとの違い

Chrome では、User Agent の削減に関連するオリジントライアルを 2 つ実行しています。1 つは [User Agent 削減オリジントライアル](/origintrials/#/view_trial/-7123568710593282047)です。このトライアルでは、サイトは情報量が削減された User-Agent 文字列を受け取ってユースケースをテストし、Chrome のデフォルトの動作になる前にフィードバックを提供することができました。

もう 1 つはこの記事で言及されているトライアルで、[User-Agent Client Hints API](https://developer.mozilla.org/docs/Web/API/User-Agent_Client_Hints_API) への移行にもう少し時間が必要なサイトを対象としたデプリケーション トライアルです。これにより、サイトは引き続き完全な User-Agent 文字列を受信することができます。

## デプリケーション トライアルの実施期間

UA 削減デプリケーション トライアルは、Chrome 100 から Chrome 112 まで実行されます。Chrome 113 は、完全に削減された User-Agent 文字列のみが送信される最初のリリースになります。

## User-Agent 削減デプリケーショントライアルのフィードバックの共有方法

イシューやフィードバックについては、[User-Agent Reduction GitHub リポジトリ](https://github.com/miketaylr/user-agent-reduction/issues)に送信してください。

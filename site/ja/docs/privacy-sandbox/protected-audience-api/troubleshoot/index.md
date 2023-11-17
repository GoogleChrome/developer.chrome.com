---
layout: layouts/doc-post.njk
title: Protected Audience API のトラブルシューティング
subhead: ワークレットのトラブルシューティングを行い、Protected Audience API のイベントを観察します。
description: ワークレットのトラブルシューティングを行い、Protected Audience API のイベントを観察します。
date: 2022-10-29
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

Chrome Canary 98.0.4718.0 以降、Chrome DevTools で Protected Audience API と Protected Audience API ワークレットをデバッグできるようになりました。

Protected Audience API のライフサイクル全体については、[開発者ガイド](/docs/privacy-sandbox/protected-audience-api/)をお読みください。開発者でない方は、[Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)をご覧ください。

## Protected Audience API ワークレット {: #debugging }

最初のステップは、**ソース**パネルの**イベント リスナー ブレークポイント**ペインの新しいカテゴリを介してブレークポイントを設定することです。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/x0jhCIMB8L8tV9bcpkPi.png", alt="[ソース] パネルの [イベント リスナー ブレークポイント] ペインが強調表示された Chrome Canary の DevTools。[Auction Worklet] の [Bidder Bidding Phase Start] が選択されています。", width="800", height="549" %}

ブレークポイントがトリガーされると、ワークレット スクリプトの最上位にある最初のステートメントの前で実行が一時停止されます。通常のブレークポイントまたはステップ コマンドを使用して、入札/スコアリング/レポート機能自体にアクセスできます。

ライブ ワークレット スクリプトは、[スレッド] パネルにも表示されます。

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/yJYTFRRcPmVse2teuc7u.png", alt="Chrome Canary の DevTools のスクリーンショット。[ソース] パネルの [スレッド] ペインが強調表示され、一時停止されている現在のワークレット スクリプトが表示されています。", width="800", height="537" %}</figure>

一部のワークレットは並行して実行されるため、複数のスレッドが「一時停止」状態になる場合があります。スレッド リストを使用してスレッドを切り替え、必要に応じてスレッドを再開したり、より詳細に検査したりできます。

### イベントを観察する

Chrome DevTools の [アプリケーション] パネルから、Protected Audience API インタレスト グループとオークション イベントを観察できます。

Protected Audience API が有効になっているブラウザで  [Protected Audience API のデモ広告主サイト](https://protected-audience-demo-advertiser.web.app/)にアクセスすると、DevTools に `join` イベントに関する情報が表示されます。

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/3jI5bJh8XKiZP5WHMBYl.png", alt="DevTools [アプリケーション] パネル。Protected Audience API インタレスト グループへの join イベントに関する情報が表示されています。", width="800", height="402" %}</figure>

次に、Protected Audience API が有効になっているブラウザで  [Protected Audience API のデモサイト運営者サイト](https://protected-audience-demo-publisher.web.app/)にアクセスすると、DevTools に `bid` イベントと `win` イベントに関する情報が表示されます。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wMvNrY9GrcD2p3Q6wTsw.png", alt="Chrome Canary の DevTools [アプリケーション] パネル。Protected Audience API オークションの bid イベントと win イベントに関する情報が表示されます。", width="800", height="482" %}

{% Aside %} サイトに移動したときに DevTools が開いていない場合、Protected Audience API イベントを表示するにはページを更新する必要があります。{% endAside %}

## すべての Protected Audience API リファレンス

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}

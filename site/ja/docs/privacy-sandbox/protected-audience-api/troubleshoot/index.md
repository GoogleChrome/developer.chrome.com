---
layout: layouts/doc-post.njk
title: Troubleshoot the Protected Audience API
subhead: |2-

  ワークレットのトラブルシューティングを行い、Protected Audience API のイベントを観察します。
description: |2-

  ワークレットのトラブルシューティングを行い、Protected Audience API のイベントを観察します。
date: '2022-10-29'
authors:
  - samdutton
  - alexandrawhite
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

From Chrome Canary 98.0.4718.0, it's possible to debug the Protected Audience API and Protected Audience API worklets in Chrome DevTools.

Protected Audience API のライフサイクル全体については、[開発者ガイド](/docs/privacy-sandbox/protected-audience-api/)をお読みください。開発者でない方は、[Protected Audience API の概要](/docs/privacy-sandbox/protected-audience)をご覧ください。

## Protected Audience API worklets {: #debugging }

最初のステップは、**ソース**パネルの**イベント リスナー ブレークポイント**ペインの新しいカテゴリを介してブレークポイントを設定することです。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/x0jhCIMB8L8tV9bcpkPi.png", alt="[ソース] パネルの [イベント リスナー ブレークポイント] ペインが強調表示された Chrome Canary の DevTools。[Auction Worklet] の [Bidder Bidding Phase Start] が選択されています。", width="800", height="549" %}

When a breakpoint triggers, execution is paused before the first statement at the top-level of the worklet script. You can use regular breakpoints or step commands to get to the bidding/scoring/reporting function itself.

Live worklet scripts will also show up under the Threads panel.

<figure>{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/yJYTFRRcPmVse2teuc7u.png", alt="Chrome Canary の DevTools のスクリーンショット。[ソース] パネルの [スレッド] ペインが強調表示され、一時停止されている現在のワークレット スクリプトが表示されています。", width="800", height="537" %}</figure>

Since some worklets may run in parallel, multiple threads may end up in the "paused" state. You can use the thread list to switch between threads, and resume or inspect them more closely as appropriate.

### Observe events

From the Application panel in Chrome DevTools, you can observe Protected Audience API interest group and auction events.

Protected Audience API が有効になっているブラウザで  [Protected Audience API のデモ広告主サイト](https://protected-audience-demo-advertiser.web.app/)にアクセスすると、DevTools に `join` イベントに関する情報が表示されます。

<figure> {% Img   src="image/80mq7dk16vVEg8BBhsVe42n6zn82/3jI5bJh8XKiZP5WHMBYl.png",   alt="The DevTools Application panel displaying information about a Protected Audience API interest group join event.", width="800", height="402" %} </figure>

次に、Protected Audience API が有効になっているブラウザで  [Protected Audience API のデモサイト運営者サイト](https://protected-audience-demo-publisher.web.app/)にアクセスすると、DevTools に `bid` イベントと `win` イベントに関する情報が表示されます。

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/wMvNrY9GrcD2p3Q6wTsw.png", alt="Chrome Canary の DevTools [アプリケーション] パネル。Protected Audience API オークションの bid イベントと win イベントに関する情報が表示されます。", width="800", height="482" %}

{% Aside %} サイトに移動したときに DevTools が開いていない場合、Protected Audience API イベントを表示するにはページを更新する必要があります。{% endAside %}

## All Protected Audience API references

{% Partial 'privacy-sandbox/fledge-api-reference.njk' %}

{% Partial 'privacy-sandbox/fledge-api-next.njk' %}

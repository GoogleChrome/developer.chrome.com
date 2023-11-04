---
layout: 'layouts/doc-post.njk'
title: サードパーティーオリジントライアルとは何か？
subhead: オリジントライアルは、ウェブプラットフォームの新しい機能や実験的な機能をテストするための方法です。サードパーティオリジントライアルにより、埋め込みコンテンツのプロバイダは複数のサイトで新しい機能を試すことができるようになります。
authors:
  - samdutton
date: 2020-10-01
updated: 2021-06-03
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/gPlFs9TIUayaQ1MvxRlP.jpg
alt: Person wearing medical gloves pouring purple liquid from glass beaker into flask. Bristol Robotics Laboratory, UK.
tags:
  - origin-trials
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さん、レビュアーの [lacolaco](https://github.com/lacolaco) さんに感謝いたします。*

<!-- [Origin trials](/blog/origin-trials/) are a way to test a new or experimental web platform
feature. -->

[オリジントライアル](/blog/origin-trials/) は、ウェブプラットフォームの新しい機能や実験的な機能をテストするための方法です。

<!-- Origin trials are usually only available on a first-party basis: they only work for a single
registered [origin](https://web.dev/same-site-same-origin/#origin). If a developer wants to test an
experimental feature on other origins where their content is embedded, those origins all need to be
registered for the origin trial, each with a unique trial token. This is not a scalable approach for
testing scripts that are embedded across a number of sites. -->

オリジントライアルは通常、ファーストパーティベースでのみ利用でき、登録された単一の [オリジン](https://web.dev/same-site-same-origin/#origin) でのみ機能します。もし開発者がコンテンツが埋め込まれている他のオリジンで実験的な機能をテストしたい場合は、それらのオリジンをすべてオリジントライアルに登録しなければならず、それぞれに一意のトライアルトークンが必要になります。これは、多数のサイトに埋め込まれているスクリプトをテストすることを考えると、スケーラブルなアプローチとは言えません。

<!-- Third-party origin trials make it possible for providers of embedded content to try out a new
feature across multiple sites. -->

サードパーティオリジントライアルにより、埋め込みコンテンツのプロバイダは、複数のサイトを横断して新機能を試せるようになります。

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/fCachIuiBjh3XPo10CrN.png", alt="サードパーティオリジントライアルによって、単一の登録トークンを複数のオリジンを横断して使えるようにする方法を示す図", width="800", height="400" %}

<!-- Third-party origin trials don't make sense for all features. Chrome will only make the third-party
origin trial option available for features where embedding code on third-party sites is a common use
case.  [Getting started with Chrome's origin trials](https://developers.chrome.com/origintrials/)
provides more general information about how to participate in Chrome origin trials. -->

サードパーティオリジントライアルは、すべての機能で利用できるわけではありません。Chromeは、サードパーティのサイトにコードを埋め込むことが一般的なユースケースとなる機能に対してのみ、サードパーティオリジントライアルオプションを利用できるようにします。 [Chrome のオリジントライアル入門](https://developers.chrome.com/origintrials/) には、Chrome オリジントライアルへの参加方法に関するより一般的な情報が記載されています。

<!-- If you participate in an origin trial as a third-party provider, it will be your responsibility to
notify and set expectations with any partners or customers whose sites you intend to include in the
origin trial. Experimental features may cause unexpected issues and browser vendors may not be able
to provide troubleshooting support. -->

サードパーティプロバイダとしてオリジントライアルに参加する場合、オリジントライアルに含める予定のサイトのパートナーまたは顧客に通知し、期待値を設定するのは、あなたの責任となります。実験的な機能により予期しない問題が発生する可能性があります。そして、ブラウザベンダは、トラブルシューティングサポートを提供できないかもしれません。

{% Aside %}
<!-- Supporting third-party origin trials allows for broader participation, but also increases the
potential for overuse or abuse of experimental features, so a "trusted tester" approach is more
appropriate. The greater reach of third-party origin trials requires additional scrutiny and
additional responsibility for web developers that participate as third-party providers. Requests to
enable a third-party origin trial may be reviewed in order to avoid problematic third-party scripts
affecting multiple sites. The Origin Trials Developer Guide explains the
[approval process](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#18-how-can-i-enable-an-experimental-feature-as-embedded-content-on-different-domains). -->

サードパーティオリジントライアルをサポートすることで、より幅広い参加が期待できますが、実験的な機能の過度の使用または誤用の可能性も高まるため、"トラステッドテスター" アプローチの方が適切です。 サードパーティオリジントライアルによるより広い影響範囲では、サードパーティプロバイダとして参加するウェブ開発者の、さらなる監視と責任が求められます。問題のあるサードパーティのスクリプトが複数のサイトに影響を与えるのを回避するため、サードパーティオリジントライアルを有効にするリクエストは、レビューが必要となる場合があります。オリジントライアル開発者ガイドにて、 [承認プロセス](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#18-how-can-i-enable-an-experimental-feature-as-embedded-content-on-different-domains) が説明されています。
{% endAside %}

<!-- Check [Chrome Platform Status](https://www.chromestatus.com/features/5691464711405568) for updates
  on progress with third-party origin trials. -->

[Chrome プラットフォームステータス](https://www.chromestatus.com/features/5691464711405568) で、サードパーティオリジントライアルの進捗状況に関する最新情報を確認してください。

<!-- ## How to register for a third-party origin trial -->

## サードパーティオリジントライアルの登録方法

<!--
1. Select a trial from the [list of active
   trials](https://developers.chrome.com/origintrials/#/trials/active).
1. On the trial's registration page, enable the option to request a third-party token, if
   available.
1. Select one of the choices for restricting usage for a third-party token:
   1. Standard Limit: This is the usual limit of
      [0.5% of Chrome page loads](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#3-what-happens-if-a-large-site-such-as-a-google-service-starts-depending-on-an-experimental-feature).
   1. User Subset: A small percentage of Chrome users will always be excluded from the trial,
      even when a valid third-party token is provided. The exclusion percentage varies (or might
      not apply) for each trial, but is typically less than 5%.

1. Click the Register button to submit your request.
1. Your third-party token will be issued immediately, unless further review of the request is
   required. (Depending on the trial, token requests may require review.)
1. If review is required, you'll be notified by email when the review is complete and your
   third-party token is ready.
-->

1. [進行中のトライアルの一覧](https://developers.chrome.com/origintrials/#/trials/active) からトライアルを選択します。
1. トライアルの登録ページにて、サードパーティトークンを要求するためのオプションが利用可能になっていれば、それを有効にします。
1. サードパーティトークンの使用を制限するための選択肢の 1 つを選択します:
   1. Standard Limit: これは、 [Chrome ページ読み込みの 0.5%](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#3-what-happens-if-a-large-site-such-as-a-google-service-starts-depending-on-an-experimental-feature) に適用される通常の制限です。
   1. User Subset: 有効なサードパーティトークンが提供されている場合でも、Chrome ユーザーの数パーセントが常にトライアルから除外されます。除外率はトライアルごとに異なります（または適用されないかもしれない）が、通常は 5% 未満です。
1. Register ボタンをクリックして、リクエストを送信します。
1. リクエストに対してさらにレビューが求められない限り、サードパーティトークンはすぐに発行されます。（トライアルによっては、トークンリクエストのレビューが必要になる場合があります。）
1. レビューが必要だった場合は、レビューが完了し、サードパーティトークンの準備ができたときに、メールで通知されます。

   <figure class="w-figure">
     {% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/r07Zb0QoHnlgiItETR6q.png", alt="サードパーティ一致チェックボックスが選択された Conversion Measurement API の Chrome オリジントライアル登録ページ。", width="800", height="618" %}
     <figcaption class="w-figcaption">Conversion Measurement トライアルの登録ページ。</figcaption>
   </figure>

<!-- ## How to provide feedback -->

## フィードバックの提供方法

<!-- If you're registering for a third-party origin trial and have feedback to share on the process or
ideas on how we can improve it, [create an
issue](https://github.com/GoogleChrome/OriginTrials/issues/new) on the Origin Trials GitHub code
repo. -->

サードパーティオリジントライアルに登録していて、それを改善する方法についてのアイデアや手順といったフィードバックを報告したいときは、オリジントライアル GitHub コードリポジトリに [Issue を作ってください](https://github.com/GoogleChrome/OriginTrials/issues/new) 。

## 参考情報

-  [Chrome のオリジントライアル入門](/ja/blog/origin-trials/)
-  [Origin Trials Guide for Web Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
-  [Chrome Platform Status](https://www.chromestatus.com/features/5691464711405568)

Photo by [Louis Reed
](https://unsplash.com/@_louisreed) on [Unsplash](https://unsplash.com/photos/JeInkKlI2Po).

---
layout: 'layouts/doc-post.njk'
title: Chromeのオリジントライアル入門
subhead: オリジントライアルは、ウェブプラットフォームの新しい機能や実験的な機能が一般公開されるより先に、使いやすさ、実用性、そして有効性についてテストし、ウェブ標準コミュニティにフィードバックできる方法です。
authors:
  - samdutton
date: 2020-06-22
updated: 2021-09-01
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/KeaVCdXHWzrI35QRvsZL.jpg
alt: Pipette with purple liquid
tags:
  - origin-trials
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さんに感謝いたします。*

<!-- Origin trials give you access to a new or experimental feature, to build
functionality your users can try out for a limited time before the feature
is made available to everyone. -->
オリジントライアルを利用すると、一般公開されるより先に、新しい機能や実験的な機能を期間を限定してユーザに試してもらうことができるようになります。

<!-- When Chrome offers an origin trial for a feature, you can register for the trial to enable
the feature for all users on your [origin](https://web.dev/same-site-same-origin/#origin),
without requiring them to toggle any flags or switch to an alternative build
of Chrome (though they may need to upgrade). Origin trials enable developers
to build demos and prototypes using new features. The trials also help Chrome engineers
understand how new features are used, and how they may interact with other web technologies. -->
Chrome がある機能のオリジントライアルを提供している時、トライアルに登録して、あなたの [オリジン](https://web.dev/same-site-same-origin/#origin) 上で全てのユーザにその機能を有効にすることができます。そのために、Chrome のフラグを切り替えたり、別のビルドに切り替える必要はありません（ただし、アップグレードが必要な場合があります）。オリジントライアルにより、開発者は新しい機能を使用して、デモやプロトタイプを作成できます。このトライアルは、Chrome のエンジニアが新機能がどのように利用され、そして他のウェブテクノロジとどのように相互に利用されるかを理解するのにも役立ちます。

<!-- Origin trials are public and open to all developers. They are limited in duration and
usage. Participation is a self-managed process with limited documentation and support.
Participants should be willing and able to work relatively independently using the
documentation available, which, at this stage, will likely be limited to API
specifications and explainers, though web.dev tries to provide guidance whenever
possible. -->
オリジントライアルは、全ての開発者に対してパブリックでありオープンですが、期間と使用方法に制限があります。参加は、限られたドキュメントとサポートのみ用意された自己管理プロセスです。参加者は、利用可能なドキュメントを使用して、比較的独立して作業する意思と能力を備えている必要があります。この段階では、API 仕様とその Explainer に限定される可能性がありますが、web.dev が可能な限りのガイダンスを提供します。

<!-- If you register for a trial, the Chrome team will periodically ask you for specific
feedback on your use of the trial feature. Some features may undergo multiple origin
trials, as learnings are incorporated and adjustments are made. -->
トライアルに登録すると、Chrome チームは定期的にトライアル機能の利用に関する具体的なフィードバックを求めます。 機能によっては、フィードバックを取り込み、調整を行うため、オリジントライアルが複数回行われる可能性があります。


<!-- ## Third-party origin trials -->
## サードパーティオリジントライアル

<!-- Origin trials are usually only available on a first-party basis: they only work for a single
registered [origin](https://web.dev/same-site-same-origin/#origin). Third-party origin trials make
it possible for providers of embedded content to try a new feature across multiple sites
without requiring a token for every origin. -->
オリジントライアルは通常、ファーストパーティベースでのみ利用でき、登録された単一の [オリジン](https://web.dev/same-site-same-origin/#origin) でのみ機能します。サードパーティオリジントライアルにより、埋め込みコンテンツのプロバイダーは、オリジンごとにトークンを必要とせずに、複数のサイトを横断して新しい機能を試すことが可能となります。

詳細はこちらをご覧ください: [What are third-party origin trials?](/blog/third-party-origin-trials/)


<!-- ## Deprecation trials -->
## デプリケーショントライアル

<!-- Not all origin trials are for testing new APIs. Some trials enable a deprecated feature to be
temporarily re-enabled. These are known as **deprecation trials**, and in some contexts have been
referred to as "reverse" origin trials. -->
すべてのオリジントライアルが新しい API のテスト向けであるとは限りません。一部のトライアルでは、廃止された機能を一時的に再度有効にすることができます。これらは **デプリケーショントライアル** として知られており、一部のコンテキストでは「リバース」オリジントライアルと呼ばれています。

<!-- For example, [from Chrome 85](https://web.dev/appcache-removal/#origin-trial) AppCache is no longer
available in Chrome by default. Sites needing extra time to migrate off AppCache could register for
the [deprecation trial to continue using AppCache](/origintrials/#/view_trial/1776670052997660673) until Chrome 93. -->
例えば、 [Chrome 85 から](https://web.dev/appcache-removal/#origin-trial) AppCache は初期状態で Chrome で使用できなくなりました。 AppCache から移行するために追加の時間が必要なサイトは、Chrome 93 まで [deprecation trial to continue using AppCache](/origintrials/#/view_trial/1776670052997660673) に登録することができました。


<!-- ## How to register for an origin trial -->
## オリジントライアルへの登録方法

<!--
1. Choose an origin trial from the [list of active trials](https://developers.chrome.com/origintrials/#/trials/active).
1. Request a token by clicking the **Register** button and filling out the form.
. Add the token to your web pages,
   using one of the following methods:
   -  As a meta tag in the &lt;head&gt; of each page served:
      `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
   -  As an HTTP header:
      `Origin-Trial: TOKEN_GOES_HERE`
1. Try out the new feature.
1. Submit feedback. Do this through the origin trial site. This feedback is
   not public and is available only to a limited group of people on the Chrome
   team. Each trial also provides a link for spontaneous community feedback.
   This typically points to the feature on GitHub or some other public
   channel.
1. When your token expires, you will get an email with a renewal link.
   To do so, you are again asked to submit feedback.
-->
1. [アクティブなトライアルのリスト](https://developers.chrome.com/origintrials/#/trials/active) から、オリジントライアルを選択します。
1. **Register** ボタンをクリックしてフォームに記入を行い、トークンを要求します。
1. 以下の方法の一つを使って、あなたのウェブページにトークンを追加します:
   -  サーブされている各ページの &lt;head&gt; 内の meta タグ を使う:
      `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
   -  HTTP ヘッダを使う:
      `Origin-Trial: TOKEN_GOES_HERE`
1. 新しい機能を試してみます。
1. フィードバックを提出します。オリジントライアルのサイトを通じてこれを行ってください。このフィードバックは公開されず、Chrome チームの限定されたグループの人々へのみ利用可能となります。各トライアルは、自発的なコミュニティフィードバックへのリンクも提供します。これは通常、GitHub またはその他のパブリックチャネルの機能を指します。
1. トークンが失効するときは、更新のためのリンクが書かれたメールを受け取ります。更新を行うために、再びフィードバックを提出するよう求められます。

{% Aside 'warning' %}
<!-- Usually if an API lands unchanged after a successful origin trial, there is a short period between the
end of the origin trial and the date the implementation ships in the browser when the API will not
be available. This is by design. If Chrome were to avoid the mandatory total-breakage period, that would
bias toward also avoiding breakages in the API surface, which are often needed to improve the API.
The final shipping API might be worse for it. -->
通常、オリジントライアルが成功し、API が変更されることなく提供される場合、オリジントライアルが終了してから、ブラウザで実装がリリースされる日付まで、API は利用できなくなります。これは意図的です。Chrome がその機能を利用できない期間を設けなかった場合、API を改善するためにしばしば必要となる API が利用できない可能性も回避する方向にバイアスがかかります。最終的にリリースされる API が、それにより悪くなる可能性もあります。

<!-- In rare circumstances, if there was clear evidence that developers engaged with the origin trial and that their
concerns were taken into account in the final API design and implementation,
this breakage period may be skipped
[upon request](https://sites.google.com/a/chromium.org/dev/blink/launching-features#sites-canvas-main-content:~:text=If%20you%20wish%20to%20skip%20the,Ship%20imply%20approval%20of%20the%20request.). -->
まれな状況として、開発者がオリジントライアルに関与して、最終的な API の設計と実装にてそれらが考慮された際には、この破壊的な期間は [リクエストに応じて](https://sites.google.com/a/chromium.org/dev/blink/launching-features#sites-canvas-main-content:~:text=If%20you%20wish%20to%20skip%20the,Ship%20imply%20approval%20of%20the%20request.) 省略されることがあります。
{% endAside %}

<!-- ## View origin trials information in DevTools {: #devtools} -->
## DevTools でのオリジントライアル情報の閲覧 {: #devtools}

<!-- Available from Chrome 94. You can now get information about a site's origin trials in [DevTools](/docs/devtools/) under the **Application** panel. -->
Chrome 94 から利用することができます。 **Application** パネルの下にある [DevTools](/docs/devtools/) 内にて、現在はサイトのオリジントライアルについての情報を得ることが可能です。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Origin trials in the Frame details view", width="800", height="465" %}


<!-- ## Find out more -->
## 参考情報

-  [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
-  [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
-  [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
-  [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features)
-  [Intent to explain: Demystifying the Blink shipping process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
-  [What are third-party origin trials?](/blog/third-party-origin-trials/)
-  [View origin trials information in DevTools](/blog/new-in-devtools-94/#origin-trials)
---

Photo by [Louis Reed
](https://unsplash.com/@_louisreed) on [Unsplash](https://unsplash.com/photos/pwcKF7L4-no).

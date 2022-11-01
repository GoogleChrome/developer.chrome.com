---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 94)"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "好みの言語での DevTools の利用, 新しい Nest Hub デバイス, 新しい CSS コンテナクエリバッチなど。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7mzgwpbt5F3oEUb8d94u.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さん、レビュアーの [technohippy](https://github.com/technohippy) さんと [lacolaco](https://github.com/lacolaco) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id="N9Jiou61WH4" %}

<!--
## Use DevTools in your preferred language {: #localized }
-->
## 好みの言語での DevTools の利用 {: #localized }

<!--
Chrome DevTools now supports more than 80 languages, allowing you to work in your preferred language!
-->
Chrome DevTools は 80 言語以上をサポートするようになりました。あなたの好みの言語で使用することができます！

<!--
Open [Settings](/docs/devtools/customize/#settings), then select your preferred language under the  **Preferences** > **Language** dropdown and reload DevTools.
-->
[Settings](/docs/devtools/customize/#settings) を開き、**Preferences** > **Language** ドロップダウンから好みの言語を選択して、DevTools を再読み込みしてください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EhOGAFAVztjMHffVkHQ4.png", alt="Change language in Settings > Preferences", width="800", height="519" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Chromium issue: [1163928](https://crbug.com/1163928)


<!--
## New Nest Hub devices in the Device list {: #nest-hub }
-->
## 新しく Nest Hub デバイスがデバイスリストに {: #nest-hub }

<!--
You can now simulate the dimensions of Nest Hub and Nest Hub Max in the [Device mode](/docs/devtools/device-mode/).
-->
[Device mode](/docs/devtools/device-mode/) にて、Nest Hub および Nest Hub Max の寸法をシミュレートできるようになりました。

<!--
Click [Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %} &nbsp;, select Nest Hub or Nest Hub Max under the device list.
-->
[Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %} &nbsp; をクリックして、デバイスリストから Nest Hub または Nest Hub Max を選択してください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="Nest Hub device in the Device mode", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Chromium issue: [1223525](https://crbug.com/1223525)


<!--
## Origin trials in the Frame details view {: #origin-trials }
-->
## フレーム詳細ビューの Origin trials {: #origin-trials }

<!--
You can now get information about a site's [origin trials](/blog/origin-trials/) in the frame details view under the Application panel.
-->
Application パネルのフレーム詳細ビューにて、サイトの [origin trials](/blog/origin-trials/) についての情報を得ることができるようになりました。

<!--
[Origin trials](/blog/origin-trials/) gives you access to a new or experimental feature, to build functionality your users can try out for a limited time before the feature is made available to everyone.
-->
[Origin trials](/blog/origin-trials/) は、新規または実験的な機能へのアクセスを提供します。これはその機能が誰でも利用可能になる前に、期間限定でユーザーに試してもらえる仕組みを作るためのものです。


<!--
Open a page with origin trials (e.g. [demo page](https://mediastreamtrack.glitch.me)). In the **Application** panel, scroll down to the **Frames** section and select the top frame.
-->
Origin trials を使っているページを開きます(例. [デモページ](https://mediastreamtrack.glitch.me))。 **Application** パネルにて、 **Frames** セクションまで下にスクロールして、トップフレームを選択してください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Origin trials in the Frame details view", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Chromium issue: [607555](https://crbug.com/607555)


<!--
## New CSS container queries badge {: #container-queries }
-->
## 新しい CSS コンテナクエリバッジ {: #container-queries }

<!--
A new **container** badge is added next to the container elements (the ancestor elements that match the criteria of `@container` at-rules). Click the badge to toggle the display of an overlay of the chosen container and all its querying descendants on the page.
-->
新しい **container** バッジがコンテナ要素（@-規則 `@container` の条件に一致する上位の要素）の隣に追加されます。そのバッジをクリックして、選択されたコンテナとそのクエリを実行している全ての下位要素のオーバーレイ表示を切り替えることができます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="CSS container queries badge", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Chromium issue: [1146422](https://crbug.com/1146422)


<!--
## New checkbox to invert the network filters {: #invert-network-filter }
-->
## ネットワークフィルタを反転するための新しいチェックボックス {: #invert-network-filter }

<!--
Use the new **Invert** checkbox to invert the filters in the Network panel.
-->
新しい **Invert** チェックボックスを使うことで、Network パネルのフィルタを反転することができます。

<!--
For example, you can type "status-code: 404" to filter the network requests with status 404. Enable the **Invert** checkbox to negate the filter (show all network requests which are not with status 404).
-->
例えば、ステータス 404 を持つネットワークリクエストにフィルタするために、"status-code: 404" とタイプすることができます。その **Invert** チェックボックスを有効にすると、フィルタが反転します（ステータス 404 を持たない全てのネットワークリクエストが表示されます）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="Invert the network filters", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Chromium issue: [1054464](https://crbug.com/1054464)


<!--
## Upcoming deprecation of the Console sidebar {: #deprecated }
-->
## Console サイドバーが今後非推奨に {: #deprecated }

<!--
The Console sidebar will be removed in favor of moving the filter UI to the toolbar. Do you have any concerns or feedback? Let us know via this [issue tracker](https://crbug.com/1232937).
-->
フィルタの UI をツールバーに移動させることを優先して、Console サイドバーは削除される予定です。何か懸念やフィードバックはありますか？ここ（ [issue tracker](https://crbug.com/1232937) ）経由で私達に知らせてください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="Console sidebar deprecation message", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Chromium issue: [1232937](https://crbug.com/1232937)


<!--
## Display raw `Set-Cookie` headers in the Issues tab and Network panel {: #raw-cookies }
-->
## Issue タブや Network パネルでの未加工の `Set-Cookie` ヘッダーの表示 {: #raw-cookies }

<!--
DevTools now displays raw `Set-Cookie` headers in the **Issues** tab.
-->
DevTools は、 **Issues** タブにて、未加工の `Set-Cookie` ヘッダを表示するようになりました。

<!--
Previously, DevTools did not show malformed cookies (incorrect `Set-Cookie` header) in the Network panel. With the new `response-header-set-cookie` filter added in the **Network** panel, users can filter the raw `Set-Cookie` header response. DevTools will link the raw `Set-Cookie` headers in the **Issues** tab to the **Network** panel.
-->
以前は、DevTools は Network パネルにて不正なクッキー（正しくない `Set-Cookie` ヘッダ）を表示しませんでした。 **Network** パネルに追加された新しい `response-header-set-cookie` フィルタを使って、ユーザは未加工の `Set-Cookie` ヘッダレスポンスをフィルタすることができます。DevTools は、**Issues** タブにて未加工の `Set-Cookie` ヘッダを **Network** パネルにリンクすることになります。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="Raw 'Set-Cookie' headers in the Issues tab and Network panel", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Chromium issue: [1179186](https://crbug.com/1179186)


<!--
## Consistent display native accessors as own properties in the Console {: #native-accessors }
-->
## Console での自身のプロパティとしてのネイティブアクセサの一貫した表示 {: #native-accessors }

<!--
The **Console** now displays native accessors as their own properties consistently.
-->
**Console** は、ネイティブアクセサをそれら自身のプロパティとして一貫して表示するようになりました。

<!--
For example, when evaluating the `new Int8Array([1, 2, 3])` expression in the **Console**, native accessors like `length`, `byteOffset` did not display in the preview. With this latest update, native accessors are shown in the preview and values are eagerly evaluated when expanded.
-->
例えば、**Console** にて `new Int8Array([1, 2, 3])` という式が評価される際に、 `length` や `byteOffset` のようなネイティブアクセサは、プレビュー内で表示されていませんでした。この最新のアップデートにて、ネイティブアクセサはプレビュー内で表示され、展開された際に値が積極的に評価されます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Consistent display native accessors as own properties in the Console", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Chromium issues: [1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


<!--
## Proper error stack traces for inline scripts with #sourceURL {: #inline-script }
-->
## #sourceURL を使ったインラインスクリプトの適切なエラースタックトレース {: #inline-script }

<!--
DevTools now resolves inline scripts with `#sourceURL` properly and shows proper error stack traces for debugging.
-->
DevTools は `#sourceURL` を使用してインラインスクリプトを適切に解決し、デバッグ向けの正しいエラースタックを表示するようになりました。

<!--
Previously DevTools displayed incorrect location for inline scripts with `#sourceURL`, relative to the surrounding document rather than relative to the opening `<script>` tag..
-->
以前の DevTools では、`#sourceURL` を使ったインラインスクリプトの間違った位置（`<script>` 開始タグに対してではなくむしろ周囲のドキュメントに対して）が表示されていました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Proper error stack traces for inline scripts with #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Chromium issues: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)


<!--
## Change color format in the Computed pane {: #color-unit }
-->
## Computed ペインでのカラーフォーマットの変更 {: #color-unit }

<!--
You can now change the color format of any element in the Computed pane by <kbd>Shift</kbd> + click on the color preview.
-->
カラープレビュー上で <kbd>Shift</kbd> + クリックすることで、Computed ペインで任意の要素のカラーフォーマットを変更することができるようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="Shift+Click the color preview to change color format", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Chromium issue: [1226371](https://crbug.com/1226371)


<!--
## Replace custom tooltips with native HTML tooltips {: #tooltip }
-->
## カスタムツールチップをネイティブの HTML ツールチップに置き換え {: #tooltip }

<!--
DevTools now adopts native HTML tooltips across all components. DevTools has had a custom tooltip implementation for a long time due to the lack of styling of a native HTML tooltip.
-->
DevTools は、全てのコンポーネントでネイティブの HTML ツールチップを採用するようになりました。ネイティブの HTML ツールチップのスタイルが欠如していたために、DevTools は長い間カスタムツールチップの実装を持っていました。

<!--
Unfortunately, maintaining a custom tooltip implementation is complicated and we regularly run into complicated bugs.
-->
残念なことに、カスタムツールチップ実装のメンテナンスは複雑であり、定期的に複雑な不具合に遭遇していました。

<!--
After reweighting the benefits of the custom implementations, we find that the native HTML tooltips are sufficient for DevTools and adopting the tooltips prevents a vast variety of problems for our users.
-->
カスタム実装の利点を再評価しましたが、ネイティブの HTML ツールチップは DevTools にとって十分であり、ツールチップを採用することでユーザの様々な問題を防ぐことができると考えています。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools tooltip", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Chromium issue: [1223391](https://crbug.com/1223391)


<!--
## [Experimental] Hide issues in the Issues tab {: #hide-issues }
-->
## [実験的] Issues タブでの問題の非表示 {: #hide-issues }

{% Aside %}
<!--
To enable the experiment, check the **Enable hide issues menu** checkbox under **Settings** > **Experiments**.
-->
実験的な機能を有効にするには、 **Settings** > **Experiments** にある **Enable hide issues menu** をクリックしてください。
{% endAside %}

<!--
Enable the **hide issues menu** experiment to hide issues in the **Issues** tab. This way, you can focus on the important issues that matter to you.
-->
**hide issues menu** 実験的機能を有効にすることで、**Issues** タブにて問題を非表示にすることができます。これにより、あなたにとって重要な問題にフォーカスすることができるようになります。

<!--
In the **Issue** tab, hover an issue, click on the issue menu &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; on the right, select **Hide issues like this** to hide it.
-->
**Issue** タブにて、問題にカーソルを合わせて、問題の右にあるメニュー &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; をクリックし、それを非表示にするために **Hide issues like this** を選択します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Experimental hide issue context menu", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Chromium issue: [1175722](https://crbug.com/1175722)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 102)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "新しいパフォーマンスインサイトパネル、ライトテーマ／ダークテーマのエミュレートへのショートカットなど。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cU7igYcZ7brylT5EvM47.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-102
---

*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [lacolaco](https://github.com/lacolaco) さん、 [yoichiro](https://github.com/yoichiro) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='0V_ph7PA_aw' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

<!-- ## Preview feature: New Performance insights panel {: #perf } -->
## プレビュー機能: 新しいパフォーマンスインサイトパネル {: #perf }

<!-- Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance. -->
**Performance insights** パネルを使用して、ウェブサイトのパフォーマンスに関する実用的でユースケース駆動の洞察を得ることができます。

<!-- [Open the panel](/docs/devtools/performance-insights/#open) and start a new recording based on your use case. For example, let’s measure the page load of this [demo page](https://coffee-cart.netlify.app/?ad=1). -->
[このパネルを開き](/docs/devtools/performance-insights/#open)、あなた自身のユースケースに基づいて新しく記録を開始します。例えば、この[デモページ](https://coffee-cart.netlify.app/?ad=1)のページ読み込みについて測定してみましょう。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EjgH5CD6FHnzoEhDEWxu.png", alt="New Performance insights panel", width="800", height="585" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EjgH5CD6FHnzoEhDEWxu.png", alt="新しいパフォーマンスインサイトパネル", width="800", height="585" %}

<!-- Once the recording is complete, you get the performance insights on the  **Insights** pane. Click on each insight item (for example, Render blocking request, layout shift) to understand the issue and potential fixes.  -->
記録が完了すると、**Insights** ペインにパフォーマンスインサイトが表示されます。それぞれのインサイトアイテム（例えば、Render blocking request や layout shift）をクリックして、問題点と考えられる対策を確認してください。

<!-- Go to the **Performance insights** panel [documentation](/docs/devtools/performance-insights/) to learn more with the step-by-step tutorial.  -->
**Performance insights** パネルの[ドキュメント](/docs/devtools/performance-insights/)を使用すると、ステップ・バイ・ステップのチュートリアルを通じてさらに学習を深めることができます。

<!-- This is a preview feature to help web developers (especially non-performance experts) to identify and fix potential performance issues. Our team is actively working on this feature and we are looking for your [feedback](https://crbug.com/1270700) for further enhancements. -->
この機能は、（特にパフォーマンスの専門家ではない）ウェブ開発者が潜在的なパフォーマンス上の問題を見つけ出して修正できるようにするためのプレビュー機能です。私たちのチームは積極的にこの機能の開発を進めていて、これからの機能追加のために皆さんの[フィードバック](https://crbug.com/1270700)を待っています。

Chromium issue: [1270700](https://crbug.com/1270700)


<!-- ## New shortcuts to emulate light and dark themes {: #emulation } -->
## ライトテーマとダークテーマをエミュレートする新しいショートカット {: #emulation }

<!-- You can now emulate the light and dark themes quicker (CSS media feature [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) with the new shortcuts in the **Styles** pane. -->
**Styles** ペインで新しいショートカットを使用して、ライトテーマとダークテーマ（CSSメディア特性の [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)）をより素早くエミュレートできるようになりました。

<!-- Previously, it took more steps to [emulate themes](/docs/devtools/rendering/emulate-css/) in the **Rendering** tab.   -->
これまでは **Rendering** タブで[テーマをエミュレートする](/docs/devtools/rendering/emulate-css/)ためにより多くの手順が必要でした。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dCbNHwE5ICGNXRUws1zz.png", alt="New shortcuts to emulate light and dark themes", width="800", height="488" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dCbNHwE5ICGNXRUws1zz.png", alt="ライトテーマとダークテーマをエミュレートする新しいショートカット", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/34c39bcabca71195024f1312ec29eecf464a633d #}

Chromium issue: [1314299](https://crbug.com/1314299)


<!-- ## Improve security on the Network Preview tab {: #network-preview } -->
## Network Preview タブのセキュリティ改善 {: #network-preview }

<!-- DevTools now apply the Content Security Policy (CSP) in the **Preview** tab in the **Network** panel. -->
DevTools は **Network** パネルの **Preview** タブに Content Security Policy（CSP）を適用するようになりました。

<!-- For example, the first screenshot shows a page that contains [mixed content](https://web.dev/what-is-mixed-content/). The page loads over a secure HTTPS connection, but the stylesheet loads over an insecure HTTP connection. -->
例えば、最初のスクリーンショットは[混合コンテンツ](https://web.dev/what-is-mixed-content/)を含むページを示しています。このページはセキュアな HTTPS 接続を使用して読み込まれますが、スタイルシートはセキュアではない HTTP 接続が使用されています。

<!-- The browser blocked the stylesheet request by default. However, when you opened the page via the **Preview** tab in the **Network** panel, the stylesheet was not blocked previously (hence the background turned into red). It is now blocked as you would expect (second screenshot). -->
デフォルトではブラウザはスタイルシートのリクエストをブロックします。しかし、これまではこのページが **Network** パネルの **Preview** タブで開かれたときには、スタイルシートがブロックされませんでした（そのため背景が赤色に変わります）。これが期待どおりにブロックされるようになります（2枚目のスクリーンショット）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jxqxoJYqWXGzj4V9aJaX.png", alt="Network Previewタブのセキュリティ改善", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/95bce20a2490b59a36d5da04c5f81d8c38230a39 #}

Chromium issue: [833147](https://crbug.com/833147)


<!-- ## Improved reloading at breakpoint {: #debugger } -->
## ブレークポイントのリロード改善 {: #debugger }

<!-- The debugger now terminates script execution when reloading at breakpoint. -->
デバッガはブレークポイントでリロードするとスクリプトの実行を停止するようになりました。

<!-- For example, the script got into an endless loop previously when setting and reloading at the `ReactDOM` breakpoint in this [React demo](https://react-stuck.glitch.me/). The **Sources** panel broke due to the endless loop.  -->
例えば、これまではこの[React デモ](https://react-stuck.glitch.me/)で `ReactDOM` ブレークポイントを設定してリロードすると、スクリプトが無限ループしていました。**Sources** パネルは無限ループのせいで動かなくなります。

<!-- Continuing to execute JavaScript is causing a lot of trouble for developers and might leave the renderer in a broken state. This change aligns the debugging behavior with other browsers like Firefox. -->
JavaScriptの実行を続けることは多くの開発者にとってトラブルの元で、不正な状態のまま描画が残ることもあります。今回の変更により Firefox のような他のブラウザとデバッグ時の動作が等しくなります。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QBv59pX5TE9c7iJAB3Xu.png", alt="Improved reloading at breakpoint", width="800", height="566" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QBv59pX5TE9c7iJAB3Xu.png", alt="ブレークポイントのリロード改善", width="800", height="566" %}

{# https://chromium.googlesource.com/chromium/src/+/ea207cee9bbd9b6731228d94778b23138373ec97 #}

Chromium issues: [1014415](https://crbug.com/1014415), [1004038](https://crbug.com/1004038), [1112863](https://crbug.com/1112863), [1134899](https://crbug.com/1134899)


<!-- ## Console updates  {: #console } -->
## コンソールの更新  {: #console }

<!-- ### Handle script execution errors in the Console {: #errors } -->
### コンソールでスクリプトの実行エラーを処理 {: #errors }

<!-- Errors during script evaluation in the Console now generate proper error events that trigger the `window.onerror` handler and are dispatched as `"error"` events on the window object. -->
コンソールでスクリプトを評価している最中のエラーが、window オブジェクトの `"error"` イベントとして発火され、`window.onerror` に捕捉されるような、適切なエラーイベントを発生させるようになりました。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gBtY4zD39SPizfcCGJJW.png", alt="Handle script execution errors in the Console", width="800", height="487" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gBtY4zD39SPizfcCGJJW.png", alt="コンソールでスクリプトの実行エラーを処理", width="800", height="487" %}

{# https://chromium.googlesource.com/v8/v8/+/56cfdd68c731c53d016326b890b56b5c30098998 #}

Chromium issue: [1295750](https://crbug.com/1295750)


<!-- ### Commit live expression with Enter {: #live-expression } -->
### Enter キーでlive expressionを確定 {: #live-expression }

<!-- Once you finish typing a [live expression](/blog/new-in-devtools-70/#watch), you can click `Enter` to commit it. Previously, hitting Enter resulted in adding new lines. This is inconsistent with other parts of the DevTools.  -->
[live expression](/blog/new-in-devtools-70/#watch)の入力を終えたときに、`Enter` をクリックして確定できます。これまでは、Enter を押下すると新しい行が追加されていました。以前の動作は DevTools の他の部分と一貫性がありません。

<!-- To add a new line in the **live expression** editor, use `Shift` + `Enter` instead. -->
**live expression** エディタで新しい行を追加するには、代わりに `Shift` + `Enter` を使用します。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yB7m2052mYzgsRgjIMvs.png", alt="Commit live expression with Enter", width="800", height="541" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yB7m2052mYzgsRgjIMvs.png", alt="Enter キーでlive expressionを確定", width="800", height="541" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f6f73b8d9eedbc5b6006e61c3be0d843188eac55 #}

Chromium issue: [1260744](https://crbug.com/1260744)


<!-- ## Cancel user flow recording at the start {: #recorder } -->
## ユーザーフローレコーディングを開始時にキャンセル {: #recorder }

<!-- You can cancel the recording during the start of user flow recording. Previously, there was no option to cancel the recording. -->
ユーザーフローレコーディングの開始中にレコーディングをキャンセルできます。これまでは、レコーディングをキャンセルする手段がありませんでした。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3vhz3UrjLd9lJKcYw2FU.png", alt="Cancel user flow recording at the start", width="800", height="488" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3vhz3UrjLd9lJKcYw2FU.png", alt="ユーザーフローレコーディングを開始時にキャンセル", width="800", height="488" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Display inherited highlight pseudo-elements in the Styles pane {: #pseudo } -->
## Styles ペインで継承されたハイライト疑似要素を表示 {: #pseudo }

<!-- View the inherited highlight pseudo-elements  (e.g. `::selection`, `::spelling-error`, `::grammar-error`, and `::highlight`) in the **Styles** pane. Previously, these rules were not displayed. -->
**Styles** ペインで継承されたハイライト疑似要素（例： `::selection`、`::spelling-error`、`::grammar-error`、`::highlight`）が確認できます。これまでは、これらのルールは表示されませんでした。

<!-- As mentioned in the [specification](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), when multiple styles conflict, cascade determines the winning style. This new feature helps you understand the inheritance and priority of the rules. -->
こちらの[仕様](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade)に記載された通り、複数のスタイルが衝突すると、優先されるスタイルはcascadeが決定します。この新機能はこれらのルールの継承と優先度の理解を助けてくれるでしょう。

{% Aside %}
<!-- At the moment, you need to run Chrome with the `--enable-blink-features=HighlightInheritance` flag to enable this feature. -->
現時点では、この機能を有効にするには `--enable-blink-features=HighlightInheritance` フラグを有効にして Chrome を起動する必要があります。
{% endAside %}

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fD8vohg49HvBPW53GV2Q.png", alt="Display inherited highlight pseudo-elements in the Styles pane", width="800", height="529" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fD8vohg49HvBPW53GV2Q.png", alt="Styles ペインで継承されたハイライト疑似要素を表示", width="800", height="529" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bfe1683fe8b2eaa9ea2960dedca2e4a0bbc73546 #}

Chromium issue: [1024156](https://crbug.com/1024156)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースには、以下のような注目すべき修正点があります。

<!-- - The **Properties** pane now displays accessor properties with value by default. It was hidden mistakenly previously. ([1309087](https://crbug.com/1309087))
- The **Styles** pane now properly shows the overridden `@support` rules as strikethrough. Previously, the rules weren’t strikethrough. ([1298025](https://crbug.com/1298025))
- Fixed the CSS formatting logic in the **Sources** panel that caused multiple blank lines when editing CSS. ([1309588](https://crbug.com/1309588))
- Cap the **Expand recursively** option of an object in the **Console** to maximum 100 so it does not go on forever for circular objects. ([1272450](https://crbug.com/1272450)) -->

- **Properties** ペインはデフォルトでアクセサプロパティを値付きで表示するようになりました。以前は、不具合で隠されていました。（[1309087](https://crbug.com/1309087)）
- **Styles** ペインは上書きされた `@support` ルールを取り消し線付きで適切に表示するようになりました。以前は、それらのルールに取り消し線がありませんでした。（[1298025](https://crbug.com/1298025)）
- CSS を編集するときに複数の空行が発生する原因になっていた **Sources** パネルの CSS フォーマットロジックが修正されました。（[1309588](https://crbug.com/1309588)）
- 循環オブジェクトを無限に辿り続けないように、**Console** のオブジェクトの **Expand recursively** オプションの最大値が100に制限されます。（[1272450](https://crbug.com/1272450)）


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4240f8bc96a3ebd2dc2a5b316fd41c24e20fb3c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cf09d1de8a0277dbaa9e2000a8d2fcca69e7128e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6616b9f0cd3e9f1138fb0f409fbe91206d5c8640 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9751653723e15073588f985ba53ba5204475b8c5 #}


<!-- ## [Experimental] Copy CSS changes {: #copy } -->
## [実験的] CSS の変更をコピー {: #copy }

{% Aside %}
<!-- To enable the experiment, check **Sync CSS changes in the Styles pane** under **Settings** > **Experiments**. -->
この実験的機能を有効にするには、**Settings** > **Experiments** にある **Sync CSS changes in the Styles pane** をチェックしてください。
{% endAside %}

<!-- With this experiment, the **Styles** pane highlights your CSS changes in green. You can hover over the changed rules and click on the new copy button next to it to copy it. -->
この実験的機能を使用すると、**Styles** ペインはあなたの CSS の変更を緑色にハイライトします。コピーするには変更されたルール上にマウスを重ね、その隣にある新しいコピーボタンをクリックします。

<!-- Apart from that, you can copy all CSS changes across declarations by right-clicking on any rule, and selecting **Copy all CSS changes**. -->
それ以外にも、任意のルールを右クリックして、**Copy all CSS changes** を選択すると、宣言全体に渡る CSS の変更をすべてコピーできます。

<!-- A new **Copy** button is added to the [Changes](/docs/devtools/changes/) tab as well to help you keep track and copy your CSS changes with ease! -->
CSS の変更を簡単に追跡してコピーできるように、新しい **Copy** ボタンは [Changes](/docs/devtools/changes/) タブにも追加されました。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7PYMKJNBguswcas6jbpu.png", alt="Copy CSS changes", width="800", height="488", class="screenshot" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7PYMKJNBguswcas6jbpu.png", alt="CSS の変更をコピー", width="800", height="488", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/afe5698f1cd20304d2763574ef8e9faf6a4a6db1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5de1d6140cad945783f3ca54055134f4a7db42a1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/573dfc1cca09e49177ece3898c9ba9619c386f06 #} 

Chromium issue: [1268754](https://crbug.com/1268754)


<!-- ## [Experimental] Picking color outside of browser {: #color-picker } -->
## [実験的] ブラウザ外の色を抽出 {: #color-picker }

{% Aside %}
<!-- To enable the experiment, check **Enable color picking outside the browser window** under **Settings** > **Experiments**. -->
この実験的機能を有効にするには、**Settings** > **Experiments** にある **Enable color picking outside the browser window** をチェックしてください。
{% endAside %}

<!-- Enable this experiment to pick a color outside of the browser with the color picker. Previously, you could only pick a color within the browser. -->
この実験的機能を有効にすると、カラーピッカーでブラウザ外の色を抽出できます。これまでは、ブラウザ内の色しか抽出できませんでした。

<!-- In the **Styles** pane, click on any color preview to open the color picker. Use the eyedropper to pick color from anywhere.  -->
カラーピッカーを開くには、**Styles** ペインで任意のカラープレビューをクリックしてください。スポイトを使用して好きな場所の色を抽出できます。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/h3xLPNl1QdvyuzZpNuqW.png", alt="Picking color outside of browser", width="800", height="450" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/h3xLPNl1QdvyuzZpNuqW.png", alt="ブラウザ外の色を抽出", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1a73be9f3cb75fdd57578224b71396fbf68f8637 #}

Chromium issue: [1245191](https://crbug.com/1245191)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

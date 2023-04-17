---
layout: 'layouts/blog-post.njk'
title: "DevTools の新機能 (Chrome 112)"
authors:
  - jecelynyeen
date: 2023-03-09
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AQfrcqfjHdWzeR3vjapV.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-112
---

*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ja/_partials/devtools/whats-new.md file -->


<!-- ## Recorder updates {: #recorder } -->
## Recorder のアップデート {: #recorder }

<!-- ### Replay extensions support {: #replay-extensions } -->
### リプレイの拡張機能サポート {: #replay-extensions }

<!-- The **Recorder** introduces support for custom replay options that you can embed into DevTools with an extension. -->
**Recorder**に、拡張機能を使ってDevToolsに組み込むことができるカスタムリプレイオプションがサポートされています。

<!-- Try out the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Select the new custom replay option to open the custom replay UI. -->
[拡張機能の例](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay)を試してみてください。新しいカスタムリプレイオプションを選択し、カスタムリプレイのUIを開きましょう。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CAQFVtHyds7ByB0YMZht.png", alt="カスタムリプレイ UI", width="800", height="563" %}

<!-- To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension: explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) and check out more [extension examples](https://github.com/puppeteer/replay/tree/main/examples/). -->
あなたのニーズに合わせて**Recorder**をカスタマイズし、あなたのツールと統合するために、独自の拡張機能を開発することを検討してみましょう: [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) を調べて、[拡張機能の例] (https://github.com/puppeteer/replay/tree/main/examples/) をチェックしてみてください。

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/c2102177581f1c74d38502f469d99b20c1835b1c #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e304e064dbead1d684b5c61f4fb308b101b4a66b #}

Chromium issue: [1400243](https://crbug.com/1400243).

<!-- ### Record with pierce selectors {: #pierce-selectors } -->
### ピアスセレクターを使用した記録 {: #pierce-selectors }

<!-- In addition to [custom, CSS, ARIA, text, and XPath selectors](/docs/devtools/recorder/reference/#selector), you can now record using [pierce selectors](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These selectors behave like CSS ones but can also pierce through shadow roots. -->
[カスタム、CSS、ARIA、テキスト、XPathセレクタ](/docs/devtools/recorder/reference/#selector)に加えて、[ピアスセレクタ](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce)を使用して記録できるようになりました。これらのセレクタはCSSのセレクタと同じように振る舞いますが、シャドウルートを貫通することもできます。

<!-- Start a new recording on a page with [shadow DOM](https://web.dev/shadowdom-v1/) and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** in **Selector types to record**. Record your interaction with elements in the shadow DOM and inspect the corresponding step. -->
[Shadow DOM](https://web.dev/shadowdom-v1/)が含まれるページで新規レコードを開始し、**Selector types to record**で {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** にチェックをつけます。Shadow DOMの中の要素とのインタラクションを記録し、対応するステップを検査します。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Spqbf2DG3Fr0D2sc1kgC.png", alt="ピアスセレクタを使った Recorder の設定; 作動中のピアスセレクタ", width="800", height="534" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/a3968d1c01dd4d1a00b9aa13c50bfdc66995879e #}

Chromium issue: [1411188](https://crbug.com/1411188).

<!-- ### Export as a Puppeteer script with Lighthouse analysis {: #puppeteer-lighthouse } -->
### Lighthouse の解析結果を Puppeteer のスクリプトとして書き出す {: #puppeteer-lighthouse }

<!-- The **Recorder** introduces a new export option: **Puppeteer (including Lighthouse analysis)**. With [Puppeteer](/docs/puppeteer/), you can automate and control Chrome. With [Lighthouse](/docs/lighthouse/), you can capture and improve your website's performance. -->
**Recorder** に新しいエクスポートオプション **Puppeteer (including Lighthouse analysis)** を導入しました。[Puppeteer](/docs/puppeteer/)を使用すると、Chromeを自動化し制御することができます。[Lighthouse](/docs/lighthouse/)を使用すると、ウェブサイトのパフォーマンスを把握し、改善することができます。

<!-- Open your recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export**, select the new option, and save the `.js` file. -->
記録を開き、{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} をクリックします。**Export**で新しいオプションを選択し、`.js`ファイルを保存してください。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ko6OD4tgGwUxqCJScYr9.png", alt="(Lighthouse 解析結果を含む) Puppeteer スクリプトのエクスポート", width="800", height="584" %}

<!-- [Run the Puppeteer script](/docs/puppeteer/get-started/) to get a Lighthouse report in a `flow.report.html` file. -->
[Puppeteerスクリプトを実行](/docs/puppeteer/get-started/)し、Lighthouseのレポートを`flow.report.html`ファイルから取得します。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="Chrome で開いた Lighthouse のレポート", width="800", height="690" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fcaf72d9134e54140cab41c011b7520dd168a340 #}

<!-- ### Get extensions {: #get-extensions } -->
### 拡張機能を手に入れる {: #get-extensions }

<!-- Explore options to customize your recorder experience, for example, with custom export options. Get extensions for the **Recorder** by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions** in a recording. -->
カスタムエクスポートオプションなど、レコーダーの体験をカスタマイズする選択肢を探しましょう。**Recorder**の拡張機能を入手するには、{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions** をクリックします。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="Export ドロップダウンメニュー内の Get extensions オプション", width="800", height="649" %}

<!-- Feel free to [add your own extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/). We look forward to seeing yours on the list! -->
気軽に[Recorder の拡張機能](/docs/devtools/recorder/extensions/)のリストに、[自身の拡張機能を追加](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md)してください。みなさんの拡張機能がリストに載るのを楽しみにしています！

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/21e3d3275c47df8b79c72d1a3e8f9d26cc11fc04 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/b6d02827539eb54869cbb75d3705782bfd2c95ae #}

Chromium issues: [1417104](https://crbug.com/1417104), [1413168](https://crbug.com/1413168).

<!-- ## Elements > Styles updates {: #elements-styles } -->
## Elements > Styles のアップデート {: #elements-styles }

<!-- ### CSS documentation {: #css } -->
### CSS のドキュメンテーション {: #css }

<!-- How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property. -->
CSSのプロパティについて、1日に何回ドキュメントを調べていますか？ **Elements** > **Styles** ペインでプロパティにカーソルを合わせると、短い説明が表示されるようになりました。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="CSS プロパティ上でのドキュメントのツールチップ", width="800", height="651" %}

<!-- The tooltip also has a **Learn more** link that takes you to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this property. -->
ツールチップには、このプロパティに関する[MDN の CSS リファレンス](https://developer.mozilla.org/docs/Web/CSS/Reference)を参照するための **Learn more** リンクも表示されます。

<!-- If you know CSS well, you might find the tooltips bothersome. To turn them all off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**. -->
CSSをよくご存知の方は、ツールチップを煩わしいと感じるかもしれません。これらをすべて消すには、{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show** にチェックをつけてください。

<!-- To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**. -->
機能をオンに戻すには、 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip** にチェックをつけてください。

{% Aside %}
<!-- DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data). -->
DevToolsは、ツールチップの説明を[VS Code Custom Data](https://github.com/microsoft/vscode-custom-data)から取得します。
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5266ee227449dbbc3bc599df1b38cdb36cae4cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4748c98971bfff697f209fe11de892a5b93aca6 #}

Chromium issue: [1401107](https://crbug.com/1401107).

<!-- ### CSS nesting support {: #nesting } -->
### CSS ネスティングのサポート {: #nesting }

<!-- The **Elements** > **Styles** pane now recognizes [CSS Nesting](/articles/css-nesting/) syntax and applies nested styles to the right elements. -->
 **Elements** > **Styles** ペインで、[CSS ネスティング](/articles/css-nesting/) 構文を認識し、入れ子のスタイルを正しい要素に適用するようになりました。

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wog2uOaJTV84OtXcHpYH.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1ed9b6180cb75fcfd43dfac95ac9a40c35e03df #}

Chromium issue: [1172985](https://crbug.com/1172985).

<!-- ## Marking logpoints and conditional breakpoints in the Console {: #logpoint } -->
## Console でログポイントや条件付きブレークポイントをマークする {: #logpoint }

<!-- Further improving the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints: -->
[ブレークポイントUXの強化](/blog/new-in-devtools-111/#breakpoint-redesign)をさらに改善し、 **Console** がブレークポイントによって引き起こされたメッセージをマークするようになりました：

<!-- - `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?` -->
<!-- - [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) messages with pink two dots `..` -->
- [条件付きブレークポイント](/docs/devtools/javascript/breakpoints/#conditional-loc) の中での `console.*` の呼び出しにはオレンジ色の疑問符 `?`
- [ログポイント](/docs/devtools/javascript/breakpoints/#log-loc) メッセージにはピンクの2つのドット `..`

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="Console がブレークポイントによってトリガーされたメッセージを表示する方法の変更: アイコンと適切なソースリンク", width="800", height="566" %}

<!-- The **Console** now gives you proper anchor links to breakpoints in source files instead of `VM<number>` scripts that Chrome creates to run any piece of Javascript on [V8](https://v8.dev/). -->
**Console** では、 Chrome が [V8](https://v8.dev/) 上で任意の Javascript を実行するために作成する `VM<number>` スクリプトではなく、ソースファイル内のブレークポイントへの適切なアンカーリンクが表示されるようになりました。

<!-- Click the link next to the breakpoint message to jump directly to the breakpoint editor. -->
ブレークポイントメッセージの横にあるリンクをクリックすると、ブレークポイントエディタに直接ジャンプします。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="ブレークポイントエディタを開くログポイントメッセージの横にあるアンカーリンク。", width="800", height="811" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c845a441b0fe05c22f88cdb23463edee2b5985b7 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9762db476cd7414d3ce351f32a0564421f66901f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/42448cc63567ac407fd2088597da83aff17c5b55 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4739f48e50d41025aba3c2af94e61cc3069aa563 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb0e41ed3c30bd988c49a76f0cf084f58c0bddc2 #}

Chromium issue: [1027458](https://crbug.com/1027458).

<!-- ## Ignore irrelevant scripts during debugging {: #ignore-list } -->
## デバッグ時に無関係なスクリプトを無視する {: #ignore-list }

<!-- To help you focus on the most important parts of your code, you can now add irrelevant scripts to the **Ignore List** right from the file tree on the **Sources** > **Page** pane. -->
コードの最も重要な部分に集中できるように、 **Sources** > **Page** ペインのファイルツリーから、無関係なスクリプトを **Ignore List** に追加できるようになりました。

<!-- Right-click any script or folder and select one of the ignore-related options. You may see options to add or remove the script or folder to and from the list. The [Debugger ignores scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) added to the list and omits them in the call stack.  -->
スクリプトまたはフォルダを右クリックし、無視関連のオプションのいずれかを選択します。スクリプトまたはフォルダーをリストに追加したり、リストから削除したりするオプションが表示される場合があります。デバッガーはリストに追加された[スクリプトを無視](/docs/devtools/javascript/reference/#show-ignore-listed-frames)し、コールスタックでそれらを省略します。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrL7ZmzMjfhtH4gUW3ST.png", alt="無視に関連したオプションを持つフォルダやスクリプトのコンテキストメニュー", width="800", height="521" %}

<!-- All ignore-listed scripts and folders are grayed out in the file tree. -->
無視リストに登録されたスクリプトやフォルダは、ファイルツリーですべてグレーアウトされます。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DRI11RoakrLnwLZPOJPO.png", alt="無視リストのスクリプトとフォルダはグレー表示されます。More オプションドロップダウンメニューの実験的なオプションを使用してそれらを非表示にすることができます。", width="800", height="542" %}

<!-- If you select an ignored script, the **Configure** button takes you to  -->
<!-- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/). You can also hide ignored sources from the file tree with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} > [**Hide ignore-listed sources**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}. -->
無視されたスクリプトを選択すると、 {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/) を開く **Configure** ボタンが表示されます。
また、{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} > [**Hide ignore-listed sources**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %} で、無視されたソースをファイルツリーから隠すこともできます。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e95d2f3fd27301945a1a095bae4bbcad57326cd8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/736762eda6a6f30d0e9c383998624e53ee04a6e2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2257f7bca42753d744b56f5b99b461a6f0494131 #}

Chromium issue: [883325](https://crbug.com/883325).

<!-- ## JavaScript Profiler deprecation started {: #js-profiler-deprecation } -->
## JavaScript Profiler の非推奨化を開始 {: #js-profiler-deprecation }

<!-- As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance. -->
[Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/) の時点で、DevToolsチームは、最終的に **JavaScript Profiler** を廃止し、Node.js および Deno 開発者には **Performance** パネルを使用して JavaScript CPU パフォーマンスのプロファイルをしてもらうことを計画していました。

<!-- This DevTools version (112) starts the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). The **JavaScript Profiler** panel now shows the corresponding warning banner. -->
この DevTools バージョン(112)から、[4段階の **JavaScript Profiler** 非推奨化](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668)を開始します。 **JavaScript Profiler** パネルに対応する警告バナーが表示されるようになりました。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v4S5YWGdBV3nbc3OkGZ3.png", alt="Profiler の上部にある非推奨を表示するバナー", width="800", height="712" %}

<!-- Instead of the **Profiler**, use the [**Performance**](/docs/devtools/performance/reference/#main) panel to profile CPU. -->
CPU のプロファイルは、 **Profiler** の代わりに [**Performance**](/docs/devtools/performance/reference/#main) パネルを使ってください。

<!-- Learn more and provide feedback in the corresponding [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) and [crbug.com/1354548](https://crbug.com/1354548).  -->
[RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) および [crbug.com/1354548](https://crbug.com/1354548) で詳細を確認し、フィードバックしてください。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/71244f613a27289936b979fe515346137d0190f8 #}

Chromium issue: [1417647](https://crbug.com/1417647).

<!-- ## Emulate reduced contrast {: #reduced-contrast } -->
## コントラスト低減をエミュレートする {: #reduced-contrast }

<!-- The [**Rendering**](/docs/devtools/rendering/#open-rendering) tab adds a new option to the [Emulate vision deficiencies](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) list—**Reduced contrast**. With this option, you can discover how your website looks to people with reduced contrast sensitivity. -->
[**Rendering**](/docs/devtools/rendering/#open-rendering) タブでは、 [Emulate vision deficiencies](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) に新しいオプション **Reduced contrast** を追加しました。このオプションを使用すると、コントラスト感度が低下している人にあなたのウェブサイトがどのように見えるかを確認できます。

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7qrlmuO7R47l5mytvoeQ.png", alt="Rendering > Emulate vision deficiencies でのコントラストを下げるオプション", width="800", height="574" %}

<!-- Note that the list options have been updated to tell you what color insensitivity the options represent. -->
なお、リストオプションが更新され、そのオプションがどのような色覚異常を表すかがわかるようになりました。

<!-- With DevTools, you can find and fix all contrast issues at once. For more information, see [Make your website more readable](/docs/devtools/accessibility/contrast/). -->
DevTools を使えば、すべてのコントラストの問題を一度に見つけて修正することができます。詳しくは、 [Make your website more readable](/docs/devtools/accessibility/contrast/) を参照してください。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0eaaa173c9e2cd357c99f7a275fe1819b86f0b9a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/768af28f8cf64e10d23b10556b59dc0770cc14b6  #}

Chromium issues: [1412719](https://crbug.com/1412719), [1412721](https://crbug.com/1412721).

<!-- ## Lighthouse 10 {: #lighthouse } -->
## Lighthouse 10 {: #lighthouse }

<!-- The **Lighthouse** panel now runs [Lighthouse 10.0.1](/blog/lighthouse-10-0/). For more details, see [What's new in Lighthouse 10.0.1](/blog/lighthouse-10-0/). -->
**Lighthouse** パネルが [Lighthouse 10.0.1](/blog/lighthouse-10-0/) を実行するようになりました。詳しくは、 [Lighthouse 10.0.1の新機能](/blog/lighthouse-10-0/) をご覧ください。

<!-- **Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Legacy navigation** is now disabled by default. This option uses legacy [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) in navigation mode. -->
**Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Legacy navigation** はデフォルトで無効になっています。このオプションは、ナビゲーションモードでレガシーな [Lighthouse 設定](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) を使用します。

<!-- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mYuX9d2TFaJuWBOYGN5R.png", alt="Disabled legacy navigation.", width="800", height="548" %} -->
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mYuX9d2TFaJuWBOYGN5R.png", alt="レガシーナビゲーションを無効化", width="800", height="548" %}

<!-- Lighthouse 10 now uses Moto G Power as the [default emulation device](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools added this device to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/). -->
Lighthouse 10では、 Moto G Power を[デフォルトのエミュレーションデバイス](https://github.com/GoogleChrome/lighthouse/pull/14674)として使用するようになりました。 DevTools はこのデバイスを {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/) に追加しました。

<!-- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GpqmLAiuNasdRsfisVS7.png", alt="Moto G Power in the Devices list.", width="800", height="488" %} -->
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GpqmLAiuNasdRsfisVS7.png", alt="デバイスリスト中の Moto G Power", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f9f7b395e2965356dfcaed026b5a1d141c19c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de6c4e5973980ad98d7d1699faa4e1059f102c4d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a6ca7d24e2fa33c6adfef22ee708f489657dee2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24e50e4e50bc6e19930df75385c316ba866e9588 #}

Chromium issue: [772558](https://crbug.com/772558).

<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースでは、以下のような注目すべき修正が行われています：

<!-- - The [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) pane now shows differentiating file paths next to ambiguous file names ([1403924](crbug.com/1403924)). -->
<!-- - The [**Main** section](/docs/devtools/performance/reference/#main) in the flame chart of the **Performance** panel now designates `CpuProfiler::StartProfiling` as `Profiler Overhead` ([1358602](https://crbug.com/1358602)). -->
<!-- - DevTools improved autocompletion: -->
<!--   - **Sources**: Consistent completions of any word ([1320204](https://crbug.com/1320204)). -->
<!--   - **Console**: `Arrow down` selects the first suggestion and suggestions get `Tab` hints ([1276960](https://crbug.com/1276960)). -->
<!-- - DevTools added an [event listener breakpoint](/docs/devtools/javascript/breakpoints/#event-listeners) to let you pause when you open a [Document Picture-in-Picture window](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)). -->
<!-- - DevTools set up a workaround that properly displays Vue2 webpack artifacts as JavaScript ([1416562](https://crbug.com/1416562)). -->
<!-- - A [**Console** setting](/docs/devtools/settings/preferences/#console) gets a better name: Automatically expand console.trace() messages. ([1139616](https://crbug.com/1139616)). -->
- [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) ペインで、あいまいなファイル名の横に区別できるファイルパスを表示するようになりました([1403924](crbug.com/1403924)).
- **Performance** パネルのフレームチャートの [**Main** セクション](/docs/devtools/performance/reference/#main) で、 `CpuProfiler::StartProfiling` を `Profiler Overhead` ([1358602](https://crbug.com/1358602)) と指定するようにしました。
- DevToolsのオートコンプリートを改善しました：
  - **Sources**: 任意の単語の一貫した補完（[1320204](https://crbug.com/1320204)）。
  - **Console**: `Arrow down` で最初の候補が選択され、`Tab` で候補のヒントが得られます([1276960](https://crbug.com/1276960))。
- DevTools に[イベントリスナーブレークポイント](/docs/devtools/javascript/breakpoints/#event-listeners)を追加し、[ドキュメントのピクチャーインピクチャーウィンドウ](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)) を開く際に一時停止できるようにしました。
- DevToolsは、 Vue2 の webpack アーティファクトを JavaScript として適切に表示するワークアラウンドを設定しました（[1416562]（https://crbug.com/1416562））。
- [**Console** の設定](/docs/devtools/settings/preferences/#console)が、より良い名前になりました: Automatically expand console.trace() messages ([1139616](https://crbug.com/1139616)).


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

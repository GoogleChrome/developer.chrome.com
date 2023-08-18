---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 105)"
authors:
  - jecelynyeen
date: 2022-08-12
updated: 2022-08-12
description: "Recorder パネルでのステップ・バイ・ステップ再生、Performance insight パネルの LCP など"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eOydOZANFrr8g31NgCbV.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-105
---

*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='bHw_56RiVsg' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the site/_includes/partials/devtools/[lang]/whats-new.md file -->


<!-- ## Step-by-step replay in the Recorder {: #recorder } -->
## Recorder パネルでのステップ・バイ・ステップ再生 {: #recorder }

<!-- You can now set a breakpoint and replay a user flow step by step in the **Recorder** panel. -->
**Recorder** パネルでブレークポイントを設定して、ステップ・バイ・ステップでユーザーフローを再生できるようになりました。

<!-- To set a breakpoint, click on the blue dot next to a step. Replay your user flow, the replay will pause before executing the step. From here, you can continue the replay, execute a step, or cancel the replay. -->
ブレークポイントを設定するには、ステップの横にある青い点をクリックします。ユーザーフローを再生すると、そのステップを実行する直前で再生が一時停止します。そこから、再生の継続や、ステップ実行、再生のキャンセルが可能です。

<!-- With this feature, you can fully visualize and debug your user flow with ease. -->
この機能を用いれば、ユーザーフローを完全に可視化できデバッグが簡単になります。

<!-- See [Recorder features reference](/docs/devtools/recorder/reference/) for more information. -->
更に詳細な情報は [Recorder 機能リファレンス](/docs/devtools/recorder/reference/) を参照してください。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Step-by-step replay in the Recorder", width="800", height="547" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Recorder パネルでのステップ・バイ・ステップ再生", width="800", height="547" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Support mouse over event in the Recorder panel {: #recorder-hover } -->
## Recorder パネルでのマウスオーバーイベントのサポート {: #recorder-hover }

<!-- The **Recorder** now supports adding a mouse over (hover) step manually in a recording.  -->
**Recorder** パネルがレコーディング中の手動でのマウスオーバー（ホバー）ステップの追加をサポートするようになりました。

<!-- [This demo](https://jec.fish/demo/menu-hover) shows a pop up menu on hover. Try to record a user flow and click a menu item. -->
[このデモ](https://jec.fish/demo/menu-hover)はホバーするとポップアップメニューを表示します。ユーザーフローを記録しながらメニューアイテムをクリックしてみてください。

<!-- If you replay the user flow now, it will fail because the **Recorder** doesn’t capture mouse over events automatically during recording. To resolve this, [add a step manually](/docs/devtools/recorder/reference/#add-and-remove-steps) to hover over the selector before clicking the menu item.  -->
このままユーザーフローを再生しようとすると、**Recorder** は記録中にマウスオーバーイベントを自動でキャプチャしないので失敗します。この問題を解決するには、メニューアイテムをクリックする前にそのセレクタのホバーオーバーのための[ステップを手動で追加](/docs/devtools/recorder/reference/#add-and-remove-steps)してください。


<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Support mouse over event in the Recorder", width="800", height="488" %}-->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Recorder パネルでのマウスオーバーイベントのサポート", width="800", height="488" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Largest Contentful Paint (LCP) in the Performance insights panel {: #lcp } -->
## Performance insight パネルに Largest Contentful Paint (LCP) を追加 {: #lcp }

<!-- LCP is an important, user-centric metric for measuring [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics). You can now find out the critical paths and root causes of a [Largest Contentful Paint (LCP)](https://web.dev/lcp/). -->
LCP は[認識される読み込み速度](https://web.dev/user-centric-performance-metrics/#types-of-metrics)を測定する重要なユーザー中心メトリクスのひとつです。これからはクリティカルパスと [Largest Contentful Paint (LCP)](https://web.dev/lcp/) の主な要因を見つけることができます。

<!-- In a [performance recording](/docs/devtools/performance-insights/#record), click on the LCP badge in the **Timeline**. In the **Details** pane, you can view the LCP score, learn how to fix resources that slow down the LCP and see the critical path for the LCP resource. -->
[performance recording](/docs/devtools/performance-insights/#record)で、**Timeline** にある LCP バッジをクリックしてください。**Details** ペインで、LCP スコアを見て、LCP を遅滞させているリソースをどのように修正すればいいかを学び、LCP リソースのクリティカルパスを確認できます。

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
パネルで実行可能なアドバイスを確認してウェブサイトのパフォーマンスを向上させる方法を学ぶには、[Performance Insights](/docs/devtools/performance-insights/) を参照してください。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="LCP in the Performance insights panel", width="800", height="751" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="Performance insight パネルの LCP", width="800", height="751" %}

Chromium issue: [1326481](https://crbug.com/1326481)


<!-- ## Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts {: #foit-fout } -->
## レイアウトシフトの潜在的な主要因であるテキストのフラッシュ（FOIT、FOUT）を識別 {: #foit-fout }

<!-- The **Performance insights** panel now detects [flash of invisible text (FOIT) and flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) as potential root causes for layout shifts. -->
**Performance insights** パネルはレイアウトシフトの潜在的な主要因として [flash of invisible text (FOIT) と flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) を検出できるようになりました。

<!-- To view the potential root causes of a layout shift, click on a screenshot in the **Layout shifts** track. -->
レイアウトシフトの潜在的な主要因を確認するには、**Layout shifts** トラックにあるスクリーンショットをクリックしてください。

<!-- See [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) to learn the technique to prevent layout shifts.  -->
レイアウトシフトを避けるテクニックについて学ぶには [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) を参照してください。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="FOUT in the Performance insights panel", width="800", height="497" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="Performance insights パネルの FOUT", width="800", height="497" %}

Chromium issues: [1334628](https://crbug.com/1334628), [1328873](https://crbug.com/1328873)


<!-- ## Protocol handlers in the Manifest pane {: #manifest } -->
## Manifest ペインの Protocol ハンドラ {: #manifest }

<!-- You can now use DevTools to test the [URL protocol handler registration](https://web.dev/url-protocol-handler/) for [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/). -->
DevTools を使用して [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/) のための [URL protocol handler registration](https://web.dev/url-protocol-handler/) をテストできるようになりました。

<!-- The URL protocol handler registration lets installed PWAs handle links that use a specific protocol (e.g. [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) for a more integrated experience. -->
URL protocol handler registration を使用するとインストールされた PWA が特定のプロトコル（例、[`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme)、`web+example`）が使用されたリンクを処理して、より統一感のある体験を提供できます。

<!-- Navigate to the **Protocol Handlers** section via the **Application** > **Manifest** pane. You can view and test all the available protocols here. -->
**Application** > **Manifest** パネルから **Protocol Handlers** を開いてください。ここで利用可能なすべてのプロトコルの確認と、テストが可能です。

<!-- For example, install [this demo PWA](https://protocol-handler.glitch.me/). In the **Protocol Handlers** section, type “americano” and click **Test protocol** to open the coffee page in the PWA.  -->
例えば、[デモ PWA](https://protocol-handler.glitch.me/)をインストールしてください。**Protocol Handlers** セクションで、`"americano"` と入力し、**Test protocol** をクリックすると PWA 内でコーヒーのページが開きます。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Protocol handlers in the Manifest pane", width="800", height="402" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Manifest ペインの Protocol ハンドラ", width="800", height="402" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc2291cce5c5d199540334d01fcfe27207bc5962 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1aa36584d580ed5aa2caf7a8533f2c89b16ab66b #}

Chromium issues: [1300613](https://crbug.com/1300613)


<!-- ## Top layer badge in the Elements panel {: #top-layer } -->
## Elements パネルの Top layer バッジ {: #top-layer }

<!-- Use the [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) to understand the concept of the top layer and visualize how the top layer content changes.  -->
トップレイヤのコンセプトと、トップレイヤ内容の変更がどのように可視化されるかを理解するには [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) を確認してください。

<!-- The [`<dialog>` element](https://web.dev/building-a-dialog-component/) has recently become stable across browsers. When you open a dialog, it is put into a [top layer](/blog/top-layer-devtools/). Top level content renders on top of all the other content.  -->
[`<dialog>` 要素](https://web.dev/building-a-dialog-component/)は最近ブラウザで安定版になりました。ダイアログを開くと、その内容が [top layer](/blog/top-layer-devtools/) に配置されます。トップレベルコンテンツはその他すべてのコンテンツの上に描画されます。

<!-- In this [demo](https://jec.fish/demo/dialog), click **Open dialog**.  -->
この[デモ](https://jec.fish/demo/dialog)で、**Open dialog** をクリックしてください。

<!-- To help visualize the top layer elements, DevTools adds a top layer container (`#top-layer`) to the DOM tree. It resides after the closing `</html>` tag.   -->
トップレイヤ要素の可視化を補助するために、DevTools は DOM ツリーにトップレイヤコンテナ（`#top-layer`）を追加します。

<!-- To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element or its backdrop in the top layer container. -->
トップレイヤコンテナ要素からトップレイヤツリー要素に割り込むには、トップレイヤコンテナ内の、要素の横にある **reveal** ボタンか backdrop をクリックしてください。

<!-- Next to the top layer tree element (for example, the dialog element), click the **top-layer** badge to jump to the top layer container. -->
トップレイヤツリー要素（例えば、`dialog` 要素）の次の、トップレイヤコンテナに割り込むには **top-layer** バッジをクリックします。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Top layer badge in the Elements panel", width="800", height="538" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Elements パネルの Top layer バッジ", width="800", height="538" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8d58fa6e258423aef2b00ead3aea563629eef43 #}

Chromium issue: [1313690](https://crbug.com/1313690)


<!-- ## Attach Wasm debugging information at runtime {: #wasm } -->
## 実行時に WASM のデバッグ情報をアタッチ {: #wasm }

<!-- You can now attach DWARF debugging information for wasm during runtime. Previously, the **Sources** panel only supported attaching sourcemaps to JavaScript and Wasm files. -->
実行時に wasm に DWARF デバッグ情報をアタッチできるようになりました。これまでは、**Sources** パネルが JavaScript と Wasm ファイルへのソースマップのアタッチをサポートしているだけでした。

<!-- Open a Wasm file in the **Sources** panel. Right-click in the editor and select **Add DWARF debugging info…**  to attach debugging information on demand.  -->
**Sources** パネルで Wasm ファイルを開いてください。必要に応じてエディタ内で右クリックして、**Add DWARF debugging info…** を選択し、デバッグ情報をアタッチできます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5DMV6DFNGRYkrXyBtlg.png", alt="実行時に WASM のデバッグ情報をアタッチ", width="800", height="559" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/112d6ec238ea3b1cb12f1cabc5b988afc74022db  #}

Chromium issue: [1341255](https://crbug.com/1341255)


<!-- ## Support live edit during debugging {: #live-edit } -->
## デバッグ中のライブ編集をサポート {: #live-edit }

<!-- You can now edit the top-most function on the stack without restarting the debugger. -->
デバッガをリスタートすることなく、スタック上で最上位にある関数を編集できるようになりました。

<!-- In Chrome 104, DevTools brings back the [restart frame](/blog/new-in-devtools-104/) feature. However, you weren't able to edit the function you are currently paused in. It is common for developers to break in a function and then edit that function while paused.  -->
Chrome 104 の DevTools で [restart frame](/blog/new-in-devtools-104/) 機能が復活しましたが、そこでは停止している関数を編集することはできませんでした。関数を中断し、停止中にその関数を編集することは開発者にとって珍しい作業ではありません。

<!-- With this update, the debugger automatically restarts the function with the following restrictions: -->
今回のアップデートでは次のような制限がありますが、デバッガが自動的に関数を再起動します。

<!-- - Only the top-most function can be edited while paused -->
<!-- - No recursive call on the same function further down the stack -->
- 一時停止中は最上位の関数だけが編集可能
- スタックを深くする同一関数の再帰呼び出しは禁止

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="live edit during debugging", width="800", height="560" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="デバッグ中のライブ編集", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b41deeb8b0b228ea4628a49e79a7ce4d8ab32ffa #}

Chromium issue: [1334484](https://crbug.com/1334484)


<!-- ## View and edit @scope at rules in the Styles pane {: #scope } -->
## Styles ペインで @scope at-rule の閲覧と編集 {: #scope }

<!-- You can now view and edit the [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) in the **Styles** pane.  -->
**Styles** ペインで [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) の閲覧と編集が可能になりました。

<!-- The `@scope` at rules is part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow developers to scope style rules in CSS. -->
`@scope` at-rule は [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/) に含まれます。これらのルールを使用すると開発者が CSS 内でスタイルのルールのスコープを制限できます。

<!-- Open [this demo page](https://codepen.io/miriamsuzanne/details/ZErXZVY) and inspect the hyperlink within the `<div class=”dark-theme”>` element. In the **Styles** pane, view the `@scope` at-rules. Click the rule declaration to edit it. -->
[このデモページ](https://codepen.io/miriamsuzanne/details/ZErXZVY)を開き、`<div class=”dark-theme”>` 要素内のハイパーリンクをインスペクトしてください。**Styles** ペインで、`@scope` at-rule を確認できます。また、ルール宣言をクリックして編集することも可能です。

{% Aside %}
<!-- The CSS `@scope` is currently under development. To test this feature, enable the **Experimental Web Platform features** flag via `chrome://flags/#enable-experimental-web-platform-features`. -->
CSS `@scope` は現在開発中です。この機能を確認するには、`chrome://flags/#enable-experimental-web-platform-features` から **Experimental Web Platform features** フラグを有効にしてください。
{% endAside %}

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="@scope at rules in the Styles pane", width="800", height="464" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="Styles ペインの @scope at-rule", width="800", height="464" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b2309caa9ea358bc07d4d48eb976cc3dc6884cd #}

Chromium issue: [1337777](https://crbug.com/1337777)


<!-- ## Source map improvements {: #sourcemaps } -->
## Source map の改善 {: #sourcemaps }

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
デバッグ体験全体を改善するためにソースマップにいくつかの修正が加えられました。

<!-- - DevTools now properly resolves source map identifiers with punctuation. Some modern minifiers (for example, [esbuild](https://esbuild.github.io/)) produce sourcemaps that merge identifiers with subsequent punctuation (comma, parentheses, semicolon).  -->
- 句読点を含むソースマップの識別子を DevTools で適切に解決できるようになりました。いくつかのモダンなミニファイア（例、[esbuild](https://esbuild.github.io/)）は識別子を連続した句読点（カンマ、括弧、セミコロン）で結合したソースマップを生成します。

<!-- - DevTools now resolves source map names for constructors with a `super` call. -->
- DevTools は `super` 呼び出しを含むコンストラクタのソースマップ名を解決できます。


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6djFfkrtPzXuNYq5m8Vk.png", alt="Source map の改善", width="800", height="441" %}

<!-- - Fixed source map URL indexing for duplicate canonical URLs. Previously, breakpoints were not activated in some files because of duplicate canonical URLs. -->
- 重複したカノニカル URL のソースマップでの URL インデクシングの修正。これまでは重複したカノニカル URL が原因でブレークポイントがいくつかのファイルで有効にならないことがありました。


Chromium issue: [1335338](https://crbug.com/1335338), [1333411](https://crbug.com/1333411)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースの目立った改善点には次のようなものがあります。

<!-- - Properly remove a local storage key value pair from the table in the **Application** > **Local Storage** pane when it is deleted. ([1339280](https://crbug.com/1339280)) -->
- **Application** > **Local Storage** ペインのテーブルからローカルストレージのキー値ペアを適切に削除できるようになりました。（[1339280](https://crbug.com/1339280)）
<!-- - The color previews are now correctly displayed when viewing CSS files in the **Sources** panel. Previously, their positions were misplaced. ([1340062](https://crbug.com/1340062)) -->
- **Sources** パネルで CSS ファイルを閲覧するときにカラープレビューが正しく表示されるようになりました。
これまでは、間違った位置に表示されていました。（[1340062](https://crbug.com/1340062)）
<!-- - Consistently display the CSS flex and grid items in the **Layout** pane, as well as display them as badges in the **Elements** panel. Previously, the flex and grid items were randomly missing in both places. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992)) -->
-
**Elements** パネルでのバッジ表示と合わせて、**Layout** ペインで CSS の flex と grid アイテムの表示が一貫したものになりました。これまでは、flex と grid アイテムはいずれの場所でもときどき表示されないことがありました。（[1340441](https://crbug.com/1340441)、[1273992](https://crbug.com/1273992)）
<!-- - A new **Creator Ad Script** link is available for [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) if DevTools found the script that caused the frame to be labeled as an ad. You can open a frame via **Application** > **Frames**. ([1217041](https://crbug.com/1217041)) -->
- DevTools が広告としてラベル付けされるフレームの原因となるスクリプトを見つけると、[ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) のために、**Creator Ad Script** リンクが新しく利用できるようになりました。**Application** > **Frames** からフレームを開くことができます。（[1217041](https://crbug.com/1217041)）

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

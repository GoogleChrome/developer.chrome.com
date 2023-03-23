---
layout: 'layouts/blog-post.njk'
title: "DevTools の新機能 (Chrome 109)"
authors:
  - jecelynyeen
date: 2023-01-15
description: 'Recorderでのステップをスクリプトとしてコピー、パフォーマンスの記録内での実際の関数名など'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UqqItV4gvfSFJnAqzrhJ.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-109
---

*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ja/_partials/devtools/whats-new.md file -->


<!-- ## Recorder: Copy as options for steps, in-page replay, step’s context menu {: #recorder } -->

## Recorder: ステップごとのCopy asオプション、ページ内リプレイ、ステップのコンテキストメニュー {: #recorder }

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="New copy options in the Recorder panel.", width="800", height="615" %}
-->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="Recorder パネルの新しいコピーオプション", width="800", height="615" %}

<!-- Open an existing user flow in the **Recorder**. Previously, when you replayed the user flow, DevTools would always start the replay by navigating to or reloading the page. -->
**Recorder**内で既存のユーザーフローを開いてください。これまでは、ユーザーフローをリプレイすると、DevToolsは常にそのページを開くか、リロードするところからリプレイを開始していました。

<!-- With the latest updates, the **Recorder** shows the navigation step separately. You can right-click and remove it to perform in-page replay!  -->
最新バージョンでは、**Recorder**はそのナビゲーションステップを独立して表示します。右クリックして削除すると、ページ内リプレイを実行できます！

<!-- Apart from that, you can right-click a step and copy it to the clipboard in the **Recorder* panel instead of exporting the whole user flow. It works with [extensions](https://goo.gle/recorder-extension) too. For example, try to copy a step as a [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. With this feature, you can update any existing script with ease. -->
その他、ユーザーフロー全体をエクスポートする代わりに、**Recorder**パネルでステップを右クリックしてクリップボードにコピーできます。この機能は[拡張機能](https://goo.gle/recorder-extension)とも組み合わせて利用できます。例えば、ステップを[Nightwatch Test](https://bit.ly/nightwatch-recorder)スクリプトとしてコピーしてみてください。この機能を使用すると、既存のスクリプトを簡単に更新できます。

<!-- Previously, you could access the step menu only through the 3-dot button. You can now right-click anywhere on the step to access the menu. -->
これまで、ステップメニューにアクセスする手段は3ドットボタンしかありませんでしたが、ステップの好きな場所を右クリックすることでそのメニューにアクセスできるようになりました。


Chromium issues: [1322313](https://crbug.com/1322313), [1351649](https://crbug.com/1351649), [1322313](https://crbug.com/1322313), [1339767](https://crbug.com/1339767)


<!-- ## Show actual function names in performance’s recordings {: #performance } -->
## パフォーマンスの記録の中で実際の関数名を表示 {: #performance }

<!-- The **Performance** panel now shows the actual function names and their sources in the trace if there’s a source map. -->
ソースマップが存在すれば、**Performance**パネルのトレース内で実際の関数名とそのソースが表示されるようになりました。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="Show before and after comparison of function names display in the Performance panel.", width="800", height="509" %}
-->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="Performance パネルの修正前後の関数名の比較", width="800", height="509" %}

<!-- In this example, a source file is minified during production. For example, the `sayHi` function is minified as `n`, and the `takeABreak` function is minified as `o` in this [demo](https://clinquant-mousse-2f2396.netlify.app/). -->
この例では本番環境ではソースファイルはミニファイされています。例えば、この[デモ](https://clinquant-mousse-2f2396.netlify.app/)では、`sayHi` 関数は `n` と、`takeABreak` 関数は `o` とミニファイされます。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="Show files before and after minfication.", width="800", height="392" %}
-->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="ミニファイ前と後のファイル", width="800", height="392" %}

<!-- Previously, when you recorded a trace in the **Performance** panel, the trace only showed you the minified function names. This made it harder to debug.  -->
これまでは、**Performance**パネルでトレースを記録すると、トレースにはミニファイされた関数名だけが表示され、デバッグが難しくなっていました。

<!-- With the latest changes, DevTools now reads the source map and shows the actual function names and source location.  -->
最新の変更で、DevToolsはソースマップを読み取り、実際の関数名とソース内の位置を表示するようになりました。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4be8b5bcc00889ca35a455aa093ec242dce8ce6c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24d850860bda04864069e6c0d4dab32c8f53bc7f  #}

Chromium issues: [1364601](https://crbug.com/1364601), [1364601](https://crbug.com/1364601)


<!-- ## New keyboard shortcuts in the Console & Sources panel {: #keyboard-shortcuts } -->
## ConsoleとSourcesパネルでの新しいキーボードショートカット {: #keyboard-shortcuts }

<!-- You can switch between tabs in the **Sources** panel using: -->
<!-- On MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd> -->
<!-- On Windows and Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd> -->
**Sources**パネル内で次のようにしてタブを切り替えることができます:
MacOS では、<kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>上下カーソルキー</kbd>。
Windows と Linux では、<kbd>Control</kbd> + <kbd>Page up</kbd>または<kbd>Page down</kbd>。

<!-- Moreover, you can navigate the autocomplete suggestions with <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd> on MacOS, similar to [Emacs](https://www.gnu.org/software/emacs/). For example, you can type `window.` in the `Console` and use these shortcuts to navigate. -->
さらに、[Emacs](https://www.gnu.org/software/emacs/) と同様に <kbd>Ctrl</kbd> + <kbd>N</kbd> と <kbd>Ctrl + P</kbd> で、オートコンプリートの提案をナビゲートできます。例えば、`Console` で `window.` と入力した後で、このショートカットを使用してオートコンプリートを操作できます。

<!-- On top of that, DevTools now accepts <kbd>Arrow Right</kbd> for autocompletion only at the end of line. For example, an autocomplete dialog shows when you are editing something in the middle of the code. When you press the <kbd>Arrow Right</kbd> key, most likely, you want to set the cursor to the next position instead of autocomplete. This UX change better aligns with your authoring workflow. -->
その上で、DevTools は行の一番最後でだけ<kbd>右カーソルキー</kbd>をオートコンプリートのために使用できるようになります。例えば、コードのどこかで編集しているときにオートコンプリートダイアログが表示されるとします。そこで<kbd>右カーソルキー</kbd>を入力するなら、おそらく、オートコンプリートの操作ではなく、カーソルを次の位置に移動することが目的でしょう。この UX の変更はあなたの作業意図により沿うものです。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/686acb9789020a511405a53a13ad754a7e928c99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/09c3ceaa1605b29d1074d0cf310958bdb823149d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6468c740419d01d4e13c9ad914001959e78ca782 #}

Chromium issue: [1167965](https://crbug.com/1167965), [1172535](https://crbug.com/1172535),  [1371585](https://crbug.com/1371585). [1369503](https://crbug.com/1369503)


<!-- ## Improved JavaScript debugging {: #debugging } -->
## JavaScript デバッグの改善 {: #debugging } -->

<!-- These are some JavaScript debugging improvements in this release: -->
今回のリリースには JavaScript デバッグの改善がいくつか含まれています。

<!-- - `new.target` is a meta-property that lets you detect whether a function or constructor was called using the new operator. You can now log `new.target` in the **Console** to check its value during debugging. Previously, it would return errors when you entered `new.target`.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="Show before and after comparison of new.target evaluation debugging.", width="800", height="499" %}
- A `WeakRef` object lets you hold a weak reference to another object, without preventing that object from getting garbage-collected. DevTools now shows an inline preview for the value and evaluates the weak reference directly in the console during debugging. Previously, you had to explicitly call “deref” on them to resolve it.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="Show before and after comparison of WeakRef evaluation during debugging.", width="800", height="453" %}
- Fixed inline preview for shadowed variable. Previously, the display value was incorrect.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="Show before and after comparison inline preview for shadowed variable.", width="800", height="519" %}
- Deobfuscate variable names in `Generator` and `async` functions in the **Scope** pane in the **Sources** panel. -->

- `new.target` はメタプロパティで、このプロパティを使用すると関数やコンストラクタが new 演算子を使用して呼び出されたものかどうかを確認できます。 **Console** で `new.target` をログ出力してデバッグ中にその値を確認できるようになりました。これまでは、`new.target` を入力するとエラーになっていました。
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="Show before and after comparison of new.target evaluation debugging.", width="800", height="499" %}
- `WeakRef` オブジェクトを使用すると、別のオブジェクトがガーベジコレクタに回収されることを妨げないように、そのオブジェクトの弱参照を保持できます。 DevTools はその値をインラインプレビューし、デバッグ中にコンソール内で直接弱参照を評価できるようになりました。これまでは、明示的に `deref` を呼び出して解決する必要がありました。
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="Show before and after comparison of WeakRef evaluation during debugging.", width="800", height="453" %}
- シャドウされた変数のインラインプレビューが修正されました。これまでは、表示される値が間違っていました。
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="Show before and after comparison inline preview for shadowed variable.", width="800", height="519" %}
- **Sources** パネル内の **Scope** ペインで、`Generator` と `async` 関数内の変数名の難読化を解除


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bec401b1934ca55f9d742ee68f72cca4de47931 #}
{# https://chromium.googlesource.com/v8/v8/+/b2892b5f24b7b97ad930356a9376b8a9b2a1d360 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b92fd6fc20ab07c9791f374e0e41c54863c7ad3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/17e5e4392d054dc0a3af46eefff7caef6b4ce975 #}

Chromium issues: [1267690](https://crbug.com/1267690), [1246863](https://crbug.com/1246863) [1371322](https://crbug.com/1371322), [1311637](https://crbug.com/1311637)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースに含まれる、注目すべき修正は次のようなものです。

<!-- - Support more hints for inactive CSS properties in the **Styles** pane - inline height and width, flex and grid properties. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508)) -->
- **Styles** ペインで無効な CSS プロパティに関するより多くのヒントをサポート - インラインの高さと幅、flex と grid のプロパティ。 ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508))
<!-- - Fixed syntax highlighting. It was not working properly since the recent [code editor](https://codemirror.net/) upgrade in DevTools. ([1290182](https://crbug.com//1290182)) -->
- シンタックスハイライトの修正。これは DevTools 内の最近の [code editor](https://codemirror.net/) の更新以降正しく動いていませんでした。 ([1290182](https://crbug.com//1290182))
<!-- - Capture input change events properly after on blur event in the **Recorder**. ([1378488](https://crbug.com/1378488)) -->
- **Recorder** 内の blur イベントの後の input change イベントを正しくキャプチャ。 ([1378488](https://crbug.com/1378488))
<!-- - Update Puppeteer replay script on export for better debugging experience in the **Recorder**. ([1351649](https://crbug.com/1351649)) -->
- **Recorder** 内でのデバッグ体験を改善するために、エクスポートされる Puppeteer リプレイスクリプトを更新。 ([1351649](https://crbug.com/1351649))
<!-- - Support record and replay in the **Recorder** for remote debugging. ([1185727](https://crbug.com/1185727))  -->
- リモートデバッグの際の **Recorder** での記録とリプレイをサポート。 ([1185727](https://crbug.com/1185727))
<!-- - Fixed parsing of special CSS variable names in `var()`. Previously, DevTools didn't support parsing variables with escaped characters like `var(- -fo\ o)`. , ([1378992](https://crbug.com/1378992)) -->
- `var()` 内の特別な CSS 変数名のパースを修正。これまで、DevTools は `var(--fo\ o)` のようなエスケープキャラクタを含む変数のパースををサポートしていませんでした。 ([1378992](https://crbug.com/1378992))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7bbaba2b82bb3b8c90e8d47c1f36fba2182c5e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2767a58a7b4d306ce737c342d57e0fa330d8b08f  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b42002b898216e97acf94627d5d3d745a1ba1252 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0cdc185928246ca5b7e320763f8c942c8a1d2db  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55382b27eff3539c8aba42ea501eb8de4f7ba57c #}


<!-- ## [Experimental] Enhanced UX in managing breakpoints -->
## [実験的] ブレークポイント管理の UX 改善

{% Aside %}
<!-- To enable the experiment, check **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** under **Settings** > **Experiments**. -->
この実験的機能を有効にするには、**Settings** > **Experiments** の下にある **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** を有効にしてください。
{% endAside %}

<!-- The current **Breakpoints** pane provides little visual aid in overseeing all breakpoints. On top of that, frequently used actions are hidden behind the context menu. -->
現在の **Breakpoints** ペインにはすべてのブレークポイントを見落とさないようにしてくれる視覚的な助けがほとんどありません。それに加えて、頻繁に利用される機能がコンテキストメニューに隠されています。

<!-- This experimental UX redesign aims at bringing structure into the **Breakpoints** pane and allow developers to have quick access to commonly used features, in particular editing and removing breakpoints. -->
この実験的な UX の再デザインは **Breakpoints** に構造を持ち込むことと開発者がよく使用する機能、特にブレークポイントの編集と削除にすばやくアクセスできるようにすることを目的としています。


<!-- These are some highlights: -->

ハイライトは次の機能です。

<!-- - Both pause options are in the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
<!-- - Breakpoints are grouped by file, ordered by line/column number, and collapsible.** -->
<!-- - New options to remove and edit breakpoint when hovering over a breakpoint or file name in the **Breakpoint** pane. -->
- 2つの Pause オプションが **Breakpoints** ペインにあります。オプションの意味がわかるようにテキストラベルが添えられます。
- ブレークポイントはファイルごとに行やカラムで順序付けられてグループ化され、表示を縮小することもできます。
- **Breakpoint** ペインのブレークポイントやファイル名にマウスカーソルを重ねたときに、ブレークポイントを削除、編集するためのオプションが新しく表示されます。

<!-- Read the full changes in our [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) and leave your feedback [here](https://crbug.com/1394686). -->
すべての変更は [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) で確認できます。フィードバックは [こちら](https://crbug.com/1394686) に残してください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ytfyl8qK5rkHQRTS3sXf.png", alt="Show Breakpoint pane before and after the redesign.", width="800", height="684" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2140378e0bb1687b263c226de01b741487ff324 #}
Chromium issues: [1346231](https://crbug.com/1346231), [1324904](https://crbug.com/1324904)


<!-- ## [Experimental] Automatic in-place pretty print -->
## [実験的] 自動的な直接のプリティプリント

{% Aside %}
<!-- To enable the experiment, check **Automatically pretty print in the Sources panel** under **Settings** > **Experiments**. -->
この実験的機能を有効にするには、**Settings** > **Experiments** の下にある **Automatically pretty print in the Sources panel** を有効にしてください。
{% endAside %}

<!-- The **Sources** panel now automatically pretty print minified source files in-place. You can click on the **pretty print button `{ }` to underdo it. -->
**Sources** パネルはミニファイされたソースファイルを自動的に直接プリティプリントするようになりました。`{ }` **pretty print** ボタンをクリックすると取り消すことができます。

<!-- Previously, the **Sources** panel shows minified content by default. Developers need to click on the pretty print button manually to format the content. On top of that, the pretty printed content is not displayed in the same file, but in another `::formatted` tab. -->
これまで、**Sources** はデフォルトでミニファイされた内容を表示していたため、開発者はプリティプリントボタンを手動でクリックして内容をフォーマットする必要がありました。しかも、プリティプリントされた内容は同じファイルではなく別の `::formatted` タブに表示されていました。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Show a minified file before and after automatic in-place pretty print.", width="800", height="501" %}
-->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="自動直接プリティプリント修正前後のミニファイされたファイル", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c96e7f4cdaf2009e5223553cabb606099f85569 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ea8fee1935d3c56dfea1edaa752af09579fffcc #}

Chromium issue: [1164184](https://crbug.com/1164184)




{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

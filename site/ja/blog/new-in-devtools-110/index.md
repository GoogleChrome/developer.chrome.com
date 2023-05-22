---
layout: 'layouts/blog-post.njk'
title: "DevTools の新機能 (Chrome 110)"
authors:
  - jecelynyeen
date: 2023-02-13
description: '再読み込み時の Performance パネルのクリア、Recorder でのコードの表示およびハイライトなど'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/8sed36sPev0UBbQfL4vn.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-110
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さん、レビュアーの [technohippy](https://github.com/technohippy) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

## 再読み込み時の Performance パネルのクリア {: #perf }

<!-- The **Performance** panel now clears both the screenshot and trace when you click the **Start profiling and reload page** button. -->
**Start profiling and reload page** ボタンをクリックすると、 **Performance** パネルでスクリーンショットとトレースの両方がクリアされるようになりました。

<!-- Previously, the **Performance** panel displayed a timeline with screenshots from previous recordings. This made it difficult to see when the actual measurement started. The panel now always navigates to the `about:blank` page first to guarantee that the recording begins with a blank trace. This aligns with the **Performance Insights** panel which already did the same. -->
今までは、 **Performance** パネルには以前のレコーディングのスクリーンショットを含むタイムラインが表示されていました。これにより、実際の測定がいつ開始されたかを確認することが難しくなっていました。これからは、レコーディングが空白のトレースで開始されることを保証するために、パネルは常に最初に `about:blank` ページに移動します。これは、すでに同じことを行っている **Performance Insights** パネルの動作と一致します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JVXCt6hKIxMtf0tCLWwh.png", alt="再読み込み時の Performance パネルのクリア", width="800", height="548" %}


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a301d29d165f17a6eceb1adf91bff0c1c2e07eb #}

Chromium issues: [1101268](https://crbug.com/1101268), [1382044](https://crbug.com/1382044)


## Recorder の更新 {: #recorder }

### Recorder でのユーザーフローコードの表示およびハイライト {: #recorder-code }

<!-- The **Recorder** now offers split code view, making it easier to view your user flow code. To access the code view, open a user flow and click **Show Code**.  -->
**Recorder** は分割コードビューを提供するようになり、ユーザーフローコードをより簡単に表示できるようになりました。コードビューにアクセスするには、ユーザーフローを開き、 **Show Code** をクリックします。

<!-- The  **Recorder**  highlights the corresponding code as you hover over each step on the left, making it easy to track your flow. You can change the code format using the dropdown, which lets you switch between formats such as [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. -->
**Recorder** では、左側の各ステップにカーソルを合わせると対応するコードを強調表示することで、フローを簡単に追跡できるようにします。ドロップダウンを使用してコードの書式を変更できます。これにより、 [Nightwatch Test](https://bit.ly/nightwatch-recorder) スクリプトなどの書式を切り替えることができます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxNNmun9Yfqs97JCAn7C.png", alt="Recorder でのコードビュー", width="800", height="542" %}

Chromium issue: [1385489](https://crbug.com/1385489)


### レコーディング時のセレクタタイプのカスタマイズ {: #recorder-selector }

<!-- You can create recordings that capture only the selector types that matter to you. With the new option to customize selector types when creating a new recording, you can include or exclude selectors such as XPath, ensuring you capture only the selectors you want in your user flows. -->
重要なセレクタタイプのみをキャプチャするレコーディングを作成できます。新しいレコーディングの作成時にセレクタタイプをカスタマイズする新しいオプションを使用すると、XPath などのセレクタを含めたり除外したりできるため、ユーザーフローに必要なセレクタのみを確実にキャプチャできます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5t2TOY9VA2Uq08Dq2ZhM.png", alt="セレクタタイプをカスタマイズする新しいオプション", width="800", height="645" %}

Chromium issue: [1384431](https://crbug.com/1384431)


### レコーディング中のユーザーフローの編集 {: #recorder-edit }

<!-- The **Recorder** now allows editing during recording, providing you with the flexibility to make changes in real-time. You no longer need to end the recording to make adjustments. -->
**Recorder** では、レコーディング中に編集できるようになり、リアルタイムで柔軟に変更できるようになりました。調整のためにレコーディングを終了する必要はなくなりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1a2S1lizzJ5acRMgjtwH.png", alt="レコーディング中のユーザーフローの編集", width="800", height="619" %}

Chromium issue: [1381971](https://crbug.com/1381971)


## 自動的な直接のプリティプリント {: #pretty-print }

<!-- The **Sources** panel now automatically pretty prints minified source files in place. You can click on the **pretty print** button `{ }` to undo it. -->
**Sources** パネルは、ミニファイされたソースファイルを所定の位置に自動的にプリティプリントするようになりました。 **pretty print** ボタン `{ }` をクリックして元に戻すことができます。

<!-- Previously, the **Sources** panel showed minified content by default. To format the content, you had to click the pretty print button manually. On top of that, the pretty-printed content wasn’t displayed in the same tab, but in another `::formatted` tab. -->
以前は、デフォルトで **Sources** パネルにミニファイされたコンテンツが表示されていました。コンテンツをフォーマットするには、プリティプリントボタンを手動でクリックする必要がありました。その上、プリティプリントされたコンテンツは同じタブではなく、別の `::formatted` タブに表示されていました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="自動的に直接プリティプリントされる前と後のミニファイされたファイルの表示", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3ae70742a7fce9657d8fcd578a182635e619cad5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b9c42efb6065c8a697eaf3acd656cb87e3d4f54 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6bddcbabb2d977b620758ac20785675053a4db9  #}

Chromium issues: [1383453](https://crbug.com/1383453), [1382752](https://crbug.com/1382752), [1382397](https://crbug.com/1382397)


## Vue、SCSS などのシンタックスハイライトとインラインプレビューの改善 {: #highlight }

<!-- The **Sources** panel enhanced the syntax highlighting for several widely-used file formats, enabling you to read code more easily and recognize its structure, including Vue, JSX, Dart, LESS, SCSS, SASS, and inline CSS. -->
**Sources** パネルでは、広く使用されているいくつかのファイル形式のシンタックスハイライトが強化され、Vue、JSX、Dart、LESS、SCSS、SASS、インライン CSS など、コードをより簡単に読み、その構造を認識できるようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/92SB2J5N6ImqJlOY3tIB.png", alt="Vue のシンタックスハイライト", width="800", height="550" %}

<!-- In addition, DevTools also improved the inline preview for Vue, inline HTML, and TSX. Hover over a variable to preview its value.  -->
さらに、DevTools では Vue、インライン HTML、および TSX のインラインプレビューも改善されました。変数にカーソルを合わせると、その値がプレビューされます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uLxVoWz3yyxYvOkgCq7t.png", alt="Vue のインラインプレビュー", width="800", height="700" %}

<!-- Apart from that, DevTools now shows the source map of a stylesheet in the **Sources** panel. For instance, when you open a SCSS file, you can access the related CSS file by clicking on the sourcemap link. -->
それとは別に、DevTools は **Sources** パネルにスタイルシートのソースマップを表示するようになりました。具体的には、SCSS ファイルを開いてソースマップリンクをクリックすることで、関連する CSS ファイルにアクセスできます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bK6TMGR8c6285bUlrIbx.png", alt="SASS のソースマップリンク", width="800", height="745" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c9af6b86b85bf23f9ed07d68b2d58b45910426de #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4f330a0d5cef6e74b5b73f258e55cc0960769bca #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9ec6a8092e7b45fc403d571982d1b214181d9695 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5a02aca17849514b1e2bc828f78aedece5161dfa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0928e31ba0ed2e81456f0109d323dd09768cfe1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/992cc762b6790a7bd1a0d5c12ed0169270ac7dd0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2bc726458c3d6507be9a4b56845b789c7ce653e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b77b77646c6257ab80893f5d1b5d9607a969c0e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f1ab763383c7641644f7fd4f88c49465a70ed01 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/11bdafdbbd9bd153aea84b1fe03db4dff89d3aa9 #}

Chromium issues: [1385374](https://crbug.com/1385374), [1385632](https://crbug.com/1385632), [1385281](https://crbug.com/1385281), [1385269](https://crbug.com/1385269), [1383892](https://crbug.com/1383892), [1361862](https://crbug.com/1361862), [1383451](https://crbug.com/1383451), [1392106](https://crbug.com/1392106), [1149734](https://crbug.com/1149734)


## Console での人間工学的で一貫性のあるオートコンプリート {: #console }

<!-- DevTools enhances the autocompletion experience by implementing the following changes: -->
DevTools は、次の変更を実装することにより、オートコンプリートの体験を強化します。

<!-- - `Tab` is always used for autocompletion. -->
<!-- - The behavior of `Arrow right` and `Enter` varies based on context. -->
<!-- - The autocompletion experience is consistent across text editors, in the **Console**, **Sources**, and **Elements** panels  -->
- `Tab` は常にオートコンプリートに使用されます。
- `右カーソルキー` と `Enter` の動作は、コンテキストによって異なります。
- オートコンプリートの体験は、 **Console** 、 **Sources** 、および **Elements** パネルのテキストエディタ間で一貫しています。

<!-- For example, here is what happens when you type `cons` in the **Console**: -->
たとえば、 **Console** に `cons` と入力すると、次のようになります。

<!-- - The **Console** displays a list of autocomplete suggestions, with a subtle dotted border around the top option indicating that navigation has not yet begun. -->
- **Console** には、オートコンプリート候補のリストが表示されます。上部のオプションの周りに細かい点線の境界線が表示され、ナビゲーションがまだ開始されていないことが示されます。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kSTUPmkQK3HzE7BElmAK.png", alt="オートコンプリーションオプションの周りの点線の境界線", width="800", height="580" %}

<!-- - The **Console** executes the line when you press `Enter`. Previously, it would automatically complete the line with the top suggestion. To auto-complete, press either `Tab` or `Arrow Right`. -->
- `Enter` を押すと、 **Console** はその行を実行します。以前は、最上位の提案で自動的に行を補完していました。オートコンプリートするには、 `Tab` または `右カーソルキー` を押します。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7SZ8AM51vI7WEIovjUDX.png", alt="Enter での行の実行", width="800", height="549" %}

<!-- - The **Console** highlights the selected option as you navigate through the suggestion list using the `Arrow up` and `Arrow down` shortcuts. -->
- **Console** は、 `上カーソルキー` と `下カーソルキー` のショートカットを使用して候補リストをナビゲートする際に、選択されたオプションを強調表示します。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XxjZu5GrFnPEUZhoQN0i.png", alt="候補をナビゲートしている際のハイライト", width="800", height="580" %}

<!-- - To auto-complete with the selected option during navigation, use the keyboard keys `Tab`, `Enter`, or `Arrow Right`. -->
- ナビゲーション中に選択したオプションでオートコンプリートするには、キーボードの `Tab` 、 `Enter` 、または `右カーソルキー` キーを使用します。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YU89q0lRFsocpdXS6ZMO.png", alt="ナビゲーション中に選択されたオプションを使ったオートコンプリーション", width="800", height="360" %}

<!-- - When editing in the middle of code, for example, when the cursor is between `n` and `s`, use `Tab` for autocompletion, `Enter` to execute the line, and `Arrow Right` to move the cursor forward. -->
- コードの途中で編集する場合、たとえば、カーソルが `n` と `s` の間にある場合、 `Tab` を使用してオートコンプリートを行い、 `Enter` を使用して行を実行し、 `右カーソルキー` を使用してカーソルを前方に移動します。
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4jiMQ2btaT4MX7Y3VqgH.png", alt="コードの途中での編集", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00103b19eec2ba086c608b79ff34b696fe07bb62 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/89f259ddb6c36f486108e0dc9ccb4d4125a04917 #}

Chromium issues: [1399436](https://crbug.com/1399436), [1276960](https://crbug.com/1276960)


## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
以下は、このリリースでの注目すべき修正の一部です。

<!-- - A regression issue in DevTools, where it failed to stop at the `debugger` statement in inline scripts, has been resolved. ([1385374](https://crbug.com/1385374)) -->
<!-- - A new **Console** setting that allows you to expand or collapse `console.trace()` messages by default. Toggle the settings via **Settings** > **Preferences** >  **Expand console.trace() messages by default**. ([1139616](https://crbug.com/1139616)) -->
<!-- - The [Snippets](/docs/devtools/javascript/snippets/) pane in the **Sources** panel supports enhanced autocomplete, similar to the **Console**. ([772949](https://crbug.com/772949))  -->
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/thkb1CYO0yYiGHll7Yp8.png", alt="Autocomplete in Snippets.", width="800", height="417" %}

- インラインスクリプトの `debugger` ステートメントで停止できなかった DevTools のリグレッションの問題が解決されました。 ([1385374](https://crbug.com/1385374))
- デフォルトで `console.trace()` メッセージを展開または折りたたむことができる新しい **Console** 設定。 **Setting** > **Preferences** > **Expand console.trace() message by default** を使って設定を ON/OFF します。 (1139616)
- **Sources** パネルの [Snippets](/docs/devtools/javascript/snippets/) ペインは、 **Console** と同様に、強化されたオートコンプリートをサポートします。 ([772949](https://crbug.com/772949))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

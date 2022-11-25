---
layout: 'layouts/blog-post.njk'
title: 'DevTools の新機能 (Chrome 107)'
authors:
  - jecelynyeen
date: 2022-09-20
description: 'キーボードショートカットのカスタマイズ、 Memory Inspector で C/C++ オブジェクトのハイライト表示など'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q31K9IiREUxfRjlmg6Gp.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-107
---

*翻訳者の [yoshiko-pg](https://github.com/yoshiko-pg) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [lacolaco](https://github.com/lacolaco) さん、 [technohippy](https://github.com/technohippy) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='1uwv6HbR8HU' %}

<!-- Content starts here -->

<!-- ## Customize keyboard shortcuts in DevTools {: #shortcuts } -->
## DevTools のキーボードショートカットのカスタマイズ {: #shortcuts }

<!-- You can now customize keyboard shortcuts for your favorite commands in DevTools. -->
DevToolsで、好きなコマンドのキーボードショートカットをカスタマイズできるようになりました。

<!-- Go to **Settings** > **Shortcuts**, hover over a command and click the **Edit** button (pen icon) to customize the keyboard shortcut. You can create chords (a.k.a multi-key press shortcuts) as well.  -->
**Settings** > **Shortcuts** を開き、コマンドにカーソルを合わせて **Edit** ボタン（ペンのアイコン）をクリックすると、キーボードショートカットをカスタマイズできます。コード（複数のキーを押すショートカット）を作成することもできます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/973EfWpxwGOdEF1nN1vv.png", alt="DevTools のキーボードショートカットのカスタマイズ", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d061128ff63a97ab2c6c0d2b5e655e6fcbed829c #}

Chromium issues: [1335274](https://crbug.com/1335274), [174309](https://crbug.com/174309)


<!-- ## Toggle light and dark themes with keyboard shortcut {: #toggle-themes } -->
## キーボードショートカットでのライトテーマとダークテーマの切り替え {: #toggle-themes }

<!-- Configure a keyboard shortcut to toggle [light and dark themes](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) conveniently. By default, the action doesn’t map to any keyboard shortcut. -->
キーボードショートカットを設定して、[ライトテーマとダークテーマ](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme)を便利に切り替えられるようにします。デフォルトでは、このアクションはどんなキーボードショートカットも設定されていません。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="キーボードショートカットでのライトテーマとダークテーマの切り替え", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4853b34457f43e41ae9cebc7dfc97c0b734f463a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1280398](https://crbug.com/1280398), [1226363](https://crbug.com/1226363)


<!-- ## Highlight C/C++ objects in the Memory Inspector {: #memory } -->
## Memory Inspector で C/C++ オブジェクトをハイライト表示 {: #memory }

<!-- The [Memory Inspector](/docs/devtools/memory-inspector/) highlights all the bytes of a C/C++ memory object. -->
[Memory Inspector](/docs/devtools/memory-inspector/) は、 C/C++ メモリオブジェクトの全てのバイト列をハイライト表示します。

<!-- Recognizing an object’s bytes among the surrounding WebAssembly memory was a pain point. You have to know the object’s size and count bytes from the object’s start. -->
周囲の WebAssembly メモリの中からオブジェクトのバイト列を認識するのは面倒でした。オブジェクトのサイズを把握し、オブジェクトの先頭からバイト列を数える必要があります。

<!-- With this feature,  it helps you tell them apart from the surrounding memory. See [Extending the Memory Inspector for C/C++ debugging](/blog/memory-inspector-extended-cpp/) to learn more about the changes. -->
この機能があれば、周囲のメモリとの区別が楽になります。変更点については、 [C/C++ デバッグのための Memory Inspector の拡張](/blog/memory-inspector-extended-cpp/) を参照してください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zqOv2zJTc8ucoeDmQiTo.png", alt="Memory Inspector で C/C++ オブジェクトをハイライト表示", width="800", height="527" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f3befb47eaaa373d697b42dec6f179baf9d42c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4e6bdb4321cbc0b783647e855a616096beaabfd #}

Chromium issue: [1336568](https://crbug.com/1336568)


<!-- ## Support full initiator information for HAR import {: #har } -->
## HAR インポート時の完全な Initiator 情報をサポート {: #har }

<!-- Full **Initiator** information is available now for [HAR import](/docs/devtools/network/reference/#save-as-har). Previously, the **Network** panel only shows partial initiator information during import. -->
[HAR インポート](/docs/devtools/network/reference/#save-as-har) 時に、完全な **Initiator** 情報を利用できるようになりました。以前は、インポート時に **Network** パネルに Initiator 情報の一部しか表示されませんでした。

<!-- The initiator information helps developers to trace the origin of a network request and identify network-related issues.  -->
Initiator 情報は、開発者がネットワークリクエストの発信元を追跡し、ネットワーク関連の問題を特定するのに役立ちます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cthh3ZrpDwo4LJiaY4Uo.png", alt="HAR インポート時の完全な Initiator 情報をサポート", width="800", height="376" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a659b0711f52a2e200395b85f16ed9f266d1571 #}

Chromium issue: [1343185](https://crbug.com/1343185)



<!-- ## Start DOM search after pressing `Enter` {: #search-type } -->
## `Enter` を押した時にのみ DOM 検索を開始 {: #search-type }

<!-- You can now disable the **Search as you type** setting to always start DOM search after pressing <kbd>Enter</kbd>.  -->
**Search as you type** の設定を無効にして、 <kbd>Enter</kbd> を押した時にのみ DOM 検索を開始できるようになりました。

<!-- In the **Elements** panel, toggle the search bar with <kbd>Control</kbd> or <kbd>Command</kbd> + <kbd>F</kbd>. As you type a query in the search textbox, the DOM tree will jump to the first matching element and highlight it by default.  -->
**Elements** パネルで、 <kbd>Control</kbd> または <kbd>Command</kbd> + <kbd>F</kbd> を押して検索バーを切り替えます。検索テキストボックスにクエリを入力すると、 DOM ツリーは最初にマッチした要素にジャンプし、デフォルトでハイライト表示されます。

<!-- For users, especially testers who always work with lengthy search queries, this behavior is not ideal. The DOM tree might jump multiple times as you type in a lengthy search query (e.g. `//div[@id="example"]`). This behavior creates unnecessary motion. -->
ユーザー、特に長い検索クエリを常に扱うテスターにとって、この動作は理想的ではありません。長い検索クエリ（例： `//div[@id="example"]` ）を入力すると、 DOM ツリーが何度もジャンプする可能性があります。この動作は無駄な動きを生み出します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KgTTYf8XaKkHQ2udJc33.png", alt="DOM 検索", width="800", height="505" %}

<!-- Go to **Settings** > **Preferences**, disable **Search as you type**. With this change, the search will start only after you press <kbd>Enter</kbd>. -->
**Settings** > **Preferences** で **Search as you type** を無効にしてみましょう。この変更により、 <kbd>Enter</kbd> を押した時にのみ検索が開始されます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HBLiQ5e60g5urU8UT5J7.png", alt="Search as you type の設定", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4643a4703b4a26945d1446eedc907ac81373e23 #}

Chromium issue: [1344526](https://crbug.com/1344526)


<!-- ## Display `start` and `end` icons for `align-content` CSS flexbox properties {: #flexbox } -->
## CSS のフレックスボックスプロパティ `align-content` に `start` と `end` のアイコンを表示 {: #flexbox }

<!-- In the **Styles** pane, edit the `align-content` properties in a CSS class with `display: flex` or `display: inline-flex`. The `start` and `end` show in the auto-complete dropdown with icons. -->
**Styles** ペインで、 `display: flex` または `display: inline-flex` を持つCSSクラスの `align-content` プロパティを編集するとき、オートコンプリートのドロップダウンに `start` と `end` のアイコンが表示されます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fo10I2mt6bQ357itnYhl.png", alt="align-content フレックスボックス プロパティ", width="800", height="424" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ce2b426818106768d4e6d907cc1f4cd3b9636ca6 #}

Chromium issue: [1139945](https://crbug.com/1139945)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- - Display correct message counts in the **Console** sidebar. Previously, the counts didn't refresh when clearing console messages. ([1343311](https://crbug.com/1343311)) -->
- **Console** サイドバーに正しいメッセージ数を表示します。以前はコンソールメッセージをクリアしても、カウントが更新されませんでした。 ([1343311](https://crbug.com/1343311))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5dd8494912fa43dfe998c9764ceb1e1763784617 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

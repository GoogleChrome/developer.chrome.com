---
layout: 'layouts/blog-post.njk'
title: "DevTools の新機能 (Chrome 111)"
authors:
  - jecelynyeen
date: 2023-02-16
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aUXCp1hvrbPmHTlJs9lg.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-111
---

*翻訳者の [yoshiko-pg](https://github.com/yoshiko-pg) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [lacolaco](https://github.com/lacolaco) さん、 [technohippy](https://github.com/technohippy) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ja/_partials/devtools/whats-new.md file -->


<!-- ## Debugging HD color with the Styles pane {: #color } -->
## Styles ペインで高精細色をデバッグする {: #color }

<!-- New [CSS color types and spaces](/blog/chrome-111-beta/#new-css-color-types-and-spaces) are coming to the web! It is equally exciting that DevTools introduced new tools to help developers create, convert and debug High Definition color.  -->
新しい [CSS の色の種類と空間](/blog/chrome-111-beta/#new-css-color-types-and-spaces) がウェブにやってきます！ 開発者が高精細色を作成・変換・デバッグするのに役立つ新しいツールがDevToolsに導入されたことも、同様にエキサイティングなことです。

<!-- The **Styles** pane now supports 12 new color spaces and 7 new gamuts as outlined in the [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) specification. See [High Definition CSS Color Guide](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools) for a comprehensive understanding of color options available on the web. -->
**Styles** ペインが [CSS カラー レベル 4](https://www.w3.org/TR/css-color-4/) にある 12 の新しい色空間と 7 つの新しい色域をサポートするようになりました。Web 上で利用可能なカラーオプションを包括的に理解するには、[CSS 高精細色ガイド](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools) を参照してください。

<!-- Here are examples of CSS color definitions with `color()`, `lch()`, `oklab()` and `color-mix()`. -->
以下に `color()` 、 `lch()` 、 `oklab()` 、 `color-mix()` を用いた CSS での色の定義の例を示します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dA8VCKaSZhNb9gzlAUT9.png", alt="CSS での色の定義の例", width="800", height="509" %}

<!-- When using the `color-mix()` function, you can view the final color output in the **Computed** pane. -->
`color-mix()` 関数を使用すると、最終的な色の出力を **Computed** ペインで確認できます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3VkOGbbb5qLVvo1A1qSa.png", alt="Computed ペインに表示される color-mix 関数の出力", width="800", height="487" %}

<!-- The color picker supports all the new color spaces with more features. For example, click on the color swatch of `color(display-p3 1 0 1)`. A gamut boundary line has also been added, distinguishing between the `sRGB` and `display-p3` gamuts for a clearer understanding of your selected color's gamut. -->
カラーピッカーは、より多くの機能によって、新しい色空間をすべてサポートします。例えば、 `color(display-p3 1 0 1)` の色見本をクリックしてみてください。色域境界線も追加され、`sRGB` と `display-p3` の色域を区別し、選択した色の色域をより明確に理解できるようになりました。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bL6uw8VV4cGuDd9hmAjX.png", alt="色域境界線", width="800", height="657" %}

<!-- DevTools supports converting colors between color formats. Use the **Change Color Format** icon to access the conversion popup, or simply use the `Shift` + click on a color swatch in the **Styles** pane. -->
DevTools はカラーフォーマット間の色変換をサポートしています。変換ポップアップを表示するには、**Change Color Format** アイコンを使用するか、単に `Shift` を押しながら **Styles** ペイン内の色見本をクリックします。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uoz3yaPPdVs6T2ASnQ62.png", alt="カラーフォーマット間の色変換", width="800", height="460" %}

<!-- When converting, it's important to know if the conversion was clipped to fit the space. DevTools puts a warning icon next to the converted color that alerts you to this clipping. -->
変換するとき、空間に合わせてクリップされたかどうかを知ることは重要です。DevTools は変換された色の横に警告アイコンを表示し、このクリッピングを警告します。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5Y4rVIqL9rjuSbHcodKr.png", alt="カラークリッピングの警告", width="800", height="657" %}

<!-- In addition, you can pick colors from your screen with the new shortcut. Press 'c' to activate the eye dropper and hit `Escape` to deactivate it. The eyedropper tool only samples colors in the sRGB color space. For example, if you try to sample the color `color(display-p3 1 0 1)`, which is outside of the sRGB color space, the eyedropper tool will clip the color to the nearest color in the sRGB space, which is magenta `color(display-p3 0.92 0.2 0.97)`. -->
さらに、新しいショートカットでスクリーンから色を選べます。 `c` を押すとスポイトがアクティブになり、`Escape` を押すと非アクティブになります。スポイトツールは sRGB 色空間内の色しかサンプリングしません。例えば、sRGB の色空間の外にある色 `color(display-p3 1 0 1)` をサンプリングしようとすると、スポイトツールはその色を sRGB 空間で最も近い色であるマゼンタ `color(display-p3 0.92 0.2 0.97)` にクリッピングします。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VNBu6RenRerRqNhNYfyf.png", alt="スポイトの利用", width="800", height="657" %}

<!-- Finally, the **Color format** setting is now deprecated to make room for the new HD color format. -->
最後に、 **Color format** の設定は、新しい高精細色のフォーマットに対応するため、非推奨となりました。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SPymkBgxzI6iVAvLdWBN.png", alt="非推奨になった Color format の設定", width="800", height="441" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f600600cf51a6582870c99e9a6b9a6a9ba76f9dc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e813f07e6a47b39c04c64a409dd08be294432490 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b54410ab252e1cdc882c3a71e86b04c3de055fa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/392b216dfae9c04697d7d0591af547c2482f7666 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9f3432a40c557b3faa3da01fc2ef84e4cf60e66a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/504995fbfc3bf21bcaf2718b6a469c5f23814936 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6cc705a56def86c35d61b45a98371c190f4275e8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e9a64d873ac41e8d585e60b4934879abd8ba4977 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/abe7076d2df519b001dbea807a3aaf5beaa86fc0 #}

Chromium issues: [1073895](https://crbug.com/1073895), [1395782](https://crbug.com/1395782), [1408777](https://crbug.com/1408777),  [1395782](https://crbug.com/1395782),  [1392717](https://crbug.com/1392717), [1382409](https://crbug.com/1382409), [1392054](https://crbug.com/1392054)


<!-- ## Enhanced breakpoint UX {: #breakpoint-redesign } -->
## 強化されたブレークポイントのUX {: #breakpoint-redesign }

<!-- The redesigned **Breakpoints** pane allows you to have quick access to commonly used features, in particular, deactivating, editing, and removing breakpoints. -->
再設計された **Breakpoints** ペインでは、よく使われる機能、特にブレークポイントの無効化、編集、削除に素早くアクセスできるようになりました。

<!-- These are some highlights: -->
ハイライトをいくつか紹介します。

<!-- - Both pause exception options moved to the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- キャッチされなかった例外による一時停止オプションについても **Breakpoints** ペインに移動され、テキストでラベル付けされ、より分かりやすくなりました。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KADuAqVdrxxQDg5AYYeA.png", alt="例外による一時停止オプション", width="800", height="518" %}

<!-- - Breakpoints are grouped by file, ordered by line or column numbers, and are collapsible. -->
- ブレークポイントはファイルごとにグループ化され、行番号や列番号で並べられ、折りたためるようになりました。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AXJ7IL5aJ6gwbZmnoH39.png", alt="ファイルごとのグループ化", width="800", height="454" %}

<!-- - There are new options to deactivate, remove, and edit breakpoints when hovering over a breakpoint or file. -->
- ブレークポイントやファイルにカーソルを置くと、ブレークポイントを無効化、削除、編集する新しいオプションが表示されます。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vAQ4YuWGuXYLxXQXt0HG.png", alt="新しいブレークポイント無効化オプション", width="800", height="496" %}

<!-- - Click the edit breakpoint button to open the breakpoint editor. From here, you can enter the breakpoint condition or switch to a logpoint. -->
- ブレークポイントの編集ボタンをクリックすると、ブレークポイントエディタが開きます。ここからブレークポイントの条件を入力したり、ログポイントに切り替えられます。
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SrgbxxF8U3s9yzDPV25q.png", alt="ブレークポイント編集ダイアログ", width="800", height="697" %}

<!-- See [JavaScript debugging reference](/docs/devtools/javascript/reference/) to learn how to debug with DevTools. -->
DevTools でデバッグする方法を学ぶには、[JavaScript デバッグリファレンス](/docs/devtools/javascript/reference/) をご覧ください。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/48b648b65cd05071d1950e50d0b529ff20294780 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6c8a19b3922ed95818b5751f1b6548724ff868c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b955a3533292790168431db4e54906d4b1fa64a #}
Chromium issues: [1407586](https://crbug.com/1407586), [1402891](https://crbug.com/1402891), [1402893](https://crbug.com/1402893)

<!-- ## Customizable Recorder shortcuts {: #recorder } -->
## カスタマイズ可能な Recorder ショートカット {: #recorder }

<!-- Use keyboard shortcuts to record and replay user flows quicker. -->
キーボードショートカットを使って、ユーザーフローの記録と再生を素早くおこなえます。

<!-- The **Recorder** introduces a few convenient keyboard shortcuts for faster recording and replaying of user flows.  -->
**Recorder** では、より早くユーザーフローを記録・再生できるように、いくつかの便利なキーボードショートカットを導入しています。

<!-- Don’t remember the shortcuts? No problem, click the `?` button to view all the shortcuts at any time. -->
ショートカットを覚えていませんか？ 問題ありません。「？」ボタンをクリックすれば、いつでもすべてのショートカットを表示できます。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BJq63X8k89HTdINY2RKu.png", alt="Recorder ショートカット", width="800", height="625" %}

<!-- You can even customize these shortcuts via the **Settings** menu. -->
これらのショートカットは **Settings** メニューからカスタマイズすることもできます。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FtZSO1pPSooAbBrPTGC6.png", alt="Recorder ショートカットのカスタマイズ", width="800", height="494" %}

<!-- If you're working in a different panel and want to start a user flow recording, use the **Create a new recording** command from the [Command Menu](/docs/devtools/command-menu/) in DevTools to get started. -->
別のパネルで作業していて、ユーザーフローの記録を開始したい場合、DevTools の [コマンドメニュー](/docs/devtools/command-menu/) から **Create a new recording** コマンドを使用して開始します。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fErUqzQ03p5zOk301nTN.png", alt="Create a new recording コマンド", width="800", height="435" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/140ffb3e4c5e084eff5522508310af5dd407cf6e #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e61fa89b8d073c4ff6b4da3599f83bf5972d5415 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/ffc735e599881fec2779477e6c20165e2796da69 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/f57026189fb51f801bf2ea2611afcb932fa32bef #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/0a7c428980b8f8a60e83c780e17f6a6f94007493 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/aea51aad7026881ad26ca1b270d12338adb92d79 #}

Chromium issue: [1339771](https://crbug.com/bbb)


<!-- ## Better syntax highlight for Angular {: #syntax } -->
## Angular のシンタックスハイライトの改善 {: #syntax }

<!-- DevTools enhanced the syntax highlighting for Angular HTML templates, making it easier for you to read code and recognize its structure. -->
DevTools は、 Angular の HTML テンプレートのシンタックスハイライトを強化し、コードを読みやすく、構造を認識しやすくしました。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lJU7wOa4vNDb2Vm2zPJq.png", alt="AngularのHTMLテンプレートのシンタックスハイライト", width="800", height="507" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4ec36d2fc5e7506d1ff65fd282a43215164f03f2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/717953202d0e8463257e09cc3f68a7769fd25300 #}

Chromium issues: [1385374](https://crbug.com/1385374),  [1385678](https://crbug.com/1385678)


<!-- ## Reorganize caches in the Application panel {: #cache } -->
## キャッシュを Application パネルで再整理する {: #cache }

<!-- The **Cache Storage** pane can now be found in the **Storage** section of the **Application** panel, while the **Back/forward cache** pane has been moved to the **Background Services** section.  -->
**Cache Storage** ペインは **Application** パネルの **Storage** セクションに、**Back/Forward cache** ペインは **Background Services** セクションに移動されました。
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q5ZeDvMc3OseF8fQve5A.png", alt="Application パネルのキャッシュ", width="800", height="506" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/adccf1afe5d585b294dee247f5a4982aca8f5f1e #}

Chromium issue: [1407166](https://crbug.com/1407166)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースで、特筆すべき以下の修正がおこなわれました。

<!-- - DevTools has been updated to respect the [Disable cache](/docs/devtools/network/reference/#disable-cache) setting when loading source maps. ([1407084](https://crbug.com/1407084)) -->
- DevTools がソースマップを読み込む際に [Disable cache](/docs/devtools/network/reference/#disable-cache) の設定が反映されるようになりました。([1407084](https://crbug.com/1407084))
<!-- - The **Elements** panel now instantly autofocuses on the first matching element in search results. ([1381853](https://crbug.com/1381853)) -->
- **Elements** パネルで、検索結果の最初にマッチした要素に瞬時にオートフォーカスが当たるようになりました。([1381853](https://crbug.com/1381853))
<!-- - Various fixes to improve the source map and breakpoints reliability. ([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298](https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134)) -->
- ソースマップとブレークポイントの信頼性を向上させるための様々な修正。([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298](https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134))
<!-- - To better facilitate debugging, DevTools now supports evaluating expressions with private class members. ([1381806](https://crbug.com/1381806)) -->
- デバッグをより容易にするために、DevTools はプライベートクラスメンバーを含む式の評価をサポートするようになりました。([1381806](https://crbug.com/1381806))
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q68fvo870weBVwupujqf.png", alt="プライベートクラスメンバーを含む式の評価", width="800", height="683" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

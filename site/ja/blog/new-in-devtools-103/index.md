---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 103)"
authors:
  - jecelynyeen
date: 2022-06-14
updated: 2022-06-14
description: "ダブルクリックイベントや右クリックイベントの記録、Lighthouse にてユーザフローを計測する新しいオプションなど。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9eRpd1kBJDrv2fkJuBca.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-103
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さん、レビュアーの [lacolaco](https://github.com/lacolaco) さん、 [technohippy](https://github.com/technohippy) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='LyMts4yfQu8' %}

<!-- ## Capture double-click and right-click events in the Recorder panel {: #recorder } -->
## Recorder パネルでのダブルクリックイベントや右クリックイベントのキャプチャ {: #recorder }

<!-- The **Recorder** panel can now capture double-click and right-click events. -->
**Recorder** パネルにて、ダブルクリックイベントや右クリックイベントをキャプチャできるようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qsleBCUrr2twMujW0R94.png", alt="Recorder パネルでのダブルクリックイベントや右クリックイベントのキャプチャ", width="800", height="572" %}

<!-- In this [example](https://jec.fish/demo/dbl-right-click), start a [recording](/docs/devtools/recorder/#record) and try to perform the following steps:  -->
この [例](https://jec.fish/demo/dbl-right-click) では、以下の手順を行うために、 [レコーディング](/docs/devtools/recorder/#record) を開始しています。

<!-- - Double-click the card to enlarge it
- Right-click the card and select an action from the context menu -->
- カードをダブルクリックして拡大します
- カードを右クリックして、コンテキストメニューからアクションを選択します

<!-- To understand how **Recorder** captured these events, expand the steps: -->
**Recorder** がこれらのイベントをどのようにキャッチしたかを知るために、以下の手順を行います:

<!-- - **Double-click** is captured as `type: doubleClick`.
- **Right-click** event is captured as `type: click` but with the `button` property is set to `secondary`. The `button` value of a normal mouse click is `primary`. -->
- **Double-click** は `type: doubleClick` としてキャプチャされます。
- **Right-click** イベントは `type: click` としてキャプチャされますが、 `button` プロパティは `secondary` に設定されます。通常のマウスクリックの `button` 値は、 `primary` です。

Chromium issues: [1300839](https://crbug.com/1300839), [1322879](https://crbug.com/1322879), [1299701](https://crbug.com/1299701), [1323688](https://crbug.com/1323688)


<!-- ## New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## Lighthouse パネルでの新しいタイムスパンモードとスナップショットモード {: #lighthouse }

<!-- You can now use **Lighthouse** to measure your website’s performance beyond page load. -->
**Lighthouse**を使用して、ページの読み込みを超えたウェブサイトのパフォーマンスを測定できるようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3GGcCxlOGrnXLMfp0t9y.png", alt="Lighthouse パネルでの新しいタイムスパンモードとスナップショットモード", width="800", height="507" %}

<!-- The **Lighthouse** panel now supports 3 modes of user flow measurement:  -->
**Lighthouse** パネルは、ユーザーフローの計測に対して、3 つのモードをサポートするようになりました:

<!-- - [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) reports analyze a single page load. Navigation is the most common report type. All Lighthouse reports before the current version are navigation reports.
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) reports analyze an arbitrary time period, typically containing user interactions.
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) reports analyze the page in a particular state, typically after the user has interacted with it. -->
- [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) レポートは、単一ページの読み込みを分析します。 Navigation は最も一般的なレポートタイプです。現在のバージョンより前のすべての Lighthouse レポートは、 Navigation レポートです。
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) レポートは、通常はユーザーの操作を含む任意の期間を分析します。
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) レポートは、特定の状態でのページを分析します。通常は、ユーザーがページを操作した後です。


<!-- For example, let’s measure the performance of adding items to cart on this [demo page](https://coffee-cart.netlify.app/). Select the **Timespan** mode and click **Start timespan**. Scroll and add a few items to the cart. Once you are done, click on **End timespan** to generate a Lighthouse report of the user interactions. -->
たとえば、この [デモページ](https://coffee-cart.netlify.app/) で、カートにアイテムを追加するパフォーマンスを測定してみましょう。 **Timespan** モードを選択し、 **Start timespan** をクリックします。スクロールして、カートにいくつかのアイテムを追加します。完了したら、 **End timespan** をクリックして、ユーザーインタラクションの Lighthouse レポートを生成します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pq9Vg8xOUzplWAlXGJEa.png", alt="タイムスパンモード", width="800", height="549" %}

<!-- See [User flows in Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) to learn about the unique use cases, benefits, and limitations of each mode.  -->
各モード固有の使用例、利点、制限については、 [User flows in Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) をご覧ください。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70d4a90431dc6c881209f605411ce0bd2272d6d1 #}

Chromium issue: [1291284](https://crbug.com/1291284)


<!-- ## Performance Insights updates {: #performance } -->
## Performance Insights アップデート {: #performance }

<!-- ### Improved zoom control in the Performance Insights panel {: #zoom } -->
### Performance Insights パネルでの改善されたズーム制御 {: #zoom }

<!-- DevTools will now zoom in based on your mouse cursor rather than the playhead position.With the latest cursor-based zoom, you can move your mouse to anywhere in the track, and [zoom in](/docs/devtools/performance-insights/#navigate) to the desired area right away.  -->
DevTools は、再生ヘッドの位置ではなく、マウスカーソルに基づいてズームインするようになりました。最新のカーソルベースのズームを使用すると、マウスをトラック内の任意の場所に移動して [ズームイン](/docs/devtools/performance-insights/#navigate)  することで、すぐに目的のエリアに移動することができます。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
パネルを使用して実用的なインサイトを取得し、ウェブサイトのパフォーマンスを向上させる方法については、 [Performance Insights](/docs/devtools/performance-insights/) をご覧ください。

Chromium issue: [1313382](https://crbug.com/1313382)


<!-- ### Confirm to delete a performance recording {: #delete } -->
### パフォーマンスレコーディングの削除確認 {: #delete }

<!-- DevTools now shows a confirmation dialog before [deleting a performance recording](/docs/devtools/performance-insights/#delete). -->
DevToolsは、 [パフォーマンス記録の削除](/docs/devtools/performance-insights/#delete) の前に、確認ダイアログを表示するようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DaoCroAA60WmMLpuVU9P.png", alt="パフォーマンスレコーディングの削除確認", width="800", height="549" %}

Chromium issue: [1318087](https://crbug.com/1318087)


<!-- ## Reorder panes in the Elements panel {: #reorder-pane } -->
## Element パネルでのペインの並び替え {: #reorder-pane }

<!-- You can now reorder panes in the **Elements** panel based on your preference. -->
好みに応じて、 **Element** パネルのペインを並べ替えることができるようになりました。

<!-- For example, when you open DevTools on a narrow screen, the [Accessibility](/docs/devtools/accessibility/reference/#pane) pane is hidden under the **Show more** button. If you frequently debug accessibility issues, you can now drag the pane to the front for easier access. -->
たとえば、狭い画面で DevTools を開くと、 [Accessibility](/docs/devtools/accessibility/reference/#pane) ペインが **Show more** ボタンの下で非表示になります。アクセシビリティの問題を頻繁にデバッグしたいときは、ペインを前面にドラッグして簡単にアクセスできるようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hcaQzMTxecNyw4RY0PMX.png", alt="Element パネルでのペインの並び替え", width="800", height="616" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/10d76932286c4b001eb4c4a13d8bf401f4ee46a7 #}

Chromium issue: [1146146](https://crbug.com/1146146)


<!-- ## Picking a color outside of the browser {: #color } -->
## ブラウザ外でのカラーピッキング {: #color }

<!-- DevTools now supports picking a color outside of the browser. Previously, you could only pick a color within the browser. -->
DevToolsは、ブラウザの外部での色の選択をサポートするようになりました。以前は、ブラウザ内でしか色を選択できませんでした。

<!-- In the **Styles** pane, click on any color preview to open a color picker. Use the eyedropper to pick color from anywhere. -->
**Styles** ペインで、任意のカラープレビューをクリックして、カラーピッカーを開きます。スポイトを使用して、どこからでも色を選択できます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JAp1UdPCnWNduuNadLVz.png", alt="ブラウザ外でのカラーピッキング", width="800", height="450", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/bbb56c21faaa6c68493a351e3f3e213acb5b76fa #}

Chromium issue: [1245191](https://crbug.com/1245191)


<!-- ## Improved inline value preview during debugging {: #inline-preview } -->
## 改善されたデバッグ中のインライン値プレビュー {: #inline-preview }

<!-- The debugger now shows the inline values preview correctly. -->
デバッガーは、インライン値のプレビューを正しく表示するようになりました。

<!-- In this example, the `double` function has an input parameter  `a` and a variable `x`. Put a breakpoint at the `return` line and run the code. The inline preview shows values `a` and `x` correctly. Previously, the debugger did not show the value `x` in the inline preview. -->
この例では、`double` 関数に入力パラメーター `a` と変数 `x` があります。 `return` 行にブレークポイントを設定してコードを実行します。インラインプレビューには、値 `a` と `x` が正しく表示されます。以前は、デバッガーはインラインプレビューに値 `x` を表示しませんでした。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XMHyRsyK24fWLK7o72K7.png", alt="デバッグ中の改善されたインラインでの値のプレビュー", width="800", height="534" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8e1a99324bde8d093e32ede5c8d1bf50110fac66 #}

Chromium issue: [1316340](https://crbug.com/1316340)


<!-- ## Support large blobs for virtual authenticators {: #webauthn } -->
## 仮想認証器での大きな blob サポート {: #webauthn }

<!-- The [WebAuthn](/docs/devtools/webauthn/) tab now has the new **Supports large blob** checkbox for virtual authenticators. -->
[WebAuthn](/docs/devtools/webauthn/) タブに、仮想認証器向けの新しい **Supports large blob** チェックボックスが追加されました。

<!-- This checkbox is disabled by default. You can enable it only for the authenticators with `ctap2` protocol that support resident keys. -->
このチェックボックスは、デフォルトで無効になっています。レジデントキーをサポートする `ctap2` プロトコルを使用する認証器に対してのみ有効にできます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m58oDW2ZwCMxX6zoUoJM.png", alt="仮想認証器での大きな blob サポート", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/519350816e99a82142712b2e5b6781984a77e39c #}

Chromium issue: [1321803](https://crbug.com/1321803)


<!-- ## New keyboard shortcuts in the Sources panel {: #shortcuts } -->
## Sources パネルでの新しいキーボードショートカット {: #shortcuts }

<!-- Two new keyboard shortcuts are now available in the  **Sources** panel: -->
2 つの新しいキーボードショートカットが **Sources** パネルで利用できるようになりました。

<!-- - Toggle **navigation** sidebar (left) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Toggle **debugger** sidebar (right) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> -->
- <kbd>Control/Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd> で **navigation** サイドバー（左）をトグルします。
- <kbd>Control/Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> で **debugger** サイドバー（右）をトグルします。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1PacYBEm9DoSeW7iai8M.png", alt="Sources パネルでの新しいキーボードショートカット", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1226363](https://crbug.com/1226363)


<!-- ## Source maps improvements {: #sourcemaps } -->
## ソースマップの改善 {: #sourcemaps }

<!-- Previously, developers experience random failure during: -->
以前は、開発者は以下の間でランダムな障害を経験していました:

<!-- - Debugging with [Codepen](https://codepen.io/) example
- Identifying source location of performance issues in a [Codepen](https://codepen.io/) example
- Missing **Component** tab when [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is enabled -->
- [Codepen](https://codepen.io/) の例を使用したデバッグ
- [Codepen](https://codepen.io/) の例にてパフォーマンスの問題に関するソースの場所の特定
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) が有効になっているが **Component** タブがない

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
全体的なデバッグ体験を向上させるためのソースマップのいくつかの修正を次に示します:

<!-- - Correct mapping between location and offset for inline scripts and source location
- Use fallback information for frame’s text location
- Properly resolve relative urls with frame's URL   -->
- インラインスクリプトとソースの場所における、位置とオフセットの間の正しいマッピング
- フレームのテキストの場所にフォールバック情報を使用する
- フレームの URL を使用して、相対 URL を適切に解決する

{# https://chromium.googlesource.com/v8/v8/+/d821a6a373ecf086a2ef0d233ace7f3431e47732 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d3d33e0bde8357d58a3c4981dd016e9b9c553f3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/04a58f2837c1ec9e78bd722bbe81e9cd7ab38727 #}

Chromium issues: [1319828](https://crbug.com/1319828), [1318635](https://crbug.com/1318635), [1305475](https://crbug.com/1305475)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

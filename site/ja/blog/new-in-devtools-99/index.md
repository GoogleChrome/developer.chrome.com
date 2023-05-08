---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 99)"
authors:
  - jecelynyeen
date: 2022-02-21
updated: 2022-02-21
description:
  "WebSocketリクエスト数の制限、新しいReporting APIペイン、コンソールのスタイル指定など"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gE3lh8nJmOF9y3jzAhyI.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-99
---

*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [yoichiro](https://github.com/yoichiro)さんと [lacolaco](https://github.com/lacolaco) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='zFVWeOKZBHs' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Throttling WebSocket requests {: #websocket } -->

## WebSocketリクエスト数の制限 {: #websocket }

<!-- The **Network** panel now supports throttling web socket requests. Previously, the network throttling didn't work on web socket requests. -->

**Network** パネルに WebSocket リクエスト数の制限が新しく追加されました。これまで、ネットワーク制限は WebSocket リクエストに対しては有効ではありませんでした。

<!-- Open the **Network** panel, click on a web socket request and open the **Messages** tab to observe the message transfers. Select **Slow 3G** to throttle the speed.  -->

**Network** パネルを開き、WebSocket リクエストをクリックして、メッセージの通信状況を確認するために **Messages** タブを開いてください。通信速度を制限するためには **Slow 3G** を選択します。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZHJibovD0IRQ7KrWb0aD.png", alt="Throttling WebSocket requests", width="800", height="540" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZHJibovD0IRQ7KrWb0aD.png", alt="WebSocket リクエスト数の制限", width="800", height="540" %}

Chromium issue: [423246](https://crbug.com/423246)


<!-- ## New Reporting API pane in the Application panel {: #reporting-api } -->

## Application パネル内に新しく追加されたReporting API ペイン {: #reporting-api }

<!-- Use the new **Reporting API** pane to monitor the reports generated on your page and their status. -->

新しく追加された **Reporting API** ペインを使用すると、そのページで生成されるレポートやそれらの状況を監視できます。

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->

[Reporting API](https://web.dev/reporting-api/) はセキュリティ違反や廃止されるAPIの呼び出しなどを監視できるように設計されています。

<!-- Open a page which uses the Reporting API (e.g. [demo page](https://reporting-api-demo.glitch.me/)). In the **Application** panel, scroll down to the **Background services** section and select the **Reporting API** pane.  -->

Reporting API を使用しているページ（例、 [デモページ](https://reporting-api-demo.glitch.me/)）を開いてください。**Application** パネルの**Background services** セクションまでスクロールし、**Reporting API** ペインを選択します。

<!-- The **Reports** section shows you a list of reports generated on your page and their status. Click on it to view the report’s details. -->

**Reports** セクションではそのページで生成されたレポートのリストとそれらのステータスが表示されていて、クリックするとレポートの詳細を確認できます。

<!-- The **Endpoints** section gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header.  -->

**Endpoints** セクションには `Reporting-Endpoints` ヘッダで設定されている全エンドポイントの概要があります。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Reporting API pane", width="800", height="560" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Reporting API ペイン", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/668bc7a4bc6bea854e8fc21f0e0ca3953ff5e95a #}

Chromium issue: [1205856](https://crbug.com/1205856)


<!-- ## Support wait until element is visible/clickable in the Recorder panel {: #recorder } -->

## Recorder パネルに要素が可視／クリック可能になるまで待機する機能が追加 {: #recorder }

<!-- When replaying a user flow recording, the **Recorder** panel will now wait until the element is visible or clickable in the viewport or try to automatically scroll the element into the viewport before replaying the step. Previously, the replay would fail immediately. -->

**Recorder** パネルでユーザーフローの記録をリプレイする際に、要素がビューポート内で可視もしくはクリック可能になるまで待機するか、次のステップをリプレイする前に要素がビューポートに含まれるまで自動的にスクロールするようになりました。これまでは、リプレイは即座に失敗していました。

<!-- Here is an example of an off-screen menu positioned outside of the viewport and slide in when activated. The user flow is to toggle the menu, and click on the menu item. Previously, the replay would fail at the last step, because the menu item is still sliding in and not visible in the viewport yet. It’s fixed now. -->

次の画像はビューポートの外側に位置し、有効になるとスライドインするオフスクリーンメニューの例です。メニューをトグルし、メニューアイテムをクリックするというユーザーフローです。これまではメニューアイテムがまだスライドインしておらず、ビューポート内に表示されていないので、最後の段階で失敗していました。この挙動が修正されています。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qf8f2x1u1y5FEMSmkB3A.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

Chromium issue: [1257499](https://crbug.com/1257499#c38)


<!-- ## Better console styling, formatting and filtering {: #console } -->

## コンソールのスタイル設定、フォーマット、フィルタの改善 {: #console }

<!-- ### Properly style log messages with ANSI escape code {: #console-styling }  -->

### ANSI エスケープコードを使用したログメッセージの正しいスタイル設定 {: #console-styling }

<!-- You can now use the [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code) to properly style console messages. Previously, DevTools console had very limited (and partly broken) support for ANSI escape sequences. -->

[ANSI エスケープシーケンス](https://en.wikipedia.org/wiki/ANSI_escape_code)を使用してコンソールメッセージのスタイルを適切に設定できるようになりました。これまで DevTools コンソールは ANSI エスケープシーケンスを非常に限定的な（場合によっては不具合もある）サポートしかしていませんでした。

<!-- It is common for [Node.js](https://nodejs.org/) developers to colorize log messages via ANSI escape sequences, often with the help of some styling libraries like [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur), etc.  -->

[Node.js](https://nodejs.org/) にとって、[chalk](https://www.npmjs.com/package/chalk) や [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors)、[kleur](https://www.npmjs.com/package/kleur) などのスタイル設定用のライブラリの助けを借りて ANSI エスケープシーケンスでログメッセージに色付けすることは一般的です。

<!-- With these changes, you can now debug your Node.js applications seamlessly using DevTools, with proper colorized console messages. Open this [demo](https://stackblitz.com/edit/node-colors-test) to view it yourself! -->

今回の変更により、DevTools でも適切に色付けされたコンソールメッセージで、Node.js アプリケーションをシームレスにデバッグできるようになりました。自分で確認するにはこの[デモ](https://stackblitz.com/edit/node-colors-test)を開いてください。

<!-- To learn more about formatting & styling console messages with DevTools, go to [format and style messages in the Console](/docs/devtools/console/format-style) documentation. -->

DevToolsのコンソールメッセージのフォーマット指定やスタイル設定についてさらに学びたければ、[Format and style messages in the Console](/docs/devtools/console/format-style) ドキュメントを参照してください。


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6Lu7Js1rgSmjV0cnhDlH.png", alt="コンソールスタイル設定", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f061ee77a872701a366a604903e639506574520a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22a372d445c3f8cff00c2cfe48cb7373165bcd9d #}

Chromium issues: [1282837](https://crbug.com/1282837), [1282076](https://crbug.com/1282076)


<!-- ### Properly support `%s`, `%d`, `%i` and `%f` format specifiers {: #console-format } -->

### フォーマット指定子`%s`、`%d`、`%i`、`%f`を正しくサポート {: #console-format }

<!-- The **Console** now properly performs the `%s`, `%d`, `%i`, and `%f` type conversions as specified in the [Console Standard](https://console.spec.whatwg.org/). Previously, the conversation result was inconsistent. -->

**Console** が [Console Standard](https://console.spec.whatwg.org/) の規定に従って`%s`、`%d`、`%i`、`%f`を指定した型変換を適切に処理するようになりました。これまでは変換結果が一貫していませんでした。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eQPTyQMmyjOUQ6WD4n6N.png", alt="support format specifiers in console messege", width="800", height="490" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eQPTyQMmyjOUQ6WD4n6N.png", alt="コンソールメッセージのフォーマット指定をサポート", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ec299d49c6ab2c185df660766b1fb827db87f8a #}

Chromium issues: [1277944](https://crbug.com/1277944), [1282076](https://crbug.com/1282076)


<!-- ### More intuitive console group filter {: #console-filter } -->

### より直感的なコンソールグループフィルタ {: #console-filter }

<!-- When filtering the console message, a console message is now shown if its message content matches the filter or the title of the group (or the ancestor group) matches the filter. Previously, the console group title would show despite the filter. -->

コンソールメッセージをフィルタリングする際に、メッセージの内容がフィルタと一致するか、グループ（または祖先グループ）のタイトルがフィルタと一致するとコンソールメッセージが表示されるようになりました。これまでは、フィルタに関わらず、コンソールグループタイトルが表示されていました。

<!-- In addition, if a console message is shown, the group (or the ancestor group) it belongs to is now shown as well.  -->

また、コンソールメッセージが表示される時に、所属しているグループ（または祖先グループ）も表示されるようになりました。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7iE7r79DI3cQxObhiZUh.png", alt="console group filter", width="800", height="612" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7iE7r79DI3cQxObhiZUh.png", alt="コンソールグループフィルタ", width="800", height="612" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/94734947c48283a56f93430f23b838cef10fd364 #}

Chromium issue: [1068788](https://crbug.com/1068788)


<!-- ## Source maps improvements {: #sourcemap } -->

## ソースマップの改善 {: #sourcemap }

<!-- ### Debug Chrome extension with source map files {: #extension } -->

### ソースマップファイルを使用した Chrome 拡張機能のデバッグ {: #extension }

<!-- You can now [debug Chrome extension](/docs/extensions/mv3/getstarted/#unpacked) with source map files. Previously, DevTools only supported inline sourcemap for Chrome extension debugging. -->

ソースマップファイルを使用して [Chrome 拡張機能をデバッグ](/docs/extensions/mv3/getstarted/#unpacked)できるようになりました。これまで、Chrome 拡張機能のデバッグに関して、DevTools はインラインのソースマップだけをサポートしていました。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lnRa954ROl0MSSExlBl7.png", alt="Debug Chrome extension with source map files", width="800", height="518" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lnRa954ROl0MSSExlBl7.png", alt="ソースマップファイルを使用した Chrome 拡張機能のデバッグ", width="800", height="518" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1e73eb62955de7c4b0920575c7b374d47dab6a65 #}

Chromium issue: [212374](https://crbug.com/212374)


<!-- ### Improved source folder tree in the Sources panel {: #source-tree } -->

### Sources パネルのソースフォルダツリーの改善 {: #source-tree }

<!-- The source folder tree in the **Sources** panel is now improved with less clutter in the folder structures and naming (e.g. “../”, “./”, etc). Under the hood, this is the result of normalizing the absolute source URLs in the source maps. -->

**Sources** パネルのソースフォルダツリーがフォルダ構造と名前付け（例、"../"、"./"など）により乱れにくく改善されました。内部的には、ソースマップ内の絶対ソースURLが正規化された結果が使用されています。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Wl1pPVfQ51NaCtpp3KuY.png", alt="Improved source folder tree in the Sources panel", width="800", height="444" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Wl1pPVfQ51NaCtpp3KuY.png", alt="Sources パネルのソースフォルダツリーの改善", width="800", height="444" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/68613ab02f6d556a2c5ac68ea08f466a534c6bd9 #}

Chromium issue: [1284737](https://crbug.com/1284737)


<!-- ### Display worker source files in the Sources panel {: #worker-sourcemap } -->

### Sources パネルにワーカーのソースファイルを表示 {: #worker-sourcemap }

<!-- [Worker](https://web.dev/workers-overview/) (e.g. web worker, service worker) source files with relative SourceURL are now displayed in the **Source** panel. Previously, worker source files were not handled correctly. -->

相対 SourceURL を持つ [Worker](https://web.dev/workers-overview/)（例、Web Worker、Service Worker）のソースファイルが **Source** パネルに表示されるようになりました。これまでは、ワーカーのソースファイルは正しく扱われませんでした。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/apH5n92bqYWINMQn5VXa.png", alt="ALT_TEXT_HERE", width="800", height="509" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/apH5n92bqYWINMQn5VXa.png", alt="Sources パネルにワーカーのソースファイルを表示", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6e877d5e1a3ccca22e866fb2a70330613aeb6964 #}

Chromium issue: [1277002](https://crbug.com/1277002)


<!-- # Chrome’s Auto Dark Theme updates {: #auto-dark-mode } -->

## Chrome の自動ダークテーマの更新 {: #auto-dark-mode }

<!-- The [Auto Dark Theme emulation](/blog/new-in-devtools-96/#auto-dark-mode) UI is now simplified. It is a checkbox now, it was a dropdown previously. -->

[自動ダークテーマエミュレーション](/blog/new-in-devtools-96/#auto-dark-mode)の UI が単純になりました。これまではドロップダウンでしたが、チェックボックスが使用されます。

<!-- Apart from that, when the [Auto Dark Theme](/blog/auto-dark-theme/) is enabled, the **Emulate prefers-color-scheme** dropdown will be disabled and set to **prefers-color-scheme: dark** automatically. -->

さらに、[Auto Dark Theme](/blog/auto-dark-theme/) が有効なときに、**Emulate prefers-color-scheme** ドロップダウンが無効になり、**prefers-color-scheme: dark** が自動的に設定されます。

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System. -->

Chrome 96 で Android の [Auto Dark Theme](/blog/auto-dark-theme/) の[オリジントライアル](/blog/origin-trials/)が開始されました。この機能を使用すると、ユーザーがオペレーティングシステムでダークテーマをオプトインしているときに、ブラウザはライトテーマが使用されているサイトに対して自動的に生成されたダークテーマを適用します。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eqfY1jZI8kY7BknnuAom.png", alt="Auto Dark Theme emulation", width="800", height="476" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eqfY1jZI8kY7BknnuAom.png", alt="自動ダークテーマエミュレーション", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8443d2894b6401695ce94657e6afd5ad399eef28 #}

Chromium issue: [1243309](https://crbug.com/1243309)


<!-- ## Touch-friendly color-picker and split pane {: #touch-friendly } -->

## タッチ操作で使いやすいカラーピッカーとスプリットペイン {: #touch-friendly }

<!-- You can now select color, and resize the [Drawer](/docs/devtools/customize/#drawer) in DevTools with fingers or stylus on touchscreen devices. -->

タッチ画面デバイスで指やスタイラスを使用してDevTools上で色を選択したり、[Drawer](/docs/devtools/customize/#drawer) をリサイズできるようになりました。

<!-- Here is an example captured with the [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/) device touchscreen. -->

以下は [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/) デバイスのタッチ画面をキャプチャした例です。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/aA3Oann2z26Yty9sgNB2.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f60936b29519e0cf387cd0a133d43885c6eb183d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22bb84d657aa69f6f7d5067605c2c133a5714172 #}

Chromium issues: [1284245](https://crbug.com/1284245), [1284995](https://crbug.com/1284995)


<!-- ## Miscellaneous highlights {: #misc } -->

## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->

今回のリリースでは、以下のような注目の修正点があります。

<!-- - Fixed the [edit cookies](/docs/devtools/storage/cookies/#edit) issue in the **Cookies** pane. ([1290196](https://crbug.com/1290196)) -->
- **Cookies** ペインの [Cookie 編集](/docs/devtools/storage/cookies/#edit)に関する問題が修正されました。 ([1290196](https://crbug.com/1290196))
<!-- - Use `Shift` + `Tab` to select the previous command in the [Command menu](/docs/devtools/command-menu/). ([1278743](https://crbug.com/1278743)) -->
- [コマンドメニュー](/docs/devtools/command-menu/)で `Shift` + `Tab` を使用して以前のコマンドを選択できます。 ([1278743](https://crbug.com/1278743))
<!-- - Report [CORS preflight request](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) issues in the [Issues](/docs/devtools/issues/) tab. ([1272445](https://crbug.com/1272445)). -->
- [CORS プリフライトリクエスト](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls)の問題が [Issues](/docs/devtools/issues/) タブでレポートされるようになりました。 ([1272445](https://crbug.com/1272445)).
<!-- - Report [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) issues in the [Issues](/docs/devtools/issues/) tab. ([1219359](https://crbug.com/1219359)). -->
- [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) の問題が [Issues](/docs/devtools/issues/) タブでレポートされるようになりました。 ([1272445](https://crbug.com/1272445)).
<!-- - Fixed `Shift` + `Delete` and `Page up` / `Page down` behaviors in the **Sources** and **Console** panel. ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662)) -->
- **Sources** パネルと **Console** パネルでの `Shift` + `Delete` と `Page up` / `Page down` の動作が修正されました。 ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662))
<!-- - Close the breakpoint edit dialog on breakpoint removal in the **Sources** panel. (922513)  -->
- **Sources** パネルでブレークポイントが削除されたときにブレークポイント編集ダイアログが閉じられるようになりました。([922513](https://crbug.com/922513))
<!-- - No reload required when [switching light/dark theme](/docs/devtools/customize/dark-theme/) in DevTools. ([1278738](https://crbug.com/1278738)) -->
- DevTools で[ライト／ダークテーマを切り替え](/docs/devtools/customize/dark-theme/)たときに、リロードが不要になりました。 ([1278738](https://crbug.com/1278738))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

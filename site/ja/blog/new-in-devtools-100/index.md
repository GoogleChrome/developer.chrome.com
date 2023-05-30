---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 100)"
authors:
  - jecelynyeen
date: 2022-03-08
updated: 2022-03-08
description: '@supports アットルールの表示と編集、レコーディングのセレクタのリネームやカスタマイズなど'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iGv7SjPPIapkDmYbjVVH.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-100
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さん、レビュアーの [technohippy](https://github.com/technohippy) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='DAD72grzDDc' %}

## Chrome 100  {: #m100 }

<!-- Here’s to the 100th Chrome version! Chrome DevTools will continue to provide reliable tools for developers to build on the web. Take a moment to click around in the **What’s New** tab to celebrate the milestones. -->
これが 100 番目の Chrome バージョンです！Chrome DevTools は、開発者がウェブを構築するための信頼できるツールを引き続き提供します。このマイルストーンを祝うために、少し時間を頂いて、**What's New** タブの中で周りをクリックしてみてください。

<!-- As usual, you can watch the latest [What’s New in DevTools video](https://goo.gle/devtools-youtube) by clicking on the image. -->
いつものように、画像をクリックすることで、最新の [What’s New in DevTools 動画](https://goo.gle/devtools-youtube) を見ることができます。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/u8sn7ubuxjJoyPgbfNJs.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


<!-- View and edit @supports at rules in the Styles pane {: #supports } -->
## Styles ペインでの @supports アットルールの表示と編集 {: #supports }

<!-- You can now view and edit the CSS `@supports` at-rules in the **Styles** pane. These changes make it easier to experiment with the at-rules in real time. -->
**Styles** ペインにて、CSS の `@supports` アットルールを表示および編集することができるようになりました。これらの変更によって、アットルールをリアルタイムで簡単に試すことができます。

<!-- Open this [demo page](https://jec.fish/demo/at-support), [inspect](/docs/devtools/dom/#inspect) the `<div class=”box”>` element, view the `@supports` at-rules in the **Styles** pane. Click on the rule’s declaration to edit it.  -->
この [デモページ](https://jec.fish/demo/at-support) を開いて、 `<div class=”box”>` 要素を [inspect](/docs/devtools/dom/#inspect) すると、 **Styles** ペインの中で `@supports` アットルールが表示されます。編集するには、そのルールの宣言をクリックしてください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vnokX5Hswmbvlb5weusO.png", alt="@supports アットルールの表示と編集", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c17e46caa5be1d8c769146baecc91e0d740f7fd #}

Chromium issues: [1222574](https://crbug.com/1222574), [1222573](https://crbug.com/1222573)


<!-- ## Recorder panel improvements {: #recorder } -->
## Recorder パネルの改善 {: #recorder }

<!-- ### Support common selectors by default {: #selector } -->
### デフォルトで共通セレクタをサポート {: #selector }

<!-- When determining an unique selector during recording, the [Recorder](/docs/devtools/recorder/) panel now automatically prefers elements with the following attributes: -->
レコーディング中に特定のセレクタを決定するときに、 [Recorder](/docs/devtools/recorder/) パネルは以下の属性を持つ要素を自動的に優先するようになりました。

- data-testid
- data-test
- data-qa
- data-cy
- data-test-id
- data-qa-id
- data-testing

<!-- The attributes above are common selectors used in test automation.  -->
上記の属性は、テストの自動化で使用される一般的なセレクタです。

<!-- For example, [start a new recording](/docs/devtools/recorder/#record) with this [demo page](https://jec.fish/demo/recorder). Fill in an email address and observe the selector value. -->
例えば、この [デモページ](https://jec.fish/demo/recorder) で [新規にレコーディングを開始](/docs/devtools/recorder/#record) します。 メールアドレスを入力して、セレクタの値を確認してみてください。

<!-- Since the email element has `data-testid` defined, it’s used as the selector automatically instead of the `id` or `class` attributes. -->
email 要素には `data-testid` が定義されているので、 `id` や `class` 属性の代わりに、自動的にセレクタとして使用されます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4diI81kpscXznWLrB6a9.png", alt="デフォルトで共通セレクタをサポート", width="800", height="585" %}


<!-- ### Customize the recording’s selector {: #customize-selector } -->
### レコーディングのセレクタをカスタマイズする {: #customize-selector }

<!-- You can customize the selector of a recording if you are not using the [common selectors](/docs/devtools/recorder/#selector). -->
[一般的なセレクタ](/docs/devtools/recorder/#selector) を使用していない場合は、レコーディングのセレクタをカスタマイズできます。

<!-- For example, this [demo page](https://jec.fish/demo/recorder) uses the `data-automate` attribute as the selector. [start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute. Fill in an email address and observe the selector value (`[data-automate=email-address]`). -->
例えば、この [デモページ](https://jec.fish/demo/recorder) は、セレクタとして `data-automate` 属性を使用しています。 [新規にレコーディングを開始](/docs/devtools/recorder/#record) して、セレクタとして `data-automate` と入力します。メールアドレスを入力して、セレクタの値 ( `[data-automate=email-address]` ) を確認してみてください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="レコーディングのセレクタをカスタマイズする", width="800", height="524" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="カスタムセレクタ選択の結果", width="800", height="579" %}


<!-- ### Rename a recording {: #recorder-rename } -->
### レコーディングのリネーム {: #recorder-rename }

<!-- You can now rename a recording in the [Recorder](/docs/devtools/recorder/) panel with the edit button (pencil icon) next to the recording’s title. -->
レコーディングのタイトルの隣りにある編集ボタン（鉛筆のアイコン）を使って、 [Recorder](/docs/devtools/recorder/) パネルでレコーディングの名前を変更することができるようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pn9Xsrq9lnStmtjpe0jt.png", alt="レコーディングのリネーム", width="800", height="502" %}


<!-- ## Preview class/function properties on hover {: #properties } -->
## ホバーでクラスや関数のプロパティをプレビューする {: #properties }

<!-- You can now hover over a class or function in the **Sources** panel during debugging to preview its properties. Previously, it only showed the function name and a link to its location in the source code. -->
デバッグ中に、 **Source** パネルにてクラスや関数にカーソルを合わせることで、そのプロパティをプレビューできるようになりました。以前は、関数名やソースコード内の位置へのリンクのみが表示されていました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BZzL6QMheyd31VGqhA8W.png", alt="ホバーでクラスや関数のプロパティをプレビューする", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a585b3883ad39f2f83fa5ab9c7731270d3a2974 ​#}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96fb7872ce01eb3fde267e39987a82ce3d3f3e21 #}

Chromium issue: [1049947](https://crbug.com/1049947)


<!-- ## Partially presented frames in the Performance panel {: #perf } -->
## Performance パネルでの Partially presented frames {: #pref }

<!-- Performance recording now displays a new frame category "Partially presented frames" in the **Frames** timeline.  -->
Performance レコーディングでは、 **Frames** タイムラインの中で新しいフレームカテゴリ "Partially presented frames" が表示されます。

<!-- Previously, the **Frames** timeline visualizes any frames with delayed main-thread work as "dropped frames". However, there are cases where some frames may still produce visual updates (e.g. scrolling) driven by the compositor thread. -->
以前は、 **Frames** タイムラインは、メインスレッドの動作を遅延させたフレームを "dropped frames" として表示していました。しかし、一部のフレームでは、コンポジタスレッドによって駆動される視覚的な更新（スクロールなど）が依然として生成されるケースがあります。

<!-- This leads to user confusion because the screenshots of these “Dropped frames” are still reflecting visual updates.  -->
これらの "Dropped frames" のスクリーンショットはまだ視覚的な更新を反映しているため、これはユーザの混乱につながります。

<!-- The new "Partially presented frames" aims to indicate more intuitively that although some content is not presented timely in the frame, but the issue is not so severe as to block visual updates altogether. -->
新しい "Partially presented frames" は、一部のコンテンツがフレーム内でタイムリーに表示されていないものの、視覚的な更新を完全にブロックするほど深刻ではないことをより直感的に示すことを目的にしています。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QcqjnFhMz1Bxd5dkmduj.png", alt="Performance パネルでの Partially presented frames", width="800", height="531" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a06c2e7c1abeb92be9cfc6b3bf9d6edf6d742e01 #}

Chromium issue: [1261130](https://crbug.com/1261130)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
以下は、今回のリリースにおいて注目すべき修正となります。

<!-- - Updated iPhone user agent strings for [emulated devices](/docs/devtools/device-mode/#device). All iPhone versions after 5 have a user-agent string with iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553)) -->
- [エミュレートされたデバイス](/docs/devtools/device-mode/#device) の iPhone ユーザエージェント文字列が変更されました。 5 以降の全ての iPhone バージョンでは、 iPhone OS 13_2_3 を user-agent 文字列に含みます。 ([1289553](https://crbug.com/1289553))
<!-- - You can now save [snippet](/docs/devtools/javascript/snippets/) as a JavaScript file directly. Previously, you needed to append `.js` file extension manually. ([1137218](https://crbug.com/1137218)) -->
- [スニペット](/docs/devtools/javascript/snippets/) を JavaScript ファイルとして直接保存できるようになりました。以前は、手動で `.js` ファイル拡張子を追加する必要がありました。 ([1137218](https://crbug.com/1137218))
<!-- - The **Sources** panel now correctly displays scope variable names when debugging with source map. Previously, the **Sources** panel displays minified scope variable names despite source map being provided. ([1294682](https://crbug.com/1294682))  -->
- ソースマップを使ってデバッグするときに、 **Sources** パネルに正しくスコープ変数名が表示されるようになりました。以前は、ソースマップが提供されているにも関わらず、 **Sources** パネルには短縮されたスコープ変数名が表示されていました。 ([1294682](https://crbug.com/1294682))
<!-- - The **Sources** panel now restores scroll position correctly on page load. Previously, the position was not restored correctly causing inconvenience in debugging. ([1294422](https://crbug.com/1294422))  -->
- **Sources** パネルは、ページの読み込み時にスクロール位置を正しく復元するようになりました。以前は、位置が正しく復元されなかったために、デバッグ時に不便さがありました。 ([1294682](https://crbug.com/1294682))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

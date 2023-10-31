---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 97)"
authors:
  - jecelynyeen
date: 2021-11-29
updated: 2021-11-29
description:
  "新しい Recorder パネル、デバイスモードでのデバイス一覧の更新など"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Z4Fm456SsBm1MYylRhzA.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-97
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さん、レビュアーの [lacolaco](https://github.com/lacolaco) さんと [technohippy](https://github.com/technohippy) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='cGotLGL1-Ko' %}

<!-- ## Preview feature: New Recorder panel {: #recorder } -->
## プレビュー機能: 新しい Recorder パネル {: #decorder }

<!-- Use the new **Recorder** panel to record, replay and measure user flows.  -->
新しい **Recorder** パネルを使用すると、ユーザフローを記録、再生、そして計測できます。

<!-- [Open the **Recorder** panel](/docs/devtools/recorder/#open). Follow the instructions on screen to start a new recording.  -->
[**Recorder** パネルを開きます](/docs/devtools/recorder/#open)。新規に記録を開始するために、画面の指示に従ってください。

<!-- For example, you can record the coffee checkout process with this [coffee ordering demo](https://coffee-cart.netlify.app/) application. After adding a coffee and filling out payment details, you can end the recording, replay the process or click on the **Measure performance** button to measure the user flow in the **Performance** panel. -->
例えば、この [コーヒー注文のデモ](https://coffee-cart.netlify.app/) を使って、コーヒーをチェックアウトする処理を記録することができます。コーヒーを追加して決済のための詳細情報を入力した後、記録を終えて処理を再生したり、**Performance** パネルにて **Measure performance** ボタンをクリックしてユーザフローの計測を行うことが可能です。

<!-- Go to the **Recorder** panel [documentation](/docs/devtools/recorder/) to learn more with the step-by-step tutorial! -->
**Recorder** パネルの [ドキュメント](/docs/devtools/recorder/) に行って、ステップバイステップなチュートリアルにて詳細を学びましょう！

<!-- The **Recorder** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements. -->
**Recorder** パネルは、プレビュー機能です。私たちのチームは活発に開発を進めています。更なる改善のために、皆さんからの [フィードバック](https://goo.gle/recorder-feedback) をお待ちしております。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3EpVa15PtbhFwwszqyWF.png", alt="Recorder パネル", width="800", height="540" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Refresh device list in Device Mode {: #device } -->
## デバイスモードでのデバイス一覧の更新 {: #device }

<!-- [Enabling the Device Toolbar](/docs/devtools/device-mode#viewport), more modern devices are now added in the device list. Select a device to simulate its dimensions. -->
[デバイスツールバーを有効にする](/docs/devtools/device-mode#viewport) と、より新しいデバイスがデバイス一覧に追加されているのがわかります。画面サイズをシミュレートするデバイスを選択しましょう。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Trx5NqE9RrqpWiN24iZ0.png", alt="デバイスモードでのデバイス一覧の更新", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ede4c59ac39f8281b3e372fa2e8f162c1a2a7ea2 #}

Chromium issue: [1223525](https://crbug.com/1223525)


<!-- ## Autocomplete with Edit as HTML {: #code-completion } -->
## Edit as HTML でのオートコンプリート {: #code-completion }

<!-- The **Edit as HTML** UI now supports autocomplete and syntax highlights. In the **Elements** panel, right click on an element, and select  **Edit as HTML**. Try typing a DOM property (e.g. `id`, `aria`), the autocomplete should help you find the property name you're looking for. -->
**Edit as HTML** はオートコンプリートとシンタックスハイライトをサポートするようになります。**Elements** パネルにて、要素を右クリックして、**Edit as HTML** を選択してください。DOM プロパティ（例: `id`, `aria`）をタイプしてみましょう。期待しているプロパティ名を探すことをオートコンプリート機能が手伝ってくれるはずです。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yWnmpCQXpsRjWbbRQ9Pi.png", alt="Edit as HTML でのオートコンプリート", width="800", height="472" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f467de3e756f998b0e9dd222ce286cb2b7cbaca0 #}

Chromium issue: [1215072](https://crbug.com/1215072)


<!-- ## Improved code debugging experience {: #debugging } -->
## 改善されたコードデバッグ体験 {: debugging }

<!-- Column numbers are now included in the output error in the Console. Having easy access to the column number is essential for debugging especially with minified JavaScript. -->
Console 内のエラー出力に、列番号が含まれるようになります。特に Minify された JavaScript に対するデバッグでは、列番号に簡単にアクセスできることが不可欠です。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mKAUxO94rwvBI9oyeiIB.png", alt="エラー出力での列番号", width="800", height="553" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/277ee38b0701e6e5b36c9626d109b62b0361ced6 #}

Chromium issue: [1073064](https://crbug.com/1073064)


<!-- ## [Experimental] Syncing DevTools settings across devices {: #sync } -->
## [実験的] デバイスを横断した DevTools 設定の同期 {: #sync }

<!-- Your DevTools settings are now synced across devices by default when you turn on Chrome profile sync. You can change the DevTools sync settings via **Settings** > **Sync** > **Enable settings sync**. -->
Chrome プロファイル同期を有効にしている際は、DevTools 設定はデバイスを横断してデフォルトで同期されるようになります。**Settings** > **Sync** > **Enable settings sync** から DevTools の同期設定を変更することが可能です。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="DevTools 同期設定", width="800", height="654" %}

<!-- This new setting makes it easier for you to work across devices. For example, the following appearance settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again. Learn more about the sync feature in [DevTools customization](/docs/devtools/customize/).  -->
この新しい設定は、デバイスを横断して作業を行うことを簡単にしてくれます。例えば、以下の表示設定が同期されることで、一貫した体験をデバイスを横断して得ることができ、同じ設定を何度も再定義する必要がなくなります。[DevTools カスタマイズ](/docs/devtools/customize/) にて、同期機能の詳細をご覧ください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="表示設定", width="800", height="584" %}

<!-- This feature is experimental at the moment, the team is still actively working on it. If you have any feedback, please share with us [here](https://crbug.com/1245541) -->
この機能は現在実験的であり、チームは活発に作業を続けています。もし何かフィードバックがあれば、ぜひ [こちら](https://crbug.com/1245541) から私たちに共有してください。

Chromium issue: [1245541](https://crbug.com/1245541)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

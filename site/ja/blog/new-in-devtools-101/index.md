---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 101)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "ユーザーフローをJSONとしてインポート/エクスポート、hwb()カラーのサポート、 Styles ペインでのカスケードレイヤーの表示など。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CZtcR9HMcM14EStueqxH.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-101
---

*翻訳者の [lacolaco](https://github.com/lacolaco) さん、レビュアーの [technohippy](https://github.com/technohippy) さん、 [yoichiro](https://github.com/yoichiro) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='u9GRAliBrM8' %}

<!-- ## Import and export recorded user flows as a JSON file  {: #recorder } -->
## 記録されたユーザーフローをJSONファイルとしてインポート/エクスポート  {: #recorder }

<!-- The [Recorder](/docs/devtools/recorder) panel now supports importing and exporting user flow recordings as a JSON file. This addition makes it easier to share user flows and can be useful for bug reporting. -->
[Recorder](/docs/devtools/recorder) パネルは、ユーザーフローの記録をJSONファイルとしてインポートおよびエクスポートすることをサポートするようになりました。この追加により、ユーザーフローを簡単に共有できるようになり、バグレポートにも役立ちます。

<!-- For example, download this [JSON file](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). You can import it with the import button and [replay the user flow](/docs/devtools/recorder/#replay). -->
例えば、この[JSONファイル](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json)をダウンロードします。これをインポートボタンでインポートし、[ユーザーフローを再生できます](/docs/devtools/recorder/#replay)。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Jy7NEDZs6XJb90EWqETj.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

<!-- Apart from that, you can export the recording as well. After [recording a user flow](/docs/devtools/recorder/#record), click on the export button. There are 3 export options: -->
それとは別に、記録したものをエクスポートすることもできます。[ユーザーフローの記録](/docs/devtools/recorder/#record)の後、エクスポートボタンをクリックします。3つのエクスポートオプションがあります。

<!-- - **Export as a JSON file**. Download the recording as a JSON file. -->
- **Export as a JSON file**. 記録をJSONファイルとしてダウンロードする。
<!-- - **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.  -->
- **Export as a @puppeteer/replay script**. 記録を[Puppeteer Replay](https://github.com/puppeteer/replay)スクリプトとしてダウンロードする。
<!-- - **Export as a Puppeteer script** . Download the recording as [Puppeteer](https://pptr.dev/) script. -->
- **Export as a Puppeteer script** . 記録を[Puppeteer](https://pptr.dev/)スクリプトとしてダウンロードする。

<!-- Consult [the documentation](/docs/devtools/recorder/#export-flows) to learn more about the differences between these options. -->
これらのオプションの違いについては、[ドキュメント](/docs/devtools/recorder/#export-flows)を参照してください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcbKR5hpCNXUmdGp4UDP.png", alt="RecorderパネルのExportオプション", width="800", height="556" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## View cascade layers in the Styles pane {: #layer } -->
## Styles ペインでカスケードレイヤーを表示する {: #layer }

<!-- [Cascade layers](/blog/cascade-layers/) enable more explicit control of your CSS files to prevent style-specificity conflicts. This is particularly useful for large codebases, design systems, and when managing third party styles in applications. -->
[カスケードレイヤー](/blog/cascade-layers/)は、スタイル固有の競合を防ぐために、CSSファイルをより明示的に制御できるようにします。これは、大規模なコードベース、デザインシステム、およびアプリケーションのサードパーティのスタイルを管理する場合に特に便利です。

<!-- In this [example](https://jec.fish/demo/cascade-layer), there are 3 cascade layers defined: `page`, `component` and `base`. In the **Styles** pane, you can view each layer and its styles. -->
この[サンプル](https://jec.fish/demo/cascade-layer)では、3つのカスケードレイヤー `page`、`component`、`base` が定義されています。**Styles** ペインでは、各レイヤーとそのスタイルを確認することができます。

<!-- Click on the layer name to view the layer order. The `page` layer has the highest specificity, therefore the `box` background is green.  -->
レイヤー名をクリックすると、レイヤーの順番が表示されます。 `page` レイヤーが最も高い詳細度を持つので、 `box` の背景は緑色になっています。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A0yHsGUcqVCIO3fzKhEz.png", alt="Stylesペインでのカスケードレイヤーの表示", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/52f5be82ff6ba59343ba65ab7d8e215e46d44d3b #}

Chromium issue: [1240596](https://crbug.com/1240596)


<!-- ## Support for the hwb() color function {: #hwb } -->
## hwb() カラー関数のサポート {: #hwb }

<!-- You can now view and edit [HWB color format](https://drafts.csswg.org/css-color/#the-hwb-notation) in DevTools. -->
DevTools で [HWB カラーフォーマット](https://drafts.csswg.org/css-color/#the-hwb-notation)の表示と編集ができるようになりました。

<!-- In the **Styles** pane, hold the **Shift** key and click on any color preview to change the color format. The HWB color format is added. -->
**Styles** ペインで、 **Shift** キーを押しながら任意のカラープレビューをクリックすると、カラーフォーマットが変更されます。 HWB カラーフォーマットが追加されます。

<!-- Alternatively, you can change the color format to HWB in the [color picker](/docs/devtools/css/reference/#color-picker). -->
また、[カラーピッカー](/docs/devtools/css/reference/#color-picker)でカラーフォーマットを HWB に変更することも可能です。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jW7PXLu6Q5myiKLrsoD3.png", alt="hwb() カラー関数", width="800", height="508" %}


<!-- ## Improved the display of private properties {: #private-props } -->
## プライベートプロパティの表示を改善 {: #private-props }

<!-- DevTools now properly evaluates and displays private accessors. Previously, you couldn't expand classes with private accessors in the **Console** and the **Sources** panel. -->
DevTools は、プライベートアクセサを適切に評価および表示するようになりました。以前は、 **Console** および **Sources** パネルで、プライベートアクセサを持つクラスを展開することができませんでした。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LKir8oYFgNvRZSXMhXa7.png", alt="Consoleでのプライベートプロパティ", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/78b2ae5c5baa825c88917098ef57b595d3c94aa0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fdc72aa79313d8ec9e7a04461588bcc27aae1535 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d369648ae956e799f7337e798bf3453f1c4c440 #}

Chromium issues: [1296855](https://crbug.com/1296855), [https://crbug.com/1303407](1303407)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースでは、以下のような注目すべき修正点があります。

<!-- - The [Back/forward cache](/blog/new-in-devtools-98/#bfcache) now displays the extension ID which blocked [bfcache](https://web.dev/bfcache/) when present.( [1284548](https://crbug.com/1284548)) -->
- [バック/フォワードキャッシュ](/blog/new-in-devtools-98/#bfcache)が存在する場合、 [bfcache](https://web.dev/bfcache/) をブロックした拡張機能のIDを表示するようになりました( [1284548](https://crbug.com/1284548))．
<!-- - Fixed autocompletion support for array-like objects, CSS class names, `map.get` and HTML tags. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983)) -->
- array-like オブジェクト、CSSクラス名、 `map.get` 、HTMLタグのオートコンプリートのサポートを修正しました。([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983))
<!-- - Fixed incorrect highlights when double-clicking on words and undoing autocomplete. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667)) -->
- 単語をダブルクリックし、オートコンプリートを解除すると、正しくハイライトされないのを修正しました。([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667))
<!-- - Fixed comment keyboard shortcut in the **Sources** panel. ([1296535](https://crbug.com/1296535)) -->
- **Sources** パネルのコメントキーボードショートカットを修正しました。([1296535](https://crbug.com/1296535))
<!-- - Re-enable support for using **Alt** (Options) key for multi selection in the **Sources** panel. ([1304070](https://crbug.com/1304070)) -->
- **Sources** パネルでの複数選択時に **Alt** （Options） キーを使用するサポートを再び有効化しました。([1304070](https://crbug.com/1304070))

 
<!-- ## [Experimental] New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## [実験的] Lighthouse パネルに新しいタイムスパンとスナップショットのモードを追加 {: #lighthouse }

{% Aside %}
<!-- To enable the experiment, enable the **Use Lighthouse panel with timespan and snapshot modes** checkbox under **Settings** > **Experiments**. -->
実験を有効にするには、 **Settings** > **Experiments** の下にある **Use Lighthouse panel with timespan and snapshot modes** チェックボックスを有効にします。
{% endAside %}

<!-- Apart from the existing **navigation** mode, the **Lighthouse** panel now support two more modes on measuring user flows - **timespan** and **snapshot**. -->
従来の **navigation** モードとは別に、 **Lighthouse** パネルは、ユーザーフローを測定するための2つのモード、**タイムスパン**と**スナップショット**をサポートするようになりました。

<!-- For example, you can use the **timespan** reports to analyze user interactions. Open this [demo](https://coffee-cart.netlify.app/) page. Select the **Timespan** mode and click on **Start timespan**. On the page, click on a coffee and end the timespan. Read the report to find out the [Total Blocking Time](https://web.dev/tbt/) and [Cumulative Layout Shift](https://web.dev/cls/) that were caused by the interaction. -->
例えば、 **タイムスパン** レポートを使用して、ユーザーのインタラクションを分析することができます。この[デモ](https://coffee-cart.netlify.app/)ページを開いてください。 **Timespan** モードを選択し、 **Start timespan** をクリックします。ページ上でコーヒーをクリックし、タイムスパンを終了します。レポートを読んで、インタラクションによって生じた[Total Blocking Time](https://web.dev/tbt/) と [Cumulative Layout Shift](https://web.dev/cls/) を確認します。

<!-- Each mode has its own unique use cases, benefits, and limitations. Please refer to the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) for more information. -->
それぞれのモードには、独自の使用例、利点、制限があります。詳しくは、[Lighthouse のドキュメント](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md)をご参照ください。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/loe3f6KaR9UdYe57oQ7r.png", alt="Lighthouseパネルでのタイムスパンモードとスナップショットモード", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4d17e989f0f5bad0f9d4d5badff16fd6da09ae33 #}

Chromium issue: [772558](https://crbug.com/772558)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

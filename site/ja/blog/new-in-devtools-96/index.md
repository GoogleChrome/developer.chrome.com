---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 96)"
authors:
  - jecelynyeen
date: 2021-10-25
updated: 2021-10-25
description:
  "新しい CSS Overview パネル, SS の prefers-contrast メディア機能のエミュレート, Chrome の Auto Dark Theme 機能のエミュレートなど"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oyz4gDei2COAJ84nRJC8.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-96
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- Remember to update the whats-new.md file as well -->
<!-- end: translation instructions -->

*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [lacolaco](https://github.com/lacolaco) さんと [yoichiro](https://github.com/yoichiro) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='3CXbhnaFNEw' %}

<!-- ## Preview feature: New CSS Overview panel {: #css-overview } -->

## プレビュー機能: 新しい CSS Overview パネル {: #css-overview }

<!-- Use the new **CSS Overview** panel to identify potential CSS improvements on your page.
[Open the **CSS Overview** panel](/docs/devtools/css-overview#open), then click on **Capture overview** to generate a report of your page’s CSS. -->

新しい **CSS Overview** パネルを使用するとあなたのページの CSS を改善できる可能性を確認できます。
[**CSS Overview** パネルを開き](/docs/devtools/css-overview#open)、**Capture overview** をクリックしてページの CSS のレポートを生成してください。

<!-- You can further drill down on the information. For example, click on a color in the **Colors** section to view the list of elements that apply the same color. Click on an element to open the element in the **Elements** panel. -->

情報をさらに詳細化することも可能です。例えば、**Colors** セクションの色をクリックして同じ色を適用する要素のリストを表示できます。いずれかの要素をクリックすると **Elements** パネルでその要素が開きます。

<!-- The **CSS Overview** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/css-overview-feedback) for further enhancements. -->

**CSS Overview** パネルはプレビュー機能です。私達のチームはまだ積極的にこの機能に取り組んでおり、さらなる改善のための[フィードバック](https://goo.gle/css-overview-feedback)を求めています。

<!-- Read [this article](/docs/devtools/css-overview) to learn more on the **CSS Overview** panel. -->

[この記事](/docs/devtools/css-overview)を読むと、**CSS Overview** パネルについて更に詳細に学ぶことができます。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="CSS Overview panel", width="800", height="509" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="CSS Overview パネル", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium issue: [1254557](https://crbug.com/1254557)

<!-- ## Restored and improved CSS length edit and copy experince {: #length } -->

## CSS の length の編集とコピーの挙動の復旧と改善 {: #length }

<!-- The **copy CSS** and **edit as text** experience are restored for CSS properties with length. These experiences are broken in the last release. -->

**copy CSS** と **edit as text** の対象がCSS プロパティと長さを合わせたものに戻されました。これらの挙動は直近のリリースでは壊れていました。

<!-- {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %} -->

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

<!-- In addition, you can drag to adjust the unit value and update the unit type via the dropdown. This add-on length authoring feature should not impact the primary edit as text experience. -->

加えて、単位の値をドラッグして調節でき、単位もドロップダウンで更新できるようになりました。この追加の編集機能はテキスト編集としての主な機能には影響を与えないはずです。

<!-- {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %} -->

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %}

<!-- Please report via [goo.gle/length-feedback](https://goo.gle/length-feedback) if you found any issues. -->

もし何か問題があれば [goo.gle/length-feedback](https://goo.gle/length-feedback) で報告してください。

<!-- You can disable it via the **Settings** > **Experiments** > **Enable CSS length authoring tools in the Styles pane** checkbox. -->

この機能は **Settings** > **Experiments** > **Enable CSS length authoring tools in the Styles pane** チェックボックスを使用して無効化できます。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0042092ccbcdfb5b113c28b9a58c2cf1219b10c4 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c8f39d4c60841439ebf75d1a2d8fdfe50e1355a9 #}

<!-- Chromium issues: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993) -->

Chromium issues: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993)

<!-- ## Rendering tab updates  -->

## Rendering タブのアップデート

<!-- ### Emulate the CSS prefers-contrast media feature {: #prefers-contrast } -->

### CSS の prefers-contrast メディア機能のエミュレート {: #prefers-contrast }

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="Emulate the CSS prefers-contrast media feature", width="800", height="483" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="CSS の prefers-contrast メディア機能のエミュレート", width="800", height="483" %}

<!-- The [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) media feature is used to detect if the user has requested more or less contrast in the page. -->

[prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) メディア機能はユーザーがページのコントラストを強く、もしくは弱くすることを要求しているかどうかを検出するために使用されます。

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature prefers-contrast** dropdown. -->

[Command Menu](/docs/devtools/command-menu/) を開き、**Show Rendering** コマンドを実行して、**Emulate CSS media feature prefers-contrast** ドロップダウンを設定してください。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22cec8dbfa7b46c8b633e3555212556ec6f78df9 #}

Chromium issue: [1139777](https://crbug.com/1139777)


<!-- ### Emulate the Chrome’s Auto Dark Theme feature {: #auto-dark-mode } -->

### Chrome の Auto Dark Theme 機能のエミュレート {: #auto-dark-mode }

<!-- Use DevTools to emulate auto dark theme to easily see how your page looks when Chrome’s [Auto Dark Theme](/blog/auto-dark-theme/) is enabled. -->

DevTools を使用して自動ダークテーマをエミュレートし、Chrome の [Auto Dark Theme](/blog/auto-dark-theme/) が有効になっているときにページがどのように見えるかを簡単に確認できます。

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System.  -->

Chrome 96 は Android で [Auto Dark Theme](/blog/auto-dark-theme/) の [Origin Trial](/blog/origin-trials/) を開始しました。この機能を使用すると、ユーザーが OS のダークテーマ機能を有効にしているときに、ブラウザは明るいテーマのサイトに対して自動的に生成されたダークテーマを適用します。

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate auto dark mode** dropdown. -->

[Command Menu](/docs/devtools/command-menu/) を開き、**Show Rendering** コマンドを実行し、**Emulate auto dark mode** ドロップダウンを有効にしてください。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="Emulate the Chrome’s Auto Dark Theme feature", width="800", height="483" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="Chrome の Auto Dark Theme 機能エミュレート", width="800", height="483" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0d7e03ffa64ba8432ec9db3e067abeb60cd53d7e #}

Chromium issue: [1243309](https://crbug.com/1243309)


<!-- ## Copy declarations as JavaScript in the Styles pane {: #copy-as-js } -->

## Styles ペインで JavaScript として宣言をコピー {: #copy-as-js }

<!-- Two new options are added in the context menu  for you to easily copy CSS rules as JavaScript properties. These shortcuts options are handy especially for developers who are working with [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js)  libraries. -->

コンテキストメニューにCSS ルールを JavaScript プロパティとして簡単にコピーできる新しいオプションが2つ追加されました。これらのショートカットオプションは特に[CSS-in-JS](/blog/css-in-js/#what-is-css-in-js) ライブラリを利用している開発者にとって便利でしょう。

<!-- In the **Styles** pane, right click on a CSS rule. You can select **Copy declaration as JS** to copy a single rule or **Copy all declarations as JS** to copy all rules. -->

**Styles** ペインの CSS ルール上で右クリックしてください。**Copy declaration as JS** を選択すると単一のルールを、**Copy all declarations as JS** を選択するとすべてのルールをコピーできます。

<!-- For instance, the example below will copy `padding-left: '1.5rem'` to the clipboard. -->

例えば、次の例では `padding-left: '1.5rem'` がクリップボードにコピーされます。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="Copy declaration as JavaScript", width="800", height="469" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="宣言を JavaScript としてコピー", width="800", height="469" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca17a55104e6baf8d4ab360b484111bfa93c9b7f #}

Chromium issue: [1253635](https://crbug.com/1253635)


<!-- ## New Payload tab in the Network panel {: #payload } -->

## Network パネルの新しい Payload タブ {: #payload }

<!-- Use the new **Payload** tab in the **Network** panel when you inspect a network request with payload. Previously, the payload information is available under the **Headers** tab. -->

**Network** パネルの新しい **Payload** タブを使用して、ペイロードを伴うネットワークリクエストを調査できます。これまではペイロードの情報は **Headers** タブの中で利用可能でした。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="Payload tab in the Network panel", width="800", height="488" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="Network パネル内の Payload タブ", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eae72f667aa10a1a8316fbf8b2ac03ff514bb4da #}

Chromium issue: [1214030](https://crbug.com/1214030)


<!-- ## Improved the display of properties in the Properties pane {: #properties } -->

## Properties ペインのプロパティ表示の改善 {: #properties }

<!-- The **Properties** pane now shows only relevant properties instead of showing all properties of the instance. DOM prototypes and methods are now removed. -->

**Properties** ペインでそのインスタンスのすべてのプロパテが表示されるのではなく、関連するプロパティだけが表示されるようになりました。これからは DOM プロパティとメソッドは表示から除かれます。

<!-- Together with the **Properties** pane [enhancements](/blog/new-in-devtools-95/#properties) in Chrome 95, you can now locate the relevant properties easier. -->

これからはChrome 95 での **Properties** ペインの [拡張](/blog/new-in-devtools-95/#properties) と合わせて、関係するプロパティをより容易に指定できます。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="The display of properties in the Properties pane", width="800", height="387" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="Properties ペインでのプロパティの表示", width="800", height="387" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1574e9b550317c481a943fec059d84bfb863564 #}

Chromium issue: [1226262](https://crbug.com/1226262) 


<!-- ## Console updates -->

## コンソールのアップデート

<!-- ### Option to hide CORS errors in the Console {: #hide-cors-errors } -->

### コンソールで CORS エラーを隠すオプション {: #hide-cors-errors }

<!-- You can hide CORS errors in the **Console**. As the CORS errors are now reported in the Issues tab, hiding CORS errors in the **Console** can help reduce the clutters. -->

**Console** で CORS エラーを隠すことができます。CORS エラーは Issues タブで表示されるので、**Console** で CORS エラーを隠すと、乱雑さを減らす助けになります。

<!-- In the **Console**, click on the **Settings** icon and uncheck the **Show CORS errors in console** checkbox. -->

**Console** で、**Settings** アイコンをクリックして **Show CORS errors in console** チェックボックスのチェックを外してください。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="Option to hide CORS errors in the Console", width="800", height="502" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="Cosole で CORS エラーを隠すオプション", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/82873eeb1c1430790ad3a2cd2a698135bd6eb3de #}

Chromium issue: [1251176](https://crbug.com/1251176)


<!-- ### Proper `Intl` objects preview and evaluation in the Console {: #intl } -->

### Console での適切な `Intl` オブジェクトのプレビューと評価 {: #intl } -->

<!-- The [Intl](https://tc39.es/ecma402/#intl-object) objects have proper preview now and are evaluated eagerly in the Console. Previously, the `Intl` objects were not evaluated eagerly. -->

[Intl](https://tc39.es/ecma402/#intl-object) オブジェクトが Console で適切にプレビューされ、先行評価されるようになりました。以前は、`Intl`オブジェクトは先行評価されませんでした。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Intl objects in the Console", width="800", height="559" %} -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Console での Intl オブジェクト", width="800", height="559" %}

{# https://chromium-review.googlesource.com/c/v8/v8/+/3196175 #}

Chromium issue: [1073804](https://crbug.com/1073804)


<!-- ### Consistent async stack traces {: #async } -->

### 一貫性のある async スタックトレース {: #async }

<!-- DevTools now reports `async` stack traces for `async` functions to be consistent with other async tasks.  -->

他の非同期タスクとの一貫性のために、DevTools が `async` 関数の `async` スタックトレースをレポートするようになりました。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="async stack traces", width="800", height="427" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="async stack traces", width="800", height="427" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2a04e234f25602d1b7e7ff7bd0d39bde3f2c1ec  #}

Chromium issue: [1254259](https://crbug.com/1254259)


<!-- ### Retain the Console sidebar {: #console-sidebar } -->

### Console のサイドバーの維持 {: #console-sidebar }

<!-- The Console sidebar is here to stay. In Chrome 94, we announced the [upcoming deprecation of the Console sidebar](/blog/new-in-devtools-94/#deprecated) and ask developers for feedback and concerns. -->

Console のサイドバーは維持されます。Chrome 94 で、[Console のサイドバーがいずれ廃止される](/blog/new-in-devtools-94/#deprecated)とアナウンスし、開発者の皆さんにフィードバックと懸念事項を尋ねました。

<!-- We have now got enough feedback from the deprecation notice and we will work on improving the sidebar rather than removing it. -->

この廃止の通知に対する十分なフィードバックが集まり、廃止するのではなくサイドバーの改善に取り組むことになりました。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="Console sidebar", width="800", height="502" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="Console サイドバー", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b0650096c934bf60c21d51ae8a51c94e8f907d38 #}

Chromium issues: [1232937](https://crbug.com/1232937), [1255586](https://crbug.com/1255586)


<!-- ## Deprecated Application cache pane in the Application panel {: #app-cache } -->

## Application パネルの Application cache ペインの廃止 {: #app-cache }

<!-- The [Application cache](/docs/devtools/storage/applicationcache/) pane in the Application panel is now removed as the support for [AppCache](https://web.dev/appcache-removal/) is removed from Chrome and other Chromium-based browsers. -->

Chrome やその他の Chromium ベースのブラウザから [AppCache](https://web.dev/appcache-removal/) のサポートが外れることに伴い、Application パネルの [Application cache](/docs/devtools/storage/applicationcache/) は削除されます。

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de4d15e955d6145674e3885cde8a5a70f1269b79 #}

Chromium issue: [1084190](https://crbug.com/1084190) 


<!-- ## [Experimental] New Reporting API pane in the Application panel {: #reporting-api } -->

## [実験的] Application パネルの新しい Reporting API ペイン {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->

実験的な機能を有効にするには、**Settings** > **Experiments** の中の **Enable Reporting API panel in the Application panel** チェックボックスをチェックしてください。
{% endAside %}

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->

[Reporting API](https://web.dev/reporting-api/) はページのセキュリティ違反や廃止されたAPIの利用などの監視を助けるように用意されています。

<!-- With this experiment enabled, you can now view the reports status in the new **Reporting API** pane in the **Application** panel.  -->

この実験的な機能を有効にすると、**Application** パネルの新しい**Reporting API** ペインでレポートのステータスを確認できるようになります。

<!-- Please note that the **Endpoints** section is currently still under active development (showing no reporting endpoints for now).  -->

**Endpoints** セクションは現在のところまだ開発が非常に活発であることに注意してください（今はレポーティングのエンドポイントは表示されません）。

<!-- Learn more about the **Reporting API** with [this article](https://web.dev/reporting-api/). -->

**Reporting API** についてより詳しく知るには[この記事](https://web.dev/reporting-api/)を見てください。

<!--
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="Reporting API pane in the Application panel", width="800", height="476" %}
-->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="Application パネルの Reporting API ペイン", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0516bfc7d4cee077452d31b1550ea1d3c594705 #}

Chromium issue: [1205856](https://crbug.com/1205856)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

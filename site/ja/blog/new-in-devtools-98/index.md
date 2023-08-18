---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 98)"
authors:
  - jecelynyeen
date: 2022-01-13
updated: 2022-01-13
description:
  "フルページのアクセシビリティツリー、 Changes タブでのよりわかりやすい変更点など。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i6fMjIYZhlHz9XIclr6W.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-98
---

*翻訳者の [lacolaco](https://github.com/lacolaco) さん、レビュアーの [yoichiro](https://github.com/yoichiro)さんと [technohippy](https://github.com/technohippy) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='YqkIS88VulM' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: Full-page accessibility tree {: #a11y-tree } -->
## プレビュー機能: フルページアクセシビリティツリー {: #a11y-tree }

<!-- The new **Full-page accessibility tree** makes it easier for you to get an overview of the full-page [accessibility tree](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) and help you better understand how your web content is exposed to assistive technology.  -->
新しい **フルページアクセシビリティツリー** は、ページ全体の [アクセシビリティツリー](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) の概要を簡単に把握でき、Webコンテンツが支援技術にどう認識されるのかをより理解できるようにするためのものです。

<!-- In the **Elements** panel, open the **Accessibility** pane and select **Enable full-page accessibility tree** checkbox. Then, reload DevTools and you will see a new accessibility button in the **Elements** panel. -->
**Elements** パネルで、 **Accessibilty** ペインを開き、 **Enable full-page accessibility tree** チェックボックスを選択します。その後、 DevTools をリロードすると、 **Elements** パネルに新しいアクセシビリティボタンが表示されます。

<!-- Click on it to toggle to the **Full-page accessibility tree** view. You can expand nodes or click to see details in the  **Accessibility** pane. -->
クリックすると、**フルページアクセシビリティツリー**表示に切り替わります。ノードを展開したり、クリックすると、 **Accessibility** ペインで詳細を見ることができます。

<!-- Previously, the accessibility tree was available in the **Accessibility** pane. The view is limited, it only enables you to explore a single node and its ancestors. -->
以前は、アクセシビリティツリーは **Accessibility** ペインで利用できました。このビューは限定的で、1つのノードとその祖先を探索することしかできません。

<!-- Our team is still actively working on this preview feature. We are looking for your [feedback](https://goo.gle/devtools-a11y-tree-feedback) for further enhancements! -->
私たちのチームは、このプレビュー機能に対してまだ活発に取り組んでいます。さらなる強化のため、皆様からの[フィードバック](https://goo.gle/devtools-a11y-tree-feedback)をお待ちしています!

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png", alt="Full-page accessibility tree", width="800", height="505" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png", alt="フルページアクセシビリティツリー", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/847a06a6535111826f898175b210dbe0948277a0 #}

Chromium issue: [887173](https://crbug.com/887173)


<!-- ## More precise changes in the Changes tab {: #changes }  -->
## Changes タブで変更点のよりわかりやすい表示 {: #changes } 

<!-- The code changes in the **Changes** tab is pretty-printed automatically.  -->
**Changes** タブのコード変更点は、自動的にプリティプリントされます。

<!-- Previously, it was hard to trace the actual changes of minified source code because all the code is shown in a single line.  -->
従来は、すべてのコードが1行で表示されるため、圧縮されたソースコードの実際の変更箇所を追跡することは困難でした。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png", alt="Changes tab", width="800", height="450" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png", alt="Changes タブ", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4382b533525c65fbdb1785eda2babf035ad8bcb8 #}

Chromium issues: [1238818](https://crbug.com/1238818), [1268754](https://crbug.com/1268754) , [1086491](https://crbug.com/1086491)


<!-- ## Set longer timeout for user flow recording {: #recorder-timeout } -->
## ユーザーフローレコーディングのタイムアウト時間を長く設定する {: #recorder-timeout }

<!-- You can now adjust the **Timeout** settings in the [Recorder](/docs/devtools/recorder/) for all steps or a specific step. This is useful especially for pages with slow network requests and lengthy animation. -->
[Recorder](/docs/devtools/recorder/) で、全ステップまたは特定のステップの**タイムアウト**の設定を調整できるようになりました。これは、遅いネットワークリクエストや長いアニメーションがあるページで特に便利です。

<!-- For example, I [recorded a user flow](/docs/devtools/recorder/#record) on this [demo page](https://jec.fish/demo/pup-slow-result) to load and click on the menu item. However, the loading of the menu items is slow (it takes 6 seconds). The [replay](/docs/devtools/recorder/#replay) of this user flow failed because it exceeds 5 seconds  (the default timeout). -->
例えば、この[デモページ](https://jec.fish/demo/pup-slow-result)で、メニュー項目をロードしてクリックするまでの[ユーザーフローを記録](/docs/devtools/recorder/#record)してみました。しかし、メニュー項目の読み込みに時間がかかり(6秒)、このユーザーフローの[リプレイ](/docs/devtools/recorder/#replay)は5秒（デフォルトのタイムアウト）を超えているので失敗しています。

<!-- We can use the new **Timeout** settings to fix this. Expand the step which we click on the menu item. [Edit the step](/docs/devtools/recorder/#edit-steps) by  **Add timeout** and set it to **6000** milliseconds (equal to 6s). -->
これを解決するために、新しい **Timeout** 設定を使用することができます。メニュー項目をクリックしたステップを展開します。 **Add timeout** で[ステップを編集](/docs/devtools/recorder/#edit-steps)し、**6000** ミリ秒 (6秒と等しい) に設定します。

<!-- Optionally, you can adjust the **Timeout** in the **Replay settings** for all the steps. Expand the **Replay settings** and edit the **Timeout** value.  -->
**Replay settings** の中ですべてのステップの **Timeout** を調整することができます。 **Replay settings** を展開し、 **Timeout** の値を編集します。
 
<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png", alt="timeout settings for user flow recording", width="800", height="530" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png", alt="ユーザーフロー記録のタイムアウト設定", width="800", height="530" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Ensure your pages are cacheable with the Back/forward cache tab {: #bfcache } -->
## Back/forward cache タブでページがキャッシュ可能であることを確認する {: #bfcache }

<!-- [Back/forward cache (or bfcache)](https://web.dev/bfcache/) is a browser optimization that enables instant back and forward navigation.  -->
[Back/forward cache (または bfcache)](https://web.dev/bfcache/) は、高速な戻る、進むを可能にするブラウザの最適化です。

<!-- The new **Back/forward cache** tab can help you test your pages to ensure they're optimized for bfcache, and identify any issues that may be preventing them from being eligible. -->
新しい **Back/forward cache** タブは、ページが bfcache に最適化されているかどうかをテストし、対象外となる可能性がある問題を特定するのに役立ちます。

<!-- To test a particular page, navigate to it in Chrome and then in DevTools go to **Application** > **Back-forward Cache**. Next, click the **Test back/forward cache** button and DevTools will attempt to navigate away and back to determine whether the page could be restored from bfcache. -->
特定のページをテストするには、 Chrome でそのページに移動し、 DevTools で **Application** > **Back-forward Cache** に移動してください。次に、 **Test back/forward cache** ボタンをクリックすると、 DevTools はページをいったん離れた後で戻ろうと試み、 bfcache から復元できるかどうかを判断します。

<!-- As web developers, it's critical to know how to optimize your pages for bfcache across all browsers because it will significantly improve the browsing experience for users—especially those with slower networks or devices.  -->
Web 開発者は、すべてのブラウザで bfcache 用にページを最適化する方法を知っておくことが重要です。bfcache は、ユーザー、特に低速なネットワークやデバイスを使用するユーザーのブラウジング体験を大幅に改善します。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png", alt="Back/forward cache tab", width="800", height="516" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png", alt="Back/forward cache タブ", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f4b1333582da2410e5bc8715998b96a83b924625 #}

Chromium issue: [1110752](https://crbug.com/1110752)


<!-- ## New Properties pane filter {: #properties } -->
## 新しい Properties ペインのフィルター {: #properties }

<!-- If you want to focus on a specific property in the **Properties** pane, you can now type that property name or value in the new **Filter** textbox.  -->
**Properties** ペインで特定のプロパティにフォーカスしたい場合、新しい **Filter** テキストボックスにそのプロパティ名または値を入力することができるようになりました。

<!-- By default, properties whose value is `null` or `undefined` are not shown. Enable the **Show all** checkbox to view all properties.  -->
デフォルトでは、値が `null` または `undefined` であるプロパティは表示されません。すべてのプロパティを表示するには、 **Show all** のチェックボックスを有効にします。

<!-- These enhancements allow you to get to the properties you care for quicker and thus improve your productivity! -->
これらの強化により、気になるプロパティに迅速にアクセスできるようになり、生産性が向上します!

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png", alt="Properties pane filter", width="800", height="505" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png", alt="Properties ペインフィルター", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0980f52facf75b6c03e14472d13fe27968d4732b #}  
  
Chromium issue: [1269674](https://crbug.com/1269674)


<!-- ## Emulate the CSS forced-colors media feature {: #forced-colors } -->
## CSS の force-colors メディア機能のエミュレート {: #forced-colors }

<!-- The [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS media feature is used to detect if the user agent has enabled a forced colors mode (e.g. Windows High Contrast mode) where it enforces a user-chosen limited color palette on the page.  -->
[forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS メディア機能は、ユーザーエージェントが強制カラーモード（例： Windows High Contrast mode）を有効にし、ユーザーが選んだ限定カラーパレットをページに強制しているかどうかを検出するために使用されます。


<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature forced-colors** dropdown. -->
[Command Menu](/docs/devtools/command-menu/) を開き、 **Show Rendering** コマンドを実行し、 **Emulate CSS media feature forced-colors** ドロップダウンを設定します。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png", alt="CSS forced-colors media feature", width="800", height="623" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png", alt="CSS forced-colors メディア機能", width="800", height="623" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db79deee160cda92eda91775a27773611dce8188 #}

Chromium issue: [1130859](https://crbug.com/1130859)

<!-- ## Show rulers on hover command {: #show-rulers } -->
## ホバー時にルーラーを表示するコマンド {: #show-rulers }

<!-- You can now open the [Command Menu](/docs/devtools/command-menu/) and run the **Show rulers on hover** command. The page rulers make it easier to measure the width and height of an element. -->
[Command Menu](/docs/devtools/command-menu/) を開き、 **Show rulers on hover** コマンドを実行できるようになりました。ページルーラーを使うと、要素の幅や高さを簡単に測れるようになります。

<!-- Previously, you can only enable the page rulers via **Settings** > **Show rulers** checkbox. -->
これまでは、 **Settings** > **Show rulers** のチェックボックスでのみページルーラーの表示が可能でした。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png", alt="Show rulers on hover command", width="800", height="591" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png", alt="Show rulers on hover コマンド", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5bb8330e0f0a1c90f4a932e35aa5521826c8beea #}

Chromium issue: [1270562](https://crbug.com/1270562)


<!-- ## Support `row-reverse` and `column-reverse` in the Flexbox editor {: #flexbox-editor } -->
## Flexbox エディターで `row-reverse` と `column-reverse` をサポート {: #flexbox-editor }

<!-- The [Flexbox editor](/blog/new-in-devtools-90/#flexbox) added two new buttons to support `row-reverse` and `column-reverse` in `flex-direction`.  -->
[Flexbox エディター](/blog/new-in-devtools-90/#flexbox) に、 `flex-direction` で `row-reverse` と `column-reverse` をサポートする2つの新しいボタンが追加されました。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png", alt="Flexbox editor", width="800", height="546" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png", alt="Flexbox エディター", width="800", height="546" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7c98a6cdc296887350418746b42b2b0a474e7f27 #}

Chromium issue: [1263866](https://crbug.com/1263866)


<!-- ## New keyboard shortcuts to replay XHR and expand all search results {: #shortcuts } -->
## XHR のリプレイと全検索結果の展開に新しいキーボードショートカットを追加 {: #shortcuts }

<!-- ### Keyboard shortcuts to replay XHR in the Network panel {: #replay-xhr } -->
### ネットワークパネルで XHR をリプレイするためのキーボードショートカット {: #replay-xhr }

<!-- Select a XHR request in the **Network** panel and press **R** on the keyboard to replay the XHR. Previously, you can only replay the XHR via the context menu (right click > **Replay XHR**) -->
**Network** パネルで XHR リクエストを選択し、キーボードの **R** キーを押すと XHR がリプレイされます。以前は、コンテキストメニュー（右クリック > **Replay XHR** ）を介してのみ XHR をリプレイすることができました。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png", alt="replay XHR", width="800", height="530" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png", alt="XHR をリプレイする", width="800", height="530" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ee4a6138511d69a549677c31b563484e25855d1f #}

Chromium issue: [1050021](https://crbug.com/1050021)

 
<!-- ### Keyboard shortcut to expand all search results {: #toggle-search-result } -->
### 検索結果をすべて展開するキーボードショートカット {: #toggle-search-result }

<!-- A new shortcut is added in the **Search** tab allowing you to expand and collapse all the search results. Previously, you could only expand and collapse the search results by clicking on one file at a time. -->
**Search** タブに新しいショートカットが追加され、すべての検索結果を展開したり折りたたんだりできるようになりました。これまでは、1ファイルずつクリックすることで、検索結果を展開したり折りたたんだりすることができました。

<!-- Open the search tab via **Esc** > **3-dot** menu > **Search**. Enter a search string (e.g. function) and press **Enter** to see the list of search results. Focus on the search results and use the following shortcut to expand/collapse the search files: -->
**Esc** > **3点**メニュー > **Search** でタブを開いてください。検索文字列（例：関数）を入力し、 **Enter** を押すと、検索結果の一覧が表示されます。検索結果にフォーカスし、以下のショートカットで検索ファイルの展開・折りたたみができます。

- **Windows / Linux** - `Ctrl` + `Shift` + `{` or `}`
- **MacOS** - `Cmd` + `Options` + `{` or `}`

<!-- Go to the [keyboard shortcuts](/docs/devtools/shortcuts/) for reference of keyboard shortcuts in Chrome DevTools. -->
Chrome DevTools のキーボードショートカットのリファレンスは、[キーボードショートカット](/docs/devtools/shortcuts/)をご覧ください。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/v11XfQLwp7w9qIk440QP.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9cbd6c9453ca55edb0f155068830b1ad69c5136e #}

Chromium issue: [1255073](https://crbug.com/1255073)


<!-- ## Lighthouse 9 in the Lighthouse panel {: #lighthouse } -->
## Lighthouse パネルの Lighthouse 9 {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 9. Lighthouse will now list all the elements sharing the same id. -->
**Lighthouse** パネルで Lighthouse 9が動作するようになりました。 Lighthouse は、同じ id を共有するすべての要素をリストアップするようになりました。

<!-- Non-unique element id is a common accessibility problem. For instance, the id referenced in an `aria-labelledby` attribute is used on [multiple elements](https://web.dev/duplicate-id-aria/).  -->
要素の id が一意でないことはよくあるアクセシビリティ上の問題です。例えば、 `aria-labelledby` 属性で参照される id が[複数の要素](https://web.dev/duplicate-id-aria/)で使用されていることがあります。

<!-- Check out the [What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/) for more details on the updates. -->
アップデートの詳細は、 [What's new in Lighthouse 9.0](/blog/lighthouse-9-0/) をご確認ください。

<!-- ​{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/gZI1flmYHuUpF637Idzy.png", alt="A Lighthouse audit for 'All focusable elements must have a unique `id`', showing two elements, both with the same `id`", width="800", height="380", class="screenshot" %} -->
​{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/gZI1flmYHuUpF637Idzy.png", alt="Lighthouse の 「フォーカス可能な要素はすべて一意の `id` を持つ必要がある」についての監査です。これは同じ `id` を持つ2つの要素を表示します。", width="800", height="380", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93a4454b7c558d6ca748c718167bc4aa592eaf63 #}

Chromium issue: [772558](https://crbug.com/772558)

<!-- ## Improved Sources panel {: #sources } -->
## Sources パネルの改善 {: #sources }

<!-- Loads of stability improvements in the **Sources** panel as we upgraded it to use [CodeMirror 6](https://codemirror.net/6/). Here are few notable improvements: -->
[CodeMirror 6](https://codemirror.net/6/) を使用するようにアップグレードしたため、 **Sources** パネルの安定性が大幅に改善されました。以下は、いくつかの主要な改善点です。

<!-- - Significantly faster when opening large files (e.g. WASM, JavaScript)
- No more random scrolling when stepping through code
- Improved auto-complete suggestions for editable sources (e.g. snippets, local override)  -->
- 大きなファイル（WASM 、 JavaScript など）を開く際の大幅な高速化
- コードを読み進める際のランダムなスクロールを解消
- 編集可能なソース（スニペット、ローカルオーバーライドなど）に対するオートコンプリートの候補を改善 

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c1ab112d9002d5c3b3bb70cf2839bac182f0cdb5 #}

Chromium issue: [1241848](https://crbug.com/1241848) 

<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースでは、以下のような注目の修正点があります。

<!-- - Properly displaying the waterfall diagram of network requests. Previously, the style was broken. ([1275501](https://crbug.com/1275501))
- The code highlight was broken when searching in documents with very long lines in the **Sources** panel. It’s now fixed. ([1275496](https://crbug.com/1275496))
- No more duplicate **Payload** tab in network requests. ([1273972](https://crbug.com/1273972)) 
- Fixed the missing layout shifts details in the **Summary** section of the **Performance** panel. ([1259606](https://crbug.com/1259606))
- Support arbitrary characters (e.g. `,`, `.`),  in **Network Search** queries. ([1267196](https://crbug.com/1267196)) -->
- ネットワークリクエストのウォーターフォール図を正しく表示するようにしました。以前は、スタイルが崩れていました ([1275501](https://crbug.com/1275501))
- **Source** パネルで非常に長い行のドキュメントで検索すると、コードハイライトが壊れていました。これは現在修正されています ([1275496](https://crbug.com/1275496))
- ネットワークリクエストで、 **Payload** タブが重複しないようになりました ([1273972](https://crbug.com/1273972)) 
- **Performance** パネルの **Summary** セクションのレイアウトシフトの詳細が欠落していたのを修正しました ([1259606](https://crbug.com/1259606))
- **Network Search** のクエリで、任意の文字（例：`,`や`.`）をサポートしました ([1267196](https://crbug.com/1267196))


<!-- ### [Experimental] Endpoints in the Reporting API pane {: #reporting-api } -->
### [実験的] Reporting API ペインに Endpoints を追加 {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
この実験的機能を有効にするには、 **Settings** > **Experiments** にある **Enable Reporting API panel in Application panel** チェックボックスをオンにします。
{% endAside %}

<!-- The experimental **Reporting API** pane was introduced in [Chrome 96](/blog/new-in-devtools-96/#reporting-api) to help you monitor the reports generated on your page and their status. -->
[Chrome 96](/blog/new-in-devtools-96/#reporting-api) で実験的に導入された  **Reporting API** ペインでは、ページで生成されたレポートとそのステータスを監視することが可能です。

<!-- The **Endpoints** section is now available. It gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header. -->
**Endpoints** セクションが利用可能になりました。これは `Reporting-Endpoints` ヘッダで設定されたすべてのエンドポイントの概要を提供します。

<!-- Learn to use the [Reporting API](https://web.dev/reporting-api/) to monitor security violations, deprecated API calls, and more. -->
[Reporting API](https://web.dev/reporting-api/) を使用してセキュリティ違反や非推奨の API コールなどを監視する方法を学びましょう。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Reporting API pane", width="800", height="560" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Reporting API ペイン", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a831b26b7ecde579144a42a4faaa7b639789bf3c #} 

Chromium issue: [1200732](https://crbug.com/1200732)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

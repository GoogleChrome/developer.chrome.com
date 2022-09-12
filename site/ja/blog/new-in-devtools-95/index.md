---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 95)"
authors:
  - jecelynyeen
date: 2021-09-20
updated: 2021-09-20
description:
  "新しいCSSの長さ編集ツール、 Issues タブでの問題の非表示、プロパティの表示の改善など"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CpUXxig53msMdL1pMrDd.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-95
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- end: translation instructions -->

*翻訳者の [lacolaco](https://github.com/lacolaco) さん、レビュアーの [technohippy](https://github.com/technohippy) さんと [yoichiro](https://github.com/yoichiro) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id="T_Ppg7ghrWM" %}

<!-- ## New CSS length authoring tools {: #length } -->
## 新しいCSSの長さ編集ツール {: #length }

<!-- DevTools added an easier yet flexible way to update lengths in CSS! -->
CSSの長さを簡単かつ柔軟に更新する方法を DevTools に追加しました。

<!-- In the **Styles** pane, look for any CSS property with length (e.g. `height`, `padding`). -->
**Styles** ペインで、長さのあるCSSプロパティ（例：`height`、`padding`）を探してください。

<!-- Hover over the unit type, and notice the unit type is underlined. Click on it to select a unit type from the dropdown. -->
単位の上にカーソルを置くと、下線が引かれていることに気づくでしょう。それをクリックして、ドロップダウンから単位を選択します。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/vWiU9o1DxsOpWXM0SrBa.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

<!-- Hover over the unit value, and your mouse pointer is changed to horizontal cursor. Drag horizontally to increase or decrease the value. To adjust the value by 10, hold the <kbd>Shift</kbd> key when dragging. -->
単位の値の上にマウスを置くと、マウスポインターが水平カーソルに変わります。水平方向にドラッグすると、値が増減します。値を10ずつ調整するには、<kbd>Shift</kbd>キーを押しながらドラッグします。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/nbvRDPyARJmdTeB9ajOq.mp4", autoplay="true", muted="true", loop="true",class="screenshot" %}

<!-- You can still edit the unit value as text — just click on the value and start editing. -->
単位の値はテキストとして編集することができ、値をクリックして編集を開始します。

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/hBk2t2DCX7aI5yBX4J8h.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/20932ec7ffa980023548e6f9d010ba11d0a3eab7 #}

Chromium issues: [1126178](https://crbug.com/1126178), [1172993](https://crbug.com/1172993)


<!-- ## Hide issues in the Issues tab {: #hide-issues } -->
## Issues タブで問題を隠す {: #hide-issues }

<!-- You can now hide specific issues in the Issues tab to focus only on those issues that matter to you. -->
Issues タブで特定の問題を非表示にして、自分にとって重要な問題だけに集中できるようになりました。

<!-- In the [Issues tab](/docs/devtools/issues/), hover over on an issue you would like to hide. Click on **More options**  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **Hide issues like this**. -->
[Issues タブ](/docs/devtools/issues/)で、非表示にしたい問題にマウスオーバーします。 **More options**  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **Hide issues like this** をクリックしましょう。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Uw3mxGGK5CNoUflHgS7p.png", alt="Hide issues menu", width="800", height="488" %}

<!-- All hidden issues will be added under the **Hidden issues** pane. Expand the pane. You can unhide all hidden issues or a selected one.  -->
すべての隠された問題は **Hidden issues** ペインに追加されます。ペインを展開して、すべての隠された問題、または選択した問題の非表示を解除できます。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dnPfPGkxpkcSZRIHqGDA.png", alt="Hidden issues pane", width="800", height="488" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dnPfPGkxpkcSZRIHqGDA.png", alt="Hidden issues ペイン", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7a70504f3ad5a63b5f5b83411ff5f6cc31a765 #}

Chromium issue: [1175722](https://crbug.com/1175722)


<!-- ## Improved the display of properties {: #properties } -->
## プロパティの表示の改善 {: #properties }

<!-- DevTools improve the display of properties by: -->
DevTools では、以下のようにしてプロパティの表示を改善しています。

<!-- - Always bold and sort own properties first in the **Console**, **Sources** panel and **Properties** pane. 
- Flatten the properties display in the **Properties** pane. -->
- **Console** 、 **Source** パネルと **Properties** ペインでは、常に自身のプロパティを太字にして先頭に並べます。
- **Properties** ペインのプロパティ表示をフラットにします。

<!-- For example, the snippet below creates an [`URL`](https://developer.mozilla.org/docs/Web/API/URL) object `link` with 2 own properties: `user` and `access`, and updates the value of an inherited property `search`. -->
例えば、以下のスニペットでは2つの独自のプロパティを持つ[`URL`](https://developer.mozilla.org/docs/Web/API/URL)オブジェクト `link` を作成し、継承したプロパティ `search` の値を更新しています。

```js
/* example.js */

const link = new URL('https://goo.gle/devtools-blog');

link.user = { id: 1, name: 'Jane Doe' };
link.access = 'admin';
link.search = `?access=${link.access}`;
```

<!-- Try logging `link` in the **Console**. Own properties are now bold and sorted first. These changes make it easier to spot custom properties, especially for [Web APIs](https://developer.mozilla.org/docs/Web/API) (e.g. `URL`) with many inherited properties. -->
**Console** で `link` をログに出力してみてください。独自のプロパティが太字になり、最初にソートされるようになりました。この変更により、特に多くの継承されたプロパティを持つ [Web API](https://developer.mozilla.org/docs/Web/API) (例: `URL`) のカスタムプロパティを見つけやすくなりました。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ngjx6YRQsH3Fhl6DUZYl.png", alt="Own properties are bold and sorted first", width="800", height="561" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ngjx6YRQsH3Fhl6DUZYl.png", alt="独自のプロパティは太字で先頭に並びます", width="800", height="561" %}

<!-- Apart from these changes, the properties in the  **Properties** pane are also flattened now for better DOM properties debugging experience, especially for [Web components](https://www.webcomponents.org/introduction).  -->
これらの変更以外にも、特に[Webコンポーネント](https://www.webcomponents.org/introduction)のために、DOMプロパティのデバッグがしやすくなるよう **Properties** ペインのプロパティがフラット化されました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hIQGKlYkWKJzljHZaaM9.png", alt="Flatten properties", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7d0366422cffa5f2837de834f0faa88a925fe701 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a4d7dd0d62baba5718a713b5cd364669a21236b3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

Chromium issues: [1076820](https://crbug.com/1076820), [1119900](https://crbug.com/1119900)


<!-- ## Lighthouse 8.4 in the Lighthouse panel {: #lighthouse } -->
## Lighthouse 8.4 が Lighthouse パネルに {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 8.4. Lighthouse will now detect if the [Largest Containful Paint (LCP)](https://web.dev/lcp) element was a lazy-loaded image and recommend removing the `loading` attribute from it. -->
**Lighthouse** パネルに Lighthouse 8.4 が搭載されました。 Lighthouse は [Largest Contentful Paint (LCP)](https://web.dev/lcp) 要素が遅延読み込みされた画像であるかどうかを検出し、その要素から `loading` 属性を削除することを推奨するようになりました。

<!-- Check out the [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/) for more details on the updates. -->
アップデートの詳細は、 [What's new in Lighthouse 8.4](/blog/lighthouse-8-4/) をご確認ください。

<!-- {% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="The lazy-loaded LCP audit in a Lighthouse report", width="800", height="502", class="screenshot" %} -->
{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="Lighthouse レポートにおける遅延読み込みされた LCP の監査　", width="800", height="502", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/649a979e4de2cf38430e46e7198b11ba8a830388 #}

Chromium issue: [772558](https://crbug.com/772558)


<!-- ## Sort snippets in the Sources panel {: #snippets } -->
## Sources パネルでのスニペットの並べ替え {: #snippets }

<!-- The [snippets](/docs/devtools/javascript/snippets/) in the **Snippets** pane under the **Sources** panel are now sorted alphabetically. Previously, it’s not sorted. -->
**Sources** パネルの **Snippets** ペインにある[スニペット](/docs/devtools/javascript/snippets/)が、アルファベット順にソートされるようになりました。以前はソートされていませんでした。

<!-- Utilize the snippets feature to run commands quicker. Watch this video for a [tip](https://youtu.be/NOal2gTzftI?t=176)! -->
スニペット機能を活用して、コマンドを素早く実行しましょう。このビデオで[ヒント](https://youtu.be/NOal2gTzftI?t=176)をご覧ください!

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/knb78RG6NCETitMbNoyV.png", alt="Sort snippets in the Sources panel", width="800", height="475" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/knb78RG6NCETitMbNoyV.png", alt="Sources パネルでのスニペットの並び", width="800", height="475" %}

Chromium issue: [1243976](https://crbug.com/1243976)


<!-- ## New links to translated release notes and report a translation bug {: #localized } -->
## 翻訳されたリリースノートへの新しいリンクと翻訳バグの報告 {: #localized }

<!-- You can now click to read the DevTools release notes in 6 other languages - [Russian](/ru/blog/new-in-devtools-95), [Chinese](/zh/blog/new-in-devtools-95), [Spanish](/es/blog/new-in-devtools-95), [Japanese](/ja/blog/new-in-devtools-95), [Portuguese](/pt/blog/new-in-devtools-95) and [Korean](/ko/blog/new-in-devtools-95)  via the What’s new tab.  -->
6つの言語で DevTools のリリースノートを What’s new タブからクリックしてご覧いただけるようになりました - [ロシア語](/ru/blog/new-in-devtools-95)、[中国語](/zh/blog/new-in-devtools-95)、[スペイン語](/es/blog/new-in-devtools-95)、[日本語](/ja/blog/new-in-devtools-95)、[ポルトガル語](/pt/blog/new-in-devtools-95)、[韓国語](/ko/blog/new-in-devtools-95)

<!-- Since Chrome 94, you can [set your preferred language](/blog/new-in-devtools-94/#localized) in DevTools. If you found any issues with the translations, help us improve it by [reporting a translation issue](https://goo.gle/devtools-translate) via **More options** > **Help** > **Report a translation bug**.  -->
Chrome 94以降、 DevTools で[優先言語の設定](/blog/new-in-devtools-94/#localized)ができるようになりました。翻訳に関する問題を発見された場合は、 **More options** > **Help** > **Report a translation bug** で[翻訳の問題を報告](https://goo.gle/devtools-translate)して、改善にご協力ください。

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qrg4Ahf4sYseL2NQZwIl.png", alt="New links to translated release notes and report a translation bug", width="800", height="487" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qrg4Ahf4sYseL2NQZwIl.png", alt="翻訳されたリリースノートへの新しいリンクと翻訳バグの報告", width="800", height="487" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/312e43a6c50bc29f279f9eac2f91b723b36c7ee9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dcd3ae13ebc5d340b2abb07e9dc99cfa74caea35 #}

Chromium issues: [1246245](https://crbug.com/1246245), [1245481](https://crbug.com/1245481) 


<!-- ## Improved UI for DevTools command menu {: #command-menu } -->
## DevTools Command MenuのUI改善 {: #command-menu }

<!-- Did you find it hard to search for a file in the [Command Menu](/docs/devtools/command-menu/#open)? Good news for you, the **Command Menu** user interface is now enhanced!  -->
[Command Menu](/docs/devtools/command-menu/#open) でファイルを検索するのに苦労したことはありませんか？そんなあなたに朗報です！ **Command Menu** のユーザーインターフェースが強化されました。

<!-- Open the **Command Menu** to search for a file with keyboard shortcut <kbd>Control</kbd>+<kbd>P</kbd> in Windows and Linux, or <kbd>Command</kbd>+<kbd>P</kbd> in MacOS. -->
Windows と Linux では <kbd>Control</kbd>+<kbd>P</kbd>で、 MacOS では <kbd>Command</kbd>+<kbd>P</kbd> のキーボードショートカットでファイルを検索するための **Command Menu** を開きます。

<!-- The UI improvements of the **Command Menu** is still ongoing, stay tuned for more updates! -->
**Command Menu** のUI改善は現在も継続中です。さらなるアップデートをお楽しみに!

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TJT2ry3vmUW1KoFgSKQP.png", alt="Command Menu", width="800", height="389" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TJT2ry3vmUW1KoFgSKQP.png", alt="Command Menu", width="800", height="389" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/06f6263ffb5b0a262c9954db532801fef4dbb1e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93550d16d92a4835c61dc7906f16694f390e9658 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0ad76a1ccf83a28ed0ded0a55544eef976f7c35b #}

Chromium issue: [1201997](https://crbug.com/1201997)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

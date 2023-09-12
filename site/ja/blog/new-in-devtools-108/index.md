---
layout: 'layouts/blog-post.njk'
title: "DevTools の新機能 (Chrome 108)"
authors:
  - jecelynyeen
date: 2022-10-26
description: '非アクティブなCSSプロパティのヒント、Recorderの新しいXPathとテキストのセレクタなど'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3bRoW2V3nDu6iLKQqSGg.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-108
---

*翻訳者の [lacolaco](https://github.com/lacolaco) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [technohippy](https://github.com/technohippy) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='UVtXrWvq_oI' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ja/_partials/devtools/whats-new.md file -->


<!-- ## Hints for inactive CSS properties {: #css-hint } -->
## 非アクティブな CSS プロパティのヒント {: #css-hint }

<!-- DevTools now identifies CSS styles that are valid but have no visible effect. In the **Styles** pane, DevTools fades out the inactive properties. Hover over the icon next to it to understand why the rule has no visible effect.  -->
DevTools は、有効であるが視覚的な効果がない CSS スタイルを識別するようになりました。**Styles** ペインで、 DevTools は非アクティブなプロパティをフェードアウトします。その横にあるアイコンにカーソルを合わせると、なぜそのルールが視覚的な効果を持たないのかが分かります。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oqkN6QudxNIx4Zq22J89.png", alt="非アクティブなCSSプロパティのヒント", width="800", height="526" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d6c1fea1e79b8373ff913a6d9919d097d1141254 #}

Chromium issue: [1178508](https://crbug.com/1178508)


<!-- ## Auto-detect XPath and text selectors in the Recorder panel {: #recorder } -->
## Recorder パネルで XPath とテキストのセレクタ自動検出が可能に {: #recorder }

<!-- The **Recorder** panel now supports XPath and text selectors. [Start recording a user flow](/docs/devtools/recorder/#record) and the recorder automatically picks the XPath and shortest unique text of an element as selector if available. -->
**Recorder** パネルが XPath とテキストのセレクタをサポートするようになりました。[ユーザーフローの記録を開始](/docs/devtools/recorder/#record)すると、 要素の XPath と最短ユニークテキストがあればレコーダーは自動的にセレクタとして選択します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NJVIK95TtKaXxzNVoGI6.png", alt="Recorder パネルでXPathとテキストのセレクタの自動検出が可能に", width="800", height="579" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/7441acfff5d9dfd373742797d2db46a809c9df67 #}

Chromium issues: [1327206](https://crbug.com/1327206),[1327209](https://crbug.com/1327209)


<!-- ## Step through comma-separated expressions {: #debugging } -->
## カンマ区切りの式をステップスルー {: #debugging }

<!-- You can now step through comma-separated expressions during debugging. This improves the debuggability of minified code. -->
デバッグ中にカンマ区切りの式をステップ実行できるようになりました。これにより、ミニファイされたコードのデバッグ性が向上します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4lUgUfPMhD9qxtZ7uvHV.png", alt="カンマ区切りの式をステップスルー", width="800", height="473" %}

<!-- Previously, DevTools only supported stepping through semicolon-separated expressions. -->
これまでは、 DevTools はセミコロンで区切られた式のステップ実行のみをサポートしていました。

<!-- Given the code below, -->
以下のようなコードを考えてください。

```js
function foo() {}

function bar() {
  foo();
  foo();
  return 42;
}
```

<!-- Transpilers and minifiers may turn them into comma-separated expressions. -->
このようなコードはトランスパイラやミニファイアによって、カンマ区切りの式に変換されることがあります。

```js
function bar(){return foo(),foo(),42}
```

<!-- This creates confusion during debugging because the stepping behavior is different between minified and authored code. It is even more confusing when using source maps to debug the minified code in terms of the original code, as the developer is then looking at semicolons (which were under the hood turned into commas by the toolchain) but the debugger doesn't stop on them. -->
こうなるとミニファイされたコードと 書かれたコードの間でステップ実行の動作が異なることになるため、デバッグ時に混乱が生じます。ソースマップを使用して、オリジナルのコードを見ながらミニファイされたコードをデバッグする場合は、さらに混乱します。開発者にはセミコロン (ツールチェーンではカンマに変換されていた) が見えていますが、デバッガーはセミコロンで停止しないためです。

{# https://chromium.googlesource.com/v8/v8/+/ade6d191c8566e3fe7331d2ef37e43760c7cb363 #}

Chromium issue: [1370200](https://crbug.com/1370200)


<!-- ## Improved Ignore list setting {: #ignore-list } -->
## 無視リスト設定の改善 {: #ignore-list }

<!-- Go to **Settings** > **Ignore List**. DevTools improves the design to help you configure the rules to [ignore a single script or pattern of scripts](/docs/devtools/javascript/reference/#settings-ignore-list). -->
**Settings** > **Ignore List** に移動します。 DevTools は、[単一のスクリプトまたはスクリプトのパターンを無視する](/docs/devtools/javascript/reference/#settings-ignore-list)というルールを設定しやすいようにデザインを改善しています。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qazPkaZ3TkSrIBU89Jtn.png", alt="Ignore List タブ", width="800", height="535" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9441d8775b38b47db91bb5182f6349f3036d3751 #}

Chromium issue: [1356517](https://crbug.com/1356517)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- These are some noteworthy fixes in this release: -->
今回のリリースでは、以下の注目すべき修正点があります。

<!-- - Autocomplete CSS property name in the **Styles** pane on pressing space. ([1343316](https://crbug.com/1343316)) -->
- スペースキーを押すと、 **Styles** ペインに CSS プロパティ名がオートコンプリートされるようになりました。 ([1343316](https://crbug.com/1343316))
<!-- - Remove auto scroll in the **Element** panel’s breadcrumb. ([1369734](https://crbug.com/1369734)) -->
- **Element** パネルのパンくずリストの自動スクロールを削除しました。 ([1369734](https://crbug.com/1369734))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ccfb914765146ce514b9645117d9f95052bd3471 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4b6c1b6671e08a39e4d37772e87ff2cf41cb7327 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

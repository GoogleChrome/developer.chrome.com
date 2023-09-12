---
layout: "layouts/blog-post.njk"
title: "DevTools の新機能 (Chrome 106)"
authors:
  - jecelynyeen
date: 2022-09-16
updated: 2022-09-16
description: "モダンな Web デバッグのためのより良いサポート、Performance Insights での LCP タイミングの内訳など"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qaJ0sYtFf0YMHsObaBIZ.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-106
---

*翻訳者の [yoichiro](https://github.com/yoichiro) さん、レビュアーの [technohippy](https://github.com/technohippy) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*

{% Partial 'devtools/banner.md' %}

{% YouTube id='5gBqTXctxO8' %}

<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored } -->
## Sources パネルでの Authored / Deployed によるファイルのグループ化 {: #authored }

<!-- The **Group files by Authored / Deployed** is now shown under the 3-dot menu. Previously, it showed directly on the navigation pane. -->
**Group files by Authored / Deployed** が 3 ドットメニューの中に表示されるようになりました。以前は、ナビゲーションペインに直接表示されていました。

<!-- Open this [demo](https://ng-devtools.netlify.app/). Enable the **Group files by Authored / Deployed** setting to view your original source code (Authored) first and navigate to them quicker. -->
この [デモ](https://ng-devtools.netlify.app/) を開いてください。 **Group files by Authored / Deployed** 設定を有効にすることで、最初にオリジナルのソースコード（Authored）を表示してそれらにすばやく移動することができます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png", alt="Authored / Deployed によるファイルのグループ化", width="800", height="405" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Chromium bug: [1352488](https://crbug.com/1352488)


<!-- ## Improved stack traces {: #stack-traces } -->
## 改善されたスタックトレース {: #stack-traces }

<!-- ### Linked stack traces for asynchronous operations  {: #async } -->
### 非同期処理にリンクされたスタックトレース  {: #async }

<!-- When some operations are scheduled to happen asynchronously, the stack traces in DevTools now tell the “full story” of the operation. Previously, it tells only part of the story. -->
一部の処理が非同期で実行されるようにスケジュールされている際に、DevTools のスタックトレースが処理の「完全なストーリー」を語るようになりました。以前は、ストーリーの一部のみが伝えられていました。

<!-- For example, open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. In our source code, the operation includes an async `timeout` operation. -->
例えば、この [デモ](https://ng-devtools.netlify.app/) を開いて、インクリメントボタンをクリックします。 **Console** でエラーメッセージを展開します。このソースコードでは、その処理に非同期の `timeout` 処理が含まれています。

```js
// application.component.ts

async increment() {
    await Promise.resolve().then(() => timeout(100));
    …
}
```

<!-- Previously, the stack trace only showed the timeout operation. It did not show the “root cause” of the operation.  -->
以前は、スタックトレースはタイムアウト処理のみを示していました。その処理の「根本原因」は示されていませんでした。

<!-- With the latest changes, DevTools now shows the operation originates from the `onClick` event in the button component, then the `increment` function, followed by the timeout operation. -->
最新の変更により、DevTools は、その処理がボタンコンポーネントの `onClick` イベントから発生し、次に `increment` 関数、そしてタイムアウト処理が続くことを示すようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png", alt="非同期処理にリンクされたスタックトレース", width="800", height="442" %}

<!-- Behind the scenes, DevTools introduced a new “Async Stack Tagging” feature. You can tell the whole story of the operation by linking both parts of the async code together with the new `console.createTask()` method. See [Modern debugging in DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) to learn more.  -->
舞台裏では、DevTools に新しい "Async Stack Tagging" 機能が導入されました。非同期コードの両方の部分を新しい `console.createTask()` メソッドと一緒にリンクすることで、処理の全体像を伝えることができます。詳細については、 [Modern debugging in DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) を参照してください。

<!-- Does it sound complicated? Not at all. Most of the time, the framework you are using handles the scheduling and async execution. In that case, it is up to the framework to implement the API, you don’t need to worry about it. (e.g. Angular implemented these [changes](https://chromium-review.googlesource.com/c/v8/v8/+/3776678)) -->
複雑に聞こえますか？全くそんなことはありません。ほとんどの場合、使用しているフレームワークがスケジューリングと非同期実行を処理します。その場合、API を実装するのはフレームワーク次第なので、心配する必要はありません。 (例: Angular はこれらの [変更](https://chromium-review.googlesource.com/c/v8/v8/+/3776678) を実装しました)

{# https://chromium.googlesource.com/v8/v8/+/c53c20fe64b5b21f5a4838ebcfdb96357189fc76 #}

Chromium bug: [1334585](https://crbug.com1334585)


<!-- ### Automatically ignore known third-party scripts {: #auto-ignore } -->
### 既知のサードパーティスクリプトを自動的に無視する {: #auto-ignore }

<!-- Identify issues in your code quicker during debugging because DevTools now automatically adds known third-party scripts to the ignore list. -->
DevTools が既知のサードパーティスクリプトを無視リストに自動的に追加するようになったため、デバッグ中にコード内の問題をより迅速に特定できるようになります。

<!-- Open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. The stack trace shows only your code (e.g. `app.component.ts` `button.component.ts`). Click **Show more frames** to view the full stack trace. -->
この [デモ](https://ng-devtools.netlify.app/) を開き、インクリメントボタンをクリックします。 **Console** でエラーメッセージを展開します。スタックトレースには、あなたのコードのみが表示されます (例: `app.component.ts` `button.component.ts` )。 **Show more frames** をクリックすると、完全なスタックトレースを表示します。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="既知のサードパーティスクリプトを自動的に無視する", width="800", height="425" %}

<!-- Previously, the stack trace included third-party scripts like `zone.js` and `core.mjs`. These are not your source code, they are generated by bundlers (e.g. webpack) or frameworks (e.g. Angular). It took a longer time to identify the root cause of an error.  -->
以前は、スタックトレースに `zone.js` や `core.mjs` などのサードパーティスクリプトが含まれていました。これらはあなたのソースコードではなく、バンドラ (webpack など) またはフレームワーク (Angular など) によって生成されたものです。エラーの根本原因を特定するのに時間がかかりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="既知のサードパーティスクリプトを自動的に無視する", width="800", height="425" %}

<!-- Behind the scenes, DevTools ignores third-party scripts based on the new `x_google_ignoreList` property in source maps. Frameworks and bundlers need to supply this information. See [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).  -->
舞台裏では、DevTools はソースマップにて新しい `x_google_ignoreList` プロパティに基づいてサードパーティスクリプトを無視します。フレームワークとバンドラは、この情報を提供する必要があります。 [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular) を参照してください。

<!-- Optionally, if you prefer to always view full stack traces, you can disable the setting via **Settings** > **Ignore list** > **Automatically add known third-party scripts to ignore list**. -->
必要に応じて、完全なスタックトレースを常に表示したい場合は、 **Setting** > **Ignore list** > **Automatically and known third-party scripts to ignore list** にて設定を無効にすることができます。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png", alt="既知のサードパーティスクリプトを自動的に無視リストに追加する設定", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e09e489c2b1233ab424d562abc22f297c6322878 #}

Chromium bug: [1323199](https://crbug.com/1323199)


<!-- ## Improved call stack during debugging  {: #call-stack } -->
## デバッグ中の改善されたコールスタック {: #call-stack }

<!-- With the **Automatically add known third-party scripts to ignore list** setting, the call stack now shows only frames that are relevant to your code. -->
**Automatically add known third-party scripts to ignore list** 設定を使用すると、コードに関連するフレームのみがコールスタックに表示されるようになりました。

<!-- Open this [demo](https://ng-devtools.netlify.app/) and set a breakpoint at the `increment()` function in `app.component.ts`. Click the increment button on the page to trigger the breakpoint. The call stack shows only frames from your code (e.g.  `app.component.ts` and `button.component.ts`).  -->
この [デモ](https://ng-devtools.netlify.app/) を開き、 `app.component.ts` の `increment()` 関数にブレークポイントを設定します。ページのインクリメントボタンをクリックして、ブレークポイントをトリガーします。コールスタックには、あなたのコードのフレームのみが表示されます (例: `app.component.ts` と `button.component.ts` )。

<!-- To view all frames, enable **Show ignore-listed frames**. Previously, DevTools displayed all frames by default.  -->
すべてのフレームを表示するには、 **Show ignore-list frames** を有効にします。以前は、DevTools はデフォルトですべてのフレームを表示していました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PdjPrBAV7TXn8FHcRR6R.png", alt="デバッグ中の改善されたコールスタック", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Chromium bug: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed sources in the Sources panel {: #ignore-nav } -->
## Sources パネルで無視リストに含まれるソースを非表示にする {: #ignore-nav }

<!-- Enable **hide ignore-listed sources** to hide irrelevant files in the **Navigation** pane. This way, you can focus only on your code. -->
**hide ignore-listed sources** を有効にして、 **Navigation** ペインで無関係なファイルを非表示にします。これにより、あなたのコードだけに集中できます。

<!-- Open this [demo](https://ng-devtools.netlify.app/). In the **Sources** panel. The `node_modules` and `webpack` are the third-party scripts. Click on the 3-dot menu and select **hide ignore-listed sources** to hide them from the pane. -->
この [デモ](https://ng-devtools.netlify.app/) を開きます。 **Sources** パネルの中で、 `node_modules` と `webpack` はサードパーティのスクリプトです。3 ドットメニューをクリックして、 **hide ignore-listed sources** を選択して、ペインからそれらを非表示にします。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="Sources パネルで無視リストに含まれるソースを非表示にする", width="800", height="449" %}

Chromium bug: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed files in the Command Menu {: #ignore-search } -->
## Command Menu で無視リストにあるファイルを非表示にする {: #ignore-search }

<!-- With the **hide ignore-listed sources** setting, you can find your file quicker with the [Command Menu](/docs/devtools/command-menu/). Previously, searching files in the **Command Menu** returns third-party files that might not be relevant to you. -->
**hide ignore-listed sources** 設定を使用すると、 [Command Menu](/docs/devtools/command-menu/) でファイルをすばやく見つけることができます。以前は、 **Command Menu** でファイルを検索すると、関連性のないサードパーティファイルが返されていました。

<!-- For example, enable the **hide ignore-listed sources** setting and click on the 3-dot menu. Select **Open file**. Type “ton” to search for button components. Previously, the results include files from `node_modules`, one of the `node_modules` files even shown up as the first result.  -->
例えば、 **hide ignore-listed sources** 設定を有効にして、3 ドットメニューをクリックします。 **Open file** を選択します。ボタンコンポーネントを検索するには、 "ton" と入力します。以前は、結果に `node_modules` からのファイルが含まれていましたので、 `node_modules` ファイルの 1 つが最初の結果として表示されていました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png", alt="Command Menu で無視リストにあるファイルを非表示にする", width="800", height="425" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9144105ce3efd70babe74c19e808616864be631b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c010ce7baa6930cb633372b5d8024a18b3f7ed66 #}

Chromium bug: [1336604](https://crbug.com/1336604)


<!-- ## New Interactions track in the Performance panel  {: #performance } -->
## Performance パネルの新しい Interactions トラック {: #performance }

<!-- Use the new **Interactions** track in the **Performance** panel to visualize interactions and track down potential responsiveness issues.  -->
**Performance** パネルの新しい **Interactions** トラックを使用して、インタラクションを視覚化し、潜在的な応答性の問題を追跡できます。

<!-- For example, [start a performance recording](/docs/devtools/evaluate-performance/#record ) on this [demo page](https://coffee-cart.netlify.app/?ad=1). Click on a coffee and stop recording. Two interactions show in the **Interactions** track. Both interactions have the same IDs, indicating the interactions are triggered from the same user interaction. -->
例えば、この [デモページ](https://coffee-cart.netlify.app/?ad=1) で [パフォーマンスの記録を開始](/docs/devtools/evaluate-performance/#record) します。コーヒーをクリックして、記録を停止します。 **Interactions** トラックに 2 つのインタラクションが表示されます。両方のインタラクションの ID は同じであり、インタラクションが同じユーザーインタラクションからトリガーされたことを示しています。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LpHJbSGra2ZCHpy3ns7q.png", alt="Performance パネルの新しい Interactions トラック", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6d97228951a6c8884b3ac4b712e966e79f2bdc3c #}

Chromium bug: [1347390](https://crbug.com/1347390)


<!-- ## LCP timings breakdown in the Performance Insights panel {: #insights } -->
## Performance Insights パネルでの LCP タイミングの内訳  {: #insights }

<!-- The **Performance Insights** panel now shows the [timings breakdown](https://web.dev/optimize-lcp/#lcp-breakdown)  of the [Largest Containful Paint (LCP)](/docs/devtools/performance-insights/#largest-contentful-paint). Use these timings information to understand and identify an opportunity to improve LCP performance. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hU6RmoRjFskL8P2ZAB9l.png", alt="Performance Insights パネルでの LCP タイミングの内訳", width="800", height="523" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/883542a3727a5bc1415ffee7c7bc7f7218d9e2a5 #}

Chromium bug: [1351735](https://crbug.com/1351735)


<!-- ## Auto-generate default name for recordings in the Recorder panel {: #recorder } -->
## Recorder パネルでの記録のデフォルト名称の自動生成 {: #recorder }

<!-- The **Recorder** panel now automatically generates a name for new recordings. -->
**Recorder** パネルでは、新しい記録の名称を自動的に生成するようになりました。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0TMJgVqyk7AeoWIR6Vee.png", alt="Recorder パネルでの記録のデフォルト名称", width="800", height="565" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fbf1466b00d1ff2c36fce81fde1b21f33b689a76 #}

Chromium bug: [1351383](https://crbug.com/1351383)


<!-- ## Miscellaneous highlights {: #misc } -->
## その他のハイライト {: #misc }

<!-- - Previously, [Recorder extensions](/docs/devtools/recorder/reference/#extension-troubleshooting) don’t show up in the **Recorder** panel from time to time. ([1351416](https://crbug.com/1351416)) -->
<!-- - The **Styles** pane now displays a color picker for the [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) element’s `stop-color` property. ([1351096](https://crbug.com/1351096)) -->
<!-- - Identify script causing [layout](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) as the potential root causes for layout shifts in the **Performance Insights** panel. ([1343019](https://crbug.com/1343019)) -->
<!-- - Display critical path for LCP web fonts in the **Performance Insights** panel. ([1350390](https://crbug.com/1350390)) -->
- 以前は、[Recorder 拡張機能](/docs/devtools/recorder/reference/#extension-troubleshooting) が **Recorder** パネルに時々表示されないことがありました。 ([1351416](https://crbug.com/1351416))
- **Styles** ペインにて、 [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) 要素の `stop-color` プロパティ向けのカラーピッカーが表示されるようになりました。 ([1351096](https://crbug.com/1351096))
- **Performance Insights** パネルで、レイアウトシフトの潜在的な根本原因として [レイアウト](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) を引き起こすスクリプトを特定します。 ([1343019](https://crbug.com/1343019))
- **Performance Insights** パネルに LCP Web フォントのクリティカルパスを表示します。 ([1350390](https://crbug.com/1350390))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/50a84ca8e5b556e27bb285477f21a99f0ccb7050 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/2687a701a67e543faeff3f936f215534bf8221bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1f6ef0d58292665e06eded4059d8714a2e487e8a #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fe7254c9a51f964b2a106becc1b22f38033b9f50 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

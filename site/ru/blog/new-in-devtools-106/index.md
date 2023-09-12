---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 106)"
authors:
  - jecelynyeen
date: 2022-09-16
updated: 2022-09-16
description: "Улучшена поддержка современных способов отладки, разбивка по времени LCP во вкладке Performance Insights и другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OFe0BqlHU5C0Pwrotq03.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-106
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='5gBqTXctxO8' %}

<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored } -->
## Группировка по авторским и развёрнутым файлам во вкладке Источники (Sources) {: #authored }

<!-- The **Group files by Authored / Deployed** is now shown under the 3-dot menu. Previously, it showed directly on the navigation pane. -->
Опция **Сгруппировать по авторским и развёрнутым** (Group files by Authored / Deployed) теперь показывается по клику на иконку меню &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %}. Раньше она отображалась прямо на панели навигации.

<!-- Open this [demo](https://ng-devtools.netlify.app/). Enable the **Group files by Authored / Deployed** setting to view your original source code (Authored) first and navigate to them quicker. -->
Откройте это [демо](https://ng-devtools.netlify.app/). Включите опцию **Сгруппировать по авторским и развёрнутым**, чтобы видеть ваш оригинальный (Авторский) исходный код в начале и проще по нему перемещаться.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png", alt="Сгруппировать по авторским и развёрнутым", width="800", height="405" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Задача в трекере Chromium: [1352488](https://crbug.com/1352488)


<!-- ## Improved stack traces {: #stack-traces } -->
## Улучшение трассировки стека {: #stack-traces }

<!-- ### Linked stack traces for asynchronous operations  {: #async } -->
### Связанные трассировки стека для асинхронных операций  {: #async }

<!-- When some operations are scheduled to happen asynchronously, the stack traces in DevTools now tell the “full story” of the operation. Previously, it tells only part of the story. -->
Трассировка стека в DevTools теперь рассказывает «полную историю» для запланированных асинхронных операций. Раньше можно было увидеть только часть истории.

<!-- For example, open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. In our source code, the operation includes an async `timeout` operation. -->
Для примера откройте это [демо](https://ng-devtools.netlify.app/) и нажмите на кнопку <kbd>+</kbd>. Разверните ошибку в консоли. В нашем исходном коде операция включает в себя асинхронную функцию `timeout`.

```js
// application.component.ts

async increment() {
    await Promise.resolve().then(() => timeout(100));
    …
}
```

<!-- Previously, the stack trace only showed the timeout operation. It did not show the “root cause” of the operation.  -->
Раньше трассировка стека показывала только операцию таймаута. Она не показывала первопричину операции.

<!-- With the latest changes, DevTools now shows the operation originates from the `onClick` event in the button component, then the `increment` function, followed by the timeout operation. -->
Благодаря последним изменениям, DevTools теперь показывают всю операцию начиная с события `onClick` на кнопке компонента, затем функцию `increment`, за которой следует функция таймаута.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png", alt="Связанные трассировки стека для асинхронных операций", width="800", height="442" %}

<!-- Behind the scenes, DevTools introduced a new “Async Stack Tagging” feature. You can tell the whole story of the operation by linking both parts of the async code together with the new `console.createTask()` method. See [Modern debugging in DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces) to learn more.  -->
Под капотом этого улучшения скрывается новая возможность “Async Stack Tagging”, представленная в DevTools. Вы можете рассказать полную историю операции при помощи связывания обеих частей асинхронного кода с помощью нового метода `console.createTask()`. Прочитайте [Modern debugging in DevTools](/blog/devtools-modern-web-debugging/#linked-stack-traces), чтобы узнать больше.

<!-- Does it sound complicated? Not at all. Most of the time, the framework you are using handles the scheduling and async execution. In that case, it is up to the framework to implement the API, you don’t need to worry about it. (e.g. Angular implemented these [changes](https://chromium-review.googlesource.com/c/v8/v8/+/3776678)) -->
Звучит сложно? Вовсе нет. Большую часть времени фреймворк, который вы используете, обрабатывает порядок и выполнение асинхронного кода. В этом случае реализация API зависит от фреймворка, вам не нужно беспокоиться об этом. (например, в Angular реализованы следующие [изменения](https://chromium-review.googlesource.com/c/v8/v8/+/3776678))

{# https://chromium.googlesource.com/v8/v8/+/c53c20fe64b5b21f5a4838ebcfdb96357189fc76 #}

Задача в трекере Chromium: [1334585](https://crbug.com1334585)


<!-- ### Automatically ignore known third-party scripts {: #auto-ignore } -->
### Автоматическое игнорирование известных сторонних скриптов {: #auto-ignore }

<!-- Identify issues in your code quicker during debugging because DevTools now automatically adds known third-party scripts to the ignore list. -->
Быстрее находите ошибки в своём коде при отладке благодаря тому, что теперь DevTools добавляет известные сторонние скрипты в список игнорируемых.

<!-- Open this [demo](https://ng-devtools.netlify.app/) and click on the increment button. Expand the error message in **Console**. The stack trace shows only your code (e.g. `app.component.ts` `button.component.ts`). Click **Show more frames** to view the full stack trace. -->
Откройте [демо](https://ng-devtools.netlify.app/) и нажмите на кнопку <kbd>+</kbd>. Разверните ошибку в консоли. Трассировка стека покажет только ваш код (например, `app.component.ts` и `button.component.ts`). Нажмите **Показать ещё фреймы** (Show more frames), чтобы увидеть полную трассировку стека.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Автоматическое игнорирование известных сторонних скриптов при трассировке стека", width="800", height="425" %}

<!-- Previously, the stack trace included third-party scripts like `zone.js` and `core.mjs`. These are not your source code, they are generated by bundlers (e.g. webpack) or frameworks (e.g. Angular). It took a longer time to identify the root cause of an error.  -->
Раньше трассировка стека включала в себя сторонние скрипты, например, `zone.js` and `core.mjs`. Это не ваш исходный код, он генерируются сборщиками (Webpack и другими) или фреймворками (например, Angular). Из-за этого определение причины ошибки занимало больше времени.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="Автоматическое игнорирование известных сторонних скриптов при трассировке стека", width="800", height="425" %}

<!-- Behind the scenes, DevTools ignores third-party scripts based on the new `x_google_ignoreList` property in source maps. Frameworks and bundlers need to supply this information. See [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).  -->
По капотом DevTools игнорируют сторонние скрипты при помощи нового свойства `x_google_ignoreList` для карт источников. Фреймворки и сборщики должны предоставлять эту информацию. Читайте [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).

<!-- Optionally, if you prefer to always view full stack traces, you can disable the setting via **Settings** > **Ignore list** > **Automatically add known third-party scripts to ignore list**. -->
Если же вы предпочитаете видеть полную трассировку стека, то можете отключить эту настройку в **Настройки** (Settings) > **Список игнорируемых фреймворков** (Ignore list) > **Автоматически добавлять известные сторонние скрипты в список игнорируемых** (Automatically add known third-party scripts to ignore list).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png", alt="Настройка автоматического добавления известных сторонних скриптов в игнорируемые", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e09e489c2b1233ab424d562abc22f297c6322878 #}

Задача в трекере Chromium: [1323199](https://crbug.com/1323199)


<!-- ## Improved call stack during debugging  {: #call-stack } -->
## Улучшен стек вызовов во время отладки  {: #call-stack }

<!-- With the **Automatically add known third-party scripts to ignore list** setting, the call stack now shows only frames that are relevant to your code. -->
С настройкой **Автоматически добавлять известные сторонние скрипты в список игнорируемых** (Automatically add known third-party scripts to ignore list) стек вызовов теперь показывает только фреймы, относящиеся к вашему коду.

<!-- Open this [demo](https://ng-devtools.netlify.app/) and set a breakpoint at the `increment()` function in `app.component.ts`. Click the increment button on the page to trigger the breakpoint. The call stack shows only frames from your code (e.g.  `app.component.ts` and `button.component.ts`).  -->
Откройте это [демо](https://ng-devtools.netlify.app/) и установите точку останова на функции `increment()` в файле `app.component.ts`. Нажмите на кнопку <kbd>+</kbd> на странице, чтобы задействовать точку останова. Стек вызовов покажет фреймы только из вашего кода (например,  `app.component.ts` и `button.component.ts`).

<!-- To view all frames, enable **Show ignore-listed frames**. Previously, DevTools displayed all frames by default.  -->
Чтобы увидеть все фреймы, нажмите на **Показать фреймы из списка игнорируемых** (Show ignore-listed frames). Раньше DevTools отключал все фреймы по умолчанию.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PdjPrBAV7TXn8FHcRR6R.png", alt="Улучшен стек вызовов во время отладки", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Задача в трекере Chromium: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed sources in the Sources panel {: #ignore-nav } -->
## Скрытие источников из списка игнорируемых во вкладке Источники (Sources) {: #ignore-nav }

<!-- Enable **hide ignore-listed sources** to hide irrelevant files in the **Navigation** pane. This way, you can focus only on your code. -->
Включите настроку **Скрыть источники из списка игнорируемых** (Hide ignore-listed sources), чтобы спрятать нерелевантные файлы в панели **Навигация** (Navigation).

<!-- Open this [demo](https://ng-devtools.netlify.app/). In the **Sources** panel. The `node_modules` and `webpack` are the third-party scripts. Click on the 3-dot menu and select **hide ignore-listed sources** to hide them from the pane. -->
Откройте это [демо](https://ng-devtools.netlify.app/). Перейдите на вкладку **Источники** (Sources). `node_modules` и `webpack` — сторонние скрипты. Нажмите на иконку меню  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; и выберите  **Скрыть источники из списка игнорируемых** (Hide ignore-listed sources), чтобы спрятать такие файлы из дерева навигации.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="Скрытие источников из списка игнорируемых во вкладке Источники (Sources)", width="800", height="449" %}

Задача в трекере Chromium: [1352488](https://crbug.com/1352488)


<!-- ## Hiding ignore-listed files in the Command Menu {: #ignore-search } -->
## Скрытие игнорируемых файлов из Меню Команд (Command Menu) {: #ignore-search }

<!-- With the **hide ignore-listed sources** setting, you can find your file quicker with the [Command Menu](/docs/devtools/command-menu/). Previously, searching files in the **Command Menu** returns third-party files that might not be relevant to you. -->
Благодаря настройке  **Скрыть источники из списка игнорируемых** (Hide ignore-listed sources) вы можете быстрее искать свои файлы в [Меню Команд](/docs/devtools/command-menu/). Раньше поиск в **Меню Команд** (Command Menu) показывал сторонние файлы, которые могли быть нерелевантны для вас.

<!-- For example, enable the **hide ignore-listed sources** setting and click on the 3-dot menu. Select **Open file**. Type “ton” to search for button components. Previously, the results include files from `node_modules`, one of the `node_modules` files even shown up as the first result.  -->
Для примера включите настройку  **Скрыть источники из списка игнорируемых** (Hide ignore-listed sources) и нажмите на иконку меню  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %}. Выберите **Открыть файл** (Open file). Напишите «ton» чтобы начать поиск компонента кнопки. Раньше в результатх поиска показывались бы файлы из `node_modules`. Один из файлов из `node_modules` был бы показан первым в списке результатов.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png", alt="Скрытие игнорируемых файлов из Меню Команд", width="800", height="425" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9144105ce3efd70babe74c19e808616864be631b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c010ce7baa6930cb633372b5d8024a18b3f7ed66 #}

Задача в трекере Chromium: [1336604](https://crbug.com/1336604)


<!-- ## New Interactions track in the Performance panel  {: #performance } -->
## Новый трек Взаимодействия (Interactions) во вкладке Производительность (Performance) {: #performance }

<!-- Use the new **Interactions** track in the **Performance** panel to visualize interactions and track down potential responsiveness issues.  -->
Используйте новый трек **Взаимодействия** (Interactions) во вкладке **Производительность** (Performance), чтобы визуализировать взаимодействия и отследить потенциальные проблемы с отзывчивостью.

<!-- For example, [start a performance recording](/docs/devtools/evaluate-performance/#record ) on this [demo page](https://coffee-cart.netlify.app/?ad=1). Click on a coffee and stop recording. Two interactions show in the **Interactions** track. Both interactions have the same IDs, indicating the interactions are triggered from the same user interaction. -->
Например, [начните запись производительности](/docs/devtools/evaluate-performance/#record ) на этой [демо-странице](https://coffee-cart.netlify.app/?ad=1). Кликните на кофе и остановите запись. Два взаимодействия будут показаны на треке **Взаимодействия** (Interactions). Оба взаимодействия имеют одинаковый ID, показывая, что взаимодействия произошли от одного действия пользователя.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LpHJbSGra2ZCHpy3ns7q.png", alt="Трек Взаимодействия во вкладке Производительность", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6d97228951a6c8884b3ac4b712e966e79f2bdc3c #}

Задача в трекере Chromium: [1347390](https://crbug.com/1347390)


<!-- ## LCP timings breakdown in the Performance Insights panel {: #insights } -->
## Разбивка по времени LCP во вкладке Performance Insights {: #insights }

<!-- The **Performance Insights** panel now shows the [timings breakdown](https://web.dev/optimize-lcp/#lcp-breakdown)  of the [Largest Containful Paint (LCP)](/docs/devtools/performance-insights/#largest-contentful-paint). Use these timings information to understand and identify an opportunity to improve LCP performance. -->
Вкладка **Performance Insights** теперь показывает [разбивку по времени](https://web.dev/optimize-lcp/#lcp-breakdown) для [самого крупного существенного отображения (LCP)](/docs/devtools/performance-insights/#largest-contentful-paint). Используйте информацию о тайминге для понимания и определения возможностей для улучшения LCP.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hU6RmoRjFskL8P2ZAB9l.png", alt="Разбивка по времени LCP во вкладке Performance Insights", width="800", height="523" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/883542a3727a5bc1415ffee7c7bc7f7218d9e2a5 #}

Задача в трекере Chromium: [1351735](https://crbug.com/1351735)


<!-- ## Auto-generate default name for recordings in the Recorder panel {: #recorder } -->
## Автоматическая генерация стандартного имени для записи во вкладке Recorder {: #recorder }

<!-- The **Recorder** panel now automatically generates a name for new recordings. -->
Вкладка **Recorder** теперь автоматически генерирует имя для новой записи.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0TMJgVqyk7AeoWIR6Vee.png", alt="Стандартное имя для новой записи во вкладке Recorder", width="800", height="565" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fbf1466b00d1ff2c36fce81fde1b21f33b689a76 #}

Задача в трекере Chromium: [1351383](https://crbug.com/1351383)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- - Previously, [Recorder extensions](/docs/devtools/recorder/reference/#extension-troubleshooting) don’t show up in the **Recorder** panel from time to time. ([1351416](https://crbug.com/1351416)) -->
- Ранее [расширение Recorder](/docs/devtools/recorder/reference/#extension-troubleshooting) во вкладке **Recorder** периодически не показывалось. ([1351416](https://crbug.com/1351416))
<!-- - The **Styles** pane now displays a color picker for the [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) element’s `stop-color` property. ([1351096](https://crbug.com/1351096)) -->
- Во вкладке **Стили** (Styles) теперь показывается предпросмотр цвета для элемента [`<stop>` в SVG](https://developer.mozilla.org/docs/Web/SVG/Element/stop) в свойстве `stop-color`. ([1351096](https://crbug.com/1351096))
<!-- - Identify script causing [layout](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) as the potential root causes for layout shifts in the **Performance Insights** panel. ([1343019](https://crbug.com/1343019)) -->
- Определение вызова скрипта [отрисовки](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/) как потенциальной причины для сдвигов раскладки во вкладке **Performance Insights**. ([1343019](https://crbug.com/1343019))
<!-- - Display critical path for LCP web fonts in the **Performance Insights** panel. ([1350390](https://crbug.com/1350390)) -->
- Отображение критического для LCP пути до веб-шрифтов во вкладке **Performance Insights**. ([1350390](https://crbug.com/1350390))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/50a84ca8e5b556e27bb285477f21a99f0ccb7050 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/2687a701a67e543faeff3f936f215534bf8221bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1f6ef0d58292665e06eded4059d8714a2e487e8a #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fe7254c9a51f964b2a106becc1b22f38033b9f50 #}

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

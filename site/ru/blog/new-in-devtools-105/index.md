---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 105)"
authors:
  - jecelynyeen
date: 2022-08-12
updated: 2022-08-12
description: "Поддержка пошагового воспроизведения и событий mouse over в Recorder, LCP во вкладке Performance insights и другое.
"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IcPSEph39qIsU3BS0Yk1.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-105
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='bHw_56RiVsg' %}


<!-- ## Step-by-step replay in the Recorder {: #recorder } -->
## Пошаговое воспроизведение в Recorder {: #recorder }

<!-- You can now set a breakpoint and replay a user flow step by step in the **Recorder** panel. -->
Теперь вы можете установить точку останова и пошагово воспроизвести пользовательский сценарий во вкладке **Recorder**.

<!-- To set a breakpoint, click on the blue dot next to a step. Replay your user flow, the replay will pause before executing the step. From here, you can continue the replay, execute a step, or cancel the replay. -->
Чтобы установить точку останова, кликните на синюю точку рядом с шагом. Воспроизведите пользовательский сценарий, проигрывание остановится перед выполнением отмеченного шага. С этого места вы можете продолжить воспроизведение, выполнить шаг или отменить воспроизведение.

<!-- With this feature, you can fully visualize and debug your user flow with ease. -->
С помощью этой функции вы можете полностью визуализировать и с легкостью отлаживать пользовательский сценарий.

<!-- See [Recorder features reference](/docs/devtools/recorder/reference/) for more information. -->
Читайте подробнее в статье [Recorder features reference](/docs/devtools/recorder/reference/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Пошаговое воспроизведение в Recorder", width="800", height="547" %}

Задача в трекере Chromium: [1257499](https://crbug.com/1257499)


<!-- ## Support mouse over event in the Recorder panel {: #recorder-hover } -->
## Поддержка события mouse over во вкладке Recorder {: #recorder-hover }

<!-- The **Recorder** now supports adding a mouse over (hover) step manually in a recording.  -->
**Recorder** теперь поддерживает добавление в запись шага mouse over (hover).

<!-- [This demo](https://jec.fish/demo/menu-hover) shows a pop up menu on hover. Try to record a user flow and click a menu item. -->
В [демо](https://jec.fish/demo/menu-hover) появляется всплывающее меню при наведении. Попробуйте записать пользовательский сценарий и во время записи кликните на пункт меню.

<!-- If you replay the user flow now, it will fail because the **Recorder** doesn’t capture mouse over events automatically during recording. To resolve this, [add a step manually](/docs/devtools/recorder/reference/#add-and-remove-steps) to hover over the selector before clicking the menu item.  -->
Если вы воспроизведёте запись сейчас, она проиграется с ошибкой, потому что **Recorder** не ловит событие наведения мыши автоматически во время записи. Чтобы решить эту проблему, [вручную добавьте шаг](/docs/devtools/recorder/reference/#add-and-remove-steps), чтобы имитировать наведение курсора на пункт меню перед кликом.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Поддержка события mouse over во вкладке Recorder", width="800", height="488" %}

Задача в трекере Chromium: [1257499](https://crbug.com/1257499)


<!-- ## Largest Contentful Paint (LCP) in the Performance insights panel {: #lcp } -->
## Самое крупное существенное отображение (LCP) во вкладке Performance Insights {: #lcp }

<!-- LCP is an important, user-centric metric for measuring [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics). You can now find out the critical paths and root causes of a [Largest Contentful Paint (LCP)](https://web.dev/lcp/). -->
LCP – это важная, ориентированная на пользователя метрика, замеряющая [ощущаемую скорость нагрузки](https://web.dev/user-centric-performance-metrics/#types-of-metrics). Теперь вы можете отследить критические моменты и первопричины задержки отрисовки [крупного существенного отображения (LCP)](https://web.dev/lcp/).

<!-- In a [performance recording](/docs/devtools/performance-insights/#record), click on the LCP badge in the **Timeline**. In the **Details** pane, you can view the LCP score, learn how to fix resources that slow down the LCP and see the critical path for the LCP resource. -->
В [записи производительности](/docs/devtools/performance-insights/#record) кликните на значок LPC в **Таймлайне** (Timeline). В панели **Details** вы можете увидеть оценку LCP, узнать как поправить ресурсы, которые замедляют LPC, и посмотреть критический путь для ресурса LCP.

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
Изучите документацию [Performance Insights](/docs/devtools/performance-insights/), чтобы узнать, как получить полезные сведения и улучшить производительность вашего сайта с помощью вкладки.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="LCP во вкладке Performance Insights", width="800", height="751" %}

Задача в трекере Chromium: [1326481](https://crbug.com/1326481)


<!-- ## Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts {: #foit-fout } -->
## Определение миганий текста (FOIT, FOUT) как потенциальных первопричин сдвигов раскладки {: #foit-fout }

<!-- The **Performance insights** panel now detects [flash of invisible text (FOIT) and flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) as potential root causes for layout shifts. -->
Во вкладке **Performance Insights** теперь распознаются [мигания невидимого текста (FOIT) и мигания нестилизованного текста (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) как потенциальные причины сдвига раскладки.

<!-- To view the potential root causes of a layout shift, click on a screenshot in the **Layout shifts** track. -->
Чтобы увидеть потенциальные причины сдвига раскладки кликните на скриншот в **Layout shifts**.

<!-- See [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) to learn the technique to prevent layout shifts.  -->
Изучите статью [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/), чтобы узнать о техниках предотвращения сдвига раскладки.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="FOUT во вкладке Performance insights", width="800", height="497" %}

Задачи в трекере Chromium: [1334628](https://crbug.com/1334628), [1328873](https://crbug.com/1328873)


<!-- ## Protocol handlers in the Manifest pane {: #manifest } -->
## Обработчики протоколов в панели Манифест {: #manifest }

<!-- You can now use DevTools to test the [URL protocol handler registration](https://web.dev/url-protocol-handler/) for [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/). -->
Теперь вы можете использовать DevTools для тестирования [регистрации обработчика протокола URL](https://web.dev/url-protocol-handler/) для [прогрессивных веб-приложений (PWA)](https://web.dev/learn/pwa/).

<!-- The URL protocol handler registration lets installed PWAs handle links that use a specific protocol (e.g. [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) for a more integrated experience. -->
Регистрация обработчика протокола URL позволяет установленным PWA обрабатывать ссылки, использующие определённый протокол (например [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`), для более полноценного опыта использования.

<!-- Navigate to the **Protocol Handlers** section via the **Application** > **Manifest** pane. You can view and test all the available protocols here. -->
Перейдите в раздел **Обработчики протоколов** (Protocol Handlers) в панели **Приложение** (Application) > **Манифест** (Manifest). Здесь вы можете просмотреть и протестировать все доступные протоколы.

<!-- For example, install [this demo PWA](https://protocol-handler.glitch.me/). In the **Protocol Handlers** section, type “americano” and click **Test protocol** to open the coffee page in the PWA.  -->
Например, установите это [тестовое PWA](https://protocol-handler.glitch.me/). В разделе **Обработчики протоколов** (Protocol Handlers) введите «americano» и нажмите **Тестировать протокол** (Test protocol), чтобы открыть страницу с кофе в PWA.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Обработчик протоколов во вкладке Манифест", width="800", height="402" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc2291cce5c5d199540334d01fcfe27207bc5962 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1aa36584d580ed5aa2caf7a8533f2c89b16ab66b #}

Задачи в трекере Chromium: [1300613](https://crbug.com/1300613)


<!-- ## Top layer badge in the Elements panel {: #top-layer } -->
## Значок верхнего слоя во вкладке Элементы {: #top-layer }

<!-- Use the [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) to understand the concept of the top layer and visualize how the top layer content changes.  -->
Используйте [значок верхнего слоя](/blog/top-layer-devtools/#top-layer-support-design-in-devtools), чтобы понять концепцию верхнего слоя и визуализировать, как меняется его контент.

<!-- The [`<dialog>` element](https://web.dev/building-a-dialog-component/) has recently become stable across browsers. When you open a dialog, it is put into a [top layer](/blog/top-layer-devtools/). Top level content renders on top of all the other content.  -->
Элемент [`<dialog>`](https://web.dev/building-a-dialog-component/) недавно стал стабилен во всех браузерах. Когда вы открываете диалог, он помещается в [верхний слой](/blog/top-layer-devtools/). Контент верхнего уровня отображается поверх всего остального контента.

<!-- In this [demo](https://jec.fish/demo/dialog), click **Open dialog**.  -->
В этом [демо](https://jec.fish/demo/dialog) кликните на **Open dialog**.

<!-- To help visualize the top layer elements, DevTools adds a top layer container (`#top-layer`) to the DOM tree. It resides after the closing `</html>` tag.   -->
Чтобы помочь визуализировать элементы верхнего слоя, DevTools добавляет контейнер верхнего слоя (`#top-layer`) в DOM-дерево. Он размещен после закрывающего тега `</html>`.

<!-- To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element or its backdrop in the top layer container. -->
Чтобы перепрыгнуть с контейнера верхнего слоя на соответствующий элемент в дереве элементов, кликните на кнопку **reveal** рядом с контейнером или рядом с его подложкой внутри контейнера верхнего слоя.

<!-- Next to the top layer tree element (for example, the dialog element), click the **top-layer** badge to jump to the top layer container. -->
Рядом с элементом верхнего слоя в дереве (например, элемент диалога) кликните на значок **top-layer**, чтобы переместиться на контейнер верхнего слоя.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Значок верхнего слоя во вкладке Элементы", width="800", height="538" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8d58fa6e258423aef2b00ead3aea563629eef43 #}

Задача в трекере Chromium: [1313690](https://crbug.com/1313690)


<!-- ## Attach Wasm debugging information at runtime {: #wasm } -->
## Прикрепление сведений для отладки Wasm во время исполнения {: #wasm }

<!-- You can now attach DWARF debugging information for wasm during runtime. Previously, the **Sources** panel only supported attaching source maps to JavaScript and Wasm files. -->
Теперь вы можете прикрепить отладочную информацию DWARF для wasm во время исполнения файла. Раньше на вкладке **Источники** (Sources) можно было прикрепить только карту источников для файлов JavaScript и Wasm.

<!-- Open a Wasm file in the **Sources** panel. Right-click in the editor and select **Add DWARF debugging info…**  to attach debugging information on demand.  -->
Откройте файл Wasm во вкладке **Источники** (Sources). Кликните правой клавишей мыши в области редактора и выберите **Добавить сведения для отладки DWARF…** (Add DWARF debugging info…), чтобы прикрепить отладочную информацию по запросу.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5DMV6DFNGRYkrXyBtlg.png", alt="Прикрепление сведений для отладки Wasm во время исполнения", width="800", height="559" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/112d6ec238ea3b1cb12f1cabc5b988afc74022db  #}

Задача в трекере Chromium: [1341255](https://crbug.com/1341255)


<!-- ## Support live edit during debugging {: #live-edit } -->
## Поддержка редактирования во время отладки {: #live-edit }

<!-- You can now edit the top-most function on the stack without restarting the debugger. -->
Теперь вы можете редактировать самую верхнюю функцию в стеке без перезапуска отладчика.

<!-- In Chrome 104, DevTools brings back the [restart frame](/blog/new-in-devtools-104/) feature. However, you weren't able to edit the function you are currently paused in. It is common for developers to break in a function and then edit that function while paused.  -->
В Chrome 104 в DevTools вернулась возможность [перезапуска фрейма](/blog/new-in-devtools-104/). Тем не менее вы не могли редактировать функцию, на которой вы остановились прямо сейчас. Разработчики часто прерывают функцию, а затем редактируют ее во время паузы.

<!-- With this update, the debugger automatically restarts the function with the following restrictions: -->
С этим обновлением отладчик автоматически перезапускает функцию со следующими ограничениями:

<!-- - Only the top-most function can be edited while paused -->
<!-- - No recursive call on the same function further down the stack -->
- Только функция самого верхнего уровня может быть отредактирована во время паузы.
- Ниже по стеку нет рекурсивных вызовов этой же функции.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="Редактирование во время отладки", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b41deeb8b0b228ea4628a49e79a7ce4d8ab32ffa #}

Задача в трекере Chromium: [1334484](https://crbug.com/1334484)


<!-- ## View and edit @scope at rules in the Styles pane {: #scope } -->
## Отображение и редактирование директивы @scope в панели Стили {: #scope }

<!-- You can now view and edit the [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) in the **Styles** pane.  -->
Теперь вы можете просматривать и редактировать [CSS-директиву `@scope`](https://drafts.csswg.org/css-cascade-6/#scope-atrule) в панели **Стили** (Styles).

<!-- The `@scope` at rules is part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow developers to scope style rules in CSS. -->
Директива `@scope` является частью спецификации «[CSS Cascading and Inheritance Level 6](https://drafts.csswg.org/css-cascade-6/)». Эти правила позволяют разработчикам группировать правила стилей в CSS.

<!-- Open [this demo page](https://codepen.io/miriamsuzanne/details/ZErXZVY) and inspect the hyperlink within the `<div class=”dark-theme”>` element. In the **Styles** pane, view the `@scope` at-rules. Click the rule declaration to edit it. -->
Откройте эту [демо-страницу](https://codepen.io/miriamsuzanne/details/ZErXZVY) и проинспектируйте гиперссылку внутри элемента `<div class="dark-theme">`. В панели **Стили** (Styles) просмотрите директиву `@scope`. Кликните на объявление правила, чтобы отредактировать его.

{% Aside %}
<!-- The CSS `@scope` is currently under development. To test this feature, enable the **Experimental Web Platform features** flag via `chrome://flags/#enable-experimental-web-platform-features`. -->
Поддержка `@scope` в настоящее время находится в стадии разработки. Чтобы протестировать эту функцию, включите флаг **Experimental Web Platform features** на странице `chrome://flags/#enable-experimental-web-platform-features`.
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="Директива @scope на вкладке Стили", width="800", height="464" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b2309caa9ea358bc07d4d48eb976cc3dc6884cd #}

Задача в трекере Chromium: [1337777](https://crbug.com/1337777)


<!-- ## Source map improvements {: #sourcemaps } -->
## Улучшения карты источников {: #sourcemaps }

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Вот несколько исправлений в картах источников для улучшения общего опыта отладки:

<!-- - DevTools now properly resolves source map identifiers with punctuation. Some modern minifiers (for example, [esbuild](https://esbuild.github.io/)) produce sourcemaps that merge identifiers with subsequent punctuation (comma, parentheses, semicolon).  -->
- DevTools теперь правильно распознает идентификаторы карт источников с пунктуацией. Некоторые современные минификаторы (например, [esbuild](https://esbuild.github.io/)) создают карты источников, объединяющие идентификаторы с помощью знаков препинания (запятая, круглые скобки, точка с запятой).
<!-- - DevTools now resolves source map names for constructors with a `super` call. -->
- DevTools теперь распознает имена карт источников для конструкторов с вызовом `super`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6djFfkrtPzXuNYq5m8Vk.png", alt="Правильное распознание вызова super", width="800", height="441" %}
<!-- - Fixed source map URL indexing for duplicate canonical URLs. Previously, breakpoints were not activated in some files because of duplicate canonical URLs. -->
- Исправлено индексирование URL карт источников при дублирующихся канонических URL. Ранее точки останова не активировались в некоторых файлах из-за дублирования канонических URL.


Задача в трекере Chromium: [1335338](https://crbug.com/1335338), [1333411](https://crbug.com/1333411)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - Properly remove a local storage key value pair from the table in the **Application** > **Local Storage** pane when it is deleted. ([1339280](https://crbug.com/1339280)) -->
- Правильная реализация удаления пары ключ-значение локального хранилища из таблицы в панели **Приложении** (Application) > **Локальное хранилище** (Local Storage) при её удалении. ([1339280](https://crbug.com/1339280))
<!-- - The color previews are now correctly displayed when viewing CSS files in the **Sources** panel. Previously, their positions were misplaced. ([1340062](https://crbug.com/1340062)) -->
- Предпросмотры цвета теперь отображается корректно при просмотре файлов CSS во вкладке **Источники** (Sources). Ранее их позиция была неверной. ([1340062](https://crbug.com/1340062))
<!-- - Consistently display the CSS flex and grid items in the **Layout** pane, as well as display them as badges in the **Elements** panel. Previously, the flex and grid items were randomly missing in both places. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992)) -->
- Последовательное отображение флекс- и грид-элементов в панели **Макет** (Layout), а также отображение их в виде значков во вкладке **Элементы** (Elements). Ранее флекс- и грид-элементы случайным образом терялись в обоих местах. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992))
<!-- - A new **Creator Ad Script** link is available for [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) if DevTools found the script that caused the frame to be labeled as an ad. You can open a frame via **Application** > **Frames**. ([1217041](https://crbug.com/1217041)) -->
- Новая ссылка **Creator Ad Script** теперь доступна для [рекламных фреймов](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker), если DevTools обнаружили скрипт, из-за которого фрейм был помечен как реклама. Вы можете открыть фрейм во вкладке **Приложение** (Application) > **Фреймы** (Frames). ([1217041](https://crbug.com/1217041))

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

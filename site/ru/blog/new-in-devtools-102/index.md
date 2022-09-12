---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 102)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "Новая вкладка анализа производительности, горячие клавиши для эмуляции светлой и тёмной темы и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ReGAmU4kfP3P9hxZ8uhv.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-102
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='0V_ph7PA_aw' %}

<!-- start: translation instructions -->
<!-- + +1. Remove the "draft: true" tag above when submitting PR -->
<!-- + +2. Provide translations under each of the English commented original content -->
<!-- + +3. Translate the "description" tag above -->
<!-- + +4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: New Performance insights panel {: #perf } -->
## Ранний доступ: Новая вкладка анализа производительности {: #perf }

<!-- Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance. -->
Используйте вкладку **Performance insights**, чтобы получить полезную и основанную на прецедентах информацию о производительности вашего сайта.

<!-- [Open the panel](/docs/devtools/performance-insights/#open) and start a new recording based on your use case. For example, let’s measure the page load of this [demo page](https://coffee-cart.netlify.app/?ad=1). -->
[Откройте вкладку](/docs/devtools/performance-insights/#open) и начните новую запись, основанную на вашем сценарии использования. Например, давайте оценим загрузку этой [демо-страницы](https://coffee-cart.netlify.app/?ad=1).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EjgH5CD6FHnzoEhDEWxu.png", alt="Новая вкладка анализа производительности", width="800", height="585" %}

<!-- Once the recording is complete, you get the performance insights on the  **Insights** pane. Click on each insight item (for example, Render blocking request, layout shift) to understand the issue and potential fixes.  -->
После завершения записи вы получите обзор производительности на панели **Insights**. Кликните на каждый пункт отчёта (например, Render blocking request, Layout shift), чтобы понять проблему и возможные способы её устранения.

<!-- Go to the **Performance insights** panel [documentation](/docs/devtools/performance-insights/) to learn more with the step-by-step tutorial.  -->
Читайте [документацию](/docs/devtools/performance-insights/) панели **Performance insights**, чтобы узнать больше в пошаговом руководстве.

<!-- This is a preview feature to help web developers (especially non-performance experts) to identify and fix potential performance issues. Our team is actively working on this feature and we are looking for your [feedback](https://crbug.com/1270700) for further enhancements. -->
Это ранний доступ к функции, призванной помочь веб-разработчикам (особенно не специалистам в вопросе производительности) выявить и устранить потенциальные проблемы с производительностью. Наша команда все еще активно работает над этой функцией. Мы ждем ваши [отзывы](https://crbug.com/1270700) для дальнейших улучшений.

Задача в трекере Chromium: [1270700](https://crbug.com/1270700)


<!-- ## New shortcuts to emulate light and dark themes {: #emulation } -->
## Новые горячие клавиши для эмуляции светлой и тёмной темы {: #emulation }

<!-- You can now emulate the light and dark themes quicker (CSS media feature [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) with the new shortcuts in the **Styles** pane. -->
Теперь вы можете быстро переключать светлую и тёмную темы (CSS медиафункция [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) при помощи горячих клавиш в панели **Стили** (Styles).

<!-- Previously, it took more steps to [emulate themes](/docs/devtools/rendering/emulate-css/) in the **Rendering** tab.   -->
До этого требовалось больше действий для [эмуляции темы](/docs/devtools/rendering/emulate-css/) во вкладке **Отрисовка** (Rendering).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dCbNHwE5ICGNXRUws1zz.png", alt="Новые горячие клавиши для эмуляции светлой и тёмной темы", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/34c39bcabca71195024f1312ec29eecf464a633d #}

Задача в трекере Chromium: [1314299](https://crbug.com/1314299)


<!-- ## Improve security on the Network Preview tab {: #network-preview } -->
## Улучшение безопасности на вкладке Предварительный просмотр (Preview) панели Сеть (Network) {: #network-preview }

<!-- DevTools now apply the Content Security Policy (CSP) in the **Preview** tab in the **Network** panel. -->
DevTools теперь применяет политику безопасности содержимого (CSP) на вкладке **Предварительный просмотр** (Preview) внутри вкладки **Сеть** (Network).

<!-- For example, the first screenshot shows a page that contains [mixed content](https://web.dev/what-is-mixed-content/). The page loads over a secure HTTPS connection, but the stylesheet loads over an insecure HTTP connection. -->
Например, на первом скриншоте показана страница, содержащая [смешанный контент](https://web.dev/what-is-mixed-content/). Страница загружается через безопасное соединение HTTPS, но таблица стилей загружается через небезопасное соединение HTTP.

<!-- The browser blocked the stylesheet request by default. However, when you opened the page via the **Preview** tab in the **Network** panel, the stylesheet was not blocked previously (hence the background turned into red). It is now blocked as you would expect (second screenshot). -->
Браузер по умолчанию блокирует запрос таблицы стилей. Однако, когда вы открывали страницу через вкладку **Предварительный просмотр** (Preview) во вкладке **Сеть** (Network), таблица стилей ранее не блокировалась (поэтому фон становился красным). Теперь запрос блокируется, как и следовало ожидать (второй скриншот).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jxqxoJYqWXGzj4V9aJaX.png", alt="Улучшение безопасности на вкладке Предварительный просмотр во вкладке Сеть", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/95bce20a2490b59a36d5da04c5f81d8c38230a39 #}

Задача в трекере Chromium: [833147](https://crbug.com/833147)


<!-- ## Improved reloading at breakpoint {: #debugger } -->
## Улучшена перезагрузка в точке останова {: #debugger }

<!-- The debugger now terminates script execution when reloading at breakpoint. -->
Отладчик теперь завершает выполнение сценария при перезагрузке на точке останова.

<!-- For example, the script got into an endless loop previously when setting and reloading at the `ReactDOM` breakpoint in this [React demo](https://react-stuck.glitch.me/). The **Sources** panel broke due to the endless loop.  -->
Например, ранее скрипт попадал в бесконечный цикл при установке и перезагрузке в точке останова `ReactDOM` в этом [демо-приложении](https://react-stuck.glitch.me/). Вкладка **Источники** (Sources) ломалась из-за бесконечного цикла.

<!-- Continuing to execute JavaScript is causing a lot of trouble for developers and might leave the renderer in a broken state. This change aligns the debugging behavior with other browsers like Firefox. -->
Продолжение выполнения JavaScript создает много проблем для разработчиков и может сломать рендер. Теперь отладчик отрабатывает в этой ситуации как в других браузерах, например, Firefox.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QBv59pX5TE9c7iJAB3Xu.png", alt="Улучшена перезагрузка в точке останова", width="800", height="566" %}

{# https://chromium.googlesource.com/chromium/src/+/ea207cee9bbd9b6731228d94778b23138373ec97 #}

Задачи в трекере Chromium: [1014415](https://crbug.com/1014415), [1004038](https://crbug.com/1004038), [1112863](https://crbug.com/1112863), [1134899](https://crbug.com/1134899)


<!-- ## Console updates  {: #console } -->
## Обновления консоли  {: #console }

<!-- ### Handle script execution errors in the Console {: #errors } -->
### Обработка ошибок выполнения сценария в Консоли (Console) {: #errors }

<!-- Errors during script evaluation in the Console now generate proper error events that trigger the `window.onerror` handler and are dispatched as `"error"` events on the window object. -->
Ошибки во время выполнения скрипта в консоли теперь генерируют правильные события ошибок, которые запускают обработчик `window.onerror` и передаются как события `"error"` на объект `window`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gBtY4zD39SPizfcCGJJW.png", alt="Обработка ошибок выполнения сценария в консоли", width="800", height="487" %}

{# https://chromium.googlesource.com/v8/v8/+/56cfdd68c731c53d016326b890b56b5c30098998 #}

Задача в трекере Chromium: [1295750](https://crbug.com/1295750)


<!-- ### Commit live expression with Enter {: #live-expression } -->
### Выполнение живых выражений с помощью Enter {: #live-expression }

<!-- Once you finish typing a [live expression](/blog/new-in-devtools-70/#watch), you can click `Enter` to commit it. Previously, hitting Enter resulted in adding new lines. This is inconsistent with other parts of the DevTools.  -->
После того, как вы закончите набирать [живое выражение](/blog/new-in-devtools-70/#watch), вы можете нажать `Enter`, чтобы выполнить его. Раньше нажатие на Enter приводило к добавлению новых строк. Это противоречило поведению в других инструментах DevTools.

<!-- To add a new line in the **live expression** editor, use `Shift` + `Enter` instead. -->
Чтобы перейти на новую строку в редакторе **живых выражений** используйте вместо этого `Shift` + `Enter`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yB7m2052mYzgsRgjIMvs.png", alt="Выполнение живых выражений с помощью Enter", width="800", height="541" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f6f73b8d9eedbc5b6006e61c3be0d843188eac55 #}

Задача в трекере Chromium: [1260744](https://crbug.com/1260744)


<!-- ## Cancel user flow recording at the start {: #recorder } -->
## Отмена записи пользовательского сценария в самом начале {: #recorder }

<!-- You can cancel the recording during the start of user flow recording. Previously, there was no option to cancel the recording. -->
Вы можете отменить запись пользовательского потока в самом начале. Ранее возможность отмены записи отсутствовала.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3vhz3UrjLd9lJKcYw2FU.png", alt="Отмена записи пользовательского сценария в самом начале", width="800", height="488" %}

Задача в трекере Chromium: [1257499](https://crbug.com/1257499)


<!-- ## Display inherited highlight pseudo-elements in the Styles pane {: #pseudo } -->
## Отображение наследуемых псевдоэлементов выделения в панели Стили (Styles) {: #pseudo }

<!-- View the inherited highlight pseudo-elements  (e.g. `::selection`, `::spelling-error`, `::grammar-error`, and `::highlight`) in the **Styles** pane. Previously, these rules were not displayed. -->
Просматривайте наследуемые псевдоэлементы выделения (`::selection`, `::spelling-error`, `::grammar-error` и `::highlight`) в панели **Стили** (Styles). Раньше эти правила не отображались. 

<!-- As mentioned in the [specification](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), when multiple styles conflict, cascade determines the winning style. This new feature helps you understand the inheritance and priority of the rules. -->
Как указано в [спецификации](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), когда несколько стилей конфликтуют, каскад определяет победивший стиль. Эта новая функция помогает понять наследование и приоритет правил.

{% Aside %}
<!-- At the moment, you need to run Chrome with the `--enable-blink-features=HighlightInheritance` flag to enable this feature. -->
В данный момент вам нужно запустить Chrome с флагом `--enable-blink-features=HighlightInheritance`, чтобы активировать эту функцию
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fD8vohg49HvBPW53GV2Q.png", alt="Отображение наследуемых псевдоэлементов выделения в панели Стили", width="800", height="529" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bfe1683fe8b2eaa9ea2960dedca2e4a0bbc73546 #}

Задача в трекере Chromium: [1024156](https://crbug.com/1024156)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - The **Properties** pane now displays accessor properties with value by default. It was hidden mistakenly previously. ([1309087](https://crbug.com/1309087))
- The **Styles** pane now properly shows the overridden `@support` rules as strikethrough. Previously, the rules weren’t strikethrough. ([1298025](https://crbug.com/1298025))
- Fixed the CSS formatting logic in the **Sources** panel that caused multiple blank lines when editing CSS. ([1309588](https://crbug.com/1309588))
- Cap the **Expand recursively** option of an object in the **Console** to maximum 100 so it does not go on forever for circular objects. ([1272450](https://crbug.com/1272450)) -->
- На панели **Свойства** (Properties) теперь по умолчанию отображаются свойства-аксессоры вместе со значениями. Ранее это было скрыто по ошибке. ([1309087](https://crbug.com/1309087))
- В панели **Стили** (Styles) переопределенные правила `@support` теперь правильно отображаются как зачеркнутые. Ранее правила не зачёркивались. ([1298025](https://crbug.com/1298025))
-  Исправлена логика форматирования CSS во вкладке **Источники** (Sources), которая приводила к появлению множества пустых строк при редактировании CSS. ([1309588](https://crbug.com/1309588))
- Добавлено максимальное ограничние 100 для параметра **Расширить рекурсивно** объекта в **Консоли**, чтобы он не продолжался бесконечно для циклических объектов. ([1272450](https://crbug.com/1272450))


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4240f8bc96a3ebd2dc2a5b316fd41c24e20fb3c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cf09d1de8a0277dbaa9e2000a8d2fcca69e7128e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6616b9f0cd3e9f1138fb0f409fbe91206d5c8640 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9751653723e15073588f985ba53ba5204475b8c5 #}


<!-- ## [Experimental] Copy CSS changes {: #copy } -->
## [Эксперимент] Копирование изменений в CSS {: #copy }

{% Aside %}
<!-- To enable the experiment, check **Sync CSS changes in the Styles pane** under **Settings** > **Experiments**. -->
Чтобы включить этот эксперимент поставьте галочку напротив **Sync CSS changes in the Styles pane** в **Настройки** (Settings) > **Эксперименты** (Experiments).
{% endAside %}

<!-- With this experiment, the **Styles** pane highlights your CSS changes in green. You can hover over the changed rules and click on the new copy button next to it to copy it. -->
С этим экспериментом панель **Стили** (Styles) подсвечивает зелёным ваши CSS изменения. Вы можете навести курсор на изменённое свойство и нажать на новую кнопку копирования, чтобы скопировать его.

<!-- Apart from that, you can copy all CSS changes across declarations by right-clicking on any rule, and selecting **Copy all CSS changes**. -->
Кроме того, вы можете скопировать все изменения CSS, щелкнув правой кнопкой мыши на любом правиле и выбрав **Копировать все изменения кода CSS**.

<!-- A new **Copy** button is added to the [Changes](/docs/devtools/changes/) tab as well to help you keep track and copy your CSS changes with ease! -->
Новая кнопка **Copy** также добавлена на вкладку [Изменения](/docs/devtools/changes/), чтобы помочь вам легко отслеживать и копировать изменения в CSS!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7PYMKJNBguswcas6jbpu.png", alt="Копирование изменений в CSS", width="800", height="488", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/afe5698f1cd20304d2763574ef8e9faf6a4a6db1 #}
{# ​​https://chromium.googlesource.com/devtools/devtools-frontend/+/5de1d6140cad945783f3ca54055134f4a7db42a1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/573dfc1cca09e49177ece3898c9ba9619c386f06 #} 

Задача в трекере Chromium: [1268754](https://crbug.com/1268754)


<!-- ## [Experimental] Picking color outside of browser {: #color-picker } -->
## [Эксперимент] Выбор цвета вне браузера {: #color-picker }

{% Aside %}
<!-- To enable the experiment, check **Enable color picking outside the browser window** under **Settings** > **Experiments**. -->
Чтобы включить этот эксперимент поставьте галочку напротив **Enable color picking outside the browser window** в **Настройки** (Settings) > **Эксперименты** (Experiments).
{% endAside %}

<!-- Enable this experiment to pick a color outside of the browser with the color picker. Previously, you could only pick a color within the browser. -->
Запустите эксперимент, чтобы выбирать цвет за пределами окна браузера. Раньше вы могли захватывать цвет только в пределах окна браузера.

<!-- In the **Styles** pane, click on any color preview to open the color picker. Use the eyedropper to pick color from anywhere.  -->
В панели **Стили** (Styles) кликните на любое превью цвета, чтобы открыть палитру цветов. Используйте пипетку, чтобы выбрать цвет из любого места.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/h3xLPNl1QdvyuzZpNuqW.png", alt="Выбор цвета вне браузера", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1a73be9f3cb75fdd57578224b71396fbf68f8637 #}

Задача в трекере Chromium: [1245191](https://crbug.com/1245191)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
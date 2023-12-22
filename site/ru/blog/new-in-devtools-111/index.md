---
layout: 'layouts/blog-post.njk'
title: "Новинки DevTools (Chrome 111)"
authors:
  - jecelynyeen
date: 2023-02-16
description: "Отладка HD-цветов в панели Стили, улучшенный UX точек останова и другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/S8kOvfLLpvgyVDusLyGt.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-111
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  + 1. Remove the "draft: true" tag above when submitting PR
  + 2. Provide translations under each of the English commented original content
  + 3. Translate the "description" tag above
  + 4. Translate all the <img> alt text
  5. Update the sites/ru/_partials/devtools/whats-new.md file -->


<!-- ## Debugging HD color with the Styles pane {: #color } -->
## Отладка HD-цветов в панели Стили {: #color }

<!-- New [CSS color types and spaces](/blog/chrome-111-beta/#new-css-color-types-and-spaces) are coming to the web! It is equally exciting that DevTools introduced new tools to help developers create, convert and debug High Definition color.  -->
Новые [типы цветов и цветовые пространства в CSS](/blog/chrome-111-beta/#new-css-color-types-and-spaces) приходят в веб! Это не менее волнующе, что DevTools представляют новые инструменты, помогающие разработчикам создавать, конвертировать и отлаживать цвета высокой чёткости.

<!-- The **Styles** pane now supports 12 new color spaces and 7 new gamuts as outlined in the [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) specification. See [High Definition CSS Color Guide](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools) for a comprehensive understanding of color options available on the web. -->
Панель **Стили** (Styles) теперь поддерживает 12 новых цветовых пространств и 7 новых цветовых гамм, описанных в спецификации [CSS Color Level 4](https://www.w3.org/TR/css-color-4/). Читайте статью [High Definition CSS Color Guide](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools) для получения полного представления о вариантах цветов, доступных в Интернете.

<!-- Here are examples of CSS color definitions with `color()`, `lch()`, `oklab()` and `color-mix()`. -->
Вот несколько примеров с определениями цветов в CSS при помощи `color()`, `lch()`, `oklab()` и `color-mix()`.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dA8VCKaSZhNb9gzlAUT9.png", alt="Примеры определения цветов в CSS", width="800", height="509" %}

<!-- When using the `color-mix()` function, you can view the final color output in the **Computed** pane. -->
Когда вы используете функцию `color-mix()`, вы можете видеть окончательный результат вычисления цвета в панели **Вычисленные** (Computed).
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3VkOGbbb5qLVvo1A1qSa.png", alt="Результат color-mix в панели Вычисленные.", width="800", height="487" %}

<!-- The color picker supports all the new color spaces with more features. For example, click on the color swatch of `color(display-p3 1 0 1)`. A gamut boundary line has also been added, distinguishing between the `sRGB` and `display-p3` gamuts for a clearer understanding of your selected color's gamut. -->
Встроенный инструмент палитры цветов теперь поддерживает все цветовые пространства с дополнительными возможностями. Например, нажмите на элемент с предпросмотром цвета `color(display-p3 1 0 1)`. Также была добавлена линия границы гаммы, различающая гаммы `RGB` и `display-p3` для более четкого понимания гаммы выбранного цвета.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bL6uw8VV4cGuDd9hmAjX.png", alt="Линия границы гаммы", width="800", height="657" %}

<!-- DevTools supports converting colors between color formats. Use the **Change Color Format** icon to access the conversion popup, or simply use the `Shift` + click on a color swatch in the **Styles** pane. -->
DevTools поддерживают конвертацию цветом в разные форматы. Используйте иконку **Изменить цветовой формат** (Change Color Format) для получения доступа к всплывающему окну конвертации или просто используйте <kbd>Shift</kbd> + клик по элементу предпросмотра цвета в панели **Стили** (Styles).
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uoz3yaPPdVs6T2ASnQ62.png", alt="Конвертация цветов в разные цветовые форматы", width="800", height="460" %}

<!-- When converting, it's important to know if the conversion was clipped to fit the space. DevTools puts a warning icon next to the converted color that alerts you to this clipping. -->
При конвертации важно знать, был ли обрезан цвет, чтобы вписаться в выбранное пространство. DevTools помещает значок предупреждения рядом с преобразованным цветом, чтобы предупредить вас об обрезке.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5Y4rVIqL9rjuSbHcodKr.png", alt="Предупреждение об обрезке цвета.", width="800", height="657" %}

<!-- In addition, you can pick colors from your screen with the new shortcut. Press 'c' to activate the eye dropper and hit `Escape` to deactivate it. The eyedropper tool only samples colors in the sRGB color space. For example, if you try to sample the color `color(display-p3 1 0 1)`, which is outside of the sRGB color space, the eyedropper tool will clip the color to the nearest color in the sRGB space, which is magenta `color(display-p3 0.92 0.2 0.97)`. -->
Кроме того вы можете выбирать цвета на экране при помощи нового шортката. Нажимте <kbd>C</kbd> чтобы активировать пипетку и нажмите <kbd>Escape</kbd> чтобы выключить её. Пипетка выбираем цвета только в цветовом пространстве sRGB. Например, если вы пытаетесь выбрать цвет `color(display-p3 1 0 1)`, который находится за пределами цветового пространства sRGB, пипетка выберет ближайший цвет из пространства sRGB. В данном случае это будет маджента `color(display-p3 0.92 0.2 0.97)`.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VNBu6RenRerRqNhNYfyf.png", alt="Активация инструмента Пипетка.", width="800", height="657" %}

<!-- Finally, the **Color format** setting is now deprecated to make room for the new HD color format. -->
Напоследок, настройка **Цветовой формат** (Color format) теперь утратила актуальность чтобы освободить место для новых цветовых форматов HD.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SPymkBgxzI6iVAvLdWBN.png", alt="Неактуальная настройка Цветовой формат", width="800", height="441" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f600600cf51a6582870c99e9a6b9a6a9ba76f9dc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e813f07e6a47b39c04c64a409dd08be294432490 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b54410ab252e1cdc882c3a71e86b04c3de055fa #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/392b216dfae9c04697d7d0591af547c2482f7666 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9f3432a40c557b3faa3da01fc2ef84e4cf60e66a #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/504995fbfc3bf21bcaf2718b6a469c5f23814936 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6cc705a56def86c35d61b45a98371c190f4275e8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e9a64d873ac41e8d585e60b4934879abd8ba4977 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/abe7076d2df519b001dbea807a3aaf5beaa86fc0 #} 

Задачи в трекере Chromium [1073895](https://crbug.com/1073895), [1395782](https://crbug.com/1395782), [1408777](https://crbug.com/1408777),  [1395782](https://crbug.com/1395782),  [1392717](https://crbug.com/1392717), [1382409](https://crbug.com/1382409), [1392054](https://crbug.com/1392054)


<!-- ## Enhanced breakpoint UX {: #breakpoint-redesign } -->
## Улучшенный UX точек останова {: #breakpoint-redesign }

<!-- The redesigned **Breakpoints** pane allows you to have quick access to commonly used features, in particular, deactivating, editing, and removing breakpoints. -->
Обновлённый дизайн панели **Точки останова** (Breakpoints) позволяет получить быстрый доступ к часто используемым функциям, в частности, к отключению, редактированию и удалению точек останова.

<!-- These are some highlights: -->
Вот несколько основных моментов:
<!-- - Both pause exception options moved to the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- Обе опции приостановки исключений перемещены в панель **Точки останова** (Breakpoints) и помечены текстом, чтобы сделать их более понятными.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KADuAqVdrxxQDg5AYYeA.png", alt="Опции приостановки исключений.", width="800", height="518" %}

<!-- - Breakpoints are grouped by file, ordered by line or column numbers, and are collapsible. -->
- Точки останова группируются по файлам, упорядочиваются по номерам строк или столбцов и могут быть свёрнуты.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AXJ7IL5aJ6gwbZmnoH39.png", alt="Группировка точек останова по файлам.", width="800", height="454" %}

<!-- - There are new options to deactivate, remove, and edit breakpoints when hovering over a breakpoint or file. -->
- Появились новые опции для отключения, удаления и редактирования точек останова при наведении курсора на точку останова или файл.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vAQ4YuWGuXYLxXQXt0HG.png", alt="Новые опции для отключения точек останова.", width="800", height="496" %}

<!-- - Click the edit breakpoint button to open the breakpoint editor. From here, you can enter the breakpoint condition or switch to a logpoint. -->
- Нажмите кнопку редактирования рядом с точкой останова, чтобы открыть редактор. Отсюда можно ввести условие точки останова или переключиться на точку журнала логирования.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SrgbxxF8U3s9yzDPV25q.png", alt="Диалог с редактором точки останова.", width="800", height="697" %}

<!-- See [JavaScript debugging reference](/docs/devtools/javascript/reference/) to learn how to debug with DevTools. -->
Читайте статью [JavaScript debugging reference](/docs/devtools/javascript/reference/) чтобы узнать как отлаживать при помощи DevTools.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/48b648b65cd05071d1950e50d0b529ff20294780 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6c8a19b3922ed95818b5751f1b6548724ff868c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b955a3533292790168431db4e54906d4b1fa64a #} 
Задачи в трекере Chromium [1407586](https://crbug.com/1407586), [1402891](https://crbug.com/1402891), [1402893](https://crbug.com/1402893)

<!-- ## Customizable Recorder shortcuts {: #recorder } -->
## Настраиваемые шорткаты Регистратора {: #recorder }

<!-- Use keyboard shortcuts to record and replay user flows quicker. -->
Используйте сочетания клавиш, чтобы быстрее записывать и воспроизводить пользовательские сценарии.

<!-- The **Recorder** introduces a few convenient keyboard shortcuts for faster recording and replaying of user flows.  -->
**Регистратор** (Recorder) предоставляет несколько удобных сочетаний клавиш для более быстрой записи и воспроизведения пользовательских сценариев.

<!-- Don’t remember the shortcuts? No problem, click the `?` button to view all the shortcuts at any time. -->
Не помните шорткаты? Не проблема, кликните по кнопке `?` в любой момент чтобы увидеть все сочетания клавиш.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BJq63X8k89HTdINY2RKu.png", alt="Шорткаты Регистратора.", width="800", height="625" %}

<!-- You can even customize these shortcuts via the **Settings** menu. -->
Вы также можете кастомизировать сочетания клавиш при помощи меню **Настройки** (Settings).
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FtZSO1pPSooAbBrPTGC6.png", alt="Кастомизация сочетаний клавиш Регистратора.", width="800", height="494" %}

<!-- If you're working in a different panel and want to start a user flow recording, use the **Create a new recording** command from the [Command Menu](/docs/devtools/command-menu/) in DevTools to get started. -->
Если вы работаете в другой вкладке и хотите начать запись пользовательского сценария, используйте команду **Создать запись** (Create a new recording) в [Command Menu](/docs/devtools/command-menu/) в DevTools чтобы начать запись.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fErUqzQ03p5zOk301nTN.png", alt="Команда создать запись.", width="800", height="435" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/140ffb3e4c5e084eff5522508310af5dd407cf6e #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e61fa89b8d073c4ff6b4da3599f83bf5972d5415 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/ffc735e599881fec2779477e6c20165e2796da69 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/f57026189fb51f801bf2ea2611afcb932fa32bef #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/0a7c428980b8f8a60e83c780e17f6a6f94007493 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/aea51aad7026881ad26ca1b270d12338adb92d79 #} 

Задача в трекере Chromium [1339771](https://crbug.com/bbb)


<!-- ## Better syntax highlight for Angular {: #syntax } -->
## Улучшенная подсветка синтаксиса для Angular {: #syntax }

<!-- DevTools enhanced the syntax highlighting for Angular HTML templates, making it easier for you to read code and recognize its structure. -->
В DevTools улучшена подсветка синтаксиса для HTML-шаблонов Angular, облегчено чтение кода и распознавание его структуры.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lJU7wOa4vNDb2Vm2zPJq.png", alt="подсветка синтаксиса для HTML-шаблонов Angular.", width="800", height="507" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4ec36d2fc5e7506d1ff65fd282a43215164f03f2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/717953202d0e8463257e09cc3f68a7769fd25300 #}

Задачи в трекере Chromium [1385374](https://crbug.com/1385374),  [1385678](https://crbug.com/1385678)


<!-- ## Reorganize caches in the Application panel {: #cache } -->
## Реорганизация кэшей во вкладке Приложение {: #cache }

<!-- The **Cache Storage** pane can now be found in the **Storage** section of the **Application** panel, while the **Back/forward cache** pane has been moved to the **Background Services** section.  -->
Панель **Хранилище кэша** (Cache Storage) теперь находится в секции **Хранилище** (Storage) во вкладке **Приложение** (Application), в то время как панель **Возвратный кэш** (Back/forward cache) была перемещена в секцию **Фоновые службы** (Background Services).
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q5ZeDvMc3OseF8fQve5A.png", alt="кэши во вкладке Приложение", width="800", height="506" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/adccf1afe5d585b294dee247f5a4982aca8f5f1e  #}

Задача в трекере Chromium [1407166](https://crbug.com/1407166)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - DevTools has been updated to respect the [Disable cache](/docs/devtools/network/reference/#disable-cache) setting when loading sourcemaps. ([1407084](https://crbug.com/1407084)) -->
- DevTools были обновлены для соблюдения настройки [Отключить кэш](/docs/devtools/network/reference/#disable-cache) при загрузке карт источников. ([1407084](https://crbug.com/1407084))
<!-- - The **Elements** panel now instantly autofocuses on the first matching element in search results. ([1381853](https://crbug.com/1381853)) -->
- Вкладка **Элементы** (Elements) теперь моментально автоматически фокусируется на первом элементе, подходящем под запрос при поиске. ([1381853](https://crbug.com/1381853))
<!-- - Various fixes to improve the sourcemap and breakpoints reliability. ([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298](https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134)) -->
- Различные исправления для повышения надежности карты источников и точек останова. ([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298](https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134))
<!-- - To better facilitate debugging, DevTools now supports evaluating expressions with private class members. ([1381806](https://crbug.com/1381806)) -->
- Чтобы облегчить отладку, DevTools теперь поддерживает вычисление выражений с приватными элементами класса. ([1381806](https://crbug.com/1381806))
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q68fvo870weBVwupujqf.png", alt="Вычисление выражений с приватными элементами класса.", width="800", height="683" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

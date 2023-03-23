---
layout: 'layouts/blog-post.njk'
title: "Новинки DevTools (Chrome 109)"
authors:
  - jecelynyeen
date: 2023-01-15
description: 'Копирование шага как скрипта в Recorder, настоящее название функции при записи производительности и другое.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KEB7RjVoe2QnKMKQjonk.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-109
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  + 1. Remove the "draft: true" tag above when submitting PR
  + 2. Provide translations under each of the English commented original content
  + 3. Translate the "description" tag above
  + 4. Translate all the <img> alt text
  5. Update the sites/ru/_partials/devtools/whats-new.md file -->


<!-- ## Recorder: Copy as options for steps, in-page replay, step’s context menu {: #recorder } -->
## Recorder: опции копирования для шага, воспроизведение на странице, контекстное меню шага {: #recorder }
<!-- Не уверена, что «in-page replay» корректно перевести как «воспроизведение на странице» -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="Новые опции копирования во вкладке Recorder.", width="800", height="615" %}

<!-- Open an existing user flow in the **Recorder**. Previously, when you replayed the user flow, DevTools would always start the replay by navigating to or reloading the page. -->
Откройте существующий пользовательский сценарий во вкладке **Recorder**. Ранее, когда вы запускали сценарий, воспроизведение в DevTools всегда начиналось с перехода или перезагрузки страницы.

<!-- With the latest updates, the **Recorder** shows the navigation step separately. You can right-click and remove it to perform in-page replay!  -->
С последним обновлением **Recorder** показывает шаг навигации отдельно. Вы можете нажать правой клавишей мыши и удалить его для воспроизведения на странице.

<!-- Apart from that, you can right-click a step and copy it to the clipboard in the **Recorder* panel instead of exporting the whole user flow. It works with [extensions](https://goo.gle/recorder-extension) too. For example, try to copy a step as a [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. With this feature, you can update any existing script with ease. -->
Кроме того, вы можете кликнуть правой клавишей мыши на шаг и скопировать его в буфер обмена во вкладке **Recorder** вместо того, чтобы экспортировать весь пользовательский сценарий. Это работает и с [расширениями](https://goo.gle/recorder-extension) тоже. Например, попробуйте скопировать шаг как скрипт для [Nightwatch Test](https://bit.ly/nightwatch-recorder). С помощью этой функции вы можете легко обновить любой существующий скрипт.


<!-- Previously, you could access the step menu only through the 3-dot button. You can now right-click anywhere on the step to access the menu. -->
Ранее вы могли открывать меню шага только по нажатию на кнопку с тремя точками. Теперь вы можете кликнуть правой клавишей в любом месте шага для вызова меню.

Задачи в трекере Chromium: [1322313](https://crbug.com/1322313), [1351649](https://crbug.com/1351649), [1322313](https://crbug.com/1322313), [1339767](https://crbug.com/1339767)


<!-- ## Show actual function names in performance’s recordings {: #performance } -->
## Показ настоящих названий функций в записях производительности {: #performance }

<!-- The **Performance** panel now shows the actual function names and their sources in the trace if there’s a sourcemap. -->
Во вкладке **Производительность** (Performance) теперь показываются фактические имена функций и их источник в трассировке, если есть карта источников.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="Как имена функций показываются во вкладке Производительность: до и после обновления.", width="800", height="509" %}

<!-- In this example, a source file is minified during production. For example, the `sayHi` function is minified as `n`, and the `takeABreak` function is minified as `o` in this [demo](https://clinquant-mousse-2f2396.netlify.app/). -->
В этом примере исходный файл был минифицирован по время сборки. Например, имя функции `sayHi` было минифицировано до `n`, и `takeABreak` было минифицировано до `o` в этом [демо](https://clinquant-mousse-2f2396.netlify.app/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="Показ файла до и после минификации.", width="800", height="392" %}

<!-- Previously, when you recorded a trace in the **Performance** panel, the trace only showed you the minified function names. This made it harder to debug.  -->
Ранее, когда вы записывали трассировку во вкладке **Производительность** (Performance), в трассировке показывались только минифицированные имена функций. Это затрудняло отладку.

<!-- With the latest changes, DevTools now reads the source map and shows the actual function names and source location.  -->
С последним обновлением DevTools читает карту источников и показывает фактические имена функций и их положение в исходниках.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4be8b5bcc00889ca35a455aa093ec242dce8ce6c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24d850860bda04864069e6c0d4dab32c8f53bc7f  #}

Задачи в трекере Chromium: [1364601](https://crbug.com/1364601), [1364601](https://crbug.com/1364601)


<!-- ## New keyboard shortcuts in the Console & Sources panel {: #keyboard-shortcuts } -->
## Новые горячие клавиши во вкладках Консоль (Console) и Источники (Sources) {: #keyboard-shortcuts }

<!-- You can switch between tabs in the **Sources** panel using: -->
Вы можете переключаться между табами во вкладке **Источники** (Sources) при помощи:
<!-- On MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd> -->
На MacOS <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Стрелка вверх</kbd> или <kbd>вниз</kbd>
<!-- On Windows and Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd> -->
На Windows и Linux <kbd>Control</kbd> + <kbd>Page up</kbd> или <kbd>down</kbd>

<!-- Moreover, you can navigate the autocomplete suggestions with <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd> on MacOS, similar to [Emacs](https://www.gnu.org/software/emacs/). For example, you can type `window.` in the `Console` and use these shortcuts to navigate. -->
Кроме того, вы можете переключаться между предложениями автодополнения при помощи <kbd>Ctrl</kbd> + <kbd>N</kbd> и <kbd>Ctrl + P</kbd> на MacOS так же как в [Emacs](https://www.gnu.org/software/emacs/). Например, вы можете напечатать `window.` в Консоли (Console) и затем использовать эти горячие клавиши для навигации.

<!-- On top of that, DevTools now accepts <kbd>Arrow Right</kbd> for autocompletion only at the end of line. For example, an autocomplete dialog shows when you are editing something in the middle of the code. When you press the <kbd>Arrow Right</kbd> key, most likely, you want to set the cursor to the next position instead of autocomplete. This UX change better aligns with your authoring workflow. -->
В добавок к этому, DevTools теперь позволяет использовать клавишу <kbd>Стрелка вправо</kbd> для автодополнения только в конце строки. Например, диалоговое окно появляется, когда вы редактируете что-то в середине строки кода. Когда вы нажимаете клавишу <kbd>Стрелка вправо</kbd>, вы, скорее всего, хотите, чтобы курсор переместится на следующий символ вместо вставки автодополнения. Это изменение UX лучше согласуется с вашим рабочим процессом редактирования.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/686acb9789020a511405a53a13ad754a7e928c99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/09c3ceaa1605b29d1074d0cf310958bdb823149d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6468c740419d01d4e13c9ad914001959e78ca782 #}

Задачи в трекере Chromium: [1167965](https://crbug.com/1167965), [1172535](https://crbug.com/1172535),  [1371585](https://crbug.com/1371585). [1369503](https://crbug.com/1369503)


<!-- ## Improved JavaScript debugging {: #debugging } -->
## Улучшенная отладка JavaScript {: #debugging }

<!-- These are some JavaScript debugging improvements in this release: -->
Вот некоторые улучшения процесса отладки JavaScript в этом обновлении:

<!-- - `new.target` is a meta-property that lets you detect whether a function or constructor was called using the new operator. You can now log `new.target` in the **Console** to check its value during debugging. Previously, it would return errors when you entered `new.target`. -->
- `new.target` это мета-свойство, позволяющее определить, были ли функция или конструктор вызваны с помощью оператора new. Теперь вы можете логировать `new.target` в **Консоли** (Console) чтобы проверять значение во время отладки. Ранее при вводе `new.target` возвращались ошибки.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="Показано сравнение до и после внедрения new.target", width="800", height="499" %}
<!-- - A `WeakRef` object lets you hold a weak reference to another object, without preventing that object from getting garbage-collected. DevTools now shows an inline preview for the value and evaluates the weak reference directly in the console during debugging. Previously, you had to explicitly call “deref” on them to resolve it. -->
- Объект `WeakRef` позволяет хранить слабую ссылку на другой объект, не препятствуя работе сборщика мусора. DevTools теперь показывает предварительный просмотр значения и выполняет обработку слабой ссылки непосредственно в консоли во время отладки. Ранее для решения этой проблемы необходимо было непосредственно вызывать для них команду "deref".
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="Показано сравнение до и после появления WeakRef.", width="800", height="453" %} 
<!-- - Fixed inline preview for shadowed variable. Previously, the display value was incorrect.  -->
- Исправлен встроенный предварительный просмотр изменяемой переменной. Ранее значение отображалось некорректно.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="Показано сравнение до и после исправления показа значения изменяемой переменной.", width="800", height="519" %} 
<!-- - Deobfuscate variable names in `Generator` and `async` functions in the **Scope** pane in the **Sources** panel. -->
- Деобфускация имен переменных в функциях `Generator` и `async` в панели **Область действия** (Scope) на вкладке **Источники** (Sources).


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bec401b1934ca55f9d742ee68f72cca4de47931 #}
{# https://chromium.googlesource.com/v8/v8/+/b2892b5f24b7b97ad930356a9376b8a9b2a1d360 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b92fd6fc20ab07c9791f374e0e41c54863c7ad3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/17e5e4392d054dc0a3af46eefff7caef6b4ce975 #}

Задачи в трекере Chromium: [1267690](https://crbug.com/1267690), [1246863](https://crbug.com/1246863) [1371322](https://crbug.com/1371322), [1311637](https://crbug.com/1311637)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот ещё несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - Support more hints for inactive CSS properties in the **Styles** pane - inline height and width, flex and grid properties. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508)) -->
- Поддержка дополнительных подсказок для неактивных свойств CSS на панели **Стили** (Styles) — высота и ширина у строчных элементов, свойства флексбоксов и гридов. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508))
<!-- - Fixed syntax highlighting. It was not working properly since the recent [code editor](https://codemirror.net/) upgrade in DevTools. ([1290182](https://crbug.com//1290182)) -->
- Исправлена подсветка синтаксиса. Она работал неверно с момента обновления [редактора кода](https://codemirror.net/) в DevTools. ([1290182](https://crbug.com//1290182))
<!-- - Capture input change events properly after on blur event in the **Recorder**. ([1378488](https://crbug.com/1378488)) -->
- Правильное отслеживание событий изменения в поле ввода после события blur в **Recorder**. ([1378488](https://crbug.com/1378488))
<!-- - Update Puppeteer replay script on export for better debugging experience in the **Recorder**. ([1351649](https://crbug.com/1351649)) -->
- Обновлён экспорт скрипта для Puppeteer для улучшения опыта отладки в **Recorder**. ([1351649](https://crbug.com/1351649))
<!-- - Support record and replay in the **Recorder** for remote debugging. ([1185727](https://crbug.com/1185727))  -->
- Поддержка записи и воспроизведения в **Recorder** для удалённой отладки. ([1185727](https://crbug.com/1185727))
<!-- - Fixed parsing of special CSS variable names in `var()`. Previously, DevTools didn't support parsing variables with escaped characters like `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992)) -->
- Исправлен парсинг имён специальных CSS-переменных внутри `var()`. Ранее DevTools не поддерживал парсинг переменных с экранированными символами, например, `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7bbaba2b82bb3b8c90e8d47c1f36fba2182c5e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2767a58a7b4d306ce737c342d57e0fa330d8b08f  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b42002b898216e97acf94627d5d3d745a1ba1252 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0cdc185928246ca5b7e320763f8c942c8a1d2db  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55382b27eff3539c8aba42ea501eb8de4f7ba57c #}


<!-- ## [Experimental] Enhanced UX in managing breakpoints -->
## [Эксперимент] Улучшенный UX в интерфейсе управления точками останова

{% Aside %}
<!-- To enable the experiment, check **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** under **Settings** > **Experiments**. -->
Чтобы включить этот эксперимент, поставьте галочку напротив **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** в **Настройки** (Settings) > **Эксперименты** (Experiments).
{% endAside %}

<!-- The current **Breakpoints** pane provides little visual aid in overseeing all breakpoints. On top of that, frequently used actions are hidden behind the context menu. -->
Нынешняя панель **Точки останова** (Breakpoints) мало помогает при просмотре всех точек останова. Кроме того, часто используемые действия спрятаны в контекстном меню.

<!-- This experimental UX redesign aims at bringing structure into the **Breakpoints** pane and allow developers to have quick access to commonly used features, in particular editing and removing breakpoints. -->
Экспериментальный редизайн UX привносит структуру в панель **Точки останова** (Breakpoints) и предоставляет разработчикам быстрый доступ к основным функциям, в частности, к добавлению и удалению точки останова.

<!-- These are some highlights: -->
Основные моменты:

<!-- - Both pause options are in the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- Обе опции паузы теперь на панели **Точки останова** (Breakpoints). Они имеют текстовые метки, которые делают их интуитивно понянятными.
<!-- - Breakpoints are grouped by file, ordered by line/column number, and collapsible.** -->
- Точки останова сгруппированы по файлам, отсортированы по номерам строк или колонок и могут быть свернуты и развернуты.
<!-- - New options to remove and edit breakpoint when hovering over a breakpoint or file name in the **Breakpoint** pane. -->
- Новые опции удаления и правки точки останова при наведении курсора на нее или на имя файла в панели **Точки останова** (Breakpoints).

<!-- Read the full changes in our [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) and leave your feedback [here](https://crbug.com/1394686). -->
Читайте полный список изменений в нашем [RFC (закрыто)](https://github.com/ChromeDevTools/rfcs/discussions/3) и оставляйте свои отзывы [здесь](https://crbug.com/1394686).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ytfyl8qK5rkHQRTS3sXf.png", alt="Показана панель точек останова до и после редизайна", width="800", height="684" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2140378e0bb1687b263c226de01b741487ff324 #}
Задачи в трекере Chromium: [1346231](https://crbug.com/1346231), [1324904](https://crbug.com/1324904) 


<!-- ## [Experimental] Automatic in-place pretty print -->
## [Эксперимент] Автоматическое красивое форматирование внутри файла

{% Aside %}
<!-- To enable the experiment, check **Automatically pretty print in the Sources panel** under **Settings** > **Experiments**. -->
Чтобы включить этот эксперимент, поставьте галочку напротив **Automatically pretty print in the Sources panel** в **Настройки** (Settings) > **Эксперименты** (Experiments).
{% endAside %}

<!-- The **Sources** panel now automatically pretty print minified source files in-place. You can click on the **pretty print button `{ }` to underdo it. -->
Во вкладке **Источники** (Sources) минифицированные файлы теперь автоматически форматируются. Вы можете нажать на кнопку автоформатирования `{ }`, чтобы отменить это.

<!-- Previously, the **Sources** panel shows minified content by default. Developers need to click on the pretty print button manually to format the content. On top of that, the pretty printed content is not displayed in the same file, but in another `::formatted` tab. -->
Ранее на вкладке **Источники** (Sources) минифицированный контент по умолчанию отображался без форматирования. Разработчикам нужно было нажать на кнопку автоформатирования, чтобы удобно читать контент. Кроме того, ранее форматированный контент отображался не в том же файле, а на новой вкладке `::formatted`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Показан минифицированный файл до и после автоформатирования", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c96e7f4cdaf2009e5223553cabb606099f85569 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ea8fee1935d3c56dfea1edaa752af09579fffcc #}

Задача в трекере Chromium: [1164184](https://crbug.com/1164184)




{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

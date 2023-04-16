---
layout: 'layouts/blog-post.njk'
title: "Новинки DevTools (Chrome 112)"
authors:
  - jecelynyeen
date: 2023-03-09
description: "Поддержка расширений воспроизведения, поддержка наследования CSS, Lighthouse 10 и многое другое"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OVuupCrYNQixtXhcMwl6.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-112
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  + 1. Remove the "draft: true" tag above when submitting PR
  + 2. Provide translations under each of the English commented original content
  + 3. Translate the "description" tag above
  + 4. Translate all the <img> alt text
  + 5. Update the sites/ru/_partials/devtools/whats-new.md file -->


<!-- ## Recorder updates {: #recorder } -->
## Обновления Регистратора (Recorder) {: #recorder }

<!-- ### Replay extensions support {: #replay-extensions } -->
### Поддержка расширений воспроизведения {: #replay-extensions }

<!-- The **Recorder** introduces support for custom replay options that you can embed into DevTools with an extension. -->
**Регистратор** (Recorder) теперь поддерживает пользовательские опции воспроизведения, которые можно встроить в DevTools с помощью расширений.

<!-- Try out the [example extension](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Select the new custom replay option to open the custom replay UI. -->
Попробуйте [тестовое расширение](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension-replay). Выберите пользовательскую опцию перед воспроизведением записи в новом UI.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CAQFVtHyds7ByB0YMZht.png", alt="Пользовательский UI воспроизведения.", width="800", height="563" %}

<!-- To customize the **Recorder** to your needs and integrate it with your tools, consider developing your own extension: explore the [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) and check out more [extension examples](https://github.com/puppeteer/replay/tree/main/examples/). -->
Чтобы кастомизировать **Регистратор** (Recorder) под ваши нужды и интегрировать его с вашими инструментами, рассмотрите возможность разрботки собственного расширения: изучите [chrome.devtools.recorder API](/docs/extensions/reference/devtools_recorder/) и посмотрите на другие [примеры расширений](https://github.com/puppeteer/replay/tree/main/examples/).

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/c2102177581f1c74d38502f469d99b20c1835b1c #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e304e064dbead1d684b5c61f4fb308b101b4a66b #}

Задача в трекере Chromium: [1400243](https://crbug.com/1400243).

<!-- ### Record with pierce selectors {: #pierce-selectors } -->
### Запись со сквозными селекторами {: #pierce-selectors }

<!-- In addition to [custom, CSS, ARIA, text, and XPath selectors](/docs/devtools/recorder/reference/#selector), you can now record using [pierce selectors](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). These selectors behave like CSS ones but can also pierce through shadow roots. -->
В дополнение к [кастомным селекторам, селекторм CSS, ARIA, по тексту и селекторам XPath](/docs/devtools/recorder/reference/#selector), теперь вы можете вести запись с использованием [сквозных селекторов](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce). Эти селекторы ведут себя подобно селекторам CSS, но могут также проходить через теневые элементы.

<!-- Start a new recording on a page with [shadow DOM](https://web.dev/shadowdom-v1/) and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce** in **Selector types to record**. Record your interaction with elements in the shadow DOM and inspect the corresponding step. -->
Начните новую запись на странице, где есть [shadow DOM](https://web.dev/shadowdom-v1/) и включите настройку {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Скваозные** (Pierce) в разделе **Типы селекторов для записи** (Selector types to record). Запишите свое взаимодействие с элементами в теневом DOM и изучите соответствующий шаг.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Spqbf2DG3Fr0D2sc1kgC.png", alt="Настройка Регистратора для использования сквозных селекторов; Сквозной слектор в действии.", width="800", height="534" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/a3968d1c01dd4d1a00b9aa13c50bfdc66995879e #}

Задача в трекере Chromium: [1411188](https://crbug.com/1411188).

<!-- ### Export as a Puppeteer script with Lighthouse analysis {: #puppeteer-lighthouse } -->
### Экспорт скриптов для Puppeteer вместе со аналитикой Lighthouse {: #puppeteer-lighthouse }

<!-- The **Recorder** introduces a new export option: **Puppeteer (including Lighthouse analysis)**. With [Puppeteer](/docs/puppeteer/), you can automate and control Chrome. With [Lighthouse](/docs/lighthouse/), you can capture and improve your website's performance. -->
**Регистратор** (Recorder) предоставляет новую опцию экспорта: **Puppeteer (including Lighthouse analysis)**. Благодаря [Puppeteer](/docs/puppeteer/) вы можете автоматизировать и контролировать Chrome. С помощью [Lighthouse](/docs/lighthouse/) вы можете фиксировать и улучшать показатели вашего сайта.

<!-- Open your recording, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export**, select the new option, and save the `.js` file. -->
Откройте запись, кликните на иконку {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Экспорт** (Export), выберите новую опцию и сохраните файл `.js`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ko6OD4tgGwUxqCJScYr9.png", alt="Export Puppeteer (including Lighthouse analysis).", width="800", height="584" %}

<!-- [Run the Puppeteer script](/docs/puppeteer/get-started/) to get a Lighthouse report in a `flow.report.html` file. -->
[Запустите скрипт Puppeteer](/docs/puppeteer/get-started/) чтобы увидеть отчёт Lighthouse в файле `flow.report.html`.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="Отчёт Lighthouse, открытый в Chrome.", width="800", height="690" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fcaf72d9134e54140cab41c011b7520dd168a340 #}

<!-- ### Get extensions {: #get-extensions } -->
### Показать расширения {: #get-extensions }

<!-- Explore options to customize your recorder experience, for example, with custom export options. Get extensions for the **Recorder** by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Export** > **Get extensions** in a recording. -->
Изучите возможности настройки регистратора, например, с помощью пользовательских опций экспорта. Посмотрите расширения для **Регистратора** (Recorder), кликнув на {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="Export.", width="20", height="20" %} **Экспорт** (Export) > **Показать расширения** (Get extensions) в записи.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vwgXoxR0FyArbCHvdvEY.png", alt="Опция Показать расширения в выпадающем меню экспорта.", width="800", height="649" %}

<!-- Feel free to [add your own extension](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) to the list of [Recorder Extensions](/docs/devtools/recorder/extensions/). We look forward to seeing yours on the list! -->
Свободно [добавляйте свои собственные расширения](https://github.com/GoogleChrome/developer.chrome.com/edit/main/site/en/docs/devtools/recorder/extensions/index.md) в список [Расширений Регистратора](/docs/devtools/recorder/extensions/). Мы с нетерпением ждём появления в списке вашего расширения!

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/21e3d3275c47df8b79c72d1a3e8f9d26cc11fc04 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/b6d02827539eb54869cbb75d3705782bfd2c95ae #}

Задача в трекере Chromiums: [1417104](https://crbug.com/1417104), [1413168](https://crbug.com/1413168).

<!-- ## Elements > Styles updates {: #elements-styles } -->
## Обновления вкладки Элементы > Стили {: #elements-styles }

<!-- ### CSS documentation {: #css } -->
### Документация CSS {: #css }

<!-- How many times a day do you look up documentation on CSS properties? The **Elements** > **Styles** pane now shows you a short description when you hover over a property. -->
Как много раз в день вы заглядываете в документацию в поисках информации про свойства CSS? Вкладка **Элементы** (Elements) > **Стили** (Styles) теперь показывает короткое описание когда вы наподите курсор на свойство.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="Всплывающая подсказка о свойстве CSS.", width="800", height="651" %}

<!-- The tooltip also has a **Learn more** link that takes you to an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on this property. -->
Всплвающая подсказка также содержит ссылку **Подробнее** (Learn more), по которой вы перейдёте на страницу свойства в [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference).

<!-- If you know CSS well, you might find the tooltips bothersome. To turn them all off, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Don't show**. -->
Если вы хорошо знаете CSS, то всплывающие подсказки могут вас раздражать. Чтобы выключить их, кликните {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Не показывать** (Don't show).

<!-- To turn them back on, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Elements**](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip**. -->
Чтобы включить их обратно, кликните {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Настройки** (Settings) > **Параметры** (Preferences) > **Элементы** (Elements)](/docs/devtools/settings/preferences/#elements) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Показывать подсказки из документации CSS** (Show CSS documentation tooltip).

{% Aside %}
<!-- DevTools pulls the descriptions for tooltips from [VS Code Custom Data](https://github.com/microsoft/vscode-custom-data). -->
DevTools берет описания для всплывающих подсказок из VS Code Custom Data](https://github.com/microsoft/vscode-custom-data).
{% endAside %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f5266ee227449dbbc3bc599df1b38cdb36cae4cb #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4748c98971bfff697f209fe11de892a5b93aca6 #}

Задача в трекере Chromium: [1401107](https://crbug.com/1401107).

<!-- ### CSS nesting support {: #nesting } -->
### Поддержка наследования CSS {: #nesting }

<!-- The **Elements** > **Styles** pane now recognizes [CSS Nesting](/articles/css-nesting/) syntax and applies nested styles to the right elements. -->
На вкладке **Элементы** (Elements) > **Стили** (Styles) теперь распознаётся синтаксис [CSS наследование](/articles/css-nesting/) и применяет вложенные стили к нужным элементам.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wog2uOaJTV84OtXcHpYH.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1ed9b6180cb75fcfd43dfac95ac9a40c35e03df #}

Задача в трекере Chromium: [1172985](https://crbug.com/1172985).

<!-- ## Marking logpoints and conditional breakpoints in the Console {: #logpoint } -->
## Отметка точек логирования и условных точек останова в Консоли (Console) {: #logpoint }

<!-- Further improving the [enhanced breakpoint UX](/blog/new-in-devtools-111/#breakpoint-redesign), the **Console** now marks messages triggered by breakpoints: -->
Благодаря улучшению [UX расширенных точек останова](/blog/new-in-devtools-111/#breakpoint-redesign), **Консоль** (Console) теперь помечает сообщения, запускаемые точками останова:

<!-- - `console.*` calls in [conditional breakpoints](/docs/devtools/javascript/breakpoints/#conditional-loc) with an orange question mark `?` -->
<!-- - [Logpoint](/docs/devtools/javascript/breakpoints/#log-loc) messages with pink two dots `..` -->
- `console.*` вызванные в [условных точках останова](/docs/devtools/javascript/breakpoints/#conditional-loc) помечены знаком вопроса `?` на оранжевом фоне
- Сообщения [точек логирования](/docs/devtools/javascript/breakpoints/#log-loc) помечены двумя точками `..` на розовом фоне.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5udIX9W4LFcDb3H6DuDp.png", alt="Изменения в том, как консоль теперь отображает сообщения, вызванные точками останова: с иконками и правильной ссылкой на источник.", width="800", height="566" %}

<!-- The **Console** now gives you proper anchor links to breakpoints in source files instead of `VM<number>` scripts that Chrome creates to run any piece of Javascript on [V8](https://v8.dev/). -->
**Консоль** (Console) теперь дает вам правильные якорные ссылки на точки останова в исходных файлах вместо скриптов `VM<number>`, которые Chrome создает для запуска любого фрагмента Javascript на [V8](https://v8.dev/).

<!-- Click the link next to the breakpoint message to jump directly to the breakpoint editor. -->
Кликните ссылку рядом с сообщением о точке останова, чтобы перейти непосредственно в редактор.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8lAz0lb168HXKvhscP2Q.png", alt="Ссылка рядом с сообщением точкой логирования, которая открывает редактор точек останова.", width="800", height="811" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c845a441b0fe05c22f88cdb23463edee2b5985b7 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9762db476cd7414d3ce351f32a0564421f66901f #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/42448cc63567ac407fd2088597da83aff17c5b55 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4739f48e50d41025aba3c2af94e61cc3069aa563 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bb0e41ed3c30bd988c49a76f0cf084f58c0bddc2 #}

Задача в трекере Chromium: [1027458](https://crbug.com/1027458).

<!-- ## Ignore irrelevant scripts during debugging {: #ignore-list } -->
## Игнорирование нерелевантных скриптов во время отладки {: #ignore-list }

<!-- To help you focus on the most important parts of your code, you can now add irrelevant scripts to the **Ignore List** right from the file tree on the **Sources** > **Page** pane. -->
Чтобы вы сфокусировались на самых важных частях кода, можно добавить нерелевантные скрипты в **Список игнорируемых** (Ignore List) прямо из дерева файлов на вкладке **Источники** (Sources) > **Страница** (Page).

<!-- Right-click any script or folder and select one of the ignore-related options. You may see options to add or remove the script or folder to and from the list. The [Debugger ignores scripts](/docs/devtools/javascript/reference/#show-ignore-listed-frames) added to the list and omits them in the call stack.  -->
Кликните правой мышкой на любом файле скрипта или на папке, а затем выберите опцию добавления в игнор. Вы можете видеть опции добавления в список или исключения скрипта из списка игнорируемых. [Игнорируемые отладчиком скрипты](/docs/devtools/javascript/reference/#show-ignore-listed-frames) добавляются в список и игнорируются в стеке вызовов.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RrL7ZmzMjfhtH4gUW3ST.png", alt="Контекстные меню папки и скрипта с опциями, связанными с игнорированием.", width="800", height="521" %}

<!-- All ignore-listed scripts and folders are grayed out in the file tree. -->
Все игнорируемые скрипты и папки отображаются серым цветом в дереве файлов.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/DRI11RoakrLnwLZPOJPO.png", alt="Скрипты и папки, включенные в список игнорирования, выделены серым цветом, вы можете скрыть их с помощью экспериментальной опции в выпадающем меню Дополнительных опций.", width="800", height="542" %}

<!-- If you select an ignored script, the **Configure** button takes you to 
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Ignore List**](/docs/devtools/settings/ignore-list/). You can also hide ignored sources from the file tree with {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} > [**Hide ignore-listed sources**](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}. -->
Если вы выберите игнорируемый скрипт, то кнопка **Настроить** (Configure) перенаправит вас в {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Настройки** (Settings) > **Список игнорируемых** (Ignore List)](/docs/devtools/settings/ignore-list/). Вы также можете скрыть все игнорируемые источники из дерева файлов при помощи {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot menu.", width="24", height="24" %} > [**Скрыть источники из из списка игнорируемых** (Hide ignore-listed sources)](/docs/devtools/javascript/reference/#hide-ignore-listed) {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XfSWf04g2cwpnFcmp40m.svg", alt="Experimental.", width="20", height="20" %}.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e95d2f3fd27301945a1a095bae4bbcad57326cd8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/736762eda6a6f30d0e9c383998624e53ee04a6e2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2257f7bca42753d744b56f5b99b461a6f0494131 #}

Задача в трекере Chromium: [883325](https://crbug.com/883325).

<!-- ## JavaScript Profiler deprecation started {: #js-profiler-deprecation } -->
## Начало постепенного удаления Профилировщика JavaScript {: #js-profiler-deprecation }

<!-- As early as [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/), the DevTools team planned to eventually deprecate the **JavaScript Profiler** and have Node.js and Deno developers use the **Performance** panel for profiling JavaScript CPU performance. -->
Начиная с [Chrome 58](/blog/devtools-javascript-cpu-profile-migration-2/) команда разработчиков DevTools планировала отказаться от **Профилировщика JavaScript** (JavaScript Profiler) и перенаправить разработчиков Node.js и Deno во вкладку **Производительность** (Performance) для профилирования производительности процессора JavaScript. 

<!-- This DevTools version (112) starts the [four-phase **JavaScript Profiler** deprecation](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). The **JavaScript Profiler** panel now shows the corresponding warning banner. -->
Текущая версия DevTools (112) положила начало [четырехфазному отказу от **Профилировщика JavaScript** (JavaScript Profiler)](https://github.com/ChromeDevTools/rfcs/discussions/2#discussioncomment-5189668). На вкладке **Профилировщика JavaScript** (JavaScript Profiler) теперь показывается соответствующий баннер с предупреждением.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v4S5YWGdBV3nbc3OkGZ3.png", alt="Баннер об устаревании в верхней части Профилировщика.", width="800", height="712" %}

<!-- Instead of the **Profiler**, use the [**Performance**](/docs/devtools/performance/reference/#main) panel to profile CPU. -->
Вместо **Профайлера** (Profiler) используйте вкладку [**Производительность** (Performance)](/docs/devtools/performance/reference/#main) для профилирования CPU.

<!-- Learn more and provide feedback in the corresponding [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) and [crbug.com/1354548](https://crbug.com/1354548).  -->
Читайте больше и оставляйте фидбэк в соответствующем [RFC](https://github.com/ChromeDevTools/rfcs/discussions/2) и в [crbug.com/1354548](https://crbug.com/1354548).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/71244f613a27289936b979fe515346137d0190f8 #}

Задача в трекере Chromium: [1417647](https://crbug.com/1417647).

<!-- ## Emulate reduced contrast {: #reduced-contrast } -->
## Эмуляция пониженной контрастности {: #reduced-contrast }

<!-- The [**Rendering**](/docs/devtools/rendering/#open-rendering) tab adds a new option to the [Emulate vision deficiencies](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) list—**Reduced contrast**. With this option, you can discover how your website looks to people with reduced contrast sensitivity. -->
На вкладке [**Отрисовка** (Rendering)](/docs/devtools/rendering/#open-rendering) добавлена новая опция в список [эмуляции дефектов зрения](/docs/devtools/rendering/apply-effects/#emulate-vision-deficiencies) — **Пониженный контраст** (Reduced contrast). С этой опцией вы можете изучить как ваш вебсайт будет выглядеть для людей с нарушением восприятия контраста.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7qrlmuO7R47l5mytvoeQ.png", alt="Опция пониженной контрастности в меню Отрисовка > Эмулировать дефекты зрения.", width="800", height="574" %}

<!-- Note that the list options have been updated to tell you what color insensitivity the options represent. -->
Обратите внимание, что параметры списка были обновлены, чтобы сообщить вам, какую цветовую невосприимчивость представляет конкретная опция.

<!-- With DevTools, you can find and fix all contrast issues at once. For more information, see [Make your website more readable](/docs/devtools/accessibility/contrast/). -->
С помощью DevTools вы можете найти и устранить все проблемы с контрастностью разом. Для получения дополнительной информации читайте статью [Как сделать ваш сайт более читабельным](/docs/devtools/accessibility/contrast/).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0eaaa173c9e2cd357c99f7a275fe1819b86f0b9a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/768af28f8cf64e10d23b10556b59dc0770cc14b6  #}

Задача в трекере Chromiums: [1412719](https://crbug.com/1412719), [1412721](https://crbug.com/1412721).

<!-- ## Lighthouse 10 {: #lighthouse } -->
## Lighthouse 10 {: #lighthouse }

<!-- The **Lighthouse** panel now runs [Lighthouse 10.0.1](/blog/lighthouse-10-0/). For more details, see [What's new in Lighthouse 10.0.1](/blog/lighthouse-10-0/). -->
Вкладка **Lighthouse** теперь работает на [Lighthouse 10.0.1](/blog/lighthouse-10-0/). Чтобы узнать больше, читайте [What's new in Lighthouse 10.0.1](/blog/lighthouse-10-0/).

<!-- **Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Legacy navigation** is now disabled by default. This option uses legacy [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) in navigation mode. -->
**Lighthouse** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Устаревший режим навигации** (Legacy navigation) теперь отключен по умолчанию. Эта опция использует устаревшую [конфигурацию Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md) в режиме навигации.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mYuX9d2TFaJuWBOYGN5R.png", alt="Отключена устаревшая навигация.", width="800", height="548" %}

<!-- Lighthouse 10 now uses Moto G Power as the [default emulation device](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools added this device to {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Devices**](/docs/devtools/settings/devices/). -->
Lighthouse 10 теперь использует Moto G Power как [стандартное устройство эмуляции](https://github.com/GoogleChrome/lighthouse/pull/14674). DevTools добавили это устройство в {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Настройки** (Settings) > **Устройства** (Devices)](/docs/devtools/settings/devices/).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GpqmLAiuNasdRsfisVS7.png", alt="Moto G Power в списке устройств.", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f9f7b395e2965356dfcaed026b5a1d141c19c6 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de6c4e5973980ad98d7d1699faa4e1059f102c4d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8a6ca7d24e2fa33c6adfef22ee708f489657dee2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24e50e4e50bc6e19930df75385c316ba866e9588 #}

Задача в трекере Chromium: [772558](https://crbug.com/772558).

<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот ещё несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - The [**Sources** > **Breakpoints**](/docs/devtools/javascript/breakpoints/#manage-loc) pane now shows differentiating file paths next to ambiguous file names ([1403924](crbug.com/1403924)). -->
- Вкладка [**Источники** (Sources) > **Точки останова** (Breakpoints)](/docs/devtools/javascript/breakpoints/#manage-loc) теперь показывает различимые пути к файлам рядом с неоднозначными именами файлов ([1403924](crbug.com/1403924)).
<!-- - The [**Main** section](/docs/devtools/performance/reference/#main) in the flame chart of the **Performance** panel now designates `CpuProfiler::StartProfiling` as `Profiler Overhead` ([1358602](https://crbug.com/1358602)). -->
- [Секция **Основной** (Main)](/docs/devtools/performance/reference/#main) в графике вспышек на панели **Производительность** теперь обозначает `CpuProfiler::StartProfiling` as `Profiler Overhead` ([1358602](https://crbug.com/1358602)).
<!-- - DevTools improved autocompletion: -->
- Улучшенное автодополнение DevTools:
<!--   - **Sources**: Consistent completions of any word ([1320204](https://crbug.com/1320204)). -->
  - **Источники** (Sources): Последовательное завершение любого слова ([1320204](https://crbug.com/1320204)).
<!--   - **Console**: `Arrow down` selects the first suggestion and suggestions get `Tab` hints ([1276960](https://crbug.com/1276960)). -->
  - **Консоль** (Console): `Стрелка вниз` выбирает первое из предложений, а также предложения получили подсказки `Tab`.
<!-- - DevTools added an [event listener breakpoint](/docs/devtools/javascript/breakpoints/#event-listeners) to let you pause when you open a [Document Picture-in-Picture window](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)). -->
  - В DevTools добавлен [слушатель событий точек останова](/docs/devtools/javascript/breakpoints/#event-listeners) что позволяет сделать паузу при открытии [окна документа в режиме картинка-в-картинке](https://wicg.github.io/document-picture-in-picture/#dom-documentpictureinpicture-onenter) ([1315352](https://crbug.com/1315352)).
<!-- - DevTools set up a workaround that properly displays Vue2 webpack artifacts as JavaScript ([1416562](https://crbug.com/1416562)). -->
  - В DevTools внедрено альтернативное решение, которое позволяет правильно отображать артефакты Vue2 webpack как JavaScript ([1416562](https://crbug.com/1416562)).
<!-- - A [**Console** setting](/docs/devtools/settings/preferences/#console) gets a better name: Automatically expand console.trace() messages. ([1139616](https://crbug.com/1139616)). -->
  - В [настройках **Консоли** (Console)](/docs/devtools/settings/preferences/#console) улучшили наименования: Автоматическое развертывание сообщений `console.trace()` ([1139616](https://crbug.com/1139616)).


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

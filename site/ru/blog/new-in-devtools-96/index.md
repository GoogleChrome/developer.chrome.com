---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 96)"
authors:
  - jecelynyeen
date: 2021-09-20
updated: 2021-09-20
description:
    "Новая вкладка Обзор CSS, Эмуляция CSS-медиафункции prefers-contrast, Эмулируйте функцию создания автоматической тёмной темы в Chrome и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JztTYTKPDMXDTEs1cYfI.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-96
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- Remember to update the whats-new.md file as well -->
<!-- end: translation instructions -->

*Переводы предоставлены [Alena Batitskaya](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='3CXbhnaFNEw' %}

<!-- ## Preview feature: New CSS Overview panel {: #css-overview } -->
## Ранний доступ: Новая вкладка Обзор CSS {: #css-overview }

<!-- Use the new **CSS Overview** panel to identify potential CSS improvements on your page.
[Open the **CSS Overview** panel](/docs/devtools/css-overview#open), then click on **Capture overview** to generate a report of your page’s CSS. -->
Используйте новую вкладку **Обзор CSS** (CSS Overview), чтобы выявить возможные улучшения CSS на вашем сайте.
[Откройте вкладку **Обзор CSS** (CSS Overview)](/docs/devtools/css-overview#open), затем кликните на кнопку **Capture overview**, чтобы сгенерировать отчёт о CSS на вашей странице.

<!-- You can further drill down on the information. For example, click on a color in the **Colors** section to view the list of elements that apply the same color. Click on an element to open the element in the **Elements** panel. -->
Можно получить и более подробную информацию. Например, кликните на цвет в секции **Цвета**, чтобы увидеть список всех элементов, к которым применяется выбранный цвет. Кликните на элемент, чтобы увидеть его на вкладке **Элементы** (Elements).


<!-- The **CSS Overview** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/css-overview-feedback) for further enhancements. -->
Вкладка **Обзор CSS** (CSS Overview) пока в раннем доступе. Наша команда все еще активно работает над ней, и мы ждем [ваши отзывы](https://goo.gle/css-overview-feedback) для дальнейших улучшений.

<!-- Read [this article](/docs/devtools/css-overview) to learn more on the **CSS Overview** panel. -->
Читайте [эту статью](/docs/devtools/css-overview), чтобы узнать больше о вкладке **Обзор CSS** (CSS Overview).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="Вкладка Обзор CSS", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Задача в трекере Chromium: [1254557](https://crbug.com/1254557)


<!-- ## Restored and improved CSS length edit and copy experince {: #length } -->
## Восстановлен и улучшен опыт редактирования и копирования длины в CSS {: #length }

<!-- The **copy CSS** and **edit as text** experience are restored for CSS properties with length. These experiences are broken in the last release. -->
Восстановлена возможность **копировать CSS** и **исправлять как текст** для CSS-свойств с единицами измерения длины. В предыдущем релизе это не работало.

<!-- {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %} -->
{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

<!-- In addition, you can drag to adjust the unit value and update the unit type via the dropdown. This add-on length authoring feature should not impact the primary edit as text experience. -->
Кроме того, значение можно изменять перетаскиванием, а единицы измерения задавать с помощью выпадающего списка. Эта дополнительная возможность редактирования не влияет на основное редактирование в виде текста.

<!-- {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %} -->
{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %}

<!-- Please report via [goo.gle/length-feedback](https://goo.gle/length-feedback) if you found any issues. -->
Пожалуйста, пишите через [goo.gle/length-feedback](https://goo.gle/length-feedback) если встретите любые сложности.

<!-- You can disable it via the **Settings** > **Experiments** > **Enable CSS length authoring tools in the Styles pane** checkbox. -->
Вы можете отключить эти функции, сняв галочку с чекбокса **Настройки** (Settings) > **Экспериментальные функции** (Experiments) > **Enable CSS length authoring tools in the Styles pane**.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0042092ccbcdfb5b113c28b9a58c2cf1219b10c4 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c8f39d4c60841439ebf75d1a2d8fdfe50e1355a9 #}

<!-- Chromium issues: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993) -->
Задачи в трекере Chromium: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993)


<!-- ## Rendering tab updates  -->
## Обновления вкладки Отрисовка (Rendering)

<!-- ### Emulate the CSS prefers-contrast media feature {: #prefers-contrast } -->
### Эмуляция CSS-медиафункции prefers-contrast {: #prefers-contrast }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="Эмуляция CSS-медиафункции prefers-contrast", width="800", height="483" %}

<!-- The [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) media feature is used to detect if the user has requested more or less contrast in the page. -->
Медиафункция [prefers-contrast](https://www.chromestatus.com/feature/5646323212615680) используется, чтобы определить, запросил ли пользователь больший или меньший контраст на странице.

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature prefers-contrast** dropdown. -->
Откройте [Командное меню (Command Menu)](/docs/devtools/command-menu/), выполните команду **Показать "Отрисовка"** (Show Rendering) и выберите нужное значение в выпадающем меню **Эмулировать медиафункцию CSS prefers-contrast** (Emulate CSS media feature prefers-contrast).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22cec8dbfa7b46c8b633e3555212556ec6f78df9 #}

Задача в трекере Chromium: [1139777](https://crbug.com/1139777)


<!-- ### Emulate the Chrome’s Auto Dark Theme feature {: #auto-dark-mode } -->
### Эмулируйте функцию создания автоматической тёмной темы в Chrome {: #auto-dark-mode }

<!-- Use DevTools to emulate auto dark theme to easily see how your page looks when Chrome’s [Auto Dark Theme](/blog/auto-dark-theme/) is enabled. -->
Используйте DevTools, чтобы эмулировать автоматическую тёмную тему и увидеть, как будет выглядеть ваша страница, если в Chrome включена функция [Auto Dark Theme](/blog/auto-dark-theme/).

<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System.  -->
Chrome 96 включает [origin trial](/blog/origin-trials/) функции [Auto Dark Theme](/blog/auto-dark-theme/) на Android. С этой функцией браузер применяет автоматически сгенерированную тёмную тему на сайтах со светлой цветовой схемой, когда пользователь включает тёмные темы в операционной системе.

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate auto dark mode** dropdown. -->
Откройте [Командное меню (Command Menu)](/docs/devtools/command-menu/), запустите команду **Показать "Отрисовка"** (Show Rendering) и выберите значение **Эмулировать автоматическую тёмную тему** (Emulate auto dark mode) в выпадающем меню.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="Эмуляция функции создания автоматической тёмной темы в Chrome", width="800", height="483" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0d7e03ffa64ba8432ec9db3e067abeb60cd53d7e #}

Задача в трекере Chromium: [1243309](https://crbug.com/1243309)


<!-- ## Copy declarations as JavaScript in the Styles pane {: #copy-as-js } -->
## Копируйте объявления как JavaScript в панели Стилей (Styles) {: #copy-as-js }

<!-- Two new options are added in the context menu  for you to easily copy CSS rules as JavaScript properties. These shortcuts options are handy especially for developers who are working with [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js)  libraries. -->
Две новые опции добавлены в контекстное меню для облегчения копирования CSS-правил как JavaScript-свойств. Эти опции особенно удобны для разработчиков, работающих с [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js) библиотеками.

<!-- In the **Styles** pane, right click on a CSS rule. You can select **Copy declaration as JS** to copy a single rule or **Copy all declarations as JS** to copy all rules. -->
В панели **Стили** (Styles) кликните правой кнопкой мыши на CSS-правиле.  Вы можете выбрать **Копировать объявление как JS** (Copy declaration as JS), чтобы скопировать одно правило, или **Копировать все объявления как JS** (Copy all declarations as JS), чтобы скопировать все правила.

<!-- For instance, the example below will copy `padding-left: '1.5rem'` to the clipboard. -->
В частности, пример ниже скопирует `padding-left: '1.5rem'` в буфер обмена.

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="Copy declaration as JavaScript", width="800", height="469" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="Копировать объявление как JS", width="800", height="469" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca17a55104e6baf8d4ab360b484111bfa93c9b7f #}

Задача в трекере Chromium: [1253635](https://crbug.com/1253635)


<!-- ## New Payload tab in the Network panel {: #payload } -->
## Новая вкладка Полезная нагрузка (Payload) на вкладке Сеть {: #payload }

<!-- Use the new **Payload** tab in the **Network** panel when you inspect a network request with payload. Previously, the payload information is available under the **Headers** tab. -->
Используйте новую вкладку **Полезная нагрузка** (Payload) на вкладке **Сеть** (Network), когда вы исследуете сетевой запрос с полезной нагрузкой. Ранее информация о полезной нагрузке была доступна на вкладке **Заголовки** (Headers).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="Панель Полезная нагрузка на вкладке Сеть", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eae72f667aa10a1a8316fbf8b2ac03ff514bb4da #}

Задача в трекере Chromium: [1214030](https://crbug.com/1214030)


<!-- ## Improved the display of properties in the Properties pane {: #properties } -->
## Улучшенное отображение свойств в панели Свойства (Properties) {: #properties }

<!-- The **Properties** pane now shows only relevant properties instead of showing all properties of the instance. DOM prototypes and methods are now removed. -->
Панель **Свойства** (Properties) теперь показывает только соответствующие свойства вместо всех свойств экземпляра.

<!-- Together with the **Properties** pane [enhancements](/blog/new-in-devtools-95/#properties) in Chrome 95, you can now locate the relevant properties easier. -->
Вместе с [улучшением](/blog/new-in-devtools-95/#properties) вкладки **Свойства** (Properties) в Chrome 95 вы теперь можете легче находить соответствующие свойства.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="Отображение свойств в панели Свойства", width="800", height="387" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1574e9b550317c481a943fec059d84bfb863564 #}

Задача в трекере Chromium: [1226262](https://crbug.com/1226262) 


<!-- ## Console updates -->
## Обновления Консоли

<!-- ### Option to hide CORS errors in the Console {: #hide-cors-errors } -->
### Опция для скрытия ошибок CORS в Консоли {: #hide-cors-errors }

<!-- You can hide CORS errors in the **Console**. As the CORS errors are now reported in the Issues tab, hiding CORS errors in the **Console** can help reduce the clutters. -->
Вы можете скрыть ошибки CORS в **Консоли** (Console). Поскольку ошибки CORS теперь показываются в панели Проблемы (Issues), панель **Консоль** (Console) выглядит менее загроможденной.

<!-- In the **Console**, click on the **Settings** icon and uncheck the **Show CORS errors in console** checkbox. -->
В **Консоли** (Console) кликните на иконку **Настройки** (Settings) и уберите галочку с чекбокса **Показывать ошибки CORS в консоли** (Show CORS errors in console).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="Опция для скрытия ошибок CORS в Консоли", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/82873eeb1c1430790ad3a2cd2a698135bd6eb3de #}

Задача в трекере Chromium: [1251176](https://crbug.com/1251176)


<!-- ### Proper `Intl` objects preview and evaluation in the Console {: #intl } -->
### Правильный предварительный просмотр и оценка объектов `Intl` в Консоли {: #intl }

<!-- The [Intl](https://tc39.es/ecma402/#intl-object) objects have proper preview now and are evaluated eagerly in the Console. Previously, the `Intl` objects were not evaluated eagerly. -->
Объекты [Intl](https://tc39.es/ecma402/#intl-object) теперь имеют удобный предварительный просмотр и быстро оцениваются в Консоли (Console). Ранее объекты `Intl` не подвергались энергичным вычислениям.

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Intl objects in the Console", width="800", height="559" %} -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Объекты Intl в Консоли", width="800", height="559" %}

{# https://chromium-review.googlesource.com/c/v8/v8/+/3196175 #}

Задача в трекере Chromium: [1073804](https://crbug.com/1073804)


<!-- ### Consistent async stack traces {: #async } -->
### Консистентные асинхронные трассировки стека {: #async }

<!-- DevTools now reports `async` stack traces for `async` functions to be consistent with other async tasks.  -->
DevTools теперь отображает стек трассировки `async` для асинхронных функций, чтобы они соответствовали другим задачам async. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="Стек трассировки async", width="800", height="427" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2a04e234f25602d1b7e7ff7bd0d39bde3f2c1ec  #}

Задача в трекере Chromium: [1254259](https://crbug.com/1254259)


<!-- ### Retain the Console sidebar {: #console-sidebar } -->
### Сохранение боковой колонки в Консоли {: #console-sidebar }

<!-- The Console sidebar is here to stay. In Chrome 94, we announced the [upcoming deprecation of the Console sidebar](/blog/new-in-devtools-94/#deprecated) and ask developers for feedback and concerns. -->
Боковая колонка в Консоли (Console) остается на своем месте. В Chrome 94 мы анонсировали предстоящее [упразднение боковой колонки в Консоли](/blog/new-in-devtools-94/#deprecated) и попросили разработчиков высказать свои размышления и сомнения по этому поводу.

<!-- We have now got enough feedback from the deprecation notice and we will work on improving the sidebar rather than removing it. -->
Мы получили достаточное количество отзывов и теперь будем работать над улучшением боковой панели, а не над её удалением.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="Боковая колонка в Консоли", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b0650096c934bf60c21d51ae8a51c94e8f907d38 #}

Задачи в трекере Chromium: [1232937](https://crbug.com/1232937), [1255586](https://crbug.com/1255586)


<!-- ## Deprecated Application cache pane in the Application panel {: #app-cache } -->
## Устаревшая панель Кэш приложения на вкладке Приложение {: #app-cache }

<!-- The [Application cache](/docs/devtools/storage/applicationcache/) pane in the Application panel is now removed as the support for [AppCache](https://web.dev/appcache-removal/) is removed from Chrome and other Chromium-based browsers. -->
Панель [Кеш приложений](/docs/devtools/storage/applicationcache/) (Application cache) на вкладке Приложение (Application) удалена, поскольку [AppCache](https://web.dev/appcache-removal/) больше не поддерживается в Chrome и других браузерах на основе Chromium.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de4d15e955d6145674e3885cde8a5a70f1269b79 #}

Задача в трекере Chromium: [1084190](https://crbug.com/1084190) 


<!-- ## [Experimental] New Reporting API pane in the Application panel {: #reporting-api } -->
## [Эксперимент] Новая панель Reporting API на вкладке Приложение {: #reporting-api }

{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
Чтобы включить эксперимент, поставьте галочку в чекбоксе напротив пункта **Enable Reporting API panel in the Application panel** во вкладке **Настройки** (Settings) > **Экспериментальные функции** (Experiments).
{% endAside %}

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->
[Reporting API](https://web.dev/reporting-api/) призван помочь вам отслеживать нарушения безопасности вашей страницы, устаревшие вызовы API и многое другое. 

<!-- With this experiment enabled, you can now view the reports status in the new **Reporting API** pane in the **Application** panel.  -->
С включенным экспериментом вы теперь можете просматривать статус отчётов в панели **Reporting API** во вкладке **Приложение** (Application). 

<!-- Please note that the **Endpoints** section is currently still under active development (showing no reporting endpoints for now).  -->
Пожалуйста, обратите внимание что секция **Endpoints** пока находится в активной разработке (пока не показывает конечные точки отчетности). 

<!-- Learn more about the **Reporting API** with [this article](https://web.dev/reporting-api/). -->
Читайте больше о **Reporting API** в [этой статье](https://web.dev/reporting-api/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="Панель Reporting API на вкладке Приложение", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0516bfc7d4cee077452d31b1550ea1d3c594705 #}

Задача в трекере Chromium: [1205856](https://crbug.com/1205856)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

---
layout: 'layouts/blog-post.njk'
title: "Новинки DevTools (Chrome 108)"
authors:
  - jecelynyeen
date: 2022-10-26
description: 'Подсказки для неактивных CSS-свойств, новые XPath и текстовые селекторы во вкладке Recorder и другое.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/r7kjGEuoMqcVZvjrJmrG.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-108
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='UVtXrWvq_oI' %}

<!-- Translation instructions:
  + 1. Remove the "draft: true" tag above when submitting PR
  + 2. Provide translations under each of the English commented original content
  + 3. Translate the "description" tag above
  + 4. Translate all the <img> alt text
  5. Update the sites/ru/_partials/devtools/whats-new.md file -->


<!-- ## Hints for inactive CSS properties {: #css-hint <!-- } -->
## Подсказки для неактивных CSS-свойств {: #css-hint }

<!-- DevTools now identifies CSS styles that are valid but have no visible effect. In the **Styles** pane, DevTools fades out the inactive properties. Hover over the icon next to it to understand why the rule has no visible effect.  -->
DevTools теперь идентифицирует стили CSS, которые допустимы, но не имеют видимого эффекта. В панели **Стили** (Styles) неактивные свойства отображаются более бледным цветом. Наведите курсор на иконку рядом с неактивным свойством, чтобы понять, почему свойство не имеет видимого эффекта.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oqkN6QudxNIx4Zq22J89.png", alt="Подсказки для неактивных CSS-свойств.", width="800", height="526" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d6c1fea1e79b8373ff913a6d9919d097d1141254 #}

Задача в трекере Chromium: [1178508](https://crbug.com/1178508)


<!-- ## Auto-detect XPath and text selectors in the Recorder panel {: #recorder } -->
## Автоматическое определение XPath и текстовых селекторов во вкладке Recorder {: #recorder }

<!-- The **Recorder** panel now supports XPath and text selectors. [Start recording a user flow](/docs/devtools/recorder/#record) and the recorder automatically picks the XPath and shortest unique text of an element as selector if available. -->
Во вкладке **Recorder** теперь поддерживаются XPath и текстовые селекторы. [Начните запись пользовательского сценария](/docs/devtools/recorder/#record), и рекордер автоматически выберет XPath и кратчайший уникальный текст элемента в качестве селектора, если он доступен.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NJVIK95TtKaXxzNVoGI6.png", alt="XPath и текстовые селекторы во вкладке Recorder.", width="800", height="579" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/7441acfff5d9dfd373742797d2db46a809c9df67 #}

Задачи в трекере Chromium: [1327206](https://crbug.com/1327206),[1327209] (https://crbug.com/1327209)


<!-- ## Step through comma-separated expressions {: #debugging } -->
## Пошаговое выполнение выражений, разделенных запятыми {: #debugging }

<!-- You can now step through comma-separated expressions during debugging. This improves the debuggability of minified code. -->
Теперь при отладке вы можете переходить по выражениям, разделённым запятыми. Это улучшает отладку минимизированного кода.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4lUgUfPMhD9qxtZ7uvHV.png", alt="Перебор выражений, разделенных запятыми.", width="800", height="473" %}

<!-- Previously, DevTools only supported stepping through semicolon-separated expressions. -->
Раньше DevTools поддерживали только пошаговое выполнение выражений, разделённых точкой с запятой.

<!-- Given the code below, -->
Возьмём код ниже:

```js
function foo() {}

function bar() {
  foo();
  foo();
  return 42;
}
```

<!-- Transpilers and minifiers may turn them into comma-separated expressions. -->
Транспайлеры и минификаторы могут преобразовать его в выражения, разделённые запятыми:

```js
function bar(){return foo(),foo(),42}
``` 

<!-- This creates confusion during debugging because the stepping behavior is different between minified and authored code. It is even more confusing when using sourcemaps to debug the minified code in terms of the original code, as the developer is then looking at semicolons (which were under the hood turned into commas by the toolchain) but the debugger doesn't stop on them. -->
Это создаёт путаницу при отладке, поскольку поведение пошагового выполнения отличается для минифицированного и авторского кода. Ещё более запутанной при использовании карт исходного кода может быть отладка минифицированного кода по исходному, поскольку разработчик видит точки с запятой (которые инструментарий превратил в запятые), но отладчик на них не останавливается.

{# https://chromium.googlesource.com/v8/v8/+/ade6d191c8566e3fe7331d2ef37e43760c7cb363 #}

Задача в трекере Chromium: [1370200](https://crbug.com/1370200)


<!-- ## Improved Ignore list setting {: #ignore-list } -->
## Улучшенные настройки Списка игнорируемых фреймворков {: #ignore-list }

<!-- Go to **Settings** > **Ignore List**. DevTools improves the design to help you configure the rules to [ignore a single script or pattern of scripts](/docs/devtools/javascript/reference/#settings-ignore-list). -->
Откройте **Настройки** (Settings) > **Список игнорируемых фреймворков** (Ignore List). В DevTools улучшен дизайн, чтобы помочь вам настроить правила [игнорирования отдельных скриптов или групп скриптов по шаблону](/docs/devtools/javascript/reference/#settings-ignore-list).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qazPkaZ3TkSrIBU89Jtn.png", alt="Вкладка Список игнорируемых фреймворков.", width="800", height="535" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9441d8775b38b47db91bb5182f6349f3036d3751 #}

Задача в трекере Chromium: [1356517](https://crbug.com/1356517)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот ещё несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - Autocomplete CSS property name in the **Styles** pane on pressing space. ([1343316](https://crbug.com/1343316)) -->
- Автоматическое завершение имени свойства CSS на панели **Стили** (Styles) по нажатию пробела. ([1343316](https://crbug.com/1343316))
<!-- - Remove auto scroll in the **Element** panel’s breadcrumb. ([1369734](https://crbug.com/1369734)) -->
- Отключена автоматическая прокрутка в навигационной цепочке вкладки **Элементы** (Element). ([1369734](https://crbug.com/1369734))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ccfb914765146ce514b9645117d9f95052bd3471 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4b6c1b6671e08a39e4d37772e87ff2cf41cb7327 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

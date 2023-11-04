---
layout: 'layouts/blog-post.njk'
title: "Qué hay de nuevo en DevTools (Chrome 108)"
authors:
  - jecelynyeen
date: 2022-10-26
description: 'Sugerencias para propiedades CSS inactivas, nuevos selectores de texto, XPath en la grabadora y más.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2VjZEz1XkxEln1H6sXQ8.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-108
---

*Gracias  por la traducción [Carlos Caballero](https://carloscaballero.io) y [Miguel Ángel](https://midu.dev) por la revisión .*

{% Partial 'devtools/banner.md' %}

{% YouTube id='UVtXrWvq_oI' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/es/_partials/devtools/whats-new.md file -->


<!-- ## Hints for inactive CSS properties {: #css-hint } -->
## Sugerencias para propiedades CSS inactivas {: #css-hint }


<!-- DevTools now identifies CSS styles that are valid but have no visible effect. In the **Styles** pane, DevTools fades out the inactive properties. Hover over the icon next to it to understand why the rule has no visible effect.  -->

DevTools ahora identifica los estilos CSS que son válidos pero que no tienen un efecto visible. En el panel **Estilos**, DevTools desvanece las propiedades inactivas. Pase el cursor sobre el icono para comprender por qué la regla no tiene un efecto visible.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oqkN6QudxNIx4Zq22J89.png", alt="Sugerencias para propiedades CSS inactivas.", width="800", height="526" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d6c1fea1e79b8373ff913a6d9919d097d1141254 #}

Chromium issue: [1178508](https://crbug.com/1178508)


<!-- ## Auto-detect XPath and text selectors in the Recorder panel {: #recorder } -->
 ## Detección automática de XPath y selectores de texto en el panel Grabador {: #recorder }

<!-- The **Recorder** panel now supports XPath and text selectors. [Start recording a user flow](/docs/devtools/recorder/#record) and the recorder automatically picks the XPath and shortest unique text of an element as selector if available. -->

El panel **Recorder** ahora es compatible con XPath y selectores de texto. [Comience a grabar un flujo de usuario](/docs/devtools/recorder/#record) y la grabadora seleccionará automáticamente el XPath y el texto más corto único de un elemento como selector, si éste está disponible.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NJVIK95TtKaXxzNVoGI6.png", alt="XPath y selectores de texto en el panel Grabador.", width="800", height="579" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/7441acfff5d9dfd373742797d2db46a809c9df67 #}

Chromium issues: [1327206](https://crbug.com/1327206),[1327209] (https://crbug.com/1327209)


<!-- ## Step through comma-separated expressions {: #debugging } -->
## Paso a paso a través de expresiones separadas por comas {: #debugging }

<!-- You can now step through comma-separated expressions during debugging. This improves the debuggability of minified code. -->

Ahora puede recorrer las expresiones separadas por comas durante la depuración. Esto mejora la capacidad de depuración del código minificado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4lUgUfPMhD9qxtZ7uvHV.png", alt="Paso a paso a través de expresiones separadas por comas.", width="800", height="473" %}

<!-- Previously, DevTools only supported stepping through semicolon-separated expressions. -->
Anteriormente, DevTools solo permitía pasar por expresiones separadas por punto y coma.

<!-- Given the code below, -->
Dado el siguiente código,

```js
function foo() {}

function bar() {
  foo();
  foo();
  return 42;
}
```

<!-- Transpilers and minifiers may turn them into comma-separated expressions. -->
Transpiladores y minificadores pueden convertir el código anterior en expresiones separadas por comas.

```js
function bar(){return foo(),foo(),42}
```

<!-- This creates confusion during debugging because the stepping behavior is different between minified and authored code. It is even more confusing when using source maps to debug the minified code in terms of the original code, as the developer is then looking at semicolons (which were under the hood turned into commas by the toolchain) but the debugger doesn't stop on them. -->
Esto crea confusión durante la depuración porque el comportamiento paso a paso es diferente entre el código minificado y el creado. Es aún más confuso cuando se utilizan source maps para depurar el código minimizado en términos del código original, ya que el desarrollador está mirando los puntos y comas (que se convirtieron en comas por la cadena de herramientas), pero el depurador no se detiene en ellos.

{# https://chromium.googlesource.com/v8/v8/+/ade6d191c8566e3fe7331d2ef37e43760c7cb363 #}

Chromium issue: [1370200](https://crbug.com/1370200)


<!-- ## Improved Ignore list setting {: #ignore-list } -->
## Mejoras en la configuración de la lista de ignorados {: #ignore-list }

<!-- Go to **Settings** > **Ignore List**. DevTools improves the design to help you configure the rules to [ignore a single script or pattern of scripts](/docs/devtools/javascript/reference/#settings-ignore-list). -->

Vaya a **Configuración** > **Lista de ignorados**. DevTools mejora el diseño para ayudarlo a configurar las reglas para [ignorar un único script o patrón de scripts](/docs/devtools/javascript/reference/#settings-ignore-list)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qazPkaZ3TkSrIBU89Jtn.png", alt="Petaña de la Lista de Ignorados", width="800", height="535" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9441d8775b38b47db91bb5182f6349f3036d3751 #}

Chromium issue: [1356517](https://crbug.com/1356517)


<!-- ## Miscellaneous highlights {: #misc } -->
## Varios Destacados {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Estas son algunas correcciones notables en esta versión:

<!-- - Autocomplete CSS property name in the **Styles** pane on pressing space. ([1343316](https://crbug.com/1343316)) -->
<!-- - Remove auto scroll in the **Element** panel’s breadcrumb. ([1369734](https://crbug.com/1369734)) -->

- Autocompletar el nombre de la propiedad CSS en el panel **Estilos** al presionar espacio. ([1343316](https://crbug.com/1343316))
- Se elimina el desplazamiento automático en la ruta de navegación del panel **Elemento**. ([1369734](https://crbug.com/1369734))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ccfb914765146ce514b9645117d9f95052bd3471 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4b6c1b6671e08a39e4d37772e87ff2cf41cb7327 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

---
layout: 'layouts/blog-post.njk'
title: "O que há de novo no DevTools (Chrome 108)"
authors:
  - jecelynyeen
date: 2022-10-26
description: 'Hints para propriedades CSS inativas, novos seletores XPath e de texto no Gravador e muito mais.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VGla0pwYY9NGKjaYO4P8.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-108
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/) . Revisão por [Lucas Santos](https://lsantos.dev).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='UVtXrWvq_oI' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/pt/_partials/devtools/whats-new.md file -->


<!-- ## Hints for inactive CSS properties {: #css-hint <!-- } --> -->
## Hints para propriedades CSS inativas {: #css-hint }

<!-- DevTools now identifies CSS styles that are valid but have no visible effect. In the **Styles** pane, DevTools fades out the inactive properties. Hover over the icon next to it to understand why the rule has no visible effect.  -->
O DevTools agora identifica estilos CSS que são válidos, mas não têm efeito visível. No painel **Estilos**, o DevTools esmaece as propriedades inativas. Passe o mouse sobre o ícone ao lado para entender por que a regra não tem efeito visível.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oqkN6QudxNIx4Zq22J89.png", alt="Hints para propriedades CSS inativas", width="800", height="526" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d6c1fea1e79b8373ff913a6d9919d097d1141254 #}

Issue no Chromium: [1178508](https://crbug.com/1178508)


<!-- ## Auto-detect XPath and text selectors in the Recorder panel {: #recorder } -->
## Detectação automática de XPath e seletores de texto no painel Gravador {: #recorder }

<!-- The **Recorder** panel now supports XPath and text selectors. [Start recording a user flow](/docs/devtools/recorder/#record) and the recorder automatically picks the XPath and shortest unique text of an element as selector if available. -->

O painel **Gravador** agora é compatível com XPath e seletores de texto. [Comece a gravar um fluxo de usuário](/docs/devtools/recorder/#record) e o gravador seleciona automaticamente o XPath e o texto único mais curto de um elemento como seletor, se disponível.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NJVIK95TtKaXxzNVoGI6.png", alt="XPath e seletores de texto no painel Gravador.", width="800", height="579" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/7441acfff5d9dfd373742797d2db46a809c9df67 #}

Issue no Chromium: [1327206](https://crbug.com/1327206),[1327209] (https://crbug.com/1327209)


<!-- ## Step through comma-separated expressions {: #debugging } -->
 ## Percorrer expressões separadas por vírgulas {: #debugging }
<!-- You can now step through comma-separated expressions during debugging. This improves the debuggability of minified code. -->
Agora você pode percorrer expressões separadas por vírgulas durante a depuração. Isso melhora a depuração do código minificado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4lUgUfPMhD9qxtZ7uvHV.png", alt="Percorrer expressões separadas por vírgulas.", width="800", height="473" %}

<!-- Previously, DevTools only supported stepping through semicolon-separated expressions. -->
Anteriormente, o DevTools suportava apenas a passagem por expressões separadas por ponto e vírgula.
<!-- Given the code below, -->
Dado o código abaixo,

```js
function foo() {}

function bar() {
  foo();
  foo();
  return 42;
}
```

<!-- Transpilers and minifiers may turn them into comma-separated expressions. -->
Transpiladores e minificadores podem transformá-los em expressões separadas por vírgulas.

```js
function bar(){return foo(),foo(),42}
```  

<!-- This creates confusion during debugging because the stepping behavior is different between minified and authored code. It is even more confusing when using sourcemaps to debug the minified code in terms of the original code, as the developer is then looking at semicolons (which were under the hood turned into commas by the toolchain) but the debugger doesn't stop on them. -->
Isso cria confusão durante a depuração porque o comportamento de depuração é diferente entre o código minificado e o de original. É ainda mais confuso ao usar mapas de origem para depurar o código minificado em termos do código original, pois o desenvolvedor está olhando para os pontos e vírgulas (que estavam, por baixo dos panos, transformados em vírgulas pela cadeia de ferramentas), mas o depurador não parava neles.

{# https://chromium.googlesource.com/v8/v8/+/ade6d191c8566e3fe7331d2ef37e43760c7cb363 #}

Issue no Chromium: [1370200](https://crbug.com/1370200)


<!-- ## Improved Ignore list setting {: #ignore-list } -->
## Configuração de lista de ignorados aprimorada {: #ignore-list }
<!-- Go to **Settings** > **Ignore List**. DevTools improves the design to help you configure the rules to [ignore a single script or pattern of scripts](/docs/devtools/javascript/reference/#settings-ignore-list). -->
Vá para **Configurações** > **Ignorar lista**. O DevTools melhora o design para te ajudar a configurar as regras para [ignorar um único script ou padrão de scripts](/docs/devtools/javascript/reference/#settings-ignore-list).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qazPkaZ3TkSrIBU89Jtn.png", alt="A guia Lista de Ignorados.", width="800", height="535" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9441d8775b38b47db91bb5182f6349f3036d3751 #}

Issue no Chromium: [1356517](https://crbug.com/1356517)


<!-- ## Miscellaneous highlights {: #misc } -->
## Destaques diversos {: #misc }
<!-- These are some noteworthy fixes in this release: -->
Estas são algumas correções dignas de nota nesta versão:
<!-- - Autocomplete CSS property name in the **Styles** pane on pressing space. ([1343316](https://crbug.com/1343316)) -->
<!-- - Remove auto scroll in the **Element** panel’s breadcrumb. ([1369734](https://crbug.com/1369734)) -->
  - Preenchimento automático do nome da propriedade CSS no painel **Estilos** ao pressionar espaço. ([1343316](https://crbug.com/1343316))
  - Remoção da rolagem automática na trilha de navegação do painel **Element**. ([1369734](https://crbug.com/1369734))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ccfb914765146ce514b9645117d9f95052bd3471 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4b6c1b6671e08a39e4d37772e87ff2cf41cb7327 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

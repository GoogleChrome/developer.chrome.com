---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 94)"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "Utilize o DevTools em seu idioma preferido, novos dispositivos Nest Hub, novo badge de consultas de contêiner CSS e muito mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kTSL9x5E2JRNenbqZtMO.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/). Revisão por [Lucas Santos](https://lsantos.dev)*

{% Partial 'devtools/banner.md' %}

{% YouTube id="N9Jiou61WH4" %}

## Utilize o DevTools em seu idioma preferido {: #localized }

O Chrome DevTools agora suporta mais de 80 idiomas, permitindo que você trabalhe no seu idioma preferido!

Abra [Settings](/docs/devtools/customize/#settings), selecione seu idioma preferido na lista suspensa **Preferences**>**Language** e recarregue o DevTools.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wkYOwYQcCQsUwrbDGSBn.png", alt="Altere o idioma em Settings > Preferences", width="800", height="519" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Issue relacionada: [1163928](https://crbug.com/1163928)

## Novos dispositivos Nest Hub na lista de dispositivos {: #nest-hub }

Agora você pode simular as dimensões do Nest Hub e Nest Hub Max no [Device mode](/docs/devtools/device-mode/).

Clique no [Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %} &nbsp;, selecione Nest Hub ou Nest Hub Max na lista de dispositivos.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="Dispositivo Nest Hub no Device mode", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Issue relacionada: [1223525](https://crbug.com/1223525)

## Origin trials na visão Frame Detail {: #origin-trials }

Agora você pode obter informações sobre [Origin trials](/blog/origin-trial/) de um site na visão Frame Detail no painel Application.

Os [Origin trials](/blog/origin-trials/) oferecem acesso a um recurso novo ou experimental para criar funcionalidades que seus usuários podem experimentar por um tempo limitado antes que o recurso seja disponibilizado para todos.

Abra a página com o origin trials (exemplo [nessa página demo](https://mediastreamtrack.glitch.me)). No painel **Application**, role para baixo até a seção **Frames** e selecione o quadro superior.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Origin trials na visão Frame Detail", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Issue relacionada: [607555](https://crbug.com/607555)


## Novo ícone de consultas de contêiner CSS {: #container-queries }

Um novo ícone de **container** foi adicionado próximo aos elementos do contêiner (os elementos antecessores que correspondem aos critérios de regras `@container`). Clique no ícone para alternar a exibição de uma sobreposição do contêiner escolhido e todos os seus descendentes de consulta na página.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="ícone de consultas de contêiner CSS", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Issue relacionada: [1146422](https://crbug.com/1146422)


## Nova caixa de seleção para inverter os filtros de rede {: #invert-network-filter }

Use a nova caixa de seleção **Invert** para inverter os filtros no painel Rede.

Por exemplo, você pode digitar  "status-code: 404" para filtrar as requisições de rede com status 404. Habilite a caixa de seleção **Invert** para negar o filtro (mostrar todas as requisições de rede que não estão com status 404).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="Inverta os filtros de rede", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Issue relacionada: [1054464](https://crbug.com/1054464)


## Depreciação da barra lateral do Console {: #deprecated }

A barra lateral do Console será removida em favor de mudar a interface do usuário do filtro para a barra de ferramentas. Você tem alguma preocupação ou feedback? Informe-nos por meio desta [Issue](https://crbug.com/1232937).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="Mensagem de obsolescência da barra lateral do console", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Issue relacionada: [1232937](https://crbug.com/1232937)


## Exibição dos cabeçalhos `Set-Cookie` na guia Issues e no painel Network {: #raw-cookies }

O DevTools agora exibe cabeçalhos `Set-Cookie` na guia **Issues**.

Anteriormente, o DevTools não mostrava cookies malformados (cabeçalho `Set-Cookie` incorreto) no painel **Network**. Com o novo filtro `response-header-set-cookie` adicionado ao painel **Network**, os usuários podem filtrar a resposta do cabeçalho `Set-Cookie`. O DevTools vinculará os cabeçalhos `Set-Cookie` na guia **Issues** ao painel **Network**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="Cabeçalhos 'Set-Cookie' na guia Issues no painel Network", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Issue relacionada: [1179186](https://crbug.com/1179186)


## Exibição consistente dos métodos de acesso nativos como propriedades no Console {: #native-accessors }

O **Console** agora mostra métodos de acesso nativos como propriedades de forma consistente.

Por exemplo, ao avaliar a expressão `new Int8Array ([1, 2, 3])` no **Console**, propriedades nativas como `length`,` byteOffset` não eram exibidas na visualização. Com esta atualização, os métodos de acesso nativos aparecem na visualização e os valores são avaliados quando expandidos.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Exibição consistente dos métodos de acesso nativos como propriedades no Console", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Issue relacionadas: [1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


## Adequação dos stacks traces para scripts inline com #sourceURL {: #inline-script }

O DevTools agora exibe scripts inline com `#sourceURL` corretamente e mostra os stack traces apropriados para depuração.

Anteriormente, o DevTools exibia a localização incorreta para scripts inline com `#sourceURL`, em relação ao documento em vez de em relação à tag de abertura` <script>`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Adequação dos stacks traces para scripts inline com #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Issue relacionadas: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)

## Alteração do formato da configuração da cor no painel Computed  {: #color-unit }

Você agora pode alterar o formato da cor de qualquer elemento no painel Computed segurando a tecla <kbd>Shift</kbd> e clicando na visualização da cor.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="Shift+Clique na visualização da cor para alterar o formato da cor", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Issue relacionada: [1226371](https://crbug.com/1226371)

## Substituição dos tooltips customizados por tooltips nativos do HTML {: #tooltip }

O DevTools agora adota tooltips nativos do HTML em todos os componentes. O DevTools teve uma implementação de tooltips customizados por muito tempo devido à falta de estilização de um tooltip nativo.

Infelizmente, manter uma implementação de tooltips customizado é complexo e encontramos bugs complicados regularmente.

Depois de ponderar novamente os benefícios das implementações customizadas, descobrimos que os tooltips nativos são suficientes para o DevTools e a adoção dos tooltips evita uma grande variedade de problemas para nossos usuários.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools tooltip", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Issue relacionada: [1223391](https://crbug.com/1223391)


## [Experimental] Ocultar problemas na guia Issues {: #hide-issues }

{% Aside %}
Para ativar o experimento, marque a caixa de seleção **Enable hide issues menu**  em **Settings** > **Experimentos**.
{% endAside %}

Ative o experimento **hide issues menu** para ocultar problemas na guia **Issues**. Dessa forma, você pode se concentrar nos problemas importantes para você.

Na guia **Issues**, passe o mouse sobre um problema e clique no menu do problema &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; à direita, selecione **Hide issues like this** para ocultá-lo.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Menu de contexto experimental esconder problema", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Issue relacionada: [1175722](https://crbug.com/1175722)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}

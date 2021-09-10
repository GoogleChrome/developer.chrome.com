---
layout: 'layouts/doc-post.njk'
title: FLoC
subhead: Permita que os sites adivinhem seus interesses sem conseguir identificá-lo.
description: O FLoC permite a publicidade com base em interesses de forma a preservar a privacidade. Conforme um usuário se desloca pela
  web, seu navegador é atribuído a uma "grupo de interesse" junto com milhares de outros que tenham um
  histórico de navegação semelhante. Isto é feito sem compartilhar o histórico de navegação individual com o fornecedor do navegador ou com qualquer outra pessoa.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## Status de implementação

- O [ensaio de origem](https://web.dev/origin-trials) inicial foi encerrado.
- [Demo](https://floc.glitch.me/) da versão inicial (o ensaio de origem foi encerrado).
- [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) no [Blink](https://www.chromium.org/blink).

## Por que precisamos do FLoC?

Muitas pessoas estão preocupadas com as implicações relacionadas à privacidade na publicidade personalizada, que atualmente depende de técnicas como cookies de rastreamento e impressões digitais do dispositivo, que podem revelar seu histórico de navegação entre sites para anunciantes ou plataformas de anúncios. A proposta do FLoC tem como objetivo permitir a seleção de anúncios de uma maneira que proteja melhor a privacidade.

## Qual é a proposta do FLoC?

O FLoC fornece um mecanismo de preservação de privacidade para a seleção de anúncios e outros conteúdos com base em interesses.

Conforme um usuário se desloca pela web, seu navegador usa o algoritmo FLoC para calcular seu "grupo de interesse", que será o mesmo para milhares de navegadores com um histórico de navegação recente similar. O navegador recalcula seu coorte periodicamente, no dispositivo do usuário, sem compartilhar dados de navegação individuais com o fornecedor do navegador ou com qualquer outra pessoa.

Os anunciantes (sites que pagam por anúncios) podem incluir código nos seus próprios sites para reunir e fornecer dados de grupo para suas plataformas adtech (empresas que fornecem software e ferramentas para veicular anúncios). Por exemplo, uma plataforma adtech pode aprender com uma loja de calçados online que os navegadores dos grupos 1101 e 1354 parecem interessados nos calçados esportivos da loja. De outros anunciantes, a plataforma adtech aprende sobre outros interesses desses grupos.

Posteriormente, a plataforma de anúncios pode usar esses dados para selecionar anúncios relevantes quando um navegador de um desses grupos visitar uma página de um site que exibe anúncios, como um site de notícias.

## Para que pode ser usado o FLoC?

- Mostrar anúncios para pessoas cujos navegadores pertencem a um grupo que costuma visitar o site de um anunciante ou mostra interesse em tópicos relevantes.
- Use modelos de aprendizado de máquina para prever a probabilidade de um usuário realizar uma conversão com base em seu grupo, a fim de informar o comportamento dos lances de leilão de anúncios.
- Recomendar conteúdo aos usuários. Por exemplo, suponha que um site de notícias observe que sua página de podcast de esportes se tornou especialmente popular entre os visitantes dos grupos 1234 e 14159. Eles podem recomendar esse conteúdo a outros visitantes desses grupos.

## Como funciona o FLoC?

[O que é FLoC?](https://web.dev/floc/#how-does-floc-work) fornece uma explicação simples e passo a passo de como funciona o FloC.

O diagrama abaixo mostra um exemplo das diferentes funções na seleção e distribuição de um anúncio relevante usando FLoC.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/oH6SuZegrVJMbkTsl9mq.png", alt="Diagrama mostrando, passo a passo, as diferentes funções na seleção e entrega de um anúncio relevante usando FLoC: serviço FLoC, navegador, anunciantes, editor (para observar grupos), adtech, editor (para exibir anúncios)", width="800", height="359" %}

---

## Envolva-se e compartilhe feedback

- **GitHub**: Leia a [proposta](https://github.com/WICG/floc), [levante questões e acompanhe a discussão](https://github.com/WICG/floc/issues) .
- **W3C**: Discuta os casos de uso da indústria no [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) .
- **Suporte ao desenvolvedor**: faça perguntas e participe de discussões no [repositório Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) .

## Saiba mais

- [O que é FLoC?](https://www.web.dev)
- [Explicação técnica da API FLoC](https://github.com/WICG/floc)
- [Explorando a Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

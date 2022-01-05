---
layout: layouts/doc-post.njk
title: Trust Tokens
subhead: Trust Tokens é uma nova API para ajudar a combater fraudes e distinguir robôs de humanos de verdade, sem rastreamento passivo.
description: A API Trust Tokens permite que a confiança de um usuário em um contexto seja transmitida a outro contexto, sem identificar o usuário ou vincular identidades entre os dois contextos. A API permite que uma origem emita tokens criptográficos para um usuário de sua confiança. Os tokens são armazenados pelo navegador do usuário. O navegador pode então usar os tokens em outros contextos para avaliar a autenticidade do usuário.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## Status de implementação

- [Em ensaio de origem](https://web.dev/origin-trials/): Chrome 84 a 94.
- [Cadastre-se para o ensaio](/origintrials/#/view_trial/2479231594867458049).
- [Demo](https://trust-token-demo.glitch.me/).
- [Integração do Chrome DevTools](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- [Status da plataforma Chrome](https://www.chromestatus.com/feature/5078049450098688).

## O que são Trust Tokens?

{% YouTube id='bXB1Iwq6Eq4' %}

Os Trust Tokens permitem que a confiança na autenticidade de um usuário seja transmitida de um contexto para outro, para ajudar os sites a combater fraudes e distinguir robôs de humanos de verdade - sem rastreamento passivo.

- Um **site emissor** pode emitir tokens para o navegador da web de um usuário que mostra que são confiáveis, por exemplo, por meio do uso contínuo da conta, concluindo uma transação ou obtendo uma [pontuação de reCAPTCHA](https://developers.google.com/recaptcha) aceitável.
- Um site de **resgate** pode confirmar que um usuário não é falso, verificando se ele possui tokens de um emissor em que o resgatador confia e, em seguida, resgatando os tokens conforme necessário.

Os trust tokens são criptografados, portanto, não é possível identificar um indivíduo ou conectar instâncias confiáveis e não confiáveis para descobrir a identidade do usuário.

{% Aside 'caution' %} Os Tokens de confiança não substituem o reCAPTCHA ou outros mecanismos para determinar se um usuário é ou não quem diz ser.

Trust Tokens são uma forma de **transmitir** confiança em um usuário, não **estabelecer** confiança em um usuário. {% endAside %}

## Por que precisamos de Trust Tokens?

A web precisa de meios para estabelecer e transmitir sinais de confiança que mostrem que um usuário é quem diz ser, e não um robô fingindo ser um humano ou um terceiro malicioso fraudando uma pessoa ou serviço real. A proteção contra fraudes é particularmente importante para anunciantes, provedores de anúncios e [CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

Infelizmente, muitos mecanismos existentes para medir e propagar confiabilidade - para descobrir se uma interação com um site é de um ser humano real, por exemplo - tiram proveito de técnicas que também podem ser usadas para fingerprinting. Os mecanismos para transmitir confiança devem preservar a privacidade, permitindo que a confiança seja propagada pelos sites sem rastreamento de usuários individuais.

Com a API Trust Tokens, um site pode emitir tokens criptográficos para um usuário de sua confiança, que podem ser usados posteriormente em outro lugar. Os tokens são armazenados com segurança pelo navegador do usuário e podem ser resgatados em outros contextos para confirmar a autenticidade do usuário. Isto permite que a confiança de um usuário em um site (como um site de mídia social ou serviço de e-mail) seja transmitida a outro site (como um editor ou loja online) sem identificar o usuário ou vincular identidades entre sites.

{% Aside 'key-term' %}  [Fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) permite que os sites identifiquem e rastreiem usuários individuais, obtendo dados sobre seus dispositivos, sistema operacional e configuração do navegador (como preferências de idioma, [user agent](https://developer.mozilla.org/docs/Web/API/NavigatorID/userAgent) e fontes disponíveis) ou alterações no estado do dispositivo. Isto pode ser feito no servidor verificando os cabeçalhos das solicitações ou no cliente com JavaScript.

O fingerprinting usa mecanismos que os usuários não conhecem e não podem controlar. Sites como [Panopticlick](https://panopticlick.eff.org/) e [amiunique.org](https://amiunique.org/) mostram como os dados de fingerprint podem ser combinados para identificar uma pessoa como indivíduo. {% endAside %}

## Como funcionam os Trust Tokens?

Neste exemplo, um site de editor deseja verificar se um usuário é um ser humano real, e não um robô, antes de exibir um anúncio.

1. Um usuário visita um site (conhecido como **emissor**) e executa ações que levam o site a acreditar que o usuário é um ser humano real, como fazer compras, usar uma conta de e-mail ou preencher o reCAPTCHA com êxito.
2. O site do emissor usa a API JavaScript Trust Tokens para acionar uma solicitação de trust tokens para o navegador do usuário.
3. O site do emissor responde com dados do token.
4. O navegador do usuário armazena com segurança os dados para o trust token.
5. O usuário visita um site diferente (como um site de notícias) que deseja verificar se o usuário é um ser humano real: por exemplo, ao exibir anúncios.
6. O site usa a API Trust Tokens para verificar se o navegador do usuário possui tokens confiáveis armazenados para emissores nos quais o site confia.
7. Os Trust Tokens são encontrados para o emissor que o usuário visitou anteriormente.
8. O site do editor faz uma solicitação ao emissor para resgatar os trust tokens.
9. O site do emissor responde com um Registro de Resgate (Redemption Record).
10. O site do editor faz uma solicitação a uma plataforma de anúncio, incluindo o Registro de Resgate para mostrar que o usuário confia no emissor como um ser humano de verdade.
11. A plataforma de anúncios fornece os dados necessários para exibir um anúncio.
12. O site do editor exibe o anúncio.
13. Uma impressão de visualização do anúncio é contada.

{% Aside %} Para mais detalhes sobre as chamadas de JavaScript neste exemplo, veja o [Exemplo de uso da API](https://web.dev/trust-tokens/#sample-api-usage). {% endAside %}

---

## Envolva-se e compartilhe feedback

- **Ensaio de origem**: cadastre-se e participe do [ensaio de origem](/origintrials/#/view_trial/2479231594867458049) do Chrome.
- **Demo**: experimente a [emissão e o resgate](https://trust-token-demo.glitch.me/) de trust tokens.
- **GitHub**: Leia a [proposta](https://github.com/WICG/trust-token-api), [levante questões e acompanhe a discussão](https://github.com/WICG/trust-token-api/issues).
- **W3C**: Discuta os casos de uso da indústria no [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).
- **IETF**: fornece dados técnicos para o protocolo subjacente no [Privacy Pass working group](https://datatracker.ietf.org/wg/privacypass/about/) do IETF.
- **Suporte ao desenvolvedor**: faça perguntas e participe de discussões no [repositório Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Saiba mais

- [Explicação técnica do Trust Token](https://github.com/dvorak42/trust-token-api)
- [Getting started with Trust Tokens](https://web.dev/trust-tokens/): an overview for web developers
- [Introdução aos ensaios de origem do Chrome](https://web.dev/origin-trials)
- [Explorando a Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

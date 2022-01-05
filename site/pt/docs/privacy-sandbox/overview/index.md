---
layout: layouts/doc-post.njk
title: O que é o Privacy Sandbox?
subhead: O Privacy Sandbox é uma série de propostas para satisfazer os casos de uso entre sites sem cookies de terceiros ou outros mecanismos de rastreamento.
description: "O que está nele, como se envolver e para que serve."
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---

{% YouTube id='WnCKlNE52tc' %}

## Por que precisamos do Privacy Sandbox?

A iniciativa Privacy Sandbox tem dois objetivos principais:

- Desenvolver soluções de substituição para dar suporte a casos de uso da web e modelos de negócios sem permitir que os usuários sejam rastreados entre sites e evitando o rastreamento entre sites que os usuários não conhecem.
- Retirar gradualmente o suporte para cookies de terceiros quando novas soluções forem implementadas.

## Quais são as propostas do Privacy Sandbox?

O Chrome e outras partes interessadas do ecossistema ofereceram mais de 30 propostas até o momento, que podem ser encontradas nos [recursos públicos de grupos W3C](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo). Essas propostas abrangem uma ampla variedade de casos de uso e requisitos.

As principais propostas desenvolvidas pela equipe do Chrome estão listadas abaixo.

### Conteúdo e anúncios relevantes

- [**FLoC**](/docs/privacy-sandbox/floc): seleção de anúncios com base na preservação da privacidade e interesses: "anúncios relevantes".
- [**FLEDGE**](/docs/privacy-sandbox/fledge): seleção de anúncios para remarketing. Descendente do [TURTLEDOVE](https://github.com/WICG/turtledove).

### Medição e atribuição

- [**Attribution Reporting**](/docs/privacy-sandbox/attribution-reporting): Correlaciona cliques ou visualizações de anúncios com conversões. Anteriormente conhecido como Event Conversion Measurement API. Ativa dois tipos de relatórios: nível de evento e agregado.

### Proteções de fontes primárias

- [**Alterações nos cookies SameSite**](https://web.dev/samesite-cookies-explained/): protege sites marcando explicitamente seus cookies cross-site.
- [**First-Party Sets**](/docs/privacy-sandbox/first-party-sets): permitem que nomes de domínio relacionados pertencentes à mesma entidade se declarem pertencentes à mesma fonte primária.

### Detecção de fraudes

- [**Trust Tokens**](/docs/privacy-sandbox/trust-tokens): transmitem confiança num usuário de um contexto para outro, a fim de ajudar a combater a fraude e distinguir robôs de humanos.

### Limitação da coleta de dados

- [**Privacy Budget**](https://www.youtube.com/watch?v=0STgfjSA6T8): permite que os sites obtenham informações sobre o navegador ou dispositivo de um usuário, mas permite que o navegador defina uma cota na quantidade total de informações que um site pode acessar, de modo que o usuário não possa ser identificado.
- [**User-Agent Client Hints**](https://web.dev/user-agent-client-hints/): A string [User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) (UA) é uma [significativa superfície de](https://w3c.github.io/fingerprinting-guidance/#passive)[fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) passiva, além de ser difícil de processar. Client Hints (dicas do cliente) permitem que os desenvolvedores solicitem ativamente apenas as informações de que precisam sobre o dispositivo do usuário ou condições, em vez de precisar processar esses dados na string User-Agent.
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): Limita a capacidade de identificar usuários individuais acessando seus endereços IP. A proposta tem duas partes: [**Willful IP Blindness**](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) fornece uma maneira para os sites informarem aos navegadores que eles não estão conectando endereços IP aos usuários e [**Near-path NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) permite que grupos de usuários enviem seu tráfego através do mesmo servidor de privatização, efetivamente ocultando seus endereços IP de um host. O Gnatcatcher também garante que os sites que requerem acesso a endereços IP para fins legítimos, como prevenção de abusos, possam fazê-lo, sujeito a certificação e auditoria.

### Identidade

- [**WebID**](https://github.com/WICG/WebID): Suporte a identidades federadas (onde um usuário pode entrar num site através de um serviço de terceiros) sem compartilhar o endereço de e-mail do usuário ou outras informações de identificação com o serviço de terceiros ou site, a menos que o usuário concorde explicitamente com isso. O WebID permite a entrada federada sem o uso de redirecionamentos, pop-ups ou cookies de terceiros que possam ser usados para identificar e rastrear usuários em sites.

## Quem está trabalhando no Privacy Sandbox?

No início de 2021, havia:

- Mais de 30 propostas para o Privacy Sandbox oferecidas pelo Chrome e outros.
- Mais de 400 participantes que se juntaram a grupos W3C para fornecer comentários, incluindo o [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) e o [Privacy Community Group](https://www.w3.org/community/privacycg/participants).
- Cinco implementações de API disponíveis para teste no Chrome.

## Quando as APIs serão implementadas?

A página [status de implementação](/docs/privacy-sandbox/status/) neste site fornece atualizações sobre o progresso de APIs individuais.

---

## Envolva-se e compartilhe feedback

- **GitHub**: leia a explicação da proposta no GitHub e levante questões ou comentários na aba Issues da explicação. <br> [Links para as explicações](#explainers) estão fornecidas abaixo.
- **W3C**: os casos de uso podem ser discutidos e o feedback do setor compartilhado nos grupos do W3C [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/), [Privacy Community Group](https://www.w3.org/community/privacycg/participants), e [Web Incubator Community Group](https://github.com/WICG).
- **Suporte ao desenvolvedor**: faça perguntas e participe de discussões no [repositório Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Saiba mais

### Explicações de propostas do Privacy Sandbox {: #explainers }

As explicações da proposta da API precisam de feedback, em particular para sugerir casos de uso ausentes e maneiras mais privadas de atingir seus objetivos. Você pode fazer comentários ou perguntas na aba Issues de cada explicação.

- [Privacy Budget](https://github.com/bslassey/privacy-budget)
- [Trust Tokens](https://github.com/dvorak42/trust-token-api)
- [First-Party Sets](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [Aggregated Reporting API](https://github.com/csharrison/aggregate-reporting-api)
- [Attribution Reporting](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### Artigos e vídeos para desenvolvedores web

- [Explorando a Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
- [Cookies SameSite explicados](https://web.dev/samesite-cookies-explained/)
- [Primeiros passos com os Trust Tokens](https://web.dev/trust-tokens)
- [Uma forma de medir conversões de anúncios com mais privacidade](https://web.dev/conversion-measurement/)
- [O que é FLoC?](https://web.dev/floc/)
- [Introdução ao Privacy Budget](https://www.youtube.com/watch?v=0STgfjSA6T8)

### Princípios e conceitos por trás das propostas

- [A Potential Privacy Model for the Web](https://github.com/michaelkleber/privacy-model)  define os princípios básicos subjacentes às APIs.
- [The Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- Privacy Sandbox overview: [Building a more private web](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Google AI Blog: [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [O futuro dos cookies de terceiros](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

---
layout: layouts/doc-post.njk
title: "Qu'est-ce que Privacy Sandbox ?"
subhead: "Privacy Sandbox est une série de propositions pour satisfaire les cas d'utilisation intersites sans cookies tiers ou autres mécanismes de suivi."
description: "Qu'y a-t-il dedans, comment s'impliquer et à quoi ça sert."
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---

{% YouTube id='WnCKlNE52tc' %}

## Pourquoi avons-nous besoin de Privacy Sandbox ?

L'initiative Privacy Sandbox a deux objectifs principaux :

- Développer des solutions de remplacement pour prendre en charge les cas d'utilisation web et les modèles commerciaux sans permettre le suivi des utilisateurs sur tous les sites et en évitant le suivi intersites dont les utilisateurs ne sont pas informés.
- Supprimer progressivement la prise en charge des cookies tiers lorsque de nouvelles solutions sont en place.

## Quelles sont les propositions de Privacy Sandbox ?

Chrome et d'autres parties prenantes de l'écosystème ont proposé plus de 30 propositions à ce jour, qui peuvent être trouvées dans les [ressources publiques des groupes W3C](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo). Ces propositions couvrent une grande variété de cas d'utilisation et d'exigences.

Les principales propositions développées par l'équipe Chrome sont répertoriées ci-dessous.

### Pertinence du contenu et des annonces

- [**FLoC**](/docs/privacy-sandbox/floc) : sélection d'annonces et de contenus basée sur les intérêts et préservant la vie privée, des "annonces pertinentes".
- [**FLEDGE**](/docs/privacy-sandbox/fledge) : sélection d'annonces pour le remarketing. Descendant de [TURTLEDOVE](https://github.com/WICG/turtledove).

### Mesures et attribution

- [**Création de rapports sur l'attribution**](/docs/privacy-sandbox/attribution-reporting) (API Attribution Reporting) : associez les clics ou les vues d'annonces aux conversions. Anciennement connue sous le nom d'API Event Conversion Measurement. Active deux types de rapports : basés sur les événements et agrégés.

### Protections propriétaires

- [**Modifications des cookies SameSite**](https://web.dev/samesite-cookies-explained/) : sécurisez les sites en marquant explicitement vos cookies intersites.
- [Les **ensembles propriétaires**](/docs/privacy-sandbox/first-party-sets) : permettent aux noms de domaine associés détenus par la même entité de se déclarer comme tels.

### Détection de fraude

- [**Jetons de confiance**](/docs/privacy-sandbox/trust-tokens) (Trust Tokens) : inspirez confiance aux utilisateurs d'un contexte à un autre, afin d'aider à lutter contre la fraude et à distinguer les bots des humains.

### Limiter la collecte de données

- [**Budget de confidentialité**](https://www.youtube.com/watch?v=0STgfjSA6T8) : permet aux sites web d'obtenir des informations sur le navigateur ou l'appareil d'un utilisateur, mais permet au navigateur de définir un quota sur la quantité totale d'informations auxquelles un site peut accéder, afin qu'un utilisateur ne puisse pas être identifié.
- [**User-Agent Client Hints**](https://web.dev/user-agent-client-hints/) : la [chaîne User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) (UA) est une [surface de fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) passive importante, tout en étant difficile à traiter. Les Client Hints permettent aux développeurs de demander activement uniquement les informations dont ils ont besoin sur l'appareil de l'utilisateur ou les conditions, plutôt que d'avoir à analyser ces données à partir de la chaîne User-Agent.
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness) : limitez la possibilité d'identifier les utilisateurs individuels en accédant à leur adresse IP. Il y a deux parties à la proposition : [**Willful IP Blindness**](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) fournit un moyen pour les sites web d'informer les navigateurs qu'ils ne connectent pas les adresses IP avec les utilisateurs, et [**Near-path NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) permet à des groupes d'utilisateurs d'envoyer leur trafic via le même serveur de privatisation, cachant efficacement leurs adresses IP à partir d'un hébergeur de site. Gnatcatcher garantit également que les sites nécessitant un accès aux adresses IP à des fins légitimes, telles que la prévention des abus peuvent le faire, sous réserve de certification et d'audit.

### Identité

- [**WebID**](https://github.com/WICG/WebID) : prend en charge l'identité fédérée (où un utilisateur peut se connecter à un site web via un service tiers) sans partager l'adresse e-mail de l'utilisateur ou d'autres informations d'identification avec le service tiers ou le site web, sauf si l'utilisateur accepte explicitement le partage de ses informations. WebID permet une connexion fédérée sans l'utilisation de redirections, de fenêtres contextuelles ou de cookies tiers qui peuvent être utilisés pour identifier et suivre les utilisateurs sur les sites.

## Qui travaille sur Privacy Sandbox ?

Début 2021, il y avait :

- Plus de 30 propositions de Privacy Sandbox proposées par Chrome et d'autres.
- Plus de 400 participants qui ont rejoint les groupes W3C pour apporter leur contribution, notamment le groupe [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) et [Privacy Community Group](https://www.w3.org/community/privacycg/participants).
- Cinq implémentations d'API disponibles pour les tests dans Chrome.

## Quand les API seront-elles implémentées ?

La [page d'état d'implémentation](/docs/privacy-sandbox/status/) sur ce site fournit des mises à jour de progression pour les API individuelles.

---

## Interagir et donner son avis

- **GitHub** : lisez l'explication de la proposition sur GitHub et posez des questions ou laissez des commentaires dans l'onglet Issues de l'explication.<br> Les [liens vers les explications](#explainers) sont fournis ci-dessous.
- **W3C** : les cas d'utilisation peuvent être discutés et les commentaires de l'industrie partagés au sein des groupes [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/), [Privacy Community Group](https://www.w3.org/community/privacycg/participants) et [Web Incubator Community Group](https://github.com/WICG) de W3C.
- **Assistance aux développeurs** : posez des questions et participez aux discussions sur le [référentiel d'assistance aux développeurs Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## En savoir plus

### Explications de la proposition Privacy Sandbox {: #explainers }

Il est nécessaire d'obtenir des retours d'information concernant les explications de la proposition d'API, en particulier pour suggérer des cas d'utilisation manquants et des moyens plus privés d'atteindre leurs objectifs. Vous pouvez laisser des commentaires ou poser des questions dans l'onglet Issues de chaque explication.

- [Budget de confidentialité](https://github.com/bslassey/privacy-budget)
- [Jetons de confiance](https://github.com/dvorak42/trust-token-api)
- [Ensembles propriétaires](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [API Aggregated Reporting](https://github.com/csharrison/aggregate-reporting-api)
- [Création de rapports sur l'attribution](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### Articles et vidéos pour les développeurs web

- [Explications détaillées de Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
- [Cookies SameSite expliqués](https://web.dev/samesite-cookies-explained/)
- [Premiers pas avec les jetons de confiance](https://web.dev/trust-tokens)
- [Un moyen plus privé de mesurer les conversions publicitaires](https://web.dev/conversion-measurement/)
- [Qu'est-ce que la méthode FLoC ?](https://web.dev/floc/)
- [Présentation du budget de confidentialité](https://www.youtube.com/watch?v=0STgfjSA6T8)

### Principes et concepts derrière les propositions

- [Un modèle de confidentialité potentiel pour le web](https://github.com/michaelkleber/privacy-model) énonce les principes de base sous-jacents aux API.
- [Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- Présentation de Privacy Sandbox : [ Créer un web plus privé](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Blog Google AI : [Apprentissage fédéré : machine learning collaboratif sans données de formation centralisées](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [L'avenir des cookies tiers](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

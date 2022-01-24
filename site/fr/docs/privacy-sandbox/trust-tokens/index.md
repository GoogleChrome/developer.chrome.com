---
layout: layouts/doc-post.njk
title: Jetons de confiance
subhead: "Trust Tokens est une nouvelle API qui permet d'aider à lutter contre la fraude et à distinguer les bots des vrais humains, sans suivi passif."
description: "L'API Trust Tokens permet de transmettre la confiance d'un utilisateur dans un contexte à un autre, sans identifier l'utilisateur ni lier les identités entre les deux contextes. L'API permet à une origine d'émettre des jetons cryptographiques à un utilisateur de confiance. Les jetons sont stockés par le navigateur de l'utilisateur. Le navigateur peut ensuite utiliser les jetons dans d'autres contextes pour évaluer l'authenticité de l'utilisateur."
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## État d'implémentation

- [En phase d'évaluation](https://web.dev/origin-trials/) Chrome 84 à 94.
- [Inscrivez-vous à la phase d'évaluation](/origintrials/#/view_trial/2479231594867458049).
- [Démo](https://trust-token-demo.glitch.me/).
- [Intégration des outils pour les développeurs Chrome](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- [État de la plate-forme Chrome](https://www.chromestatus.com/feature/5078049450098688).

## Que sont les jetons de confiance (Trust Tokens) ?

{% YouTube id='bXB1Iwq6Eq4' %}

Les jetons de confiance permettent de transmettre la confiance dans l'authenticité d'un utilisateur d'un contexte à un autre, pour aider les sites à lutter contre la fraude et à distinguer les bots des vrais humains, sans suivi passif.

- Un site web **émetteur** peut émettre des jetons sur le navigateur web d'un utilisateur qui montre qu'il est digne de confiance, par exemple en utilisant continuellement son compte, en effectuant une transaction ou en obtenant un [score reCAPTCHA](https://developers.google.com/recaptcha) acceptable.
- Un site web **récepteur** peut confirmer qu'un utilisateur n'est pas un faux en vérifiant s'il possède des jetons d'un émetteur auquel il a confiance, puis en échangeant des jetons si nécessaire.

Les jetons de confiance sont chiffrés, il n'est donc pas possible d'identifier un individu ou de connecter des instances approuvées et non approuvées pour découvrir l'identité de l'utilisateur.

{% Aside 'caution' %} Les jetons de confiance ne remplacent pas la validation reCAPTCHA ou d'autres mécanismes permettant de déterminer si un utilisateur est ou non celui qu'il prétend être.

Les jetons de confiance sont un moyen de **transmettre** la confiance accordée à un utilisateur, et non d'**établir** la confiance envers un utilisateur. {% endAside %}

## Pourquoi les jetons de confiance sont-ils nécessaires ?

Le web a besoin de moyens d'établir et de transmettre des signaux de confiance qui montrent qu'un utilisateur est bien ce qu'il prétend être, et qu'il ne s'agit pas d'un bot qui se fait passer pour un humain ou d'un tiers malveillant fraudant une personne ou un service réel. La protection contre la fraude est particulièrement importante pour les annonceurs, les fournisseurs d'annonces et les [réseaux de diffusion de contenu](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/) (CDN).

Malheureusement, de nombreux mécanismes existants pour évaluer et propager la fiabilité (pour déterminer si une interaction avec un site provient d'un humain réel, par exemple) tirent parti de techniques qui peuvent également être utilisées pour le fingerprinting. Les mécanismes pour transmettre la confiance doivent préserver la confidentialité, permettant à la confiance de se propager à travers les sites sans suivi individuel des utilisateurs.

Avec l'API Trust Tokens, un site web peut émettre des jetons cryptographiques à un utilisateur en qui il a confiance, qui peuvent ensuite être utilisés ailleurs. Les jetons sont stockés en toute sécurité par le navigateur de l'utilisateur et peuvent ensuite être utilisés dans d'autres contextes pour confirmer l'authenticité de l'utilisateur. Cela permet de transmettre la confiance d'un utilisateur sur un site web (tel qu'un réseau social ou un service de messagerie) à un autre site web (tel qu'un éditeur ou une boutique en ligne), le tout sans identifier l'utilisateur ni lier les identités entre les sites.

{% Aside 'key-term' %}<br> Le [fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) permet aux sites d'identifier et de suivre les utilisateurs individuels en obtenant des données sur leur appareil, leur système d'exploitation et la configuration du navigateur (telles que les préférences de langue, l'[user-agent](https://developer.mozilla.org/docs/Web/API/NavigatorID/userAgent) et les polices disponibles) ou les changements d'état de l'appareil. Cela peut être fait sur le serveur en vérifiant les en-têtes de requête ou sur le client avec JavaScript. {% endAside %}

Le fingerprinting utilise des mécanismes que les utilisateurs ne connaissent pas et ne peuvent pas contrôler. Des sites tels que [Panopticlick](https://panopticlick.eff.org/) et [amiunique.org](https://amiunique.org/) montrent comment les données de fingerprinting peuvent être combinées pour vous identifier en tant qu'individu.

## Comment fonctionnent les jetons de confiance ?

Dans cet exemple, un site web d'éditeur souhaite vérifier si un utilisateur est un véritable humain, et non un bot, avant d'afficher une annonce.

1. Un utilisateur visite un site web (appelé **émetteur**) et effectue des actions qui amènent le site à croire que l'utilisateur est un véritable être humain, comme effectuer des achats, utiliser un compte de messagerie ou terminer avec succès la validation reCAPTCHA.
2. Le site émetteur utilise l'API JavaScript Trust Tokens pour déclencher une demande de jetons de confiance au navigateur de l'utilisateur.
3. Le site émetteur répond avec les données du jeton.
4. Le navigateur de l'utilisateur stocke en toute sécurité les données du jeton de confiance.
5. L'utilisateur visite un autre site web (tel qu'un site d'actualités) qui souhaite vérifier s'il s'agit d'un véritable être humain, par exemple, lors de l'affichage d'annonces.
6. Le site utilise l'API Trust Tokens pour vérifier si le navigateur de l'utilisateur dispose de jetons de confiance stockés pour les émetteurs auxquels ce site fait confiance.
7. Des jetons de confiance sont trouvés (émis par l'émetteur que l'utilisateur a visité précédemment).
8. Le site d'éditeur effectue une requête à l'émetteur pour récupérer les jetons de confiance.
9. Le site émetteur répond avec un enregistrement du jeton.
10. Le site d'éditeur effectue une requête à une plate-forme publicitaire incluant l'enregistrement du jeton pour montrer que l'utilisateur est reconnu par l'émetteur comme un véritable être humain.
11. La plate-forme publicitaire fournit les données nécessaires à l'affichage d'une annonce.
12. Le site d'éditeur affiche l'annonce.
13. Une impression de vue d'annonce est comptabilisée.

{% Aside %} Pour plus de détails sur les appels JavaScript dans cet exemple, consultez [Exemple d'utilisation de l'API](https://web.dev/trust-tokens/#sample-api-usage). {% endAside %}


## Interagir et donner son avis

- **Phase d'évaluation** : inscrivez-vous et participez à la [phase d'évaluation de Chrome](/origintrials/#/view_trial/2479231594867458049).
- **Démo** : essayez d'[émettre et de recevoir](https://trust-token-demo.glitch.me/) des jetons de confiance.
- **GitHub** : lisez la [proposition](https://github.com/WICG/trust-token-api), [posez des questions et suivez la discussion](https://github.com/WICG/trust-token-api/issues).
- **W3C** : discutez des cas d'utilisation du secteur au sein du groupe [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).
- **IETF** : découvrez une contribution technique pour le protocole sous-jacent dans le groupe [Privacy Pass working group](https://datatracker.ietf.org/wg/privacypass/about/) d'IETF.
- **Assistance aux développeurs** : posez des questions et participez aux discussions dans le [référentiel d'assistance aux développeurs Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## En savoir plus

- [Explications techniques de l'API Trust Token](https://github.com/dvorak42/trust-token-api)
- [Premiers pas avec les jetons de confiance](https://web.dev/trust-tokens/) : un aperçu pour les développeurs web
- [Premiers pas avec les phases d'évaluation de Chrome](https://web.dev/origin-trials)
- [Explications détaillées de Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

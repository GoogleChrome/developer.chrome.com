---
layout: layouts/doc-post.njk
title: Méthode FLoC
subhead: Permettez aux sites de deviner vos intérêts sans pouvoir vous identifier de manière unique.
description: "La méthode FLoC permet de diffuser des annonces basées sur les intérêts d'une manière qui préserve la confidentialité. Lorsqu'un utilisateur navigue sur le web, son navigateur est affecté à une 'cohorte d'intérêt' (groupes d’intérêt) aux côtés de milliers d'autres personnes ayant un historique de navigation similaire. Cette méthode ne nécessite pas le partage de l'historique de navigation individuel avec le fournisseur du navigateur ou toute autre personne."
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## État d'implémentation

- La [phase d'évaluation](https://web.dev/origin-trials) initiale est maintenant terminée.
- [Démo](https://floc.glitch.me/) de la version initiale (phase d'évaluation maintenant terminée).
- [Intention d'expérimentation](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) dans [Blink](https://www.chromium.org/blink).

## Pourquoi la méthode FLoC est-elle nécessaire ?

De nombreuses personnes s'inquiètent des conséquences sur la vie privée de la publicité personnalisée, qui repose actuellement sur des techniques telles que les cookies de suivi et le fingerprinting des appareils, qui peuvent révéler aux annonceurs ou aux plates-formes publicitaires votre historique de navigation sur différents sites. La méthode FLoC vise à permettre la sélection des annonces d'une manière qui protège mieux la confidentialité.

## Qu'est-ce que la proposition FLoC ?

La méthode FLoC est un mécanisme qui préserve la confidentialité pour la sélection d'annonces et d'autres contenus en fonction des intérêts.

Lorsqu'un utilisateur navigue sur le Web, son navigateur utilise l'algorithme FLoC pour déterminer son « groupe d'intérêt », qui sera la même pour des milliers de navigateurs dont l'historique de navigation récent est similaire. Le navigateur détermine à nouveau le groupe périodiquement, sur l'appareil de l'utilisateur, sans partager de données de navigation individuelles avec le fournisseur du navigateur ou avec qui que ce soit d'autre.

Les annonceurs (sites qui paient pour des annonces) peuvent inclure du code sur leurs propres sites web pour collecter et fournir des données de cohorte à leurs plates-formes de technologie publicitaire (entreprises qui fournissent des logiciels et des outils pour diffuser des annonces). Par exemple, une plate-forme de technologie publicitaire pourrait apprendre d'une boutique de chaussures en ligne que les internautes des cohortes 1101 et 1354 semblent intéressés par le matériel de randonnée du magasin. À partir d'autres annonceurs, la plate-forme de technologie publicitaire apprend d'autres intérêts de ces groupes.

Par la suite, la plate-forme publicitaire peut utiliser ces données pour sélectionner des annonces pertinentes lorsqu'un navigateur de l'un de ces groupes visite une page d'un site qui affiche des annonces, comme un site web d'actualités.

## À quoi peut servir la méthode FLoC ?

- À diffuser des annonces aux personnes dont les navigateurs appartiennent à une cohorte qui a été observée comme visitant fréquemment le site d'un annonceur ou s'intéressant à des sujets pertinents.
- À utiliser des modèles d'apprentissage automatique pour prédire la probabilité qu'un utilisateur effectue une conversion en fonction de sa cohorte, afin d'informer le comportement des enchères publicitaires.
- À recommander du contenu aux utilisateurs. Par exemple, supposons qu'un site d'actualités observe que sa page de podcasts sportifs est devenue particulièrement populaire auprès des visiteurs des cohortes 1234 et 14159. Il peut alors recommander ce contenu à d'autres visiteurs de ces groupes.

## Comment fonctionne la méthode FLoC ?

L'article [Qu'est-ce que la méthode FLoC ?](https://web.dev/floc/#how-does-floc-work) fournit une explication simple, étape par étape, de son fonctionnement.

Le diagramme ci-dessous montre un exemple des différents rôles dans la sélection et la diffusion d'une annonce pertinente à l'aide de la méthode FLoC.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/oH6SuZegrVJMbkTsl9mq.png", alt="Diagramme montrant, étape par étape, les différents rôles dans la sélection et la diffusion d'une annonce pertinente à l'aide de la méthode FLoC : service FLoC, navigateur, annonceurs, éditeur (pour observer les cohortes), technologie publicitaire, éditeur (pour afficher des annonces)", width="800", height="359" %}

---

## Interagir et donner son avis

- **GitHub** : lisez la [proposition](https://github.com/WICG/floc), [posez des questions et suivez la discussion](https://github.com/WICG/floc/issues).
- **W3C** : discutez des cas d'utilisation du secteur au sein du [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).
- **Assistance aux développeurs** : posez des questions et participez aux discussions dans le [référentiel d'assistance aux développeurs Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## En savoir plus

- [Qu'est-ce que la méthode FLoC ?](https://www.web.dev)
- [Explication technique de l'API FLoC](https://github.com/WICG/floc)
- [Explications détaillées de Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

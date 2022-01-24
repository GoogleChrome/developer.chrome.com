---
layout: layouts/doc-post.njk
title: FLEDGE
subhead: "Une solution pour les cas d'utilisation de remarketing, conçue pour ne pas être utilisée par des tiers afin de suivre le comportement de navigation des utilisateurs sur les sites."
description: "FLEDGE satisfait les cas d'utilisation du remarketing, mais est conçu de manière à ne pas être utilisé par des tiers afin de suivre le comportement de navigation des utilisateurs sur les sites. L'API permet des « enchères » sur l'appareil par le navigateur, afin de choisir les annonces pertinentes fournies par les sites Web que l'utilisateur a déjà visités."
date: 2021-05-18
updated: 2021-09-29
authors:
  - samdutton
---

{% Aside %} FLEDGE peut être testé dans les versions actuelles de Chrome et Chrome Canary avec les indicateurs suivants activés :

`--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge`

- Il s'agit de la version actuelle de FLEDGE pour les premiers tests, elle ne doit donc pas être considérée comme une fonctionnalité complète ou indicative de la mise en œuvre finale. L'avancée et l'état font l'objet de discussions lors des réunions régulières du WICG. Le [compte-rendu](https://github.com/WICG/turtledove/blob/main/meetings/2021-05-12-FLEDGE-call-minutes.md#agenda) de la réunion du WICG du 12/05/2021 fournit des détails sur ce qui est et n'est pas pris en charge dans la mise en œuvre actuelle.
- [Exécuter Chromium avec des indicateurs](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) explique comment définir des indicateurs lors de l'exécution de Chrome et d'autres navigateurs basés sur Chromium à partir de la ligne de commande. {% endAside %}

{% YouTube id='HkvmYKqnytw' %}

## État de mise en œuvre

FLEDGE est la première expérience à être implémentée dans Chromium au sein de la famille de propositions [TURTLEDOVE.](https://github.com/WICG/turtledove)

- [La proposition d'API](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) fait actuellement l'objet de discussions au sein du [WICG](https://www.w3.org/community/wicg/) et des groupes d'intérêt.
- [Intention de prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI) dans [Blink](https://www.chromium.org/blink).

## En quoi FLEDGE est-il utile ?

Comprendre les intérêts des utilisateurs peut permettre des annonces plus pertinentes que de simplement choisir des annonces en fonction du contenu du site (ciblage contextuel) ou en utilisant les informations que l'utilisateur a fournies au site sur lequel l'annonce apparaît (ciblage de données propriétaires). Traditionnellement, les plateformes publicitaires identifient les intérêts des utilisateurs en suivant leur comportement sur les sites. Il faut donc trouver un moyen de présenter aux utilisateurs des annonces pertinentes sans suivi intersites.

FLEDGE satisfait les [cas d'utilisation du remarketing](/privacy-sandbox/glossary/#remarketing), mais est conçu de manière à ne pas être utilisé par des tiers pour suivre le comportement de navigation des utilisateurs. L'API permet des « enchères » sur l'appareil par le navigateur, afin de choisir les annonces pertinentes fournies par les sites Web que l'utilisateur a déjà visités.

Avec FLEDGE :

- Le navigateur de l'utilisateur, et non l'annonceur ou la plate-forme de adtech, stocke les groupes d'intérêt définis par l'annonceur auxquels le navigateur de l'utilisateur est associé.
- Le navigateur de l'utilisateur combine les données du groupe d'intérêt avec les données de l'acheteur/vendeur d'annonces et la logique commerciale pour mener une « enchère » afin de sélectionner une annonce. Cette enchère publicitaire se déroule localement sur l'appareil de l'utilisateur, il n'est ainsi pas nécessaire partager de données avec un tiers.
- Les annonces peuvent être sélectionnées pour un groupe d'intérêt, mais un annonceur ne peut pas combiner les données d'un groupe d'intérêt avec d'autres informations sur un utilisateur, en particulier l'identité d'une personne ou les pages qu'il visite. Un annonceur ne peut pas savoir quelles pages un utilisateur consulte sur un site d'éditeur.
- Les sites Web et les réseaux publicitaires utilisés par ces sites ne peuvent pas connaître les intérêts publicitaires ou les groupes d'intérêt de leurs visiteurs : la sélection des annonces s'effectue sur le navigateur de l'utilisateur.

En d'autres termes, FLEDGE garde vos intérêts et votre activité de navigation privés. Par exemple, si vous visitez une boutique de chaussures en ligne et que vous montrez un intérêt pour des chaussures de course, puis que vous visitez un site d'actualités qui affiche des annonces (un éditeur), l'annonceur (la boutique de chaussures) ne sait pas sur quelles pages vous consultez le site d'actualités et l'éditeur (le site d'actualités) ne connaît pas votre intérêt pour les chaussures de course.

## Comment fonctionne FLEDGE ?

Lorsqu'un utilisateur visite une page sur un site qui souhaite faire la publicité de ses produits ou services (un annonceur), le site peut demander au navigateur de l'utilisateur d'associer l'utilisateur à des groupes d'intérêts spécifiques pendant une certaine période (par exemple 30 jours).

Le groupe d'intérêt peut être propre au site Web de l'annonceur, de sorte qu'il fonctionne comme une liste de remarketing. Sinon, plusieurs sites Web peuvent convenir d'affecter les utilisateurs au même groupe d'intérêt, par exemple si les sites sont associés ou s'ils appartiennent au même réseau publicitaire. Périodiquement, le navigateur de l'utilisateur récupère les annonces désignées pour les groupes d'intérêt, ainsi que le code qui fournit des instructions aux annonceurs pour savoir quand une annonce associée à un groupe d'intérêt doit être éligible pour enchérir sur l'appareil, par exemple uniquement sur l'inventaire avec des annonces situées près du haut de la page. Lorsque l'utilisateur visite un site d'éditeur configuré pour accepter des publicités à l'aide de l'API FLEDGE et pour afficher des publicités à partir d'un réseau publicitaire utilisé par un site d'annonceur que l'utilisateur a déjà visité, le code de réseau publicitaire de la page demande au navigateur d'exécuter le code d'« enchères » pour sélectionner une annonce. L'annonce « gagnante » s'affiche.

1. Un utilisateur visite une page sur un site qui souhaite faire la publicité de ses produits, comme une boutique en ligne.
2. Le site de l'annonceur (ou la technologie publicitaire qu'il utilise) demande au navigateur de l'utilisateur de rejoindre un « groupe d'intérêt » publicitaire à l'aide de joinAdInterestGroup(), en transmettant des données, notamment des annonces pertinentes pour la navigation de l'utilisateur, le nom d'hôte de la plateforme publicitaire et les URL pour accéder à la logique et aux signaux d'enchère.
3. L'utilisateur visite un site, comme un éditeur d'actualités, qui affiche des publicités et est configuré pour accepter les publicités sélectionnées à l'aide de FLEDGE.
4. Le navigateur de l'utilisateur exécute une « enchère » pour choisir une annonce à afficher dans un inventaire (les espaces publicitaires) qui peut accepter les annonces sélectionnées par FLEDGE. Le « vendeur » dans cette enchère peut être le site lui-même ou un tiers agissant en son nom, comme une plateforme côté offre. Les « acheteurs » sont des tiers qui enchérissent pour l'inventaire publicitaire du site, tels que des plateformes côté demande agissant pour le compte d'annonceurs. Le vendeur de cette enchère d'annonces a trois fonctions :<br> • Choisir quels acheteurs peuvent participer.<br> • Choisir l'offre la plus souhaitable, en fonction du prix et des métadonnées de chaque offre.<br> • Indiquer le résultat de l'enchère.<br>
5. Le vendeur lance l'enchère publicitaire à l'aide de runAdAuction(), avec des données comprenant le nom d'hôte du vendeur, les signaux des acheteurs et du vendeur, et une URL pour la logique de décision de l'enchère.
6. L'enchère renvoie des données sur l'annonce gagnante. Les données ne sont pas accessibles par le site de l'éditeur, sauf pour afficher l'annonce dans un cadre délimité.
7. L'annonce s'affiche.

---

## Interagir et donner son avis

- **GitHub** : lisez la [proposition](https://github.com/WICG/turtledove/blob/master/FLEDGE.md), [posez des questions et suivez la discussion](https://github.com/WICG/turtledove/issues).
- **W3C** : discutez des cas d'utilisation du secteur au sein du [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).
- **Assistance aux développeurs** : posez des questions et participez aux discussions sur le [référentiel d'assistance aux développeurs Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## En savoir plus

- [Explication technique de l'API FLEDGE](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
- [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

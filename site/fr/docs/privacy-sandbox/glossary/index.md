---
layout: layouts/doc-post.njk
title: Glossaire de Privacy Sandbox
subhead: "Les articles et la documentation sur Privacy Sandbox supposent une connaissance des concepts de la confidentialité, de la publicité et du développement Web. Ce glossaire explique les termes clés."
description: "Explications simples des concepts clés."
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

{% Aside %} [Contactez-nous](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=) si vous pensez qu'il manque quelque chose ! {% endAside %}

## Plateforme publicitaire (Adtech) {: #adtech }

Une entreprise qui fournit des services de diffusion d'annonces.

## Annonceur {: #advertiser }

Une entreprise qui paie pour faire de la publicité pour ses produits.

## Attribution {: #attribution }

Identification des actions de l'utilisateur qui contribuent à un résultat. Par exemple : corrélation des clics ou des vues sur les annonces avec les [conversions](#conversion).

## Blink {: #blink }

Le [moteur de rendu](https://en.wikipedia.org/wiki/Browser_engine) utilisé par Chrome, développé dans le cadre du projet [Chromium.](#chromium)

## Chromium {: #chromium }

Un projet de navigateur Web open source. Chrome, Microsoft Edge, Opera et d'autres navigateurs sont basés sur Chromium.

## Taux de clics (TDC) {: #ctr }

Le ratio d'utilisateurs qui cliquent sur une annonce après l'avoir vue (voir aussi [impression](#impression)).

## Conversion après clic (CAC) {: #ctc }

Une conversion attribuée à une annonce sur laquelle un utilisateur a cliqué.

## Conversion

La réalisation d'un objectif souhaité suite à l'action d'un utilisateur. Par exemple, l'achat d'un produit ou l'inscription à une newsletter après avoir cliqué sur une annonce qui renvoie au site de l'annonceur.

## Cookie

Un site Web peut demander à un navigateur Web de stocker un petit morceau de données textuelles (appelé cookie) sur l'ordinateur d'un utilisateur. Les cookies peuvent être utilisés par un site Web pour enregistrer des données sur un utilisateur (ou une référence à des données stockées sur les serveurs principaux du site Web) lorsque l'utilisateur navigue sur le Web. Par exemple : une boutique en ligne peut conserver les détails du panier même si un utilisateur n'est pas connecté, ou le site peut enregistrer l'activité de navigation de l'utilisateur. Voir [cookie propriétaire](#first-party-cookie) et [cookie tiers](#third-party-cookie).

## Confidentialité différentielle {: #differential-privacy }

Techniques permettant le partage d'informations sur un ensemble de données pour révéler des modèles de comportement sans révéler d'informations privées sur des individus ou s'ils appartiennent à l'ensemble de données.

## Domaine

Voir [domaine de premier niveau](#tld) et [eTLD](#etld).

## eTLD, eTLD+1 {: #etld }

**Les domaines de premier niveau effectifs** sont définis par la [liste des suffixes publics](https://publicsuffix.org/list/). Par exemple :

```text
co.uk
github.io
glitch.me
```

Les eTLD permettent à foo.appspot.com d'être un site différent de bar.appspot.com. Le domaine de premier niveau **effectif** dans ce cas est appspot.com, et le **nom complet du site** (foo.appspot.com, bar.appspot.com) est appelé **eTLD+1**.

Voir aussi [Domaine de premier niveau](#tld).

## Entropie

Une mesure du nombre de fois qu'un élément de données révèle son identité individuelle.

L'entropie des données est mesurée en bits. Plus ces données révèlent l'identité, plus leur valeur d'entropie est élevée.

Les données peuvent être combinées pour identifier un individu, mais il peut être difficile de déterminer si de nouvelles données augmentent l'entropie. Par exemple, savoir qu'une personne est originaire d'Australie ne réduit pas l'entropie si vous savez déjà que la personne est originaire de Kangaroo Island.

## Identité fédérée (également appelée connexion fédérée)

Une plateforme tierce permettant à un utilisateur de se connecter à un site Web, sans que le site ne mette en œuvre son propre service d'identité.

## Fingerprinting {: #fingerprinting }

Techniques visant à identifier et à suivre le comportement des utilisateurs individuels. Le fingerprinting utilise des mécanismes que les utilisateurs ne connaissent pas et ne peuvent pas contrôler. Des sites tels que [Panopticlick](https://panopticlick.eff.org) et [amiunique.org](https://amiunique.org/) montrent comment les données de fingerprinting peuvent être combinées pour vous identifier en tant qu'individu.

## Surface de fingerprinting {: #fingerprinting-surface }

Élément qui peut être utilisé (probablement en combinaison avec d'autres surfaces) pour identifier un utilisateur ou un appareil particulier. Par exemple, la méthode JavaScript `navigator.userAgent()` et l'en-tête de requête HTTP `User-Agent` donnent accès à une surface de fingerprinting  (la chaîne de l'agent utilisateur).

## Propriétaire {: #first-party }

Qualifie les ressources du site que vous visitez. Par exemple, la page que vous lisez se trouve sur le site developer.chrome.com et inclut les ressources demandées à partir de ce site. Les demandes pour ces ressources propriétaires sont appelées « requêtes propriétaires » et les [cookies](#cookie) de developer.chrome.com stockés pendant que vous êtes sur ce site sont appelés [cookies propriétaires (ou cookies internes)](#first-party-cookie). Voir aussi [tiers](#third-party).

## Cookie propriétaire (ou interne) {: #first-party-cookie }

[Cookie](#cookie) stocké par un site Web pendant qu'un utilisateur est sur le site lui-même. Par exemple : une boutique en ligne peut demander à un navigateur de stocker un cookie afin de conserver les détails du panier d'achat d'un utilisateur qui n'est pas connecté. Voir aussi [cookies tiers](#third-party-cookie).

## Impression { : #impression }

- Vue d'une annonce (voir aussi [taux de clics](#ctr)).
- Un espace publicitaire : un rectangle vide sur une page Web où une annonce peut apparaître. Les espaces publicitaires constituent l'[inventaire](#inventory).

## Inventaire {: #inventory}

Les espaces publicitaires disponibles sur un site : les rectangles vides où les annonces peuvent apparaître.

## k-anonymat

Mesure de l'anonymat au sein d'un ensemble de données. Si vous avez *k* anonymat, on ne peut pas vous distinguer de *k-1* autres individus dans l'ensemble de données. En d'autres termes, *k* individus partagent les mêmes informations (vous y compris).

## Nonce

Numéro arbitraire utilisé une seule fois dans la communication cryptographique.

## Origine

L'origine d'une requête, y compris le schéma et le nom du serveur, mais aucune information sur le cheminement. Par exemple : `https://developer.chrome.com`

## Essai d'origine {: #origin-trial}

Les essais d'origine donnent accès à une fonctionnalité nouvelle ou expérimentale, afin de créer des fonctionnalités que les utilisateurs peuvent essayer pendant une durée limitée avant qu'elle ne soit mise à la disposition de tous. Lorsque Chrome propose un essai d'origine pour une fonctionnalité, une [origine](#origin) peut être enregistrée pour l'essai afin d'activer la fonctionnalité pour tous les utilisateurs de cette origine, sans les obliger à basculer vers une version alternative de Chrome (bien qu'ils puissent nécessiter une mise à niveau). Les essais d'origine permettent aux développeurs de créer des démos et des prototypes à l'aide de nouvelles fonctionnalités. Les essais aident également les ingénieurs Chrome à comprendre comment les nouvelles fonctionnalités sont utilisées et comment elles peuvent interagir avec d'autres technologies Web. Pour en savoir plus : [Getting started with Chrome's origin trials](https://web.dev/origin-trials/).

## Surface passive {: #surface-passive }

Certaines surfaces de fingerprinting, comme les chaînes d'agent utilisateur, les adresses IP et les en-têtes accept-language, sont disponibles pour chaque site Web, que le site les demande ou non. Cela signifie que les surfaces passives peuvent facilement consommer le budget de confidentialité d'un site.

L'initiative Privacy Sandbox propose de remplacer les surfaces passives par des moyens actifs d'obtenir des informations spécifiques, par exemple en utilisant les indications du client une seule fois pour obtenir la langue de l'utilisateur plutôt que d'avoir un en-tête accept-language pour chaque réponse à chaque serveur.

## Éditeur

Dans le contexte de Privacy Sandbox, un site qui affiche des publicités.

## Couverture

Le nombre total de personnes qui voient une annonce (ou qui visitent une page Web qui affiche l'annonce).

## Remarketing

Atteindre les personnes qui ont déjà visité votre site sur d'autres sites. Par exemple, une boutique en ligne peut diffuser des annonces pour une vente de jouets aux personnes qui ont déjà consulté des jouets sur leur site.

## Site

Voir [Domaine de premier niveau](#tld) et [eTLD](#etld).

## Surface

Voir [surface de fingerprinting](#fingerprinting-surface) et [surface passive](#passive-surface).

## Tiers {: #third-party }

Ressources fournies à partir d'un domaine différent du site Web que vous visitez. Par exemple, un site Web foo.com peut utiliser le code d'analyse de google-analytics.com (via JavaScript), les polices de use.typekit.net (via un élément de lien) et une vidéo de vimeo.com (dans un iframe). Voir aussi [propriétaire](#first-party).

## Cookie tiers {: #third-party-cookie}

[Cookie](#cookie) stocké par un service tiers. Par exemple, un site Web vidéo peut inclure un bouton **Regarder plus tard** dans son lecteur intégré, pour permettre à un utilisateur d'ajouter une vidéo à sa liste de souhaits sans l'obliger à naviguer vers le site vidéo. Voir aussi [cookie propriétaire (ou interne)](#first-party-cookie).

## Domaine de premier niveau (TLD) {: #tld }

Les domaines de premier niveau tels que .com et .org sont répertoriés dans la [base de données de la zone racine](https://www.iana.org/domains/root/db).

Notez que certains « sites » ne sont en fait que des sous-domaines. Par exemple, translate.google.com et maps.google.com ne sont que des sous-domaines de google.com (qui est l'[eTLD + 1](#etld)).

## .well-known

Il peut être utile d'ajouter des redirections vers un site Web à partir d'URL standardisées. Par exemple, les gestionnaires de mots de passe peuvent faciliter la mise à jour des mots de passe par les utilisateurs si un site Web définit une redirection `/.well-known/change-password` vers la page de modification du mot de passe du site. De plus, il peut être utile d'accéder à la politique ou à d'autres informations sur un hôte *avant de* faire une demande. Par exemple, robots.txt indique aux robots d'exploration Web quelles pages visiter et quelles pages ignorer. L'IETF [RFC8615](https://tools.ietf.org/html/rfc8615) décrit un moyen normalisé de rendre les métadonnées à l'échelle du site accessibles dans des emplacements standard dans un sous-répertoire /.well-known/. Vous pouvez en voir une liste sur [iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml).

---
layout: layouts/doc-post.njk
title: Erstanbietersets
subhead: Erlauben Sie verwandten Domainnamen, die sich im Besitz derselben Organisation befinden und von ihr betrieben werden, sich als ein Erstanbieter auszugeben.
description: Erstanbietersets ermöglichen es verwandten Domainnamen, die sich im Besitz derselben Organisation befinden und von ihr betrieben werden, sich als ein Erstanbieter auszugeben.
date: 2021-05-18
updated: 2021-08-12
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## Implementierungsstatus

- [In der Origin-Trial](https://web.dev/origin-trials/) für Chrome 89 bis 93.
- [Registrieren Sie sich für die Origin-Trial](/origintrials/#/view_trial/988540118207823873).
- [Chrome-Plattformstatus](https://chromestatus.com/feature/5640066519007232).
- [Chromium-Projekte](https://www.chromium.org/updates/first-party-sets).

## Warum brauchen wir Erstanbietersets?

{% YouTube id='cNJ8mZ-J3F8' %}

Webseiten bestehen aus Inhalten verschiedener [Origins](/docs/privacy-sandbox/glossary#origin) (Ausgangspunkte). Einige Inhalte sind Erstanbieterinhalte und stammen von der Top-Level-Website, die die Benutzer besuchen. Andere Inhalte können von Drittanbietern stammen, z. B. Anzeigen, eingebettete Medien oder freigegebene Ressourcen wie JavaScript-Bibliotheken von [CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/). Drittanbieter möchten möglicherweise Benutzeraktivitäten auch über verschiedene Websites hinweg korrelieren, indem sie Mechanismen wie [Cookies](/docs/privacy-sandbox/glossary#origin) verwenden.

Verschiedene Browser schlagen nun Datenschutzmodelle vor, die den Zugriff auf die Benutzeridentität im Cross-Site-Kontext einschränken. Viele Organisationen betreiben jedoch verwandte Websites mit unterschiedlichen Domainnamen, z. B. Domains für verschiedene Länder (wie z. B. `example.com` und `example.co.uk`), es sollte also möglich sein, zusammengehörige Domainnamen mit einer entsprechenden Beziehung, vielleicht auch mit dem selben Eigentümer, zu gestatten, sich als zu einem Erstanbieter gehörend zu erklären. Dies erlaubt es Browsern diese Domains in Situationen, in denen Erstanbieter und Drittanbieter unterschiedlich behandelt werden, als Erstanbieter zu behandeln.

Jede Lösung müsste auch einen Missbrauch des Systems verhindern. Es sollte beispielsweise nicht möglich sein unabhängige Sites mit verschiedenen Eigentümern, als zu einer Organisation zugehörig zu deklarieren und so Erstanbieter-Privilegien zu erlangen.

## Wie funktionieren Erstanbietersets?

Eine Website kann angeben, dass sie ein Mitglied (oder Eigentümer) einer Reihe von Webdomains ist, indem sie eine Manifest-Datei ausliefert, in der ihre Beziehung zu den anderen Domains definiert ist. Dies ist eine JSON-Datei die sich unter der Addresse `.well-known/first-party-set` befinden sollte.

Angenommen `a.example`, `b.example` und `c.example` möchten eine Erstanbieterset bilden, das sich im Besitz von `a.example` befindet. Die Websites würden dann die folgenden Ressourcen bereitstellen:

```json
// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}

// https://b.example/.well-known/first-party-set
{
	"owner": "a.example"
}

// https://c.example/.well-known/first-party-set
{
	"owner": "a.example"
}
```

Die Besitzerdomain hostet eine Manifestdatei, die die Domains ihrer Mitglieder auflistet. Ein Browser kann eine Mitgliedswebsite bitten, ihren Besitzer anzugeben, und dann das Manifest des Besitzers überprüfen, um die Beziehung zu verifizieren.

Von Browserrichtlinien wird erwartet, dass sie Missbrauch oder Fehlnutzungen verhindern. Beispielsweise dürfen Erstanbietersets den Austausch von Benutzerinformationen zwischen unabhängigen Sites oder Gruppierungen von Sites, die nicht derselben Organisation gehören, nicht zulassen. Eine der Möglichkeiten für eine Site, sich zu registrieren, könnte darin bestehen, dass die Site ihre gewünschte Gruppe von Domains zusammen mit den, für das Erfüllen der Browserrichtlinie notwendigen Informationen, an einen öffentlichen Tracker übermittelt (z. B. an ein eigens dafür eingerichtetes GitHub-Repository). Die Überprüfung der Kontrolle des Inhabers über Mitgliedsdomains würde es ebenfalls erfordern, dass an die `.well-known`-URLs aller Domains der Gruppe eine Aufforderung geschickt wird.

Der ergänzende Vorschlag zu Erstanbietersets ist das `SameParty`-Cookie-Attribut. Die Angabe des `SameParty`-Attributs in einem Cookie weist den Browser an, das Cookie mit einzuschließen, wenn sein Kontext Teil desselben Erstanbietersets ist wie der Kontext der obersten Websiteebene

Für das oben beschriebene Erstanbieterset kann beispielsweise a.example das folgende Cookie setzen:

`Set-Cookie: session=123; Secure; SameSite=Lax; SameParty`

Das heißt, wenn ein Besucher von b.example oder c.example eine Anfrage an a.example stellt, wird das `session`-Cookie in diese Anfrage aufgenommen.

---

## Beteiligen Sie sich und geben Sie Feedback ab

- **Origin-Trial**: Registrieren Sie sich und nehmen Sie an der [Chrome-Origin-Trial](/origintrials/#/view_trial/988540118207823873) teil.
- **GitHub**: Lesen Sie den [Vorschlag](https://github.com/privacycg/first-party-sets), stellen Sie [Fragen und verfolgen Sie die Diskussion](https://github.com/privacycg/first-party-sets/issues).
- **Entwickler-Support**: Stellen Sie im [Privacy-Sandbox-Entwickler-Support-Repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) Fragen und beteiligen Sie sich an Diskussionen.

## Erfahren Sie mehr

- [Technische Erläuterung zu Erstanbietersets](https://github.com/privacycg/first-party-sets)
- [Chrome-Plattformstatus](https://chromestatus.com/feature/5640066519007232).
- [Chromium-Projekte](https://www.chromium.org/updates/first-party-sets).

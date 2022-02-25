---
layout: layouts/doc-post.njk
title: Vertrauenstoken
subhead: Vertrauenstoken ist ein neues API, das ohne passivem Tracking dabei hilft, Betrug zu bekämpfen und Bots von echten Menschen zu unterscheiden.
description: Das Vertrauenstoken-API ermöglicht es, das Vertrauen eines Benutzers von einem Kontext auf einen anderen Kontext zu übertragen, ohne den Benutzer dabei zu identifizieren oder Identitäten zwischen den beiden Kontexten zu verknüpfen. Das API ermöglicht es einer Origin (auch „Ausgangspunkt“), einem Benutzer, dem sie vertraut, kryptografische Token auszugeben. Diese Token werden vom Browser des Benutzers gespeichert. Der Browser kann die Token dann in anderen Kontexten nutzen, um die Authentizität des Benutzers darzulegen.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## Implementierungsstatus

- [In der Origin-Trial](https://web.dev/origin-trials/) von Chrome 84 bis 94.
- [Registrieren Sie sich für die Origin-Trial](/origintrials/#/view_trial/2479231594867458049).
- [Demo](https://trust-token-demo.glitch.me/).
- [Chrome-Entwicklertools-Integration](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- [Chrome-Plattformstatus](https://www.chromestatus.com/feature/5078049450098688).

## Was sind Vertrauenstoken (Trust Tokens)?

{% YouTube id='bXB1Iwq6Eq4' %}

Vertrauenstoken ermöglichen es, das Vertrauen in die Authentizität eines Benutzers von einem Kontext in einen anderen zu übertragen, um Websites bei der Betrugsbekämpfung zu unterstützen und Bots von echten Menschen zu unterscheiden – ganz ohne passivem Tracking.

- Eine Website die als **Emittent** agiert kann Web-Browsern von Benutzern Token zuweisen, die zeigen, dass diese, zum Beispiel durch fortwährende Kontonutzung, Abschluss einer Transaktion oder aufgrund einer akzeptablen [reCAPTCHA-Punktzahl](https://developers.google.com/recaptcha) vertrauenswürdig sind.
- Eine Website, die als **Annahmestelle** für die Token agiert kann bestätigen, dass ein Benutzer echt ist, indem sie überprüft, ob er im Besitz von Token eines vertrauenswürdigen Emittenten ist, und dann bei Bedarf die Token annehmen.

Vertrauenstoken sind verschlüsselt, sodass es nicht möglich ist, eine Person zu identifizieren oder durch Verknüpfen vertrauenswürdiger und nicht vertrauenswürdiger Instanzen die Benutzeridentität zu ermitteln.

{% Aside 'caution' %} Vertrauenstoken sind kein Ersatz für reCAPTCHA oder andere Mechanismen die überprüfen, ob ein Nutzer der ist, der er vorgibt zu sein.

Vertrauenstoken sind eine Möglichkeit, Vertrauen in einen Benutzer zu bekunden und **vermitteln**, nicht um Vertrauen in einen Benutzer zu **schaffen**. {% endAside %}

## Warum brauchen wir Vertrauenstoken?

Das Web benötigt Möglichkeiten, Vertrauenssignale zu schaffen und zu übermitteln, die zeigen, dass ein Benutzer der ist, für den er sich ausgibt, und nicht ein Bot (der lediglich vorgibt, ein Mensch zu sein) oder böswilliger Dritter ist, der eine reale Person oder einen Dienst betrügt. Der Schutz vor Betrug ist besonders wichtig für Werbetreibende, Anzeigenanbieter und [CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

Leider nutzen viele derzeit vorhandene Mechanismen zur Bestimmung und Vermittlung von Vertrauenswürdigkeit (z. B. um zu Erkennen ob der Interaktionspartner einer Site ein echter Mensch ist) Technologie, die ebenfalls für Fingerprinting verwendet werden kann. Mechanismen zur Vermittlung von Vertrauen müssen die Privatsphäre wahren, damit Vertrauen über Websites hinweg vermittelt werden kann, ohne dass einzelne Benutzer nachverfolgt werden müssen.

Mit dem Vertrauenstoken-API kann eine Website einem Benutzer, dem sie vertraut, kryptografische Token ausgeben, die später an anderer Stelle verwendet werden können. Die Token werden im Browser des Benutzers sicher gespeichert und können dann in anderen Kontexten abgegeben werden, um die Authentizität des Benutzers zu bestätigen. Dadurch kann das Vertrauen eines Benutzers auf einer Website (z. B. einer Social-Media-Site oder bei einem E-Mail-Dienst) auf eine andere Website (z. B. einen Online-Shop oder einen sonstigen beliebigen Betreiber) übertragen werden, ohne den Benutzer zu identifizieren oder Identitäten über verschiedene Websites hinweg zu verknüpfen.

{% Aside 'key-term' %}<br> Mithilfe von [Fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) können Websites einzelne Benutzer identifizieren und tracken, indem sie Daten über ihr Gerät, Betriebssystem und Browser-Setup (z. B. Spracheinstellungen, [User Agent](https://developer.mozilla.org/docs/Web/API/NavigatorID/userAgent) und verfügbare Schriftarten) oder Änderungen des Gerätezustands abrufen. Dies kann entweder auf dem Server (durch Überprüfung der Anforderungsheader) oder auf dem Client (per JavaScript) erfolgen.

Das Fingerprinting greift auf Mechanismen zurück, die für Benutzer nicht erkenntlich sind und die sich nicht ihrer Kontrolle unterziehen. Websites wie [Panopticlick](https://panopticlick.eff.org/) und [amiunique.org](https://amiunique.org/) demonstrieren, wie Fingerprinting-Daten kombiniert werden können, um Sie als Einzelperson zu identifizieren.{% endAside %}

## Wie funktionieren Vertrauenstoken?

In diesem Beispiel möchte eine Betreiberwebsite vor dem Schalten einer Werbeanzeige überprüfen, ob ein Benutzer ein echter Mensch ist und sicherstellen, dass es sich nicht um einen Bot handelt.

1. Ein Benutzer besucht eine Website (die in diesem Fall ein **Emittent** ist) und führt Aktionen aus, auf Grund derer die Website annimmt, dass der Benutzer ein echter Mensch ist. Dazu gehören beispielsweise das Tätigen von Käufen, Nutzung eines E-Mail-Kontos oder erfolgreich abgeschlossene reCAPTCHA-Vorgänge.
2. Die Emittenten-Site verwendet das Vertrauenstoken-JavaScript-API, um eine Anfrage nach Vertrauenstoken an den Browser des Benutzers auszulösen.
3. Die Emittenten-Site antwortet mit Token-Daten.
4. Der Browser des Benutzers speichert die Daten für den Vertrauenstoken sicher ab.
5. Der Benutzer besucht eine andere Website (z. B. die eines Nachrichtenverlegers), die überprüfen möchte, ob der Benutzer ein echter Mensch ist, zum Beispiel beim Anzeigen von Werbung.
6. Die Site verwendet das Vertrauenstoken-API, um zu überprüfen, ob im Browser des Benutzers Ver für Emittenten gespeichert sind, denen die Site vertraut.
7. Es werden die Vertrauenstoken des Emittenten gefunden, den der Benutzer zuvor besucht hat.
8. Die Betreibersite fordert den Emittenten auf, die Vertrauenstoken einzulösen.
9. Die Emittenten-Site antwortet mit einem Einlösenachweis.
10. Die Betreiber-Site schickt eine Anfrage, die das Einlöseprotokoll enthält, an eine Werbeplattform, um zu zeigen, dass der Emittent Vertrauen darin hat, dass es sich bei dem Benutzer um einen echten Menschen handelt.
11. Die Werbeplattform stellt die für die Anzeige einer Werbeanzeige erforderlichen Daten bereit.
12. Die Betreibersite zeigt die Anzeige an.
13. Eine Anzeigenaufrufsimpression wird gezählt.

{% Aside %} Weitere Informationen zu den JavaScript-Aufrufen in diesem Beispiel finden Sie unter [Beispiel für die API-Verwendung](https://web.dev/trust-tokens/#sample-api-usage). {% endAside %}

---

## Beteiligen Sie sich und geben Sie Feedback ab

- **Origin-Trial**: Registrieren Sie sich und nehmen Sie an der [Chrome-Origin-Trial](/origintrials/#/view_trial/2479231594867458049) teil.
- **Demo**: Testen Sie das [Emittieren und Einlösen](https://trust-token-demo.glitch.me/) von Vertrauenstoken.
- **GitHub**: Lesen Sie den [Vorschlag](https://github.com/WICG/trust-token-api), stellen Sie [Fragen und verfolgen Sie die Diskussion](https://github.com/WICG/trust-token-api/issues).
- **W3C**: Diskutieren Sie industrielle Anwendungsfälle in der [Arbeitsgruppe zur Verbesserung von Internetwerbung](https://www.w3.org/community/web-adv/participants).
- **IETF**: Leisten Sie in der [Privacy-Pass-Arbetsgruppe](https://datatracker.ietf.org/wg/privacypass/about/) einen Beitrag zu den technischen Fragestellungen des zugrunde liegenden IETF-Protokolls.
- **Entwickler-Support**: Stellen Sie im [Privacy-Sandbox-Entwickler-Support-Repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) Fragen und beteiligen Sie sich an Diskussionen.

## Erfahren Sie mehr

- [Technische Erläuterung zum Vertrauenstoken-API](https://github.com/dvorak42/trust-token-api)
- [Erste Schritte mit Vertrauenstoken](https://web.dev/trust-tokens/): ein Überblick für Webentwickler
- [Erste Schritte mit Origin-Trials von Chrome](https://web.dev/origin-trials)
- [Mehr über die Privacy Sandbox erfahren](https://web.dev/digging-into-the-privacy-sandbox)

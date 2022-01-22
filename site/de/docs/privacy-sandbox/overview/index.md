---
layout: layouts/doc-post.njk
title: Was ist die Privacy-Sandbox?
subhead: Die Privacy-Sandbox-Initiative bezeichnet eine Reihe von Vorschlägen zum Umsetzen von Cross-Site-Anwendungsfällen unter Ausschluss der Nutzung von Drittanbieter-Cookies oder anderen Tracking-Mechanismen.
description: Welche Vorschläge sich darunter befinden, wie man sich einbringen kann und wozu sie dient.
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---

{% YouTube id='WnCKlNE52tc' %}

## Warum brauchen wir die Privacy-Sandbox?

Die Privacy-Sandbox-Initiative verfolgt zwei Hauptziele:

- Entwickeln von Ersatzlösungen, um Web-Anwendungsfälle und Online-Geschäftsmodelle zu unterstützen, ohne Benutzer einer websiteübergreifenden Verfolgung auszusetzen und Cross-Site-Tracking zu vermeiden, von dem Benutzer nichts wissen.
- Die Unterstützung für Drittanbieter-Cookies wird schrittweise eingestellt, sobald neue Lösungen eingeführt wurden.

## Worum handelt es sich bei den Privacy-Sandbox-Vorschlägen?

Chrome und andere Akteure des Ökosystems haben bisher mehr als 30 Vorschläge unterbreitet, die in den [öffentlichen Ressourcen der W3C-Gruppen zu finden sind](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo). Diese Vorschläge decken eine Vielzahl von Anwendungsfällen und Anforderungen ab.

Die wichtigsten Vorschläge des Chrome-Teams sind unten aufgeführt.

### Relevante Inhalte und Anzeigen

- [**FLoC**](/docs/privacy-sandbox/floc): Datenschutzgerechte interessenbasierte Auswahl von Werbeanzeigen und Inhalten: „relevante Werbeanzeigen“.
- [**FLEDGE**](/docs/privacy-sandbox/fledge): Anzeigenauswahl für Remarketing. Nachkomme von [TURTLEDOVE](https://github.com/WICG/turtledove).

### Messung und Attribution

- [**Attributionsberichterstattung**](/docs/privacy-sandbox/attribution-reporting): Korrelieren Sie Anzeigenklicks oder Anzeigenaufrufe mit Conversions. Früher bekannt als Event Conversion Measurement API. Aktiviert zwei Arten von Berichten: solche auf Ereignisebene sowie zusammengefasste.

### Erstanbieterschutz

- [**SameSite-Cookie-Änderungen**](https://web.dev/samesite-cookies-explained/): Sichern Sie Websites ab, indem Sie explizit Ihre Cross-Site-Cookies markieren.
- [**Erstanbietersets**](/docs/privacy-sandbox/first-party-sets): Erlauben Sie verwandten Domainnamen, die zur selben Organisation gehören, sich als zu einem Erstanbieter gehörend zu erklären.

### Betrugserkennung

- [**Vertrauenstoken**](/docs/privacy-sandbox/trust-tokens): Vermitteln Sie das Vertrauen in einen Benutzer von einem Kontext in einen anderen, um Betrug zu bekämpfen und Bots von Menschen zu unterscheiden.

### Einschränkung der Datensammlung

- [**Datenschutzbudget**](https://www.youtube.com/watch?v=0STgfjSA6T8): Erlaubt Websites, Informationen über den Browser oder das Gerät eines Benutzers abzurufen, ermöglicht es dem Browser jedoch, ein Kontingent für die Gesamtmenge an Informationen festzulegen, auf die eine Website zugreifen kann, sodass ein Benutzer nicht identifiziert werden kann.
- [**User-Agent-Client-Hinweise**](https://web.dev/user-agent-client-hints/): Der [User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)-String (UA) bietet eine signifikante Oberfläche für passives [Fingerprinting](https://w3c.github.io/fingerprinting-guidance/#passive) und lässt sich dazu noch schwer verarbeiten. Client-Hinweise (Client Hints) ermöglichen es Entwicklern, aktiv nur die Informationen anzufordern, die sie über das Gerät oder die Anforderungen des Benutzers benötigen, anstatt diese Daten aus dem User-Agent-String parsen zu müssen.
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): Beschränken Sie die Möglichkeit, einzelne Benutzer durch Zugriff auf ihre IP-Adresse zu identifizieren. Der Vorschlag besteht aus zwei Teilen: [**Willful IP Blindness**](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) bietet Websites die Möglichkeit, Browsern mitzuteilen, dass die Website IP-Adressen nicht mit Benutzern verknüpft werden, und [**Near-Path-NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) ermöglicht es Benutzergruppen, ihren Datenverkehr über denselben privatisierenden Server zu senden, um so effektiv ihre IP-Adressen vor einem Site-Host zu verstecken. Gnatcatcher stellt ebenfalls sicher, dass Websites, die für legitime Zwecke wie die Missbrauchsprävention Zugriff auf IP-Adressen benötigen, dies vorbehaltlich einer Zertifizierung und Prüfung tun können.

### Identität

- [**WebID**](https://github.com/WICG/WebID): Unterstützen von föderierter Identität (bei der sich ein Benutzer über einen Drittanbieterdienst bei einer Website anmelden kann), ohne die E-Mail-Adresse oder andere identifizierende Informationen des Benutzers an den Drittanbieterdienst oder die Website weiterzugeben, es sei denn, der Benutzer stimmt diesem ausdrücklich zu. WebID ermöglicht die föderierte Anmeldung ohne der Nutzung von Weiterleitungen, Pop-ups oder Drittanbieter-Cookies, die verwendet werden können, um Benutzer über Websites hinweg zu identifizieren und zu tracken.

## Wer arbeitet an der Privacy-Sandbox?

Bis Anfang 2021 gab es:

- Über 30 Privacy-Sandbox-Vorschläge, die von Chrome und anderen abgegeben wurden.
- Über 400 Teilnehmer, die W3C-Gruppen beigetreten sind, um Beiträge zu leisten, darunter die [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) und die [Privacy Community Group](https://www.w3.org/community/privacycg/participants).
- Fünf API-Implementierungen, die zum Testen in Chrome verfügbar waren.

## Wann werden die APIs implementiert?

Die [Seite zum Implementierungsstatus](/docs/privacy-sandbox/status/) auf dieser Website bietet Fortschrittsaktualisierungen für einzelne APIs.

---

## Beteiligen Sie sich und geben Sie Feedback ab

- **GitHub**: Lesen Sie die Erläuterung zu dem Vorschlag auf GitHub und stellen Sie unter der Registerkarte „Probleme“ Fragen oder geben Sie dort Kommentare zu der Erläuterung ab.<br> [Links zu den Erläuterungen](#explainers) finden Sie unten.
- **W3C**[: In der W3C Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/), der [Privacy Community Group](https://www.w3.org/community/privacycg/participants) und der [Web Incubator Community Group](https://github.com/WICG) können Anwendungsmöglichkeiten diskutiert und Branchen-Feedback ausgetauscht werden.
- **Entwickler-Support**: Stellen Sie im [Privacy-Sandbox-Entwickler-Support-Repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) Fragen und beteiligen Sie sich an Diskussionen.

## Erfahren Sie mehr

### Erläuterungen zu Privacy-Sandbox-Vorschlägen {: #explainers }

Für die Erläuterungen zu API-Vorschlägen wird Feedback benötigt, insbesondere um fehlende Anwendungsfälle mitzuberücksichtigen und datenschutzfreundlichere Wege zur Erreichung ihrer Ziele vorzuschlagen. Unter der Registerkarte „Probleme“ können Sie für jede Erläuterung Kommentare abgeben oder Fragen stellen.

- [Datenschutzbudget](https://github.com/bslassey/privacy-budget)
- [Vertrauenstoken](https://github.com/dvorak42/trust-token-api)
- [Erstanbietersets](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [Aggregated Reporting API](https://github.com/csharrison/aggregate-reporting-api)
- [Attributionsberichterstattung](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### Artikel und Videos für Webentwickler

- [Mehr über die Privacy Sandbox erfahren](https://web.dev/digging-into-the-privacy-sandbox)
- [SameSite-Cookies erklärt](https://web.dev/samesite-cookies-explained/)
- [Erste Schritte mit Vertrauenstoken](https://web.dev/trust-tokens)
- [Eine privatere Methode zur Messung von auf Anzeigen zurückzuführende Conversions](https://web.dev/conversion-measurement/)
- [Was ist FLoC?](https://web.dev/floc/)
- [Einführung des Datenschutzbudgets](https://www.youtube.com/watch?v=0STgfjSA6T8)

### Prinzipien und Konzepte hinter den Vorschlägen

- [Ein potenzielles Datenschutzmodell für das Web](https://github.com/michaelkleber/privacy-model) legt die Hauptprinzipien fest, die den APIs zugrunde liegen.
- [Die Privacy-Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- Überblick über die Privacy-Sandbox: [Ein privateres Web aufbauen](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Google AI-Blog: [Föderiertes Lernen: Kollaboratives Machine-Learning ohne zentralisierte Trainingsdaten](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [Die Zukunft von Drittanbieter-Cookies](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)

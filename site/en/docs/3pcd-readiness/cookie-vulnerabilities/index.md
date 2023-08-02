---
layout: layouts/doc-post.njk
title: Cookie Vulnerabilities
subhead: >
  What are the privacy and security issues with cookies.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

Cookies, in essence, are not inherently malevolent. Rather, they represent a straightforward and essential state management mechanism used across the web. However, it is this very simplicity of cookies that also renders them susceptible to potential misuse and raises concerns over user privacy and security. Let's birelfy look at the aspects of cookies at the core of their vulnerabilities. For a more in-depth coverage of Cookie security concerns, check [this documentation](https://httpwg.org/specs/rfc6265.html#security-considerations).

## Cookies facilitate tracking

While cookies are not the only method employed by servers to track users across HTTP requests, they facilitate tracking due to their persistent nature throughout user agent sessions and their ability to be shared across different sites.

Cookies set by embedded content can collect user information across site boundaries. When a user visits a site containing embedded third-party (3P) content and subsequently accesses another site with content from the same 3P, the 3P can effectively track the user's movements between these two sites. This allows cookie owneres to connect various data points such as browsing history, preferences, and location, and therefore enabling the construction of a comprehensive global identity for users.

{% Aside 'important' %}
Cookies facilitate tracking because they are persistent across user agent sessions and can be shared across site boundaries.
{% endAside %}

## Ambient Authority

Cookies encourage developers to to rely on ambient authority for authentication, that is, to separate designation (in the form of URLs) from authorization (in the form of cookies). Consequently, the user agent might supply the authorization for a resource designated by the attacker, possibly causing the server or its clients to undertake actions designated by the attacker as though they were authorized by the user.

{% Aside 'important' %}
Cookie access is “authenticated” via ambient authority often becoming vulnerable to attacks such as cross-site request forgery
{% endAside %}

## Clear Text

Unless transmitted over a secure channel like TLS (Transport Layer Security), the data contained in the Cookie and Set-Cookie headers is sent without encryption, potentially making it vulnerable to interception. This makes the cookie vulnerable:

1. All sensitive information conveyed in these headers is exposed to an eavesdropper.
2. A malicious intermediary could alter the headers as they travel in either direction, with unpredictable results.
3. A malicious client could alter the Cookie header before transmission, with unpredictable results.

{% Aside 'important' %}
Unless sent over a secure channel (e.g. HTTPS), the information on a cookie is transmitted in the clear.
{% endAside %}

It is important to always encrypt and sign cookie contents while transmitting them to the user agent, even if they transmited over a secure channel. However, it's important to note that encrypting and signing cookies alone cannot prevent cookie transplanting or replay attacks across different user agents or at a later time.

Furthermore, it is recommended to set and retrieve cookies exclusively over secure channels; that is, the Secure attribute for each cookie must be set properly. Neglecting to set the Secure attribute would render the protection offered by the secure channel largely ineffective.

## Weak Confidentiality

Cookies provide weak confidentiality, primarily stemming from the lack of isolation by port, scheme, and path.

1. **Cookies do not provide isolation by port**. When a cookie is readable by a service operating on a specific port, it becomes equally readable by a service functioning on a different port of the same server. Similarly, if a cookie is writable by a service on one port, it is also writable by a service on another port of the same server. For this reason it is important not to run mutually distrusting services on different ports of the same host and use cookies to store security-sensitive information.

2. **Cookies do not provide isolation by scheme**. Although being commonly employed in conjunction with HTTP and HTTPS schemes, cookies meant for a particular host might also be accessible to other schemes, such as ftp and gopher. For example, this lack of isolation by scheme is particularly evident in non-HTTP APIs that allow access to cookies, like HTML's document.cookie API.

3. **Cookies do not always provide isolation by path.**. Some user agents, like web browsers, expose cookies through non-HTTP APIs, such as HTML's _document.cookie API_. This exposure can lead to potential issues as some user agents do not sufficiently isolate resources received from different paths.

{% Aside 'important' %}
Cookies provide weak confidentiality: , there is no isolation neither by port, nor by scheme.
{% endAside %}

## Weak Integrity

Cookies do not provide integrity guarantees for sibling domains (and their subdomains).

Even though the Set-Cookie header supports the Path attribute, the Path attribute does not provide any integrity protection because the user agent will accept an arbitrary Path attribute in a Set-Cookie header.

{% Aside 'important' %}
Cookies provide
weak integrity guarantees for sibling domains, and their subdomains.
{% endAside %}

## Reliance on DNS

The Domain Name System (DNS) plays a pivotal role in providing security to cookies by establishing a secure and trustworthy connection between the user's web browser and the intended server. When a user requests a website, the DNS translates the human-readable domain name into an IP address, allowing the browser to locate the server hosting the website.

The security aspect comes into play when the browser verifies the authenticity of the server through DNSSEC (Domain Name System Security Extensions). DNSSEC strengthens authentication in DNS using digital signatures based on public key cryptography, ensuring that the information received from the DNS server is legitimate and has not been tampered with during transmission.

If the DNS is partially or fully compromised, cookies might fail to provide the security properties required by applications.

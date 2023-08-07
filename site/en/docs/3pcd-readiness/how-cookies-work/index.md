---
layout: layouts/doc-post.njk
title: How do cookies work?
subhead: >
  Learn how cookies are set, retrieved, modified, and shared.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - nmichell
  - albertomedina
---

## Cookies are for state management

An HTTP cookie is a mechanism for an origin server to send state information/state to a user agent and for the user agent to return the state information to the origin server. This means that Web cookies serve as a state management mechanism for HTTP, enabling websites to maintain information and remember user preferences across multiple interactions. When a user visits a website, the server sends a small piece of data known as a cookie to the user's web browser. This cookie is stored on the user's device, allowing the website to access and update it during subsequent visits.

## Anatomy of a cookie

{% Img src="image/WvQmAFP386a04HT2ItuD4b77Aml2/o4iiysR068tL9CGH09aZ.jpeg", alt="cookie anatomy", width="800", height="576" %}

<table class="with-borders">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td><b>name</b>=value</td>
    <td>Unique identifier for the cookie, specific to the domain that sets it, mapped to a data value stored in the cookie, typically encoded and sometimes encrypted. </td>
  </tr>
  <tr>
    <td><b>Domain</b>=value</td>
    <td>Specifies which domain sets and can retrieve the cookie.</td>
  </tr>
  <tr>
    <td><b>Path</b>=value</td>
    <td>The path that must exist in the requested URL for the browser to send the cookie header.</td>
  </tr>  
  <tr>
    <td><b>Max-Age</b>=number</td>
    <td>Lifespan (Expiration Date) of the cookie. If not specified, the cookie is a 'session' cookie.</td>
  </tr>
  <tr>
    <td><b>Secure</b></td>
    <td>Instructs the browser to only send the cookie over HTTPS.</td>
  </tr>
  <tr>
    <td><b>HttpOnly</b></td>
    <td>Prevents client-side scripts  from accessing the cookie.</td>
  </tr>
  <tr>
    <td><b>Partitioned</b></td>
    <td>Indicates that the cookie should be stored using partitioned storage.</td>
  </tr>
  <tr>
    <td><b>SameSite</b>=value</td>
    <td>Controls whether or not a cookie is sent with cross-site requests.</td>
  </tr>    
</table>

## Setting and retrieving cookies

{% Img src="image/WvQmAFP386a04HT2ItuD4b77Aml2/5ZKTfVsJIuk0xHnX7Lh2.jpeg", alt="ALT_TEXT_HERE", width="800", height="283" %}

To store state, the origin server includes a [Set-Cookie HTTP response header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie) in an HTTP response to the client user agent.

{% Aside 'important' %}
The Set-Cookie response header contains the header name "Set-Cookie" followed by a ":" and a cookie. Each cookie begins with a name-value-pair, followed by zero or more attribute-value pairs.
{% endAside %}

In subsequent requests, the user agent returns a [Cookie HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cookie) to the origin server, containing cookies received in previous Set-Cookie headers. The origin server is free to ignore the cookie header or use its contents for an application-defined purpose.

Each cookie-pair represents a cookie stored by the user agent. The cookie-pair contains the cookie-name and cookie-value the user agent received in the Set-Cookie header.

Notice that the cookie attributes are not returned. In particular, the server cannot determine from the cookie header alone when a cookie will expire, for which hosts the cookie is valid, for which paths the cookie is valid, or whether the cookie was set with the Secure or HttpOnly attributes.

## The scope of cookies

As a State Management mechanism, cookies encompass the notion of Scope for the state that can be collected through them. To understand the scope of cookies, we need to understand the difference between **web origins** and **websites**. Here we describe the Origin and Site concepts of in a nutshell, and for a more in-depth explanation make sure to check [this article](https://web.dev/same-site-same-origin/).

A **web "Origin"** is a combination of a scheme (also known as the protocol -- e.g. HTTP, HTTPS), hostname, and port (if specified). Websites that have the combination of the same scheme, hostname, and port are considered "same-origin". Everything else is considered "cross-origin".

A **web site** is the combination of the scheme, the [top-level domain (TLD)](https://developer.mozilla.org/docs/Glossary/TLD), and the part of the domain just before it (TLD+1). For example, given a URL of https://www.example.com:443/foo , the "site" is https://example.com. Top-level domains (TLDs) such as .com and .org are listed in the [Root Zone Database](https://www.iana.org/domains/root/db).

{% Aside 'important' %}
The Domain and Path attributes define the scope of a cookie. The Path attribute limits the scope of a cookie to a set of paths.
{% endAside %}

The Domain attribute specifies those hosts to which the cookie will be sent. For example, if the value of the Domain attribute is "example.com", the user agent will include the cookie in the cookie header when making HTTP requests to example.com, www.example.com, and www.corp.example.com. If the server omits the Domain attribute, the user agent will return the cookie only to the origin server. If the server omits the Path attribute, the user agent will use the "directory" of the request-uri's path component as the default value.

A "site-specific" cookie is intended to be accessible only to the website that created it, and it is used to power features such as remembering user preferences, login details, and other functionality relevant to that particular domain.

An "origin" cookie has a broader scope and can be accessed by multiple websites within the same originm, and they are typically used for scenarios where multiple related sites need to share certain data, streamlining user experiences across interconnected web services.

## Securing cookies

The **Secure attribute** limits the scope of a cookie to secure channels (i.e. HTTPS). However, although seemingly useful for protecting cookies from active network attackers, the Secure attribute protects only the cookie's confidentiality. An active network attacker can overwrite Secure cookies from an insecure channel, disrupting their integrity.

The **HttpOnly attribute** instructs the user agent to omit the cookie when providing access to cookies via "non-HTTP" APIs (such as a web browser API that exposes cookies to scripts). The HttpOnly attribute is independent of the Secure attribute; a cookie can have both the HttpOnly and the Secure attribute.

{% Aside 'warning' %}
Cookies are vulnerable to security attacks. [Learn more]().
{% endAside %}

## First-party vs. third-party cookies

The 1P vs. 3P classification of a cookie is not about the cookie itself; it is a contextual classification determined by how a cookie is used. A cookie is always created and intended to be accessed by a given site/domain. When a cookie is used to store and retrieve information in the context of the site that set the cookie, then such a cookie is considered a 1P cookie. If the information is placed in a cookie in the context of a given site (1P) and is accessed in the context of a different site (3P), then the cookie is considered a 3P cookie.

{% Aside 'important' %}
The 1P vs. 3P classification of cookies is about how the information stored in them is accessed across site boundaries.
{% endAside %}

---
layout: layouts/doc-post.njk
title: Privacy Sandbox Analysis Extension
subhead: >
  Chrome DevTools extension to help developers understand and analyze the use and behaviors of cookies during browsing sessions.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

The Privacy Sandbox Chrome DevTools extension aims at helping developers understand and analyze the use and behaviors of cookies during browsing sessions.

The goal of this tool is to assist users on getting knowledge and insights regarding the upcoming deprecation of the way in which 3P cookies work, and on the status an behaviors of the new Privacy Sandbox APIs. You can use the tool to analyze your site(s), your browsing experience, detect and report breakages, get support from Google on fixes, and, if you are developer of solutions that require cookie capabilities being deprecated, learn how to make them happen leveraging the new platform APIs that allow you to achieve the same goals in a privacy-preserving way.

## Browsing sessions

The term "browsing session" refers to the sequence of navigations a user follows over a period of time as they are actively engaging on the web, including activities like navigating through pages and sites, making transactions, submitting forms, or downloading content, performing web searches, and so on. The overall goal of Privacy Sandbox is to protect users' privacy online, including reducing cross-site and cross-app user tracking during browsing sessions. This tool supports the analysis of browsing sessions by shedding light on cookie usage and insights, and on use and behavior of PS APIs. The goal is to help answer questions such as:

- How can I identify cookies being used on my site?
- How can I tell what page components a third-party cookie is associated with?
- How can I block third party cookies on my site?
- What functionality breaks when 3P cookies are blocked?
- How can I test my web applications to ensure that they are compatible with the cross-site boundary APIs and the upcoming changes to third-party cookies?
- How can I provide feedback to Google on Privacy Sandbox APIs and third-party cookie deprecation?

## Information and insights

Centralize and easy to access cookie-related information via aggregated views, granular filtering and classification, issues, insights.

## Reporting

Make it easy for users to report breakages, and connect with existing feedback and bug reporting channels (key to enable us to promptly react to breakages, update tool capabilities, and provide feedback to product).

## Frame overlays

Facilitate association of page components with specific cookies.

## Demo scenarios companion folder

Runnable 1P/3P sample cases, illustrating cookie-related scenarios.

## Knowledge access points

Make it easy for developers to understand the role of 3P cookies and the relevant aspects of Privacy Sandbox supporting the implementation of the user journeys you are implementing. Includes:

1. Demos and examples
2. Pointers to sources of truth for cookies and PS APIs

## Applicatio Scenarios

### First-party cookies

The following are use cases for first-party cookies. Because first-party cookies are not going away, you likely won't have to change anything in these scenarios.

- User logged in. You may set a cookie to indicate that the user is logged into your site. However, if logging into your site means the user is logged into another site as well, this may be a third-party cookie.
- Items in cart. You may set a cookie or cookies to persist a user's shopping cart additions. If you share shopping carts with another site, you might be using third-party cookies. If the other sites you share the cart with are actually owned by you but have a different domain, you should be able to use First-Party Sets. First-Party Sets lets you indicate a list of sites of different origins that belong to you.
- Favorite movies, games, etc. If you have a site that allows users to favorite an item but do not require them to have an account with you, the favorited items are likely set using cookies with a very long expiry.

{% Aside 'update' %}
Complete this section.
{% endAside %}

{% Aside 'important' %}
1P cookies will not be affected by third-party cookie phase out.
{% endAside %}

### Third-party cookies

The following are common use cases for third-party cookies. Because third-party cookies will be deprecated, you'll need to use other means to achieve the same goals.

- Embedded apps. You may have, say, a weather app in an iframe on your site. To set location preferences for the user so they can always see the weather for their location, the iframe sets a cookie. This is a third-party cookie because the origin of the iframe (where the weather app lives) is not owned by you.
- Ads. Most sites display ads from ad networks by placing iframes from the ad network on their site. Right now, cookies are set for actions such as a user clicking an ad. That cookie is set while the user is on your site by the iframe because it happens in the iframe and that makes it a third-party cookie. For measurement purposes, the Privacy Sandbox has an API, the Attribution Reporting API, that can help you continue to measure ad performance without the use of third-party cookies.
- Shared shopping carts.

{% Aside 'update' %}
Complete this section.
{% endAside %}

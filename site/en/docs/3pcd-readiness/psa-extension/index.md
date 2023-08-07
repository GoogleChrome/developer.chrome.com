---
layout: layouts/doc-post.njk
title: Privacy Sandbox Analysis Extension
subhead: >
  Chrome DevTools extension to help developers understand and analyze the use and behaviors of cookies during browsing sessions.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - nmichell
  - albertomedina
---

Chrome DevTools extension to help developers understand and analyze the use and behaviors of cookies during browsing sessions.

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

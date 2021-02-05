---
layout: layouts/doc-post.njk
title: What is the Privacy Sandbox?
subhead: The Privacy Sandbox is a series of proposals to satisfy third-party use cases without third-party cookies or other tracking mechanisms.
description: What's in it, who's behind it, and what it's for.
date: 2021-02-05
updated: 2021-02-05
authors:
	- samdutton
---

## What is the Privacy Sandbox?

### The current state of privacy on the web

Websites use services from other companies to provide analytics, serve video and do lots of other useful stuff. Composability is one of the web's superpowers. Most notably, ads are included in web pages via third-party JavaScript and iframes. Ad views, clicks and conversions are tracked via third-party cookies and scripts.

However, when you visit a website you may not be aware of the third parties involved and what they're doing with your data. Even publishers and web developers may not understand the entire third-party supply chain.

Ad selection, conversion measurement, and other use cases currently rely on establishing stable cross-site user identity. Historically this has been done with third-party cookies, but browsers have begun to restrict access to these cookies. There has also been an increase in the use of other mechanisms for cross-site user tracking, such as covert browser storage, device fingerprinting, and requests for personal information such as email addresses.

This is a dilemma for the web. How can legitimate third-party use cases be supported without enabling users to be tracked across sites?

In particular, how can websites fund content by enabling third parties to show ads and measure ad performance—but not allow individual users to be profiled? How can advertisers and site owners evaluate a user's authenticity without resorting to dark patterns such as device fingerprinting?

The way things work at the moment can be problematic for the entire web ecosystem, not just users. For publishers and advertisers, tracking identity and using a variety of non-standard third-party solutions can add to technical debt, code complexity, and data risk. Users, developers, publishers, and advertisers should be confident that the web is protecting user privacy choices.

Advertising is a core web business model for the internet, but advertising has to work for everyone. Which brings us to the Privacy Sandbox's mission: to create a thriving web ecosystem that is respectful of users and private by default.

### Introducing the Privacy Sandbox

The Privacy Sandbox introduces a set of privacy-preserving APIs to support business models that fund the open web in the absence of tracking mechanisms like third-party cookies.

The Privacy Sandbox APIs require web browsers to take on a new role. Rather than working with limited tools and protections, the APIs enable the user's browser to act on the user's behalf—locally, on their device—to protect the user's identifying information as they navigate the web. The APIs enable use cases such as ad selection and conversion measurement, without revealing individual private and personal information. In engineering terms a sandbox is a protected environment; a key principle of the Privacy Sandbox is that a user's personal information should be protected and not shared in a way that lets the user be identified across sites.

This is a shift in direction for browsers. The Privacy Sandbox's vision of the future has browsers providing specific tools to satisfy specific use cases, while preserving user privacy. A Potential Privacy Model for the Web sets out core principles behind the APIs:

To establish the range of web activity across which the user's browser can let websites treat a person as having a single identity.
To identify the ways in which information can move across identity boundaries without compromising that separation.
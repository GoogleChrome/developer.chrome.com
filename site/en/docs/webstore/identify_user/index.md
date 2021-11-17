---
layout: "layouts/doc-post.njk"
title: Identifying the User
date: 2017-08-30
description: How to get the Google Account identity of a Chrome Web Store user.
---

Supporting Google account sign-in can help provide a better user experience. Users of the Chrome Web Store are likely to be logged in to their Google account already, so they won't have to set up and remember yet another username and password.

This tutorial builds an extension using the [Google OAuth2/OpenID][link] endpoint and the [Chrome
Identity API][link].  When the user clicks the [action][link], the extension will launch a consent
screen. After the user signs in to their Google account; the background console will log their
information.



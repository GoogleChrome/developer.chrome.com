---
layout: "layouts/doc-post.njk"
title: "Chrome Apps"
date: 2022-07-21
articleClasses: cws-policy
---

<!-- Atypical formatting is necessary to enable markdown formatting for LI contents -->

To ensure a great user experience, Chrome Apps distributed through the Chrome Web Store must follow
the additional quality guidelines listed below. The guidelines in this section apply only to Chrome
Apps.

1. Packaged Apps should:

    1. Take advantage of the capabilities of the platform and not wrap around existing websites or
       simply launch a webpage without providing additional functionality.

    1. Detect an offline state and clearly message that state to the user.

    1. Recover automatically from loss of Internet connectivity, and should resume normal
       functioning when connectivity is restored without the user having to restart the app.

1. Packaged and Hosted apps should not:

    1. Require a local executable, other than the Chrome runtime, to run.

    1. Provide a webview of a website that is not owned or administered by you.

    1. Download or execute scripts dynamically outside a sandboxed environment such as a webview or
       a sandboxed iframe.

    1. Misuse notifications by sending spam, ads, promotions of any kind, phishing attempts, or
       unwanted messages in general.

---
layout: "layouts/doc-post.njk"
title: "Chrome Apps"
date: 2022-07-21
---

<!-- Atypical formatting is necessary to enable markdown formatting for LI contents -->

To ensure a great user experience, Chrome Apps distributed through the Chrome Web Store must follow the additional quality guidelines listed below. The guidelines in this section apply only to Chrome Apps.

<ol type="I">
<li>

Packaged Apps should:

<ol type="A">
<li>

Take advantage of the capabilities of the platform and not wrap around existing websites or simply launch a webpage without providing additional functionality.

</li>
<li>

Detect an offline state and clearly message that state to the user.

</li>
<li>

Recover automatically from loss of Internet connectivity, and should resume normal functioning when connectivity is restored without the user having to restart the app.

</li>
</ol>

</li>
<li>

Packaged and Hosted apps should not:

<ol type="A">
<li>

Require a local executable, other than the Chrome runtime, to run.

</li>
<li>

Provide a webview of a website that is not owned or administered by you.

</li>
<li>

Download or execute scripts dynamically outside a sandboxed environment such as a webview or a sandboxed iframe.

</li>
<li>

Misuse notifications by sending spam, ads, promotions of any kind, phishing attempts, or unwanted messages in general.

</li>
</ol>

</li>
</ol>

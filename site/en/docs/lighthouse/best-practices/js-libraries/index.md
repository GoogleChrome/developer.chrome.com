---
layout: 'layouts/doc-post.njk'
title: Detected JavaScript libraries
description: |
  Learn about Lighthouse's diagnostic "Detected JavaScript libraries" audit.
date: 2019-05-02
updated: 2019-08-28
---

[Lighthouse](/docs/lighthouse/overview/) lists all front-end JavaScript libraries detected on the page:

<figure>
  {% Img src="image/tcFciHGuF3MxnTr1y5ue01OGLBn2/cMTmEHvebD2V2saRMJ4u.png", alt="Lighthouse audit showing all front-end JavaScript libraries detected on page", width="800", height="168" %}
</figure>

## This is a diagnostic audit

This audit simply lists all the front-end JavaScript libraries your page uses.

## Resources

[Source code for **Detected JavaScript libraries** audit](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/dobetterweb/js-libraries.js)

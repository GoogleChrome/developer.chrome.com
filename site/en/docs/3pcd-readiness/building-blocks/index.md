---
layout: layouts/doc-post.njk
title: Privacy-preserving building blocks
subhead: >
  Strive to replace existing functionality with privacy-preserving techniques.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

Eventually 3P cookies will be removed and we will need to rely on other technologies as building blocks for implementing the kind of features users have come to expect on the web, and which greatly improve their experience. The following table provides a concise mapping from available or proposed web platform APIs to the scenario they can be used to replace the use of cookies.

<table class="with-borders with-heading-tint">
  <thead>
    <tr>
      <th>API</th>
      <th>Scenario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/3pcd-readiness/web-storage">Web Storage</a></td>
      <td>.</td>
    </tr>     
    <tr>
      <td><a href="/docs/3pcd-readiness/first-party-sets">First-Party Sets</a></td>
      <td>Indicate a group of your sites as belonging to a set that can be treated by the browser as first-party sites and share cookies. A shared shopping cart is a great use for First-Party Sets, as is single sign-on.</td>
    </tr>
    <tr>
      <td><a href="/docs/3pcd-readiness/chips">CHIPS</a></td>
      <td>Partition cookies by top-level site. Map widget to show store locations, chat widget. You want the user's preferred store location to be stored, but not share that cookie with other sites using that component.</td>
    </tr>
    <tr>
      <td><a href="/docs/3pcd-readiness/storage-access">Storage Access</a></td>
      <td>.</td>
    </tr>
    <tr>
      <td><a href="/docs/3pcd-readiness/fenced-frames">Fenced Frames</a></td>
      <td>.</td>
    </tr>
    <tr>
      <td><a href="/docs/3pcd-readiness/fed-cm/">Credential Management (FedCM)</a></td>
      <td>Federated identity services enable users to log into sites without sharing their personal information with a third-party service or website.</td>
    </tr>
    <tr>
      <td><a href="/docs/3pcd-readiness/private-tokens">Private State Tokens</a></td>
      <td>.</td>
    </tr>
  </tbody>
</table>

Learn more about how leverage the capabilities of the web platform to replace 3P cookies from your use case by reviewing the components of this section, and the [Privacy Sandbox documentation](/docs/privacy-sandbox/).

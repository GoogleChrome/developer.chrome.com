---
layout: layouts/doc-post.njk
title: Privacy-preserving building blocks
subhead: >
  Strive to replace existing functionality with privacy-preserving techniques.
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - nmichell
  - albertomedina
---

Eventually 3P cookies will be removed and we will need to rely on other technologies as building blocka for implementing the kind of features users have come to expect on the web, and which greatly improve their experience. The following table provides a concise mapping from available or proposed web platform APIs to the scenario they can be used to replace the use of cookies.

<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Scenario</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>First-Party Sets</td>
      <td>Indicate a group of your sites as belonging to a set that can be treated by the browser as first-party sites and share cookies. A shared shopping cart is a great use for First-Party Sets, as is single sign-on.</td>
    </tr>
    <tr>
      <td>CHIPS</td>
      <td>Partition cookies by top-level site. Map widget to show store locations, chat widget. You want the user's preferred store location to be stored, but not share that cookie with other sites using that component.</td>
    </tr>
    <tr>
      <td><a href="http://localhost:8080/docs/privacy-sandbox/fedcm/">Federated Credential Management (FedCM)</a></td>
      <td>Federated identity services enabling users to log into sites without sharing their personal information with a third-party service or website.</td>
    </tr>
    <tr>
      <td><a href="http://localhost:8080/docs/privacy-sandbox/trust-tokens/">Private State Tokens</a></td>
      <td>Convey a limited amount of information from one browsing context to another to help combat fraud, without passive tracking.</td>
    </tr>
    <tr>
      <td><a href="http://localhost:8080/docs/privacy-sandbox/#show-relevant-content">Ad relevance</a></td>
      <td>A suite of APIs to enable <a href="http://localhost:8080/docs/privacy-sandbox/#show-relevant-content">ad relevance</a></td>
    </tr>
    <tr>
      <td><a href="http://localhost:8080/docs/privacy-sandbox/#measure-digital-ads">Measurement</a></td>
      <td>Interest-based advertising, on-device auctions for custom audiences, cross-site content selection, ad conversion measurement and attribution, and more.</td>
    </tr>
  </tbody>
</table>


Learn more about how leverage the capabilities of the web platform to replace 3P cookies from your use case by reviewing the components of this section, and the [Privacy Sandbox documentation](/docs/privacy-sandbox/).

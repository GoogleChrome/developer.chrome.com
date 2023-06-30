---
layout: 'layouts/blog-post.njk'
title: Introducing Privacy Sandbox Demos
description: >
  Privacy Sandbox Demos offer cookbook recipes, sample code, and demo applications, based on Privacy Sandbox APIs.
authors:
  - seburan
tags:
  - privacy
date: 2023-06-29
---

The Privacy Sandbox initiative offers [over 20 APIs](/docs/privacy-sandbox/) to protect people's privacy online while giving companies and developers tools to build thriving digital businesses. Publishers, advertisers and ad tech providers have begun to evaluate and plan how they can continue to provide a free and open internet while also protecting people's privacy.

We're progressively expanding our developer resources, and you can find the currently available documentation and demos for each API on the [Chrome Developers website](/docs/privacy-sandbox/). We also understand that ad tech companies and web ecosystem developers expect new approaches to typical use cases supported today by third-party cookies. These use cases often require incorporating a combination of new Privacy Sandbox APIs into their products, which requires planning and a clear understanding how these APIs work.

Privacy Sandbox Demos offer cookbook recipes, sample code, and demo applications, based on Privacy Sandbox APIs. These are intended to aid businesses and developers in adapting their applications and the businesses they support to a web ecosystem without third-party cookies.

## What can you expect from Privacy Sandbox Demos ? 

Privacy Sandbox Demos are available as open-sourced code, and lightweight infrastructure bundled as container images scripts. The repository includes instructions for deploying and running the demos in your local environment with Docker, as well as instructions for deploying it on Google Cloud Platform. We are also provisioning [Google-hosted instances](https://privacy-sandbox-demos.dev/) for everyone, including those who are simply curious, to quickly start learning and experimenting.

A [number of organizations](https://www.google.com/url?q=https://privacysandbox.com/%23ecosystem&sa=D&source=docs&ust=1687308560959323&usg=AOvVaw33TZoXl39m4LkRaevo66Z0) are currently [evaluating and testing](/docs/privacy-sandbox/unified-origin-trial/) the Privacy Sandbox APIs. Their feedback is critical to developing the web's new standards. We anticipate receiving additional feedback and refining our proposals by publishing solutions to the typical ad tech use cases. Your contributions are also welcome.

On the adoption path of Privacy Sandbox APIs, we expect that Privacy Sandbox Demos will be a valuable resource for web developers. Reference materials (recipes, samples code, and demos) will be expanded to cover the most common use cases, which we hope will accelerate the transition.

## Our first release is now available

The first release of Privacy Sandbox Demos is [now available on GitHub](https://github.com/privacysandbox/privacy-sandbox-demos). Further deployment instructions are available in the repository's [README](https://github.com/privacysandbox/privacy-sandbox-demos/blob/main/README.md) file.  
For this first release, we have prepared a set of use cases demos : 

<table>
  <thead>
    <tr>
      <th><strong>Use case</strong></th>
      <th><strong>Description</strong></th>
      <th><strong>APIs</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Remarketing</td>
      <td>Show relevant ads to a user who has researched a brand or product online.</td>
      <td>Protected Audience API<br>
Fenced Frame</td>
    </tr>
    <tr>
      <td>Single-touch conversion Attribution</td>
      <td>Measure conversion after seeing ads on a news site and buying a project on an online shopping site.</td>
      <td>Attribution Reporting API</td>
    </tr>
  </tbody>
</table>

These use cases are implemented through a set of demo apps and services that we have developed in the project to simulate the actors in the digital advertising ecosystem:

<table>
  <thead>
    <tr>
      <th><br>
Demo app</th>
      <th><br>
Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><br>
E-commerce site</td>
      <td><br>
An advertiser shopping site </td>
    </tr>
    <tr>
      <td><br>
News site</td>
      <td><br>
A publisher site where ads are displayed</td>
    </tr>
    <tr>
      <td><br>
SSP service (Supply Side Platform)</td>
      <td><br>
The demo SSP service :<br>
<ul>
<li>Chooses Ads to show based on Topics, Protected Audience auctions and other contextual or first party signals</li>
</ul>
<ul>
<li>Shows Ads in iframe or fenced frame</li>
</ul>
<ul>
<li>Registers view/click impression with Attribution Reporting API</li>
</ul>
</td>
    </tr>
    <tr>
      <td><br>
DSP service (Demand Side Platform) </td>
      <td><br>
The demo DSP service :<br>
<ul>
<li>Joins user into interest group with Protected Audience API</li>
</ul>
<ul>
<li>Register conversion with Attribution Reporting API</li>
</ul>
</td>
    </tr>
  </tbody>
</table>

Future releases will include new use cases, demo scenarios, and new services to support the latest advancements in privacy preserving technologies. Additionally, we'll add more documentation and cookbook recipes for developers to implement these use cases for their business.

## Engage and share feedback

We're continuing our effort to deliver comprehensive documentation and demos, and we welcome your feedback on which use cases you would like to see in future releases. Share your ideas and feedback on our [issue tracker](https://github.com/privacysandbox/privacy-sandbox-demos/issues).

To learn more about Privacy Sandbox Demos and Privacy Sandbox APIs, check out [GitHub](https://github.com/privacysandbox/privacy-sandbox-demos). 
---
title: Manifest V2 support timeline
seoTitle: "Chrome Extensions Manifest V2 support timeline"
subhead: 'Understand when Manifest V2 will stop working for extensions'
description: 'Details of the Manifest V2 phase-out and end of life.'
layout: 'layouts/doc-post.njk'
date: 2021-09-23
updated: 2023-05-23
tags:
  - extensions-news
---

{% Aside %}

**December 9, 2022:** The Manifest V2 deprecation timelines are under review and the experiments scheduled for early 2023 are being postponed. For more information, [read the update](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E) in the chromium-extensions Google Group.

{% endAside %}

As Manifest V3 approaches full feature parity with Manifest V2, we'll progressively phase out Manifest V2. This page specifies the timetable for this deprecation and describes the meaning of each milestone. See [Migrating to Manifest V3](/docs/extensions/migrating/) for instructions on converting your extension. 

<figure data-size="full">
  {% Img src="image/WlD8wC6g8khYWPJUsQceQkhXSlv1/txfDeyLhratHCO1P3wvc.jpg", alt="Summary of the Manifest V2 support timeline.", width="800", height="263", class="screenshot" %}
  <figcaption>Summary of the Manifest V2 support timeline.</figcaption>
</figure>

{% Aside %}

Check this page for any updates and for more specific dates as these milestones get closer.

{% endAside %}

<table>
  <tr align="left" valign="top">
    <td>
    </td>
    <td><strong>Chrome Web Store<br>behavior changes</strong>
    </td>
    <td><strong>Chrome Browser<br>behavior changes</strong>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><strong>January&nbsp;17,&nbsp;2022</strong>
    </td>
    <td>
      <ul>
        <li>Existing Manifest V2 extensions can no longer be changed from "Private" to "Public" or "Unlisted".</li>
        <li>Chrome Web Store stops accepting new Manifest V2 extensions with visibility set to "Public" or "Unlisted".</li>
      </ul>
    </td>
    <td><i>no change</i>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><strong>June&nbsp;2022</strong>
    </td>
    <td><ul>
      <li>Chrome Web Store stops accepting new Manifest V2 extensions with visibility set to "Private".</li>
      </ul>
    </td>
    <td><i>no change</i>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><s>January&nbsp;2023</s><br><strong><a href="https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E/m/HjaaCIG-BQAJ">Postponed</a></strong></td>
    <td><ul>
      <li>Manifest V3 will become a prerequisite for the <a href="https://blog.google/products/chrome/find-great-extensions-new-chrome-web-store-badges/">Featured badge</a>.</li></ul>
    </td>
    <td><ul>
      <li>Enterprise policy can let Manifest V2 extensions run on Chrome deployments
      <a href="https://support.google.com/chrome/a/answer/9296680?hl=en">within an organization</a>.
      </li>
      <li>Chrome may run experiments to turn off support for Manifest V2 extensions in Canary, Dev, and Beta channels.
      </li></ul>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><s>June&nbsp;2023</s><br><strong><a href="https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E/m/HjaaCIG-BQAJ">Postponed</a></strong></td>
    <td>
      <ul>
        <li>All existing Manifest V2 items with visibility set to Public at that time will have their visibility changed to Unlisted.</li>
      </ul>
    </td>
    <td><ul>
      <li>Chrome may run experiments to turn off support for Manifest V2 extensions in all channels, including stable channel.</li></ul>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><s>January&nbsp;2024</s><br><strong><a href="https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zQ77HkGmK9E/m/HjaaCIG-BQAJ">Postponed</a></strong></td>
    <td>
      <ul>
        <li>Chrome Web Store stops accepting updates to existing Manifest V2 extensions</li>
        <li>Following the expiration of the Manifest V2 enterprise policy, the Chrome Web Store will remove all remaining Manifest V2 items from the store.</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Manifest V2 enterprise policy expires. This means Chrome will stop running Manifest V2 extensions, even ones installed using <code>ExtensionInstallForcelist</code>.</li>
      </ul>
    </td>
  </tr>
</table>

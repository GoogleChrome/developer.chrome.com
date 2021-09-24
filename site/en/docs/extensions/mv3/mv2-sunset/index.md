---
layout: 'layouts/doc-post.njk'

title: Manifest V2 support timeline

subhead: 'Understand when Manifest V2 will stop working for extensions'

description: 'Details of the Manifest V2 phase-out and end of life.'

date: 2021-09-23

---

As MV3 approaches full feature parity with MV2, we'll be progressively phasing out MV2. This page
specifies the timetable for this deprecation and describes the meaning of each milestone.

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/zXdU3hdkj1K0Ks6tAfB4.png", alt="Diagram of MV2
support timeline", width="800", height="270" %}

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
    <td><strong>January&nbsp;17, 2022</strong>
    </td>
    <td><ul>
      <li>Chrome Web Store stops accepting new Manifest V2 extensions with visibility set to “Public" or "Unlisted”
      <li>Existing Manifest V2 extensions can no longer be changed from “Private” to "Public" or "Unlisted"</li></ul>
    </td>
    <td><i>no change</i>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><strong>June&nbsp;2022</strong>
    </td>
    <td><ul>
      <li>Chrome Web Store stops accepting new Manifest V2 extensions with visibility set to “Private”</li></ul>
    </td>
    <td><i>no change</i>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><strong>January&nbsp;2023</strong>
    </td>
    <td><ul>
      <li>Chrome Web Store stops accepting updates to existing Manifest V2 extensions</li></ul>
    </td>
    <td><ul>
      <li>Chrome stops running Manifest V2 extensions
      <li>Enterprise policy can let Manifest V2 extensions run on Chrome deployments
      <a href="https://support.google.com/chrome/a/answer/9296680?hl=en">within the organization</a>.
      </li></ul>
    </td>
  </tr>
  <tr align="left" valign="top">
    <td><strong>June&nbsp;2023</strong>
    </td>
    <td><i>no change</i>
    </td>
    <td><ul>
      <li>Manifest V2 extensions no longer functions in Chrome even with the use of enterprise policy </li></ul>
    </td>
  </tr>
</table>

---
title: "WebDriver BiDi - The future of cross-browser automation"
description: >
  Getting to know what is WebDriver BiDi and why it is the future of cross-browser automation
layout: "layouts/blog-post.njk"
authors:
  - jecelynyeen
  - sadym
date: 2021-07-29
updated: 2023-05-11
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nrI18Gn6bcbje10UnJBj.jpg'
alt: ''
tags:
  - test-automation
  - devtools
---

{% YouTube id='6oXic6dcn9w', startTime='443' %}

In our [earlier article](/blog/test-automation-evolution), we examined the existing automation protocols, namely WebDriver "Classic" and Chrome DevTools Protocol (CDP), along with their respective advantages and constraints. 

Enter WebDriver BiDi, the future of browser automation! It's a new standard browser automation protocol currently under development, aiming to combine the best of both WebDriver “Classic” and CDP. WebDriver BiDi promises bi-directional communication, making it fast by default, and it comes packed with low-level control. 

<table class="responsive width-full with-borders">
  <tbody>
    <tr>
      <th colspan=2>WebDriver BiDi</th>
    </tr>
    <tr>
      <th>WebDriver “Classic”</th>
      <th>Chrome DevTools Protocol (CDP)</th>
    </tr>
    <tr>
      <td>Best cross-browser support</td>
      <td>Fast, bi-directional messaging</td>
    </tr>
    <tr>
      <td>W3C standard</td>
      <td>Provides low-level control</td>
    </tr>
    <tr>
      <td>Built for testing</td>
      <td></td>
    </tr>
  </tbody>
</table>

The vision behind WebDriver BiDi is to let you write tests using any of your favorite tools and automate them in any browser or driver, giving you full flexibility.

<figure>
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qvV2R9lIeceKZRdEOg31.png", alt="The vision behind WebDriver BiDi.", width="800", height="226" %}
<figcaption>The vision behind WebDriver BiDi</figcaption>
</figure>

## Standardization

The [WebDriver BiDi Working Group](https://www.w3.org/groups/wg/browser-tools-testing) comprises a diverse group of browser vendors, open-source browser automation projects, and companies offering browser automation solutions. This collaboration ensures a promising future for browser automation.

<figure>
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wCClsI95nuyoI3zVFoP5.png", alt="The WebDriver BiDi Working Group", width="800", height="253" %}
<figcaption>The WebDriver BiDi Working Group</figcaption>
</figure>

The work is mostly done in [this GitHub repository](https://github.com/w3c/webdriver-bidi). There are monthly meetings with all major browser vendors reporting actual progress and discussing arguable and unknown specifics. The cross-company working group makes sure that decisions are aligned with all stakeholders.

Establishing and implementing a new protocol is no small feat. It requires concerted efforts from various vendors collaborating and working together. The process involves:

- [Specification](https://bit.ly/wbidi-w3c): a request for comments (RFC) process to collect feedback on the proposal.
- [Verification](https://bit.ly/wbidi-wpt): a series of tests that are runnable across platforms, serving as the source-of-truth for all the implementations.
- [Implementation](https://bit.ly/wbidi-dashboard): browsers implement the protocols according to the spec and pass the verification tests.


## Challenges

In this section, we'll delve into the challenges of implementing WebDriver BiDi, as it seeks to strike a balance between compatibility, usability, and implementability. 

### Beyond a CDP clone: embracing cross-browser compatibility

CDP, with its Chrome- and DevTools-specific elements, cannot be directly replicated in the WebDriver BiDi specification. Implementing CDP as-is would be infeasible for other browsers, rendering a spec that merely documents how to do so pointless.

### Ensuring low latency

WebDriver BiDi must be designed to handle high latency without sacrificing performance. In CDP, the latency is low because client and server are almost always run in the same physical machine, but this is not the case in WebDriver BiDi. Therefore, WebDriver BiDi has to minimize the number of roundtrips required between client and server.

### Prioritizing ergonomics in BiDi

While developers aren't expected to build WebDriver BiDi clients from scratch, it's crucial to avoid over-complicating the protocol. An overly complex BiDi would not only be challenging to implement but also difficult to work with, hindering adoption and usage.

### Ensuring BiDi's implementability

WebDriver BiDi must be realistically implementable, taking into account the limitations of various browsers. For instance, retaining all JavaScript objects ever exposed to clients by BiDi could result in memory leaks, while not keeping any would hinder debugging and interaction with a page's JavaScript. It's essential to strike a balance that enables effective browser automation without compromising performance.


## Overcoming challenges

In this section, we'll discuss the strategies employed to address the challenges of implementing WebDriver BiDi.

### Rapid prototyping
Addressing the challenge of implementability is crucial for BiDi's success. To accelerate progress on the specification and tests, we adopted a rapid prototyping approach using NodeJS. This not only enables us to experiment with different solutions but also facilitates the development of Web Platform Tests.

### Design with performance in mind

This design decision is driven by performance since, in some cases, the latency is high in WebDriver BiDi. For example, when retrieving an object ID and value from the browser, WebDriver BiDi only requires one roundtrip, while CDP requires two. This is because WebDriver BiDi can return both the ID and value in a single response (the result should not be JSON-serializable), while CDP must return them separately.

### Emphasis on Web Platform Tests (WPT)

[Web Platform Tests](https://bit.ly/wbidi-wpt) play a significant role in BiDi's works. Currently covering WebDriver “Classic” and WebDriver BiDi, WPT serves as a reliable reference for all implementations. These tests are designed to be run and passed across various implementations, ensuring consistent cross-browser protocol execution, which is vital for the success of WebDriver BiDi. Check out the [latest WPT result in the dashboard](https://bit.ly/wbidi-dashboard).

## What is the plan and current progress?

Take a look at the [WebDriver BiDi roadmap](https://bit.ly/wbidi-roadmap) to understand the project's direction. The roadmap is a work in progress and constantly evolving.

Refer to the latest [Web Platform Tests](https://bit.ly/wbidi-wpt) for the implementation status across browsers, as it serves as the source-of-truth. 

Keep up with the [project milestones](https://bit.ly/wbidi-milestones) to monitor its progress.

<!-- TODO: Enable this sentence once the article is live -->
<!-- Discover the [achievements made in 2023](http://bit.ly/wbidi-2023) and stay updated on the latest developments! -->


## Supporting WebDriver BiDi: how you can help

Are you excited about the future of browser automation with WebDriver BiDi? Here's how you can show your support:

- Be an **early tester and adopter**, helping to shape the future of WebDriver BiDi.
- Spread the word! Share the project on social media using the hashtag **#WebDriverBiDi**.
- **Ask for support**. File a feature request or check with your favourite tools on their plans for adopting WebDriverBiDi.
- **Participate in the RFC**, providing feedback on the APIs.


## Common questions

**Is WebDriver BiDi going to replace Chrome DevTools Protocol (CDP)?**

No. Chromium-based browsers will continue to use CDP for debugging purposes, while WebDriver BiDi is the new specification to address the testing needs with a more ergonomic API.

**Since Puppeteer is using CDP, does this mean Puppeteer will be deprecated?**

No. However, WebDriver BiDi will enable Puppeteer to become a cross-browser automation tool.

**Do you have a public roadmap?**

Yes, visit our roadmap on [GitHub](https://bit.ly/wbidi-roadmap).

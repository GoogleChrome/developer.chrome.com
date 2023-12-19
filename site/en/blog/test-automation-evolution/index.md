---
layout: 'layouts/blog-post.njk'
title: "A look back in time: the evolution of test automation"
authors:
  - jecelynyeen
  - sadym
date: 2023-04-18
updated: 2023-05-11
description: "A journey into the evolution of test automation on the web."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jGD1IO9UitBVPt7IsRol.jpg'
alt: ''
tags:
  - test-automation
  - devtools
---

{% YouTube id='6oXic6dcn9w', startTime='58' %}

## The birth of test automation

Let's rewind back to the 1990s when the web browser was born. Test automation didn't become a reality until the 2000s, with the emergence of [Selenium](https://www.selenium.dev/history/) and [WebDriver](https://www.selenium.dev/history/#:~:text=testing%20tool%20called-,WebDriver.,-It%20did%20not) projects to tackle cross-browser and multi-device testing challenges. 

These two projects joined forces in 2011 as [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/) and became a [W3C standard](https://w3c.github.io/webdriver/) in 2018. We usually refer to it as WebDriver or **WebDriver “Classic”**.

<figure>
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5YPW7sdvnbo1urlNCujv.png", alt="The evolution of the Selenium WebDriver project.", width="800", height="235" %}
<figcaption>The evolution of the Selenium WebDriver project</figcaption>
</figure>

Test automation prior to WebDriver “Classic” was quite tricky. Being able to automate browser testing significantly improved the quality of developers’ and testers’ lives.


## The rise of JavaScript

As web development evolved to rely more on JavaScript, new automation solutions such as WebdriverIO, Appium, Nightwatch, Protractor (deprecated), Testcafe, Cypress, Puppeteer, and Playwright emerged. 

<figure>
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ebBv0vflZ8KByQprZklM.png", alt="JavaScript automation tools.", width="800", height="246" %}
<figcaption>JavaScript automation tools</figcaption>
</figure>


## Automation approaches

Broadly, these tools can be organized into two major groups based on how they automate browsers:

- **High level**: Tools that execute JavaScript **within the browser**. For instance, [Cypress](https://bit.ly/cypress-architecture) and [TestCafe](https://bit.ly/testcafe-architecture) leverage web APIs and Node.js to run tests directly in the browser. Fun fact—the first version of [Selenium](https://www.selenium.dev/) also used the same approach.
- **Low level**: Tools that execute remote commands **outside of the browser**. When tools require even greater control, such as opening multiple tabs or simulating device mode, that's when they need to execute remote commands to control the browser via protocols. 
The two main automation protocols are **WebDriver “Classic”** and **Chrome DevTools Protocol (CDP)**.

In the next section, we will take a look at these two protocols to understand their strengths and limitations.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ils4VhvIba2mzo1HeXDC.png", alt="WebDriver Classic and CDP.", width="800", height="454" %}


## WebDriver "Classic" versus Chrome DevTools Protocol (CDP)

[WebDriver "Classic"](https://w3c.github.io/webdriver/) is a web standard supported by all major browsers. Automation scripts issue commands via HTTP requests to a driver server, which then communicates with browsers through internal, browser-specific protocols. 

While it has excellent cross-browser support and its APIs are designed for testing, it can be slow and does not support some low-level controls.

<figure>
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iIWQ1kEaZabrlHUoezJ0.png", alt="WebDriver 'Classic'.", width="800", height="343" %}
<figcaption>WebDriver “Classic”</figcaption>
</figure>

For example, imagine you have a test script that clicks on an element `await coffee.click();`. It is translated into a series of HTTP requests.

```bash
# WebDriver: Click on a coffee element

curl -X POST http://127.0.0.1:4444/session/:element_id/element/click
   -H 'Content-Type: application/json'
   -d '{}'
```

On the other hand, [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol) was initially designed for Chrome DevTools and debugging, but was adopted by [Puppeteer](https://pptr.dev/) for automation. CDP communicates directly with Chromium-based browsers through WebSocket connections, providing faster performance and low-level control. 

However, it only works with Chromium-based browsers and is not an open standard. On top of that, CDP APIs are relatively complex. In some cases, working with CDP is not ergonomic. For example, working with out-of-process iframes takes a lot of effort.

<figure>
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/p0ZMpaUO9gX0Is0BskHq.png", alt="CDP.", width="800", height="243" %}
<figcaption>Chrome DevTools Protocol</figcaption>
</figure>

For example, clicking on an element `await coffee.click();` is translated into a series of CDP commands.

```js
// CDP: Click on a coffee element

// Mouse pressed
{ 
  command: 'Input.dispatchMouseEvent', 
  parameters: {
    type: 'mousePressed', x: 10.34, y: 27.1, clickCount: 1 }
}

// Mouse released
{ 
  command: 'Input.dispatchMouseEvent', 
  parameters: {
    type: 'mouseReleased', x: 10.34, y: 27.1, clickCount: 1 }
}
```

## What are the low-level controls?

Back in the days when WebDriver “Classic” was developed, there wasn't a need for low-level control. But times have changed, the web is much more capable now, and testing today demands more fine-grained actions.

Since CDP was designed to cover all debugging needs, it supports more low-level controls compared to WebDriver “Classic”. It's capable of handling features like: 

- Capturing console messages
- Intercepting network requests
- Simulating device mode
- Simulating geolocation
- And more!

These weren’t possible in WebDriver “Classic” because of the different  architecture—WebDriver “Classic” is HTTP-based, making it tricky to subscribe and listen to browser events. CDP, on the other hand, is WebSocket-based, supporting bi-directional messaging by default.


## What’s next: WebDriver BiDi
Here is a summary of the strengths of both WebDriver “Classic” and CDP:

<table class="responsive width-full with-borders">
  <tbody>
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

[WebDriver BiDi](/articles/webdriver-bidi/) aims to combine the best aspects of WebDriver "Classic" and CDP. It's a new standard browser automation protocol currently under development.

Learn more about the [WebDriver BiDi project](/articles/webdriver-bidi/)—how it works, the vision, and the standardization process. 

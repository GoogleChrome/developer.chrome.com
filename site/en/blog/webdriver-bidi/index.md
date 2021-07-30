---
title: "WebDriver BiDi - The future of cross-browser automation"
description: >
  Gwtting to know what is WebDriver BiDi and why it is the future of cross-browser automation
layout: "layouts/blog-post.njk"
authors:
  - sadym
date: 2021-07-29
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kKvmeye2fJ1mUhYD9oOX.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

<!-- lint disable no-smart-quotes -->

If you have ever worked with browser automation, you probably know how overwhelming it can be. In this article I am going to describe the motivation standing behind the new browser automation protocol we currently work on: **WebDriver BiDi**. It’s a new browser automation protocol which can be used from all kinds of testing tools instead of WebDriver or Chrome DevTools Protocol (CDP). 

Foreseeing question: “Does it mean Puppeteer will be deprecated?”. The answer is “No way!". Instead, WebDriver BiDi will allow Puppeteer to become a cross-browser automation tool. 

This article will give you a walkthrough on the current ways of browser automation - WebDriver, CDP, Puppeteer, their strengths and limitations, then move on to talk about WebDriver BiDi - its goals, challenges and current progress. 

## WebDriver
When [Selenium WebDriver](https://www.selenium.dev/documentation/en/webdriver/) (commonly referred to as just *WebDriver*) was released in 2011, I was super excited! Test automation prior to that was quite tricky. Being able to automate browser testing improved the quality of developers’ and testers’ lives significantly. In fact, WebDriver has been a standard solution for cross-browsing testing in web development ever since then.

### Strengths

#### API
WebDriver is a protocol, allowing testing tools to provide a cross-browser automation API. Without having a browser API there were no ways to make e2e tests, instead end-to-end testing had to be performed manually.

#### Standard
WebDriver is a standard, which provides the best cross-browser support among all modern browser automation protocols. The same behavior can be expected from multiple implementations.

### Limitations

#### HTTP
WebDriver is based on the HTTP protocol, which implies the following limitations:

- **Pull-model**. Clients need to send HTTP requests to the Server in order to receive a HTTP response and Server would not send messages to Client directly. Therefore, implementing event listeners in this model would be quite tricky.

- **New connection**. Establishing a new connection for each command  requires more network round trips.

#### Standard
WebDriver is a W3C standard. The basic problem is that coming to agreement about how multiple implementations should work is harder than making changes to an individual implementation. So it takes more time.

#### No low-level control
At the time the protocol was developed, there was no need for low-level control. Times have changed, and testing now requires more and more fine-grained actions. One example is getting console log messages, which is easily implemented by CDP, and not currently possible with WebDriver. Theoretically, WebDriver can be extended with that functionality, but considering previous limitations, it would make sense to think of a more revolutionary approach.

## Chrome DevTools Protocol (CDP)
There are other ways to automate browsers. [CDP](https://chromedevtools.github.io/devtools-protocol/) was developed to communicate between Chrome and DevTools. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LWjUVqkOpuklhfDHRZbx.png", alt="CDP", width="620", height="143" %}

Soon enough it became obvious that CDP can be used for browser automation as well. For example, [ChromeDriver](https://chromedriver.chromium.org/) implements WebDriver protocol using CDP.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zgkEBJKmK4SGFw8o7x6B.png", alt="ChromeDriver implements WebDriver protocol using CDP", width="620", height="143" %}

### Strengths
- CDP is open source and very [well documented](https://chromedevtools.github.io/devtools-protocol).
- CDP is relatively extensible, which allows Chrome and DevTools to keep a fast development pace.
- It’s fast, because it uses a bi-directional connection (pipes or websockets).
- It provides low-level control over the browser. Any CDP client can have the same control over Chrome and DevTools + some additional possibilities like working with tabs, creating incognito tabs etc.

### Limitations
- CDP is not a standard, and will unlikely ever be. CDP has lots of details that are specific to how Chrome happens to have evolved, which won't make sense for other browsers, and which aren't very ergonomic to work with. Great respect to Firefox, who [implemented a test-related subset of the CDP](https://hacks.mozilla.org/2021/01/improving-cross-browser-testing-part-2-new-automation-features-in-firefox-nightly/), but it's the only non-chrome browser supporting CDP.
- Relatively complex, because it was developed for DevTools, not tests. In some cases working with CDP is not ergonomic. Eg working with out of process iframes takes lots of effort.

## Puppeteer
It’s not only ChromeDriver which uses CDP for test automation. [Puppeteer](https://pptr.dev/) and Cypress use CDP as well.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1YAd7ikhCJ3417xQTuxv.png", alt="Puppeteer and Cypress use CDP as well", width="622", height="208" %}

Puppeteer is a Node.js library, which can be used to automate Chrome using CDP. It provides an ergonomic JavaScript API, hiding all the CDP complexity. It provides a great low-level control over Chrome.

### Strengths
- Ergonomic JavaScript API, hiding all the CDP complexity.
- Great low-level control over Chrome.

### Here are a few examples of what Puppeteer can do

#### Mobile device emulation
Emulation includes not only the device resolution but also some other things to make an emulated device not distinguishable from the real one: sends specific user-agent headers, provides device-specific events.

```js
const browser = await puppeteer.launch();
const page = await browser.newPage();
const pixel = puppeteer.devices['Pixel 2 XL'];
await page.emulate(pixel);
await page.goto('https://www.google.com/search?q=chrome');
await page.waitForXPath(`//span[text() = 'Google Play']`);
await page.screenshot({ path: 'screenshot.png' });
await browser.close();
```

The result is a mobile version of the search page.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gYmV8ivFo8UtNP5ZFRb1.png", alt="mobile version of the search page", width="800", height="512" %}

#### Geolocation emulation
Modern browsers have the geolocation API, and developers with Puppeteer can easily emulate position.

```js
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.getContext().overridePermissions(['geolocation']);
const ekb = { latitude: 56.833330, longitude: 60.583330 }; // Jekaterinburg
page.setGeolocation(ekb);
const page = await browser.newPage();
await page.goto('https://www.google.com/maps');
await browser.close();
```

The code above opens Google Maps with emulated location and produces the following result:

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zt5xTWLaoR5koM5ua1hf.png", alt="Google Maps", width="800", height="814" %}

#### Network listeners
Puppeteer allows to add network events listeners and interceptions. Meaning both network requests and responses can be monitored and replaced/mocked if necessary. Here is an example of its usage.

```js
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setRequestInterception(true);
page.on('request', async (req) => {
   if (req.resourceType() === 'image') {
      const dogUrl = await randomDog();
      req.continue({ url: dogUrl });
   } else {
      req.continue();
   }
});
await page.goto('https://facebook.com/ClubCatLovers');
await page.screenshot({ path: 'screenshot.png' });
await browser.close();
```

This code replaces all the requests to `image` resource with a random dog picture. The result will be as follows:

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VHMJBObcbD7K6cGnMrR7.png", alt="replace dog images", width="624", height="257" %}

### Limitations
The main limitation is in the fact that Puppeteer is based on non-standard CDP, and it is supported only by Chrome and Firefox.

## WebDriver BiDi
That is where WebDriver BiDi comes on the scene! The idea of WebDriver BiDi is to make a new standard protocol for browser automation, which will be based on the bi-directional transport protocol (WebSocket or pipes). The idea is to get the best from 2 worlds: WebDriver and CDP. A standard browser automation protocol with fast bi-directional transport with low-level control.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GPb0lbwmKjxwOZVodl4m.png", alt="WebDriver BiDi", width="624", height="199" %}

### Challenges

#### WebDriver cannot be a CDP twin, only a cousin

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IiqeXvzg5SaOJp6O4Z04.jpg", alt="WebDriver cannot be a CDP twin, only a cousin", width="555", height="327" %}

Because CDP contains lots of Chrome and DevTools specific stuff, it doesn’t make sense to copy CDP to a BiDi spec. Other browsers couldn't implement CDP as-is, so there's no point in writing down a spec, which is just an elaborate description for how other browsers could implement it.

#### BiDi has to be ergonomic
We don't expect developers to implement WebDriver BiDi clients themselves each time, but we don't want to make it over-complicated either. Having over-complicated BiDi would make it hard to implement and to work with.

#### BiDi has to be implementable
It should be possible to implement at all! It’s important to keep in mind browsers’ limitations. Eg keeping in-memory all the JavaScript objects ever exposed to clients by BiDi can create a memory leak, while not keeping them at all would make it not possible to debug and interact with pages’ JavaScript.

### W3C standardisation
All browser vendors are involved in the specification process. Here are some of them:

- Apple
- BrowserStack
- Google
- Microsoft
- Mozilla
- Sauce Labs

The work is mostly done in the [GitHub repository](https://github.com/w3c/webdriver-bidi). There are monthly meetings with all major browser vendors reporting actual progress and discussing arguable and unknown specifics. The cross-companies working group makes sure the decisions are aligned with all stakeholders.

### Prototype
As mentioned, one of the critical points is making BiDi implementable. To unblock progress on specification and tests, we came up with an idea to prototype as quickly as possible using NodeJS. This allows us to not only  try different approaches, but unblocks Web Platform Tests development.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kHi33Xk5w2tS2Z1aVVt3.png", alt="Prototype", width="623", height="237" %}

### Web Platform Tests (WPT)
Another important aspect of BiDi is Web Platform Tests. Currently they cover WebDriver, and de-facto is a source-of-truth for all the implementations. It’s a cornerstone for cross-browser protocol implementation, and intended to be run and to be passed against any implementation.

## What is the current state?
Current state of prototype and specification can be tracked here: [WebDriver BiDi prototyping progress](https://docs.google.com/spreadsheets/d/1acM-kHlubpwnW1mFboS9hePawq3u1kf21oQzD16q-Ao/edit?resourcekey=0-PuLHQYLmDJUOXH_mFO-QiA#gid=0)
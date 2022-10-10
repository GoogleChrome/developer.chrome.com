---
title: "Customize and automate user flows beyond Chrome DevTools Recorder"
description: >
  Learn how to customize and automate user flows beyond Chrome DevTools Recorder.
layout: "layouts/blog-post.njk"
authors:
  - ergunsh
  - jecelynyeen
date: 2022-10-11
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5HiT116405BsAIwcRzE4.jpg'
alt: ''
tags:
  - devtools-engineering
  - devtools
---

{% include 'partials/devtools/en/banner.md' %}

{% YouTube id='LBgzmqzp7ew' %} 

Let’s admit it, writing automated tests is not the most fun thing in a developer’s life. As developers, we want to write features, fix bugs, and improve the world! However, when we don’t have automated testing in our workflows, in the long term, things can get quite buggy. So, we also think that writing automated tests is important.

With the [Recorder](/docs/devtools/recorder/) panel in Chrome DevTools, you can record and replay user flows, export it to various formats (e.g. test scripts) through different 3rd-party extensions and libraries, customize the user flows with [Puppeteer Replay](https://github.com/puppeteer/replay) library, and integrate them with your existing workflows.

In this blog post, we’re going to discuss: 

- how to export and replay user flows programmatically
- how to customize your user flows with the help of Puppeteer Replay
- how to integrate with your [CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd) workflows

This blog post assumes you know the basics of Recorder. If you are new, follow this [short introductory tutorial and video guide](/docs/devtools/recorder/) to get started.

## Export user flows and replay programmatically {: #export-json }

By default, the Recorder gives you the ability to export these recordings as a [Puppeteer](https://pptr.dev/) or [Puppeteer Replay](https://github.com/puppeteer/replay) script, or as a plain JSON file.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fohgHrLdvct9FtdGzstn.png", alt="Export options.", width="800", height="544" %}

Once you export the user flows as JSON files, you have the options to [import it back](/docs/devtools/recorder/reference/#import-flows)) to the Recorder panel and replay it, or use external libraries to replay it. [Puppeteer Replay](https://goo.gle/puppeteer-replay) library is one of the libraries.

### Replay with Puppeteer Replay {: #pptr-replay }

[Follow the instructions](https://github.com/puppeteer/replay#installation) on the repository to install Puppeteer Replay. 

Let’s say you save your JSON user flows in the `recordings` folder (e.g. [demo project](https://github.com/jecfish/recorder-demo)), you can use the following command to execute one or more user flows. 

```bash
# replay one user flow
npx @puppeteer/replay ./recordings/order-a-coffee.json

# replay all user flows under recordings folder
npx @puppeteer/replay ./recordings/*.json
```

Optionally, you can add a npm script for running the recordings; add this line to the `scripts` field in the `package.json` :

```js 
"replay-all": "replay ./recordings/*.json"
```

With that, you can run `npm run replay-all` in the command line to replay all recordings. 

User flows replay without UI by default (a.k.a [headless mode](/blog/headless-chrome/)). If you would like to see the UI, set the `PUPPETEER_HEADLESS` environment variable to false before running the command.

```js
PUPPETEER_HEADLESS=false npm run replay-all
```

### Replay with 3rd-party libraries {: #3rd-party-replay }

There are some third party libraries you can use to replay beyond Chrome browser. Here is the [full list of libraries](https://github.com/puppeteer/replay#getting-started-with-puppeteer-replay).

For example, [TestCafe](https://testcafe.io/documentation/403998/guides/experimental-capabilities/chrome-replay-support) is an end-to-end testing framework. It supports replay JSON user flows with Safari and more!

```js
npm install -g testcafe

# replay with selected browsers
testcafe safari ./recordings/order-one-coffee.json
testcafe firefox ./recordings/order-one-coffee.json
testcafe chrome ./recordings/order-one-coffee.json

# replay with all browsers
testcafe all ./recordings/order-one-coffee.json
```

On the other hand, [Saucelabs](https://saucelabs.com/blog/how-to-create-test-scripts-using-chrome-devtools) is a cloud-based test platform. It supports replay JSON user flows with different browsers and versions on the cloud.

Here is an example configuration file in Saucelabs. Check out the [demo repository](https://github.com/saucelabs/saucectl-replay-example).

```yml
apiVersion: v1alpha
kind: puppeteer-replay
suites:
  - name: "order a coffee"
    recordings: [ "recordings/order-a-coffee.json" ]
…
``` 

## Export user flows with different extensions {: #extensions }

Apart from the default options, you can also [install extensions](/docs/devtools/recorder/reference/#recorder-extension) to export user flows to different formats.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/V0cQUnQz6HrgohOvSjUA.png", alt="Export user flows with different extensions.", width="800", height="595" %}

For example, you can record and export the user flows as [WebPageTest custom script](https://bit.ly/wpt-recorder). With the script, you can test the performance of multi-step user flows through your applications. Writing those scripts, however, can sometimes be challenging.

In addition to that, If you already have testing tools in place, there are extensions to export user flows to different test scripts like Cypress, Nightwatch, WebdriverIO, Testing Library, and more. Here is the [full list](/docs/devtools/recorder/reference/#recorder-extension). This could help your and your team bootstrap tests quicker.

### Transform to different test scripts programmatically {: #transform }

On top of the extensions, most of these test providers also [published libraries](https://github.com/puppeteer/replay#getting-started-with-puppeteer-replay) to help you convert multiple JSON user flows programmatically.

For example, use the [@cypress/chrome-recorder](https://bit.ly/cypress-chrome-recorder) libraries to export user flows to Cypress tests.

```bash
npm install -g @cypress/chrome-recorder
npx @cypress/chrome-recorder ./recordings/*.json

```

## Build your own extensions or libraries  {: #extend }

Behind the scenes, all extensions and libraries are built on top of the Puppeteer Replay library. Apart from allowing you to replay user flows, Puppeteer Replay offers APIs letting you [customize](https://github.com/puppeteer/replay#2-customize-replay) or [transform](https://github.com/puppeteer/replay#3-transform-recording) user flows replay.


### Customize user flows replay {: #customize-replay }

Let’s build a screenshot plugin. For each user flow, we want to:

- take a screenshot at the end of every step and save it to the `_screenshots` folder
- output a message when the user flow execution is completed

Here is the code snippet. You can download this [demo](https://github.com/jecfish/recorder-demo) and play with it too.

```js
/* screenshot-plugin.mjs */

import { mkdirSync } from "fs";
import { PuppeteerRunnerExtension } from "@puppeteer/replay";

// create folder if not exist
let screenshotFolder = "_screenshots";
mkdirSync(screenshotFolder, { recursive: true });

export default class ScreenshootPlugin extends PuppeteerRunnerExtension {
  count = 0;

  async afterEachStep(step, flow) {
    await super.afterEachStep(step, flow);
    this.count = this.count + 1;

    const path = `${screenshotFolder}/${flow.title}-${this.count}.png`;
    await this.page.screenshot({ path });

    console.log(`Save screenshot as ${path}`);
  }

  async afterAllSteps(step, flow) {
    await super.afterAllSteps(step, flow);
    console.log("Operation completes successfully.");
  }
}
```

The code is pretty expressive itself. We extend the `PuppeteerRunnerExtension` API to save the screenshot after each step, and log a message after all the steps.

Save the file, then we can run user flows with this extension using the following command:

```
# replay one user flow with plugin 
npx @puppeteer/replay --extension ./screenshot-plugin.mjs  ./recordings/order-a-coffee.json

# replay all user flows with plugin under recordings folder
npx @puppeteer/replay --extension ./screenshot-plugin.mjs ./recordings/*.json

```

Here is the output:

```bash
Save screenshot as _screenshots/order-a-coffee-1.png
Save screenshot as _screenshots/order-a-coffee-2.png
Save screenshot as _screenshots/order-a-coffee-3.png
…

Operation completes successfully.
```

### Transform user flows {: #customize-transform }

Another way to customize the user flow is to transform it into different formats (e.g. Cypress, Nightwatch test scripts, etc).

For example, your user flow contains a step to navigate to an url. Here is how the JSON file looks like:

```json
{
  "title": "order-a-coffee",
  "steps": [
    {
      "type": "navigate",
      "url": "https://coffee-cart.netlify.app/"
    },
    …
  ]
}
```

You can create a stringify plugin, to transform the step to javascript. You can view other existing libraries to see how they do it. 

For example, the code snippet below shows [how WebdriverIO transform the navigation step](https://github.com/webdriverio/chrome-recorder/blob/main/src/stringifyExtension.ts#L58).

```js

export class StringifyPlugin extends PuppeteerStringifyExtension {

  #appendStepType(out: LineWriter, step: Step, flow: UserFlow) {
        switch (step.type) {
        case 'navigate':
	Return out.appendLine(`await browser.url(${formatAsJSLiteral(step.url)})`)
        …
  }

```

When you run the plugin with the user flows, the navigation line translates into `await browser.url(‘https://coffee-cart.netlify.app/’)`.

### Publish Chrome extensions {: #publish-extension }

Once you customize and transform the user flows, you can package it as a Chrome extension and publish it to the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions).

Refer to this demo and instructions to [learn how to debug locally and publish a Chrome extension](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards).


## Integrate with your CI / CD pipeline {: #cicd }

There are multiple ways to do it and there are tons of tools out there. Here is an example of automating it with [GitHub Actions](https://github.com/features/actions). 

```yml
# .github/node.js.yml

name: Replay recordings

on:
  push:
    branches: [ "main" ]
  schedule:
    - cron: '30 12 * * *' # daily 12:30pm

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
        cache: 'npm'
    - run: npm install puppeteer
    - run: npm run replay-all
    - run: npm run start
```

In this example, we will replay the user flows when:

- new changes push to the `main` branch
- every day 12:30pm


Apart from GitHub Actions, you can integrate with your favorite cloud providers too. Go to [this demo](https://github.com/jecfish/recorder-demo#run-the-examples-with-google-cloud-run-job) to see how you can use [Google Cloud Run Job](https://youtu.be/e07TvWMmVI8) to execute up to 10,000 user flows in parallel!


## Conclusion {: #conclusion }

In this blog post, we’ve discussed the different options to export user flows as JSON files, customize replays with `PuppeteerReplayExtension`, transform user flows with `PuppeteerStringifyExtension` and integrate them in your CI workflows. 

I hope this blog post has given you some ideas about how you can use the Recorder panel and the tools provided to make it easier to integrate a testing workflow into your projects. Can’t wait to see what you will build!


{% include 'partials/devtools/en/reach-out.md' %}
{% include 'partials/devtools/en/engineering-blog.md' %}
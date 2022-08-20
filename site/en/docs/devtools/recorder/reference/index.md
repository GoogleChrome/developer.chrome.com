---
layout: "layouts/doc-post.njk"
title: "Recorder features reference"
authors:
  - sofiayem
  - jecelynyeen
date: 2022-06-21
#updated: YYYY-MM-DD
description: "A comprehensive reference of Chrome DevTools Recorder panel features."
tags:
  - test
  - performance
---

Discover ways to share user flows, edit them and their steps in this comprehensive features reference of the Chrome DevTools **Recorder** panel.

To learn the basics of working with the **Recorder** panel, see [Record, replay, and measure user flows](/docs/devtools/recorder/).

## Edit user flows {: #edit-flows }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gRr2bASlwPtTFFbXnqeM.png", alt="DevTools Recorder panel has a drop-down menu in the header which allows you to select a user flow to edit.", width="800", height="500" %}

On the top of the **Recorder** panel, there are options for you to:

1. **Add a new recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eY8MaTQqlXF3oiT6STmy.svg", alt="Add.", width="20", height="20" %}. Click on the **+** icon to [add a new recording](/docs/devtools/recorder/#record).
1. **View all recordings**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4PiXdJcg2fKUF1rZ8Vmg.svg", alt="Expand more.", width="20", height="20" %}. The drop-down shows the list of saved recordings. Select the **[number] recording(s)** option to expand and manage the list of saved recordings.
     {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0g3cyg48vjubSa6HoSLi.png", alt="View all recordings.", width="800", height="490" %}
1. **Export a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="File download.", width="20", height="20" %}. To further customize the script or share it for bug reporting purposes, you can export the user flow in one of the following formats:

   - JSON file.
   - [Puppeteer](https://pptr.dev) script.
   - [@puppeteer/replay](https://github.com/puppeteer/replay) script.

   For more information on the formats, see [Export a user flow](/docs/devtools/recorder/reference/#export-flows).

1. **Import a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fqErVoYNQMbrdB03sPZp.svg", alt="File upload.", width="20", height="20" %}. Only in JSON format.
1. **Delete a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9bkJ0VAuCp9iixG2LUtd.svg", alt="Delete.", width="20", height="20" %}. Delete the selected recording.

You can also edit the recording's name by clicking the edit button {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fFpbDTHPicjesIbiG4Hm.svg", alt="Edit.", width="20", height="20" %} next to it.

## Share user flows {: #share-flows }

You can export and import user flows in the Recorder. This is useful for bug reporting because you can share an exact record of the steps that reproduce a bug. You can also export and replay it with external libraries. 

### Export a user flow {: #export-flows }

To export a user flow:

1. Open the user flow you want to export.
2. Click on the **Export**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="File download.", width="20", height="20" %}. button at the top of the **Recorder** panel.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LJJqpZ0vOEdp6rdDLXmP.png", alt="Download format options.", width="800", height="490" %}
 1. Select one of the following formats from the drop-down list:
    - **Export as a JSON file**. Download the recording as a JSON file.
    - **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.
    - **Export as a Puppeteer script**. Download the recording as a [Puppeteer](https://pptr.dev/) script.
1. Save the file.

You can do the following with each export option:

- **JSON:** Edit the human-readable JSON object and [import](#import-flows) the JSON file back to the **Recorder**.
- **@puppeteer/replay:** Replay the script with the [Puppeteer Replay](https://github.com/puppeteer/replay) library. When exporting as a @puppeteer/replay script, the steps remain a JSON object. This option is perfect if you want to integrate with your CI/CD pipeline but still have the flexibility to edit the steps as JSON, later convert and import them back into the **Recorder**.
- **Puppeteer script:** Replay the script with [Puppeteer](https://pptr.dev/). Since the steps are converted into JavaScript, you can have more fine-grained customization, for example, looping the steps. One caveat, you can't import this script back into the **Recorder**.

#### Export in a custom format by installing an extension {: #recorder-extension }

{% Aside %}
**Note**: This feature is available from Chrome version 104.
{% endAside %}

You can install a Chrome extension to export replay scripts in your favorite format. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xRO1d79tBe0ILcBoD0oh.png", alt="Custom extension for the Recorder panel.", width="800", height="486" %}

For example, 

- [Cypress extension](https://chrome.google.com/webstore/detail/cypress-chrome-recorder/fellcphjglholofndfmmjmheedhomgin) let's you export JSON user flows as [Cypress test script](https://github.com/cypress-io/cypress-recorder-extension). [Cypress](https://cypress.io) is a front end testing tool built for the modern web.
- [WebPageTest extension](https://chrome.google.com/webstore/detail/webpagetest-recorder-exte/eklpnjohdjknellndlnepihjnhpaimok) let’s you export user flows from the Recorder directly as [WebPageTest Custom scripts](https://docs.webpagetest.org/scripting/) to measure site's performance. See [Converting user flows to WebPageTest custom scripts](https://blog.webpagetest.org/posts/introducing-the-new-webpagetest-recorder-chrome-extension/) to learn more. 
- [Nightwatch extension](https://chrome.google.com/webstore/detail/nightwatch-chrome-recorde/nhbccjfogdgkahamfohokdhcnemjafjk/) let's you export JSON user flows as [Nightwatch test script](https://github.com/nightwatchjs/nightwatch-recorder-extension). [Nightwatch](https://nightwatchjs.org/) is an end-to-end testing solution for web applications and websites.
- [Testing Library extension](https://chrome.google.com/webstore/detail/testing-library-recorder/pnobfbfcnoeealajjgnpeodbkkhgiici) let's you export JSON user flows as [Testing Library script](https://github.com/nickmccurdy/testing-library-recorder-extension). [Testing Library](https://testing-library.com/) has simple and complete testing utilities that encourage good testing practices.

{% Aside 'gotchas' %} 

**Advance use case: Build an extension**

You can build your own Recorder extension too. See the [Recorder extension API](/docs/extensions/reference/devtools_recorder/) documentation to learn how to build one.

You can also refer to this [extension example](https://github.com/puppeteer/replay/tree/main/examples/chrome-extension) and install it following [the steps](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards) outlined in the documentation.

{% endAside %}


### Import a user flow {: #import-flows }

To import a user flow:

1. Click the **Import**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fqErVoYNQMbrdB03sPZp.svg", alt="File upload.", width="20", height="20" %} button at the top of the **Recorder** panel.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LdIrYNYuKa2OA7PnYVjf.png", alt="Import recording.", width="800", height="490" %}
1. Select the JSON file with the recorded user flow.
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %}**Replay** button to run the imported user flow.


### Replay with external libraries

The [Puppeteer Replay](https://github.com/puppeteer/replay) is an open source library maintained by the Chrome DevTools team. It is built on top of [Puppeteer](https://pptr.dev/). It is a command line tool, you can replay JSON files with it.

Apart from that, you can transform and replay JSON files with the following 3rd party libraries.

Transform JSON user flows to custom scripts:

- [Cypress Chrome Recorder](https://github.com/cypress-io/cypress-chrome-recorder). You can use it to convert user flow JSON files to Cypress test scripts. Watch this [demo](https://youtu.be/4qYs2bMz4GI) to see it in action.
- [Nightwatch Chrome Recorder](https://github.com/nightwatchjs/nightwatch-chrome-recorder). You can use it to convert user flow JSON files to Nightwatch test scripts. 

Replay JSON user flows:

- [Replay with Testcafe](https://testcafe.io/documentation/403998/guides/experimental-capabilities/chrome-replay-support). You can use TestCafe to replay user flow JSON files and generate test reports for these recordings.
- [Replay with Sauce Labs](https://saucelabs.com/blog/how-to-create-test-scripts-using-chrome-devtools). You can replay the JSON files on [Sauce Labs](https://saucelabs.com/) using [saucectl](https://github.com/saucelabs/saucectl-replay-example).

{% Aside 'gotchas' %} 

**Advance use case: Integrate with the Puppeteer Replay library**

Similar to the 3rd party libraries above, you can build your own library on top of the [Puppeteer Replay](https://github.com/puppeteer/replay) too. The  Puppeteer Replay library provide ways for you to [customize how a recording is run](https://github.com/puppeteer/replay#2-customize-replay) and ["stringify" the user flow JSON files](https://github.com/puppeteer/replay#stringify-a-recording-as-a-puppeteer-script), that is, convert them to something else. 

{% endAside %}


## Edit steps {: #edit-steps }

You can edit any step in the recording by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1UTR0tiSxiKD0YSwAc1g.svg", alt="Expand.", width="24", height="24" %} button next to it.

You can also add missing steps and remove accidentally recorded ones as described below.

### Add and remove steps {: #add-and-remove-steps }

To add a step:

1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot button.", width="20", height="20" %} three-dot button next to any existing step.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vBETaaLND6v4PVtOvPzv.png", alt="Three-dot menu.", width="800", height="842" %}

1. Select **Add step before** or **Add step after** from the drop-down menu.
1. [Configure the new step](#configure-steps) by specifying its properties.

To remove a step, select **Remove** from the same three-dot menu.

### Configure steps {: #configure-steps }

To configure a step:

1. Specify its type: `click`, `doubleClick`, (input) `change`, `keyUp`, `keyDown`, `scroll`, `close`, `navigate` (to a page), `waitForElement`, or `waitForExpression`.
   
   Other properties depend on the `type` value.

1. Specify the required properties below the `type`.
   <div class="elevation--4" style="margin-top: 20px; margin-bottom: 20px;">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GICuzxrYSrsj2zyLdi8X.png", alt="Configuring a step.", width="800", height="388" %}</div>
1. Click the corresponding buttons to add optional type-specific properties and specify them.

For a list of available properties, see [Step properties](#step-properties).

To remove an optional property, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/G3beoQrG60COzsJM4TNb.svg", alt="Remove.", width="20", height="20" %} **Remove** button next to it.

To add or remove an element to or from an array property, click the **+** or **-** buttons next to the element.

#### Step properties {: #step-properties }

Each step can have the following optional properties:

- `target`—a URL for the [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) target, the default `main` keyword refers to the current page.
- `assertedEvents` that currently can only be a single `navigation` event

Other common properties available for most of the step types are:

- `frame`—an array of zero-based indexes that identify an iframe that can be nested. For example, you can identify the first (0) iframe inside a second (1) iframe of the main target as `[1, 0]`.
- `timeout`—a number of milliseconds to wait before executing a step. For more information, see [Adjust timeouts for steps](#adjust-timeout).
- `selectors`—an array of selectors. For more information, see [Understand selectors](#selector).

Type-specific properties are:

<table>
    <thead>
        <tr>
            <td>Type</td>
            <td>Property</td>
            <td>Required</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>click</code>, <code>doubleClick</code></td>
            <td><code>offsetX</code>, <code>offsetY</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Relative to the top-left of the element content box, in pixels</td>
        </tr>
        <tr>
            <td><code>click</code>, <code>doubleClick</code></td>
            <td><code>button</code></td>
            <td></td>
            <td>Pointer button: primary | auxiliary | second | back | forward</td>
        </tr>
        <tr>
            <td><code>change</code></td>
            <td><code>value</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Final value</td>
        </tr>
        <tr>
            <td><code>keyDown</code>, <code>keyUp</code></td>
            <td><code>key</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Key name</td>
        </tr>
        <tr>
            <td><code>scroll</code></td>
            <td><code>x</code>, <code>y</code></td>
            <td></td>
            <td>Absolute scroll x and y positions in pixels, default 0</td>
        </tr>
        <tr>
            <td><code>navigate</code></td>
            <td><code>url</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Target URL</td>
        </tr>
        <tr>
            <td><code>waitForElement</code></td>
            <td><code>operator</code></td>
            <td></td>
            <td>&gt;= | == (default) | &lt;=</td>
        </tr>
        <tr>
            <td><code>waitForElement</code></td>
            <td><code>count</code></td>
            <td></td>
            <td>Number of elements identified by a selector</td>
        </tr>
        <tr>
            <td><code>waitForExpression</code></td>
            <td><code>expression</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>JavaScript expression that resolves to true</td>
        </tr>
    </tbody>
</table>

There are two properties that make the replay pause:

- The `waitForElement` property makes the step wait for the presence (or absence) of a number of elements identified by a selector. For example, the following step waits for less than three elements to be on the page that match the selector `.my-class`.

     ```json
       "type": "waitForElement",
       "selectors": [".my-class"],
       "operator": "<=",
       "count": 2,
     ```

- The `waitForExpression`  property makes the step wait for a JavaScript expression to resolve to true. For example, the following step pauses for two seconds and then resolves to true allowing the replay to continue.

    ```json
       "type": "waitForExpression",
       "expression": "new Promise(resolve => setTimeout(() => resolve(true), 2000))",
     ```

### Adjust timeouts for steps {: #adjust-timeout }

In case your page has slow network requests or lengthy animations, the replay can fail on steps that exceed the default timeout of `5000` milliseconds.

To avoid this problem, you can adjust the default timeout for each step at once or set separate timeouts for specific steps. Timeouts on specific steps overwrite the default.

To adjust the default timeout for each step at once:

1. Click on **Replay settings** to make the **Timeout** box editable.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Ys9x9oHiQNATMSJkeYSn.png", alt="Replay settings.", width="800", height="506" %}

1. In the **Timeout** box, set the timeout value in milliseconds.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %}[**Replay**](/docs/devtools/recorder/#replay) to see the adjusted default timeout in action.

To overwrite the default timeout on a specific step:

1. [Expand the step](/docs/devtools/recorder/#expand-step) and click **Add timeout**.

   <div class="elevation--2", style="margin-top: 20px; margin-bottom: 20px;">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MEDm7NXPbGe3aObUhVj6.png", alt="Add timeout.", width="800", height="542" %}</div>

1. Click on the `timeout: <value>` and set the value in milliseconds.

   <div class="elevation--2", style="margin-top: 20px; margin-bottom: 20px;">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8jkQCHfBatGJf8PxrlFi.png", alt="Set the timeout value.", width="800", height="580" %}</div>

1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %}[**Replay**](/docs/devtools/recorder/#replay) to see the step with the timeout in action.

To remove a timeout overwrite on a step, click the **Delete**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9bkJ0VAuCp9iixG2LUtd.svg", alt="Delete.", width="20", height="20" %} button next to it.

## Understand selectors {: #selector }

During recording, the **Recorder** automatically detects two types of selectors for most of the steps: ARIA and CSS.

{% Aside %}
For more information on ARIA selectors, see [Syntactic vs. semantic selectors](/blog/puppetaria/#syntactic-vs-semantic-selectors).
{% endAside %}

For simple webpages, `id` attributes and CSS `class` attributes are sufficient for the **Recorder** to detect the selectors. However, that might not always be the case, because:

- Your webpages may use dynamic classes or ID's that change
- Your selectors may break from development changes to CSS styles or JS behavior

### Common test selectors {: common-test-selector}

For example, the CSS `class` values might be auto-generated for applications developed with modern JavaScript frameworks (for example, [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/)) and CSS frameworks.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtK52PaMMzKWiiAcsQfH.png", alt="Auto-generated CSS classes with randomized names.", width="800", height="654" %}

In these cases, you can use `data-*` attributes to create more resilient tests. There are already some common `data-*` selectors that people use for automation. The **Recorder** supports them as well. 

If you have the following common test selectors defined, the **Recorder** automatically detects and uses them first:

- `data-testid`
- `data-test`
- `data-qa`
- `data-cy`
- `data-test-id`
- `data-qa-id`
- `data-testing`

For example, inspect the "Cappuccino" element on this [demo page](https://coffee-cart.netlify.app/) and see the test attributes:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KsR7XKgLgEM0odQZHcKV.png", alt="Defined test selectors.", width="800", height="696" %}

Record a click on "Cappuccino", expand the corresponding step in the recording, and check the detected selectors:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sEl538qiomTJGSArag00.png", alt="Detected common test selector.", width="800", height="808" %}

### Customize the recording's selector {: #customize-selector }

You can customize the selector of a recording if the above doesn't work for you.

For example, this [demo page](https://jec.fyi/demo/recorder) uses the `data-automate` attribute as the selector. [Start a new recording](/docs/devtools/recorder/reference/#record) and enter the `data-automate` as the selector attribute.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Customize the recording's selector.", width="800", height="524" %}

Fill in an email address and observe the selector value (`[data-automate=email-address]`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="The result of custom selector selection.", width="800", height="579" %}

### Selector priority {: #selector-priority }

In addition to the ARIA selector, the **Recorder** looks for the best CSS selector it can find by the following attributes and in the following order:
1. Your custom selector attribute if you specified it at the start of the recording.
1. ARIA selector if found.
1. The most common attributes used for testing: {: #selectors }
   - `data-testid`
   - `data-test`
   - `data-qa`
   - `data-cy`
   - `data-test-id`
   - `data-qa-id`
   - `data-testing`
1. ID attributes, for example, `<div id="some_ID">`.
1. Regular CSS selectors.

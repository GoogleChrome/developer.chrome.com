---
layout: "layouts/doc-post.njk"
title: "Features reference"
authors:
  - sofiayem
  - jecelynyeen
date: 2022-06-21
updated: 2023-03-07
description: "A comprehensive reference of Chrome DevTools Recorder panel features."
tags:
  - test
  - performance
---

{% YouTube id='LBgzmqzp7ew' %}

Discover ways to share user flows, edit them and their steps in this comprehensive features reference of the Chrome DevTools **Recorder** panel.

To learn the basics of working with the **Recorder** panel, see [Record, replay, and measure user flows](/docs/devtools/recorder/).

## Learn and customize shortcuts {: #shortcuts }

Use shortcuts to navigate the **Recorder** faster. For a list of default shortcuts, see [Recorder panel keyboard shortcuts](/docs/devtools/shortcuts/#recorder).

To open a hint that lists all the shortcuts right in the **Recorder**, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fAwFFniVr2MfI5RwJwpv.svg", alt="Show shortcuts.", width="24", height="24" %} **Show shortcuts** in the top right corner.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0v5iJF1nm3Glji1wrLJc.png", alt="The Show shortcuts button.", width="800", height="547" %}

To customize **Recorder** shortcuts:

1. Open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Shortcuts**](/docs/devtools/settings/shortcuts/).
1. Scroll down to the **Recorder** section.
1. Follow the steps in [Customize shortcuts](/docs/devtools/settings/shortcuts/#customize-shortcuts).

## Edit user flows {: #edit-flows }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gRr2bASlwPtTFFbXnqeM.png", alt="DevTools Recorder panel has a drop-down menu in the header which allows you to select a user flow to edit.", width="800", height="500" %}

On the top of the **Recorder** panel, there are options for you to:

1. **Add a new recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eY8MaTQqlXF3oiT6STmy.svg", alt="Add.", width="20", height="20" %}. Click on the **+** icon to [add a new recording](/docs/devtools/recorder/#record).
1. **View all recordings**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4PiXdJcg2fKUF1rZ8Vmg.svg", alt="Expand more.", width="20", height="20" %}. The drop-down shows the list of saved recordings. Select the **[number] recording(s)** option to expand and manage the list of saved recordings.
     {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0g3cyg48vjubSa6HoSLi.png", alt="View all recordings.", width="800", height="490" %}
1. **Export a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="File download.", width="20", height="20" %}. To further customize the script or share it for bug reporting purposes, you can export the user flow in one of the following formats:

   - JSON file.
   - [@puppeteer/replay](https://github.com/puppeteer/replay) script.
   - [Puppeteer](/docs/puppeteer/ script.
   - [Puppeteer](/docs/puppeteer/) (including [Lighthouse](/docs/lighthouse/) analysis).

   For more information on the formats, see [Export a user flow](/docs/devtools/recorder/reference/#export-flows).

1. **Import a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fqErVoYNQMbrdB03sPZp.svg", alt="File upload.", width="20", height="20" %}. Only in JSON format.
1. **Delete a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9bkJ0VAuCp9iixG2LUtd.svg", alt="Delete.", width="20", height="20" %}. Delete the selected recording.

You can also edit the recording's name by clicking the edit button {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fFpbDTHPicjesIbiG4Hm.svg", alt="Edit.", width="20", height="20" %} next to it.

## Share user flows {: #share-flows }

You can export and import user flows in the Recorder. This is useful for bug reporting because you can share an exact record of the steps that reproduce a bug. You can also export and replay it with external libraries. 

### Export a user flow {: #export-flows }

To export a user flow:

1. Open the user flow you want to export.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="File download.", width="20", height="20" %} **Export** at the top of the **Recorder** panel.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wLQZMa2kSWySUn4kdU0Y.png", alt="Export format options.", width="800", height="662" %}
1. Select one of the following formats from the drop-down list:
    - **JSON file**. Download the recording as a JSON file.
    - **@puppeteer/replay**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.
    - **Puppeteer**. Download the recording as a [Puppeteer](/docs/puppeteer/) script.
    - **Puppeteer (including Lighthouse analysis)**. Download the recording as a [Puppeteer](/docs/puppeteer/) script with an embedded [Lighthouse](/docs/lighthouse/) analysis.
    - One or more options provided by the Recorder's [Export extensions](/docs/devtools/recorder/extensions/#export-extensions).
1. Save the file.

You can do the following with each default export option:

- **JSON**. Edit the human-readable JSON object and [import](#import-flows) the JSON file back to the **Recorder**.
- **@puppeteer/replay**. Replay the script with the [Puppeteer Replay](https://github.com/puppeteer/replay) library. When exporting as a @puppeteer/replay script, the steps remain a JSON object. This option is perfect if you want to integrate with your CI/CD pipeline but still have the flexibility to edit the steps as JSON, later convert and import them back into the **Recorder**.
- **Puppeteer script**. Replay the script with [Puppeteer](/docs/puppeteer/). Because the steps are converted into JavaScript, you can have more fine-grained customization, for example, looping the steps. One caveat, you can't import this script back into the **Recorder**.
- **Puppeteer (including Lighthouse analysis)**. This export option is the same as the previous one but it includes code that generates a [Lighthouse](/docs/lighthouse/) analysis.

  Run the script and check out the output in a `flow.report.html` file:

  ```sh
  # npm i puppeteer lighthouse
  node your_export.js
  ```

  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pfvZ3QX0XhhbDBxpsyBF.png", alt="The Lighthouse report opened in Chrome.", width="800", height="690" %}

### Export in a custom format by installing an extension {: #recorder-extension }

See [Recorder extensions](/docs/devtools/recorder/extensions).

### Import a user flow {: #import-flows }

To import a user flow:

1. Click the **Import**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fqErVoYNQMbrdB03sPZp.svg", alt="File upload.", width="20", height="20" %} button at the top of the **Recorder** panel.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LdIrYNYuKa2OA7PnYVjf.png", alt="Import recording.", width="800", height="490" %}
1. Select the JSON file with the recorded user flow.
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %}**Replay** button to run the imported user flow.


### Replay with external libraries

The [Puppeteer Replay](https://github.com/puppeteer/replay) is an open source library maintained by the Chrome DevTools team. It is built on top of [Puppeteer](/docs/puppeteer/). It is a command line tool, you can replay JSON files with it.

Apart from that, you can transform and replay JSON files with the following 3rd party libraries.

Transform JSON user flows to custom scripts:

- [Cypress Chrome Recorder](https://github.com/cypress-io/cypress-chrome-recorder). You can use it to convert user flow JSON files to Cypress test scripts. Watch this [demo](https://youtu.be/4qYs2bMz4GI) to see it in action.
- [Nightwatch Chrome Recorder](https://github.com/nightwatchjs/nightwatch-chrome-recorder). You can use it to convert user flow JSON files to Nightwatch test scripts. 
- [CodeceptJS Chrome Recorder](https://github.com/PeterNgTr/codeceptjs-chrome-recorder). You can use it to convert user flow JSON files to CodeceptJS test scripts. 

Replay JSON user flows:

- [Replay with Testcafe](https://testcafe.io/documentation/403998/guides/experimental-capabilities/chrome-replay-support). You can use TestCafe to replay user flow JSON files and generate test reports for these recordings.
- [Replay with Sauce Labs](https://saucelabs.com/blog/how-to-create-test-scripts-using-chrome-devtools). You can replay the JSON files on [Sauce Labs](https://saucelabs.com/) using [saucectl](https://github.com/saucelabs/saucectl-replay-example).

{% Aside 'gotchas' %} 

**Advanced use case: Integrate with the Puppeteer Replay library**

Similar to the 3rd party libraries above, you can build your own library on top of the [Puppeteer Replay](https://github.com/puppeteer/replay) too. The  Puppeteer Replay library provide ways for you to [customize how a recording is run](https://github.com/puppeteer/replay#2-customize-replay) and ["stringify" the user flow JSON files](https://github.com/puppeteer/replay#stringify-a-recording-as-a-puppeteer-script), that is, convert them to something else. 

{% endAside %}

## Debug user flows {: #debug-user-flows }

Like any code, sometimes you have to debug the recorded user flows.

To help you debug, the **Recorder** panel lets you slow down the replays, set breakpoints, step through the execution, and inspect code in various formats in parallel with steps.

### Slow down the replay

By default, the **Recorder** replays the user flow as fast as it can. To understand what happens in the recording, you can slow down the replay speed:

1. Open the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %}**Replay** drop-down menu.
1. Choose one of the replay speed options:
   - Normal (Default)
   - Slow
   - Very slow
   - Extremely slow

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/40FyhHaVhPjQGatqUFij.png", alt="Slow replay.", width="800", height="525" %}

{% Aside 'gotchas' %}
You can use these slow replay options only in the **Recorder**. To add timeouts to the recording itself, see [Adjust timeouts for steps](/docs/devtools/recorder/reference/#adjust-timeout).
{% endAside %}

### Inspect code {: #inspect-code }

To inspect the code of a user flow in various formats:

1. Open a recording in the **Recorder** panel.
1. Click **Show code** in the top right corner of the steps list.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KhynxMityVxQeMJuNdU9.png", alt="The Show code button.", width="800", height="669" %}
1. The **Recorder** shows a side-by-side view of the steps and their code. 
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3K7idCdrqrZHmMR5Kczc.png", alt="The side-by-side view of the steps and their code.", width="800", height="685" %}
1. As you hover over a step, the **Recorder** highlights its respective code in any format, including those provided by [extensions](#recorder-extension).
   {% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/u4YeMnjPuw9nINCPdViD.mp4", autoplay=true, controls=true, loop=true, class="screenshot" %}
1. Expand the format drop-down list to select a format that you use to [export user flows](#export-flows).

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fefVto1d2oXvkmBD9DPQ.png", alt="The format drop-down list.", width="800", height="685" %}

   It can be one of the three default formats (JSON, [@puppeteer/replay](https://github.com/puppeteer/replay), [Puppeteer script](/docs/puppeteer/) or a format provided by an [extension](#recorder-extension).
1. Proceed to debug your recording by [editing step parameters and values](#edit-steps). The code view isn't editable but it updates accordingly as you make changes to steps on the left.

### Set breakpoints and execute step by step {: #breakpoints-and-step-through }

To set a breakpoint and execute step by step:

1. Hover over the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zhUoD4aBvxnMuS6pPYXO.svg", alt="Step.", width="20", height="20" %} circle next to any step in a recording. The circle turns into a {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CsjCuL4zNf4tlwL9sFq9.svg", alt="Breakpoint.", width="20", height="20" %} breakpoint icon.
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CsjCuL4zNf4tlwL9sFq9.svg", alt="Breakpoint.", width="20", height="20" %} breakpoint icon and [replay the recording](/docs/devtools/recorder/#replay). The executions pauses at the breakpoint.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6xMG2ZEGgrrs8dQg7gFc.png", alt="Execution pause.", width="800", height="647" %}
1. To step through the execution, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4ahE6ZJK3Rp5HXouFOtH.png", alt="Execute one step.", width="25", height="18" %} **Execute one step** button on the action bar at the top of the **Recorder** panel.
1. To stop the replay, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/E4DiaFpjvozAUMoUQgB1.svg", alt="Pause.", width="24", height="24" %} **Cancel replay**.

## Edit steps {: #edit-steps }

You can edit any step in the recording by clicking the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1UTR0tiSxiKD0YSwAc1g.svg", alt="Expand.", width="24", height="24" %} button next to it, both during the recording and after.

You can also [add](#add-steps) missing steps and [remove](#remove-steps) accidentally recorded ones.

### Add steps {: #add-steps }

Sometimes, you may need to add steps manually. For example, the **Recorder** doesn't automatically capture `hover` events because this pollutes the recording and not all such events are useful. However, UI elements such as drop-down menus can appear only on `hover`. You can manually add `hover` steps to user flows that depend on such elements.

To manually add a step:

1. Open this [demo page](https://jec.fish/demo/menu-hover) and start a new recording.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/m1wPaIzCZFOpxF2kViEh.png", alt="Start a recording to capture a hover event.", width="800", height="570" %}
1. Hover over the element in the viewport. An action menu pops up.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RP5HSO8LhXBIfWqDMw5Y.png", alt="Hovering over the element.", width="800", height="570" %}
1. Pick an action from the menu and end the recording. The **Recorder** captures only the click event.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0SrnKHS6AnGzokWdkzMK.png", alt="Clicking an action and ending the recording.", width="800", height="632" %}
1. Try to replay the recording by clicking {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %} **Replay**. The replay fails after a timeout because the **Recorder** can't access the element in the menu.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/P05L4w4OWNAYNIPLCJsZ.png", alt="Replay fail.", width="800", height="595" %}
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Three-dot button.", width="22", height="22" %} three-dot button next to the **Click** step and select **Add step before**.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3hLZgQye5efWBcMcLQH6.png", alt="Adding a step before Click.", width="800", height="595" %}
1. Expand the new step. By default, it has the `waitForElement` type. Click the value next to `type` and select `hover`.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vPGY8RwmPZVt0j1sC4As.png", alt="Selecting hover.", width="800", height="730" %}
1. Next, set an appropriate selector for the new step. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zml4roc9tWR2DU1Yb9ix.svg", alt="Select.", width="22", height="22" %} **Select**, then click an area on the `Hover over me!` element that's outside the pop-up menu. The selector is set to `#clickable`.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/X2E6JPm7A5qbJzaR2U58.png", alt="Setting the selector.", width="800", height="616" %}
1. Try replaying the recording again. With the added hover step, the **Recorder** successfully replays the flow.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/P8YGHbff2vGgCKOkEth6.png", alt="Replay success.", width="800", height="567" %}

### Add assertions {: #add-assertions }

During recording, you can assert, for example, HTML attributes and JavaScript properties. To add an assertion:

1. [Start a recording](/docs/devtools/recorder/#record), for example, on this [demo page](https://coffee-cart.app/).
1. Click **Add assertion**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qm3QbX3e4c6pOeGpVoLW.png", alt="The Add assertion button.", width="800", height="773" %}

   The **Recorder** creates a configurable `waitForElement` step.

1. [Specify selectors](/docs/devtools/recorder/#edit-selectors) for this step.
1. [Configure the step](/docs/devtools/recorder/reference/#configure-steps) but don't change its `waitForElement` type. For example, you can specify:

   - **HTML attribute**. Click **Add attributes** and type the attribute's name and value that elements on this page use. For example, `data-test: <value>`.
   - **JavaScript property**. Click **Add properties** and type the property's name and value in JSON format. For example, `{".innerText":"<text>"}`.
   - [Other step properties](#step-properties). For example, `visible: true`.

1. Proceed to record the rest of the user flow and then stop the recording.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %} **Replay**. If an assertion fails, the **Recorder** displays an error after a [timeout](#adjust-timeout).

Watch the following video to see this workflow in action.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/BNpFsEc4rzFsLVPE5EH2.mp4", controls="true", muted="true", class="screenshot" %}

### Copy steps {: #copy-steps }

Instead of [exporting the entire user flow](/docs/devtools/recorder/reference/#export-flows), you can copy a single step to the clipboard:

1. Right-click the step you want to copy or click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} three-dot icon next to it.
1. In the drop-down menu, select one of the **Copy as ...** options.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sCSd3cpON80i6n5M3Rir.png", alt="Selecting a copy option from the drop-down menu.", width="800", height="577" %}

You can copy steps in various formats: JSON, [Puppeteer](/docs/puppeteer/), [@puppeteer/replay](https://github.com/puppeteer/replay), and those provided by [extensions](#recorder-extension).

### Remove steps {: #remove-steps }

To remove an accidentally recorded step, right-click the step or click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} three-dot icon next to it and select **Remove step**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QOPYGEUDal764qxj8YBB.png", alt="Remove a step.", width="800", height="601" %}

Additionally, the **Recorder** automatically adds two separate steps to the start of every recording:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8szraTN0ibqAAeNDVGTs.png", alt="A recording with the set viewport and navigation steps.", width="800", height="562" %}

- **Set viewport**. Lets you control the viewport's dimensions, scaling, and [other properties](#step-properties).
- **Navigate**. Sets the URL and automatically refreshes the page for every replay.

To perform in-page automation without reloading the page, remove the navigation step as described above.

### Configure steps {: #configure-steps }

To configure a step:

1. Specify its type: `click`, `doubleClick`, `hover`, (input) `change`, `keyUp`, `keyDown`, `scroll`, `close`, `navigate` (to a page), `waitForElement`, `waitForExpression`, or `setViewport`.
   
   Other properties depend on the `type` value.

1. Specify the required properties below the `type`.
   <div class="elevation--4" style="margin-top: 20px; margin-bottom: 20px;">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XGIyDuvQiK6R18ZQ6dqP.png", alt="Configure a step.", width="800", height="369" %}</div>
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
            <td><code>click</code><br><code>doubleClick</code></td>
            <td><code>offsetX</code><br><code>offsetY</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Relative to the top-left of the element content box, in pixels</td>
        </tr>
        <tr>
            <td><code>click</code><br><code>doubleClick</code></td>
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
            <td><code>keyDown</code><br><code>keyUp</code></td>
            <td><code>key</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Key name</td>
        </tr>
        <tr>
            <td><code>scroll</code></td>
            <td><code>x</code><br><code>y</code></td>
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
          <td><code>waitForElement</code></td>
          <td><code>attributes</code></td>
          <td></td>
          <td>HTML attribute and its value</td>
        </tr>
        <tr>
          <td><code>waitForElement</code></td>
          <td><code>properties</code></td>
          <td></td>
          <td>JavaScript property and its value in JSON</td>
        </tr>
        <tr>
          <td><code>waitForElement</code></td>
          <td><a href="https://pptr.dev/api/puppeteer.waitforselectoroptions#properties"><code>visible</code></a></td>
          <td></td>
          <td>Boolean. True if the element is in the DOM and visible (doesn't have <code>display: none</code> or <code>visibility: hidden</code>)</td>
        </tr>
        <tr>
          <td><code>waitForElement</code><br><code>waitForExpression</code></td>
          <td><code>asserted events</code></td>
          <td></td>
          <td>Currently, only <code>type: navigation</code> but you can specify the title and URL</td>
        </tr>
        <tr>
          <td><code>waitForElement</code><br><code>waitForExpression</code></td>
          <td><code>timeout</code></td>
          <td></td>
          <td>Maximum time to wait in milliseconds</td>
        </tr>
        <tr>
            <td><code>waitForExpression</code></td>
            <td><code>expression</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>JavaScript expression that resolves to true</td>
        </tr>
        <tr>
            <td><code>setViewport</code></td>
            <td><code>width</code><br><code>height</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Width and height of the viewport in pixels</td>
        </tr>
        <tr>
            <td><code>setViewport</code></td>
            <td><code>deviceScaleFactor</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Similar to Device Pixel Ratio (DPR), default 1</td>
        </tr>
        <tr>
            <td><code>setViewport</code></td>
            <td><code>isMobile</code><br><code>hasTouch</code><br><code>isLandscape</code></td>
            <td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td>
            <td>Boolean flags that specify whether to: <li>Take the meta tag into account</li><li>Support touch events</li><li>Display in landscape mode</li></td>
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

When you start a new recording, you can configure the following:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/anROVlnWFVhwL6qXXI0p.png", alt="Configuring a new recording.", width="800", height="554" %}

- In the **Selector attribute** textbox, enter a [custom test attribute](#customize-selector). The **Recorder** will use this attribute to detect selectors instead of a list of [common test attributes](common-test-selector).
- In the **Selector types to record** set of checkboxes, choose the types of selectors to detect automatically:

  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **CSS**. Syntactic selectors.
  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **ARIA**. Semantic selectors.
  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Text**. Selectors with the shortest unique text if available.
  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **XPath**. Selectors that use [XML Path Language](https://developer.mozilla.org/docs/Web/XPath).
  - {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Pierce**. Selectors similar to the CSS ones but that [can pierce shadow DOM](https://pptr.dev/guides/query-selectors#pierce-selectors-pierce).

{% Aside %}
For more information, see [Syntactic vs. semantic selectors](/blog/puppetaria/#syntactic-vs-semantic-selectors) and [Selector priority](#selector-priority).
{% endAside %}

### Common test selectors {: common-test-selector }

For simple webpages, `id` attributes and CSS `class` attributes are sufficient for the **Recorder** to detect the selectors. However, that might not always be the case because:

- Your webpages may use dynamic classes or IDs that change.
- Your selectors may break because of code or framework changes.

For example, the CSS `class` values might be auto-generated for applications developed with modern JavaScript frameworks (for example, [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/)) and CSS frameworks.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtK52PaMMzKWiiAcsQfH.png", alt="Auto-generated CSS classes with randomized names.", width="800", height="654" %}

In these cases, you can use `data-*` attributes to create more resilient tests. There are already some common `data-*` selectors that developers use for automation. The **Recorder** supports them as well. 

If you have the following common test selectors defined on your website, the **Recorder** automatically detects and uses them first:

- `data-testid`
- `data-test`
- `data-qa`
- `data-cy`
- `data-test-id`
- `data-qa-id`
- `data-testing`

For example, inspect the "Cappuccino" element on this [demo page](https://coffee-cart.app/) and see the test attributes:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KsR7XKgLgEM0odQZHcKV.png", alt="Defined test selectors.", width="800", height="696" %}

Record a click on "Cappuccino", expand the corresponding step in the recording, and check the detected selectors:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sEl538qiomTJGSArag00.png", alt="Detected common test selector.", width="800", height="808" %}

### Customize the recording's selector {: #customize-selector }

You can customize the selector of a recording if the common test selectors don't work for you.

For example, this [demo page](https://jec.fish/demo/recorder) uses the `data-automate` attribute as the selector. [Start a new recording](/docs/devtools/recorder/reference/#record) and enter the `data-automate` as the selector attribute.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Customize the recording's selector.", width="800", height="524" %}

Fill in an email address and observe the selector value (`[data-automate=email-address]`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="The result of custom selector selection.", width="800", height="579" %}

### Selector priority {: #selector-priority }

The **Recorder** looks for selectors in the following order depending on if you specified a [custom CSS selector](#customize-selector) attribute:

- If specified:
  1. CSS selector with your custom CSS attribute.
  1. XPath selectors.
  1. ARIA selector if found.
  1. A selector with the shortest unique text if found.
- If not specified:
  1. ARIA selector if found.
  1. CSS selectors with the following priority:
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
  1. XPath selectors.
  1. Pierce selectors.
  1. A selector with the shortest unique text if found.

There can be multiple regular CSS, XPath, and Pierce selectors. The **Recorder** captures:

- Regular CSS and XPath selectors at every root level, that is, nested [shadow hosts](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM#high-level_view), if any.
- Pierce selectors that are unique among all elements *within* all shadow roots.

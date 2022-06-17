---
layout: "layouts/doc-post.njk"
title: "Recorder features reference"
authors:
  - sofiayem
date: 2022-06-21
#updated: YYYY-MM-DD
description: "A comprehensive reference of Chrome DevTools Recorder panel features."
tags:
  - test
  - performance
---

Discover all the capabilities and options in this comprehensive features reference of the Chrome DevTools **Recorder** panel.

To learn the basics of working with the **Recorder** panel, see [Record, replay, and measure user flows](/docs/devtools/recorder/).

## Edit user flows {: #edit-flows }

Let's walk through the options to edit the user flows.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gRr2bASlwPtTFFbXnqeM.png", alt="DevTools Recorder panel has a drop-down menu in the header which allows you to select a user flow to edit", width="800", height="500" %}

On the top of the **Recorder** panel, there are options for you to:

1. **Add a new recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eY8MaTQqlXF3oiT6STmy.svg", alt="Add", width="20", height="20" %}. Click on the **+** icon to [add a new recording](/docs/devtools/recorder/#record).
1. **View all recordings**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4PiXdJcg2fKUF1rZ8Vmg.svg", alt="Expand more", width="20", height="20" %}. The drop-down shows the list of saved recordings. Select the **[number] recording(s)** option to expand and manage the list of saved recordings.
     {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0g3cyg48vjubSa6HoSLi.png", alt="View all recordings", width="800", height="490" %}
1. **Export a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="File download", width="20", height="20" %}. To further customize the script or share it for bug reporting purposes, you can export the user flow in one of the following formats:

   - JSON file.
   - [Puppeteer](https://pptr.dev) script.
   - [@puppeteer/replay](https://github.com/puppeteer/replay) script.

   For more information on the formats, see [Export a user flow](/docs/devtools/recorder/reference/#export-flows).

1. **Import a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fqErVoYNQMbrdB03sPZp.svg", alt="File upload", width="20", height="20" %}. Only in JSON format.
1. **Delete a recording**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9bkJ0VAuCp9iixG2LUtd.svg", alt="Delete", width="20", height="20" %}. Delete the selected recording.

You can also edit the recording's name by clicking the edit button {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fFpbDTHPicjesIbiG4Hm.svg", alt="Edit", width="20", height="20" %} next to it.

## Edit steps {: #edit-steps }

### Adjust timeouts for steps {: #adjust-timeout }

In case your page has slow network requests or lengthy animations, the replay can fail on steps that exceed the default timeout of `5000` milliseconds.

To avoid this problem, you can adjust the default timeout for each step at once or set separate timeouts for specific steps. Timeouts on specific steps overwrite the default.

To adjust the default timeout for each step at once:

1. Click on **Replay settings** to make the **Timeout** box editable.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Ys9x9oHiQNATMSJkeYSn.png", alt="Replay settings", width="800", height="506" %}

1. In the **Timeout** box, set the timeout value in milliseconds.
1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay", width="20", height="20" %}[**Replay**](/docs/devtools/recorder/#replay) to see the adjusted default timeout in action.

To overwrite the default timeout on a specific step:

1. [Expand the step](/docs/devtools/recorder/#expand-step) and click **Add timeout**.

   <div class="elevation--2", style="margin-top: 20px; margin-bottom: 20px;">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MEDm7NXPbGe3aObUhVj6.png", alt="Add timeout", width="800", height="542" %}</div>

1. Click on the `timeout: <value>` and set the value in milliseconds.

   <div class="elevation--2", style="margin-top: 20px; margin-bottom: 20px;">{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8jkQCHfBatGJf8PxrlFi.png", alt="Set the timeout value", width="800", height="580" %}</div>

1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay", width="20", height="20" %}[**Replay**](/docs/devtools/recorder/#replay) to see the step with the timeout in action.

To remove a timeout overwrite on a step, click the **Delete**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9bkJ0VAuCp9iixG2LUtd.svg", alt="Delete", width="20", height="20" %} button next to it.

## Share user flows {: #share-flows }

You can export and import user flows. This is useful for bug reporting because you can share an exact record of the steps that reproduce a bug.

### Export a user flow {: #export-flows }

To export a user flow:

1. Open the user flow you want to export.
2. Click on the **Export**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4dU9UXvsinS4zbgjd8rK.svg", alt="File download", width="20", height="20" %}. button at the top of the **Recorder** panel.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LJJqpZ0vOEdp6rdDLXmP.png", alt="Download format options", width="800", height="490" %}
 1. Select one of the following formats from the drop-down list:
    - **Export as a JSON file**. Download the recording as a JSON file.
    - **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.
    - **Export as a Puppeteer script**. Download the recording as a [Puppeteer](https://pptr.dev/) script.
1. Save the file.

{% Aside 'gotchas' %}
The [@puppeteer/replay](https://github.com/puppeteer/replay) is a library built on top of [Puppeteer](https://pptr.dev/). It is also a command line tool, so you can replay JSON files with it too.

**Advance use case: Integrate with the Puppeteer Replay library**

You can build your own library on top of the Puppeteer Replay library to replay or "stringify" the user flow JSON files, that is, convert them to something else.

For example, [@cypress/chrome-recorder](https://github.com/cypress-io/cypress-chrome-recorder) is a library built on top of Puppeteer Replay. You can use it to convert user flow JSON files to Cypress test scripts. Watch this [demo](https://youtu.be/4qYs2bMz4GI) to see it in action.

Learn more about the [stringify feature in Puppeteer Replay](https://github.com/puppeteer/replay#stringify-a-recording-as-a-puppeteer-script).

{% endAside %}

You can do the following with each export option:

- **JSON**. Edit the human-readable JSON object and [import](#import-flows) the JSON file back to the **Recorder**.
- **@puppeteer/replay**. Replay the script with the [Puppeteer Replay](https://github.com/puppeteer/replay) library. When exporting as a @puppeteer/replay script, the steps remain a JSON object. This option is perfect if you want to integrate with your CI/CD pipeline but still have the flexibility to edit the steps as JSON, later convert and import them back into the **Recorder**.
- **Puppeteer** script. Replay the script with [Puppeteer](https://pptr.dev/). Since the steps are converted into JavaScript, you can have more fine-grained customization, for example, looping the steps. One caveat, you can't import this script back into the **Recorder**.

### Import a user flow {: #import-flows }

To import a user flow:

1. Click the **Import**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fqErVoYNQMbrdB03sPZp.svg", alt="File upload", width="20", height="20" %} button at the top of the **Recorder** panel.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LdIrYNYuKa2OA7PnYVjf.png", alt="Import recording", width="800", height="490" %}
1. Select the JSON file with the recorded user flow.
1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay", width="20", height="20" %}**Replay** button to run the imported user flow.

## Understand the recording's selector {: #selector }

During recording, the **Recorder** automatically detects two types of selectors for most of the steps: ARIA and CSS.

{% Aside %}
For more information on ARIA selectors, see [Syntactic vs. semantic selectors](/blog/puppetaria/#syntactic-vs-semantic-selectors).
{% endAside %}

For simple webpages, `id` attributes and CSS `class` attributes are sufficient for the **Recorder** to detect the selectors. However, that might not always be the case, because:

- Your webpages may use dynamic classes or ID's that change
- Your selectors may break from development changes to CSS styles or JS behavior

### Common test selectors {: common-test-selector}

For example, the CSS `class` values might be auto-generated for applications developed with modern JavaScript frameworks (for example, [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/)) and CSS frameworks.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtK52PaMMzKWiiAcsQfH.png", alt="Auto-generated CSS classes with randomized names", width="800", height="654" %}

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

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KsR7XKgLgEM0odQZHcKV.png", alt="Defined test selectors", width="800", height="696" %}

Record a click on "Cappuccino", expand the corresponding step in the recording, and check the detected selectors:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sEl538qiomTJGSArag00.png", alt="Detected common test selector", width="800", height="808" %}

### Customize the recording's selector {: #customize-selector }

You can customize the selector of a recording if the above doesn't work for you.

For example, this [demo page](https://jec.fyi/demo/recorder) uses the `data-automate` attribute as the selector. [Start a new recording](/docs/devtools/recorder/reference/#record) and enter the `data-automate` as the selector attribute.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Customize the recording's selector", width="800", height="524" %}

Fill in an email address and observe the selector value (`[data-automate=email-address]`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="The result of custom selector selection", width="800", height="579" %}

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

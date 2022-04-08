---
layout: "layouts/doc-post.njk"
title: "Recorder: Record, replay and measure user flows"
authors:
  - jecelynyeen
  - sofiayem
date: 2021-11-02
updated: 2022-03-25
description: "Record, replay and measure user flows with the Recorder panel."
tags:
  - test
  - performance
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

Take a glance at the new **Recorder** panel (preview feature) with the video below. 

{% YouTube id='rMUayh1QPYs' %}
<!-- {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/jDJpU85zWj1dipsUPrMr.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %} -->

Use the **Recorder** panel to record, replay and measure user flows.

{% Aside %}
This is a preview feature in Chrome 97. Our team is actively working on this feature and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements. 
{% endAside %}


## Open the Recorder panel {: #open }

1. [Open DevTools](/docs/devtools/open).
2. Click on **More options** &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **More tools** > **Recorder**.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cB1LClVmLAMMlI5cqUnQ.png", alt="Recorder in the menu", width="800", height="486" %}

    Alternatively, use the [Command Menu](/docs/devtools/command-menu/) to open the **Recorder** panel.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hHVfQmGBi3vhK2mVrvHt.png", alt="Show Recorder command in the Command menu", width="800", height="486" %}


## Introduction {: #intro }

We will be using this [coffee ordering](https://coffee-cart.netlify.app/) demo page. Checkout is a common user flow among shopping websites.

In the next sections, we will walk you through how to record, replay and audit the following checkout flow with the **Recorder** panel:

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/UcCr4JgWqpJm2n8Y5Q8W.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

1. Add a coffee to the cart.
2. Add another coffee to the cart.
3. Go to the cart page.
4. Remove one coffee from the cart.
5. Start the checkout process.
6. Fill in payment details.
7. Check out.


## Record a user flow {: #record }

1. Open this [demo](https://coffee-cart.netlify.app/) page. Click on the **Start new recording** button to begin.
1. Enter "coffee checkout" in the **Recording name** textbox.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EnRcThJpdtY6c91ZTRMT.png", alt="Start a new recording", width="800", height="520" %}
   {% Aside %}
   The **Selector attribute** textbox is optional. Leave it blank as it is. For more information, see [Customize the recording's selector](#customize-selector).

   {% endAside %}
1. Click on the **Start a new recording** button. The recording is started. The panel is showing **Recording...** indicating the recording is in progress.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fpPKdjSY4lK7cZ5HhZ72.png", alt="recording in progress", width="800", height="528" %} 
1. Click on *Cappuccino* to add it to the cart.
1. Click on *Americano* to add it to the cart. Notice that the **Recorder** shows the steps that you have performed so far.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UGb19uKQ7X9bkVIhTcwt.png", alt="steps in the Recorder panel", width="800", height="519" %}
1. Go to the cart page.
1. Remove *Americano* from the cart.
1. Click on the *Total: $19.00* button to start the checkout process.
1. In the payment details form, fill in the *Name* and *Email* textboxes, and check the *I would like to receive order updates and promotional messages.* checkbox.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UOewwKwP99GldzuTtIL7.png", alt="payment details form", width="800", height="519" %}
1. Click on the *Submit* button to complete the checkout process.
1. In the **Recorder** panel. Click **End recording** button to end the recording.


## Replay a user flow {: #replay }

After recording a user flow, you can replay it by clicking on the **Replay** button.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/0fLvDBSUaiEwL8kJG2Kx.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

You can see the user flow replay on the page. The replay progress is shown in the **Recorder** panel as well.

You can simulate a slow network connection by configuring the **Replay settings**. For example, expand the **Replay settings**, select **Slow 3G** in the **Network** dropdown.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SSoCLGi4xdaVHKO9D0ec.png", alt="replay settings", width="800", height="528" %}

More settings might be supported in the future. [Share with us](https://goo.gle/recorder-feedback) the replay settings you would like to have!


## Measure a user flow {: #measure }

You can measure the performance of a user flow by clicking on the **Measure performance** button. For example, checkout is a critical user flow of a shopping website. With the **Recorder** panel, you can record the checkout flow once and measure it regularly.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/RfznQY25Sut04RjOfAZQ.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

Clicking on the **Measure performance** button will first trigger a replay of the user flow, then open the performance trace in the **Performance** panel.

Learn how to [analyze your page's runtime performance](/devtools/evaluate-performance/) with the **Performance** panel. You can enable the [Web Vitals checkbox](/blog/new-in-devtools-88/#web-vitals) in the **Performance** panel, to view the [Web Vitals](https://web.dev/vitals) metrics, identify opportunities to improve your user browsing experience.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/L8tS8YwGRgmqCrSwx5ro.png", alt="Performance panel", width="800", height="531" %}

## Edit user flows {: #edit-flows }

Let's walk through the options to edit the user flows.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/a3NDihdiqCd6YsirLEcw.png", alt="DevTools Recorder panel has a dropdown menu in the header which allows you to select a user flow to edit", width="800", height="560" %}

On the top of the **Recorder** panel, there are options for you to:

1. **Add a new recording**<span class="material-icons">add</span>. Click on the **+** icon to [add a new recording](#record).
2. **View all recordings**<span class="material-icons">expand_more</span>. The dropdown shows the list of saved recordings. Select the **[number] recording(s)** option to expand and manage the list of saved recordings.
     {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/g3x137aFK4xJrsdqONKY.png", alt="View all recordings", width="800", height="560" %}
3. **Export a recording**<span class="material-icons">file_upload</span>. You can export the user flow as [Puppeteer](https://pptr.dev) script to customize the script further.
4. **Delete a recording**<span class="material-icons">delete</span>. Delete the selected recording.

You can also edit the recording's name by clicking the edit button <span class="material-icons">edit</span> next to it.

## Edit steps {: #edit-steps }

Let's walk through the options to edit the steps within a workflow.

### Expand steps {: #expand-step }

1. Expand each step to see the details of the action. For example, expand the *Click Element "Cappuccino"* step.
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WUIZb8eMWfcPZHPyQ5C5.png", alt="In the recorder panel, the Cappuccino element has been expanded to reveal type, target, selectors, offset X, and offset Y.", width="800", height="773" %}
1. The step above shows two **selectors**. For more information, see [Selector priority](#selector-priority).
   When replaying the user flow, the **Recorder** tries to query the element with one of the selectors by sequence.
   For example, if the **Recorder** successfully queries the element with the first selector, it will skip the second selector and proceed to the next step.
1. You can add or remove any selectors. For example, you can remove the *selector #2* because just `aria/Cappuccino` is sufficient in this case. Hover over the *selector #2* and click on **-** to remove it.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ivZru7CFneS6fu5BAcIJ.png", alt="The DevTools recorder panel shows an option to remove a selector", width="800", height="758" %}
1. The **selector** is editable too. For example, if you want to select *Mocha* instead of *Cappuccino*, you can edit the selector value to *aria/Mocha* instead.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OdihJ4BROOXZ93eidr4b.png", alt="edit a selector", width="800", height="663" %}
   Alternatively, click the **Select**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ihbO22H4EA0HfrNX6gV1.png", alt="Select button", width="24", height="22" %} button and then click *Mocha* on the page.
1. [Replay](#replay) the flow now, it should select *Mocha* instead of *Cappuccino*.
1. Try to edit other step properties such as **type**, **target**, **value** and more.

### Add and remove steps {: #add-and-remove-steps }

There are options to add and remove steps too. This is useful if you want to add an extra step or remove an accidentally added step. Instead of re-recording the user flow, you can just edit it. Click on the **3-dot** kebab menu next to the step to open the menu. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/rs8gfXvOFh0Jrnw3F15j.png", alt="DevTools UI for coffee cart, including the menu for the Scroll event expanded to reveal three options: Add step before, add step after, and remove step.", width="800", height="663" %}

1. For example, the *Scroll* event after the *Mocha* step is not necessary. You can select **Remove step** to remove it.
2. Say you want to **wait until the 9 coffees** display on the page before performing any steps.
3. In the *Mocha* step menu, select **Add step before**.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jEOHv9iiVfqMQvKRbueR.png", alt="A new step named Assert Element was added and can now be edited", width="800", height="663" %} 
5. In *Assert Element*, edit the new step with the following details:
    - type: **waitForElement**
    - selector #1: **.cup**
    - operator: **==** (click **add operator** button)
    - count: **9** (click **add count** button)
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zeK91O21jvc5OD9HuovR.png", alt="The new step for coffee checkout has been updated with the aforementioned details.", width="800", height="663" %}
6. [Replay](#replay) the flow now to see the changes.

## Understanding the recording's selector {: #selector }

During recording, the **Recorder** automatically detects two types of selectors for most of the steps: ARIA and CSS.

{% Aside %}
For more information on ARIA selectors, see [Syntactic vs. semantic selectors](/blog/puppetaria/#syntactic-vs-semantic-selectors).
{% endAside %}

For simple webpages, `id` attributes and CSS `class` attributes are sufficient for the **Recorder** to detect the selectors. However, that might not always be the case, because:

- Your webpages may use dynamic classes or ID's that change
- Your selectors may break from development changes to CSS styles or JS behaviour

### Common test selectors {: common-test-selector}

For example, the CSS `class` values might be autogenerated for applications developed with modern JavaScript frameworks (for example, [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/)) and CSS frameworks.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtK52PaMMzKWiiAcsQfH.png", alt="Autogenerated CSS classes with randomized names", width="800", height="654" %}

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

For example, this [demo page](https://jec.fyi/demo/recorder) uses the `data-automate` attribute as the selector. [Start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute.

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

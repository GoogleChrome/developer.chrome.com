---
layout: "layouts/doc-post.njk"
title: "Record, replay and measure user flows"
authors:
  - jecelynyeen
date: 2021-11-02
updated: 2021-11-03
description: "Record, replay and measure user flows with the Recorder panel."
---

Take a glance at the new **Recorder** panel (preview feature) with the video below. 

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/jDJpU85zWj1dipsUPrMr.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %}

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
2. Enter "coffee checkout" in the **Recording name** textbox, then click on the **Start a new recording** button.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLa973eE3tGGhHomHkOc.png", alt="Start a new recording", width="800", height="528" %}
3. The recording is started. The panel is showing **Recording...** indicating the recording is in progress.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fpPKdjSY4lK7cZ5HhZ72.png", alt="recording in progress", width="800", height="528" %} 
4. Click on *Cappucino* to add it to the cart.
5. Click on *Americano* to add it to the cart. Notice that the **Recorder** shows the steps that you have performed so far.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UGb19uKQ7X9bkVIhTcwt.png", alt="steps in the Recorder panel", width="800", height="519" %}
6. Go to the cart page.
7. Remove *Americano* from the cart.
8. Click on the *Total: $19.00* button to start the checkout process.
9. In the payment details form, fill in the *Name* and *Email* textboxes, and check the *I would like to receive order updates and promotional messages.* checkbox.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UOewwKwP99GldzuTtIL7.png", alt="payment details form", width="800", height="519" %}
10. Click on the *Submit* button to complete the checkout process.
11. In the **Recorder** panel. Click **End recording** button to end the recording.


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

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/a3NDihdiqCd6YsirLEcw.png", alt="header section of the Recorder panel", width="800", height="560" %}

On the top of the **Recorder** panel, there are options for you to:

1. **Add a new recording**. Click on the **+** icon to [add a new recording](#record).
2. **View all recordings**. The dropdown shows the list of saved recordings. Select the **[number] recording(s)** option to expand and manage the list of saved recordings.
     {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/g3x137aFK4xJrsdqONKY.png", alt="View all recordings", width="800", height="560" %}
3. **Export a recording**. You can export the user flow as [Puppeteer](https://pptr.dev) script to customize the script further.
4. **Delete a recording**. Delete the selected recording. 

## Edit steps {: #edit-steps }

Let's walk through the options to edit the steps within a workflow.

1. Expand each step to see the details of the action. For example, expand the *Click Element "Cappucino"* step.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ADbB4FFeiBBZqbxKRw0s.png", alt="Expand Cappucino", width="800", height="663" %}
2. The step above shows 2 **selectors**. The **Recorder** will automatically detect 2 selectors for most of the steps by default.
    - When replaying the user flow, the **Recorder** will try to query the element with one of the selectors by sequence.
    - For example, if the **Recorder** successfully queries the element with the first selector, it will skip the second selector and proceed to the next step.
3. You can add or remove any selectors. For example, you can remove the *selector #2* because just `aria/Cappucino` is sufficient in this case. Hover over the *selector #2* and click on **-** to remove it.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qEat3jT1Og68urhmSkef.png", alt="remove a selector", width="800", height="663" %}
4. The **selector** is editable too. For example, if you want to select *Mocha* instead of *Cappucino*, you can edit the selector value to *aria/Mocha* instead.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OdihJ4BROOXZ93eidr4b.png", alt="edit a selector", width="800", height="663" %} 
5. [Replay](#replay) the flow now, it should select *Mocha* instead of *Cappucino*.
6. Try to edit other step properties such as **type**, **target**, **value** and more.

There are options to add and remove steps too. This is useful if you want to add an extra step or remove an accidentally added step. Instead of re-recording the user flow, you can just edit it. Click on the **3-dot** kebab menu next to the step to open the menu. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/rs8gfXvOFh0Jrnw3F15j.png", alt="step menu", width="800", height="663" %}

1. For example, the *Scroll* event after the *Mocha* step is not necessary. You can select **Remove step** to remove it.
2. Says, you want to **wait until there are 9 coffees** display on the page before performing any steps.
3. In the *Mocha* step menu, select **Add step before**.
4. A new step is created.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jEOHv9iiVfqMQvKRbueR.png", alt="new step added", width="800", height="663" %} 
5. Edit the step with the following details:
    - type: **waitForElement**
    - selector #1: **.cup**
    - operator: **==** (click **add operator** button)
    - count: **9** (click **add count** button)
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zeK91O21jvc5OD9HuovR.png", alt="step details", width="800", height="663" %}
6. [Replay](#replay) the flow now to see the changes.

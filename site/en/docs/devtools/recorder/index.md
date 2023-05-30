---
layout: "layouts/doc-post.njk"
title: "Record, replay, and measure user flows"
authors:
  - jecelynyeen
  - sofiayem
date: 2021-11-02
updated: 2023-01-09
description: "Record, replay, measure user flows, and edit their steps with the Recorder panel."
tags:
  - test
  - performance
anchorRedirects:
  selector: /docs/devtools/recorder/reference/#selector
---

Take a glance at the new **Recorder** panel (preview feature) with the video below.

{% YouTube id='rMUayh1QPYs' %}
<!-- {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/jDJpU85zWj1dipsUPrMr.mp4", autoplay="true", muted="false", loop="true", controls="true",  class="screenshot" %} -->

Complete this tutorial to learn how to use the **Recorder** panel to record, replay, and measure user flows.

{% Aside %}
This is a preview feature in Chrome 97. Our team is actively working on this feature and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements. 
{% endAside %}

For more information on how to share the recorded user flows, edit them and their steps, see the [Recorder features reference](/docs/devtools/recorder/reference/).

{% Aside 'note' %}
This feature is available only in Chrome, not Chromium.
{% endAside %}

## Open the Recorder panel {: #open }

1. [Open DevTools](/docs/devtools/open).
2. Click on **More options** &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More.", width="4", height="20" %} &nbsp; > **More tools** > **Recorder**.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cB1LClVmLAMMlI5cqUnQ.png", alt="Recorder in the menu.", width="800", height="486" %}

    Alternatively, use the [Command Menu](/docs/devtools/command-menu/) to open the **Recorder** panel.

    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hHVfQmGBi3vhK2mVrvHt.png", alt="Show Recorder command in the Command menu.", width="800", height="486" %}


## Introduction {: #intro }

We will be using this [coffee ordering](https://coffee-cart.app/) demo page. Checkout is a common user flow among shopping websites.

In the next sections, we will walk you through how to record, replay and audit the following checkout flow with the **Recorder** panel:

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/UcCr4JgWqpJm2n8Y5Q8W.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

1. Add a coffee to the cart.
2. Add another coffee to the cart.
3. Go to the cart page.
4. Remove one coffee from the cart.
5. Start the checkout process.
6. Fill in payment details.
7. Check out.


## Record a user flow {: #record }

1. Open this [demo](https://coffee-cart.app/) page. Click on the **Start new recording** button to begin.
1. Enter "coffee checkout" in the **Recording name** textbox.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MTIDldRAYMHBnnKSmnVy.png", alt="Start a new recording.", width="800", height="529" %}
   {% Aside %}
   The **Selector attribute** textbox and **Selector types to record** checkboxes are optional. For this tutorial, leave the defaults as they are.

   For more information, see [Understand selectors](/docs/devtools/recorder/reference/#selector).
   {% endAside %}
1. Click on the **Start a new recording** button. The recording is started. The panel is showing **Recording...** indicating the recording is in progress.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fpPKdjSY4lK7cZ5HhZ72.png", alt="recording in progress.", width="800", height="528" %} 
1. Click on *Cappuccino* to add it to the cart.
1. Click on *Americano* to add it to the cart. Notice that the **Recorder** shows the steps that you have performed so far.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UGb19uKQ7X9bkVIhTcwt.png", alt="Steps in the Recorder panel.", width="800", height="519" %}
1. Go to the cart page and remove *Americano* from the cart.
   {% Aside %}
   Optionally, you can remove *Americano* on the menu page by hovering over the **Total** button and clicking **-** next to *Americano* in the pop-up menu.

   However, you'll have to [add the hover step manually](/docs/devtools/recorder/reference/#add-steps) after you finish the recording because the **Recorder** doesn't automatically capture hover events.
   {% endAside %}
1. Click on the *Total: $19.00* button to start the checkout process.
1. In the payment details form, fill in the *Name* and *Email* textboxes, and check the *I would like to receive order updates and promotional messages.* checkbox.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UOewwKwP99GldzuTtIL7.png", alt="Payment details form.", width="800", height="519" %}
1. Click on the *Submit* button to complete the checkout process.
   {% Aside %}
   You can manually [edit steps](#edit-steps) and [add assertions](/docs/devtools/recorder/reference/#add-assertions) even before you end the recording.
   {% endAside %}
1. In the **Recorder** panel, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/atK0ZIkmafgOnagKckde.svg", alt="End recording.", width="20", height="20" %} **End recording** button to end the recording.


## Replay a user flow {: #replay }

After recording a user flow, you can replay it by clicking on the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %}**Replay** button.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/DZDWWSq8muswhFL2hAng.mp4" , autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

You can see the user flow replay on the page. The replay progress is shown in the **Recorder** panel as well.

If you made a misclick during recording or something doesn't work, you can [debug your user flow](/docs/devtools/recorder/reference/#debug-user-flows): slow down its replay, set a breakpoint, and execute it step by step.

{% Aside 'gotchas' %}
When replaying a user flow recording, the **Recorder** waits until the element is visible or clickable in the viewport or tries to automatically scroll the element into the viewport before replaying the corresponding step.
{% endAside %}

### Simulate slow network

You can simulate a slow network connection by configuring the **Replay settings**. For example, expand the **Replay settings**, select **Slow 3G** in the **Network** drop-down.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WmVmiXkrXKngHn5MUgPD.png", alt="Replay settings.", width="800", height="525" %}

More settings might be supported in the future. [Share with us](https://goo.gle/recorder-feedback) the replay settings you would like to have!


## Measure a user flow {: #measure }

You can measure the performance of a user flow by clicking on the **Measure performance** button. For example, checkout is a critical user flow of a shopping website. With the **Recorder** panel, you can record the checkout flow once and measure it regularly.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/RfznQY25Sut04RjOfAZQ.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

Clicking on the **Measure performance** button will first trigger a replay of the user flow, then open the performance trace in the **Performance** panel.

Learn how to [analyze your page's runtime performance](/devtools/evaluate-performance/) with the **Performance** panel. You can enable the [Web Vitals checkbox](/blog/new-in-devtools-88/#web-vitals) in the **Performance** panel, to view the [Web Vitals](https://web.dev/vitals) metrics, identify opportunities to improve your user browsing experience.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/L8tS8YwGRgmqCrSwx5ro.png", alt="Performance panel.", width="800", height="531" %}

## Edit steps {: #edit-steps }

Let's walk through the basic options to edit the steps within the recorded workflow.

For a comprehensive list of editing options, see [Edit steps](/docs/devtools/recorder/reference/#edit-steps) in features reference.

### Expand steps {: #expand-step }

Expand each step to see the details of the action. For example, expand the *Click Element "Cappuccino"* step.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WUIZb8eMWfcPZHPyQ5C5.png", alt="In the recorder panel, the Cappuccino element has been expanded to reveal type, target, selectors, offset X, and offset Y.", width="800", height="773" %}

The step above shows two **selectors**. For more information, see [Understand the recording's selector](/docs/devtools/recorder/reference/#selector).

When replaying the user flow, the **Recorder** tries to query the element with one of the selectors by sequence.
For example, if the **Recorder** successfully queries the element with the first selector, it will skip the second selector and proceed to the next step.

### Add and remove selectors from a step {: #add-remove-selectors }

You can add or remove any selectors. For example, you can remove the *selector #2* because just `aria/Cappuccino` is sufficient in this case. Hover over the *selector #2* and click on **`-`** to remove it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ivZru7CFneS6fu5BAcIJ.png", alt="The DevTools recorder panel shows an option to remove a selector.", width="800", height="758" %}

### Edit selectors in a step {: #edit-selectors}

The **selector** is editable too.  For example, if you want to select *Mocha* instead of *Cappuccino*, you can:

1. Edit the selector value to *aria/Mocha* instead.

   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OdihJ4BROOXZ93eidr4b.png", alt="Edit a selector.", width="800", height="663" %}

   Alternatively, click the **Select**{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ihbO22H4EA0HfrNX6gV1.png", alt="Select button.", width="24", height="22" %} button and then click *Mocha* on the page.

   {% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/ab7PcmmkoYnoR3RRZ8M1.mp4", autoplay="true", muted="true", loop="true", controls="true", class="screenshot" %}

1. [Replay](#replay) the flow now, it should select *Mocha* instead of *Cappuccino*.

1. Try to edit other step properties such as **type**, **target**, **value** and more.

### Add and remove steps {: #add-and-remove-steps }

There are options to add and remove steps too. This is useful if you want to add an extra step or remove an accidentally added step. Instead of re-recording the user flow, you can just edit it:

1. Right-click the step you want to edit or click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="24", height="24" %} three-dot icon next to it. 

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/V0sAMnmcK2cheOc26e1y.png", alt="The drop-down menu of a step with options to remove and add a steps before or after.", width="800", height="863" %}

1. You can select **Remove step** to remove it. For example, the *Scroll* event after the *Mocha* step is not necessary.
1. Say, you want to **wait until the 9 coffees** display on the page before performing any steps. In the *Mocha* step menu, select **Add step before**.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jEOHv9iiVfqMQvKRbueR.png", alt="A new step named Assert Element was added and can now be edited.", width="800", height="663" %}
1. In *Assert Element*, edit the new step with the following details:
    - type: **waitForElement**
    - selector #1: **.cup**
    - operator: **==** (click **add operator** button)
    - count: **9** (click **add count** button)
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zeK91O21jvc5OD9HuovR.png", alt="The new step for coffee checkout has been updated with the aforementioned details.", width="800", height="663" %}
1. {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gjfZMeLnwzpRfOMfXEMY.svg", alt="Replay.", width="20", height="20" %}[Replay](#replay) the flow now to see the changes.

## Next steps {: #next }

Congratulations, you have completed the tutorial!

To explore more features and workflows (for example, import and export) related to the **Recorder**, see the [Recorder features reference](/docs/devtools/recorder/reference).



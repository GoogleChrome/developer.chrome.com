---
layout: 'layouts/doc-post.njk'
title: 'Privacy Sandbox testing FAQs'
subhead: >
   Answers to frequently asked questions about testing the Privacy Sandbox.
description: >
   Answers to frequently asked questions about testing the Privacy Sandbox.
date: 2023-10-02
---

**What are the key coordination areas between DSPs and SSPs for the Protected Audience API?**

Below are the key aspects that require alignment:

-   **Creative audit** – Does the SSP have a creative pre-registration endpoint for scanning, and will DSP support that workflow? If not, discuss with the SSP what they require from the DSP to implement creative audit for publisher controls.
-   **DSP's `renderURL` methodology**. Context: Some SSPs may require the `renderURL` to include metadata such as `seatID` to support scoring and billing. How the DSP structures `renderURL` has implications for critical SSP use cases.
-   **ORTB**
    -   ORTB 2.X bid request - how the SSP will signal PA-eligible auction to the DSP.
    -   ORTB 2.X bid response - how the DSP will respond to the SSP for PA auction.
-   **PA on-device bidding data**: SSP -> DSP
    -   `auctionSignals` - data the SSP includes in the `auctionConfig` that is made available to all DSP bidding functions.
-   **PA on-device scoring data**: DSP -> SSP
    -   bid - how to handle multi-currencies. Each SSP may have different requirements.
    -   ad object (returned from `generateBid()`) - The SSP may use this for scoring and publisher controls. DSPs and SSPs need to align on what data is included and on a data structure.
-   **PA win reporting**: SSP -> DSP
    -   What SSP's `reportResult()` will make available to the DSP's `reportWin()`.
-   **Post-auction reporting**: DSP -> SSP. Context: The DSP must capture and delegate post-auction reports to the SSP. If the SSP needs clicks, views, viewability metrics, the DSP must enable them to receive these events.
    -   What reports the SSP will need.
    -   The methodology for measuring that event (such as, viewability definition).
    -   DSP implementation of the `reportEvent()` call to support the SSP requirements.
    -   SSP implementation of the `registerAdBeacon()` lining up the event naming with what the DSP will trigger in the creative.

**Are the Attribution Reporting API and the Aggregation Service ready and available for testing?**

The Attribution Reporting API will be generally available and ramp-up is already in progress. With that, Attribution Reporting will soon be available for use on 100% of traffic. Note that Attribution Reporting can be used with all ads, not just those served by Protected Audience.

**Are there geographic requirements for testing?**

There are no geographic requirements. It's up to each tester to determine geographic considerations as part of their test.

**How does the CMA guidance align with Chrome-facilitated testing? (q10)**

Chrome facilitated testing modes are aligned with the CMA's guidance for quantitative testing of Privacy Sandbox. In the CMA's guidance the treatment group relies on Privacy Sandbox technologies without third-party cookies. Control group 1 uses third-party cookies and not Privacy Sandbox, and Control group 2 uses neither Privacy Sandbox nor third-party cookies. With general availability, the Privacy Sandbox technologies will be available on all Chrome traffic, and the ad tech can choose to use Privacy Sandbox technologies in certain population groups and not in others. Additionally, ad techs can leverage the Mode A Chrome-facilitated testing traffic to coordinate these population groups across multiple parties. 

Starting in Q1 2024, Chrome will deprecate third-party cookies on 1% of traffic and this is referred to as the Mode B Chrome-facilitated testing traffic in Chrome developer documentation. In a small fraction of Mode B Chrome-facilitated testing traffic, Privacy Sandbox technologies will also not be available in addition to third-party cookies being deprecated. Using a combination of all of the above Chrome-facilitated testing modes, ad techs will be able to align their test setups to the testing guidance published by the CMA. (See: Chrome-facilitated testing - Chrome Developers defines Mode A and Mode B; [CMA Guidance](https://assets.publishing.service.gov.uk/media/649d6a5f45b6a2000c3d455f/20230629_CMA_industry_testing_update_B.pdf) defines Control 1, Control 2, Treatment groups (in #11)

**Is there a contact at the CMA we could connect with to better understand what is required for the submitted final report?**

You can email the CMA case team at <a href="mailto:privacysandbox@cma.gov.uk">privacysandbox@cma.gov.uk</a> and read more about their testing proposal guidance [here](https://assets.publishing.service.gov.uk/media/649d6a5f45b6a2000c3d455f/20230629_CMA_industry_testing_update_B.pdf). (For additional reference, the CMA lists all their contacts at the bottom of their [Privacy Sandbox page](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes))

**Could you please clarify quantitative testing success metrics?**

Grant participants can define and share as many additional KPIs as they want, beyond those specified in the SOW. The minimum test results that need to be shared are listed in the [CMA Guidance](https://assets.publishing.service.gov.uk/media/649d6a5f45b6a2000c3d455f/20230629_CMA_industry_testing_update_B.pdf). This guidance is purposefully "light" and broad so the CMA can compare many results from different ad techs.

**Is there a volume threshold for testing? (Control group ratios vs. Modes ratios, etc.) Do you have additional guidance on valuable KPIs to test beyond the CMA's testing guidance?**

You can draft these volume/scale requirements in your Integration Plan; we will work with you to align on the scale required given your business model. You can include specific metrics and tests in your Testing Plan. Please keep in mind that the Testing Plan should take into account Mode A and Mode B of Chrome-facilitated testing. We can provide feedback on these once you submit them.

**What types of publisher inventory integrations are supported by Protected Audience and TOPICS testing?**

As part of the Market Testing Grants, we don't have any restrictions on the specific integration mechanisms, just that the Protected Audience auction should be end-to-end coordinated with other Privacy Sandbox-integrated parties and should aim to result in billable impressions.

We understand that other companies' integration decisions could impact the types of inventory where Protected Audience and Topics can be tested. The SOW requirements give the contractor the ability to work within the types of inventory that are available to them based on their integrations with other parties who are using the APIs.

**How will Google ensure participating DSP platforms are ready for the end-to-end test by January 1, 2024?   How will Google facilitate connecting the committed DSPs, when they are ready, with us (partner)?**

The Market Testing Grants program has both a DSP and SSP track, designed to accelerate both sides of the ecosystem. Participants will be [publicly listed on GitHub](https://github.com/WICG/turtledove/blob/main/fledge-tester-list.md) with contact information for coordination. The Privacy Sandbox team can also make introductions and attend joint meetings with coordinating ad techs. For example, we have had several joint meetings with multiple Privacy Sandbox partners to discuss Protected Audience and Topics integration. 
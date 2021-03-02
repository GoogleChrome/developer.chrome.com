---
layout: 'layouts/doc-post.njk'
title: 'Federated Learning of Cohorts (FLoC)'
subhead: >
  Allow sites to guess your interests without being able to uniquely identify you.
description: >
 FLoC enables interest-based advertising in a way that preserves privacy. As a user moves around the 
 web, their browser is assigned to an "interest cohort" along with thousands of others with a 
 similar browsing history. This is done without sharing individual browsing data with the browser 
 vendor or anyone else. Advertisers (sites that pay for advertisements) can include code on their 
 pages to provide access to cohort data for their ad-tech platforms.
date: 2021-02-28
updated: 2021-02-28
authors:
  - samdutton
---

{% Aside 'warning' %}
[For Googlers, March 2021.]

This document is a work in progress, unfinished and not to be shared externally.
{% endAside %}


## Implementation status

* [API proposal](https://github.com/WICG/floc) is under discussion with [WICG](https://www.w3.org/community/wicg/) and interest groups.
* [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc)

## Why do we need FLoC?

This means that ad space is more valuable when it's used to display relevant ads. This in turn means that selecting relevant ads increases revenue for ad-supported websites.

Relevant ads are [more likely to engage users](https://services.google.com/fh/files/misc/disabling_third-party_cookies_publisher_revenue.pdf). This means that ad space is more valuable when 
it's used to display relevant ads. This in turn means that selecting relevant ads increases revenue 
for ad-supported websites.

However, many people are concerned about the privacy implications of ad targeting, which currently 
relies on techniques such as tracking cookies and device fingerprinting which can reveal your 
browsing history to advertisers. The FLoC proposal aims to allow ad selection without compromising 
privacy.


## What is the Federated Learning of Cohorts (FLoC)?

Many people are concerned about the privacy implications of ad selection, which currently relies on 
techniques such as tracking cookies and device fingerprinting that can reveal your browsing history 
to ad platforms and advertisers.

Advertisers use multiple techniques to choose relevant ads. For example:
* First-party and contextual information: "Show this ad to users who selected knitting as a favorite topic" or "Show this ad on pages about motorcycles'.
* Specific actions of the user: "Show this ad for discount wool to users who left knitting items in their shopping cart." Remarketing use cases such as this are handled by the TURTLEDOVE proposal.
* General information about user interests: "Show this ad to classical music lovers'. This is the use case handled by FLoC.

With FLoC, the browser groups thousands of users with similar browsing histories into "cohorts". Advertisers can select ads for this group, but cannot identify individual people within it. Each user belongs to no more than one cohort. The user's browser provides their cohort name (for example "9739") to websites and services on request. Cohort names can be requested to select ads or to learn which cohorts are most likely to visit a website or complete a conversion event.

### Today
Ad tech companies infer a particular individual's interests based on sites they visit by using cookies and fingerprinting techniques.

### Future
FLoC allows sites to guess your interests without being able to uniquely identify you. By generating a ID based on the browsing history of a large group of people, instead of ones of a particular individual, content can be personalized in a private way.


## What can FLoC be used for?

* Show ads to people whose browsers belong to a cohort that has been observed to frequently visit an 
advertiser's site or shows interest in relevant topics.
* Approximate demographic targeting by analyzing cohort behavior to infer characteristics of the 
cohort.
* Use machine learning models to predict the probability a user will convert based on their cohort, 
in order to inform bidding behavior.
* Recommend content to users. For example, suppose some of the content on your site is about sports.  
You could more highly recommend that content to people in the same cohorts as other people who have 
engaged with your sports stories in the past.


## How does FLoC work?

The example below describes the different roles in selecting an ad using FLoC.

* The **advertiser** (a company that pays for advertising) in this example is an online shoe
retailer: <br>
**<u>shoestore.example</u>**

* The **publisher** (a site that sells ad space) in the example is a news site: <br>
**<u>dailynews.example</u>**

* The **adtech platform** (which provides software and tools to deliver advertising) is: <br>
**<u>adnetwork.example</u>**

In this example we've called the users **Yoshi** and **Alex**. Initially their browsers both belong
to the same cohort, number 1354.

{% Aside %}
Don't think of a cohort as a collection of people. Instead, think of a cohort as a grouping of 
browsing activity.
{% endAside %}

### 1. FLoC service
1. The FLoC service used by the browser creates a mathematical model with thousands of "cohorts",
each of which will correspond to thousands of web browsers with similar browsing histories. More
about how this works [below](#floc-server).
1. Each cohort is given a number.

### 2. Web browser
1. From the FLoC service, Yoshi's browser gets data describing the FLoC model. 
1. Yoshi's browser works out its cohort number, by [using by using the FLoC model's algorithm](#floc-algorithm) 
to calculate which cohort corresponds most closely to its own browsing history. In this example, 
we'll say this is cohort 1354. Note that Yoshi's browser does not share any data with the FLoC 
service.
1. In the same way, Alex's browser calculates its cohort number. Alex's browsing history is 
different from Yoshi's, but similar enough that their browsers both belong to cohort 1354.

### 3. Advertiser: <span style="text-decoration:underline">shoestore.example</span> 
1. Yoshi visits <u>shoestore.example</u>.
1. The site requests the cohort number from Yoshi's browser: 1354.
1. Yoshi looks at hiking boots.
1. The site records that a browser from cohort 1354 showed interest in hiking boots.
1. The site later records additional interest in its products from cohort 1354, as well as from other
cohorts.
1. The site periodically aggregates and shares information about cohorts and product interests with
its adtech platform <u>adnetwork.example</u>. 

Now it's Alex's turn.

### 4. Publisher: <span style="text-decoration:underline">dailynews.example</span> 
1. Alex visits <u>dailynews.example</u>.
1. The site asks Alex's browser for its cohort number.
1. The site then makes a request for an ad to its adtech platform, <u>adnetwork.example</u>, including 
Alex's browser's cohort number: 1354.

### 5. Adtech platform: <span style="text-decoration:underline">adnetwork.example</span>
1. <u>adnetwork.example</u> can select an ad suitable for Alex by combining the data it has from 
the publisher <u>dailynews.example</u> and the advertiser <u>shoestore.example</u>: <br>
	• Alex's browser's cohort number (1354) provided by <u>dailynews.example</u>.<br>
	• Data about cohorts and product interests from <u>shoestore.example</u>: 'Browsers from cohort 1354 
	might be interested in hiking boots.'
1. <u>adnetwork.example</u> selects an ad appropriate to Alex: an ad for hiking boots on
<u>shoestore.example</u>.
1. <u>dailynews.example</u> displays the ad 🥾.

{% Aside %}
Current techniques for ad selection rely on techniques such as tracking cookies and device
fingerprinting, which can reveal individual browsing behaviour to third parties such as advertisers.

With FLoC the browser **does not share** its browsing history with the FLoC service or anyone else. 
The browser, on the user's device, works out which cohort it belongs to. Data about the user's 
browsing history never leaves the device.
{% endAside %}


## How does the FLoC service enable the browser to work out its cohort? {: #floc-server }

1. The FLoC service used by the browser creates a multi-dimensional mathematical representation 
of all potential web browsing histories. We'll call this model "cohort space".
1. The service divides up this space into thousands of segments. Each segment represents a
cluster of thousands of similar browsing histories. These groupings aren't based on knowing
any actual browsing histories; they're simply based on picking random centers in "cohort space" or
cutting up the space with random lines.
1. Each segment is given a cohort number.
1. The web browser gets this data describing "cohort space" from its FLoC service.
1. As a user moves around the web, their browser [uses an algorithm](#floc-algorithm) to 
periodically calculate the region in "cohort space" that corresponds most closely to its own 
browsing history.

<figure style="text-align: center">
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/RULVYVAWXOIIkzcsJWnz.png", alt="Diagram of the 
'browsing history space' created by a FLoC server, showing multiple segments, each with a cohort 
number.", width="400", height="359" %}
<figcaption class="w-figcaption">The FLoC service divides up "cohort space" into
thousands of segments (only a few are shown here).</figcaption>
</figure>

{% Aside %}
At no point in this process is the user's browsing history shared with the FLoC service, or 
any third party. The browser's cohort number is calculated by the browser, on the user's device. No
user data is acquired or stored by the FLoC service.
{% endAside %}


## Can a browser's cohort change?

YES! A browser's cohort definitely can change! You probably don't visit the same websites every 
week, and your browser's cohort will reflect that.

A cohort represents a cluster of browsing activity, not a collection of people. The activity 
characteristics of a cohort are generally consistent over time, and cohorts are useful for ad selection 
because they group similar recent browsing behaviour. Individual people's browsers will float in and 
out of a cohort as their browsing behavior changes. Initially, we expect the browser to recalculate 
its cohort every seven days.

In the example above, both Yoshi and Alex's browser's cohort number is 1354. In the future Yoshi's 
browser and Alex's browser may move to a different cohort if their interests change. In the
example below, Yoshi's browser moves to cohort 1378 and Alex's browser moves to cohort 1101. Other
people's browsers will move into and out of cohorts as their browsing interests change.

<figure style="text-align: center">
{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/WJdhnIaXy8hNQ9JXsaeK.png", alt="Diagram of the 
'browsing history space' created by a FLoC server, showing multiple segments, each with a cohort 
number. The diagram shows browsers belonging to users Yoshi and Alex moving from one cohort to 
another as their browsing interests change over time.", width="800", height="533" %}
<figcaption class="w-figcaption">Yoshi's and Alex's browser cohort may change if their interests 
change.</figcaption>
</figure>

{% Aside %}
A cohort defines a grouping of browsing activity, not a group of people. Browsers will move in and out of a cohort as their activity changes.
{% endAside %}


## How does the browser work out its cohort? {: #floc-algorithm }

As described above, the user's browser gets data from its FLoC service that describes the 
mathematical model for cohorts (a multi-dimensional space that represents the browsing activity of
all users). The browser then uses an algorithm to work out which region of this "cohort space" (i.e.
which cohort) most closely matches its own recent browsing behaviour.

How does this algorithm work? Before the FLoC [origin trial](https://web.dev/origin-trials) begins, FLoC designers
will provide details of the initial "clustering technique" for working out the browser's cohort, and
which pages contribute to it from the browser's history. For example, the algorithm might only take
into account sites which have requested the browser's cohort number.


---


## Engage and share feedback

* **GitHub**: Read the [proposal](https://github.com/WICG/floc), [raise questions and 
follow discussion](https://github.com/WICG/floc/issues).
* **W3C**: Discuss industry use cases in the [Improving Web Advertising Business&nbsp;Group](https://www.w3.org/community/web-adv/participants).


## Find out more

* [What is Federated Learning of Cohorts (FLoC)?](https://www.web.dev)
* [FLoC API technical explainer](https://github.com/WICG/floc)
* [Digging into the Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

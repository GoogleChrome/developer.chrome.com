---
layout: 'layouts/doc-post.njk'
title: 'Maximize ad relevance after third-party cookies'
subhead: >
  Look closer at the future of the advertising ecosystem
description: >
  Look closer at the future of the advertising ecosystem.
date: 2022-12-13
authors:
  - joeytrotz
---

The Privacy Sandbox aims to keep people's activity private across an open and
free internet. To do this, we are collaborating with the ad industry to
transition to new private ad technologies and deprecating support for
third-party cookies in Chrome in the
[second half of 2024](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline).

Whether you're a product leader, CTO, CMO, or CEO, it's essential to understand
how to support advertising use cases in an increasingly privacy-conscious world
and embrace solutions that can optimize both business outcomes and user privacy.

There is no doubt that 2023 will be a critical year to prepare for a world
without third-party cookies. In this guide, we'll discuss how the advertising
ecosystem can approach ad relevance in a cookieless future:

* What is changing about the data used to show relevant ads?
* How might ad tech offer interest-based advertising without
  third-party cookies?
* How can machine learning maximize performance using privacy-safe signals?

## What's changing about the data used to show relevant ads?

Interest-based advertising, also known as personalized advertising, is a type
of advertising that uses information about an individual's interests and
preferences to show them more relevant ads. This type of advertising uses a
wide range of data as signals to determine what ad to show, such as what
content a user has viewed, the pattern of sites the user has recently seen, or
a specific site previously visited.

Today, these signals are primarily powered by cross-site identifiers such as
third-party cookies, which are unique to an individual device.

As third-party cookies are phased out, ad tech solutions for interest-based
advertising should evolve to take advantage of privacy-friendly signals to show
relevant ads. These include first-party data, contextual signals, and
platform-provided privacy-preserving APIs, such as the
[Topics API](/docs/privacy-sandbox/topics/overview/),
[Protected Audience API](/docs/privacy-sandbox/fledge/), and
[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/),
which help support critical use cases for the ad industry while protecting
against cross-site tracking.

Interest-based advertising can survive and thrive with innovative technologies
developed across the ecosystem. These technologies will help us move toward a
world where people's data is better protected, while ads can continue to drive
marketing outcomes that support a dynamic and open web.

## How can ad tech offer interest-based advertising without third-party cookies?

Today, interest-based advertisers typically set up the following for campaigns
through their ad tech providers:

1. **Goal**: What is the business outcome the advertiser is trying to achieve
   with this ad campaign? This tells ad platforms what to optimize for. For
   example, the advertiser may want to drive sales on their kids' clothing
   website. Often, these goals are measured through cross-site conversion tags
   and Attribution Reporting.
1. **Audience**: Who does the advertiser want to reach? This tells the ad
   platform who the advertiser thinks is likely a good match for the ad. For
   example, the advertiser may wish to reach new customers currently in-market
   for kids' clothing.
1. **Placement**: What websites does the advertiser want to run ads on? This
   specifies where ads are allowed to run in terms of ad inventory or
   categories of ad inventory. For example, advertisers could place their ads
   across a broad set of websites, or they might select specific websites which
   have higher likelihood of reaching their desired audience.
1. **Budget and bid**: How much does the advertiser want to spend in total and
   for a specific action like impression served, ad click, or ad conversion?
   This ensures the campaign meets cost requirements for its goals. For
   example, the advertiser may wish to spend up to $1,000 and pay at most $2.00
   CPM to serve 500,000 impressions to targeted audiences and on specified
   websites.

### Evolving audience creation

In a post-third-party cookie world, ad tech providers will want to adapt
how their platforms serve relevant ads. Today, ad relevance is commonly
achieved through audiences that an advertiser can use to reach people most
likely to be interested in their products and services.

Advertisers commonly use these different audience types:

1. [**Affinity**](#affinity): Reach users based on what they're passionate
   about, their habits and their interests.
1. [**In-market**](#in-market): Reach users based on their recent purchase
   intent.
1. [**Remarketing**](#remarketing): Reach users who have previously visited an
   advertiser's website.
1. [**Audience extension**](#audience-extension): Reach users of a particular
   publisher on other websites

After third-party cookie deprecation, ad tech providers can continue
supporting these audience types' goals using new approaches, including Privacy
Sandbox APIs.

#### Affinity

Today, advertisers reach users classified by their affinity (also known as
interests), most commonly by leveraging third-party data segments. These
audiences are provided by many data marketplaces and distributed for activation
across the ad tech ecosystem through channels like demand-side platforms
([DSPs](/docs/privacy-sandbox/glossary/#dsp)) and data management platforms
([DMPs](/docs/privacy-sandbox/glossary/#dmp)).

Segments are typically built by tracking individuals using third-party
cookies and then grouping users based on a taxonomy of categories and
proprietary methodologies for determining when a user qualifies for a category.

After third-party cookie deprecation, audience selection based on affinity will
evolve to use different signals to qualify users for inclusion in any given
audience. There will be several ways to do this using the Privacy Sandbox
privacy-preserving APIs including:

* **Topics API**: This API offers a standardized taxonomy of interests and a publicly-known methodology for the on-device classification of interests for a given user based on the types of websites recently visited. Ad tech can call the Topics API to get interests for a given user. The API protects privacy by limiting: the length of browsing history considered, the parties who can access a given topic, the number of categories returned, and more. This API is particularly useful for ad tech without direct publisher relationships or contextual optimization capabilities.
* **Topics API with contextual data**: A more advanced method involves comparing a user's topics and the context of a page, to estimate additional affinities for users. For example, an ad tech solution may learn that people interested in a particular set of topics (such as outdoor activities) may over-index on visiting specific categories of pages (such as sites about grilling). Ad tech can train a machine learning model to predict that a visitor to an "outdoor activity" website could be interested in grilling even if "BBQ & Grilling" is not returned as a topic through the Topics API. This method is particularly useful for a buy-side ad tech if it has contextual optimization capabilities.
* **Protected Audience API**: This API enables ad tech to create audience segments by labeling visitors of a web page as members of a particular segment, such as "interested in family adventures." If the ad tech provider has other websites in its partner network that pertain to "family adventures," they can also add visitors for those sites to this same segment.

Protected Audience API protects user privacy by keeping assignment to audience segments
on-device, and not sharing back to ad tech whether the same user
belongs to multiple interest groups. This limits cross-site tracking. This API
is particularly useful for an ad tech with a network of site partnerships.

With these methods, ad tech can offer scaled affinity audience segments without
relying on cross-site user identifiers. Ad tech don't have to limit themselves
to one method, and may differentiate based on their publisher relationships,
advertiser relationships, and machine learning capabilities.

#### In-market

Presently, advertisers reach users classified as being "in-market" (also known
as having "purchase intent") by using third-party cookie segments similar to
how they access audiences based on "affinity." Whether a user is classified
in-market for a product like "cooking gear" or simply interested in cooking
depends on the proprietary taxonomies and methodologies of ad tech
providers.

After third-party cookie deprecation, privacy-preserving APIs will provide new
signals to inform 'in-market' audience creation. Some alternative methods
include:

* **Topics API**: Similar to using this API for affinity audiences, using it for in-market involves returning a topic that can approximate purchase intent for a given user based on an on-device, publicly known methodology, and taxonomy.

The standardized three-week lookback window for generating these topics
protects user privacy by limiting the total amount of data made available to ad
tech providers. However, different categories of products and services have
different consideration cycles ranging from days to months, making this API
useful for advertisers whose customer purchase cycle aligns with the Topic's
lookback window.

* **Protected Audience API**: As with the affinity use case, this API gives ad tech platforms the ability to create their own segments, such as "in-market auto buyers." If the ad tech provider has other websites in its partner network that pertain to "in-market auto buyers," they can also add visitors for those sites to this same segment while maintaining cross-site user privacy. Protected Audience API is particularly useful for an ad tech provider when there is a direct publisher/advertiser relationship that allows data partnership, and a need for greater customization than Topics would allow.
* **Topics API + Attribution Reporting API**: By combining Topics and the Attribution Reporting API, you can expand the lists of topics that map to specific conversions (such as purchases), which creates additional ways to reach an in-market audience.

For example, analysis or machine learning systems may uncover that users who
saw an ad about scuba gear, and bought it, very often have "Beaches & Islands"
and "Fishing" topics associated with them. An ad tech solution could translate
this insight into improved reach to users "in-market for scuba gear" by
selecting users with those two topics. Attribution Reporting protects user
privacy in this instance by providing noisy conversion data about associations
of topics with conversions.

This approach makes sense when ad tech providers don't have much
contextual data but have machine learning or robust data science and analysis
capabilities.

* **Attribution Reporting API with contextual data**: Ad tech solutions can leverage contextual categorization of the pages where ads are shown, categorization of advertisers and products, and data from Attribution Reporting to uncover trends or patterns in the types of sites people favor when in-market to buy certain types of products and services. For example, this combination of data may lead to insights like learning that people who are on web pages about family activities are highly likely to be in-market to buy outdoor apparel too.

These methods are just a few of the many ways ad tech providers can creatively
scale and customize audience segments without relying on cross-site user
identifiers. They could also integrate more signals like first party data and
other combinations of privacy-preserving APIs for even greater results. Thus,
ad tech providers can differentiate themselves by taking different approaches
to audience building, securing unique data, and developing superior machine
learning capabilities.

#### Remarketing

Advertisers can re-engage users who have previously visited their website
through remarketing. Currently, this involves placing a third-party cookie on a
browser at the time of a website visit and then bidding to show ads to that
browser when the cookie is observed on another website. Ad tech providers can
create different remarketing segments for a given website based on user
activities taken throughout the website.

Without third-party cookies, ad tech providers will be able to use the
Protected Audience API to support remarketing use cases:

* **Protected Audience API**: Ad tech providers can create customized remarketing segments for a site by creating interest groups dependent on user activity. In prior use cases with Protected Audience API, ad tech providers were building very large audiences from multiple websites. In this use case, only one website is trying to re-engage a past visitor, and without the privacy protections built into Protected Audience API, this use case might lead websites to single out individuals. While allowing effective audience remarketing, this API protects individual privacy by setting [k-anonymity](/docs/privacy-sandbox/glossary/#k-anonymity) thresholds to ensure a sufficient number of individuals are eligible to see the ad.

Even without third-party cookies, the Privacy Sandbox enables advertisers to
use their first-party data for remarketing at scale, across third-party
websites.

#### Audience extension

Advertisers sometimes want to reach more of the same audience they see from a
particular publisher, but when those users are on other websites. Audience
extension is a process that extends publisher first-party audiences by finding
them on other sites to increase frequency or delivered reach of the same
audience.

By using audience extension, a publisher can provide an advertiser with an
audience segment, such as affinity (such as golfers) or demographics (such as
an age range), and allow the advertiser to find that audience on other sites.
Audience extension is also used when an advertiser wants to increase awareness 
of their products by reaching consumers when they shop on a retailer's website
and elsewhere on the web.

Ad tech providers can use the Protected Audience API to extend audiences for publishers
without third-party cookies:

-   **Protected Audience API**: Ad tech providers can create custom audience extension segments for a site by creating interest groups dependent on user activity such as reading a particular section of a website (e.g. travel section).  This process is effectively similar to remarketing and offers the same privacy protections. It makes sense for advertisers who value the 1P audience data of a publisher but cannot get enough ad inventory on that publisher website for that audience.

## How can machine learning maximize performance using privacy-safe signals?

With the deprecation of third-party cookies, advertisers may want to consider
how machine learning and privacy-safe signals can be used to drive the best
outcomes.

### Drive advertiser outcomes through automation

Most ad tech providers offer varying degrees of manual and automated campaign
optimization.

The most manual solutions require advertisers to specify desired audiences,
placements, and bids, and then stay within those inputs. Manual setups provide
robust control to advertisers but may provide sub-optimal results if the
advertiser needs to know all the performant audiences and placements or cannot
predict the theoretical optimal bid for each impression, given all the
variables involved.

The most automated solutions ask advertisers to specify their desired business
outcome (such as $2 cost-per-action/sale), using machine learning to identify
the audiences and placements that perform well for that advertiser and the
right bid to achieve the desired goal. In this setup, there are few or no
constraints on the ad tech solution except a budget and goal. Audience
selection by the advertiser may be treated as a "suggestion" or "starting
point," but machine learning will look for patterns among all available data
that may be indiscernible to humans.

Machine learning uses these patterns to optimize performance by adding more
relevant audiences and adjusting bids based on the predicted performance of
those audiences. The Privacy Sandbox is one of many sources of signals that
will be available to inform machine learning after third-party cookie
deprecation.

Machine learning can maximize ad performance by continually testing and
learning all the best audiences, placements, and bids across time, campaigns,
and even advertisers. It's worth noting that sophisticated analytics performed
by skilled teams can also discover similar correlations.

Reducing the need for advertisers to manage audiences, placements, and bids
will simplify advertiser workload and enable machine learning systems to drive
the best possible outcomes. Ad tech investments in automated solutions&mdash;in
addition to benefiting advertisers&mdash;can also help transition away from
third-party cookies.

### Additional signals for machine learning

Ad tech providers have always factored in multiple signals when deciding
whether to bid to serve an ad. In a world without cross-site cookie tracking,
ad tech will benefit from using every available privacy-safe signal in machine
learning to predict business outcomes, such as clicks or conversions.

The following privacy-safe signals are sometimes undervalued but can contribute
significantly to ad relevance in a future without third-party cookies:

1. **Ad creative features**: Analyzing ad creative at a component level (e.g., text, images, design) may help predict performance with specific audiences or on certain pages, such as the ad's subject matter or whether it includes a lot of text.
1. **First-party data**: Publishers, marketers, and retail networks are increasingly building first-party identifiers and segments, such as [seller-defined audiences](https://iabtechlab.com/sda). Knowing a user's behavior over time on a given site allows you to better predict what ads work best for that user or segment on that site, without cross-site profiling. A publisher's first-party data can help improve bidding across all their sites. These site-specific bid improvements can cumulatively increase performance across a campaign.

Ad tech providers can unlock the best results by combining all available tools,
such as machine learning and privacy-safe signals from privacy-preserving APIs,
along with contextual data, creative data, and first-party data.

## Conclusion

After third-party cookies are phased out, it is essential that the advertising
industry continues to deliver relevant ads and that consumers receive the
privacy protections they expect. We know that building with new tools, like
those from the Privacy Sandbox, requires effort, and we will continue to
support the industry throughout this transition.

Moving forward, we encourage you to:

1. Invest in integrating privacy-preserving APIs such as Topics, Protected Audience API, and
   Attribution Reporting into your ad tech solutions, to support common
   interest-based advertising use cases after third-party cookies go away.
1. Test Privacy Sandbox APIs in conjunction with other privacy-safe signals,
   including first-party publisher data, to understand future performance and
   inform strategy.
1. Maximize performance by enabling machine learning to use all available
   privacy-safe data, with as much freedom to learn and optimize as possible.

The ad tech industry can perform many core targeting and bidding functions
using the Privacy Sandbox APIs. However, there are numerous benefits from
incorporating additional privacy-preserving signals beyond those APIs, and
deploying all of these signals together.

Innovation is in the digital advertising industry's DNA. By evolving existing
approaches to ads relevance, we can successfully transition from third-party
cookies to a more private and more performant web.

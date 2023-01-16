--- 
layout: 'layouts/doc-post.njk' 
title: 'Privacy Sandbox glossary' 
subhead: Privacy Sandbox articles and documentation assume a knowledge of concepts from privacy, advertising, and web development. This glossary explains key terms. 
description: Short explanations of key concepts.
date: 2021-05-18
updated: 2022-07-25 
authors:
  - samdutton
  - alexandrawhite
  - mihajlija
---


{% Aside %}
[Let us know](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=)
if something is missing!
{% endAside %}

## Ad auction (FLEDGE)

In FLEDGE, an ad auction is run by a seller (ikely to be an [SSP](#ssp) or maybe the publisher itself), in JavaScript code in the browser on the
user's device, to sell ad space on a site that displays ads.

{: #creative}

## Ad creative, creative {: #ad-creative}

The contents of the ad served to users. Creatives can be images, videos, audio,
and other formats. Creatives live within an ad space, and are served by adtech
within line items.

## Ad exchange

A platform to automate buying and selling of ad inventory from multiple ad
networks.

{: #ad-space }

## Ad inventory, ad space {: #ad-inventory }

The spaces for ads that are available from a site that sells ad space.

## Ad platform (Adtech) {: #adtech }

A company that provides services to deliver ads.

## Advertiser {: #advertiser }

A company that pays to advertise its products.

## Aggregatable reports

Encrypted reports sent from individual user devices. These reports contain
data about cross-site user behavior and conversions. Conversions (sometimes
called attribution trigger events) and associated metrics are defined by the
advertiser or adtech. Each report is encrypted to prevent various parties
from accessing the underlying data.

## Attestation

A mechanism to authenticate software identity, usually with [cryptographic
hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function) or
signatures. For the aggregation service proposal, attestation matches the
code running in the adtech-operated aggregation service with the open
source code.

## Attribution {: #attribution }

Identification of user actions that contribute to an outcome.

For example, a correlation of ad clicks or views with [conversions](#conversion).

## Blink {: #blink }

The [rendering engine](https://en.wikipedia.org/wiki/Browser_engine) used by
Chrome, developed as part of the [Chromium](#chromium) project.

## Buyer

A party bidding for ad space in an [ad auction](#ad-auction), likely to be a
[DSP](#DSP), or maybe the advertiser itself. Ad space buyers own and manage
interest groups. 

Learn about [ad space buyers in FLEDGE](/docs/privacy-sandbox/fledge/#buyer-detail).

## Chromium {: #chromium }

An open-source web browser project. Chrome, Microsoft Edge, Opera and other
browsers are based on Chromium.

## Click-through rate (CTR) {: #ctr }

The ratio of users who click on an ad, having seen it.

See also [impression](#impression).

## Click-through-conversion (CTC) {: #ctc }

A conversion attributed to an ad that was 'clicked'.

## Coarse data

Limited information provided by Attribution Reporting API event-level reports.
This is limited to 3 pieces of conversion data for clicks and 1 piece for
views. Specific, granular conversion data (such as specific prices of items
and timestamps)  are not included.

## Conversion

The completion of some desired goal following action by a user.

For example, a conversion may occur with the purchase of a product or sign-up
for a newsletter after clicking an ad that links to the advertiser's site.

## Cookie

A small piece of textual data that websites can store on a user's browser.
Cookies can be used by a website to save information associated with a user
(or a reference to data stored on the website's backend servers) as the user
moves across the web.

For example, an online store can retain shopping cart details even if a user is
not logged in, or the site could record the user's browsing activity on their
site. See [First-party cookie](#first-party-cookie) and
[Third-party cookie](#third-party-cookie).

## Coordinator

An entity responsible for key management and aggregatable report accounting. The coordinator maintains a list of hashes of approved aggregation service configurations and configures access to decryption keys.

## Data management platform (DMP) {: #dmp }

A software used to collect and manage data relevant for advertisers. These
platforms help advertisers and publishers identify audience segments, which can
then be used for campaign targeting.

Learn more about [DMPs](https://en.wikipedia.org/wiki/Data_management_platform).

## Demand-side platform (DSP) {: #dsp }

An adtech service used to automate ad purchasing. DSPs are used by advertisers
to buy [ad impressions](https://en.wikipedia.org/wiki/Impression_(online_media))
across a range of publisher sites. Publishers put their
[ad inventory](#ad-inventory) up for sale through marketplaces called ad
exchanges, and DSPs decide programmatically which available ad impression makes
most sense for an advertiser to buy.

## Differential privacy {: #differential-privacy }

Techniques to allow sharing of information about a dataset to reveal patterns
of behaviour without revealing private information about individuals or whether
they belong to the dataset.

## Domain

See [Top-Level Domain](#tld) and [eTLD](#etld).

## eTLD, eTLD+1 {: #etld }

Stands for effective top-level domains (TLD), which are defined by the
[Public Suffix List](https://publicsuffix.org/list/).

For example:

```text
co.uk 
github.io 
glitch.me
``` 

Effective TLDs are what allow `foo.appspot.com` to be a different site from
`bar.appspot.com`. The eTLD in this case is `appspot.com`, and the whole
site name (`foo.appspot.com`, `bar.appspot.com`) is known as the eTLD+1.

See also [Top-Level Domain](#tld).

## Entropy

A measure of how much an item of data reveals individual identity.

Data entropy is measured in bits. The more that data reveals identity, the higher its entropy value.

Data can be combined to identify an individual, but it can be difficult to work
out whether new data adds to entropy. For example, knowing a person is from
Australia doesn't reduce entropy if you already know the person is from
Kangaroo Island.

## Federated identity (federated login) {: #federated-identity }

A third-party platform to allow a user to sign in to a website, without
requiring the site to implement their own identity service.

## Federated Credential Management API (FedCM) {: #fedcm }

Federated Credential Management API is a proposal for a privacy-preserving
approach to federated identity services. This will allow users to log into
sites without sharing their personal information with the identity service or
the site.

FedCM was previously known as WebID, and is still
[in development in the W3C](https://github.com/wicg/fedcm).

## Fenced frame

A (`<fencedframe>`) is a proposed HTML element for embedded content, similar to
an [iframe](https://developer.mozilla.org/docs/Web/HTML/Element/iframe). Unlike
iframes, a fenced frame restricts communication with its embedding context to
allow the frame access to cross-site data without sharing it with the embedding
context.

Some Privacy Sandbox APIs may require select documents to render within a
fenced frame. Learn more about the
[Fenced Frames proposal](/docs/privacy-sandbox/fenced-frame/).

## Fingerprinting {: #fingerprinting }

Techniques to identify and track the behaviour of individual users.

Fingerprinting uses mechanisms that users aren't aware of and can't control. 
Sites such as [Panopticlick](https://panopticlick.eff.org) and
[amiunique.org](https://amiunique.org/) show how fingerprint data can be
combined to identify you as an individual.

## Fingerprinting surface {: #fingerprinting-surface }

Something that can be used (probably in combination with other surfaces) to
identify a particular user or device.

For example, the `navigator.userAgent()` JavaScript method and the `User-Agent`
HTTP request header provide access to a fingerprinting surface (the User-Agent
string).

## First-party {: #first-party }

Resources from the site you're visiting.

For example, the page you're reading is on the site `developer.chrome.com` and
includes resources requested from this site. Requests for those first-party
resources are called 'first-party requests'. [Cookies](#cookie) from
`developer.chrome.com` stored while you're on this site are called
[first-party cookies](#first-party-cookie).

See also [Third-party](#third-party).

## First-party cookie {: #first-party-cookie } 

[Cookie](#cookie) stored by a website while a user is on the site itself.

For example, an online store might ask a browser to store a cookie in order to
retain shopping cart details for a user who is not logged in. See also
[Third-party cookies](#third-party-cookie). 

## I2P {: #i2p }

Intent to Prototype. The first stage in
[developing a new feature](/blog/progress-in-the-privacy-sandbox-2021-12/#chromium-development-process)
in [Blink](#blink). The announcement is posted to the [blink-dev mailing
list](https://groups.google.com/a/chromium.org/g/blink-dev) with a link to the
proposal for discussion.

## I2E {: #i2e }

Intent to Experiment. Announcement of a plan to make a new [Blink](#blink)
feature available to users for testing, typically through an [origin
trial](#origin-trial).

## I2EE {: #i2ee }

Intent to Extend Experiment. Announcement of a plan to extend the duration of an
[origin trial](#origin-trial).

## I2S {: #i2s }

Intent to Ship. Announcement of a plan to make a new feature of [Blink](#blink)
available to users in stable versions of Chrome.

## Impression {: #impression }

Could refer to either:

*  View of an ad. See also [click-through rate](#ctr).
*  An ad slot: the HTML markup (usually `<div>` tags) on a web page where an ad
   can be displayed. Ad slots constitute [inventory](#inventory).

## Inventory {: #inventory}

The ad slots available on a site. Ad slots are the HTML markup (usually `<div>`
tags) where ads can be displayed.

## k-anonymity

A measure of anonymity within a data set. If you have _k_ anonymity, you can't
be distinguished from _k-1_ other individuals in the data set. In other words,
_k_ individuals have the same information (including you).

## Nonce 

Arbitrary number used once only in cryptographic communication.

## Origin 

Defined by the scheme (protocol), hostname (domain), and port of the URL used to access it.

For example: `https://developer.chrome.com`

## Origin trial {: #origin-trial}

Trials provide access to a new or experimental feature, to make it possible to
build functions that users can try out for a limited time before the feature is made available to everyone.

When Chrome offers an origin trial for a feature, an [origin](#origin) can be
registered for the trial to allow the feature for all users on that origin,
without requiring users to toggle flags or switch to an alternative build of
Chrome (though they may need to upgrade). Origin trials allow developers to
build demos and prototypes using new features. The trials help Chrome engineers
understand how new features are used, and how they may interact with other web technologies.

Find out more: 
[Getting started with Chrome's origin trials](https://web.dev/origin-trials/).

## Passive surface {: #passive-surface }

Some [fingerprinting surfaces](#fingerprinting-surface)&mdash;such as 
User-Agent strings, IP addresses, and Accept-Language headers&mdash;that are
available to every website, whether the site asks for them or not.

Passive surfaces can easily consume a site's privacy budget.

The Privacy Sandbox initiative proposes replacing passive surfaces with active
ways to get specific information, for example using Client Hints a single time
to get the user's language rather than having an Accept-Language header for
every response to every server.

## Publisher

In the Privacy Sandbox context, a site with ad space that is paid to display
ads.

## Reach

The total number of people who see an ad or who visit a web page that displays
the ad.

## Real-time bidding (RTB) {: #rtb}

An automated auction for buying and selling ad impressions on websites,
completed during page load.

## Remarketing

Advertising to people who've already visited your site on other sites.

For example, an online store could show ads for a toy sale to people who
previously viewed toys on their site.

## Reporting origin

The entity that receives aggregatable reports&mdash;in other words, the adtech
that called the Attribution Reporting API. Aggregatable reports are sent from
user devices to a [well-known](#well-known) URL associated with the reporting
origin.

## Seller

The party running an ad auction, likely to be an [SSP](#ssp) or maybe the
publisher itself.

## Site

See [Top-Level Domain](#tld) and [eTLD](#etld).

## Summary report {: #aggregate-report}

An Attribution Reporting API and Private Aggregation API report type. A [summary
report](/docs/privacy-sandbox/attribution-reporting/summary-reports/) includes
aggregated user data and detailed conversion data, resulting from noisy
aggregation applied to aggregatable reports. The summary
includes aggregated user data and detailed conversion data.

Summary reports were formerly known as aggregate reports.

## Supply-side platform, Sell-side platform {: #ssp}

An adtech service used to automate selling ad inventory. SSPs allow publishers
to offer their inventory (empty rectangles where ads will go) to multiple ad
exchanges, [DSPs](#DSP), and networks. This enables a wide range of potential
buyers to bid for ad space.

## Surface

See [Fingerprinting surface](#fingerprinting-surface) and
[Passive surface](#passive-surface).

## Third-party {: #third-party }

Resources served from a domain that's different from the website you're
visiting.

For example, a website `foo.com` might use analytics code from
`google-analytics.com` (via JavaScript), fonts from
`use.typekit.net` (via a link element) and a video from `vimeo.com` (in an
iframe). See also [First-party](#first-party).

## Third-party cookie {: #third-party-cookie}

[Cookie](#cookie) stored by a third-party service.

For example, a video website might include a **Watch Later** button in their
embedded player to allow a user to add a video to their wishlist without
forcing them to navigate to the video site.

See also [First-party cookie](#first-party-cookie).

## Top-level domain (TLD) {: #tld }

Top-level domains such as .com and .org are listed in the
[Root Zone Database](https://www.iana.org/domains/root/db).

Note that some 'sites' are actually just subdomains. For example,
`translate.google.com` and `maps.google.com` are subdomains of `google.com`. These subdomains are [eTLD + 1](#etld).

## Trusted Execution Environment (TEE) {: #tee }

A special configuration of computer hardware and software that allows external
parties to verify the exact versions of software running on the computer. TEEs
allow external parties to verify that the software does exactly what the
software manufacturer claims it does—nothing more or less.

To learn more about TEEs used for the Privacy Sandbox proposals, read the
[FLEDGE services explainer](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment)
and the
[Aggregation Service explainer](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md).

## User-Agent string {: #user-agent }

An HTTP header used by servers and network peers to request indentifying
information about an application, operating system, vendor, or version of a
user agent. The User-Agent string broadcasts a large string of data, which is
problematic for user privacy. [User-Agent
reduction](/docs/privacy-sandbox/user-agent/) is proposed to remove sensitive
information and reduce passive fingerprinting.

## User-Agent Client Hints (UA-CH) {: #ua-ch }

Provide specific pieces of the User-Agent string on explicit request. This
helps reduce [passive surfaces](#passive-surface) in the User-Agent string
which may lead to user identification or covert tracking.

UA-CH is sometimes referred to as "Client Hints."

## .well-known {: #well-known }

A file used to add redirects to a website from standardized URLs.

For example, password managers can make it easier for users to update passwords
if a website sets a redirect from `/.well-known/change-password` to the change
password page of the site.

In addition, it can be useful to access policy or other information about a
host _before_ making a request. For example, `robots.txt` tells web crawlers
which pages to visit and which pages to ignore. IETF
[RFC8615](https://tools.ietf.org/html/rfc8615) outlines a standardized way
to make site-wide metadata accessible in standard locations in a `/.well-known/` subdirectory.

See a list of recommendations for `.well-known` at
[iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml).

## Worklet

A [worklet](https://developer.mozilla.org/docs/Web/API/Worklet) allows
you to run specific JavaScript functions and return information back to the
requester. Within a worklet, you can execute JavaScript but you cannot interact
or communicate with the outside page.

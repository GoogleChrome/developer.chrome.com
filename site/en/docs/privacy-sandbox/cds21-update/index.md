---
layout: layouts/doc-post.njk
title: Chrome Developer Summit 2021 update
subhead: >
  How you can help develop and test new privacy-preserving technologies
description: >
  An update on our progress at the 2021 Chrome Developer Summit, with an overview of how we collaborate with stakeholders to discuss, test, and adopt APIs.
date: 2021-11-03
updated: 2022-03-30
authors:
  - alexandrawhite
---

Here's what you need to know:

*  [Follow the timeline](https://privacysandbox.com/timeline/) for various Privacy
   Sandbox proposals, including a staged plan to phase out third-party cookies
*  Read the technical details and [implementation guidelines](/docs/privacy-sandbox/)
*  Monitor and [engage in conversation](#discussion) around
   [privacy proposals](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)
*  [Prepare for User-Agent reduction](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html)
   and migrate to [UA Client Hints](https://web.dev/migrate-to-ua-ch/)
*  Share your feedback with [@ChromiumDev on Twitter](https://twitter.com/ChromiumDev)

This update on the Privacy Sandbox was announced at the
[Chrome Developers Summit 2021 keynote](/devsummit/schedule/keynote/).

{% YouTube id='_Ah_ODU3CvA' %}

## Why does the Privacy Sandbox matter?

We believe it's important for people to be in control of their information,
including their online activity. Most users believe it's important, too. In
fact, 80% of internet users believe data protection is very important and 65%
have avoided certain online activities due to privacy or security concerns,
according to
[Avast's Digital Citizenship Report](https://press.avast.com/post-pandemic-online-behavior).

<blockquote>
   <p><strong>80%</strong> of internet users believe <strong>data protection is very important</strong>.
  </p>
  <cite>
    <a href="https://press.avast.com/post-pandemic-online-behavior">Avast's Digital Citizenship Report</a>
  </cite>
</blockquote>

We also see regulators around the world stepping up privacy requirements at a
rapid pace. 65% of the world's population is expected to be covered under
modern privacy regulations by 2023, up from 10% in 2020, according to
[Gartner, Inc.](https://www.gartner.com/en/newsroom/press-releases/2020-09-14-gartner-says-by-2023--65--of-the-world-s-population-w)

However, many common web functions rely on third-party cookies and other
cross-site tracking mechanisms that weren't designed with privacy in mind. We
need new technologies for a modern, privacy-focused web. That's what the
Privacy Sandbox is about.

We're working with the web community and industry stakeholders to develop new
privacy-preserving technologies that can support a healthy, sustainable
ecosystem. This includes purpose-built APIs to support advertising, a critical
part of the ecosystem which funds much of the web's content, as well as other
capabilities such as fraud detection, identity, or delivering content that's
customized to a user's device.

{% Img class="float-right",
src="image/VbsHyyQopiec0718rMq2kTE1hke2/zn2LdBxaLq9Dd7vUjMYY.png",
alt="",
width="485", height="659"
%}

## Purpose-built APIs

Many of the common web functions described above weren't built into the web
platform, but instead have been layered over it with general-purpose
technologies such as third-party cookies. 

When we design APIs for each specific use case, we can ensure appropriate
privacy protections, give people more useful controls, and ideally improve each
API over time.

Once these new APIs are in place, we'll make sure developers have time to
adopt them so that we can safely phase out support for third-party cookies in
Chrome, while continuing our work to mitigate other types of tracking. This
approach helps ensure cross-site tracking doesn't simply shift from
third-party cookies to more covert methods.

## How we collaborate {: #collaborate}

There is a large amount of ecosystem input shaping this work, at every stage of
development. This process may be familiar to web developers, but may be new to
other industry stakeholders who will use these purpose-built APIs &ndash; and
whose expertise is critical to this initiative.

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/2Voe1Bpd3jbSt2QtJRbE.png",
alt="",
width="800", height="171" %}

### Web standards start with discussion {: #discussion}

There have been dozens of
[privacy-preserving proposals](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)
offered by Chrome and others over the last couple of years. You can read these
proposals, ask questions, offer ideas to improve them and see what others are
saying. 

To find conversations where the proposed solutions are being discussed and
debated together, there are a number of W3C groups you can join or monitor,
depending on the use cases you're interested in:

* [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/)
* [Private Advertising Technology Community Group](https://www.w3.org/community/patcg/)
* [Privacy Community Group](https://www.w3.org/community/privacycg/)
* [Web Platform Incubator Community Group](https://www.w3.org/community/wicg/)
* [Federated Identity Community Group](https://www.w3.org/community/fed-id/)

The discussion stage can be highly involved.

For example, [Protected Audience API](https://github.com/WICG/turtledove/blob/main/Protected Audience API.md)
is a proposal to support interest-based advertising without cross-site
tracking. With input from privacy advocates and many industry stakeholders,
Protected Audience API has evolved from two previous proposals (PIGIN and TURTLEDOVE). More
than one hundred organizations have joined
[W3C meetings](https://github.com/WICG/turtledove/issues/88) to help refine the
current version, plus over
[200 online discussion threads](https://github.com/WICG/turtledove/issues).

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/Rg4lEQVzb1v6CZTyzFTE.png",
alt="In 2019 we proposed PIGIN, followed by TURTLEDOVE in 2020 and Protected Audience API in 2021.",
width="800", height="169" %}

There have also been more than half a dozen other proposals offered by other
companies, in the same solution space. Through continued collaboration, we hope
to define a path forward. 

At the same time, we're starting [developer testing](/docs/privacy-sandbox/fledge/) for the
initial version of the Protected Audience API behind a flag in Chrome so developers can get their
hands on it.

Not every proposal will go through such an intense incubation period as the Protected Audience API
&ndash; some will move much more quickly &ndash; but there is a lot of
innovation happening. These are new ideas and it can take a lot of work to get
them right.

### Developers test and share feedback {: #testing}

Testing is critical because it surfaces issues or gaps that may require more
work. There will be many iterative cycles of discussion and testing. There are
a handful of proposals ready for developer testing today and more will be
available for review as we head into 2022.

Testing in Chrome usually starts with a feature behind a flag for developers to
test locally. This means developers need to turn it on in the browser to try it
out. This code is often very fresh, so you can expect to find issues.

We also run origin trials, each of which run for a limited time with a limited
population of Chrome users. Origin trials are public and open to all developers
&ndash; you just need to register to opt in your site or service. This is when
we get actionable feedback from developers on what works, what doesn't, and
where those gaps are.

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/vTqicAx2UauzkePJkM0A.png",
alt="", width="800", height="368" %}

Success at this stage depends both on developers doing hands-on testing and
being willing to share what they learn.

{% Aside %}
For example, Yahoo! JAPAN published a
[detailed analysis](https://github.com/WICG/conversion-measurement-api/issues/201)
of their test of the Attribution Reporting API. They highlighted areas for
improvement like the need for a better way to deliver conversion reports,
which has now been added to the API.
{% endAside %}

We also hope to see companies talking about their approach to testing and how
they expect to use an API. 

In the origin trial for the first version of [FLoC](https://github.com/WICG/floc)
&ndash; a proposal to support interest-based advertising and content &ndash;
we saw companies like CafeMedia publishing their
[analysis and insights](https://cafemedia.com/early-status-of-the-floc-origin-trials/)
so that others could review what they'd learned.

Chrome tests aren't the only way to explore how new technologies might work.
Some companies are also building simulations based on Privacy Sandbox concepts. 

{% Aside %}
Advertising platform Criteo recently
[ran a competition](https://medium.com/criteo-engineering/assessing-the-impacts-of-the-privacy-sandbox-piece-by-piece-1-bring-the-noise-624331e64a12)
with more than 150 teams testing different machine learning models to evaluate
how differential privacy concepts such as noise insertion and aggregation might
impact advertising performance. It's helpful to examine these concepts since
they underlie several of the Privacy Sandbox APIs.
{% endAside %}

We're truly appreciative of the companies investing their time to test these
new technologies, and being willing to share their perspectives and lessons
publicly.

### APIs launch for scaled adoption {: #scaled-adoption}

Once an API is tested and ready for general use in Chrome, we'll announce the
launch and make sure public documentation is ready for scaled ecosystem
adoption.

[User-Agent Client Hints](https://web.dev/user-agent-client-hints/) (UA-CH)
launched in Chrome earlier this year and is now ready to scale. It's part of
the Privacy Sandbox work stream to reduce covert tracking such as browser
fingerprinting.

Like cookies, the User-Agent (UA) string is an early web feature. By default,
it provides a lot of information about the user's browser and device, making
it a readily available surface for fingerprinting. It also has a format that
can be a headache to parse!

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/AVzbV9HF0T0bm3buFjV6.jpg",
alt="For example, 'User-Agent: Mozilla/5.0 (Linux; Android 10; Pixel 3)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/84.0.4076.0 Mobile Safari/537.36' is very long and offers specific details used for fingeprinting, such as the exact device model, platfoorm verrsin, and full Chrme version.",
width="800", height="464" %}

To get this information in the future, you'll need to transition to UA-CH.
The User-Agent string will give you some information by default, which may
cover most of your use cases, but more detailed information is available only
on request in a straightforward format. 

We were happy to make this ergonomic improvement for developers while moving
the majority of UA information from an "available by default" model to an "on
request" model. This way, you can request only the information you need. This
is a good privacy practice today, and the pattern we want to set for the
future.

{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ZsumGF9jzVb5yYL4QD3i.png",
alt="", width="800", height="338" %}

In April 2022, gradual UA string reduction will begin in Chrome. UA-CH launched
and was ready for scaled adoption starting in March of 2021—you can begin
testing and migrating to it now.
[Participate in an origin trial](/origintrials/#/view_trial/-7123568710593282047)
to opt-in to the reduced UA string so you can see what the future state looks
like.

If it turns out you need extra time to address your site needs, you'll be
able to opt-in to keep using the User Agent string as-is through March 2023.

## Wrap up and feedback  {: #wrap-up-feedback}

We'll continue to explain what's happening, provide as much forward visibility
as we can, encourage your involvement, and hear your input. Let us know on
[@ChromiumDev Twitter](https://twitter.com/ChromiumDev) if there's anything
that we could improve.

We've added a [Privacy Sandbox FAQ](/docs/privacy-sandbox/faq/), which we will
continue to expand based on the issues you submit to the
[developer support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
If you have any questions around testing or implementation on any of the
proposals, come talk to us there.

We appreciate all contributions to this complex and vitally important project.
As we seek to create durable web features with broad utility and robust privacy
protections for users, it's worth this effort to get the foundations right.

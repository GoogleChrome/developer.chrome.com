---
layout: 'layouts/doc-post.njk'
title: 'Privacy Sandbox video library'
subhead: >
  Find overviews, walkthroughs, and conceptual discussions in these Privacy Sandbox videos.
description: >
  Privacy Sandbox video library
date: 2023-06-26
authors:
  - nmichell
---

The following videos are talks and walkthroughs recorded at various events such as Google I/O, and at public Privacy Sandbox office hours. They provide overviews of the Privacy Sandbox APIs, along with some in-depth technical discussion. You can find upcoming office hours and events on the [events page](/docs/privacy-sandbox/events/).

{% Aside %}
Keep in mind that while the concepts discussed in these videos are still relevant, some technical details and code will have changed.

Refer to the linked documentation for the latest details.
{% endAside %}

## What is the Privacy Sandbox?

{% Columns %}
{% Column %}
{% YouTube
  id='NKz5oT6kXI4' 
%}
Refer to the documentation for the latest details: <a href="/docs/privacy-sandbox/overview/">What is the Privacy Sandbox?</a>

{% endColumn %}
{% Column %}
<strong>May 12, 2023. Run time: 23:43</strong>

Privacy Sandbox team members provide answers to common questions in this talk. After watching, you'll have a better understanding of the long-term vision, including similarities and differences between Chrome and Android implementations.
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
{% YouTube
  id='gm8O8-b2B8c' 
%}
Refer to the documentation for the latest details: <a href="/docs/privacy-sandbox/overview/">What is the Privacy Sandbox?</a>
{% endColumn %}
{% Column %}
<strong>May 10, 2023. Run time: 15:52</strong>

Chrome is on the path to phasing out third-party cookies. Updates to cookie functionality like CHIPS and First-Party Sets enable you to restrict cross-site cookies on your site in a more secure and private manner. Learn how they can help.
{% endColumn %}
{% endColumns %}

{% Details %}
{% DetailsSummary %}
### More Privacy Sandbox videos
{% endDetailsSummary %}
{% Columns %}
{% Column %}
{% YouTube
  id='VVgtGkRtVPU' 
%}
Refer to the documentation for the latest details: <a href="/docs/privacy-sandbox/overview/">What is the Privacy Sandbox?</a>
{% endColumn %}
{% Column %}
<strong>May 12, 2022. Run time: 16:16</strong>

<strong>Latest docs:</strong> [What is the Privacy sandbox?](/docs/privacy-sandbox/overview/)

At Google I/O 2022, [Rowan Merewood](/authors/rowan_m/) from the Chrome team spoke about the Privacy Sandbox, the pros and cons of third-party content, and how the Privacy Sandbox addresses these issues.
{% endColumn %}
{% endColumns %}


{% Columns %}
{% Column %}
{% YouTube
  id='7AQFDm7STmw' 
%}
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/topics/">Topics API</a>, 
<a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a>, 
<a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>
{% endColumn %}
{% Column %}
<strong>February 2023. Run time: 11:08</strong>

[Danny Rojas](/authors/darojas/) of the Products Partnerships team provides a high-level view of the Privacy Sandbox ads APIs. He briefly describes the [Topics API](/docs/privacy-sandbox/topics/), the [Protected Audience API](/docs/privacy-sandbox/fledge/) (formerly FLEDGE), and [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/), along with some common use cases.
{% endColumn %}
{% endColumns %}


{% Columns %}
{% Column %}
{% YouTube
  id='w-b-2i7Sk7c' 
%}
{% endColumn %}
{% Column %}
<strong>Mar 3, 2023. Run time: 11:58</strong>

In this video, [Jeremy Ney](/authors/jney/) explains the new technologies within the Privacy Sandbox that help websites preserve important user-facing functionality and combat fraud. 
{% endColumn %}
{% endColumns %}
{% endDetails %}

## Attribution reporting

{% Columns %}
{% Column %}
{% YouTube
  id='mYVi3yL-GNI' 
%}
Refer to the documentation for the latest details: <a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>
{% endColumn %}
{% Column %}
<strong>May 10, 2023. Run time: 19:51</strong>

Learn more about the Privacy Sandbox effort, with a deep dive into Attribution Reporting across Chrome and Android and discover how to get involved and start implementing solutions.
{% endColumn %}
{% endColumns %}

{% Details %}
{% DetailsSummary %}
### More Attribution Reporting videos
{% endDetailsSummary %}
{% Columns %}
{% Column %}
{% YouTube
  id='UGA74CIcom8' 
%}
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>
{% endColumn %}
{% Column %}
<strong> Aug 25, 2021. Run time: 6:15</strong> 

[Sam Dutton](/authors/samdutton/) of the Chrome team discusses the Attribution Reporting API at a high level. He covers the two types of reports in the API Event-level reports and Summary reports, what data is reported, and how.
{% endColumn %}
{% endColumns %}


{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/18RGEx_mrhDJuMsLUK1BZ0cK5FSZRAAqh/preview" allow="autoplay" width="336" height="187"></iframe>
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>

{% endColumn %}
{% Column %}
<strong>Aug. 11, 2022. Run time: 43:58. Part 1.</strong>

In the August 2022 Privacy Sandbox office hours, [Maud Nalpas](/authors/maudn/) of the Chrome team discusses the Attribution Reporting API. Maud presents a walkthrough of Summary reports and discusses how to generate aggregatable reports in the browser. Maud touched on noise, and how to set up and get summary reports. 
{% endColumn %}
{% endColumns %}


{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1hmHoM3xyU4eLTJ1dM7_E8x-u6nZgim1O/preview" width="336" height="187" allow="autoplay"></iframe>

Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/attribution-reporting/system-overview/">Attribution Reporting: full system overview</a>

{% endColumn %}
{% Column %}
<strong>Aug. 11, 2022. Run time: 29:34. Part 2.</strong>

In part 2 of the August 2022 Privacy Sandbox office hours, Robert Kubis discusses the server side of Attribution Reporting. He demonstrates how to collect aggregatable reports from the browser, grouping the reports to generate summary reports, generating debug reports, and how the Aggregation Service generates reports.
{% endColumn %}
{% endColumns %}


{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1EVCw6MTz3JIdkno2lICN6q7gNrmZBYGf/preview" width="336" height="187" allow="autoplay"></iframe>
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/attribution-reporting/">Attribution Reporting</a>

{% endColumn %}
{% Column %}
<strong>June 30, 2022. Run time: 23:29</strong>

The Chrome team presents a high-level overview of the Attribution Reporting API and why it's important with the coming deprecation of third-party cookies.
{% endColumn %}
{% endColumns %}
{% endDetails %}

## Protected Audience API

{% Columns %}
{% Column %}
{% YouTube
  id='HkvmYKqnytw' 
%}
Refer to the documentation for the latest details: <a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a>. 
{% endColumn %}
{% Column %}
<strong>Sep 8, 2021. Run time: 5:51</strong>

[Sam Dutton](/authors/samdutton/) of the Chrome team explains how the Protected Audience API (formerly FLEDGE) provides a solution for remarketing use cases, and how it's designed so it cannot be used by third parties to track user browsing behavior across sites.
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
{% YouTube
  id='znDD0gkdJyM' 
%}
Refer to the documentation for the latest details: <a href="/docs/privacy-sandbox/fledge/">Protected Audience API</a>. 

{% endColumn %}
{% Column %}
<strong>Mar 18, 2022. Run time: 6:15</strong>
The Protected Audience API (formerly FLEDGE) is a Privacy Sandbox API to serve remarketing and custom audience use cases, designed so it cannot be used by third parties to track user browsing behavior across sites.

[Sam Dutton](/authors/samdutton/) of the Chrome team provides a walkthrough of the demo available for the API.
{% endColumn %}
{% endColumns %}

## Topics API

{% Columns %}
{% Column %}
    
<iframe src="https://drive.google.com/file/d/1831_uKSlTwnSzYNjpp9pkDEniDA_Q9lF/preview?t=1m03s"  width="336" height="187" allow="autoplay"></iframe> 

Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/topics/">Topics API overview</a>

{% endColumn %}
{% Column %}
<strong>September 6, 2022. Run time: 14:31</strong><br>

Leeron Israel, the Topics API PM, presents a technical overview of the API, starting with high-level use cases and finishing with an overview of how the API works. He covers the Topics taxonomy, the definition of an observation, and other salient details.
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1dmpMKLJcGNe56M6ECRdRYhuITTv9YUDV/preview"  width="336" height="187" allow="autoplay"></iframe>
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/topics/">Topics API overview</a>

{% endColumn %}
{% Column %}
<strong>September 6, 2022. Run time: 21:01</strong>

[Sam Dutton](/authors/samdutton/) runs through the Topics API demo. Shows how to run Chrome from the command line using flags, how to check your Chrome config, how to do feature detection,and illustrates the features of the API.
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
{% YouTube
  id='hEBzWuXjeTQ' 
%}
Refer to <a href="https://topics-demo.glitch.me/">the demo</a> discussed in the video.
{% endColumn %}
{% Column %}
<strong>November 2022. Run time: 13:22</strong>

[Sam Dutton](/authors/samdutton/) from the Chrome team discusses the Topics taxonomy, walks through the Topics API demo, and shows the API in action. For the latest details and more in-depth information, refer to <a href="/docs/privacy-sandbox/topics/"> the Topics API</a>.
{% endColumn %}
{% endColumns %}

## First-party sets

{% Columns %}
{% Column %}
{% YouTube
  id='cNJ8mZ-J3F8' 
%}
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/first-party-sets/">First-party Sets</a>

{% endColumn %}
{% Column %}
<strong>Aug 11, 2021. Run time: 5:47</strong>

First-Party Sets is a proposal to allow related domain names owned and operated by the same entity to declare themselves as belonging to the same first party.
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1riGrGwP5cyz3q4IcDjV5kulOK48OJV2S/preview"  width="336" height="187" allow="autoplay"></iframe> 

Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/first-party-sets/">First-party Sets</a>

{% endColumn %}

{% Column %}
<strong>December 15, 2022. Run time: 26:48</strong>

In Privacy Sandbox office hours, [Helen Cho](/authors/helencho/) explains how the API works, [Rowan Merewood](/authors/rowan_m/) walks through the demo and how to test the API.
{% endColumn %}
{% endColumns %}

## Origin trials

{% Columns %}
{% Column %}
{% YouTube
  id='v_gI8wcsPUA' 
%}
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/unified-origin-trial/">Relevance and measurement unified origin trial</a>

{% endColumn %}
{% Column %}
<strong>Aug 17, 2022. Run time: 6:19</strong> 

Origin trials are a way to test a new or experimental web platform feature. A third-party origin trial makes it possible for providers of embedded content to try out a new feature across multiple sites.
{% endColumn %}
{% endColumns %}

## Private State Tokens

{% Columns %}
{% Column %}

{% YouTube
  id='bXB1Iwq6Eq4' 
%}
Refer to the documentation for the latest details:
<a href="/docs/privacy-sandbox/trust-tokens/">Private State Tokens</a>
{% endColumn %}
{% Column %}
<strong>Jul 28, 2021. Run time: 8:17</strong>

Private State Tokens (formerly Trust Tokens) is a new API to help combat fraud and distinguish bots from real humans, without passive tracking. 
In this video you'll learn why the web needs Private State Tokens, and how they work.
{% endColumn %}
{% endColumns %}

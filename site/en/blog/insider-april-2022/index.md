---
layout: 'layouts/blog-post.njk'

title: Introducing Chrome Dev Insider

description: >
  A new series by Chrome’s Web Platform team where we take developers behind the scenes to share perspectives, conversations and updates.

date: 2022-04-13

authors:
  - bgalbs

tags:
  - insider
 
hero: 'image/C8ys09lNbQOJLokQMhRtN2A0YU12/RPMWTGEBXQXVHozgFlIG.png'

thumbnail: 'image/kheDArv5csY6rvQUJDbWRscckLr1/Hfx3C2heobFhRJJejstK.png'

alt: >
  Chrome Dev Insider
---


Developers often tell us that it’s difficult to keep up with changes on the web and understand why these changes are happening. Today, we’re kicking off a new series called _Chrome Dev Insider_ where we’ll share (1) What’s cool and newsworthy, (2) An insight into how we made a decision on a key topic (for example [changing FLOC](https://blog.google/products/chrome/get-know-new-topics-api-privacy-sandbox/)) or approach our work with the ecosystem (for example [Interop 2022](https://web.dev/interop-2022/)), and (3) any really important things that you need to know about (for example [changes in user agent strings](https://web.dev/chrome-firefox-100/)).

As we share what we are working on, it will be in the context of our four priorities for 2022:



* **Enabling delightful user experiences:** make things intuitive for users; whether it’s performance, transactions, identity or transitions.
* **Advancing the web’s capabilities:** support the web's evolving role from being a content consumption platform, to the platform for a wide range of experiences including those that need deep OS and hardware level integrations. 
* **Simplifying web development:** make decision making easier and improve developer productivity.
* **Improving the privacy of the web:** serve web users' expectation for better data privacy protections in the face of ever-increasing developer sophistication in tracking and targeting. 


## In the news: Interop 2022

As we plan our roadmaps, we look at [developer feedback](https://insights.developer.mozilla.org/) to understand web developers’ top pain points and needs, amongst other things. A key theme that repeatedly shows up is _browser compatibility_, making an experience work the same across browsers. Over the past year, we’ve been working with the ecosystem to address this theme as part of our priority to "simplify web development". 

Last year, Microsoft, Chrome and ecosystem players announced  [Compat 2021](https://web.dev/compat2021/) that resulted in all popular browser engines (Chromium, Gecko and Webkit) achieving a 90+% score in the [five key focus areas](https://web.dev/compat2021-holiday-update/#css-flexbox) identified for the year. Among other things, Compat 2021 led to creating a solid foundation for powerful features such as [CSS Grid](https://wpt.fyi/compat2021?feature=css-grid) ([12% usage and steadily growing](https://chromestatus.com/metrics/feature/timeline/popularity/1693)) and [CSS Flexbox](https://wpt.fyi/compat2021?feature=css-flexbox) ([77% usage](https://chromestatus.com/metrics/feature/timeline/popularity/1692)).

And last month, Apple, Bocoup, Google, Igalia, Microsoft, and Mozilla came together as [supporters](https://github.com/web-platform-tests/interop-2022/blob/main/supporters.md) to solve the top browsers compatibility issues identified by web developers and agree on a common benchmark. The result is [Interop 2022](https://web.dev/interop-2022), a project with the goal of bringing more homogeneity to the platform. The benchmark focuses on [15 priority areas](https://web.dev/interop-2022/#the-15-areas-of-focus) identified by developers as key to improving their productivity.


## Insider scoop: Working with our browser peers

With Interop 2022 top of mind, I sat down with [Robert Nyman](https://twitter.com/robertnyman) and [Philip Jägenstedt](https://twitter.com/foolip) who have been involved in these conversations to get the inside story. Here’s the editor’s cut of how it came together. 

_What’s the genesis of this initiative?_

**Robert:** It all started back in 2019, when we did the [MDN DNA 2019](https://insights.developer.mozilla.org/reports/mdn-web-developer-needs-assessment-2019.html) survey. Compatibility issues clearly stood out as the main problem for developers building for the web, and we followed up in much more detail in the [MDN Browser Compatibility Report 2020](https://insights.developer.mozilla.org/reports/mdn-browser-compatibility-report-2020.html). This gave us enough information and actionable data to start the [Compat 2021 effort](https://web.dev/compat2021), which in turn led to both continuing that work and also expanding that scope with Interop 2022.

**Philip:** I’d also like to mention [web-platform-tests](https://web-platform-tests.org) and [State of CSS 2021](https://2021.stateofcss.com/). We’ve had a strong collaboration with other browser vendors on testing using WPT going back years, and we really wanted to lean into that. The tests for these features were mostly already written, so we just needed to review the tests and add some missing coverage. Google has invested a lot in wpt.fyi, but we also have Mozilla to thank for making WPT the success that it is today. Mozilla of course also had a big hand in the MDN DNA surveys. Beyond those, there’s also the State of CSS 2021. In order to put together an effort like Interop 2022, we need fresh input on web developer needs, so we worked with the survey maintainer Sacha to include some new questions about browser compatibility issues. That really helped us in the Interop 2022 planning process.

_Any learnings or feedback from Compat 2021?_

**Robert:** It was really useful to measure and have [scores and insight](https://wpt.fyi/compat2021?feature=summary) into how each browser engine was doing, so we could follow the progress and make sure to discuss and address issues that were unclear or needed to be prioritized. We also quickly realized that "Interop" was a better name for the initiative. The terms _compatibility_ and _interoperability_ are typically distinguished by browser vendors, where compat refers to site compat, and interop refers to two or more browsers behaving the same. In that terminology, this effort is about interoperability and so the project has aligned with that naming.

_What’s our vision here?_

**Robert:** To keep the web open, browser and rendering engine diversity is critical. Unfortunately, this currently comes at a high price for our developers who have to keep up with differing levels of support for features across each engine. Our vision is that developers see the web platform as the most viable option and most attractive choice for their needs, and that they can focus on building the best possible experiences instead of spending a lot of time working out interoperability issues. And it is very clear that to reach that goal, the most asked features need to land in all the major browser engines to truly enable developers to be successful on the web platform.

_How do we collectively move things forward when browsers with (sometimes) differing goals come together?_

**Philip:** Our approach has been to look for areas of shared interest, to find those win-win collaborations where goals are already roughly aligned. And by prioritizing a limited number of things to work on at the same time, we bring focus to those areas, and move forward faster and get higher quality than we would if we simply worked separately. That’s the idea.

I think it's important to recognize that there are limits to this consensus-based approach, where goals aren't sufficiently aligned we need to move forward in some other way. Sometimes bringing more evidence of web developer or user needs can help, but ultimately browser vendors can ship things that don't have broad agreement. In the best case, the value of the feature is then demonstrated by web developers trying the feature, finding that it solves their needs, and asking for the same feature in all browsers.

_Coming back to Interop 2022, do we see non-design or layout features coming into the pipeline at some point?_

**Philip:** Absolutely! Interop 2022 was not limited to styling and layout features, but it did end up leaning very heavily towards CSS. Partly because State of CSS 2021 was fresh, but also because web developers have told us that this is where they have the most trouble with differences between browsers. Multiple focus areas, like form and dialog elements, go beyond CSS, and we also have some [investigation efforts](https://web.dev/interop-2022/#investigation-efforts) around editing APIs and pointer and mouse events. I hope that for Interop 2023, we will have more fresh data on developer needs across the web, and include more such features in the effort.


## Key upcoming changes

One of the intents of this series is to give developers a heads up on upcoming key changes; things that are important for improving user experience and the platform's capabilities. 

The timelines mentioned below are when we expect these changes to happen. However, it is possible release versions for features may change.

### User-Agent reduction



The [User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) header—and its associated JS interfaces—transmits not only useful browser and device information, but also carries with it a legacy of lineage and inaccurate information. More problematic than the near endless supply of UA string parsing bugs is the fact that it's _passively_ sent to servers for all navigation and sub-resource requests. This represents approximately 10 bits of entropy that servers can use to build stable tracking identifiers as users navigate the web. 

Our current plan is to reduce the existing UA string by continuing to ship low-entropy browser major version, platform name, and _mobileness_, freezing the [high entropy info](https://www.chromium.org/updates/ua-reduction/#token-reference). For use cases that require additional information than contained in the header, we've been shipping the [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) API since Chrome 89.


We [ran an Origin Trial for 6 months](/blog/user-agent-reduction-origin-trial/) for experimentation and feedback and were happy to  have received no feedback related to breakage despite having more than 200 participants.
* **Timeline:** In Chrome 101, [we're moving forward](https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ/m/KyomPLOnAwAJ) with what we call Phase 4: reducing the `MINOR.BUILD.PATCH` information in the UA string to `0.0.0`. And we’ll continue to give sites a heads up and time to [prepare for phases 5 and beyond.](https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html#:~:text=the%20deprecation%20trial.-,Phase%205%3A%20Chrome%20107,-CTA%3A%20Ensure%20your) We've also [created enterprise policies](https://bugs.chromium.org/p/chromium/issues/detail?id=1261837) to opt out of these changes, and will be running a [deprecation trial until Chrome 113 to give sites more time](/blog/user-agent-reduction-deprecation-trial/) to be ready for these changes.
* **Call to action:** [Migrate your site to UA Client Hints](https://web.dev/migrate-to-ua-ch/) or [participate in the deprecation trial](/blog/user-agent-reduction-deprecation-trial/).

### Local Fonts Access API



Chrome is launching the Local Font Access API. Though sites have long been able to use local fonts, this API enumerates the list of local fonts and gives access to the font data itself. This functionality gives users the ability to use all of their fonts with web-based design and other applications. 

Local fonts have long been known as a fingerprinting vector. Though this new API doesn’t increase the ability to use fonts for fingerprinting, Chrome requires that a user grant a new `"local-fonts"` permission for a site before it can use the new Local Font Access API.


In the future, we plan to require that the same "local-fonts" permission be granted before using any other API that provides access to local fonts.
* **Timeline:** Targeting Chrome 103 (June'22)
* **Call to action:** [Learn more](https://web.dev/local-fonts/) about the API and [how to use](https://web.dev/local-fonts/#how-to-use-the-local-font-access-api) it to start implementing.

### Making BFCache work with `Cache-control: no-store`

We have identified a significant opportunity to improve how often the [Back/Forward cache](https://web.dev/bfcache/) can deliver instant back/forward navigations. This requires a change in how BFCache behaves on pages served with the [Cache-control: no-store HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control#:~:text=shared%20caches%20only.-,no%2Dstore,-The%20no%2Dstore). We have a public proposal designed to prevent significant surprises by monitoring various signals (for example evicting pages from the BFCache whenever an HTTP-only cookie changes), and carve-outs (for example group policy for Enterprise/Edu customers) for unique contexts. This is a complex but exciting opportunity, and we’d love additional scrutiny and feedback!
* **Timeline:** Targeting Chrome 104 (July'22), assuming no major surprises.
* **Call to action:** See [the proposal](https://docs.google.com/document/d/1qX1w6L6laTzpFTh78dvT7wwC1060Z3he2Azp4BAwsUE/edit) for further details, including how to enable a work-in-progress implementation, and ways to share feedback such as actual scenarios in which our approach would create new hurdles.


Through this series, I hope to be able to give our developer community a sense of focus and connection by bringing them closer to my team and their work. So stay tuned and watch this space for more updates.

Until then, happy webbing.

_What did you think of the first edition of The Chrome Dev Insider?_ [Share your feedback](https://forms.gle/Mdkz4JPccgYZQEBH9).

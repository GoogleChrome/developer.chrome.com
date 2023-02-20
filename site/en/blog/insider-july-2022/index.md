---
layout: 'layouts/blog-post.njk'

title: 'Chrome Dev Insider: The CSS and UI edition'

description: >
  An update from Chrome’s Web Platform team where we take developers behind the scenes to share perspectives, conversations and updates.

date: 2022-07-12

authors:
  - rachelandrew

tags:
  - insider
 
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/5pfwyFL3CsjaWdvjG7DM.png'

thumbnail: 'image/kheDArv5csY6rvQUJDbWRscckLr1/FEhZwqV3W5kVUciPDV29.png'

alt: >
  Chrome Dev Insider
---

Welcome to the second edition of Chrome Dev Insider where we share updates on what's new and exciting in the community and here at Chrome. This is a new episode of insider stories on how we approach our work, and a quick glance at some of the most important updates that you should pay attention to.

I'm Rachel Andrew, the Content Lead for [web.dev](https://web.dev) and [developer.chrome.com](/), as part of the Chrome Developer Relations team. I've been working on the web for over twenty years, with a focus on open web standards and CSS, and am a member of the CSS Working Group. 

Two months ago, we wrapped up [Google I/O](https://io.google/2022/products/web/) where we [shared](https://www.youtube.com/watch?v=qBkyU1TJKDg&t=1452s) some of the most important updates about how we're supporting developers in making the web faster and more powerful while keeping user information safe and private.

One of the things that stood out (and we're glad that the [community took notice](https://twitter.com/marvinhagemeist/status/1525798010587865088)!) is the huge amount of work the team is doing to support more [CSS and UI features](https://web.dev/state-of-css-2022/) on the web. In this edition of Chrome Dev Insider, we will take you behind the scenes on who's behind this work, how we work towards supporting CSS and UI developers and what lies ahead. That's why I'm thrilled to be hosting this edition of the Insider.

## In the news

In the first [Chrome Dev Insider](/blog/insider-april-2022/), we shared some updates on [Compat 2021](https://web.dev/compat2021/) and [Interop 2022](https://github.com/web-platform-tests/interop-2022/) initiatives where browser vendors and ecosystem players have been partnering to bring more features to the web that are supported across all browsers. The initiative has a strong focus on CSS because [browser incompatibility is one of the biggest challenges for CSS developers](https://2021.stateofcss.com/en-US/opinions/#css_pain_points_wins).

While this may not be news to most, it's exciting to see the progress we've already made across browsers.

{% Columns %}

{% Column %}
<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/jiqMtucYLQGaqC3KI7Sp.png", alt="Chrome Dev at 71, Firefox Nightly at 74, Safari TP at 73.", width="380", height="240" %}

<figcaption>Scores for experimental browsers in March 2022.</figcaption>
</figure>
{% endColumn %}

{% Column %}
<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/I33rbM3T4NA5rmac5kxo.png", alt="Chrome Dev at 77, Firefox Nightly at 80, Safari TP at 80.", width="380", height="240" %}

<figcaption>Scores from experimental browsers in July 2022. <a href="https://wpt.fyi/interop-2022">See the latest scores</a>.</figcaption>
</figure>
{% endColumn %}

{% endColumns %}

Earlier last month, we saw Safari [announce a bumper release](https://webkit.org/blog/12824/news-from-wwdc-webkit-features-in-safari-16-beta/) with Safari 16.0 Beta that includes exciting features like [Container Queries](https://developer.mozilla.org/docs/Web/CSS/CSS_Container_Queries), [subgrid](https://developer.mozilla.org/docs/Web/CSS/CSS_Grid_Layout/Subgrid), and a [flexbox inspector](https://webkit.org/blog/12824/news-from-wwdc-webkit-features-in-safari-16-beta/#flexbox-inspector). Recent releases of Firefox and Chrome have included a number of exciting features and fixes—I'm covering the key things in stable and beta browsers each month in my [new to the web platform](https://web.dev/tags/new-to-the-web/) series of posts.

## Insider scoop: Supporting CSS and UI developers

With 2022 turning out to be an exciting year for CSS features, we thought it a good time to take you behind the scenes. I sat down with [Una Kravets,](https://twitter.com/Una) DevRel lead for Web UI and Devtools and [Nicole Sullivan](https://twitter.com/stubbornella), our Product Manager for Web UI who focuses on CSS and HTML APIs, to talk about Chrome's journey to supporting UI developers. 

_Let's start with you both. Tell us a bit more about yourselves?_

**Nicole:** I'm the product manager for Web UI on Chrome. I focus specifically on new CSS and HTML APIs and on developers and designers who build UI. It's an exciting space with some really important APIs coming out like [Container Queries](https://web.dev/new-responsive/#responsive-to-the-container), [Scope](https://developer.mozilla.org/docs/Web/CSS/:scope), and (hopefully!) [vertical rhythm](https://developer.mozilla.org/docs/Learn/CSS/Styling_text/Styling_lists#handling_list_spacing).

**Una:** I lead the Web UI and DevTools DevRel teams. We focus on supporting UI engineers on the web platform and make sure they have the tools they need to be successful. This includes CSS APIs and HTML components along with DevTools features to see active changes and feedback.

_Chrome's support for UI developers has gathered pace in the last few years. Why do you think it took so long to get here? What were the biggest challenges?_

**Una:** We needed to do some work to demonstrate how important this work was, and why it should be a priority. We started with the [MDN DNA survey in 2019](https://insights.developer.mozilla.org/), which identified UI as some of the top pain points on the platform. And since then, we've continued to use data as our guide through the MDN and our own internal developer satisfaction surveys. The result of all this is we were able to get deeper leadership buy-in and were able to prioritize engineering work around some of the most highly requested developer features in the UI space that also form the majority of the focus for initiatives like [Compat 2021](https://web.dev/compat2021/) and [Interop 2022](https://github.com/web-platform-tests/interop-2022/).

**Nicole:** In addition to getting leadership buy-in, we had to also find the right way to get these APIs to developers. When I first joined Chrome, I messed this up in a project called [Layered APIs](https://github.com/drufball/layered-apis) (or LAPIs for short). LAPIs aimed to give developers a drop-in component experience. I still think this was a great outcome to shoot for, but we made a lot of mistakes! We focused first on [Toast Notifications](https://developer.android.com/guide/topics/ui/notifiers/toasts) and a [Virtual List](https://groups.google.com/a/chromium.org/g/blink-dev/c/5411pauM9e8/m/aX4K4wz6DgAJ). Toasts are nearly impossible to make accessible and a virtual list is one of the hardest components to get right. Our intentions were good but it wasn't helping developers, so we sunsetted the project. It's difficult to learn the hard way, but every mistake is fueling the renaissance for CSS and HTML that is happening now.

_Let's talk a bit more about LAPIs. What happened there?_

**Nicole:** For LAPIs, we knew the web needed a drop-in component developer experience that was closer to building native UI. And it was clear that reinventing the wheel was holding back developers. I can't count the number of tabs I've built in my career! That said, we tried to solve that by shipping JavaScript with the browser which was very hard. No one had shipped JavaScript in the browser before, and it wasn't clear how it should interact with the C++ code that powers the browser's rendering engine. We listened to other browser vendors (thank you, Mozilla!) and backed off from that approach and so we've been able to find something much better with [Open UI.](https://open-ui.org/) By leaning into HTML and CSS we end up with flexible, declarative solutions. Because it is declarative, we can bake-in accessibility in a way that wouldn't have been as easy to do with JavaScript. I'm really excited about where this is going. We're working on supporting selectmenu, popup, tooltip, nav, accordion, tabs, carousel, and toggle which are really essential UI design patterns.

_So we've learned a lot. And I know there were other initiatives in this space, such as [CSS Houdini](https://developer.mozilla.org/docs/Web/Guide/Houdini). What's the story?_

**Una:** Yeah CSS Houdini is another place where we've learned from the community. There are a ton of useful [Houdini features](https://developer.mozilla.org/docs/Web/Guide/Houdini#the_houdini_apis), but many were too low-level to gain wider adoption and support. We realized that implementing low-level APIs didn't necessarily reduce friction for developers. Instead, focusing on higher-level solutions and needs has helped garner cross-browser support and the landings necessary to move the needle in the ecosystem. We're currently tracking progress at [https://ishoudinireadyyet.com](https://ishoudinireadyyet.com)/.

_Speaking of cross-browser support, initiatives like Interop 2022 and Open UI seem to be delivering significant positive outcomes for the community. What are you hearing from developers?_

**Una:** One of the top pain points we hear from developers is "making design work the same across browsers." We've tackled this by working with other browser vendors to prioritize and land some of the top-requested developer features. And the feedback we've heard from the community has been overwhelmingly positive. Additionally, through a large re-architecture effort called [RenderingNG](/articles/renderingng/), it's become possible to land some of these features a lot more performantly. Developers are excited that these long-anticipated features they've been asking for years are finally being worked on and landing cross-browser.

**Nicole:** The excitement in the community is palpable. You can see it on [Twitter](https://twitter.com/stubbornella/status/1532420756683952128). :)

<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/mYFmIKp6hSEL99cd2ogv.png", alt="The tweet mentioned in the previous paragraph.", width="800", height="558" %}
</figure>

_Working with the ecosystem has proven to be critical to any success we've had in making developers' lives easier. I know that your team has been doing a lot of work there. Care to share some details?_

**Nicole:** First, I'm constantly in awe of the projects developers build on the web. From the tiniest library to full on frameworks, developers are building amazing things. It's a fantastic community of makers. And Chrome is taking a bunch of steps to be more connected to these projects. 

For instance, a few years ago we started working with JavaScript Frameworks such as React and Angular. And metaframeworks—for example Next, Nuxt, and Gatsby. Last year, we started to do the same with UI tools and frameworks such as Sass, Bootstrap, and Material. I hope this coming year we can collaborate with GreenSock and other tools that make developers' lives easier. I just saw Cassie Evans from GreenSock speak at Smashing Conference and it got me really excited about working with folks in the animation space.

_So where do we see the biggest opportunity for the Web UI ecosystem?_

**Una:** In terms of big opportunities, I feel like we're just scratching the surface of what's possible for customizable web experiences. New APIs such as [container queries](https://web.dev/new-responsive/#responsive-to-the-container) and the CSS [user preference media features](https://web.dev/user-preference-media-features-headers/) are redefining the way that developers view responsive design. I'm also excited about the collaborative design experiences that are enabling developers and designers to be able to work in unison with the users that visit their websites.

_And Nicole, what's next on the roadmap for your team?_

**Nicole:** Not all explorations turn into something shippable, but there are a lot of things I'm really excited about right now:

Una touched on the first thing, we're enabling responsive, component-based design. It includes tools for designing color systems so designers can respond to user preferences like dark mode. For example, [OKLCH](https://developer.mozilla.org/docs/Web/CSS/color_value/oklch) color space keeps brightness consistent across hues. Designers can move from choosing colors to designing relationships between colors, without ending up with muddy-looking palettes!

We're also working on some of the most requested APIs, like [container queries](https://web.dev/new-responsive/#responsive-to-the-container), [cascade layers](/blog/cascade-layers/), parent selector ([:has](https://developer.mozilla.org/docs/Web/CSS/:has)), [scoped styles](https://css-tricks.com/saving-the-day-with-scoped-css/), and [nesting](https://css-tricks.com/css-nesting-specificity-and-you/). Developers need these so they can build flexible design systems full of reusable components.

Scroll linked animations is another fun area. I really like Steve Gardner's [demo](https://codepen.io/ste-vg/pen/GRooLza). He has buttery smooth scrolling and cool airplane animations triggered on scroll. While these are fun, it can be tricky to get them right, especially with accessibility in mind. So we're running user testing for accessibility on the feature now.

The thing I'm personally most excited about is built-in web UI controls. Developers keep building the same tabset over and over again, I think the browser can help. Over at [Open UI](https://open-ui.org/), we're working on components like selectmenu, popup, tooltip, tabs, nav, accordion, and toggle. We are exploring what it would look like to bake accessibility into these browser primitives so the web could, over time, become accessible by default. Developers can then focus on the more complex and nuanced problems, while the basics such as how do tabs tab, can be supported by the browser. This probably needs its own post, so I'll stop there for now!  

Finally, we'll continue to invest in **interop** between browsers. It's been great working with folks at WebKit and Gecko to bring consistency to the developer experience. We heard developers loud and clear that they want this!

Oh, and if you haven't checked it out, the Seamless Web team's [Shared Element Transitions API](/blog/shared-element-transitions-for-spas/) is going to change the way folks design for the web. All those subtle little transitions that allow designers to orient their designs in physical space are going to be not just possible, but easy. Jake Archibald has a [great demo](https://www.youtube.com/watch?v=JCJUPJ_zDQ4&t=1s).

We might, if standards go well, even look at vertical rhythm this year! We're able to build on top of LayoutNG which unlocks so many features.

_Thanks both. I'm sure the whole community, like us, is excited to see the renewed pace of improvements and features coming to the Web UI world. There's still a lot to grok, so where would you say one should start their journey?_

**Una:** Our [What's new for the web platform](https://www.youtube.com/watch?v=5b4YcLB4DVI&t=38s) session at I/O covers the highlights of many of the features landing this year. Adam Argyle also wrote up a [great article](https://web.dev/state-of-css-2022/) on all the new and upcoming CSS landings. On an ongoing basis, I would focus on stable releases for now and just be aware of the other work coming down the pipeline. Your awesome [New to the web platform](https://web.dev/tags/new-to-the-web/) series is a great one to follow for that. Subscribing for the web.dev newsletter will also bring this content to developers' inbox. And for developers looking to get involved and help with all of this, [joining Open UI](https://open-ui.org/get-involved#getting-involved) is one of the best ways you can support this work.  

## Key upcoming updates

We're keeping up our tradition to give you a heads up on an upcoming change that you should keep in mind as you build your web experiences.

### Limit max-age for cookies to 400 days

-  **The update:** When cookies are set with an explicit `Expires/Max-Age` attribute the value will now be capped to no more than 400 days in the future. Previously, there was no limit and cookies could expire multiple millennia in the future. The goal of this limit is to strike a balance between common usage patterns and respect for user privacy. Any site visited more frequently than every 400 days can refresh cookies to ensure continuity of service and users can rest assured cookies won't linger in their browser for millennia without use.
-  **Estimated timeline:** Shipping in Chrome 104 (Stable on August 2, 2022).
-  **Developer CTA:** Developers may need to proactively refresh cookies more frequently than before when users visit their websites. Otherwise, users might be logged out 400 days after the cookie was initially set.

I hope you enjoyed reading this edition of the Chrome Dev Insider. If you missed it, here's the [first one](/blog/insider-april-2022/). We look forward to bringing you more in the next quarter.

Until then, tell us what you think about this edition of the Chrome Dev Insider and what we can do to make it better.

_What did you think of this edition of The Chrome Dev Insider?_ [Share your feedback](https://forms.gle/Mdkz4JPccgYZQEBH9).

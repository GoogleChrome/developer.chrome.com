---
layout: 'layouts/blog-post.njk'

title: 'Chrome Dev Insider: Scaling performance with the framework ecosystem'

description: >
  An update from Chrome’s Web Platform team where we take developers behind the scenes to share perspectives, conversations and updates.

date: 2022-10-05

authors:
  - paulkinlan

tags:
  - insider
 
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/5pfwyFL3CsjaWdvjG7DM.png'

thumbnail: 'image/kheDArv5csY6rvQUJDbWRscckLr1/FEhZwqV3W5kVUciPDV29.png'

alt: >
  Chrome Dev Insider
---

I'm [Paul Kinlan](https://twitter.com/Paul_Kinlan), and I lead developer relations for Chrome. As part of my job, I get to work with a team of passionate web advocates who are tasked to bring the perspective of real world developers to our product and engineering teams, with the north star metric to [improve developer satisfaction](https://paul.kinlan.me/thinking-about-developer-satisfaction-and-web-developers/).

We recognize that "satisfaction" is an ambitious and subjective metric to track and improve, so we constantly iterate on how we can make an impact while focusing on [developer needs](https://insights.developer.mozilla.org/). A guiding principle we've found useful to follow is—"[meet developers where they are](developer.chrome.com/blog/cds-22-update)". A recent Stack Overflow study showed that [75% of developers report using frameworks](https://survey.stackoverflow.co/2022/#section-most-popular-technologies-web-frameworks-and-technologies) or an abstraction of some kind. So we've been asking ourselves how we best serve developers who have already made decisions about, or have no control over, their tech stack? How do we make them more productive without adding more overhead?

A small team here at Chrome has been working on a project called [Aurora](/blog/introducing-aurora/), with the goal to work with third-party abstractions of the web platform such as frameworks and libraries. Their goal is to help bring performance gains directly into these abstractions, instead of making the burden fall on their customers—web developers.

For the third edition of the Chrome Dev Insider, I spoke with [Addy Osmani](https://twitter.com/addyosmani), [Kara Erickson](https://twitter.com/karaforthewin), and [Houssein Djirdeh](https://twitter.com/hdjirdeh) from the Project Aurora team to learn more about how they've been approaching this project and what lies ahead for them.

## Insider scoop: Working with third party frameworks 

_**Let's start with the genesis of this project. How did it come about?**_

**Addy:** Aurora started with a simple idea: let's meet developers where they are at and help them get to where they need to go. For example, help the popular tech stack they've chosen to improve performance. Many app developers are building using React, Vue or Angular these days--or meta-frameworks* like Next.js and Nuxt -- (and of course many others... Svelte, Lit, Preact, Astro. The list goes on!). Rather than expecting these developers to become deep-experts (for example, in performance), we could ensure they fall into a pit of success by baking in more best-practices by default into these stacks. That way, better quality sites are a side-effect of just building for the web.

Aurora chooses a few widely used frameworks and meta-frameworks to partner with, we document our learnings (such as how to build a good image component), so that others can fast-follow and try to scale via other frameworks and tools through the Chrome Frameworks Fund. While it's possible to improve the quality of web experiences via the browser, we believe that this goal can also (in some cases) be accomplished via frameworks too. We hope this helps us towards our goals of a higher quality web for all.

{% Aside %}
A meta-framework is an opinionated end-to-end system for controlling most aspects of building a web application. Rather than a developer needing to figure out how to solve common problems themselves, a meta-framework often either has a solution to such problems baked in or a well-lit path documented on how to approach it with lower friction.
{% endAside %}

**Kara:** To expand on that, the idea is to improve performance on the web by improving developer experience. It's not enough to publicize performance best practices, because they often change and it's hard for companies to keep up. They have their own business priorities that will likely come before performance.

So our thinking is if developers have limited time to devote to performance, let's make it easier (and quicker) for them to build a performant app. If we partner with popular web frameworks, we're at the right layer of abstraction to improve the developer experience through higher-level components, conformance warnings, etc. Anyone who uses those popular tools will have access to these benefits. And theoretically if the recommended advice changes, we can update our components under the hood and the developers don't have to worry about staying current.

**Houssein:** I joined Google as a Developer Advocate before switching to a software engineering role a few years later. Much of my prior work involved teaching web developers the many different ways to build great user experiences. Variations of the same guidance were provided, time and again, to warn developers of the common issues that will likely affect the performance and usability of their sites. When we began thinking about the Aurora project, we asked ourselves: can we head in a direction where we never have to tell developers what to do because their toolchain takes care of everything for them?

**If I understand correctly, you're a team of what, six engineers? I bet you can't work with every possible framework or library. So how do you pick who to work with? And who are they?**

**Addy:** The web is in many ways like the wild wild west. You can choose pretty much whatever framework, bundler, libraries, and third-parties you want. This introduces several layers of complexity that can contribute to good or poor performance. One of the best ways to move the needle on performance is to find those layers comfortable being opinionated and adding more opinions to them. 

For example, web frameworks (Next.js, Nuxt.js, and to an extent Angular) try to bake in more opinions and defaults than a more hand-rolled solution. This is one reason we love working with them! Having stronger defaults for how to load images, fonts and scripts for better Core Web Vitals makes sense in these models. 

It also serves as a nice way to confirm where modern best-practices work or may need a rethink and can help inform the whole ecosystem about how to approach solving optimization problems.

**Kara:**  Realistically, we also have to consider popularity. If we want to have the largest possible impact on the web, working with frameworks and libraries that have a large existing community of developers is ideal. We can reach more developers and more apps that way. But it can't be just popularity. Ultimately, it's an intersection of popularity, how opinionated a library is, and the available feature set we can work with. 

For example, if we look at popularity alone, React, Vue, and Angular are the "big three" to consider. But we work with Next.js, Nuxt, and Angular the most. This is because view libraries like React and Vue mostly focus on rendering, so it's impossible to build all the features we want into them directly. So we work more closely with opinionated meta-frameworks built on top of them: Next.js and Nuxt. At this level of abstraction, we can create built-in components. They also have built-in servers, so we can include server-side optimizations. 

You might notice that Angular was on that list of deep partnerships, but it's not a meta-framework. Angular is somewhat of a special case because it's quite popular, but doesn't have a complementary meta-framework the way React and Vue do. So we work with them directly and contribute features through their CLI where possible.

And it's worth noting that we have several ongoing relationships with other projects like Gatsby where we sync somewhat regularly on design but don't actively contribute code.

**So what does this look like in practice? What was your approach to solving this problem?**

**Kara:** In practice, we have a few frameworks that we collaborate with closely. We'll take some time to profile apps using that framework and figure out the common performance pain points. Then we work with the framework team to design experimental features to resolve those pain points and contribute code directly to the OSS repo to implement them.

It's really important to us to validate that the performance impact is what we predicted, so we also work with external companies to conduct performance testing in production. If the results are encouraging, we'll help the feature get to "stable", and potentially make it a default.

**All this can't be as easy as you're making it sound. What were some of the challenges or learnings that you've had so far?**

**Houssein:** One important thing we try to navigate to the best of our ability is contributing to popular open-source repositories that have many competing priorities. Just because we're a Google team doesn't necessarily mean that our features will get prioritized, so we try our best to align with the typical process of proposing and shipping new features without stepping on anyone's toes. We've been very fortunate to work with receptive maintainers in the Next.js, Nuxt, and Angular ecosystems. We're grateful that they have been open to listening to our concerns about the web ecosystem and willing to collaborate with us in more ways than one.   
  
With many of the frameworks that we work with, our overall mission is the same; how can developers get an improved user experience out of the box while also enjoying a great developer experience? We're aware and respect that there are hundreds, if not thousands, of community contributors and framework maintainers each working on different projects that intersect with each other. 

**Kara:** Additionally, because we care about validating performance impact and acting based on data, the process takes a bit more time. We're in uncharted territory, so sometimes we'll experiment with an optimization that doesn't pan out and we don't end up building a planned feature. Even when a feature does pan out, those few extra steps to vet performance take time and extend timelines.

Finding production partners to test our features can also be challenging. As previously mentioned, they are businesses and have their own priorities, so it can be challenging for them to fit in new initiatives if they don't align well with existing projects which have to come first. In addition, the companies  most interested in helping tend to be already taking the time to invest in performance, so they're not really our target audience. We're trying to collect feedback from the large swath of the community that *can't* invest in performance, but they're the least likely to reach out to us. 

**Moving on, what kind of optimizations have you been focusing on?**

**Houssein:** After analyzing thousands of applications, we found that the biggest performance issues are usually due to anti-patterns in the application code rather than the framework itself. For example, shipping unnecessarily large images, loading custom fonts too late, fetching too many third-party requests that block the main thread, and not handling how asynchronous content can cause other things to shift on the page. These are all issues that can arise regardless of what tool you use, so we thought—can we bake in some default optimizations that handle them well but with a neat developer experience that fits nicely in their framework tooling?

With this thinking, we've shipped:

-  [Next.js image component](https://nextjs.org/docs/basic-features/image-optimization).
-  [Next.js script component](https://nextjs.org/docs/basic-features/script).
-  [Automatic font inlining](https://nextjs.org/docs/basic-features/font-optimization) in Next.js' build process.
-  [Angular image directive](https://angular.io/guide/image-directive#getting-started-with-ngoptimizedimage).
-  [Next.js conformance ESLint plugin](https://nextjs.org/docs/basic-features/eslint) to provide actionable guidance to developers.

Our work has inspired other frameworks and tools to implement similar optimizations. This includes, but is not limited to:

-  [Nuxt image module](https://image.nuxtjs.org/)
-  [Nuxt font metric overrides](https://github.com/danielroe/nuxt-font-metrics)
-  Nuxt script component ([in progress](https://github.com/nuxt/framework/discussions/5856))
-  [Gatsby Script component](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-script/)

**Can you share some positive outcomes of your work with some of these players?**

**Houssein:**  Many sites have seen performance improvements due to the optimizations we've shipped. One of my favorite examples is [Leboncoin](https://www.leboncoin.fr/), who [reduced their LCP](https://medium.com/leboncoin-engineering-blog/how-we-are-improving-our-web-performance-9f850d59d810) from 2.4s to 1.7s after they switched to the Next.js image component. There are many more currently in experimentation and testing phases and we'll continue to share learnings and wins from those [here](http://developer.chrome.com/tags/aurora-project/). 

**Ok, I get that your focus is on those that have the most popularity, but are there ways that other frameworks or libraries who you aren't working with proactively also benefit?**

**Addy:** Many of the performance optimizations Aurora collaborates on can be replicated by any framework. Take a look behind our Image or Script component efforts for example, they often codify an existing set of best practices. We try to [document](/tags/aurora-project/) the "how" of building such components and what they look like in each framework. Hopefully this is a good start for copying the idea.

We've seen some good success with taking the learnings from one ecosystem (for example, React and Next.js) and bring them to others. For example, the new [Angular Image Directive](/blog/angular-image-directive/) (built on our learnings building the Next.js Image Component) or [Gatsby shipping our approach to granular JavaScript chunking.](https://github.com/gatsbyjs/gatsby/pull/22253)

At the same time, we understand that not every framework will have the bandwidth or funding for contributors to build out similar performance features or invest in other optimizations they believe are important for their users. The [Chrome Web Frameworks Fund](https://opencollective.com/chrome) is a way for us to sponsor performance work in the JavaScript ecosystem to enable projects to pay their contributors and enable performance work to scale further in the ecosystem.

**So what's on the roadmap ahead for your team?**

**Kara:** We have a lot of exciting projects coming up! Some highlights:

- **Reducing font-related CLS:** It's fairly common to see layout shifts when a web font is loaded and replaces the fallback font. We're exploring using font metric overrides and the "size-adjust" property to reduce font-related CLS by default in Next.js. We've also been consulting with the Nuxt team on this and plan to extend this idea to more frameworks next year.
- **Debugging INP:** Now that the [Interaction to Next Paint (INP)](https://web.dev/inp/) metric has been released, we're working with frameworks to investigate the most common root causes of INP issues for their communities and suggest fixes. We've been partnering closely with Angular on this and hope to have some results to share soon!
-  **Optimizing common 3P scripts:** Loading third-party scripts at the wrong time can have a substantial negative impact on performance. Since there are a few 3Ps that are very common, we are looking into whether we can offer some wrappers for these to ensure they are loaded optimally with frameworks and don't block the main thread. We are using the Next.js script component we built as a starting point for this investigation.

Developers can follow our progress on [this site](/tags/aurora-project/).

## In the news

Before I sign off, I wanted to leave you with a couple of interesting updates from the world of frameworks happening within Google.

In July, the Chrome team announced the latest round of funding of $500K for the [Frameworks and tools fund](/blog/framework-fund-2022/) that focuses on funding projects that aim to help improve the performance, user-experience and developer-experience on the web. Future funding will consider new projects so remember to [submit your request](https://forms.gle/BbshCNVaDFK7NJoU6).

And, of course, there's also a TON of amazing things happening in the community. The ecosystem is ripe with new frameworks like Deno's [Fresh](https://fresh.deno.dev/), and awesome experiences like Svelte's [onboarding tutorial](https://learn.svelte.dev/tutorial/welcome-to-svelte) that is not only an in-browser demo but also uses the Web Container API to run Node.js natively in the browser. So much good stuff!

I get genuinely excited seeing the ecosystem coming together, pushing what's possible in the browser and helping developers build products that work for everyone. It's an exciting time to be a web developer.

Until the next Insider, Hwyl fawr. 

_What did you think of this edition of The Chrome Dev Insider? [Share your feedback](https://docs.google.com/forms/d/e/1FAIpQLSeyAnJV9rVb4PdaHD8Q2lHLnPQO2UOv7fYAX6hnetXSnF6wEg/viewform)._

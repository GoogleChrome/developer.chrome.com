---
layout: 'layouts/blog-post.njk'
title: Seamless navigation made possible with view transitions
description: >
    An in-depth walkthrough of how and why CyberAgent, RedBus, Nykaa, and PolicyBazaar implemented view transitions.
hero: image/kheDArv5csY6rvQUJDbWRscckLr1/n1NuTA2jvVGsNzbJdNDv.png
thumbnail: image/kheDArv5csY6rvQUJDbWRscckLr1/I0szC9KECv6eSWbggsnh.png
alt: ''
authors:
  - yurikoh
  - saurabhrajpal
date: 2023-09-28
---

Transitions have numerous benefits for users, including helping to keep them in context and reduce the perception of latency. Developers want the ability to create seamless transitions between pages, helping to increase user engagement with their site.

However, enabling [state transitions was really hard](/docs/web-platform/view-transitions/#why-do-we-need-this-feature) as it required developers to manage states of two different elements. Even something like a simple cross-fade involves both states being present at the same time. That presents usability challenges, such as handling additional interaction on the outgoing element. For users of assistive devices, there's a period where both the before and after state are in the DOM at the same time. In addition, things may move around the tree in a way that's fine visually, but can easily cause reading position and focus to be lost.

Launched in Chrome 111, the [View Transitions API](https://developer.mozilla.org/docs/Web/API/View_Transitions_API) enables the creation of smooth and simple transitions between pages. It allows you to make your DOM change without any overlap between states, and to have a transition animation between the states using snapshotted views.

You might wonder, how easy is it to implement? What kind of use cases are there? How are other developers using view transitions?

This article takes you through the implementation of view transitions in 4 different websites: [RedBus](#redbus) (travel), [CyberAgent](#cyberagent) (news/blog publisher), [Nykaa](#nykaa) (eCommerce), and [PolicyBazaar](#policybazaar) (insurance) and how their websites benefited in different ways by using the View Transitions API.

## redBus {: #redbus }

redBus, part of MakeMyTrip group, is a bus booking and ticketing website headquartered in Bangalore, India with presence across different geographies globally. It was one of the first websites to implement an experience using the View Transitions API.

### Why did Redbus implement view transitions?

The team at redBus are firm believers in providing a unified, app-like web experience, one that is as close as possible to their native apps. In fact, they had implemented multiple customized solutions over the years. For example, they rolled out customized JavaScript and CSS based animations for the page transitions even before the View Transitions API was developed. However, that meant they had to deal with performance management in lower segments of network and devices, occasionally leading to differential experience with an [adaptive loading](https://web.dev/articles/adaptive-loading-cds-2019) strategy in place.

redBus used view transitions for multiple user journeys. For example, in their self-help section within their mobile app which opened web pages in Custom Chrome Tabs, and in their bus ticket booking funnel where users go from inventory listing page to payments page. In the latter case, view transitions made page to page navigation smoother and resulted in an increase to their conversion rate. This was a result of a better user experience and better [perceived performance](https://developer.mozilla.org/docs/Learn/Performance/Perceived_performance) while the heavy operations—such as fetching the most updated available inventory—were executed.

{% Video src="video/jL3OLOhcWUQDnR4XjewLBx4e3PC3/unuLWSZrl0daxIzor6KU.mp4", width="554", height="1210", autoplay="true", controls="false", playsinline="true", loop="true" %}

### Technical details of implementation

redBus uses React and [EJS](https://ejs.co/) as their frontend tech stack, with a combination of SPAs and MPAs across different journeys. The following code excerpt shows how view transitions are used:

```js
/* Forward Transition */
export const goToURL = ( url: string , reactHistory: any ): void => {
  if(document.startViewTransition) {
    let viewTransition = document.startViewTransition();
    viewTransition.ready.finally(() => {
      reactHistory ? reactHistory.push(url) : (window.location.href = url);
    })
  } else {
    reactHistory ? reactHistory.push(url) : (window.location.href = url);
  }
};

/* Back Transition */
export const goBack = ( reactHistory: any ): void => {
  if(document.startViewTransition) {
    document.documentElement.classList.add('back-transition');
    let viewTransition = document.startViewTransition();
    viewTransition.ready.finally(() => {
      reactHistory ? reactHistory.goBack() : history.back();
    })
    viewTransition.finished.finally(() => {
      document.documentElement.classList.remove('back-transition');
    })
  } else {
    reactHistory ? reactHistory.goBack() : history.back();
  }
};
```

In the following CSS, `slide-to-right`, `slide-to-left`, `slide-from-right`, and `slide-from-left` are css animation keyframes.

```css
::view-transition-old(root) {
  animation: 300ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
  300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}
::view-transition-new(root) {
  animation: 700ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
  700ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}
.back-transition::view-transition-old(root) {
  animation: 300ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
  300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-right;
}
.back-transition::view-transition-new(root) {
  animation: 700ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
  700ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-left;
}
```

## Business impact

redBus chose to implement view transitions along with INP improvement efforts across their site, which led to [7% more sales](https://web.dev/articles/redbus-inp). [Amit Kumar](https://amitkumar-v.medium.com/), Senior Engineering Manager at redBus, said that view transitions are really awesome for those who genuinely want better user experience and desire less maintenance overhead.

<blockquote><p>We have conducted comprehensive user feedback sessions, incorporating valuable insights from a diverse group of users. Our deep understanding of our user base (bus and rail) and their needs, combined with our expertise, has led us to believe that this feature will provide significant value right from the start, without the need for A/B testing. View transitions are a step towards bridging the gap between app and web  with a smooth navigation experience.</p>

<cite>Anoop Menon, CTO redBus</cite>
</blockquote>

## CyberAgent {: #cyberagent }

CyberAgent is a Japan-based IT company that provides many online services, including blog and news publishing.

### Why did CyberAgent implement view transitions?

CyberAgent had considered using CSS animations or using a framework to implement animated transitions to improve user experience in the past, but they were concerned with the poor performance in rendering DOM and code maintainability. When Chrome added support for the View transitions API, they were excited to use it to create engaging page transitions that overcame these challenges.

CyberAgent implemented view transitions between the blog list and the blog page. Here, notice how they added the element transition to the hero image. You can [visit their site](https://about.ameba.jp/ameyoko/) and experience it live today.

<div style="width:400px;margin: 0 auto;">

{% Video src="video/kheDArv5csY6rvQUJDbWRscckLr1/dtTlLXCs6iQFHqStt9Is.mp4", controls="true", playsinline="true", width="400", height="866" %}

</div>

They also used media queries to design different animation experiences for different devices. For mobile pages they included element transitions, but this effect had too much movement for desktop.

```css
@media screen and (min-width: 769px) {
  .main-visual {
    view-transition-name: none !important;
  }
}
```

{% Video src="video/kheDArv5csY6rvQUJDbWRscckLr1/KUmW2vQJyUeJ4bc0wtg1.mp4", controls="true", playsinline="true", width="800", height="421" %}

### Technical details of implementation

CyberAgent uses [Next.js](http://Next.js) to build their SPA. The following code example demonstrates how they use the View Transition API.

```js
export const usePageTransition = () => {
  const router = useRouter();
  const defferedRef = useRef<Deferred | null>(null);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      defferedRef.current?.resolve();
    };

    const handleRouteChangeStart = (url: string) => {
      if (!("startViewTransition" in document)) return;
      if (router.asPath === url) return;

      const deffered = new Deferred();
      defferedRef.current = deffered;
      (document as Document).startViewTransition(async () => {
        await deffered.promise;
      });
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.asPath]);
};
```

View some more [sample Next.js code](https://github.com/noamr/use-view-transitions#nextjs).

### View Transitions for MPA with prerendering technology

CyberAgent also tried out our new [View Transitions API for Multiple Page Apps (MPA)](https://github.com/WICG/view-transitions/blob/main/cross-doc-explainer.md) (currently under the flag `chrome://flags/#view-transition-on-navigation`) on a service called [Ameba News](https://news.ameba.jp/), which is a news portal site.

View transitions were used in two places: The first is when changing the categories of the news, shown in the following video.

<div style="width:400px;margin: 0 auto;">

{% Video src="video/kheDArv5csY6rvQUJDbWRscckLr1/lBWtlrPjLUNnlJRhUj6j.mp4", controls="true", playsinline="true", width="614", height="1328" %}

</div>

The second is between the news highlight page, where an excerpt of the content is shown, and when the user clicks to **See more details**, the rest of the article is faded in.

The interesting point is that they only added animation to the part that will change after the button is clicked. This little tweak of the animation design makes the MPA page appear more like an SPA from the user point of view, with only the new content animating in:

<div style="width:400px;margin: 0 auto;">

{% Video src="video/kheDArv5csY6rvQUJDbWRscckLr1/iBcOunsEk64gxMtXJSbW.mp4", controls="true", playsinline="true", width="614", height="1328" %}

</div>

Here's how they did this: they assigned a different `view-transition-name` to the different parts of the page. For example, they assigned one `view-transition-name` to the top part of the article, another for the bottom part, and added no animation to the top part.

```css
::view-transition-old(root) {
  animation:
    var(--animation-disappear-duration) var(--animation-disappear-easing) both fade-out;
  }

::view-transition-new(root) {
  animation:
    var(--animation-appear-in-duration) var(--animation-appear-in-easing) both fade-in;
}
```

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/9jxJ9TC2lF6OhOqS2JQ6.png", alt="A diagram showing how the top part of the page does not animated, while the bottom part transitions.", width="800", height="450" %}

Another interesting thing about CyberAgent's use of the view transitions API is that they used [quicklink](https://github.com/GoogleChromeLabs/quicklink#quicklinkprerenderurls) to easily implement [prerendering rules](/blog/prerender-pages/#the-speculation-rules-api) on the details page. Here's their sample code:

```js
import { prerender } from ‘https://.../quicklink.mjs’;

window.addEventListener('load', () => {
  const match = location.pathname.match(/\\/(.+)\\/hl\\/([0-9a-z-_]+)/);
  if (!match) return;
    const [_, dirname, entryId] = match;
    prerender(`/${dirname}/${entryId}/`);
  });
```

You can read more about their quicklink implementation from [this article](https://developers.cyberagent.co.jp/blog/archives/37264/).

### Testimonial

Kazunari Hara, the Tech Lead of the Ameba service in CyberAgent, said that the view transitions could have significant impact on the business for two reasons.

Firstly, they guide users on the page. View transitions make it possible to visually focus users on the most important message, and helps them get the most out of the web page. Also,  they enhance and emphasize the brand with animation. CyberAgent has a [designated animation design](https://spindle.ameba.design/styles/animation/) to communicate their brand. With view transitions they are able to implement this branded experience without adding the cost of maintaining external libraries.

<blockquote><p>View Transitions is one of my favorite APIs. The ability to add animations as a standard browser feature makes view transitions easier to implement and maintain compared to other solutions dependent on libraries. We are looking forward to implementing view transitions to more services to communicate our brand.</p>
<cite>Kazunari Hara, CTO of Ameba</cite>
</blockquote>

## Nykaa {: #nykaa }

Nykaa is India's largest fashion and beauty eCommerce platform. They aim to make their mobile web experience as close as possible to their native app experience. When previously attempting to implement transition animations, they struggled with writing complex custom JavaScript. This also impacted their website's performance marginally.

### Why did Nykaa implement view transitions?

With the arrival of view transitions, Nykaa's team saw an opportunity where these transitions being natively available meant the UX of page transitions could be significantly improved with no cost to performance. Nykaa is heavily using view transitions to transition from the product detail page to the product listing page.

<div style="width:400px;margin: 0 auto;">

{% Video src="video/kheDArv5csY6rvQUJDbWRscckLr1/qFrexqTRjmKDRohEATEh.mp4", controls="true", playsinline="true", width="672", height="1478" %}

</div>

### Technical details of implementation

Nykaa used React and [Emotion](https://emotion.sh/docs/introduction) to build their SPA. More sample code on how to use View Transitions with React can be found [here](/docs/web-platform/view-transitions/#working-with-frameworks).

```js
if (document.startViewTransition) {
      document.startViewTransition(() => {
        history.push(productUrl);
      });
    } else {
      history.push(productUrl);
   }

const fadeIn = keyframes`
  from { opacity: 0; }
`;

const fadeOut = keyframes`
  to { opacity: 0; }
`;

const slideFromRight = keyframes`
  from { transform: translateX(300px); }
`;

const slideToLeft = keyframes`
  to { transform: translateX(-300px); }
`;

const slideToRight = keyframes`
  to { transform: translateX(300px); }
`;

const slideFromLeft = keyframes`
  from { transform: translateX(-300px); }
`
```

CSS for side drawer animation:

```css
::view-transition-old(root) {
  animation: 300ms cubic-bezier(0.4, 0, 1, 1) both ${fadeOut},
  1000ms cubic-bezier(0.4, 0, 0.2, 1) both ${slideToLeft};
}

::view-transition-new(root) {
  animation: 400ms cubic-bezier(0, 0, 0.2, 1) 300ms both ${fadeIn},
  1000ms cubic-bezier(0.4, 0, 0.2, 1) both ${slideFromRight};
}

.back-transition {
  display: inherit;
}

.back-transition::view-transition-old(root) {
  animation-name: fade-out, ${slideToRight};
}

.back-transition::view-transition-new(root) {
  animation-name: fade-in, ${slideFromLeft};
}
```

### Testimonial

[Sunit Jindal](https://github.com/sunitJindal), the head of apps at Nykaa, said that the biggest benefit of the view transition was the "Perception of speed". Nykaa used the [shimmer effects](https://www.geeksforgeeks.org/shimmer-effect-using-css/) to wait for the contents to load from the backend, but found that showing the shimmer effect did not provide the users with how long they would need to wait for the content to load.
With view transitions, the transition itself provided  users the sense that "something is about to happen", which made the wait less painful.

Nykaa was very excited with the newly enhanced UX of their web page with view transitions, and is ready to implement view transitions on additional pages as well. Here's what their VP of Design  said:

<blockquote><p>We are softly-committed to implement view transitions in all the upcoming features where it makes sense. Some areas have already been identified and the team is actively investing in those.</p>

<cite>Krishna R V, VP of Design</cite>
</blockquote>

## PolicyBazaar {: #policybazaar }

Headquartered in Gurgaon, PolicyBazaar is India's largest insurance aggregator and multinational financial technology company.

### Why did PolicyBazaar implement view transitions?

Being a web-first company, PolicyBazaar team has always aimed at providing the best possible user experience across their critical user journeys. It was common practice to implement custom transitions using JavaScript and CSS even prior to the launch of the View Transitions API, as they enhanced the user experience, created a seamless navigation flow, and improved the overall visual appeal of their websites.

However, these custom implementations came at a cost of occasional performance-based delays, code maintenance complexities and suboptimal compatibility with the frameworks used. The View Transitions API helped them overcome most of these challenges by providing an easy-to-use interface with performance benefits available natively.

PolicyBazaar used view transitions across different elements in their pre-quote journeys to make it exciting for the potential buyers to provide their required details for purchasing insurance policies.

{% Columns %}

{% Column %}

{% Video src="video/jL3OLOhcWUQDnR4XjewLBx4e3PC3/rV1Py5xQVXTXj1Ng24ZU.mp4", width="420", height="534", autoplay="true", playsinline="true", controls="false", loop="true" %}

{% endColumn %}

{% Column %}

{% Video src="video/jL3OLOhcWUQDnR4XjewLBx4e3PC3/QO0R5HwJ8A3Do5hR7CCZ.mp4", width="600", height="976", loop="true", playsinline="true", controls="false", autoplay="true" %}

{% endColumn %}

{% endColumns %}

### Technical details of implementation

They use a hybrid framework approach with Angular and React dominating most of their codebase. Here's the VT excerpt from their code written in Angular and shared by Aman Soni (PolicyBazaar's Lead Frontend Developer):

```js
toggleWidgetAnimation() {
    let doc:any = document;

    if (!doc.startViewTransition) {
      this.toggleWidget();
      return;
    }

    doc.startViewTransition(() => this.toggleWidget());
  }

  toggleWidget() {
    let badgeEle = document.querySelector('.animate_init_state_one');
    let textEle = document.querySelector('.animate_init_state_two');

    badgeEle.classList.toggle('hide');
    textEle.classList.toggle('hide');
  }
```

### Testimonial

Rishabh Mehrotra, their head of Design (Life BU), said that view transitions played a significant role in enhancing the website experience for their users by improving usability, engagement, and overall satisfaction. It helped in providing smooth navigation, guided interaction, reduced cognitive load, modern aesthetics and much more.

<blockquote><p>Elevating the web experience stands as a paramount objective for PB, and VT has proven to be an instrumental tool in achieving this with remarkable seamlessness. Its widespread appeal among both our developer community and user base has imbued our team with a sense of enthusiasm. As we contemplate its integration across diverse PODs, we anticipate a far-reaching positive impact on satisfaction levels and operational excellence.</p>

<cite>Saurabh Tiwari (CTO, PolicyBazaar)</cite>
</blockquote>

## Next steps

Are you interested in trying out view transitions? Here's are some resources you can follow up to learn more:

-  [developer.chrome.com documentation for view transitions](/docs/web-platform/view-transitions/)
-  [View transitions for MPA explainer](https://github.com/WICG/view-transitions/blob/main/cross-doc-explainer.md)
-  [Interop proposals to make view transitions available across browsers](https://github.com/web-platform-tests/interop/issues/437)


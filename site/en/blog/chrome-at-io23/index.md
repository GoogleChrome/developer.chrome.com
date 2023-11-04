---
title: 10 updates at Google I/O
description: >
 Learn how we're making it easier for developers to deliver powerful experiences to their users through key updates and new launches that we shared at Google I/O 2023.
subhead: >
 Towards a more powerful and helpful web.
layout: 'layouts/blog-post.njk'
date: 2023-05-10
authors:
  - paulkinlan
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/QvRcPd8CPZeqMWR72wNY.svg'
alt: >
 A Google propeller hat.
tags:
 - webgpu
 - passkeys
---

We're wrapping things up on this year's Google I/O, with more than 100 new APIs, components, and tools discussed on the keynote stage, and in Chrome's on-demand sessions. Here are ten updates that we're particularly excited about, and please do send us your favorites (and your questions) at [@ChromiumDev](https://twitter.com/chromiumdev)!

## 1. WebGPU advances AI and machine learning in the browser 

This newly-available API [unlocks the power of GPU hardware](/blog/webgpu-io2023/), and makes the web truly AI-ready. In fact, ML libraries like Tensorflow.js run 100 times faster on WebGPU than regular JavaScript, and WebGPU runs 3 times faster than WebGL (the previous gold standard for web graphics). The fact that WebGPU runs on the device (rather than in the cloud) also helps developers to save money, decrease latency, and build new privacy-preserving AI features.

## 2. WebAssembly brings Android apps to the web 

For developers looking to make their code investments go further, [WebAssembly's support for managed-memory languages](https://developers.googleblog.com/2023/05/bringing-kotlin-to-web.html) like Kotlin and Dart unlocks a huge opportunity to reuse their existing codebase and reach users not only through their native apps but also on the web. Thanks to some early work by JetBrains, Android developers building with Kotlin can now write their app features once, then use WebAssembly to deploy it to the web.

## 3. Baseline brings more clarity and predictability to the web 

Working in the W3C WebDX community group, we're establishing [Baseline](http://web.dev/introducing-baseline/) as the core set of features that are fully supported by the current and previous versions of all major browsers—Chrome, Edge, Firefox and Safari. By partnering with key players like MDN and caniuse.com, we will bring this common language and label directly into your workflow. And every year, we'll introduce Baseline 23, 24, 25…which will be a "cut" of everything that's new, and compatible across all browsers. Like an annual release, for the entire web ecosystem. Follow along [here](http://web.dev/baseline).

## 4. Chrome Extensions developers get more support 

Extensions play a significant role in helping you deliver a more personalized experience to your web users while also reaching new ones. We want to set developers investing in [Chrome Extensions up for success](https://io.google/2023/program/ef3f10de-8e4f-43f4-9a04-82d03bbebe06/). So along with recently extending the Manifest V3 roll out timeline, we are improving the Chrome Web Store UI, [updating extension documentation](/docs/extensions/whatsnew/) and samples, and adding new engagement surfaces in the Chrome side panel.

## 5. Interaction to Next Paint becomes a Core Web Vital next year 

After extensive experimentation and continuous feedback from the community on the current set of Core Web Vitals, we announced our intent to replace [First Input Delay](http://web.dev/fid) with [Interaction to Next Paint or INP](http://web.dev/inp-cwv/), a metric that measures responsiveness more holistically. This change will take effect in March 2024 so we can give you enough time to get familiar with and [optimize for INP](http://web.dev/how-to-optimize-inp/). 

## 6. Passkeys bring the future of authentication to the web

For web apps that rely on logged in experiences, now is the time to upgrade from passwords and two-factor authentication to [passkeys](https://io.google/2023/program/0c9e010f-617a-426a-a4fb-bd1d19c91358/). Built on industry standards, the technology is a significantly safer replacement for passwords and other phishable authentication factors, and creates a seamless login and authentication experience for your users. It's great to see early adopters like [Shopify](https://www.shopify.com/blog/ecommerce-payment-authentication) already finding significant impact by integrating [this passwordless solution](https://goo.gle/passkeys).

## 7. New privacy-preserving technologies with Privacy Sandbox

Working with the ecosystem on the [Privacy Sandbox](https://privacysandbox.com/) initiative, we have collectively made great progress in removing tracking vectors on the web. And we're now shipping new cookie functionality with CHIPS and First-Party Sets, allowing developers to prepare as we get closer to the [end of third-party cookies in Chrome](https://io.google/2023/program/591e2982-cc90-4558-bb9a-eb0322bac0a2/).

## 8. More Web UI features to improve user and developer experience

What's truly raising the bar for quality web apps is the [progress we've made in web UI](https://io.google/2023/program/0ac6834a-9ed1-4145-ad6e-2b23c02239b8/) features over the past year. These include new responsive UI features, customizable components with accessible defaults and browser-managed state, and some really exciting updates in animation and interactions APIs. There's so much goodness in the web UI world and we can't wait to see what you build with these.  

## 9. Chrome DevTools improves debugging of framework code

We're improving how you can [debug your web apps in Chrome DevTools](https://io.google/2023/program/58079bc3-b0bd-44e1-94ff-08589997014a/) in collaboration with various JavaScript frameworks. You'll find [cleaner stack traces](/articles/x-google-ignore-list/), a new ["show your code"](/blog/devtools-modern-web-debugging/#authored-versus-deployed-code) option, and more [breakpoint reliability](/blog/breakpoint-ux-redesign/). Our goal is to help you focus on the code you write and not the code that shows up because of your stack choices. Our work doesn't stop here and we're continuing to find ways to bring our tools deeper into your workflows and really focus on reducing development friction on the web, so [watch this space](/blog/devtools-modern-web-debugging/).

## 10. 100s of API updates at this year's I/O

There are 100s of APIs highlighted at I/O this year—from better storage and architectural solutions, to powerful UI features, plus improved support for peripherals, from MIDI keyboards to drawing tablets, in the browser. Catch them all through the on [demand content released on our YouTube channel](https://goo.gle/IO23_web).

We want to celebrate the fact that everyone's invited to the web; and that we're making the platform better together. Can't wait to see what you build with this new, more helpful and powerful web.

See you at the next Google I/O!

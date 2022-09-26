---
title: "How Chrome prepares updates for billions of users"
description: >
  "A conversation with Technical Program Managers on the Chrome release team, learning how they ensure each release goes smoothly."
layout: 'layouts/blog-post.njk'
date: 2022-09-26
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/hlWZ6vcwjIBjagdnkVUS.jpeg'
alt: >
  People working at screens pointing to Chrome logos and a calendar.
authors:
  - noraoneill
---

Every month, we release a new version of Chrome to make sure our billions of global users and businesses get the freshest features, security updates and performance upgrades. And now, we're able to make improvements and fix issues quicker than ever before with a faster release cycle—meaning you'll get the latest updates even more often.

We chatted with Technical Program Managers Ben Henry, Krishna Govind, Harry Souders, Srinivas Sista, and Brandon Heenan on the Chrome release team for an inside look at how they coordinate with Google teams across the world to ensure each release goes smoothly. 

**Q. How does your team prepare for each Chrome release?**

**Ben:** First off, our team consists of seven people working full time across two major geographies. We think preparing for a release is like a train schedule. We use four [release channels](https://www.youtube.com/watch?v=WL1guL5n9PU&t=3s)–Canary, Dev, Beta, and Stable–to prepare for a Chrome milestone release. As we move through the process, each channel has more Chrome users. This allows us to obtain feedback about Chrome's stability and performance with the goal of uncovering quality issues in the product as early as possible. We pay close attention to what users and developers are saying across social media, press articles, and bug reports to help catch anything we're missing. Our team of engineers and product managers can then use this feedback to make feature improvements. 

Then, we do several rounds of testing to detect any quality issues, first using automated systems that run continuously, and then with testing teams who find bugs manually.

**Q. Can you share a recent example of feedback from an outside developer that was valuable in ensuring you shipped the best possible version?**

**Srinivas:** We always rely on our web developers for feedback and early adoption of features, such as new APIs, or spec changes with Chrome on iOS. With our major milestone change from two digits to three digits (99 to 100), we shared guidelines with web developers to test things out ahead of the actual change to ensure we incorporated their feedback and more importantly, didn't break their sites. This helped us successfully roll out the change without any major issues for M100 roll out. 

**Q. What happens if you catch a bug or security issue during the roll out of a Chrome update?**

**Krishna:** We make sure to gradually roll out new Chrome releases to users. New releases aren't immediately pushed to 100% of users. If we find a critical bug, we halt the roll out of the affected versions to limit its effects. We then coordinate with Chrome teams around the world to develop a fix and patch Chrome as quickly and safely as possible. Once this fix has been verified, we build a new version of Chrome and start the roll out process again. At the end of the day, most users will never experience the issue because it will have been fixed before the release ever rolled out to them. For security issues, we follow the [Project Zero Disclosure](https://googleprojectzero.blogspot.com/2021/04/policy-and-disclosure-2021-edition.html) policy. So when there are vulnerabilities being actively exploited in the wild, we have a goal of releasing that fix to our stable channel users within seven days.

**Q. Is there additional work that goes into making sure Chrome releases are ready for businesses?**

**Brandon:** One of our top goals is ensuring that Chrome remains a stable, reliable platform for the many businesses that depend on us. That means giving businesses access to the best and latest functionality that they want their people to take advantage of, while helping them avoid any potential disruptions to their work. Because the needs of business are unique and any downtime can hurt an enterprise, Chrome has specific guidance for our engineering and product teams, and we review each feature launch to ensure that every Chrome release is "enterprise-friendly." That includes giving companies a heads up to important changes in our [Chrome Enterprise Release Notes](https://support.google.com/chrome/a/answer/7679408). And for added peace of mind, IT admins can control many changes with an [enterprise policy](https://chromeenterprise.google/policies/). So, if they prefer to do internal testing, or opt out of a new feature, they can do just that. To prevent unexpected issues, we have a dedicated testing infrastructure designed to simulate enterprise environments (for example, running Chrome on Active Directory domain-joined devices) that we use to test all Chrome releases.

Chrome also provides a range of update controls to schools and businesses. Admins can control Chrome's specific version, rollback to older versions, and take advantage of our fully-supported _extended stable_ release channel. You can read about the details in [this technical document](https://support.google.com/chrome/a/answer/9982578). Admins that want full visibility into the update status of their fleet can use the [Version Report](https://www.youtube.com/watch?v=Fcp0i8V8SWc) included in [Chrome Browser Cloud Management](https://g.co/chromecloudmanagement). 

**Q. Are there any changes your team is looking to make in the future?**

**Harry:** We're always looking for ways to improve Chrome for our users and developers, especially when it comes to shortening the release cycle. By doing so, users will see a more stable Chrome with faster bug fixes and new features. We also know that our engineers and product managers benefit from increased development velocity due to faster feature development, faster iteration cycles, and increased code health. Let's say a product manager wants to launch a feature to all Chrome users. It can take up to 16 weeks from when the feature is "done" to when it's generally available. By shortening the release cycle by just a couple of weeks, we can significantly reduce the lead time to launch a new feature.


  
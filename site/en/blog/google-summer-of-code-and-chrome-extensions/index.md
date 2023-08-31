---
layout: 'layouts/blog-post.njk'
title: Google Summer of Code and Chrome Extensions
description: >
  Experience and advice on participating in Google Summer of Code.
date: 2023-08-29
authors:
  - xuezhoudai

hero: 'image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/8ZNtuWAIcc7NBdS3AQEv.jpg'
alt: >
  Google Summer of Code and Chrome Extensions

sharing_image: 'image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/8ZNtuWAIcc7NBdS3AQEv.jpg'
---

I'm a sophomore from China passionate about web development. In my first year, I joined a technical club at our college. This club was my introduction to coding and open source. In the club, I met a group of like-minded partners who love coding. And it was from them that I learned about Google Summer of Code at the beginning of 2023. This Google-organized global program connects students with open-source organizations and guides them in making good use of their summer by participating in open-source activities.

Giving it a try, I submitted my application. Fortunately, I was accepted. The summer I spent contributing to the Chrome Extension Samples repo has been memorable and precious. Of course, I've also learned a lot: effective communication, coding skills, and planning abilities, among other things.

As GSoC 2023 is drawing to a close, it's worth sharing some of my experiences in GSoC. This post will briefly introduce the general process of GSoC through my own participation, hoping to be helpful to you!

## The story of how I contributed to GSoC

I applied for the Chromium GSoC 2023 Project, where my main task would be upgrading existing Chrome extension samples to work in Manifest V3, including some related scripts and documents.

### At the Very Beginning

I first learned of GSoC in February 2023 but was not yet sure I wanted to apply. I had a few concerns back then:

* I'm introverted, and English is not my native language, so communication with mentors might be challenging.
* GSoC communities come from all over the world, and dealing with time zone differences could be difficult.
* GSoC is such a renowned program that it can be competitive, making my chances seem slim.

However, I can confidently say none of these were an issue.

Before I tell my story, I'd like to talk about something that happened to me at the beginning of 2022. This incident was also an opportunity for me to participate in GSoC. I had wanted to migrate a browser extension based on Manifest V2 to Manifest V3. To complete the migration, I had to refer to the documentation and understand every API change. I also had to search for whether there were relevant samples for reference. Comprehending the new API and transferring the code is quite challenging for me.

That's why I was highly excited when browsing the GSoC project list and catching the idea related to MV3. I was eager to contribute to improving the Manifest V3 extension samples and provide an amenity for future developers.

In March, I emailed Oliver, one of the mentors in charge, a brief email about my intention:

{% Details 'open' %}
{% DetailsSummary %}
The application to participate in the GSoC project
{% endDetailsSummary %}

Hi,

I am a CS undergraduate student from China. I learned about the Chrome Extensions Samples related project at GSoC and I was interested in improving the Manifest V3 Samples. I don't have much prior experience in working on API Samples, however, I have experience in web development and MV3 extension development (https://github.com/daidr/paimon-webext), which has made me realize the importance of MV3 api samples, so I would like both to learn and to contribute to it. Can I still apply for this project?

Thanks.

{% endDetails %}

Not long after, I received a reply from Oliver and Ali (Oliver's boss). They answered my questions and provided detailed information about the specific rules and timeline of GSoC. They also shared many valuable reference materials with me.

It was like a shot in the arm, strengthening my determination to move forward. Taking the first step is paramount if you are interested in participating in upcoming open-source events, whether GSoC 2024 or anything else; never hesitate and bravely try it.

Before applying, I checked the project's code and skimmed the documentation. Although GSoC provides a community bonding period of nearly one month for participants to familiarize themselves with the community, prior knowledge alleviated pressure and allowed me to write a more targeted proposal.

I tried solving starter bugs provided by the project. These issues were relatively simple and helped me quickly understand the project. I'm grateful for my mentor Oliver (although he wasn't my mentor then). He promptly replied to my emails whenever I needed clarification and patiently resolved my problems. When encountering issues while writing a proposal, you can also send it to your mentor to see if any areas need improvement.

### Getting accepted

Writing a proposal is the last thing to do before applying. The proposal should include ideas, goals, and a schedule in addition to the application form. Depending on the
project you're hoping to work on, you may be provided with an additional template for the proposal. Many ready-made proposal examples are available online for reference.

After completing the draft, I sent it to my mentor for feedback. Once the application is submitted, there's a long wait. And in early May, I received a notification that I was accepted.

### Code Work

During the initial bonding period, I first dealt with the remaining starter bugs and checked if there were any new skills I had to learn. And I spend the rest of the time reading documentation.

After a discussion with my mentor, we adjusted some goals to make the time allocated to tasks more reasonable. We also discussed an idea for creating a new developer.chrome.com page listing all API samples and providing basic filters to help developers locate the needed samples quickly. It was a rather complex task for me, and it took my mentor and me quite some time to define the project and write a [product requirements doc](https://en.wikipedia.org/wiki/Product_requirements_document) (PRD).

For this larger task, we decided that we needed an automated script in the samples repo to traverse the repository and generate a JSON file containing a list of extension samples and the APIs they use. The developer.chrome.com documentation repo now uses this file to build a page.

I first considered using Babel to analyze the sample code's [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and identify the APIs it used. After sharing this idea with my mentor, I discovered they had previously worked on something similar, confirming this approach's feasibility. After I completed the code, my mentor and other members of his team provided valuable suggestions including paying attention to code segmentation, standardizing code style, and documenting functions properly.

After several big and small reviews, the code was successfully merged. You can find the whole thread on [GitHub](https://github.com/GoogleChrome/developer.chrome.com/pull/7029), or [view the live page](/docs/extensions/samples).

## Wrapping Up

If you ask me what GSoC has brought me: first of all, of course, is understanding the knowledge related to browser extension APIs. By reading the documentation and writing new samples, I gained a detailed understanding of various browser extension APIs.

Additionally, I have acquired many skills I had little exposure to before being accepted for GSoC, such as following a comprehensive code review process and creating a PRD. I've also started using GitHub actions to automate workflows and learned how to use Babel to traverse all extension samples and track the APIs used. Moreover, I had my first experience with the Nunjucks template engine. These abilities are essential for programming, and I am delighted that I learned them. Participating in open-source communities brings me joy.

This summer has given me many indelible memories. Coding makes me highly content. I have encountered patient mentors who guided me and taught me interesting knowledge, enriching my experience.

The knowledge in the field of computer science is endless. When I compared myself with others, I realized my understanding of open source was only the tip of the iceberg. However, every little bit helps. I believe GSoC is a great starting point for participating in open source.

I also hope my experience can provide some reference for future participation in open-source activities.

Here are some of my suggestions for anyone wanting to participate in Google Summer of Code:

1. Choose an idea that suits you: In my opinion, when looking for ideas, interest should be your priority, followed by skills. This strategy will allow you to maintain enthusiasm throughout the contribution process.
2. Quality over quantity: You can submit many proposals to increase the chances of being accepted for GSoC. However, I believe that quality is probably more critical because human energy is limited. Focusing on two or three ideas may be more helpful in the end.
3. Don't be afraid of new things: Don't hesitate to try technologies you haven't worked with in a project. You have nearly a month of community bonding to familiarize yourself with unfamiliar technologies and a whole summer to implement them. Just go for it!
4. Get acquainted with the project in advance: For example, read through development documentation, look at previous commit history and issues, and skim through past pull requests. Getting an overall understanding of the project in advance will help you write a more comprehensive proposal.
5. Maintain communication: Regularly communicate with your mentor, and don't hesitate to ask questions when confronting problems, whether before applying or after being accepted. Most mentors are willing to help you solve problems; this way, they can also keep track of your progress.

Thank you for reading.

---
layout: 'layouts/blog-post.njk'

title: 'Chrome Dev Insider: The year that was'

description: >
  An update from Chrome’s Web Platform team where we take developers behind the scenes to share perspectives, conversations and updates.

date: 2022-12-15

authors:
  - paulkinlan

tags:
  - insider
 
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/8d0zCSMHxpgkFZTmXCGk.jpg'

thumbnail: 'image/kheDArv5csY6rvQUJDbWRscckLr1/kn68o6p4dsShB0tAI3Jc.png'

alt: >
  Chrome Dev Insider
---

We started the [Chrome Dev Insider](/insider/) series this year to bring you closer to the Chrome team, sharing what we are working on and how we approach our decisions. As we march towards the end of 2022, I thought it would be a good time to reflect on the past year.

I couldn't think of a better person to talk about this than [Parisa Tabriz](https://twitter.com/laparisa), our VP of Engineering and Product. Parisa took the reins of our work on both the browser and the open web platform, earlier this year. I hope you enjoy this interview as much as I did.

_**Let's start with your self-appointed "Security Princess" tag. What's the story?**_  

**Parisa:** I actually started my career in cybersecurity because a web application I built in college got hacked and defaced by spammers, and I was curious about what happened. (What happened was SQL injection since I hadn't sanitized untrusted input!) I joined a security-focused student club to learn more and ended up getting more experience with practical hacking and system security, while also meeting fellow students that became close friends. 

I joined Google back in 2007 as a "hired hacker" to apply some of my security experience on software products like Search, Gmail, and Youtube. I adopted the self-appointed "Security Princess" title and put it on a business card before going to an industry conference in Tokyo, Japan, and it stuck!

In 2012, I joined the Chrome team to lead and manage their security team, and I got to work on efforts like [driving HTTPS adoption and Site Isolation](https://www.blog.google/perspectives/parisa-tabriz/optimistic-dissatisfaction-status-quo-security/). I now manage all of Chrome Browser and [Project Zero](https://googleprojectzero.blogspot.com/), a security research team.

Keeping people safe as they use technology continues to feel like a really useful and important thing to do, and I'm grateful I get to work with the world's best at Google and in Chrome. Today, cybersecurity is a much more mainstream topic, both in the consumer and enterprise space. Also, some of the hackers I knew in college are now CSOs and leaders in national cybersecurity initiatives, which is pretty wild.

_**Love it. The web really has evolved a ton and a lot of fundamental qualities like safety and performance have become mainstream, which is awesome! Where do you see the web going in the next ten years?**_

**Parisa:** I grew up alongside the web with the expectation that you interacted with a browser by typing URLs on a keyboard and clicking things with a physical mouse. The future of computing and browsers will be powered by more natural interactions and across multiple personal and shared devices and new form factors—like TVs, smart screens, wearables, cars, and more. We're already seeing this play out with the increase of web content in mobile apps, with the emergence of more devices connected to the Internet in the home and public spaces, and with people engaging with computers via more natural language inputs, like voice and touch.

I also like to imagine how the browser can better adapt to every individual's unique needs, preferences, and context. We're making some strides here, thanks to more [usable profile management in Chrome](https://blog.google/products/chrome/create-space-yourself-chrome/) and [advances in machine learning](https://blog.google/products/chrome/building-a-more-helpful-browser-with-machine-learning/), but there's still lots of opportunity to help people seamlessly get things done on the web, both personalized and private, no matter what connected device they're using.

Figuring all this out will require close collaboration with designers, researchers, engineers, product managers, policymakers, users, developers, and more. I'm excited to work on this for the next decade to see what we can build for the world and the web.

_**Talking about developers, how do you see your team's role in 2023 and beyond, particularly for developers and the web ecosystem?**_

**Parisa:** As someone that got into tech via web development over 20 years ago, it's amazing to see how the platform has advanced and what the web enables today. The web has always been a great community of passionate developers and creators, so I'm excited to see how deeply our platform teams continue to connect with and support the developer community. 

I talked about the opportunity to deliver personalized and private experiences to users and Chrome; a user agent should provide developers with the platform and tools to achieve that. Developers from around the world have been building Chrome Extensions that make browsing easier, more productive, and more personalized, and I continue to be amazed at what our extension developer community creates. We're committed to continually working with and listening to developers to improve our extension platform and ecosystem, so users and enterprises can install extensions with confidence. We're currently working on a major migration to [Manifest v3](/docs/extensions/mv3/intro/), which increases the security, privacy, and performance of extensions, and represents one of the most significant shifts in the extensions platform since it launched a decade ago.

In the open web, we've continued to be strong believers and active participants in the web standards process to push the capabilities of what is possible with the platform, while enabling interoperability across browsers so developers only have to build once, and users can be free to use whatever browser (user-agent) they prefer.

_**I'm very excited about projects like Compat, Interop and Project Aurora that are having a great impact on developer productivity. Ok, let's end on a high. What were the biggest highlights of 2022 for you?**_

**Parisa:** Yes! For me, projects like [Interop](https://wpt.fyi/interop-2022) are critical in making the web the easiest platform to build on. Our partnerships with ecosystem players like Igalia and other major browser vendors have been the most meaningful in the past couple years, and I'm very excited about the direction we're all collectively taking to reduce development friction for web developers. 

I'm also particularly excited about us by improving the browser's capabilities across speed, safety and stability. From improving [Chrome's speed](https://blog.chromium.org/search/label/the%20fast%20and%20the%20curious), to working with the community on solutions like [FedCM](/en/docs/privacy-sandbox/fedcm/) and [Passkeys](https://blog.google/technology/safety-security/one-step-closer-to-a-passwordless-future/) for better, safer identity management, there's so much great stuff happening all around and our hope is that we enable developers to achieve more by doing less.

Finally, I'm amazed at the pace of innovation happening in computing generally, and am particularly excited about Chrome using [on-device machine learning](https://blog.google/products/chrome/building-a-more-helpful-browser-with-machine-learning) in new ways to create a smarter, more adaptive browsing experience that keeps users safer, translates web pages instantly, and finds information more quickly, and what we can enable for developers by bringing [GPU Compute to the web](https://web.dev/gpu-compute/).

Our focus in 2022 was to **make the web work better for everyone**. And for me, it's going to be our mission for the years to come.

Wow, that was energizing. I hope you are all equally energized about the future of the web. And to keep that going, we've put together the key highlights of 2022 in the following video.

{% YouTube id='W9O4CuSUKb8' %}

I'll continue bringing more such updates and stories from this side of the Chrome world in future Insider posts in 2023. Until then, I wish you all happy holidays and a wonderful start to the new year!

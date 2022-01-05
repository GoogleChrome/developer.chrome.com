---
layout: 'layouts/blog-post.njk'
title: Helping developers build powerful, installable web apps
description: A look at the impact of PWA features added to Chrome.
date: 2021-11-23
authors:
  - mustafa
tags:
  - progressive-web-apps
hero: "image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/q06rpg5CArTnyaFAkXTH.jpg"
alt: "New install surface for progressive web apps."
---


## Introduction {: #introduction }

At the beginning of 2020, the Chrome team across mobile and desktop
laid out a plan to improve the discoverability and engagement of
installed web apps. Our work led to a greater than 100% increase in
PWA installation and engagement. We achieved this by researching
existing features, running A/B test experiments and user interviews
to gain insight into users perceptions and expectations. This article
covers how we got there. 
 
## Unified install language {: #unified }

The call-to-action that triggers a PWA install was inconsistent across
the web platform. For Chrome on Android, we had settled on **Add to
home screen**, but on our Desktop Platforms, we
emphasized **Install**. The rationale for this discrepancy came from
a study the team ran in 2016 that compared different strings. The
team found that **Add to home screen** worked better, if only
marginally, on mobile. 

A further study on taxonomy in 2019 found no difference, and so the
team wanting to unify the PWA install experience, decided to update
the label to **Install** on Android. A further study in 2021 compared
the language, **Install**, **Get**, and **Download**, and we found
that users understood **Install** as the process that was happening.
Users felt tapping a button with the label **Get** would send the user
to a website, and with **Download** they assumed a file would end up
in their downloads folder or equivalent. 

With all this in mind, we concluded that the label **Install** best
fits PWAs. We recommend developers across the web platform adopt
Install as the preferred string going forward. 


## Install icon on desktop {: #installicon } 

On our desktop platforms, we have a design pattern that whenever a website 
loads a PWA, Chrome will show a pill that appears on the right-hand side of the
omnibox that contains an icon and the label **Install**. After
that, when a user visits a site, only the icon will be present.
Clicking on this pill triggers the installation of a desktop
PWA. 



<figure>
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/RCE9R8Shyh2bMPBZLSJO.png", alt="Original install plus icon.", width="660", height="228" %}
<figcaption>
Original install plus icon.
</figcaption>
</figure>

The icon was initially a plus symbol, partly due to the **Add to home
screen** metaphor used on mobile. However, as mentioned, the language
we used was **Install**. The feedback we received from the developer
community was that this icon was confusing. Furthermore, if a user
used the zoom function to enlarge text, the icon for zoom looked very
similar, confusing the user even more. 



<figure>
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/zliw3izVFXwgQcpxBS8n.png", alt="Omnibox bug with zoom and install icons present.", width="660", height="205" %}
<figcaption>
Omnibox bug with zoom and install icons present.
</figcaption>
</figure>

I decided to investigate our user's perception, as most feedback was
anecdotal. Working with our UX researchers, we ran a study with
10,000 users in the USA and Indonesia to determine users'
understanding of install iconography. We tested five different
designs, including the existing one, and asked users what "Install"
meant. We discovered that the current icon, the plus symbol, was the
most confusing to our users. Many confused the symbol
with "medicine", "first aid" and "batteries". 

We also found that users primarily associated imagery such as arrows
and devices with the install. Based on these conclusions, we ran an
A/B/C test in Chrome, comparing the existing design with two
alternatives. We landed on the arrow pointing down into a monitor,
which performed significantly better than the other two. We also saw
a decrease in dismissals of the install UI with this new icon. 



<figure>
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/Wb3UqwvqaNGxVJ1ztp9X.png", alt="Install icon variants from the Material Design icon set.", width="588", height="240" %}
<figcaption>
Variants of our install iconography that you can download from our 
Material Design icon set.
</figcaption>
</figure>

The outcome is the design you see today, which has seen the install
rate for PWAs more than double for websites. We have also added this
icon and a mobile equivalent to our [Material Design icon set](https://fonts.google.com/icons?selected=Material+Icons+Outlined:assignment_returned&icon.query=install+),
enabling the community to use the iconography that we found most
engaging. 

Of course, a single icon will not change the world, which leads us to
our next feature.

## In-product help  {: #iph } 

In-Product Help is a blue bubble tooltip that onboards users on new
features that may interest them based on specific criteria. We
decided to launch this design pattern to inform users about the
install features and further support the new icon redesign.  



<figure>
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/jsUweHcawGwgwcZKH5by.jpg", alt="The in-product help bubble.", width="547", height="250" %}
<figcaption>
In-product help tooltip bubble that educates users about features.
</figcaption>
</figure>

When a user visits a website regularly, Chrome uses a service known
as [Site Engagement](https://www.chromium.org/developers/design-documents/site-engagement).
This provides information about how engaged a user is with a site. By
visiting `chrome://site-engagement/`, you can see the sites that you
are engaging with regularly. Using these scores, we could determine
if a user is interested in a website. If the site was a PWA and the
user was engaged we would show them the install In-Product Help UI.
This meant that we only focused on engaged users and not annoy users
who may visit a site one time. 

By using in-product help on desktop, we saw a greater than 100%
increase in PWA installation, showing that focusing on engaged users
improved the installability of web apps. 

## Richer Install UI {: #richer }

The install paradigm for most users is a store.
Since the mid-2000's we have educated users that whenever they are
installing an app, they will see a description, screenshots, and
other metadata to help them decide if an app is something they
want. 

With PWAs, the UI we showed once a user had decided to install a web
app was relatively meager. So the team decided to explore a richer
install experience that would give context to our users about the web
app and enable developers to celebrate the PWA's that were on par
with native experiences. 



<figure>
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/8kGMXy7tkoZMKr4y0qEY.jpg", alt="Richer install UI.", width="800", height="776" %}
<figcaption>
Richer Install UI, collapsed and expanded states.
</figcaption>
</figure>

Earlier this year, we launched [Richer Install](/blog/richer-pwa-installation/), 
an extended install UI on Chrome on Android that allows developers to
add screenshots to their manifest. Developers can also add a
description, which is recommended but not necessary. Due to this
newer UI, we saw an install rate for some PWAs double, showing that
users have greater confidence in installing web apps when we give
more context and richer experiences.. The desktop version of this UI
is currently a work in progress. 

## Conclusion {: #conclusion }

The team has spent the last two years exploring and
experimenting with newer features in Chrome that have enabled and
empowered PWA developers and helped to educate users about the
benefits of web experiences. There is still plenty of work we can
do, but collectively we can improve and enrich our users' lives
and further support the open web. 
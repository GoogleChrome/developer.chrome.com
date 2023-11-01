---
layout: 'layouts/blog-post.njk'
title: Enhancements to the Topics API
description: >
  Updates to top topics selection.
subhead: >
  Updates to top topics selection.
date: 2023-11-02
thumbnail: 'image/80mq7dk16vVEg8BBhsVe42n6zn82/s3iDQJUgLZV25YbtYxs1.png'
alt: >
  Topics API enhancements
authors:
  - leeronisrael
tags:
  - privacy
---


In June, we outlined several enhancements to the Topics API. We closed by
reiterating our commitment to continue to listen to ecosystem feedback. Today,
we are announcing a further enhancement to the Topics API, in response to that
feedback.

## Top topics selection

The initial Topics API proposal selected users' top five weekly topics based on
the frequency by which users interacted with each topic, on participating
websites. We received
[feedback](https://github.com/patcg-individual-drafts/topics/issues/42) that
this resulted in the API often returning topics that are less useful for ad
relevance such as ‘News' or ‘Arts & Entertainment'. We
[explored](https://github.com/patcg-individual-drafts/topics/issues/42#issuecomment-1029111959)
many solutions, including allowing callers to set a priority list, ranking by
inverse frequency on the web, by ad clicks observed by Chrome, and other
approaches.

The most promising approach we've seen is to integrate Topics utility feedback
from the advertising ecosystem directly. We have done so by introducing the
concept of "high utility" buckets. Chrome
[places](https://docs.google.com/spreadsheets/d/1ZihmbhaTULWdsPkUZlD1vDshbxbMtDwefUsjl96p69o/edit#gid=0)
each of the 22 root topics (those without an ancestor) from the taxonomy into
one of two buckets, indicating higher or standard utility for the ecosystem
overall. All descendants of the root topics inherit the same bucket assignment
from their parent. The assignment of root topics to buckets  is based on input
about utility we received from companies across the ecosystem when crafting our
improved taxonomy.

Considering the above, the updated top topics selection methodology is as
follows:

1. At the end of each epoch, Chrome converts participating hostnames from
    the user's browsing history into topics.
1. Topics are sorted first by bucket, and then by frequency. That is, if
    two topics are in the same bucket but have different frequency, the higher
    frequency topic is sorted higher.
1. Lastly, Chrome selects the top five as the user's top topics for that
    epoch, which are eligible to be shared with callers.

We expect the "high utility" bucket assignments of specific topics to evolve
over time based on feedback from the broader ecosystem, which can be provided by
creating an issue on the
[Topics repository on GitHub](https://github.com/patcg-individual-drafts/topics/issues/new).
The update will be available beginning this quarter (Q4 2023).

{% Aside %}

We are inspired to see the Google Chrome team continue to respond to industry feedback by improving the Topics API.  This enables more relevant advertising solutions for all. This innovative and collaborative approach will support key targeting use cases for clients by providing signals of greater value when the API is called.

— Matthew McIntyre, Global Head of Programmatic, EssenceMediacom

The Privacy Sandbox is highly complementary to Ogury's privacy-first advertising approach, and significantly improves user privacy. We believe that this improvement to top topics selection will make Topics more relevant to our exclusive data models.

— Stéphane Dupayage, Chief Product Officer, Ogury

{% endAside %}

---
title: "Revamping Analytics in the Chrome Web Store Developer Dashboard"
description: >
  Google is rolling out a revamped item analytics experience for the Chrome Web
  Store Developer Dashboard. The new dashboard is easier to understand at a
  glance and consolidates the most useful information upfront.
layout: "layouts/blog-post.njk"
authors:
  - dsli
  - crystalwang
date: 2022-07-28
hero: 'image/WlD8wC6g8khYWPJUsQceQkhXSlv1/wSy3XR59pIlrti6XMw8J.png'
alt: ''
tags:
  - extensions-news
  - cws
---

The Chrome Web Store is home to themes and extensions for a growing number of
web businesses. To accommodate the needs of these publishers, we are rolling out
a revamped item analytics experience for the Chrome Web Store Developer
Dashboard.

{% Img src="image/WlD8wC6g8khYWPJUsQceQkhXSlv1/r9VzMacMqwXzqwptUH7R.png", width="800", height="633",alt="A screenshot of five stats in a grid layout. The stats shown are 'Weekly Users by Region', 'Weekly Users by Language', 'Weekly Users by OS', 'Weekly Users by Item Version', and 'Enabled vs Disabled'. The first row of the grid contains three equally sized horizontal bar graphs that show the distribution of the top four regions, languages, and OSes, respectively. The second row contains a vertical bar graph showing the number of users for each day over the past 30 days and a ring graph illustrating the distribution of enabled vs. disabled installations. Below each graph on this page has a button below it labeled 'Export to CSV'." %}

## Simple and easy to understand at a glance

The improved analytics dashboard is designed to be easily scannable and
understandable. To this end, the visualizations and graphs have been updated
with simplicity in mind.

The former "Stats" tab has been rearranged and reorganized into 3 separate
pages: "Installs & Uninstalls," "Impressions," and "Weekly Users." Each of these
pages has a top-level graph showing the most important metric for the tab and
supplemental breakout data beneath the main graph.

{% Img src="image/WlD8wC6g8khYWPJUsQceQkhXSlv1/WNYiw7gZuOkzr9agtLlv.png", width="800", height="520", alt="A screenshot of the left navigation menu shown when viewing an individual extension in the Chrome Web Store's developer dashboard. Options in this menu are organized into two groups: 'Build' and 'Analytics'. The 'Analytics' group has a green badge with white text with the label 'NEW'. Sub-items for 'Build are Package', 'Store listing', 'Privacy', and 'Pricing & Distribution'. Sub-items for 'Analytics' are 'Installs & Uninstalls', 'Impressions', 'Weekly Users', and 'Ratings'." %}

The visualizations on the dashboard have been pared down to focus on only the
most important information. As an example, for "Installs by Region," instead of
showing dozens of indistinguishable lines on a crowded graph, the dashboard now
displays the relative popularity of the top regions as a percentage of total
installs for a given period of time.

{% Img src="image/WlD8wC6g8khYWPJUsQceQkhXSlv1/LefGIUrF3fdgKUSvHC3K.png", width="800", height="367", alt="An image labeled 'Before' contains a line graph with a light gray background. The graph has a dozen different lines stacked on top of each other, each drawn with a different color. The only line that's easily distinguishable is a solid pink line that appears well above the others." %}

{% Img src="image/WlD8wC6g8khYWPJUsQceQkhXSlv1/PJUmKvIV6NgBmyrK0x7W.png", width="800", height="369", alt="An image with the label 'After' shows three equally sized horizontal bar graphs in a row. From left to right, the graphs are labeled 'Installs by Region', 'Installs by Language', and 'Installs by Operating System'. Each graph shows their top four stat as bars. These bars appear in descending order from top to bottom." %}

We also believe developers should be able to immediately see how their extension
is trending month to month, as well as key inflection points on their
extension’s performance. This trend data is calculated automatically and
displayed prominently on the main graph of each new analytics tab.

While developers still have the ability to export more detailed metrics as a
CSV, they can now see at a glance the most critical details needed to make
decisions about their item.

## Intentional and useful data consolidated and upfront

One of the new tabs - Impressions - has been upgraded with new metrics and
filters. It recognizes the importance of letting publishers know how popular
their item listings are and where the traffic is coming from.

{% Img src="image/WlD8wC6g8khYWPJUsQceQkhXSlv1/nnrmWEgGlUGtOMWvcvXE.png", width="800", height="369", alt="Two graphs appear next to each other in a row. The left graph is a horizontal bar graph labeled 'Page Views by Campaign'. The first three bars on this graph are labeled with the names of campaigns and the last is labeled 'Other'. The right graph is a line graph labeled 'Top 3 Campaigns by Page Views.'" %}

The main graph on the Impressions tab is "Page views", which measures the number
of views of the item’s store listing page. For publishers that use UTM
parameters for traffic attribution, they will now see a breakdown of this page
view data by utm_source, utm_medium, and utm_campaign.

Publishers can also view the impressions of their item shown to users navigating
the web store, such as in "Recommended for You" sections and in other places the
item is featured. This additional transparency helps developers better
understand how users find their items in the store.

The Chrome Web Store team is committed to continuing to improve and refine the
Analytics dashboard to enable publishers to effectively monitor and iterate on
their store items. The new analytics experience is going live today and can be
viewed by developers for all their published items.

---
layout: "layouts/doc-post.njk"
title: Discovery on the Chrome Web Store
date: 2022-03-21
updated: 2023-08-24
description: >
  An overview of how users find items on the Chrome Web Store, and how our editors select items to
  feature.
---

We strive to make it easy for users to discover great items on the Chrome Web Store. A positive
discovery experience means making it simple for users to find the items they know and love, as well
as new and undiscovered items. From browsing the home page to searching by title, we want users to
find the best item to fit their needs. 

Items in the store are ranked or featured in order to make it easier for users to find high quality
content. Ranking is performed by a heuristic that takes into account ratings from users as well as
usage statistics, such as the number of downloads vs. uninstalls over time.

Other factors include the following:

- The design is pleasant to the eye.
- The item provides a clear purpose and fills a real user need.
- The setup and onboarding flow are intuitive.
- The item is easy to use.

Learn more about discovery on the Chrome Web Store below.

## Search {: #search }

Chrome Web Store search is a key tool for helping users find relevant and popular items. When users
search for an item, search returns a list of items that are ranked based on a number of criteria,
including metadata from your item's listing page. Making sure that your store listing page is
complete, accurate, and optimized is important to ensuring your item is discoverable through search.
Learn more about [crafting a great listing page][best-listing].

{% Aside %}
If your extension isn't appearing in search results it could be because you recently published your
extension, it may take a few hours for it to be indexed. Also, check the regions you selected in the
Distribution tab.
{% endAside %}

## Featured items and collections

The Chrome Web Store team occasionally selects interesting listings as "Featured" listings. We're not accepting requests to be featured at this point, since that would quickly become unmanageable. Here are a few tips to increase the likelihood that we'll feature your listing:

- Write a great piece of software
- Make sure your listing looks really nice (nice icon, good descriptions, crisp screenshots and/or videos)
- Promote your listing independently so that it starts to rise in the rankings

The collections are curated, and are not intended to be comprehensive. A collection is curated using the ranking criteria already listed and may be selected to provide helpful results for certain circumstantial situations, such as work-from-home extensions. Solicitations to be placed in a collection are not accepted.

## Categories {: #categories }

Categories on the Chrome Web Store organize items based on their main function. Users can browse
categories such as Shopping, Education, or Just for Fun, to find relevant items to install. To
assign a category, open an item in the Developer Dashboard. You'll find the Category list on the
Store Listing tab under Product Details.

In mid 2023 the categories changed. For information on choosing a new category, see
[best practices][chose-category].

## Extensions home page {: #home-page }

The home page is where we highlight great extensions and themes that we think users will love. Users
come to this page to find new and interesting items recommended by our editors. Chrome editors
curate items to be featured in merchandised collections and the rotating marquee based on a variety
of factors including performance, design, usefulness, relevancy and breadth of appeal. Items
featured on the home page must follow our general [best practices][best-practices] to be considered,
but there is no set checklist developers can follow to guarantee being featured. Developers cannot
pay to be featured on the home page. The best thing a developer can do to increase their chances of
being featured on the home page is to build a useful, high-quality extension that is a joy to use.

<figure data-size="full">
   {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/Hl9EIC00L5beXdmY1t07.png", alt="Screenshot of the Chrome Web Store home page.", width="800", height="536" %}
  <figcaption>Screenshot of the Chrome Web Store home page.</figcaption>
</figure>

## Editors' Picks {: #editors-picks }

Chrome editors hand pick items to be featured as Editors' Picks to inspire users and recognize
exceptional extensions. Editors' Picks are featured in the Editors' Picks collection on the home
page. We look for high-quality items that offer consistent, best-in-class experiences to users. Like
the home page, items chosen for Editors' Picks must follow our general [best
practices][best-practices] to be considered, but there is no set checklist of requirements to
guarantee being featured. Developers cannot pay to be featured as an Editors' Pick.

## Item badges {: #badges }

Badges on Chrome Web Store are visible to users as they browse the store, and offer an added signal
of quality and trust on vetted items. Developers who earn these badges may receive higher rankings
in search and filtering, and might also see their extensions appear in special promotions both on
and off Chrome Web Store. Learn more about badges below.

### Featured badge {: #featured-badge }

<figure data-size="full">
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/4C4d7JFnLhi0TFNH372V.png", alt="Screenshot of an extension listing that has a featured badge.", width="800", height="678" %}
  <figcaption>Screenshot of an extension listing that has a featured badge.</figcaption>
</figure>

The Featured badge is assigned to extensions that follow our technical best practices and meet a
high standard of user experience and design. Chrome team members manually evaluate each extension
before it receives the badge, paying special attention to the following:

1. Adherence to Chrome Web Store’s [best practices][best-practices], including providing
   an enjoyable and intuitive experience, using the latest platform APIs and respecting the [privacy
   of users][user-privacy].
2. A [store listing page][best-listing] that is clear and helpful for users, with quality images and
   a detailed description.

### Established Publisher badge {: #publisher-badge }

<figure data-size="full">
  {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/iyXfCsc4vSX0BeDNBwu2.png", alt="Screenshot of an extension listing that has an established publisher badge.", width="800", height="180" %}
  <figcaption>Screenshot of an extension listing that has an established publisher badge.</figcaption>
</figure>

The Established Publisher badge showcases developers who have verified their identity and
demonstrated compliance with the developer program policies. This badge is granted automatically to
publishers who meet the following two conditions:

1. The publisher's identity has been [verified][verified].
2. The publisher has established a consistent positive track record with Google services and
   compliance with the Developer Program Policy.

Any extensions built by a developer who follows the Chrome Web Store Developer Program Policies and
does not have any unresolved violations will be considered. For new developers, it will take at
least a few months of respecting these conditions to qualify. Today, this represents nearly 75 percent of
all extensions in the Chrome Web Store and we expect this number to keep growing.

Note that developers cannot pay to receive either badge, but we aim to provide other ways to request
consideration. The [One Stop Support][one-stop-support] page is trialing an option that allows
developers to nominate extensions for the Featured badge. To successfully nominate your extension to
receive the Featured badge, the following additional criteria must be met:

* Your item must be an extension.
* You must own the extension you are nominating.
* Your extension should have English language support.
* Your extension must be published and public.
* Your extension must not have any active policy violations.
* Your extension’s core features must be accessible without additional credentials or payments.

[best-listing]: /docs/webstore/best_listing/
[best-practices]: /docs/webstore/best_practices/
[chose-category]: /docs/webstore/best_practices/#choose-category-well
[one-stop-support]: https://support.google.com/chrome_webstore/contact/one_stop_support
[user-privacy]: /docs/extensions/mv3/user_privacy/
[verified]: /docs/webstore/cws-dashboard-listing/#displaying-your-verified-publisher-status

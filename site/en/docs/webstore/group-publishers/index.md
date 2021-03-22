---
layout: "layouts/doc-post.njk"
title: Set up a group publisher
date: 2020-06-20
description: How to share ownership of your Chrome Web Store items with other developers.
---
<!--lint disable code-block-style-->

You can share ownership of your items in Google Chrome Web Store with other developers by setting up
a *group publisher*. This page explains how group publishers work and how to set one up.

## About group publishers

Use a group publisher to establish an entity that owns Chrome Web Store items, allowing multiple
developers to share ownership of a published item. Consider how this differs from the more basic
individual publisher role.

{% Aside %}
When you [register as a Chrome Web Store developer][cws-register], your developer account is
automatically enrolled as an individual publisher.
{% endAside %}

**Individual publisher** When an individual developer acts as a publisher of an item, only that
developer can upload and publish updates to the item. The following diagram describes this scenario:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/VCMoTUiD0xFT5pZVj3kO.svg", alt="Diagram of individual
publishing process", width="800", height="145" %}

**Group publisher** By setting up a *group publisher*, you use a Google Group to associate multiple
developers into a composite entity. Any Chrome Web Store developer who belongs to the group can
publish updates to the item, as depicted in the following diagram:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/pgzFlq6rxiKFQ5NjYlBi.svg", alt="Diagram of group
publishing process", width="800", height="395" %}

Group publishers provide a number of benefits for organizations and development teams:

* It's a convenient way for teams to share the publishing capability among all their members.
* It's easy to transfer ownership of items when a developer leaves the organization.
* It avoids unintended deletion of items that can happen when a developer leaves the org (because
  their account gets deleted and that individual account was the item's publisher).

You can only create a group publisher once. However, you can be a member of other
developers' group publishers.

## Before you set up group publishing

Keep these important notes in mind:

* A Chrome Web Store developer account can only create one group publisher,
  **ever**. You cannot replenish this quota, even if you delete the group. 
* Once the group publisher account is created, the Google Group you select 
  remains linked to that account. Only the group owner or manager (or the last
  remaining group member) can delete the group publisher, unlinking the Google 
  Group from the Chrome Web Store.

    {% Aside "caution" %}
    Deleting the group publisher and the Google Group does not restore your
    lifetime quota of one group publisher activation.
    {% endAside %}

* You can be a *member* of any number of group publishers.

* You cannot change which group is linked to the group publisher account.
* You still retain your individual publisher account and can publish from either your group or
  individual account.

## Create a group publisher

To create a group publisher, follow these steps:

{% Aside %}
If you haven't already done so, you may wish to create a private Google Group before you begin.
{% endAside %}

1. Sign in to the [Chrome Web Store developer
  console](https://chrome.google.com/webstore/devconsole) and go to the **Account** tab.

1. Scroll down to the **Google group publishing** field:

    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/ozixwtnU0bikOAzhBaPM.png", alt="Screenshot of the
    Google group publishing field", width="800", height="291" %}

1. Select the Google Group that you want to associate with the new group
publisher, then click **Convert to group publisher**.

1. Make sure that the Google Group has mail turned on, as shown below:

    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/TU0AD2DYks5nPZGNWGLb.png", alt="Screenshot of Allow
    posting by email option", width="800", height="104" %}

1. Make sure that the Google Group doesn't allow anyone to join without being
validated. Use either "Only invited users" or "Anyone can ask", as shown below:

    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/LV2itIZXoZTLdgetsUwz.png", alt="Screenshot of
    selecting the only-invited-users option", width="800", height="211" %}

These steps create a new group publisher account. The Google Group you selected is linked to this
new publisher account, and the group email is the new group publisher account's email.

{% Aside %}
Once you finish the group publishing setup, it can take up to 30 minutes for developers in your
group to see the changes.
{% endAside %}

## Adding developers to the group publisher

Your developer console will show the new group publisher account and the linked
Google Group. You can [add or remove developers](https://groups.google.com/).

{% Aside "caution" %}
Be careful with the membership of your group publisher groups. Any Chrome Web Store developer who is
a member of the linked group can act on behalf of the new publisher account. For example, they can
edit items, publish items, and edit the publisher's display name. 
{% endAside %}

To maintain security over your items, we recommend that you manage your group in carefully:

* Create a Google Group for exclusive use as the group publisher; don't use an existing group that
  you also use for other purposes.
* Keep the group private using the "Only invited users" option.
* Minimize the number of members of the group.

{% Aside "gotchas" %}
Group publishing does not recognize "indirect" membership of Google Groups: only explicit
  members of a group can publish. For example, suppose that:
* You are a member of Group A, and
* Group A is a member of Group B, which is a group publisher.
In this case you are not a direct member of Group B, and cannot publish using that group.
{% endAside %}

## Publishing using a group publisher

In the top right-hand corner of the [Chrome Web Store developer
console](https://chrome.google.com/webstore/devconsole) is a pull-down that contains the following
items:

* Your developer user name (your individual publisher)
* Any group publishers that you are a member of.

Select the publisher you want to use. This displays the items already uploaded for that publisher.
Any new items that you upload are associated with the selected publisher.

## Move existing items to a group publisher account

Once you set up a group publisher (or once you're added as a member of a Google Group linked to a
group publisher), you can transfer your own items to the group publisher.

{% Aside 'warning' %}
Once you move items to a group publisher account, you can't move them back to your individual publishing account.
{% endAside %}

To transfer items to a group publisher account, start from the item page in your individual publisher
account, then transfer the item as described below:

1. In the [developer console][devconsole], open the item that you want to transfer.
1. Go to the **Store listing** detail tab for the item.
1. Click the "..." menu in the upper corner, then select **Transfer to group publisher**. The
following dialog appears:

    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/xMqFS3lPkdW5NWTiO4gJ.png", alt="Screenshot of
    transfer to group publisher dialog", width="800", height="506" %}

1. Choose carefully (because this is a permanent change) the group publisher you want to transfer
the item to.
1. Click **Transfer** to confirm the transfer.

To verify that the item was transferred:

1. [Select the group publisher][use-publisher] you transferred the item to.
1. Check that the item is listed there.

## Group publishing troubleshooting

* If either your individual publishing account or the group publisher account is suspended, you won't be able to transfer items.
* If the group publisher account has reached its published item limit, you won't be able to transfer your published items to this group publisher.

[cws-register]: /docs/webstore/register/
[devconsole]: https://chrome.google.com/webstore/devconsole
[use-publisher]: #publishing-using-a-group-publisher


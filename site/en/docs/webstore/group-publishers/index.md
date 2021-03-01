---
layout: "layouts/doc-post.njk"
title: Set up group publishing
date: 2020-06-20
description: How to share ownership of your Chrome Web Store items with other developers.
---

You can share ownership of your items in Google Chrome Web Store with other developers by setting up group publishing.

This guide tells you how to set up group publishing.

## About group publishers

Use a group publisher to establish an entity that owns Chrome Web Store items, so that publishing isn't tied to any individual developer. Consider how this differs from the more basic individual publisher role.

**Individual publisher** When an individual developer acts as a publisher of an item, only that developer can upload and publish updates to the item. The following diagram describes this scenario:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/VCMoTUiD0xFT5pZVj3kO.svg", alt="ALT_TEXT_HERE", width="800", height="145" %}

**Group publisher** By setting up a *group publisher*, a Google Group associates a number of individuals developers into a composite entity. Any Chrome Web Store developer who belongs to the group can publish updates to the item, as depicted in the following diagram:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/pgzFlq6rxiKFQ5NjYlBi.svg", alt="ALT_TEXT_HERE", width="800", height="395" %}

Group publishers provide a number of benefits for organizations and development teams:

* It's a convenient way for teams to share the publishing capability among all their members.
* It's easy to transfer ownership of items when a developer leaves the organization.
* It avoids unintended deletion of items that can happen when a developer leaves the org (because their account gets deleted and that individual account was the item's publisher).

You can only create a group publisher once. If you need additional group 
publishers, you'll need a separate developer account for each one.

## Before you set up group publishing

Keep these important notes in mind:

* A Chrome Web Store developer account can only create one group publisher,
  **ever**. You cannot replenish this quota, even if you delete the group. 
* Once the group publisher account is created, the Google Group you select 
  remains linked to that account. Only the group owner or manager (or the last
  remaining group member) can delete the group publisher, unlinking the Google 
  Group from the Chrome Web Store.

    <p class="warning">
    Deleting the group publisher and the Google Group does not restore your
  lifetime quota of one group publisher activation.
    </p>

* You can be a *member* of any number of group publishers.

* You cannot change which group is linked to the Group Publisher account.
* You still retain your personal publisherx account and can publish from either your group or personal account.

## Create a group publisher

To create a group publisher, follow these steps:

1. Sign in to the [Chrome Web Store developer console](https://chrome.google.com/webstore/devconsole) and go to the **Account** tab.

1. Scroll down to the **Google group publishing** field:

    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/ozixwtnU0bikOAzhBaPM.png", alt="ALT_TEXT_HERE", width="800", height="291" %}

1. Select the Google Group that you want to associate with the new group
publisher, then click **Convert to group publisher**.

1. Make sure that the Google Group has mail turned on, as shown below:

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/TU0AD2DYks5nPZGNWGLb.png", alt="ALT_TEXT_HERE", width="800", height="104" %}

1. Make sure that the Google Group doesn't allow anyone to join without being
validated. Use either "Only invited users" or "Anyone can ask", as shown below:

    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/LV2itIZXoZTLdgetsUwz.png", alt="ALT_TEXT_HERE", width="800", height="211" %}

These steps create a new Group Publisher account. The Google Group you selected is linked to this new publisher account, and the group email is the new group publisher account's email.

## Adding developers to the group publisher

Your dashboard page will show the new Group Publisher account and the linked
Google Group. You can [add or remove developers](https://groups.google.com/).

**Any Chrome Web Store developer who is a member of the linked group can act on behalf of the new publisher account**. For example, they can edit items, publish items, and edit the publisher's display name.

## Publishing using a group publisher

In the top right-hand corner of the [Chrome Web Store developer console](https://chrome.google.com/webstore/devconsole) is a pull-down that contains the following items:

* Your developer user name (your individual publisher)
* Any group publishers that you are a member of.

Select the publisher you want to use. This displays the items already uploaded for that publisher. Any new items that you upload are associated with the selected publisher.

## Things to note

* You can only set up group publishing once and create one group publisher account.
* You must be the owner or manager of a Google Group to link the group. The drop-down list on the dashboard page only shows groups that you're a direct member of (for example, if you are a member of Group A and Group A is a member of Group B, you are not a direct member of Group B, and Group B is not shown on the drop-down list).
* Once you finish the group publishing setup, it can take up to 30 minutes for developers in your group to see the changes.
* A developer can act on behalf of multiple publishers if the developer is a member of multiple Google Groups linked to publishers.
* If a merchant account is needed or is already set up, any member of the group can choose to re-link their own merchant accounts to the publisher on the dashboard page.
* Before you upload a new Chrome Web Store item, check that you have selected the publisher you want to own that item. This may be your personal publisher account or any group publisher account you belong to.

## Move existing items to a Group Publisher account

Once you set up a group publisher (or once you're added as a member of a Google Group linked to a group publisher), you can transfer your own items to the group publisher.

<p class="note">Once you move items to a Group Publisher account, you can't move them back to your personal publishing account.</p>

To transfer items to a group publisher account you need to use the old developer dashboard:

1. Sign in to the [Chrome Web Store developer console](https://chrome.google.com/webstore/devconsole).
1. To bring up the old developer dashboard, click **Show More** in the "Welcome" tile at the bottom-left, and then click **opt out**:
    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/QdnQIblmYyzHAeb1zgmL.png", alt="ALT_TEXT_HERE", width="618", height="434" %}
1. From the publisher selection drop-down at the top of the dashboard, select the Group Publisher you want to transfer your items to. It will load the dashboard page for the selected Group Publisher.
1. Select **Transfer existing item(s)**, next to the **Add new item** button. You'll see a page with a list of items you own personally.
1. Select the item(s) you want to transfer, and click the **Transfer** link to the right of the item.
1. Click **Transfer** in the confirmation box.

Remember to opt back in to the new developer console when you're done tranferring items.

## Group publishing troubleshooting

* If either your personal publishing account or the Group Publisher account is suspended, you won't be able to transfer items.
* If the Group Publisher account has reached its published item limit, you won't be able to transfer your published items to this Group Publisher.


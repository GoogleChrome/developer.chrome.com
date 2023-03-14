---
layout: "layouts/doc-post.njk"
title: Set up a group publisher
date: 2020-06-20
updated: 2022-12-12
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


## Before you set up group publishing

Keep these important notes in mind:

* A Chrome Web Store developer account can only create one group publisher,
  **ever**. You cannot replenish this quota, even if you delete the group. 
* Once the group publisher account is created, the Google Group you select 
  remains linked to that account. Only the group owner or manager (or the last
  remaining group member) can delete the group publisher, unlinking the Google 
  Group from the Chrome Web Store.

    {% Aside "warning" %}
    Deleting the group publisher and the Google Group does not restore your
    lifetime quota of one group publisher activation.
    {% endAside %}

* You can be a *member* of any number of group publishers.

* You cannot change which group is linked to the group publisher account.
* You still retain your individual publisher account and can publish from either your group or
  your individual account.

## Create a group publisher

To create a group publisher, follow these steps:

1. If you have not already done so, create a private [Google Group][google-group].

1. Make sure that the Google Group has mail turned on, as shown below:

    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/TgfQPjITmgIX0aYcDl1L.png", alt="Screenshot of Allow
        posting by email option", width="685", height="179" %}

1. Make sure that the Google Group, has "Message moderation" set to "No moderation" and "Spam message handling" set to "Post suspicious messages to the group" to ensure that CWS notifications will reach all members of the group.

    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/DSSEzpIU7RmSOkzXapeX.png", alt="Screenshot of Message moderation and Spam message handling", width="655", height="274" %}

1. Make sure that the Google Group doesn't allow anyone to join without being
validated. Use either "Invited users only" or "Anyone on the web can ask", as shown below:

    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/o6vgTMnt8Q1T6t91dPzk.png", alt="Screenshot of
        selecting the only-invited-users option", width="714", height="214" %}

    {% Aside %}
      After you finish the group publishing setup, it can take up to thirty minutes for developers in your
      group to see the changes.
    {% endAside %}

1. Sign in to the [Chrome Web Store Developer Dashboard][devconsole] and go to the **Account** tab.

1. Scroll down to the **Group publisher memberships** field:

    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/ozixwtnU0bikOAzhBaPM.png", alt="Screenshot of the
    Google group publishing field", width="800", height="291" %}

1. Select the Google Group that you want to associate with the new group
publisher, then click **Create group publisher**.

These steps create a new group publisher account. The Google Group you selected is linked to this
new publisher account, and the group email is the new group publisher account's email.

## Adding developers to or removing them from the group publisher

Your Developer Dashboard will show the new group publisher account and the linked Google Group. Use
[Google Groups][google-group] to add or remove developers. After adding or removing a member to
your publishing group, you will need to manually sync the Developer Dashboard with your Google Group.

To sync the Developer Dashboard:

1. Sign in to the [Chrome Web Store Developer Dashboard][devconsole] and select your group from the
**Publisher** list. It's located at the top, right of the screen.

    {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/1jxISIzNsqVoRbMc8qio.png", alt="Screenshot of the publisher list.", width="292", height="48" %}

1. Go to the **Account** tab.

1. Scroll down to **Group publisher memberships**.

    {% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/KsaEiqyPik0PaecQ9gqh.png", alt="Screenshot of the Group publisher membership field", width="800", height="325" %}

1. Click **Sync**.

For a group member to publish updates, that member must [register as a Chrome Web Store developer][cws-register] and pay the one-time registration fee.

{% Aside "caution" %}
Be careful with the membership of your group publisher groups. Any Chrome Web Store developer who is
a member of the linked group can act on behalf of the new publisher account. For example, they can
edit items, publish items, and edit the publisher's display name. 
{% endAside %}

To maintain security over your items, we recommend that you manage your group carefully.

* Create a Google Group for exclusive use as the group publisher; don't use an existing group that
  you also use for other purposes.
* Keep the group private using the "Only invited users" option.
* Minimize the number of members of the group.

{% Aside "gotchas" %}
Group publishing does not recognize "indirect" membership of Google Groups: only explicit
  members of a group can publish. For example, suppose that:
* You are a member of Group A, and
* Group A is a member of Group B, which is a group publisher.
In this case you cannot publish because you are not a direct member of Group B.
{% endAside %}

## Publishing using a group publisher

In the top right-hand corner of the [Chrome Web Store Developer
Dashboard][devconsole] is a pull-down that contains the following
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

To transfer an item:

1. In the [Developer Dashboard][devconsole], select the item tab in your individual publisher account.
1. Open the item that you want to transfer.
1. Scroll down to the **Store listing** field.
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
* If the group publisher account has reached its published [item limit][items-limit], you won't be able to transfer your published items to this group publisher.

[cws-register]: /docs/webstore/register/
[devconsole]: https://chrome.google.com/webstore/devconsole
[items-limit]: /docs/webstore/faq/#faq-gen-29
[google-group]: https://groups.google.com
[use-publisher]: #publishing-using-a-group-publisher
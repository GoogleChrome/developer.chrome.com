---
layout: 'layouts/doc-post.njk'
title: Publish your extension
seoTitle: Publishing a new Manifest V3 Chrome extension.
description: 'Guidance for publishing a new Manifest V3 extension'
date: 2023-09-04
updated: 2023-09-11
---

After [converting your extension][migration-checklist] to Manifest Version 3, the next step is to
release it on the [Chrome Web Store][cws]. Depending on the extent of the changes you made,
it can be advisable to perform a step-wise roll out to ensure your Manifest V3 extension works as expected
by testing it with a limited audience first. 

This article discusses a few ways to publish your new release in stages. For example, releasing a
beta version to testers and gradually rolling out to your user base. We also recommend monitoring
your extension review status and keeping an eye on user feedback to quickly publish any bug fixes if
needed.

## Publish a beta testing version {: #publish-beta }

Publishing a beta release allows you to gather feedback and identify any issues with a group of testers before releasing your extension to the rest of your users. Beta releases also go through the [Chrome Web Store review process][cws-review].

### Label your beta version {: #label-beta }

First, you must label the beta release as a testing version in the [manifest.json][manifest] by following these steps:

1. Add the label “BETA” at the end of the [name][manifest-name] of your extension.
2. Add "THIS EXTENSION IS FOR BETA TESTING" to the [description][manifest-desc].

{% Aside 'caution' %}
Skipping this step may result in your extension being rejected for [repetitive content][spam-policy]. 
{% endAside %}

Now that your beta version is clearly labeled, you can either distribute it to specified email addresses, to members of a Google group, or share it as a direct link.

### Distribute to testers by email {: #dist-email }

Follow these steps to distribute to a small number of testers:

1. Go to the **Account tab** of the Developer Dashboard.
1. Scroll down to **Management**.
1. Under Trusted Testers, enter email addresses separated by spaces or commas.
    <figure>
        {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SrVxYFc0lmMgXxtN30gA.png", alt="Screenshot showing trusted tester accounts listed in a Chrome Web Store developer account page", height="395", width="800", class="screenshot" %}
        <figcaption>
            Trusted tester emails in the Chrome Web Store developer Account page.
        </figcaption>
    </figure>
1. Save changes at the bottom of the page.
1. [Upload][cws-upload] the beta version of your extension
1. Go to the **Distribution** tab
1. Set the Visibility to **Private**. 

<figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/EfL45p0rsDFExxbjMp0B.png", alt="Setting the Visibility as Private in the Distribution tab", width="500", height="612", class='screenshot' %}
    <figcaption>
    Visibility set to Private in the Distribution tab. 
    </figcaption>
</figure>

### Distribute to members of a Google group {: #dist-group }

Once you've received enough feedback from your beta testers, you can expand distribution to members of a [Google group][google-group] that you own or manage. 

Go to the **Distribution** tab, set the **Visibility** to Private, and choose your beta tester Google group from the **dropdown menu**. 

<figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/eW95QyUHVYrQw0eThSNc.png", alt="Setting the visibility to private and choosing a google group to distribute the extension to", width="600", height="445" %}
    <figcaption>
        Distributing to members of a Google Group.
    </figcaption>
</figure>

### Distribute to testers with a direct link {: #dist-link }

Another alternative is to set the visibility to **Unlisted**. This way, only users who have the direct link to your store listing item can install the extension.

## Gradually roll-out your release {: #gradual-rollout }

To ensure that any unexpected problems will have minimal impact, you can roll out your update gradually by following these steps. This is only available for extensions with more than 10,000 active users.

1. [Upload][cws-upload] your new version.
2. Go to the **Distribution** tab.
3. Enter a percentage in **Percentage rollout** field.

{% Aside %}
Percentage rollout only applies to existing users of your extension. New users will always receive
the new version.
{% endAside %}

<figure>
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oZxWW5oMsh7fUSzwvRNp.png", alt="Screenshot of the Chrome Web Store fractional rollout field", height="488", width="800", class='screenshot' %}
    <figcaption>
        Setting the initial rollout percentage.
    </figcaption>
</figure>

To continue rolling out gradually, navigate to the **Package** tab of your item and increase the percentage located in the **Published** section. Note that the percentage can only be increased, and it doesn't trigger an additional review.

<figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/UA8vDp8aG89exqqjzY55.png", alt="Screenshot of the Chrome Web Store update percent rollout field", width="800", height="395", class='screenshot' %}
    <figcaption>
        Updating the rollout percentage.
    </figcaption>
</figure>

## Plan for review times {: #review }

We recommend planning enough time for your item to be reviewed as review times may vary based on [different factors][review-factors]. Most extensions are reviewed within three days. Consider staging your release and regularly checking your item's status to make changes quickly if necessary.

### Stage your release {: #staged-release }

The Chrome Web Store offers a way to stage a release by submitting it for review ahead of time. This way, when you are ready, you can officially release it. 

You can do this by unchecking the "Publish automatically" checkbox when you submit the item. 

<figure>
    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/BiZituXHHZ74SIkwc3q7.png", alt="Screenshot of the Chrome Web Store confirm submission dialog", height="388", width="800" %}
    <figcaption>
        Checkbox to stage an extension update.
    </figcaption>
</figure>

Or you can do it later by choosing **Defer publish** in the three-dot menu on the top right.

<figure>
    {% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/yoMNFt1ht6qSLXzFyrWj.png", alt="Screenshot showing the 'more' menu's defer publish option", width="286", height="184", class='screenshot' %}
    <figcaption>
      Choosing deferred publishing in menu.
    </figcaption>
</figure>

{% Aside %}
Once your item is approved, you have up to 30 days to publish. After that period expires, the staged submission will revert to a draft, which will have to be reviewed again. You can check your staged submission expiration in the developer dashboard next to each listed item.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/sYCH3lvreW0bUWznlOsE.png", alt="Staged item
status in the developer dashboard", width="700", height="84", class='screenshot' %}
    <figcaption>
    Staged item status in the developer dashboard
    </figcaption>
</figure>

{% endAside %}

### Check your item status {: #check-status }

When your item has passed or if a violation has been found, you will receive a notification email, usually within 3 days. If you have not received an email in a week, check your item's status in the **Published** section of the **Status** tab.

<figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/C4wpnEeMriI9YeDAMDIr.png", alt="The Chrome Web Store Status Tab", width="700", height="276", class='screenshot' %}
    <figcaption>
        Status tab in the Developer Dashboard.
    </figcaption>
</figure>

If your extension has been pending review for over two weeks, [contact developer support][cws-support] to request assistance.

## Additional tips {: #tips }

To stay on top of user feedback you can add a link to a [dedicated support site][support-site] under the Support tab of your extension listing.

[cws-review]: /docs/webstore/review-process/
[cws-support]: /docs/webstore/review-process/#support
[cws-upload]: /docs/webstore/upload
[cws]: https://chrome.google.com/webstore
[google-group]: https://groups.google.com/my-groups
[manifest-desc]: /docs/extensions/mv3/manifest/description/
[manifest-name]: /docs/extensions/mv3/manifest/name/
[manifest]: /docs/extensions/mv3/manifest/
[migration-checklist]: /docs/extensions/migrating/checklist/
[review-factors]: /docs/webstore/review-process/#review-time-factors
[spam-policy]: /docs/webstore/troubleshooting/#spam
[support-site]: /docs/webstore/support-users/#provide-user-support

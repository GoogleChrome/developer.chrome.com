---
layout: 'layouts/doc-post.njk'
title: TBD
seoTitle: Best practices when publishing a converted Manifest V3 extension.
description: 'TBD'
date: 2022-09-23
updated: 2023-05-10
---

After following the [MV3 Migration Checklist][migration-checklist] to convert your extension, you are ready to move on to distributing your extension in the Chrome Web Store. This article includes a few helpful recommendations to ensure your extension is released smoothly.

## Keep the current set of features {: #keep-features }

When publishing your Manifest V3 extension for the first time, we recommend not adding extra functionality. This way, you can minimize the chances of unexpected issues or bugs. If new features require new permissions, it may [trigger a warning][perm-warn], which means your extension may be disabled until the user enables it again.

_Screenshot of disabled extension_

Note that the extension will also be disabled if `"host_permissions"` are added or modified in the manifest. This includes `"content_scripts.matches"`, which are also considered host permissions. See [Permission warnings][perm-warn] to learn of other ways to add permission without displaying a warning.

## Publish a beta testing version {: #publish-beta }

The Chrome Web Store provides a way to publish to beta testers. This way, a subset of users can report any issues before publishing to the rest of your user base. 

{% Aside %}
Beta releases will also be subject to the Chrome Web Store review process.    
{% endAside %}

### Label your beta version {: #label-beta }

First, you must label this extension as a testing version by following these steps:

1. Add the label “BETA” at the end of the name of your extension.
2. Add "THIS EXTENSION IS FOR BETA TESTING" to the description.

Note that skipping this step may result in your extension being rejected for [repetitive content][spam-policy]. 

Now that your beta version is clearly labeled, you can either distribute it to specified email addresses, to members of a Google group or share as a direct link.

### Distribute to testers by email {: #dist-email }

Follow these steps to distribute to a small number of testers:

1. Go to the Account tab of the Developer Dashboard.
2. Scroll down to Management.
3. Under Trusted Testers, enter email addresses separated by spaces or commas.
4. Save changes at the bottom of the page.

<figure>
    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SrVxYFc0lmMgXxtN30gA.png", alt="Screenshot showing trusted tester accounts listed in a Chrome Web Store developer account page", height="395", width="800" %}
    <figcaption>
        Trusted tester emails listed in a Chrome Web Store developer Account page.
    </figcaption>
</figure>

1. Upload the beta version of your extension
2. Go to the Distribution tab
3. Set the Visibility to **Private**. 

_Example Screenshot_

### Distribute to members of a Google group {: #dist-group }

Once you've received enough feedback from your beta testers, you can expand distribution to members of a [Google group][google-group] that you own or manage. 

Go to the Distribution tab, set the Visibility to **Private**, and choose your beta tester Google group from the dropdown menu. 

<figure>
    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/VjVunVpPxNsVKpIXKMpr.png", alt="Screenshot of the Private Visibility Setting and Google Group Selection Dropdown", width="800", height="445" %}
    <figcaption>
        Distributing to Members of a Google Group
    </figcaption>
</figure>

### Distribute to testers with a direct link {: #dist-link }

Another alternative is to set the Visibility as **Unlisted**. This way, only users who have the direct link can install the extension.

## Gradually roll-out your release {: #gradual-rollout }

The Chrome Web Store allows you to roll out a new version gradually. This ensures that any unexpected problems will have minimal impact. This is only available for extensions with more than 10,000 active users. To start rolling out your extension partially, follow these steps:

1. [Upload](/docs/webstore/publish/) your new version.
2. Go to the Distribution tab.
3. Enter a percentage in **Percentage rollout** field.

To continue rolling out gradually, navigate to the **Package** tab of your item and increase the percentage located in the **Published** section. Note that the percentage can only be increased, and it doesn't trigger an additional review.

## Understand the review process {: #review }

We recommend planing enough time for your item to be reviewed. Review times vary based on [different factors](/docs/webstore/review-process/#review-time-factors). You can be more proactive by staging the release and checking the review status to follow up quickly if the version is rejected.

### Stage your release {: #staged-release }

The Chrome web store offers a way to stage a release by submitting it for review ahead of time. This way, when you are ready, you can officially release it. 

You can do this by unchecking the "Publish automatically" checkbox when you submit the item. 


Or you can do it later by choosing "Defer publish" in the three-dot menu on the top-right.

Aside
Once your item is approved, you have up to 30 days to publish. After that period expires, the staged submission will revert to a draft, which will have to be reviewed again. You can check when your staged submission will expire under the status of your item.

### Check your item status {: #check-status }

Most extensions are reviewed within three days. You should receive an email notifying you if your item has passed or if a violation has been found. If you have not received an email in a week or two, you can check your item's status in the Published section of the Status tab. For example:

If your extension is pending review for over three weeks, you can [contact developer support][cws-support] to request assistance.

## Additional tips {: #learn-more }

There are other ways to make your extension more robust as you transition to Manifest Version 3. See [Engineering resilient extensions](TBD) for best practices for building a reliable extension.


[perm-warn]: /docs/extensions/mv2/permission_warnings/
[cws-support]: /docs/webstore/review-process/#support
[migration-checklist]: /docs/extensions/migrating/checklist/
[spam-policy]: /docs/webstore/troubleshooting/#spam
[google-group]: https://groups.google.com/my-groups
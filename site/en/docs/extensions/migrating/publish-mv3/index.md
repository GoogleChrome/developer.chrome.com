---
layout: 'layouts/doc-post.njk'
title: TBD
seoTitle: Best practices when publishing a converted Manifest V3 extension.
description: 'TBD'
date: 2022-09-23
updated: 2023-05-10
---

After following the [MV3 Migration Checklist](/docs/extensions/migrating/checklist/) and converting your extension to Manifest Version 3, you are ready to move on to distributing your extension in the Chrome Web Store. This article includes a few helpful recommendations to ensure a smooth release.


## Keep the current set of features

When publishing your Manifest Version 3 extension for the first time, we recommend not adding any functionality to minimize the possibility of things going wrong, especially features that require new permissions. Some [permissions trigger warnings](/docs/extensions/mv2/permission_warnings/), which means your extension may be disabled until the user enables it again.

_Screenshot of disabled extension_

Note that the extension will also be disabled if "host_permissions" are added or modified in the manifest. This includes "content_scripts.matches", which are also considered host permissions. See Onboarding Users to learn how to design a better onboarding user experience.


## Publish a beta testing version

The Chrome Web Store provides a way to publish to beta testers. This way, a subset of users can report any issues before publishing to the rest of your user base. 

Note that Beta releases will also be subject to the Chrome Web Store review process.


### Label your beta version

First, you must label this extension as a testing version. You can do so by following these steps:



1. Add the label “BETA” at the end of the name of your extension.
2. Add "THIS EXTENSION IS FOR BETA TESTING" to the description.

Note that skipping this step may result in your extension being rejected for violating the spam policy. 

Now that your beta version is clearly labeled, you can either distribute it to specified email addresses or to members of a Google group you own or manage.


### Distribute to testers by email

Follow these steps to distribute to a small number of testers:



1. Go to the Account tab of the Developer Dashboard.
2. Scroll down to Management.
3. Under Trusted Testers, enter email addresses separated by spaces or commas.
4. Save changes at the bottom of the page.

_Example Screenshot_



1. Upload the beta version of your extension, go to the Distribution tab, and set the Visibility to **Private**. 

_Example Screenshot_


### Distribute to testers in a Google group

Once you've received enough feedback from your beta testers, you can expand distribution to members of a [Google group](https://groups.google.com/my-groups) that you own or manage. 

Go to the Distribution tab, set the Visibility to **Private**, and choose your beta tester Google group. 

_Example Screenshot_


### 

<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")



### Distribute to testers with a direct link

Another alternative is to set the Visibility as Unlisted. This way, only users who have the direct link can install the extension.


## Gradually roll-out your release

The Chrome Web Store allows you to roll out your new version gradually. This helps to ensure that any unexpected problems will have minimal impact. This is only available for extensions with more than 10,000 active users. To start rolling out your extension partially, follow these steps:



1. [Upload](/docs/webstore/publish/) your new version.
2. Go to the Distribution tab.
3. Enter a percentage in **Percentage rollout** field.

 

To continue rolling out gradually, navigate to the **Package** tab of your item and increase the percentage located in the **Published** section. Note that the percentage can only be increased and that it will not trigger an additional review.


## 

<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")



## Understand the review process

We recommend you plan enough time for your item to be reviewed. Review times vary based on different factors (see [Notable factors that increase review times](/docs/webstore/review-process/#review-time-factors)). One way to plan ahead is to stage your release. We also recommend that you check on the review status of your item to follow-up if needed.


### Stage your release

The Chrome web store offers a way to stage a release by submitting it for review ahead of time. This way, when you are ready, you can officially release it. 

You can do this by unchecking the "Publish automatically" checkbox when you submit the item. 



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


Or you can do it later by choosing "Defer publish" in the three-dot menu on the top-right.



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


Aside

Once it is approved, you have up to 30 days to publish. After that period expires, the staged submission will revert to a draft, which will have to be submitted again for review. You can check when your staged submission will expire under the status of your item.



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")



### Check your item status

Most extensions are reviewed within three days. You should receive an email notifying you if your item has passed or if a violation has been found. If you have not received an email in a week or two, you can check your item's status in the Published section of the Status tab. For example:



If your extension is pending review for over three weeks, you can [contact developer support](/docs/webstore/review-process/#support) to request assistance.


## Additional tips

There are other ways to make your extension more robust as you transition to Manifest Version 3. See [Engineering resilient extensions](TBD) for best practices for building a reliable extension.


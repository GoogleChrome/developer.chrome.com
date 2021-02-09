---
layout: 'layouts/doc-post.njk'
title: "Step 7: Publish Your App"
date: 2014-10-17
#updated: TODO
description: How to publish your Chrome App in the Chrome Web Store.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

{% Aside %}

**Want to start fresh from here?** Find the previous step's code in the [reference code zip][3]
under **_cheat_code > solution_for_step6_**.

{% endAside %}

In this step, you will learn:

- How to publish a Chrome App to the Chrome Web Store.

_Estimated time to complete this step: 10 minutes._  
To preview what you will complete in this step, [jump down to the bottom of this page ↓][4].

## Learn about Chrome Web Store benefits {: #about-web-store }

For those not familiar with the store, it provides several benefits to users and developers.

For users:

- Added security—all apps and extensions are checked for Malware signals.
- All apps are maintained with the latest version the developer has published.
- Ratings and reviews provide a great way to see the quality of applications.

For developers:

- You can upload your app once and know that it will be distributed to all users.
- Payments and subscriptions are built in.
- Your app is more discoverable to users.
- Tools to help you manage bugs and reviews from users.

## Upload your app via the Developer Dashboard {: #developer-dashboard }

The Chrome Web Store has a special dashboard for developers that lets you upload new applications
and update existing ones.

The process of uploading apps is simple:

1.  Compress your application's root directory (the folder containing the _manifest.json_ file) into
    a .zip file.
2.  Go to the [Chrome Web Store Developer Dashboard][5] and log in with a developer-verified Google
    Account. (If you don't have a verified account, you can [sign up][6] for a nominal fee.)
3.  Click **Add new item**.
4.  Accept the terms and services agreement to continue.
5.  Use the **choose file** dialog box to find the .zip file in your system. Select that file to
    upload.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Zl8a11fQ8j3Dmak4t6Fb.jpg", alt="Choose a zip to upload", height="365", width="644" %}

You are nearly done. If you are not quite ready for the next step, you can save the draft for later,
or you can publish it to a group of testers.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/UNBhXQl7cHVl3GeNFVfl.png", alt="Save a draft", height="174", width="643" %}

## Add promotional materials {: #promotional-metadata }

Before you can publicly publish your app, you need to add promotional assets and extra meta
information about your application.You should see a screen that looks like this:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/XbR8jGkSRblieFkfGA6i.png", alt="Add meta information for your app", height="480", width="800" %}

The below fields are mandatory:

- A **detailed description** of your application. Write your description to entice users to download
  your app.
- A 128x128 **icon** to display in the store. You may re-use your app icon here.
- At least one 1280x800 or 640x400 **screenshot** or YouTube **video** to show off what your app
  does.
- A 440x280 **small tile icon** that will be displayed on the Chrome Web Store wall.
- The **primary category** where your app should be listed.
- Your app's **language** to help users find it.

Once you are happy with everything, you can now publish your application to the public.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mDeJNuPD6lD5aTSt8UZY.png", alt="Publish your changes", height="174", width="643" %}

## View your app in the Chrome Web Store {: #view-in-webstore }

You are done Step 7! You should have a link to your public Chrome App that you can share with the
world.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ijRErXNW1lm0uTqhA7V7.png", alt="The Todo app in the Chrome Web Store", height="580", width="800" %}

Congratulations on completing this Chrome Apps codelab!

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://github.com/mangini/io13-codelab/archive/master.zip
[4]: #view-in-webstore
[5]: https://chrome.google.com/webstore/developer/dashboard
[6]: https://chrome.google.com/webstore/developer/about_signup

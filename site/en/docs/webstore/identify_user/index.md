---
layout: "layouts/doc-post.njk"
title: Identifying the User
date: 2017-08-30
description: How to get the Google Account identity of a Chrome Web Store user.
---

This page tells you how to get the Google Account identity of a user, using Google's OpenID
endpoint. You need this identity if you support Chrome Web Store Payments, because payment
information is tied to the user's Google Account.

Even if you don't use Chrome Web Store Payments, consider using Google Accounts if your app needs a
login system. Google Accounts can help you provide a better user experience, since users of the
Chrome Web Store are likely to be logged in already, and they won't have to set up and remember yet
another username and password.

## When to support Google Accounts

The following table summarizes when you should support Google Account logins using OpenID.

<table><tbody><tr><th>App cost</th><th>Payment plan/system</th><th>Support for Google Accounts (using OpenID)</th></tr><tr><td>Paid</td><td>Chrome Web Store Payment System</td><td><b>Required</b><br>The Licensing API relies on Google Account user IDs.</td></tr><tr><td>Paid</td><td>Custom payment solution</td><td><b>Recommended</b><br>Users from the Chrome Web Store will have a better experience if you support the Google Account that they're already logged into.</td></tr><tr><td>Free</td><td>You <b>might charge</b> for the app in the future</td><td><b>Recommended</b><br>Supporting Google Accounts might make adding payments simpler.</td></tr><tr><td>Free</td><td><b>No plans to charge</b> for the app in the future</td><td><b>Optional</b><br>If you want to identify individual users, Google Accounts are a reasonable way to do so.</td></tr></tbody></table>

## How to use OpenID with Google Accounts

To get the user's OpenID URL, you query Google's OpenID service. If the user isn't already logged
in, the user will be prompted to sign in with a Google-provided login page or popup.

<div class="aside aside--note"><b>Note</b>: The OpenID URL is unique for a specific Google Account <em>and a specific app</em>. If you publish multiple apps, the same user will have a different OpenID URL for each app.</div>

Here's what the login page looks like. Note that it has a Google URL, not a URL from the app's site:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yDxgjzMfnbRFJi9XlGyj.png", 
       alt="The Google login page.", height="368", width="644" %}

If you're writing a hosted app with Google App Engine, supporting Google Accounts is easy. You just
use the default Google Accounts API authentication and the Users service. For details, see the user
authentication docs (for [Java][1] or [Python][2]). Here's an example (taken from the [Licensing
API][3] tutorial's [HelloLicenseServlet.java][4] file) of the code you use to get the current user's
OpenID URL if you're implementing a Java app with Google App Engine:

```java
UserService userService = UserServiceFactory.getUserService();

if (userService.isUserLoggedIn()) {
  User user = userService.getCurrentUser();
  /* ...Do something with user.getFederatedIdentity(), which is the OpenID URL. */
}
```

If you aren't using Google App Engine, you can get the Google OpenID endpoint by sending a request
to `https://www.google.com/accounts/o8/id`. See [Federated Login for Google Account Users][5] for
details.

## How to skip the OpenID approval screen

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yDxgjzMfnbRFJi9XlGyj.png", alt="the Google Accounts approval page", height="368", width="644" %}

Normally, the first time your app uses the
Google OpenID endpoint to authenticate a particular user, the user must approve your access to their
account. To the right, you can see a typical OpenID approval screen.

Your users will have a better experience if they never see the approval screen. The screen is
skipped if **both** of the following are true:

* Your app requests only the OpenID URL. If your app requests something else—the user's
  email address, for example—the approval screen is shown.
* You specify your app's OpenID realm in the Edit page.

Here's how to specify your OpenID realm:

1.  In the Chrome Developer Dashboard, go to the Edit page for your app.
2.  In the **OpenID** section, select the checkbox.
3.  In the text field that appears, enter the realm that your app will use to query Google's OpenID
    service.  
    This must be exactly the same as the value of the `openid.realm` field in your authentication
    requests.
4.  Save your changes.  
    They'll take effect the next time you publish your app.

If your app's code doesn't specify the value of the `openid.realm` parameter, look at your OpenID
library to see how it sets that value. For details on how `openid.realm` is used, see [Request
parameters][6] in the Google OpenID documentation.

## OpenID resources

You should use an existing OpenID library rather than implement your own. In addition to Google App
Engine's Users service, you can find OpenID libraries in a number of languages. Here are a few
libraries we've used:

- Java: [OpenID4Java][7]
- Python: [GAE Django OpenID][8]
- PHP: [LightOpenID][9]
- Ruby: [ruby-openid][10] and [rack-openid][11], used together

You can find more libraries at Janrain's [OpenID Enabled][12], and a full list at the [OpenID
Foundation][13].

The following pages have detailed explanations of how to use OpenID with Google Accounts:

- [Supporting Federated Login with Google Accounts for Chrome Web Store Apps][14]
- [Federated Login for Google Account Users][15]
- [Using Federated Authentication via OpenID in Google App Engine][16]

## What next?

If you're using the Licensing API, your next stop is [Checking for Payment][17]. Otherwise, go on to
[Supplying Images][18].

[1]: https://developers.google.com/appengine/docs/java/users/overview
[2]: https://developers.google.com/appengine/docs/python/users/overview
[3]: /docs/webstore/get_started
[4]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-java/HelloLicenseServlet.java
[5]: https://developers.google.com/accounts/docs/OpenID
[6]: https://developers.google.com/accounts/docs/OpenID#Parameters
[7]: http://code.google.com/p/openid4java/
[8]: http://code.google.com/p/google-app-engine-django-openid/
[9]: http://gitorious.org/lightopenid
[10]: http://rubyforge.org/projects/ruby-openid/
[11]: http://github.com/josh/rack-openid
[12]: http://www.janrain.com/openid-enabled
[13]: http://openid.net/developers/libraries/
[14]: /docs/webstore/authentication
[15]: https://developers.google.com/accounts/docs/OpenID
[16]: https://developers.google.com/appengine/articles/openid
[17]: /docs/webstore/check_for_payment
[18]: /docs/webstore/images

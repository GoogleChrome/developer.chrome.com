---
layout: "layouts/doc-post.njk"
title: Supporting Federated Login with Google Accounts for Chrome Web Store Apps
date: 2010-11-01
description: >
  An overview of federated login and guidelines on how to use federated login
  in your Chrome Web Store app.
---

When a user installs and launches your app from the Chrome Web Store, odds are they'll be signed in
to their Google Account. If your app requires authentication, then you should significantly
streamline the process for your users by supporting Federated Login to allow users to sign in to
your app using their Google Accounts. In this article, we'll cover some the basics of Federated
Login using Google Accounts, things to consider when designing your authentication flow, some
examples of apps that allow users to sign in using their Google Accounts, and resources to help you
learn more and get started.

## Overview of Federated Login

Federated Login, based on the [OpenID][1] standard, frees users from having to set up separate
account credentials for different web apps, and frees developers from the task of implementing login
authentication measures. OpenID achieves this goal by providing a framework in which users can
establish an account with an OpenID provider, such as Google, and use that account to sign in to any
web app that accepts OpenIDs.

Google supports the OpenID 2.0 protocol, providing authentication support as an OpenID provider. A
third-party site can request Google to authenticate users who are signing in with an existing Google
Account. Google will return an identifier to the third-party site that the site can use to recognize
the user. This identifier is uniquely identifies the user, enabling the third-party site to
recognize the user across multiple sessions.

## Considerations

When deciding how to structure the authentication flow for your app, keep the following
considerations in mind.

### Will you be adding support for Federated Login with Google Accounts on top of an existing authentication system?

If so, you can provide users a way to link their new accounts with their existing accounts. For more
guidance and best practices for handling and linking legacy accounts, see [this article][2]. In the
[Examples][3] section below, you'll see a walk through of the account creation process for
Springpad, which gives the user the choice to link with an existing account or continue as a new
user.

### Do you you want to use a different authentication flow if your app is launched via the Google Chrome app launcher?

You can further streamline the process for users by supporting a different authentication flow when
your app is launched via the Google Chrome app launcher as opposed to a bookmark or link. You can
use JavaScript to check whether `window.chrome.app.isInstalled` is defined. If it is, the app is
running from the Google Chrome app launcher, and you can assume they'll be signing in via their
Google Account. Here's an example of the code you'd use:

```js
if (window.chrome.app.isInstalled) {
  // You're running as an installed app, via the app launcher!
} else {
  // You're running via a bookmark or link.
}
```

### Must users provide information in order to create a new account in your system?

With OpenID, you can request information such as first name, last name, email address, region, and
language. You request this additional information by including [attribute exchange parameters][4] in
the authentication requests that you send to the Google OpenID endpoint. What if you require
additional information such as settings related to your app, or if you require a user to accept your
terms of service before creating an account? In those cases, you can prompt the user to provide
additional information after they've opted to sign in with their Google Account. In the
[Examples][5] section below, you'll see a walk through of the account creation process for Manymoon,
which demonstrates this process. If the extra information is optional, then you can also consider
waiting until after a user has created their account to gather this information, in order to
simplify the account creation process.

### What authentication options will you present to your users?

The way you decide to design your user interface may be different if you only support Federated
Login with Google Accounts versus supporting Federated Login with Google Accounts and your existing
authentication system. See [Usability Research on Federated Login][6] for more options.

### Do you want to use a pop-up UI or a browser redirect flow for signing in?

You have a choice of how users will be prompted for their Google Account credentials. You can prompt
them via a pop-up UI, or you can use a browser redirect flow. Our [PHP sample code][7] demonstrates
how to use the pop-up UI, while the [Java][8] and [Python][9] sample code uses the browser redirect
flow. To try the different styles of authentication yourself, see [these examples][10].

### What if a user deletes their Google Account?

If a user deletes their Google Account, they can no longer sign in to your app using that account.
In this case, you could provide a way of associating accounts in your system with a different OpenID
identifier, similar to a password reset flow.

## Sample Workflow {: #sample-workflow }

This sample workflow walks through the authentication process for an app that supports Federated
Login.


{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1605551445479.png",
       alt="A diagram of the authentication flow.",
       height="662",
       width="800" %}

## Examples

The screencasts below show three different account creation and authentication scenarios from a
user's perspective.

### Basic authentication flow

This screencast uses the Diary.com app to demonstrate a basic authentication flow.

{% YouTube id="u4FBk_XUw2Q" %}

### Requesting additional information during account creation

In this screencast, the Manymoon app demonstrates an account creation flow where the user is
prompted for additional information.

{% YouTube id="wV0ModwrCvo" %}

### Linking with an existing account

This screencast uses the Springpad app to show how a user can sign in to an app with their Google
Account and then link to an existing Springpad account.

{% YouTube id="_k7lmFC9IrY" %}

## Resources and Best Practices

This section has some final tips about terminology, federated identity, and where you can get more
information.

For consistency with Google Accounts, we recommend using the following terms to refer to account
creation and authentication:

- **sign in**
- **sign out**
- **create**

**Note**: The adjective and noun forms of the first two terms are _sign-in_ and _sign-out_. Also
note that the user _signs in to_ an account (that's three words).

When a user is creating an account in your app, we recommend displaying a splash page to the user
before prompting them to sign in to their Google Account. Displaying a splash page provides context
to the user about why they're being asked to sign in to their Google Account. The Springpad app in
the [Examples][11] section above demonstrates one possible layout for a splash page. See [Usability
Research on Federated Login][12] for more options.

Make sure you're using the correct federated identity URL when you request the [OpenID
endpoint][13]. The URL you should use to get the Google OpenID endpoint is
`https://www.google.com/accounts/o8/id`.

Here are some places where you can find more information about OpenID and Federated Login for Google
Accounts.

- For technical guidance on using Federated Login for Google Accounts, see the documentation for
  [working with OpenID][14].
- The [Identifying the User][15] section of the Chrome Web Store Developer's Guide provides more
  details on when supporting Federated Login with Google Accounts is required and when it's
  optional, as well as a listing of OpenID libraries you can use.
- For sample code that demonstrates how to obtain the OpenID identifier for a user and how to use
  the Chrome Web Store Licensing API, see these [samples][16] for Java, Python, and PHP.
- Visit the [Google Group on Federated Login][17] for discussion on using Google's OpenID API.

[1]: http://openid.net
[2]: http://sites.google.com/site/oauthgoog/UXFedLogin/loginlogic
[3]: #examples
[4]: https://developers.google.com/accounts/docs/OpenID#endpoint
[5]: #examples
[6]: http://sites.google.com/site/oauthgoog/UXFedLogin
[7]: /docs/webstore/samples#php
[8]: /docs/webstore/samples#java
[9]: /docs/webstore/samples#python
[10]: http://www.puffypoodles.com/
[11]: #examples
[12]: http://sites.google.com/site/oauthgoog/UXFedLogin
[13]: https://developers.google.com/accounts/docs/OpenID#endpoint
[14]: https://developers.google.com/accounts/docs/OpenID#working
[15]: /docs/webstore/identify_user
[16]: /docs/webstore/samples
[17]: http://groups.google.com/group/google-federated-login-api

---
layout: "layouts/doc-post.njk"
title: Identifying the User
date: 2017-08-30
description: How to get the Google Account identity of a Chrome Web Store user.
---

This page tells you how to get the Google Account identity of a user, using Google's OpenID
endpoint. You can use this identity to manage user payments and licensing, or if you need a
login system. Google Accounts can help you provide a better user experience, since users of the
Chrome Web Store are likely to be logged in already, and they won't have to set up and remember yet
another username and password.

## When to support Google Accounts

The following table summarizes when you should support Google Account logins using OpenID.

<table>
  <tbody>
    <tr>
      <th>App cost</th>
      <th>Payment plan/system</th>
      <th>Support for Google Accounts (using OpenID)</th>
    </tr>
    <tr>
      <td>Paid</td>
      <td>Custom payment solution</td>
      <td>
	<b>Recommended</b>
	<br>Users from the Chrome Web Store will have a better experience if you support the Google Account that they're already logged into.
      </td>
    </tr>
    <tr>
      <td>Free</td>
      <td>You <b>might charge</b> for the app in the future</td>
      <td>
	<b>Recommended</b>
	<br>Supporting Google Accounts might make adding payments simpler.
      </td>
    </tr>
    <tr>
      <td>Free</td>
      <td><b>No plans to charge</b> for the app in the future</td>
      <td>
	<b>Optional
	</b>
	<br>If you want to identify individual users, Google Accounts are a reasonable way to do so.
      </td>
    </tr>
  </tbody>
</table>

## How to use OpenID with Google Accounts

To get the user's OpenID URL, you query Google's OpenID service. If the user isn't already logged
in, the user will be prompted to sign in with a Google-provided login page or popup.

<div class="aside aside--note"><b>Note</b>: The OpenID URL is unique for a specific Google Account <em>and a specific app</em>. If you publish multiple apps, the same user will have a different OpenID URL for each app.</div>

Here's what the login page looks like. Note that it has a Google URL, not a URL from the app's site:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yDxgjzMfnbRFJi9XlGyj.png", 
       alt="The Google login page.", height="368", width="644" %}

You can get the Google OpenID endpoint by sending a request
to `https://www.google.com/accounts/o8/id`. See [Federated Login for Google Account Users][5] for
details.


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

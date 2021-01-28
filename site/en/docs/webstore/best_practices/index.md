---
layout: "layouts/doc-post.njk"
title: Best Practices
date: 2017-08-30
description: >
  Best practices on how to implement your app and list it in the Chrome Web Store.
---

This page has advice on how you should implement your app and list it in the store. As the store
matures and we learn from developers' experiences, these recommendations will be updated.

## Design a great app

This is the hard part. For advice, you can read articles about [app design][1]. Also, follow the
[pre-launch checklist][2].

## Support Google Accounts

If your app requires user login, we recommend that you provide at least some support for Google
Accounts. The reason is that if a user purchases your app from the Chrome Web Store, odds are the
user is already logged into a Google Account whenever they use your app. Reducing the number of
logins improves the user's experience.

If you already have a login system, consider correlating the Google Account ID to the user account
in your system. You can do this by storing the user's OpenID URL from Google's OpenID service, in
the same way that you store other data that's associated with a user's account. When someone is
logged into a Google Account but not your login system, you can automatically log them into their
user account in your system.

See [Identifying the User][3] for more information about supporting Google Accounts.

## Keep ex-users' data for 30 days or more

You should keep users' data for at least 30 days after they cancel their subscription or uninstall
your app. Users might be unsubscribed for reasons beyond their control, and even if they do
intentionally unsubscribe or uninstall the app, they might come back.

## Cache license data

If you use Chrome Web Store Payments, you can use the Licensing API to programmatically check for
payment, as described in [Checking for Payment][4].

But don't query the license server too often: [Cache the results][5].

## Create a compelling store listing

The better your app's listing in the store, the more users will find and try your app. When choosing
your app's name, writing its description, and designing its logo, keep in mind Google's [Branding
Guidelines][7].

### Provide great images

See [Supplying Images][8] for guidelines on the images you should supply to the store.

### Choose your app's category well

The Chrome Developer Dashboard lets you specify a primary and secondary category for each web app.
The primary category determines where your app appears in the store (the secondary category isn't
used to display your app).

Each category is organized into logical groups. The store displays your web app under the group
heading and in the filtered category. If no category matches your web app, you can select 'Other';
the store will only display your web app under the group heading. For example, if you choose
"Developer Tools" within the Productivity group, your app appears in the store under both the
Productivity and Developer Tools lists. Alternatively, if you choose "Other", your app appears in
the Productivity list only.

You can also list additional categories or keywords to describe your app. These may be used to
improve search relevance in the future, or to influence future versions of the category list. The
following list describes the categories that you can choose for your web app. The categories might
change; if that happens, your web app might be recategorized.

<table>
  <thead>
    <tr>
      <th>Group</th>
      <th>Categories</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Business Tools</td>
      <td>
        Accounting & Finance<br>
        Admin & Management<br>
        ERP & Logistics<br>
        HR & Legal<br>
        Marketing & Analytics<br>
        Sales & CRM
      </td>
      <td>Apps to help businesses run successfully.</td>
    </tr>
    <tr>
      <td>Education</td>
      <td>
        Academic Resources<br>
        Family<br>
        Foreign Languages<br>
        School Administration<br>  
        Teacher Tools<br>
        Test Preparation
      </td>
      <td>Apps that teach the user something or can be helpful in a classroom environment.</td>
    </tr>
    <tr>
      <td>Entertainment</td>
      <td>
        Books<br>
        Music<br>
        Online Video<br>
        Photos<br>
        Radio<br>
        TV & Movies
      </td>
      <td>
        All leisure apps except for games.<br>
        <b>Note</b>: An app can be in either Entertainment or Games, but it should never be in both.
      </td>
    </tr>
    <tr>
      <td>Games</td>
      <td>
        Action & Adventure Games<br>
        Arcade Games<br>
        Board Games<br>
        Card Games<br>
        Educational Games<br>
        Puzzle Games<br>
        Role Playing Games<br>
        Sports Games<br>
        Strategy Games<br>
        Virtual Worlds
      </td>
      <td>All kinds of games that users can play. Also see Education and Entertainment.</td>
    </tr>
    <tr>
      <td>Lifestyle</td>
      <td>
        Astrology<br>
        Fashion<br>
        Food<br>
        Health & Fitness<br>
        Money<br>
        Religion<br> 
        Shopping<br>
        Travel
      </td>
      <td>Apps for everyday life.</td>
    </tr>
    <tr>
      <td>News & Weather</td>
      <td>
        Blogs<br>
        Magazines<br>
        News Aggregators<br>
        Newspapers<br>
        Social News<br>
        Sports<br>
        Weather Forecasts
      </td>
      <td>Apps that feature news about current events or weather.</td>
    </tr>
    <tr>
      <td>Productivity</td>
      <td>
        Calendar & Scheduling<br>
        Creative Tools<br>
        Design Essentials<br> 
        Developer Tools<br>
        Office Applications<br>  
        Online Documents & File Storage<br>
        Search & Browsing Tools<br>
        Task Management
      </td>
      <td>
        Apps that someone might spend a significant amount of time using to get something done. 
        Also see Utilities.
      </td>
    </tr>
    <tr>
      <td>Social & Communication</td>
      <td>
        Blogging<br>
        Chat & IM<br>
        Dating<br>
        Email & Contacts<br>
        Phone & SMS<br>
        Social Networking
      </td>
      <td>Apps that help people communicate with each other.</td>
    </tr>
    <tr>
      <td>Utilities</td>
      <td>
        Alarms & Clocks<br>
        Bookmarks<br>
        Calculators<br>
        Dictionaries<br>
        Notepads
      </td>
      <td>Useful apps that have a narrower scope than the ones in the Productivity category.</td>
    </tr>
  </tbody>
</table>

[1]: /docs/apps
[2]: /docs/webstore/launching#pre-launch-checklist
[3]: /docs/webstore/identify_user
[4]: /docs/webstore/check_for_payment
[5]: /docs/webstore/check_for_payment#cache
[6]: #top
[7]: /docs/webstore/branding
[8]: /docs/webstore/images
[9]: #top

---
layout: 'layouts/blog-post.njk'
title: Richer UI install available for desktop
description: Mobile devices and app stores have changed how users discover, evaluate, and install software. Web apps now offer a surface for developers to highlight their apps at install time.
date: 2023-04-20
authors:
  - ajara
tags:
  - capabilities
  - progressive-web-apps
hero: 'image/SeARmcA1EicLXagFnVOe0ou9cqK2/zedzgz8xUD3nFNv1HPQQ.jpg'
alt: 'Person using a large screen device and a cup of coffee'
---

Users typically get apps, especially platform apps, through app stores, or through downloading a package and installing it. Today even the desktop experience is shifting towards offering apps in centralized stores.

For web apps the model is different: users don’t have to visit a centralized app depot to get a web app, by design, not all web experiences are installable, installing an app can differ between platforms and browsers, browsers even have different menus and surfaces to install the app. Once the user clicks on that install option the default dialog doesn’t include any extra information, as shown below:

<figure>
{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/y5sNbIN19bPNbqni3xay.png", alt="The browser default install dialog for desktop.", width="556", height="781" %}
 <figcaption>
    Default install dialog on desktop.
  </figcaption>
</figure>

<figure>
{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/yshUdzH27Gm1Rzdj9s8O.png", alt="The  browser default install dialog for mobile.", width="385", height="676" %}
 <figcaption>
    Default install dialog on mobile.
  </figcaption>
</figure>

Creating web apps that can be installed and provide the same interactions as platform apps, requires technical work to enable such experiences along with good guidance for users to take advantage of this different install flow.

With the Richer Install UI web developers have a new opportunity to give their users specific context about their app at install time. This UI is available for [mobile from Chrome 94](/blog/richer-pwa-installation/) and for desktop from Chrome 108. While Chrome will continue to offer the simple install dialogs for installable apps, this bigger UI gives developers space to highlight their web app. It also makes the install process more familiar because it is similar to the dialogs from app stores.

<figure>
  {% Img src="image/vvhSqZboQoZZN9wBvoXq72wzGAf1/5SlCnibmZHqkXdGVgPZY.jpeg", alt="Screenshots of Richer Install UI on desktop and mobile.", width="800", height="386" %}
  <figcaption>
    Richer installation UI on desktop and mobile.
  </figcaption>
</figure>

## Enabling Richer Install UI {: #enable-richer-iui }

To display the Richer Install UI dialog developers need to add at least one screenshot for the corresponding form factor in the `screenshots` array. The `description` field is not required but it is recommended, The content dialog is built with the content of these two fields, making the experience more similar to app store install. This helps users identify they are adding an app to their device, and with more space available developers can provide specific context to their users at install time.

For example developers can use the `description` field to highlight the app’s features that incentivize the user to keep it in their devices. With the `screenshots` they can present the look and feel of the web app as a standalone, with all the easy access that platform apps have.

For a detailed specification and a guide to add them to your app visit the [Richer Install UI pattern](https://web.dev/patterns/advanced-apps/richer-install-ui/).

The older style of install prompt provided little information and context. This didn't match users' expectations of what installation means and could leave them confused about what happened. Many declined the install request entirely, which was also bad for the businesses that built them.

Richer installs let you create experiences more like those on operating systems.

You can build your own by following the example from the Squoosh app [manifest file](https://squoosh.app/manifest.json) and you can try the dialog live at: [https://squoosh.app/](https://squoosh.app/).

Feedback
We're considering other options for richer installs including categories and app ratings. To make that decision, we need your feedback.
Tell us about the design
Is there something about Richer Installs UI that doesn't work as you expected? Or is there specific data that you need to implement your idea? Have a question or comment? Fill out [this form](https://forms.gle/7sXrpQwDbLuaZVzN7)

{% Aside 'caution' %}
This is an experimental UI, and could change in the future depending on developer, user, and partner feedback. We are planning to expand the UI to more clearly manage users' expectations around what installation means, and to provide users with additional signals for making a well informed decision regarding installing a particular application.
{% endAside %}

Photo by [Kaboompics .com](https://www.pexels.com/photo/man-using-stylus-pen-for-touching-the-digital-tablet-screen-6335/) on [Pexels](pexels.com)

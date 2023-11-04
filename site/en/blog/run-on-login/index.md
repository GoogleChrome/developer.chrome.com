---
layout: 'layouts/blog-post.njk'
title: Automatically start PWAs on OS Login
subhead: |
  Installed PWAs can now be configured to run on login.
authors:
  - ajara
date: 2021-08-02
updated: 2022-03-30
description: |
   Many operating systems offer the ability to launch applications automatically when the user logs in. This ability is now available for installed web applications.
hero: image/SeARmcA1EicLXagFnVOe0ou9cqK2/e5ATqM7ge5Y3Sxdqf1T8.jpg
alt: Laptop, coffee, and stationary tools on desk.
tags:
  - progressive-web-apps
---
Run on login lets the user choose which applications start
automatically when they first log into their computer. This ability has been
available in many operating systems for a long time, but was reserved for
platform specific applications. Now it is available for installed web applications too.

## Save users time

Users want to automatically run a set of applications they always use.
Typical examples include high-engagement applications like email clients, chat apps,
monitoring dashboards, and real-time data display apps, to name just a few.

Auto-starting these apps at login streamlines the user experience by saving
users from having to find these apps to launch in menus.

Which applications the user wants to start automatically will vary from user
to user. That is why it is important that installed web applications have this
ability as well.

## Add a PWA to run on login

Run on login is available in Chrome 91 or Edge 91 or later, on Windows, Linux,
and MacOS. To configure an app to run on login, visit `about://apps`, right
click on the app you want, and select 'Start app when you sign in'.

{% Img src="image/SeARmcA1EicLXagFnVOe0ou9cqK2/onZ3RWUAzuD8KSSvyu5x.png",
alt="Squoosh app with right click menu open and the option to start app when
you sign in selected", width="637", height="378" %}

{% Aside %}
Currently there is no configuration that developers can use to enable
run on login from their apps. We are researching a way to implement this
functionality in the future.
{% endAside %}

Run on login is a useful step in giving users a web experience that is truly
integrated on their choice of operating system. Developers can add the steps
above to their UI to encourage users to enable their apps to start
automatically on login.

Photo by [Lauren Mancke](https://unsplash.com/@laurenmancke) on
[Unsplash](https://unsplash.com/)

---
layout: "layouts/blog-post.njk"
title: Using the web app manifest to specify a site wide theme color 
description: >
    Set a theme-color in the manifest and have it available to all pages on your site when launched from the home screen.
authors:
  - paulkinlan
date: 2015-08-28
updated: 2018-07-31
---

Chrome introduced the concept of a theme color for your site in 2014. The theme color
is a hint from your web page that tells the browser what color to tint
 [UI elements such as the address bar](https://developers.google.com/web/fundamentals/design-and-ux/browser-customization/).  
 
For example, below is this site with and without the theme color applied.


<figure>
    {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/FgugTusudfxtc55BtWWw.png", alt="Theme color", width="800", height="614" %}
    <figcaption>Theme color</figcaption>
</figure>



The problem is that you have to define the theme color on every single page and if 
you have a large site or legacy site then making a lot of site wide changes is not
always feasible.

Starting in Chrome 46 (Beta September 2015), adding in a `theme_color` attribute 
to your manifest will have the effect of applying the color automatically 
to every page the user visits on your domain when the site is launched from the home screen.  

If you page already has a theme-color meta tag &mdash; for example `<meta name="theme-color" content="#2196F3">` &mdash;
then the page level configuration will be used instead of the value in the manifest.

Simply add in the `theme_color` attribute to your manifest and specify an HTML color.

```html
    "theme_color": "#2196F3"
```   

To see this in action, visit <a href="https://airhorner.com">Airhorner &mdash; the worlds best airhorn</a> 
and add it to your home screen. Or look at the <a href="https://airhorner.com/manifest.json">site's manifest</a>.

## FAQ

* **Does this apply if my site is not launched from the home screen?** <br>
  Yes.
* **Will it ever apply to my entire site, say when they user is just browsing?** <br>
  Unlikely at the moment, to do that it would mean that the browser would have to download the manifest
  a lot more frequently and currently it is low priority asset.  This is intended to be parsed when 
  the user adds the site to the home screen.



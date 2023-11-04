---
layout: 'layouts/blog-post.njk'
title: Introduction to Chrome Developer Tools, part one
authors:
  - sethladd
date: 2010-06-18
updated: 2013-10-29
---

{% Aside 'warning'%}
This article is outdated and no longer accurate. Find [up-to-date information about Chrome DevTools](http://devtools.chrome.com) in the official docs.
{% endAside %}

## Introduction
  
Google Chrome is a rich and powerful web browser, pioneering what is possible for applications on the web.  Google has worked hard to deliver a very fast, very stable, feature rich browsing experience for end users.  Google has also ensured that developers like you have a great experience with Chrome.  The Developer Tools, bundled and available in Chrome and Safari, allows web developers and programmers deep access into the internals of the browser and their web application.


The Developer Tools are part of the open source Webkit project.  Most of the discussion in this article applies to both Google Chrome
and Safari.  However, the screenshots were taken using Google Chrome 6, so there may be slight differences in your browser.


In this article, we will take an overview tour of Developer Tools and point out its most popular, and useful, features.  Our target audience are web developers who did not know of, or have not yet investigated, the Developer Tools.  However, we are sure that even if you are an experienced web developer, you will pick up a tip or two.


If your instance of Developer Tools does not quite match the screenshots found in this article, we recommend you upgrade to 5 so you may follow along and gain access to all of the features described here.
  
## Overview 
Overall, there are eight main groups of tools available view Developer Tools, and the capabilities are being extended with every release.  Chrome 5 now offers Elements, Resources, Scripts, Timeline, Profiles, Storage, Audits, and Console.
  
### Elements

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/NNKcq5vIVn4FP0ikoPAh.png", alt="Elements tab.", width="725", height="73", class="screenshot" %}
<figcaption>Elements tab</figcaption>
</figure>

The Elements tool allows you to see the web page as the browser sees it.  That is, using the Elements tool, you can see the raw HTML, raw CSS styles, the Document Object Model, and manipulate either in real time.

### Resources

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/7ayVb82VHdpiKrjG1eUw.png", alt="Resources tab.", width="725", height="79", class="screenshot" %}
<figcaption>Resources tab</figcaption>
</figure>

Use the Resources tool to learn what components your web page or application is requesting from web servers, how long these requests take, and how much bandwidth is required.  You can also view the HTTP request and response headers for each of your resources.  The Resources tool is perfect for helping you speed up page load times. 

### Scripts

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Ne9hzqqi3yY5AHpJrhmT.png", alt="Scripts tab.", width="725", height="70", class="screenshot" %}
<figcaption>Scripts tab</figcaption>
</figure>

To peer inside the JavaScript for a page, you will use the Scripts tool.  Here you can find a list of scripts required by the page plus a full featured script debugger.  You can even change the JavaScript on the fly!

### Timeline

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/M8k0Ru9ruGkd32Lkz7WL.png", alt="Timeline tab.", width="725", height="68", class="screenshot" %}
<figcaption>Timeline tab</figcaption>
</figure>

For advanced timing and speed analysis, the Timeline tool offers in-depth visibility into the various Chrome behind-the-scenes activities.  You can learn how long the browser takes to handle DOM events, rendering page layouts, and paint the window.

### Profiles

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Wck351xNu8TTmfcvZdiy.png", alt="Performance tab.", width="725", height="72", class="screenshot" %}
<figcaption>Performance tab</figcaption>
</figure>

The Profiles tool helps you capture and analyze the performance of JavaScript scripts.  For example, you can learn which functions take the most time to execute and zero in on exactly where to optimize. 

### Storage

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/AXfrz2ecp2FHpnXgKIkk.png", alt="Storage tab.", width="725", height="73", class="screenshot" %}
<figcaption>Storage tab</figcaption>
</figure>

Modern web applications require more persistence than simply cookies, and the Storage tool helps you track, query, and debug local browser storage.  This tool can display and query data stored in local databases, local storage, session storage, and cookies.

### Audit
<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/QxcG8luazSzM5ym3MICh.png", alt="Audit tab.", width="725", height="68", class="screenshot" %}
<figcaption>Audit tab</figcaption>
</figure>

The Audit tool is like having your own web optimization consultant sitting next to you.  This tool can analyze a page as it loads and provide suggestions and optimizations for decreasing page load time and increase perceived (and real) responsiveness.  

### Console

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/vl6x8x05Oqp76RMUylUm.png", alt="Console tab.", width="725", height="76", class="screenshot" %}
<figcaption>Console tab</figcaption>
</figure>

Last but definitely not least, the Developer Tools offers a full featured Console.  From the Console, you can enter arbitrary JavaScript and programmatically interact with your page.  

## Starting Up

It's easy to start the Developer Tools while inside Chrome.

For any operating system, you can simply right-click on any element in the page and select the "Inspect Element" option from the context menu. This will open the Developer Tools and drill right to the element you clicked on.

To see this in action, visit [http://www.google.com](http://www.google.com) in Chrome Browser. Right click on the Google logo, and you will see the following options:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/UyoYHBNqm7ytz8y6ilUs.png", alt="Opening the inspector.", width="725", height="367", class="screenshot" %}
<figcaption>Opening the inspector</figcaption>
</figure>

Selecting "Inspect Element" will bring up the Developer Tools, which should look like the following:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Ksle8M7lS5gYSgBKPywV.png", alt="Inside the element inspector.", width="725", height="301", class="screenshot" %}
<figcaption>Inside the element inspector</figcaption>
</figure>

Notice how the Developer Tools opened inside of the Elements tab and automatically drilled down to, and highlighted, the `<img>` tag for the Google logo. This is very useful when you are curious which HTML generated a particular page element.

You may also open the Developer Tools with a simple keyboard shortcut. Depending on your operating system, try the following:

- On Windows and Linux, select the `Control-Shift-J` keys.
- On Mac, select the `Command-Option-J` keys.

Finally, you can choose to open the tools from the main browser menu.

On a Mac, and from the main application menu bar, select View, Developer, Developer Tools.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/JXGhmP1fZ4tpr81HbYBU.png", alt="Opening the Dev Tools on Mac.", width="725", height="334", class="screenshot" %}
<figcaption>Opening the Dev Tools on Mac</figcaption>
</figure>

On a Windows PC, you should use the Page menu at the top right, and select Developer, Developer Tools.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ELaMlQIbubqiULftsxbA.png", alt="Opening the Dev Tools on Windows.", width="725", height="475", class="screenshot" %}
<figcaption>Opening the Dev Tools on Windows</figcaption>
</figure>

Now that you have the Developer Tools open and ready, let's begin by exploring the elements on Google's homepage.

## Elements

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ToJk8wD5e36uaMb5qqd8.png", alt="Selecting the Elements tab.", width="725", height="76", class="screenshot" %}
<figcaption>Selecting the Elements tab</figcaption>
</figure>

The first tab in the Developer Tools is Elements. This is your window into the structure of the web page, presented as your browser sees it.

### DOM Browsing

You will often visit the Elements tabs when you need to identify the HTML snippet for some aspect of the page. For example, you may be curious if an image has an HTML id attribute, and what that attribute's value is.

The Elements tab is sometimes a better way to "view source" for a page. Inside the Elements tab, the page's DOM will be nicely formatted, easily showing you HTML elements, their ancestry and their descendants. Too often, pages you visit will have minified or simply ugly HTML which makes it hard to see how the page is structured. The Elements tab is your solution for viewing the real underlying structure of the page.

For example, the following is the output from the "view source" of the Google homepage.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/NDSmvn0pJhChRLXtGZwz.png", alt="Google.com's minified source.", width="725", height="494", class="screenshot" %}
<figcaption>Google.com's minified source</figcaption>
</figure>

It's hard to read the above source because it is optimized and minified. The format is good for clients and servers but difficult for developers!

Instead, when you want to read the source of a page, use the Elements Tab to view a pretty-printed, syntax highlighted element hierarchy.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/RcpX929FGRmP8un3Ln3Y.png", alt="The Elements inspector pretty printers HTML.", width="725", height="395", class="screenshot" %}
<figcaption>The Elements inspector pretty printers HTML</figcaption>
</figure>

The Elements tab also allows you to browse, interact, and sometimes even change the Styles, Metrics, Properties, and Event Listeners for any element on the page.

### Styles Browsing

The cascading nature of CSS makes the Styles browser in the Elements tab very useful. Sometimes, styles collapse onto themselves and unintended visuals appear. Knowing which
styling rule the browser is applying to the element helps you debug such an issue.

Clicking on any element in the Elements tab will display all the styles attached to that element.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/vhnLv2jQ4fmvCxnh18YY.png", alt="CSS styling in the inspector.", width="725", height="229", class="screenshot" %}
<figcaption>CSS styling in the inspector</figcaption>
</figure>

You'll see in the screenshot above, that we're able to tell all the style attributes that are being applied. For example, the padding comes directly from the `<img>` element's style attribute. The width and height, however, come from their respective native attributes. Interestingly, you can tell there are styles also inherited from the `<center>` tag, the `<body>` tag, and others.

While it's great to see the individual styles and where they come from, it's also very useful to see the final set of styles after it is computed and applied to the element. You can see the final product by selecting the Computed Style menu, as shown in the screenshot below.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Cn9gF11ETKBsqqSVVjks.png", alt="Browser computed styles are also displayed.", width="725", height="227", class="screenshot" %}
<figcaption>Browser computed styles are also displayed.</figcaption>
</figure>

Next, we'll take a brief look at the other features provided by the Elements Tab. We'll cover the following in more detail in future articles.

### Box Model

You can see the box model as it is applied to the selected element by selecting the Metrics menu:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/bGAPFtsOFUqHH577rFty.png", alt="Viewing an element's box model.", width="725", height="245", class="screenshot" %}
<figcaption>Viewing an element's box model</figcaption>
</figure>

### Element Properties

You can see all of the properties of the element, as JavaScript and the DOM would see it, by selecting the Properties menu:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/9uE08sclGYq2xepE7Qxo.png", alt="Viewing DOM Element properties.", width="725", height="241", class="screenshot" %}
<figcaption>Viewing DOM Element properties.</figcaption>
</figure>

### Event Listeners

And finally, you can even see the event listeners attached to, or that bubble through, the element via the Event Listeners menu:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/rwiHwPujltQ6d2AgoIN4.png", alt="Viewing DOM Element event listeners.", width="725", height="218", class="screenshot" %}
<figcaption>Viewing DOM Element event listeners.</figcaption>
</figure>

### Summary

There is a lot of functionality available via the Elements Tab, and future articles will dive deeper into the individual menus.

You should use the Elements Tab when you want to see how the page looks to the browser itself. Common problems such as "how is this style computed?" or "what HTML tags generated this component?" are quickly and easily answered via the Elements Tab.

Think of the Elements Tab like an uber-"view source", and gain very sharp visibility into your page.

After you've investigated the page, you might be wondering how HTML, CSS, and images got there in the first place. The Resources Tab, described next, shows you how the client browser and web server communicate to send over those resources.

## Resources

Once your application is functioning, your next step should be to optimize the network and bandwidth performance. You should aim to make the transfer of your application, from server to client, as fast and as efficient as possible. Your users will thank you for the fast page loads, you'll save money on bandwidth and server resources, and you'll also score better in Google's search result ranks (which now take into account site speed).

The Resources Tab in Developer Tools is your window into the communication between web server and client browser. You are able to see all of the resources requested by the browser (this is always very surprising!), the time it takes to receive them from the server, and how much bandwidth is used during the transfer.

Ironically, running the Resources Tab affects page load performance, so it is disabled by default. The first time you access the functionality, you will need to enable it for the page you are viewing.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/DEIxGvRKuK1sbNiNUDE0.png", alt="Enabling resources tracking.", width="725", height="322", class="screenshot" %}
<figcaption>Enabling resources tracking.</figcaption>
</figure>

I recommend you leave the default "Only enable for this session" selected, as you do not want to needlessly incur the small performance penalty. Once you click "Enable resource tracking", the page will reload, and the Developer Tools will monitor and display the resources sent from the server.

The following screenshot shows the resources required, and loaded for, the Google homepage.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Emi9QXfJRGv28QmqZYbA.png", alt="Google.com's resource tracking.", width="725", height="305", class="screenshot" %}
<figcaption>Google.com's resource tracking.</figcaption>
</figure>

There's a lot of information on this screen, so let's take it piece by piece.

The default behavior is to show you how long it took to request and load all resources for the page. Scrolling down the Resources list may surprise you, as you may not know how many individual requests are being made by the client. A high number of requests from the client can severely impact performance. Gaining visibility as to what exacted is requested is the first step to optimization and eventual reduction of resources.

If you are interested in just images or style sheets, you can filter the resource type using the menu directly under the main tab window.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/j4WNmC3gMRLaPLU6FEu6.png", alt="Viewing only image resources.", width="725", height="251", class="screenshot" %}
<figcaption>Viewing only image resources.</figcaption>
</figure>

You'll also learn the order in which the resources are requested. Using the timeline display, you may gain a better understanding of why certain elements on your page show up later than others.

After you gain an overview of all the requested resources, and how they compose the entire request timeline, you'll want to drill down to individual resources.

If you notice that some resources are being requested every time you access the page, that is a sign that your caching headers are not configured correctly. You can view all of the headers for a resource by clicking on the resource in the left hand list.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/LgQlysHSsOVPMp9d7q0b.png", alt="Viewing request headers.", width="725", height="295", class="screenshot" %}
<figcaption>Viewing request headers.</figcaption>
</figure>

Use the Headers display to ensure the expected HTTP Response Code is set and the appropriate headers are provided. For example, if the resource is rarely or never changed, your server should set an Expires header for far into the future. This will tell the browser that the resource shouldn't be requested again until that date. This reduces the amount of HTTP connections required for your page, thus speeding up your site.

### Summary

There is a lot more to the Resources tab, which we will cover in a future article.

Use the Resources Tab to gain visibility into how your client browser is communicating with the web server. Using this information, including request time, request size, and request order, you can make smart optimizations to reduce server load, costs, and increase speed and enhance user experience.

Speed is very important for your web site, your users, and search engines. Once you have the number and size of resources reduced, and the appropriate HTTP conversations occurring, the next step is to investigate and optimize the scripts that are running in your page. Luckily, the Scripts tab, discussed next, does just that.

## Additional Resources

For more information on the Developer Tools, we can recommend the following:

- [Chrome Developer Tools presentation video and slides from Google I/O 2010](http://code.google.com/events/io/2010/sessions/chrome-developer-tools.html)
- [Chrome Developer Tools Tutorial](http://www.chromium.org/devtools/google-chrome-developer-tools-tutorial)

And of course, stay tuned to html5rocks.com for Part 2 of this article, along with lots of other great HTML5 and Chrome content.


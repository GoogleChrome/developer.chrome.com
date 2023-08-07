---
layout: layouts/doc-post.njk
title: What are cookies?
subhead: >
  What are cookies and what role do they play in the web ecosystem
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - nmichell
  - albertomedina
---

## Stateless HTTP

The Hypertext Transfer Protocol (HTTP), is a stateless protocol. This means that it does not retain any information or "state" between individual requests; each request from a client to a server is treated in isolation. This property of HTTP has played a crucial role in the design and functioning of web applications in terms of simplicity, scalability, and efficient resource utilization.

## The birth of web cookies

In the early 1990s, a visionary developer named [Lou Montulli](https://en.wikipedia.org/wiki/Lou_Montulli) working at Netscape, faced a significant challenge while he was working on creating an online shopping cart for a client company. The absence of a state management mechanism to save user selections as they navigated across web pages resulted in a bad online shopping experience.

Lou adapted an existing technique called ["magic cookies"](https://en.wikipedia.org/wiki/Magic_cookie), which allowed data exchange between computer programs to maintain state during communications, Lou devised an ingenious solution, to tackle the shopping cart problem. This way, the browser was given the ability to "remember" the items users had selected, even as they explored different pages on the website. This work soon found its way into the fabric of the Netscape browser, and paved the way for what we now today know as web cookies.

{% Aside 'important' %}
An HTTP cookie is a mechanism for an origin server to send state information/state to a user agent and for the user agent to return the state information to the origin server. Cookies enable the stateless HTTP Protocol to “remember” stateful information.
{% endAside %}

Web cookies emerged as a transformative element, revolutionizing how websites interacted with users and laid the foundation for modern web personalization and user experience.

## Application Scenarios

As a state management mechanism, cookies enable a wide range of applications in many areas that are at the core of the usefulness and success of the web.

<table class="with-borders">
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>Session management</td>
    <td>Logins, shopping carts, game scores, etc.</td>
  </tr>
  <tr>
    <td>Personalization</td>
    <td>User preferences, themes, and other settings, Ad targeting.</td>
  </tr>
  <tr>
    <td>User Tracking</td>
    <td>Single site/device and across sites/devices, Ad measurement and attribution, Analytics.</td>
  </tr>
</table>

## Classification of cookies

Cookies can be classified in different ways. It is important to note that cookie categories have everything to do with how cookies are used, and nothing to do with the cookies themselves. A cookie is a cookie, and it can belong to different categories depending on the use case.

The Information Commissioner's Office (ICO) in the UK defined a set of categories for web cookies based on their purpose:

<table class="with-borders">
  <thead>
    <tr>
      <th>Category</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tr>
    <td>Strictly Necessary</td>
    <td>
      <ul>
        <li>Essential for navigating and using a website.</li>
        <li>Typically used for things like accessing secure areas of the site and remembering items in a shopping cart.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Performance</td>
    <td>
      <ul>
        <li>Track how users interact with a website, such as which pages are visited most frequently and whether users encounter any errors.</li>
        <li>Typically used for analytics purposes.</li>
      <ul>
    </td>
  </tr>
  <tr>
    <td>Functional</td>
    <td>
      <ul>
        <li>Enable personalized experiences via user preferences such as language, font, etc.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Targeting/Ads</td>
    <td>
      <ul>
        <li>Track users across websites, building a profile of their interests and preferences.</li>
        <li>Used to deliver relevant  ads to users based on their browsing behavior and interests.</li>
      </ul>
    </td>
  </tr>
</table>

And there are other ways to classify cookies, according to their specific configuration:

<table class="with-borders">
  <thead>
    <tr>
      <th>Category</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>Lifecycle</td>
    <td>
      <ul>
        <li><b>Session:</b>Temporarily stored until browser is closed.</li>
        <li><b>Persistents</b>Created with expiry date.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Role</td>
    <td>
      <ul>
          <li><b>Tracking:</b> Track user activity across websites. </li>
          <li><b>Social media:</b> Track usage of social media widgets.</li>
          <li><b>Analytics:</b> Collect anonymous website usage data.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Scope</td>
    <td>
      <ul>
          <li><b>First-party (1P):</b> Created and used exclusively by a given domain.</li>
          <li><b>Third-party (3P): </b> Created by domains different from a given website being visited.</li>
          <li><b></b></li>
      </ul>    
    </td>
  </tr>
  <tr>
    <td>Security</td>
    <td>
      <ul>
          <li><b>Secure cookies:</b> Only transmitted over HTTPS, and their values are encrypted.</li>
          <li><b>HTTPOnly cookies:</b> Prevents access from scripts, protecting against cross-site scripting (XSS) attacks.</li>
      </ul>    
    </td>
  </tr>
</table>

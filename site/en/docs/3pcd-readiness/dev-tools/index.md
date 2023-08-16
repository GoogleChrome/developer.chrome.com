---
layout: layouts/doc-post.njk
title: Chrome DevTools
subhead: >
  .
description: ''
date: 2023-07-26
updated: 2023-07-26
authors:
  - albertomedina
---

Chrome DevTools is a set of web development tools built directly into the Chrome browser, providing developers with a powerful set of tools to inspect, debug, and profile their web pages and web applications.

## Debugging Cookies with Chrome and DevTools

### Inspect Cookies

1. Open DevTools by pressing Ctrl+Shift+I (or Cmd+Option+I on Mac).
1. Go to the Application tab.
1. In the sidebar, under the Storage section, you'll see Cookies. Click on it, and it will show all the cookies for the current site. You can inspect which are marked as SameSite and which ones might be affected by 3P cookie policies.

### Clear Cookies

1. On your computer, open Chrome.
2. At the top right, click More More and then Settings Settings.
3. Click Privacy and security and then Cookies and other site data.
4. Click See all site data and permissions and then Clear all data.
5. To confirm, click Clear.

### Allow or Block Cookies

1. On your computer, open Chrome.
2. At the top right, click More More and then Settings Settings.
3. Under "Privacy and security," click Cookies and other site data.
4. Select an option:

- Allow all cookies.
- Block all cookies (not recommended).
- Block third party cookies in Incognito.
- Block third-party cookies.

If you block third-party cookies, all cookies and site data from other sites are blocked, even if the site is allowed on your exceptions list.

## References

To learn more about DevTools features you can use to investigate third-party cookies check out:

- Chromium.org [guidance](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox/third-party-cookie-phaseout/).
- Chrome DevTools [documentation](/docs/devtools/)

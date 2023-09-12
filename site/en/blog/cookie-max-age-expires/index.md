---
layout: 'layouts/blog-post.njk'
title: Cookie Expires and Max-Age attributes now have upper limit
subhead: >
  As of Chrome release M104 (August 2022) cookies can no longer set an expiration date more than 400 days in the future.
description: >
  As of Chrome release M104 (August 2022) cookies can no longer set an expiration date more than 400 days in the future. 
date: 2023-01-12
authors:
  - arichiv
---


As of Chrome release [M104 (August
2022)](https://chromiumdash.appspot.com/schedule) cookies can no longer set an
expiration date more than 400 days in the future.

This change does not impact session cookies—cookies that do not explicitly set
an expiration date with `Max-Age` or `Expires`—as these are instead cleared when
the browsing session ends.

With this change, Chrome caps the expiration date to the maximum allowed value:
400 days from the time the cookie was set. Cookies that request an expiration
date further out than 400 days aren't rejected; their expiration date is set to
400 days instead.

## Example

For example, consider a cookie set on Sunday, January 1, 2023:

<table>
  <thead>
    <tr>
      <th>Cookie</th>
      <th>Requested expiration</th>
      <th>Days in future</th>
      <th>Over 400 days?</th>
      <th>Effective expiration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> 
Name=Value; Expires=Mon, 1 Jan 2024 00:00:00 GMT</td>
      <td> 
Jan 1, 2024</td>
      <td> 
365</td>
      <td> 
No</td>
      <td> 
Jan 1, 2024</td>
    </tr>
    <tr>
      <td> 
Name=Value; Max-Age=1704085200</td>
      <td> 
Jan 1, 2024</td>
      <td> 
365</td>
      <td> 
No</td>
      <td> 
Jan 1, 2024</td>
    </tr>
    <tr>
      <td> 
Name=Value; Expires=Mon, 5 Feb 2024 00:00:00 GMT</td>
      <td> 
Feb 5, 2024</td>
      <td> 
400</td>
      <td> 
No</td>
      <td> 
Feb 5, 2024</td>
    </tr>
    <tr>
      <td> 
Name=Value; Max-Age=1707109200</td>
      <td> 
Feb 5, 2024</td>
      <td> 
400</td>
      <td> 
No</td>
      <td> 
Feb 5, 2024</td>
    </tr>
    <tr>
      <td> 
Name=Value; Expires=Tues, 6 Feb 2024 00:00:00 GMT</td>
      <td> 
Feb 6, 2024</td>
      <td> 
401</td>
      <td> 
Yes</td>
      <td> 
Feb 5, 2024</td>
    </tr>
    <tr>
      <td> 
Name=Value; Max-Age=1707195600</td>
      <td> 
Feb 6, 2024</td>
      <td> 
401</td>
      <td> 
Yes</td>
      <td> 
Feb 5, 2024</td>
    </tr>
    <tr>
      <td> 
Name=Value; Expires=Wed, 1 Jan 2025 00:00:00 GMT</td>
      <td> 
Jan 1, 2025</td>
      <td> 
731</td>
      <td> 
Yes</td>
      <td> 
Feb 5, 2024</td>
    </tr>
    <tr>
      <td> 
Name=Value; Max-Age=1735707600</td>
      <td> 
Jan 1, 2025</td>
      <td> 
731</td>
      <td> 
Yes</td>
      <td> 
Feb 5, 2024</td>
    </tr>
  </tbody>
</table>

## Extending cookie expiration

Want to keep your cookie alive for longer than 400 days? Developers have the
ability to extend the expiration any time the user visits the site again: by
setting a new cookie with the same name. Note that cookies may be deleted before
the expiration date for many reasons (for example, the user can manually clear
their cookies or the
[per-domain cookie limit is exceeded](https://source.chromium.org/chromium/chromium/src/+/main:net/cookies/cookie_monster.h;drc=846230354777b3966f816e4a8392692bbf326c47;l=119)).

## Why was this limit added?

Before this limit was added, cookies could expire millennia in the future. With
this change, we hope to strike a better balance between user expectations and
convenience. 400 days was chosen as it's a bit over 13 months. This enables
sites visited around once a year to retain their cookies.

## Learn more

This change is part of the
[draft cookies standard](https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-the-expires-attribute)
and further details can be found on [Chrome Platform
Status](https://chromestatus.com/feature/4887741241229312). Both
[Mozilla](https://github.com/mozilla/standards-positions/issues/592) and
[WebKit](https://lists.webkit.org/pipermail/webkit-dev/2022-January/032096.html)
had positive feedback for the 400 day limit, though neither has implemented as
of writing.
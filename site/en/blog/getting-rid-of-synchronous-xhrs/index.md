---
layout: 'layouts/blog-post.njk'
title: Getting rid of synchronous XHRs
description: >
  Heads up! The XMLHttpRequest2 spec was recently changed to prohibit sending a synchronous request when XMLHttpRequest.responseType is set.
authors:
  - ericbidelman
date: 2012-01-25
updated: 2020-08-11 

---

{% Aside %}
We expect to [remove support for synchronous use of
`XMLHTTPRequest()` during page unloads](https://www.chromestatus.com/feature/4664843055398912)
in Chrome in version 88, scheduled to ship in January 2021.
{% endAside %}

Heads up! The [XMLHttpRequest2 spec](https://www.w3.org/TR/XMLHttpRequest/) was recently changed to prohibit sending a synchronous request when
`XMLHttpRequest.responseType` is set. The idea behind the change is to help
mitigate further usage of synchronous xhrs wherever possible.

For example, the following code will now throw an `INVALID_ACCESS_ERR` in
developer channel builds of Chrome and FF:

```js
var xhr = new XMLHttpRequest();
xhr.responseType = 'arraybuffer';
xhr.open('GET', '/', false); // sync request
xhr.send();
```

See [WebKit Bug](https://bugs.webkit.org/show_bug.cgi?id=72154), [Mozilla
Bug](https://bugzilla.mozilla.org/show_bug.cgi?id=701787)

{% Aside %}
The ability to parse HTML has also been added to `XMLHttpRequest` but the
caveat is that you can't use it unless you're sending an asynchronous request!
See [HTML in
XMLHttpRequest](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest).
{% endAside %}


Synchronous XHRs are bad for a number of reasons, but MSDN's blog post, "[Why
You Should Use XMLHttpRequest
Asynchronously](https://x443.wordpress.com/2012/12/01/why-you-should-use-xmlhttprequest-asynchronously/)"
has a great explanation of the issues.

This is a generally a great change for the web, but it has the potential to
break some existing apps that were relying on synchronous behavior. Please look
over your XHR code and update it ASAP to use asynchronous requests.

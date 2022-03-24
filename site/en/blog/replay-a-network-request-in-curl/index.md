---
layout: 'layouts/blog-post.njk'
title: Replay a network request in cURL
description: >
  Learn how to debug a network request from the command line.
authors:
  - umarhansa
date: 2015-05-14
updated: 2015-05-18

---

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/KUf5iKIJ3RAmdnLWrBbR.gif", alt="Replay a network request in cURL", width="596", height="398" %}
</figure>

Resources which show up in the network panel have a context menu which allows you to Copy as cURL, this will go into your clipboard at which point you can paste it into the command line, modify if necessary and then see the response. Request headers are also included.

In the example, I'm using: [http://numbersapi.com/#42](http://numbersapi.com/#42)



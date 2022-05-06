---
layout: 'layouts/blog-post.njk'
title: Processing XHR2 file uploads in PHP
description: >
  A server code example to illustrate how to handle file uploads
authors:
  - ericbidelman
date: 2012-04-17
updated: 2019-02-09
---

My article "[New Tricks in XMLHttpRequest2](https://www.html5rocks.com/en/tutorials/file/xhr2/)" has many fine examples, but what it doesn't have is any server code to illustrate how to handle files. If you're curious how to process a file upload using `xhr.send(FormData)`, here's a quick example of an image upload in PHP.

This server is trivial but it demonstrates two things. The first is sending a file and extra payload at the same time. The second is how to grab the file (and other data) in PHP. Lastly, the image is encoded into a `data:` URL and included in a JSON response sent back to the client.

{% Aside %}
The sample has been removed.
{% endAside %}


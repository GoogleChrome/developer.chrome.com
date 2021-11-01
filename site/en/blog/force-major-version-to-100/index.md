---
layout: "layouts/blog-post.njk"
title: "Force Chrome major version to 100 in the User-Agent string"
subhead: >
  A feature flag available from Chrome 96 to 99 enables early testing for 
  possible issues when parsing a three-digit User-Agent string.
description: >
  Chrome version number will soon go from two digits to three,
  which might affect any code that's parsing the User-Agent (UA) string.
  A feature flag available from Chrome 96 to 99 enables early testing by forcing the
  major version number in the UA string to 100.
authors:
  - abeyad
  - miketaylr
date: 2021-11-01
tags:
  - chrome-96
---

In the first half of 2022, Chrome will reach a three-digit major version number:
100!  When browsers first reached version 10 many eons ago,
[lots of issues were discovered](https://maqentaer.com/devopera-static-backup/http/dev.opera.com/articles/view/opera-ua-string-changes/index.html)
with User-Agent parsing libraries as the major version number went from one
digit to two.  Now that we are approaching version 100 in both Chrome and
Firefox, with Edge not far behind, we want to detect possible issues related
to three-digit version number early, so we are ready when it becomes a reality.

Starting in Chrome 96, until Chrome 99, a feature flag will be available to force the User-Agent
string to use the major version number 100, regardless of the actual major version
number. It will apply to both the User-Agent request header and the Javascript
APIs (for example, `navigator.userAgent`). 
[Similar experiments](https://www.otsukare.info/2021/04/20/ua-three-digits-get-ready)
are being run on Firefox as well.

Visit
[Is Chrome 100 yet?](https://is-chrome-100-yet.glitch.me/) to
check if your browser is sending the major version 100 in the User-Agent
string.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/wgcIreb7pCCR94Ce4qjg.png", alt="A site that checks if the browser is sending User-
Agent string 100. It displays: No, because you're reporting as Chrome version 97 and that's under 100.", width="800", height="567" %}

To turn the flag on in Chrome and experiment, type `chrome://flags` in the address bar and enable
the `#force-major-version-to-100` flag.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/5YhXOAvnPVqNL55Nxr7T.png", alt="Chrome flags page showing that forcing major version to 100 in User-Agent is enabled.", width="800", height="567" %}

Visiting
[Is Chrome 100 yet?](https://is-chrome-100-yet.glitch.me/)
after enabling the flag reports that the User-Agent has major version number 100.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/MGCXqOiqbhEF22Dvkgav.png", alt="A site that checks if the browser is sending User-
Agent string 100. It displays: Yes, because you're reporting as Chrome version 100 and that's over 99.", width="800", height="567" %}

The goal is to uncover as many issues as possible ahead of time, so send your
bug reports to
[Web Compat](https://webcompat.com/issues/new?label=version100)
and help prepare the web for three-digit major browser version numbers!

---
layout: "layouts/blog-post.njk"
title: "Select element: now with horizontal rules"
description: "Learn how expanded select element capabilities enable visual horizontal breaks for better grouping."
authors:
  - unakravets
tags:
  - html
  - chrome-119
date: 2023-10-23
---
The select element gets a small but mighty upgrade in Chrome 119, with a feature that also landed in [Safari 17](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/). Now, you can add `<hr>` (horizontal rule) elements into the list of select options and they will appear as separators to help visually break up the options for a better user experience.

{% Img src="image/HodOHWjMnbNw56hvNASHWSgZyAf2/55LrQnjhGNU5h22nq2PK.jpg", alt="Screenshot of before and after with hr in select. The after image has dividers between groups.", width="800", height="811" %}

To achieve this, add `<hr>` elements into the options list as shown in the following HTML:

```html
<label for="major-select">Please select a major:</label> <br/>

<select name="majors" id="major-select">
  <option value="">Select a major</option>
  <hr>
  <option value="arth">Art History</option>
  <option value="finearts">Fine Arts</option>
  <option value="gdes">Graphic Design</option>
  <option value="lit">Literature</option>
  <option value="music">Music</option>
  <hr>
  <option value="aeroeng">Aerospace Engineering</option>
  <option value="biochemeng">Biochemical Engineering</option>
  <option value="civileng">Civil Engineering</option>
  <option value="compeng">Computer Engineering</option>
  <option value="eleng">Electrical Engineering</option>
  <option value="mecheng">Mechanical Engineering</option>
</select>
```
{% Codepen {
  user: 'web-dot-dev',
  id: 'GRzKzVK',
  height: 350,
  tab: 'result'
} %}

Small changes can make a difference to your users. For more information on the future of form controls, including how to make them fully stylable, learn about the [popover API](/blog/introducing-popover-api/) and keep an eye out for the future [selectlist](https://open-ui.org/components/selectlist/) element.

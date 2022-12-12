---
title: >-
  Docs landing - this page type pulls the requested urls from `_data/docs/projects`
  and, while maintaining the groups, provides large icon based links through to them.
description: ''
layout: 'layouts/docs-landing.njk'
type: landing
i18n:
  projects:
    a:
      heading: Project A
    b:
      heading: Project B
    c:
      heading: Project C - a demonstration of what happens when a project has a long title and > 3 children
override:docs:
  projects:
    a:
      - url: devtools
    b:
      - url: devtools
      - url: workbox
    c:
      - url: devtools
      - url: devtools
      - url: devtools
      - url: workbox
      - url: devtools
      - url: devtools
  workbox:
    styles:
      project_icon_color: 'color-project-workbox'
---

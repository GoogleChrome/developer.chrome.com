---
layout: 'layouts/doc-post.njk'
title: Add a doc
description: 'Add a doc to a documentation set.'
date: 2020-10-22
---

## Clone the sample doc

Duplicate the example doc located in `site/en/docs/_example/my-first-doc` and
copy the folder into your existing doc directory.

Rename the folder to match whatever slug you want to use for your doc url. For
example, if you have an existing project at `site/en/docs/cheese` it would look
like this:

```bash
├── docs
│   ├── cheese
│   │   ├── swiss
│   │   │   └── index.md
```

## Add the doc to your project's table of contents

Follow the guide on [adding your doc to an existing project's table of
contents](/docs/handbook/how-to/add-a-project/#configure-the-table-of-contents-for-your-project).


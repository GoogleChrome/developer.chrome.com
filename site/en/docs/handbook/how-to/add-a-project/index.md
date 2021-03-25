---
layout: 'layouts/doc-post.njk'
title: Add a project
description: 'Add a project to the /docs/ section.'
date: 2020-10-22
---

## Clone the example project

Duplicate the example project located in `site/en/docs/_example`. Rename the
folder to match whatever slug you want to use for your project url. This slug
is referred to as the `project-key`.

```bash
.
├── _example
├── extensions
├── handbook
├── cheese # your new project! This will appear at /docs/cheese/
└── index.md
```

## Configure the landing page

Open the `index.md` file at the root of the project directory.

```bash
.
├── cheese
│   ├── cheese.11tydata.yml
│   ├── index.md  # <-- this file!
│   └── my-first-doc
```

Update the `title` and the `description`. These will be displayed on the
`/docs/` and `/docs/[project-key]` pages.

## Add your first doc

The example project comes with a sample doc that you can build off of.
See the guide on [adding a doc](/docs/handbook/how-to/add-a-doc/) for a detailed explainer.

## Configure the table of contents for your project

Create a new folder in the `site/_data/docs/` directory, and name it after your
project.

```bash
├── _data
│   ├── docs
│   │   ├── extensions
│   │   ├── cheese # <-- your project!
│   │   ├── handbook
│   │   └── projects.yml
```

Add a `toc.yml` file to this directory. The `toc.yml` defines the navigation
structure for your project and will appear on the `/docs/[project-key]/` page
as well as in the side navigation when viewing an individual doc.

The `toc.yml` supports these fields:

- `url`—an absolute url path to your doc
- `title`—the title for a subsection in `i18n` path notation (explained below.)
- `sections`—a collection of more urls, nested under a `title`.

```yml
- url: /docs/cheese/what-is-cheese  # a single doc
- title: i18n.docs.cheese.overview # a title for a section of docs
  sections: # a grouping of docs under a title
    - url: /docs/cheese/overview/hard-cheese
    - url: /docs/cheese/overview/soft-cheese
    - url: /docs/cheese/overview/string-cheese
    - title: i18n.docs.cheese.guides
      sections:
        - url: /docs/cheese/overview/guides/melting-cheese
- url: /docs/cheese/the-moon-is-made-of-cheese
```

### Add styles and icon for your project

Add an icon at `site/_static/images/project/[project-key].svg`. This should be
a small SVG rendered in white. See the existing icons for examples.

If you'd like this icon to render on a different color than the default blue,
you can optionally add a peer `styles.yml` to your `toc.yml` file. For example:

```yml
# Color (CSS theme variable) to use for this project page
project_icon_color: 'color-project-handbook'
```

This color will be drawn from `_theme.scss`. (The default color used without a
configuration is `color-project-default`.)

### Add i18n paths for your titles

The title strings used in the `toc.yml` are `magic` ✨ and we need a way to
translate them into other languages. We do this by creating a dictionary in
the `_data/i18n` folder.

If you have `title` fields in your `toc.yml` you will need to create a file
in the `_data/i18n/docs` directory:

```bash
├── i18n
│   ├── docs
│   │   ├── extensions.yml
│   │   ├── cheese.yml # <-- your project!
│   │   └── handbook.yml
```

If you have the title "Overview" you would add it to your `.yml` file like so:

```yml
overview:
  en: 'Overview'
  es: 'Visión General'
```

If you aren't ready to translate your docs yet that's OK!. Just add an `en`
field for now.

Finally, in your `toc.yml`, add the path to this object:

```yml
# toc.yml
- title: i18n.docs.cheese.overview
  sections:
  …
```

## Add your project to the `/docs/` page

Open the `site/_data/docs/projects.yml` file. This file is divided into sections
and will look something like this:

```yml
chrome:
  - url: extensions
tools:
  - url: devtools
```

Each section acts as a heading on the `/docs/` page. If you want your project to
appear under the "Chrome" heading you would add it to the `chrome` section, like
this:

```yml
chrome:
  - url: extensions
  - url: cheese # <-- your project
tools:
  - url: devtools
```

You're done! 😅

Grab yourself a slice of cheese and celebrate by building
the site (`npm run dev`) and looking at those sweet new docs.

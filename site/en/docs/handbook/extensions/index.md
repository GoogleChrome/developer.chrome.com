---
title: Extensions docs
layout: 'layouts/doc-post.njk'
date: 2021-02-02
updated: 2021-02-02
---

## Line wrapping {: #line-wrapping }

Extensions docs are wrapped at 100 characters. New content and updates to existing content must
follow this convention save for the following exceptions:

* The existing page is already wrapped at another offset.
    * You may continue wrapping the document at the current offset.
* Rewrapping would introduce significant noise to a code review.
    * Limiting line wrapping normalization to the text blocks your PR touches.

## Header IDs {: #header-ids }

Header IDs are automatically generated based on the content of the header. This means that renaming
a header will also change the header's ID and break existing links to that header.

To make your documentation more resilient to change, authors should manually headers IDs.

```md
// Do
### Common use cases {: #use-cases }

// Don't do
### Common use cases
```

Header IDs should be short and meaningful. Use descriptive names that unambiguously identify
the content of the section rather than a [kebab cased][kebab-case] version of the header's text
value.

## Link conventions {: #links }

### Footer links

By convention, extensions docs strongly prefer named footer links over inline links. Named links
have a couple of advantages over inline links.

- **Named links are typically shorter.** This makes it much easier to read and
work with the source markdown file. 
- **Named links are easier to maintain.** Authors can edit one link definition and update all uses
of that link links across a given document. 

```md
// Do
Lorem ipsum dolor [sit amet][mdn-global], consectetur adipiscing elit.
Quisque aliquam rutrum pellentesque. Ut tincidunt purus ex, eget 
congue lacus aliquet quis.

[mdn-global]: https://developer.mozilla.org/en-US/docs/Glossary/Global_object

// Don't do
Lorem ipsum dolor [sit
amet](https://developer.mozilla.org/en-US/docs/Glossary/Global_object),
consectetur adipiscing elit. Quisque aliquam rutrum pellentesque. Ut
tincidunt purus ex, eget congue lacus aliquet quis.
```

### Internal links {: #internal-links }

When linking to other resources on `developer.chrome.com`, use the absolute path of the page rather
than a relative path or full URL.

```md
// Do
[doc-page]: /docs/extensions/page/

// Don't do
[doc-page]: https://develper.chrome.com/docs/extensions/page/
[doc-page]: page/
```

Internal links should include a terminal slash. 

```md
// Do
[doc-page]: /docs/extensions/dir/page/
[doc-page]: /docs/extensions/sub/dir/page/#header

// Don't do
[doc-page]: /docs/extensions/dir/page
[doc-page]: /docs/extensions/sub/dir/page#header
```

## Code formatting {: #code-formatting }

Code samples in extensions documentation should be formatted using the Chromium project's `git cl
format` command. To use this command, you must first install [depot_tools][depot-tools]. See [Using clang-format][clang-format] for additional details.

```bash
# Use this command to format JS files and code samples
git cl format --js <filename>
```

[clang-format]: https://chromium.googlesource.com/chromium/src/+/main/docs/clang_format.md
[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html
[kebab-case]: https://en.wikipedia.org/wiki/Letter_case#Kebab_case

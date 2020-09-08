exports.plugins = [
  // Markdown linting
  // https://github.com/remarkjs/remark-lint#rules
  require('remark-lint'),
  require('remark-frontmatter'),

  // // Remark Lint Style Guide preset and overrides.
  require('remark-preset-lint-recommended'),
  require('remark-preset-lint-markdown-style-guide'),
  ['lint-maximum-line-length', false],
  ['lint-fenced-code-flag', false],

  // Third-party plugins.
  require('remark-lint-are-links-valid'),
  require('remark-lint-no-duplicate-headings-in-section'),
];

exports.plugins = [
  // Markdown linting
  // https://github.com/remarkjs/remark-lint#rules
  require('remark-lint'),
  require('remark-frontmatter'),

  // Remark Lint Style Guide preset and overrides.
  require('remark-preset-lint-markdown-style-guide'),
  ['lint-code-block-style', false],
  ['lint-blockquote-indentation', false],
  ['lint-emphasis-marker', false],
  ['lint-hard-break-spaces', false],
  ['lint-link-title-style', false],
  ['lint-list-item-content-indent', false],
  ['lint-list-item-indent', false],
  ['lint-list-item-spacing', false],
  ['lint-maximum-heading-length', false],
  ['lint-maximum-line-length', false],
  ['lint-no-blockquote-without-marker', false],
  ['lint-no-consecutive-blank-lines', false],
  ['lint-no-duplicate-headings', false],
  ['lint-no-emphasis-as-heading', false],
  ['lint-no-file-name-articles', false],
  ['lint-no-file-name-irregular-characters', false],
  ['lint-no-heading-punctuation', ':.,;'],
  ['lint-no-multiple-toplevel-headings', false],
  ['lint-no-shell-dollars', false],
  ['lint-no-shortcut-reference-link', false],
  ['lint-no-table-indentation', false],
  ['lint-ordered-list-marker-style', false],
  ['lint-ordered-list-marker-value', false],
  ['lint-rule-style', false],
  ['lint-strong-marker', false],
  ['lint-table-cell-padding', false],
  ['lint-table-pipe-alignment', false],
  ['lint-table-pipes', false],
  ['lint-unordered-list-marker-style', false],
  ['lint-no-literal-urls', false],
  ['lint-final-definition', false],

  // Third-party plugins.
  // Checks if headings are accidentally duplicated
  require('remark-lint-no-duplicate-headings-in-section'),
  // Ensure articles don't start with an h1
  [require('remark-lint-first-heading-level'), 2],

  // Custom plugins.
  require('./tools/linting/no-dash-spaces.js'),
  require('./tools/linting/no-smart-quotes.js'),
  require('./tools/linting/no-unescaped-template-tags.js'),
];

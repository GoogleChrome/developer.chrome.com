// Tell stylelint to lint using BEM syntax
// This is some next level regex right here 😅
// https://github.com/bjankord/stylelint-config-sass-guidelines/issues/20
const BEM_PATTERN = '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$';

module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  rules: {
    // Allow a max nesting depth of 2
    'max-nesting-depth': 2,

    'selector-class-pattern': BEM_PATTERN,
    'scss/percent-placeholder-pattern': BEM_PATTERN,

    // Allow selectors like input[type=button]
    // but not input.foo or input#foo
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ["attribute"],
      }
    ]
  }
};
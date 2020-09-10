module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  rules: {
    // Allow a max nesting depth of 2
    'max-nesting-depth': 2,

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
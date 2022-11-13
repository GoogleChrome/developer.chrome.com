export default {
  files: ['tests/e2e/tests/**/*', 'tests/server/*', 'tests/site/**/*'],
  // This needs to be turned on to let AVA use power-assert for enhanced
  // assertion messages.
  // Read more: https://github.com/avajs/ava/blob/master/docs/03-assertions.md#enhanced-assertion-messages
  babel: true,
};

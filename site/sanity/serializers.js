module.exports = {
  types: {
    code: ({node}) =>
      '```' + node.language + '\n' + node.code + '\n```',
  }
}

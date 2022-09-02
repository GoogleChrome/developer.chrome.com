
module.exports = {
  types: {
    code: ({node}) =>
      '```' + node.language + '\n' + node.code + '\n```',
    aside: ({node}) =>
      `{% Aside '${node.type}' %}` +
      `${toMarkdown(node.text)}` +
      `{% endAside %}`
  }
}


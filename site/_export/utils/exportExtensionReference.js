const {exportFile} = require('./exportFile');

async function exportExtensionReference(ctx, api, frontMatter, transformedMarkdown) {
  const template = `${frontMatter}

{% include '/_includes/reference/styles.md' %}
{% import '/_includes/reference/chrome/macros/${api}.md' as type %}

# chrome.${api}

{{ type.Warnings() }}

{{ type.Description() }}

{{ type.Permissions() }}

{{ type.Availability() }}

{{ type.ManifestKeys() }}

{{ type.Properties() }}
`;

  let cleanedMarkdown = transformedMarkdown.replace('<!-- Intentionally blank -->', '').replace('<!-- TODO(samthor): Apps API only -->', '');

  const renderedPage = template + cleanedMarkdown;
  await exportFile(ctx, renderedPage);
}

module.exports = {
  exportExtensionReference,
}
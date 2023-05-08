/**
 * Walks over the groups of a Chrome API namespace and builds
 * API namespace paths split by dot
 * @param {RenderNamespace} apiNamespace
 * @returns A list of API paths like: chrome.alarms.onAlarm
 */
function getChromeApiNamespacePaths(apiNamespace) {
  const apiNamespacePaths = [];
  for (const group of apiNamespace.groups) {
    for (const content of group.contents) {
      apiNamespacePaths.push(`${apiNamespace.name}.${content.name}`);
    }
  }

  return apiNamespacePaths;
}

module.exports = {
  getChromeApiNamespacePaths,
};

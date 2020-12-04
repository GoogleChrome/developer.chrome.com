const test = require('ava');
const yaml = require('js-yaml');
const {buildProjectIndex} = require('../../../../site/_data/lib/project-index');

test('flattens hierarchical yaml', t => {
  const testData = `
- url: /docs/extensions/what-are-extensions
- url: /docs/extensions/reference
- title: i18n.docs.extensions.overview
  sections:
    - url: /docs/extensions/mv2/overview
    - url: /docs/extensions/mv2/overview/world
    - url: /docs/extensions/mv2/overview/test
    - title: i18n.docs.extensions.guides
      sections:
        - url: /docs/extensions/mv2/overview/guides
- url: /docs/extensions/policies
  sections:
    - url: /docs/extensions/policies/sub-url
`;

  const index = buildProjectIndex(yaml.safeLoad(testData));

  t.assert(index['/docs/extensions/mv2/overview'] === undefined);

  const overviewNode = index['/docs/extensions/mv2/overview/'];
  t.deepEqual(overviewNode, [
    {title: 'i18n.docs.extensions.overview', url: undefined},
  ]);

  const guidesNode = index['/docs/extensions/mv2/overview/guides/'];
  t.deepEqual(guidesNode, [
    {title: 'i18n.docs.extensions.overview', url: undefined},
    {title: 'i18n.docs.extensions.guides', url: undefined},
  ]);

  const subUrlNode = index['/docs/extensions/policies/sub-url/'];
  t.deepEqual(subUrlNode, [
    {title: undefined, url: '/docs/extensions/policies'},
  ]);
});

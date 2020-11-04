const test = require('ava');
const path = require('path');
const {
  BreadcrumbBuilder,
  buildAllBreadcrumbs,
} = require('../../../../site/_data/lib/breadcrumbs');

/**
 * @return {EleventyCollectionItem}
 */
function virtualItem(title, project_key) {
  return {
    data: {
      title,
      project_key,
    },
  };
}

function run(callback, url, index) {
  const builder = new BreadcrumbBuilder(url => {
    url = path.join(url, '/');
    return callback(url);
  });
  buildAllBreadcrumbs(url, builder, index);
  return builder.build(url);
}

test('real URLs only', t => {
  const lookup = url => {
    switch (url) {
      case '/en/':
        return virtualItem('Top');
      case '/en/foo/':
        return virtualItem('Foo');
      case '/en/foo/bar/':
        return virtualItem('Bar');
    }
  };

  t.deepEqual(run(lookup, '/en/foo/bar'), [{title: 'Foo', url: '..'}]);
  t.deepEqual(run(lookup, '/en/foo/bar/zing'), [
    {title: 'Foo', url: '../..'},
    {title: 'Bar', url: '..'},
  ]);
});

test('always includes single breadcrumb', t => {
  const lookup = url => {
    switch (url) {
      case '/en/':
        return virtualItem('Top');
      case '/en/foo/':
        return virtualItem('Foo');
    }
  };

  t.deepEqual(run(lookup, '/en/'), []);
  t.deepEqual(run(lookup, '/en/foo'), [{title: 'Foo', url: ''}]);
  t.deepEqual(run(lookup, '/en/foo/bar'), [{title: 'Foo', url: '..'}]);
});

test('URLs with project section', t => {
  const lookup = url => {
    switch (url) {
      case '/en/':
        return virtualItem('Top');
      case '/en/docs/':
        return virtualItem('Documentation');
      case '/en/docs/extensions/':
        return virtualItem('Extensions', 'extensions');
      case '/en/docs/extensions/page/':
        return virtualItem('Random Page');
    }
  };

  // Note that the TOC index contains URLs without a locale prefix, and i18n keys rather than real
  // titles. These keys actually exist and are looked up in the i18n data.
  const index = {
    extensions: {
      // This page is under two virtual sections.
      '/docs/extensions/page/': [
        {title: 'i18n.docs.extensions.overview'},
        {title: 'i18n.docs.extensions.overview'},
      ],
      // This page is under two virtual sections and one real URL that is looked up.
      '/docs/extensions/page/subpage/': [
        {title: 'i18n.docs.extensions.overview'},
        {title: 'i18n.docs.extensions.overview'},
        {url: '/docs/extensions/page/'},
      ],
    },
  };

  t.deepEqual(run(lookup, '/en/docs/extensions/page/', index), [
    {title: 'Documentation', url: '../..'},
    {title: 'Extensions', url: '..'},
    {title: 'Overview'},
    {title: 'Overview'},
  ]);

  t.deepEqual(run(lookup, '/en/docs/extensions/page/subpage/', index), [
    {title: 'Documentation', url: '../../..'},
    {title: 'Extensions', url: '../..'},
    {title: 'Overview'},
    {title: 'Overview'},
    {title: 'Random Page', url: '..'},
  ]);
});

import originalConfig from '../rollup.config';

const config = originalConfig();

const inputs = [
  'site/_js/web-components/enhanced-select/_enhanced-select',
  'site/_js/web-components/checkbox-group/_checkbox-group',
  'visual/fixtures/site/_js/main',
  'site/_js/misc/load-more/_load-more',
];

const configs = inputs.map(input => {
  const output = input.startsWith('visual/')
    ? {
        dir: 'visual/fixtures/dist/js',
        format: 'esm',
      }
    : config.output;

  return Object.assign({}, config, {
    input,
    output,
  });
});

export default configs;

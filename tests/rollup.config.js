import originalConfig from '../rollup.config';

const inputs = [
  'site/_js/web-components/enhanced-select/_enhanced-select',
  'site/_js/web-components/checkbox-group/_checkbox-group',
  'site/_js/misc/load-more/_load-more',
];

const configs = inputs.map(input => {
  return Object.assign({}, originalConfig(), {
    input: input,
  });
});

export default configs;

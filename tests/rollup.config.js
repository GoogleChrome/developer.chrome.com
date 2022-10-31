import originalConfig from '../rollup.config';

const testConfig = Object.assign({}, originalConfig(), {
  input: ['site/_js/web-components/enhanced-select/_enhanced-select'],
});

export default testConfig;

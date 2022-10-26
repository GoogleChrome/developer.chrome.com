import originalConfig from '../../../rollup.config';

const testConfig = Object.assign({}, originalConfig(), {
  input: ['site/_js/enhanced-select'],
});

export default testConfig;

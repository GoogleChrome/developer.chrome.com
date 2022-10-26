import originalConfig from '../../../rollup.config';

const testConfig = Object.assign({}, originalConfig(), {
  input: ['site/_js/checkbox-group'],
});

export default testConfig;

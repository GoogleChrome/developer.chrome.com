import originalConfig from '../../../rollup.config';

const testConfig = Object.assign({}, originalConfig(), {
  input: [],
});

export default testConfig;

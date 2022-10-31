import originalConfig from '../rollup.config';

const testConfig = Object.assign({}, originalConfig(), {
  input: ['site/_js/web-components/checkbox-group/_checkbox-group'],
});

export default testConfig;

import {createWndtOutline} from './utils.mjs';
import {config} from 'dotenv';

config();

if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

// @ts-ignore
createWndtOutline(process.env.DEVTOOLS_VERSION, [
  'en',
  'es',
  'ja',
  'ko',
  'pt',
  'ru',
  'zh',
]);

import {config} from 'dotenv';

config();

if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

import {createWndtOutline, locales} from './utils.mjs';

const languages = locales.map(x => x.lang);

// @ts-ignore
createWndtOutline(process.env.DEVTOOLS_VERSION, languages);

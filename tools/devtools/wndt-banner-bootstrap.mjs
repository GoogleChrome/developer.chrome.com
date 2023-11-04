import {config} from 'dotenv';

config();

if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

import {createWndtBanners, locales} from './utils.mjs';

const languages = locales.map(x => x.lang);

(async () => {
  // @ts-ignore
  await createWndtBanners(process.env.DEVTOOLS_VERSION, languages);
  console.log(
    'Upload the images then use the snippet in "_temp/new-in-devtools-image-snippet.md" to extract them.'
  );
})();

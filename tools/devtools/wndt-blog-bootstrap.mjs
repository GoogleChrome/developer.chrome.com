import {config} from 'dotenv';

config();

if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

if (!process.env.DEVTOOLS_IMAGE_EN) {
  console.warn('Did you forgot to generate images beforehand?');
}

import {createWndtBlogPosts, locales} from './utils.mjs';

const languages = locales.filter(x => x.isDefault).map(x => x.lang);

const images = {};
languages.forEach(
  lang =>
    (images[lang] = process.env['DEVTOOLS_IMAGE_' + lang.toUpperCase()] || '')
);

(async () => {
  // @ts-ignore
  await createWndtBlogPosts(process.env.DEVTOOLS_VERSION, languages, images);
})();

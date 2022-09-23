import {config} from 'dotenv';

config();

if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

import {createWndtBanners, createWndtBlogPosts} from './utils.mjs';

(async () => {
  // @ts-ignore
  await createWndtBanners(process.env.DEVTOOLS_VERSION, ['en']);
  // @ts-ignore
  await createWndtBlogPosts(process.env.DEVTOOLS_VERSION, ['en']);
})();

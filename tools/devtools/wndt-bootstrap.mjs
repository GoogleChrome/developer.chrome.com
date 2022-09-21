import {createWndtBanners, createWndtBlogPosts} from './utils.mjs';
import {config} from 'dotenv';

config();

if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

// @ts-ignore
createWndtBanners(process.env.DEVTOOLS_VERSION, ['en']);
// @ts-ignore
createWndtBlogPosts(process.env.DEVTOOLS_VERSION, ['en']);

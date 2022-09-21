import {
  createWndtBanners,
  createWndtBlogPosts,
  createGitHubIssues,
} from './utils.mjs';
import {config} from 'dotenv';

config();

if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

if (!process.env.DEVTOOLS_TRANSLATE_DUE) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_TRANSLATE_DUE="MMM-DD".';
}

if (!process.env.GITHUB_TOKEN) {
  throw 'Please make sure have a .env file with parameter GITHUB_TOKEN="your-token". \
  Follow the instruction here to generate: https://github.com/settings/tokens/new?scopes=repo';
}

// @ts-ignore
createWndtBanners(process.env.DEVTOOLS_VERSION, [
  'es',
  'ja',
  'ko',
  'pt',
  'ru',
  'zh',
]);
// @ts-ignore
createWndtBlogPosts(process.env.DEVTOOLS_VERSION, [
  'es',
  'ja',
  'ko',
  'pt',
  'ru',
  'zh',
]);

createGitHubIssues(
  process.env.DEVTOOLS_VERSION,
  process.env.DEVTOOLS_TRANSLATE_DUE,
  ['es', 'ja', 'ko', 'pt', 'ru', 'zh'],
  // @ts-ignore
  process.env.GITHUB_TOKEN
);

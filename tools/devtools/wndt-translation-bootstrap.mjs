import {
  createWndtBanners,
  createWndtBlogPosts,
  createGitHubIssues,
  populateTranslationContent,
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

const languages = ['es', 'ja', 'ko', 'pt', 'ru', 'zh'];

createWndtBanners(process.env.DEVTOOLS_VERSION, languages);
createWndtBlogPosts(process.env.DEVTOOLS_VERSION, languages);
populateTranslationContent(process.env.DEVTOOLS_VERSION, languages);
createGitHubIssues(
  process.env.DEVTOOLS_VERSION,
  process.env.DEVTOOLS_TRANSLATE_DUE,
  ['es', 'ja', 'ko', 'pt', 'ru', 'zh'],
  process.env.GITHUB_TOKEN
);

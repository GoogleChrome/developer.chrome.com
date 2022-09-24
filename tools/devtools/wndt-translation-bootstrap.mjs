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

import {
  createWndtBanners,
  createWndtBlogPosts,
  // @ts-ignore
  createGitHubIssues,
  populateTranslationContent,
} from './utils.mjs';

const languages = ['es', 'ja', 'ko', 'pt', 'ru', 'zh'];
const translators = {};

languages.forEach(
  lang =>
    (translators[lang] =
      process.env['DEVTOOLS_TRANSLATOR_' + lang.toUpperCase()] || '')
);

(async () => {
  // @ts-ignore
  await createWndtBanners(process.env.DEVTOOLS_VERSION, languages);
  // @ts-ignore
  await createWndtBlogPosts(process.env.DEVTOOLS_VERSION, languages);
  // @ts-ignore
  await populateTranslationContent(process.env.DEVTOOLS_VERSION, languages);
  createGitHubIssues(
    // @ts-ignore
    process.env.DEVTOOLS_VERSION,
    process.env.DEVTOOLS_TRANSLATE_DUE,
    languages,
    process.env.GITHUB_TOKEN,
    translators
  );
})();

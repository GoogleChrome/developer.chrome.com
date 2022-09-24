import {config} from 'dotenv';
import {createInterface} from 'readline';

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
  createWndtBlogPosts,
  createGitHubIssues,
  populateTranslationContent,
  locales,
} from './utils.mjs';

const languages = locales.filter(x => !x.isDefault).map(x => x.lang);

const translators = {};
languages.forEach(
  lang =>
    (translators[lang] =
      process.env['DEVTOOLS_TRANSLATOR_' + lang.toUpperCase()] || '')
);

const images = {};
languages.forEach(
  lang =>
    (images[lang] = process.env['DEVTOOLS_IMAGE_' + lang.toUpperCase()] || '')
);

(async () => {
  // @ts-ignore
  await createWndtBlogPosts(process.env.DEVTOOLS_VERSION, languages, images);
  // @ts-ignore
  await populateTranslationContent(process.env.DEVTOOLS_VERSION, languages);

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(
    'Do you want to generate GitHub issues? y/[n]: ',
    async answer => {
      const ans = answer.toUpperCase();
      if (ans === 'Y' || ans === 'YES') {
        await createGitHubIssues(
          // @ts-ignore
          process.env.DEVTOOLS_VERSION,
          process.env.DEVTOOLS_TRANSLATE_DUE,
          languages,
          process.env.GITHUB_TOKEN,
          translators
        );
      } else {
        console.log('No GitHub issues created.');
      }
      readline.close();
    }
  );
})();

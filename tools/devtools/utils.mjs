import {readFile, writeFile, mkdir} from 'fs/promises';
// eslint-disable-next-line node/no-extraneous-import
import nunjucks from 'nunjucks';
import {Octokit} from 'octokit';
import {dirname} from 'path';

nunjucks.configure({
  autoescape: false,
  tags: {blockStart: '<%', blockEnd: '%>'},
});

const blogTemplate = './tools/devtools/templates/new-in-devtools.md';
const bannerTemplate = './tools/devtools/templates/new-in-devtools-banner.svg';

const blogDest = './site/{{lang}}/blog/new-in-devtools-{{version}}/index.md';
const outlineDest = './site/_includes/partials/devtools/{{lang}}/whats-new.md';
const bannerDest = './tools/devtools/_temp/new-in-devtools-banner-{{lang}}.svg';

const translation = {
  language: {
    es: 'Spanish',
    ja: 'Japanese',
    ko: 'Korean',
    pt: 'Portuguese',
    ru: 'Russian',
    zh: 'Chinese',
  },
  title: {
    en: "What's New in DevTools (Chrome {{version}})",
    es: 'Qué hay de nuevo en DevTools (Chrome {{version}})',
    ja: 'DevTools の新機能 (Chrome {{version}})',
    ko: 'DevTools 의 새로운 기능 (Chrome {{version}})',
    pt: 'O que há de novo no DevTools (Chrome {{version}})',
    ru: 'Новинки DevTools (Chrome {{version}})',
    zh: 'DevTools 新功能（Chrome {{version}}）',
  },
  thankful: {
    es: '*Gracias  por la traducción [Miguel Ángel](https://midu.dev) y por la revisión [Carlos Caballero](https://carloscaballero.io).*',
    ja: '*翻訳者の [technohippy](https://github.com/technohippy) さん、レビュアーの [yoichiro](https://github.com/yoichiro) さん、 [lacolaco](https://github.com/lacolaco) さん、 [yoshiko-pg](https://github.com/yoshiko-pg) さんに感謝いたします。*',
    ko: '*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하셨으며, [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*',
    pt: '*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/) . Revisão por [Lucas Santos](https://lsantos.dev).*',
    ru: '*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*',
    zh: '*感谢 [Poong Zui Yong](https://www.linkedin.com/in/zui-yong-poong-1b507b14/) 提供的翻译*',
  },
  reviewers: {
    es: ['midudev', 'Caballerog', 'and-oli'],
    ja: ['yoshiko-pg', 'lacolaco', 'technohippy', 'yoichiro'],
    ko: ['techhtml', 'TORU0239', 'cwdoh'],
    pt: ['alvarocamillont', 'khaosdoctor'],
    ru: ['solarrust', 'webmaxru', 'kateryna-prokopenko'],
    zh: ['xyugroup', 'aquaMAX', 'liuliangsir', 'louisyoong', 'hanselfmu'],
  },
  banner: {
    en: "What's new in",
    es: 'Qué hay de nuevo en',
    ja: '新機能',
    ko: '새로운 기능',
    pt: 'O que há de novo no',
    ru: 'Новинки',
    zh: '新功能',
  },
};

/**
 * Get Today's date in ISO 8601
 * @returns YYYY-MM-DD
 */
function getToday() {
  return new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(Date.now());
}

/**
 * Generate What's New in DevTools blog post banner
 * @param {String} version - release version
 * @param {String[]} langs - languages you want to generate
 */
export async function createWndtBanners(version, langs) {
  for (const lang of langs) {
    const output = nunjucks.render(bannerTemplate, {
      banner: translation.banner[lang],
      version: version,
    });

    // TODO: Upload images to CDN
    const fileName = nunjucks.renderString(bannerDest, {lang});
    await mkdir(dirname(fileName), {recursive: true});
    await writeFile(fileName, output, 'utf-8');
  }
  console.log(`Created WNDT banners for: ${langs.join(', ')}`);
}

/**
 * Generate What's New in DevTools blog posts templates
 * @param {String} version - release version
 * @param {String[]} langs - languages you want to generate
 */
export async function createWndtBlogPosts(version, langs) {
  for (const lang of langs) {
    const output = nunjucks
      .render(blogTemplate, {
        title: nunjucks.renderString(translation.title[lang], {version}),
        thankful: translation.thankful[lang] || '',
        date: getToday(),
        lang: lang,
        version: version,
        desc: lang === 'en' ? '""' : '{{desc}}',
        content: lang === 'en' ? '' : '{{content}}',
      })
      .replaceAll('\n\n\n', '\n');

    const fileName = nunjucks.renderString(blogDest, {lang, version});

    await mkdir(dirname(fileName), {recursive: true});
    await writeFile(fileName, output, 'utf-8');
  }
  console.log(`Created WNDT blog posts for: ${langs.join(', ')}`);
}

/**
 * Populate What's New in DevTools blog posts content to translation templates
 * @param {String} version - release version
 * @param {String[]} langs - languages you want to generate
 */
export async function populateTranslationContent(version, langs) {
  const enFileName = nunjucks.renderString(blogDest, {lang: 'en', version});
  const enFile = await readFile(enFileName, 'utf-8');

  // Extract English description and content paragraph
  const enDesc = enFile.match(/(?<=description: )(.*)/gm)?.[0] || '""';
  let enContent =
    enFile.match(
      /(?<=<!-- \$contentStart -->)(.+?)(?=<!-- \$contentEnd -->)/s
    )?.[0] || '';

  const enParagraphs = (
    enContent.match(
      /(?<=\n)((?!{%|{#|Chromium issue: |Chromium issues: ).*)(?=\n)$/gm
    ) || []
  ).filter(x => x);

  for (const p of enParagraphs) {
    if (p.startsWith('```'))
      console.warn(
        "Output contains code sample. Please check if it's commented correctly."
      );

    enContent = enContent.replace(p, `<!-- ${p} -->`);
  }

  // Append the English description and commented content to translation files
  for (const lang of langs) {
    const fileName = nunjucks.renderString(blogDest, {lang, version});

    const output = nunjucks.render(fileName, {
      desc: enDesc,
      content: enContent,
    });

    await writeFile(fileName, output, 'utf-8');
  }
  console.log(`Populated commented content for: ${langs.join(', ')}`);
}

/**
 * Append What's New in DevTools outline in 7 languages
 * @param {String} version - release version
 * @param {String[]} langs - languages you want to generate
 */
export async function createWndtOutline(version, langs) {
  // Read the file
  const fileName = nunjucks.renderString(blogDest, {lang: 'en', version});
  const content = await readFile(fileName, 'utf-8');

  // Abstract the title and hash id
  const list = (content.match(/^(## |### )(.*)$/gm) || []).map(x => {
    const title = x.match(/(?<=## )(.*?)(?= {:)/gm);
    const hash = x.match(/(?<={: )(.*?)(?= })/g);

    return `* [${title}]({{hashLang}}/blog/new-in-devtools-{{version}}/${hash})`;
  });

  const output =
    '### Chrome {{version}} {: #chrome{{version}} }\n\n' +
    list.join('\n') +
    '\n';

  // Append outline to translation files
  for (const lang of langs) {
    let langOutput = nunjucks.renderString(output, {
      hashLang: lang === 'en' ? '' : `/${lang}`,
      version,
    });

    if (lang !== 'en') {
      langOutput = `<!-- ${langOutput} -->`;
    }

    const outlineFileName = nunjucks.renderString(outlineDest, {lang});
    const contentHolder = '{{content}}';
    const out = nunjucks.render(outlineFileName, {
      content: contentHolder + '\n\n' + langOutput,
    });

    await writeFile(outlineFileName, out, 'utf-8');
  }

  console.log(`Appended WNDT outlines for: ${langs.join(', ')}`);
}

/**
 * Create Github Issues for translators to work on
 * @param {String} version - release version
 * @param {String} dueDate - due date to translate
 * @param {String[]} langs - languages you want to generate
 * @param {String} auth - GitHub Token
 * @param {Object} translators - Translators of different locales { en: 'githubHandler' }
 */
export async function createGitHubIssues(
  version,
  dueDate,
  langs,
  auth,
  translators = {}
) {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({auth});

  const {data} = await octokit.rest.users.getAuthenticated();
  console.log(`Login to GitHub successfully: ${data.login}`);

  for (const lang of langs) {
    const translator = translators[lang] ? `@${translators[lang]}` : '...';
    const reviewers = translation.reviewers[lang]
      .map(r => `@${r}`)
      .filter(r => r !== translator);

    const {status} = await octokit.request(
      'POST /repos/GoogleChrome/developer.chrome.com/issues',
      {
        owner: 'GoogleChrome',
        repo: 'developer.chrome.com',
        title: `[devtools-translate] ${translation.language[lang]} - What's New in DevTools (Chrome ${version})`,
        body:
          `Post: https://developer.chrome.com/blog/new-in-devtools-${version}/\n` +
          `Translated by: ${dueDate}\n` +
          '\n' +
          `Translator: ${translator}\n` +
          `Reviewers: ${reviewers.join(', ')}`,
        assignees: ['jecfish'],
        labels: ['devtools-translate', 'content', 'translation'],
      }
    );

    console.log(
      `Created Github issue for WNDT ${translation.language[lang]}: status ${status}`
    );
  }
}

require('dotenv').config();

const {dirname} = require('path');
const {readFileSync, writeFileSync, mkdirSync} = require('fs');
const {Octokit} = require('octokit');

const verholder = '$version';
const langholder = '$lang';

const src = './site/_data/templates/devtools/new-in-devtools.md';
const dest = `./site/${langholder}/blog/new-in-devtools-${verholder}/index.md`;

const outlineSrc = `./site/_includes/partials/devtools/${langholder}/whats-new.md`;

const bannerSrc = './site/_data/templates/devtools/new-in-devtools-banner.svg';
const bannerDest = `./_temp/new-in-devtools-banner-${langholder}.svg`;

const langs = ['en', 'es', 'ja', 'ko', 'pt', 'ru', 'zh'];
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
    en: "What's New in DevTools (Chrome $version)",
    es: 'Qué hay de nuevo en DevTools (Chrome $version)',
    ja: 'DevTools の新機能 (Chrome $version)',
    ko: 'DevTools 의 새로운 기능 (Chrome $version)',
    pt: 'O que há de novo no DevTools (Chrome $version)',
    ru: 'Новинки DevTools (Chrome $version)',
    zh: 'DevTools 新功能（Chrome $version）',
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
    es: ['@Caballerog', '@midudev', '@and-oli'],
    ja: ['@yoichiro', '@yoshiko-pg', '@technohippy', '@lacolaco'],
    ko: ['@techhtml', '@TORU0239', '@cwdoh'],
    pt: ['@khaosdoctor', '@alvarocamillont'],
    ru: ['@solarrust', '@webmaxru', '@kateryna-prokopenko'],
    zh: ['@louisyoong', '@liuliangsir', '@xyugroup', '@aquaMAX', '@hanselfmu'],
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

const getToday = () => {
  const dateObj = new Date();
  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const date = dateObj.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
};

/**
 * Create DevTools WNDT banners for 7 languages
 */
const createWndtBanners = async version => {
  for (const lang of langs) {
    const fileName = bannerDest.replace(langholder, lang);

    mkdirSync(dirname(fileName), {
      recursive: true,
    });

    const template = readFileSync(bannerSrc, 'utf-8');
    const output = template
      .replaceAll('$banner', translation.banner[lang])
      .replaceAll(verholder, version);

    // TODO: Upload images to CDN
    writeFileSync(fileName, output, 'utf-8');
  }
  console.log(`Created ${langs.length} WNDT banners successfully.`);
};

/**
 * Create DevTools WNDT blog posts templates for 7 languages
 */
const createWndtBlogPosts = async version => {
  for (const lang of langs) {
    const fileName = dest.replace(langholder, lang).replace(verholder, version);

    mkdirSync(dirname(fileName), {
      recursive: true,
    });

    const template = readFileSync(src, 'utf-8');

    // TODO: Update replace image with CDN url
    let output = template
      .replaceAll('$title', translation.title[lang])
      .replaceAll('$thankful', translation.thankful[lang] || '$thankful')
      .replaceAll('$date', getToday())
      .replaceAll(langholder, lang)
      .replaceAll(verholder, version);

    if (lang === 'en') {
      output = output
        .replaceAll('draft: true\n', '')
        .replaceAll('$thankful\n', '')
        .replaceAll(
          /( )*<!-- Translation instructions((.*)|[^<]*|[^!]*|[^-]*|[^>]*)-->\n*/g,
          ''
        );
    }

    writeFileSync(fileName, output, 'utf-8');
  }
  console.log(`Created ${langs.length} WNDT blog posts successfully.`);
};

/**
 * Create GitHub Issues for 6 DevTools WNDT translations
 */
const createWndtTranslationsGitHubIssues = async (version, dueDate) => {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const {data} = await octokit.rest.users.getAuthenticated();
  console.log(`Login to GitHub successfully: ${data.login}`);

  for (const lang of langs) {
    if (lang === 'en') continue;

    const {status} = await octokit.request(
      'POST /repos/GoogleChrome/developer.chrome.com/issues',
      {
        owner: 'GoogleChrome',
        repo: 'developer.chrome.com',
        title: `[devtools-translate] ${translation.language[lang]} - What's New in DevTools (Chrome ${version})`,
        body: `Post: https://developer.chrome.com/blog/new-in-devtools-${version}/\nTranslated by: ${dueDate}\n\nTranslator: ...\nReviewers: ${translation.reviewers[
          lang
        ].join(', ')}`,
        assignees: ['jecfish'],
        labels: ['devtools-translate', 'content', 'translation'],
      }
    );

    console.log(
      `Created Github issue for WNDT ${translation.language[lang]}: status ${status}`
    );
  }
};

/**
 * Extract WNDT content outline
 */
const createWndtOutline = async version => {
  const fileName = dest.replace(langholder, 'en').replace(verholder, version);
  const content = readFileSync(fileName, 'utf-8');
  const regex = /^(## |### )(.*)$/gm;

  const list = content.match(regex).map(x => {
    const title = x.match(/(?<=## )(.*?)(?= {:)/gm);
    const hash = x.match(/(?<={: )(.*?)(?= })/g);

    return `* [${title}]($lang/blog/new-in-devtools-${version}/${hash})`;
  });

  const output =
    `### Chrome ${version} {: #chrome${version} }\n\n` + list.join('\n') + '\n';

  for (const lang of langs) {
    const contentHolder = '<!-- $content -->';

    const outlineFileName = outlineSrc.replace(langholder, lang);
    const outlineRaw = readFileSync(outlineFileName, 'utf-8');

    let langOutput = output.replaceAll(
      langholder,
      lang === 'en' ? '' : `/${lang}`
    );

    if (lang !== 'en') {
      langOutput = `<!-- ${langOutput} -->`;
    }

    const outline = outlineRaw.replace(
      contentHolder,
      contentHolder + '\n\n' + langOutput
    );

    writeFileSync(outlineFileName, outline, 'utf-8');
  }

  console.log(`Extract ${langs.length} WNDT outline successfully.`);
};

/**
 * Run it, take a version parameter
 */

createWndtBanners(process.env.DEVTOOLS_VERSION);
createWndtBlogPosts(process.env.DEVTOOLS_VERSION);
createWndtTranslationsGitHubIssues(
  process.env.DEVTOOLS_VERSION,
  process.env.DEVTOOLS_TRANSLATE_DUE
);
createWndtOutline(process.env.DEVTOOLS_VERSION);

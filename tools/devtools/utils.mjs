import {readFile, writeFile, mkdir} from 'fs/promises';
import {Octokit} from 'octokit';
import {dirname} from 'path';

const verholder = '$version';
const langholder = '$lang';

const blogTemplate = './tools/devtools/templates/new-in-devtools.md';
const bannerTemplate = './tools/devtools/templates/new-in-devtools-banner.svg';

const blogDest = `./site/${langholder}/blog/new-in-devtools-${verholder}/index.md`;
const outlineDest = `./site/_includes/partials/devtools/${langholder}/whats-new.md`;
const bannerDest = `./tools/devtools/_temp/new-in-devtools-banner-${langholder}.svg`;

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
    const fileName = bannerDest.replace(langholder, lang);

    await mkdir(dirname(fileName), {recursive: true});

    const template = await readFile(bannerTemplate, 'utf-8');
    const output = template
      .replaceAll('$banner', translation.banner[lang])
      .replaceAll(verholder, version);

    // TODO: Upload images to CDN
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
    const fileName = blogDest
      .replace(langholder, lang)
      .replace(verholder, version);

    await mkdir(dirname(fileName), {recursive: true});

    const template = await readFile(blogTemplate, 'utf-8');

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
  const enFileName = blogDest
    .replace(langholder, 'en')
    .replace(verholder, version);

  const contentRegex =
    /(?<=<!-- \$contentStart -->)(.+?)(?=<!-- \$contentEnd -->)/s;
  const descRegex = /(?<=description: )(.*)/gm;
  const enFile = await readFile(enFileName, 'utf-8');
  const enDesc = enFile.match(descRegex)?.[0] || '""';
  let enContent = enFile.match(contentRegex)?.[0] || '';

  const paragraphRegex =
    /(?<=\n)((?!{%|{#|Chromium issue: |Chromium issues: ).*)(?=\n)$/gm; // /^(\n)((?!{%|{#|<!-- \$content).*)\n$/gm;

  // @ts-ignore
  for (const p of enContent.match(paragraphRegex).filter(x => x)) {
    if (p.startsWith('```'))
      console.warn(
        "Output contains code sample. Please check if it's commented correctly."
      );
    enContent = enContent.replace(p, `<!-- ${p} -->`);
  }

  for (const lang of langs) {
    const fileName = blogDest
      .replace(langholder, lang)
      .replace(verholder, version);

    const fileContent = await readFile(fileName, 'utf-8');

    // TODO: Update replace image with CDN url
    let output = fileContent.replace(descRegex, enDesc);
    output = output.replace(contentRegex, enContent);

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
  const fileName = blogDest
    .replace(langholder, 'en')
    .replace(verholder, version);
  const content = await readFile(fileName, 'utf-8');
  const regex = /^(## |### )(.*)$/gm;

  // @ts-ignore
  const list = content.match(regex).map(x => {
    const title = x.match(/(?<=## )(.*?)(?= {:)/gm);
    const hash = x.match(/(?<={: )(.*?)(?= })/g);

    return `* [${title}]($lang/blog/new-in-devtools-${version}/${hash})`;
  });

  const output =
    `### Chrome ${version} {: #chrome${version} }\n\n` + list.join('\n') + '\n';

  for (const lang of langs) {
    const contentHolder = '<!-- $content -->';

    const outlineFileName = outlineDest.replace(langholder, lang);
    const outlineRaw = await readFile(outlineFileName, 'utf-8');

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

    await writeFile(outlineFileName, outline, 'utf-8');
  }

  console.log(`Appended WNDT outlines for: ${langs.join(', ')}`);
}

/**
 * Create Github Issues for translators to work on
 * @param {String} version - release version
 * @param {String} dueDate - due date to translate
 * @param {String[]} langs - languages you want to generate
 * @param {String} auth - GitHub Token
 */
export async function createGitHubIssues(version, dueDate, langs, auth) {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({auth});

  const {data} = await octokit.rest.users.getAuthenticated();
  console.log(`Login to GitHub successfully: ${data.login}`);

  for (const lang of langs) {
    const {status} = await octokit.request(
      'POST /repos/GoogleChrome/developer.chrome.com/issues',
      {
        owner: 'GoogleChrome',
        repo: 'developer.chrome.com',
        title: `[devtools-translate] ${translation.language[lang]} - What's New in DevTools (Chrome ${version})`,
        body: `Post: https://developer.chrome.com/blog/new-in-devtools-${version}/\nTranslated by: ${dueDate}\n\nTranslator: ...\nReviewers: ${translation.reviewers[lang].join(', ')}`,
        assignees: ['jecfish'],
        labels: ['devtools-translate', 'content', 'translation'],
      }
    );

    console.log(
      `Created Github issue for WNDT ${translation.language[lang]}: status ${status}`
    );
  }
}

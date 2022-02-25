const yaml = require('js-yaml');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const matter = require('gray-matter');

const {defaultLocale} = require('./site.json');
const PLACEHOLDER_IMG =
  'image/tcFciHGuF3MxnTr1y5ue01OGLBn2/PFaMfvDZoPorronbpdU8.svg';

/** @type AuthorsData */
const authorsData = require('./authorsData.json');
const authorsYaml =
  /** @type {I18nAuthors} */ (
    yaml.load(
      fs.readFileSync(path.join(__dirname, 'i18n', 'authors.yaml'), 'utf-8')
    )
  ) || {};

/** @type PostsData */
const postsData = {
  authors: {},
};

/**
 * @param {string} authorKey
 * @param {FrontMatterData} frontMatter
 */
function addAuthorsPost(authorKey, frontMatter) {
  if (authorKey in postsData.authors) {
    postsData.authors[authorKey].elements.push(frontMatter);
  } else {
    postsData.authors[authorKey] = {
      image: PLACEHOLDER_IMG,
      ...authorsData[authorKey],
      description: `i18n.authors.${authorKey}.description`,
      elements: [frontMatter],
      key: authorKey,
      title: `i18n.authors.${authorKey}.title`,
      url: `/authors/${authorKey}/`,
    };
  }
}

const files = glob.sync('./site/[a-z][a-z]/{**/*,*}.md', {});

/** @type {FrontMatterData[]} */
const fileContents = files
  .map(file => {
    const filePath = path.join(process.cwd(), file);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = /** @type {FrontMatterData} */ (matter(fileData).data);
    const regexGroups = /\/site\/(?<locale>[a-z]{2})(?<url>\/.*\/).*\.md$/.exec(
      file
    )?.groups;
    const locale = regexGroups?.locale ?? defaultLocale;
    const url = regexGroups?.url ?? '';

    return {
      ...data,
      locale,
      url,
    };
  })
  .filter(
    f => f.date instanceof Date && f.url && f.title && f.permalink === undefined
  )
  .sort((a, b) => a.date.getTime() - b.date.getTime());

for (const fileContent of fileContents) {
  for (const authorKey of fileContent.authors ?? []) {
    if (authorKey in authorsYaml) {
      addAuthorsPost(authorKey, fileContent);
    }
  }
}

module.exports = postsData;

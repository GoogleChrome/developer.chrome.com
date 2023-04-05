const path = require('path');
const fs = require('fs').promises;
const yaml = require('js-yaml');

const RELATED_ARTICLES_PATH = path.join(
  __dirname,
  './deprecations-calendar/deprecations-articles.yml'
);
const DEPRECATIONS_FILE_PATH = path.join(
  __dirname,
  '../../external/data/chrome-deprecations.json'
);

/**
 * Pulls a list of deprecation items
 *
 * @return {promise} A promise that resolves in an array containing all the deprecations
 */
async function getDeprecationData() {
  let deprecations;

  try {
    deprecations = JSON.parse(
      await fs.readFile(DEPRECATIONS_FILE_PATH, 'utf-8')
    );
  } catch (error) {
    console.error('Error reading Deprecations file', error);
  }

  return deprecations;
}

/**
 * Pulls articles related to deprecations from the deprecation-articles.yml file
 *
 * @return {promise} A promise that resolves in an array containing all the articles
 */
async function getArticles() {
  let articles;

  try {
    const articlesYaml = await fs.readFile(RELATED_ARTICLES_PATH, 'utf-8');
    const articlesData = yaml.load(articlesYaml);
    if (articlesData) articles = articlesData;
  } catch (error) {
    console.error('Error reading YAML file', error);
  }

  return articles;
}

/**
 * Adds the articles to the correct deprecation
 *
 * @param {object[]} deprecations
 * @param {object[]} articles
 * @return {object[]} An array of deprecations with their related articles
 */
function addArticles(deprecations, articles) {
  for (const deprecation of deprecations) {
    const linkedArticle = articles[deprecation.id];
    if (linkedArticle) {
      deprecation.article = linkedArticle.article;
    }
  }
  return deprecations;
}

module.exports = async () => {
  const deprecationData = await getDeprecationData();
  const articlesData = await getArticles();
  const data = addArticles(deprecationData, articlesData);

  return data;
};

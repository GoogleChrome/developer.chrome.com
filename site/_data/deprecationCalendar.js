const path = require('path');
const fs = require('fs').promises;
const yaml = require('js-yaml');

/**
 * Pulls a list of deprecataion items
 *
 * @return {promise} A promise that resolves in an array containing all the deprecations
 */
async function getDeprecationData() {
  let deprecations;
  const deprecationsFile = path.join(
    __dirname,
    '../../external/data/deprecation-calendar.json'
  );

  try {
    deprecations = JSON.parse(await fs.readFile(deprecationsFile, 'utf-8'));
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
  const articlesFile = path.join(
    __dirname,
    './deprecation-calendar/deprecation-articles.yml'
  );

  try {
    const articlesYaml = await fs.readFile(articlesFile, 'utf-8');
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
  deprecations.forEach(deprecation => {
    const linkedArticle = articles.filter(
      article => article.deprecation_id === deprecation.id
    );
    if (linkedArticle.length > 0)
      deprecation.article = linkedArticle[0].article;
  });
  return deprecations;
}

module.exports = async () => {
  const deprecationData = await getDeprecationData();
  const articlesData = await getArticles();
  const data = addArticles(deprecationData, articlesData);

  return data;
};

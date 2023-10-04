const yaml = require('js-yaml');
const fs = require('fs');
const {getImage} = require('./getImage');
const {exportFile} = require('./exportFile');

const authors = JSON.parse(
  fs.readFileSync('./site/_data/authorsData.json', 'utf-8')
);
const authorsI18n = yaml.load(
  fs.readFileSync('./site/_data/i18n/authors.yaml', 'utf-8')
);

(async () => {
  const cleanAuthors = {};
  const images = [];
  for (const [authorKey, details] of Object.entries(authors)) {
    delete details.country;
    delete details.external;
    if (details.image) {
      images.push(
        (async () => {
          const imageSrc = details.image;
          const fileName = `/en/images/authors/${authorKey}.${
            imageSrc.split('.')[1]
          }`;
          details.image = fileName.replace('/en/', '');

          const authorImage = await getImage(`${imageSrc}?w=256&fit=max`);
          await exportFile({}, authorImage, fileName);
        })()
      );
    }

    const i18n = authorsI18n[authorKey];
    if (i18n.title?.en) {
      details.name = i18n.title.en;
    }
    if (i18n.description?.en) {
      details.description = i18n.description.en;
    }

    cleanAuthors[authorKey] = details;
    await exportFile(
      {},
      JSON.stringify(cleanAuthors),
      '/en/_data/authors.json'
    );
  }

  await Promise.all(images);
})();

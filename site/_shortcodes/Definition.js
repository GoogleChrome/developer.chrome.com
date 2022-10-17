const allDefinitions = require('../_data/definitions.json');

const START_TOKEN = '<% ';
const END_TOKEN = ' %>';
const DEFAULT_LOCALE = 'en';

function findNestedTerm(content) {
  const startIndex = content.indexOf(START_TOKEN);
  const endIndex = content.indexOf(END_TOKEN);

  if (startIndex < 0 || endIndex < 0) {
    return;
  }

  return content.substring(startIndex + START_TOKEN.length, endIndex);
}

function generateContent({content, locale}) {
  const nestedTerm = findNestedTerm(content);

  if (!nestedTerm) {
    return content;
  }

  const nestedContent = buildDefinition({term: nestedTerm, locale});

  const nestedTermToken = `${START_TOKEN}${nestedTerm}${END_TOKEN}`;
  const updatedContent = content.replace(nestedTermToken, nestedContent);

  return generateContent({content: updatedContent, locale});
}

function buildDefinition({term, locale}) {
  if (!term) {
    return;
  }

  const {title, content, link} = allDefinitions[term][locale];

  const generatedContent = generateContent({
    content,
    locale,
  });

  return `
    <div class="definition">
      <div class="definition__term">
        ${title}
      </div>
      <div class="definition__hover-card">
        <div class="definition__title">
          ${title}
        </div>
        <p class="definition__content">
          ${generatedContent}
        </p>
        <a class="definition__link-container" href="${link}" target="_blank">Learn more</a>
      </div>   
    </div>
  `;
}

/**
 * Renders a uniquely colored box around the passed in content.
 * @param {string} term An aside style type
 */
function Definition(term) {
  try {
    if (!term) {
      return;
    }

    // @ts-ignore: `this` has term of `any`
    const locale = this.ctx.locale ?? DEFAULT_LOCALE;
    const definition = buildDefinition({term, locale});

    return definition;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {Definition};

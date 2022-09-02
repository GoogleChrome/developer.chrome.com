const imageUrl = require('@sanity/image-url')
const sanityClient = require('./sanityClient')

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
function urlFor(source) {
  return imageUrl(sanityClient).image(source)
}

module.exports = urlFor

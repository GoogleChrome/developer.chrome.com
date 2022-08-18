const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../_sanity_utils/sanityClient.js')
const serializers = require('../_sanity_utils/serializers')
const overlayDrafts = require('../_sanity_utils/overlayDrafts')
const { title } = require('process')
const hasToken = !!client.config().token

function generatePost (post) {
  return {
    data: {
      ...post,
      date: post.publishedAt,
      authors: ['alexandrawhite'],
    },
    ...post,
    date: post.publishedAt,
    authors: ['alexandrawhite'],
    url: '/sanity/' + post.slug.current,

    body: BlocksToMarkdown(post.body, { serializers, ...client.config() })
  }
}

async function getPosts () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "post" && defined(slug) && publishedAt < now()]`
  const projection = groq`{
    _id,
    publishedAt,
    title,
    slug,
    body[]{
      ...,
      children[]{
        ...,
        // Join inline reference
        _type == "authorReference" => {
          // check /studio/documents/authors.js for more fields
          "name": @.author->name,
          "slug": @.author->slug
        }
      }
    },
    "authors": authors[].author->
  }`
  const order = `| order(publishedAt asc)`
  const query = [filter, projection, order].join(' ')
  // TODO: Investigate why 1st call returns stale content.
  const docsPreflight = await client.fetch(query).catch(err => console.error(err))
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  const preparePosts = reducedDocs.map(generatePost)
  console.log(docs.map(doc => doc.title));
  return preparePosts
}

module.exports = getPosts

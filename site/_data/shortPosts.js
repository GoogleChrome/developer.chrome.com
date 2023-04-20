const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const groq = require('groq');
const client = require('../sanity/sanityClient.js');
const serializers = require('../sanity/serializers');
// const overlayDrafts = require('../sanity/overlayDrafts')
// const hasToken = !!client.config().token

function generatePost(post) {
  return {
    ...post,
    slug: post.slug.current,
    authors: post.authors?.map(author => author.id),
    date: post._createdAt,
    updated: post._updatedAt,
    content: BlocksToMarkdown(post.content, {serializers, ...client.config()}),
  };
}

async function getPosts() {
  // @ts-ignore
  const filter = groq`*[_type == "post"]`;
  // @ts-ignore
  const projection = groq`{
    _id,
    _createdAt,
    _updatedAt,
    slug,
    title,
    description,
    hero,
    content[]{
      ...,
      children[]{
        ...,
      }
    },
    authors[]->{id},
  }`;
  const query = [filter, projection].join(' ');
  const docs = await client.fetch(query).catch(err => console.error(err));

  // const reducedDocs = overlayDrafts(hasToken, docs)
  // const preparePosts = reducedDocs.map(generatePost)
  const preparePosts = docs.map(generatePost);
  return preparePosts;
}

module.exports = getPosts;

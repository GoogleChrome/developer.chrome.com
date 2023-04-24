const BlocksToMarkdown = require('@sanity/block-content-to-markdown');
const groq = require('groq');
const client = require('../sanity/sanityClient.js');
const serializers = require('../sanity/serializers');
// const hasToken = !!client.config().token

function overlayDrafts(docs) {
  const reducer = (acc, curr, i, collection) => {
    // If draft, add it to array
    if (/^drafts\..*/.test(curr._id) || !collection.find(({_id}) => _id === `drafts.${curr._id}`)) {
      return [
        ...acc, curr
      ]
    }
    return acc
  }
  return docs.reduce(reducer, []);
}


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

  const preparePosts = overlayDrafts(docs).map(generatePost);
  return preparePosts;
}

module.exports = getPosts;

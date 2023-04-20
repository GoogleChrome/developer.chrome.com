const locale = 'en';

module.exports = {
  locale,
  type: 'blogPost',
  permalink: data => {
    return `/${locale}/blog/${data.post.slug}/index.html`;
  },
  eleventyComputed: {
    authors: data => data.post.authors,
    date: data => new Date(data.post.date),
    updated: data => new Date(data.post.updated),
    hero: data => data.post.hero,
    alt: 'some alt',
  },
};

module.exports = data => {
  return {
    title: `Preview: ${data.fm?.title}`,
    description: data.fm?.description,
    authors: data.fm?.authors,
  };
};

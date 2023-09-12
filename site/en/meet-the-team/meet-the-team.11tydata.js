module.exports = {
  eleventyComputed: {
    currentEvents: data => {
      return data.collections.currentEvents;
    },
    pastEvents: data => {
      return data.collections.pastEvents;
    },
  },
};

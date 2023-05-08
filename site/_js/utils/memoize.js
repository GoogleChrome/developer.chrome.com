const memoize = fn => {
  const cache = {};
  return function (x) {
    if (x in cache) return cache[x];
    return (cache[x] = fn(x));
  };
};

module.exports = memoize;

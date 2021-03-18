export const cacheHttpGet = (fn, url) => {
  const cache = new Map();
  return async (query) => {
    const key = JSON.stringify(query);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const res = await fn({
      method: 'GET',
      url,
      data: null,
      headers: null,
      query,
    });

    cache.set(key, res);
    return res;
  };
};

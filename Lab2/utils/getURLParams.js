export const getURLParams = (url) => {
    const params = {};
    const parser = new URL(url);
    const queryString = parser.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    return params;
  };
  
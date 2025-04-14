const getFirstPathname = (url: string) => {
  const match = url.match(/^\/([^/?#]+)/);
  return match ? `/${match[1]}` : '';
};

export { getFirstPathname };

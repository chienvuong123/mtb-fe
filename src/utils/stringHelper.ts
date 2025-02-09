const getFirstPathname = (url: string) => {
  const match = url.match(/^\/([^/?#]+)/);
  return match ? `/${match[1]}` : '';
};

const truncateText = (str: string, maxLength: number = 30) => {
  if (str.length <= maxLength) {
    return str;
  }
  return `${str.slice(0, maxLength)}...`;
};

export { getFirstPathname, truncateText };

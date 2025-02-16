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

interface NameProps {
  firstName: string;
  lastName: string;
}

const getFullName = ({ firstName, lastName } = {} as NameProps) => {
  return [lastName, firstName].join(' ');
};

export { getFirstPathname, truncateText, getFullName };

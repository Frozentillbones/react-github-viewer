import errorHandler from './errorHandler';

export default async (query) => {
  const res = await fetch(`https://api.github.com/users/${query}`);
  return errorHandler(res);
};
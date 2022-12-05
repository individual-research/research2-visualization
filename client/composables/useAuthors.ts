import axios from 'axios';

export const useAuthors = async (limit: number = -1) => {
  const authors: string[] = await axios.get(`https://api.research.bisue.shop/author`).then(response => response.data);

  if (limit < 0) {
    return authors;
  } else {
    return authors.slice(0, limit);
  }
};

import axios from 'axios';
import { Comment } from './useData';

export const useComments = async (community: string, date: string, type: string, page: number) => {
  const paginator: { data: Comment[]; maxPage: number } = await axios
    .get(`https://api.research.bisue.shop/data/${community}/${date}/${type}/${page}`)
    .then(response => response.data);

  return paginator;
};

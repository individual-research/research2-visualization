import axios from 'axios';
import { Comment } from './useData';

export const useComments = async (community: string, date: string, type: string, page: number, search?: string, searchType?: string) => {
  const paginator: { data: Comment[]; maxPage: number } = await axios
    .get(
      `https://api.research.bisue.shop/data/${community}/${date}/${type}/${page}${search ? `?search=${search}` : ''}${
        searchType && search ? `&search_type=${searchType}` : ''
      }`
    )
    .then(response => response.data);

  return paginator;
};

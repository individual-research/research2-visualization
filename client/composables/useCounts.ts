import axios from 'axios';

export const useCounts = async (community: string, date: string, search?: string, searchType?: string) => {
  const counts: { [key: string]: number } = await axios
    .get(
      `https://api.research.bisue.shop/count/${community}/${date}${search ? `?search=${search}` : ``}${
        searchType && search ? `&search_type=${searchType}` : ''
      }`
    )
    .then(response => response.data);

  return counts;
};

import axios from 'axios';

export const useCounts = async (community: string, date: string, search?: string) => {
  const counts: { [key: string]: number } = await axios
    .get(`https://api.research.bisue.shop/count/${community}/${date}${search ? `?search=${search}` : ``}`)
    .then(response => response.data);

  return counts;
};

import axios from 'axios';

export const useCounts = async (community: string, date: string) => {
  const counts: { [key: string]: number } = await axios.get(`https://api.research.bisue.shop/count/${community}/${date}`).then(response => response.data);

  return counts;
};

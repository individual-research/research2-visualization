import axios from 'axios';

export const useCounts = async (community: string) => {
  const counts: { [key: string]: number } = await axios.get(`https://api.research.bisue.shop/count/${community}`).then(response => response.data);

  return counts;
};

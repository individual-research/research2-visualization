import data from './data.json';

export interface HateSpeech {
  content: string;
  postLink: string;
  postDate: string;
  postTitle: string;
}

export interface Community {
  community: string;
  relationships: {
    [group: string]: {
      score: number;
      hates: HateSpeech[];
    };
  };
}

const communityData: Community[] = data;

export default communityData;

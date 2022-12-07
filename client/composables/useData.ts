import axios from 'axios';

export interface Comment {
  postLink: string;
  postDate: string;
  postTitle: string;
  author: string;
  date: string;
  content: string;
  percents: number[];
  labels: string[];
  no: number;
}

export const labels = ['출신', '외모', '정치성향', '욕설', '연령', '성', '인종', '종교', '일반'];

function countLabels(comments: Comment[]) {
  const counts: { [key: string]: number } = {};

  for (const label of labels) {
    counts[label] = 0;
  }

  for (const comment of comments) {
    for (const label of comment.labels) {
      counts[label]++;
    }
  }

  return counts;
}

function splitLabels(comments: Comment[]) {
  const data: { [key: string]: Comment[] } = {};

  for (const label of labels) {
    data[label] = [];
  }

  for (const comment of comments) {
    for (const label of comment.labels) {
      data[label].push(comment);
    }
  }

  return data;
}

export const useData = async (community: string) => {
  const allComments: Comment[] = await axios.get(`https://api.research.bisue.shop/data/${community}`).then(response => response.data);

  const counts = countLabels(allComments);
  const comments = splitLabels(allComments);
  const total = allComments.length;

  return { community, comments, counts, total, labels: Object.keys(counts) };
};

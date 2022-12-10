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

export const dates = [
  '2022-10-20',
  '2022-10-21',
  '2022-10-22',
  '2022-10-23',
  '2022-10-24',
  '2022-10-25',
  '2022-10-26',
  '2022-10-27',
  '2022-10-28',
  '2022-10-29',
  '2022-10-30',
  '2022-10-31',
  '2022-11-01',
  '2022-11-02',
  '2022-11-03',
  '2022-11-04',
  '2022-11-05',
  '2022-11-06',
  '2022-11-07',
  '2022-11-08',
  '2022-11-09',
  '2022-11-10',
  '2022-11-11',
  '2022-11-12',
  '2022-11-13',
  '2022-11-14',
  '2022-11-15',
  '2022-11-16',
  '2022-11-17',
  '2022-11-18',
  '2022-11-19',
  '2022-11-20',
];

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

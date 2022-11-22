import axios from 'axios';

export interface Comment {
  postLink: string;
  postDate: string;
  postTitle: string;
  author: string;
  date: string;
  content: string;
  label: string;
  no: number;
}

function countLabels(comments: Comment[]) {
  const counts: { [key: string]: number } = {};

  for (const comment of comments) {
    if (!(comment.label in counts)) {
      counts[comment.label] = 0;
    }

    counts[comment.label]++;
  }

  return counts;
}

function splitLabels(comments: Comment[]) {
  const data: { [key: string]: Comment[] } = {};

  for (const comment of comments) {
    if (!(comment.label in data)) {
      data[comment.label] = [];
    }

    data[comment.label].push(comment);
  }

  return data;
}

export const useData = async (community: string) => {
  const allComments: Comment[] = await axios.get(`https://api.research.bisue.shop/data/${community}`).then(response => response.data);

  const counts = countLabels(allComments);
  const comments = splitLabels(allComments);
  const total = allComments.length;

  return { comments, counts, total, labels: Object.keys(counts) };
};

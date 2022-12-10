import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

const labels = ['출신', '외모', '정치성향', '욕설', '연령', '성', '인종', '종교', '일반'];

function countLabels(comments: any[]) {
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

function splitLabels(comments: any[]) {
  const data: { [key: string]: any[] } = {};

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

// const rawCommunityData: {
//   [key: string]: any[];
// } = {
//   dcinside: JSON.parse(fs.readFileSync('data/dcinside.json').toString()) as any[],
//   fmkorea: JSON.parse(fs.readFileSync('data/fmkorea.json').toString()) as any[],
// };

// const communityData: {
//   [key: string]: ReturnType<typeof splitLabels>;
// } = {
//   dcinside: splitLabels(rawCommunityData['dcinside']),
//   fmkorea: splitLabels(rawCommunityData['fmkorea']),
// };

// const countData: {
//   [key: string]: ReturnType<typeof countLabels>;
// } = {
//   dcinside: countLabels(rawCommunityData['dcinside']),
//   fmkorea: countLabels(rawCommunityData['fmkorea']),
// };

dotenv.config();

const app = express();
const port = process.env.PORT ?? '8081';

app.use(cors());

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');

  console.log('123');
});

app.get('/data/:community/:date/:type/:page', (req, res) => {
  const { community, date, type, page } = req.params;

  const perPage = 20;
  const pageInt = Number.parseInt(page);

  try {
    const comments: Comment[] = JSON.parse(fs.readFileSync(`data/${community}/${community}_labeled-${date}.json`).toString());
    const splited = splitLabels(comments);

    return res.json({
      data: splited[type].slice((pageInt - 1) * perPage, pageInt * perPage),
      maxPage: Math.ceil(splited[type].length / perPage),
    });
  } catch (e) {
    return res.json(null).status(404);
  }
});

app.get('/count/:community/:date', (req, res) => {
  const { community, date } = req.params;

  console.log(community, date);

  try {
    const comments: Comment[] = JSON.parse(fs.readFileSync(`data/${community}/${community}_labeled-${date}.json`).toString());
    const counts = countLabels(comments);

    return res.json(counts);
  } catch (e) {
    return res.json(null).status(404);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

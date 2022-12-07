import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

const communityData: {
  [key: string]: any[];
} = {
  dcinside: JSON.parse(fs.readFileSync('data/dcinside.json').toString()) as any[],
  fmkorea: JSON.parse(fs.readFileSync('data/fmkorea.json').toString()) as any[],
};

dotenv.config();

const app = express();
const port = process.env.PORT ?? '8081';

app.use(cors());

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');

  console.log('123');
});

app.get('/data/:community', (req, res) => {
  const { community } = req.params;

  console.log('data');

  if (community in communityData) {
    return res.json(communityData[community]);
  } else {
    return res.json(null).status(404);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

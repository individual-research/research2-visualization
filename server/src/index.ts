import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dcinsideData from '../data/dcinside_comments.json';
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

  if (community === 'dcinside') return res.json(dcinsideData);
  else return res.json(null);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

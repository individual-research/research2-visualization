import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

interface CommentByAutor {
  author: string;
  comments: any[];
}

const dcinsideData: any = JSON.parse(fs.readFileSync('data/dcinside_comments.json').toString());
const commentsByAuthor: CommentByAutor[] = JSON.parse(fs.readFileSync('data/comments_labeled_author.json').toString());

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

app.get('/author', (req, res) => {
  const authors = commentsByAuthor.map(a => a.author);

  return res.json(authors);
});
app.get('/author/:author', (req, res) => {
  const { author } = req.params;

  const target = commentsByAuthor.find(a => a.author === author);
  if (!target) return res.json(null).status(404);

  const comments = target.comments;

  return res.json(comments);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

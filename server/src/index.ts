import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT ?? '8080';

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');

  console.log('123');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

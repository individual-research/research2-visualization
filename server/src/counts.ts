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

const files = fs.readdirSync('data/fmkorea_경찰');

for (const file of files) {
  const comments: Comment[] = JSON.parse(fs.readFileSync(`data/fmkorea_경찰/${file}`).toString());

  const counts = countLabels(comments);

  fs.writeFileSync(`data/fmkorea_경찰_counts/counts_${file}`, JSON.stringify(counts, null, 2));
}

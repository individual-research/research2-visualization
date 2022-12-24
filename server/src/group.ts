import fs from 'fs';

function groupKeyword(comments: any[], keyword: string) {
  return comments.filter(comment => comment.content.includes(keyword));
}

const files = fs.readdirSync('data/fmkorea');
const keyword = '경찰';

for (const file of files) {
  const comments: Comment[] = JSON.parse(fs.readFileSync(`data/fmkorea/${file}`).toString());

  const group = groupKeyword(comments, keyword);

  fs.writeFileSync(`data/fmkorea_${keyword}/${file}`, JSON.stringify(group, null, 2));
}

import fs from 'fs';

function load(community: string, date: string): any[] {
  console.log(`loading.. ${community}, ${date}`);
  return JSON.parse(fs.readFileSync(`data/${community}/${community}_labeled-${date}.json`).toString());
}

const cache: {
  [community: string]: {
    [date: string]: any[];
  };
} = {
  dcinside: {
    '2022-10-20': load('dcinside', '2022-10-20'),
    '2022-10-21': load('dcinside', '2022-10-21'),
    '2022-10-22': load('dcinside', '2022-10-22'),
    '2022-10-23': load('dcinside', '2022-10-23'),
    '2022-10-24': load('dcinside', '2022-10-24'),
    '2022-10-25': load('dcinside', '2022-10-25'),
    '2022-10-26': load('dcinside', '2022-10-26'),
    '2022-10-27': load('dcinside', '2022-10-27'),
    '2022-10-28': load('dcinside', '2022-10-28'),
    '2022-10-29': load('dcinside', '2022-10-29'),
    '2022-10-30': load('dcinside', '2022-10-30'),
    '2022-10-31': load('dcinside', '2022-10-31'),
    '2022-11-01': load('dcinside', '2022-11-01'),
    '2022-11-02': load('dcinside', '2022-11-02'),
    '2022-11-03': load('dcinside', '2022-11-03'),
    '2022-11-04': load('dcinside', '2022-11-04'),
    '2022-11-05': load('dcinside', '2022-11-05'),
    '2022-11-06': load('dcinside', '2022-11-06'),
    '2022-11-07': load('dcinside', '2022-11-07'),
    '2022-11-08': load('dcinside', '2022-11-08'),
    '2022-11-09': load('dcinside', '2022-11-09'),
    '2022-11-10': load('dcinside', '2022-11-10'),
    '2022-11-11': load('dcinside', '2022-11-11'),
    '2022-11-12': load('dcinside', '2022-11-12'),
    '2022-11-13': load('dcinside', '2022-11-13'),
    '2022-11-14': load('dcinside', '2022-11-14'),
    '2022-11-15': load('dcinside', '2022-11-15'),
    '2022-11-16': load('dcinside', '2022-11-16'),
    '2022-11-17': load('dcinside', '2022-11-17'),
    '2022-11-18': load('dcinside', '2022-11-18'),
    '2022-11-19': load('dcinside', '2022-11-19'),
    '2022-11-20': load('dcinside', '2022-11-20'),
  },
  fmkorea: {
    '2022-10-20': load('fmkorea', '2022-10-20'),
    '2022-10-21': load('fmkorea', '2022-10-21'),
    '2022-10-22': load('fmkorea', '2022-10-22'),
    '2022-10-23': load('fmkorea', '2022-10-23'),
    '2022-10-24': load('fmkorea', '2022-10-24'),
    '2022-10-25': load('fmkorea', '2022-10-25'),
    '2022-10-26': load('fmkorea', '2022-10-26'),
    '2022-10-27': load('fmkorea', '2022-10-27'),
    '2022-10-28': load('fmkorea', '2022-10-28'),
    '2022-10-29': load('fmkorea', '2022-10-29'),
    '2022-10-30': load('fmkorea', '2022-10-30'),
    '2022-10-31': load('fmkorea', '2022-10-31'),
    '2022-11-01': load('fmkorea', '2022-11-01'),
    '2022-11-02': load('fmkorea', '2022-11-02'),
    '2022-11-03': load('fmkorea', '2022-11-03'),
    '2022-11-04': load('fmkorea', '2022-11-04'),
    '2022-11-05': load('fmkorea', '2022-11-05'),
    '2022-11-06': load('fmkorea', '2022-11-06'),
    '2022-11-07': load('fmkorea', '2022-11-07'),
    '2022-11-08': load('fmkorea', '2022-11-08'),
    '2022-11-09': load('fmkorea', '2022-11-09'),
    '2022-11-10': load('fmkorea', '2022-11-10'),
    '2022-11-11': load('fmkorea', '2022-11-11'),
    '2022-11-12': load('fmkorea', '2022-11-12'),
    '2022-11-13': load('fmkorea', '2022-11-13'),
    '2022-11-14': load('fmkorea', '2022-11-14'),
    '2022-11-15': load('fmkorea', '2022-11-15'),
    '2022-11-16': load('fmkorea', '2022-11-16'),
    '2022-11-17': load('fmkorea', '2022-11-17'),
    '2022-11-18': load('fmkorea', '2022-11-18'),
    '2022-11-19': load('fmkorea', '2022-11-19'),
    '2022-11-20': load('fmkorea', '2022-11-20'),
  },
};

export default cache;

import fs from 'fs';
import iconv from 'iconv-lite';

const encodings = ['utf8'];

const buffer = fs.readFileSync('./files/election_euro_2024.csv');

encodings.forEach(enc => {
  const decoded = iconv.decode(buffer, enc);
  console.log(`--- Encodage testé : ${enc} ---`);
  console.log(decoded.slice(6000, 8000));
  console.log('\n');
});
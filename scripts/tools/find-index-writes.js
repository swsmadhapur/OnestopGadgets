const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/venkatajagadeesh/.gemini/antigravity/brain/a54c31e0-b6ad-4c75-acac-ae97ff32e339/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

let lineNum = 0;
let highestNum = 0;

rl.on('line', (line) => {
  lineNum++;
  if (lineNum > 264 && lineNum < 1000) {
    if (line.includes('write_file') && line.includes('index.html')) {
      highestNum = lineNum;
      console.log('Line', lineNum, 'length:', line.length);
    }
  }
});

rl.on('close', () => {
  console.log('Highest lineNum with write_file index.html:', highestNum);
});

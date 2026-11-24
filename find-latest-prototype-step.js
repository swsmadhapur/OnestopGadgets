const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/venkatajagadeesh/.gemini/antigravity/brain/a54c31e0-b6ad-4c75-acac-ae97ff32e339/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

let lineNum = 0;
let highestNum = 0;
let highestLine = null;

rl.on('line', (line) => {
  lineNum++;
  // We want the last line that touched prototype/index.html before line 1286
  if (lineNum > 57 && lineNum < 1240) {
    if (line.includes('design/prototype/index.html') || line.includes('design\\\\prototype\\\\index.html')) {
      highestNum = lineNum;
      console.log('Found lineNum:', lineNum, 'length:', line.length);
    }
  }
});

rl.on('close', () => {
  console.log('Highest lineNum with prototype:', highestNum);
});

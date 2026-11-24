const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/venkatajagadeesh/.gemini/antigravity/brain/a54c31e0-b6ad-4c75-acac-ae97ff32e339/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

let lineNum = 0;
rl.on('line', (line) => {
  lineNum++;
  if (lineNum >= 1010 && lineNum <= 1018) {
    try {
      const obj = JSON.parse(line);
      console.log('Line', lineNum, 'type:', obj.type, 'len:', line.length);
      if (obj.content) {
        fs.writeFileSync(`c:/one stop Gadgets/response_line_${lineNum}.txt`, obj.content);
        console.log('Saved response content for line', lineNum, 'length:', obj.content.length);
      }
    } catch(e) {}
  }
});

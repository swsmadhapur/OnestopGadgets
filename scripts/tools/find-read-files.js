const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/venkatajagadeesh/.gemini/antigravity/brain/a54c31e0-b6ad-4c75-acac-ae97ff32e339/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

let lineNum = 0;
rl.on('line', (line) => {
  lineNum++;
  if (lineNum > 1000 && lineNum < 1240) {
    if (line.includes('read_file')) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls && obj.tool_calls[0] && obj.tool_calls[0].name === 'read_file') {
          console.log('Line', lineNum, 'read_file:', obj.tool_calls[0].args.Path);
        }
      } catch(e) {}
    }
  }
});

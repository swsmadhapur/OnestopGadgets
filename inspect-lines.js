const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/venkatajagadeesh/.gemini/antigravity/brain/a54c31e0-b6ad-4c75-acac-ae97ff32e339/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

let lineNum = 0;
rl.on('line', (line) => {
  lineNum++;
  if (lineNum === 1160 || lineNum === 1180 || lineNum === 1208 || lineNum === 1223) {
    try {
      const obj = JSON.parse(line);
      console.log('Line', lineNum, 'keys:', Object.keys(obj));
      if (obj.tool_calls && obj.tool_calls[0]) {
        console.log('Line', lineNum, 'tool:', obj.tool_calls[0].name, 'Path:', obj.tool_calls[0].args.Path);
        if (obj.tool_calls[0].args.Content) {
          console.log('Content len:', obj.tool_calls[0].args.Content.length);
          fs.writeFileSync(`c:/one stop Gadgets/line_${lineNum}_content.txt`, obj.tool_calls[0].args.Content);
        }
      }
    } catch(e) {
      console.error(e);
    }
  }
});

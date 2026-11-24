const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/venkatajagadeesh/.gemini/antigravity/brain/a54c31e0-b6ad-4c75-acac-ae97ff32e339/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

let lineNum = 0;
let edits = [];
rl.on('line', (line) => {
  lineNum++;
  if (lineNum >= 264 && lineNum <= 750) {
    if (line.includes('edit_file') && line.includes('prototype')) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls && obj.tool_calls[0] && obj.tool_calls[0].name === 'edit_file') {
          edits.push({
            lineNum,
            target: obj.tool_calls[0].args.Target,
            replacement: obj.tool_calls[0].args.Replacement
          });
        }
      } catch(e) {}
    }
  }
});

rl.on('close', () => {
  console.log('Total edits found:', edits.length);
  fs.writeFileSync('c:/one stop Gadgets/all_edits.json', JSON.stringify(edits, null, 2));
  console.log('Saved all_edits.json');
});

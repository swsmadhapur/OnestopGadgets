const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/venkatajagadeesh/.gemini/antigravity/brain/a54c31e0-b6ad-4c75-acac-ae97ff32e339/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

let lineNum = 0;
rl.on('line', (line) => {
  lineNum++;
  if (lineNum === 264) {
    try {
      const obj = JSON.parse(line);
      let content = obj.tool_calls[0].args.Content;
      if (typeof content === 'string' && content.startsWith('"')) {
        content = JSON.parse(content);
      }
      fs.writeFileSync('c:/one stop Gadgets/line_264_doc.html', content);
      console.log('Saved line 264 doc, len:', content.length);
    } catch(e) {
      console.error(e);
    }
  }
});

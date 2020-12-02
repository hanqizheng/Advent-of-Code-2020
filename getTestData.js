const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const array = [];
  const fileStream = fs.createReadStream('test');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    array.push(line);
  }

  return array;
}

module.exports = {
  getTestData: processLineByLine,
}
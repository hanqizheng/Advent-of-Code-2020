const { dataHandler } = require('./dataHandler');

function test() {
  const data = dataHandler();
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    const tempMap = {};
    const everyoneLen = data[i].split('\n').length;
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === '\n') {
        continue;
      }
      Object.assign(tempMap, { [data[i][j]]: tempMap[data[i][j]] ? tempMap[data[i][j]] + 1 : 1 });
    }
    Object.keys(tempMap).forEach((item) => {
      if (tempMap[item] === everyoneLen) {
        result += 1;
      }
    });
  }

  console.log(result);
  return;
}

test();
const { dataHandler } = require('./dataHandler');

function test() {
  const data = dataHandler();
  // console.log(data[0]);
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    const tempMap = {};
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === '\n') {
        continue;
      }
      Object.assign(tempMap, { [data[i][j]]: tempMap[data[i][j]] ? tempMap[data[i][j]] + 1 : 1 });
    }
    result += Object.keys(tempMap).length;
  }

  console.log(result);
  return;
}

test();
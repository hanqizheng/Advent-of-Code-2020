const { getTestData } = require('../getTestData');

async function test() {
  const data = await getTestData();
  const rowLength = data[0].length;
  let treeCount = 0;
  let col = 0;

  for (let row = 0; row < data.length; row++) {
    if (col >= rowLength) {
      col = col % rowLength
    }
    if (data[row][col] === '#') {
      treeCount += 1;
    }
    col += 3;
  }
  console.log(data);
  console.log('result: ', treeCount);
  return;
}

test();
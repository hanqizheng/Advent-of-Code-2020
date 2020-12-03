const { getTestData } = require('../getTestData');

async function test() {
  const data = await getTestData();
  const rowLength = data[0].length;
  let tree = [];

  const slopes = [
    { col: 1, row: 1 },
    { col: 3, row: 1 },
    { col: 5, row: 1 },
    { col: 7, row: 1 },
    { col: 1, row: 2 },
  ]

  for (let i = 0; i < slopes.length; i++) {
    let treeCount = 0;
    let col = 0;
    for (let row = 0; row < data.length; row += slopes[i].row) {
      if (col >= rowLength) {
        col = col % rowLength
      }
      if (data[row][col] === '#') {
        treeCount += 1;
      }
      col += slopes[i].col;
    }
    tree.push(treeCount);
  }
  

  console.log('result: ', tree);
  return;
}

test();
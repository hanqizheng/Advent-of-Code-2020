const { getTestData } = require('../getTestData');

function getPosition (start, end, step) {
  let tempStart = start;
  let tempEnd = end;
  if (tempStart >= tempEnd || tempEnd - tempStart <= 1) {
    return step === 'F' || step === 'L' ? start : end;
  } 
  if (step.slice(0, 1) === 'B' || step.slice(0, 1) === 'R') {
    tempStart = Math.ceil((start + end) / 2);
  } else if (step.slice(0, 1) === 'F' || step.slice(0, 1) === 'L') {
    tempEnd = Math.floor((start + end) / 2);
  }
  return getPosition(tempStart, tempEnd, step.slice(1, step.length))
}

async function test() {
  let data = await getTestData();
  data = data.map((item) => ({
    row: item.slice(0, 7),
    col: item.slice(7, item.length),
  }));

  let ids = new Set([]);
  for (let i = 0; i < data.length; i++) {
    const currentRow = getPosition(0, 127, data[i].row);
    const currentCol = getPosition(0, 7, data[i].col);
    const id = currentRow * 8 + currentCol;
    ids.add(id);
  }
  // 排序为了排除掉开头结尾
  ids = new Set([...Array.from(ids).sort((a, b) => a - b)]);
  ids.forEach((value) => {
    if (!ids.has(value + 1)) {
      console.log(value + 1);
    }
  })

  return;
}

test();
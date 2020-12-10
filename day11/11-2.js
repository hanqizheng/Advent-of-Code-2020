const { getTestData } = require('../getTestData');

function findFirstSeatOnDirection(data, row, col, rowStep, colStep) {
  if (col < 0 || row < 0 || row >= data.length || col >= data[row].length) {
    return '';
  }
  if (data[row][col] === '#' || data[row][col] === 'L') {
    return data[row][col];
  }
  return findFirstSeatOnDirection(data, row + rowStep, col + colStep, rowStep, colStep);
}

function countSeats(aim, data, i, j) {
  let count = 0;
  for (let col = j - 1; col <= j + 1; col++) {
    for (let row = i - 1; row <= i + 1; row++) {
      if (
        col < 0 || row < 0 ||
        (col === j && row === i) ||
        col >= data[i].length || row >= data.length
      ) {
        continue;
      }
      // 只需要把之前判断1/8的点变成一个1/8方向然后递归直到找到一个座位为止
      // 到达边界都没找到则是一路地板罢了
      if (findFirstSeatOnDirection(data, row, col, row - i, col - j) === aim) {
        count += 1;
      }
    }
  }
  return count;
}

async function test() {
  let data = await getTestData();
  data = data.map((item) => item.split(''));

  let preOccupiedSeats = 0;
  while (true) {
    const tempData = [];
    for (let i = 0; i < data.length; i++) {
      const tempRow = [];
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === 'L') {
          if (countSeats('#', data, i, j) === 0) {
            tempRow.push('#');
            continue;
          }
        } else if (data[i][j] === '#') {
          if (countSeats('#', data, i, j) >= 5) {
            tempRow.push('L');
            continue;
          }
        }
        tempRow.push(data[i][j]);
      }
      tempData.push(tempRow);
    }

    let occupiedSeats = 0;
    for (let k = 0; k < tempData.length; k++) {
      for (let m = 0; m < tempData[k].length; m++) {
        if (data[k][m] === '#') {
          occupiedSeats += 1;
        }
      }
    }

    if (preOccupiedSeats && occupiedSeats && preOccupiedSeats === occupiedSeats) {
      break;
    }
    preOccupiedSeats = occupiedSeats;
    data = tempData;
  }
  console.log(preOccupiedSeats);
  return;
}

test();
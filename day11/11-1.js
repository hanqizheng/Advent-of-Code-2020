const { getTestData } = require('../getTestData');

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
      if (data[row][col] === aim) {
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
          if (countSeats('#', data, i, j) >= 4) {
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
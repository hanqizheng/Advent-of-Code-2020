const { getTestData } = require('../getTestData');

function buildMap(arr, nextNum) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    Object.assign(map, { [nextNum - arr[i]]: Number(arr[i]) });
  }
  return map;
}

async function test() {
  let data = await getTestData();
  data = data.map((item) => Number(item));
  let invalidNum = 0;
  let invalidNumIndex = 0;

  for (let i = 25; i < data.length; i++) {
    const preamble = data.slice(i - 25, i + 25);
    const preambleMap = buildMap(preamble, data[i]);
    let j = 0;
    while (j < preamble.length) {
      if (preambleMap[preamble[j]]) {
        break;
      }
      j++;
    }
    if (j === preamble.length) {
      invalidNumIndex = i;
      invalidNum = data[i];
      break;
    }
  }

  // ----------------- find the invalid number ----------------- //

  for (let k = 0; k < invalidNumIndex - 1; k++) {
    let flag = false;
    let aim = [data[k]];
    let sum = data[k];
    for (let m = k + 1; m < invalidNumIndex; m++) {
      if (sum > invalidNum) {
        break;
      }
      if (sum === invalidNum) {
        flag = true;
        break;
      }
      sum += data[m];
      aim.push(data[m]);
    }

    if (flag) {
      console.log('result: ', aim.sort((a, b) => a - b), aim[0] + aim[aim.length - 1]);
      break;
    }
  }

  return;
}

test();
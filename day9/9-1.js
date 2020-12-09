const { getTestData } = require('../getTestData');

function buildMap(arr, nextNum) {
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    Object.assign(map, { [nextNum - arr[i]]: Number(arr[i]) });
  }
  return map;
}

async function test() {
  const data = await getTestData();

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
      console.log('result: ', data[i], i);
      break;
    }
  }
  return;
}

test();
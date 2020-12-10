const { getTestData } = require('../getTestData');

const chargingOutlet = 0; // Treat the charging outlet near your seat as having an effective joltage rating of 0.


function createAdapterRange(current) {
  const array = new Array();
  for (let i = 1; i < 4; i++) {
    array.push(current + i);
  }
  return array;
}

async function test() {
  let data = await getTestData();
  const adapterMap = {};
  data = data.map((item, index) => {
    Object.assign(adapterMap, { [item]: { index, done: false } });
    return Number(item);
  });

  let currentAdapter = chargingOutlet;
  const differencesMap = {
    1: 0, // differences amount of 1
    2: 0, // differences amount of 2
    3: 0, // differences amount of 3
  }

  while (data.length) {
    const range = createAdapterRange(currentAdapter);
    for (let i = 0; i < range.length; i++) {
      if (adapterMap[range[i]] && !adapterMap[range[i]].done) {
        differencesMap[range[i] - currentAdapter] += 1;
        currentAdapter = range[i];
        data = data.filter((item) => item !== range[i]);
        adapterMap[range[i]].done = true;
        break;
      }
    }
  }

  // +1 是因为最后要连接自己的device 永远是+3的情况
  console.log('result: ', differencesMap, differencesMap[1] * (differencesMap[3] + 1));

  return;
}

test();
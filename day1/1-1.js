const { getTestData } = require('../getTestData');

async function test() {
  const data = await getTestData();
  const aimMap = {};
  for (let i = 0; i < data.length; i++) {
    Object.assign(aimMap, { [2020 - data[i]]: data[i] })
  }
  for (let i = 0; i < data.length; i++) {
    if (aimMap[otherItem]) {
      console.log(`${aimMap[data[i]]} : ${data[i]} = ${aimMap[data[i]] * data[i]}`);
      return aimMap[data[i]] * data[i];
    }
  }
}

test();
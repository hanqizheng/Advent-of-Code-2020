const { getTestData } = require('./getTestData');

async function test() {
  const data = await getTestData();
  const aimMap = {};
  for (let i = 0; i < data.length; i++) {
    Object.assign(aimMap, { [2020 - data[i]]: data[i] })
  }

  for (let i = 1; i < data.length - 1; i++) {
    for(let j = i + 1; j < data.length; j ++) {
      if (aimMap[Number(data[i]) + Number(data[j])]) {
        console.log(`${aimMap[Number(data[i]) + Number(data[j])]} + ${data[i]} + ${data[j]} = 2020`)
      }
    }
  }
}

test();
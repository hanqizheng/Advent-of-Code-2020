const { getTestData } = require('../getTestData');

function createAdapterRange(current) {
  const set = new Set();
  for (let i = 1; i < 4; i++) {
    if (current - i >= 0) {
      set.add(current - i);
    }
  }
  return set;
}

async function test() {
  let data = await getTestData();
  const arrangmentCache = new Map([[0, 1]]);
  data = data.map((item) => Number(item)).sort((a, b) => a - b);
  data.unshift(0); // // Treat the charging outlet near your seat as having an effective joltage rating of 0.
  data.push(data[data.length - 1] + 3);
  for (let i = 1; i < data.length; i++) {
    const range = createAdapterRange(data[i]);
    let tempArrangement = 0;
    for (let value of range) {
      if (arrangmentCache.has(value)) {
        tempArrangement += arrangmentCache.get(value);
      }
    }
    arrangmentCache.set(data[i], tempArrangement);
  }
  console.log(arrangmentCache);
  return;
}

test();
const { getTestData } = require('../getTestData');

function countArrangment(arrangmentCache, data, from) {
  if (arrangmentCache.has(from)) {
    return arrangmentCache.get(from);
  }
  let count = 0;
  for (
    let next = from + 1;
    next < data.length && data[next] - data[from] <= 3;
    next++
  ) {
    count += countArrangment(arrangmentCache, data, next);
  }
  count = count || 1;
  arrangmentCache.set(from, count);
  return count;
}


async function test() {
  let data = await getTestData();
  const arrangmentCache = new Map();
  data = data.map((item) => Number(item)).sort((a, b) => a - b);
  data.unshift(0); // // Treat the charging outlet near your seat as having an effective joltage rating of 0.
  data.push(data[data.length - 1] + 3);
  console.log(data);

  console.log(countArrangment(arrangmentCache, data, 0));
  return;
}

test();
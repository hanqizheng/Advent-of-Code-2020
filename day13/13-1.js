const { getTestData } = require('../getTestData');

async function test() {
  const data = await getTestData();
  const earliestTime = Number(data[0]);
  const busIds = data[1].split(',').filter((item) => item !== 'x').map((item) => Number(item));

  // 找到一个规律
  // busId - (earliestTime % busId) = 下一趟车的时间间隔
  // 所以取这个最小的值即可

  let resultBus = busIds[0];
  let minDepartGap = busIds[0] - (earliestTime % busIds[0]);

  for (let i = 1; i < busIds.length; i++) {
    if (busIds[i] - (earliestTime % busIds[i]) < minDepartGap) {
      minDepartGap = busIds[i] - (earliestTime % busIds[i]);
      resultBus = busIds[i];
    }
  }

  console.log(resultBus * minDepartGap);
  return;
}

test();
const { getTestData } = require('../getTestData');

function extendGcd(a, b) {
  if (b == 0) // 边界
  {
    x = 1;
    y = 0; // y可以为任意数，这里取0
    return a;
  }
  const r = extendGcd(b, a % b);
  const t = x;
  x = y; // 更新解的过程
  y = t - a / b * y; // 更新解的过程
  return r;
}

async function test() {
  const data = await getTestData();
  const busIds = data[1].split(',').filter((item) => item !== 'x').map((item) => Number(item));
  const temp = data[1].split(',').map((item) => {
    if (item === 'x') {
      return item;
    }
    return Number(item);
  });

  const gapOffsetMap = {};


  const basicResult = [];

  for (let i = 0; i < temp.length; i++) {
    if (temp[i] !== 'x') {
      Object.assign(gapOffsetMap, { [temp[i]]: i });
    }
  }

  console.log(busIds)
  console.log(gapOffsetMap)
  console.log(extendGcd(59, 31));

  return;
}

test();



  // let j = 100000000000005;
  // // let j = 0;
  // let resultTimeStam;
  // while (true) {
  //   const aim = busIds[0] * j;
  //   console.log(aim);
  //   let k = 1;
  //   while (k < busIds.length) {
  //     if (gapOffsetMap[busIds[k]] !== busIds[k] - (aim % busIds[k])) {
  //       break;
  //     }
  //     k++;
  //   }
  //   if (k === busIds.length) {
  //     resultTimeStam = aim;
  //     break;
  //   }
  //   j += 7;
  // }
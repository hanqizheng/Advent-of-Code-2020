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

  console.log(busIds);
  console.log(temp);

  return;
}

test();
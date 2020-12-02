const { getTestData } = require('./getTestData');

async function test() {
  const data = await getTestData();
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    // preparation
    let [range, aim, str] = data[i].split(' ');
    range = range.split('-').map((item) => Number(item));
    aim = aim[0];
    str = str.split('');
    
    // if (
    //   (str[range[0] - 1] === aim && str[range[1] - 1] !== aim) ||
    //   (str[range[0] - 1] !== aim && str[range[1] - 1] === aim)
    // ) {
    //   result += 1;
    // }
    // solution
    if (str[range[0] - 1] === aim && str[range[1] - 1] !== aim) {
      result += 1;
      continue;
    }
    if (str[range[0] - 1] !== aim && str[range[1] - 1] === aim) {
      result += 1;
      continue;
    }
  }

  console.log('result: ', result);
  return;
}

test();
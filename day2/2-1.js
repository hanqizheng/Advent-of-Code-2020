const { getTestData } = require('../getTestData');

async function test() {
  const data = await getTestData();
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    // preparation
    let [range, aim, str] = data[i].split(' ');
    range = range.split('-').map((item) => Number(item));
    aim = aim[0];
    str = str.split('');
    
    // solution
    let count = 0;
    for(let j = 0; j < str.length; j++) {
      if (str[j] === aim) {
        count += 1;
      }
    }

    if (count >= range[0] && count <= range[1]) {
      result += 1;
    }
  }

  console.log('result: ', result);
  return;
}

test();
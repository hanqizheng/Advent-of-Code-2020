const { dataHandler } = require('./dataHandler');

function test() {
  const data = dataHandler();
  const filed = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
  let result = 0;

  for(let i = 0; i < data.length; i++) {
    const regex = /[\n|\s]/g;
    const passport = {};
    data[i].replace(regex, 'split').split('split').forEach((item) => {
      const [key, value] = item.split(':');
      Object.assign(passport, { [key]: value });
    })
    let flag = 'valid'
    for (let j = 0; j < filed.length; j++) {
      if (!passport[filed[j]] && filed[j] !== 'cid') {
        flag = 'invalid'
        break;
      }
    }

    if (flag === 'valid') {
      result += 1;
    }
  }

  console.log('result: ', result);
  return;
}

test();
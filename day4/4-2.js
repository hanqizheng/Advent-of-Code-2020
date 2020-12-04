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
      if (filed[j] === 'byr' && (Number(passport[filed[j]]) < 1920 || Number(passport[filed[j]]) > 2002)) {
        flag = 'invalid';
        break;
      }
      if (filed[j] === 'iyr' && (Number(passport[filed[j]]) < 2010 || Number(passport[filed[j]]) > 2020)) {
        flag = 'invalid';
        break;
      }
      if (filed[j] === 'eyr' && (Number(passport[filed[j]]) < 2020 || Number(passport[filed[j]]) > 2030)) {
        flag = 'invalid';
        break;
      }
      if (filed[j] === 'hgt') {
        const unit = passport[filed[j]].slice(passport[filed[j]].length - 2, passport[filed[j]].length);
        const num = Number(passport[filed[j]].slice(0, passport[filed[j]].length - 2));
        if (unit !== 'cm' && unit !== 'in') {
          flag = 'invalid';
          break;
        }
        if (unit === 'cm' && (num < 150 || num > 193)) {
          flag = 'invalid';
          break;
        } else if (unit === 'in' && (num < 59 || num > 76)) {
          flag = 'invalid';
          break;
        }
      }
      if (filed[j] === 'hcl' && !/(?<=#)[0-9a-f]{6}/.test(passport[filed[j]])) {
        flag = 'invalid';
        break;
      }
      if (filed[j] === 'ecl' && !["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].find((item) => item === passport[filed[j]])) {
        flag = 'invalid';
        break;
      }
      if (filed[j] === 'pid' && !/^\d{9}$/.test(passport[filed[j]])) {
        flag = 'invalid';
        break;
      }
    }

    if (flag === 'valid') {
      // console.log('------------')
      console.log(passport.hcl);
      result += 1;
    }
  }

  console.log('result: ', result);
  return;
}

test();
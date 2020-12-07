const { getTestData } = require('../getTestData');

async function test() {
  const data = await getTestData();
  let accumulator = 0;
  let index = 0;

  while (index < data.length) {
    if (data[index].done) {
      break;
    }
    const option = /[a-z]*/.exec(data[index])[0];
    const optionValue = Number(/(\+|\-)\d*/.exec(data[index])[0]);
    data[index] = { value: data[index], done: true };
    if (option === 'acc') {
      accumulator += optionValue;
      index += 1;
    } else if (option === 'jmp') {
      index += optionValue;
    } else if (option === 'nop') {
      index += 1;
    }    
  }

  console.log('result11: ', accumulator);
  return;
}

test(); 
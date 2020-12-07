const { getTestData } = require('../getTestData');

function getOptionInfo(data) {
  const option = /[a-z]*/.exec(data)[0];
  const optionValue = Number(/(\+|\-)\d*/.exec(data)[0]);

  return { option, optionValue }
}

async function test() {
  let data = await getTestData();
  let temp = data.map((item) => item);
  let index = 0;

  const stepStack = [];

  while (true) {
    if (temp[index].done) {
      break;
    }
    const { option, optionValue } = getOptionInfo(temp[index]);
    temp[index] = { value: temp[index], done: true, index };
    stepStack.push(temp[index]);
    if (option === 'acc') {
      index += 1;
    } else if (option === 'jmp') {
      index += optionValue;
    } else if (option === 'nop') {
      index += 1;
    }
  }

  let aimIndex = 0;
  let accumulator = 0;

  while (stepStack.length) {
    // 每次找寻出路的时候，要重置temp
    temp = data.map((item) => item);
    const currentStep = stepStack.pop(); // step栈弹出的一步
    const { option: currentOption, optionValue: currentOptionValue } = getOptionInfo(currentStep.value);
    let currentIndex = currentStep.index;
    aimIndex = currentIndex; // 暂时把当前标记为目标index

    if (currentOption === 'acc') {
      continue;
    } else if (currentOption === 'jmp') {
      temp[currentIndex] = `nop ${currentOptionValue > 0 ? '+' : ''}${currentOptionValue}`
    } else if (currentOption === 'nop') {
      temp[currentIndex] = `jmp ${currentOptionValue > 0 ? '+' : ''}${currentOptionValue}`
    }

    // 已经交换过了，可以直接从交换完的这步开始循环

    // 这里其实可以从currentIndex开始走步骤，但是会遇到一个问题就是找到aimIndex后还要从新走一遍正常步骤
    // 如果这里每次从0开始，就可以在找到aimIndex的同时算出结果，代码量少了，但是循环次数应该是多了
    
    index = 0;
    accumulator = 0;
    while (index < temp.length) {
      if (temp[index].done) {
        aimIndex = 0;
        break;
      }
      const { option: finalOption, optionValue: finalOptionValue } = getOptionInfo(temp[index]);
      temp[index] = { value: temp[index], done: true };
      if (finalOption === 'acc') {
        accumulator += finalOptionValue;
        index += 1;
      } else if (finalOption === 'jmp') {
        index += finalOptionValue;
      } else if (finalOption === 'nop') {
        index += 1;
      }
    }
    if (index === temp.length) {
      break;
    }
  }
  console.log(temp[aimIndex], accumulator);

  // 找到了错误的option 下标, 修改之后再循环一遍即可计算出总和

  return;
}

test(); 
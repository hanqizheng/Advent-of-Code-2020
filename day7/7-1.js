const { getTestData } = require('../getTestData');

function findAimBag (bagMap, currentBag, aimBag) {
  let result = 0;
  if (currentBag[0].bag === 'no other bags') {
    return 0;
  }
  for (let i = 0; i < currentBag.length; i++) {
    if (currentBag[i].bag === aimBag) {
      return 1;
    }
    result += findAimBag(bagMap, bagMap[currentBag[i].bag], aimBag);
  }
  return result > 0;
}

async function test() {
  const data = await getTestData();
  const bagMap = {};
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    const [bag, contentString] = data[i].split(' contain ');
    const bagReg = /.*?(?=(\sbag|\sbags))/;
    const contentBagReg = /(?<=\d\s).*?(?=(\sbag|\sbags))/;
    const countReg = /\d*/;
    const content = contentString.split(', ').map((item) => {
      if (item === 'no other bags.') {
        return {
          count: 0,
          bag: 'no other bags',
        };
      }
      return {
        count: countReg.exec(item)[0],
        bag: contentBagReg.exec(item)[0],
      };
    });
    Object.assign(bagMap, { [bagReg.exec(bag)[0]]: content });
  }

  const bagMapKeys = Object.keys(bagMap);

  for (let j = 0; j < bagMapKeys.length; j++) {
    const tempResult = findAimBag(bagMap, bagMap[bagMapKeys[j]], 'shiny gold');
    result += tempResult ? 1 : 0;
  }
  console.log(result);
  return;
}

test();



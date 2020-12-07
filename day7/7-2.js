const { getTestData } = require('../getTestData');

function countBags (bagMap, currentBag) {
  let result = 0;
  if (currentBag[0].bag === 'no other bags') {
    return 0;
  }
  for (let i = 0; i < currentBag.length; i++) {
    result = result + (currentBag[i].count + currentBag[i].count * countBags(bagMap, bagMap[currentBag[i].bag]));
  }
  return result;
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
        count: Number(countReg.exec(item)[0]),
        bag: contentBagReg.exec(item)[0],
      };
    });
    Object.assign(bagMap, { [bagReg.exec(bag)[0]]: content });
  }

  result = countBags(bagMap, bagMap['shiny gold'])
  
  console.log(result);
  return;
}

test();



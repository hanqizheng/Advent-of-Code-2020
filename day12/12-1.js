const { getTestData } = require('../getTestData');

function routate(currentFacing, action, value) {
  const rotateMap = {
    E: {
      L: { 90: 'N', 180: 'W', 270: 'S' },
      R: { 90: 'S', 180: 'W', 270: 'N' }
    },
    N: {
      L: { 90: 'W', 180: 'S', 270: 'E' },
      R: { 90: 'E', 180: 'S', 270: 'W' }
    },
    W: {
      L: { 90: 'S', 180: 'E', 270: 'N' },
      R: { 90: 'N', 180: 'E', 270: 'S' }
    },
    S: {
      L: { 90: 'E', 180: 'N', 270: 'W' },
      R: { 90: 'W', 180: 'N', 270: 'E' }
    },
  }
  return rotateMap[currentFacing][action][value];
}

async function test() {
  let data = await getTestData();
  const actionReg = /[A-Z]/;
  const valueReg = /\d*$/;
  data = data.map((item) => {
    return {
      action: actionReg.exec(item)[0],
      value: Number(valueReg.exec(item)[0]),
    }
  });

  const manhattanDistance = {  N: 0,  S: 0, E: 0, W: 0 };
 
  let currentFacing = 'E';

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].action === 'E' ||
      data[i].action === 'W' ||
      data[i].action === 'S' ||
      data[i].action === 'N'
    ) {
      manhattanDistance[data[i].action] += data[i].value;
    } else if (data[i].action === 'F') {
      manhattanDistance[currentFacing] += data[i].value;
    } else if (data[i].action === 'R' || data[i].action === 'L') {
      currentFacing = routate(currentFacing, data[i].action, data[i].value);
    }
  }
  
  const horizontal = Math.abs(manhattanDistance.E - manhattanDistance.W);
  const vertical = Math.abs(manhattanDistance.N - manhattanDistance.S);
  console.log(horizontal + vertical);
  return;
}

test();
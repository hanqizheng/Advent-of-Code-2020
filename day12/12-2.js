const { getTestData } = require('../getTestData');

function routate(waypoint, action, value) {
  const tempWaypointMap = { N: 0, S: 0, E: 0, W: 0 };
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

  const tempWaypoint = waypoint.map((point) => {
    tempWaypointMap[rotateMap[point.facing][action][value]] = point.value;
    return {
      facing: rotateMap[point.facing][action][value],
      value: point.value,
    }
  });

  return { tempWaypoint, tempWaypointMap };
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

  const manhattanDistance = { N: 0, S: 0, E: 0, W: 0 };

  let waypointMap = { N: 1, S: 0, E: 10, W: 0 }

  let waypoint = [
    { facing: 'E', value: 10 },
    { facing: 'N', value: 1 },
  ]

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].action === 'E' ||
      data[i].action === 'W' ||
      data[i].action === 'S' ||
      data[i].action === 'N'
    ) {
      waypointMap[data[i].action] += data[i].value;
      if (waypointMap['N'] >= waypointMap['S']) {
        waypointMap['N'] = waypointMap['N'] - waypointMap['S'];
        waypointMap['S'] = 0;
      } else {
        waypointMap['S'] = waypointMap['S'] - waypointMap['N'];
        waypointMap['N'] = 0;
      }

      if (waypointMap['E'] >= waypointMap['W']) {
        waypointMap['E'] = waypointMap['E'] - waypointMap['W'];
        waypointMap['W'] = 0;
      } else {
        waypointMap['W'] = waypointMap['W'] - waypointMap['E'];
        waypointMap['E'] = 0;
      }
      const temp = [];
      Object.keys(waypointMap).forEach((item) => {
        if (waypointMap[item]) {
          temp.push({ facing: item, value: waypointMap[item] });
        }
      });
      waypoint = temp;
    } else if (data[i].action === 'F') {
      for (let j = 0; j < waypoint.length; j++) {
        manhattanDistance[waypoint[j].facing] += (data[i].value * waypoint[j].value);
      }
    } else if (data[i].action === 'R' || data[i].action === 'L') {
      const { tempWaypoint, tempWaypointMap } = routate(waypoint, data[i].action, data[i].value);
      waypoint = tempWaypoint;
      waypointMap = tempWaypointMap;
    }
  }

  const horizontal = Math.abs(manhattanDistance.E - manhattanDistance.W);
  const vertical = Math.abs(manhattanDistance.N - manhattanDistance.S);
  console.log(horizontal + vertical);
  return;
}

test();
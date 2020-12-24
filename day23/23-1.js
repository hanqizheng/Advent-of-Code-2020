const { getTestData } = require('../getTestData');

class Node {
  constructor(value, pre, next) {
    this.next = next;
    this.value = value;
    this.pre = pre;
  }
}

function buildPickedSet(pointer) {
  const tempSet = new Set();
  for (let i = 0; i < 3; i++) {
    tempSet.add(pointer.value);
    pointer = pointer.next;
  }
  return tempSet;
}

function findNode(pointer, aim) {
  let tempPointer = pointer;
  while (tempPointer.value !== aim) {
    tempPointer = tempPointer.next;
  }
  return tempPointer;
}

function findDestination(currentPointer, low, high, picked) {
  let destinationValue = currentPointer.value - 1;

  while (true) {
    if (destinationValue < low) {
      destinationValue = high;
    } else if (picked.has(destinationValue)) {
      destinationValue -= 1;
    } else {
      break;
    }
  }
  return findNode(currentPointer.next, destinationValue);
}

function road(pointer) {
  let tempString = '';
  for(let i = 0; i < 9; i++) {
    tempString += pointer.value;
    pointer = pointer.next;
  }
  console.log(tempString);
}

async function test() {
  const data = '364297581'.split('').map((item) => Number(item));
  const sortData = data.map((item) => item).sort((a, b) => a - b);
  const [lowestLabel, HighestLabel] = [sortData[0], sortData[sortData.length - 1]];

  let header = new Node(data[0], null, null);
  let step = header;
  for (let i = 1; i < data.length; i++) {
    const tempNode = new Node(data[i], step, null);
    step.next = tempNode;
    step = step.next;
    if (i === data.length - 1) {
      tempNode.next = header;
      header.pre = tempNode;
    }
  }

  const stepAmount = 100;
  step = header;
  for (let j = 0; j < stepAmount; j++) {
    let currentCup = step;
    const pickedCup = buildPickedSet(currentCup.next);
    const destination = findDestination(currentCup, lowestLabel, HighestLabel, pickedCup);

    const firstPickedPointer = currentCup.next;
    const lastPickedPionter = currentCup.next.next.next;

    currentCup.next = lastPickedPionter.next;
    lastPickedPionter.next = destination.next;
    destination.next = firstPickedPointer;

    road(header);

    step = step.next;
  }
  return;
}

test();
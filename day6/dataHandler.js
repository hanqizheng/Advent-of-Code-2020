const fs = require('fs');
const readline = require('readline');

function dataHandler() {
  let array = [];
  const data = fs.readFileSync('test');
  array = data.toString().split('\n\n');
  return array;
}

module.exports = {
  dataHandler,
}
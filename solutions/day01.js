const { loadInput, printSolution } = require('../shared/common');

const input = loadInput('inputs/day01.txt').split('\n');
const numMap = {
  one: '1', two: '2', three: '3',
  four: '4', five: '5', six: '6',
  seven: '7', eight: '8', nine: '9'
}

const firstSolution = () => input.reduce((sum, line) => {
    const m = line.match(/\d/g);
    return sum + parseInt(m[0] + m.at(-1));
  }, 0);
  
const rgxFirst = /(\d|one|two|three|four|five|six|seven|eight|nine)/;
const rgxLast = new RegExp(".*" + rgxFirst.source);
const secondSolution = () => input.map(line => {
  const first = line.match(rgxFirst)[1];
  const last = line.match(rgxLast)[1];
  return parseInt(
    (isNaN(first) ? numMap[first] : first) +
    (isNaN(last)  ? numMap[last]  : last)
  );
}).reduce((sum, v) => sum + v, 0);

console.log("==[Day 1]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
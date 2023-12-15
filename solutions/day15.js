const { loadInput, printSolution } = require('../shared/common');

const input = loadInput('inputs/day15.txt').split(',');

const computeHash = (str) => str.split('')
  .reduce((hash, c) => ((hash + c.charCodeAt(0)) * 17) % 256, 0)
    
/** Compute a hash for every lens and sum them all together. */
const firstSolution = () =>
  input.map(str => computeHash(str)).reduce((sum, h) => sum + h, 0);
  
/** Sort the lenses into boxes, and compute the sum of their focusing powers. */
const secondSolution = () => {
  const boxes = Array(256).fill(0).map(() => []);
  for (str of input) {
    const [, label, op, focal] = str.match(/([^=-]+)(-|=)(\d*)/);
    const box = boxes[computeHash(label)];
    if (op == '=') { // add or update lens
      const i = box.findIndex(([labelB]) => labelB == label);
      if (i == -1) {
        box.push([label, focal]);
      } else {
        box[i][1] = focal;
      }
    } else if (op == '-') { // remove lens
      const i = box.findIndex(([id]) => id == label);
      if (i != -1) box.splice(i, 1);
    }
  };
  return boxes.reduce((totalPower, box, i) => totalPower +
    box.reduce((boxPower, [, focal], j) => boxPower + (i+1) * (j+1) * focal, 0),
  0);
};

console.log("==[Day 15]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
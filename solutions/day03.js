const { range } = require('lodash');
const { loadInput, printSolution } = require('../shared/common');

const grid = loadInput('inputs/day03.txt').split('\n');

/** Each entry is of the form [start x, start y, num] */
const nums = [];
grid.forEach((row, y) => {
  [...row.matchAll(/\d+/g)].forEach(m => nums.push([m.index, y, m[0]]))
});

/** Look for any numbers with a non-period symbol inside their bounding box + 1 and sum them */
const firstSolution = () =>
  nums.reduce((sum, [sx, sy, num]) => {
    const minX = Math.max(sx - 1, 0);
    const maxX = Math.min(sx + num.length + 1, grid[0].length);
    const minY = Math.max(sy - 1, 0);
    const maxY = Math.min(sy + 2, grid.length);
    if (range(minY, maxY).some(y => range(minX, maxX).some(x => isNaN(grid[y][x]) && grid[y][x] != '.')))
      sum += parseInt(num);
    return sum;
  }, 0);
  
/** Find any asterisks with two adjacent numbers, multiply those together, and sum the results */
const secondSolution = () => {
  const asterisks = [];
  grid.forEach((row, y) => row.split('').forEach((c, x) => {
    if (c == '*') asterisks.push([x, y]);
  }));
  return asterisks.reduce((sum, [ax, ay]) => {
    const nearNums = nums.filter(([sx, sy, num]) =>
      ay <= sy+1 && ay >= sy-1 && ax <= sx+num.length && ax >= sx-1);
    if (nearNums.length == 2)
      sum += nearNums[0][2] * nearNums[1][2];
    return sum;
  }, 0);
};

console.log("==[Day 3]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
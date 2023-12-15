const { loadInput, printSolution } = require('../shared/common');

const [times, distances] = loadInput('inputs/day06.txt').split('\n')
  .map(row => row.split(/\s+/).slice(1).map(Number));
  
const countWins = (t, d) => {
  const root = Math.sqrt(t*t - 4*d);
  const min = Math.floor((t - root)/2);
  const max = Math.ceil((t + root)/2);
  return max - min - 1;
}

/** Get product of the number of ways you can win each round. */
const firstSolution = () => times.reduce((prod, time, i) => prod * countWins(time, distances[i]), 1);

/** Remove spaces from the numbers and find how many ways you can win */
const secondSolution = () => countWins(parseInt(times.join('')), parseInt(distances.join('')));

console.log("==[Day 6]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
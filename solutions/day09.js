const { loadInput, printSolution } = require('../shared/common');

const histories = loadInput('inputs/day09.txt').split('\n')
  .map(line => line.split(' ')
    .map(Number));

const getNextValue = (history) => {
  const diffs = history.map((x, i) => x - history[i - 1]).slice(1);
  let value = history.at(-1);
  if (diffs.some(x => x != 0)) value += getNextValue(diffs);
  return value;
}
const getPrevValue = (history) => {
  const diffs = history.map((x, i) => x - history[i - 1]).slice(1);
  let value = history[0];
  if (diffs.some(x => x != 0)) value -= getPrevValue(diffs);
  return value;
}

/** Find the sum of each history's next value. */
const firstSolution = () => histories.reduce((sum, h) => sum + getNextValue(h), 0);

/** Find the sum of each history's previous value. */
const secondSolution = () => histories.reduce((sum, h) => sum + getPrevValue(h), 0);

console.log("==[Day 9]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
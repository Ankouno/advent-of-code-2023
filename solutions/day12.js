const { loadInput, printSolution, cacheResults } = require('../shared/common');

const input = loadInput('inputs/day12.txt').split('\n').map(line => {
  let [row, groups] = line.split(' ');
  return [row, groups.split(',').map(Number)];
});

/** Tests whether a given group substring fits into a row.  */
const testStr = (testStr, rowStr) =>
  testStr.split('').every((c, i) => rowStr[i] == '?' || rowStr[i] == c)

/** Count all valid possibilities for a row's ?s */
const countValid = cacheResults((row, groups) => {
  if (row.length == 0) { return groups.length == 0; }    // reached end of row
  if (groups.length == 0) { return !row.includes('#'); } // finished all groups

  let count = 0;
  for (let i = 0; i <= row.length - groups[0]; i++) {
    let str = '#'.repeat(groups[0]);
    if (groups.length > 1) str += '.';

    if (testStr(str, row.slice(i, i + str.length)))
      count += countValid(row.slice(i + str.length), groups.slice(1));
    if (row[i] == '#')
      break;
  }
  return count;
});

/** Count the number of valid possibilities for each row's ?s. */
const firstSolution = () =>
  input.reduce((count, [row, groups]) =>
    count + countValid(row, groups),
  0);
  
/**
 * Scale the size of each row and its number of groups by 5x,
 *  and then count the number of valid possibilities.
 * */
const secondSolution = () =>
  input.reduce((count, [row, groups]) =>
    count + countValid(row + ('?' + row).repeat(4), Array(5).fill(groups).flat()),
  0);

console.log("==[Day 12]=========")
printSolution(1, firstSolution, 13);
printSolution(2, secondSolution, 13);
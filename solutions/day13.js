const { loadInput, printSolution } = require('../shared/common');

const grids = loadInput('inputs/day13.txt').split('\n\n')
  .map(grid => grid.split('\n'));
  
/** Test whether a mirror on the given row is valid. */
const testMirrorRow = (grid, rowNum, smudges) => {
  for (let i = 0;; i++) {
    const prevRow = grid[rowNum - i];
    const nextRow = grid[rowNum + i + 1];
    if (!prevRow || !nextRow) return smudges == 0;
    for (let j = 0; j < prevRow.length; j++)
      if (prevRow[j] != nextRow[j] && --smudges < 0) return false;
  };
}
const findMirrorRow = (grid, smudges) =>
  Array(grid.length - 1).findIndex((_, i) => testMirrorRow(grid, i, smudges));

/** Test whether a mirror on the given column is valid. */
const testMirrorCol = (grid, colNum, smudges) => {
  for (let i = 0;; i++) {
    if (smudges == 0 && (colNum - i < 0 || colNum + i + 1 >= grid[0].length))
      return true;
    const prevCol = grid.map(row => row[colNum - i]);
    const nextCol = grid.map(row => row[colNum + i + 1]);
    for (let j = 0; j < prevCol.length; j++)
      if (prevCol[j] != nextCol[j] && --smudges < 0) return false;
  }
}
const findMirrorCol = (grid, smudges) =>
  Array(grid[0].length - 1).findIndex((_, i) => testMirrorCol(grid, i, smudges));
  
/** Find the row or column a mirror appears after on each map. */
const firstSolution = () => grids.reduce((sum, grid) => {
  const mirrorRow = findMirrorRow(grid, 0) + 1;
  return (mirrorRow 
    ? mirrorRow * 100
    : findMirrorCol(grid, 0) + 1) + sum;
}, 0);

/** Accounting for a single smudged tile, find the row or column a mirror appears after on each map. */
const secondSolution = () => grids.reduce((sum, grid) => {
  const mirrorRow = findMirrorRow(grid, 1) + 1;
  return (mirrorRow 
    ? mirrorRow * 100
    : findMirrorCol(grid, 1) + 1) + sum;
}, 0);;

console.log("==[Day 13]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
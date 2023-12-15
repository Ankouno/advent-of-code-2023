const { loadInput, printSolution } = require('../shared/common');

const map = loadInput('inputs/day11.txt').split('\n').map(line => line.split(''));
const initGalaxies = [];
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (map[y][x] == '#') { initGalaxies.push([x, y]); }
  }
}

/** Expand empty rows/cols between galaxies by a specified distance. */
const expandSpace = (galaxies, scale) => {
  const emptyCols = [], emptyRows = [];
  for (let x = 0; x < map[0].length; x++) {
    if (!map.some(row => row[x] == '#')) emptyCols.push(x);
  }
  for (let y = 0; y < map.length; y++) {
    if (!map[y].some(c => c == '#')) emptyRows.push(y);
  }
  return galaxies.map(([x, y]) => {
    x += emptyCols.filter(cx => x > cx).length * (scale - 1);
    y += emptyRows.filter(cy => y > cy).length * (scale - 1);
    return [x, y];
  });
}

/** Sum the minimum distance between every pair of galaxies. */
const sumMinDistances = (galaxies) => {
  let totalDistance = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    const galaxyA = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxyB = galaxies[j];
      totalDistance += Math.abs(galaxyB[0] - galaxyA[0]) + Math.abs(galaxyB[1] - galaxyA[1]);
    }
  }
  return totalDistance;
}

/** Scale empty space by 2 and find the sum of minimum distances between each galaxy. */
const firstSolution = () => sumMinDistances(expandSpace(initGalaxies, 2));

/** Scale empty space by 1 million and find the sum of minimum distances between each galaxy. */
const secondSolution = () => sumMinDistances(expandSpace(initGalaxies, 1000000));

console.log("==[Day 11]=========")
printSolution(1, firstSolution, 12);
printSolution(2, secondSolution, 12);
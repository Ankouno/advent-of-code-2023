const { loadInput, printSolution, cacheResults } = require('../shared/common');

const initGrid = loadInput('inputs/day14.txt').split('\n')
  .map(line => line.split(''));

const rollRock = (grid, x, y, dx, dy) => {
  let nx = x + dx;
  let ny = y + dy;
  if (nx < 0 || nx >= grid[0].length
    || ny < 0 || ny >= grid.length
    || grid[ny][nx] != '.') return;

  for (; (dx == 0 || (nx > 0 && nx < grid[0].length - 1))
    && (dy == 0 || (ny > 0 && ny < grid.length - 1))
    && grid[ny + dy][nx + dx] == '.'; nx += dx, ny += dy);
  grid[ny][nx] = 'O';
  grid[y][x] = '.';
}

const tiltPlatform = (grid, dir) => {
  let dx, dy;
  switch (dir) {
    case '^': dx = 0;  dy = -1; break;
    case '<': dx = -1; dy = 0;  break;
    case 'v': dx = 0;  dy = 1;  break;
    case '>': dx = 1;  dy = 0;  break;
  }
  if (dir == '^' || dir == '<') {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] == 'O') rollRock(grid, x, y, dx, dy);
      }
    }
  } else {
    for (let y = grid.length - 1; y >= 0; y--) {
      for (let x = grid[0].length - 1; x >= 0; x--) {
        if (grid[y][x] == 'O') rollRock(grid, x, y, dx, dy);
      }
    }
  }
};

const measureLoad = (grid) => {
  let total = 0;
  for (let y = 0; y < grid.length; y++) {
    total += grid[y].filter(c => c == 'O').length * (grid.length - y);
  }
  return total;
}

/** Tilt the rocks north, then measure the load on the north edge. */
const firstSolution = () => {
  const grid = initGrid.map(row => [...row]);
  tiltPlatform(grid, '^')
  return measureLoad(grid);
};

/** Tilt the rocks in a NWSE cycle 1000000000 times,
 *   then measure the load on the north edge. */
const secondSolution = () => {
  const grid = initGrid.map(row => [...row]);
  const dirs = ['^', '<', 'v', '>'];

  // find the loop
  const cache = new Map();
  for (let i = 0;; i++) {
    const key = JSON.stringify(grid);
    if (!cache.has(key)) {
      cache.set(key, i);
      for(const dir of dirs) {
        tiltPlatform(grid, dir);
      }
    } else {
      const loopStart = cache.get(key);
      const j = loopStart + ((1000000000 - loopStart) % (i - loopStart));
      const finalGrid = JSON.parse(Array.from(cache.keys())[j]);
      return measureLoad(finalGrid);
    }
  }
};

console.log("==[Day 14]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
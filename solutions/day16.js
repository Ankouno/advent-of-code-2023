const { uniq } = require('lodash');
const { loadInput, printSolution } = require('../shared/common');

const grid = loadInput('inputs/day16.txt').split('\n')
  .map(row => row.split(''));
const width = grid[0].length;
const height = grid.length;

const moveForward = (pos, cache) => {
  const key = [...pos].join('.');
  if (cache.has(key)) return false;
  cache.set(key, pos[0] + '.' + pos[1]);
  switch (pos[2]) {
    case '>': pos[0] += 1; break;
    case '<': pos[0] -= 1; break;
    case 'v': pos[1] += 1; break;
    case '^': pos[1] -= 1; break;
  }
  return pos[0] >= 0 && pos[0] < width && pos[1] >= 0 && pos[1] < height;
}

const updatePos = (pos, cache) => {
  let [x, y, dir] = pos;
  const tile = grid[y][x];
  switch (tile) {
    case '/':
    case '\\':
      switch (dir) {
        case '>': dir = (tile == '/' ? '^' : 'v'); break;
        case 'v': dir = (tile == '/' ? '<' : '>'); break;
        case '<': dir = (tile == '/' ? 'v' : '^'); break;
        case '^': dir = (tile == '/' ? '>' : '<'); break;
      }
      break;
    case '|':
      if (dir == '<' || dir == '>') {
        dir = 'v'; fireLaser([x, y, '^'], cache);
      }
      break;
    case '-':
      if (dir == '^' || dir == 'v') {
        dir = '>'; fireLaser([x, y, '<'], cache);
      }
      break;
  }
  return [x, y, dir];
}

/** Fires a laser from the specified point and direction,
 *   tracking the nodes it has visited in the cache. */
const fireLaser = (pos, cache) => {
  while (moveForward(pos, cache)) {
    pos = updatePos(pos, cache);
  }
}

/** Fire a beam from [0, 0] and track how many tiles get energized. */
const firstSolution = () => {
  const cache = new Map();
  fireLaser(updatePos([0, 0, '>'], cache), cache);
  return uniq([...cache.values()]).length;
};

/** Fire a beam out from any position along an edge and track how many tiles get energized.
 *   (this is definitely not an optimal solution, but it works!!) */
const secondSolution = () => {
  let max = 0;
  const cache = new Map();
  for (let y = 0; y < width; y++) {
    cache.clear();
    fireLaser(updatePos([0, y, '>'], cache), cache);
    max = Math.max(max, uniq([...cache.values()]).length);
  }
  for (let y = 0; y < width; y++) {
    cache.clear();
    fireLaser(updatePos([width-1, y, '<'], cache), cache);
    max = Math.max(max, uniq([...cache.values()]).length);
  }
  for (let x = 0; x < width; x++) {
    cache.clear();
    fireLaser(updatePos([x, 0, 'v'], cache), cache);
    max = Math.max(max, uniq([...cache.values()]).length);
  }
  for (let x = 0; x < width; x++) {
    cache.clear();
    fireLaser(updatePos([x, height-1, '^'], cache), cache);
    max = Math.max(max, uniq([...cache.values()]).length);
  }
  return max;
};

console.log("==[Day 16]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
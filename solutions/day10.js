const { loadInput, printSolution } = require('../shared/common');

const input = loadInput('inputs/day10.txt');
const tiles = input.split('\n').map(row => row.split(''));
const height = tiles.length;
const width = tiles[0].length;

const s = input.indexOf('S');
const sx = s % (width + 1);
const sy = Math.floor(s / (height + 1));

// Determine and replace the start tile
let openRight = false, openLeft = false, openDown = false;
let startTile = '|', startDir = 'v';
if ('-7J'.indexOf(tiles[sy][sx+1]) != -1) { openRight = true; }
if ('-LF'.indexOf(tiles[sy][sx-1]) != -1) { openLeft = true; }
if ('|LJ'.indexOf(tiles[sy+1][sx]) != -1) { openDown = true; }
if (openRight) {
  startDir = '>';
  startTile = 'L';
  if (openLeft) startTile = '-';
  if (openDown) startTile = 'F';
} else if (openLeft) {
  startDir = '<';
  startTile = openDown ? '7' : 'J';
}
tiles[sy][sx] = startTile;

/** Traverse along a pipe and return the output position and direction. */
const moveForward = (x, y, dir) => {
  switch (tiles[y][x]) {
    case '|': y += (dir == 'v' ? 1 : -1); break;
    case '-': x += (dir == '>' ? 1 : -1); break;
    case 'L': if (dir == 'v') { x += 1; dir = '>'; } else { y -= 1; dir = '^'; } break;
    case 'J': if (dir == 'v') { x -= 1; dir = '<'; } else { y -= 1; dir = '^'; } break;
    case 'F': if (dir == '^') { x += 1; dir = '>'; } else { y += 1; dir = 'v'; } break;
    case '7': if (dir == '^') { x -= 1; dir = '<'; } else { y += 1; dir = 'v'; } break;
  }
  return [x, y, dir];
}

/** Returns a map of all tiles located along the path. */
const getLoop = () => {
  const loopMap = new Array(height).fill(0).map(_ => new Array(width).fill(0));
  let x = sx, y = sy, dir = startDir;
  do {
    [x, y, dir] = moveForward(x, y, dir);
    loopMap[y][x] = 1;
  } while (x != sx || y != sy);
  return loopMap;
}

/** Find a potential loop, get its loop size, and return half that size. */
const firstSolution = () => getLoop().flat().reduce((sum, t) => sum + t, 0) / 2;

/** Find the number of tiles inside the region enclosed by the loop. */
const secondSolution = () => {
  const loopMap = getLoop();
  let count = 0;
  for (let y = 0; y < height; y++) {
    let insideLoop = false;
    for (let x = 0; x < width; x++) {
      if (loopMap[y][x] == 1) {
        if ('|F7'.indexOf(tiles[y][x]) != -1) insideLoop = !insideLoop;
      } else if (insideLoop) {
        count++;
      }
    }
  }
  return count;
};

console.log("==[Day 10]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
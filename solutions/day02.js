const { loadInput, printSolution } = require('../shared/common');

const rgxSet = /(\d+) (red|green|blue)/g;
const games = loadInput('inputs/day02.txt').split('\n')
  .map(line => line.substring(line.indexOf(':') + 2).split(';')
    .map(set => {
      const t = Object.fromEntries([...set.matchAll(rgxSet)].map(m => m.reverse()));
      for (const k of Object.keys(t)) { t[k] = parseInt(t[k]); }
      return t;
    }));

/** Sum the IDs of all games that require no more than 12 red, 13 green, and 14 blue cubes */
const firstSolution = () => games.reduce((a, game, i) => {
  if (!game.some(set => set["red"] > 12 || set["green"] > 13 || set["blue"] > 14))
    a += i + 1;
  return a;
}, 0);

/** Find the min number of cubes in each game, multiply the color counts together, and sum */
const secondSolution = () => games.reduce((sum, game) => {
  const minRed   = game.reduce((c, set) => Math.max(c, set["red"] || 0), 0);
  const minBlue  = game.reduce((c, set) => Math.max(c, set["blue"] || 0), 0);
  const minGreen = game.reduce((c, set) => Math.max(c, set["green"] || 0), 0);
  return sum + (minRed * minBlue * minGreen);
}, 0);

console.log("==[Day 2]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
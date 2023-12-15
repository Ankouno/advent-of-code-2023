const { intersection, range } = require('lodash');
const { loadInput, printSolution } = require('../shared/common');

const games = loadInput('inputs/day04.txt').split('\n')
  .map(line => line.substring(line.indexOf(':') + 2).split('|')
    .map(set => set.trim().split(/\s+/).map(Number)));

const winCounts = games.map(game => intersection(...game).length);
const recScores = Array(games.length);
for (let i = games.length - 1; i >= 0; i--) {
  recScores[i] = 1 + range(i, i + winCounts[i]).reduce((a, j) => a + recScores[j + 1], 0)
}

/** Find the intersection between the winning numbers in each game and your numbers for that game
 *   and sum the total number of points based on that. */
const firstSolution = () =>
  winCounts.reduce((points, winCount) => points + Math.floor(2**(winCount-1)), 0);
  
/** Each n winning cards from a game adds copies of the next n games.
 *   Final score is how many games you end up with. */
const secondSolution = () =>
  recScores.reduce((a, score) => a + score, 0);

console.log("==[Day 4]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
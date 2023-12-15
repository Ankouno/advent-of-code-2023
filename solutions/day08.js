const { loadInput, printSolution } = require('../shared/common');
const { lcmList } = require('../shared/math');

const input = loadInput('inputs/day08.txt').split('\n\n');
const moves = input[0].split('').map(d => d == 'L' ? 0 : 1);
const network = Object.fromEntries(input[1].split('\n').map(line => {
  const nodeLinks = line.split(' = ');
  nodeLinks[1] = nodeLinks[1].replace(/[()]/g, '').split(', ')
  return nodeLinks;
}));

const getAllNodes = (endChar) => Object.keys(network).filter(name => name.at(-1) == endChar);
const countSteps = (node, anyEnd) => {
  let stepCnt = 0;
  for (; anyEnd ? !node.endsWith('Z') : node != 'ZZZ'; stepCnt++) {
    node = network[node][moves[stepCnt % moves.length]];
  }
  return stepCnt;
}

/** Start from the AAA node and traverse to the ZZZ node. */
const firstSolution = () => countSteps('AAA', false);

/** Start from all nodes ending in A, and traverse until all of those reach a node ending in Z. */
const secondSolution = () => lcmList(getAllNodes('A').map(node => countSteps(node, true)));

console.log("==[Day 8]=========")
printSolution(1, firstSolution, 15);
printSolution(2, secondSolution, 15);
const { countBy } = require('lodash');
const { loadInput, printSolution } = require('../shared/common');

const hands = loadInput('inputs/day07.txt').split('\n')
  .map(line => line.split(' '))
  .map(([cards, bid]) => [cards, parseInt(bid)])
  
const cardRanks = { 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, T:10, J:11, Q:12, K:13, A:14 };
const sortHands = ([a], [b]) => {
  if      (a[0] != b[0]) return cardRanks[a[0]] - cardRanks[b[0]];
  else if (a[1] != b[1]) return cardRanks[a[1]] - cardRanks[b[1]];
  else if (a[2] != b[2]) return cardRanks[a[2]] - cardRanks[b[2]];
  else if (a[3] != b[3]) return cardRanks[a[3]] - cardRanks[b[3]];
  else if (a[4] != b[4]) return cardRanks[a[4]] - cardRanks[b[4]];
  return 0;
}

const getScore = (useJokers) => {
  cardRanks['J'] = useJokers ? 1 : 11;
  const fiveOfAKind = [], fourOfAKind = [], fullHouse = [],
    threeOfAKind = [], twoPairs = [], onePair = [], highCard = [];

  for (const hand of hands) {
    const counts = countBy(hand[0]);
    const jokers = (useJokers ? counts['J'] || 0 : 0);
    let uniqCards = Object.keys(counts);
    if (useJokers) uniqCards = uniqCards.filter(c => c != 'J');

    let list = highCard;
    if (uniqCards.length <= 1) {
      list = fiveOfAKind;
    } else if (uniqCards.length == 2) {
      list = (Object.values(counts).includes(4-jokers)) ? fourOfAKind : fullHouse;
    } else if (uniqCards.length == 3) {
      list = (Object.values(counts).includes(3-jokers)) ? threeOfAKind : twoPairs;
    } else if (uniqCards.length == 4) {
      list = onePair;
    }
    list.push(hand);
  }
  fiveOfAKind.sort(sortHands);
  fourOfAKind.sort(sortHands);
  fullHouse.sort(sortHands);
  threeOfAKind.sort(sortHands);
  twoPairs.sort(sortHands);
  onePair.sort(sortHands);
  highCard.sort(sortHands);

  return [...highCard, ...onePair, ...twoPairs, ...threeOfAKind, ...fullHouse, ...fourOfAKind, ...fiveOfAKind]
    .reduce((score, [, bid], i) => score + bid * (i + 1), 0);
}

/** Return the sum of each hand's bid multiplied by its rank. */
const firstSolution = () => getScore(false);

/** Same as above, but J is now a joker that can sub in for any card. */
const secondSolution = () => getScore(true);

console.log("==[Day 7]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
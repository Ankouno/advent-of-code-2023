const { min } = require('lodash');
const { loadInput, printSolution } = require('../shared/common');

const sections = loadInput('inputs/day05.txt').split('\n\n');
const seeds = sections[0].split(': ')[1].split(' ').map(Number);
const tables = sections.slice(1)
  .map(table => table.split('\n').slice(1)
    .map(line => line.split(' ').map(Number)));
    
/** Expand the ranges used to lookup a seed's location */
const expandTable = (tableID, valueRange) => {
  if (tableID >= tables.length) return [valueRange];

  let result = [];
  const  [rangeStart, rangeLen] = valueRange;
  for (const [dest, src, len] of tables[tableID]) {
    if (rangeStart < src && rangeStart + rangeLen > src && rangeStart + rangeLen <= src + len) {
      // range intersects table row on the left
      result.push(
        ...expandTable(tableID,     [rangeStart, src - rangeStart]),     // non-overlapping region on left
        ...expandTable(tableID + 1, [dest, rangeStart + rangeLen - src]) // overlapping region
      );
    } else if (rangeStart >= src && rangeStart < src + len && rangeStart + rangeLen > src + len) {
      // range intersects table row on the right
      result.push(
        ...expandTable(tableID + 1, [dest + rangeStart - src, src + len - rangeStart]), // overlapping region
        ...expandTable(tableID,     [src + len, rangeStart + rangeLen - (src + len)])   // non-overlapping region on right
      );
    } else if (rangeStart >= src && rangeStart + rangeLen <= src + len) {
      // range is fully contained by table row
      result.push(...expandTable(tableID + 1, [dest + rangeStart - src, rangeLen]));  // overlapping region
    } else if (rangeStart < src && rangeStart + rangeLen > src + len) {
      // range fully contains table row
      result.push(
        ...expandTable(tableID,     [rangeStart, src - rangeStart]),                  // non-overlapping region on left
        ...expandTable(tableID + 1, [dest, len]),                                     // overlapping region
        ...expandTable(tableID,     [src + len, rangeStart + rangeLen - (src + len)]) // non-overlapping region on right
      );
    }
  }
  
  // if no specified mapping was found, continue to next table with a one-to-one id mapping
  return result.length ? result : expandTable(tableID + 1, valueRange);
}

const searchTable = (table, search) => {
  const rel = table.find(([, src, len]) => search >= src && search <= src + len);
  return rel ? (rel[0] + (search - rel[1])) : search;
}
const lookupLoc = (seed) => {
  const soil  = searchTable(tables[0], seed);
  const fert  = searchTable(tables[1], soil);
  const water = searchTable(tables[2], fert);
  const light = searchTable(tables[3], water);
  const temp  = searchTable(tables[4], light);
  const humid = searchTable(tables[5], temp);
  const loc   = searchTable(tables[6], humid);
  return loc;
}

/** Find minimum location ID of any of the input seeds */
const firstSolution = () => Math.min(...seeds.map(lookupLoc));

/** Treat each pair of seed IDs as a range, then find the minimum location for those */
const secondSolution = () => {
  const results = [];
  for (let i = 0; i < seeds.length; i += 2) {
    results.push(expandTable(0, [seeds[i], seeds[i+1]]));
  }
  return min(results.flat().map(x => x[0]));
};

console.log("==[Day 5]=========")
printSolution(1, firstSolution);
printSolution(2, secondSolution);
const fs = require('fs');

/**
 * Loads data from the given file into a string.
 * @param {string} path The path to the file to open.
 */
const loadInput = (path) => fs.readFileSync(path).toString();

/**
 * Prints the results of a solution and its runtime to the console.
 * @param {number} num The number of the solution to print.
 * @param {Function} func The function to call to get the solution result.
 */
const printSolution = (num, func, padding = 10) => {
  var startTime, runTime, result;
  startTime = performance.now();
  result = func();
  runTime = (performance.now() - startTime).toFixed(2);
  console.log(`${num}) ${String(result).padEnd(padding)} [${runTime} ms]`);
};

/**
 * Returns a higher-order function that caches the results of
 *  calling a function with a particular set of arguments.
 * If the function is called again with the same arguments,
 *   it'll return the original result without re-running the function.
 */
const cacheResults = (func) => {
  const cache = new Map();
  return function() {
    const key = JSON.stringify(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const result = func.apply(null, arguments);
      cache.set(key, result);
      return result;
    }
  }
}

module.exports = {
  loadInput,
  printSolution,
  cacheResults
};
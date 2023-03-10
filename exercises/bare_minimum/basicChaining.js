/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
var { getStatusCodeAsync, pluckFirstLineFromFileAsync } = require('./promiseConstructor.js');
var request = require('needle');
var { getGitHubProfileAsync } = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      return getGitHubProfileAsync(username);
    })
    .then((gitHubProfile) => {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(gitHubProfile));
    })
    .catch((err) => err);
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

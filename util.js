const timestamp = require('time-stamp');

function print(msg) {
  console.log(`${timestamp.utc('YYYY-MM-DD HH:mm:ss')} ${msg}`);
}

function printErr(msg) {
  console.error(`${timestamp.utc('YYYY-MM-DD HH:mm:ss')} ${msg}`);
}

module.exports = {
  print,
  printErr
};

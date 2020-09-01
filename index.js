const http = require('http');
const {handleCommand} = require('./command');
const {handleRequest} = require('./request');

const port = process.env.PORT || 8080;

console.log(`port = ${port}`);

let table = {
  rules: [{
    methods: ['GET'],
    paths: '*',
    statusCode: 200,
    responseHeaders: {
      'Content-Type': 'text/plain'
    },
    responseBody: 'Hello!',
    delay: 0
  }]
};

http.createServer(async (req, res) => {
  // console.log(`Incoming message: ${req.url}`);
  if (await handleCommand(req, res, table, newTable => {
    table = newTable;
  })) {
    return;
  }
  if (await handleRequest(req, res, table)) {
    return;
  }
  res.end();
}).listen(port);

console.log(`HTTP server listening on port ${port}`);

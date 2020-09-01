const {print} = require('./util');

function sendResponse(res, {statusCode, responseHeaders, responseBody, delay = 0}) {
  return new Promise(resolve => {
    setTimeout(() => {
      print(`\tresponse: ${statusCode}`);
      res.writeHead(statusCode, responseHeaders);
      res.end(responseBody);
      resolve();
    }, delay);
  });
}

async function handleRequest(req, res, {rules}) {
  const method = req.method;
  const url = req.url;

  print(`Incomming request: [${method}]${url}`);

  for (const rule of rules) {
    const {methods, paths} = rule;
    if (methods !== '*' && !(Array.isArray(methods) && methods.includes(method))) {
      continue;
    }

    if (paths !== '*' && !(Array.isArray(paths) && paths.includes(url))) {
      continue;
    }

    await sendResponse(res, rule);
    return true;
  }
  return false;
}

module.exports = {
  handleRequest
};

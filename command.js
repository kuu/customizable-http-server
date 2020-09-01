const {unzipSync} = require('zlib');
const {print} = require('./util');

const COMMAND_URL = '/api/table';

function readBody(req) {
  const needUnzip = req.headers['content-encoding'] === 'gzip';
  return new Promise((resolve, reject) => {
    const body = [];
    req.on('data', chunk => {
      if (needUnzip) {
        chunk = unzipSync(chunk);
      }
      body.push(chunk);
    }).on('end', () => {
      const text = Buffer.concat(body).toString();
      resolve(text);
    }).on('error', err => {
      reject(err);
    });
  });
}

async function getBody(req) {
  if (!hasJsonBody(req)) {
    return null;
  }
  const jsonText = await readBody(req);
  try {
    return JSON.parse(jsonText);
  } catch {
    return null;
  }
}

function hasJsonBody(req) {
  const method = req.method;
  if (method !== 'PUT' && method !== 'POST' && method !== 'PATCH') {
    return false;
  }

  const type = req.headers['content-type'];
  if (type === 'application/json') {
    return true;
  }
  return false;
}

async function handleCommand(req, res, table, setTable) {
  const method = req.method;
  const url = req.url;

  if (!url || url !== COMMAND_URL) {
    return false;
  }

  if (method === 'PUT') {
    table = await getBody(req);
    if (table) {
      print(`The rules list is updated:\n${JSON.stringify(table, null, 2)}`);
      setTable(table);
    }
  }

  if (method === 'PATCH') {
    table = Object.assign(table, await getBody(req));
    if (table) {
      print(`The rules list is updated:\n${JSON.stringify(table, null, 2)}`);
      setTable(table);
    }
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(table, null, 2));
  return true;
}

module.exports = {
  handleCommand,
  COMMAND_URL
};

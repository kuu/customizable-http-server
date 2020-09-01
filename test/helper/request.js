const EventEmitter = require('events');

class Request extends EventEmitter {
  constructor(method, url, headers) {
    super();
    this.method = method;
    this.url = url;
    this.headers = headers;
  }
}

function createRequest(method, url, headers = {}, dataList = [], error = null) {
  const req = new Request(method, url, headers);
  setUpData(req, dataList, error);
  return req;
}

function setUpData(req, dataList, error) {
  const data = dataList.shift();
  if (!data) {
    return setUpError(req, error);
  }
  setTimeout(() => {
    req.emit('data', data);
    setUpData(req, dataList);
  }, 0);
}

function setUpError(req, error) {
  if (!error) {
    return req.emit('end');
  }
  setTimeout(() => {
    req.emit('error', error);
  }, 0);
}

module.exports = createRequest;

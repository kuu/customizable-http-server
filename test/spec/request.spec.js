const test = require('ava');
const sinon = require('sinon');
const {handleRequest} = require('../../request');
const createRequest = require('../helper/request');

test('handleRequest.methods-01', async t => {
  const table = {
    rules: [{
      methods: ['GET'],
      paths: '*',
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('GET', '/test');
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Test'));
});

test('handleRequest.methods-02', async t => {
  const table = {
    rules: [{
      methods: ['GET'],
      paths: '*',
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('POST', '/test', {'content-type': 'application/json'}, [Buffer.from(JSON.stringify({}, null, 2))]);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), false);
  t.false(writeHead.calledOnce);
  t.false(end.calledOnce);
});

test('handleRequest.methods-03', async t => {
  const table = {
    rules: [{
      methods: ['GET', 'POST'],
      paths: '*',
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('POST', '/test', {'content-type': 'application/json'}, [Buffer.from(JSON.stringify({}, null, 2))]);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Test'));
});

test('handleRequest.methods-04', async t => {
  const table = {
    rules: [{
      methods: '*',
      paths: '*',
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('POST', '/test', {'content-type': 'application/json'}, [Buffer.from(JSON.stringify({}, null, 2))]);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Test'));
});

test('handleRequest.methods-05', async t => {
  const table = {
    rules: [{
      methods: ['GET'],
      paths: '*',
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }, {
      methods: ['POST'],
      paths: '*',
      statusCode: 404,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Failed'
    }]
  };
  const req = createRequest('POST', '/test', {'content-type': 'application/json'}, [Buffer.from(JSON.stringify({}, null, 2))]);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(404, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Failed'));
});

test('handleRequest.paths-01', async t => {
  const table = {
    rules: [{
      methods: '*',
      paths: ['/test'],
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('GET', '/test');
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Test'));
});

test('handleRequest.paths-02', async t => {
  const table = {
    rules: [{
      methods: '*',
      paths: ['/test'],
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('GET', '/test2');
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), false);
  t.false(writeHead.calledOnce);
  t.false(end.calledOnce);
});

test('handleRequest.paths-03', async t => {
  const table = {
    rules: [{
      methods: '*',
      paths: ['/test', '/test2'],
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('GET', '/test2');
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Test'));
});

test('handleRequest.paths-04', async t => {
  const table = {
    rules: [{
      methods: '*',
      paths: '*',
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }]
  };
  const req = createRequest('GET', '/test2');
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Test'));
});

test('handleRequest.paths-05', async t => {
  const table = {
    rules: [{
      methods: '*',
      paths: ['/test'],
      statusCode: 200,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Test'
    }, {
      methods: '*',
      paths: ['/test2'],
      statusCode: 404,
      responseHeaders: {
        'Content-Type': 'text/plain'
      },
      responseBody: 'Failed'
    }]
  };
  const req = createRequest('GET', '/test2');
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleRequest(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(404, {'Content-Type': 'text/plain'}));
  t.true(end.calledOnce);
  t.true(end.calledWith('Failed'));
});

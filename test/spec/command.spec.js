const test = require('ava');
const sinon = require('sinon');
const {handleCommand, COMMAND_URL} = require('../../command');
const createRequest = require('../helper/request');

test('handleCommand.notCommand', async t => {
  const req = createRequest('GET', '/test');
  t.is(await handleCommand(req), false);
});

test('handleCommand.commandGet', async t => {
  const table = {test: 'test'};
  const req = createRequest('GET', COMMAND_URL);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleCommand(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'application/json'}));
  t.true(end.calledOnce);
  t.true(end.calledWith(JSON.stringify(table, null, 2)));
});

test('handleCommand.commandPut', async t => {
  const table = {test: 'test'};
  const newTable = {test2: 'test2'};
  const req = createRequest('PUT', COMMAND_URL, {'content-type': 'application/json'}, [Buffer.from(JSON.stringify(newTable, null, 2))]);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  let result;
  t.is(await handleCommand(req, res, table, newTable => {
    result = newTable;
  }), true);
  t.deepEqual(newTable, result);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'application/json'}));
  t.true(end.calledOnce);
  t.true(end.calledWith(JSON.stringify(newTable, null, 2)));
});

test('handleCommand.commandPatch', async t => {
  const table = {a: 1, b: 2};
  const patch = {c: 3};
  const newTable = {a: 1, b: 2, c: 3};
  const req = createRequest('PATCH', COMMAND_URL, {'content-type': 'application/json'}, [Buffer.from(JSON.stringify(patch, null, 2))]);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  let result;
  t.is(await handleCommand(req, res, table, newTable => {
    result = newTable;
  }), true);
  t.deepEqual(newTable, result);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'application/json'}));
  t.true(end.calledOnce);
  t.true(end.calledWith(JSON.stringify(newTable, null, 2)));
});

test('handleCommand.commandPost', async t => {
  const table = {a: 1, b: 2};
  const newTable = {a: 1, b: 2, c: 3};
  const req = createRequest('POST', COMMAND_URL, {'content-type': 'application/json'}, [Buffer.from(JSON.stringify(newTable, null, 2))]);
  const res = {
    writeHead: () => {},
    end: () => {}
  };
  const writeHead = sinon.spy(res, 'writeHead');
  const end = sinon.spy(res, 'end');
  t.is(await handleCommand(req, res, table), true);
  t.true(writeHead.calledOnce);
  t.true(writeHead.calledWith(200, {'Content-Type': 'application/json'}));
  t.true(end.calledOnce);
  t.true(end.calledWith(JSON.stringify(table, null, 2)));
});

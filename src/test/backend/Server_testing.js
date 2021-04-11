require("../../controllers/database_creator");   //creats global.db
var assert = require('assert');
const controller = require("../../controllers/course.controller");
var router = require("express").Router();
var request = require('supertest');

// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
describe('Testing express server', function () {
  var server;
  beforeEach(function () {
    delete require.cache[require.resolve('../server.js')];
    server = require('../server.js');
  });
  afterEach(function (done) { // close the server when test finishes 
    server.close(done);
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/blablabla')
      .expect(404, done);
  });
});



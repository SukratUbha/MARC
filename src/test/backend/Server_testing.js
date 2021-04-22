var request = require('supertest');

//process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
//process.env.NODE_ENV = 'test';

// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
describe('Testing express server', function () {
  var server;
  beforeEach(function () {
    delete require.cache[require.resolve('../../server.js')];
    server = require('../../server.js');
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



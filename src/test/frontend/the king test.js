
var assert = require('assert');
describe('Bosstest', function() {
  describe('index of stuff', function() {
    it('IT SHOULD return -1 when the value is not present', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});


// https://mochajs.org/#synchronous-code
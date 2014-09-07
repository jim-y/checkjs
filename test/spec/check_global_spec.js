/*jshint -W030 */

var check = require('../../lib/check'),
  should = require('should'),
  assert = require('assert');
/*
Cheatsheat:
  Assert:
    assert.fail(actual, expected, message, operator)
    assert(value, message), assert.ok(value, [message])
    assert.equal(actual, expected, [message])
    assert.notEqual(actual, expected, [message])
    assert.deepEqual(actual, expected, [message])
    assert.notDeepEqual(actual, expected, [message])
    assert.strictEqual(actual, expected, [message])
    assert.notStrictEqual(actual, expected, [message])
    assert.throws(block, [error], [message])
    assert.doesNotThrow(block, [message])
    assert.ifError(value)
 */
describe('check.js', function() {

  'use strict';

  describe('global', function() {
    it('global {Function} check should exist', function() {
      should.exist(check);
    });
    it('an empty argument-list should initially set the argument to null', function() {
      should(check()[0]).not.be.ok;
      assert.equal(check()[0], null);
    });
    it('should return an object', function() {
      check('test').should.be.an.Object;
    });
    it('the object should have a length property', function() {
      should.exist(check('test').length);
    });
    it('the object should have a negate property', function() {
      should.exist(check('test').negate);
    });
    it('the object should have a cache property', function() {
      should.exist(check('test').cache);
    });
    it('negate should initially be false', function() {
      check('test').negate.should.be.false;
    });
    it('cache should initially be empty', function() {
      assert.equal(check('test').cache.length, 0);
    });
    it('should work with a single argument', function() {
      var res = check('test').isString();
      res.should.be.true;
    });
    it('should work with multiple arguments', function() {
      var res = check('test', 'another', 'yet another').areStrings();
      res.should.be.true;
    });
  });

  describe('empty', function() {
    it('should have an isEmpty() method', function() {
      should.exist(check([]).isEmpty);
    });
    it('should have an allEmpty() method', function() {
      should.exist(check([]).allEmpty);
    });
    it('should return true on a single falsy argument', function() {
      check('').isEmpty().should.be.true;
      check(0).isEmpty().should.be.true;
      check([]).isEmpty().should.be.true;
      check({}).isEmpty().should.be.true;
    });
    it('should return false on a single truthy argument', function() {
      // negate
      check(1).isEmpty().should.be.false;
      check([1]).isEmpty().should.be.false;
      check({ key: 'val' }).isEmpty().should.be.false;
      check(0).not.isEmpty().should.be.false;
    });
    it('should return true on multiple falsy arguments', function() {
      check([], 0).allEmpty().should.be.true;
      check([], 1, {}).not.allEmpty().should.be.true;
    });
    it('should return false on multiple truthy arguments', function() {
      check(1, 'test', new Date(), true).allEmpty().should.be.false;
    });
  });

  describe('exist', function() {
    it('check should have doExist() method', function() {
      should.exist(check('test').doExist);
    });
    it('check should have allExists() method', function() {
      should.exist(check('test').allExists);
    });
    it('should return true for an existing single value', function() {
      var obj = { key: 'value' };
      check(obj).doExist().should.be.true;
    });
    it('should return false for a non existing value', function() {
      var obj = null;
      check(obj).doExist().should.be.false;
    });
    it('should return true for multiple existing elements', function() {
      check([], 1, 'existing').allExists().should.be.true;
    });
    it('should return false for multiple elements, \n' +
        'where at least one elem is non-existent', function() {
      check([], 1, 'test', null).allExists().should.be.false;
    });
  });
});

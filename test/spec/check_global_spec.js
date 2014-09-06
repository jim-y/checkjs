/*jshint -W030 */

var check = require('../../lib/check'),
	should = require('should');

describe('check.js', function() {

	'use strict';

	describe('global', function() {
		it('global {Function} check should exist', function() {
			should.exist(check);
		});
		it('an empty argument-list should return false', function() {
			check().should.be.false;
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
		it('negate should initially be false', function() {
			check('test').negate.should.be.false;
		});
		it('should work with a single argument', function() {
			var res = check('test').is.string();
			res.should.be.true;
		});
		it('should work with multiple arguments', function() {
			var res = check('test', 'another', 'yet another').isAll.string();
			res.should.be.true;
		});
	});

	describe('empty', function() {
		it('should have a method empty', function() {
			should.exist(check([]).empty);
		});
		it('should return true on a single falsy argument', function() {
			check('').is.empty().should.be.true;
			check(0).is.empty().should.be.true;
			check([]).is.empty().should.be.true;
			check({}).is.empty().should.be.true;
		});
		it('should return false on a single truthy argument', function() {
			// negate
			check(1).is.empty().should.be.false;
			check([1]).is.empty().should.be.false;
			check({ key: 'val' }).is.empty().should.be.false;
			check(0).is.not.empty().should.be.false;
		});
		it('should return true on multiple falsy arguments', function() {
			check([], 0).isAll.empty().should.be.true;
			check([], 1, {}).notAll.empty().should.be.true;
		});
		it('should return false on multiple truthy arguments', function() {
		  check(1, 'test', new Date(), true).isAll.empty().should.be.false;
		});
	});
});

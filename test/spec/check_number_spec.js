/*jshint -W030 */
/*jshint -W053 */

var check = require('../../lib/check'),
	should = require('should');

describe('Number', function() {

	'use strict';

	it('should return true on a <numeric> value', function() {
		var res = check(1).isNumber();
		res.should.be.true;
	});
	it('should return false on a <not numeric> value', function() {
		var res = check('test').toBe.isNumber();
		res.should.be.false;
	});
	it('should return false on negated truthy check', function() {
		var res = check(1).not.isNumber();
	});
	it('should return true on negated falsy check', function() {
		var res = check(1).not.isString();
		res.should.be.true;
	});

	it('should work on integers', function() {
		var res = check(+'1').isNumber();
		res.should.be.true;
		check(parseInt('120')).isNumber().should.be.true;
	});
	it('should work on floats', function() {
		var res = check(1.01).isNumber();
		res.should.be.true;
	});
	it('should work on the value 0 (zero)', function() {
		var res = check(0).isNumber();
		res.should.be.true;
	});
	describe('wrappers', function() {
		it('should work on new Number(<value>)', function() {
			check(new Number('120')).isNumber().should.be.true;
		});
		it('should work on Number(<value>)', function() {
			check(Number('120')).isNumber().should.be.true;
		});
	});
});

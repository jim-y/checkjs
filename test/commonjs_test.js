var check = require('../lib/check'),
	assert = require('assert');

console.info(new Date());
console.log(check(new Date()).is.empty());
//check(0).is.empty().should.be.true;
			//check([]).is.empty().should.be.true;
			//check({}).is.empty().should.be.true;

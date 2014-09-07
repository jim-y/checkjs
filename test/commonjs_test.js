var check = require('../lib/check'),
	assert = require('assert');

var arg1 = {key: 'value'},
	arg2 = {};

console.log( check(arg1, arg2).areobjects.test() );

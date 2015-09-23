'use strict';

const assert = require('chai').assert
	, tools = require('./index');

describe('Tools tests', () => {


	it('should return an object of functions', () => {
		assert.isObject(tools);
		assert.isFunction(tools.flatten);
	});

	it('should flatten an array of arrays', () => {
		const test = tools.flatten(['this', 'is', ['a', 'string', ['in', ['arrays']]]]);
		
		test.forEach((item) => {
			assert.isNotArray(item);
		});

		assert.isArray(test);
	});
});

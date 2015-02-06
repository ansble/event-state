var assert = require('chai').assert
	, Events = require('events').EventEmitter
	, appInit = require('./app')
	, app = require('./app')(Events);

describe('The Main Tests for event-state', function () {
	it('should return a function', function () {
		assert.isFunction(appInit);
	});

	it('should export a function when it is initialized', function () {
		assert.isFunction(app);
	});

	// describe('Events should trigger the state machine')
});
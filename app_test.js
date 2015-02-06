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

	describe('Events should trigger the state machine', function () {
		it('callback should receive an array', function () {
			app(['test-event', 'test-event-2'], function (dataArray) {
				assert.isArray(dataArray);
			});

			Events.emit('test-event', {'test': true});
			Events.emit('test-event-2', {'test': true});
		});
	});
});
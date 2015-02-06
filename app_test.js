var assert = require('chai').assert
	, Events = require('events').EventEmitter
	, emitter = new Events()
	, appInit = require('./app')
	, app = require('./app')(emitter);

describe('The Main Tests for event-state', function () {
	it('should return a function', function () {
		assert.isFunction(appInit);
	});

	it('should export a function when it is initialized', function () {
		assert.isFunction(app);
	});

	describe('Events should trigger the state machine', function () {
		it('callback should receive an array', function (done) {
			
			app(['test-event', 'test-event-2'], function (dataArray) {
				assert.isArray(dataArray);
				assert.strictEqual(dataArray.length, 2);
				done();
			});

			emitter.emit('test-event', {'test': true});
			emitter.emit('test-event-2', {'test': '1'});
		});
	});
});
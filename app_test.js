var assert = require('chai').assert
	, Events = require('events').EventEmitter
	, emitter = new Events()
	, app = require('./app');

describe('The Main Tests for event-state', function () {
	'use strict';

	before(function () {
		emitter.required = app;
	});

	it('should return a function', function () {
		assert.isFunction(app);
		assert.isFunction(emitter.required);
	});

	describe('Events should trigger the state machine', function () {
		it('callback should receive an array', function (done) {
			
			emitter.required(['test-event', 'test-event-2'], function (dataArray) {
				assert.isArray(dataArray);
				assert.strictEqual(dataArray.length, 2);
				done();
			});

			emitter.emit('test-event', {'test': true});
			emitter.emit('test-event-2', {'test': '1'});
		});

		it('callback array should be ordered in the same order as events', function (done) {
			
			emitter.required(['test-event', 'test-event-2'], function (dataArray) {
				assert.isArray(dataArray);
				assert.strictEqual('test-event', dataArray[0]);
				assert.strictEqual('test-event-2', dataArray[1]);
				done();
			});

			emitter.emit('test-event', 'test-event');
			emitter.emit('test-event-2', 'test-event-2');
		});

		it('multiple groups of events should trigger nicely and independently', function (done) {
			
			emitter.required(['test-event', 'test-event-2'], function (dataArray) {
				assert.isArray(dataArray);
				assert.strictEqual('test-event', dataArray[0]);
				assert.strictEqual('test-event-2', dataArray[1]);
				
				emitter.emit('test-event-3', 'test-event-3');
			});

			emitter.required(['test-event', 'test-event-3'], function (dataArray) {
				assert.isArray(dataArray);
				assert.strictEqual('test-event', dataArray[0]);
				assert.strictEqual('test-event-3', dataArray[1]);
				done();
			});

			emitter.emit('test-event', 'test-event');
			emitter.emit('test-event-2', 'test-event-2');
		});

		it('should allow for multiple triggers of the same state');
		it('should unbind listeners if not multiple flagged and using .on');
	});

	describe('required state should be cancelable', function(){
		it('should return an object with a cancel function that cancels the required', function () {
			var test = true
				, requiredEvent = emitter.required(['test-event', 'test-event-2'], function () {
					test = false;
				});

			assert.isObject(requiredEvent);
			assert.isFunction(requiredEvent.cancel);
		});

		it('should cancel the callback if called', function (done) {
			var test = true
				, requiredEvent = emitter.required(['test-event', 'test-event-2'], function () {
					test = false;
				});

			//cancel the event
			requiredEvent.cancel();

			emitter.on('test-event-2', function () {
				assert.strictEqual(true, test);
				done();
			});

			emitter.emit('test-event', 'test-event');
			emitter.emit('test-event-2', 'test-event-2');
		});
	});
});
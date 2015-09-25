'use strict';

const assert = require('chai').assert
    , tools = require('./index')
    , Events = require('events')
    , emitter = new Events();

describe('Tools tests', () => {


    it('should return an object of functions', () => {
        assert.isObject(tools);
        assert.isFunction(tools.flatten);
        assert.isFunction(tools.getListener);
    });

    it('should flatten an array of arrays', () => {
        const test = tools.flatten(['this', 'is', ['a', 'string', ['in', ['arrays']]]]);
        
        test.forEach((item) => {
            assert.isNotArray(item);
        });

        assert.isArray(test);
    });

    describe('getListener Tests', () => {
        it('should return .on if multiple is passed', () => {
            const test = tools.getListener(emitter, true);

            assert.strictEqual(test, emitter.on);
        });

        it('should return .once if available and multiple=false is passed', () => {
            const test = tools.getListener(emitter, false);

            assert.strictEqual(test, emitter.once);
        });

        it('should return .once if available and nothing passed for multiple', () => {
            const test = tools.getListener(emitter);
            
            assert.strictEqual(test, emitter.once);
        });
    });
});

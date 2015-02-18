//TODO: use .off when .on is used to register
//TODO: add comments

var required = function (eventsArrayIn, callback, scopeIn, multiple) {
		'use strict';

		var that = this
			, scope = scopeIn || {}
			, eventData = []
			, updateData = []
			, called = false
			, listen = that.once || that.one || that.on //use once if available, one, if available, and lastly on if available.
			, silence = that.off || that.removeListener
			, isOn = (listen === that.on)

			, clear = function () {
				eventsArrayIn.forEach(function (event) {
					silence.apply(that,[event, updateData[eventsArrayIn.indexOf(event)]]);
				});

				eventData = undefined;
			}

			, updateState = function (eventName) {
				return function (data) {
					eventData[eventsArrayIn.indexOf(eventName)] = data;
					stateCheck();
				};
			}

			, stateCheck = function () {
				var ready = true;
				
				eventsArrayIn.forEach(function (event) {
					ready = ready && (typeof eventData[eventsArrayIn.indexOf(event)] !== 'undefined');
				});

				if(ready && !called){
					callback.apply(scope, [eventData]);

					if(!multiple){
						called = true;
						
						if(isOn){
							clear();
						}
					}
				}
			};

		if(multiple){
			listen = that.on;
		}

		eventsArrayIn.forEach(function (event) {
			var index = eventsArrayIn.indexOf(event);
			updateData[index] = updateState(event);
			listen.apply(that, [event, updateData[index]]);
		});

		//returns a function that clears the event listeners
		return {cancel: clear};
	};

module.exports = required;
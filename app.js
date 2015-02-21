//TODO: use .off when .on is used to register

var required = function (eventsArrayIn, callback, scopeIn, multiple) {
		'use strict';

		var that = this
			, scope = scopeIn || {}
			, eventData = []
			, updateData = []
			, called = false
			, listen = that.once || that.one || that.on //use once if available, one, if available, and lastly on if available.
			, silence = that.off || that.removeListener
			, isOn = (listen === that.on) //are we using .on?

			, clear = function () {
				//this function silences listeners once they are not needed anymore

				eventsArrayIn.forEach(function (event) {
					silence.apply(that,[event, updateData[eventsArrayIn.indexOf(event)]]);
				});

				eventData = undefined;
			}

			, updateState = function (eventName) {
				// this function handles updating the whether or not an event has been triggered
				//	it returns a function that holds onto the eventName in closure scope
				var index = eventsArrayIn.indexOf(eventName);

				return function (data) {
					eventData[index] = data; //update the data array
					stateCheck(); //check to see if all the events have triggered
				};
			}

			, stateCheck = function () {
				//the state check function... it checks to see if all the events have triggered
				var ready = true;
				
				eventsArrayIn.forEach(function (event) {
					ready = ready && (typeof eventData[eventsArrayIn.indexOf(event)] !== 'undefined');
				});

				if(ready && !called){ //have all events triggered? and has the callback been called before?
					//yep... apply the callback
					callback.apply(scope, [eventData]);

					//if we aren't dealing with a set of events we want to trigger multiple times then
					//	mark called true so we don't call the callback mulitple times
					if(!multiple){
						called = true;
						
						if(isOn){ //if we used .on to bind then unbind the listeners we created
							clear();
						}
					}
				}
			};

		if(multiple){ //if it is supposed to trigger muliple times then we need to use .on not .once or .one
			listen = that.on;
		}

		//setup the listeners for each event
		eventsArrayIn.forEach(function (event) {
			var index = eventsArrayIn.indexOf(event);
			updateData[index] = updateState(event);
			listen.apply(that, [event, updateData[index]]);
		});

		//returns a function that clears the event listeners
		return {cancel: clear};
	};

module.exports = required;
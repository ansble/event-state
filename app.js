var required = function (eventsArrayIn, callback, scope) {
		var that = this
			, scope = scope || {}
			, eventData = []
			, called = false
			, listen = that.once || that.one || that.on //use once if available, one, if available, and lastly on if available.
			
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
					called = true;
					callback.apply(scope, [eventData]);
				}
			};

		eventsArrayIn.forEach(function (event) {
			listen.apply(that, [event, updateState(event)]);
		});
	};

module.exports = required;
var required = function (eventsArrayIn, callback, scope) {
		var that = this
			, scope = scope || {}
			, eventData = []
			, called = false
			
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
			that.once(event, updateState(event));
		});
	};

module.exports = required;
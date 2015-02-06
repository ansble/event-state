var eventObject
	, required = function (eventsArrayIn, callback, scope) {
		var stateObj = {}
			, scope = scope || {}
			, eventData = []
			, called = false
			
			, updateState = function (eventName) {				
				return function (data) {
					stateObj[eventName] = data;
					eventData.push(data);

					stateCheck();
				};
			}

			, stateCheck = function () {
				var ready = true;

				Object.keys(stateObj).forEach(function (event) {
					ready = ready && (stateObj[event] !== false);
				});

				if(ready && !called){
					called = true;

					callback.apply(scope, [eventData]);
				}
			};

		eventsArrayIn.forEach(function (event) {
			stateObj[event] = false;
			eventObject.on(event, updateState(event));
		});
	};

module.exports = function (eventObjectIn) {
	eventObject = eventObjectIn;

	return required;
};
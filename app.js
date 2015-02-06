var eventObject
	, required = function (eventsArrayIn, callback, scope) {
		var stateObj = {}
			, scope = scope || {}
			, eventData = []
			
			, updateState = function (eventName) {
				return function (data) {
					stateObj[eventName] = data;
					eventData.push(data);
				};
			}

			, stateCheck = function () {
				var ready = true;

				Object.keys(stateObj).forEach(function (event) {
					ready = ready && (typeof stateObj[event] !== 'undefined');
				});

				if(ready){
					callback.apply(scope, eventData);
				}
			};

		eventsArrayIn.forEach(function (event) {
			stateObj[event] = false;

			eventObject.on(event, updateState(event));

			stateCheck();
		});
	};

module.exports = function (eventObjectIn) {
	eventObject = eventObjectIn;

	return required;
};
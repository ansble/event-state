# event-state

One of the key elements of any 

## API

```
required(['event-one', 'event-two'], function (dataArray) {
	//this function will be executed when all of the 
	//	required events are triggered.
}, scope);
```

Very simple and concise. Takes an array of events, and when all the events have been triggered it executes the callback passing it an array containing the data recieved by each event. 

`dataArray` is in the order in which the events are declared in the required events array.

`scope` is the scope that will be applied to the callback function.

`required` needs to be attached to an event emitter that has an `on` and `once` function that listens to events.

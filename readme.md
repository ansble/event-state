# event-state

One of the key elements of any 

## API

```
var state = required(['event-one', 'event-two'], function (dataArray) {
	//this function will be executed when all of the 
	//	required events are triggered.
}, scope);

state.add('event-three');

state.cancel();
```

Very simple and concise. Takes an array of events, and when all the events have been triggered it executes the callback passing it an array containing the data recieved by each event. 

`dataArray` is in the order in which the events are declared in the required events array.

`scope` is the scope that will be applied to the callback function.

`required` needs to be attached to an event emitter that has an `on`, `one` or `once` function that listens to events. It uses one of them (once > one > on) to do it's listening. `on` is less then ideal and most likely will cause a memory leak of some sort.

`required` returns a funciton that cancels it.

### Returns
`state` above is an object that contains a `cancel` and `add` function respectively.

`state.add(event-name-in)` adds that event to your required state. This is handy for lots of stuff... ok like one thing: building file structure into an object.

`state.cancel()` let's you cancel the entire thing. That way if you are waiting on event-a, event-b and event-x but want to bail on the operation if event-x and event-y are triggered then you just call state.cancel() and are done with it.
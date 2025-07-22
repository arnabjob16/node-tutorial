/**
* Concept 4: Using EventEmitter to Handle Custom Events
* ------------------------------------------------------
* Node.js has a built-in `events` module that allows you to emit and listen to custom events.
*
* 👉 Core Concepts Covered:
*   - Creating an event emitter instance
*   - Registering event listeners
*   - Emitting events with/without data
*
* 💡 Interview Tip:
*   EventEmitter is the foundation for many async patterns in Node.js (e.g., Streams, HTTP, custom loggers).
*   Be prepared to explain its lifecycle: `on()` → `emit()`.
*/
 
const EventEmitter = require('events');
 
// Create an instance of EventEmitter
const myEmitter = new EventEmitter();
 
// Register an event listener for "userLoggedIn"
myEmitter.on('userLoggedIn', (username) => {
  console.log(`Event received: ${username} has logged in.`);
});
 
// Register another event for demonstration
myEmitter.on('orderPlaced', (order) => {
console.log(`Order Received: ${order.id} - ${order.item}`);
});
 
// Simulate logic that emits events
console.log('Simulating events...\n');
 
// Emit the "userLoggedIn" event
myEmitter.emit('userLoggedIn', 'arnab123');
 
// Emit the "orderPlaced" event
myEmitter.emit('orderPlaced', {
  id: 101,
  item: 'Wireless Keyboard'
});
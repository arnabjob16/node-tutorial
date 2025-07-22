/**
 * Concept 8: Timers in Node.js
 * -----------------------------
 * Node.js provides timer functions to schedule tasks:
 *   - setTimeout: Runs once after a delay
 *   - setInterval: Runs repeatedly after intervals
 *   - process.nextTick: Runs immediately after current operation (before I/O)
 * 
 * 👉 Core Concepts Covered:
 *   - Node's timer functions
 *   - Execution order of async callbacks
 *   - Event loop timing behavior
 * 
 * 💡 Interview Tip:
 *   Be ready to explain the difference between `setTimeout(fn, 0)` vs `process.nextTick(fn)` 
 *   and how they are prioritized in the event loop.
 */
 
// 1️⃣ Basic setTimeout example
setTimeout(() => {
  console.log('setTimeout: This runs after 2 seconds');
}, 2000);
 
// 2️⃣ Basic setInterval example
let count = 0;
const interval = setInterval(() => {
  console.log(`setInterval: Count = ${++count}`);
  if (count >= 3) {
    clearInterval(interval); // Stop after 3 times
    console.log('setInterval: Stopped');
  }
}, 1000);
 
// 3️⃣ process.nextTick example
process.nextTick(() => {
  console.log('process.nextTick: Runs before any timeout or interval');
});
 
console.log('Script started...');
 
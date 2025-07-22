/**
 * Concept 6: Using `process.argv` for Command-Line Arguments
 * ------------------------------------------------------------
 * `process.argv` is an array containing command-line arguments passed when the Node.js process is launched.
 * 
 * 👉 Core Concepts Covered:
 *   - Accessing command-line input
 *   - Parsing arguments from `process.argv`
 *   - Building simple CLI input logic
 * 
 * 💡 Interview Tip:
 *   Useful for writing CLI tools or scripts where user input is passed from the terminal.
 *   `process.argv` always includes the path to `node` and the script file as the first two entries.
 */
 
const args = process.argv.slice(2); // Remove first two default items
 
console.log('Command-line Arguments Received:', args);
 
// Example: node server.js add 5 10
const [operation, num1, num2] = args;
 
if (!operation || !num1 || !num2) {
  console.log('Please provide operation and two numbers. Example:');
  console.log('node server.js add 5 10');
  process.exit(1);
}
 
const a = parseFloat(num1);
const b = parseFloat(num2);
 
let result;
 
switch (operation) {
  case 'add':
    result = a + b;
    break;
  case 'sub':
    result = a - b;
    break;
  case 'mul':
    result = a * b;
    break;
  case 'div':
    result = b !== 0 ? a / b : 'Cannot divide by zero';
    break;
  default:
    result = 'Unknown operation. Use add, sub, mul, or div.';
}
 
console.log(`Result of ${operation}(${a}, ${b}) = ${result}`);
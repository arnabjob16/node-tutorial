/**
 * Concept 7: Simple CLI Calculator Tool using Node.js
 * -----------------------------------------------------
 * Build a command-line calculator that performs basic arithmetic operations:
 *   - add, sub, mul, div
 * 
 * 👉 Core Concepts Covered:
 *   - Parsing command-line arguments
 *   - Writing modular calculation logic
 *   - Handling input validation and edge cases
 * 
 * 💡 Interview Tip:
 *   CLI tools are great for demonstrating your Node.js fundamentals, argument handling,
 *   and clean coding practices in real-world scripting.
 */
 
const [,, operation, val1, val2] = process.argv;
 
// Convert input to numbers
const num1 = parseFloat(val1);
const num2 = parseFloat(val2);
 
// Validate inputs
if (!operation || isNaN(num1) || isNaN(num2)) {
  console.log('Invalid input.\nUsage: node server.js <operation> <num1> <num2>');
  console.log('Example: node server.js add 10 5');
  process.exit(1);
}
 
// Calculator logic
function calculate(op, a, b) {
  switch (op) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      return b !== 0 ? a / b : 'Cannot divide by zero';
    default:
      return 'Unknown operation. Use: add, sub, mul, div';
  }
}
 
// Perform calculation
const result = calculate(operation, num1, num2);
 
// Display result
console.log(`✅ Result of ${operation}(${num1}, ${num2}) = ${result}`);
 
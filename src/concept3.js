/**
 * Concept 3: Read and Write a Text File using Node.js `fs` Module
 * -----------------------------------------------------------------
 * This example shows how to use the built-in `fs` module to:
 *   - Write content to a file (`fs.writeFile`)
 *   - Read content from a file (`fs.readFile`)
 * 
 * 👉 Core Concepts Covered:
 *   - File system operations (no external library)
 *   - Callback-based asynchronous methods
 * 
 * 💡 Interview Tip:
 *   Be ready to explain the difference between sync (`fs.writeFileSync`) and async (`fs.writeFile`) operations,
 *   and why async is preferred in non-blocking environments like Node.js.
 */
 
const fs = require('fs');
 
// File name to work with
const fileName = 'message.txt';
 
// Content to write to file
const contentToWrite = 'Hello, this is Concept 3 - File system read/write example!';
 
// 1️⃣ Write to the file asynchronously
fs.writeFile(fileName, contentToWrite, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
 
  console.log('File written successfully.');
 
  // 2️⃣ After writing, read the file asynchronously
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading from file:', err);
      return;
    }
 
    console.log('File content read:');
    console.log('------------------------');
    console.log(data);
    console.log('------------------------');
  });
});
 